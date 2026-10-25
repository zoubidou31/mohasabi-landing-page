// Shared backend utilities for Cloudflare Pages Functions

export interface Env {
  DB?: D1Database;
  ADMIN_PASSWORD?: string;
  SESSION_SECRET?: string;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1ExecResult>;
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<D1Result<T>>;
  all<T = unknown>(): Promise<D1Result<T>>;
}

export interface D1Result<T = unknown> {
  results?: T[];
  success: boolean;
  meta?: unknown;
  error?: string;
}

export interface D1ExecResult {
  count: number;
  duration: number;
}

export const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store, no-cache, must-revalidate',
};

export function jsonResponse<T>(data: T, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...extraHeaders,
    },
  });
}

export function errorResponse(
  code: 'invalid' | 'duplicate' | 'rate_limited' | 'unauthorized' | 'unknown' | 'unavailable',
  message?: string,
  status = 400,
  extraHeaders: Record<string, string> = {}
): Response {
  return jsonResponse({ error: code, message: message || code }, status, extraHeaders);
}

// -----------------------------------------------------------------------------
// Security & CSRF
// -----------------------------------------------------------------------------

export function checkOrigin(request: Request): boolean {
  const method = request.method.toUpperCase();
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) return true;

  const origin = request.headers.get('Origin');
  if (!origin) {
    const referer = request.headers.get('Referer');
    if (!referer) return true; // Same-origin direct requests might omit Origin
    try {
      const refererUrl = new URL(referer);
      const requestUrl = new URL(request.url);
      return refererUrl.host === requestUrl.host;
    } catch {
      return false;
    }
  }

  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    return originUrl.host === requestUrl.host;
  } catch {
    return false;
  }
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    '127.0.0.1'
  );
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

// -----------------------------------------------------------------------------
// Cryptography & Session Tokens (HMAC-SHA256)
// -----------------------------------------------------------------------------

const DEFAULT_SECRET = 'mohasabi-default-session-signature-secret-key-salt-2026';

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function bufToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBuf(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

export async function createSessionToken(username: string, env: Env, ttlMs = 86400000): Promise<string> {
  const secret = env.SESSION_SECRET || env.ADMIN_PASSWORD || DEFAULT_SECRET;
  const key = await getHmacKey(secret);
  const expiresAt = Date.now() + ttlMs;
  const payload = `${username}:${expiresAt}`;
  const signatureBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  const sigHex = bufToHex(signatureBuf);
  return `${payload}:${sigHex}`;
}

export async function verifySessionToken(token: string | null | undefined, env: Env): Promise<{ valid: boolean; user?: string }> {
  if (!token) return { valid: false };
  const parts = token.split(':');
  if (parts.length !== 3) return { valid: false };

  const [username, expStr, sigHex] = parts;
  const expiresAt = parseInt(expStr, 10);
  if (isNaN(expiresAt) || Date.now() > expiresAt) return { valid: false };

  const secret = env.SESSION_SECRET || env.ADMIN_PASSWORD || DEFAULT_SECRET;
  const key = await getHmacKey(secret);
  const payload = `${username}:${expStr}`;

  try {
    const sigBytes = hexToBuf(sigHex);
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes as unknown as BufferSource,
      new TextEncoder().encode(payload)
    );
    return { valid, user: valid ? username : undefined };
  } catch {
    return { valid: false };
  }
}

export function parseCookies(cookieHeader: string | null): Record<string, string> {
  const map: Record<string, string> = {};
  if (!cookieHeader) return map;
  const pairs = cookieHeader.split(';');
  for (const pair of pairs) {
    const [k, ...v] = pair.trim().split('=');
    if (k && v.length > 0) {
      map[k] = decodeURIComponent(v.join('='));
    }
  }
  return map;
}

export async function authenticateRequest(request: Request, env: Env): Promise<{ authenticated: boolean; user?: string }> {
  const cookieHeader = request.headers.get('Cookie');
  const cookies = parseCookies(cookieHeader);
  const token = cookies['mohasabi_session'];
  const res = await verifySessionToken(token, env);
  return { authenticated: res.valid, user: res.user };
}

// -----------------------------------------------------------------------------
// Rate Limiting (D1-backed with safe fallthrough)
// -----------------------------------------------------------------------------

export async function checkRateLimit(
  db: D1Database | undefined,
  key: string,
  maxRequests: number,
  windowSec: number
): Promise<boolean> {
  if (!db) return true; // If DB is not bound, don't crash

  try {
    // Primary strategy: bucket / window_start / count (matches mohasabi-cms-preview schema)
    const windowStart = Math.floor(Date.now() / 1000 / windowSec) * windowSec;
    const row = await db.prepare(
      `INSERT INTO rate_limits (bucket, window_start, count) VALUES (?1, ?2, 1)
       ON CONFLICT(bucket) DO UPDATE SET
         count = CASE WHEN excluded.window_start > rate_limits.window_start THEN 1 ELSE rate_limits.count + 1 END,
         window_start = CASE WHEN excluded.window_start > rate_limits.window_start THEN excluded.window_start ELSE rate_limits.window_start END
       RETURNING count AS count`
    )
      .bind(key, windowStart)
      .first<{ count: number }>();

    if (row && typeof row.count === 'number') {
      return row.count <= maxRequests;
    }
  } catch {
    // Secondary fallback strategy: key / count / reset_at
    try {
      const now = Math.floor(Date.now() / 1000);
      const resetAt = now + windowSec;
      const row = await db.prepare('SELECT count, reset_at FROM rate_limits WHERE key = ?').bind(key).first<{ count: number; reset_at: number }>();
      if (!row || row.reset_at < now) {
        await db.prepare('INSERT OR REPLACE INTO rate_limits (key, count, reset_at) VALUES (?, 1, ?)').bind(key, resetAt).run();
        return true;
      }
      if (row.count >= maxRequests) {
        return false;
      }
      await db.prepare('UPDATE rate_limits SET count = count + 1 WHERE key = ?').bind(key).run();
      return true;
    } catch {
      return true; // Fail open gracefully on DB error
    }
  }

  return true;
}

// -----------------------------------------------------------------------------
// Audit Logging
// -----------------------------------------------------------------------------

export async function recordAudit(
  db: D1Database | undefined,
  actor: string,
  action: string,
  detail: string
): Promise<void> {
  if (!db) return;
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  try {
    // Primary: admin_activity (matches mohasabi-cms-preview schema)
    await db.prepare('INSERT INTO admin_activity (id, at, actor, action, detail) VALUES (?, ?, ?, ?, ?)')
      .bind(id, now, actor, action, detail.slice(0, 300))
      .run();
  } catch {
    // Secondary fallback: audit_log
    try {
      await db.prepare('INSERT INTO audit_log (id, actor, action, detail, created_at) VALUES (?, ?, ?, ?, ?)')
        .bind(id, actor, action, detail.slice(0, 300), now)
        .run();
    } catch (err) {
      console.error('Failed to write audit log:', err);
    }
  }
}

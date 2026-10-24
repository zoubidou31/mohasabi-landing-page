export const SESSION_COOKIE = 'mohasabi_admin';
export const SESSION_TTL_SECONDS = 8 * 60 * 60;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function base64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(value: string): Uint8Array | null {
  try {
    const padded = value.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(padded + '='.repeat((4 - (padded.length % 4)) % 4));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch {
    return null;
  }
}

async function sha256(value: string): Promise<Uint8Array> {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(value));
  return new Uint8Array(digest);
}

async function hmac(secret: string, value: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return new Uint8Array(signature);
}

/** Length-independent comparison so neither digests nor signatures leak timing. */
function equalBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
}

/**
 * Passwords are compared as SHA-256 digests: equal length, so the comparison
 * cannot reveal the secret's length or its first differing byte.
 */
export async function passwordMatches(supplied: string, expected: string): Promise<boolean> {
  const [a, b] = await Promise.all([sha256(supplied), sha256(expected)]);
  return equalBytes(a, b);
}

export async function hashKey(secret: string, value: string): Promise<string> {
  const digest = await hmac(secret, value);
  return Array.from(digest, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export interface SessionPayload {
  sub: 'admin';
  iat: number;
  exp: number;
}

export async function createSession(secret: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = { sub: 'admin', iat: now, exp: now + SESSION_TTL_SECONDS };
  const body = base64Url(encoder.encode(JSON.stringify(payload)));
  const signature = await hmac(secret, body);
  return `${body}.${base64Url(signature)}`;
}

export async function verifySession(secret: string, token: string | null): Promise<boolean> {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [body, signature] = parts;
  if (!body || !signature) return false;

  const provided = fromBase64Url(signature);
  if (!provided) return false;
  const expected = await hmac(secret, body);
  if (!equalBytes(provided, expected)) return false;

  const payloadBytes = fromBase64Url(body);
  if (!payloadBytes) return false;
  try {
    const payload = JSON.parse(decoder.decode(payloadBytes)) as Partial<SessionPayload>;
    return payload.sub === 'admin' && typeof payload.exp === 'number' && payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

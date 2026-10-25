import { describe, expect, it, vi } from 'vitest';
import {
  createSessionToken,
  verifySessionToken,
  parseCookies,
  checkOrigin,
  getClientIp,
  timingSafeEqual,
  checkRateLimit,
} from '../../functions/api/_shared';
import type { D1Database } from '../../functions/api/_shared';
import { onRequestPost as loginPost } from '../../functions/api/login';

describe('Backend Security & Cryptographic Sessions', () => {
  const testSecret = ['mock', 'session', 'secret', '32chars'].join('-');
  const testPassword = ['mock', 'admin', 'password'].join('-');

  const mockEnv = {
    ADMIN_PASSWORD: testPassword,
    SESSION_SECRET: testSecret,
  };

  it('generates a signed session token that verifies successfully', async () => {
    const token = await createSessionToken('admin', mockEnv, 3600000); // 1 hour
    expect(typeof token).toBe('string');
    expect(token.split(':')).toHaveLength(3);

    const check = await verifySessionToken(token, mockEnv);
    expect(check.valid).toBe(true);
    expect(check.user).toBe('admin');
  });

  it('rejects tampered session tokens (payload modification)', async () => {
    const token = await createSessionToken('admin', mockEnv, 3600000);
    const parts = token.split(':');
    // Tamper with username
    const tampered = `attacker:${parts[1]}:${parts[2]}`;

    const check = await verifySessionToken(tampered, mockEnv);
    expect(check.valid).toBe(false);
  });

  it('rejects tampered session tokens (signature modification)', async () => {
    const token = await createSessionToken('admin', mockEnv, 3600000);
    const parts = token.split(':');
    // Invert first character of signature to guarantee it differs from original
    const firstChar = parts[2][0];
    const invertedChar = firstChar === 'a' ? 'b' : 'a';
    const badSig = invertedChar + parts[2].slice(1);
    const tampered = `${parts[0]}:${parts[1]}:${badSig}`;

    const check = await verifySessionToken(tampered, mockEnv);
    expect(check.valid).toBe(false);
  });

  it('rejects expired session tokens', async () => {
    // Generate token that expired 1 second ago
    const token = await createSessionToken('admin', mockEnv, -1000);
    const check = await verifySessionToken(token, mockEnv);
    expect(check.valid).toBe(false);
  });

  it('rejects null or malformed tokens safely without crashing', async () => {
    expect((await verifySessionToken('', mockEnv)).valid).toBe(false);
    expect((await verifySessionToken('invalid', mockEnv)).valid).toBe(false);
    expect((await verifySessionToken('a:b', mockEnv)).valid).toBe(false);
    expect((await verifySessionToken(null, mockEnv)).valid).toBe(false);
  });

  it('parses HTTP Cookie header accurately', () => {
    const header = 'mohasabi_session=xyz123; mohasabi-locale=ar; theme=light';
    const parsed = parseCookies(header);
    expect(parsed['mohasabi_session']).toBe('xyz123');
    expect(parsed['mohasabi-locale']).toBe('ar');
    expect(parsed['theme']).toBe('light');
  });

  it('enforces Origin and Referer checks on mutating HTTP methods to prevent CSRF', () => {
    // Safe read methods (GET, HEAD, OPTIONS) do not require Origin/Referer
    const getReq = new Request('https://mohasabi-preview.pages.dev/api/reviews', { method: 'GET' });
    expect(checkOrigin(getReq)).toBe(true);

    const headReq = new Request('https://mohasabi-preview.pages.dev/api/reviews', { method: 'HEAD' });
    expect(checkOrigin(headReq)).toBe(true);

    // POST from matching origin is allowed
    const validOriginPost = new Request('https://mohasabi-preview.pages.dev/api/reviews', {
      method: 'POST',
      headers: { Origin: 'https://mohasabi-preview.pages.dev' },
    });
    expect(checkOrigin(validOriginPost)).toBe(true);

    // POST from foreign origin is blocked
    const foreignOriginPost = new Request('https://mohasabi-preview.pages.dev/api/reviews', {
      method: 'POST',
      headers: { Origin: 'https://evil-attacker-site.com' },
    });
    expect(checkOrigin(foreignOriginPost)).toBe(false);

    // POST with matching Referer when Origin is omitted is allowed
    const validRefererPost = new Request('https://mohasabi-preview.pages.dev/api/reviews', {
      method: 'POST',
      headers: { Referer: 'https://mohasabi-preview.pages.dev/admin' },
    });
    expect(checkOrigin(validRefererPost)).toBe(true);

    // POST with foreign Referer when Origin is omitted is blocked
    const foreignRefererPost = new Request('https://mohasabi-preview.pages.dev/api/reviews', {
      method: 'POST',
      headers: { Referer: 'https://evil-attacker-site.com/attack' },
    });
    expect(checkOrigin(foreignRefererPost)).toBe(false);

    // POST with NEITHER Origin NOR Referer MUST be blocked (fail-closed defense)
    const noOriginNoRefererPost = new Request('https://mohasabi-preview.pages.dev/api/reviews', {
      method: 'POST',
    });
    expect(checkOrigin(noOriginNoRefererPost)).toBe(false);

    // PUT/PATCH/DELETE with neither Origin nor Referer must also be blocked
    const noHeaderPut = new Request('https://mohasabi-preview.pages.dev/api/admin/pricing', {
      method: 'PUT',
    });
    expect(checkOrigin(noHeaderPut)).toBe(false);
  });

  it('extracts client IP from Cloudflare header or falls back safely', () => {
    const reqWithCf = new Request('https://mohasabi-preview.pages.dev/', {
      headers: { 'cf-connecting-ip': '197.200.10.5' },
    });
    expect(getClientIp(reqWithCf)).toBe('197.200.10.5');

    const reqWithForwarded = new Request('https://mohasabi-preview.pages.dev/', {
      headers: { 'x-forwarded-for': '197.200.10.6, 10.0.0.1' },
    });
    expect(getClientIp(reqWithForwarded)).toBe('197.200.10.6');
  });

  it('performs timing-safe string comparison without early bailout', () => {
    expect(timingSafeEqual('admin123', 'admin123')).toBe(true);
    expect(timingSafeEqual('admin123', 'admin124')).toBe(false);
    expect(timingSafeEqual('short', 'longer-string')).toBe(false);
    expect(timingSafeEqual('', '')).toBe(true);
  });

  it('strictly enforces SESSION_SECRET independence and fails closed without fallback to ADMIN_PASSWORD', async () => {
    // 1. Environment with only ADMIN_PASSWORD but NO SESSION_SECRET
    const onlyPasswordEnv = {
      ADMIN_PASSWORD: ['mock', 'password', 'only'].join('-'),
    };

    // Creating token must reject because ADMIN_PASSWORD cannot be substituted for SESSION_SECRET
    await expect(createSessionToken('admin', onlyPasswordEnv)).rejects.toThrow(
      /SESSION_SECRET is missing or does not meet minimum security requirements/
    );

    // Verifying token must fail closed
    const verifyResult = await verifySessionToken('admin:9999999999:sig', onlyPasswordEnv);
    expect(verifyResult.valid).toBe(false);

    // 2. Environment with too-short SESSION_SECRET (< 16 chars) must also be rejected
    const weakSecretEnv = {
      SESSION_SECRET: 'short-key',
    };
    await expect(createSessionToken('admin', weakSecretEnv)).rejects.toThrow(
      /SESSION_SECRET is missing or does not meet minimum security requirements/
    );
    expect((await verifySessionToken('admin:9999999999:sig', weakSecretEnv)).valid).toBe(false);

    // 3. Completely empty environment must fail closed
    const emptyEnv = {};
    await expect(createSessionToken('admin', emptyEnv)).rejects.toThrow(
      /SESSION_SECRET is missing or does not meet minimum security requirements/
    );
    expect((await verifySessionToken('admin:9999999999:sig', emptyEnv)).valid).toBe(false);
  });

  it('enforces fail-closed defense in checkRateLimit when DB is missing or queries fail', async () => {
    // 1. Missing DB must fail closed (never allow bypass)
    const missingDbResult = await checkRateLimit(undefined, 'login:127.0.0.1', 5, 60);
    expect(missingDbResult.allowed).toBe(false);
    expect(missingDbResult.unavailable).toBe(true);

    // 2. Failing DB (database crash / query error) must fail closed
    const failingDb = {
      prepare: vi.fn().mockImplementation(() => {
        throw new Error('D1 storage connection failure');
      }),
    } as unknown as D1Database;

    const failingDbResult = await checkRateLimit(failingDb, 'login:127.0.0.1', 5, 60);
    expect(failingDbResult.allowed).toBe(false);
    expect(failingDbResult.unavailable).toBe(true);

    // 3. Normal DB within limit
    const allowedDb = {
      prepare: vi.fn().mockReturnValue({
        bind: vi.fn().mockReturnValue({
          first: vi.fn().mockResolvedValue({ count: 2 }),
        }),
      }),
    } as unknown as D1Database;
    const allowedResult = await checkRateLimit(allowedDb, 'login:127.0.0.1', 5, 60);
    expect(allowedResult.allowed).toBe(true);
    expect(allowedResult.unavailable).toBeUndefined();

    // 4. Normal DB over limit
    const exceededDb = {
      prepare: vi.fn().mockReturnValue({
        bind: vi.fn().mockReturnValue({
          first: vi.fn().mockResolvedValue({ count: 6 }),
        }),
      }),
    } as unknown as D1Database;
    const exceededResult = await checkRateLimit(exceededDb, 'login:127.0.0.1', 5, 60);
    expect(exceededResult.allowed).toBe(false);
  });

  it('prevents login attempts from bypassing rate limiting when DB is unavailable or failing', async () => {
    // Attempt login when DB is missing from environment
    const reqNoDb = new Request('https://mohasabi-preview.pages.dev/api/login', {
      method: 'POST',
      headers: {
        Origin: 'https://mohasabi-preview.pages.dev',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: 'any-password' }),
    });

    const resNoDb = await loginPost({
      request: reqNoDb,
      env: {
        ADMIN_PASSWORD: testPassword,
        SESSION_SECRET: testSecret,
      },
    } as any);

    expect(resNoDb.status).toBe(503);
    const bodyNoDb = (await resNoDb.json()) as any;
    expect(bodyNoDb.error).toBe('unavailable');

    // Attempt login when DB throws an internal error during rate limiting
    const failingDb = {
      prepare: vi.fn().mockImplementation(() => {
        throw new Error('D1 cluster unreachable');
      }),
    } as unknown as D1Database;

    const reqFailingDb = new Request('https://mohasabi-preview.pages.dev/api/login', {
      method: 'POST',
      headers: {
        Origin: 'https://mohasabi-preview.pages.dev',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: 'any-password' }),
    });

    const resFailingDb = await loginPost({
      request: reqFailingDb,
      env: {
        DB: failingDb,
        ADMIN_PASSWORD: testPassword,
        SESSION_SECRET: testSecret,
      },
    } as any);

    expect(resFailingDb.status).toBe(503);
    const bodyFailingDb = (await resFailingDb.json()) as any;
    expect(bodyFailingDb.error).toBe('unavailable');
  });
});


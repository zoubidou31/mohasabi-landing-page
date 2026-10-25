import { describe, expect, it } from 'vitest';
import {
  createSessionToken,
  verifySessionToken,
  parseCookies,
  checkOrigin,
  getClientIp,
  timingSafeEqual,
} from '../../functions/api/_shared';

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
    // Change last char of signature
    const badSig = parts[2].slice(0, -2) + '00';
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
});


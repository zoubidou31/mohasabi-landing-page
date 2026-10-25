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
  const mockEnv = {
    ADMIN_PASSWORD: 'mock',
    SESSION_SECRET: 'mock',
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

  it('enforces Origin check on mutating HTTP methods to prevent CSRF', () => {
    // Safe method GET is allowed without origin
    const getReq = new Request('https://mohasabi.pages.dev/api/reviews', { method: 'GET' });
    expect(checkOrigin(getReq)).toBe(true);

    // POST from matching origin is allowed
    const validPost = new Request('https://mohasabi.pages.dev/api/reviews', {
      method: 'POST',
      headers: { Origin: 'https://mohasabi.pages.dev' },
    });
    expect(checkOrigin(validPost)).toBe(true);

    // POST from foreign origin is blocked
    const maliciousPost = new Request('https://mohasabi.pages.dev/api/reviews', {
      method: 'POST',
      headers: { Origin: 'https://evil-attacker-site.com' },
    });
    expect(checkOrigin(maliciousPost)).toBe(false);
  });

  it('extracts client IP from Cloudflare header or falls back safely', () => {
    const reqWithCf = new Request('https://mohasabi.pages.dev/', {
      headers: { 'cf-connecting-ip': '197.200.10.5' },
    });
    expect(getClientIp(reqWithCf)).toBe('197.200.10.5');

    const reqWithForwarded = new Request('https://mohasabi.pages.dev/', {
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
});


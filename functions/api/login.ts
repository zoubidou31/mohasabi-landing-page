import {
  Env,
  checkOrigin,
  checkRateLimit,
  createSessionToken,
  errorResponse,
  getClientIp,
  jsonResponse,
  recordAudit,
} from './_shared';

async function constantTimeCompare(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const hashA = await crypto.subtle.digest('SHA-256', enc.encode(a));
  const hashB = await crypto.subtle.digest('SHA-256', enc.encode(b));
  const bytesA = new Uint8Array(hashA);
  const bytesB = new Uint8Array(hashB);
  if (bytesA.length !== bytesB.length) return false;
  let diff = 0;
  for (let i = 0; i < bytesA.length; i++) {
    diff |= bytesA[i] ^ bytesB[i];
  }
  return diff === 0;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!checkOrigin(request)) {
    return errorResponse('unauthorized', 'Cross-origin request blocked', 403);
  }

  const ip = getClientIp(request);
  const allowed = await checkRateLimit(env.DB, `login:${ip}`, 5, 900); // 5 attempts per 15 minutes
  if (!allowed) {
    return errorResponse('rate_limited', 'Too many failed login attempts. Please try again in 15 minutes.', 429);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return errorResponse('invalid', 'Invalid JSON payload', 400);
  }

  const password = String(body.password || '');
  if (!password) {
    return errorResponse('invalid', 'Password is required', 400);
  }

  // Get admin password from environment variable
  const expectedPassword = env.ADMIN_PASSWORD;
  if (!expectedPassword) {
    // If not set yet in Cloudflare Pages secrets, reject safely
    return errorResponse('unavailable', 'Admin credentials not configured in environment', 503);
  }

  const matches = await constantTimeCompare(password, expectedPassword);

  if (!matches) {
    await recordAudit(env.DB, 'system', 'login_failed', `Failed login attempt from IP ${ip}`);
    return errorResponse('unauthorized', 'Invalid password', 401);
  }

  // Generate signed session cookie
  const token = await createSessionToken('admin', env, 86400000); // 24 hours
  await recordAudit(env.DB, 'admin', 'login_success', `Admin authenticated from IP ${ip}`);

  const cookie = `mohasabi_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`;

  return jsonResponse(
    { admin: true, user: 'admin' },
    200,
    { 'Set-Cookie': cookie }
  );
};


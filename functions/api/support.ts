import {
  Env,
  checkOrigin,
  checkRateLimit,
  errorResponse,
  getClientIp,
  jsonResponse,
} from './_shared';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!checkOrigin(request)) {
    return errorResponse('unauthorized', 'Cross-origin request blocked', 403);
  }

  if (!env.DB) {
    return errorResponse('unavailable', 'Database not configured', 503);
  }

  const ip = getClientIp(request);
  const rl = await checkRateLimit(env.DB, `support:${ip}`, 5, 600);
  if (rl.unavailable) {
    return errorResponse('unavailable', 'Rate limiting storage unavailable. Please try again later.', 503);
  }
  if (!rl.allowed) {
    return errorResponse('rate_limited', 'Too many requests. Please wait a few minutes.', 429);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return errorResponse('invalid', 'Invalid JSON payload', 400);
  }

  // Honeypot check for spam bots
  if (body.website && String(body.website).trim().length > 0) {
    return jsonResponse({ status: 'queued' });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const topic = String(body.topic || 'other').trim();
  const version = String(body.version || '').trim();
  const message = String(body.message || '').trim();

  // Server-side validation
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
  if (name.length < 2 || name.length > 80) {
    return errorResponse('invalid', 'Name must be between 2 and 80 characters', 400);
  }
  if (!emailRegex.test(email) || email.length > 160) {
    return errorResponse('invalid', 'Invalid email address', 400);
  }
  if (message.length < 20 || message.length > 2000) {
    return errorResponse('invalid', 'Message must be between 20 and 2000 characters', 400);
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  try {
    await env.DB.prepare(
      `INSERT INTO support_messages (id, name, email, topic, version, message, read, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 0, ?)`
    ).bind(id, name, email, topic, version, message, now).run();

    return jsonResponse({ status: 'queued' }, 201);
  } catch (err) {
    console.error('Error saving support message:', err);
    return errorResponse('unknown', 'Failed to save support message', 500);
  }
};


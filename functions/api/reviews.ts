import {
  Env,
  checkOrigin,
  checkRateLimit,
  errorResponse,
  getClientIp,
  jsonResponse,
} from './_shared';

interface PublicReview {
  id: string;
  displayName: string;
  rating: number;
  title: string;
  body: string;
  publishedAt: string;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.DB) {
    return errorResponse('unavailable', 'Database not configured', 503);
  }

  try {
    const { results } = await env.DB.prepare(
      `SELECT id, display_name as displayName, rating, title, body, created_at as publishedAt
       FROM reviews
       WHERE status = 'approved'
       ORDER BY created_at DESC
       LIMIT 100`
    ).all<PublicReview>();

    return jsonResponse({ reviews: results || [] });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    return errorResponse('unknown', 'Failed to retrieve reviews', 500);
  }
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!checkOrigin(request)) {
    return errorResponse('unauthorized', 'Cross-origin request blocked', 403);
  }

  if (!env.DB) {
    return errorResponse('unavailable', 'Database not configured', 503);
  }

  const ip = getClientIp(request);
  const rl = await checkRateLimit(env.DB, `review:${ip}`, 5, 600);
  if (rl.unavailable) {
    return errorResponse('unavailable', 'Rate limiting storage unavailable. Please try again later.', 503);
  }
  if (!rl.allowed) {
    return errorResponse('rate_limited', 'Too many reviews submitted. Please try again later.', 429);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return errorResponse('invalid', 'Invalid JSON payload', 400);
  }

  // Honeypot check for bots
  if (body.website && String(body.website).trim().length > 0) {
    return jsonResponse({ status: 'pending' });
  }

  const email = String(body.email || '').trim();
  const displayName = String(body.displayName || '').trim();
  const rating = Number(body.rating);
  const title = String(body.title || '').trim();
  const reviewBody = String(body.body || '').trim();
  const consent = Boolean(body.consent);

  // Validation
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
  if (!emailRegex.test(email) || email.length > 160) {
    return errorResponse('invalid', 'Invalid email address', 400);
  }
  if (isNaN(rating) || rating < 1 || rating > 5) {
    return errorResponse('invalid', 'Rating must be an integer between 1 and 5', 400);
  }
  if (title.length < 3 || title.length > 90) {
    return errorResponse('invalid', 'Title must be between 3 and 90 characters', 400);
  }
  if (reviewBody.length < 15 || reviewBody.length > 1200) {
    return errorResponse('invalid', 'Body must be between 15 and 1200 characters', 400);
  }
  if (!consent) {
    return errorResponse('invalid', 'Consent is required', 400);
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const safeName = displayName || (email.split('@')[0] || 'User');

  try {
    // Check duplicate recent review from same email and title
    const existing = await env.DB.prepare(
      'SELECT id FROM reviews WHERE email = ? AND title = ? LIMIT 1'
    ).bind(email, title).first();

    if (existing) {
      return errorResponse('duplicate', 'A review with this title already exists', 409);
    }

    await env.DB.prepare(
      `INSERT INTO reviews (id, email, display_name, rating, title, body, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)`
    ).bind(id, email, safeName, rating, title, reviewBody, now).run();

    return jsonResponse({ status: 'pending' }, 201);
  } catch (err) {
    console.error('Error saving review:', err);
    return errorResponse('unknown', 'Failed to submit review', 500);
  }
};


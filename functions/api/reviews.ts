import type { Env, ReviewRow } from '../_lib/types';
import { clientKey, fail, isEmail, json, methodNotAllowed, readJson, text } from '../_lib/http';
import { hashKey } from '../_lib/crypto';
import { logActivity, newId, nowIso, withinLimit } from '../_lib/db';

const REVIEW_IP_LIMIT = 5;
const REVIEW_IP_WINDOW_SECONDS = 60 * 60;
const REVIEW_EMAIL_LIMIT = 3;
const REVIEW_EMAIL_WINDOW_SECONDS = 24 * 60 * 60;
const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000;

type PublicRow = Pick<ReviewRow, 'id' | 'display_name' | 'rating' | 'title' | 'body' | 'published_at'>;

async function listApproved(env: Env): Promise<Response> {
  const { results } = await env.DB.prepare(
    `SELECT id, display_name, rating, title, body, published_at
       FROM reviews
      WHERE status = 'approved' AND published_at IS NOT NULL
      ORDER BY published_at DESC
      LIMIT 50`,
  ).all<PublicRow>();

  return json({
    reviews: results.map((row) => ({
      id: row.id,
      displayName: row.display_name,
      rating: row.rating,
      title: row.title,
      body: row.body,
      publishedAt: row.published_at,
    })),
  });
}

async function submit(env: Env, request: Request): Promise<Response> {
  const body = await readJson(request);
  if (!body) return fail('invalid', 400);

  // Off-screen honeypot: a filled field is treated as a bot and dropped quietly.
  if (text(body.website, 100).length > 0) return json({ status: 'pending' });

  const email = text(body.email, 160).toLowerCase();
  const displayName = text(body.displayName, 40) || 'Mohasabi';
  const rating = Number(body.rating);
  const title = text(body.title, 80);
  const reviewBody = text(body.body, 1200);
  const consent = body.consent === true;

  if (
    !isEmail(email) ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5 ||
    title.length < 3 ||
    reviewBody.length < 15 ||
    !consent
  ) {
    return fail('invalid', 400);
  }

  const salt = env.SESSION_SECRET ?? 'mohasabi-rate-limit';
  const ipHash = await hashKey(salt, `ip:${clientKey(request)}`);
  const emailHash = await hashKey(salt, `email:${email}`);

  const ipAllowed = await withinLimit(
    env,
    `review:ip:${ipHash}`,
    REVIEW_IP_LIMIT,
    REVIEW_IP_WINDOW_SECONDS,
  );
  const emailAllowed = await withinLimit(
    env,
    `review:email:${emailHash}`,
    REVIEW_EMAIL_LIMIT,
    REVIEW_EMAIL_WINDOW_SECONDS,
  );
  if (!ipAllowed || !emailAllowed) return fail('rate_limited', 429);

  const duplicate = await env.DB.prepare(
    'SELECT id FROM reviews WHERE email = ?1 AND body = ?2 AND created_at >= ?3 LIMIT 1',
  )
    .bind(email, reviewBody, new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString())
    .first<{ id: string }>();
  if (duplicate) return fail('duplicate', 409);

  const id = newId();
  await env.DB.prepare(
    `INSERT INTO reviews (id, email, display_name, rating, title, body, status, created_at, published_at)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, 'pending', ?7, NULL)`,
  )
    .bind(id, email, displayName, rating, title, reviewBody, nowIso())
    .run();

  await logActivity(env, 'visitor', 'review.submitted', `review ${id}`);
  return json({ status: 'pending' });
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === 'GET') return listApproved(env);
  if (request.method === 'POST') return submit(env, request);
  return methodNotAllowed(['GET', 'POST']);
};

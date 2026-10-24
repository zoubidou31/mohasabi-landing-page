import type { Env, ReviewRow } from '../../_lib/types';
import { fail, json, methodNotAllowed } from '../../_lib/http';

const STATUSES = new Set(['pending', 'approved', 'rejected']);

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET']);

  const status = new URL(request.url).searchParams.get('status') ?? 'pending';
  if (!STATUSES.has(status)) return fail('invalid', 400);

  const { results } = await env.DB.prepare(
    `SELECT id, email, display_name, rating, title, body, status, created_at
       FROM reviews
      WHERE status = ?1
      ORDER BY created_at DESC
      LIMIT 100`,
  )
    .bind(status)
    .all<ReviewRow>();

  return json({
    reviews: results.map((row) => ({
      id: row.id,
      email: row.email,
      displayName: row.display_name,
      rating: row.rating,
      title: row.title,
      body: row.body,
      status: row.status,
      createdAt: row.created_at,
    })),
  });
};

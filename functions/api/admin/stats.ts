import type { Env } from '../../_lib/types';
import { json, methodNotAllowed } from '../../_lib/http';

const count = async (env: Env, sql: string): Promise<number> => {
  const row = await env.DB.prepare(sql).first<{ n: number }>();
  return row?.n ?? 0;
};

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET']);

  const [pendingReviews, approvedReviews, unreadMessages] = await Promise.all([
    count(env, "SELECT COUNT(*) AS n FROM reviews WHERE status = 'pending'"),
    count(env, "SELECT COUNT(*) AS n FROM reviews WHERE status = 'approved'"),
    count(env, 'SELECT COUNT(*) AS n FROM support_messages WHERE read = 0'),
  ]);

  const pricing = await env.DB.prepare('SELECT MAX(updated_at) AS at FROM pricing_plans').first<{
    at: string | null;
  }>();

  return json({
    pendingReviews,
    approvedReviews,
    unreadMessages,
    pricingUpdatedAt: pricing?.at ?? null,
  });
};

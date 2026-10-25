import {
  Env,
  authenticateRequest,
  errorResponse,
  jsonResponse,
} from '../_shared';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const { authenticated } = await authenticateRequest(request, env);
  if (!authenticated) {
    return errorResponse('unauthorized', 'Admin authentication required', 401);
  }

  if (!env.DB) {
    return errorResponse('unavailable', 'Database not configured', 503);
  }

  try {
    const [pendingRes, approvedRes, unreadRes, pricingRes] = await Promise.all([
      env.DB.prepare("SELECT COUNT(*) as count FROM reviews WHERE status = 'pending'").first<{ count: number }>(),
      env.DB.prepare("SELECT COUNT(*) as count FROM reviews WHERE status = 'approved'").first<{ count: number }>(),
      env.DB.prepare("SELECT COUNT(*) as count FROM support_messages WHERE read = 0").first<{ count: number }>(),
      env.DB.prepare("SELECT MAX(updated_at) as updatedAt FROM pricing_plans").first<{ updatedAt: string | null }>(),
    ]);

    return jsonResponse({
      pendingReviews: pendingRes?.count ?? 0,
      approvedReviews: approvedRes?.count ?? 0,
      unreadMessages: unreadRes?.count ?? 0,
      pricingUpdatedAt: pricingRes?.updatedAt ?? null,
    });
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    return errorResponse('unknown', 'Failed to retrieve stats', 500);
  }
};

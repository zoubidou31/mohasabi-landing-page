import {
  Env,
  authenticateRequest,
  errorResponse,
  jsonResponse,
} from '../../_shared';

interface AdminReviewRow {
  id: string;
  email: string;
  displayName: string;
  rating: number;
  title: string;
  body: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const { authenticated } = await authenticateRequest(request, env);
  if (!authenticated) {
    return errorResponse('unauthorized', 'Admin authentication required', 401);
  }

  if (!env.DB) {
    return errorResponse('unavailable', 'Database not configured', 503);
  }

  const url = new URL(request.url);
  const statusParam = url.searchParams.get('status') || 'pending';
  const status = ['pending', 'approved', 'rejected'].includes(statusParam) ? statusParam : 'pending';

  try {
    const { results } = await env.DB.prepare(
      `SELECT id, email, display_name as displayName, rating, title, body, status, created_at as createdAt
       FROM reviews
       WHERE status = ?
       ORDER BY created_at DESC
       LIMIT 100`
    ).bind(status).all<AdminReviewRow>();

    return jsonResponse({ reviews: results || [] });
  } catch (err) {
    console.error('Error fetching admin reviews:', err);
    return errorResponse('unknown', 'Failed to retrieve reviews', 500);
  }
};


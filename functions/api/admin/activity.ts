import {
  Env,
  authenticateRequest,
  errorResponse,
  jsonResponse,
} from '../_shared';

interface ActivityEntry {
  id: string;
  at: string;
  actor: string;
  action: string;
  detail: string;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const { authenticated } = await authenticateRequest(request, env);
  if (!authenticated) {
    return errorResponse('unauthorized', 'Admin authentication required', 401);
  }

  if (!env.DB) {
    return errorResponse('unavailable', 'Database not configured', 503);
  }

  try {
    const { results } = await env.DB.prepare(
      `SELECT id, at, actor, action, detail
       FROM admin_activity
       ORDER BY at DESC
       LIMIT 50`
    ).all<ActivityEntry>();

    return jsonResponse({ entries: results || [] });
  } catch (err) {
    try {
      const { results } = await env.DB.prepare(
        `SELECT id, created_at as at, actor, action, detail
         FROM audit_log
         ORDER BY created_at DESC
         LIMIT 50`
      ).all<ActivityEntry>();

      return jsonResponse({ entries: results || [] });
    } catch {
      console.error('Error fetching activity log:', err);
      return errorResponse('unknown', 'Failed to retrieve activity log', 500);
    }
  }
};


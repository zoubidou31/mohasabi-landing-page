import {
  Env,
  authenticateRequest,
  errorResponse,
  jsonResponse,
} from '../../_shared';

interface AdminMessageRow {
  id: string;
  name: string;
  email: string;
  topic: string;
  version: string;
  message: string;
  read: boolean;
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

  try {
    const { results } = await env.DB.prepare(
      `SELECT id, name, email, topic, version, message, CASE WHEN read = 1 THEN 1 ELSE 0 END as read, created_at as createdAt
       FROM support_messages
       ORDER BY read ASC, created_at DESC
       LIMIT 100`
    ).all<any>();

    const messages: AdminMessageRow[] = (results || []).map((r) => ({
      ...r,
      read: Boolean(r.read),
    }));

    return jsonResponse({ messages });
  } catch (err) {
    console.error('Error fetching admin messages:', err);
    return errorResponse('unknown', 'Failed to retrieve messages', 500);
  }
};

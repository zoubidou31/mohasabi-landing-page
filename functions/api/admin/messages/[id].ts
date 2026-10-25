import {
  Env,
  authenticateRequest,
  checkOrigin,
  errorResponse,
  jsonResponse,
  recordAudit,
} from '../../_shared';

export const onRequestPatch: PagesFunction<Env> = async ({ request, env, params }) => {
  if (!checkOrigin(request)) {
    return errorResponse('unauthorized', 'Cross-origin request blocked', 403);
  }

  const { authenticated } = await authenticateRequest(request, env);
  if (!authenticated) {
    return errorResponse('unauthorized', 'Admin authentication required', 401);
  }

  if (!env.DB) {
    return errorResponse('unavailable', 'Database not configured', 503);
  }

  const id = String(params.id || '');
  if (!id) {
    return errorResponse('invalid', 'Message ID required', 400);
  }

  let body: any = {};
  try {
    body = await request.json();
  } catch {
    // empty body is fine if action is just mark read
  }

  const readVal = body.read === false ? 0 : 1;

  try {
    await env.DB.prepare('UPDATE support_messages SET read = ? WHERE id = ?')
      .bind(readVal, id)
      .run();

    await recordAudit(
      env.DB,
      'admin',
      readVal === 1 ? 'message_read' : 'message_unread',
      `Support message ${id} marked as ${readVal === 1 ? 'read' : 'unread'}`
    );

    return jsonResponse({ ok: true, id, read: Boolean(readVal) });
  } catch (err) {
    console.error('Error updating message status:', err);
    return errorResponse('unknown', 'Failed to update message', 500);
  }
};


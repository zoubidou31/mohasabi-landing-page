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
    return errorResponse('invalid', 'Review ID required', 400);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return errorResponse('invalid', 'Invalid JSON payload', 400);
  }

  const action = body.action;
  if (action !== 'approve' && action !== 'reject') {
    return errorResponse('invalid', 'Action must be approve or reject', 400);
  }

  const newStatus = action === 'approve' ? 'approved' : 'rejected';

  try {
    await env.DB.prepare('UPDATE reviews SET status = ? WHERE id = ?')
      .bind(newStatus, id)
      .run();

    await recordAudit(
      env.DB,
      'admin',
      `review_${newStatus}`,
      `Review ${id} was ${newStatus}`
    );

    return jsonResponse({ ok: true, id, status: newStatus });
  } catch (err) {
    console.error('Error deciding review:', err);
    return errorResponse('unknown', 'Failed to update review', 500);
  }
};

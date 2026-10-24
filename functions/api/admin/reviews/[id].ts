import type { Env } from '../../../_lib/types';
import { fail, json, methodNotAllowed, readJson } from '../../../_lib/http';
import { logActivity, nowIso } from '../../../_lib/db';

export const onRequest: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  if (request.method !== 'PATCH') return methodNotAllowed(['PATCH']);

  const id = typeof params.id === 'string' ? params.id : '';
  if (id.length === 0 || id.length > 64) return fail('invalid', 400);

  const body = await readJson(request);
  const action = body?.action;
  if (action !== 'approve' && action !== 'reject') return fail('invalid', 400);

  const result =
    action === 'approve'
      ? await env.DB.prepare(
          "UPDATE reviews SET status = 'approved', published_at = COALESCE(published_at, ?2) WHERE id = ?1",
        )
          .bind(id, nowIso())
          .run()
      : await env.DB.prepare("UPDATE reviews SET status = 'rejected', published_at = NULL WHERE id = ?1")
          .bind(id)
          .run();

  if (result.meta.changes === 0) return fail('invalid', 400);

  await logActivity(env, 'admin', action === 'approve' ? 'review.approved' : 'review.rejected', `review ${id}`);
  return json({ ok: true });
};

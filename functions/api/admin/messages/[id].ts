import type { Env } from '../../../_lib/types';
import { fail, json, methodNotAllowed, readJson } from '../../../_lib/http';
import { logActivity } from '../../../_lib/db';

export const onRequest: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  if (request.method !== 'PATCH') return methodNotAllowed(['PATCH']);

  const id = typeof params.id === 'string' ? params.id : '';
  if (id.length === 0 || id.length > 64) return fail('invalid', 400);

  const body = await readJson(request);
  if (body?.read !== true) return fail('invalid', 400);

  const result = await env.DB.prepare('UPDATE support_messages SET read = 1 WHERE id = ?1')
    .bind(id)
    .run();
  if (result.meta.changes === 0) return fail('invalid', 400);

  await logActivity(env, 'admin', 'support.read', `message ${id}`);
  return json({ ok: true });
};

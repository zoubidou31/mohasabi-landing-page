import type { ActivityRow, Env } from '../../_lib/types';
import { json, methodNotAllowed } from '../../_lib/http';

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET']);

  const { results } = await env.DB.prepare(
    'SELECT id, at, actor, action, detail FROM admin_activity ORDER BY at DESC LIMIT 100',
  ).all<ActivityRow>();

  return json({ entries: results });
};

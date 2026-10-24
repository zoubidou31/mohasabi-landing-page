import type { Env } from '../_lib/types';
import { json, methodNotAllowed, readCookie, serializeCookie } from '../_lib/http';
import { SESSION_COOKIE, verifySession } from '../_lib/crypto';
import { logActivity } from '../_lib/db';

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST']);

  const wasAdmin =
    env.SESSION_SECRET !== undefined &&
    (await verifySession(env.SESSION_SECRET, readCookie(request, SESSION_COOKIE)));
  if (wasAdmin) await logActivity(env, 'admin', 'logout', 'session cookie cleared');

  return json({ ok: true }, 200, {
    'set-cookie': serializeCookie(SESSION_COOKIE, '', 0),
  });
};

import type { Env } from '../_lib/types';
import { json, methodNotAllowed, readCookie } from '../_lib/http';
import { SESSION_COOKIE, verifySession } from '../_lib/crypto';

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET']);
  if (!env.SESSION_SECRET) return json({ error: 'unavailable' }, 501);

  const admin = await verifySession(env.SESSION_SECRET, readCookie(request, SESSION_COOKIE));
  return json(admin ? { admin: true, user: 'admin' } : { admin: false, user: null });
};

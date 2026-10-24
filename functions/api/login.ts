import type { Env } from '../_lib/types';
import { clientKey, fail, json, methodNotAllowed, readJson, serializeCookie, text } from '../_lib/http';
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createSession,
  hashKey,
  passwordMatches,
} from '../_lib/crypto';
import { logActivity, withinLimit } from '../_lib/db';

const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_SECONDS = 15 * 60;

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST']);
  if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET) return json({ error: 'unavailable' }, 501);

  const body = await readJson(request);
  const password = text(body?.password, 200);
  if (!password) return fail('invalid', 400);

  const ipHash = await hashKey(env.SESSION_SECRET, `ip:${clientKey(request)}`);
  const shortIp = ipHash.slice(0, 12);

  if (!(await withinLimit(env, `login:${ipHash}`, LOGIN_LIMIT, LOGIN_WINDOW_SECONDS))) {
    await logActivity(env, 'anonymous', 'login.blocked', `rate limit, ip ${shortIp}`);
    return fail('rate_limited', 429);
  }

  if (!(await passwordMatches(password, env.ADMIN_PASSWORD))) {
    await logActivity(env, 'anonymous', 'login.failed', `ip ${shortIp}`);
    return fail('unauthorized', 401);
  }

  const token = await createSession(env.SESSION_SECRET);
  await logActivity(env, 'admin', 'login.ok', `ip ${shortIp}`);
  return json({ admin: true, user: 'admin' }, 200, {
    'set-cookie': serializeCookie(SESSION_COOKIE, token, SESSION_TTL_SECONDS),
  });
};

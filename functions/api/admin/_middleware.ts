import type { Env } from '../../_lib/types';
import { fail, readCookie } from '../../_lib/http';
import { SESSION_COOKIE, verifySession } from '../../_lib/crypto';

/**
 * Server-side authorization for the whole admin surface. Every request is
 * re-verified here; hiding the /admin route is never treated as protection.
 */
export const onRequest: PagesFunction<Env> = async ({ request, env, next }) => {
  if (!env.SESSION_SECRET) return fail('unavailable', 501);

  const authorized = await verifySession(env.SESSION_SECRET, readCookie(request, SESSION_COOKIE));
  if (!authorized) return fail('unauthorized', 401);

  const response = await next();
  const headers = new Headers(response.headers);
  headers.set('cache-control', 'no-store');
  headers.set('x-robots-tag', 'noindex, nofollow');
  return new Response(response.body, { status: response.status, headers });
};

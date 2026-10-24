import type { Env } from '../_lib/types';
import { crossOriginRejected, fail } from '../_lib/http';

/**
 * Applies to every /api route. Nothing mutating is accepted without a matching
 * Origin and a JSON body, and no API response is cacheable.
 */
export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, next } = context;
  const mutating = request.method !== 'GET' && request.method !== 'HEAD';

  if (mutating) {
    if (crossOriginRejected(request)) return fail('unauthorized', 403);
    const type = request.headers.get('content-type') ?? '';
    if (!type.includes('application/json')) return fail('invalid', 415);
  }

  let response: Response;
  try {
    response = await next();
  } catch (error) {
    console.error('api.handler.failed', request.method, new URL(request.url).pathname, error);
    return fail('unknown', 500);
  }

  const headers = new Headers(response.headers);
  headers.set('x-content-type-options', 'nosniff');
  headers.set('referrer-policy', 'same-origin');
  headers.set('cache-control', 'no-store');
  return new Response(response.body, { status: response.status, headers });
};

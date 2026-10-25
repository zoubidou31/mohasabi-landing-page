import {
  Env,
  authenticateRequest,
  jsonResponse,
} from './_shared';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const { authenticated, user } = await authenticateRequest(request, env);
  return jsonResponse({
    admin: authenticated,
    user: authenticated ? user || 'admin' : 'anonymous',
  });
};

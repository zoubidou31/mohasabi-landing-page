import {
  Env,
  checkOrigin,
  jsonResponse,
} from './_shared';

export const onRequestPost: PagesFunction<Env> = async ({ request }) => {
  checkOrigin(request);
  const cookie = 'mohasabi_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
  return jsonResponse({ ok: true }, 200, { 'Set-Cookie': cookie });
};

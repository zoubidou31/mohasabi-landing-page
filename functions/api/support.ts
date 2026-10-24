import type { Env } from '../_lib/types';
import { clientKey, fail, isEmail, json, methodNotAllowed, readJson, text } from '../_lib/http';
import { hashKey } from '../_lib/crypto';
import { logActivity, newId, nowIso, withinLimit } from '../_lib/db';

const TOPICS = new Set(['install', 'activation', 'duration', 'renewal', 'purchase', 'other']);
const SUPPORT_IP_LIMIT = 5;
const SUPPORT_IP_WINDOW_SECONDS = 60 * 60;
const DUPLICATE_WINDOW_MS = 60 * 60 * 1000;

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST']);

  const body = await readJson(request);
  if (!body) return fail('invalid', 400);

  if (text(body.website, 100).length > 0) return json({ status: 'queued' });

  const name = text(body.name, 80);
  const email = text(body.email, 160).toLowerCase();
  const topic = text(body.topic, 20);
  const version = text(body.version, 20);
  const message = text(body.message, 2000);

  if (
    name.length < 2 ||
    !isEmail(email) ||
    !TOPICS.has(topic) ||
    message.length < 20
  ) {
    return fail('invalid', 400);
  }

  const salt = env.SESSION_SECRET ?? 'mohasabi-rate-limit';
  const ipHash = await hashKey(salt, `ip:${clientKey(request)}`);
  if (
    !(await withinLimit(env, `support:ip:${ipHash}`, SUPPORT_IP_LIMIT, SUPPORT_IP_WINDOW_SECONDS))
  ) {
    return fail('rate_limited', 429);
  }

  const duplicate = await env.DB.prepare(
    'SELECT id FROM support_messages WHERE email = ?1 AND message = ?2 AND created_at >= ?3 LIMIT 1',
  )
    .bind(email, message, new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString())
    .first<{ id: string }>();
  if (duplicate) return fail('duplicate', 409);

  const id = newId();
  await env.DB.prepare(
    `INSERT INTO support_messages (id, name, email, topic, version, message, read, created_at)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, 0, ?7)`,
  )
    .bind(id, name, email, topic, version, message, nowIso())
    .run();

  await logActivity(env, 'visitor', 'support.submitted', `message ${id} (${topic})`);
  return json({ status: 'queued' });
};

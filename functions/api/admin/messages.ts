import type { Env, SupportRow } from '../../_lib/types';
import { json, methodNotAllowed } from '../../_lib/http';

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET']);

  const { results } = await env.DB.prepare(
    `SELECT id, name, email, topic, version, message, read, created_at
       FROM support_messages
      ORDER BY created_at DESC
      LIMIT 100`,
  ).all<SupportRow>();

  return json({
    messages: results.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      topic: row.topic,
      version: row.version,
      message: row.message,
      read: row.read === 1,
      createdAt: row.created_at,
    })),
  });
};

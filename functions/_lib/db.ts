import type { Env } from './types';

export const newId = (): string => crypto.randomUUID();

export const nowIso = (): string => new Date().toISOString();

/**
 * Sliding-window counter in D1. Returns false once the caller exceeded `limit`
 * inside the current window. Buckets are pre-hashed by the caller so no raw IP
 * or email is ever stored here.
 */
export async function withinLimit(
  env: Env,
  bucket: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  const windowStart = Math.floor(Date.now() / 1000 / windowSeconds) * windowSeconds;
  const row = await env.DB.prepare(
    `INSERT INTO rate_limits (bucket, window_start, count) VALUES (?1, ?2, 1)
     ON CONFLICT(bucket) DO UPDATE SET
       count = CASE WHEN excluded.window_start > rate_limits.window_start THEN 1 ELSE rate_limits.count + 1 END,
       window_start = CASE WHEN excluded.window_start > rate_limits.window_start THEN excluded.window_start ELSE rate_limits.window_start END
     RETURNING count AS count`,
  )
    .bind(bucket, windowStart)
    .first<{ count: number }>();
  return row !== null && row.count <= limit;
}

export async function logActivity(
  env: Env,
  actor: string,
  action: string,
  detail: string,
): Promise<void> {
  await env.DB.prepare(
    'INSERT INTO admin_activity (id, at, actor, action, detail) VALUES (?1, ?2, ?3, ?4, ?5)',
  )
    .bind(newId(), nowIso(), actor, action, detail.slice(0, 300))
    .run();
}

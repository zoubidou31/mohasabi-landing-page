import {
  Env,
  authenticateRequest,
  checkOrigin,
  errorResponse,
  jsonResponse,
  recordAudit,
} from '../_shared';

interface PlanPayload {
  id: string;
  name: string;
  month: number;
  quarter: number;
  halfYear: number;
  year: number;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const { authenticated } = await authenticateRequest(request, env);
  if (!authenticated) {
    return errorResponse('unauthorized', 'Admin authentication required', 401);
  }

  if (!env.DB) {
    return errorResponse('unavailable', 'Database not configured', 503);
  }

  try {
    const { results } = await env.DB.prepare(
      `SELECT id, name, month, quarter, half_year as halfYear, year
       FROM pricing_plans
       ORDER BY CASE id
         WHEN 'standard' THEN 1
         WHEN 'pro' THEN 2
         WHEN 'enterprise' THEN 3
         ELSE 4
       END`
    ).all<PlanPayload>();

    const maxUpdated = await env.DB.prepare('SELECT MAX(updated_at) as updatedAt FROM pricing_plans').first<{ updatedAt: string | null }>();

    return jsonResponse({
      plans: results || [],
      updatedAt: maxUpdated?.updatedAt ?? null,
    });
  } catch (err) {
    console.error('Error fetching admin pricing:', err);
    return errorResponse('unknown', 'Failed to retrieve pricing', 500);
  }
};

export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  if (!checkOrigin(request)) {
    return errorResponse('unauthorized', 'Cross-origin request blocked', 403);
  }

  const { authenticated } = await authenticateRequest(request, env);
  if (!authenticated) {
    return errorResponse('unauthorized', 'Admin authentication required', 401);
  }

  if (!env.DB) {
    return errorResponse('unavailable', 'Database not configured', 503);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return errorResponse('invalid', 'Invalid JSON payload', 400);
  }

  const plans = body.plans as PlanPayload[];
  const note = String(body.note || '').trim();

  if (!Array.isArray(plans) || plans.length === 0) {
    return errorResponse('invalid', 'Plans array is required', 400);
  }

  for (const plan of plans) {
    if (!plan.id || typeof plan.month !== 'number' || plan.month < 0 ||
        typeof plan.quarter !== 'number' || plan.quarter < 0 ||
        typeof plan.halfYear !== 'number' || plan.halfYear < 0 ||
        typeof plan.year !== 'number' || plan.year < 0) {
      return errorResponse('invalid', `Invalid price values for plan ${plan.id}`, 400);
    }
  }

  const now = new Date().toISOString();

  try {
    const stmts = plans.map((plan) =>
      env.DB!.prepare(
        `UPDATE pricing_plans
            SET name = ?2, month = ?3, quarter = ?4, half_year = ?5, year = ?6, updated_at = ?7
          WHERE id = ?1`
      ).bind(plan.id, plan.name, plan.month, plan.quarter, plan.halfYear, plan.year, now)
    );

    await env.DB!.batch(stmts);

    try {
      await env.DB!.prepare(
        'INSERT INTO pricing_changes (id, at, actor, note, snapshot) VALUES (?, ?, ?, ?, ?)'
      ).bind(crypto.randomUUID(), now, 'admin', note || 'table updated', JSON.stringify(plans)).run();
    } catch {
      // Gracefully ignore if pricing_changes table does not exist
    }

    await recordAudit(
      env.DB,
      'admin',
      'pricing_updated',
      `Updated ${plans.length} pricing plans. Note: ${note || 'None'}`
    );

    return jsonResponse({ ok: true, updatedAt: now });
  } catch (err) {
    console.error('Error updating pricing:', err);
    return errorResponse('unknown', 'Failed to save pricing', 500);
  }
};


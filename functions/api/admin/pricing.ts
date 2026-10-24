import type { Env, PricingRow } from '../../_lib/types';
import { fail, json, methodNotAllowed, readJson, text } from '../../_lib/http';
import { logActivity, newId, nowIso } from '../../_lib/db';

const PLAN_IDS = ['standard', 'pro', 'enterprise'] as const;
const MAX_AMOUNT = 10_000_000;

interface Draft {
  id: string;
  name: string;
  month: number;
  quarter: number;
  halfYear: number;
  year: number;
}

function parseDraft(value: unknown): Draft | null {
  if (typeof value !== 'object' || value === null) return null;
  const row = value as Record<string, unknown>;
  const id = typeof row.id === 'string' ? row.id : '';
  const name = text(row.name, 40);
  const amounts = [row.month, row.quarter, row.halfYear, row.year];

  if (!PLAN_IDS.includes(id as (typeof PLAN_IDS)[number]) || name.length === 0) return null;

  const amountsAreValid = amounts.every(
    (amount) => Number.isInteger(amount) && (amount as number) > 0 && (amount as number) <= MAX_AMOUNT,
  );
  if (!amountsAreValid) return null;

  return {
    id,
    name,
    month: amounts[0] as number,
    quarter: amounts[1] as number,
    halfYear: amounts[2] as number,
    year: amounts[3] as number,
  };
}

async function readPlans(env: Env): Promise<Response> {
  const { results } = await env.DB.prepare(
    'SELECT id, name, month, quarter, half_year, year, updated_at FROM pricing_plans ORDER BY month ASC',
  ).all<PricingRow>();

  return json({
    plans: results.map((row) => ({
      id: row.id,
      name: row.name,
      month: row.month,
      quarter: row.quarter,
      halfYear: row.half_year,
      year: row.year,
    })),
    updatedAt: results.reduce<string | null>(
      (latest, row) => (latest === null || row.updated_at > latest ? row.updated_at : latest),
      null,
    ),
  });
}

async function savePlans(env: Env, request: Request): Promise<Response> {
  const body = await readJson(request);
  if (!body || !Array.isArray(body.plans)) return fail('invalid', 400);

  const drafts = body.plans.map(parseDraft);
  if (drafts.some((draft) => draft === null)) return fail('invalid', 400);
  const plans = drafts as Draft[];

  const ids = new Set(plans.map((plan) => plan.id));
  if (ids.size !== PLAN_IDS.length || !PLAN_IDS.every((id) => ids.has(id))) return fail('invalid', 400);

  const at = nowIso();
  await env.DB.batch(
    plans.map((plan) =>
      env.DB.prepare(
        `UPDATE pricing_plans
            SET name = ?2, month = ?3, quarter = ?4, half_year = ?5, year = ?6, updated_at = ?7
          WHERE id = ?1`,
      ).bind(plan.id, plan.name, plan.month, plan.quarter, plan.halfYear, plan.year, at),
    ),
  );

  const note = text(body.note, 300);
  await env.DB.prepare(
    'INSERT INTO pricing_changes (id, at, actor, note, snapshot) VALUES (?1, ?2, ?3, ?4, ?5)',
  )
    .bind(newId(), at, 'admin', note, JSON.stringify(plans))
    .run();
  await logActivity(env, 'admin', 'pricing.updated', note || 'table updated');

  return json({ ok: true, updatedAt: at });
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === 'GET') return readPlans(env);
  if (request.method === 'PUT') return savePlans(env, request);
  return methodNotAllowed(['GET', 'PUT']);
};

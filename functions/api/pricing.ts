import type { Env, PricingRow } from '../_lib/types';
import { json, methodNotAllowed } from '../_lib/http';

/**
 * Public, read-only view of the indicative price table. Amounts are DZD and
 * remain subject to the owner's commercial terms.
 */
export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET']);

  const { results } = await env.DB.prepare(
    'SELECT id, name, month, quarter, half_year, year, updated_at FROM pricing_plans ORDER BY month ASC',
  ).all<PricingRow>();

  return json({
    currency: 'DZD',
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
};

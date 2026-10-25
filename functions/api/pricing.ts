import { Env, errorResponse, jsonResponse } from './_shared';

interface PlanRow {
  id: string;
  name: string;
  month: number;
  quarter: number;
  halfYear: number;
  year: number;
  updatedAt: string;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.DB) {
    return errorResponse('unavailable', 'Database not configured', 503);
  }

  try {
    const { results } = await env.DB.prepare(
      'SELECT id, name, month, quarter, half_year as halfYear, year, updated_at as updatedAt FROM pricing_plans ORDER BY month ASC'
    ).all<PlanRow>();

    const maxUpdated = await env.DB.prepare(
      'SELECT MAX(updated_at) as updatedAt FROM pricing_plans'
    ).first<{ updatedAt: string | null }>();

    return jsonResponse({
      currency: 'DZD',
      plans: results || [],
      updatedAt: maxUpdated?.updatedAt ?? null,
    });
  } catch (err) {
    console.error('Error fetching public pricing:', err);
    return errorResponse('unknown', 'Failed to retrieve pricing', 500);
  }
};

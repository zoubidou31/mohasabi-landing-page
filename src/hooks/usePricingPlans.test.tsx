import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { usePricingPlans } from './usePricingPlans';
import { siteConfig } from '../config/siteConfig';
import type { PricingPlanRow } from '../services/api';

const jsonResponse = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const stubFetch = (impl: () => Promise<Response>) => {
  const mock = vi.fn(impl);
  vi.stubGlobal('fetch', mock);
  return mock;
};

const rows: PricingPlanRow[] = [
  { id: 'standard', name: 'Standard', month: 1600, quarter: 3600, halfYear: 6600, year: 12000 },
  { id: 'pro', name: 'Pro', month: 3100, quarter: 7600, halfYear: 13600, year: 25000 },
  { id: 'enterprise', name: 'Enterprise', month: 5600, quarter: 13100, halfYear: 24100, year: 45000 },
];

const approved = (id: string) => {
  const plan = siteConfig.pricing.plans.find((entry) => entry.id === id);
  if (!plan) throw new Error(`missing approved plan ${id}`);
  return plan.prices;
};

afterEach(() => {
  window.history.replaceState({}, '', '/');
});

describe('usePricingPlans', () => {
  it('starts from the owner-approved table before any API answer', () => {
    stubFetch(() => new Promise<Response>(() => {}));
    const { result } = renderHook(() => usePricingPlans());
    expect(result.current.map((plan) => plan.prices)).toEqual([
      approved('standard'),
      approved('pro'),
      approved('enterprise'),
    ]);
  });

  it('applies the three plans returned by the server', async () => {
    const fetchMock = stubFetch(async () =>
      jsonResponse({ currency: 'DZD', plans: rows, updatedAt: null }),
    );
    const { result } = renderHook(() => usePricingPlans());

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('/api/pricing', expect.anything()));
    await waitFor(() =>
      expect(result.current.find((plan) => plan.id === 'pro')?.prices.month).toBe(3100),
    );
    expect(result.current.map((plan) => plan.prices)).toEqual(
      rows.map(({ month, quarter, halfYear, year }) => ({ month, quarter, halfYear, year })),
    );
  });

  it('keeps the approved table when the API is unavailable', async () => {
    const fetchMock = stubFetch(async () => jsonResponse({ error: 'unauthorized' }, 501));
    const { result } = renderHook(() => usePricingPlans());

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await act(async () => {});
    expect(result.current.find((plan) => plan.id === 'standard')?.prices.month).toBe(1500);
    expect(result.current.find((plan) => plan.id === 'pro')?.prices.year).toBe(25000);
    expect(result.current.find((plan) => plan.id === 'enterprise')?.prices.halfYear).toBe(24000);
  });

  it('rejects invalid or negative prices without partially updating the table', async () => {
    stubFetch(async () =>
      jsonResponse({
        currency: 'DZD',
        plans: [{ ...rows[0], month: -1500 }, rows[1], rows[2]],
        updatedAt: null,
      }),
    );
    const { result } = renderHook(() => usePricingPlans());

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    await act(async () => {});
    expect(result.current.find((plan) => plan.id === 'standard')?.prices.month).toBe(1500);
    expect(result.current.find((plan) => plan.id === 'pro')?.prices.month).toBe(3000);
  });

  it('replaces only the plans present in the payload', async () => {
    stubFetch(async () =>
      jsonResponse({ currency: 'DZD', plans: [rows[0]], updatedAt: null }),
    );
    const { result } = renderHook(() => usePricingPlans());

    await waitFor(() =>
      expect(result.current.find((plan) => plan.id === 'standard')?.prices.month).toBe(1600),
    );
    expect(result.current.find((plan) => plan.id === 'pro')?.prices.month).toBe(3000);
    expect(result.current.find((plan) => plan.id === 'enterprise')?.prices.month).toBe(5500);
  });
});

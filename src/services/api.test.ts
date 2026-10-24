import { describe, expect, it, vi } from 'vitest';
import { api, type PricingPlanRow } from './api';

const jsonResponse = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const htmlResponse = (status = 200): Response =>
  new Response('<!doctype html><html><body>app</body></html>', {
    status,
    headers: { 'content-type': 'text/html' },
  });

const stubFetch = (impl: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) => {
  const mock = vi.fn(impl);
  vi.stubGlobal('fetch', mock);
  return mock;
};

const validPlans: PricingPlanRow[] = [
  { id: 'standard', name: 'Standard', month: 1500, quarter: 3500, halfYear: 6500, year: 12000 },
  { id: 'pro', name: 'Pro', month: 3000, quarter: 7500, halfYear: 13500, year: 25000 },
  { id: 'enterprise', name: 'Enterprise', month: 5500, quarter: 13000, halfYear: 24000, year: 45000 },
];

describe('api session', () => {
  it('accepts a JSON session payload', async () => {
    stubFetch(async () => jsonResponse({ admin: true, user: 'admin' }));
    await expect(api.session()).resolves.toEqual({ kind: 'ok', data: { admin: true, user: 'admin' } });
  });

  it('never treats an SPA HTML fallback as success', async () => {
    stubFetch(async () => htmlResponse(200));
    await expect(api.session()).resolves.toEqual({ kind: 'unavailable', status: 200 });
  });

  it('rejects a JSON payload without a boolean admin flag', async () => {
    stubFetch(async () => jsonResponse({ admin: 'yes' }));
    await expect(api.session()).resolves.toEqual({ kind: 'unavailable', status: 200 });
  });

  it('reports a network failure as unavailable', async () => {
    stubFetch(async () => {
      throw new TypeError('Failed to fetch');
    });
    await expect(api.session()).resolves.toEqual({ kind: 'unavailable', status: 0 });
  });

  it('maps 401 and 403 to unauthorized', async () => {
    stubFetch(async () => jsonResponse({ error: 'unauthorized' }, 401));
    await expect(api.admin.stats()).resolves.toEqual({
      kind: 'rejected',
      error: { code: 'unauthorized', message: undefined },
    });

    stubFetch(async () => jsonResponse({ error: 'unauthorized' }, 403));
    const result = await api.login('x');
    expect(result.kind).toBe('rejected');
    if (result.kind === 'rejected') expect(result.error.code).toBe('unauthorized');
  });

  it('maps rate limiting from 429', async () => {
    stubFetch(async () => jsonResponse({ error: 'rate_limited' }, 429));
    const result = await api.login('x');
    expect(result.kind).toBe('rejected');
    if (result.kind === 'rejected') expect(result.error.code).toBe('rate_limited');
  });

  it('treats 501/404/405 as unavailable, not as an error message', async () => {
    for (const status of [501, 404, 405]) {
      stubFetch(async () => jsonResponse({ error: 'invalid' }, status));
      await expect(api.listReviews()).resolves.toEqual({ kind: 'unavailable', status });
    }
  });

  it('keeps an unexpected server error generic', async () => {
    stubFetch(async () => new Response('boom', { status: 500, headers: { 'content-type': 'text/plain' } }));
    await expect(api.listReviews()).resolves.toEqual({
      kind: 'rejected',
      error: { code: 'unknown', message: undefined },
    });
  });
});

describe('api public data guards', () => {
  it('requires a reviews array', async () => {
    stubFetch(async () => jsonResponse({ reviews: [] }));
    await expect(api.listReviews()).resolves.toEqual({ kind: 'ok', data: { reviews: [] } });

    stubFetch(async () => jsonResponse({ items: [] }));
    await expect(api.listReviews()).resolves.toEqual({ kind: 'unavailable', status: 200 });
  });

  it('accepts only positive integer prices for every duration', async () => {
    stubFetch(async () => jsonResponse({ currency: 'DZD', plans: validPlans, updatedAt: null }));
    const ok = await api.pricing();
    expect(ok.kind).toBe('ok');

    const invalidRows = [
      [{ ...validPlans[0], month: -1 }],
      [{ ...validPlans[0], year: 0 }],
      [{ ...validPlans[0], quarter: 12.5 }],
      [{ ...validPlans[0], name: 42 }],
    ];
    for (const plans of invalidRows) {
      stubFetch(async () => jsonResponse({ currency: 'DZD', plans, updatedAt: null }));
      await expect(api.pricing()).resolves.toEqual({ kind: 'unavailable', status: 200 });
    }
  });

  it('accepts queued/pending acknowledgements from both forms', async () => {
    stubFetch(async () => jsonResponse({ status: 'pending' }));
    const review = await api.submitReview({
      email: 'a@example.com',
      displayName: 'A',
      rating: 5,
      title: 'Good',
      body: 'A sufficiently long body.',
      consent: true,
      website: '',
    });
    expect(review.kind).toBe('ok');

    stubFetch(async () => jsonResponse({ status: 'queued' }));
    const support = await api.submitSupport({
      name: 'A',
      email: 'a@example.com',
      topic: 'other',
      version: '',
      message: 'A sufficiently long support message.',
      website: '',
    });
    expect(support.kind).toBe('ok');
  });

  it('keeps only the declared error fields and drops the rest of the payload', async () => {
    stubFetch(async () => jsonResponse({ error: 'invalid', message: 'Check the form.', stack: '/srv/secret.ts' }, 400));
    const result = await api.submitSupport({
      name: 'A',
      email: 'a@example.com',
      topic: 'other',
      version: '',
      message: 'Message long enough to pass the guard.',
      website: '',
    });
    expect(result).toEqual({ kind: 'rejected', error: { code: 'invalid', message: 'Check the form.' } });
  });
});

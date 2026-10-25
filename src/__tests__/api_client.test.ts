import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { api } from '../services/api';

describe('API Client & Safe Host Handling', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('correctly handles successful JSON review response', async () => {
    const mockReviews = [
      {
        id: 'rev-1',
        displayName: 'Ahmed',
        rating: 5,
        title: 'Excellent software',
        body: 'Very reliable offline accounting on Windows.',
        publishedAt: '2026-10-20T10:00:00Z',
      },
    ];

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ reviews: mockReviews }),
    } as Response);

    const result = await api.listReviews();
    expect(result.kind).toBe('ok');
    if (result.kind === 'ok') {
      expect(result.data.reviews).toHaveLength(1);
      expect(result.data.reviews[0].displayName).toBe('Ahmed');
    }
  });

  it('detects SPA HTML rewrite fallback and flags API as unavailable (does not crash)', async () => {
    // When Cloudflare Pages functions are not deployed, /* rewrite returns index.html with 200 text/html
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'text/html; charset=UTF-8' }),
      text: async () => '<!doctype html><html>...</html>',
    } as Response);

    const result = await api.listReviews();
    expect(result.kind).toBe('unavailable');
  });

  it('correctly handles 401 unauthorized response from admin endpoints', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ error: 'unauthorized', message: 'Admin session required' }),
    } as Response);

    const result = await api.admin.stats();
    expect(result.kind).toBe('rejected');
    if (result.kind === 'rejected') {
      expect(result.error.code).toBe('unauthorized');
    }
  });

  it('correctly handles 429 rate limit response on review submission', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ error: 'rate_limited', message: 'Too many requests' }),
    } as Response);

    const result = await api.submitReview({
      email: 'test@example.com',
      displayName: 'User',
      rating: 5,
      title: 'Review title',
      body: 'Long enough review text here',
      consent: true,
      website: '',
    });

    expect(result.kind).toBe('rejected');
    if (result.kind === 'rejected') {
      expect(result.error.code).toBe('rate_limited');
    }
  });

  it('handles network failure gracefully without throwing unhandled exceptions', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Failed to fetch'));

    const result = await api.session();
    expect(result.kind).toBe('unavailable');
    if (result.kind === 'unavailable') {
      expect(result.status).toBe(0);
    }
  });
});


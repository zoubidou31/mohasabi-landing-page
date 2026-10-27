export type ApiResult<T> =
  | { kind: 'ok'; data: T }
  | { kind: 'rejected'; error: ApiError }
  | { kind: 'unavailable'; status: number };

export interface ApiError {
  code: 'invalid' | 'duplicate' | 'rate_limited' | 'unauthorized' | 'unknown';
  message?: string;
}

export interface PublicReview {
  id: string;
  displayName: string;
  rating: number;
  title: string;
  body: string;
  publishedAt: string;
}

export interface AdminReview {
  id: string;
  email: string;
  displayName: string;
  rating: number;
  title: string;
  body: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface AdminStats {
  pendingReviews: number;
  approvedReviews: number;
  unreadMessages: number;
  pricingUpdatedAt: string | null;
}

export interface ActivityEntry {
  id: string;
  at: string;
  actor: string;
  action: string;
  detail: string;
}

export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  topic: string;
  version: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface PricingPlanRow {
  id: string;
  name: string;
  month: number;
  quarter: number;
  halfYear: number;
  year: number;
}

export interface ReviewDraft {
  email: string;
  displayName: string;
  rating: number;
  title: string;
  body: string;
  consent: boolean;
  website: string;
}

export interface SupportDraft {
  name: string;
  email: string;
  topic: string;
  version: string;
  message: string;
  website: string;
}

const jsonHeaders = { 'Content-Type': 'application/json' };

/**
 * A 2xx answer is only a success when it actually carries the JSON shape we
 * asked for. Hosts that rewrite unknown paths to `index.html` (Cloudflare
 * Pages `_redirects`, `vite preview`) answer API calls with `200 text/html`,
 * and that must never be rendered as a delivered message or an admin session.
 */
async function request<T>(
  path: string,
  init?: RequestInit,
  expect?: (payload: unknown) => boolean,
): Promise<ApiResult<T>> {
  let response: Response;
  try {
    response = await fetch(path, {
      credentials: 'same-origin',
      ...init,
      headers: { ...jsonHeaders, ...(init?.headers ?? {}) },
    });
  } catch {
    return { kind: 'unavailable', status: 0 };
  }

  if (response.status === 404 || response.status === 405 || response.status === 501) {
    return { kind: 'unavailable', status: response.status };
  }

  const isJson = (response.headers.get('content-type') ?? '').includes('application/json');
  const payload = isJson
    ? ((await response.json().catch(() => null)) as (T & { error?: string; message?: string }) | null)
    : null;

  if (response.status === 401 || response.status === 403) {
    return {
      kind: 'rejected',
      error: { code: 'unauthorized', message: payload?.message },
    };
  }

  if (response.ok) {
    if (!isJson || payload === null || (expect && !expect(payload))) {
      return { kind: 'unavailable', status: response.status };
    }
    return { kind: 'ok', data: payload as T };
  }

  const code =
    payload?.error === 'invalid' ||
    payload?.error === 'duplicate' ||
    payload?.error === 'rate_limited' ||
    payload?.error === 'unauthorized'
      ? payload.error
      : 'unknown';
  return { kind: 'rejected', error: { code, message: payload?.message } };
}

const hasReviewsArray = (payload: unknown): boolean =>
  typeof payload === 'object' &&
  payload !== null &&
  Array.isArray((payload as { reviews?: unknown }).reviews);

const hasSessionShape = (payload: unknown): boolean =>
  typeof payload === 'object' &&
  payload !== null &&
  typeof (payload as { admin?: unknown }).admin === 'boolean';

const hasQueuedShape = (payload: unknown): boolean =>
  typeof payload === 'object' && payload !== null && 'status' in payload;

export const api = {
  listReviews: () =>
    request<{ reviews: PublicReview[] }>('/api/reviews', undefined, hasReviewsArray),

  submitReview: (draft: ReviewDraft) =>
    request<{ status: 'pending' }>(
      '/api/reviews',
      { method: 'POST', body: JSON.stringify(draft) },
      hasQueuedShape,
    ),

  submitSupport: (draft: SupportDraft) =>
    request<{ status: 'queued' }>(
      '/api/support',
      { method: 'POST', body: JSON.stringify(draft) },
      hasQueuedShape,
    ),

  session: () => request<{ admin: boolean; user: string }>('/api/session', undefined, hasSessionShape),

  login: (password: string) =>
    request<{ admin: boolean }>(
      '/api/login',
      { method: 'POST', body: JSON.stringify({ password }) },
      hasSessionShape,
    ),

  logout: () => request<{ ok: boolean }>('/api/logout', { method: 'POST' }),

  admin: {
    stats: () => request<AdminStats>('/api/admin/stats'),

    reviews: (status: 'pending' | 'approved' | 'rejected') =>
      request<{ reviews: AdminReview[] }>(`/api/admin/reviews?status=${status}`),

    decideReview: (id: string, action: 'approve' | 'reject') =>
      request<{ ok: boolean }>(`/api/admin/reviews/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ action }),
      }),

    pricing: () => request<{ plans: PricingPlanRow[]; updatedAt: string | null }>('/api/admin/pricing'),

    savePricing: (plans: PricingPlanRow[], note: string) =>
      request<{ ok: boolean; updatedAt: string }>('/api/admin/pricing', {
        method: 'PUT',
        body: JSON.stringify({ plans, note }),
      }),

    messages: () => request<{ messages: AdminMessage[] }>('/api/admin/messages'),

    markMessageRead: (id: string) =>
      request<{ ok: boolean }>(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ read: true }),
      }),

    activity: () => request<{ entries: ActivityEntry[] }>('/api/admin/activity'),
    cms: {
      home: {
        get: () => request<any>('/api/admin/cms/home'),
        put: (body: any) => request<{ ok: boolean; status: string; updatedAt: string }>('/api/admin/cms/home', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }),
      },
      pages: {
        get: () => request<any>('/api/admin/cms/pages'),
        create: (body: any) => request<{ ok: boolean; id: string }>('/api/admin/cms/pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }),
        update: (body: any) => request<{ ok: boolean }>('/api/admin/cms/pages', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }),
      },
      faq: {
        get: () => request<any>('/api/admin/cms/faq'),
        create: (body: any) => request<{ ok: boolean; id: string }>('/api/admin/cms/faq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }),
        update: (body: any) => request<{ ok: boolean }>('/api/admin/cms/faq', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }),
        delete: (id: string) => request<{ ok: boolean }>('/api/admin/cms/faq', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        }),
      },
      media: {
        get: () => request<any>('/api/admin/cms/media'),
        upload: (formData: FormData) => request<{ ok: boolean; id: string; url: string }>('/api/admin/cms/media', {
          method: 'POST',
          body: formData,
        }),
        update: (body: any) => request<{ ok: boolean }>('/api/admin/cms/media', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }),
        delete: (id: string) => request<{ ok: boolean }>('/api/admin/cms/media', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        }),
      },
      releases: {
        get: () => request<any>('/api/admin/cms/releases'),
        create: (body: any) => request<{ ok: boolean; id: string }>('/api/admin/cms/releases', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }),
        update: (body: any) => request<{ ok: boolean }>('/api/admin/cms/releases', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }),
      },
      audit: () => request<any>('/api/admin/cms/audit'),
    },
  },
};

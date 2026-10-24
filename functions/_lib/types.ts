/**
 * Runtime contract shared by every Pages Function. Secrets are read from the
 * Cloudflare environment only; nothing here is ever bundled into the client.
 */
export interface Env {
  DB: D1Database;
  /** Set with `wrangler pages secret put ADMIN_PASSWORD`. Never committed. */
  ADMIN_PASSWORD?: string;
  /** Set with `wrangler pages secret put SESSION_SECRET`. Signs admin cookies. */
  SESSION_SECRET?: string;
  ENVIRONMENT?: string;
}

export interface ReviewRow {
  id: string;
  email: string;
  display_name: string;
  rating: number;
  title: string;
  body: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  published_at: string | null;
}

export interface SupportRow {
  id: string;
  name: string;
  email: string;
  topic: string;
  version: string;
  message: string;
  read: number;
  created_at: string;
}

export interface PricingRow {
  id: string;
  name: string;
  month: number;
  quarter: number;
  half_year: number;
  year: number;
  updated_at: string;
}

export interface ActivityRow {
  id: string;
  at: string;
  actor: string;
  action: string;
  detail: string;
}

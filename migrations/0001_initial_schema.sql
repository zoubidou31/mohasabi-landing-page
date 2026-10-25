-- Mohasabi D1 Initial Schema Migration
-- Migration: 0001_initial_schema.sql
-- Aligned with Cloudflare D1 database: mohasabi-cms-preview (9d6590b6-7ac0-4dd5-a3b0-62321db906f4)

-- 1. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  display_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TEXT NOT NULL,
  published_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews (status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_email ON reviews (email, created_at DESC);

-- 2. Support Messages Table
CREATE TABLE IF NOT EXISTS support_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  topic TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  read INTEGER NOT NULL DEFAULT 0 CHECK (read IN (0, 1)),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_support_created ON support_messages (created_at DESC);

-- 3. Pricing Plans Table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  month INTEGER NOT NULL CHECK (month > 0),
  quarter INTEGER NOT NULL CHECK (quarter > 0),
  half_year INTEGER NOT NULL CHECK (half_year > 0),
  year INTEGER NOT NULL CHECK (year > 0),
  updated_at TEXT NOT NULL
);

-- 4. Pricing Changes History Table
CREATE TABLE IF NOT EXISTS pricing_changes (
  id TEXT PRIMARY KEY,
  at TEXT NOT NULL,
  actor TEXT NOT NULL,
  note TEXT NOT NULL,
  snapshot TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_pricing_changes_at ON pricing_changes (at DESC);

-- 5. Admin Activity Table
CREATE TABLE IF NOT EXISTS admin_activity (
  id TEXT PRIMARY KEY,
  at TEXT NOT NULL,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  detail TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_activity_at ON admin_activity (at DESC);

-- 6. Audit Log Table (Compatibility Alias)
CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  detail TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log (created_at DESC);

-- 7. Rate Limits & Abuse Prevention Table
CREATE TABLE IF NOT EXISTS rate_limits (
  bucket TEXT PRIMARY KEY,
  window_start INTEGER NOT NULL,
  count INTEGER NOT NULL
);

-- Seed owner-approved official prices (DZD)
INSERT INTO pricing_plans (id, name, month, quarter, half_year, year, updated_at)
VALUES
  ('standard', 'Standard', 1500, 3500, 6500, 12000, '2026-10-24T00:00:00.000Z'),
  ('pro', 'Pro', 3000, 7500, 13500, 25000, '2026-10-24T00:00:00.000Z'),
  ('enterprise', 'Enterprise', 5500, 13000, 24000, 45000, '2026-10-24T00:00:00.000Z')
ON CONFLICT (id) DO NOTHING;

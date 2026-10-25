-- Mohasabi D1 Initial Schema Migration
-- Migration: 0001_initial_schema.sql

-- 1. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  display_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_reviews_status_created ON reviews (status, created_at DESC);

-- 2. Support Messages Table
CREATE TABLE IF NOT EXISTS support_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  topic TEXT NOT NULL,
  version TEXT NOT NULL,
  message TEXT NOT NULL,
  read INTEGER NOT NULL DEFAULT 0 CHECK (read IN (0, 1)),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_support_read_created ON support_messages (read, created_at DESC);

-- 3. Pricing Plans Table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 0),
  quarter INTEGER NOT NULL CHECK (quarter >= 0),
  half_year INTEGER NOT NULL CHECK (half_year >= 0),
  year INTEGER NOT NULL CHECK (year >= 0),
  updated_at TEXT NOT NULL,
  note TEXT
);

-- Seed owner-approved official prices (DZD)
INSERT OR IGNORE INTO pricing_plans (id, name, month, quarter, half_year, year, updated_at, note)
VALUES
  ('standard', 'Standard', 1500, 3500, 6500, 12000, '2026-10-23T00:00:00.000Z', 'Initial official baseline'),
  ('pro', 'Pro', 3000, 7500, 13500, 25000, '2026-10-23T00:00:00.000Z', 'Initial official baseline'),
  ('enterprise', 'Enterprise', 5500, 13000, 24000, 45000, '2026-10-23T00:00:00.000Z', 'Initial official baseline');

-- 4. Audit Log Table
CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  detail TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log (created_at DESC);

-- 5. Rate Limits & Brute Force Prevention
CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 1,
  reset_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_reset ON rate_limits (reset_at);

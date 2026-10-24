-- D1 schema for the Mohasabi site backend.
-- Apply with: npx wrangler d1 execute mohasabi-cms --remote --file=./db/schema.sql
-- The database itself is reached only through the Pages Functions in ./functions;
-- no table below is exposed by Cloudflare as an HTTP endpoint of its own.

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

CREATE TABLE IF NOT EXISTS pricing_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  month INTEGER NOT NULL CHECK (month > 0),
  quarter INTEGER NOT NULL CHECK (quarter > 0),
  half_year INTEGER NOT NULL CHECK (half_year > 0),
  year INTEGER NOT NULL CHECK (year > 0),
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pricing_changes (
  id TEXT PRIMARY KEY,
  at TEXT NOT NULL,
  actor TEXT NOT NULL,
  note TEXT NOT NULL,
  snapshot TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_pricing_changes_at ON pricing_changes (at DESC);

CREATE TABLE IF NOT EXISTS admin_activity (
  id TEXT PRIMARY KEY,
  at TEXT NOT NULL,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  detail TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_activity_at ON admin_activity (at DESC);

CREATE TABLE IF NOT EXISTS rate_limits (
  bucket TEXT PRIMARY KEY,
  window_start INTEGER NOT NULL,
  count INTEGER NOT NULL
);

-- Owner-approved indicative table (DZD): values must stay identical to
-- src/config/siteConfig.ts until the owner publishes different prices.
INSERT INTO pricing_plans (id, name, month, quarter, half_year, year, updated_at)
VALUES
  ('standard', 'Standard', 1500, 3500, 6500, 12000, '2026-10-24T00:00:00.000Z'),
  ('pro', 'Pro', 3000, 7500, 13500, 25000, '2026-10-24T00:00:00.000Z'),
  ('enterprise', 'Enterprise', 5500, 13000, 24000, 45000, '2026-10-24T00:00:00.000Z')
ON CONFLICT (id) DO NOTHING;

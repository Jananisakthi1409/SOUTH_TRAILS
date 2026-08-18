-- migrations/packages_migration.sql
-- Packages-only migration for Supabase.
-- Purpose: Ensure the `packages` table has the columns required by the frontend
-- (text `id`, `rating`, `imageFolder`, `places jsonb`, `included jsonb`, `highlights jsonb`).
-- CAUTION: This migration alters the `id` column type to `text` if necessary.
-- If you already have a `bookings` table referencing `packages(id)` as uuid, running
-- this migration may cause FK type mismatches; run on a dev DB and review before applying to production.

BEGIN;

-- Ensure table exists (create minimal table if missing)
CREATE TABLE IF NOT EXISTS packages (
  id text PRIMARY KEY,
  state text,
  title text,
  description text,
  destination text,
  category text,
  price numeric,
  days int,
  nights int,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Ensure `id` is text. If currently a different type (e.g., uuid), cast to text.
DO $$
BEGIN
  IF (SELECT data_type FROM information_schema.columns WHERE table_name='packages' AND column_name='id') IS DISTINCT FROM 'text' THEN
    EXECUTE 'ALTER TABLE packages ALTER COLUMN id TYPE text USING id::text';
  END IF;
EXCEPTION WHEN undefined_column THEN
  -- Column missing - handled by CREATE TABLE IF NOT EXISTS above
  NULL;
END$$;

-- Add missing columns required by the frontend
ALTER TABLE packages ADD COLUMN IF NOT EXISTS rating numeric;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS "imageFolder" text;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS places jsonb;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS included jsonb;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS highlights jsonb;

-- Optional legacy image columns (kept for compatibility)
ALTER TABLE packages ADD COLUMN IF NOT EXISTS image1 text;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS image2 text;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS image3 text;

-- Indexes for common filters
CREATE INDEX IF NOT EXISTS idx_packages_state ON packages(state);
CREATE INDEX IF NOT EXISTS idx_packages_category ON packages(category);

COMMIT;

-- End of migration

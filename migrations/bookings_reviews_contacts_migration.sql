-- migrations/bookings_reviews_contacts_migration.sql
-- Purpose: Create bookings, reviews, and contact_requests tables suitable for the frontend.
-- Bookings.package_id is text (matches packages.id text).
-- This migration tries to be non-destructive and idempotent.

BEGIN;

-- Create customers if missing (lightweight)
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table (package_id is text to match packages.id)
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  package_id text,
  package_snapshot jsonb,
  travel_date date,
  travelers int,
  special_request text,
  status text DEFAULT 'pending',
  total_amount numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_package_id ON bookings(package_id);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_id ON bookings(customer_id);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  package_id text,
  rating numeric NOT NULL,
  text text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reviews_package_id ON reviews(package_id);

-- Create contact_requests table
CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  phone text,
  package_id text,
  message text,
  created_at timestamptz DEFAULT now()
);

COMMIT;

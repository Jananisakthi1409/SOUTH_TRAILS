Packages Migration: README

Files added:
- `migrations/packages_migration.sql`  — SQL to ensure `packages` table has required columns.
- `scripts/seed-packages.js`         — Node script to upsert all dummy packages into Supabase preserving `imageFolder`, rating, places, included, highlights.

Purpose:
These two files allow you to migrate and seed only the `packages` data into Supabase while keeping the frontend unchanged.

Instructions (safe order):
1. Backup your Supabase database (recommended).
2. Apply the SQL migration in the Supabase SQL editor or via psql:

   psql "postgresql://..." -f migrations/packages_migration.sql

   Or paste the contents of `migrations/packages_migration.sql` into the Supabase SQL editor and run it.

3. Seed packages using the Node script (run locally):

   Set environment variables for the Supabase project:

   For Windows Powershell:

   $env:VITE_SUPABASE_URL = "https://your-project.supabase.co"
   $env:VITE_SUPABASE_ANON_KEY = "public-anon-key"
   node scripts/seed-packages.js

   For macOS / Linux:

   export VITE_SUPABASE_URL="https://your-project.supabase.co"
   export VITE_SUPABASE_ANON_KEY="public-anon-key"
   node scripts/seed-packages.js

   The script will upsert by `id`, preserving `imageFolder` and JSON fields.

4. Start the dev server and verify packages visually:

   npm install
   npm run dev

   Visit the state package lists and package detail pages for a few sample packages across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh to confirm images, ratings, places, included items, and highlights match the original dummy-data version.

Important notes / caveats:
- The repository already contains a `schema.sql` with `bookings` defined referencing `packages(id)` as uuid. If your target database already has a `bookings` table that references `packages.id` as uuid, changing `packages.id` to text may create type mismatches for foreign keys. Apply the migration in a dev database first and review `bookings` schema.
- The frontend keeps fallback to dummy data when Supabase is not configured. The seed script is idempotent (uses upsert), so you can re-run it safely.
- After you verify visual parity on local dev, commit and push the `migrations/` and `scripts/` files as the Packages migration commit. Then we can proceed with Bookings migration.

If you want, I can:
- Create a one-off `npm run seed:packages` script in `package.json` to simplify running the seeder.
- Adjust the migration to also safely alter `bookings.package_id` type to `text` when you give the go-ahead (this is part of Bookings migration and will be done in Phase 2).

Next step: Confirm and I'll commit these files to the repository (or create the `npm` helper if you prefer).
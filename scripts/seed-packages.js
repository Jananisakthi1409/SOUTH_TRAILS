#!/usr/bin/env node
// scripts/seed-packages.js
// One-off Node script to seed packages into Supabase using the existing dummy data files.
// Usage:
//   Set env vars: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
//   node scripts/seed-packages.js

import { createClient } from '@supabase/supabase-js';
import tamilNaduPackages from '../src/pages/Packages/tamilNaduPackageData.js';
import keraPackages from '../src/pages/Packages/keraPackageData.js';
import karnatakaPackages from '../src/pages/Packages/karnatakaPackageData.js';
import andhraPradeshPackages from '../src/pages/Packages/andhraPradeshPackageData.js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const normalize = (pkg, stateName) => ({
  id: pkg.id,
  title: pkg.title,
  destination: pkg.destination,
  state: stateName,
  category: pkg.category,
  days: Number(pkg.days || 0),
  nights: Number(pkg.nights || 0),
  price: typeof pkg.price === 'string' ? Number(pkg.price.replace(/[^0-9.]/g, '')) : Number(pkg.price || 0),
  description: pkg.description || '',
  rating: pkg.rating || null,
  imageFolder: pkg.imageFolder || pkg.image_folder || (typeof pkg.id === 'string' ? pkg.id.split('-')[0] : ''),
  places: Array.isArray(pkg.places) ? pkg.places : pkg.places ? pkg.places : [],
  included: Array.isArray(pkg.included) ? pkg.included : pkg.included ? pkg.included : [],
  highlights: Array.isArray(pkg.highlights) ? pkg.highlights : pkg.highlights ? pkg.highlights : [],
  status: pkg.status || 'active',
});

const buildPayload = () => {
  const tn = tamilNaduPackages.map(p => normalize(p, 'Tamil Nadu'));
  const kr = keraPackages.map(p => normalize(p, 'Kerala'));
  const ka = karnatakaPackages.map(p => normalize(p, 'Karnataka'));
  const ap = andhraPradeshPackages.map(p => normalize(p, 'Andhra Pradesh'));
  return [...tn, ...kr, ...ka, ...ap];
};

(async () => {
  try {
    const payload = buildPayload();
    console.log(`Seeding ${payload.length} packages to Supabase...`);

    // Use upsert by primary key (id). Supabase upsert requires specifying onConflict
    const { data, error } = await supabase.from('packages').upsert(payload, { onConflict: 'id' }).select();

    if (error) {
      console.error('Seed error:', error);
      process.exit(1);
    }

    console.log(`Seeded ${data?.length || payload.length} packages successfully.`);
    process.exit(0);
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
})();

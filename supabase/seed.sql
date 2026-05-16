-- ============================================================================
-- Aussie Vapes — minimal seed for local Supabase development
-- ============================================================================
-- This file does NOT seed the catalogue (2,000+ products live in lib/products.ts).
-- Use scripts/seed-products.ts (to be written) to bulk-insert from there.
--
-- What this seeds:
--   • 5 top-level categories matching the live site
--   • A handful of brands
--   • 8 coupons matching the admin mock data
--   • One admin user — you must replace the UUID with the auth.users.id of
--     the account you intend to use for /admin.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Categories
-- ---------------------------------------------------------------------------
insert into public.categories (slug, name, description, position) values
  ('disposable-vapes',  'Disposable Vapes',  'Pre-filled, pre-charged devices ready to vape out of the box.',  1),
  ('pod-systems',       'Pod Systems',       'Refillable and pre-filled pod kits with replaceable pods.',      2),
  ('e-liquids',         'E-Liquids',         'Freebase and salt nicotine vape juice.',                          3),
  ('nicotine-salts',    'Nicotine Salts',    'High-strength salt nicotine for smooth throat hit.',              4),
  ('accessories',       'Accessories',       'Coils, batteries, chargers and replacement parts.',               5)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Brands (a starter set — add the rest from lib/brands.ts via your import)
-- ---------------------------------------------------------------------------
insert into public.brands (slug, name, display_name, accent_color, is_featured) values
  ('iget',       'IGET',       'IGET',       '#0f6cbd', true),
  ('lost-mary',  'Lost Mary',  'Lost Mary',  '#7a3fc3', true),
  ('hqd',        'HQD',        'HQD',        '#d9534f', true),
  ('fume',       'Fume',       'Fume',       '#2f8f4f', true),
  ('pod-juice',  'Pod Juice',  'Pod Juice',  '#ff7a00', true)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Coupons (mirrors lib/admin-mock-data.ts COUPONS array)
-- ---------------------------------------------------------------------------
insert into public.coupons (code, type, value, min_order_value, max_uses, uses, expires_at, is_active) values
  ('WELCOME10', 'percentage', 10,    0,   0,    487,  '2026-12-31', true),
  ('FREESHIP',  'fixed',      9.95,  60,  0,    1124, '2026-12-31', true),
  ('MAY25',     'percentage', 25,    150, 200,  188,  '2026-05-31', true),
  ('BULK15',    'percentage', 15,    300, 0,    92,   '2026-08-31', true),
  ('IGETFAN',   'percentage', 12,    0,   500,  446,  '2026-06-30', true),
  ('EASTER10',  'percentage', 10,    0,   1000, 1000, '2026-04-30', false),
  ('STAFF50',   'percentage', 50,    0,   50,   12,   '2026-12-31', true),
  ('CROWN5',    'fixed',      5,     35,  0,    234,  '2026-07-31', true)
on conflict (code) do nothing;

-- ---------------------------------------------------------------------------
-- Promote a user to admin
-- ---------------------------------------------------------------------------
-- 1. Sign up via the public site (or `auth.users` directly) using the admin
--    email you want.
-- 2. Find that user's id: select id, email from auth.users;
-- 3. Run: update public.profiles set role = 'admin' where id = '<uuid>';
--
-- Example (uncomment + replace UUID):
-- update public.profiles set role = 'admin' where email = 'admin@aussievapes.com.au';

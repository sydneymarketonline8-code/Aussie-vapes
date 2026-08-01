# Aussie Vape Hub — Supabase Schema

Three SQL files that turn the read-only admin UI into a real backend.

## Files

| File | Purpose |
|---|---|
| `schema.sql` | All tables, enums, indexes, triggers, views |
| `rls.sql`    | Row-level security policies + `is_admin()` helper |
| `seed.sql`   | Categories, brands, coupons + admin-role hint |

Run them **in that order** in the Supabase SQL editor (or via `psql`).

## Apply locally

```bash
# Supabase CLI
supabase db reset                 # wipes local db
psql "$(supabase db url)" -f supabase/schema.sql
psql "$(supabase db url)" -f supabase/rls.sql
psql "$(supabase db url)" -f supabase/seed.sql
```

## Apply to a hosted project

1. Open the Supabase dashboard → **SQL Editor → New query**
2. Paste `schema.sql`, run
3. Paste `rls.sql`, run
4. Paste `seed.sql`, run

## After the SQL is in

1. **Bulk-import products** from `lib/products.ts` into `public.products` +
   `public.product_images`. Write a one-off script (`scripts/seed-products.ts`)
   that reads `PRODUCTS` and inserts via the service-role key.
2. **Wire the admin UI** by swapping each call site from `lib/admin-mock-data`
   to a Supabase query:
   - `app/admin/page.tsx` → `select * from dashboard_kpis`
   - `app/admin/products/page.tsx` → `select * from products order by created_at desc limit 20 offset ...`
   - `app/admin/orders/page.tsx` → `select * from orders order by placed_at desc`
   - etc.
3. **Add a route guard** in `middleware.ts` that reads the user's
   `profiles.role` via the Supabase server client and redirects non-admins
   to `/`. Replace the current cookie-based auth in `lib/admin-auth.ts`.
4. **Enable write actions** in the admin forms — every `disabled` button +
   "requires backend" tooltip can be flipped on once the corresponding
   Supabase mutation is wired.

## Notes on choices

- **Snapshotting** on `orders` and `order_items` (customer name, product
  name/image, shipping address) — historical orders stay accurate even if the
  customer is deleted or the product is renamed.
- **Soft delete** (`deleted_at`) only on products and reviews. Orders are
  immutable for compliance; cancellation is a status change, not a delete.
- **`is_admin()` is SECURITY DEFINER** — required to avoid infinite recursion
  when the `profiles` RLS policies need to check whether the caller is an
  admin (which itself reads `profiles`).
- **Generated `search_text` column** on products + a GIN trigram index gives
  fast `ILIKE '%term%'` search without a separate search service. Swap for
  pgvector or Algolia if you outgrow it.
- **Auto-recompute rating** trigger keeps `products.rating` /
  `products.review_count` in sync with `reviews` (approved + not deleted).
- **`dashboard_kpis` view** keeps the dashboard SQL out of application code
  and matches the four KPI cards on `/admin` exactly.

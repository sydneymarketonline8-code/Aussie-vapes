-- ============================================================================
-- Aussie Vapes — Row Level Security policies
-- ============================================================================
-- Run AFTER schema.sql.
--
-- Model
--   • Anonymous + customer roles can READ public catalogue data.
--   • Customers can READ + WRITE their own profile, addresses, and orders.
--   • Reviews: anyone can read approved reviews; logged-in users can insert;
--     only admins can update status.
--   • Admin role (profiles.role = 'admin' OR 'staff') bypasses customer-scope
--     restrictions for write paths via the is_admin() helper.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Helper: returns true if the calling user has admin/staff role.
-- SECURITY DEFINER avoids infinite recursion when profiles policies query
-- profiles to decide whether the caller is admin.
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('admin', 'staff')
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, anon;

-- ---------------------------------------------------------------------------
-- Enable RLS on every public table
-- ---------------------------------------------------------------------------
alter table public.profiles               enable row level security;
alter table public.addresses              enable row level security;
alter table public.brands                 enable row level security;
alter table public.categories             enable row level security;
alter table public.subcategories          enable row level security;
alter table public.products               enable row level security;
alter table public.product_images         enable row level security;
alter table public.product_related        enable row level security;
alter table public.coupons                enable row level security;
alter table public.orders                 enable row level security;
alter table public.order_items            enable row level security;
alter table public.order_status_history   enable row level security;
alter table public.reviews                enable row level security;
alter table public.affiliates             enable row level security;
alter table public.affiliate_clicks       enable row level security;
alter table public.affiliate_conversions  enable row level security;
alter table public.audit_log              enable row level security;

-- ============================================================================
-- PROFILES
-- ============================================================================
create policy "profile self read"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "profile self update"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id and role = (select role from public.profiles where id = auth.uid()));
  -- Customers cannot escalate their own role.

create policy "profile admin write"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- ADDRESSES
-- ============================================================================
create policy "address owner all"
  on public.addresses for all
  using (auth.uid() = profile_id or public.is_admin())
  with check (auth.uid() = profile_id or public.is_admin());

-- ============================================================================
-- PUBLIC CATALOGUE (brands, categories, subcategories)
-- ============================================================================
-- Anyone (anon + authenticated) can read; only admins can write.
create policy "brands public read"     on public.brands       for select using (true);
create policy "brands admin write"     on public.brands       for all    using (public.is_admin()) with check (public.is_admin());

create policy "categories public read" on public.categories   for select using (true);
create policy "categories admin write" on public.categories   for all    using (public.is_admin()) with check (public.is_admin());

create policy "subcategories public read" on public.subcategories for select using (true);
create policy "subcategories admin write" on public.subcategories for all    using (public.is_admin()) with check (public.is_admin());

-- ============================================================================
-- PRODUCTS
-- ============================================================================
-- Public sees active, non-deleted products only.
create policy "products public read active"
  on public.products for select
  using (status = 'active' and deleted_at is null);

create policy "products admin read all"
  on public.products for select
  using (public.is_admin());

create policy "products admin write"
  on public.products for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "product_images public read"
  on public.product_images for select
  using (
    exists (
      select 1 from public.products p
      where p.id = product_id
        and (p.status = 'active' and p.deleted_at is null or public.is_admin())
    )
  );

create policy "product_images admin write"
  on public.product_images for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "product_related public read" on public.product_related for select using (true);
create policy "product_related admin write" on public.product_related for all    using (public.is_admin()) with check (public.is_admin());

-- ============================================================================
-- COUPONS
-- ============================================================================
-- Public can validate a coupon by code via a SECURITY DEFINER RPC (not table
-- read) so we never leak the full coupon list. Admins manage directly.
create policy "coupons admin all"
  on public.coupons for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- ORDERS
-- ============================================================================
create policy "orders owner read"
  on public.orders for select
  using (auth.uid() = profile_id or public.is_admin());

create policy "orders owner insert"
  on public.orders for insert
  with check (auth.uid() = profile_id or profile_id is null);
  -- profile_id can be null for guest checkout

create policy "orders admin update"
  on public.orders for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "orders admin delete"
  on public.orders for delete
  using (public.is_admin());

-- Order items / history follow the parent order's visibility.
create policy "order_items via order"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_id
        and (o.profile_id = auth.uid() or public.is_admin())
    )
  );

create policy "order_items insert via order"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders o
      where o.id = order_id
        and (o.profile_id = auth.uid() or o.profile_id is null or public.is_admin())
    )
  );

create policy "order_items admin write"
  on public.order_items for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "order_history via order"
  on public.order_status_history for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_id
        and (o.profile_id = auth.uid() or public.is_admin())
    )
  );

create policy "order_history admin write"
  on public.order_status_history for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- REVIEWS
-- ============================================================================
create policy "reviews public read approved"
  on public.reviews for select
  using (status = 'approved' and deleted_at is null);

create policy "reviews owner read"
  on public.reviews for select
  using (auth.uid() = profile_id);

create policy "reviews admin read all"
  on public.reviews for select
  using (public.is_admin());

create policy "reviews owner insert"
  on public.reviews for insert
  with check (auth.uid() = profile_id and status = 'pending');
  -- Forces new reviews into the moderation queue.

create policy "reviews admin moderate"
  on public.reviews for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "reviews admin delete"
  on public.reviews for delete
  using (public.is_admin());

-- ============================================================================
-- AFFILIATES
-- ============================================================================
create policy "affiliates admin all"
  on public.affiliates for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "affiliate clicks admin read"
  on public.affiliate_clicks for select
  using (public.is_admin());

create policy "affiliate clicks insert"
  on public.affiliate_clicks for insert
  with check (true);   -- public referrals must be insertable from any visitor

create policy "affiliate conv admin all"
  on public.affiliate_conversions for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- AUDIT LOG
-- ============================================================================
create policy "audit admin read"
  on public.audit_log for select
  using (public.is_admin());

create policy "audit insert any"
  on public.audit_log for insert
  with check (true);   -- writes come from SECURITY DEFINER functions, not direct users

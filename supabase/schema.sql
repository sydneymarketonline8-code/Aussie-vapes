-- ============================================================================
-- Aussie Vapes — Supabase / Postgres schema
-- ============================================================================
-- Run order: schema.sql  →  rls.sql  →  seed.sql (optional)
--
-- Conventions
--   • All tables in `public` schema, owned by `postgres`.
--   • Primary keys are `uuid` (gen_random_uuid()) except for join tables.
--   • Soft-delete via `deleted_at` on user-visible content (products, reviews).
--   • Money stored as numeric(10,2) AUD. GST inclusive.
--   • Timestamps are `timestamptz`, default `now()`, with `updated_at` triggers.
--   • Enums use Postgres `create type` rather than text + check, for indexing.
--   • Indexes are added inline; FKs use ON DELETE behaviour appropriate to
--     whether a child should disappear (cascade) or be retained (set null /
--     restrict).
-- ============================================================================

create extension if not exists "pgcrypto";   -- for gen_random_uuid()
create extension if not exists "pg_trgm";    -- for trigram product search

-- ---------------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ============================================================================
-- ENUMS
-- ============================================================================
create type public.user_role        as enum ('customer', 'admin', 'staff');
create type public.order_status     as enum ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
create type public.payment_status   as enum ('pending', 'authorized', 'captured', 'failed', 'refunded', 'partially_refunded');
create type public.review_status    as enum ('pending', 'approved', 'rejected');
create type public.coupon_type      as enum ('percentage', 'fixed');
create type public.product_status   as enum ('draft', 'active', 'archived');
create type public.address_kind     as enum ('shipping', 'billing');
create type public.payment_method   as enum ('payid', 'bitcoin');

-- ============================================================================
-- AUTH / PROFILES
-- ============================================================================
-- Mirrors auth.users for app-level data. `id` matches auth.users.id.
-- The `role` column is the source of truth for admin access (used in RLS).
-- ---------------------------------------------------------------------------
create table public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  email           text not null unique,
  first_name      text,
  last_name       text,
  phone           text,
  role            public.user_role not null default 'customer',
  marketing_optin boolean not null default false,
  is_18_plus      boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  last_login_at   timestamptz
);

create index profiles_role_idx on public.profiles(role) where role <> 'customer';

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile row whenever a new auth.users row appears.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Addresses (one customer can have many; flagged shipping/billing)
-- ---------------------------------------------------------------------------
create table public.addresses (
  id           uuid primary key default gen_random_uuid(),
  profile_id   uuid not null references public.profiles(id) on delete cascade,
  kind         public.address_kind not null,
  is_default   boolean not null default false,
  recipient    text not null,
  line1        text not null,
  line2        text,
  suburb       text not null,
  state        text not null,
  postcode     text not null,
  country      text not null default 'Australia',
  phone        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index addresses_profile_idx on public.addresses(profile_id);

create trigger addresses_updated_at
  before update on public.addresses
  for each row execute function public.set_updated_at();

-- ============================================================================
-- CATALOGUE
-- ============================================================================
create table public.brands (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  name            text not null,
  display_name    text not null,
  description     text,
  logo_url        text,
  hero_image_url  text,
  accent_color    text,
  country         text,
  founded_year    int,
  is_featured     boolean not null default false,
  seo_title       text,
  seo_description text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index brands_featured_idx on public.brands(is_featured) where is_featured;

create trigger brands_updated_at
  before update on public.brands
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
create table public.categories (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  name             text not null,
  description      text,
  long_description text,
  intro            text,
  image_url        text,
  seo_title        text,
  seo_description  text,
  keywords         text[] not null default '{}',
  highlights       text[] not null default '{}',
  position         int not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create trigger categories_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

create table public.subcategories (
  id          uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  slug        text not null,
  name        text not null,
  position    int not null default 0,
  created_at  timestamptz not null default now(),
  unique (category_id, slug)
);

create index subcategories_category_idx on public.subcategories(category_id);

-- ---------------------------------------------------------------------------
-- Products
-- ---------------------------------------------------------------------------
create table public.products (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  name             text not null,
  sku              text not null unique,
  brand_id         uuid references public.brands(id) on delete set null,
  category_id      uuid references public.categories(id) on delete set null,
  subcategory_id   uuid references public.subcategories(id) on delete set null,
  status           public.product_status not null default 'draft',

  price            numeric(10,2) not null check (price >= 0),
  compare_price    numeric(10,2) check (compare_price is null or compare_price >= price),

  short_description text,
  description       text,
  features          text[] not null default '{}',
  specifications    jsonb  not null default '{}'::jsonb,
  tags              text[] not null default '{}',
  flavours          text[] not null default '{}',
  nicotine_strengths text[] not null default '{}',

  in_stock          boolean not null default true,
  stock_count       int,
  low_stock_threshold int not null default 20,

  rating            numeric(2,1) not null default 0 check (rating between 0 and 5),
  review_count      int not null default 0,

  is_new            boolean not null default false,
  is_best_seller    boolean not null default false,
  is_sale           boolean not null default false,

  seo_title         text,
  seo_description   text,

  search_text       text not null default '',

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  deleted_at        timestamptz
);

create index products_category_idx     on public.products(category_id);
create index products_brand_idx        on public.products(brand_id);
create index products_status_idx       on public.products(status) where deleted_at is null;
create index products_low_stock_idx    on public.products(stock_count) where stock_count is not null and stock_count < 20;
create index products_search_trgm_idx  on public.products using gin (search_text gin_trgm_ops);

-- Maintain products.search_text via trigger. A GENERATED column can't be used
-- here because array_to_string() is STABLE, not IMMUTABLE.
create or replace function public.products_set_search_text()
returns trigger
language plpgsql
as $$
begin
  new.search_text :=
    coalesce(new.name, '')              || ' ' ||
    coalesce(new.sku, '')               || ' ' ||
    coalesce(new.short_description, '') || ' ' ||
    coalesce(array_to_string(new.tags, ' '), '');
  return new;
end;
$$;

create trigger products_search_text_sync
  before insert or update of name, sku, short_description, tags on public.products
  for each row execute function public.products_set_search_text();

create trigger products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- Ordered image set. Position 0 is the primary image (used in cards/cart).
create table public.product_images (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid not null references public.products(id) on delete cascade,
  url         text not null,
  alt         text,
  position    int  not null default 0,
  created_at  timestamptz not null default now()
);

create index product_images_product_idx on public.product_images(product_id, position);

-- Related products (many-to-many self-join, ordered for editorial control).
create table public.product_related (
  product_id          uuid not null references public.products(id) on delete cascade,
  related_product_id  uuid not null references public.products(id) on delete cascade,
  position            int  not null default 0,
  primary key (product_id, related_product_id),
  check (product_id <> related_product_id)
);

-- ============================================================================
-- COUPONS
-- ============================================================================
create table public.coupons (
  id              uuid primary key default gen_random_uuid(),
  code            text not null unique,
  type            public.coupon_type not null,
  value           numeric(10,2) not null check (value > 0),
  min_order_value numeric(10,2) not null default 0 check (min_order_value >= 0),
  max_uses        int not null default 0 check (max_uses >= 0),  -- 0 = unlimited
  uses            int not null default 0 check (uses >= 0),
  starts_at       timestamptz not null default now(),
  expires_at      timestamptz,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index coupons_active_idx on public.coupons(is_active, expires_at);

create trigger coupons_updated_at
  before update on public.coupons
  for each row execute function public.set_updated_at();

-- ============================================================================
-- ORDERS
-- ============================================================================
-- `number` is the human-friendly identifier shown in the admin (AV-10001).
-- Customer fields are snapshotted at order time so historical orders remain
-- accurate even if the profile is edited or deleted.
-- ---------------------------------------------------------------------------
create sequence public.orders_number_seq start 10001;

create table public.orders (
  id                uuid primary key default gen_random_uuid(),
  number            text not null unique default ('AV-' || nextval('public.orders_number_seq')),
  profile_id        uuid references public.profiles(id) on delete set null,

  -- Snapshot of customer at purchase time
  customer_email    text not null,
  customer_name     text not null,
  customer_phone    text,

  status            public.order_status not null default 'pending',
  payment_status    public.payment_status not null default 'pending',

  subtotal          numeric(10,2) not null check (subtotal >= 0),
  shipping          numeric(10,2) not null default 0 check (shipping >= 0),
  discount          numeric(10,2) not null default 0 check (discount >= 0),
  tax               numeric(10,2) not null default 0 check (tax >= 0),
  total             numeric(10,2) not null check (total >= 0),

  coupon_id         uuid references public.coupons(id) on delete set null,
  coupon_code       text,  -- snapshotted

  -- Shipping address snapshot
  ship_recipient    text not null,
  ship_line1        text not null,
  ship_line2        text,
  ship_suburb       text not null,
  ship_state        text not null,
  ship_postcode     text not null,
  ship_country      text not null default 'Australia',

  carrier           text,
  tracking_number   text,

  payment_method    public.payment_method,
  payment_reference text unique,
  internal_notes    text,

  placed_at         timestamptz not null default now(),
  paid_at           timestamptz,
  shipped_at        timestamptz,
  delivered_at      timestamptz,
  cancelled_at      timestamptz,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index orders_profile_idx   on public.orders(profile_id);
create index orders_status_idx    on public.orders(status, placed_at desc);
create index orders_placed_at_idx on public.orders(placed_at desc);
create index orders_email_idx     on public.orders(customer_email);

create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Line items — also snapshot product fields so the row is self-describing.
-- ---------------------------------------------------------------------------
create table public.order_items (
  id                uuid primary key default gen_random_uuid(),
  order_id          uuid not null references public.orders(id) on delete cascade,
  product_id        uuid references public.products(id) on delete set null,
  product_slug      text not null,
  product_name      text not null,
  product_image_url text,
  selected_flavour  text,
  selected_nicotine text,
  quantity          int  not null check (quantity > 0),
  unit_price        numeric(10,2) not null check (unit_price >= 0),
  line_total        numeric(10,2) not null check (line_total >= 0),
  created_at        timestamptz not null default now()
);

create index order_items_order_idx   on public.order_items(order_id);
create index order_items_product_idx on public.order_items(product_id);

-- ---------------------------------------------------------------------------
-- Status history — every status change is logged for the timeline UI.
-- ---------------------------------------------------------------------------
create table public.order_status_history (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references public.orders(id) on delete cascade,
  status      public.order_status not null,
  note        text,
  changed_by  uuid references public.profiles(id) on delete set null,
  created_at  timestamptz not null default now()
);

create index order_status_history_order_idx on public.order_status_history(order_id, created_at);

-- Auto-log status changes.
create or replace function public.log_order_status_change()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    insert into public.order_status_history (order_id, status)
    values (new.id, new.status);
  end if;
  return new;
end;
$$;

create trigger orders_status_log
  after insert or update of status on public.orders
  for each row execute function public.log_order_status_change();

-- ============================================================================
-- REVIEWS
-- ============================================================================
create table public.reviews (
  id              uuid primary key default gen_random_uuid(),
  product_id      uuid not null references public.products(id) on delete cascade,
  profile_id      uuid references public.profiles(id) on delete set null,
  reviewer_name   text not null,
  reviewer_email  text,
  rating          int  not null check (rating between 1 and 5),
  title           text,
  body            text not null,
  status          public.review_status not null default 'pending',
  is_verified_buyer boolean not null default false,
  moderated_by    uuid references public.profiles(id) on delete set null,
  moderated_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  deleted_at      timestamptz
);

create index reviews_product_idx on public.reviews(product_id) where status = 'approved' and deleted_at is null;
create index reviews_status_idx  on public.reviews(status, created_at desc);

create trigger reviews_updated_at
  before update on public.reviews
  for each row execute function public.set_updated_at();

-- Keep product.rating + review_count in sync when reviews are approved.
create or replace function public.recompute_product_rating()
returns trigger
language plpgsql
as $$
declare
  pid uuid := coalesce(new.product_id, old.product_id);
begin
  update public.products p set
    rating = coalesce((
      select round(avg(rating)::numeric, 1)
      from public.reviews r
      where r.product_id = pid
        and r.status = 'approved'
        and r.deleted_at is null
    ), 0),
    review_count = (
      select count(*)
      from public.reviews r
      where r.product_id = pid
        and r.status = 'approved'
        and r.deleted_at is null
    )
  where p.id = pid;
  return null;
end;
$$;

create trigger reviews_rating_sync
  after insert or update or delete on public.reviews
  for each row execute function public.recompute_product_rating();

-- ============================================================================
-- AFFILIATES
-- ============================================================================
create table public.affiliates (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null,
  code               text not null unique,
  email              text not null,
  commission_percent numeric(5,2) not null default 10 check (commission_percent between 0 and 100),
  is_active          boolean not null default true,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create trigger affiliates_updated_at
  before update on public.affiliates
  for each row execute function public.set_updated_at();

create table public.affiliate_clicks (
  id            uuid primary key default gen_random_uuid(),
  affiliate_id  uuid not null references public.affiliates(id) on delete cascade,
  visitor_id    text,            -- hashed cookie identifier
  landing_path  text,
  referrer      text,
  user_agent    text,
  ip_country    text,
  created_at    timestamptz not null default now()
);

create index affiliate_clicks_affiliate_idx on public.affiliate_clicks(affiliate_id, created_at desc);

create table public.affiliate_conversions (
  id            uuid primary key default gen_random_uuid(),
  affiliate_id  uuid not null references public.affiliates(id) on delete cascade,
  order_id      uuid not null references public.orders(id) on delete cascade,
  revenue       numeric(10,2) not null check (revenue >= 0),
  commission    numeric(10,2) not null check (commission >= 0),
  paid_out      boolean not null default false,
  created_at    timestamptz not null default now(),
  unique (affiliate_id, order_id)
);

create index affiliate_conv_affiliate_idx on public.affiliate_conversions(affiliate_id, created_at desc);

-- ============================================================================
-- ADMIN / OBSERVABILITY
-- ============================================================================
-- Append-only log of admin write actions (used in audit UI later).
create table public.audit_log (
  id           uuid primary key default gen_random_uuid(),
  actor_id     uuid references public.profiles(id) on delete set null,
  actor_email  text,
  action       text not null,         -- e.g. 'product.update', 'order.refund'
  entity       text not null,         -- e.g. 'products'
  entity_id    uuid,
  diff         jsonb,
  created_at   timestamptz not null default now()
);

create index audit_log_entity_idx on public.audit_log(entity, entity_id, created_at desc);
create index audit_log_actor_idx  on public.audit_log(actor_id, created_at desc);

-- ============================================================================
-- VIEWS FOR THE ADMIN DASHBOARD
-- ============================================================================
-- Month-to-date KPIs (revenue, orders, AOV, new customers) — used directly
-- by the dashboard so the SQL stays out of application code.
-- ---------------------------------------------------------------------------
create or replace view public.dashboard_kpis as
with bounds as (
  select
    date_trunc('month', now())                    as start_this,
    date_trunc('month', now() - interval '1 month') as start_last
),
revenue as (
  select
    sum(total) filter (where placed_at >= b.start_this and status not in ('cancelled','refunded')) as revenue_this,
    sum(total) filter (where placed_at >= b.start_last and placed_at < b.start_this and status not in ('cancelled','refunded')) as revenue_last,
    count(*)   filter (where placed_at >= b.start_this) as orders_this,
    count(*)   filter (where placed_at >= b.start_last and placed_at < b.start_this) as orders_last
  from public.orders, bounds b
),
customers as (
  select
    count(*) filter (where created_at >= b.start_this) as customers_this,
    count(*) filter (where created_at >= b.start_last and created_at < b.start_this) as customers_last
  from public.profiles, bounds b
)
select
  coalesce(revenue_this, 0)  as revenue_this,
  coalesce(revenue_last, 0)  as revenue_last,
  coalesce(orders_this, 0)   as orders_this,
  coalesce(orders_last, 0)   as orders_last,
  coalesce(customers_this,0) as new_customers_this,
  coalesce(customers_last,0) as new_customers_last,
  case when orders_this > 0 then revenue_this / orders_this else 0 end as aov_this,
  case when orders_last > 0 then revenue_last / orders_last else 0 end as aov_last
from revenue, customers;

-- Low-stock products (matches dashboard list + inventory page).
create or replace view public.low_stock_products as
select
  p.id, p.slug, p.name, p.sku, p.stock_count, p.price,
  (select url from public.product_images i where i.product_id = p.id order by position limit 1) as image_url,
  b.name as brand_name
from public.products p
left join public.brands b on b.id = p.brand_id
where p.deleted_at is null
  and p.stock_count is not null
  and p.stock_count < p.low_stock_threshold
order by p.stock_count asc;

-- ============================================================================
-- Payment methods: PayID + Bitcoin
-- ============================================================================
-- Removes the Stripe-specific column from orders and adds:
--   • payment_method        — which method the customer chose
--   • payment_reference     — unique code the sales team uses to match
--                             incoming PayID transfers / BTC deposits to
--                             the order. Generated server-side at order time.
-- Run once against an existing Supabase database. Idempotent.
-- ============================================================================

do $$
begin
  if not exists (select 1 from pg_type where typname = 'payment_method') then
    create type public.payment_method as enum ('payid', 'bitcoin');
  end if;
end$$;

alter table public.orders drop column if exists stripe_payment_intent_id;
alter table public.orders add column if not exists payment_method public.payment_method;
alter table public.orders add column if not exists payment_reference text unique;

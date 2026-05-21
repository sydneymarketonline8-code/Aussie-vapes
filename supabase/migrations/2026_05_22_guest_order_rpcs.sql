-- ============================================================================
-- Guest-checkout RPCs (SECURITY DEFINER)
-- ============================================================================
-- The anon role can INSERT into orders for guest checkout, but RLS blocks:
--   • The status-history trigger from inserting into order_status_history
--   • The `.insert(...).select()` round-trip from returning the new row
--   • The /checkout/success/[reference] page from reading the order back
--
-- This migration replaces direct order writes/reads from anon with two
-- SECURITY DEFINER functions:
--   • create_guest_order(payload jsonb)   — inserts the order, returns id+number
--   • get_order_for_payment(ref text)     — returns minimal payment-instruction
--                                            fields for the success page
--
-- Also marks the existing log_order_status_change trigger as SECURITY DEFINER
-- so it can write order_status_history regardless of who inserted the order.
-- Run once. Idempotent.
-- ============================================================================

-- 1. Status-history trigger must run as definer so the audit row gets created
--    even when anon inserts a guest order.
create or replace function public.log_order_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    insert into public.order_status_history (order_id, status)
    values (new.id, new.status);
  end if;
  return new;
end;
$$;

-- 2. Guest order creation. Returns just the id + number the client needs to
--    insert order_items (RLS already allows that for orders with profile_id
--    is null).
create or replace function public.create_guest_order(payload jsonb)
returns table (order_id uuid, order_number text)
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
  new_number text;
begin
  insert into public.orders (
    customer_email, customer_name, customer_phone,
    status, payment_status,
    subtotal, shipping, total,
    ship_recipient, ship_line1, ship_suburb, ship_state, ship_postcode, ship_country,
    payment_method, payment_reference
  ) values (
    payload->>'customer_email',
    payload->>'customer_name',
    nullif(payload->>'customer_phone', ''),
    'pending', 'pending',
    (payload->>'subtotal')::numeric,
    (payload->>'shipping')::numeric,
    (payload->>'total')::numeric,
    payload->>'ship_recipient',
    payload->>'ship_line1',
    payload->>'ship_suburb',
    payload->>'ship_state',
    payload->>'ship_postcode',
    coalesce(payload->>'ship_country', 'Australia'),
    (payload->>'payment_method')::public.payment_method,
    payload->>'payment_reference'
  )
  returning id, number into new_id, new_number;

  return query select new_id, new_number;
end;
$$;

revoke all on function public.create_guest_order(jsonb) from public;
grant execute on function public.create_guest_order(jsonb) to anon, authenticated;

-- 3. Read minimal order data by reference for the payment-instructions page.
--    Returns only the fields the success page renders — no shipping address,
--    no internal notes. Reference codes are random and unguessable, so this
--    is safe to expose to anon.
create or replace function public.get_order_for_payment(ref text)
returns table (
  number text,
  total numeric,
  customer_email text,
  payment_method text,
  payment_reference text,
  payment_status text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    o.number,
    o.total,
    o.customer_email,
    o.payment_method::text,
    o.payment_reference,
    o.payment_status::text
  from public.orders o
  where o.payment_reference = ref;
$$;

revoke all on function public.get_order_for_payment(text) from public;
grant execute on function public.get_order_for_payment(text) to anon, authenticated;

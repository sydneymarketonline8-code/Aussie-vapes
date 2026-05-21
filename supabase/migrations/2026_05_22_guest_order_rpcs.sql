-- ============================================================================
-- Guest-checkout RPCs (SECURITY DEFINER)
-- ============================================================================
-- The anon role can't satisfy RLS for:
--   • The status-history trigger writing to order_status_history
--   • The post-INSERT SELECT round-trip on orders
--   • Reading the order back on /checkout/success/[reference]
--   • The EXISTS check in the order_items insert policy (needs SELECT on
--     orders, which anon doesn't have)
--
-- This migration wraps the full guest order write (parent + line items) in a
-- single SECURITY DEFINER function so anon can place an order atomically.
-- Read-back is via a second SECURITY DEFINER function that returns only the
-- fields the payment-instructions page needs.
--
-- Also marks log_order_status_change SECURITY DEFINER so the audit row gets
-- created regardless of who inserts the order.
-- Run once. Idempotent.
-- ============================================================================

-- 1. Status-history trigger must run as definer so the audit row is created
--    when anon inserts a guest order.
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

-- 2. Guest order creation — order header + line items in one transaction.
--
-- payload shape:
--   {
--     customer_email, customer_name, customer_phone,
--     subtotal, shipping, total,
--     ship_recipient, ship_line1, ship_suburb, ship_state, ship_postcode, ship_country,
--     payment_method, payment_reference,
--     items: [
--       { product_id, product_slug, product_name, product_image_url,
--         selected_flavour, selected_nicotine, quantity, unit_price }, ...
--     ]
--   }
create or replace function public.create_guest_order(payload jsonb)
returns table (order_id uuid, order_number text)
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
  new_number text;
  item jsonb;
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

  for item in select * from jsonb_array_elements(payload->'items')
  loop
    insert into public.order_items (
      order_id, product_id, product_slug, product_name, product_image_url,
      selected_flavour, selected_nicotine,
      quantity, unit_price, line_total
    ) values (
      new_id,
      nullif(item->>'product_id', '')::uuid,
      item->>'product_slug',
      item->>'product_name',
      nullif(item->>'product_image_url', ''),
      nullif(item->>'selected_flavour', ''),
      nullif(item->>'selected_nicotine', ''),
      (item->>'quantity')::int,
      (item->>'unit_price')::numeric,
      (item->>'quantity')::int * (item->>'unit_price')::numeric
    );
  end loop;

  return query select new_id, new_number;
end;
$$;

revoke all on function public.create_guest_order(jsonb) from public;
grant execute on function public.create_guest_order(jsonb) to anon, authenticated;

-- 3. Read minimal order data by reference for the payment-instructions page.
--    Returns only what the success page renders — no shipping address.
--    Safe to expose to anon because the reference is 10 random base32 chars
--    (~1.1e15 possibilities) and not enumerable.
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

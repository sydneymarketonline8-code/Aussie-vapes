-- ============================================================================
-- Add customer_name to get_order_for_payment return shape
-- ============================================================================
-- The checkout success page hands off to WhatsApp with a pre-filled order
-- summary. To greet the customer by name in that message, the success page
-- needs customer_name from the RPC.
--
-- Idempotent: re-creating the function with the new return shape requires a
-- drop because Postgres treats the return-table signature as part of the
-- function identity.
-- ============================================================================

drop function if exists public.get_order_for_payment(text);

create or replace function public.get_order_for_payment(ref text)
returns table (
  number text,
  total numeric,
  customer_email text,
  customer_name text,
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
    o.customer_name,
    o.payment_method::text,
    o.payment_reference,
    o.payment_status::text
  from public.orders o
  where o.payment_reference = ref;
$$;

revoke all on function public.get_order_for_payment(text) from public;
grant execute on function public.get_order_for_payment(text) to anon, authenticated;

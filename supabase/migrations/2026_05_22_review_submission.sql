-- ============================================================================
-- Customer review submission (guest-friendly)
-- ============================================================================
-- Storefront customers sign in via a custom cookie, not Supabase Auth, so
-- the "reviews owner insert" RLS policy (which requires auth.uid()) can't
-- apply. Wrap the insert in a SECURITY DEFINER RPC instead, forced into
-- the moderation queue (status='pending') so spam can be filtered in
-- /admin/reviews.
--
-- Payload shape:
--   {
--     product_id, reviewer_name, reviewer_email,
--     rating (1-5), title, body
--   }
-- Run once. Idempotent.
-- ============================================================================

create or replace function public.submit_product_review(payload jsonb)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
  v_product_id uuid := (payload->>'product_id')::uuid;
  v_rating int := (payload->>'rating')::int;
begin
  if v_product_id is null then
    raise exception 'product_id is required';
  end if;
  if v_rating < 1 or v_rating > 5 then
    raise exception 'rating must be between 1 and 5';
  end if;
  if coalesce(trim(payload->>'reviewer_name'), '') = '' then
    raise exception 'reviewer_name is required';
  end if;
  if coalesce(trim(payload->>'body'), '') = '' then
    raise exception 'body is required';
  end if;

  insert into public.reviews (
    product_id, reviewer_name, reviewer_email,
    rating, title, body, status
  ) values (
    v_product_id,
    trim(payload->>'reviewer_name'),
    nullif(trim(payload->>'reviewer_email'), ''),
    v_rating,
    nullif(trim(payload->>'title'), ''),
    trim(payload->>'body'),
    'pending'
  )
  returning id into new_id;

  return new_id;
end;
$$;

revoke all on function public.submit_product_review(jsonb) from public;
grant execute on function public.submit_product_review(jsonb) to anon, authenticated;

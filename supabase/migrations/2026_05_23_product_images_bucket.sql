-- ============================================================================
-- Product images: Supabase Storage bucket + policies
-- ============================================================================
-- Creates a public-read bucket "product-images" with admin-only writes.
-- Public read is fine because product images are public assets — the admin
-- product editor uploads here, and the storefront just renders the public
-- URLs from product_images.url.
--
-- Run once. Idempotent.
-- ============================================================================

-- Ensure public.is_admin() exists. Normally lives in rls.sql; redefined here
-- so this migration is self-contained even if rls.sql wasn't applied.
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

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  10485760,                           -- 10 MB per file
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Policies on storage.objects (idempotent: drop-and-recreate)
drop policy if exists "product-images public read" on storage.objects;
drop policy if exists "product-images admin write" on storage.objects;
drop policy if exists "product-images admin delete" on storage.objects;

create policy "product-images public read"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "product-images admin write"
  on storage.objects for insert
  with check (bucket_id = 'product-images' and public.is_admin());

create policy "product-images admin delete"
  on storage.objects for delete
  using (bucket_id = 'product-images' and public.is_admin());

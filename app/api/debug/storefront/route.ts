import { NextResponse } from 'next/server'
import { getSupabasePublicClient } from '@/lib/supabase/public'

export const dynamic = 'force-dynamic'

/**
 * Diagnostic endpoint — verbose. Returns every query result, every error,
 * and tries the slug lookup three different ways so we can see exactly
 * which form is failing.
 *
 * Delete after the storefront is stable.
 */
export async function GET() {
  const supabase = getSupabasePublicClient()
  const out: Record<string, unknown> = {
    env: {
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? null,
    },
  }

  // 1. Full categories list — verify slugs are what we expect
  {
    const { data, error } = await supabase
      .from('categories')
      .select('id, slug, name')
      .order('position')
    out.categoriesList = {
      rows: data ?? [],
      error: error?.message ?? null,
    }
  }

  // 2. Slug lookup using .maybeSingle() (the current production code path)
  {
    const { data, error } = await supabase
      .from('categories')
      .select('id, slug')
      .eq('slug', 'disposable-vapes')
      .maybeSingle()
    out.slugLookupMaybeSingle = {
      data,
      error: error?.message ?? null,
      errorCode: (error as { code?: string } | null)?.code ?? null,
    }
  }

  // 3. Slug lookup using .limit(1) + array index (alternative form)
  {
    const { data, error } = await supabase
      .from('categories')
      .select('id, slug')
      .eq('slug', 'disposable-vapes')
      .limit(1)
    out.slugLookupLimit = {
      data,
      error: error?.message ?? null,
    }
  }

  // 4. Slug lookup using .filter() (yet another alternative)
  {
    const { data, error } = await supabase
      .from('categories')
      .select('id, slug')
      .filter('slug', 'eq', 'disposable-vapes')
    out.slugLookupFilter = {
      data,
      error: error?.message ?? null,
    }
  }

  // 5. Slug lookup using ilike (case-insensitive — to rule out casing)
  {
    const { data, error } = await supabase
      .from('categories')
      .select('id, slug')
      .ilike('slug', 'disposable-vapes')
    out.slugLookupIlike = {
      data,
      error: error?.message ?? null,
    }
  }

  // 6. Most-bare possible: get all 5 categories without filter, then JS-find
  {
    const { data, error } = await supabase.from('categories').select('id, slug, name')
    const found = (data ?? []).find((c) => c.slug === 'disposable-vapes')
    out.slugLookupJsFind = {
      found: found ?? null,
      anyMatch: !!found,
      allSlugs: (data ?? []).map((c) => c.slug),
      error: error?.message ?? null,
    }
  }

  // 7. Active product count (already known to work — control)
  {
    const { count, error } = await supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'active')
      .is('deleted_at', null)
    out.productCount = { count: count ?? 0, error: error?.message ?? null }
  }

  return NextResponse.json(out, {
    headers: { 'Cache-Control': 'no-store' },
  })
}

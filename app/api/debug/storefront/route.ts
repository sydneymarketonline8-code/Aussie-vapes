import { NextResponse } from 'next/server'
import { getSupabasePublicClient } from '@/lib/supabase/public'

export const dynamic = 'force-dynamic'

/**
 * Diagnostic endpoint that runs the exact storefront queries server-side
 * and returns row counts + any errors as JSON. Useful when the page renders
 * with 0 products and you want to know if it's the data layer, the query,
 * a timeout, or something else.
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

  // 1. Can we read categories?
  {
    const start = Date.now()
    const { data, error } = await supabase.from('categories').select('id, slug')
    out.categories = {
      rows: data?.length ?? 0,
      error: error?.message ?? null,
      ms: Date.now() - start,
    }
  }

  // 2. Cheap count of active products (no joins)
  {
    const start = Date.now()
    const { count, error } = await supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'active')
      .is('deleted_at', null)
    out.productCount = { count: count ?? 0, error: error?.message ?? null, ms: Date.now() - start }
  }

  // 3. Slim select of disposable-vapes products (mimics the category page query)
  {
    const start = Date.now()
    const { data: cat } = await supabase.from('categories').select('id').eq('slug', 'disposable-vapes').maybeSingle()
    if (!cat) {
      out.disposableVapesQuery = { error: 'category disposable-vapes not found', rows: 0 }
    } else {
      const { data, error } = await supabase
        .from('products')
        .select('id, slug, name, sku, price, in_stock, rating, brand:brand_id(display_name), product_images(url, position)')
        .eq('status', 'active')
        .is('deleted_at', null)
        .eq('category_id', cat.id)
        .range(0, 9999)
      out.disposableVapesQuery = {
        rows: data?.length ?? 0,
        error: error?.message ?? null,
        errorCode: (error as { code?: string } | null)?.code ?? null,
        firstRow: data?.[0] ?? null,
        ms: Date.now() - start,
      }
    }
  }

  // 4. Even slimmer — no joins at all
  {
    const start = Date.now()
    const { data, error } = await supabase
      .from('products')
      .select('id, slug, name, price')
      .eq('status', 'active')
      .is('deleted_at', null)
      .range(0, 9999)
    out.bareProducts = {
      rows: data?.length ?? 0,
      error: error?.message ?? null,
      ms: Date.now() - start,
    }
  }

  return NextResponse.json(out, {
    headers: { 'Cache-Control': 'no-store' },
  })
}

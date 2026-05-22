'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/admin-auth'

export interface UpdateProductInput {
  name: string
  shortDescription: string
  description: string
  tags: string[]
  price: number
  comparePrice: number | null
  sku: string
  stockCount: number | null
  inStock: boolean
  status: 'draft' | 'active' | 'archived'
  isNew: boolean
  isBestSeller: boolean
  isSale: boolean
  features: string[]
  flavours: string[]
  nicotineStrengths: string[]
  seoTitle: string
  seoDescription: string
}

export async function updateProduct(id: string, input: UpdateProductInput) {
  if (!(await isAdmin())) return { ok: false as const, error: 'Not authorised' }

  if (!input.name.trim()) return { ok: false as const, error: 'Name is required' }
  if (!input.sku.trim()) return { ok: false as const, error: 'SKU is required' }
  if (!(input.price >= 0)) return { ok: false as const, error: 'Price must be 0 or greater' }
  if (input.comparePrice != null && input.comparePrice < input.price) {
    return { ok: false as const, error: 'Compare-at price must be ≥ price' }
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('products')
    .update({
      name: input.name.trim(),
      short_description: input.shortDescription,
      description: input.description,
      tags: input.tags,
      price: input.price,
      compare_price: input.comparePrice,
      sku: input.sku.trim(),
      stock_count: input.stockCount,
      in_stock: input.inStock,
      status: input.status,
      is_new: input.isNew,
      is_best_seller: input.isBestSeller,
      is_sale: input.isSale,
      features: input.features,
      flavours: input.flavours,
      nicotine_strengths: input.nicotineStrengths,
      seo_title: input.seoTitle,
      seo_description: input.seoDescription,
    })
    .eq('id', id)

  if (error) {
    console.error('[updateProduct] failed', error)
    if (error.code === '23505') return { ok: false as const, error: 'A product with that SKU already exists' }
    return { ok: false as const, error: error.message }
  }

  revalidatePath('/admin/products')
  revalidatePath('/admin/inventory')
  revalidatePath(`/admin/products/${id}`)
  // The storefront product page is statically generated — revalidate by tag
  // would be ideal, but a simple per-slug path bump works too.
  return { ok: true as const }
}

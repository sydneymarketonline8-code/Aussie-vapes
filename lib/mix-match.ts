import type { Product } from '@/types'

/**
 * Number of devices the shopper picks for a "N PACK MIX & MATCH" product,
 * or 0 for normal products. Kept free of catalogue imports so client
 * components can use it without bundling lib/products.ts.
 */
export function mixMatchSize(p: Pick<Product, 'name' | 'flavours'>): number {
  if (!/mix\s*(?:&|and)\s*match/i.test(p.name) || !p.flavours?.length) return 0
  const m = p.name.match(/(\d+)\s*-?\s*pack/i)
  return m ? parseInt(m[1], 10) : 0
}

/** "2× Mango Boom, 1× Grape Lemon, 1× Skittles" — stored as the cart line's flavour. */
export function formatMixMatchSelection(counts: Record<string, number>): string {
  return Object.entries(counts)
    .filter(([, n]) => n > 0)
    .map(([f, n]) => `${n}× ${f}`)
    .join(', ')
}

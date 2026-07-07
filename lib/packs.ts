import type { ComponentType, SVGProps } from 'react'
import {
  Squares2X2Icon,
  CubeIcon,
  GiftIcon,
  TagIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import { PRODUCTS } from './products'
import type { Product } from '@/types'

type HeroIcon = ComponentType<SVGProps<SVGSVGElement> & { title?: string; titleId?: string }>

export interface PackGroup {
  slug: string
  name: string
  description: string
  shortDescription: string
  seoTitle: string
  seoDescription: string
  keywords: string[]
  longDescription: string
  matcher: (p: Product) => boolean
  accentColor: string
  icon: HeroIcon
}

const PACK_REGEX = /(\d+)[\s-]*(?:pack|items?)\b|bundle|combo|multi[\s-]buy/i

/** Extract pack quantity from product name (e.g. "5 Pack" → 5). */
export function extractPackSize(name: string): number {
  const m = name.match(/(\d+)\s*-?\s*pack/i) || name.match(/pack\s+(\d+)/i)
  if (m) return parseInt(m[1], 10)
  if (/bundle/i.test(name)) {
    const m2 = name.match(/(\d+)/)
    if (m2) return parseInt(m2[1], 10)
  }
  return 1
}

/** Is this product a "pack" of any kind? */
export function isPackProduct(p: Product): boolean {
  return PACK_REGEX.test(p.name) && extractPackSize(p.name) > 1
}

export const PACK_GROUPS: PackGroup[] = [
  {
    slug: 'disposable-vape-packs',
    name: 'Disposable Vape Packs',
    icon: Squares2X2Icon,
    accentColor: '#ff0000',
    shortDescription: 'Multi-device packs of authentic Australian disposable vapes — save more, vape longer.',
    description: 'Every pack-format disposable vape stocked at Vapes Australia. Save 10-25% per device vs single-unit pricing.',
    longDescription:
      "The Vapes Australia Disposable Vape Packs collection brings together every pack-format disposable in our catalogue. Whether you're after a Crown Bar 15000 5-pack, an IGET Bar 10-pack, or a Lost Mary multi-buy, this is the fastest way to compare per-device pricing across 40+ brands. All Vapes Australia pack-format disposables are TGA-compliant 20mg salt nicotine and ship same-day from our Sydney warehouse. Free shipping over $300 — and a pack will almost always qualify.",
    seoTitle: 'Disposable Vape Packs Australia — Save On Multi-Buy | Vapes Australia',
    seoDescription:
      "Buy disposable vape packs online in Australia. 2-pack, 3-pack, 5-pack, 10-pack & bulk multi-buy bundles from IGET, Alfakher, HQD, Gunnpod & more. Vapes Australia.",
    keywords: [
      'disposable vape packs australia',
      'vape packs australia',
      'vape packs',
      'vapes australia packs',
      'disposable vape bundles australia',
      'vape pack deals australia',
      'iget pack australia',
      'alfakher pack australia',
      '5 pack disposable vape australia',
      '10 pack disposable vape australia',
    ],
    matcher: (p) => isPackProduct(p) && p.category === 'disposable-vapes',
  },
  {
    slug: 'multi-buy-packs',
    name: 'Multi-Buy Packs',
    icon: CubeIcon,
    accentColor: '#4cbb6c',
    shortDescription: '2-pack and 3-pack bundles — perfect for personal stock-up or sharing with mates.',
    description: 'Smaller multi-buy packs ideal for personal stockpiling, gifting, or testing different flavours.',
    longDescription:
      "Vapes Australia Multi-Buy Packs are 2-pack and 3-pack bundles sized for personal use. These are the perfect entry into pack pricing — try a couple of devices at once, mix flavours, or stock up your weekend kit without committing to a 10-pack carton. Multi-buy savings on Vapes Australia typically range 8-15% per device vs single-unit pricing. Available across IGET, Alfakher, HQD, Gunnpod, Lost Mary, Vozol and 35+ more brands.",
    seoTitle: 'Multi-Buy Vape Packs Australia — 2-Pack & 3-Pack Deals | Vapes Australia',
    seoDescription:
      "Vapes Australia multi-buy packs. 2-pack and 3-pack bundles across IGET, Alfakher, HQD, Gunnpod, Lost Mary & 35+ brands. Same-day Sydney dispatch.",
    keywords: [
      'multi buy vape packs australia',
      'vapes australia multi buy',
      '2 pack vape australia',
      '3 pack vape australia',
      'vape 3 pack deals australia',
      'vape 2 pack',
    ],
    matcher: (p) => isPackProduct(p) && [2, 3].includes(extractPackSize(p.name)),
  },
  {
    slug: 'bundle-deals',
    name: 'Bundle Deals',
    icon: GiftIcon,
    accentColor: '#ff9a52',
    shortDescription: 'Discounted bundles where multiple devices are paired at a special price.',
    description: 'The best discounts at Vapes Australia — pack-format products where the bundle savings are deepest.',
    longDescription:
      "Bundle Deals at Vapes Australia are pack-format products with the deepest per-unit discounts vs single purchase. These are the products our team negotiates hardest with distributors to bring you the lowest Aussie vape prices. New bundle deals land weekly — bookmark this page and check back. Same authentic stock, same 30-day return guarantee, same same-day Sydney dispatch.",
    seoTitle: 'Vape Bundle Deals Australia — Best Pack Discounts | Vapes Australia',
    seoDescription:
      "Vape bundle deals from Vapes Australia. The deepest pack discounts on IGET, Alfakher, HQD, Gunnpod and more. Save up to 25% per device. Same-day Sydney shipping.",
    keywords: [
      'vape bundle deals australia',
      'vapes australia bundles',
      'vape bundle australia',
      'cheap vape packs australia',
      'discount vape bundles',
      'vape bundle deals',
      'best vape bundle australia',
    ],
    matcher: (p) => (isPackProduct(p) && (p.isSale === true || /bundle/i.test(p.name))) || (isPackProduct(p) && !!p.comparePrice),
  },
  {
    slug: 'brand-packs',
    name: 'Brand Packs',
    icon: TagIcon,
    accentColor: '#2fb5d2',
    shortDescription: 'Pack-format devices from the major Vapes Australia brands — IGET, Alfakher, HQD, Gunnpod & more.',
    description: 'Curated brand-specific pack selection from the heavy hitters of the Australian disposable vape market.',
    longDescription:
      "Vapes Australia Brand Packs feature pack-format products from the headline brands of the Australian disposable vape market: IGET, Alfakher Crown Bar, HQD, Gunnpod, Lost Mary, Vozol, RELX, Elux. If you're loyal to a specific brand, this is the page to find every pack size that brand offers in one place. All Vapes Australia brand packs are authentic, sourced through authorised distribution channels, and ship same-day from Sydney.",
    seoTitle: 'Brand Vape Packs Australia — IGET, Alfakher, HQD, Gunnpod | Vapes Australia',
    seoDescription:
      "Vapes Australia brand-specific vape packs. IGET packs, Alfakher Crown Bar packs, HQD packs, Gunnpod packs and more. Authentic AU stock with same-day Sydney shipping.",
    keywords: [
      'brand vape packs australia',
      'iget vape packs',
      'alfakher packs australia',
      'hqd packs australia',
      'gunnpod packs australia',
      'vapes australia brand packs',
      'vape packs by brand australia',
    ],
    matcher: (p) => {
      if (!isPackProduct(p)) return false
      const top = ['iget', 'alfakher', 'hqd', 'gunnpod', 'lost', 'vozol', 'relx', 'elux']
      const brandLower = p.brand.toLowerCase()
      return top.some((t) => brandLower.includes(t)) || top.some((t) => p.name.toLowerCase().includes(t))
    },
  },
  {
    slug: 'bulk-vape-packs',
    name: 'Bulk Vape Packs',
    icon: TruckIcon,
    accentColor: '#1f1f1f',
    shortDescription: '10-pack, 20-pack, 50-pack and 100-pack cartons — bulk pricing for heavy users and resellers.',
    description: 'Wholesale-style bulk packs (10+ devices) with the deepest per-unit discounts at Vapes Australia.',
    longDescription:
      "Vapes Australia Bulk Vape Packs are 10-pack, 20-pack, 50-pack and 100-pack cartons priced for heavy users, businesses, event organisers and B2B resellers. Per-unit savings on 10-pack tier disposables typically run 18-25%; 20-pack and 50-pack pricing unlocks even deeper discounts. For dedicated wholesale partnerships with net-30 terms see our /bulk page. Otherwise, every bulk pack on this page is in stock and dispatches same-day from Sydney.",
    seoTitle: 'Bulk Vape Packs Australia — 10, 20, 50 & 100 Pack Cartons | Vapes Australia',
    seoDescription:
      "Vapes Australia bulk vape packs. 10-pack, 20-pack, 50-pack and 100-pack cartons of authentic disposable vapes. Wholesale pricing, same-day Sydney dispatch.",
    keywords: [
      'bulk vape packs australia',
      'wholesale vape packs australia',
      'vapes australia bulk',
      '10 pack vape australia',
      '20 pack vape australia',
      '50 pack vape australia',
      'bulk disposable vapes australia',
      'vape bulk packs',
    ],
    matcher: (p) => isPackProduct(p) && extractPackSize(p.name) >= 10,
  },
]

export function getAllPacks(): Product[] {
  return PRODUCTS.filter(isPackProduct)
}

export function getPacksByGroup(slug: string): Product[] {
  const group = PACK_GROUPS.find((g) => g.slug === slug)
  if (!group) return []
  return PRODUCTS.filter(group.matcher)
}

export function getPackGroupBySlug(slug: string): PackGroup | undefined {
  return PACK_GROUPS.find((g) => g.slug === slug)
}

/** Group counts for the landing page. */
export function getPackGroupCounts(): { slug: string; count: number }[] {
  return PACK_GROUPS.map((g) => ({
    slug: g.slug,
    count: PRODUCTS.filter(g.matcher).length,
  }))
}

/** Top sale/discount packs for homepage featured. */
export function getFeaturedPacks(limit = 8): Product[] {
  const all = getAllPacks()
  // Prefer sale items, then bundles, then high-pack-size items
  const sorted = [...all].sort((a, b) => {
    const aScore = (a.isSale ? 10 : 0) + (extractPackSize(a.name) >= 5 ? 5 : 0) + (a.comparePrice ? 3 : 0)
    const bScore = (b.isSale ? 10 : 0) + (extractPackSize(b.name) >= 5 ? 5 : 0) + (b.comparePrice ? 3 : 0)
    return bScore - aScore
  })
  return sorted.slice(0, limit)
}

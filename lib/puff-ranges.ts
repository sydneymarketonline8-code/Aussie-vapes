import type { ComponentType, SVGProps } from 'react'
import {
  SparklesIcon,
  ScaleIcon,
  FireIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'
import { PRODUCTS } from './products'
import type { Product } from '@/types'

type HeroIcon = ComponentType<SVGProps<SVGSVGElement> & { title?: string; titleId?: string }>

export interface PuffRange {
  slug: string
  name: string
  shortName: string
  min: number
  max: number
  description: string
  longDescription: string
  seoTitle: string
  seoDescription: string
  keywords: string[]
  icon: HeroIcon
}

export const PUFF_RANGES: PuffRange[] = [
  {
    slug: 'starter-vapes',
    name: 'Starter Vapes (Under 2,500 Puffs)',
    shortName: 'Under 2,500',
    min: 0,
    max: 2499,
    description: 'Compact, pocket-friendly disposables perfect for first-time vapers and ex-smokers.',
    longDescription:
      "Aussie Vapes' starter range covers entry-level disposable vapes under 2,500 puffs. Ideal for ex-smokers testing the waters, casual vapers who want a small device, or anyone after the lowest per-device price point. Most starter vapes are non-rechargeable and run on a built-in battery designed to last the full puff count.",
    seoTitle: 'Starter Vapes Under 2,500 Puffs Australia | Aussie Vapes',
    seoDescription:
      'Browse compact starter disposable vapes under 2,500 puffs at Aussie Vapes. Perfect for first-time AU vapers. Same-day Sydney shipping.',
    keywords: [
      'starter vape australia',
      'cheap disposable vape australia',
      'small vape australia',
      'aussie vapes starter',
      '2000 puff vape australia',
    ],
    icon: SparklesIcon,
  },
  {
    slug: 'mid-range-vapes',
    name: 'Mid-Range Vapes (2,500 - 6,000 Puffs)',
    shortName: '2,500 - 6,000',
    min: 2500,
    max: 5999,
    description: 'The sweet spot — rechargeable mid-range disposables balancing capacity, flavour and price.',
    longDescription:
      "Mid-range Aussie Vapes disposables — from the IGET Bar 3500 to the Gunnpod Plus 4500 and HQD Slick 6000 — strike the best balance between cost and longevity. Most are USB-C rechargeable with mesh coil systems, lasting 5-10 days for a moderate vaper. This is the most-shopped puff range at Aussie Vapes.",
    seoTitle: 'Mid-Range Disposable Vapes 2,500-6,000 Puffs Australia | Aussie Vapes',
    seoDescription:
      'Shop mid-range disposable vapes 2,500-6,000 puffs at Aussie Vapes. IGET Bar, Gunnpod, HQD and more. Same-day Sydney dispatch.',
    keywords: [
      'mid range disposable vape australia',
      '3500 puff vape australia',
      '5000 puff vape australia',
      '6000 puff vape australia',
      'aussie vapes mid range',
    ],
    icon: ScaleIcon,
  },
  {
    slug: 'high-puff-vapes',
    name: 'High-Puff Vapes (6,000 - 12,000 Puffs)',
    shortName: '6,000 - 12,000',
    min: 6000,
    max: 11999,
    description: 'High-capacity rechargeable disposables that last 1-2 weeks per device.',
    longDescription:
      'High-puff Aussie Vapes disposables (6,000-12,000 puffs) cover the workhorse tier favoured by experienced vapers. The IGET Bar Plus 6000, Alfakher Crown Bar 8000, Gunnpod Moss 8000 and IGET One 12,000 all live here. Every device in this range is USB-C rechargeable, with dual mesh coil systems and adjustable airflow on most models.',
    seoTitle: 'High-Puff Disposable Vapes 6,000-12,000 Australia | Aussie Vapes',
    seoDescription:
      'Shop high-puff disposable vapes 6,000-12,000 puffs at Aussie Vapes. IGET Bar Plus, Alfakher 8000, IGET One 12000. Same-day Sydney dispatch.',
    keywords: [
      'high puff vape australia',
      '6000 puff disposable vape australia',
      '8000 puff vape australia',
      '10000 puff vape australia',
      '12000 puff vape australia',
      'aussie vapes high puff',
    ],
    icon: FireIcon,
  },
  {
    slug: 'ultra-puff-vapes',
    name: 'Ultra-Puff Vapes (12,000+ Puffs)',
    shortName: '12,000+',
    min: 12000,
    max: 99999,
    description: 'Marathon disposables — 15,000, 20,000 and 25,000 puff devices that last weeks.',
    longDescription:
      'Ultra-puff Aussie Vapes disposables (12,000+ puffs) are the longest-life devices on the Australian market. The Alfakher Crown Bar 15,000, ELUX 15,000, HQD Cuvie Slick 20,000 and Kuz Flow 25,000 all live here. These are the best per-puff value, particularly for heavy vapers — a single device can last 2-4 weeks of moderate use.',
    seoTitle: 'Ultra-Puff Vapes 12,000+ Puffs Australia | Aussie Vapes',
    seoDescription:
      'Shop ultra-puff disposable vapes 12,000+ puffs at Aussie Vapes. 15K, 20K and 25K puff devices. Same-day Sydney dispatch.',
    keywords: [
      'ultra puff vape australia',
      '15000 puff vape australia',
      '20000 puff vape australia',
      '25000 puff vape australia',
      'longest lasting disposable vape australia',
      'aussie vapes ultra puff',
    ],
    icon: TrophyIcon,
  },
]

function extractPuffCount(name: string): number | null {
  const m = name.match(/(\d{3,6})\s*(?:k|K)?\s*PUFFS?/i)
  if (m) return parseInt(m[1], 10)
  return null
}

export function getPuffRangeBySlug(slug: string): PuffRange | undefined {
  return PUFF_RANGES.find((r) => r.slug === slug)
}

export function getProductsByPuffRange(slug: string): Product[] {
  const r = getPuffRangeBySlug(slug)
  if (!r) return []
  return PRODUCTS.filter((p) => {
    const puffs = extractPuffCount(p.name)
    return puffs !== null && puffs >= r.min && puffs <= r.max
  })
}

export function getPuffRangeCounts(): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const r of PUFF_RANGES) counts[r.slug] = 0
  for (const p of PRODUCTS) {
    const puffs = extractPuffCount(p.name)
    if (!puffs) continue
    for (const r of PUFF_RANGES) {
      if (puffs >= r.min && puffs <= r.max) {
        counts[r.slug] = (counts[r.slug] || 0) + 1
        break
      }
    }
  }
  return counts
}

/** Canonical list of popular flavour search terms for the Shop by Flavour module. */
export const POPULAR_FLAVOURS = [
  'Watermelon Ice',
  'Mango Ice',
  'Lush Ice',
  'Blueberry Raspberry',
  'Strawberry Ice',
  'Cool Mint',
  'Grape Ice',
  'Peach Ice',
  'Lemon Mint',
  'Bubblegum',
  'Cola Ice',
  'Passion Fruit',
  'Lychee Ice',
  'Pineapple Ice',
  'Two Apple',
  'Banana Ice',
]

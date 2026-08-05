import type { MetadataRoute } from 'next'
import { getAllActiveProductSlugs } from '@/lib/storefront-products'
import { CATEGORIES } from '@/lib/categories'
import { BRANDS } from '@/lib/brands'
import { CITIES } from '@/lib/cities'
import { PACK_GROUPS } from '@/lib/packs'
import { PUFF_RANGES } from '@/lib/puff-ranges'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vapehubvapesaustralia.com.au'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Tier 1 — Top-level, daily/weekly change
  const tier1: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/brands`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${SITE_URL}/packs`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${SITE_URL}/puffs`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/vapehub-vapes-australia`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/sale`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/new-arrivals`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/sitemap-html`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
  ]

  // Tier 2 — Pack group pages
  const packRoutes: MetadataRoute.Sitemap = PACK_GROUPS.map((g) => ({
    url: `${SITE_URL}/packs/${g.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Tier 2 — Puff range landing pages
  const puffRoutes: MetadataRoute.Sitemap = PUFF_RANGES.map((r) => ({
    url: `${SITE_URL}/puffs/${r.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Tier 2 — Categories
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Tier 2 — Brand pages
  const brandRoutes: MetadataRoute.Sitemap = BRANDS.map((b) => ({
    url: `${SITE_URL}/brand/${b.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Tier 2 — City landing pages (geo SEO)
  const cityRoutes: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${SITE_URL}/vapehub-vapes-australia/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Tier 3 — Info / policy / utility pages
  const infoRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${SITE_URL}/shipping`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${SITE_URL}/returns`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/beginners-guide`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/vaping-laws-australia`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/help`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${SITE_URL}/bulk`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${SITE_URL}/store`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
  ]

  // Tier 4 — Products (highest volume, lowest individual priority)
  const productSlugs = await getAllActiveProductSlugs()
  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${SITE_URL}/product/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    ...tier1,
    ...categoryRoutes,
    ...brandRoutes,
    ...packRoutes,
    ...puffRoutes,
    ...cityRoutes,
    ...infoRoutes,
    ...productRoutes,
  ]
}

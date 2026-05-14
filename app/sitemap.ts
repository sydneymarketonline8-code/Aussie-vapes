import type { MetadataRoute } from 'next'
import { PRODUCTS } from '@/lib/products'
import { CATEGORIES } from '@/lib/categories'
import { BRANDS } from '@/lib/brands'
import { CITIES } from '@/lib/cities'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aussievapes.com.au'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Tier 1 — Top-level, daily/weekly change
  const tier1: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/brands`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${SITE_URL}/aussie-vapes`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/sale`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/new-arrivals`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/sitemap-html`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
  ]

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
    url: `${SITE_URL}/aussie-vapes/${c.slug}`,
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
  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    ...tier1,
    ...categoryRoutes,
    ...brandRoutes,
    ...cityRoutes,
    ...infoRoutes,
    ...productRoutes,
  ]
}

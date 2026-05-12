import type { MetadataRoute } from 'next'
import { PRODUCTS } from '@/lib/products'
import { CATEGORIES } from '@/lib/categories'
import { BRANDS } from '@/lib/brands'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aussievapes.com.au'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/brands`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/search`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${SITE_URL}/cart`, lastModified: now, changeFrequency: 'never', priority: 0.1 },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const brandRoutes: MetadataRoute.Sitemap = BRANDS.map((b) => ({
    url: `${SITE_URL}/brand/${b.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...categoryRoutes, ...brandRoutes, ...productRoutes]
}

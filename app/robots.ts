import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.aussievapes.com.au'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/cart',
          '/checkout',
          '/account',
          '/wishlist',
          '/track',
          '/search?',
          '/admin/',
          '/api/',
          '/_next/',
        ],
      },
      // Googlebot-Image — allow image crawling explicitly
      {
        userAgent: 'Googlebot-Image',
        allow: ['/products/', '/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}

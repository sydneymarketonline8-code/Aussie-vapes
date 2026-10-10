import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vapehubvapesaustralia.com.au'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Private / transactional pages only. Cart and checkout are client
        // components and cannot export a noindex tag, so robots.txt is their
        // only protection — Search Console reporting these as "Blocked by
        // robots.txt" is intended, not a fault.
        //
        // /_next/ is deliberately NOT blocked: it serves the CSS, JS and font
        // assets Googlebot needs to render the page. Blocking it makes Google
        // render an unstyled, script-less page, which breaks the
        // mobile-friendly and Core Web Vitals assessments.
        disallow: [
          '/cart',
          '/checkout',
          '/account',
          '/wishlist',
          '/track',
          '/search?',
          '/admin/',
          '/api/',
        ],
      },
      // Googlebot-Image — allow image crawling explicitly
      {
        userAgent: 'Googlebot-Image',
        allow: ['/products/', '/'],
      },
      // AI-training and dataset crawlers — opt out of having the catalogue
      // copied into training sets. Google-Extended / Applebot-Extended are
      // training-only tokens and do not affect Google or Apple search.
      // AI *search* crawlers (OAI-SearchBot, PerplexityBot) stay allowed.
      // middleware.ts hard-blocks the ones known to ignore robots.txt.
      {
        userAgent: [
          'GPTBot',
          'CCBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Applebot-Extended',
          'Bytespider',
          'meta-externalagent',
          'FacebookBot',
          'Diffbot',
          'Omgilibot',
          'ImagesiftBot',
          'cohere-training-data-crawler',
          'Timpibot',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}

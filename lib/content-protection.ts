import { NextResponse, type NextRequest } from 'next/server'

/**
 * Edge-safe request filters used by middleware.ts to stop bulk copying of
 * the catalogue. Search engines (Googlebot, Bingbot), AI *search* crawlers
 * (OAI-SearchBot, PerplexityBot) and social link-preview bots are NOT
 * blocked — they bring traffic. robots.txt carries the matching opt-outs for
 * crawlers that honour it; this catches the ones that don't.
 */

// Whole-site downloaders, generic scraping libraries and AI-training crawlers.
const BLOCKED_AGENTS = [
  'httrack', 'wget', 'webcopier', 'webzip', 'teleport', 'offline explorer', 'sitesnagger',
  'webstripper', 'website extractor', 'scrapy', 'python-requests', 'python-urllib', 'aiohttp',
  'go-http-client', 'node-fetch', 'axios/', 'curl/', 'libwww-perl', 'java/',
  'gptbot', 'ccbot', 'claudebot', 'claude-web', 'anthropic-ai', 'bytespider', 'meta-externalagent',
  'facebookbot', 'diffbot', 'omgili', 'imagesiftbot', 'img2dataset', 'cohere-ai', 'timpibot',
]

const SITE_HOSTS = ['vapehubvapesaustralia.com.au', 'www.vapehubvapesaustralia.com.au', 'localhost']

// Referrers allowed to load our images directly (image search results, social apps).
const ALLOWED_REFERRER_SUFFIXES = [
  'google.com', 'google.com.au', 'bing.com', 'duckduckgo.com', 'yahoo.com', 'yandex.com', 'yandex.ru',
  'baidu.com', 'facebook.com', 'instagram.com', 'whatsapp.com', 'messenger.com',
]

function isImageRequest(pathname: string): boolean {
  return pathname === '/_next/image' || pathname.startsWith('/products/')
}

function isOwnHost(host: string): boolean {
  return SITE_HOSTS.includes(host) || (host.startsWith('aussie-vapes') && host.endsWith('.vercel.app'))
}

export function blockScrapers(req: NextRequest): NextResponse | null {
  if (req.nextUrl.pathname === '/robots.txt') return null
  const ua = (req.headers.get('user-agent') ?? '').toLowerCase()
  if (BLOCKED_AGENTS.some((a) => ua.includes(a))) {
    return new NextResponse('Automated access is not permitted.', { status: 403 })
  }
  return null
}

/**
 * Blocks other websites from embedding our product photos. Requests with no
 * Referer (direct visits, crawlers, email/chat link previews, privacy
 * browsers) are always allowed so image SEO and sharing keep working.
 */
export function blockHotlinks(req: NextRequest): NextResponse | null {
  if (!isImageRequest(req.nextUrl.pathname)) return null
  const referer = req.headers.get('referer')
  if (!referer) return null

  let host: string
  try {
    host = new URL(referer).hostname.toLowerCase()
  } catch {
    return null
  }
  if (isOwnHost(host)) return null
  if (ALLOWED_REFERRER_SUFFIXES.some((s) => host === s || host.endsWith(`.${s}`))) return null

  return new NextResponse('Image hotlinking is not permitted.', { status: 403 })
}

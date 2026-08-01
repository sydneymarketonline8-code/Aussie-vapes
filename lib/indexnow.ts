/**
 * IndexNow client.
 *
 * IndexNow is a single-endpoint protocol Bing and Yandex use to receive
 * "this URL changed, recrawl it" notifications instantly, instead of
 * waiting for the next scheduled crawl. Free, no rate limits within
 * reason. https://www.indexnow.org/
 *
 * Setup:
 *   1. Generate a 32-char hex key (`openssl rand -hex 16` or any random
 *      string of 8-128 a-z 0-9 chars).
 *   2. Set INDEXNOW_KEY in Vercel env vars.
 *   3. A file at /<key>.txt containing the key is auto-served by the
 *      route at app/[indexnowKey]/route.ts (added alongside this module).
 *
 * Use anywhere a URL becomes new or changed (admin product save, etc.):
 *   await notifyIndexNow([`${SITE_URL}/product/${slug}`])
 *
 * Never throws — IndexNow failures shouldn't block business logic.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.aussievapehub.com.au'

export async function notifyIndexNow(urls: string[]): Promise<void> {
  const key = process.env.INDEXNOW_KEY
  if (!key) return
  if (urls.length === 0) return

  const host = new URL(SITE_URL).host
  const body = {
    host,
    key,
    keyLocation: `${SITE_URL}/${key}.txt`,
    urlList: urls.slice(0, 10_000),
  }

  try {
    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    })
    // 200 / 202 = accepted. Anything else, log for visibility.
    if (!res.ok && res.status !== 202) {
      console.warn('[indexnow] non-2xx response', res.status, await res.text().catch(() => ''))
    }
  } catch (err) {
    console.warn('[indexnow] post failed', err)
  }
}

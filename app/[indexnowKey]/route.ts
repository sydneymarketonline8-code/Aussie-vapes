import { NextResponse } from 'next/server'

/**
 * Serves the IndexNow key verification file at /<INDEXNOW_KEY>.txt.
 *
 * IndexNow asks search engines to confirm site ownership by fetching
 * /<key>.txt at the root and checking the body equals the key. Routing
 * the file dynamically lets us rotate the key by changing one env var
 * — no committing the key to the repo, no manual file uploads.
 *
 * Any other path under [indexnowKey] returns 404 as expected.
 */

export const dynamic = 'force-dynamic'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ indexnowKey: string }> },
) {
  const { indexnowKey } = await params
  const key = process.env.INDEXNOW_KEY
  if (!key) return new NextResponse('Not Found', { status: 404 })

  // Only respond to /<KEY>.txt — anything else is 404
  if (indexnowKey !== `${key}.txt`) {
    return new NextResponse('Not Found', { status: 404 })
  }
  return new NextResponse(key, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

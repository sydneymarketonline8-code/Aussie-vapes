/**
 * Strips the trailing ' | Vapes Australia' from seo_title on every product.
 * The metadata template in lib/seo.ts adds it back, so leaving it in the
 * DB causes "... | Vapes Australia | Vapes Australia" double suffix in <title>.
 *
 * Idempotent.
 */

import 'dotenv/config'
import { config as loadEnv } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

loadEnv({ path: '.env.local', override: true })
const s = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
)

async function main() {
  const { data: rows } = await s
    .from('products')
    .select('id, seo_title')
    .ilike('seo_title', '%| Vapes Australia')
    .range(0, 9999)

  console.log(`${rows?.length ?? 0} products with trailing "| Vapes Australia" suffix`)
  if (!rows?.length) return

  const updates = rows
    .map((r) => ({
      id: r.id,
      new: r.seo_title.replace(/\s*\|\s*Vapes Australia\s*$/i, '').trim(),
    }))
    .filter((u) => u.new.length > 0)

  let done = 0
  for (let i = 0; i < updates.length; i += 100) {
    const batch = updates.slice(i, i + 100)
    await Promise.all(
      batch.map((u) => s.from('products').update({ seo_title: u.new }).eq('id', u.id)),
    )
    done += batch.length
    process.stdout.write(`\r  updated ${done}/${updates.length}`)
  }
  process.stdout.write('\n')

  const { count: remaining } = await s
    .from('products')
    .select('id', { count: 'exact', head: true })
    .ilike('seo_title', '%| Vapes Australia')
  console.log(`Remaining with suffix: ${remaining}`)
}

main().catch(console.error)

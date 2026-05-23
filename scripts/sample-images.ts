import 'dotenv/config'
import { config as loadEnv } from 'dotenv'
import { existsSync } from 'fs'
import { join } from 'path'
import { createClient } from '@supabase/supabase-js'

loadEnv({ path: '.env.local', override: true })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
)

async function main() {
  for (const catSlug of ['e-liquids', 'nicotine-salts', 'pod-systems']) {
    console.log(`\n=== ${catSlug} (first 8 products + their image url and on-disk status) ===`)
    const { data: cat } = await supabase.from('categories').select('id').eq('slug', catSlug).limit(1)
    if (!cat?.[0]) { console.log('  category not found'); continue }
    const { data } = await supabase
      .from('products')
      .select('slug, product_images(url, position)')
      .eq('category_id', cat[0].id)
      .limit(8)
    for (const p of (data ?? []) as any[]) {
      const imgs = (p.product_images ?? []).sort((a: any, b: any) => a.position - b.position)
      const url = imgs[0]?.url ?? '(none)'
      let status = '(external)'
      if (url.startsWith('/products/')) {
        const path = join(process.cwd(), 'public', url)
        status = existsSync(path) ? '✓ on disk' : '✗ MISSING'
      } else if (url === '(none)') status = '(no row)'
      console.log(`  ${p.slug}`.padEnd(60), '→', url.slice(0, 60).padEnd(60), status)
    }
  }
}

main().catch(console.error)

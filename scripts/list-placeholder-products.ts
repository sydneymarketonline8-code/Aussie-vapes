/**
 * Lists every active product that currently has no image row in the DB —
 * those are rendering with the placeholder icon on the storefront.
 *
 * Outputs:
 *   • count per category
 *   • full slug list grouped by category
 *
 * Use the list to source product photos. Upload them via
 * /admin/products/<slug> → Images tab (writes to Supabase Storage) — or
 * drop a `<slug>.jpg` file in public/products/ and re-run
 * `npm run fix:images`.
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
  // Pull every active product + their first image row (if any) + category
  const products: { id: string; slug: string; name: string; category_slug: string | null; hasImage: boolean }[] = []
  let from = 0
  while (true) {
    const { data, error } = await s
      .from('products')
      .select('id, slug, name, category:category_id(slug), product_images(id)')
      .eq('status', 'active')
      .is('deleted_at', null)
      .order('id')
      .range(from, from + 999)
    if (error) throw error
    if (!data?.length) break
    for (const r of data as any[]) {
      const cat = Array.isArray(r.category) ? r.category[0] : r.category
      products.push({
        id: r.id,
        slug: r.slug,
        name: r.name,
        category_slug: cat?.slug ?? null,
        hasImage: (r.product_images ?? []).length > 0,
      })
    }
    if (data.length < 1000) break
    from += 1000
  }

  const missing = products.filter((p) => !p.hasImage)
  console.log(`${missing.length} active products have no image row (placeholder will render).\n`)

  // Group by category
  const byCat = new Map<string, typeof missing>()
  for (const m of missing) {
    const cat = m.category_slug ?? '(uncategorised)'
    const list = byCat.get(cat) ?? []
    list.push(m)
    byCat.set(cat, list)
  }

  console.log('Counts per category:')
  for (const [cat, list] of Array.from(byCat).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${list.length.toString().padStart(4)}  ${cat}`)
  }

  console.log('\nFull list (slug · name · category):')
  for (const [cat, list] of Array.from(byCat).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n--- ${cat} (${list.length}) ---`)
    for (const m of list.sort((a, b) => a.slug.localeCompare(b.slug))) {
      console.log(`  ${m.slug}`)
      console.log(`      ${m.name}`)
    }
  }
}

main().catch((err) => { console.error(err); process.exit(1) })

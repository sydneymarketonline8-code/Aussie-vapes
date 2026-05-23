/**
 * One-off: removes "VapeVault AU" strings from product seo_title and
 * seo_description fields. Leftover from the original catalogue export
 * under the previous brand name.
 *
 * Idempotent. Safe to re-run.
 */

import 'dotenv/config'
import { config as loadEnv } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

loadEnv({ path: '.env.local', override: true })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
)

async function main() {
  console.log('Scanning for VapeVault mentions in products…')

  // Pull every row that still references VapeVault in any of the seo / copy fields
  const { data: hits, error } = await supabase
    .from('products')
    .select('id, slug, name, seo_title, seo_description, description, short_description')
    .or(
      [
        'seo_title.ilike.%VapeVault%',
        'seo_description.ilike.%VapeVault%',
        'description.ilike.%VapeVault%',
        'short_description.ilike.%VapeVault%',
        'name.ilike.%VapeVault%',
      ].join(','),
    )
    .range(0, 9999)

  if (error) throw new Error(`fetch failed: ${error.message}`)
  console.log(`  ${hits?.length ?? 0} products to clean\n`)

  if (!hits?.length) {
    console.log('No matches. Done.')
    return
  }

  let done = 0
  for (let i = 0; i < hits.length; i += 50) {
    const batch = hits.slice(i, i + 50)
    await Promise.all(
      batch.map((row) => {
        const patch: Record<string, string | null> = {}
        if (row.name?.includes('VapeVault')) patch.name = row.name.replace(/VapeVault AU/g, 'Aussie Vapes').replace(/VapeVault/g, 'Aussie Vapes')
        if (row.short_description?.includes('VapeVault')) patch.short_description = row.short_description.replace(/VapeVault AU/g, 'Aussie Vapes').replace(/VapeVault/g, 'Aussie Vapes')
        if (row.description?.includes('VapeVault')) patch.description = row.description.replace(/VapeVault AU/g, 'Aussie Vapes').replace(/VapeVault/g, 'Aussie Vapes')
        if (row.seo_title?.includes('VapeVault')) {
          patch.seo_title = row.seo_title
            .replace(/ \| VapeVault AU \| Aussie Vapes/g, ' | Aussie Vapes')
            .replace(/VapeVault AU/g, 'Aussie Vapes')
            .replace(/VapeVault/g, 'Aussie Vapes')
        }
        if (row.seo_description?.includes('VapeVault')) patch.seo_description = row.seo_description.replace(/VapeVault AU/g, 'Aussie Vapes').replace(/VapeVault/g, 'Aussie Vapes')
        return supabase.from('products').update(patch).eq('id', row.id)
      }),
    )
    done += batch.length
    process.stdout.write(`\r  updated ${done}/${hits.length}`)
  }
  process.stdout.write('\n')

  // Same for categories
  const { data: catHits } = await supabase
    .from('categories')
    .select('id, slug, name, seo_title, seo_description, description, long_description, intro')
    .or(
      [
        'seo_title.ilike.%VapeVault%',
        'seo_description.ilike.%VapeVault%',
        'description.ilike.%VapeVault%',
        'long_description.ilike.%VapeVault%',
        'intro.ilike.%VapeVault%',
      ].join(','),
    )
  if (catHits?.length) {
    console.log(`Cleaning ${catHits.length} categories…`)
    for (const c of catHits) {
      const patch: Record<string, string | null> = {}
      for (const f of ['name', 'description', 'long_description', 'intro', 'seo_title', 'seo_description'] as const) {
        const v = (c as Record<string, string | null>)[f]
        if (v && v.includes('VapeVault')) patch[f] = v.replace(/VapeVault AU/g, 'Aussie Vapes').replace(/VapeVault/g, 'Aussie Vapes')
      }
      if (Object.keys(patch).length) await supabase.from('categories').update(patch).eq('id', c.id)
    }
  }

  // Same for brands
  const { data: brandHits } = await supabase
    .from('brands')
    .select('id, slug, name, display_name, description, seo_title, seo_description')
    .or(
      [
        'description.ilike.%VapeVault%',
        'seo_title.ilike.%VapeVault%',
        'seo_description.ilike.%VapeVault%',
      ].join(','),
    )
  if (brandHits?.length) {
    console.log(`Cleaning ${brandHits.length} brands…`)
    for (const b of brandHits) {
      const patch: Record<string, string | null> = {}
      for (const f of ['description', 'seo_title', 'seo_description'] as const) {
        const v = (b as Record<string, string | null>)[f]
        if (v && v.includes('VapeVault')) patch[f] = v.replace(/VapeVault AU/g, 'Aussie Vapes').replace(/VapeVault/g, 'Aussie Vapes')
      }
      if (Object.keys(patch).length) await supabase.from('brands').update(patch).eq('id', b.id)
    }
  }

  // Final verification
  console.log('\nVerifying…')
  const tables = ['products', 'categories', 'brands'] as const
  for (const t of tables) {
    const { count } = await supabase
      .from(t)
      .select('id', { count: 'exact', head: true })
      .or('seo_title.ilike.%VapeVault%,seo_description.ilike.%VapeVault%')
    console.log(`  ${t}: ${count ?? 0} rows still mentioning VapeVault`)
  }
}

main().catch((err) => { console.error(err); process.exit(1) })

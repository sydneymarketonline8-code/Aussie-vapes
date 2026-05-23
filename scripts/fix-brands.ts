/**
 * Backfills products.brand_id by matching brand names embedded in the
 * product slug/name. The seed missed e-liquid / pod / salts brands
 * because lib/brands.ts only lists hardware brands.
 *
 * For each product without a brand:
 *   1. Try to find a matching brand by checking if the brand's slug or
 *      display name appears in the product name/slug.
 *   2. If a known mapping (POD SALT, Cloud Nurdz, etc.) matches, create
 *      that brand on the fly with sensible defaults.
 *   3. Update products.brand_id.
 *
 * Run: npx tsx scripts/fix-brands.ts
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

// Map of brand_slug → patterns (case-insensitive substrings checked in name+slug).
// Order matters: more specific patterns first.
const BRAND_MAP: Array<{ slug: string; name: string; display: string; patterns: string[] }> = [
  { slug: 'naked-100', name: 'naked-100', display: 'Naked 100', patterns: ['nkd-100', 'nkd 100', 'naked 100', 'naked-100', 'naked-vape-juice', 'naked'] },
  { slug: 'cloud-nurdz', name: 'cloud-nurdz', display: 'Cloud Nurdz', patterns: ['cloud-nurdz', 'cloud nurdz'] },
  { slug: 'pod-salt', name: 'pod-salt', display: 'POD SALT', patterns: ['pod-salt', 'pod salt'] },
  { slug: 'pod-juice', name: 'pod-juice', display: 'Pod Juice', patterns: ['pod-juice', 'pod juice'] },
  { slug: 'raz', name: 'raz', display: 'RAZ', patterns: ['raz-x', 'raz x', 'raz-pod', 'raz pod', '-raz-'] },
  { slug: 'monster-labs', name: 'monster-labs', display: 'Monster Labs', patterns: ['monster-salt', 'monster labs', 'jam-monster', 'fruit-monster', 'monster-vape'] },
  { slug: 'juice-head', name: 'juice-head', display: 'Juice Head', patterns: ['juice-head', 'juice head'] },
  { slug: 'mi-pod', name: 'mi-pod', display: 'Mi-Pod', patterns: ['mi-pod', 'mi pod'] },
  { slug: 'lost-mary', name: 'lost-mary', display: 'Lost Mary', patterns: ['lost-mary', 'lost mary'] },
  { slug: 'vaporesso', name: 'vaporesso', display: 'Vaporesso', patterns: ['vaporesso'] },
  { slug: 'geekvape', name: 'geekvape', display: 'Geekvape', patterns: ['geekvape', 'geek vape', 'aegis'] },
  { slug: 'uwell', name: 'uwell', display: 'UWELL', patterns: ['uwell', 'caliburn'] },
  { slug: 'smok', name: 'smok', display: 'SMOK', patterns: ['smok-', 'smok '] },
  { slug: 'voopoo', name: 'voopoo', display: 'VOOPOO', patterns: ['voopoo'] },
  { slug: 'vaporlax', name: 'vaporlax', display: 'Vaporlax', patterns: ['vaporlax'] },
  { slug: 'onyx-cloud', name: 'onyx-cloud', display: 'Onyx Cloud', patterns: ['onyx-cloud', 'onyx cloud'] },
  { slug: 'i-love-salts', name: 'i-love-salts', display: 'I Love Salts', patterns: ['i-love-salts', 'i love salts'] },
  { slug: 'mad-hatter', name: 'mad-hatter', display: 'Mad Hatter', patterns: ['mad-hatter', 'mad hatter'] },
  { slug: 'jam-monster', name: 'jam-monster', display: 'Jam Monster', patterns: ['jam-monster'] },
]

async function ensureBrand(slug: string, name: string, display: string): Promise<string> {
  const { data: existing } = await supabase.from('brands').select('id').eq('slug', slug).limit(1)
  if (existing?.[0]) return existing[0].id
  const { data: created, error } = await supabase
    .from('brands')
    .insert({ slug, name, display_name: display, is_featured: false })
    .select('id')
    .single()
  if (error || !created) throw new Error(`could not create brand ${slug}: ${error?.message}`)
  console.log(`  + created brand: ${display}`)
  return created.id
}

function matchBrand(name: string, slug: string): { slug: string; name: string; display: string } | null {
  const hay = `${name} ${slug}`.toLowerCase().replace(/[^a-z0-9]+/g, ' ')
  for (const b of BRAND_MAP) {
    for (const pat of b.patterns) {
      const needle = pat.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
      if (hay.includes(needle)) return b
    }
  }
  return null
}

async function main() {
  // Fetch all products without a brand, in any category
  const { data: products } = await supabase
    .from('products')
    .select('id, slug, name, category:category_id ( slug )')
    .is('brand_id', null)
    .eq('status', 'active')
    .is('deleted_at', null)
    .range(0, 9999)

  if (!products?.length) {
    console.log('No products without brand_id. Done.')
    return
  }

  console.log(`Found ${products.length} products without a brand link.\n`)

  const updates: { id: string; brand_id: string; brand_slug: string }[] = []
  const unmatched: string[] = []
  const brandCache = new Map<string, string>()

  for (const p of products as any[]) {
    const match = matchBrand(p.name, p.slug)
    if (!match) {
      unmatched.push(p.slug)
      continue
    }
    let brandId = brandCache.get(match.slug)
    if (!brandId) {
      brandId = await ensureBrand(match.slug, match.name, match.display)
      brandCache.set(match.slug, brandId)
    }
    updates.push({ id: p.id, brand_id: brandId, brand_slug: match.slug })
  }

  // Summary by brand
  const byBrand = new Map<string, number>()
  updates.forEach((u) => byBrand.set(u.brand_slug, (byBrand.get(u.brand_slug) ?? 0) + 1))
  console.log('Plan:')
  Array.from(byBrand).sort((a, b) => b[1] - a[1]).forEach(([s, n]) => console.log(`  ${n.toString().padStart(3)}  → ${s}`))
  console.log(`  ${unmatched.length.toString().padStart(3)}  unmatched\n`)

  if (updates.length === 0) {
    console.log('Nothing to update.')
    return
  }

  console.log(`Applying ${updates.length} brand assignments…`)
  let done = 0
  for (let i = 0; i < updates.length; i += 100) {
    const batch = updates.slice(i, i + 100)
    await Promise.all(
      batch.map((u) => supabase.from('products').update({ brand_id: u.brand_id }).eq('id', u.id)),
    )
    done += batch.length
    process.stdout.write(`\r  updated ${done}/${updates.length}`)
  }
  process.stdout.write('\n')

  if (unmatched.length) {
    console.log(`\n${unmatched.length} products didn't match any known brand pattern:`)
    unmatched.slice(0, 20).forEach((s) => console.log(`  ${s}`))
    if (unmatched.length > 20) console.log(`  …and ${unmatched.length - 20} more`)
    console.log(`\nAdd patterns to BRAND_MAP in scripts/fix-brands.ts and re-run.`)
  }
}

main().catch((err) => { console.error(err); process.exit(1) })

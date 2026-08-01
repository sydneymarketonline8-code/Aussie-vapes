/**
 * Audits product data integrity for a list of category slugs and prints
 * everything that might affect rendering on the storefront. Use this when
 * a category page "looks wrong" to figure out which specific rows are
 * the problem.
 *
 * Checks per product:
 *   • Missing or zero-length image rows
 *   • Image URL pointing at a non-existent local file
 *   • Empty short_description / description
 *   • Price = 0 or null
 *   • Negative or null stock_count
 *   • Missing brand link
 *   • Missing subcategory (degrades filter UX but not fatal)
 *
 * Run: npx tsx scripts/category-audit.ts
 */

import 'dotenv/config'
import { config as loadEnv } from 'dotenv'
import { readdirSync } from 'fs'
import { basename, extname, join } from 'path'
import { createClient } from '@supabase/supabase-js'

loadEnv({ path: '.env.local', override: true })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
)

const CATEGORIES = ['pod-systems', 'e-liquids', 'nicotine-salts']
const PRODUCTS_DIR = join(process.cwd(), 'public', 'products')

interface ProductCheck {
  slug: string
  name: string
  issues: string[]
}

async function main() {
  const onDiskFiles = new Set(readdirSync(PRODUCTS_DIR).map((f) => f.toLowerCase()))

  for (const catSlug of CATEGORIES) {
    console.log(`\n${'='.repeat(70)}`)
    console.log(`CATEGORY: ${catSlug}`)
    console.log('='.repeat(70))

    const { data: cat } = await supabase.from('categories').select('id, name').eq('slug', catSlug).limit(1)
    if (!cat?.[0]) { console.log('  category not found'); continue }

    const { data: products } = await supabase
      .from('products')
      .select(`
        id, slug, name, sku, price, compare_price,
        short_description, description, in_stock, stock_count,
        brand:brand_id ( display_name ),
        subcategory:subcategory_id ( slug ),
        product_images ( url, position )
      `)
      .eq('category_id', cat[0].id)
      .eq('status', 'active')
      .is('deleted_at', null)
      .order('name')

    if (!products) { console.log('  query failed'); continue }

    const issues: ProductCheck[] = []
    let healthy = 0

    for (const p of products as any[]) {
      const found: string[] = []
      const imgs = (p.product_images ?? []) as { url: string; position: number }[]

      if (imgs.length === 0) found.push('no image rows')
      else {
        imgs.forEach((img) => {
          if (img.url.startsWith('/products/') || img.url.startsWith('https://www.aussievapehub.com.au/products/')) {
            const filename = img.url.split('/products/')[1]
            if (!onDiskFiles.has(filename.toLowerCase())) {
              found.push(`image file missing: ${filename}`)
            }
          }
        })
      }

      if (!p.short_description?.trim()) found.push('blank short_description')
      if (!p.description?.trim()) found.push('blank description')
      if (!p.price || Number(p.price) === 0) found.push('price is 0 or null')
      if (p.stock_count == null) found.push('stock_count is null')
      else if (Number(p.stock_count) < 0) found.push('negative stock_count')
      if (!p.brand) found.push('no brand linked')
      if (!p.subcategory) found.push('no subcategory linked')

      if (found.length === 0) healthy++
      else issues.push({ slug: p.slug, name: p.name, issues: found })
    }

    console.log(`Total: ${products.length}  ·  Healthy: ${healthy}  ·  With issues: ${issues.length}`)
    if (issues.length === 0) {
      console.log('  ✓ No issues found')
      continue
    }

    // Summarise by issue type
    const byIssue = new Map<string, number>()
    for (const i of issues) {
      for (const issue of i.issues) {
        const key = issue.startsWith('image file missing:') ? 'image file missing' : issue
        byIssue.set(key, (byIssue.get(key) ?? 0) + 1)
      }
    }
    console.log('\nIssues by type:')
    Array.from(byIssue).sort((a, b) => b[1] - a[1]).forEach(([k, n]) => console.log(`  ${n.toString().padStart(3)}  ${k}`))

    console.log('\nFirst 10 affected products:')
    issues.slice(0, 10).forEach((p) => {
      console.log(`  ${p.slug}`)
      p.issues.forEach((i) => console.log(`    - ${i}`))
    })
    if (issues.length > 10) console.log(`  …and ${issues.length - 10} more`)
  }
}

main().catch(console.error)

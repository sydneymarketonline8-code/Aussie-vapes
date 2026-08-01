/**
 * One-off: replace the old site brand with the new one in Supabase SEO fields.
 *
 * The product content generator writes seo_title / seo_description containing
 * the store name (e.g. "... | Vapes Australia"). A code-side rebrand doesn't
 * touch those, because the storefront reads them from the database.
 *
 *   node scripts/rebrand-supabase-seo.mjs "Vapes Australia" "Aussie Vape Hub"
 */
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const [FROM, TO] = process.argv.slice(2)
if (!FROM || !TO) {
  console.error('usage: node scripts/rebrand-supabase-seo.mjs "<old brand>" "<new brand>"')
  process.exit(1)
}

const env = Object.fromEntries(
  fs.readFileSync('.env.local', 'utf8').split('\n').filter(l => l.includes('=')).map(l => {
    const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
  })
)
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const swap = v => (typeof v === 'string' && v.includes(FROM) ? v.split(FROM).join(TO) : null)

async function rebrandTable(table, columns) {
  // Page through everything; PostgREST caps a response at 1000 rows.
  const rows = []
  for (let from = 0; ; from += 1000) {
    const { data, error } = await sb.from(table)
      .select(['id', ...columns].join(','))
      .order('id', { ascending: true })
      .range(from, from + 999)
    if (error) { console.error(`[${table}]`, error.message); return }
    rows.push(...data)
    if (data.length < 1000) break
  }

  let changed = 0
  for (const row of rows) {
    const patch = {}
    for (const col of columns) {
      const next = swap(row[col])
      if (next !== null) patch[col] = next
    }
    if (!Object.keys(patch).length) continue
    const { error } = await sb.from(table).update(patch).eq('id', row.id)
    if (error) { console.error(`[${table}] ${row.id}`, error.message); continue }
    changed++
    if (changed % 200 === 0) console.log(`  ${table}: ${changed} updated`)
  }
  console.log(`${table}: ${changed} rows updated (of ${rows.length} scanned)`)
}

await rebrandTable('products', ['seo_title', 'seo_description', 'description', 'short_description'])
await rebrandTable('categories', ['name', 'seo_title', 'seo_description', 'description', 'long_description', 'intro'])
await rebrandTable('brands', ['seo_title', 'seo_description', 'description'])
console.log('done')

/**
 * Make product seo_title unique.
 *
 * Titles are built by trimming the product name to fit a fixed budget plus the
 * brand suffix. When two products differ only in the part that gets trimmed
 * (e.g. "... Strawberry Coconut Watermelon" vs "... Strawberry Watermelon"),
 * both collapse to the same title. Duplicate titles make Google pick one page
 * and drop the other as "duplicate without user-selected canonical".
 *
 * Fix: for colliding titles only, widen the budget until the title is unique,
 * using more of the product name. Non-colliding titles are left untouched, so
 * the common case keeps the tighter, cleaner length.
 *
 *   node scripts/dedupe-seo-titles.mjs --dry
 *   node scripts/dedupe-seo-titles.mjs --apply
 */
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const MODE = process.argv.includes('--apply') ? 'apply' : 'dry'
const BRAND = 'VapeHub Vapes Australia'
const SUFFIX = ` | ${BRAND}`
const BASE_MAX = 62
const HARD_MAX = 110 // absolute ceiling; beyond this uniqueness isn't worth it

const env = Object.fromEntries(
  fs.readFileSync('.env.local', 'utf8').split('\n').filter(l => l.includes('=')).map(l => {
    const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
  })
)
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const titleCase = s => s.replace(/\w\S*/g, t => t[0].toUpperCase() + t.slice(1).toLowerCase())

function cleanName(name) {
  return titleCase(
    name
      .replace(/\s*[|–-]\s*iget\s*australia\s*$/i, '')
      .replace(/\s*[|–-]\s*[a-z ]*australia\s*$/i, '')
      .replace(/\s*[–-]\s*\d[\d,]*\s*PUFFS?\s*$/i, '')
      .replace(/\s*[–-]\s*/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  )
}

function trimWords(s, max) {
  if (s.length <= max) return s
  const cut = s.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > max * 0.5 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:|–-]+$/, '')
}

const buildAt = (name, max) => trimWords(cleanName(name), max - SUFFIX.length) + SUFFIX

// Variant that keeps the puff count. cleanName() strips a trailing
// "- 15000 PUFFS", but for products that differ ONLY by capacity (8000 vs
// 15000 puffs, different price) that suffix is the distinguishing attribute —
// stripping it collapses two real products onto one title.
function cleanNameKeepPuffs(name) {
  return titleCase(
    name
      .replace(/\s*[|–-]\s*iget\s*australia\s*$/i, '')
      .replace(/\s*[–-]\s*/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  )
}
const buildWithPuffs = (name, max) =>
  trimWords(cleanNameKeepPuffs(name), max - SUFFIX.length) + SUFFIX

const products = []
for (let from = 0; ; from += 1000) {
  const { data, error } = await sb.from('products')
    .select('id,slug,name,seo_title').order('id', { ascending: true }).range(from, from + 999)
  if (error) { console.error(error.message); process.exit(1) }
  products.push(...data)
  if (data.length < 1000) break
}

// Group by current title to find collisions.
const byTitle = {}
for (const p of products) (byTitle[p.seo_title] = byTitle[p.seo_title] || []).push(p)
const colliding = Object.values(byTitle).filter(g => g.length > 1)

const taken = new Set(Object.keys(byTitle).filter(t => byTitle[t].length === 1))
const updates = []
let unresolvable = 0

for (const group of colliding) {
  for (const p of group) {
    // Collisions happen in the part of the name that got trimmed away, so go
    // WIDER, never narrower. Start from the fullest allowed title and only
    // step down if that is somehow already taken. Starting at BASE_MAX would
    // shorten these titles — the stored ones were generated when the brand was
    // 8 characters shorter, so they already carry more of the name.
    let title = null
    for (let max = HARD_MAX; max >= BASE_MAX; max -= 8) {
      const candidate = buildAt(p.name, max)
      if (!taken.has(candidate)) { title = candidate; break }
    }
    // Still colliding: the names only differ by a puff count that cleanName
    // strips. Retry keeping it — that is the real product differentiator.
    if (!title) {
      for (let max = HARD_MAX; max >= BASE_MAX; max -= 8) {
        const candidate = buildWithPuffs(p.name, max)
        if (!taken.has(candidate)) { title = candidate; break }
      }
    }
    if (!title) { unresolvable++; continue }
    taken.add(title)
    if (title !== p.seo_title) updates.push({ id: p.id, slug: p.slug, from: p.seo_title, to: title })
  }
}

console.log(`colliding groups: ${colliding.length} (${colliding.reduce((n, g) => n + g.length, 0)} products)`)
console.log(`resolvable by widening: ${updates.length}`)
console.log(`genuinely identical names (duplicate catalogue rows): ${unresolvable}`)

if (MODE === 'dry') {
  updates.slice(0, 8).forEach(u => {
    console.log('\n' + u.slug)
    console.log('  FROM:', JSON.stringify(u.from))
    console.log('  TO:  ', JSON.stringify(u.to), `(${u.to.length})`)
  })
  console.log('\n[dry] run with --apply to write.')
  process.exit(0)
}

let applied = 0
for (const u of updates) {
  const { error } = await sb.from('products').update({ seo_title: u.to }).eq('id', u.id)
  if (error) { console.error(u.slug, error.message); continue }
  applied++
}
console.log(`done — ${applied} titles made unique`)

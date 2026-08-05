/**
 * Regenerate product seo_title / seo_description with boundary-safe truncation.
 *
 * The original content generator hard-sliced at 60 / 158 characters, which cut
 * mid-word — leaving titles like "... — Buy Online | Vapes Austra" and
 * descriptions ending "same-day AU dispa". Those strings render verbatim in
 * search results, and the mangled brand fragments also survived the rebrand
 * find-replace (nothing matched "Vapes Austra").
 *
 * Rules here:
 *   - The brand suffix is never truncated; the product name is shortened
 *     instead, on a word boundary.
 *   - Descriptions are cut at the last sentence end, else the last word.
 *
 *   node scripts/fix-seo-truncation.mjs --dry
 *   node scripts/fix-seo-truncation.mjs --apply
 */
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const MODE = process.argv.includes('--apply') ? 'apply' : 'dry'
const BRAND = 'VapeHub Vapes Australia'
const TITLE_MAX = 62
const DESC_MAX = 158

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

/** Trim to <= max without splitting a word. No ellipsis — reads as intentional. */
function trimWords(s, max) {
  if (s.length <= max) return s
  const cut = s.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > max * 0.5 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:|–-]+$/, '')
}

/** Prefer ending on a complete sentence; fall back to a whole word + period. */
function trimSentence(s, max) {
  if (s.length <= max) return s
  const cut = s.slice(0, max)
  const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '))
  if (lastStop > max * 0.55) return cut.slice(0, lastStop + 1)
  const words = trimWords(cut, max - 1)
  return words.endsWith('.') ? words : words + '.'
}

function buildTitle(name) {
  const suffix = ` | ${BRAND}`
  const room = TITLE_MAX - suffix.length
  return trimWords(cleanName(name), room) + suffix
}

function buildDescription(name, short) {
  const base = (short || '').trim()
  const cta = ` Buy online at ${BRAND} — fast Australia-wide shipping.`
  // Keep the whole CTA if it fits; otherwise just a well-formed short desc.
  if (base.length + cta.length <= DESC_MAX) {
    return (base.endsWith('.') ? base : base + '.') + cta
  }
  return trimSentence(base.length ? base : cleanName(name), DESC_MAX)
}

const products = []
for (let from = 0; ; from += 1000) {
  const { data, error } = await sb.from('products')
    .select('id,slug,name,seo_title,seo_description,short_description')
    .order('id', { ascending: true })
    .range(from, from + 999)
  if (error) { console.error(error.message); process.exit(1) }
  products.push(...data)
  if (data.length < 1000) break
}

let changed = 0, applied = 0
for (const p of products) {
  const seo_title = buildTitle(p.name)
  const seo_description = buildDescription(p.name, p.short_description)
  if (seo_title === p.seo_title && seo_description === p.seo_description) continue
  changed++

  if (MODE === 'dry') {
    if (changed <= 6) {
      console.log('\n' + p.slug)
      console.log('  title  OLD:', JSON.stringify(p.seo_title))
      console.log('  title  NEW:', JSON.stringify(seo_title), `(${seo_title.length})`)
      console.log('  desc   OLD:', JSON.stringify((p.seo_description || '').slice(-60)))
      console.log('  desc   NEW:', JSON.stringify(seo_description), `(${seo_description.length})`)
    }
    continue
  }

  const { error } = await sb.from('products').update({ seo_title, seo_description }).eq('id', p.id)
  if (error) { console.error(p.slug, error.message); continue }
  applied++
  if (applied % 250 === 0) console.log(`  ${applied} updated`)
}

console.log(
  MODE === 'dry'
    ? `\n[dry] ${changed} of ${products.length} products would change. Run with --apply.`
    : `done — ${applied} of ${products.length} products updated`
)

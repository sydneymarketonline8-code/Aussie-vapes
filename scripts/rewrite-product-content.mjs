/**
 * Rewrites product copy (description, short_description, features, seo_title,
 * seo_description) in Supabase with category-aware, per-product-varied text.
 *
 * Why: the seeded catalogue used one templated sentence per product — every
 * Alfakher Crown Bar read identically except the flavour word. That is thin,
 * near-duplicate content (bad for SEO + fingerprintable against the old
 * domain's cached copy). This generates materially different structure and
 * phrasing per product, driven off each product's real attributes.
 *
 * Variety is deterministic: a hash of the slug seeds every template choice, so
 * the same product always regenerates to the same copy (idempotent) while
 * neighbouring products diverge.
 *
 *   node scripts/rewrite-product-content.mjs --dry     # sample 6, write nothing
 *   node scripts/rewrite-product-content.mjs --apply   # update all in batches
 */
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const env = Object.fromEntries(
  fs.readFileSync('.env.local', 'utf8').split('\n').filter(l => l.includes('=')).map(l => {
    const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
  })
)
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const MODE = process.argv.includes('--apply') ? 'apply' : 'dry'

// ── deterministic per-slug variety ───────────────────────────────
const seedOf = s => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h }
const pick = (arr, seed, salt) => arr[(seed + salt * 2654435761) % arr.length]
const titleCase = s => s.replace(/\w\S*/g, t => t[0].toUpperCase() + t.slice(1).toLowerCase())
// a/an, then collapse whitespace and stray spaces before punctuation
const clean = s => s.replace(/\ba ([aeiou])/gi, 'an $1').replace(/\s+/g, ' ').replace(/\s+([.,])/g, '$1').trim()

// Brand names in the DB are inconsistently cased ("iget", "hqd", "naked-100").
// Uppercase known acronyms, else title-case and de-hyphenate.
const ACRONYMS = new Set(['iget', 'hqd', 'relx', 'jnr', 'kuz', 'ivg', 'vozol', 'elfbar', 'elf', 'smok', 'ske', 'r?', 'gunnpod', 'juul'])
function brandName(raw) {
  if (!raw) return 'our range'
  const key = raw.toLowerCase().replace(/[^a-z0-9]/g, '')
  if (ACRONYMS.has(key)) return raw.toUpperCase().replace(/-/g, ' ')
  return titleCase(raw.replace(/-/g, ' '))
}

// Strip scraped site-name pollution and puff suffix from product names.
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

// ── attribute extraction ─────────────────────────────────────────
function attrs(p, brandName_, catSlug) {
  const spec = p.specifications || {}
  const nmePuff = (p.name.match(/([\d][\d,]*)\s*PUFFS?/i) || [])[1]
  const puff = spec['Puff Count'] || (nmeNum(nmePuff))
  const nic = spec['Nicotine Strength'] || (p.nicotine_strengths || [])[0] || '20mg/mL'
  const flavour = (p.flavours || [])[0] && !/^(brown cap|quartz|retro|snapback)/i.test(p.flavours[0])
    ? titleCase(p.flavours[0]) : null
  const dispName = cleanName(p.name)
  return {
    brand: brandName(brandName_),
    puff, nic,
    capacity: spec['E-liquid Capacity'],
    battery: spec['Battery'],
    coil: spec['Coil Type'],
    bottle: (p.name.match(/(\d+)\s*ml/i) ? p.name.match(/(\d+)\s*ml/i)[1] + 'mL' : null) || spec['Bottle Size'] || spec['Volume'],
    vgpg: spec['VG/PG'] || spec['VG/PG Ratio'],
    flavour, dispName,
    price: Number(p.price).toFixed(2),
    cat: catSlug,
  }
}
function nmeNum(n) { return n ? n.replace(/,/g, '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') : null }

// ── disposable-vapes generator ───────────────────────────────────
function disposable(a, seed) {
  const p = a.puff ? `${a.puff}-puff` : 'long-life'
  const hasFl = !!a.flavour
  const fl = a.flavour || ''
  const open = hasFl ? [
    `The ${a.dispName} is a ${p} rechargeable disposable from ${a.brand}, built around a ${fl.toLowerCase()} flavour that stays crisp from the first draw to the last.`,
    `${fl} in a ${p} package — the ${a.dispName} pairs ${a.brand}'s mesh-coil hardware with a USB-C rechargeable cell so you finish the e-liquid, not the battery.`,
    `Meet the ${a.dispName}: a pocket-sized ${a.brand} disposable rated for around ${a.puff || 'thousands of'} puffs of smooth ${fl.toLowerCase()}.`,
    `If you want ${fl.toLowerCase()} without the fuss, the ${a.dispName} delivers roughly ${a.puff || 'thousands of'} puffs on a rechargeable ${a.brand} device you top up over USB-C.`,
    `${a.brand}'s ${a.dispName} is a ${p} disposable engineered for consistent flavour, wrapping a ${fl.toLowerCase()} profile around a mesh coil and a rechargeable battery.`,
    `A ${p} all-rounder from ${a.brand}, the ${a.dispName} leans on a mesh coil to keep its ${fl.toLowerCase()} flavour vivid deep into the tank.`,
  ] : [
    `The ${a.dispName} is a ${p} rechargeable disposable from ${a.brand}, tuned for smooth, consistent flavour from the first draw to the last.`,
    `The ${a.dispName} pairs ${a.brand}'s mesh-coil hardware with a USB-C rechargeable cell, so you finish the e-liquid rather than the battery.`,
    `Meet the ${a.dispName}: a pocket-sized ${a.brand} disposable rated for around ${a.puff || 'thousands of'} smooth, satisfying puffs.`,
    `The ${a.dispName} delivers roughly ${a.puff || 'thousands of'} puffs on a rechargeable ${a.brand} device you simply top up over USB-C.`,
    `${a.brand}'s ${a.dispName} is a ${p} disposable engineered for consistent flavour, built on a mesh coil and a rechargeable battery.`,
    `A ${p} all-rounder from ${a.brand}, the ${a.dispName} leans on a mesh coil to stay flavourful deep into the tank.`,
  ]
  const spec = [
    a.capacity && a.battery ? `Inside sits ${a.capacity} of ${a.nic} salt e-liquid and a ${a.battery} cell, recharged over USB-C so nothing goes to waste.`
      : `A rechargeable battery and ${a.nic} salt nicotine keep sessions steady without the harsh top-end of freebase.`,
    a.coil ? `The ${a.coil.toLowerCase()} coil is the star here — it pulls more flavour and vapour from every mL than the older bar-style coils it replaces.`
      : `A mesh-style coil draws even flavour and a satisfying cloud from every mL.`,
    `Draw-activated firing means there are no buttons or settings — unbox it, inhale, and it's ready.`,
    a.capacity ? `With ${a.capacity} on board and ${a.nic} nicotine, it's tuned for all-day use rather than a quick top-up.`
      : `It's tuned for all-day use, with ${a.nic} nicotine for a smooth throat hit.`,
  ]
  const close = [
    `Ships same-day from Australian stock, fully TGA-compliant at ${a.nic}, with free delivery on orders over $300.`,
    `In stock in Australia now — dispatched same day from Sydney and backed by our authenticity guarantee.`,
    `Held in local Australian stock for fast dispatch, and priced at $${a.price} with free shipping once your cart passes $300.`,
    `Genuine ${a.brand} stock, shipped discreetly from our Sydney warehouse with tracking on every order.`,
  ]
  const desc = clean([pick(open, seed, 1), pick(spec, seed, 7), pick(spec, seed, 13), pick(close, seed, 3)]
    .filter((s, i, arr) => arr.indexOf(s) === i).join(' '))
  const flPart = hasFl ? `${fl.toLowerCase()} ` : ''
  const short = clean(pick([
    `${a.puff || 'High'}-puff ${flPart}disposable from ${a.brand}, rechargeable and TGA-compliant.`,
    `Rechargeable ${a.brand} disposable${hasFl ? ' — ' + fl.toLowerCase() : ''}, ${a.nic}, around ${a.puff || 'thousands of'} puffs.`,
    `${hasFl ? fl + ' ' : ''}${a.brand} disposable with a mesh coil and ${a.puff || 'long-life'} puff rating.`,
  ], seed, 5))
  const feats = [
    a.puff ? `${a.puff} puff capacity` : 'Long-life puff capacity',
    `${a.nic} nicotine salt (TGA compliant)`,
    a.battery ? `${a.battery}, USB-C rechargeable` : 'USB-C rechargeable battery',
    a.coil ? `${a.coil} coil for richer flavour` : 'Mesh coil for richer flavour',
    a.capacity ? `${a.capacity} e-liquid` : 'Generous e-liquid reservoir',
    'Draw-activated — no buttons',
  ]
  return { desc, short, feats }
}

// ── pod-systems generator ────────────────────────────────────────
function pod(a, seed) {
  const open = [
    `The ${a.dispName} is a refillable pod kit from ${a.brand}, sized for pocket carry and built for salt-nic e-liquid.`,
    `${a.brand}'s ${a.dispName} pairs a compact rechargeable body with swappable pods, so you control the flavour and the strength.`,
    `A starter-friendly pod system, the ${a.dispName} gives you ${a.brand} reliability with the economy of refilling your own e-liquid.`,
    `Step off disposables with the ${a.dispName} — a ${a.brand} pod device you refill, recharge, and keep.`,
  ]
  const body = [
    `A USB-C battery and low-resistance coils make it forgiving for new vapers while still satisfying heavier ones.`,
    `Refillable pods cut your running costs versus disposables, and the draw-activated fire keeps it button-simple.`,
    `Pair it with any ${a.nic} salt e-liquid for a smooth throat hit, or drop the strength as you go.`,
  ]
  const close = [
    `Dispatched same-day from Australian stock with free shipping over $300.`,
    `Genuine ${a.brand} hardware, held in local stock and shipped with tracking.`,
    `In stock now at $${a.price}, sent discreetly from our Sydney warehouse.`,
  ]
  return {
    desc: clean([pick(open, seed, 1), pick(body, seed, 7), pick(close, seed, 3)].join(' ')),
    short: clean(pick([
      `Refillable ${a.brand} pod kit — rechargeable, salt-nic ready.`,
      `${a.brand} pod system for refillable, lower-cost vaping.`,
      `Compact ${a.brand} pod device you refill and recharge.`,
    ], seed, 5)),
    feats: ['Refillable pod design', 'USB-C rechargeable', 'Draw-activated firing', 'Salt-nic compatible', 'Pocket-sized body', 'Lower cost-per-mL than disposables'],
  }
}

// ── nicotine-salts / e-liquids generator ─────────────────────────
function liquid(a, seed, isSalt) {
  const kind = isSalt ? 'salt nicotine e-liquid' : 'freebase e-liquid'
  const size = a.bottle ? `${a.bottle} ` : ''
  // dispName often already contains the brand (e.g. "I Love Salts Grappleberry")
  const nameHasBrand = a.dispName.toLowerCase().includes(a.brand.toLowerCase())
  const byBrand = nameHasBrand ? '' : ` by ${a.brand}`
  const open = [
    `${a.dispName} is a ${size}${kind}${byBrand}, mixed for a smooth, consistent draw in refillable pods and kits.`,
    `Bottle your own setup with ${a.dispName} — a ${size}${kind}${byBrand} that pairs cleanly with any compatible pod or tank.`,
    `The ${a.dispName} is a ${size}${kind} you fill yourself, dialling the flavour to whatever device you run.`,
    `${a.dispName} delivers a full-bodied flavour in a ${size}${kind}, ready to refill and go.`,
  ]
  const body = [
    isSalt ? `Salt nicotine gives a smoother throat hit than freebase at the same strength, so ${a.nic} stays comfortable even for heavier vapers.`
      : `A balanced VG/PG mix keeps the flavour clean and the clouds respectable across most refillable setups.`,
    isSalt ? `It suits low-wattage pod devices, where the ${a.nic} salt delivers nicotine fast without the harshness.`
      : `It's built for tanks and higher-airflow pods where flavour and vapour both matter.`,
  ]
  const close = [
    `Shipped same-day from Australian stock, TGA-compliant, free over $300.`,
    `Genuine ${a.brand} stock, dispatched with tracking from Sydney.`,
    `In stock at $${a.price} with discreet Australia-wide delivery.`,
  ]
  return {
    desc: clean([pick(open, seed, 1), pick(body, seed, 7), pick(close, seed, 3)].join(' ')),
    short: clean(pick([
      `${size}${kind} from ${a.brand} for refillable pods and kits.`,
      `${a.brand} ${kind}${a.bottle ? ' in ' + a.bottle : ''}, ${a.nic}.`,
      `Refill-ready ${size}${kind} by ${a.brand}.`,
    ], seed, 5)),
    feats: [isSalt ? 'Salt nicotine — smoother throat hit' : 'Balanced VG/PG freebase blend', `${a.nic} nicotine`, a.bottle ? `${a.bottle} bottle` : 'Refill-ready bottle', 'For refillable pods & kits', 'TGA-compliant Australian stock'],
  }
}

// ── accessories generator ────────────────────────────────────────
function accessory(a, seed) {
  const open = [
    `The ${a.dispName} is a genuine ${a.brand} accessory, kept in Australian stock for quick replacement and dispatch.`,
    `Keep your setup running with the ${a.dispName} — an authentic ${a.brand} part shipped fast from Sydney.`,
    `${a.brand}'s ${a.dispName} is a compatible spare designed to keep your device performing like new.`,
  ]
  const close = [
    `In stock now at $${a.price} with same-day Australian dispatch.`,
    `Shipped with tracking from our Sydney warehouse, free over $300.`,
    `Genuine stock, sent discreetly Australia-wide.`,
  ]
  return {
    desc: clean([pick(open, seed, 1), pick(close, seed, 3)].join(' ')),
    short: clean(pick([
      `Genuine ${a.brand} accessory, in Australian stock.`,
      `${a.brand} replacement part — fast AU dispatch.`,
      `Authentic ${a.brand} spare, shipped from Sydney.`,
    ], seed, 5)),
    feats: ['Genuine brand stock', 'Australian warehouse', 'Fast same-day dispatch', 'Tracked shipping'],
  }
}

const SITE_BRAND = 'Aussie Vape Hub'

/** Trim to <= max on a word boundary. Never mid-word. */
function trimWords(s, max) {
  if (s.length <= max) return s
  const cut = s.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > max * 0.5 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:|–-]+$/, '')
}

/** Prefer a complete sentence; else a whole word plus a full stop. */
function trimSentence(s, max) {
  if (s.length <= max) return s
  const cut = s.slice(0, max)
  const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '))
  if (lastStop > max * 0.55) return cut.slice(0, lastStop + 1)
  const words = trimWords(cut, max - 1)
  return words.endsWith('.') ? words : words + '.'
}

// Title/description are truncated on word and sentence boundaries, and the
// brand suffix is appended AFTER trimming — slicing the finished string cut
// mid-brand ("… | Vapes Austra"), which then survived later find-replaces.
function genSeo(a, seed, short) {
  const suffix = ` | ${SITE_BRAND}`
  const seoTitle = trimWords(a.dispName, 62 - suffix.length) + suffix

  const base = clean(short || a.dispName)
  const cta = ` Buy online at ${SITE_BRAND} — fast Australia-wide shipping.`
  const seoDescription =
    base.length + cta.length <= 158
      ? (base.endsWith('.') ? base : base + '.') + cta
      : trimSentence(base, 158)

  return { seoTitle, seoDescription }
}

function generate(p, brandName, catSlug) {
  const a = attrs(p, brandName, catSlug)
  const seed = seedOf(p.slug)
  let g
  if (catSlug === 'pod-systems') g = pod(a, seed)
  else if (catSlug === 'nicotine-salts') g = liquid(a, seed, true)
  else if (catSlug === 'e-liquids') g = liquid(a, seed, false)
  else if (catSlug === 'accessories') g = accessory(a, seed)
  else g = disposable(a, seed)
  const seo = genSeo(a, seed, g.short)
  return {
    description: g.desc,
    short_description: g.short,
    features: g.feats,
    seo_title: seo.seoTitle,
    seo_description: seo.seoDescription,
  }
}

// ── run ──────────────────────────────────────────────────────────
const { data: cats } = await sb.from('categories').select('id,slug')
const catById = Object.fromEntries(cats.map(c => [c.id, c.slug]))
const { data: brands } = await sb.from('brands').select('id,name')
const brandById = Object.fromEntries(brands.map(b => [b.id, b.name]))

// Supabase caps a select at 1000 rows — page through all of them.
const products = []
for (let from = 0; ; from += 1000) {
  const { data, error } = await sb.from('products')
    .select('id,slug,name,price,brand_id,category_id,flavours,nicotine_strengths,specifications')
    .order('id', { ascending: true })
    .range(from, from + 999)
  if (error) { console.error(error); process.exit(1) }
  products.push(...data)
  if (data.length < 1000) break
}
console.log('fetched', products.length, 'products')

if (MODE === 'dry') {
  const wanted = ['disposable-vapes', 'pod-systems', 'nicotine-salts', 'e-liquids', 'accessories']
  for (const cat of wanted) {
    const sample = products.filter(p => catById[p.category_id] === cat).slice(0, cat === 'disposable-vapes' ? 2 : 1)
    for (const p of sample) {
      const g = generate(p, brandById[p.brand_id], catById[p.category_id])
      console.log('\n══════════════════════════════════════════════')
      console.log('CATEGORY:', cat, '| SLUG:', p.slug)
      console.log('\nDESCRIPTION:\n', g.description)
      console.log('\nSHORT:', g.short_description)
      console.log('FEATURES:', g.features.join(' · '))
      console.log('SEO TITLE:', g.seo_title)
      console.log('SEO DESC:', g.seo_description)
    }
  }
  console.log('\n\n[dry run — nothing written. Run with --apply to update all', products.length, 'products]')
  process.exit(0)
}

// apply in batches
let done = 0
for (const p of products) {
  const g = generate(p, brandById[p.brand_id], catById[p.category_id])
  const { error: e } = await sb.from('products').update(g).eq('id', p.id)
  if (e) { console.error('FAIL', p.slug, e.message); continue }
  done++
  if (done % 100 === 0) console.log(`updated ${done}/${products.length}`)
}
console.log(`done — rewrote ${done}/${products.length} products`)

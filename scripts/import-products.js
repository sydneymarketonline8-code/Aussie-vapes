/* eslint-disable */
const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')

const ROOT = path.join(__dirname, '..')
const CSV_PATH = path.join(ROOT, 'wc-product-export-10-5-2026-1778366869824.csv')
const OUT_PATH = path.join(ROOT, 'lib', 'products.ts')
const IMG_DIR = path.join(ROOT, 'public', 'products')
const LOG_PATH = path.join(ROOT, 'scripts', 'import.log')

const DOWNLOAD_CONCURRENCY = 8
const REQUEST_TIMEOUT_MS = 15_000
const MAX_RETRIES = 2

if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true })

const logStream = fs.createWriteStream(LOG_PATH, { flags: 'w' })
const log = (...a) => {
  const s = a.join(' ')
  console.log(s)
  logStream.write(s + '\n')
}

function parseCSV(text) {
  const rows = []
  let cur = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === ',') {
        cur.push(field)
        field = ''
      } else if (ch === '\n') {
        cur.push(field)
        rows.push(cur)
        cur = []
        field = ''
      } else if (ch === '\r') {
      } else {
        field += ch
      }
    }
  }
  if (field.length || cur.length) {
    cur.push(field)
    rows.push(cur)
  }
  return rows
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
}

function ucWords(s) {
  return s
    .toLowerCase()
    .split(' ')
    .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w.toUpperCase()))
    .join(' ')
}

function titleCase(name) {
  const lower = name.toLowerCase().replace(/\s+/g, ' ').trim()
  return lower
    .split(/(\s|-)/)
    .map((tok) => {
      if (tok === ' ' || tok === '-') return tok
      if (/^\d/.test(tok)) return tok.toUpperCase()
      if (tok.length <= 3 && /^[a-z]+$/.test(tok)) return tok.toUpperCase()
      return tok.charAt(0).toUpperCase() + tok.slice(1)
    })
    .join('')
}

function extractPuffCount(name) {
  const m = name.match(/(\d{3,6})\s*(?:k|K)?\s*PUFF/i) || name.match(/(\d{3,6})\s*PUFFS?/i)
  if (m) return parseInt(m[1], 10)
  const m2 = name.match(/-\s*(\d{3,6})\s*$/)
  if (m2) return parseInt(m2[1], 10)
  const m3 = name.match(/\b(\d{3,6})\b/)
  if (m3) {
    const n = parseInt(m3[1], 10)
    if (n >= 500 && n <= 30000) return n
  }
  return null
}

function extractPackSize(name) {
  const m = name.match(/(\d{1,3})\s*PACK/i)
  if (m) return parseInt(m[1], 10)
  return 1
}

function priceFromPuffs(puffs) {
  if (!puffs) return 29.95
  if (puffs < 1000) return 14.95
  if (puffs < 2500) return 19.95
  if (puffs < 4000) return 24.95
  if (puffs < 5500) return 29.95
  if (puffs < 7000) return 32.95
  if (puffs < 9000) return 36.95
  if (puffs < 11000) return 39.95
  if (puffs < 13000) return 42.95
  if (puffs < 16000) return 46.95
  if (puffs < 21000) return 54.95
  return 59.95
}

function priceForProduct(name, csvCat) {
  const lower = name.toLowerCase()
  if (lower.includes('cap') || lower.includes('watch') || lower.includes('sunglasses')) {
    return 29.95
  }
  if (csvCat.includes('Cream Chargers') || /cream\s*charger/i.test(name)) return 89.95
  if (csvCat.includes('Pouches') || /pouch/i.test(name)) return 14.95
  if (csvCat.includes('E-Liquid') || /e-?liquid|vape\s*juice/i.test(name)) {
    if (/100\s*ml/i.test(name)) return 34.95
    if (/60\s*ml/i.test(name)) return 27.95
    return 22.95
  }
  if (csvCat.includes('vape kits') || csvCat.toLowerCase().includes('pod kit')) return 69.95
  if (/\bPODS?\b/.test(name) && !/disposable/i.test(name)) return 24.95
  if (/CIGARETTES?/i.test(name)) return 39.95

  const packSize = extractPackSize(name)
  const puffs = extractPuffCount(name)
  const base = priceFromPuffs(puffs)
  if (packSize > 1) {
    const discount = packSize >= 10 ? 0.8 : packSize >= 5 ? 0.85 : 0.9
    return Math.round(base * packSize * discount * 100) / 100
  }
  return base
}

function categorizeProduct(name, csvCat) {
  const c = (csvCat || '').toLowerCase()
  const n = (name || '').toLowerCase()
  if (c.includes('e-liquid') || /\b(e-?liquid|vape\s*juice|nic\s*salt|salt\s*nic)\b/.test(n)) {
    if (/salt/.test(n) || /salt/.test(c)) return { cat: 'nicotine-salts', sub: 'standard' }
    return { cat: 'e-liquids', sub: 'freebase' }
  }
  if (c === 'accessories' || c.includes('cream chargers')) return { cat: 'accessories', sub: 'coils' }
  if (/\b(cap|watch|sunglasses)\b/.test(n)) return { cat: 'accessories', sub: 'coils' }
  if (c.includes('pouches')) return { cat: 'accessories', sub: 'coils' }
  if (c.includes('caffeine pouches')) return { cat: 'accessories', sub: 'coils' }
  if (c.includes('cigarettes')) return { cat: 'accessories', sub: 'coils' }
  if (c.includes('vape kits') || c.includes('refillable vape pod kit') || c.includes('vape tanks')) {
    return { cat: 'pod-systems', sub: 'refillable' }
  }
  if (/\bpods?\b/.test(n) && !/disposable/.test(n) && !/puffs?/.test(n)) {
    return { cat: 'pod-systems', sub: 'refillable' }
  }
  const puffs = extractPuffCount(name)
  if (puffs && puffs >= 8000) return { cat: 'disposable-vapes', sub: 'high-puff' }
  if (puffs && puffs >= 5000) return { cat: 'disposable-vapes', sub: 'mid-range' }
  if (puffs) return { cat: 'disposable-vapes', sub: 'budget' }
  return { cat: 'disposable-vapes', sub: 'mid-range' }
}

function extractBrand(csvCat, name) {
  if (!csvCat) {
    const first = name.split(/[-\s]/)[0]
    return ucWords(first || 'VapeVault')
  }
  const top = csvCat.split('>')[0].trim()
  let brand = top
    .replace(/\bvape\b/i, '')
    .replace(/\d+\s*(?:k|K)?\s*PUFFS?/i, '')
    .replace(/\bPUFFS?\b/i, '')
    .trim()
  if (!brand) brand = top
  return ucWords(brand) || 'VapeVault'
}

function extractFlavour(name) {
  let cleaned = name
    .replace(/^\s*[A-Z\d\s]+(?:BAR|VAPE|PRO|MAX|LITE|PLUS|MOSS|META|WAVE|LUME)\b/i, '')
    .replace(/-?\s*\d+\s*(?:k|K)?\s*PUFFS?.*/i, '')
    .replace(/\d+\s*PACK/i, '')
    .replace(/\|.*/i, '')
    .replace(/[-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!cleaned) return null
  return ucWords(cleaned)
}

function buildSeoDescription(name, puffs, brand, cat) {
  if (cat === 'disposable-vapes' && puffs) {
    return `Buy the ${name} ${puffs.toLocaleString()} puff disposable vape in Australia. Fast AU shipping, in stock now. Shop ${brand} at VapeVault AU.`
  }
  if (cat === 'nicotine-salts') {
    return `Buy ${name} nicotine salt e-liquid in Australia. Smooth throat hit, AU stock, fast shipping at VapeVault AU.`
  }
  if (cat === 'e-liquids') {
    return `Buy ${name} freebase e-liquid in Australia. Sub-ohm friendly, fast AU shipping at VapeVault AU.`
  }
  if (cat === 'pod-systems') {
    return `Buy ${name} refillable pod kit in Australia. 12-month AU warranty, fast shipping at VapeVault AU.`
  }
  return `Buy ${name} in Australia. Fast AU shipping at VapeVault AU.`
}

function buildDescription(name, brand, puffs, cat, flavour) {
  if (cat === 'disposable-vapes') {
    const puffStr = puffs ? `${puffs.toLocaleString()} puff` : 'high-capacity'
    const flav = flavour ? ` Crafted around the ${flavour} flavour profile,` : ''
    return `The ${name} from ${brand} is a ${puffStr} rechargeable disposable vape designed for Australian vapers who value flavour and convenience.${flav} this device combines a smooth, consistent draw with a long-lasting battery for an effortless vaping experience. Ships same-day from Australian stock with full TGA-compliant 20mg nicotine salt.`
  }
  if (cat === 'nicotine-salts') {
    return `${name} delivers a smooth, fast-hitting nicotine salt experience formulated for pod systems. Manufactured under strict quality control and compatible with all standard refillable pods, this e-liquid is ideal for vapers who want satisfying nicotine delivery without harshness.`
  }
  if (cat === 'e-liquids') {
    return `${name} is a high-VG freebase e-liquid designed for sub-ohm devices operating above 25W. The PG/VG balance produces thick clouds and rich flavour, making it ideal for box mods and high-power pod systems.`
  }
  if (cat === 'pod-systems') {
    return `The ${name} from ${brand} is a refillable pod system designed for everyday Australian vapers. Compatible with nicotine salt and freebase e-liquids, this device delivers reliable performance for both new and experienced users.`
  }
  return `${name} from ${brand} — quality product available now at VapeVault AU with fast Australian shipping.`
}

function buildFeatures(name, puffs, cat) {
  if (cat === 'disposable-vapes') {
    const features = []
    if (puffs) features.push(`${puffs.toLocaleString()} puff capacity`)
    features.push('20mg nicotine salt (TGA compliant)')
    if (puffs && puffs >= 5000) features.push('USB-C rechargeable battery')
    features.push('Mesh coil for richer flavour')
    features.push('Draw-activated firing')
    features.push('Child-resistant mouthpiece')
    return features
  }
  if (cat === 'nicotine-salts') {
    return [
      '30mL bottle',
      'Available in 25mg and 50mg',
      'Pharmaceutical-grade nicotine salt',
      '70% PG / 30% VG blend',
      'Compatible with all pod systems',
      'Child-resistant cap',
    ]
  }
  if (cat === 'e-liquids') {
    return [
      '30mL bottle',
      'Freebase nicotine',
      '30% PG / 70% VG',
      'Ideal for sub-ohm devices',
      '3mg & 6mg options',
    ]
  }
  if (cat === 'pod-systems') {
    return ['Refillable pod design', 'USB-C charging', 'Compatible with nic salts & freebase', '12-month AU warranty']
  }
  return ['Quality product', 'Australian stock', 'Fast shipping']
}

function buildSpecs(name, puffs, cat) {
  if (cat === 'disposable-vapes') {
    const s = {}
    if (puffs) s['Puff Count'] = puffs.toLocaleString()
    s['Nicotine Strength'] = '20mg/mL (2%)'
    s['Nicotine Type'] = 'Salt nicotine'
    if (puffs) {
      s['E-liquid Capacity'] = puffs >= 10000 ? '18mL' : puffs >= 5000 ? '12mL' : '6mL'
      s['Battery'] = puffs >= 10000 ? '650mAh rechargeable' : puffs >= 5000 ? '500mAh rechargeable' : '400mAh'
    }
    s['Coil Type'] = 'Mesh'
    return s
  }
  if (cat === 'nicotine-salts') {
    return { Volume: '30mL', 'Nicotine Type': 'Salt nicotine', 'PG/VG Ratio': '70/30' }
  }
  if (cat === 'e-liquids') {
    return { Volume: '30mL', 'Nicotine Type': 'Freebase', 'PG/VG Ratio': '30/70' }
  }
  return {}
}

function generateRating() {
  const ratings = [4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9]
  return ratings[Math.floor(Math.random() * ratings.length)]
}
function generateReviewCount() {
  return 15 + Math.floor(Math.random() * 400)
}
function generateStock() {
  return 25 + Math.floor(Math.random() * 250)
}

function downloadOne(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      return resolve({ ok: true, skipped: true })
    }
    const tryOnce = (currentUrl, attempt, redirects) => {
      if (redirects > 5) return resolve({ ok: false, reason: 'too-many-redirects' })
      const proto = currentUrl.startsWith('https:') ? https : http
      const req = proto.get(
        currentUrl,
        {
          timeout: REQUEST_TIMEOUT_MS,
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            Accept: 'image/webp,image/avif,image/*,*/*;q=0.8',
            'Accept-Language': 'en-AU,en;q=0.9',
          },
        },
        (res) => {
          if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            res.destroy()
            const next = new URL(res.headers.location, currentUrl).toString()
            return tryOnce(next, attempt, redirects + 1)
          }
          if (res.statusCode !== 200) {
            res.destroy()
            if (attempt < MAX_RETRIES) return setTimeout(() => tryOnce(currentUrl, attempt + 1, redirects), 500)
            return resolve({ ok: false, reason: 'status-' + res.statusCode })
          }
          const ct = res.headers['content-type'] || ''
          if (!ct.startsWith('image/')) {
            res.destroy()
            return resolve({ ok: false, reason: 'not-image-' + ct })
          }
          const f = fs.createWriteStream(dest)
          res.pipe(f)
          f.on('finish', () => f.close(() => resolve({ ok: true })))
          f.on('error', (e) => {
            fs.unlink(dest, () => {})
            resolve({ ok: false, reason: 'fs-' + e.message })
          })
        }
      )
      req.on('timeout', () => {
        req.destroy()
        if (attempt < MAX_RETRIES) return setTimeout(() => tryOnce(currentUrl, attempt + 1, redirects), 500)
        resolve({ ok: false, reason: 'timeout' })
      })
      req.on('error', (e) => {
        if (attempt < MAX_RETRIES) return setTimeout(() => tryOnce(currentUrl, attempt + 1, redirects), 500)
        resolve({ ok: false, reason: 'err-' + e.message })
      })
    }
    tryOnce(url, 0, 0)
  })
}

async function pool(items, limit, worker) {
  const results = new Array(items.length)
  let next = 0
  const runners = []
  for (let r = 0; r < limit; r++) {
    runners.push(
      (async () => {
        while (true) {
          const i = next++
          if (i >= items.length) return
          results[i] = await worker(items[i], i)
        }
      })()
    )
  }
  await Promise.all(runners)
  return results
}

function tsString(s) {
  if (s == null) return "''"
  return "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ') + "'"
}

function tsArray(arr) {
  if (!arr || !arr.length) return '[]'
  return '[' + arr.map(tsString).join(', ') + ']'
}

function tsRecord(obj) {
  const keys = Object.keys(obj)
  if (!keys.length) return '{}'
  return '{ ' + keys.map((k) => tsString(k) + ': ' + tsString(obj[k])).join(', ') + ' }'
}

async function main() {
  log('Reading CSV…')
  let text = fs.readFileSync(CSV_PATH, 'utf8')
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
  const rows = parseCSV(text)
  const header = rows[0]
  const colIdx = (n) => header.indexOf(n)
  const iId = colIdx('ID')
  const iName = colIdx('Name')
  const iCat = colIdx('Categories')
  const iImg = colIdx('Images')
  log('Header columns:', header.length, '| Data rows:', rows.length - 1)

  const slugsUsed = new Set()
  const products = []
  const skipped = []

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r]
    const id = (row[iId] || '').trim()
    const name = (row[iName] || '').trim()
    const csvCat = (row[iCat] || '').trim()
    const imgUrlRaw = (row[iImg] || '').trim()
    if (!name) continue

    let slug = slugify(name)
    if (!slug) slug = 'product-' + id
    let final = slug
    let n = 2
    while (slugsUsed.has(final)) {
      final = slug + '-' + n++
    }
    slugsUsed.add(final)

    const { cat, sub } = categorizeProduct(name, csvCat)
    const brand = extractBrand(csvCat, name)
    const puffs = extractPuffCount(name)
    const flavour = extractFlavour(name)
    const price = priceForProduct(name, csvCat)
    const sku = (brand.replace(/\s+/g, '').toUpperCase().slice(0, 6) || 'VV') + '-' + id

    let imgUrl = imgUrlRaw
    if (imgUrl && !imgUrl.startsWith('http')) imgUrl = ''
    const ext = imgUrl ? (imgUrl.match(/\.([a-zA-Z]{3,4})(?:\?|$)/) || [null, 'jpg'])[1].toLowerCase() : 'jpg'
    const imgFile = `${final}.${ext === 'jpeg' ? 'jpg' : ext}`
    const imgPath = `/products/${imgFile}`
    const imgDest = path.join(IMG_DIR, imgFile)

    products.push({
      id,
      slug: final,
      name,
      brand,
      sku,
      price,
      images: [imgPath],
      category: cat,
      subcategory: sub,
      tags: [cat, brand.toLowerCase().split(' ')[0], puffs ? `${puffs}puff` : 'vape'].filter(Boolean),
      description: buildDescription(name, brand, puffs, cat, flavour),
      shortDescription: puffs
        ? `${puffs.toLocaleString()} puff ${cat === 'disposable-vapes' ? 'disposable vape' : 'product'} from ${brand}.`
        : `${brand} ${cat.replace('-', ' ')} — quality you can trust.`,
      features: buildFeatures(name, puffs, cat),
      specifications: buildSpecs(name, puffs, cat),
      inStock: true,
      stockCount: generateStock(),
      rating: generateRating(),
      reviewCount: generateReviewCount(),
      isNew: false,
      isBestSeller: false,
      isSale: false,
      relatedProductSlugs: [],
      seoTitle: `${name} | VapeVault AU`,
      seoDescription: buildSeoDescription(name, puffs, brand, cat),
      flavours: flavour ? [flavour] : undefined,
      nicotineStrengths: cat === 'disposable-vapes' || cat === 'nicotine-salts' ? ['20mg'] : undefined,
      _imgUrl: imgUrl,
      _imgDest: imgDest,
      _imgFile: imgFile,
    })
  }

  log(`Built ${products.length} product entries.`)

  // Flags: pick isBestSeller / isNew / isSale across the catalog
  for (let i = 0; i < products.length; i++) {
    if (i % 47 === 0) products[i].isBestSeller = true
    if (i % 31 === 0) products[i].isNew = true
    if (i % 23 === 0) {
      products[i].isSale = true
      products[i].comparePrice = Math.round(products[i].price * 1.25 * 100) / 100
    }
  }

  // Related products: pick 4 from same category
  const byCat = {}
  for (const p of products) {
    if (!byCat[p.category]) byCat[p.category] = []
    byCat[p.category].push(p.slug)
  }
  for (const p of products) {
    const pool = byCat[p.category].filter((s) => s !== p.slug)
    p.relatedProductSlugs = pool.slice(0, 4)
  }

  // Download images
  const toDownload = products.filter((p) => p._imgUrl)
  log(`Downloading ${toDownload.length} images (concurrency=${DOWNLOAD_CONCURRENCY})…`)
  let done = 0
  let okCount = 0
  let failCount = 0
  const failedSlugs = []
  await pool(toDownload, DOWNLOAD_CONCURRENCY, async (p) => {
    const res = await downloadOne(p._imgUrl, p._imgDest)
    done++
    if (res.ok) {
      okCount++
    } else {
      failCount++
      failedSlugs.push({ slug: p.slug, reason: res.reason, url: p._imgUrl })
      // Use placeholder
      p.images = [`https://placehold.co/600x600/1c1c1c/06b6d4?text=${encodeURIComponent(p.brand)}`]
    }
    if (done % 50 === 0 || done === toDownload.length) {
      log(`  ${done}/${toDownload.length} — ok ${okCount}, fail ${failCount}`)
    }
  })

  if (failedSlugs.length) {
    fs.writeFileSync(path.join(__dirname, 'failed-images.json'), JSON.stringify(failedSlugs, null, 2))
    log(`Wrote ${failedSlugs.length} failed image entries to scripts/failed-images.json`)
  }

  log('Generating lib/products.ts…')
  const lines = []
  lines.push(`import type { Product } from '@/types'`)
  lines.push('')
  lines.push('export const PRODUCTS = ([')
  for (const p of products) {
    lines.push('  {')
    lines.push(`    id: ${tsString('prod-' + p.id)},`)
    lines.push(`    slug: ${tsString(p.slug)},`)
    lines.push(`    name: ${tsString(p.name)},`)
    lines.push(`    brand: ${tsString(p.brand)},`)
    lines.push(`    sku: ${tsString(p.sku)},`)
    lines.push(`    price: ${p.price},`)
    if (p.comparePrice) lines.push(`    comparePrice: ${p.comparePrice},`)
    lines.push(`    images: ${tsArray(p.images)},`)
    lines.push(`    category: ${tsString(p.category)},`)
    lines.push(`    subcategory: ${tsString(p.subcategory)},`)
    lines.push(`    tags: ${tsArray(p.tags)},`)
    lines.push(`    description: ${tsString(p.description)},`)
    lines.push(`    shortDescription: ${tsString(p.shortDescription)},`)
    lines.push(`    features: ${tsArray(p.features)},`)
    lines.push(`    specifications: ${tsRecord(p.specifications)},`)
    lines.push(`    inStock: ${p.inStock},`)
    lines.push(`    stockCount: ${p.stockCount},`)
    lines.push(`    rating: ${p.rating},`)
    lines.push(`    reviewCount: ${p.reviewCount},`)
    if (p.isNew) lines.push(`    isNew: true,`)
    if (p.isBestSeller) lines.push(`    isBestSeller: true,`)
    if (p.isSale) lines.push(`    isSale: true,`)
    lines.push(`    relatedProductSlugs: ${tsArray(p.relatedProductSlugs)},`)
    lines.push(`    seoTitle: ${tsString(p.seoTitle)},`)
    lines.push(`    seoDescription: ${tsString(p.seoDescription)},`)
    if (p.flavours) lines.push(`    flavours: ${tsArray(p.flavours)},`)
    if (p.nicotineStrengths) lines.push(`    nicotineStrengths: ${tsArray(p.nicotineStrengths)},`)
    lines.push('  },')
  }
  lines.push('] as unknown as Product[])')
  lines.push('')
  lines.push(`export function getProductBySlug(slug: string): Product | undefined {`)
  lines.push(`  return PRODUCTS.find((p) => p.slug === slug)`)
  lines.push(`}`)
  lines.push('')
  lines.push(`export function getProductsByCategory(categorySlug: string): Product[] {`)
  lines.push(`  return PRODUCTS.filter((p) => p.category === categorySlug)`)
  lines.push(`}`)
  lines.push('')
  lines.push(`export function getRelatedProducts(slugs: string[]): Product[] {`)
  lines.push(`  return PRODUCTS.filter((p) => slugs.includes(p.slug))`)
  lines.push(`}`)
  lines.push('')
  lines.push(`export function getFeaturedProducts(): Product[] {`)
  lines.push(`  return PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8)`)
  lines.push(`}`)
  lines.push('')
  lines.push(`export function getNewArrivals(): Product[] {`)
  lines.push(`  return PRODUCTS.filter((p) => p.isNew).slice(0, 8)`)
  lines.push(`}`)
  lines.push('')
  lines.push(`export function getSaleProducts(): Product[] {`)
  lines.push(`  return PRODUCTS.filter((p) => p.isSale)`)
  lines.push(`}`)
  lines.push('')
  lines.push(`export function searchProducts(query: string): Product[] {`)
  lines.push(`  const q = query.toLowerCase()`)
  lines.push(`  return PRODUCTS.filter(`)
  lines.push(`    (p) =>`)
  lines.push(`      p.name.toLowerCase().includes(q) ||`)
  lines.push(`      p.brand.toLowerCase().includes(q) ||`)
  lines.push(`      p.category.toLowerCase().includes(q) ||`)
  lines.push(`      p.tags.some((t) => t.toLowerCase().includes(q)) ||`)
  lines.push(`      p.shortDescription.toLowerCase().includes(q)`)
  lines.push(`  )`)
  lines.push(`}`)
  lines.push('')

  fs.writeFileSync(OUT_PATH, lines.join('\n'))
  const stats = fs.statSync(OUT_PATH)
  log(`Wrote ${OUT_PATH} (${(stats.size / 1024).toFixed(1)} KB)`)
  log(`Categories: ${Object.entries(byCat).map(([k, v]) => k + '=' + v.length).join(', ')}`)
  log('Done.')
  logStream.end()
}

main().catch((e) => {
  log('FATAL:', e.stack || e.message)
  logStream.end()
  process.exit(1)
})

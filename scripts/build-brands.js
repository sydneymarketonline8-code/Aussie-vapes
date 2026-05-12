/* eslint-disable */
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const PRODUCTS_PATH = path.join(ROOT, 'lib', 'products.ts')

const text = fs.readFileSync(PRODUCTS_PATH, 'utf8')

const brandRegex = /brand:\s*'([^']+)'/g
const counts = new Map()
let m
while ((m = brandRegex.exec(text)) !== null) {
  const b = m[1]
  counts.set(b, (counts.get(b) || 0) + 1)
}

const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1])
console.log('Brand count:', sorted.length)
console.log('Top brands:')
sorted.slice(0, 50).forEach(([b, c]) => console.log(`  ${b}: ${c}`))
console.log('\nBrands with >= 5 products:', sorted.filter(([, c]) => c >= 5).length)
console.log('Brands with >= 10 products:', sorted.filter(([, c]) => c >= 10).length)

// Output JSON for use in brands.ts builder
const out = sorted.map(([name, count]) => ({ name, count }))
fs.writeFileSync(path.join(__dirname, 'brands-raw.json'), JSON.stringify(out, null, 2))
console.log(`\nWrote ${out.length} brands to scripts/brands-raw.json`)

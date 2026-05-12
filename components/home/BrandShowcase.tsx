import Link from 'next/link'

const BRANDS = [
  { name: 'Alfakher', slug: 'alfakher', color: '#1f1f1f' },
  { name: 'IGET', slug: 'iget', color: '#ff0000' },
  { name: 'HQD', slug: 'hqd', color: '#2fb5d2' },
  { name: 'Gunnpod', slug: 'gunnpod', color: '#4cbb6c' },
  { name: 'Lost Mary', slug: 'lost-mary', color: '#ff9a52' },
  { name: 'RAZ', slug: 'raz', color: '#1f1f1f' },
  { name: 'Vozol', slug: 'vozol', color: '#9c27b0' },
  { name: 'Bang', slug: 'bang', color: '#ff0000' },
]

export default function BrandShowcase() {
  return (
    <section className="py-14 bg-soft-100">
      <div className="container-site">
        <div className="section-heading-wrap">
          <h2 className="section-heading">shop by brand</h2>
          <Link href="/category/disposable-vapes" className="font-display text-xs uppercase tracking-widest font-bold text-mute hover:text-price">
            All Brands →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href={`/search?q=${encodeURIComponent(brand.name)}`}
              className="group bg-white border border-line rounded-sm aspect-[3/2] flex items-center justify-center hover:shadow-md hover:border-ink transition-all p-3"
            >
              <span
                className="font-display text-lg font-bold uppercase tracking-wider transition-colors"
                style={{ color: brand.color }}
              >
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

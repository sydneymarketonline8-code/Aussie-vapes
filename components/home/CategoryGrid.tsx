import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'

const ICONS: Record<string, string> = {
  'disposable-vapes': '💨',
  'pod-systems': '🔋',
  'nicotine-salts': '🧪',
  'e-liquids': '💧',
  'accessories': '🔧',
}

export default function CategoryGrid() {
  return (
    <section className="py-14 bg-soft-100">
      <div className="container-site">
        <div className="section-heading-wrap">
          <h2 className="section-heading">shop by category</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group bg-white border border-line rounded-sm p-6 flex flex-col items-center text-center gap-3 hover:border-ink hover:shadow-md transition-all"
            >
              <div className="text-4xl">{ICONS[cat.slug] ?? '📦'}</div>
              <div>
                <h3 className="font-display text-base font-bold uppercase tracking-wider text-ink group-hover:text-price transition-colors leading-tight">
                  {cat.name}
                </h3>
                <p className="text-xs text-mute mt-1">{cat.productCount.toLocaleString()} products</p>
              </div>
              <span className="font-display text-[11px] uppercase tracking-widest text-price font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Shop Now →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

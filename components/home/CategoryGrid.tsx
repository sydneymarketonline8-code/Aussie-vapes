import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'
import { getProductCountsByCategorySlug } from '@/lib/storefront-products'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

// Visual tone per category. Keeps the grid intentional even when product
// imagery for a given category isn't available.
const CATEGORY_STYLES: Record<string, { gradient: string; accent: string; tag: string }> = {
  'disposable-vapes': {
    gradient: 'linear-gradient(135deg, #ff0000 0%, #b80000 100%)',
    accent: '#ffd1d1',
    tag: "Australia's #1 format",
  },
  'pod-systems': {
    gradient: 'linear-gradient(135deg, #2fb5d2 0%, #1e7a8d 100%)',
    accent: '#cdeef6',
    tag: 'Refillable starter kits',
  },
  'e-liquids': {
    gradient: 'linear-gradient(135deg, #7a3fc3 0%, #4a1f80 100%)',
    accent: '#e4d4f7',
    tag: 'Freebase 30–100mL',
  },
  'nicotine-salts': {
    gradient: 'linear-gradient(135deg, #ff9a52 0%, #cc6611 100%)',
    accent: '#ffe1c9',
    tag: '20mg & 50mg salts',
  },
  accessories: {
    gradient: 'linear-gradient(135deg, #3b3b3b 0%, #111111 100%)',
    accent: '#cfcfcf',
    tag: 'Coils · chargers · pods',
  },
}

const DEFAULT_STYLE = {
  gradient: 'linear-gradient(135deg, #3b3b3b 0%, #111111 100%)',
  accent: '#cfcfcf',
  tag: 'Shop the range',
}

export default async function CategoryGrid() {
  const counts = await getProductCountsByCategorySlug()

  return (
    <section className="py-14 bg-soft-100">
      <div className="container-site">
        <div className="section-heading-wrap">
          <h2 className="section-heading">shop by category</h2>
          <Link
            href="/sitemap-html"
            className="font-display text-xs uppercase tracking-widest font-bold text-mute hover:text-price"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const style = CATEGORY_STYLES[cat.slug] ?? DEFAULT_STYLE
            const count = counts.get(cat.slug) ?? 0
            const subs = cat.subcategories.slice(0, 3)

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative overflow-hidden rounded-sm flex flex-col aspect-[5/6] p-5 text-white shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"
                style={{ background: style.gradient }}
              >
                {/* Decorative grid pattern */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)',
                    backgroundSize: '14px 14px',
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <p
                    className="font-display text-[10px] uppercase tracking-[0.25em] font-bold"
                    style={{ color: style.accent }}
                  >
                    {style.tag}
                  </p>
                  <h3 className="font-display text-xl lg:text-2xl font-bold leading-tight mt-1 lowercase">
                    {cat.name.toLowerCase()}
                  </h3>

                  <ul className="mt-3 space-y-1 text-[11px] flex-1" style={{ color: style.accent }}>
                    {subs.map((s) => (
                      <li key={s.slug} className="leading-snug">
                        · {s.name}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between gap-2">
                    <div>
                      <p className="font-display font-bold text-base leading-none">
                        {count.toLocaleString()}
                      </p>
                      <p
                        className="font-display text-[9px] uppercase tracking-widest mt-1"
                        style={{ color: style.accent }}
                      >
                        Products
                      </p>
                    </div>
                    <span
                      className="inline-flex items-center gap-1 font-display text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-transform group-hover:translate-x-1"
                    >
                      Shop <ArrowRightIcon className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

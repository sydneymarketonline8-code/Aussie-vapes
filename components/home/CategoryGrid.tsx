import Link from 'next/link'
import Image from 'next/image'
import { CATEGORIES } from '@/lib/categories'
import { getProductCountsByCategorySlug } from '@/lib/storefront-products'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

// Hand-picked hero image + per-category visual tone. Image paths are real
// files in public/products/ so they always render. Replace any of these
// any time you want a different product representing the category.
const CATEGORY_STYLES: Record<
  string,
  { image: string; gradient: string; accent: string; tag: string }
> = {
  'disposable-vapes': {
    image: '/products/alfakher-crown-bar-15000-puffs.jpg',
    gradient: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(184,0,0,0.95) 60%, #8a0000 100%)',
    accent: '#ffd1d1',
    tag: "Australia's #1 format",
  },
  'pod-systems': {
    image: '/products/relx-magicgo-8000-puffs-fresh-mint.jpg',
    gradient: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(30,122,141,0.95) 60%, #155a6b 100%)',
    accent: '#cdeef6',
    tag: 'Refillable starter kits',
  },
  'e-liquids': {
    image: '/products/aloe-grape-pod-juice.png',
    gradient: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(74,31,128,0.95) 60%, #341557 100%)',
    accent: '#e4d4f7',
    tag: 'Freebase 30–100mL',
  },
  'nicotine-salts': {
    image: '/products/i-love-salts-strawberry-ice.jpg',
    gradient: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(204,102,17,0.95) 60%, #8c4710 100%)',
    accent: '#ffe1c9',
    tag: '20mg & 50mg salts',
  },
  accessories: {
    image: '/products/geekvape-b-series-coils.png',
    gradient: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(17,17,17,0.95) 60%, #000000 100%)',
    accent: '#cfcfcf',
    tag: 'Coils · chargers · pods',
  },
}

const DEFAULT_STYLE = {
  image: '',
  gradient: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(17,17,17,0.95) 60%, #000000 100%)',
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
                className="group relative overflow-hidden rounded-sm flex flex-col aspect-[5/7] bg-soft-200 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                {/* Product hero image fills the card */}
                {style.image && (
                  <Image
                    src={style.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                    priority={false}
                  />
                )}

                {/* Bottom gradient + text overlay */}
                <div
                  className="absolute inset-x-0 bottom-0 top-1/2 p-4 flex flex-col justify-end text-white"
                  style={{ background: style.gradient }}
                >
                  <p
                    className="font-display text-[10px] uppercase tracking-[0.25em] font-bold"
                    style={{ color: style.accent }}
                  >
                    {style.tag}
                  </p>
                  <h3 className="font-display text-xl lg:text-2xl font-bold leading-tight mt-1 lowercase">
                    {cat.name.toLowerCase()}
                  </h3>

                  <ul
                    className="mt-2 space-y-0.5 text-[11px] leading-snug"
                    style={{ color: style.accent }}
                  >
                    {subs.map((s) => (
                      <li key={s.slug}>· {s.name}</li>
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
                    <span className="inline-flex items-center gap-1 font-display text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-transform group-hover:translate-x-1">
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

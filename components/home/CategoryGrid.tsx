import Link from 'next/link'
import Image from 'next/image'
import { CATEGORIES } from '@/lib/categories'
import { getProductsByCategorySlug } from '@/lib/storefront-products'

export default async function CategoryGrid() {
  // Pick the highest-rated, in-stock product per category for the hero image
  const categoryWithImage = await Promise.all(
    CATEGORIES.map(async (cat) => {
      const all = await getProductsByCategorySlug(cat.slug)
      const products = all.filter((p) => p.images?.[0])
      const hero =
        [...products]
          .sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.rating - a.rating)[0] ?? null
      const supporting = products
        .filter((p) => p.id !== hero?.id)
        .slice(0, 2)
      return { cat, hero, supporting, count: all.length }
    }),
  )

  return (
    <section className="py-14 bg-soft-100">
      <div className="container-site">
        <div className="section-heading-wrap">
          <h2 className="section-heading">shop by category</h2>
          <Link href="/sitemap-html" className="font-display text-xs uppercase tracking-widest font-bold text-mute hover:text-price">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoryWithImage.map(({ cat, hero, supporting, count }) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group bg-white border border-line rounded-sm overflow-hidden flex flex-col hover:border-ink hover:shadow-md transition-all"
            >
              {/* Image stack */}
              <div className="relative aspect-[5/4] bg-soft-100 overflow-hidden">
                {hero?.images?.[0] && (
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <Image
                      src={hero.images[0]}
                      alt={`${cat.name} — ${hero.name}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                )}
                {/* Floating supporting items */}
                {supporting[0]?.images?.[0] && (
                  <div className="absolute top-2 right-2 w-12 h-12 rounded-sm bg-white border border-line shadow-sm overflow-hidden">
                    <Image
                      src={supporting[0].images[0]}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                      unoptimized
                    />
                  </div>
                )}
                {supporting[1]?.images?.[0] && (
                  <div className="absolute bottom-2 left-2 w-12 h-12 rounded-sm bg-white border border-line shadow-sm overflow-hidden">
                    <Image
                      src={supporting[1].images[0]}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                      unoptimized
                    />
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="p-4 text-center flex-1 flex flex-col justify-between gap-1">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink group-hover:text-price transition-colors leading-tight">
                  {cat.name}
                </h3>
                <p className="text-xs text-mute">{count.toLocaleString()} products</p>
                <span className="font-display text-[10px] uppercase tracking-widest text-price font-semibold opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

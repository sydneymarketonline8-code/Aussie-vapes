import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { CATEGORIES } from '@/lib/categories'

export default function CategoryGrid() {
  return (
    <section className="py-14">
      <div className="container-site">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-heading">Shop by Category</h2>
            <p className="section-subheading">Everything the Australian vaper needs, in one place.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group card card-hover p-5 flex flex-col items-center text-center gap-3 hover:bg-surface-600 transition-colors"
            >
              <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-surface-600 border border-surface-500 group-hover:border-brand/40 transition-colors">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="80px"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-brand transition-colors leading-tight">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-600 mt-1">{cat.productCount} products</p>
              </div>
              <span className="flex items-center gap-1 text-xs text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                Shop <ArrowRightIcon className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedProducts } from '@/lib/products'
import AddToCartButton from '@/components/product/AddToCartButton'
import StarRating from '@/components/ui/StarRating'
import { CheckIcon } from '@heroicons/react/20/solid'

export default function StarOfTheWeek() {
  const products = getFeaturedProducts()
  const star = products[0]
  if (!star) return null

  const discount = star.comparePrice
    ? Math.round(((star.comparePrice - star.price) / star.comparePrice) * 100)
    : null

  return (
    <section className="py-14 bg-white">
      <div className="container-site">
        <div className="section-heading-wrap">
          <h2 className="section-heading">star of the week</h2>
          <Link href={`/product/${star.slug}`} className="font-display text-xs uppercase tracking-widest font-bold text-mute hover:text-price">
            View Product →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-soft-100 rounded-sm overflow-hidden">
          {/* Image side */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[460px] bg-white">
            <Image
              src={star.images[0]}
              alt={star.name}
              fill
              className="object-contain p-10"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />
            {discount && (
              <span className="absolute top-6 left-6 bg-price text-white font-display font-bold text-2xl uppercase px-4 py-3 rounded-sm">
                -{discount}%
              </span>
            )}
          </div>

          {/* Content side */}
          <div className="p-8 lg:p-12">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-mute mb-2">{star.brand}</p>
            <h3 className="font-display text-3xl lg:text-4xl font-bold text-ink leading-tight mb-4">
              {star.name}
            </h3>

            <div className="mb-5">
              <StarRating rating={star.rating} reviewCount={star.reviewCount} size="md" />
            </div>

            <p className="text-body text-base leading-relaxed mb-6">{star.shortDescription}</p>

            <ul className="space-y-2 mb-6">
              {star.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-body">
                  <CheckIcon className="h-5 w-5 text-success flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl font-bold text-price">${star.price.toFixed(2)}</span>
              {star.comparePrice && (
                <span className="text-lg text-mute line-through">${star.comparePrice.toFixed(2)}</span>
              )}
              <span className="text-xs text-mute">AUD</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <AddToCartButton product={star} />
              <Link href={`/product/${star.slug}`} className="btn-secondary">
                Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

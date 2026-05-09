import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types'
import StarRating from '@/components/ui/StarRating'
import AddToCartButton from './AddToCartButton'
import clsx from 'clsx'

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null

  return (
    <article className={clsx('card card-hover group flex flex-col', className)}>
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden bg-surface-600" aria-label={product.name}>
        <div className="relative aspect-square">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
        </div>

        {/* Badges overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && <span className="badge-new">New</span>}
          {product.isBestSeller && !product.isNew && <span className="badge-bestseller">Best Seller</span>}
          {product.isSale && discount && (
            <span className="badge-sale">−{discount}%</span>
          )}
        </div>

        {/* Quick-add overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <AddToCartButton product={product} compact />
        </div>
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <p className="text-xs text-zinc-600 uppercase tracking-wide">{product.brand}</p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm font-semibold text-zinc-200 hover:text-brand transition-colors line-clamp-2 leading-snug mt-0.5">
              {product.name}
            </h3>
          </Link>
        </div>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        {/* Tags */}
        {product.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium bg-surface-600 text-zinc-500 rounded w-fit"
          >
            {tag}
          </span>
        ))}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className="price-current">${product.price.toFixed(2)}</span>
          {product.comparePrice && (
            <span className="price-compare">${product.comparePrice.toFixed(2)}</span>
          )}
          <span className="text-xs text-zinc-600">AUD</span>
        </div>

        {/* Stock indicator */}
        {product.stockCount !== undefined && product.stockCount < 20 && (
          <p className="text-[11px] text-amber-500">Only {product.stockCount} left in stock</p>
        )}
      </div>
    </article>
  )
}

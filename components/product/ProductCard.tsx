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
    <article className={clsx('product-card group flex flex-col', className)}>
      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className="block relative overflow-hidden bg-soft-100"
        aria-label={product.name}
      >
        <div className="relative aspect-square">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            unoptimized
          />
        </div>

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && <span className="badge-new">New</span>}
          {product.isBestSeller && !product.isNew && <span className="badge-bestseller">Top</span>}
          {product.isSale && discount && (
            <span className="badge-sale">-{discount}%</span>
          )}
        </div>

        {/* Quick-add overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <AddToCartButton product={product} compact />
        </div>
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col gap-1.5 flex-1 text-center">
        <p className="text-[10px] text-mute uppercase tracking-widest font-semibold font-display">
          {product.brand}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="product-card-title hover:text-price transition-colors min-h-[2.6em]">
            {product.name}
          </h3>
        </Link>

        <div className="flex justify-center">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>

        {/* Price */}
        <div className="flex items-baseline justify-center gap-2 mt-auto pt-1">
          {product.comparePrice && (
            <span className="price-compare">${product.comparePrice.toFixed(2)}</span>
          )}
          <span className="price-current text-lg">${product.price.toFixed(2)}</span>
        </div>

        {/* Stock indicator */}
        {product.stockCount !== undefined && product.stockCount < 20 && (
          <p className="text-[11px] text-warning font-semibold">Only {product.stockCount} left</p>
        )}
      </div>
    </article>
  )
}

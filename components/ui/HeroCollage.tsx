import Image from 'next/image'
import type { Product } from '@/types'

interface HeroCollageProps {
  products: Product[]
  accentColor?: string
  /** Optional aspect — defaults to 'square' visual on lg+, taller on mobile */
  className?: string
}

/**
 * Hero image collage — 1 hero product + up to 4 floating supporting products.
 * Uses real product imagery from /public/products to keep heroes contextually
 * relevant on every page (category, brand, pack, city, home).
 */
export default function HeroCollage({ products, accentColor = '#3b3b3b', className = '' }: HeroCollageProps) {
  const items = products.slice(0, 5).filter((p) => p.images?.[0])
  if (items.length === 0) return null

  const [hero, ...rest] = items

  return (
    <div className={`relative aspect-square w-full max-w-md mx-auto ${className}`}>
      {/* Decorative gradient blob */}
      <div
        aria-hidden="true"
        className="absolute inset-6 rounded-full blur-3xl opacity-30"
        style={{ background: `radial-gradient(circle at 30% 30%, ${accentColor}aa 0%, transparent 60%)` }}
      />

      {/* Hero product */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative w-[72%] aspect-square rounded-sm bg-white border border-line shadow-xl overflow-hidden animate-float-slow"
          style={{ transform: 'rotate(-2deg)' }}
        >
          <Image
            src={hero.images[0]}
            alt={hero.name}
            fill
            className="object-contain p-6"
            sizes="(max-width: 1024px) 320px, 360px"
            unoptimized
            priority
          />
        </div>
      </div>

      {/* Floating products — positioned around the hero card */}
      {rest[0] && (
        <div
          className="absolute top-0 right-0 w-[38%] aspect-square rounded-sm bg-white border border-line shadow-lg overflow-hidden animate-float"
          style={{ transform: 'rotate(6deg)', animationDelay: '0.5s' }}
        >
          <Image
            src={rest[0].images[0]}
            alt={rest[0].name}
            fill
            className="object-contain p-3"
            sizes="(max-width: 1024px) 160px, 180px"
            unoptimized
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      {rest[1] && (
        <div
          className="absolute bottom-2 left-0 w-[34%] aspect-square rounded-sm bg-white border border-line shadow-lg overflow-hidden animate-float"
          style={{ transform: 'rotate(-8deg)', animationDelay: '1s' }}
        >
          <Image
            src={rest[1].images[0]}
            alt={rest[1].name}
            fill
            className="object-contain p-3"
            sizes="(max-width: 1024px) 140px, 160px"
            unoptimized
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      {rest[2] && (
        <div
          className="absolute bottom-0 right-4 w-[30%] aspect-square rounded-sm bg-white border border-line shadow-md overflow-hidden hidden sm:block animate-float-slow"
          style={{ transform: 'rotate(4deg)', animationDelay: '1.5s' }}
        >
          <Image
            src={rest[2].images[0]}
            alt={rest[2].name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 1024px) 120px, 140px"
            unoptimized
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      {rest[3] && (
        <div
          className="absolute top-12 left-0 w-[28%] aspect-square rounded-sm bg-white border border-line shadow-md overflow-hidden hidden sm:block animate-float"
          style={{ transform: 'rotate(-3deg)', animationDelay: '2s' }}
        >
          <Image
            src={rest[3].images[0]}
            alt={rest[3].name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 1024px) 110px, 130px"
            unoptimized
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
    </div>
  )
}

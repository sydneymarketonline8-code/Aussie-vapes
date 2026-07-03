import Link from 'next/link'
import type { Product } from '@/types'
import { BRANDS, getBrandSlugForProduct } from '@/lib/brands'
import { getCategoryBySlug } from '@/lib/categories'

interface ProductInternalLinksProps {
  product: Product
}

/**
 * Contextual internal link block for product pages. Hits the SEO sweet spot
 * of 3-10 internal links by surfacing the most-related landing pages for the
 * product's brand, category, format and the surrounding Vapes Australia site.
 */
export default function ProductInternalLinks({ product }: ProductInternalLinksProps) {
  const brandSlug = getBrandSlugForProduct(product)
  const brand = brandSlug ? BRANDS.find((b) => b.slug === brandSlug) : null
  const category = getCategoryBySlug(product.category)
  const isPack = /(\d+)\s*-?\s*pack|\d+\s*items?|bundle/i.test(product.name)

  // Build the link list dynamically — aim for 7-9 contextual links
  const links: { label: string; href: string }[] = []

  if (brand) {
    links.push({ label: `All ${brand.displayName} products`, href: `/brand/${brand.slug}` })
  }
  if (category) {
    links.push({ label: `Shop ${category.name}`, href: `/category/${category.slug}` })
  }
  if (isPack) {
    links.push({ label: 'Aussie Vape Packs', href: '/packs' })
    links.push({ label: 'Bundle Deals', href: '/packs/bundle-deals' })
  } else {
    links.push({ label: 'Aussie Vape Packs', href: '/packs' })
  }
  if (product.isSale) {
    links.push({ label: 'Current Vapes Australia Sale', href: '/sale' })
  } else {
    links.push({ label: 'Vapes Australia Sale', href: '/sale' })
  }
  links.push({ label: 'New Arrivals', href: '/new-arrivals' })
  links.push({ label: 'Shipping Policy', href: '/shipping' })
  links.push({ label: 'Returns & Refunds', href: '/returns' })
  links.push({ label: "Beginner's Guide", href: '/beginners-guide' })
  links.push({ label: 'AU Vaping Laws', href: '/vaping-laws-australia' })
  links.push({ label: 'Vapes Australia FAQ', href: '/faq' })

  return (
    <section className="mt-8 bg-white border border-line rounded-sm p-6">
      <h2 className="font-display text-xl font-bold text-ink uppercase tracking-wide mb-4">
        Related Vapes Australia Pages
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-body hover:text-price transition-colors font-display"
            >
              → {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

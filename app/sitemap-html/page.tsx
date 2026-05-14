import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { CATEGORIES } from '@/lib/categories'
import { BRANDS } from '@/lib/brands'
import { CITIES } from '@/lib/cities'

export const metadata: Metadata = {
  title: 'Aussie Vapes Sitemap — All Pages, Brands & Categories',
  description: 'Complete sitemap of Aussie Vapes. Browse every category, brand, location and information page in one place.',
  alternates: { canonical: '/sitemap-html' },
}

const POLICIES = [
  { label: 'About Aussie Vapes', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Shipping Policy', href: '/shipping' },
  { label: 'Returns & Refunds', href: '/returns' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
]

const RESOURCES = [
  { label: 'Aussie Vapes FAQ', href: '/faq' },
  { label: "Beginner's Vape Guide", href: '/beginners-guide' },
  { label: 'AU Vaping Laws Explained', href: '/vaping-laws-australia' },
  { label: 'Blog', href: '/blog' },
  { label: 'Help Centre', href: '/help' },
]

const ACCOUNT = [
  { label: 'My Account', href: '/account' },
  { label: 'Wishlist', href: '/wishlist' },
  { label: 'Track Order', href: '/track' },
  { label: 'Cart', href: '/cart' },
  { label: 'Checkout', href: '/checkout' },
  { label: 'Search Aussie Vapes', href: '/search' },
]

const COMMERCIAL = [
  { label: 'Bulk & Wholesale', href: '/bulk' },
  { label: 'Store Locator', href: '/store' },
  { label: 'Sale', href: '/sale' },
  { label: 'New Arrivals', href: '/new-arrivals' },
]

function Col({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-3 pb-2 border-b border-line">
        {title}
      </h3>
      <ul className="space-y-2 text-sm">
        {items.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-body hover:text-price">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SitemapHtmlPage() {
  return (
    <>
      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'Aussie Vapes', href: '/' }, { label: 'Sitemap' }]} />
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-4 mb-3 lowercase">
            aussie vapes sitemap
          </h1>
          <p className="text-body max-w-2xl leading-relaxed">
            Every page on Aussie Vapes, organised. The full XML sitemap for search engines lives at{' '}
            <Link href="/sitemap.xml" className="text-price font-semibold hover:underline">/sitemap.xml</Link>.
          </p>
        </div>
      </section>

      <section className="container-site py-14 space-y-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          <Col title="Shop By Category" items={CATEGORIES.map((c) => ({ label: c.name, href: `/category/${c.slug}` }))} />
          <Col title="Shop & Browse" items={COMMERCIAL} />
          <Col title="Resources & Guides" items={RESOURCES} />
          <Col title="My Aussie Vapes" items={ACCOUNT} />
          <Col title="Policies" items={POLICIES} />
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-ink mb-4 lowercase">aussie vapes by location</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <Link href="/aussie-vapes" className="px-4 py-3 bg-white border border-line rounded-sm font-display text-sm font-bold uppercase tracking-wider text-ink hover:bg-ink hover:text-white transition-colors text-center">
              All Locations
            </Link>
            {CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/aussie-vapes/${c.slug}`}
                className="px-4 py-3 bg-white border border-line rounded-sm font-display text-sm font-bold uppercase tracking-wider text-ink hover:bg-ink hover:text-white transition-colors text-center"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-ink mb-4 lowercase">all {BRANDS.length} aussie vapes brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <Link href="/brands" className="px-4 py-3 bg-ink text-white rounded-sm font-display text-sm font-bold uppercase tracking-wider text-center">
              All Brands
            </Link>
            {BRANDS.map((b) => (
              <Link
                key={b.slug}
                href={`/brand/${b.slug}`}
                className="px-4 py-3 bg-white border border-line rounded-sm font-display text-sm font-bold uppercase tracking-wider text-ink hover:bg-ink hover:text-white transition-colors text-center"
              >
                {b.displayName}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

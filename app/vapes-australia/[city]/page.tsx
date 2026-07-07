import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import HeroCollage from '@/components/ui/HeroCollage'
import { CITIES, getCityBySlug } from '@/lib/cities'
import { getFeaturedProducts } from '@/lib/storefront-products'
import { faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vapesaustralia.com.au'

export async function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const c = getCityBySlug(city)
  if (!c) return {}
  return {
    title: `Vapes Australia ${c.name} — Buy Vapes ${c.name} ${c.state} | Authentic AU Stock`,
    description: `Vapes Australia delivers authentic disposable vapes, pod systems and e-liquids to ${c.name}, ${c.state}. ${c.deliveryWindow}. Free shipping over $300. Same-day Sydney dispatch.`,
    keywords: c.keywords,
    alternates: { canonical: `/vapes-australia/${c.slug}` },
    openGraph: {
      title: `Vapes Australia ${c.name} — Buy Vapes ${c.name} ${c.state}`,
      description: `Authentic disposable vapes & pod systems delivered to ${c.name}. ${c.deliveryWindow}.`,
    },
  }
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params
  const c = getCityBySlug(city)
  if (!c) notFound()

  const featured = await getFeaturedProducts(5)

  const crumbs = [
    { name: 'Vapes Australia', url: `${SITE_URL}/` },
    { name: 'Locations', url: `${SITE_URL}/vapes-australia` },
    { name: `Vapes Australia ${c.name}`, url: `${SITE_URL}/vapes-australia/${c.slug}` },
  ]

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Vapes Australia ${c.name}`,
    description: `Vapes Australia serves ${c.name}, ${c.state} with authentic disposable vapes, pod systems and e-liquids. ${c.deliveryWindow} from our Sydney warehouse.`,
    url: `${SITE_URL}/vapes-australia/${c.slug}`,
    parentOrganization: {
      '@type': 'Organization',
      name: 'Vapes Australia',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: c.name,
      containedInPlace: { '@type': 'AdministrativeArea', name: c.state },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: c.name,
      addressRegion: c.state,
      addressCountry: 'AU',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(c.faqs)) }} />

      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb
            crumbs={[
              { label: 'Vapes Australia', href: '/' },
              { label: 'Locations', href: '/vapes-australia' },
              { label: `Vapes Australia ${c.name}` },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-5">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mb-2">
                {c.state} · {c.population} · Postcodes {c.postcodeRange}
              </p>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink leading-[1.05] mb-3">
                Vapes Australia {c.name}
              </h1>
              <p className="text-body text-base leading-relaxed">{c.introCopy}</p>

              {/* Delivery card inline */}
              <div className="mt-6 bg-white border border-line rounded-sm p-5 max-w-md">
                <p className="font-display text-xs uppercase tracking-wider text-mute font-bold mb-1">
                  Delivery To {c.name}
                </p>
                <p className="font-display text-lg font-bold text-ink mb-1">{c.deliveryWindow.split(',')[0]}</p>
                <p className="text-xs text-body mb-4">{c.deliveryWindow.split(',').slice(1).join(',').trim()}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-body border-t border-line pt-3">
                  <li className="flex items-center gap-1.5"><CheckCircleIcon className="h-4 w-4 text-success flex-shrink-0" />Free shipping over $300</li>
                  <li className="flex items-center gap-1.5"><CheckCircleIcon className="h-4 w-4 text-success flex-shrink-0" />Same-day Sydney dispatch</li>
                  <li className="flex items-center gap-1.5"><CheckCircleIcon className="h-4 w-4 text-success flex-shrink-0" />Discreet plain packaging</li>
                  <li className="flex items-center gap-1.5"><CheckCircleIcon className="h-4 w-4 text-success flex-shrink-0" />Authentic AU stock</li>
                </ul>
              </div>
            </div>

            {/* Featured product collage — what Vapes Australia ships to this city */}
            <div className="w-full">
              <HeroCollage products={featured} accentColor="#ff0000" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-12">
        <div className="section-heading-wrap">
          <h2 className="section-heading">popular at vapes australia {c.name.toLowerCase()}</h2>
          <Link href="/category/disposable-vapes" className="font-display text-xs uppercase tracking-widest font-bold text-mute hover:text-price">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-soft-100 border-t border-line py-14">
        <div className="container-site grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4 lowercase">
                about vapes australia in {c.name.toLowerCase()}
              </h2>
              <p className="text-body leading-relaxed">{c.longDescription}</p>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-ink mb-4 lowercase">
                why {c.name.toLowerCase()} chooses vapes australia
              </h3>
              <ul className="space-y-3 text-body">
                {c.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-ink mb-4 lowercase">
                vapes australia delivers across {c.name.toLowerCase()}
              </h3>
              <p className="text-body leading-relaxed text-sm mb-3">
                Popular {c.name} suburbs we deliver to:
              </p>
              <div className="flex flex-wrap gap-2">
                {c.popularSuburbs.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 text-xs bg-white border border-line rounded-sm font-display uppercase tracking-wider text-body"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit space-y-5">
            <div className="bg-white border border-line rounded-sm p-6">
              <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-3 pb-2 border-b border-line">
                Shop Vapes Australia {c.name}
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/category/disposable-vapes" className="text-body hover:text-price">Disposable Vapes</Link></li>
                <li><Link href="/category/pod-systems" className="text-body hover:text-price">Pod Systems</Link></li>
                <li><Link href="/category/nicotine-salts" className="text-body hover:text-price">Nicotine Salts</Link></li>
                <li><Link href="/category/e-liquids" className="text-body hover:text-price">E-Liquids</Link></li>
                <li><Link href="/brands" className="text-body hover:text-price">All Brands</Link></li>
                <li><Link href="/sale" className="text-body hover:text-price">Current Sale</Link></li>
                <li><Link href="/new-arrivals" className="text-body hover:text-price">New Arrivals</Link></li>
              </ul>
            </div>
            <div className="bg-ink text-white rounded-sm p-6">
              <p className="font-display text-xs uppercase tracking-[0.3em] font-bold text-white/70 mb-2">Other Vapes Australia Locations</p>
              <ul className="space-y-1 mt-3">
                {CITIES.filter((other) => other.slug !== c.slug).map((other) => (
                  <li key={other.slug}>
                    <Link href={`/vapes-australia/${other.slug}`} className="font-display font-bold uppercase tracking-wider text-sm hover:text-price">
                      Vapes Australia {other.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white border-t border-line py-14">
        <div className="container-site max-w-3xl">
          <div className="text-center mb-10">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mb-2">
              Vapes Australia {c.name} FAQ
            </p>
            <h2 className="font-display text-3xl font-bold text-ink lowercase">
              {c.name.toLowerCase()} delivery questions
            </h2>
          </div>

          <div className="space-y-4">
            {c.faqs.map((faq, i) => (
              <details key={i} className="group bg-soft-100 border border-line rounded-sm overflow-hidden">
                <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-4 font-display font-bold text-ink hover:bg-soft-200 transition-colors">
                  <span>{faq.question}</span>
                  <span className="font-display text-price text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                </summary>
                <div className="p-5 pt-0 text-body leading-relaxed text-sm">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

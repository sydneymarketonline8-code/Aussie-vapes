import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import HeroCollage from '@/components/ui/HeroCollage'
import { CITIES } from '@/lib/cities'
import { getFeaturedProducts } from '@/lib/storefront-products'
import { MapPinIcon } from '@heroicons/react/24/solid'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'VapeHub Vapes Australia — Australia\'s #1 Online Vape Store, City By City',
  description:
    "VapeHub Vapes Australia ships authentic vapes to every Australian city — Sydney, Melbourne, Brisbane, Perth, Adelaide and regional Australia. Find your city's delivery info.",
  keywords: [
    'vapehub vapes australia australia',
    'vapehub vapes australia sydney',
    'vapehub vapes australia melbourne',
    'vapehub vapes australia brisbane',
    'vapehub vapes australia perth',
    'vapehub vapes australia adelaide',
    'vapehub vapes australia',
    'vape delivery australia',
  ],
  alternates: { canonical: '/vapehub-vapes-australia' },
}

export default async function AussieVapesHubPage() {
  const featured = await getFeaturedProducts(5)
  return (
    <>
      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'VapeHub Vapes Australia', href: '/' }, { label: 'Locations' }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-4">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mb-2">
                VapeHub Vapes Australia Australia-Wide
              </p>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-1 mb-3 lowercase">
                vapehub vapes australia near you
              </h1>
              <p className="text-body leading-relaxed">
                VapeHub Vapes Australia is Australia&apos;s #1 online vape store, shipping authentic products to every state and
                territory. Find your city below for local delivery times, free shipping thresholds, and VapeHub Vapes Australia
                recommendations.
              </p>
            </div>
            <div className="w-full">
              <HeroCollage products={featured} accentColor="#ff0000" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/vapehub-vapes-australia/${c.slug}`}
              className="group bg-white border border-line rounded-sm p-6 hover:border-ink hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <MapPinIcon className="h-7 w-7 text-price" />
                <span className="font-display text-xs uppercase tracking-wider text-mute font-bold">{c.state}</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-ink uppercase mb-1 group-hover:text-price transition-colors">
                VapeHub Vapes Australia {c.name}
              </h2>
              <p className="text-xs text-mute mb-3">{c.population} people · Postcodes {c.postcodeRange}</p>
              <p className="text-body text-sm leading-relaxed mb-4 flex-1">{c.introCopy}</p>
              <span className="mt-auto pt-3 border-t border-line font-display text-xs uppercase tracking-widest font-bold text-ink group-hover:text-price transition-colors">
                View VapeHub Vapes Australia {c.name} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-soft-100 border-t border-line py-14">
        <div className="container-site max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-ink mb-3 lowercase">
            authentic vapehub vapes australia delivered to every postcode
          </h2>
          <p className="text-body text-sm leading-relaxed mb-6">
            Wherever you are in Australia — VapeHub Vapes Australia ships authentic, TGA-compliant vape products to your door.
            All orders dispatch same-day from our Sydney warehouse on weekday orders before 2pm AEST. Free shipping
            on orders over $300 to every Australian postcode.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/category/disposable-vapes" className="btn-primary">Shop Disposables</Link>
            <Link href="/brands" className="btn-secondary">Browse All Brands</Link>
          </div>
        </div>
      </section>
    </>
  )
}

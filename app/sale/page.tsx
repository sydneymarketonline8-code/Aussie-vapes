import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductGrid from '@/components/product/ProductGrid'
import Pagination, { PAGE_SIZE, paginate, parsePage } from '@/components/ui/Pagination'
import { getSaleProducts } from '@/lib/storefront-products'

export const revalidate = 300

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}): Promise<Metadata> {
  const sp = await searchParams
  const page = parsePage(sp.page)
  const suffix = page > 1 ? ` — Page ${page}` : ''
  const canonical = page > 1 ? `/sale?page=${page}` : '/sale'
  return {
    title: `Vapes Australia Sale${suffix} — Discounted Disposables & Pod Systems`,
    description:
      "Save big on authentic Australian vapes. Vapes Australia Sale features discounted disposables, pod systems, nicotine salts and e-liquids — same-day Sydney dispatch.",
    keywords: [
      'vapes australia sale',
      'cheap vapes australia',
      'discount vapes australia',
      'vape sale australia',
      'vapes australia discount',
      'vape clearance australia',
    ],
    alternates: { canonical },
  }
}

export default async function SalePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const sp = await searchParams
  const currentPage = parsePage(sp.page)
  const products = await getSaleProducts()
  const paged = paginate(products, currentPage, PAGE_SIZE)

  return (
    <>
      <section className="bg-price text-white border-b border-line">
        <div className="container-site py-12 text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] font-bold mb-2 text-white/80">
            Limited Time Offers
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold leading-[1.05] mb-3 uppercase">
            Vapes Australia Sale
          </h1>
          <p className="max-w-2xl mx-auto text-white/90 leading-relaxed">
            {products.length.toLocaleString()} products currently discounted at Vapes Australia — IGET, Alfakher, HQD,
            Gunnpod and more at the lowest prices in Australia. Same-day Sydney dispatch on every order.
          </p>
        </div>
      </section>

      <div className="container-site py-4">
        <Breadcrumb crumbs={[{ label: 'Vapes Australia', href: '/' }, { label: 'Sale' }]} />
      </div>

      <section className="container-site pb-14">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-xl font-bold text-ink uppercase tracking-wider mb-3">
              No Vapes Australia sale items right now
            </p>
            <p className="text-mute mb-6">Check back soon — Vapes Australia runs flash sales weekly.</p>
            <Link href="/category/disposable-vapes" className="btn-primary">
              Browse All Disposables
            </Link>
          </div>
        ) : (
          <>
            <div className="section-heading-wrap">
              <h2 className="section-heading">{products.length.toLocaleString()} items on sale</h2>
              <span className="font-display text-xs uppercase tracking-widest font-bold text-mute">
                Updated daily
              </span>
            </div>
            <ProductGrid products={paged} />
            <Pagination currentPage={currentPage} totalItems={products.length} basePath="/sale" />
          </>
        )}
      </section>

      <section className="bg-soft-100 border-t border-line py-12">
        <div className="container-site max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-ink mb-3 lowercase">
            why vapes australia sale prices beat the competition
          </h2>
          <p className="text-body text-sm leading-relaxed">
            Vapes Australia buys direct from authorised distributors in bulk, which means we pass deep discounts to
            customers. Every sale item is the same authentic product as the full-price version — never grey-market,
            never expired stock. Same 30-day return guarantee, same same-day Sydney dispatch.
          </p>
        </div>
      </section>
    </>
  )
}

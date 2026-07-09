import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductGrid from '@/components/product/ProductGrid'
import Pagination, { PAGE_SIZE, paginate, parsePage } from '@/components/ui/Pagination'
import { getNewArrivalProducts } from '@/lib/storefront-products'

export const revalidate = 300

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}): Promise<Metadata> {
  const sp = await searchParams
  const page = parsePage(sp.page)
  const suffix = page > 1 ? ` — Page ${page}` : ''
  const canonical = page > 1 ? `/new-arrivals?page=${page}` : '/new-arrivals'
  return {
    title: `Vapes Australia New Arrivals${suffix} — Latest Disposables & Pod Systems`,
    description:
      "The newest products at Vapes Australia. Fresh disposable vapes, pod systems and e-liquids landing weekly in our Sydney warehouse. Same-day AU dispatch.",
    keywords: [
      'vapes australia new arrivals',
      'new vapes australia',
      'latest disposable vapes australia',
      'vapes australia new products',
      'newest vapes australia',
    ],
    alternates: { canonical },
  }
}

export default async function NewArrivalsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const sp = await searchParams
  const currentPage = parsePage(sp.page)

  const products = await getNewArrivalProducts(240)
  const paged = paginate(products, currentPage, PAGE_SIZE)

  return (
    <>
      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'Vapes Australia', href: '/' }, { label: 'New Arrivals' }]} />
          <p className="font-display text-xs uppercase tracking-[0.3em] text-success font-bold mt-4 mb-2">
            Just Landed At Vapes Australia
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-1 mb-3 lowercase">
            vapes australia new arrivals
          </h1>
          <p className="text-body max-w-2xl leading-relaxed">
            New disposable vapes, pod systems and e-liquids land in the Vapes Australia warehouse every week. Be first to
            try the latest IGET, Alfakher, HQD, Lost Mary and Vozol releases — fresh stock, same-day Sydney dispatch.
          </p>
        </div>
      </section>

      <section className="container-site py-14">
        <div className="section-heading-wrap">
          <h2 className="section-heading">{products.length.toLocaleString()} new products</h2>
          <span className="font-display text-xs uppercase tracking-widest font-bold text-success">
            Refreshed weekly
          </span>
        </div>
        <ProductGrid products={paged} />
        <Pagination currentPage={currentPage} totalItems={products.length} basePath="/new-arrivals" />
      </section>
    </>
  )
}

import Link from 'next/link'
import AdminTopbar from '@/components/admin/AdminTopbar'
import { BRANDS, getProductsByBrand } from '@/lib/brands'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

export default function AdminBrandsPage() {
  const rows = BRANDS.map((b) => {
    const products = getProductsByBrand(b.slug)
    const minPrice = products.length ? Math.min(...products.map((p) => p.price)) : 0
    const avgRating = products.length
      ? products.reduce((s, p) => s + p.rating, 0) / products.length
      : 0
    return { brand: b, count: products.length, minPrice, avgRating }
  }).sort((a, b) => b.count - a.count)

  return (
    <>
      <AdminTopbar title="Brands" subtitle={`${BRANDS.length} brands stocked at Aussie Vapes`} />
      <div className="px-8 py-8">
        <div className="bg-white border border-line rounded-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-soft-50 text-mute font-display uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-2.5 text-left">Brand</th>
                <th className="px-4 py-2.5 text-left">Tagline</th>
                <th className="px-4 py-2.5 text-right">Products</th>
                <th className="px-4 py-2.5 text-right">From</th>
                <th className="px-4 py-2.5 text-right">Avg Rating</th>
                <th className="px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map(({ brand, count, minPrice, avgRating }) => (
                <tr key={brand.slug} id={brand.slug} className="hover:bg-soft-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-8 w-8 rounded-sm flex items-center justify-center font-display text-xs font-bold text-white flex-shrink-0"
                        style={{ background: brand.accentColor }}
                      >
                        {brand.displayName.slice(0, 2).toUpperCase()}
                      </span>
                      <div>
                        <p className="font-display font-bold uppercase tracking-wider text-ink">
                          {brand.displayName}
                        </p>
                        <p className="text-xs text-mute">{brand.origin}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-body max-w-md">{brand.tagline}</td>
                  <td className="px-4 py-3 text-right font-display font-bold text-ink">{count}</td>
                  <td className="px-4 py-3 text-right font-display font-bold text-price">
                    ${minPrice.toFixed(0)}
                  </td>
                  <td className="px-4 py-3 text-right font-display text-ink">
                    {avgRating ? avgRating.toFixed(1) : '—'}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <a
                      href={`/brand/${brand.slug}`}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1 font-display text-xs uppercase tracking-widest font-bold text-price hover:underline"
                    >
                      View <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

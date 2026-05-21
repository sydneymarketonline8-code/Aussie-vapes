import Link from 'next/link'
import Image from 'next/image'
import AdminTopbar from '@/components/admin/AdminTopbar'
import AdminStatCard from '@/components/admin/AdminStatCard'
import { listAdminProducts, getInventoryStats } from '@/lib/admin-products'
import {
  ArchiveBoxIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'

export const dynamic = 'force-dynamic'

export default async function AdminInventoryPage() {
  const products = await listAdminProducts()
  const stats = await getInventoryStats(products)
  const lowStockSorted = products
    .filter((p) => p.stockCount != null && p.stockCount < 20)
    .sort((a, b) => (a.stockCount ?? 0) - (b.stockCount ?? 0))

  return (
    <>
      <AdminTopbar title="Inventory" subtitle="Stock health across the Aussie Vapes catalogue" />

      <div className="px-8 py-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <AdminStatCard label="Total SKUs" value={stats.totalSkus.toLocaleString()} Icon={ArchiveBoxIcon} />
          <AdminStatCard label="In Stock" value={stats.inStock.toLocaleString()} Icon={CheckCircleIcon} accent="#4cbb6c" />
          <AdminStatCard label="Out of Stock" value={stats.outOfStock.toLocaleString()} Icon={XCircleIcon} accent="#ff0000" />
          <AdminStatCard label="Low Stock (<20)" value={stats.lowStock.toLocaleString()} Icon={ExclamationTriangleIcon} accent="#ff9a52" />
          <AdminStatCard
            label="Inventory Value"
            value={`$${Math.round(stats.totalValue).toLocaleString()}`}
            delta={`${stats.totalUnits.toLocaleString()} total units`}
            Icon={CurrencyDollarIcon}
            accent="#3b3b3b"
          />
        </div>

        <div className="bg-white border border-line rounded-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-line">
            <h3 className="font-display text-base font-bold text-ink uppercase tracking-wide flex items-center gap-2">
              <ExclamationTriangleIcon className="h-4 w-4 text-warning" />
              Low-Stock Items ({lowStockSorted.length})
            </h3>
            <span className="font-display text-xs uppercase tracking-widest font-bold text-mute">
              Sorted lowest first
            </span>
          </div>
          {lowStockSorted.length === 0 ? (
            <p className="px-5 py-12 text-center text-mute text-sm">
              All Aussie Vapes products are healthy. No low-stock alerts.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-soft-50 text-mute font-display uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-2.5 text-left">Product</th>
                    <th className="px-4 py-2.5 text-left">Brand</th>
                    <th className="px-4 py-2.5 text-left">SKU</th>
                    <th className="px-4 py-2.5 text-right">Stock</th>
                    <th className="px-4 py-2.5 text-right">Value</th>
                    <th className="px-4 py-2.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {lowStockSorted.slice(0, 50).map((p) => (
                    <tr key={p.id} className="hover:bg-soft-50">
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 flex-shrink-0 bg-soft-100 border border-line rounded-sm overflow-hidden">
                            {p.imageUrl ? (
                              <Image
                                src={p.imageUrl}
                                alt={p.name}
                                fill
                                sizes="40px"
                                className="object-contain p-0.5"
                                unoptimized
                                loading="lazy"
                              />
                            ) : null}
                          </div>
                          <p className="font-display font-semibold text-ink line-clamp-1">{p.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-xs text-body">{p.brand}</td>
                      <td className="px-4 py-2 font-mono text-xs text-mute">{p.sku}</td>
                      <td className="px-4 py-2 text-right">
                        <span className="font-display font-bold text-warning">{p.stockCount}</span>
                      </td>
                      <td className="px-4 py-2 text-right font-display text-body">
                        ${(p.price * (p.stockCount ?? 0)).toFixed(0)}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Link
                          href={`/admin/products/${p.slug}`}
                          className="font-display text-xs uppercase tracking-widest font-bold text-price hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {lowStockSorted.length > 50 && (
                <p className="px-5 py-3 text-xs text-mute text-center border-t border-line">
                  Showing 50 of {lowStockSorted.length} low-stock items.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

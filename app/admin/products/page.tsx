import Link from 'next/link'
import AdminTopbar from '@/components/admin/AdminTopbar'
import AdminProductTable from '@/components/admin/AdminProductTable'
import { listAdminProducts } from '@/lib/admin-products'
import { PlusIcon } from '@heroicons/react/24/outline'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const products = await listAdminProducts()
  return (
    <>
      <AdminTopbar
        title="Products"
        subtitle={`${products.length.toLocaleString()} product${products.length === 1 ? '' : 's'} in the Aussie Vape Hub catalogue`}
        actions={
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-price text-white font-display text-xs font-bold uppercase tracking-wider hover:bg-sale transition-colors"
          >
            <PlusIcon className="h-4 w-4" />
            Add New Product
          </Link>
        }
      />
      <div className="px-8 py-8">
        <AdminProductTable products={products} />
      </div>
    </>
  )
}

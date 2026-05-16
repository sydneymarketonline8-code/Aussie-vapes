import Link from 'next/link'
import AdminTopbar from '@/components/admin/AdminTopbar'
import AdminProductTable from '@/components/admin/AdminProductTable'
import { PRODUCTS } from '@/lib/products'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function AdminProductsPage() {
  return (
    <>
      <AdminTopbar
        title="Products"
        subtitle={`${PRODUCTS.length.toLocaleString()} products in the Aussie Vapes catalogue`}
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
        <AdminProductTable products={PRODUCTS} />
      </div>
    </>
  )
}

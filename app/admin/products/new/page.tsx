import Link from 'next/link'
import AdminTopbar from '@/components/admin/AdminTopbar'
import ProductForm from '@/components/admin/ProductForm'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function AdminNewProductPage() {
  return (
    <>
      <AdminTopbar
        title="New Product"
        subtitle="Create a new SKU in the Aussie Vapes catalogue"
        actions={
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm border border-line bg-white text-ink font-display text-xs font-bold uppercase tracking-wider hover:bg-soft-50"
          >
            <ArrowLeftIcon className="h-4 w-4" /> Back to Products
          </Link>
        }
      />
      <div className="px-8 py-8">
        <ProductForm mode="create" />
      </div>
    </>
  )
}

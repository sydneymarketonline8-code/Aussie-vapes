import AdminTopbar from '@/components/admin/AdminTopbar'
import AdminProductTable from '@/components/admin/AdminProductTable'
import { PRODUCTS } from '@/lib/products'

export default function AdminProductsPage() {
  return (
    <>
      <AdminTopbar
        title="Products"
        subtitle={`${PRODUCTS.length.toLocaleString()} products in the Aussie Vapes catalogue`}
      />
      <div className="px-8 py-8">
        <AdminProductTable products={PRODUCTS} />
      </div>
    </>
  )
}

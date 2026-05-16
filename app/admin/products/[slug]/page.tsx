import Link from 'next/link'
import { notFound } from 'next/navigation'
import AdminTopbar from '@/components/admin/AdminTopbar'
import ProductForm from '@/components/admin/ProductForm'
import { getProductBySlug } from '@/lib/products'
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'

export default async function AdminProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return (
    <>
      <AdminTopbar
        title={product.name}
        subtitle={`${product.brand} · SKU ${product.sku}`}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm border border-line bg-white text-ink font-display text-xs font-bold uppercase tracking-wider hover:bg-soft-50"
            >
              <ArrowLeftIcon className="h-4 w-4" /> Back
            </Link>
            <a
              href={`/product/${product.slug}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm bg-ink text-white font-display text-xs font-bold uppercase tracking-wider hover:bg-ink-dark"
            >
              <ArrowTopRightOnSquareIcon className="h-4 w-4" /> View on Site
            </a>
          </div>
        }
      />

      <div className="px-8 py-8">
        <ProductForm mode="edit" product={product} />
      </div>
    </>
  )
}

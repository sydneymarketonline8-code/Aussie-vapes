import Link from 'next/link'
import { notFound } from 'next/navigation'
import AdminTopbar from '@/components/admin/AdminTopbar'
import ProductForm from '@/components/admin/ProductForm'
import { getProductBySlug } from '@/lib/storefront-products'
import { getSupabasePublicClient } from '@/lib/supabase/public'
import type { ProductImageRow } from '@/components/admin/ProductImagesManager'
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'

export const dynamic = 'force-dynamic'

export default async function AdminProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  // Fetch the image rows separately — Product only carries URLs, but the
  // images manager needs the row ids to delete and reorder.
  const supabase = getSupabasePublicClient()
  const { data: imageRows } = await supabase
    .from('product_images')
    .select('id, url, position')
    .eq('product_id', product.id)
    .order('position', { ascending: true })
  const productImages: ProductImageRow[] = (imageRows ?? []) as ProductImageRow[]

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
        <ProductForm mode="edit" product={product} productImages={productImages} />
      </div>
    </>
  )
}

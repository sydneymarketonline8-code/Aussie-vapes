import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import AdminTopbar from '@/components/admin/AdminTopbar'
import { getProductBySlug } from '@/lib/products'
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'

export default async function AdminProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null

  return (
    <>
      <AdminTopbar title={product.name} subtitle={`${product.brand} · SKU ${product.sku}`} />

      <div className="px-8 py-8 space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 text-sm text-body hover:text-price font-display uppercase tracking-wider font-bold"
          >
            <ArrowLeftIcon className="h-4 w-4" /> Back to Products
          </Link>
          <span className="text-mute text-sm">·</span>
          <a
            href={`/product/${product.slug}`}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-sm text-price font-display uppercase tracking-wider font-bold hover:underline"
          >
            <ArrowTopRightOnSquareIcon className="h-4 w-4" /> View on public site
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr,300px] gap-6">
          {/* Image + status */}
          <div className="bg-white border border-line rounded-sm p-4">
            <div className="relative aspect-square bg-soft-100 border border-line rounded-sm overflow-hidden mb-3">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="280px"
                className="object-contain p-4"
                unoptimized
                priority
              />
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5">
                {product.inStock ? (
                  <CheckCircleIcon className="h-4 w-4 text-success" />
                ) : (
                  <XCircleIcon className="h-4 w-4 text-price" />
                )}
                <span className="font-display uppercase tracking-wider font-bold">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              {product.stockCount != null && (
                <p className="text-mute font-display uppercase tracking-wider">
                  Stock: <strong className={product.stockCount < 20 ? 'text-warning' : 'text-ink'}>{product.stockCount}</strong>
                </p>
              )}
              {product.isBestSeller && (
                <span className="inline-block px-2 py-0.5 rounded-sm bg-warning/10 text-warning text-[10px] font-display font-bold uppercase tracking-wider">
                  Best Seller
                </span>
              )}
              {product.isNew && (
                <span className="inline-block px-2 py-0.5 rounded-sm bg-success/10 text-success text-[10px] font-display font-bold uppercase tracking-wider ml-1">
                  New
                </span>
              )}
              {product.isSale && (
                <span className="inline-block px-2 py-0.5 rounded-sm bg-price/10 text-price text-[10px] font-display font-bold uppercase tracking-wider ml-1">
                  Sale {discount && `-${discount}%`}
                </span>
              )}
            </div>
          </div>

          {/* Main info */}
          <div className="space-y-5">
            <div className="bg-white border border-line rounded-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-display text-[10px] uppercase tracking-widest text-mute font-bold">
                    {product.brand}
                  </p>
                  <h2 className="font-display text-xl font-bold text-ink leading-tight mt-0.5">
                    {product.name}
                  </h2>
                </div>
                <button
                  type="button"
                  disabled
                  title="Editing is read-only in this build — wire a backend to enable"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-soft-100 text-mute font-display text-xs font-bold uppercase tracking-wider cursor-not-allowed"
                >
                  <PencilSquareIcon className="h-4 w-4" />
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 py-3 border-y border-line">
                <div>
                  <p className="font-display text-[10px] uppercase tracking-widest text-mute font-bold">Price</p>
                  <p className="font-display text-lg font-bold text-price mt-0.5">${product.price.toFixed(2)}</p>
                  {product.comparePrice && (
                    <p className="text-xs text-mute line-through">${product.comparePrice.toFixed(2)}</p>
                  )}
                </div>
                <div>
                  <p className="font-display text-[10px] uppercase tracking-widest text-mute font-bold">Rating</p>
                  <p className="font-display text-lg font-bold text-ink mt-0.5">
                    {product.rating.toFixed(1)} / 5
                  </p>
                  <p className="text-xs text-mute">{product.reviewCount} reviews</p>
                </div>
                <div>
                  <p className="font-display text-[10px] uppercase tracking-widest text-mute font-bold">Category</p>
                  <p className="font-display text-sm font-semibold text-ink mt-0.5">{product.category}</p>
                  {product.subcategory && (
                    <p className="text-xs text-mute">{product.subcategory}</p>
                  )}
                </div>
              </div>

              <p className="mt-4 text-sm text-body leading-relaxed">{product.shortDescription}</p>
            </div>

            <div className="bg-white border border-line rounded-sm p-5">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-2">
                Description
              </h3>
              <p className="text-sm text-body leading-relaxed">{product.description}</p>
            </div>

            {product.features.length > 0 && (
              <div className="bg-white border border-line rounded-sm p-5">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-3">
                  Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm text-body">
                  {product.features.map((f) => (
                    <li key={f}>· {f}</li>
                  ))}
                </ul>
              </div>
            )}

            {Object.keys(product.specifications).length > 0 && (
              <div className="bg-white border border-line rounded-sm p-5">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-3">
                  Specifications
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-display text-[10px] uppercase tracking-widest text-mute font-bold">{k}</dt>
                      <dd className="text-ink font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="bg-white border border-line rounded-sm p-5">
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-mute mb-3">
                Identifiers
              </h3>
              <dl className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <dt className="text-mute font-display uppercase tracking-wider">ID</dt>
                  <dd className="text-ink font-mono">{product.id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-mute font-display uppercase tracking-wider">SKU</dt>
                  <dd className="text-ink font-mono">{product.sku}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-mute font-display uppercase tracking-wider">Slug</dt>
                  <dd className="text-ink font-mono break-all text-right max-w-[160px]">{product.slug}</dd>
                </div>
              </dl>
            </div>

            {product.tags.length > 0 && (
              <div className="bg-white border border-line rounded-sm p-5">
                <h3 className="font-display text-xs font-bold uppercase tracking-widest text-mute mb-3">Tags</h3>
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-sm bg-soft-100 text-body text-[11px] font-display">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.flavours && product.flavours.length > 0 && (
              <div className="bg-white border border-line rounded-sm p-5">
                <h3 className="font-display text-xs font-bold uppercase tracking-widest text-mute mb-3">
                  Flavours ({product.flavours.length})
                </h3>
                <ul className="space-y-1 text-xs">
                  {product.flavours.map((f) => (
                    <li key={f} className="text-body">· {f}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white border border-line rounded-sm p-5">
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-mute mb-3">
                SEO
              </h3>
              <div className="text-xs space-y-2">
                <div>
                  <p className="font-display uppercase tracking-wider text-mute font-bold">Title</p>
                  <p className="text-body">{product.seoTitle}</p>
                </div>
                <div>
                  <p className="font-display uppercase tracking-wider text-mute font-bold">Description</p>
                  <p className="text-body line-clamp-3">{product.seoDescription}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

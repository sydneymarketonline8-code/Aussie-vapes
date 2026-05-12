import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug, PRODUCTS } from '@/lib/products'
import { buildProductMetadata, productJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { getCategoryBySlug } from '@/lib/categories'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductGallery from '@/components/product/ProductGallery'
import AddToCart from '@/components/product/AddToCart'
import RelatedProducts from '@/components/product/RelatedProducts'
import StarRating from '@/components/ui/StarRating'
import Badge from '@/components/ui/Badge'
import { CheckIcon, TruckIcon } from '@heroicons/react/24/outline'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aussievapes.com.au'

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return buildProductMetadata(product)
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const category = getCategoryBySlug(product.category)
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null

  const crumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: category?.name ?? 'Shop', url: `${SITE_URL}/category/${product.category}` },
    { name: product.name, url: `${SITE_URL}/product/${product.slug}` },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />

      <div className="container-site py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          crumbs={[
            { label: 'Home', href: '/' },
            { label: category?.name ?? 'Shop', href: `/category/${product.category}` },
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product info */}
          <div className="flex flex-col gap-5">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.isNew && <Badge variant="new" />}
              {product.isBestSeller && <Badge variant="bestseller" />}
              {product.isSale && <Badge variant="sale" />}
              <Badge variant={product.inStock ? 'instock' : 'outofstock'} />
            </div>

            {/* Brand & name */}
            <div>
              <p className="font-display text-xs text-mute uppercase tracking-[0.3em] font-semibold">{product.brand}</p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-2 leading-tight">{product.name}</h1>
            </div>

            {/* Rating */}
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />

            {/* Price */}
            <div className="flex items-baseline gap-3 py-3 border-y border-line">
              <span className="font-display text-4xl font-bold text-price">${product.price.toFixed(2)}</span>
              {product.comparePrice && (
                <span className="text-lg text-mute line-through">${product.comparePrice.toFixed(2)}</span>
              )}
              {discount && <span className="badge-sale">Save {discount}%</span>}
              <span className="text-xs text-mute ml-auto">AUD</span>
            </div>

            {/* Short description */}
            <p className="text-body leading-relaxed">{product.shortDescription}</p>

            {/* Key features preview */}
            <ul className="space-y-2">
              {product.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-body">
                  <CheckIcon className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Stock warning */}
            {product.stockCount !== undefined && product.stockCount < 20 && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-sm bg-warning/10 border border-warning/30">
                <span className="text-warning text-sm font-display font-semibold uppercase tracking-wider">
                  ⚡ Only {product.stockCount} left — order soon
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-body">
              <TruckIcon className="h-4 w-4 text-success" />
              <span>Free shipping on orders over $100 (Australia-wide)</span>
            </div>

            {/* Add to cart + variant selector */}
            <div className="bg-soft-100 border border-line rounded-sm p-5 mt-2">
              <AddToCart product={product} />
            </div>

            {/* SKU */}
            <p className="text-xs text-mute">SKU: {product.sku}</p>
          </div>
        </div>

        {/* Full product details */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description & features */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-line rounded-sm p-6">
              <h2 className="font-display text-xl font-bold text-ink mb-4 uppercase tracking-wide">Product Description</h2>
              <p className="text-body leading-relaxed text-sm">{product.description}</p>
            </div>

            {product.features.length > 0 && (
              <div className="bg-white border border-line rounded-sm p-6">
                <h2 className="font-display text-xl font-bold text-ink mb-4 uppercase tracking-wide">Key Features</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-body">
                      <CheckIcon className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Specifications */}
          {Object.keys(product.specifications).length > 0 && (
            <div className="bg-white border border-line rounded-sm p-6 h-fit">
              <h2 className="font-display text-xl font-bold text-ink mb-4 uppercase tracking-wide">Specifications</h2>
              <dl className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex flex-col gap-0.5 pb-3 border-b border-line last:border-0 last:pb-0">
                    <dt className="font-display text-[11px] text-mute uppercase tracking-wider font-bold">{key}</dt>
                    <dd className="text-sm text-ink font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {/* Regulatory notice */}
        <div className="mt-8 p-4 rounded-sm bg-soft-100 border border-line text-xs text-body leading-relaxed">
          ⚠️ <strong className="text-ink">Australian Regulation Notice:</strong> Nicotine-containing vaping products require a valid Australian prescription under the TGA Therapeutic Goods (Standard for Nicotine Vaping Products) (TGO 110) Order 2021. By purchasing, you confirm you hold a valid prescription and are 18 years or older. AussieVapes complies with all applicable Australian regulations.
        </div>

        {/* Related products */}
        <RelatedProducts slugs={product.relatedProductSlugs} currentSlug={product.slug} />
      </div>
    </>
  )
}

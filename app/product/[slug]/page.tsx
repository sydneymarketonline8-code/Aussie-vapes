import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getProductBySlug,
  getFeaturedProducts,
  getNewArrivalProducts,
  getSaleProducts,
} from '@/lib/storefront-products'
import { buildProductMetadata, productJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import { getCategoryBySlug } from '@/lib/categories'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductGallery from '@/components/product/ProductGallery'
import AddToCart from '@/components/product/AddToCart'
import RelatedProducts from '@/components/product/RelatedProducts'
import ProductReviews from '@/components/product/ProductReviews'
import { listApprovedReviews } from '@/lib/storefront-reviews'
import ProductFaq, { buildProductFaqs } from '@/components/product/ProductFaq'
import ProductInternalLinks from '@/components/product/ProductInternalLinks'
import ProductSidebar from '@/components/product/ProductSidebar'
import ProductQuickSpecs from '@/components/product/ProductQuickSpecs'
import StarRating from '@/components/ui/StarRating'
import Badge from '@/components/ui/Badge'
import { CheckIcon, TruckIcon, ArrowTopRightOnSquareIcon, ExclamationTriangleIcon, BoltIcon } from '@heroicons/react/24/outline'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.aussievapehub.com.au'

// ISR: product pages are statically generated for fast TTFB, but each one
// regenerates on the next request after 60s. Admin edits (price, stock,
// description, SEO title) reflect on the storefront within ~1 minute
// without needing a Vercel rebuild.
export const revalidate = 60

// Pre-render only the merchandised products (best sellers, new arrivals, sale)
// for instant TTFB on the pages people actually land on. The long tail (2000+
// SKUs) renders on first request and is then cached by ISR — keeping build
// time bounded and well under Vercel's limit. dynamicParams defaults to true,
// so every product still resolves, and all are listed in sitemap.xml, so
// indexability is unaffected.
export async function generateStaticParams() {
  const [featured, fresh, sale] = await Promise.all([
    getFeaturedProducts(200),
    getNewArrivalProducts(200),
    getSaleProducts(200),
  ])
  const slugs = new Set<string>()
  for (const p of featured.concat(fresh, sale)) slugs.add(p.slug)
  return Array.from(slugs, (slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}
  return buildProductMetadata(product)
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const reviews = await listApprovedReviews(product.id)
  const category = getCategoryBySlug(product.category)
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null

  const crumbs = [
    { name: 'Aussie Vape Hub', url: `${SITE_URL}/` },
    { name: category?.name ?? 'Shop', url: `${SITE_URL}/category/${product.category}` },
    { name: product.name, url: `${SITE_URL}/product/${product.slug}` },
  ]

  const productFaqs = buildProductFaqs(product, category?.name)

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(productFaqs)) }}
      />

      <div className="container-site py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          crumbs={[
            { label: 'Aussie Vape Hub', href: '/' },
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

            {/* Quick spec chips — Puff Count, Nicotine, Battery, Flavour */}
            <ProductQuickSpecs product={product} />

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
                <BoltIcon className="h-5 w-5 text-warning flex-shrink-0" />
                <span className="text-warning text-sm font-display font-semibold uppercase tracking-wider">
                  Only {product.stockCount} left — order soon
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-body">
              <TruckIcon className="h-4 w-4 text-success" />
              <span>Free shipping on orders over $300 (Australia-wide)</span>
            </div>

            {/* Add to cart + variant selector */}
            <div className="bg-soft-100 border border-line rounded-sm p-5 mt-2">
              <AddToCart product={product} />
            </div>

            {/* SKU */}
            <p className="text-xs text-mute">SKU: {product.sku}</p>
          </div>
        </div>

        {/* Lower content: main column + persistent shop-by sidebar */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8">
          {/* Main column */}
          <div className="space-y-8 min-w-0">
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

            {/* Specifications */}
            {Object.keys(product.specifications).length > 0 && (
              <div className="bg-white border border-line rounded-sm p-6">
                <h2 className="font-display text-xl font-bold text-ink mb-4 uppercase tracking-wide">Specifications</h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col gap-0.5 pb-3 border-b border-line">
                      <dt className="font-display text-[11px] text-mute uppercase tracking-wider font-bold">{key}</dt>
                      <dd className="text-sm text-ink font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Flavours showcase (if available) */}
            {product.flavours && product.flavours.length > 0 && (
              <div className="bg-white border border-line rounded-sm p-6">
                <h2 className="font-display text-xl font-bold text-ink mb-4 uppercase tracking-wide">
                  Available Flavours ({product.flavours.length})
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.flavours.map((f) => (
                    <span
                      key={f}
                      className="px-3 py-1.5 text-sm bg-soft-100 text-body rounded-sm border border-line font-display"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Product FAQ */}
            <ProductFaq product={product} categoryName={category?.name} />

            {/* Internal links block */}
            <ProductInternalLinks product={product} />
          </div>

          {/* Shop-by sidebar (sticky on lg+) */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductSidebar currentProduct={product} />
          </div>
        </div>

        {/* Regulatory notice with external authority references */}
        <div className="mt-8 p-5 rounded-sm bg-soft-100 border border-line text-xs text-body leading-relaxed">
          <p className="mb-2 flex items-start gap-2">
            <ExclamationTriangleIcon className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-ink">Australian Regulation Notice:</strong> Nicotine-containing vaping products
              require a valid Australian prescription under the TGA Therapeutic Goods (Standard for Nicotine Vaping
              Products) (TGO 110) Order 2021. By purchasing, you confirm you hold a valid prescription and are 18 years
              or older. Aussie Vape Hub complies with all applicable Australian regulations.
            </span>
          </p>
          <p className="text-mute mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-display uppercase tracking-wider font-bold text-[10px]">Further reading:</span>
            <a
              href="https://www.tga.gov.au/products/unapproved-therapeutic-goods/vaping-hub"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-price"
            >
              TGA vaping hub <ArrowTopRightOnSquareIcon className="h-3 w-3" />
            </a>
            <a
              href="https://www.health.gov.au/topics/smoking-vaping-and-tobacco/about-vaping"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-price"
            >
              AU Dept. of Health <ArrowTopRightOnSquareIcon className="h-3 w-3" />
            </a>
          </p>
        </div>

        {/* Related products */}
        <ProductReviews
          productId={product.id}
          productSlug={product.slug}
          productName={product.name}
          reviews={reviews}
        />
        <RelatedProducts slugs={product.relatedProductSlugs} currentSlug={product.slug} />
      </div>
    </>
  )
}

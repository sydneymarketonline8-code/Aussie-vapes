import Link from 'next/link'
import Image from 'next/image'
import AdminTopbar from '@/components/admin/AdminTopbar'
import AdminStatCard from '@/components/admin/AdminStatCard'
import { PRODUCTS, getSaleProducts, getNewArrivals, getFeaturedProducts } from '@/lib/products'
import { BRANDS, getProductsByBrand } from '@/lib/brands'
import { CATEGORIES } from '@/lib/categories'
import { getAllPacks } from '@/lib/packs'
import {
  CubeIcon,
  TagIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  StarIcon,
  BoltIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'

function formatAUD(n: number): string {
  return `$${n.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export default function AdminDashboardPage() {
  const totalProducts = PRODUCTS.length
  const totalInStock = PRODUCTS.filter((p) => p.inStock).length
  const totalOutOfStock = totalProducts - totalInStock
  const lowStock = PRODUCTS.filter((p) => p.stockCount != null && p.stockCount < 20)
  const totalInventoryValue = PRODUCTS.reduce(
    (s, p) => s + p.price * (p.stockCount ?? 0),
    0
  )
  const avgPrice = totalProducts > 0
    ? PRODUCTS.reduce((s, p) => s + p.price, 0) / totalProducts
    : 0
  const totalReviews = PRODUCTS.reduce((s, p) => s + p.reviewCount, 0)
  const avgRating = totalProducts > 0
    ? PRODUCTS.reduce((s, p) => s + p.rating, 0) / totalProducts
    : 0

  const saleCount = getSaleProducts().length
  const newCount = getNewArrivals().length
  const featuredCount = getFeaturedProducts().length
  const packCount = getAllPacks().length

  // Top 5 brands by product count
  const topBrands = BRANDS.map((b) => ({
    brand: b,
    count: getProductsByBrand(b.slug).length,
  }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Top 8 recent low-stock items
  const recentLowStock = [...lowStock]
    .sort((a, b) => (a.stockCount ?? 0) - (b.stockCount ?? 0))
    .slice(0, 8)

  return (
    <>
      <AdminTopbar title="Dashboard" subtitle="Aussie Vapes — operational overview" />

      <div className="px-8 py-8 space-y-8">
        {/* Hero stats */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AdminStatCard
              label="Total Products"
              value={totalProducts.toLocaleString()}
              delta={`${totalInStock.toLocaleString()} in stock`}
              trend="up"
              Icon={CubeIcon}
              accent="#3b3b3b"
            />
            <AdminStatCard
              label="Brands"
              value={BRANDS.length}
              delta={`${CATEGORIES.length} categories`}
              Icon={TagIcon}
              accent="#2fb5d2"
            />
            <AdminStatCard
              label="Inventory Value"
              value={formatAUD(totalInventoryValue)}
              delta={`Avg ${formatAUD(avgPrice)} per item`}
              Icon={CurrencyDollarIcon}
              accent="#4cbb6c"
            />
            <AdminStatCard
              label="Avg Rating"
              value={avgRating.toFixed(2)}
              delta={`${totalReviews.toLocaleString()} reviews`}
              Icon={StarIcon}
              accent="#ff9a52"
            />
          </div>
        </section>

        {/* Operational status */}
        <section>
          <h2 className="font-display text-sm font-bold text-mute uppercase tracking-widest mb-3">
            Catalogue Status
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AdminStatCard
              label="On Sale"
              value={saleCount.toLocaleString()}
              Icon={ArrowTrendingDownIcon}
              accent="#ff0000"
            />
            <AdminStatCard
              label="New Arrivals"
              value={newCount.toLocaleString()}
              Icon={ArrowTrendingUpIcon}
              accent="#4cbb6c"
            />
            <AdminStatCard
              label="Featured / Best Sellers"
              value={featuredCount.toLocaleString()}
              Icon={StarIcon}
              accent="#ff9a52"
            />
            <AdminStatCard
              label="Pack Products"
              value={packCount.toLocaleString()}
              Icon={Squares2X2Icon}
              accent="#3b3b3b"
            />
          </div>
        </section>

        {/* Two-column lower section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Low stock */}
          <div className="lg:col-span-2 bg-white border border-line rounded-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <h3 className="font-display text-base font-bold text-ink uppercase tracking-wide flex items-center gap-2">
                <BoltIcon className="h-4 w-4 text-warning" />
                Low-Stock Alerts
              </h3>
              <Link
                href="/admin/inventory"
                className="font-display text-xs uppercase tracking-widest font-bold text-price hover:underline"
              >
                Full Inventory →
              </Link>
            </div>
            {recentLowStock.length === 0 ? (
              <p className="px-5 py-8 text-sm text-mute text-center">No low-stock items right now.</p>
            ) : (
              <ul className="divide-y divide-line">
                {recentLowStock.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/admin/products/${p.slug}`}
                      className="flex items-center gap-4 px-5 py-3 hover:bg-soft-50 transition-colors"
                    >
                      <div className="relative h-12 w-12 flex-shrink-0 bg-soft-100 border border-line rounded-sm overflow-hidden">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="48px"
                          className="object-contain p-1"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-sm font-semibold text-ink line-clamp-1">{p.name}</p>
                        <p className="text-xs text-mute">{p.brand} · SKU {p.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display font-bold text-warning text-sm">{p.stockCount} left</p>
                        <p className="text-[10px] text-mute font-display uppercase tracking-wider">${p.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Top brands */}
          <div className="bg-white border border-line rounded-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <h3 className="font-display text-base font-bold text-ink uppercase tracking-wide flex items-center gap-2">
                <TagIcon className="h-4 w-4 text-mute" />
                Top Brands
              </h3>
              <Link
                href="/admin/brands"
                className="font-display text-xs uppercase tracking-widest font-bold text-price hover:underline"
              >
                All →
              </Link>
            </div>
            <ul className="divide-y divide-line">
              {topBrands.map(({ brand, count }, i) => (
                <li key={brand.slug}>
                  <Link
                    href={`/admin/brands#${brand.slug}`}
                    className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-soft-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-display text-mute text-xs font-bold w-4">{i + 1}</span>
                      <span
                        className="font-display font-bold uppercase tracking-wider text-sm"
                        style={{ color: brand.accentColor }}
                      >
                        {brand.displayName}
                      </span>
                    </div>
                    <span className="font-display text-sm font-bold text-ink">{count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Out-of-stock + quick links */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-line rounded-sm p-5">
            <h3 className="font-display text-xs font-bold text-mute uppercase tracking-widest mb-2">
              Stock Health
            </h3>
            <p className="font-display text-3xl font-bold text-ink mb-3">
              {((totalInStock / totalProducts) * 100).toFixed(1)}%
            </p>
            <div className="h-2 bg-soft-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-success rounded-full transition-all duration-500"
                style={{ width: `${(totalInStock / totalProducts) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-mute mt-2 font-display uppercase tracking-wider">
              <span>{totalInStock.toLocaleString()} in stock</span>
              <span>{totalOutOfStock.toLocaleString()} out</span>
            </div>
          </div>

          <div className="bg-white border border-line rounded-sm p-5">
            <h3 className="font-display text-xs font-bold text-mute uppercase tracking-widest mb-3">
              Quick Actions
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/admin/products" className="text-body hover:text-price font-display font-semibold">
                  → Browse Products
                </Link>
              </li>
              <li>
                <Link href="/admin/inventory" className="text-body hover:text-price font-display font-semibold">
                  → Inventory Audit
                </Link>
              </li>
              <li>
                <Link href="/admin/brands" className="text-body hover:text-price font-display font-semibold">
                  → Brands Directory
                </Link>
              </li>
              <li>
                <Link href="/admin/settings" className="text-body hover:text-price font-display font-semibold">
                  → Site Settings
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-ink text-white rounded-sm p-5">
            <h3 className="font-display text-xs font-bold text-white/60 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <EyeIcon className="h-3.5 w-3.5" />
              Public Site
            </h3>
            <p className="text-white/80 text-sm mb-4">
              Preview Aussie Vapes as a customer sees it. Live SEO surface, 2,160 indexed pages.
            </p>
            <a
              href="/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-price text-white font-display text-xs font-bold uppercase tracking-wider hover:bg-sale transition-colors"
            >
              Open Live Site
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

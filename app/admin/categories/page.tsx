import AdminTopbar from '@/components/admin/AdminTopbar'
import { CATEGORIES } from '@/lib/categories'
import { getProductsByCategorySlug } from '@/lib/storefront-products'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

export const dynamic = 'force-dynamic'

export default async function AdminCategoriesPage() {
  const categoriesWithStats = await Promise.all(
    CATEGORIES.map(async (cat) => {
      const products = await getProductsByCategorySlug(cat.slug)
      return { cat, total: products.length, inStock: products.filter((p) => p.inStock).length }
    }),
  )
  return (
    <>
      <AdminTopbar title="Categories" subtitle={`${CATEGORIES.length} top-level categories on Aussie Vape Hub`} />

      <div className="px-8 py-8 space-y-5">
        {categoriesWithStats.map(({ cat, total, inStock }) => {
          return (
            <div key={cat.id} className="bg-white border border-line rounded-sm p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-display text-[10px] uppercase tracking-widest text-mute font-bold">
                    /category/{cat.slug}
                  </p>
                  <h2 className="font-display text-xl font-bold text-ink mt-0.5">{cat.name}</h2>
                  <p className="text-sm text-body mt-2 max-w-2xl">{cat.description}</p>
                </div>
                <a
                  href={`/category/${cat.slug}`}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 font-display text-xs uppercase tracking-widest font-bold text-price hover:underline whitespace-nowrap"
                >
                  Open <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-line pt-4">
                <Stat label="Total" value={total} />
                <Stat label="In Stock" value={inStock} accent="success" />
                <Stat label="Subcategories" value={cat.subcategories.length} />
                <Stat label="Keywords" value={cat.keywords.length} />
              </div>

              {cat.subcategories.length > 0 && (
                <div className="mt-4 pt-4 border-t border-line">
                  <p className="font-display text-[10px] uppercase tracking-widest font-bold text-mute mb-2">
                    Subcategories
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.subcategories.map((s) => (
                      <span
                        key={s.id}
                        className="px-2 py-0.5 rounded-sm bg-soft-100 text-body text-[11px] font-display border border-line"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: 'success' | 'warning' | 'price' }) {
  const cls =
    accent === 'success'
      ? 'text-success'
      : accent === 'warning'
      ? 'text-warning'
      : accent === 'price'
      ? 'text-price'
      : 'text-ink'
  return (
    <div>
      <p className="font-display text-[10px] uppercase tracking-widest text-mute font-bold">{label}</p>
      <p className={`font-display text-xl font-bold mt-0.5 ${cls}`}>{value.toLocaleString()}</p>
    </div>
  )
}

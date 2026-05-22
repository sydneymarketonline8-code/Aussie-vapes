import AdminTopbar from '@/components/admin/AdminTopbar'
import { BRANDS } from '@/lib/brands'
import { CATEGORIES } from '@/lib/categories'
import { getActiveProductCount } from '@/lib/storefront-products'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aussievapes.com.au'

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 border-b border-line last:border-0">
      <dt className="font-display text-[11px] uppercase tracking-widest text-mute font-bold">{k}</dt>
      <dd className={`text-sm text-ink text-right ${mono ? 'font-mono text-xs' : 'font-display font-semibold'}`}>
        {v}
      </dd>
    </div>
  )
}

export default async function AdminSettingsPage() {
  const productCount = await getActiveProductCount()
  return (
    <>
      <AdminTopbar title="Settings" subtitle="Aussie Vapes site configuration" />

      <div className="px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white border border-line rounded-sm p-5">
          <h3 className="font-display text-base font-bold text-ink uppercase tracking-wide mb-3 pb-2 border-b border-line">
            Site
          </h3>
          <dl>
            <Row k="Brand Name" v="Aussie Vapes" />
            <Row k="Site URL" v={SITE_URL} mono />
            <Row k="Locale" v="en-AU" />
            <Row k="Currency" v="AUD" />
            <Row k="Region" v="Sydney, NSW" />
          </dl>
        </section>

        <section className="bg-white border border-line rounded-sm p-5">
          <h3 className="font-display text-base font-bold text-ink uppercase tracking-wide mb-3 pb-2 border-b border-line">
            Catalogue
          </h3>
          <dl>
            <Row k="Total Products" v={productCount.toLocaleString()} />
            <Row k="Brands" v={String(BRANDS.length)} />
            <Row k="Categories" v={String(CATEGORIES.length)} />
            <Row k="Free Shipping Over" v="$300 AUD" />
            <Row k="Standard Shipping" v="$9.95 AUD" />
          </dl>
        </section>

        <section className="bg-white border border-line rounded-sm p-5">
          <h3 className="font-display text-base font-bold text-ink uppercase tracking-wide mb-3 pb-2 border-b border-line">
            Compliance
          </h3>
          <dl>
            <Row k="Age Gate" v="Enabled (18+)" />
            <Row k="TGA Prescription Notice" v="On product, brand, category" />
            <Row k="Max Nicotine" v="20mg/mL (2%)" />
            <Row k="External Authority Links" v="TGA · AU Health Dept" />
          </dl>
        </section>

        <section className="bg-white border border-line rounded-sm p-5">
          <h3 className="font-display text-base font-bold text-ink uppercase tracking-wide mb-3 pb-2 border-b border-line">
            Auth
          </h3>
          <dl>
            <Row k="Admin Password Env" v="ADMIN_PASSWORD" mono />
            <Row k="Fallback" v="'aussievapes' (dev only)" />
            <Row k="Cookie" v="aussievapes-admin · 7d" mono />
          </dl>
          <p className="mt-3 text-xs text-mute leading-relaxed">
            Set <code className="font-mono bg-soft-100 px-1.5 py-0.5 rounded-sm">ADMIN_PASSWORD</code> in your Vercel
            project env vars to override the dev default before going live.
          </p>
        </section>
      </div>
    </>
  )
}

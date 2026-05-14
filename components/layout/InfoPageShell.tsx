import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'

export interface InfoSection {
  heading: string
  body?: string
  list?: string[]
  paragraphs?: string[]
}

interface InfoPageShellProps {
  eyebrow?: string
  title: string
  intro: string
  sections: InfoSection[]
  cta?: { label: string; href: string }
  sidebarLinks?: { label: string; href: string }[]
  breadcrumbLabel?: string
}

export default function InfoPageShell({
  eyebrow,
  title,
  intro,
  sections,
  cta,
  sidebarLinks,
  breadcrumbLabel,
}: InfoPageShellProps) {
  return (
    <>
      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb
            crumbs={[
              { label: 'Aussie Vapes', href: '/' },
              { label: breadcrumbLabel ?? title },
            ]}
          />
          {eyebrow && (
            <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mt-4 mb-2">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-1 mb-4 lowercase">
            {title}
          </h1>
          <p className="text-body max-w-2xl leading-relaxed">{intro}</p>
        </div>
      </section>

      <section className="container-site py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {sections.map((s, i) => (
            <article key={i} className="space-y-3">
              <h2 className="font-display text-2xl font-bold text-ink lowercase">{s.heading}</h2>
              {s.body && <p className="text-body leading-relaxed">{s.body}</p>}
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="text-body leading-relaxed">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="space-y-2 text-body text-sm pl-1">
                  {s.list.map((li, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-price font-bold flex-shrink-0">•</span>
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}

          {cta && (
            <div className="bg-soft-100 border border-line rounded-sm p-6 text-center">
              <Link href={cta.href} className="btn-sale">{cta.label}</Link>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white border border-line rounded-sm p-6">
            <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-3 pb-2 border-b border-line">
              Helpful Aussie Vapes Links
            </h3>
            <ul className="space-y-2 text-sm">
              {(sidebarLinks ?? [
                { label: 'All Brands', href: '/brands' },
                { label: 'Shop Disposables', href: '/category/disposable-vapes' },
                { label: 'Shop Pod Systems', href: '/category/pod-systems' },
                { label: 'Sale', href: '/sale' },
                { label: 'New Arrivals', href: '/new-arrivals' },
                { label: 'Shipping Policy', href: '/shipping' },
                { label: 'Returns & Refunds', href: '/returns' },
                { label: 'FAQ', href: '/faq' },
                { label: 'AU Vaping Laws', href: '/vaping-laws-australia' },
                { label: 'Beginners Guide', href: '/beginners-guide' },
                { label: 'Contact Support', href: '/contact' },
              ]).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-body hover:text-price">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  )
}

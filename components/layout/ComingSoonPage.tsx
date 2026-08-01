import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'

interface ComingSoonProps {
  breadcrumb: string
  title: string
  intro: string
  body?: string
  ctaHref?: string
  ctaLabel?: string
}

export default function ComingSoonPage({ breadcrumb, title, intro, body, ctaHref = '/contact', ctaLabel = 'Contact Aussie Vape Hub' }: ComingSoonProps) {
  return (
    <>
      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'Aussie Vape Hub', href: '/' }, { label: breadcrumb }]} />
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-4 mb-3 lowercase">{title}</h1>
          <p className="text-body max-w-2xl leading-relaxed">{intro}</p>
        </div>
      </section>

      <section className="container-site py-14 max-w-2xl">
        {body && <p className="text-body leading-relaxed mb-6">{body}</p>}
        <div className="bg-soft-100 border border-line rounded-sm p-8 text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-price font-bold mb-3">Coming Soon</p>
          <h2 className="font-display text-2xl font-bold text-ink mb-3 uppercase">We&apos;re Working On It</h2>
          <p className="text-body text-sm leading-relaxed mb-6">
            This Aussie Vape Hub feature is launching soon. In the meantime, our team can help you with anything you need.
          </p>
          <Link href={ctaHref} className="btn-primary">{ctaLabel}</Link>
        </div>

        <div className="mt-10">
          <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-3">While You&apos;re Here</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <li><Link href="/category/disposable-vapes" className="text-body hover:text-price">Shop Disposable Vapes</Link></li>
            <li><Link href="/brands" className="text-body hover:text-price">Browse All Aussie Vape Hub Brands</Link></li>
            <li><Link href="/sale" className="text-body hover:text-price">Current Aussie Vape Hub Sale</Link></li>
            <li><Link href="/new-arrivals" className="text-body hover:text-price">New Arrivals</Link></li>
            <li><Link href="/faq" className="text-body hover:text-price">Aussie Vape Hub FAQ</Link></li>
            <li><Link href="/shipping" className="text-body hover:text-price">Shipping &amp; Delivery</Link></li>
          </ul>
        </div>
      </section>
    </>
  )
}

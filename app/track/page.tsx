import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Track Your Vapes Australia Order',
  description: 'Track the status of your Vapes Australia order. Enter your order number and email to see real-time courier tracking.',
  alternates: { canonical: '/track' },
}

export default function TrackPage() {
  return (
    <>
      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'Vapes Australia', href: '/' }, { label: 'Order Tracking' }]} />
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-4 mb-3 lowercase">
            track your vapes australia order
          </h1>
          <p className="text-body max-w-2xl leading-relaxed">
            Enter your Vapes Australia order number and the email address used for the order to see real-time tracking.
          </p>
        </div>
      </section>

      <section className="container-site py-14 max-w-xl">
        <form className="bg-white border border-line rounded-sm p-6 space-y-4">
          <div>
            <label htmlFor="track-order" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Order Number *</label>
            <input id="track-order" name="order" type="text" required placeholder="AV-00000" className="input-base" />
          </div>
          <div>
            <label htmlFor="track-email" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Email *</label>
            <input id="track-email" name="email" type="email" required placeholder="you@example.com" className="input-base" />
          </div>
          <button type="submit" className="btn-primary w-full">Track My Vapes Australia Order</button>
          <p className="text-xs text-mute text-center">
            Lost your order number? Check the confirmation email from Vapes Australia or <Link href="/contact" className="text-price font-semibold hover:underline">contact us</Link>.
          </p>
        </form>
      </section>
    </>
  )
}

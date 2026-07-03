import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { ChatBubbleLeftRightIcon, QuestionMarkCircleIcon, EnvelopeIcon, TruckIcon, ArrowPathIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Vapes Australia Help Centre — Support, FAQ, Order Tracking',
  description:
    "Get help with your Vapes Australia order. Quick links to FAQ, shipping, returns, order tracking and customer support. Sydney-based team Mon-Fri 9am-5pm AEST.",
  alternates: { canonical: '/help' },
}

const TILES = [
  { Icon: QuestionMarkCircleIcon, title: 'FAQ', body: 'Browse the Vapes Australia FAQ for instant answers.', href: '/faq' },
  { Icon: TruckIcon, title: 'Shipping', body: 'Delivery times, free shipping threshold and dispatch info.', href: '/shipping' },
  { Icon: ArrowPathIcon, title: 'Returns', body: '30-day return policy and faulty device replacements.', href: '/returns' },
  { Icon: ShieldCheckIcon, title: 'Order Tracking', body: 'Check the status of your Vapes Australia order.', href: '/track' },
  { Icon: ChatBubbleLeftRightIcon, title: 'Live Chat', body: 'Chat with the Vapes Australia team in real time.', href: '/contact' },
  { Icon: EnvelopeIcon, title: 'Email Support', body: 'Email info@vapesaustralia.com.au — reply within 4 business hours.', href: 'mailto:info@vapesaustralia.com.au' },
]

export default function HelpPage() {
  return (
    <>
      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'Vapes Australia', href: '/' }, { label: 'Help Centre' }]} />
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-4 mb-3 lowercase">
            vapes australia help centre
          </h1>
          <p className="text-body max-w-2xl leading-relaxed">
            Find answers fast or get in touch with the Vapes Australia support team. We&apos;re here Monday-Friday
            9am-5pm AEST.
          </p>
        </div>
      </section>

      <section className="container-site py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TILES.map(({ Icon, title, body, href }) => (
            <Link
              key={title}
              href={href}
              className="bg-white border border-line rounded-sm p-6 hover:border-ink hover:shadow-md transition-all flex flex-col"
            >
              <Icon className="h-10 w-10 text-price mb-3" />
              <h3 className="font-display text-lg font-bold text-ink uppercase tracking-wide mb-1">{title}</h3>
              <p className="text-body text-sm">{body}</p>
              <span className="mt-auto pt-3 font-display text-xs uppercase tracking-widest font-bold text-ink">Go →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

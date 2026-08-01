import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Contact Aussie Vape Hub — Sydney-Based Australian Vape Support',
  description:
    "Contact Aussie Vape Hub for order help, product advice or wholesale enquiries. Real Australian support team based in Sydney. Mon–Fri 9am–5pm AEST.",
  keywords: [
    'contact aussie vape hub',
    'aussie vape hub contact',
    'aussie vape hub support',
    'aussie vape hub phone',
    'aussie vape hub email',
    'aussie vape hub sydney',
  ],
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-soft-100 border-b border-line">
        <div className="container-site py-10">
          <Breadcrumb crumbs={[{ label: 'Aussie Vape Hub', href: '/' }, { label: 'Contact Us' }]} />
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mt-4 mb-3 lowercase">
            contact aussie vape hub
          </h1>
          <p className="text-body max-w-2xl leading-relaxed">
            Need a hand with an Aussie Vape Hub order, product advice or a wholesale enquiry? Our Sydney-based support team
            is here Monday to Friday, 9am–5pm AEST.
          </p>
        </div>
      </section>

      <section className="container-site py-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact form */}
        <div>
          <h2 className="font-display text-2xl font-bold text-ink mb-5 lowercase">send aussie vape hub a message</h2>
          <form className="space-y-4 bg-white border border-line rounded-sm p-6">
            <div>
              <label htmlFor="contact-name" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Your Name *</label>
              <input id="contact-name" name="name" type="text" required className="input-base" placeholder="Jane Doe" />
            </div>
            <div>
              <label htmlFor="contact-email" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Email *</label>
              <input id="contact-email" name="email" type="email" required className="input-base" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="contact-order" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Order Number (optional)</label>
              <input id="contact-order" name="order" type="text" className="input-base" placeholder="AV-00000" />
            </div>
            <div>
              <label htmlFor="contact-topic" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Topic *</label>
              <select id="contact-topic" name="topic" required className="input-base">
                <option>Order help</option>
                <option>Product question</option>
                <option>Shipping enquiry</option>
                <option>Returns / refunds</option>
                <option>Wholesale / bulk</option>
                <option>Authentication check</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Message *</label>
              <textarea id="contact-message" name="message" required rows={6} className="input-base resize-none" placeholder="How can the Aussie Vape Hub team help?" />
            </div>
            <button type="submit" className="btn-sale w-full">Send to Aussie Vape Hub</button>
            <p className="text-xs text-mute text-center">We aim to respond to all Aussie Vape Hub enquiries within 4 business hours.</p>
          </form>
        </div>

        {/* Contact info */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-ink mb-2 lowercase">other ways to reach aussie vape hub</h2>

          {[
            { Icon: PhoneIcon, t: 'Phone', body: '+61 468 188 347', href: 'tel:+61468188347', note: 'Mon–Fri 9am–5pm AEST' },
            { Icon: EnvelopeIcon, t: 'Email', body: 'info@aussievapehub.com.au', href: 'mailto:info@aussievapehub.com.au', note: 'Replies within 4 business hours' },
            { Icon: ChatBubbleLeftRightIcon, t: 'Live Chat', body: 'Available on every Aussie Vape Hub page', href: '#', note: 'Look for the bubble in the bottom-right corner' },
            { Icon: MapPinIcon, t: 'Sydney Warehouse', body: 'Sydney, NSW, Australia', href: '#', note: 'Pick-up by appointment only (B2B / wholesale)' },
            { Icon: ClockIcon, t: 'Support Hours', body: 'Monday – Friday', href: '#', note: '9am–5pm AEST (closed AU public holidays)' },
          ].map(({ Icon, t, body, href, note }) => (
            <div key={t} className="bg-white border border-line rounded-sm p-5 flex gap-4">
              <div className="h-12 w-12 flex-shrink-0 rounded-sm bg-soft-100 border border-line flex items-center justify-center">
                <Icon className="h-6 w-6 text-ink" />
              </div>
              <div className="flex-1">
                <p className="font-display text-xs uppercase tracking-wider text-mute font-bold">{t}</p>
                {href.startsWith('#') ? (
                  <p className="font-display text-lg font-bold text-ink">{body}</p>
                ) : (
                  <a href={href} className="font-display text-lg font-bold text-ink hover:text-price">{body}</a>
                )}
                <p className="text-xs text-mute mt-1">{note}</p>
              </div>
            </div>
          ))}

          <div className="bg-soft-100 border border-line rounded-sm p-5">
            <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-2">Frequently Asked</h3>
            <p className="text-sm text-body mb-3">
              Most Aussie Vape Hub questions are answered in our <a href="/faq" className="text-price font-semibold hover:underline">FAQ page</a>.
              For specific shipping queries see our <a href="/shipping" className="text-price font-semibold hover:underline">shipping policy</a>,
              and for returns see our <a href="/returns" className="text-price font-semibold hover:underline">returns policy</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

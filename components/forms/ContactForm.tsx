'use client'

import { useFormState } from 'react-dom'
import { sendContactMessage, type FormState } from '@/lib/enquiry-actions'
import { FormError, FormSuccess, Honeypot, SubmitButton } from './FormParts'

const initial: FormState = { status: 'idle' }

export default function ContactForm() {
  const [state, action] = useFormState(sendContactMessage, initial)

  if (state.status === 'sent') {
    return (
      <div className="bg-white border border-line rounded-sm p-6">
        <FormSuccess>Thanks — your message is on its way. We aim to reply within 4 business hours.</FormSuccess>
      </div>
    )
  }

  return (
    <form action={action} className="relative space-y-4 bg-white border border-line rounded-sm p-6">
      <Honeypot />
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
        <textarea id="contact-message" name="message" required rows={6} className="input-base resize-none" placeholder="How can the VapeHub Vapes Australia team help?" />
      </div>
      <FormError state={state} />
      <SubmitButton>Send to VapeHub Vapes Australia</SubmitButton>
      <p className="text-xs text-mute text-center">We aim to respond to all VapeHub Vapes Australia enquiries within 4 business hours.</p>
    </form>
  )
}

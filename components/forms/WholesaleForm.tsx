'use client'

import { useFormState } from 'react-dom'
import { sendWholesaleApplication, type FormState } from '@/lib/enquiry-actions'
import { FormError, FormSuccess, Honeypot, SubmitButton } from './FormParts'

const initial: FormState = { status: 'idle' }

export default function WholesaleForm() {
  const [state, action] = useFormState(sendWholesaleApplication, initial)

  if (state.status === 'sent') {
    return <FormSuccess>Application received — we&apos;ll be in touch within 1 business day.</FormSuccess>
  }

  return (
    <form action={action} className="relative space-y-4">
      <Honeypot />
      <div>
        <label htmlFor="bulk-business" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Business Name *</label>
        <input id="bulk-business" name="business" type="text" required className="input-base" />
      </div>
      <div>
        <label htmlFor="bulk-abn" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">ABN *</label>
        <input id="bulk-abn" name="abn" type="text" required className="input-base" placeholder="00 000 000 000" />
      </div>
      <div>
        <label htmlFor="bulk-name" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Contact Name *</label>
        <input id="bulk-name" name="name" type="text" required className="input-base" />
      </div>
      <div>
        <label htmlFor="bulk-email" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Email *</label>
        <input id="bulk-email" name="email" type="email" required className="input-base" />
      </div>
      <div>
        <label htmlFor="bulk-monthly" className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Estimated Monthly Spend *</label>
        <select id="bulk-monthly" name="monthly" required className="input-base">
          <option>$1,000 – $5,000</option>
          <option>$5,000 – $10,000</option>
          <option>$10,000 – $25,000</option>
          <option>$25,000+</option>
        </select>
      </div>
      <FormError state={state} />
      <SubmitButton>Apply For Wholesale Access</SubmitButton>
      <p className="text-xs text-mute text-center">VapeHub Vapes Australia typically responds to wholesale applications within 1 business day.</p>
    </form>
  )
}

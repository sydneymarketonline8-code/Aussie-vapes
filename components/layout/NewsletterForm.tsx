'use client'

import { useFormState } from 'react-dom'
import { subscribeNewsletter, type FormState } from '@/lib/enquiry-actions'
import { FormError, FormSuccess, Honeypot, SubmitButton } from '@/components/forms/FormParts'

const initial: FormState = { status: 'idle' }

export default function NewsletterForm() {
  const [state, action] = useFormState(subscribeNewsletter, initial)

  if (state.status === 'sent') {
    return <FormSuccess>Thanks! You&apos;re on the list.</FormSuccess>
  }

  return (
    <div className="space-y-2">
      <form action={action} className="relative flex gap-2">
        <Honeypot />
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          className="flex-1 bg-white border border-white rounded-sm px-4 py-3 text-sm text-body placeholder:text-mute focus:outline-none focus:border-price transition-colors"
          required
        />
        <SubmitButton className="btn-sale whitespace-nowrap">Subscribe</SubmitButton>
      </form>
      <FormError state={state} />
    </div>
  )
}

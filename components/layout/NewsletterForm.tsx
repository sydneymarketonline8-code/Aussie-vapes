'use client'

import { useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setEmail('')
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 p-3 rounded-lg bg-brand/10 border border-brand/30 text-sm text-brand">
        <CheckIcon className="h-4 w-4 flex-shrink-0" />
        Thanks! You&apos;re on the list.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="input-base"
        required
      />
      <button type="submit" className="btn-primary w-full">
        Subscribe
      </button>
    </form>
  )
}

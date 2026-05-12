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
      <div className="flex items-center gap-2 p-3 rounded-sm bg-success/10 border border-success/30 text-sm text-success">
        <CheckIcon className="h-4 w-4 flex-shrink-0" />
        Thanks! You&apos;re on the list.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 bg-white border border-white rounded-sm px-4 py-3 text-sm text-body placeholder:text-mute focus:outline-none focus:border-price transition-colors"
        required
      />
      <button type="submit" className="btn-sale whitespace-nowrap">
        Subscribe
      </button>
    </form>
  )
}

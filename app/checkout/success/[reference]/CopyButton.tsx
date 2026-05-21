'use client'

import { useState } from 'react'
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline'

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard API blocked (e.g. insecure context) — silently no-op
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      className="inline-flex items-center gap-1 text-mute hover:text-ink transition-colors"
    >
      {copied ? <CheckIcon className="h-4 w-4 text-success" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
    </button>
  )
}

'use client'

import { useFormStatus } from 'react-dom'
import { CheckIcon } from '@heroicons/react/24/outline'
import type { FormState } from '@/lib/enquiry-actions'

export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}

export function SubmitButton({ children, className = 'btn-sale w-full' }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className={`${className} disabled:opacity-60`}>
      {pending ? 'Sending…' : children}
    </button>
  )
}

export function FormSuccess({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 p-3 rounded-sm bg-success/10 border border-success/30 text-sm text-success">
      <CheckIcon className="h-4 w-4 flex-shrink-0" />
      {children}
    </div>
  )
}

export function FormError({ state }: { state: FormState }) {
  if (state.status !== 'error') return null
  return <p role="alert" className="text-sm text-price">{state.message}</p>
}

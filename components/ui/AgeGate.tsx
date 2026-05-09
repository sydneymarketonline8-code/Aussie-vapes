'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'vapevault-age-verified'

export default function AgeGate() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const verified = sessionStorage.getItem(STORAGE_KEY)
    if (!verified) setShow(true)
  }, [])

  function confirm() {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setShow(false)
  }

  function deny() {
    window.location.href = 'https://google.com.au'
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-surface-950/95 backdrop-blur-md animate-fade-in">
      <div className="bg-surface-800 border border-surface-500 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="text-5xl mb-4">🔞</div>
        <h1 className="text-2xl font-bold text-zinc-50 mb-2">Age Verification Required</h1>
        <p className="text-zinc-400 text-sm mb-6">
          This website sells nicotine products. You must be <strong className="text-zinc-200">18 years or older</strong> and hold a valid Australian prescription for nicotine-containing products where required by law.
        </p>
        <p className="text-zinc-500 text-xs mb-8">
          By entering this site you confirm that you are 18+ and agree to our{' '}
          <a href="/terms" className="text-brand hover:underline">Terms of Service</a> and{' '}
          <a href="/privacy" className="text-brand hover:underline">Privacy Policy</a>.
        </p>
        <div className="flex gap-3">
          <button
            onClick={confirm}
            className="btn-primary flex-1"
          >
            I am 18 or older — Enter
          </button>
          <button
            onClick={deny}
            className="btn-secondary flex-1"
          >
            I am under 18 — Exit
          </button>
        </div>
        <p className="text-zinc-600 text-xs mt-4">
          Nicotine products are highly addictive and not risk-free. For 18+ adults only.
        </p>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'aussievapes-age-verified'

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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-line rounded-sm p-8 max-w-md w-full text-center shadow-2xl">
        <div className="text-5xl mb-4">🔞</div>
        <h1 className="font-display text-2xl font-bold text-ink mb-2 uppercase tracking-wide">Age Verification Required</h1>
        <p className="text-body text-sm mb-6 leading-relaxed">
          This website sells nicotine products. You must be <strong className="text-ink">18 years or older</strong> and hold a valid Australian prescription for nicotine-containing products where required by law.
        </p>
        <p className="text-mute text-xs mb-8">
          By entering this site you confirm that you are 18+ and agree to our{' '}
          <a href="/terms" className="text-price hover:underline font-semibold">Terms of Service</a> and{' '}
          <a href="/privacy" className="text-price hover:underline font-semibold">Privacy Policy</a>.
        </p>
        <div className="flex gap-3">
          <button onClick={confirm} className="btn-sale flex-1">
            I am 18+ — Enter
          </button>
          <button onClick={deny} className="btn-secondary flex-1">
            I am under 18 — Exit
          </button>
        </div>
        <p className="text-mute text-xs mt-4">
          Nicotine products are highly addictive and not risk-free. For 18+ adults only.
        </p>
      </div>
    </div>
  )
}

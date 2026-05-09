'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShieldCheckIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'
import Breadcrumb from '@/components/ui/Breadcrumb'

type Step = 'contact' | 'shipping' | 'payment'

export default function CheckoutPage() {
  const { state, subtotal } = useCart()
  const { items } = state
  const [step, setStep] = useState<Step>('contact')
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    address: '', suburb: '', state: '', postcode: '', country: 'Australia',
    cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
    ageConfirmed: false,
  })

  const shipping = subtotal >= 100 ? 0 : 9.95
  const total = subtotal + shipping

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const fieldClass = 'input-base'
  const labelClass = 'block text-xs font-medium text-zinc-400 mb-1'
  const fieldGroup = 'flex flex-col gap-1'

  if (!items.length) {
    return (
      <div className="container-site py-20 text-center">
        <p className="text-zinc-400 mb-4">Your cart is empty.</p>
        <Link href="/" className="btn-primary">Start Shopping</Link>
      </div>
    )
  }

  return (
    <div className="container-site py-10">
      <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="text-3xl font-black text-zinc-50 mt-4 mb-8">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {(['contact', 'shipping', 'payment'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => {
                if (s === 'shipping' && step === 'payment') setStep('shipping')
                if (s === 'contact') setStep('contact')
              }}
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${
                step === s
                  ? 'bg-brand text-surface-900'
                  : i < ['contact', 'shipping', 'payment'].indexOf(step)
                  ? 'bg-surface-600 text-brand'
                  : 'bg-surface-700 text-zinc-500'
              }`}
            >
              <span className="h-5 w-5 rounded-full bg-black/20 flex items-center justify-center text-xs">{i + 1}</span>
              <span className="hidden sm:inline capitalize">{s}</span>
            </button>
            {i < 2 && <div className="h-px w-8 bg-surface-500" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Form */}
        <div className="lg:col-span-3">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Step 1: Contact */}
            {step === 'contact' && (
              <div className="card p-6 space-y-4">
                <h2 className="text-lg font-bold text-zinc-100">Contact Information</h2>
                <div className={fieldGroup}>
                  <label className={labelClass}>Email address *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className={fieldClass} placeholder="you@example.com" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className={fieldGroup}>
                    <label className={labelClass}>First name *</label>
                    <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className={fieldClass} required />
                  </div>
                  <div className={fieldGroup}>
                    <label className={labelClass}>Last name *</label>
                    <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className={fieldClass} required />
                  </div>
                </div>
                <div className={fieldGroup}>
                  <label className={labelClass}>Phone number</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={fieldClass} placeholder="+61 4xx xxx xxx" />
                </div>

                {/* Age confirmation */}
                <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border border-surface-500 hover:border-brand/40 transition-colors">
                  <input
                    type="checkbox"
                    name="ageConfirmed"
                    checked={form.ageConfirmed}
                    onChange={handleChange}
                    className="mt-0.5 rounded border-surface-400 bg-surface-700 text-brand focus:ring-brand"
                    required
                  />
                  <span className="text-sm text-zinc-400">
                    I confirm I am <strong className="text-zinc-200">18 years or older</strong> and hold a valid Australian prescription for nicotine-containing products where required. I have read and agree to the{' '}
                    <a href="/terms" className="text-brand hover:underline">Terms of Service</a>.
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  disabled={!form.email || !form.firstName || !form.lastName || !form.ageConfirmed}
                  className="btn-primary w-full"
                >
                  Continue to Shipping
                </button>
              </div>
            )}

            {/* Step 2: Shipping */}
            {step === 'shipping' && (
              <div className="card p-6 space-y-4">
                <h2 className="text-lg font-bold text-zinc-100">Shipping Address</h2>
                <div className={fieldGroup}>
                  <label className={labelClass}>Street address *</label>
                  <input type="text" name="address" value={form.address} onChange={handleChange} className={fieldClass} placeholder="123 Main Street" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className={fieldGroup}>
                    <label className={labelClass}>Suburb *</label>
                    <input type="text" name="suburb" value={form.suburb} onChange={handleChange} className={fieldClass} required />
                  </div>
                  <div className={fieldGroup}>
                    <label className={labelClass}>Postcode *</label>
                    <input type="text" name="postcode" value={form.postcode} onChange={handleChange} className={fieldClass} maxLength={4} required />
                  </div>
                </div>
                <div className={fieldGroup}>
                  <label className={labelClass}>State *</label>
                  <select name="state" value={form.state} onChange={handleChange} className={fieldClass} required>
                    <option value="">Select state...</option>
                    {['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Shipping options */}
                <div className="space-y-2">
                  <label className={labelClass}>Shipping method</label>
                  {[
                    { id: 'standard', label: 'Standard Post (3–7 business days)', price: subtotal >= 100 ? 'FREE' : '$9.95' },
                    { id: 'express', label: 'Express Post (1–3 business days)', price: '$14.95' },
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center justify-between p-3 rounded-xl border border-surface-500 hover:border-brand/40 cursor-pointer transition-colors">
                      <div className="flex items-center gap-2">
                        <input type="radio" name="shippingMethod" value={opt.id} defaultChecked={opt.id === 'standard'} className="text-brand focus:ring-brand" />
                        <span className="text-sm text-zinc-300">{opt.label}</span>
                      </div>
                      <span className="text-sm font-semibold text-zinc-200">{opt.price}</span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep('contact')} className="btn-secondary flex items-center gap-1">
                    <ArrowLeftIcon className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('payment')}
                    disabled={!form.address || !form.suburb || !form.postcode || !form.state}
                    className="btn-primary flex-1"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 'payment' && (
              <div className="card p-6 space-y-4">
                <h2 className="text-lg font-bold text-zinc-100">Payment</h2>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-700 border border-surface-500 text-xs text-zinc-500">
                  <ShieldCheckIcon className="h-4 w-4 text-brand" />
                  Your payment information is encrypted and secure. We never store card details.
                </div>
                <div className={fieldGroup}>
                  <label className={labelClass}>Card number *</label>
                  <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} className={fieldClass} placeholder="4242 4242 4242 4242" maxLength={19} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className={fieldGroup}>
                    <label className={labelClass}>Expiry (MM/YY) *</label>
                    <input type="text" name="cardExpiry" value={form.cardExpiry} onChange={handleChange} className={fieldClass} placeholder="12/27" maxLength={5} required />
                  </div>
                  <div className={fieldGroup}>
                    <label className={labelClass}>CVC *</label>
                    <input type="text" name="cardCvc" value={form.cardCvc} onChange={handleChange} className={fieldClass} placeholder="123" maxLength={4} required />
                  </div>
                </div>
                <div className={fieldGroup}>
                  <label className={labelClass}>Name on card *</label>
                  <input type="text" name="cardName" value={form.cardName} onChange={handleChange} className={fieldClass} required />
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep('shipping')} className="btn-secondary flex items-center gap-1">
                    <ArrowLeftIcon className="h-4 w-4" /> Back
                  </button>
                  <button type="submit" className="btn-sale flex-1 font-bold">
                    Pay ${total.toFixed(2)} AUD
                  </button>
                </div>

                <p className="text-xs text-zinc-600 text-center">
                  By placing this order you agree to our{' '}
                  <a href="/terms" className="text-brand hover:underline">Terms</a>{' '}
                  and confirm your age and prescription status.
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-2">
          <div className="card p-6 space-y-4 sticky top-20">
            <h2 className="text-base font-bold text-zinc-100">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedFlavour}`} className="flex gap-3">
                  <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-surface-600 flex-shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="56px" unoptimized />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-brand text-surface-900 text-[10px] font-bold flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-zinc-300 line-clamp-2">{item.product.name}</p>
                    {item.selectedFlavour && <p className="text-xs text-zinc-600">{item.selectedFlavour}</p>}
                  </div>
                  <span className="text-xs font-semibold text-zinc-200 whitespace-nowrap">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="divider" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                {shipping === 0 ? <span className="text-green-400">FREE</span> : <span>${shipping.toFixed(2)}</span>}
              </div>
              <div className="divider" />
              <div className="flex justify-between font-bold text-zinc-50">
                <span>Total</span>
                <span>${total.toFixed(2)} AUD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

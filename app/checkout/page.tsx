'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShieldCheckIcon, ArrowLeftIcon, BanknotesIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { PAYMENT_METHODS, type PaymentMethod } from '@/lib/payment'
import { createOrder, type CheckoutItemInput } from './actions'
import { minimumOrderState, FREE_SHIPPING_THRESHOLD_AUD } from '@/lib/cart-rules'
import { useRouter } from 'next/navigation'

type Step = 'contact' | 'shipping' | 'payment'

export default function CheckoutPage() {
  const router = useRouter()
  const { state, subtotal, clearCart } = useCart()
  const { items } = state
  const [step, setStep] = useState<Step>('contact')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('payid')
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard')
  const [submitting, startTransition] = useTransition()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    address: '', suburb: '', state: '', postcode: '', country: 'Australia',
    ageConfirmed: false,
  })

  const shipping = shippingMethod === 'express' ? 14.95 : subtotal >= FREE_SHIPPING_THRESHOLD_AUD ? 0 : 9.95
  const total = subtotal + shipping
  const minOrder = minimumOrderState(subtotal)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  function handlePlaceOrder() {
    setSubmitError(null)
    const orderItems: CheckoutItemInput[] = items.map((i) => ({
      productId: i.product.id,
      productSlug: i.product.slug,
      productName: i.product.name,
      productImageUrl: i.product.images?.[0],
      selectedFlavour: i.selectedFlavour,
      selectedNicotine: i.selectedNicotine,
      quantity: i.quantity,
      unitPrice: i.product.price,
    }))

    startTransition(async () => {
      const result = await createOrder({
        contact: {
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone || undefined,
        },
        shipping: {
          address: form.address,
          suburb: form.suburb,
          state: form.state,
          postcode: form.postcode,
          country: form.country,
          method: shippingMethod,
        },
        payment: { method: paymentMethod },
        items: orderItems,
      })

      if (!result.ok) {
        setSubmitError(result.error)
        return
      }
      clearCart()
      router.push(`/checkout/success/${result.reference}`)
    })
  }

  const fieldClass = 'input-base'
  const labelClass = 'block font-display text-xs font-bold uppercase tracking-wider text-ink mb-1'
  const fieldGroup = 'flex flex-col gap-1'

  if (!items.length) {
    return (
      <div className="container-site py-20 text-center">
        <p className="text-body mb-4">Your cart is empty.</p>
        <Link href="/" className="btn-primary">Start Shopping</Link>
      </div>
    )
  }

  if (!minOrder.met) {
    return (
      <div className="container-site py-20 max-w-xl">
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-8 text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] font-bold text-amber-700 mb-2">
            Minimum Order ${minOrder.minimum} AUD
          </p>
          <h1 className="font-display text-2xl font-bold text-ink mb-3 lowercase">
            add ${minOrder.remaining.toFixed(2)} more to checkout
          </h1>
          <p className="text-body text-sm mb-6">
            Your cart subtotal is currently <strong>${subtotal.toFixed(2)}</strong>. We have a ${minOrder.minimum} minimum order across Aussie Vapes — top up your cart to continue.
          </p>
          <div className="h-2 bg-amber-200/60 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-amber-600 rounded-full transition-all duration-500"
              style={{ width: `${minOrder.progress}%` }}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/cart" className="btn-secondary">Review Cart</Link>
            <Link href="/" className="btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-site py-10">
      <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-4 mb-8 lowercase">checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {(['contact', 'shipping', 'payment'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => {
                if (s === 'shipping' && step === 'payment') setStep('shipping')
                if (s === 'contact') setStep('contact')
              }}
              className={`flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm transition-colors ${
                step === s
                  ? 'bg-ink text-white'
                  : i < ['contact', 'shipping', 'payment'].indexOf(step)
                  ? 'bg-success text-white'
                  : 'bg-soft-200 text-mute'
              }`}
            >
              <span className="h-5 w-5 rounded-full bg-black/20 flex items-center justify-center text-xs">{i + 1}</span>
              <span className="hidden sm:inline capitalize">{s}</span>
            </button>
            {i < 2 && <div className="h-px w-8 bg-line" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Form */}
        <div className="lg:col-span-3">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Step 1: Contact */}
            {step === 'contact' && (
              <div className="bg-white border border-line rounded-sm p-6 space-y-4">
                <h2 className="font-display text-xl font-bold text-ink uppercase tracking-wide">Contact Information</h2>
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

                <label className="flex items-start gap-3 cursor-pointer p-3 rounded-sm border border-line hover:border-ink transition-colors bg-soft-100">
                  <input
                    type="checkbox"
                    name="ageConfirmed"
                    checked={form.ageConfirmed}
                    onChange={handleChange}
                    className="mt-0.5 rounded border-line bg-white text-ink focus:ring-ink"
                    required
                  />
                  <span className="text-sm text-body">
                    I confirm I am <strong className="text-ink">18 years or older</strong> and hold a valid Australian prescription for nicotine-containing products where required. I have read and agree to the{' '}
                    <a href="/terms" className="text-price hover:underline font-semibold">Terms of Service</a>.
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
              <div className="bg-white border border-line rounded-sm p-6 space-y-4">
                <h2 className="font-display text-xl font-bold text-ink uppercase tracking-wide">Shipping Address</h2>
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

                <div className="space-y-2">
                  <label className={labelClass}>Shipping method</label>
                  {[
                    { id: 'standard' as const, label: 'Standard Post (3–7 business days)', price: subtotal >= 300 ? 'FREE' : '$9.95' },
                    { id: 'express' as const, label: 'Express Post (1–3 business days)', price: '$14.95' },
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center justify-between p-3 rounded-sm border border-line bg-white hover:border-ink cursor-pointer transition-colors">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={opt.id}
                          checked={shippingMethod === opt.id}
                          onChange={() => setShippingMethod(opt.id)}
                          className="text-ink focus:ring-ink"
                        />
                        <span className="text-sm text-body">{opt.label}</span>
                      </div>
                      <span className="font-display text-sm font-bold text-ink">{opt.price}</span>
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
              <div className="bg-white border border-line rounded-sm p-6 space-y-4">
                <h2 className="font-display text-xl font-bold text-ink uppercase tracking-wide">Payment Method</h2>
                <div className="flex items-center gap-2 p-3 rounded-sm bg-soft-100 border border-line text-xs text-body">
                  <ShieldCheckIcon className="h-4 w-4 text-success" />
                  Choose how you&apos;d like to pay. We&apos;ll send payment instructions on the next screen and dispatch your order once payment lands.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((m) => {
                    const selected = paymentMethod === m.id
                    const Icon = m.id === 'payid' ? BanknotesIcon : CurrencyDollarIcon
                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        className={`text-left p-4 rounded-sm border-2 transition-colors ${
                          selected ? 'border-ink bg-soft-100' : 'border-line bg-white hover:border-ink/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-5 w-5 text-ink" />
                          <span className="font-display font-bold text-ink uppercase tracking-wide">{m.label}</span>
                          {selected && (
                            <span className="ml-auto inline-block bg-success text-white text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-sm tracking-wider">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-mute">{m.tagline}</p>
                      </button>
                    )
                  })}
                </div>

                <div className="rounded-sm bg-soft-100 border border-line p-4 text-sm text-body">
                  <p className="font-display text-xs font-bold uppercase tracking-wider text-ink mb-2">What happens next</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>We&apos;ll create your order and show you the {paymentMethod === 'payid' ? 'PayID details' : 'BTC wallet address + QR code'}.</li>
                    <li>Send payment using the unique reference code on that screen.</li>
                    <li>We&apos;ll email confirmation and dispatch once payment is received (usually within hours).</li>
                  </ol>
                </div>

                {submitError && (
                  <div className="p-3 rounded-sm bg-sale/10 border border-sale text-sm text-sale">
                    {submitError}
                  </div>
                )}

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep('shipping')} className="btn-secondary flex items-center gap-1" disabled={submitting}>
                    <ArrowLeftIcon className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={submitting}
                    className="btn-sale flex-1 font-bold disabled:opacity-60"
                  >
                    {submitting ? 'Placing order…' : `Place Order — $${total.toFixed(2)} AUD`}
                  </button>
                </div>

                <p className="text-xs text-mute text-center">
                  By placing this order you agree to our{' '}
                  <a href="/terms" className="text-price hover:underline font-semibold">Terms</a>{' '}
                  and confirm your age and prescription status.
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-soft-100 border border-line rounded-sm p-6 space-y-4 sticky top-20">
            <h2 className="font-display text-base font-bold text-ink uppercase tracking-wide">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedFlavour}`} className="flex gap-3">
                  <div className="relative h-14 w-14 rounded-sm overflow-hidden bg-white border border-line flex-shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-contain p-1" sizes="56px" unoptimized />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-price text-white text-[10px] font-bold flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-ink line-clamp-2">{item.product.name}</p>
                    {item.selectedFlavour && <p className="text-xs text-mute">{item.selectedFlavour}</p>}
                  </div>
                  <span className="font-display text-xs font-bold text-price whitespace-nowrap">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="divider" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-body">
                <span>Subtotal</span>
                <span className="text-ink font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-body">
                <span>Shipping</span>
                {shipping === 0 ? <span className="text-success font-bold">FREE</span> : <span className="text-ink font-semibold">${shipping.toFixed(2)}</span>}
              </div>
              <div className="divider" />
              <div className="flex justify-between font-bold">
                <span className="font-display text-ink uppercase tracking-wide">Total</span>
                <span className="font-display text-price text-lg">${total.toFixed(2)} AUD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

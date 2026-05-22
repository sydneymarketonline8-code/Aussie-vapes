'use client'

import Link from 'next/link'
import Image from 'next/image'
import { TrashIcon, MinusIcon, PlusIcon, ShoppingBagIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ShieldCheckIcon, TruckIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { minimumOrderState, FREE_SHIPPING_THRESHOLD_AUD } from '@/lib/cart-rules'

export default function CartPage() {
  const { state, removeItem, updateQuantity, subtotal, itemCount } = useCart()
  const { items } = state

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD_AUD ? 0 : 9.95
  const total = subtotal + shipping
  const minOrder = minimumOrderState(subtotal)

  return (
    <div className="container-site py-10">
      <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-4 mb-8 lowercase">
        your cart <span className="text-mute font-normal text-xl">({itemCount} items)</span>
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBagIcon className="h-16 w-16 text-line mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-ink mb-2 uppercase tracking-wide">Your cart is empty</h2>
          <p className="text-mute mb-8">Add some products to get started.</p>
          <Link href="/" className="btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-body hover:text-price transition-colors mb-2">
              <ArrowLeftIcon className="h-3.5 w-3.5" /> Continue shopping
            </Link>

            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedFlavour}-${item.selectedNicotine}`}
                className="bg-white border border-line rounded-sm p-4 flex gap-4"
              >
                <Link href={`/product/${item.product.slug}`} className="relative h-24 w-24 flex-shrink-0 rounded-sm overflow-hidden bg-soft-100 border border-line">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-contain p-2"
                    sizes="96px"
                    unoptimized
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-display text-[10px] text-mute uppercase tracking-widest font-bold">{item.product.brand}</p>
                      <Link href={`/product/${item.product.slug}`} className="font-display text-base font-bold text-ink hover:text-price transition-colors">
                        {item.product.name}
                      </Link>
                      {item.selectedFlavour && (
                        <p className="text-xs text-mute mt-0.5">Flavour: {item.selectedFlavour}</p>
                      )}
                      {item.selectedNicotine && (
                        <p className="text-xs text-mute">Nicotine: {item.selectedNicotine}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-mute hover:text-price transition-colors p-1 flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 bg-white rounded-sm border border-line">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 text-ink hover:text-price"
                        aria-label="Decrease"
                      >
                        <MinusIcon className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-sm font-semibold text-ink w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 text-ink hover:text-price"
                        aria-label="Increase"
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-display text-base font-bold text-price">
                      ${(item.product.price * item.quantity).toFixed(2)} AUD
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="bg-soft-100 border border-line rounded-sm p-6 space-y-4">
              <h2 className="font-display text-lg font-bold text-ink uppercase tracking-wide">Order Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-body">
                  <span>Subtotal</span>
                  <span className="text-ink font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-body">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-success font-bold">FREE</span>
                  ) : (
                    <span className="text-ink font-semibold">${shipping.toFixed(2)}</span>
                  )}
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-mute">
                    Add ${(300 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="divider" />
                <div className="flex justify-between text-base font-bold">
                  <span className="font-display text-ink uppercase tracking-wide">Total</span>
                  <span className="font-display text-price text-xl">${total.toFixed(2)} AUD</span>
                </div>
              </div>

              {!minOrder.met && (
                <div className="rounded-sm bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
                  <p className="font-display font-bold uppercase tracking-wider mb-1">
                    ${minOrder.minimum} minimum order
                  </p>
                  <p>
                    Add <strong>${minOrder.remaining.toFixed(2)}</strong> more to checkout.
                  </p>
                  <div className="h-1.5 bg-amber-200/60 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-amber-600 rounded-full transition-all duration-500"
                      style={{ width: `${minOrder.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {minOrder.met ? (
                <Link href="/checkout" className="btn-sale w-full block text-center">
                  Proceed to Checkout
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  title={`Minimum order is $${minOrder.minimum} AUD`}
                  className="btn-sale w-full block text-center opacity-60 cursor-not-allowed"
                >
                  Add ${minOrder.remaining.toFixed(2)} to Checkout
                </button>
              )}

              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Promo code"
                  className="input-base py-2 text-sm flex-1"
                />
                <button type="submit" className="btn-secondary py-2 px-4 text-sm">Apply</button>
              </form>
            </div>

            {/* Trust signals */}
            <div className="bg-white border border-line rounded-sm p-4 space-y-3">
              {[
                { icon: ShieldCheckIcon, text: 'Secure SSL checkout' },
                { icon: TruckIcon, text: 'Fast Australian dispatch' },
                { icon: ArrowPathIcon, text: '30-day returns on unopened items' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-body">
                  <Icon className="h-4 w-4 text-success flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

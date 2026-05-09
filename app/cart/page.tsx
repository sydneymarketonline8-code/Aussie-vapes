'use client'

import Link from 'next/link'
import Image from 'next/image'
import { TrashIcon, MinusIcon, PlusIcon, ShoppingBagIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ShieldCheckIcon, TruckIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function CartPage() {
  const { state, removeItem, updateQuantity, subtotal, itemCount } = useCart()
  const { items } = state

  const shipping = subtotal >= 100 ? 0 : 9.95
  const total = subtotal + shipping

  return (
    <div className="container-site py-10">
      <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
      <h1 className="text-3xl font-black text-zinc-50 mt-4 mb-8">
        Your Cart <span className="text-zinc-600 font-normal text-xl">({itemCount} items)</span>
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBagIcon className="h-16 w-16 text-surface-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-zinc-300 mb-2">Your cart is empty</h2>
          <p className="text-zinc-500 mb-8">Add some products to get started.</p>
          <Link href="/" className="btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-brand transition-colors mb-2">
              <ArrowLeftIcon className="h-3.5 w-3.5" /> Continue shopping
            </Link>

            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedFlavour}-${item.selectedNicotine}`}
                className="card p-4 flex gap-4"
              >
                <Link href={`/product/${item.product.slug}`} className="relative h-24 w-24 flex-shrink-0 rounded-xl overflow-hidden bg-surface-600">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                    unoptimized
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-zinc-600">{item.product.brand}</p>
                      <Link href={`/product/${item.product.slug}`} className="text-sm font-semibold text-zinc-200 hover:text-brand transition-colors">
                        {item.product.name}
                      </Link>
                      {item.selectedFlavour && (
                        <p className="text-xs text-zinc-500 mt-0.5">Flavour: {item.selectedFlavour}</p>
                      )}
                      {item.selectedNicotine && (
                        <p className="text-xs text-zinc-500">Nicotine: {item.selectedNicotine}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-zinc-600 hover:text-sale transition-colors p-1 flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 bg-surface-600 rounded-lg border border-surface-500">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 text-zinc-400 hover:text-zinc-200"
                        aria-label="Decrease"
                      >
                        <MinusIcon className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-sm font-semibold text-zinc-200 w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 text-zinc-400 hover:text-zinc-200"
                        aria-label="Increase"
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-base font-bold text-zinc-100">
                      ${(item.product.price * item.quantity).toFixed(2)} AUD
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="card p-6 space-y-4">
              <h2 className="text-lg font-bold text-zinc-100">Order Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-zinc-200">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-400 font-medium">FREE</span>
                  ) : (
                    <span className="text-zinc-200">${shipping.toFixed(2)}</span>
                  )}
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-zinc-600">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="divider" />
                <div className="flex justify-between text-base font-bold text-zinc-50">
                  <span>Total</span>
                  <span>${total.toFixed(2)} AUD</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full block text-center">
                Proceed to Checkout
              </Link>

              {/* Promo code */}
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
            <div className="card p-4 space-y-3">
              {[
                { icon: ShieldCheckIcon, text: 'Secure SSL checkout' },
                { icon: TruckIcon, text: 'Fast Australian dispatch' },
                { icon: ArrowPathIcon, text: '30-day returns on unopened items' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-zinc-500">
                  <Icon className="h-4 w-4 text-brand flex-shrink-0" />
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

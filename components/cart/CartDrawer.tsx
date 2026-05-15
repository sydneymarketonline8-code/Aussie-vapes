'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { XMarkIcon, TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'
import clsx from 'clsx'

export default function CartDrawer() {
  const { state, closeCart, removeItem, updateQuantity, itemCount, subtotal } = useCart()
  const { isOpen, items } = state

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const freeShippingThreshold = 100
  const remaining = Math.max(0, freeShippingThreshold - subtotal)
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100)

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={clsx(
          'fixed right-0 top-0 h-full w-full max-w-md z-[70] bg-white border-l border-line flex flex-col transition-transform duration-300 ease-out shadow-2xl',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-ink text-white">
          <h2 className="font-display text-base font-bold uppercase tracking-wider flex items-center gap-2">
            <ShoppingBagIcon className="h-5 w-5" />
            Your Cart
            {itemCount > 0 && (
              <span className="text-[10px] bg-price text-white font-bold rounded-full px-2 py-0.5">
                {itemCount}
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close cart"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Free shipping progress */}
        {subtotal > 0 && (
          <div className="px-5 py-3 border-b border-line bg-soft-100">
            <div className="flex justify-between text-xs text-body mb-1.5 font-display uppercase tracking-wider font-semibold">
              {remaining > 0 ? (
                <span>Add <strong className="text-price">${remaining.toFixed(2)}</strong> for free shipping</span>
              ) : (
                <span className="text-success font-bold inline-flex items-center gap-1.5">
                  <CheckBadgeIcon className="h-4 w-4" />
                  Free shipping unlocked!
                </span>
              )}
            </div>
            <div className="h-1.5 bg-line rounded-full overflow-hidden">
              <div
                className="h-full bg-success rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingBagIcon className="h-14 w-14 text-line mb-4" />
              <p className="font-display font-bold text-ink uppercase tracking-wider mb-1">Your cart is empty</p>
              <p className="text-mute text-sm mb-6">Add some products to get started</p>
              <button onClick={closeCart} className="btn-primary">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.selectedFlavour}-${item.selectedNicotine}`} className="flex gap-3 p-3 bg-soft-100 rounded-sm border border-line">
                <div className="relative h-20 w-20 flex-shrink-0 rounded-sm overflow-hidden bg-white border border-line">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-contain p-1"
                    sizes="80px"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.product.slug}`}
                    onClick={closeCart}
                    className="font-display text-sm font-semibold text-ink hover:text-price transition-colors line-clamp-2 leading-snug"
                  >
                    {item.product.name}
                  </Link>
                  {item.selectedFlavour && (
                    <p className="text-xs text-mute mt-0.5">{item.selectedFlavour}</p>
                  )}
                  {item.selectedNicotine && (
                    <p className="text-xs text-mute">{item.selectedNicotine}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 bg-white rounded-sm border border-line">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-ink hover:text-price transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <MinusIcon className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-semibold text-ink w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 text-ink hover:text-price transition-colors"
                        aria-label="Increase quantity"
                      >
                        <PlusIcon className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-bold text-price">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1 text-mute hover:text-price transition-colors"
                        aria-label="Remove item"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-line p-5 space-y-3 bg-soft-100">
            <div className="flex justify-between text-sm">
              <span className="text-body">Subtotal ({itemCount} items)</span>
              <span className="font-display font-bold text-ink">${subtotal.toFixed(2)} AUD</span>
            </div>
            {subtotal >= freeShippingThreshold && (
              <div className="flex justify-between text-sm">
                <span className="text-body">Shipping</span>
                <span className="text-success font-bold">FREE</span>
              </div>
            )}
            <Link href="/checkout" onClick={closeCart} className="btn-sale w-full text-center block">
              Checkout — ${subtotal.toFixed(2)} AUD
            </Link>
            <Link href="/cart" onClick={closeCart} className="btn-secondary w-full text-center block">
              View Full Cart
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}

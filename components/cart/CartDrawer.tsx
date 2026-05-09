'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { XMarkIcon, TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
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
          'fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={clsx(
          'fixed right-0 top-0 h-full w-full max-w-md z-[70] bg-surface-800 border-l border-surface-600 flex flex-col transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-600">
          <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            <ShoppingBagIcon className="h-5 w-5 text-brand" />
            Cart
            {itemCount > 0 && (
              <span className="text-xs bg-brand text-surface-900 font-bold rounded-full px-1.5 py-0.5">
                {itemCount}
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-surface-700 transition-colors"
            aria-label="Close cart"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Free shipping progress */}
        {subtotal > 0 && (
          <div className="px-5 py-3 border-b border-surface-600 bg-surface-700">
            <div className="flex justify-between text-xs text-zinc-400 mb-1.5">
              {remaining > 0 ? (
                <span>Add <strong className="text-brand">${remaining.toFixed(2)}</strong> more for free shipping</span>
              ) : (
                <span className="text-green-400 font-medium">🎉 You qualify for free shipping!</span>
              )}
            </div>
            <div className="h-1.5 bg-surface-500 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingBagIcon className="h-14 w-14 text-surface-500 mb-4" />
              <p className="text-zinc-400 font-medium mb-1">Your cart is empty</p>
              <p className="text-zinc-600 text-sm mb-6">Add some products to get started</p>
              <button
                onClick={closeCart}
                className="btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.selectedFlavour}-${item.selectedNicotine}`} className="flex gap-3 p-3 bg-surface-700 rounded-xl border border-surface-500">
                <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-surface-600">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.product.slug}`}
                    onClick={closeCart}
                    className="text-sm font-medium text-zinc-100 hover:text-brand transition-colors line-clamp-2 leading-snug"
                  >
                    {item.product.name}
                  </Link>
                  {item.selectedFlavour && (
                    <p className="text-xs text-zinc-500 mt-0.5">{item.selectedFlavour}</p>
                  )}
                  {item.selectedNicotine && (
                    <p className="text-xs text-zinc-500">{item.selectedNicotine}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 bg-surface-600 rounded-lg border border-surface-500">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <MinusIcon className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium text-zinc-200 w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <PlusIcon className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-zinc-100">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1 text-zinc-600 hover:text-sale transition-colors"
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
          <div className="border-t border-surface-600 p-5 space-y-3">
            <div className="flex justify-between text-sm text-zinc-400">
              <span>Subtotal ({itemCount} items)</span>
              <span className="text-zinc-100 font-semibold">${subtotal.toFixed(2)} AUD</span>
            </div>
            {subtotal >= freeShippingThreshold && (
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Shipping</span>
                <span className="text-green-400 font-medium">FREE</span>
              </div>
            )}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full text-center block"
            >
              Checkout — ${subtotal.toFixed(2)} AUD
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="btn-secondary w-full text-center block"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}

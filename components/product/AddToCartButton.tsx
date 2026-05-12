'use client'

import { useState } from 'react'
import { ShoppingCartIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/types'
import clsx from 'clsx'

interface AddToCartButtonProps {
  product: Product
  selectedFlavour?: string
  selectedNicotine?: string
  compact?: boolean
}

export default function AddToCartButton({
  product,
  selectedFlavour,
  selectedNicotine,
  compact = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    if (!product.inStock) return
    addItem(product, selectedFlavour, selectedNicotine)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  if (compact) {
    return (
      <button
        onClick={(e) => { e.preventDefault(); handleAdd() }}
        disabled={!product.inStock || added}
        className={clsx(
          'w-full flex items-center justify-center gap-2 py-2 px-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-200 font-display',
          added ? 'bg-success text-white' : 'bg-white text-ink hover:bg-ink hover:text-white',
          !product.inStock && 'opacity-50 cursor-not-allowed'
        )}
      >
        {added ? (
          <><CheckIcon className="h-3.5 w-3.5" /> Added!</>
        ) : (
          <><ShoppingCartIcon className="h-3.5 w-3.5" /> Quick Add</>
        )}
      </button>
    )
  }

  return (
    <button
      onClick={handleAdd}
      disabled={!product.inStock || added}
      className={clsx(
        'flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-sm text-sm font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 font-display',
        added
          ? 'bg-success text-white'
          : product.inStock
          ? 'bg-price text-white hover:bg-sale'
          : 'bg-soft-200 text-mute cursor-not-allowed'
      )}
    >
      {added ? (
        <><CheckIcon className="h-5 w-5" /> Added to Cart!</>
      ) : product.inStock ? (
        <><ShoppingCartIcon className="h-5 w-5" /> Add to Cart — ${product.price.toFixed(2)}</>
      ) : (
        'Out of Stock'
      )}
    </button>
  )
}

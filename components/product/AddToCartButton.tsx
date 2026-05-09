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
          'w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200',
          added
            ? 'bg-green-600 text-white'
            : 'bg-brand text-surface-900 hover:bg-brand-dark',
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
        'flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95',
        added
          ? 'bg-green-600 text-white'
          : product.inStock
          ? 'bg-brand text-surface-900 hover:bg-brand-dark'
          : 'bg-surface-600 text-zinc-500 cursor-not-allowed'
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

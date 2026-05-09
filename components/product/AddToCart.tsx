'use client'

import { useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
import type { Product } from '@/types'
import AddToCartButton from './AddToCartButton'

interface AddToCartProps {
  product: Product
}

export default function AddToCart({ product }: AddToCartProps) {
  const [selectedFlavour, setSelectedFlavour] = useState(product.flavours?.[0])
  const [selectedNicotine, setSelectedNicotine] = useState(product.nicotineStrengths?.[0])
  const [wishlisted, setWishlisted] = useState(false)

  return (
    <div className="space-y-5">
      {/* Flavour selector */}
      {product.flavours && product.flavours.length > 0 && (
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
            Flavour — <span className="text-zinc-200 normal-case tracking-normal">{selectedFlavour}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {product.flavours.map((flavour) => (
              <button
                key={flavour}
                onClick={() => setSelectedFlavour(flavour)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  selectedFlavour === flavour
                    ? 'border-brand bg-brand/10 text-brand'
                    : 'border-surface-500 text-zinc-400 hover:border-brand/50 hover:text-zinc-200'
                }`}
              >
                {flavour}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Nicotine strength selector */}
      {product.nicotineStrengths && product.nicotineStrengths.length > 0 && (
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
            Nicotine Strength — <span className="text-zinc-200 normal-case tracking-normal">{selectedNicotine}</span>
          </label>
          <div className="flex gap-2">
            {product.nicotineStrengths.map((strength) => (
              <button
                key={strength}
                onClick={() => setSelectedNicotine(strength)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                  selectedNicotine === strength
                    ? 'border-brand bg-brand/10 text-brand'
                    : 'border-surface-500 text-zinc-400 hover:border-brand/50 hover:text-zinc-200'
                }`}
              >
                {strength}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA row */}
      <div className="flex gap-3">
        <AddToCartButton
          product={product}
          selectedFlavour={selectedFlavour}
          selectedNicotine={selectedNicotine}
        />
        <button
          onClick={() => setWishlisted((w) => !w)}
          className={`p-3.5 rounded-xl border transition-colors ${
            wishlisted
              ? 'border-sale bg-sale/10 text-sale'
              : 'border-surface-500 text-zinc-400 hover:border-brand/50 hover:text-brand'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <HeartIcon className="h-5 w-5" fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Trust row */}
      <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
        <span className="flex items-center gap-1">🚚 Fast AU dispatch</span>
        <span className="flex items-center gap-1">🔒 Secure checkout</span>
        <span className="flex items-center gap-1">↩️ 30-day returns</span>
      </div>
    </div>
  )
}

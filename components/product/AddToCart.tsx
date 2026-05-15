'use client'

import { useState } from 'react'
import { HeartIcon, TruckIcon, LockClosedIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
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
          <label className="block font-display text-xs font-bold text-ink uppercase tracking-widest mb-2">
            Flavour — <span className="text-mute normal-case tracking-normal font-normal">{selectedFlavour}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {product.flavours.map((flavour) => (
              <button
                key={flavour}
                onClick={() => setSelectedFlavour(flavour)}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium border transition-colors ${
                  selectedFlavour === flavour
                    ? 'border-ink bg-ink text-white'
                    : 'border-line text-body bg-white hover:border-ink'
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
          <label className="block font-display text-xs font-bold text-ink uppercase tracking-widest mb-2">
            Nicotine Strength — <span className="text-mute normal-case tracking-normal font-normal">{selectedNicotine}</span>
          </label>
          <div className="flex gap-2">
            {product.nicotineStrengths.map((strength) => (
              <button
                key={strength}
                onClick={() => setSelectedNicotine(strength)}
                className={`px-4 py-2 rounded-sm text-sm font-semibold border transition-colors ${
                  selectedNicotine === strength
                    ? 'border-ink bg-ink text-white'
                    : 'border-line text-body bg-white hover:border-ink'
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
          className={`p-3.5 rounded-sm border transition-colors ${
            wishlisted
              ? 'border-price bg-price/10 text-price'
              : 'border-line bg-white text-ink hover:border-ink'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <HeartIcon className="h-5 w-5" fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Trust row */}
      <div className="flex flex-wrap gap-4 text-xs text-mute font-display uppercase tracking-wider font-semibold">
        <span className="flex items-center gap-1.5">
          <TruckIcon className="h-4 w-4" /> Fast AU Dispatch
        </span>
        <span className="flex items-center gap-1.5">
          <LockClosedIcon className="h-4 w-4" /> Secure Checkout
        </span>
        <span className="flex items-center gap-1.5">
          <ArrowUturnLeftIcon className="h-4 w-4" /> 30-Day Returns
        </span>
      </div>
    </div>
  )
}

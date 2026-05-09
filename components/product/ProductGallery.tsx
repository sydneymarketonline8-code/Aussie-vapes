'use client'

import { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0)

  if (!images.length) return null

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-600 border border-surface-500">
        <Image
          src={images[selected]}
          alt={`${productName} — image ${selected + 1}`}
          fill
          priority
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
          unoptimized
        />
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 text-xs bg-surface-900/80 text-zinc-300 px-2 py-1 rounded-full">
            {selected + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={clsx(
                'relative h-16 w-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-colors',
                i === selected
                  ? 'border-brand'
                  : 'border-surface-500 hover:border-surface-400'
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

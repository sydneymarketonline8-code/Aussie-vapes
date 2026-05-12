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
      <div className="relative aspect-square rounded-sm overflow-hidden bg-soft-100 border border-line">
        <Image
          src={images[selected]}
          alt={`${productName} — image ${selected + 1}`}
          fill
          priority
          className="object-contain p-8 transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
          unoptimized
        />
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 text-xs bg-white text-ink px-2 py-1 rounded-sm border border-line shadow-sm">
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
                'relative h-16 w-16 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-colors bg-soft-100',
                i === selected ? 'border-ink' : 'border-line hover:border-ink/50'
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-contain p-1"
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

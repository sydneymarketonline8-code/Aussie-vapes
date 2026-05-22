'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { PhotoIcon } from '@heroicons/react/24/outline'

type Props = Omit<ImageProps, 'src'> & {
  src: string | null | undefined
  containerClassName?: string
}

/**
 * Wraps next/image with an onError fallback that renders a neutral
 * "missing photo" placeholder. Use anywhere a product image might 404 —
 * e.g. catalogue rows that were bulk-imported with stale local paths.
 */
export default function ProductImage({ src, alt, containerClassName, ...rest }: Props) {
  const [errored, setErrored] = useState(false)

  if (!src || errored) {
    return (
      <div className={`flex items-center justify-center bg-soft-100 ${containerClassName ?? 'absolute inset-0'}`}>
        <PhotoIcon className="h-8 w-8 text-mute opacity-40" />
      </div>
    )
  }

  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
    />
  )
}

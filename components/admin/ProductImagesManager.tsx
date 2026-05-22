'use client'

import { useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { PhotoIcon, StarIcon, TrashIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'
import {
  uploadProductImage,
  deleteProductImage,
  setPrimaryProductImage,
} from '@/app/admin/products/[slug]/image-actions'

export interface ProductImageRow {
  id: string
  url: string
  position: number
}

interface Props {
  productId: string
  images: ProductImageRow[]
}

export default function ProductImagesManager({ productId, images }: Props) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [pending, startTransition] = useTransition()
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const sorted = images.slice().sort((a, b) => a.position - b.position)

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    const formData = new FormData()
    formData.append('file', file)
    startTransition(async () => {
      const result = await uploadProductImage(productId, formData)
      if (!result.ok) setError(result.error)
      if (fileInputRef.current) fileInputRef.current.value = ''
      router.refresh()
    })
  }

  function onDelete(image: ProductImageRow) {
    if (!confirm('Delete this image? The file will be removed from storage.')) return
    setError(null)
    setBusyId(image.id)
    startTransition(async () => {
      const result = await deleteProductImage(image.id)
      if (!result.ok) setError(result.error)
      setBusyId(null)
      router.refresh()
    })
  }

  function onMakePrimary(image: ProductImageRow) {
    if (image.position === 0) return
    setError(null)
    setBusyId(image.id)
    startTransition(async () => {
      const result = await setPrimaryProductImage(image.id)
      if (!result.ok) setError(result.error)
      setBusyId(null)
      router.refresh()
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block font-display text-[10px] uppercase tracking-widest font-bold text-mute">
          Product Images
        </label>
        <p className="text-xs text-mute">PNG, JPG, WEBP or GIF · up to 10 MB</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {sorted.map((img) => {
          const isPrimary = img.position === 0
          const rowBusy = pending && busyId === img.id
          return (
            <div
              key={img.id}
              className={`relative aspect-square bg-soft-100 border border-line rounded-sm overflow-hidden group ${rowBusy ? 'opacity-50' : ''}`}
            >
              <Image
                src={img.url}
                alt=""
                fill
                sizes="160px"
                className="object-contain p-2"
                unoptimized
              />
              {isPrimary && (
                <span className="absolute top-1 left-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-ink text-white text-[9px] font-display font-bold uppercase tracking-wider">
                  <StarSolid className="h-3 w-3" /> Primary
                </span>
              )}
              <div className="absolute inset-x-1 bottom-1 flex items-center justify-between gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {!isPrimary && (
                  <button
                    type="button"
                    onClick={() => onMakePrimary(img)}
                    disabled={rowBusy}
                    title="Set as primary"
                    className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 rounded-sm bg-white border border-line text-ink text-[10px] font-display font-bold uppercase tracking-wider hover:bg-soft-50"
                  >
                    <StarIcon className="h-3 w-3" /> Primary
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onDelete(img)}
                  disabled={rowBusy}
                  title="Delete image"
                  className="inline-flex items-center justify-center px-2 py-1 rounded-sm bg-sale text-white text-[10px] font-display font-bold uppercase tracking-wider hover:bg-sale/90"
                >
                  <TrashIcon className="h-3 w-3" />
                </button>
              </div>
            </div>
          )
        })}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={pending}
          className="aspect-square border-2 border-dashed border-line rounded-sm flex flex-col items-center justify-center gap-1 text-mute hover:bg-soft-50 hover:border-ink disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending && !busyId ? (
            <>
              <span className="font-display text-[10px] uppercase tracking-wider font-bold">Uploading…</span>
            </>
          ) : (
            <>
              <PhotoIcon className="h-6 w-6" />
              <span className="font-display text-[10px] uppercase tracking-wider font-bold">Upload</span>
            </>
          )}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        aria-label="Upload product image"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={onPickFile}
      />

      {error && <p className="mt-3 text-xs text-sale">{error}</p>}
      <p className="text-xs text-mute mt-3">
        The first image is used as the thumbnail on product cards, search results and the cart.
      </p>
    </div>
  )
}

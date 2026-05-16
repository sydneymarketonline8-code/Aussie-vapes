'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Product } from '@/types'
import {
  DocumentTextIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
  PhotoIcon,
  ListBulletIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

type TabKey = 'general' | 'pricing' | 'inventory' | 'images' | 'specs' | 'seo'

const TABS: { key: TabKey; label: string; Icon: typeof DocumentTextIcon }[] = [
  { key: 'general', label: 'General', Icon: DocumentTextIcon },
  { key: 'pricing', label: 'Pricing', Icon: CurrencyDollarIcon },
  { key: 'inventory', label: 'Inventory', Icon: ArchiveBoxIcon },
  { key: 'images', label: 'Images', Icon: PhotoIcon },
  { key: 'specs', label: 'Specifications', Icon: ListBulletIcon },
  { key: 'seo', label: 'SEO', Icon: GlobeAltIcon },
]

interface ProductFormProps {
  product?: Product
  mode: 'create' | 'edit'
}

export default function ProductForm({ product, mode }: ProductFormProps) {
  const [tab, setTab] = useState<TabKey>('general')

  const isReadOnly = true // No backend wired — keep all fields read-only for now

  const labelCls = 'block font-display text-[10px] uppercase tracking-widest font-bold text-mute mb-1'
  const inputCls =
    'w-full bg-white border border-line rounded-sm px-3 py-2 text-sm text-body focus:outline-none focus:border-ink disabled:bg-soft-50 disabled:text-mute'
  const textareaCls = `${inputCls} min-h-[100px] leading-relaxed`

  return (
    <div className="bg-white border border-line rounded-sm">
      {/* Tabs */}
      <div className="flex flex-wrap border-b border-line bg-soft-50">
        {TABS.map(({ key, label, Icon }) => {
          const active = tab === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-5 py-3 font-display text-xs font-bold uppercase tracking-wider border-b-2 -mb-px transition-colors ${
                active
                  ? 'border-price text-ink bg-white'
                  : 'border-transparent text-mute hover:text-ink hover:bg-white/60'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          )
        })}
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        {tab === 'general' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Product Name *</label>
                <input
                  className={inputCls}
                  defaultValue={product?.name}
                  disabled={isReadOnly}
                  placeholder="e.g. Lost Mary MT15000 Turbo"
                />
              </div>
              <div>
                <label className={labelCls}>Slug</label>
                <input
                  className={inputCls}
                  defaultValue={product?.slug}
                  disabled={isReadOnly}
                  placeholder="lost-mary-mt15000-turbo"
                />
              </div>
              <div>
                <label className={labelCls}>Brand *</label>
                <input className={inputCls} defaultValue={product?.brand} disabled={isReadOnly} />
              </div>
              <div>
                <label className={labelCls}>Category *</label>
                <input className={inputCls} defaultValue={product?.category} disabled={isReadOnly} />
              </div>
              <div>
                <label className={labelCls}>Subcategory</label>
                <input className={inputCls} defaultValue={product?.subcategory ?? ''} disabled={isReadOnly} />
              </div>
              <div>
                <label className={labelCls}>Tags (comma separated)</label>
                <input
                  className={inputCls}
                  defaultValue={product?.tags.join(', ')}
                  disabled={isReadOnly}
                  placeholder="disposable, rechargeable, 15000 puffs"
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Short Description</label>
              <textarea
                className={textareaCls}
                rows={3}
                defaultValue={product?.shortDescription}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <label className={labelCls}>Full Description</label>
              <textarea
                className={textareaCls}
                rows={8}
                defaultValue={product?.description}
                disabled={isReadOnly}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <FlagToggle label="Active" enabled={product?.inStock ?? true} disabled={isReadOnly} />
              <FlagToggle label="New" enabled={!!product?.isNew} disabled={isReadOnly} />
              <FlagToggle label="Best Seller" enabled={!!product?.isBestSeller} disabled={isReadOnly} />
              <FlagToggle label="On Sale" enabled={!!product?.isSale} disabled={isReadOnly} />
            </div>
          </>
        )}

        {tab === 'pricing' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
            <div>
              <label className={labelCls}>Price (AUD) *</label>
              <input
                type="number"
                step="0.01"
                className={inputCls}
                defaultValue={product?.price}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <label className={labelCls}>Compare-at Price</label>
              <input
                type="number"
                step="0.01"
                className={inputCls}
                defaultValue={product?.comparePrice ?? ''}
                disabled={isReadOnly}
                placeholder="Crossed-out RRP"
              />
            </div>
            <div className="md:col-span-2 mt-2 p-4 bg-soft-50 border border-line rounded-sm text-xs text-mute">
              When a Compare-at price is set and is higher than Price, the product page shows a
              discount badge automatically.
            </div>
          </div>
        )}

        {tab === 'inventory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
            <div>
              <label className={labelCls}>SKU *</label>
              <input className={inputCls} defaultValue={product?.sku} disabled={isReadOnly} />
            </div>
            <div>
              <label className={labelCls}>Stock Count</label>
              <input
                type="number"
                className={inputCls}
                defaultValue={product?.stockCount ?? 0}
                disabled={isReadOnly}
              />
            </div>
            <FlagToggle label="In Stock" enabled={product?.inStock ?? true} disabled={isReadOnly} />
            <div className="md:col-span-2 mt-2 p-4 bg-soft-50 border border-line rounded-sm text-xs text-mute">
              Products with stock below 20 are flagged in the dashboard low-stock list. Out-of-stock
              products remain on the public site but cannot be added to cart.
            </div>
          </div>
        )}

        {tab === 'images' && (
          <div>
            <label className={labelCls}>Product Images</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(product?.images ?? []).map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative aspect-square bg-soft-100 border border-line rounded-sm overflow-hidden group"
                >
                  <Image
                    src={src}
                    alt={`Image ${i + 1}`}
                    fill
                    sizes="160px"
                    className="object-contain p-2"
                    unoptimized
                  />
                  {i === 0 && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-sm bg-ink text-white text-[9px] font-display font-bold uppercase tracking-wider">
                      Primary
                    </span>
                  )}
                </div>
              ))}
              <button
                type="button"
                disabled
                title="Requires backend"
                className="aspect-square border-2 border-dashed border-line rounded-sm flex flex-col items-center justify-center gap-1 text-mute cursor-not-allowed hover:bg-soft-50"
              >
                <PhotoIcon className="h-6 w-6" />
                <span className="font-display text-[10px] uppercase tracking-wider font-bold">Upload</span>
              </button>
            </div>
            <p className="text-xs text-mute mt-3">
              The first image is used as the thumbnail on product cards, search results and the cart.
            </p>
          </div>
        )}

        {tab === 'specs' && (
          <div className="space-y-5">
            <div>
              <label className={labelCls}>Features (one per line)</label>
              <textarea
                className={textareaCls}
                rows={6}
                defaultValue={(product?.features ?? []).join('\n')}
                disabled={isReadOnly}
                placeholder={`15,000 puffs\nMesh coil\nRechargeable USB-C\nAdjustable airflow`}
              />
            </div>
            <div>
              <label className={labelCls}>Specifications</label>
              <div className="bg-soft-50 border border-line rounded-sm divide-y divide-line">
                {Object.entries(product?.specifications ?? {}).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-2 gap-3 px-4 py-2">
                    <input
                      className="bg-transparent text-sm font-display font-bold text-ink focus:outline-none"
                      defaultValue={k}
                      disabled={isReadOnly}
                    />
                    <input
                      className="bg-transparent text-sm text-body focus:outline-none"
                      defaultValue={v}
                      disabled={isReadOnly}
                    />
                  </div>
                ))}
                {Object.keys(product?.specifications ?? {}).length === 0 && (
                  <p className="px-4 py-3 text-xs text-mute">No specifications added yet.</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Flavours (comma separated)</label>
                <input
                  className={inputCls}
                  defaultValue={(product?.flavours ?? []).join(', ')}
                  disabled={isReadOnly}
                  placeholder="Mango Ice, Watermelon, Grape"
                />
              </div>
              <div>
                <label className={labelCls}>Nicotine Strengths</label>
                <input
                  className={inputCls}
                  defaultValue={(product?.nicotineStrengths ?? []).join(', ')}
                  disabled={isReadOnly}
                  placeholder="20mg, 50mg"
                />
              </div>
            </div>
          </div>
        )}

        {tab === 'seo' && (
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className={labelCls}>SEO Title</label>
              <input className={inputCls} defaultValue={product?.seoTitle} disabled={isReadOnly} />
              <p className="text-[11px] text-mute mt-1">
                Recommended ≤ 60 characters. Current:{' '}
                <strong>{product?.seoTitle?.length ?? 0}</strong>
              </p>
            </div>
            <div>
              <label className={labelCls}>SEO Description</label>
              <textarea
                className={textareaCls}
                rows={4}
                defaultValue={product?.seoDescription}
                disabled={isReadOnly}
              />
              <p className="text-[11px] text-mute mt-1">
                Recommended ≤ 160 characters. Current:{' '}
                <strong>{product?.seoDescription?.length ?? 0}</strong>
              </p>
            </div>
            <div>
              <label className={labelCls}>Canonical Slug</label>
              <input className={inputCls} defaultValue={product?.slug} disabled={isReadOnly} />
              <p className="text-[11px] text-mute mt-1">
                Public URL: <code className="font-mono">/product/{product?.slug ?? 'your-slug'}</code>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-line bg-soft-50">
        <p className="text-xs text-mute">
          {mode === 'edit' ? `Editing ${product?.name}` : 'New product draft'} ·{' '}
          <span className="text-warning font-display font-bold uppercase tracking-wider">
            Read-only — requires backend
          </span>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled
            title="Requires backend"
            className="px-4 py-2 rounded-sm border border-line text-mute font-display text-xs font-bold uppercase tracking-wider cursor-not-allowed"
          >
            Discard
          </button>
          <button
            type="button"
            disabled
            title="Requires backend"
            className="px-4 py-2 rounded-sm bg-price/70 text-white font-display text-xs font-bold uppercase tracking-wider cursor-not-allowed"
          >
            {mode === 'edit' ? 'Save Changes' : 'Create Product'}
          </button>
        </div>
      </div>
    </div>
  )
}

function FlagToggle({
  label,
  enabled,
  disabled,
}: {
  label: string
  enabled: boolean
  disabled?: boolean
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-3 py-2 rounded-sm border ${
        enabled ? 'border-success/40 bg-success/5' : 'border-line bg-white'
      } ${disabled ? 'opacity-90' : ''}`}
    >
      <span className="font-display text-xs font-bold uppercase tracking-wider text-ink">{label}</span>
      {enabled ? (
        <CheckCircleIcon className="h-5 w-5 text-success" />
      ) : (
        <XMarkIcon className="h-5 w-5 text-mute" />
      )}
    </div>
  )
}

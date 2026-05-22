'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
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
import { updateProduct, type UpdateProductInput } from '@/app/admin/products/[slug]/actions'
import ProductImagesManager, { type ProductImageRow } from './ProductImagesManager'

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
  productImages?: ProductImageRow[]
}

interface FormState {
  name: string
  slug: string
  brand: string
  category: string
  subcategory: string
  tags: string
  shortDescription: string
  description: string
  price: string
  comparePrice: string
  sku: string
  stockCount: string
  inStock: boolean
  status: 'draft' | 'active' | 'archived'
  isNew: boolean
  isBestSeller: boolean
  isSale: boolean
  features: string
  flavours: string
  nicotineStrengths: string
  seoTitle: string
  seoDescription: string
}

function initialState(p?: Product): FormState {
  return {
    name: p?.name ?? '',
    slug: p?.slug ?? '',
    brand: p?.brand ?? '',
    category: p?.category ?? '',
    subcategory: p?.subcategory ?? '',
    tags: (p?.tags ?? []).join(', '),
    shortDescription: p?.shortDescription ?? '',
    description: p?.description ?? '',
    price: p?.price?.toString() ?? '',
    comparePrice: p?.comparePrice?.toString() ?? '',
    sku: p?.sku ?? '',
    stockCount: p?.stockCount?.toString() ?? '',
    inStock: p?.inStock ?? true,
    status: 'active',
    isNew: !!p?.isNew,
    isBestSeller: !!p?.isBestSeller,
    isSale: !!p?.isSale,
    features: (p?.features ?? []).join('\n'),
    flavours: (p?.flavours ?? []).join(', '),
    nicotineStrengths: (p?.nicotineStrengths ?? []).join(', '),
    seoTitle: p?.seoTitle ?? '',
    seoDescription: p?.seoDescription ?? '',
  }
}

function splitCsv(s: string): string[] {
  return s.split(',').map((x) => x.trim()).filter(Boolean)
}

function splitLines(s: string): string[] {
  return s.split('\n').map((x) => x.trim()).filter(Boolean)
}

export default function ProductForm({ product, mode, productImages = [] }: ProductFormProps) {
  const router = useRouter()
  const [tab, setTab] = useState<TabKey>('general')
  const [form, setForm] = useState<FormState>(initialState(product))
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  // Create mode isn't implemented yet — keep its fields read-only.
  const isCreate = mode === 'create'
  const canEdit = !isCreate && !!product?.id

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }))
    setSaved(false)
  }

  function onSave() {
    if (!product?.id) return
    setError(null)
    setSaved(false)
    const input: UpdateProductInput = {
      name: form.name,
      shortDescription: form.shortDescription,
      description: form.description,
      tags: splitCsv(form.tags),
      price: Number(form.price),
      comparePrice: form.comparePrice.trim() ? Number(form.comparePrice) : null,
      sku: form.sku,
      stockCount: form.stockCount.trim() ? Number(form.stockCount) : null,
      inStock: form.inStock,
      status: form.status,
      isNew: form.isNew,
      isBestSeller: form.isBestSeller,
      isSale: form.isSale,
      features: splitLines(form.features),
      flavours: splitCsv(form.flavours),
      nicotineStrengths: splitCsv(form.nicotineStrengths),
      seoTitle: form.seoTitle,
      seoDescription: form.seoDescription,
    }
    startTransition(async () => {
      const result = await updateProduct(product.id, input)
      if (!result.ok) {
        setError(result.error)
        return
      }
      setSaved(true)
      router.refresh()
    })
  }

  function onDiscard() {
    setForm(initialState(product))
    setError(null)
    setSaved(false)
  }

  const labelCls = 'block font-display text-[10px] uppercase tracking-widest font-bold text-mute mb-1'
  const inputCls =
    'w-full bg-white border border-line rounded-sm px-3 py-2 text-sm text-body focus:outline-none focus:border-ink disabled:bg-soft-50 disabled:text-mute'
  const textareaCls = `${inputCls} min-h-[100px] leading-relaxed`
  const ro = !canEdit

  return (
    <div className="bg-white border border-line rounded-sm">
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

      <div className="p-6 space-y-5">
        {tab === 'general' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Product Name *</label>
                <input
                  className={inputCls}
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  disabled={ro}
                />
              </div>
              <div>
                <label className={labelCls}>Slug <span className="text-mute normal-case text-[10px]">(read-only)</span></label>
                <input className={inputCls} value={form.slug} disabled />
              </div>
              <div>
                <label className={labelCls}>Brand <span className="text-mute normal-case text-[10px]">(read-only)</span></label>
                <input className={inputCls} value={form.brand} disabled />
              </div>
              <div>
                <label className={labelCls}>Category <span className="text-mute normal-case text-[10px]">(read-only)</span></label>
                <input className={inputCls} value={form.category} disabled />
              </div>
              <div>
                <label className={labelCls}>Subcategory <span className="text-mute normal-case text-[10px]">(read-only)</span></label>
                <input className={inputCls} value={form.subcategory} disabled />
              </div>
              <div>
                <label className={labelCls}>Tags (comma separated)</label>
                <input
                  className={inputCls}
                  value={form.tags}
                  onChange={(e) => set('tags', e.target.value)}
                  disabled={ro}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Short Description</label>
              <textarea
                className={textareaCls}
                rows={3}
                value={form.shortDescription}
                onChange={(e) => set('shortDescription', e.target.value)}
                disabled={ro}
              />
            </div>
            <div>
              <label className={labelCls}>Full Description</label>
              <textarea
                className={textareaCls}
                rows={8}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                disabled={ro}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <FlagToggle label="New" enabled={form.isNew} onChange={(v) => set('isNew', v)} disabled={ro} />
              <FlagToggle label="Best Seller" enabled={form.isBestSeller} onChange={(v) => set('isBestSeller', v)} disabled={ro} />
              <FlagToggle label="On Sale" enabled={form.isSale} onChange={(v) => set('isSale', v)} disabled={ro} />
              <div>
                <label className={labelCls}>Status</label>
                <select
                  aria-label="Product status"
                  className={inputCls}
                  value={form.status}
                  onChange={(e) => set('status', e.target.value as FormState['status'])}
                  disabled={ro}
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
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
                min="0"
                className={inputCls}
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                disabled={ro}
              />
            </div>
            <div>
              <label className={labelCls}>Compare-at Price</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className={inputCls}
                value={form.comparePrice}
                onChange={(e) => set('comparePrice', e.target.value)}
                placeholder="Crossed-out RRP"
                disabled={ro}
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
              <input
                className={inputCls}
                value={form.sku}
                onChange={(e) => set('sku', e.target.value)}
                disabled={ro}
              />
            </div>
            <div>
              <label className={labelCls}>Stock Count</label>
              <input
                type="number"
                min="0"
                className={inputCls}
                value={form.stockCount}
                onChange={(e) => set('stockCount', e.target.value)}
                disabled={ro}
              />
            </div>
            <FlagToggle label="In Stock" enabled={form.inStock} onChange={(v) => set('inStock', v)} disabled={ro} />
            <div className="md:col-span-2 mt-2 p-4 bg-soft-50 border border-line rounded-sm text-xs text-mute">
              Products with stock below 20 are flagged in the dashboard low-stock list. Out-of-stock
              products remain on the public site but cannot be added to cart.
            </div>
          </div>
        )}

        {tab === 'images' && (
          product?.id ? (
            <ProductImagesManager productId={product.id} images={productImages} />
          ) : (
            <p className="text-sm text-mute">Save the product first, then upload images.</p>
          )
        )}

        {tab === 'specs' && (
          <div className="space-y-5">
            <div>
              <label className={labelCls}>Features (one per line)</label>
              <textarea
                className={textareaCls}
                rows={6}
                value={form.features}
                onChange={(e) => set('features', e.target.value)}
                disabled={ro}
                placeholder={`15,000 puffs\nMesh coil\nRechargeable USB-C\nAdjustable airflow`}
              />
            </div>
            <div>
              <label className={labelCls}>Specifications <span className="text-mute normal-case text-[10px]">(read-only)</span></label>
              <div className="bg-soft-50 border border-line rounded-sm divide-y divide-line">
                {Object.entries(product?.specifications ?? {}).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-2 gap-3 px-4 py-2">
                    <span className="text-sm font-display font-bold text-ink">{k}</span>
                    <span className="text-sm text-body">{v}</span>
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
                  value={form.flavours}
                  onChange={(e) => set('flavours', e.target.value)}
                  disabled={ro}
                  placeholder="Mango Ice, Watermelon, Grape"
                />
              </div>
              <div>
                <label className={labelCls}>Nicotine Strengths</label>
                <input
                  className={inputCls}
                  value={form.nicotineStrengths}
                  onChange={(e) => set('nicotineStrengths', e.target.value)}
                  disabled={ro}
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
              <input
                className={inputCls}
                value={form.seoTitle}
                onChange={(e) => set('seoTitle', e.target.value)}
                disabled={ro}
              />
              <p className="text-[11px] text-mute mt-1">
                Recommended ≤ 60 characters. Current:{' '}
                <strong>{form.seoTitle.length}</strong>
              </p>
            </div>
            <div>
              <label className={labelCls}>SEO Description</label>
              <textarea
                className={textareaCls}
                rows={4}
                value={form.seoDescription}
                onChange={(e) => set('seoDescription', e.target.value)}
                disabled={ro}
              />
              <p className="text-[11px] text-mute mt-1">
                Recommended ≤ 160 characters. Current:{' '}
                <strong>{form.seoDescription.length}</strong>
              </p>
            </div>
            <div>
              <label className={labelCls}>Canonical Slug</label>
              <input className={inputCls} value={form.slug} disabled />
              <p className="text-[11px] text-mute mt-1">
                Public URL: <code className="font-mono">/product/{form.slug || 'your-slug'}</code>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t border-line bg-soft-50">
        <p className="text-xs text-mute flex items-center gap-2">
          {isCreate ? (
            <>
              New product draft ·{' '}
              <span className="text-warning font-display font-bold uppercase tracking-wider">
                Create not wired yet — use the import script
              </span>
            </>
          ) : (
            <>
              Editing {product?.name}
              {saved && <span className="text-success font-display font-bold uppercase tracking-wider ml-2">✓ Saved</span>}
              {error && <span className="text-sale ml-2">{error}</span>}
            </>
          )}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDiscard}
            disabled={!canEdit || pending}
            className="px-4 py-2 rounded-sm border border-line text-ink font-display text-xs font-bold uppercase tracking-wider hover:bg-soft-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!canEdit || pending}
            className="px-4 py-2 rounded-sm bg-price text-white font-display text-xs font-bold uppercase tracking-wider hover:bg-sale transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pending ? 'Saving…' : isCreate ? 'Create Product' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

function FlagToggle({
  label,
  enabled,
  onChange,
  disabled,
}: {
  label: string
  enabled: boolean
  onChange?: (v: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={() => onChange?.(!enabled)}
      disabled={disabled}
      className={`flex items-center justify-between gap-3 px-3 py-2 rounded-sm border w-full text-left transition-colors ${
        enabled ? 'border-success/40 bg-success/5 hover:bg-success/10' : 'border-line bg-white hover:bg-soft-50'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      <span className="font-display text-xs font-bold uppercase tracking-wider text-ink">{label}</span>
      {enabled ? (
        <CheckCircleIcon className="h-5 w-5 text-success" />
      ) : (
        <XMarkIcon className="h-5 w-5 text-mute" />
      )}
    </button>
  )
}

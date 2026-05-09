'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

const slides = [
  {
    eyebrow: 'New Arrival',
    heading: 'CloudBurst Pro 10,000',
    subheading: 'Dual mesh coil. 15 flavours. 650mAh rechargeable. The ultimate Australian disposable.',
    cta: { label: 'Shop Now', href: '/product/cloudburst-pro-10000' },
    ctaSecondary: { label: 'All Disposables', href: '/category/disposable-vapes' },
    badge: '10,000 Puffs',
    accent: 'from-cyan-500/20 to-transparent',
  },
  {
    eyebrow: 'Best Seller',
    heading: 'NovaPod X4 Kit',
    subheading: 'Australia\'s favourite refillable pod — 1500mAh, 40W, OLED display, top-fill pod. Now on sale.',
    cta: { label: 'Shop the Kit', href: '/product/novapod-x4-kit' },
    ctaSecondary: { label: 'All Pod Systems', href: '/category/pod-systems' },
    badge: 'On Sale — $79.95',
    accent: 'from-blue-500/20 to-transparent',
  },
  {
    eyebrow: 'Restock Alert',
    heading: 'SaltSurge 30mL',
    subheading: 'Premium Australian nicotine salt. 12 flavours, 25mg & 50mg. The smoothest throat hit in the range.',
    cta: { label: 'Shop Nic Salts', href: '/category/nicotine-salts' },
    ctaSecondary: { label: 'View Product', href: '/product/saltsurge-30ml' },
    badge: 'From $24.95',
    accent: 'from-purple-500/20 to-transparent',
  },
]

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [paused])

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  const slide = slides[current]

  return (
    <section
      className="relative overflow-hidden bg-surface-800 border-b border-surface-600"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Featured promotions"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className={clsx('absolute inset-0 bg-gradient-to-r', slide.accent, 'transition-all duration-700')} />

      <div className="container-site relative py-16 sm:py-24 lg:py-32">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-brand" />
            <span className="text-brand text-xs font-semibold uppercase tracking-widest">{slide.eyebrow}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-50 tracking-tight leading-none mb-4 transition-all duration-500">
            {slide.heading}
          </h1>

          {/* Subheading */}
          <p className="text-zinc-400 text-lg leading-relaxed mb-3 max-w-xl">{slide.subheading}</p>

          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-brand/40 bg-brand/10 text-brand text-sm font-semibold mb-8">
            {slide.badge}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link href={slide.cta.href} className="btn-primary text-base px-7 py-3.5">
              {slide.cta.label}
            </Link>
            <Link href={slide.ctaSecondary.href} className="btn-secondary text-base px-7 py-3.5">
              {slide.ctaSecondary.label}
            </Link>
          </div>
        </div>

        {/* Nav arrows */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-2">
          <button
            onClick={prev}
            className="p-2 rounded-lg bg-surface-700/80 border border-surface-500 text-zinc-400 hover:text-brand hover:border-brand/50 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-lg bg-surface-700/80 border border-surface-500 text-zinc-400 hover:text-brand hover:border-brand/50 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={clsx(
                'h-1 rounded-full transition-all duration-300',
                i === current ? 'w-8 bg-brand' : 'w-3 bg-surface-500 hover:bg-surface-400'
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

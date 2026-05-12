'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

const slides = [
  {
    eyebrow: 'Featured Disposable',
    heading: 'IGET Bar Plus 6000',
    subheading: 'Premium 6,000-puff rechargeable disposable. Mesh coil flavour, 20mg salt nic, fast Australia-wide shipping.',
    cta: { label: 'Shop Now', href: '/category/disposable-vapes' },
    ctaSecondary: { label: 'View All Brands', href: '/category/disposable-vapes' },
    badge: 'From $32.95',
    bg: 'linear-gradient(135deg, #fef3f3 0%, #ffffff 60%)',
    accent: '#ff0000',
  },
  {
    eyebrow: 'Best Seller',
    heading: 'Alfakher Crown Bar 15,000',
    subheading: 'The ultimate big-puff disposable. Adjustable airflow, mega capacity, 15+ flavour options in stock now.',
    cta: { label: 'Shop the Range', href: '/category/disposable-vapes' },
    ctaSecondary: { label: 'See Pack Deals', href: '/category/disposable-vapes' },
    badge: 'Save 20% on 3-Packs',
    bg: 'linear-gradient(135deg, #f4f8ff 0%, #ffffff 60%)',
    accent: '#2fb5d2',
  },
  {
    eyebrow: 'New Arrival',
    heading: 'Lost Mary 7000 Puffs',
    subheading: 'Sleek pocket-friendly design with USB-C charging. 7 fresh fruit & menthol profiles available.',
    cta: { label: 'Discover Lost Mary', href: '/category/disposable-vapes' },
    ctaSecondary: { label: 'All New Arrivals', href: '/new-arrivals' },
    badge: 'Just Landed',
    bg: 'linear-gradient(135deg, #f5fbf3 0%, #ffffff 60%)',
    accent: '#4cbb6c',
  },
]

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000)
    return () => clearInterval(id)
  }, [paused])

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  const slide = slides[current]

  return (
    <section
      className="relative overflow-hidden border-b border-line"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Featured promotions"
      style={{ background: slide.bg, transition: 'background 0.6s ease' }}
    >
      <div className="container-site relative py-16 sm:py-24 lg:py-32 min-h-[480px]">
        <div className="max-w-2xl relative z-10">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-8" style={{ background: slide.accent }} />
            <span
              className="font-display text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: slide.accent }}
            >
              {slide.eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-dark tracking-tight leading-[1.05] mb-6 transition-all duration-500">
            {slide.heading}
          </h1>

          {/* Subheading */}
          <p className="text-body text-base sm:text-lg leading-relaxed mb-6 max-w-xl">{slide.subheading}</p>

          {/* Badge */}
          <div
            className="inline-flex items-center px-4 py-1.5 rounded-sm font-display font-bold text-sm uppercase tracking-wider mb-8 text-white"
            style={{ background: slide.accent }}
          >
            {slide.badge}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link href={slide.cta.href} className="btn-primary text-base px-8 py-3.5">
              {slide.cta.label}
            </Link>
            <Link href={slide.ctaSecondary.href} className="btn-secondary text-base px-8 py-3.5">
              {slide.ctaSecondary.label}
            </Link>
          </div>
        </div>

        {/* Nav arrows */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3">
          <button
            onClick={prev}
            className="p-3 rounded-full bg-white border border-line text-ink shadow-sm hover:bg-ink hover:text-white hover:border-ink transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            className="p-3 rounded-full bg-white border border-line text-ink shadow-sm hover:bg-ink hover:text-white hover:border-ink transition-colors"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-10 absolute bottom-8 left-1/2 -translate-x-1/2 sm:relative sm:bottom-auto sm:left-auto sm:translate-x-0">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={clsx(
                'h-2 rounded-full transition-all duration-300',
                i === current ? 'w-10 bg-ink' : 'w-2 bg-line hover:bg-mute'
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import HeroCollage from '@/components/ui/HeroCollage'
import type { Product } from '@/types'

export interface HeroSlide {
  eyebrow: string
  heading: string
  subheading: string
  cta: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  badge: string
  bg: string
  accent: string
  products: Product[]
}

interface HeroBannerProps {
  slides: HeroSlide[]
}

export default function HeroBanner({ slides }: HeroBannerProps) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000)
    return () => clearInterval(id)
  }, [paused, slides.length])

  if (slides.length === 0) return null

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
      <div className="container-site relative py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-12 items-center min-h-[420px]">
          {/* Copy */}
          <div key={`copy-${current}`} className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 mb-5 animate-fade-up">
              <span className="h-px w-8" style={{ background: slide.accent }} />
              <span
                className="font-display text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: slide.accent }}
              >
                {slide.eyebrow}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-dark tracking-tight leading-[1.05] mb-6 animate-fade-up-delay-1">
              {slide.heading}
            </h1>

            <p className="text-body text-base sm:text-lg leading-relaxed mb-6 animate-fade-up-delay-2">
              {slide.subheading}
            </p>

            <div
              className="inline-flex items-center px-4 py-1.5 rounded-sm font-display font-bold text-sm uppercase tracking-wider mb-8 text-white animate-fade-up-delay-3"
              style={{ background: slide.accent }}
            >
              {slide.badge}
            </div>

            <div className="flex flex-wrap gap-3 animate-fade-up-delay-4">
              <Link href={slide.cta.href} className="btn-primary text-base px-8 py-3.5">
                {slide.cta.label}
              </Link>
              <Link href={slide.ctaSecondary.href} className="btn-secondary text-base px-8 py-3.5">
                {slide.ctaSecondary.label}
              </Link>
            </div>
          </div>

          {/* Product collage */}
          <div key={`collage-${current}`} className="w-full lg:w-[420px] animate-zoom-in">
            <HeroCollage products={slide.products} accentColor={slide.accent} />
          </div>
        </div>

        {/* Nav arrows */}
        <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3 z-20">
          <button
            type="button"
            onClick={prev}
            className="p-3 rounded-full bg-white border border-line text-ink shadow-sm hover:bg-ink hover:text-white hover:border-ink transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            className="p-3 rounded-full bg-white border border-line text-ink shadow-sm hover:bg-ink hover:text-white hover:border-ink transition-colors"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-6 justify-center lg:justify-start">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
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

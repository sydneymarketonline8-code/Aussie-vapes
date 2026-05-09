'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'
import MegaMenu from './MegaMenu'
import { CATEGORIES } from '@/lib/categories'
import clsx from 'clsx'

export default function Header() {
  const { itemCount, toggleCart } = useCart()
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const megaRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-50 w-full transition-shadow duration-200',
          scrolled ? 'shadow-xl shadow-black/40' : 'shadow-none',
          'bg-surface-800 border-b border-surface-600'
        )}
      >
        {/* Main header row */}
        <div className="container-site flex items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0" onClick={() => setMegaOpen(false)}>
            <span className="text-xl font-black tracking-tight">
              <span className="text-gradient">VapeVault</span>
              <span className="text-zinc-400 font-light"> AU</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-6" ref={megaRef}>
            <button
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              onClick={() => setMegaOpen((o) => !o)}
              className={clsx('nav-link flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-surface-700 transition-colors', megaOpen && 'text-brand bg-surface-700')}
            >
              All Products <ChevronDownIcon className={clsx('h-3.5 w-3.5 transition-transform', megaOpen && 'rotate-180')} />
            </button>
            {CATEGORIES.slice(0, 4).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="nav-link px-3 py-2 rounded-lg hover:bg-surface-700 transition-colors"
                onClick={() => setMegaOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/sale"
              className="nav-link px-3 py-2 rounded-lg hover:bg-surface-700 transition-colors text-sale font-semibold"
            >
              Sale
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Search */}
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 animate-fade-in">
                <input
                  ref={searchRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search vapes, brands..."
                  className="input-base py-2 w-52 lg:w-72"
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                  className="p-2 text-zinc-400 hover:text-zinc-200 transition-colors"
                  aria-label="Close search"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-zinc-400 hover:text-brand transition-colors rounded-lg hover:bg-surface-700"
                aria-label="Open search"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            )}

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-zinc-400 hover:text-brand transition-colors rounded-lg hover:bg-surface-700"
              aria-label={`Cart — ${itemCount} items`}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4.5 min-w-[18px] flex items-center justify-center rounded-full bg-brand text-surface-900 text-[10px] font-bold px-1">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2 text-zinc-400 hover:text-zinc-200 transition-colors rounded-lg hover:bg-surface-700"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <div
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <MegaMenu isOpen={megaOpen} />
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <nav className="relative w-72 max-w-full bg-surface-800 h-full overflow-y-auto animate-slide-right border-r border-surface-600">
            <div className="p-4 border-b border-surface-600 flex items-center justify-between">
              <span className="text-lg font-black text-gradient">VapeVault AU</span>
              <button onClick={() => setMobileOpen(false)} className="text-zinc-400 hover:text-zinc-200">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 space-y-1">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-3 rounded-lg text-zinc-300 hover:text-brand hover:bg-surface-700 transition-colors font-medium text-sm"
                >
                  {cat.name}
                  <span className="ml-1 text-xs text-zinc-600">({cat.productCount})</span>
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-surface-600 space-y-1">
                {[
                  { label: '🔥 Best Sellers', href: '/' },
                  { label: '💸 Sale', href: '/sale' },
                  { label: '📦 Bulk Orders', href: '/bulk' },
                ].map(({ label, href }) => (
                  <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="block px-3 py-3 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-surface-700 transition-colors text-sm">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

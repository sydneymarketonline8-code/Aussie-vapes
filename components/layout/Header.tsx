'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  UserIcon,
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
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
          'sticky top-0 z-50 w-full bg-white transition-shadow duration-200',
          scrolled ? 'shadow-md' : 'border-b border-line',
        )}
      >
        {/* Logo + Search + Account row */}
        <div className="container-site grid grid-cols-2 lg:grid-cols-[auto,1fr,auto] items-center gap-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <span className="font-display text-3xl font-bold tracking-tight text-ink leading-none">
              AUSSIE<span className="text-price">VAPES</span>
              <span className="block text-[10px] tracking-[0.3em] text-mute font-semibold mt-1">
                AUSTRALIA&apos;S #1 ONLINE VAPE STORE
              </span>
            </span>
          </Link>

          {/* Search bar (desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center max-w-xl w-full mx-auto relative border-2 border-ink rounded-sm overflow-hidden"
          >
            <input
              ref={searchRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for vapes, brands, flavours…"
              className="flex-1 px-4 py-2.5 text-sm bg-white text-body placeholder:text-mute focus:outline-none"
            />
            <button
              type="submit"
              className="bg-ink hover:bg-ink-dark text-white px-5 py-2.5 transition-colors"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </form>

          {/* Account icons */}
          <div className="flex items-center justify-end gap-1 lg:gap-3">
            {/* Wishlist (desktop) */}
            <Link
              href="/wishlist"
              className="hidden md:flex items-center gap-2 px-3 py-2 text-ink hover:text-price transition-colors group"
            >
              <HeartIcon className="h-6 w-6 stroke-[1.5]" />
              <span className="hidden xl:flex flex-col leading-tight text-[11px] uppercase tracking-wider font-semibold font-display">
                <span className="text-mute">Wish</span>
                <span>List</span>
              </span>
            </Link>

            {/* Account (desktop) */}
            <Link
              href="/account"
              className="hidden md:flex items-center gap-2 px-3 py-2 text-ink hover:text-price transition-colors"
            >
              <UserIcon className="h-6 w-6 stroke-[1.5]" />
              <span className="hidden xl:flex flex-col leading-tight text-[11px] uppercase tracking-wider font-semibold font-display">
                <span className="text-mute">My</span>
                <span>Account</span>
              </span>
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-2 px-3 py-2 text-ink hover:text-price transition-colors"
              aria-label={`Cart — ${itemCount} items`}
            >
              <div className="relative">
                <ShoppingCartIcon className="h-6 w-6 stroke-[1.5]" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 min-w-[20px] flex items-center justify-center rounded-full bg-price text-white text-[10px] font-bold px-1.5">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:flex flex-col leading-tight text-[11px] uppercase tracking-wider font-semibold font-display">
                <span className="text-mute">My</span>
                <span>Cart</span>
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2 text-ink"
              aria-label="Toggle menu"
              title="Menu"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearchSubmit} className="lg:hidden container-site pb-3">
          <div className="flex items-center border-2 border-ink rounded-sm overflow-hidden">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search…"
              className="flex-1 px-3 py-2 text-sm bg-white text-body placeholder:text-mute focus:outline-none"
            />
            <button type="submit" className="bg-ink text-white px-4 py-2" aria-label="Search">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Mega nav strip (desktop) */}
        <nav className="hidden lg:block border-t border-line bg-white">
          <div className="container-site flex items-center justify-center gap-1">
            <button
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              onClick={() => setMegaOpen((o) => !o)}
              className={clsx(
                'nav-link flex items-center gap-1 px-4 py-3.5 transition-colors',
                megaOpen && 'text-price'
              )}
            >
              All Categories <ChevronDownIcon className={clsx('h-3.5 w-3.5 transition-transform', megaOpen && 'rotate-180')} />
            </button>
            <Link href="/" className="nav-link px-4 py-3.5">Home</Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="nav-link px-4 py-3.5"
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/brands" className="nav-link px-4 py-3.5">Brands</Link>
            <Link href="/sale" className="nav-link px-4 py-3.5 text-price">Sale</Link>
            <Link href="/contact" className="nav-link px-4 py-3.5">Contact</Link>
          </div>
          <div
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <MegaMenu isOpen={megaOpen} />
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <nav className="relative w-80 max-w-full bg-white h-full overflow-y-auto animate-slide-right border-r border-line">
            <div className="p-4 border-b border-line flex items-center justify-between bg-ink text-white">
              <span className="font-display text-xl font-bold">AUSSIE<span className="text-price">VAPES</span></span>
              <button onClick={() => setMobileOpen(false)} className="text-white hover:text-price" aria-label="Close menu">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 space-y-0">
              <Link href="/" onClick={() => setMobileOpen(false)} className="block px-3 py-3 text-ink font-display uppercase tracking-wider text-sm font-semibold border-b border-line hover:text-price">Home</Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-3 py-3 text-ink font-display uppercase tracking-wider text-sm font-semibold border-b border-line hover:text-price"
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-mute lowercase">({cat.productCount})</span>
                </Link>
              ))}
              <Link href="/brands" onClick={() => setMobileOpen(false)} className="block px-3 py-3 text-ink font-display uppercase tracking-wider text-sm font-semibold border-b border-line hover:text-price">Brands</Link>
              <Link href="/sale" onClick={() => setMobileOpen(false)} className="block px-3 py-3 text-price font-display uppercase tracking-wider text-sm font-semibold border-b border-line">Sale</Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="block px-3 py-3 text-ink font-display uppercase tracking-wider text-sm font-semibold border-b border-line hover:text-price">Contact</Link>
              <div className="pt-4 mt-2 space-y-1">
                <Link href="/account" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-body text-sm hover:text-ink">
                  <UserIcon className="h-5 w-5" /> My Account
                </Link>
                <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-body text-sm hover:text-ink">
                  <HeartIcon className="h-5 w-5" /> Wishlist
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

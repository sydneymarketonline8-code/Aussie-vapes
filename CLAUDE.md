# VapeVault AU — Claude Code Project Guide

## Project Overview

Australian vaping e-commerce website targeting high-authority organic search traffic. The goal is to dominate competitive Australian vape keywords through advanced SEO architecture, fast-loading design, and conversion-focused product pages.

**Brand:** VapeVault AU  
**Domain (placeholder):** vapevaultau.com.au  
**Target market:** Australian adult vapers (18+)  
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Vercel

---

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # ESLint check
```

---

## Architecture

### App Router Pages

| Route | File | Type |
|---|---|---|
| `/` | `app/page.tsx` | Server component |
| `/category/[slug]` | `app/category/[slug]/page.tsx` | Client component (filtering/sort state) |
| `/product/[slug]` | `app/product/[slug]/page.tsx` | Server component + `generateStaticParams` |
| `/cart` | `app/cart/page.tsx` | Client component |
| `/checkout` | `app/checkout/page.tsx` | Client component |
| `/search` | `app/search/page.tsx` | Client component (Suspense-wrapped) |

All pages share the root layout at `app/layout.tsx` which mounts: `CartProvider`, `AgeGate`, `AnnouncementBar`, `Header`, `Footer`, `CartDrawer`.

### Component Map

```
components/
├── layout/
│   ├── Header.tsx          ← Sticky header, search, cart icon, mobile drawer
│   ├── MegaMenu.tsx        ← Hover mega menu — driven by CATEGORIES data
│   ├── AnnouncementBar.tsx ← Top strip (free shipping, trust)
│   └── Footer.tsx          ← Multi-column footer + newsletter form
├── cart/
│   └── CartDrawer.tsx      ← Slide-in cart drawer with free-shipping progress bar
├── home/
│   ├── HeroBanner.tsx      ← Auto-rotating 3-slide carousel (pauses on hover)
│   ├── CategoryGrid.tsx    ← 5-column category card grid
│   ├── FeaturedProducts.tsx← Best sellers / new arrivals / sale sections
│   └── TrustBadges.tsx     ← 5-column trust signal strip
├── product/
│   ├── ProductCard.tsx     ← Card with quick-add hover overlay
│   ├── ProductGrid.tsx     ← Responsive 2–4 column grid wrapper
│   ├── ProductGallery.tsx  ← Main image + thumbnail strip (client)
│   ├── AddToCart.tsx       ← Flavour/nicotine selectors + ATC button (client)
│   ├── AddToCartButton.tsx ← Reusable ATC button with "Added!" feedback
│   └── RelatedProducts.tsx ← Related products section on product pages
├── category/
│   ├── FilterSidebar.tsx   ← Accordion filters: price, brand, stock, tags
│   └── SortDropdown.tsx    ← Sort select: featured, price, newest, rating
└── ui/
    ├── Button.tsx          ← Variant button (primary/secondary/sale/ghost)
    ├── Badge.tsx           ← Status badges (new/sale/bestseller/instock)
    ├── Breadcrumb.tsx      ← Accessible breadcrumb nav
    ├── AgeGate.tsx         ← Session-gated 18+ verification modal
    └── StarRating.tsx      ← Star rating display with review count
```

### Data Layer

All product and category data lives in flat TypeScript files — no database yet.

- **`lib/products.ts`** — 12 sample products, 5 categories. Export helpers:
  - `getProductBySlug(slug)` — single product lookup
  - `getProductsByCategory(categorySlug)` — category listings
  - `getRelatedProducts(slugs)` — related product lookup
  - `getFeaturedProducts()` — isBestSeller products
  - `getNewArrivals()` — isNew products
  - `getSaleProducts()` — isSale products
  - `searchProducts(query)` — full-text search across name/brand/tags/description

- **`lib/categories.ts`** — 5 categories with subcategories, SEO keywords, descriptions
  - `getCategoryBySlug(slug)`
  - `getAllCategorySlugs()`

- **`lib/seo.ts`** — SEO metadata and JSON-LD schema builders
  - `buildSiteMetadata()` — site-wide Next.js Metadata object
  - `buildProductMetadata(product)` — product page Metadata
  - `buildCategoryMetadata(category)` — category page Metadata
  - `productJsonLd(product)` — Schema.org Product JSON-LD
  - `categoryItemListJsonLd(category, products)` — ItemList JSON-LD
  - `breadcrumbJsonLd(crumbs)` — BreadcrumbList JSON-LD
  - `organizationJsonLd()` — Organization JSON-LD (mounted in root layout)

### State Management

Cart state is managed by `context/CartContext.tsx`:
- Uses `useReducer` internally
- Persisted to `localStorage` under key `vapevault-cart`
- Exposes: `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `toggleCart`, `openCart`, `closeCart`, `itemCount`, `subtotal`
- Opening the cart drawer is triggered automatically on `addItem`

---

## Design System

### Color Palette (defined in `tailwind.config.js`)

| Token | Hex | Usage |
|---|---|---|
| `brand` | `#06b6d4` | Primary CTAs, links, accents |
| `brand-dark` | `#0891b2` | CTA hover state |
| `brand-light` | `#67e8f9` | Text gradients, highlights |
| `sale` | `#ef4444` | Sale badges, pay button |
| `surface-950` | `#050505` | Deepest background |
| `surface-900` | `#0a0a0a` | Page background (`body`) |
| `surface-800` | `#141414` | Header, footer, cards |
| `surface-700` | `#1c1c1c` | Product cards, form inputs |
| `surface-600` | `#242424` | Hover states, elevated cards |
| `surface-500` | `#2d2d2d` | Borders, dividers |

### Utility Classes (defined in `app/globals.css`)

```css
.container-site   /* max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 */
.btn-primary      /* Cyan filled CTA button */
.btn-secondary    /* Bordered ghost button */
.btn-sale         /* Red pay/sale button */
.card             /* Dark card with border */
.card-hover       /* Adds border-brand/50 on hover */
.input-base       /* Dark form input */
.badge-new        /* Cyan "New" badge */
.badge-sale       /* Red "Sale" badge */
.badge-bestseller /* Amber "Best Seller" badge */
.section-heading  /* 2xl–3xl bold section title */
.section-subheading /* Muted subtitle below heading */
.text-gradient    /* Cyan gradient text */
.bg-grid          /* Subtle dot-grid background pattern */
```

### Component Rules
- Default to **server components** — only add `'use client'` when state/effects/browser APIs are needed
- All client components that need cart access use `useCart()` from `context/CartContext`
- Images use Next.js `<Image>` with `unoptimized` for placeholder URLs; remove `unoptimized` when using real CDN images
- Never add comments explaining what code does — only add a comment when the WHY is non-obvious

---

## SEO Architecture

### Per-Page Schema Markup
- **Homepage** — `Organization` JSON-LD (in `app/layout.tsx`)
- **Category pages** — `BreadcrumbList` + `ItemList` JSON-LD
- **Product pages** — `Product` (with `offers`, `aggregateRating`, `shippingDetails`) + `BreadcrumbList`

### Metadata Pattern
Every page calls a builder from `lib/seo.ts` and exports it as `metadata` (server pages) or uses `generateMetadata()` (dynamic pages). Canonical URLs, OG tags, and Twitter cards are included on every page.

### Keyword Targets
Core categories map to primary keyword clusters:
- `/category/disposable-vapes` → "disposable vapes australia", "best disposable vape australia", "10000 puff disposable vape"
- `/category/pod-systems` → "pod systems australia", "vape kits australia", "starter vape kit"
- `/category/nicotine-salts` → "nicotine salts australia", "nic salt e-liquid australia", "50mg nicotine salt"
- `/category/e-liquids` → "e-liquid australia", "vape juice australia", "freebase e-liquid"

---

## Deployment

Deployed to Vercel. Configuration in `vercel.json`:
- Region: `syd1` (Sydney) for lowest Australian latency
- Static asset caching: 1-year immutable for `/_next/static/` and image files

```bash
# One-command deploy
npx vercel --prod

# Or connect GitHub repo at vercel.com for CI/CD on push to main
```

### Before Going Live
1. **Domain** — Set real domain in `lib/seo.ts` line 4: `const SITE_URL = 'https://yourdomain.com.au'`
2. **robots.txt** — Update `Sitemap:` URL from `example.com` to real domain
3. **sitemap.xml** — Replace with `app/sitemap.ts` using Next.js `MetadataRoute.Sitemap`
4. **Images** — Replace all `placehold.co` image URLs with real CDN URLs; remove `unoptimized` prop from `<Image>`
5. **Payment** — Manual PayID + Bitcoin only. Orders are created with `payment_status = 'pending'` and confirmed by the sales team via each order's unique `payment_reference`. Configure addresses via `PAYID_ADDRESS`, `PAYID_NAME`, `BTC_WALLET_ADDRESS`. Pending-payment alerts post to `SLACK_SALES_WEBHOOK_URL` when set.
6. **Age gate** — Currently uses `sessionStorage`; for production consider a cookie-based solution with server-side enforcement

---

## Adding Products

Edit `lib/products.ts`. Each product requires:

```ts
{
  id: 'prod-XXX',          // Unique ID
  slug: 'url-safe-slug',   // Used in /product/[slug] URL
  name: 'Product Name',
  brand: 'Brand Name',
  sku: 'SKU-CODE',
  price: 29.95,
  comparePrice: 39.95,     // Optional — shows crossed-out price + discount %
  images: ['https://...'], // First image is used as thumbnail
  category: 'disposable-vapes', // Must match a slug in lib/categories.ts
  tags: ['disposable', 'rechargeable'],
  description: '...',      // Full description for product page
  shortDescription: '...',  // Used in product card and meta description
  features: ['Feature 1'], // Bullet list on product page
  specifications: { 'Puff Count': '8000' }, // Spec table
  inStock: true,
  stockCount: 50,           // Optional — shows "Only X left" warning if < 20
  rating: 4.7,
  reviewCount: 123,
  isNew: false,
  isBestSeller: true,
  isSale: false,
  relatedProductSlugs: ['other-slug'],
  seoTitle: 'Product Name | VapeVault AU',
  seoDescription: 'Buy Product Name in Australia...',
  flavours: ['Mango Ice', 'Watermelon'],  // Optional — shows selector
  nicotineStrengths: ['20mg', '50mg'],    // Optional — shows selector
}
```

After adding products, also add their slugs to `app/product/[slug]/page.tsx` via `generateStaticParams` (already automatic — it reads from `PRODUCTS`).

## Adding Categories

Edit `lib/categories.ts`. Add to the `CATEGORIES` array and create matching products with `category: 'your-new-slug'`. The mega menu and category grid update automatically.

---

## Regulatory Compliance (Australia)

- All product pages include a TGA regulatory notice
- The age gate blocks site entry for users who do not confirm 18+
- The footer includes a nicotine addiction warning
- The checkout requires an age + prescription confirmation checkbox
- Do NOT remove any compliance copy — it is legally required for Australian nicotine product sales

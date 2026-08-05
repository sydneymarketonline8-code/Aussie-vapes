import type { Metadata } from 'next'
import type { Product, Category } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vapehubvapesaustralia.com.au'
// Hardcoded, NOT env-driven. A stale NEXT_PUBLIC_SITE_NAME in the host kept
// the previous brand alive in author/creator/publisher/og:site_name after a
// rebrand. Change the brand here.
const SITE_NAME = 'VapeHub Vapes Australia'
const DEFAULT_DESCRIPTION =
  "VapeHub Vapes Australia is Australia's #1 online vape store. Buy authentic disposable vapes, pod systems, nicotine salts and e-liquids with same-day Sydney dispatch and free Aussie-wide shipping over $300."

// Brand-name cluster — searches for the store itself.
export const BRAND_KEYWORDS = [
  'vapehub vapes australia',
  'vapehub vapes australia store',
  'vapehubvapesaustralia',
  'vapehub vapes australia online',
  'vapehub vapes australia sydney',
  'vapehub vapes australia melbourne',
  'vapehub vapes australia brisbane',
  'vapehub vapes australia perth',
  'vapehub vapes australia adelaide',
]

// Generic/product cluster — the high-volume non-brand terms we actually
// compete on. Kept separate from BRAND_KEYWORDS so a future rebrand can't
// mangle them (a blind find-replace once turned "disposable vapes australia"
// into "disposable <brand>").
const VAPE_PRODUCT_KEYWORDS = [
  'vapes australia',
  'australian vapes',
  'vape australia',
  'vape store australia',
  'vape shop australia',
  'online vape store australia',
  'buy vape online australia',
  'cheap vapes australia',
  'vape free shipping australia',
  'disposable vapes australia',
  'disposable vape australia',
  'pod systems australia',
  'nicotine salts australia',
  'e-liquid australia',
  'iget bar australia',
  'alfakher crown bar australia',
  'hqd australia',
  'gunnpod australia',
  'lost mary australia',
]

export function buildSiteMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `VapeHub Vapes Australia — Australia's #1 Online Vape Store`,
      template: `%s | VapeHub Vapes Australia`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: [...BRAND_KEYWORDS, ...VAPE_PRODUCT_KEYWORDS],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    openGraph: {
      type: 'website',
      locale: 'en_AU',
      url: SITE_URL,
      siteName: SITE_NAME,
      title: `VapeHub Vapes Australia — Australia's #1 Online Vape Store`,
      description: DEFAULT_DESCRIPTION,
    },
    twitter: {
      // site / creator handles omitted until a real @VapesAustralia (or
      // similar) Twitter/X account exists. A fake handle poisons the
      // large-image preview and shows up as unclaimed in Twitter Card
      // Validator. Re-add once the handle is registered.
      card: 'summary_large_image',
      title: `VapeHub Vapes Australia — Australia's #1 Online Vape Store`,
      description: DEFAULT_DESCRIPTION,
    },
    alternates: { canonical: SITE_URL },
    // Search-engine ownership verification, rendered as <meta> tags.
    //
    // Deliberately NOT env-driven: verification tokens are issued per property,
    // and stale NEXT_PUBLIC_*_VERIFICATION values in the host kept publishing
    // tokens for a previous (now suspended) domain — they can never verify here
    // and only associate this domain with that one.
    //
    // Tokens below are for the vapehubvapesaustralia.com.au properties. Public
    // values — they are meant to be readable in page source.
    verification: {
      google: 'lWtYvJ-4XPKjDoceXtXxnpX4Bvjs-iS-aIHt9w7ZKGw',
      // other: { 'msvalidate.01': 'paste-bing-token-here' },
    },
  }
}

export function buildProductMetadata(product: Product): Metadata {
  const url = `${SITE_URL}/product/${product.slug}`
  return {
    // absolute: seoTitle already ends with "| VapeHub Vapes Australia"; without this
    // the root layout's "%s | VapeHub Vapes Australia" template appends it twice.
    title: { absolute: product.seoTitle },
    description: product.seoDescription,
    openGraph: {
      type: 'website',
      url,
      title: product.seoTitle,
      description: product.seoDescription,
      images: product.images[0] ? [{ url: product.images[0], width: 600, height: 600, alt: product.name }] : [],
    },
    twitter: { card: 'summary_large_image', title: product.seoTitle, description: product.seoDescription },
    alternates: { canonical: url },
  }
}

export function buildCategoryMetadata(category: Category): Metadata {
  const url = `${SITE_URL}/category/${category.slug}`
  return {
    title: { absolute: category.seoTitle },
    description: category.seoDescription,
    keywords: category.keywords,
    openGraph: {
      type: 'website',
      url,
      title: category.seoTitle,
      description: category.seoDescription,
      images: [{ url: category.image, width: 800, height: 450, alt: category.name }],
    },
    alternates: { canonical: url },
  }
}

export interface BrandSeoInput {
  slug: string
  name: string
  seoTitle: string
  seoDescription: string
  keywords: string[]
}

export function buildBrandMetadata(brand: BrandSeoInput): Metadata {
  const url = `${SITE_URL}/brand/${brand.slug}`
  return {
    title: { absolute: brand.seoTitle },
    description: brand.seoDescription,
    keywords: brand.keywords,
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title: brand.seoTitle,
      description: brand.seoDescription,
    },
    twitter: { card: 'summary_large_image', title: brand.seoTitle, description: brand.seoDescription },
    alternates: { canonical: url },
  }
}

export function productJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    sku: product.sku,
    brand: { '@type': 'Brand', name: product.brand },
    image: product.images,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: 'AUD',
      price: product.price.toFixed(2),
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: SITE_NAME },
      priceValidUntil: new Date(Date.now() + 30 * 86_400_000).toISOString().split('T')[0],
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', currency: 'AUD', value: '0' },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'AU' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 5, unitCode: 'DAY' },
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  }
}

export function categoryItemListJsonLd(category: Category, products: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.name,
    description: category.description,
    url: `${SITE_URL}/category/${category.slug}`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: p.url,
    })),
  }
}

export function brandItemListJsonLd(brandSlug: string, brandName: string, products: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${brandName} Products`,
    url: `${SITE_URL}/brand/${brandSlug}`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: p.url,
    })),
  }
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function breadcrumbJsonLd(crumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: 'VapeHub Vapes Australia',
    alternateName: ['Vapes AU', 'VapeHub Vapes Australia Online'],
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: DEFAULT_DESCRIPTION,
    slogan: "Australia's #1 Online Vape Store",
    areaServed: {
      '@type': 'Country',
      name: 'Australia',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AU',
      addressRegion: 'NSW',
      addressLocality: 'Sydney',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@vapehubvapesaustralia.com.au',
      availableLanguage: 'en-AU',
    },
    // sameAs: intentionally omitted until real social profiles exist.
    // Adding dead-link socials is a negative SEO signal (Google follows,
    // gets 404s, flags entity mismatch). Re-add once handles are live.
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VapeHub Vapes Australia',
    alternateName: 'Vapes AU',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    '@id': `${SITE_URL}/#store`,
    name: 'VapeHub Vapes Australia',
    alternateName: ['Vapes AU'],
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}/logo.svg`,
    description: DEFAULT_DESCRIPTION,
    priceRange: '$15 - $60',
    paymentAccepted: ['Visa', 'Mastercard', 'American Express', 'PayPal'],
    currenciesAccepted: 'AUD',
    areaServed: {
      '@type': 'Country',
      name: 'Australia',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AU',
      addressRegion: 'NSW',
      addressLocality: 'Sydney',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+61-468-188-347',
      contactType: 'customer service',
      email: 'info@vapehubvapesaustralia.com.au',
      areaServed: 'AU',
      availableLanguage: 'en-AU',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    // sameAs: intentionally omitted until real social profiles exist.
    // Adding dead-link socials is a negative SEO signal (Google follows,
    // gets 404s, flags entity mismatch). Re-add once handles are live.
    //
    // No org-level aggregateRating: Google's policy disallows self-serving
    // review markup that isn't backed by reviews visible on the same page.
    // A fabricated site-wide rating risks a structured-data manual action.
    // Product-level aggregateRating (from real review data) stays in
    // productJsonLd and is fully eligible.
  }
}

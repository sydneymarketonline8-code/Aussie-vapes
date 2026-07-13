import type { Metadata } from 'next'
import type { Product, Category } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vapesaustralia.com.au'
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Vapes Australia'
const DEFAULT_DESCRIPTION =
  "Vapes Australia is Australia's #1 online vape store. Buy authentic disposable vapes, pod systems, nicotine salts and e-liquids with same-day Sydney dispatch and free Aussie-wide shipping over $300."

// Principal keyword cluster — "Vapes Australia" topical authority targeting
export const VAPES_AUSTRALIA_KEYWORDS = [
  'vapes australia',
  'vapes australia online',
  'vape australia',
  'vape store australia',
  'vape shop australia',
  'best vapes australia',
  'vapes australia near me',
  'vapes australia free shipping',
  'vapes australia sydney',
  'vapes australia melbourne',
  'vapes australia brisbane',
  'vapes australia perth',
  'vapes australia adelaide',
  'buy vapes australia online',
  'cheap vapes australia',
  'disposable vapes australia',
  'pod systems australia',
  'nicotine salts australia',
  'e-liquid australia',
]

const VAPE_PRODUCT_KEYWORDS = [
  'australian vapes',
  'vape australia',
  'vapes australia',
  'online vape store australia',
  'buy vape online australia',
  'disposable vape australia',
  'pod systems australia',
  'nicotine salts australia',
  'e-liquid australia',
  'vape shop australia',
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
      default: `Vapes Australia — Australia's #1 Online Vape Store`,
      template: `%s | Vapes Australia`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: [...VAPES_AUSTRALIA_KEYWORDS, ...VAPE_PRODUCT_KEYWORDS],
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
      title: `Vapes Australia — Australia's #1 Online Vape Store`,
      description: DEFAULT_DESCRIPTION,
    },
    twitter: {
      // site / creator handles omitted until a real @VapesAustralia (or
      // similar) Twitter/X account exists. A fake handle poisons the
      // large-image preview and shows up as unclaimed in Twitter Card
      // Validator. Re-add once the handle is registered.
      card: 'summary_large_image',
      title: `Vapes Australia — Australia's #1 Online Vape Store`,
      description: DEFAULT_DESCRIPTION,
    },
    alternates: { canonical: SITE_URL },
    // Search-engine ownership verification. Each value is rendered as a
    // <meta> tag in <head>. Add the codes given by each engine's webmaster
    // console as env vars; missing ones are omitted, so dev/preview don't
    // need them.
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
      other: {
        ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
          ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION }
          : {}),
      },
    },
  }
}

export function buildProductMetadata(product: Product): Metadata {
  const url = `${SITE_URL}/product/${product.slug}`
  return {
    // absolute: seoTitle already ends with "| Vapes Australia"; without this
    // the root layout's "%s | Vapes Australia" template appends it twice.
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
    name: 'Vapes Australia',
    alternateName: ['Vapes AU', 'Vapes Australia Online'],
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
      email: 'info@vapesaustralia.com.au',
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
    name: 'Vapes Australia',
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
    name: 'Vapes Australia',
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
      telephone: '+61-489-929-556',
      contactType: 'customer service',
      email: 'info@vapesaustralia.com.au',
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

import type { Metadata } from 'next'
import type { Product, Category } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aussievapes.com.au'
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'AussieVapes'
const DEFAULT_DESCRIPTION =
  "Australia's #1 online vape store — disposable vapes, pod systems, nicotine salts and e-liquids with fast Australian shipping from Sydney."

export function buildSiteMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} | Australia's Largest Online Vape Store`,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: [
      'aussie vapes',
      'australian vapes',
      'vape australia',
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
    ],
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
      title: `${SITE_NAME} | Australia's Largest Online Vape Store`,
      description: DEFAULT_DESCRIPTION,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@AussieVapes',
      creator: '@AussieVapes',
    },
    alternates: { canonical: SITE_URL },
  }
}

export function buildProductMetadata(product: Product): Metadata {
  const url = `${SITE_URL}/product/${product.slug}`
  return {
    title: product.seoTitle,
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
    title: category.seoTitle,
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
    title: brand.seoTitle,
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
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: DEFAULT_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AU',
      addressRegion: 'NSW',
      addressLocality: 'Sydney',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@aussievapes.com.au',
      availableLanguage: 'en-AU',
    },
    sameAs: [
      'https://www.instagram.com/aussievapes',
      'https://www.facebook.com/aussievapes',
    ],
  }
}

import type { Metadata } from 'next'
import type { Product, Category } from '@/types'

const SITE_URL = 'https://vapevaultau.com.au'
const SITE_NAME = 'VapeVault AU'
const DEFAULT_DESCRIPTION =
  "Australia's premium online vape store — disposable vapes, pod systems, nicotine salts and e-liquids with fast Australian shipping."

export function buildSiteMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} | Australia's Premium Vape Store`,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: [
      'vape australia',
      'vapes australia',
      'online vape store australia',
      'buy vape online australia',
      'disposable vape australia',
      'pod systems australia',
      'nicotine salts australia',
      'e-liquid australia',
      'vape shop australia',
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
      title: `${SITE_NAME} | Australia's Premium Vape Store`,
      description: DEFAULT_DESCRIPTION,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@VapeVaultAU',
      creator: '@VapeVaultAU',
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
        shippingRate: {
          '@type': 'MonetaryAmount',
          currency: 'AUD',
          value: '0',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'AU',
        },
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
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'support@vapevaultau.com.au',
      availableLanguage: 'en-AU',
    },
    sameAs: [
      'https://www.instagram.com/vapevaultau',
      'https://www.facebook.com/vapevaultau',
    ],
  }
}

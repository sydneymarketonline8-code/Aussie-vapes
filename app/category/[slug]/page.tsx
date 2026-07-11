import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug } from '@/lib/categories'
import { getProductsByCategorySlug } from '@/lib/storefront-products'
import { buildCategoryMetadata } from '@/lib/seo'
import CategoryView from './CategoryView'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vapesaustralia.com.au'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return {}
  return buildCategoryMetadata(category)
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const allProducts = await getProductsByCategorySlug(slug)

  const breadcrumbJson = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: category.name, item: `${SITE_URL}/category/${category.slug}` },
    ],
  }
  const itemListJson = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.name,
    description: category.description,
    url: `${SITE_URL}/category/${category.slug}`,
    numberOfItems: allProducts.length,
    itemListElement: allProducts.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `${SITE_URL}/product/${p.slug}`,
    })),
  }
  const faqJson = category.faqs && {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: category.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJson) }} />
      {faqJson && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      )}
      <CategoryView category={category} allProducts={allProducts} />
    </>
  )
}

import { notFound } from 'next/navigation'
import { getCategoryBySlug } from '@/lib/categories'
import { getProductsByCategorySlug } from '@/lib/storefront-products'
import CategoryView from './CategoryView'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aussievapes.com.au'

export const dynamic = 'force-dynamic'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const allProducts = await getProductsByCategorySlug(slug)

  // Temporary diagnostic — visible in HTML view-source so we can see
  // server-side image counts when client-side rendering looks broken.
  // Remove once image rendering is confirmed working.
  const _dbg = {
    cat: slug,
    products: allProducts.length,
    withImages: allProducts.filter((p) => p.images.length > 0).length,
    sample: allProducts.slice(0, 3).map((p) => ({ slug: p.slug, img: p.images[0] ?? null })),
  }

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
      <meta name="x-debug-category" content={JSON.stringify(_dbg)} />
      <CategoryView category={category} allProducts={allProducts} />
    </>
  )
}

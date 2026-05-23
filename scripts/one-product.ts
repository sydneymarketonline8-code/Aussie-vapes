import 'dotenv/config'
import { config as loadEnv } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

loadEnv({ path: '.env.local', override: true })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
)

const slug = process.argv[2] ?? 'watermelon-ice-lost-mary-nera-fullview-pods-2pk'

async function main() {
  console.log(`Probing slug: ${slug}\n`)

  console.log('1. Exact getProductBySlug query (anon, .maybeSingle):')
  const { data: a, error: ea } = await supabase
    .from('products')
    .select(`id, slug, name, status, deleted_at, product_images ( url, position )`)
    .eq('slug', slug)
    .eq('status', 'active')
    .is('deleted_at', null)
    .maybeSingle()
  console.log('   data:', JSON.stringify(a, null, 2))
  console.log('   error:', ea?.message ?? null)

  console.log('\n2. Without status/deleted filters:')
  const { data: b } = await supabase
    .from('products')
    .select('id, slug, name, status, deleted_at')
    .eq('slug', slug)
    .maybeSingle()
  console.log('   row:', JSON.stringify(b, null, 2))

  if (a?.id) {
    console.log('\n3. Direct product_images query (anon):')
    const { data: imgs } = await supabase
      .from('product_images')
      .select('id, url, position')
      .eq('product_id', a.id)
    console.log('   rows:', imgs)
  }
}

main().catch(console.error)

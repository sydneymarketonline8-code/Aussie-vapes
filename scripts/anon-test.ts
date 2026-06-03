import 'dotenv/config'
import { config as loadEnv } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

loadEnv({ path: '.env.local', override: true })

// Use the ANON key to mirror what the storefront does
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
)

async function main() {
  // Total image rows visible to anon
  const { count: total } = await supabase
    .from('product_images')
    .select('id', { count: 'exact', head: true })
  console.log('product_images rows visible to anon:', total)

  // First 5 product_images rows + their parent product status
  const { data, error } = await supabase
    .from('product_images')
    .select('id, url, position, product_id')
    .limit(5)
  if (error) console.error('list error:', error)
  console.log('sample:', data)

  // Same embedded join the storefront uses
  console.log('\n--- pod-systems embedded join (first 3) ---')
  const { data: cat } = await supabase.from('categories').select('id').eq('slug', 'pod-systems').limit(1)
  const { data: prods, error: prodErr } = await supabase
    .from('products')
    .select('slug, product_images(url, position)')
    .eq('category_id', cat![0].id)
    .eq('status', 'active')
    .is('deleted_at', null)
    .limit(3)
  if (prodErr) console.error('prod error:', prodErr)
  for (const p of prods ?? []) {
    console.log(p.slug, '→', p.product_images)
  }
}

main().catch(console.error)

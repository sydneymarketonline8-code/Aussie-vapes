import 'dotenv/config'
import { config as loadEnv } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

loadEnv({ path: '.env.local', override: true })
const s = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
)

const slug = process.argv[2] ?? 'watermelon-ice-lost-mary-nera-fullview-pods-2pk'

;(async () => {
  const { data } = await s
    .from('products')
    .select('slug, name, seo_title, seo_description, description')
    .eq('slug', slug)
    .single()
  console.log(JSON.stringify(data, null, 2))
})().catch(console.error)

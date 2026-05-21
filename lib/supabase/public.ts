/**
 * Cookie-less anon Supabase client for public reads (products, categories,
 * brands, etc). Safe to call during `generateStaticParams` and from server
 * components without a request scope.
 *
 * Don't use this for anything that needs the signed-in user — use
 * createSupabaseServerClient for that.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function getSupabasePublicClient(): SupabaseClient {
  if (client) return client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY — cannot create public Supabase client.',
    )
  }
  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return client
}

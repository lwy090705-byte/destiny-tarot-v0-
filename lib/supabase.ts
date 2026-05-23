import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

if (typeof window !== 'undefined') {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      '[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
    )
  }
}

/** Browser/client Supabase — community_posts, profiles, points, referrals */
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Server-only Supabase client (service role). Bypasses RLS.
 * Never import this into client components or expose the key.
 * Key must be SUPABASE_SERVICE_ROLE_KEY — never NEXT_PUBLIC_*.
 */
export function createSupabaseAdmin(): SupabaseClient {
  if (process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY must not be set (secret leaked to browser)'
    )
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

  if (!url || !key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY for admin client'
    )
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function hasSupabaseServiceRole(): boolean {
  if (process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
    return false
  }
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

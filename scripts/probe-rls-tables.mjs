/**
 * Probe public tables + RLS status (read-only metadata + light checks).
 * Does not dump user PII beyond table/policy names.
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'node:fs'

function loadEnv() {
  const p = '.env.local'
  if (!existsSync(p)) return
  for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i <= 0) continue
    const k = t.slice(0, i).trim()
    let v = t.slice(i + 1).trim()
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1)
    }
    if (!process.env[k]) process.env[k] = v
  }
}

loadEnv()

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const tables = [
  'profiles',
  'community_posts',
  'community_comments',
  'community_post_likes',
  'points',
  'visit_logs',
  'referral_codes',
  'referrals',
  'fortune_results',
  'achievements',
  'notifications',
]

console.log('=== anon access probe (select limit 1) ===')
for (const t of tables) {
  const { data, error, count } = await sb
    .from(t)
    .select('*', { count: 'exact', head: true })
  console.log(
    JSON.stringify({
      table: t,
      ok: !error,
      code: error?.code ?? null,
      message: error?.message ?? null,
      count: count ?? null,
    })
  )
}

// Try RPC existence
for (const fn of [
  'get_visitor_stats',
  'increment_community_post_likes',
  'adjust_community_post_comments',
]) {
  const { error } = await sb.rpc(fn, fn === 'get_visitor_stats'
    ? { p_requester_nickname: '__probe__' }
    : fn === 'increment_community_post_likes'
      ? { p_post_id: '00000000-0000-0000-0000-000000000000' }
      : { p_post_id: '00000000-0000-0000-0000-000000000000', p_delta: 0 })
  console.log(JSON.stringify({ rpc: fn, code: error?.code ?? 'ok', message: error?.message?.slice(0, 120) ?? null }))
}

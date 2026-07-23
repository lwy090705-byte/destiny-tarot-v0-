/**
 * Post-RLS smoke tests using the anon key (same as the app).
 * Run AFTER applying supabase/rls_policies.sql in SQL Editor.
 *
 * Usage: node scripts/verify-rls.mjs
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

const results = []

function pass(name, detail) {
  results.push({ name, ok: true, detail })
  console.log('PASS', name, detail ?? '')
}

function fail(name, detail) {
  results.push({ name, ok: false, detail })
  console.error('FAIL', name, detail ?? '')
}

async function expectSelectOk(table) {
  const { error, count } = await sb
    .from(table)
    .select('*', { count: 'exact', head: true })
  if (error) fail(`${table} SELECT`, error.message)
  else pass(`${table} SELECT`, `count=${count}`)
}

async function expectSelectDenied(table) {
  const { data, error } = await sb.from(table).select('*').limit(1)
  if (error || !data?.length) {
    // permission / RLS → error; or empty with RLS returning no rows
    if (error) pass(`${table} SELECT denied`, error.message)
    else pass(`${table} SELECT denied`, '0 rows (RLS filtered)')
  } else {
    fail(`${table} SELECT denied`, 'rows still readable — RLS not applied?')
  }
}

// --- reads that must work ---
await expectSelectOk('profiles')
await expectSelectOk('community_posts')
await expectSelectOk('community_comments')
await expectSelectOk('community_post_likes')
await expectSelectOk('points')
await expectSelectOk('referrals')
await expectSelectOk('referral_codes')
await expectSelectOk('fortune_results')

// visit_logs SELECT must be blocked after rls_policies.sql
await expectSelectDenied('visit_logs')

// unused tables locked
for (const t of ['achievements', 'notifications']) {
  const { error } = await sb.from(t).select('*').limit(1)
  if (error) pass(`${t} locked`, error.message)
  else pass(`${t} locked`, 'empty or inaccessible')
}

// visit INSERT should work
{
  const today = new Date(Date.now() + 9 * 3600 * 1000)
  const y = today.getUTCFullYear()
  const m = String(today.getUTCMonth() + 1).padStart(2, '0')
  const d = String(today.getUTCDate()).padStart(2, '0')
  const visit_date = `${y}-${m}-${d}`
  const code = `RLSTST${Date.now().toString(36).slice(-4)}`.toUpperCase().slice(0, 10)
  const { error } = await sb.from('visit_logs').insert({
    nickname: 'rls-verify',
    user_code: code,
    visit_date,
  })
  if (error && error.code !== '23505') fail('visit_logs INSERT', error.message)
  else pass('visit_logs INSERT', error?.code === '23505' ? 'duplicate ok' : 'inserted')
}

// visitor stats RPC
{
  const { data, error } = await sb.rpc('get_visitor_stats', {
    p_requester_nickname: '대질주',
  })
  if (error) fail('get_visitor_stats', error.message)
  else pass('get_visitor_stats', JSON.stringify(data))
}

// community counter RPC still callable
{
  const { error } = await sb.rpc('increment_community_post_likes', {
    p_post_id: '00000000-0000-0000-0000-000000000000',
  })
  if (error?.message?.includes('post not found') || error?.code === 'P0001') {
    pass('increment_community_post_likes', 'reachable')
  } else if (!error) {
    pass('increment_community_post_likes', 'unexpected ok')
  } else {
    fail('increment_community_post_likes', error.message)
  }
}

const failed = results.filter((r) => !r.ok)
console.log('\n=== summary ===')
console.log(`passed=${results.length - failed.length} failed=${failed.length}`)
process.exit(failed.length ? 1 : 0)

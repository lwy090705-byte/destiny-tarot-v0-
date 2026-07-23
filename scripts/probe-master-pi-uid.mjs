/**
 * Probe profiles.pi_uid for nickname 대질주 (no PII beyond uid/nickname).
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local
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

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const service = process.env.SUPABASE_SERVICE_ROLE_KEY
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log({
  hasUrl: Boolean(url),
  hasServiceRole: Boolean(service),
  hasAnon: Boolean(anon),
  nextPublicServiceRoleLeak: Boolean(process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY),
})

if (!url || !service) {
  console.error('Need SUPABASE_SERVICE_ROLE_KEY to read pi_uid safely')
  process.exit(1)
}

const sb = createClient(url, service, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const { data, error } = await sb
  .from('profiles')
  .select('nickname, pi_uid, role, is_master, level_title')
  .ilike('nickname', '대질주')
  .limit(3)

console.log('query error:', error)
console.log('rows:', JSON.stringify(data, null, 2))

// column existence check
const { error: colErr } = await sb.from('profiles').select('pi_uid').limit(1)
console.log('pi_uid column ok:', !colErr, colErr?.message ?? null)

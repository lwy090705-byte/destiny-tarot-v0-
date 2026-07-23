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

const now = new Date()
const kst = new Date(now.getTime() + 9 * 3600 * 1000)
const today = `${kst.getUTCFullYear()}-${String(kst.getUTCMonth() + 1).padStart(2, '0')}-${String(kst.getUTCDate()).padStart(2, '0')}`

console.log({ todayKst: today, utcNow: now.toISOString() })

const all = await sb
  .from('visit_logs')
  .select('id, nickname, user_code, visit_date, created_at', { count: 'exact' })
  .order('created_at', { ascending: false })
  .limit(30)

console.log('select all error:', all.error)
console.log('count:', all.count)
console.log('sample:', JSON.stringify(all.data, null, 2))

const todayRows = await sb
  .from('visit_logs')
  .select('user_code, nickname, visit_date')
  .eq('visit_date', today)

console.log('today eq error:', todayRows.error)
console.log('today n:', todayRows.data?.length, todayRows.data)

const distinctDates = await sb
  .from('visit_logs')
  .select('visit_date')
  .order('visit_date', { ascending: false })
  .limit(50)

const dates = [...new Set((distinctDates.data ?? []).map((r) => String(r.visit_date).slice(0, 10)))]
console.log('recent visit_dates:', dates.slice(0, 15))

// Reproduce client bug: unbounded select is capped (~1000) so daily can look empty.
const limited = await sb
  .from('visit_logs')
  .select('user_code, nickname, visit_date')
  .limit(1000)

const limRows = limited.data ?? []
const dailyInLimited = limRows.filter(
  (r) => String(r.visit_date).slice(0, 10) === today
).length
console.log('limit-1000 simulation', {
  rows: limRows.length,
  dailyRowsInSample: dailyInLimited,
  todayExact: todayRows.data?.length,
})

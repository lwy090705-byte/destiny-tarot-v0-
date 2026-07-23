/**
 * Verifies community_post_counters RPC wiring + concurrency semantics.
 *
 * Usage: node scripts/verify-community-counters.mjs
 *
 * - Unit section: no network — proves atomic increment vs RMW race
 * - Live section: uses .env.local against Supabase (skips if unreachable)
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

function loadEnvLocal() {
  const path = resolve(process.cwd(), '.env.local')
  if (!existsSync(path)) return
  const text = readFileSync(path, 'utf8')
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq <= 0) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = val
  }
}

loadEnvLocal()

let passed = 0
let failed = 0

function assert(cond, msg) {
  if (cond) {
    passed += 1
    console.log(`  PASS  ${msg}`)
  } else {
    failed += 1
    console.error(`  FAIL  ${msg}`)
  }
}

// ─── Unit: concurrency semantics ───────────────────────────────────────────

function simulateRmwRace(initial, nWorkers) {
  // Classic lost-update: all workers read the same value, then write +1
  let value = initial
  const reads = Array.from({ length: nWorkers }, () => value)
  for (const r of reads) {
    value = r + 1
  }
  return value
}

function simulateAtomicIncrement(initial, nWorkers) {
  let value = initial
  for (let i = 0; i < nWorkers; i++) {
    value = value + 1 // models UPDATE SET likes = likes + 1
  }
  return value
}

/**
 * Mirrors likeCommunityPost RPC-then-fallback branching (injectable client).
 */
async function likeWithInjectedClient(client, postId, user) {
  const dup = await client.checkDup(postId, user)
  if (dup) return { status: 'already_liked' }
  const inserted = await client.insertLike(postId, user)
  if (!inserted.ok) {
    if (inserted.code === '23505') return { status: 'already_liked' }
    return { status: 'failed' }
  }

  const rpc = await client.rpcIncrement(postId)
  if (!rpc.error && rpc.data != null) {
    return { status: 'success', likes: Number(rpc.data), path: 'rpc' }
  }

  const read = await client.readLikes(postId)
  if (!read.ok) return { status: 'failed' }
  const likes = (Number(read.likes) || 0) + 1
  const upd = await client.writeLikes(postId, likes)
  if (!upd.ok) return { status: 'failed' }
  return { status: 'success', likes, path: 'fallback' }
}

async function adjustCommentsWithInjectedClient(client, postId, delta) {
  const rpc = await client.rpcAdjustComments(postId, delta)
  if (!rpc.error && rpc.data != null) {
    return { value: Math.max(0, Number(rpc.data)), path: 'rpc' }
  }
  const read = await client.readComments(postId)
  if (!read.ok) return { value: null, path: 'failed' }
  const next = Math.max(0, (Number(read.count) || 0) + delta)
  const upd = await client.writeComments(postId, next)
  if (!upd.ok) return { value: null, path: 'failed' }
  return { value: next, path: 'fallback' }
}

console.log('\n=== Unit: concurrency semantics ===')
{
  const n = 20
  const atomic = simulateAtomicIncrement(0, n)
  const rmw = simulateRmwRace(0, n)
  assert(atomic === 20, `atomic increment yields ${n} (got ${atomic})`)
  assert(rmw === 1, `RMW race loses updates (got ${rmw}, expected 1) — why RPC is required`)
}

console.log('\n=== Unit: RPC success path (mock client) ===')
{
  const store = { likes: 5, comments: 3, liked: false }
  const client = {
    checkDup: async () => store.liked,
    insertLike: async () => {
      store.liked = true
      return { ok: true }
    },
    rpcIncrement: async () => {
      store.likes += 1
      return { data: store.likes, error: null }
    },
    readLikes: async () => ({ ok: true, likes: store.likes }),
    writeLikes: async (_id, likes) => {
      store.likes = likes
      return { ok: true }
    },
    rpcAdjustComments: async (_id, delta) => {
      store.comments = Math.max(0, store.comments + delta)
      return { data: store.comments, error: null }
    },
    readComments: async () => ({ ok: true, count: store.comments }),
    writeComments: async (_id, count) => {
      store.comments = count
      return { ok: true }
    },
  }

  const like = await likeWithInjectedClient(client, 'p1', { user_code: 'A', nickname: 'a' })
  assert(like.status === 'success' && like.path === 'rpc', 'like uses RPC when available')
  assert(like.likes === 6, `like RPC returns new count (got ${like.likes})`)

  const c1 = await adjustCommentsWithInjectedClient(client, 'p1', 1)
  assert(c1.path === 'rpc' && c1.value === 4, `comments RPC +1 → 4 (got ${c1.value})`)
  const c2 = await adjustCommentsWithInjectedClient(client, 'p1', -1)
  assert(c2.path === 'rpc' && c2.value === 3, `comments RPC -1 → 3 (got ${c2.value})`)
}

console.log('\n=== Unit: RPC failure → fallback ===')
{
  const store = { likes: 10, comments: 2, liked: false }
  const client = {
    checkDup: async () => false,
    insertLike: async () => {
      store.liked = true
      return { ok: true }
    },
    rpcIncrement: async () => ({
      data: null,
      error: { message: 'function increment_community_post_likes does not exist' },
    }),
    readLikes: async () => ({ ok: true, likes: store.likes }),
    writeLikes: async (_id, likes) => {
      store.likes = likes
      return { ok: true }
    },
    rpcAdjustComments: async () => ({
      data: null,
      error: { message: 'function adjust_community_post_comments does not exist' },
    }),
    readComments: async () => ({ ok: true, count: store.comments }),
    writeComments: async (_id, count) => {
      store.comments = count
      return { ok: true }
    },
  }

  const like = await likeWithInjectedClient(client, 'p1', { user_code: 'B', nickname: 'b' })
  assert(like.status === 'success' && like.path === 'fallback', 'like falls back when RPC missing')
  assert(like.likes === 11, `fallback like count 11 (got ${like.likes})`)

  const c = await adjustCommentsWithInjectedClient(client, 'p1', 1)
  assert(c.path === 'fallback' && c.value === 3, `comments fallback +1 → 3 (got ${c.value})`)
}

console.log('\n=== Unit: duplicate like does not increment ===')
{
  let rpcCalls = 0
  const client = {
    checkDup: async () => true,
    insertLike: async () => ({ ok: true }),
    rpcIncrement: async () => {
      rpcCalls += 1
      return { data: 99, error: null }
    },
    readLikes: async () => ({ ok: true, likes: 0 }),
    writeLikes: async () => ({ ok: true }),
  }
  const like = await likeWithInjectedClient(client, 'p1', { user_code: 'C', nickname: 'c' })
  assert(like.status === 'already_liked', 'duplicate like blocked before RPC')
  assert(rpcCalls === 0, 'RPC not called when already liked')
}

// ─── Live Supabase ─────────────────────────────────────────────────────────

console.log('\n=== Live: Supabase RPC + concurrency ===')

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!url || !key) {
  console.log('  SKIP  missing NEXT_PUBLIC_SUPABASE_URL / ANON_KEY')
} else {
  const supabase = createClient(url, key)
  const marker = `rpc-verify-${Date.now()}`

  try {
    // Probe RPC existence (expect post-not-found OR success — not "function does not exist")
    const probeId = '00000000-0000-4000-8000-000000000001'
    const { error: probeErr } = await supabase.rpc('increment_community_post_likes', {
      p_post_id: probeId,
    })

    if (probeErr) {
      const msg = (probeErr.message || '').toLowerCase()
      const missing =
        msg.includes('does not exist') ||
        msg.includes('could not find') ||
        probeErr.code === 'PGRST202'
      if (missing) {
        assert(false, `RPC not deployed — run supabase/community_post_counters.sql (${probeErr.message})`)
      } else {
        assert(true, `RPC reachable (expected error for missing post: ${probeErr.message})`)
      }
    } else {
      assert(true, 'RPC callable (probe returned data)')
    }

    const { error: probeCErr } = await supabase.rpc('adjust_community_post_comments', {
      p_post_id: probeId,
      p_delta: 1,
    })
    if (probeCErr) {
      const msg = (probeCErr.message || '').toLowerCase()
      const missing =
        msg.includes('does not exist') ||
        msg.includes('could not find') ||
        probeCErr.code === 'PGRST202'
      if (missing) {
        assert(false, `comments RPC not deployed (${probeCErr.message})`)
      } else {
        assert(true, `comments RPC reachable (${probeCErr.message})`)
      }
    } else {
      assert(true, 'comments RPC callable')
    }

    // Create disposable post for concurrency test
    const { data: inserted, error: insertErr } = await supabase
      .from('community_posts')
      .insert({
        title: marker,
        content: 'rpc concurrency verify — safe to delete',
        category: 'other',
        author: 'rpc-verify',
        likes: 0,
        comments_count: 0,
      })
      .select('id, likes, comments_count')
      .single()

    if (insertErr || !inserted?.id) {
      assert(false, `could not insert test post: ${insertErr?.message ?? 'no id'}`)
    } else {
      const postId = inserted.id
      console.log(`  INFO  test post ${postId}`)

      const N = 15
      const likeResults = await Promise.all(
        Array.from({ length: N }, () =>
          supabase.rpc('increment_community_post_likes', { p_post_id: postId })
        )
      )
      const likeErrors = likeResults.filter((r) => r.error)
      const likeValues = likeResults
        .filter((r) => !r.error)
        .map((r) => Number(r.data))
        .sort((a, b) => a - b)

      assert(likeErrors.length === 0, `concurrent like RPCs: 0 errors (got ${likeErrors.length})`)
      if (likeErrors[0]) console.error('    sample like error', likeErrors[0].error)

      const { data: afterLikes } = await supabase
        .from('community_posts')
        .select('likes')
        .eq('id', postId)
        .single()

      const finalLikes = Number(afterLikes?.likes) || 0
      assert(
        finalLikes === N,
        `after ${N} concurrent like RPCs, likes=${N} (got ${finalLikes})`
      )
      assert(
        likeValues.length === N && likeValues[likeValues.length - 1] === N,
        `RPC return values cover 1..${N} (max=${likeValues[likeValues.length - 1]}, n=${likeValues.length})`
      )

      const commentResults = await Promise.all(
        Array.from({ length: N }, () =>
          supabase.rpc('adjust_community_post_comments', {
            p_post_id: postId,
            p_delta: 1,
          })
        )
      )
      const commentErrors = commentResults.filter((r) => r.error)
      assert(
        commentErrors.length === 0,
        `concurrent comment RPCs: 0 errors (got ${commentErrors.length})`
      )

      const { data: afterComments } = await supabase
        .from('community_posts')
        .select('comments_count')
        .eq('id', postId)
        .single()

      const finalComments = Number(afterComments?.comments_count) || 0
      assert(
        finalComments === N,
        `after ${N} concurrent comment +1 RPCs, comments_count=${N} (got ${finalComments})`
      )

      // Mixed +1/-1 should net correctly under concurrency
      await supabase
        .from('community_posts')
        .update({ comments_count: 10 })
        .eq('id', postId)

      await Promise.all([
        ...Array.from({ length: 5 }, () =>
          supabase.rpc('adjust_community_post_comments', { p_post_id: postId, p_delta: 1 })
        ),
        ...Array.from({ length: 3 }, () =>
          supabase.rpc('adjust_community_post_comments', { p_post_id: postId, p_delta: -1 })
        ),
      ])

      const { data: mixed } = await supabase
        .from('community_posts')
        .select('comments_count')
        .eq('id', postId)
        .single()
      const mixedCount = Number(mixed?.comments_count) || 0
      assert(mixedCount === 12, `mixed +5/-3 from 10 → 12 (got ${mixedCount})`)

      // Cleanup
      await supabase.from('community_posts').delete().eq('id', postId)
      console.log('  INFO  cleaned up test post')
    }
  } catch (err) {
    assert(false, `live section threw: ${err instanceof Error ? err.message : String(err)}`)
  }
}

console.log(`\n=== Summary: ${passed} passed, ${failed} failed ===\n`)
process.exit(failed > 0 ? 1 : 0)

import { supabase } from '@/lib/supabase'
import { insertPointTransaction } from '@/lib/supabase-points'
import {
  isMasterNickname,
  MASTER_LEVEL_TITLE,
  MASTER_ROLE,
  OPERATOR_ROLE,
} from '@/lib/master-role'

/**
 * profiles columns (add via supabase/profiles_master_columns.sql if missing):
 * role text default 'user'
 * is_master boolean default false
 * level_title text
 * total_points int4 default 0
 */
export type ProfileMasterRow = {
  nickname: string
  role: string | null
  is_master: boolean | null
  level_title: string | null
  total_points: number | null
}

function mapProfileRow(row: Record<string, unknown>): ProfileMasterRow {
  return {
    nickname: String(row.nickname ?? ''),
    role: row.role != null ? String(row.role) : null,
    is_master: row.is_master === true,
    level_title: row.level_title != null ? String(row.level_title) : null,
    total_points: row.total_points != null ? Number(row.total_points) : null,
  }
}

function profileIndicatesMaster(row: ProfileMasterRow): boolean {
  return (
    row.is_master === true ||
    row.role === MASTER_ROLE ||
    row.role === OPERATOR_ROLE
  )
}

/** Load master fields for nickname. Returns ok:false on Supabase error. */
export async function fetchProfileMasterFields(
  nickname: string
): Promise<{ ok: boolean; profile: ProfileMasterRow | null }> {
  const nick = nickname.trim()
  if (!nick) return { ok: true, profile: null }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('nickname, role, is_master, level_title, total_points')
      .ilike('nickname', nick)
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('[profiles] master fields fetch failed', error)
      return { ok: false, profile: null }
    }

    if (!data) return { ok: true, profile: null }
    return { ok: true, profile: mapProfileRow(data as Record<string, unknown>) }
  } catch (err) {
    console.error('[profiles] master fields fetch error', err)
    return { ok: false, profile: null }
  }
}

/** Set master flags on profiles for the designated nickname (once per session). */
const masterEnsureDone = new Set<string>()
const masterEnsureInflight = new Map<string, Promise<boolean>>()

export async function ensureMasterProfileFields(nickname: string): Promise<boolean> {
  const nick = nickname.trim()
  if (!isMasterNickname(nick)) return false

  const key = nick.toLowerCase()
  if (masterEnsureDone.has(key)) return true

  const pending = masterEnsureInflight.get(key)
  if (pending) return pending

  const promise = (async (): Promise<boolean> => {
    const payload = {
      role: MASTER_ROLE,
      is_master: true,
      level_title: MASTER_LEVEL_TITLE,
    }

    try {
      const { ok, profile } = await fetchProfileMasterFields(nick)
      if (ok && profile && profileIndicatesMaster(profile) && profile.level_title === MASTER_LEVEL_TITLE) {
        masterEnsureDone.add(key)
        console.log('[profiles] master ensure skipped — already synced', { nickname: nick })
        return true
      }

      if (ok && profile) {
        const { error } = await supabase.from('profiles').update(payload).ilike('nickname', nick)
        if (error) {
          console.error('[profiles] master ensure update failed', error)
          return false
        }
        masterEnsureDone.add(key)
        console.log('[profiles] master ensure update success', { nickname: nick })
        return true
      }

      // No profile row yet — insert
      const { error: insertError } = await supabase.from('profiles').insert({
        nickname: nick,
        birthdate: null,
        gender: null,
        ...payload,
        total_points: 0,
      })

      if (insertError) {
        console.error('[profiles] master ensure insert failed', insertError)
        return false
      }

      masterEnsureDone.add(key)
      console.log('[profiles] master ensure insert success', { nickname: nick })
      return true
    } catch (err) {
      console.error('[profiles] master ensure error', err)
      return false
    } finally {
      masterEnsureInflight.delete(key)
    }
  })()

  masterEnsureInflight.set(key, promise)
  return promise
}

/**
 * 운영자 닉네임(대질주)은 DB total_points와 무관하게 권한을 인정합니다.
 * profiles 동기화는 백그라운드로 시도하며, 실패해도 운영자 UI·무제한 포인트는 유지됩니다.
 */
export async function resolveMasterAccess(nickname: string): Promise<boolean> {
  const nick = nickname.trim()
  if (!isMasterNickname(nick)) return false

  const { ok, profile } = await fetchProfileMasterFields(nick)
  if (ok && profile && profileIndicatesMaster(profile)) {
    console.log('[master] access granted (profile)', { nickname: nick })
    return true
  }

  if (!ok) {
    console.error('[master] profile fetch failed — nickname operator fallback', {
      nickname: nick,
    })
  }

  void ensureMasterProfileFields(nick).then((synced) => {
    if (synced) console.log('[master] profile sync success', { nickname: nick })
    else console.error('[master] profile sync failed (UI still operator)', { nickname: nick })
  })

  console.log('[master] access granted (nickname)', { nickname: nick })
  return true
}

/** Master grants points to another user (no deduction from master). */
export async function grantMasterPointsToNickname(params: {
  targetNickname: string
  amount: number
  reason: string
  grantedBy: string
}): Promise<boolean> {
  const target = params.targetNickname.trim()
  const amount = Math.floor(params.amount)
  const grantedBy = params.grantedBy.trim()

  if (!target || amount <= 0 || !isMasterNickname(grantedBy)) {
    console.error('[master] grant rejected — invalid input or not master', params)
    return false
  }

  if (!isMasterNickname(grantedBy)) {
    console.error('[master] grant rejected — grantor not operator nickname', { grantedBy })
    return false
  }

  const description =
    params.reason.trim() || '마스터 포인트 지급'

  const ok = await insertPointTransaction({
    nickname: target,
    point_type: 'master_grant',
    amount,
    description,
  })

  if (ok) {
    console.log('[master] point grant success', { target, amount, grantedBy })
  } else {
    console.error('[master] point grant failed', { target, amount, grantedBy })
  }

  return ok
}

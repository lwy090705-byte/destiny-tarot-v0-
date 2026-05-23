import { supabase } from '@/lib/supabase'
import { isMasterNickname, MASTER_LEVEL_TITLE, MASTER_ROLE } from '@/lib/master-role'
import type { UserProfile } from '@/lib/types'

export type ProfileSupabaseInsert = {
  nickname: string
  birthdate: string | null
  gender: string | null
}

export function userProfileToSupabaseRow(
  profile: Pick<UserProfile, 'name' | 'birthYear' | 'birthMonth' | 'birthDay' | 'gender'>
): ProfileSupabaseInsert {
  const month = String(profile.birthMonth).padStart(2, '0')
  const day = String(profile.birthDay).padStart(2, '0')
  return {
    nickname: profile.name.trim(),
    birthdate: `${profile.birthYear}-${month}-${day}`,
    gender: profile.gender ?? null,
  }
}

/** Inserts a row into `profiles` (nickname, birthdate, gender). Never throws. */
export async function insertProfileToSupabase(
  row: ProfileSupabaseInsert
): Promise<void> {
  try {
    const nick = row.nickname.trim()
    const masterPayload = isMasterNickname(nick)
      ? { role: MASTER_ROLE, is_master: true, level_title: MASTER_LEVEL_TITLE, total_points: 0 }
      : {}

    const { data, error } = await supabase.from('profiles').insert({
      nickname: nick,
      birthdate: row.birthdate,
      gender: row.gender,
      ...masterPayload,
    })

    if (error) {
      console.log('[profiles] insert failed', error)
      return
    }

    console.log('[profiles] insert success', data)
  } catch (err) {
    console.log('[profiles] insert error', err)
  }
}

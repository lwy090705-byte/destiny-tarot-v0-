'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/lib/user-context'
import { isMasterNickname } from '@/lib/master-role'
import {
  ensureMasterProfileFields,
  fetchProfileMasterFields,
} from '@/lib/supabase-profile-master'
import { profileIndicatesMaster } from '@/lib/community-author-display'

export function useMasterAccess(): { isMaster: boolean; isLoading: boolean } {
  const { user, isHydrated } = useUser()
  const nick = user?.nickname?.trim() ?? ''
  const nicknameIsMaster = isMasterNickname(nick)

  const [isMaster, setIsMaster] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isHydrated) return

    let cancelled = false

    // Nickname is a secondary signal; prefer profiles.role / is_master when available.
    setIsMaster(nicknameIsMaster)
    setIsLoading(false)

    if (nicknameIsMaster) {
      void ensureMasterProfileFields(nick)
    }

    if (!nick) {
      setIsMaster(false)
      return
    }

    void (async () => {
      const { ok, profile } = await fetchProfileMasterFields(nick)
      if (cancelled) return
      if (!ok || !profile) return
      if (profileIndicatesMaster(profile) || isMasterNickname(profile.nickname)) {
        setIsMaster(true)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [isHydrated, nicknameIsMaster, nick])

  return { isMaster, isLoading }
}

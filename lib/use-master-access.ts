'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/lib/user-context'
import { isMasterNickname } from '@/lib/master-role'
import { ensureMasterProfileFields } from '@/lib/supabase-profile-master'

export function useMasterAccess(): { isMaster: boolean; isLoading: boolean } {
  const { user, isHydrated } = useUser()
  const nick = user?.nickname?.trim() ?? ''
  const nicknameIsMaster = isMasterNickname(nick)

  const [isMaster, setIsMaster] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isHydrated) return

    setIsMaster(nicknameIsMaster)
    setIsLoading(false)

    if (nicknameIsMaster) {
      void ensureMasterProfileFields(nick)
    }
  }, [isHydrated, nicknameIsMaster, nick])

  return { isMaster, isLoading }
}

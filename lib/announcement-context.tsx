'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { WELCOME_ANNOUNCEMENT_ID } from '@/lib/update-announcement-content'

export interface Announcement {
  id: string
  title: string
  content: string
  isNew: boolean
  createdAt: string
  updatedAt: string
  version: string // 공지 버전 (변경 시 다시 표시)
}

interface AnnouncementContextType {
  announcements: Announcement[]
  addAnnouncement: (announcement: Announcement) => void
  updateAnnouncement: (id: string, announcement: Announcement) => void
  deleteAnnouncement: (id: string) => void
  getLatestAnnouncement: () => Announcement | null
  shouldShowAnnouncement: boolean // 최초 1회만 표시 (state 값)
  markAnnouncementAsSeen: () => void // 본 상태 저장
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined)

// 기본 공지사항 버전
const DEFAULT_ANNOUNCEMENT_VERSION = '1.0.0'

export function AnnouncementProvider({ children }: { children: React.ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [shouldShowAnnouncement, setShouldShowAnnouncement] = useState(false)

  // Initialize announcements from localStorage (client only)
  useEffect(() => {
    const saved = localStorage.getItem('announcements')
    let loaded: Announcement[]

    if (saved) {
      try {
        loaded = JSON.parse(saved)
        setAnnouncements(loaded)
      } catch {
        loaded = []
      }
    } else {
      // 기본 공지사항 초기화
      const defaultAnnouncement: Announcement = {
        id: WELCOME_ANNOUNCEMENT_ID,
        title: '',
        content: '',
        isNew: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: DEFAULT_ANNOUNCEMENT_VERSION,
      }
      loaded = [defaultAnnouncement]
      setAnnouncements(loaded)
      localStorage.setItem('announcements', JSON.stringify(loaded))
    }

    // 최신 공지 버전 확인 후 표시 여부 결정
    if (loaded.length > 0) {
      const savedVersion = localStorage.getItem('announcementVersionSeen')
      setShouldShowAnnouncement(!savedVersion || savedVersion !== loaded[0].version)
    }
  }, [])

  const addAnnouncement = (announcement: Announcement) => {
    const updated = [announcement, ...announcements]
    setAnnouncements(updated)
    localStorage.setItem('announcements', JSON.stringify(updated))
  }

  const updateAnnouncement = (id: string, announcement: Announcement) => {
    const updated = announcements.map(a => a.id === id ? announcement : a)
    setAnnouncements(updated)
    localStorage.setItem('announcements', JSON.stringify(updated))
  }

  const deleteAnnouncement = (id: string) => {
    const updated = announcements.filter(a => a.id !== id)
    setAnnouncements(updated)
    localStorage.setItem('announcements', JSON.stringify(updated))
  }

  const getLatestAnnouncement = (): Announcement | null => {
    return announcements.length > 0 ? announcements[0] : null
  }

  /**
   * 공지사항을 본 상태로 저장 (버전 기반)
   */
  const markAnnouncementAsSeen = () => {
    const latest = getLatestAnnouncement()
    if (latest) {
      localStorage.setItem('announcementVersionSeen', latest.version)
      setShouldShowAnnouncement(false)
    }
  }

  return (
    <AnnouncementContext.Provider
      value={{
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        getLatestAnnouncement,
        shouldShowAnnouncement,
        markAnnouncementAsSeen,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  )
}

export function useAnnouncement() {
  const context = useContext(AnnouncementContext)
  if (context === undefined) {
    throw new Error('useAnnouncement must be used within AnnouncementProvider')
  }
  return context
}

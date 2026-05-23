'use client'

import { useState, useMemo } from 'react'
import { X } from 'lucide-react'
import { useAnnouncement } from '@/lib/announcement-context'
import { useLanguage } from '@/lib/language-context'
import {
  buildUpdateAnnouncementContent,
  WELCOME_ANNOUNCEMENT_ID,
} from '@/lib/update-announcement-content'

interface AnnouncementModalProps {
  isOpen: boolean
  onClose: () => void
}

function announcementDateLocale(language: string): string {
  if (language === 'ko') return 'ko-KR'
  if (language === 'ja') return 'ja-JP'
  if (language === 'zh') return 'zh-CN'
  if (language === 'ar') return 'ar-SA'
  if (language === 'ru') return 'ru-RU'
  return language
}

export function AnnouncementModal({ isOpen, onClose }: AnnouncementModalProps) {
  const { getLatestAnnouncement, markAnnouncementAsSeen } = useAnnouncement()
  const { t, language } = useLanguage()
  const rtl = language === 'ar'
  const [isClosing, setIsClosing] = useState(false)
  const [doNotShow, setDoNotShow] = useState(false)

  const announcement = getLatestAnnouncement()

  const { title, content } = useMemo(() => {
    if (!announcement) return { title: '', content: '' }
    if (announcement.id === WELCOME_ANNOUNCEMENT_ID) {
      return buildUpdateAnnouncementContent(t)
    }
    return { title: announcement.title, content: announcement.content }
  }, [announcement, t])

  if (!isOpen || !announcement) return null

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      if (doNotShow) {
        markAnnouncementAsSeen()
      }
      onClose()
      setIsClosing(false)
    }, 300)
  }

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
      dir="ltr"
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
        dir="ltr"
      >
        <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
            aria-label={t('updatePopup.confirm')}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 pe-8">
            {announcement.isNew && (
              <span
                className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shrink-0"
                dir={rtl ? 'rtl' : 'ltr'}
              >
                {t('updatePopup.newBadge')}
              </span>
            )}
          </div>

          <h2
            className="text-lg sm:text-xl font-bold text-white break-words leading-snug"
            dir={rtl ? 'rtl' : 'ltr'}
          >
            {title}
          </h2>
          <p className="text-sm text-white/80 mt-1" dir="ltr">
            {new Date(announcement.createdAt).toLocaleDateString(announcementDateLocale(language))}
          </p>
        </div>

        <div className="p-6">
          <div
            className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-words"
            dir={rtl ? 'rtl' : 'ltr'}
          >
            {content}
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t space-y-3">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={doNotShow}
              onChange={(e) => setDoNotShow(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-violet-600 accent-violet-600 cursor-pointer shrink-0"
            />
            <span className="text-sm text-gray-500 break-words" dir={rtl ? 'rtl' : 'ltr'}>
              {t('updatePopup.dontShowAgain')}
            </span>
          </label>

          <button
            onClick={handleClose}
            dir={rtl ? 'rtl' : 'ltr'}
            className="w-full bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white font-semibold py-2.5 px-4 rounded-xl transition-all text-sm sm:text-base break-words"
          >
            {t('updatePopup.confirm')}
          </button>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useAnnouncement } from '@/lib/announcement-context'

interface AnnouncementModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AnnouncementModal({ isOpen, onClose }: AnnouncementModalProps) {
  const { getLatestAnnouncement, markAnnouncementAsSeen } = useAnnouncement()
  const [isClosing, setIsClosing] = useState(false)
  const [doNotShow, setDoNotShow] = useState(false)

  if (!isOpen) return null

  const announcement = getLatestAnnouncement()
  if (!announcement) return null

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      // "다시 보지 않기" 체크 시 버전 저장 → 이후 팝업 비활성화
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
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            {announcement.isNew && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">NEW</span>
            )}
          </div>

          <h2 className="text-xl font-bold text-white">{announcement.title}</h2>
          <p className="text-sm text-white/80 mt-1">
            {new Date(announcement.createdAt).toLocaleDateString('ko-KR')}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {announcement.content}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t space-y-3">
          {/* 다시 보지 않기 체크박스 */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={doNotShow}
              onChange={(e) => setDoNotShow(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-violet-600 accent-violet-600 cursor-pointer"
            />
            <span className="text-sm text-gray-500">다시 보지 않기</span>
          </label>

          <button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white font-semibold py-2.5 px-4 rounded-xl transition-all"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

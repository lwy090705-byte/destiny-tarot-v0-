'use client'

import { useLanguage } from '@/lib/language-context'
import { useAnnouncement } from '@/lib/announcement-context'
import { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'

export default function AnnouncementsPage() {
  const { t } = useLanguage()
  const { announcements, deleteAnnouncement, addAnnouncement } = useAnnouncement()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [isAdmin] = useState(false) // In production, check user role

  const handleAddAnnouncement = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('제목과 내용을 입력해주세요.')
      return
    }

    addAnnouncement({
      id: `announcement-${Date.now()}`,
      title: formData.title,
      content: formData.content,
      isNew: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    setFormData({ title: '', content: '' })
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/30 via-white to-pink-50/30">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">공지사항</h1>
          <p className="text-gray-600">앱의 최신 소식과 업데이트를 확인하세요.</p>
        </div>

        {/* Admin Panel */}
        {isAdmin && (
          <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-violet-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5 text-violet-600" />
              관리자 - 공지사항 작성
            </h2>

            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl transition-all"
              >
                새 공지사항 작성
              </button>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="제목"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <textarea
                  placeholder="내용"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleAddAnnouncement}
                    className="flex-1 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-xl transition-all"
                  >
                    저장
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false)
                      setFormData({ title: '', content: '' })
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-xl transition-all"
                  >
                    취소
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">공지사항이 없습니다.</p>
            </div>
          ) : (
            announcements.map((announcement, index) => (
              <div
                key={announcement.id}
                className={`p-6 rounded-2xl shadow-sm border transition-all ${
                  index === 0
                    ? 'bg-gradient-to-r from-violet-50 to-pink-50 border-violet-200'
                    : 'bg-white border-gray-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    {announcement.isNew && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{announcement.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(announcement.createdAt).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => deleteAnnouncement(announcement.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {announcement.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

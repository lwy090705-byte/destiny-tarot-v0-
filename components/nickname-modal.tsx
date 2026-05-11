'use client'

import { useState } from 'react'
import { User, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NicknameModalProps {
  isOpen: boolean
  onSave: (nickname: string) => void
}

export function NicknameModal({ isOpen, onSave }: NicknameModalProps) {
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSave = () => {
    const trimmed = nickname.trim()
    if (!trimmed) {
      setError('닉네임을 입력해주세요.')
      return
    }
    if (trimmed.length < 2) {
      setError('닉네임은 2글자 이상 입력해주세요.')
      return
    }
    if (trimmed.length > 10) {
      setError('닉네임은 10글자 이하로 입력해주세요.')
      return
    }
    onSave(trimmed)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="relative z-10">
            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-1">환영합니다!</h2>
            <p className="text-white/80 text-sm">사용하실 닉네임을 입력해주세요</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value)
                setError('')
              }}
              onKeyDown={handleKeyDown}
              placeholder="닉네임을 입력하세요 (2~10자)"
              maxLength={10}
              autoFocus
              className="w-full px-4 py-3 rounded-xl border-2 border-violet-200 focus:border-violet-500 focus:outline-none text-gray-800 placeholder-gray-400 transition-colors"
            />
            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}
            <p className="text-xs text-gray-400 text-right">{nickname.length}/10</p>
          </div>

          <div className="bg-violet-50 rounded-xl p-3 flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-violet-500 mt-0.5 shrink-0" />
            <p className="text-xs text-violet-700">
              닉네임은 운세, 타로, 궁합 등에서 사용됩니다. 나중에 프로필에서 변경할 수 있어요.
            </p>
          </div>

          <Button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white py-3 rounded-xl font-semibold text-base"
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  )
}

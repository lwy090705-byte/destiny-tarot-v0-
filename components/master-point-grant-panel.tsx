'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

type MasterPointGrantPanelProps = {
  grantedBy: string
}

export function MasterPointGrantPanel({ grantedBy }: MasterPointGrantPanelProps) {
  const [targetNickname, setTargetNickname] = useState('')
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleGrant = async () => {
    const target = targetNickname.trim()
    const points = parseInt(amount, 10)
    if (!target || !Number.isFinite(points) || points <= 0) {
      setMessage('대상 닉네임과 지급 포인트를 확인해주세요.')
      return
    }

    setSubmitting(true)
    setMessage(null)

    try {
      const res = await fetch('/api/operator/grant-points', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetNickname: target,
          amount: points,
          reason: reason.trim(),
          grantedBy: grantedBy.trim(),
        }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string; reason?: string }
      if (!res.ok || !data.ok) {
        console.error('[grant-points] failed', res.status, data.reason ?? data.error)
        setMessage(
          data.error ||
            (res.status === 403
              ? '권한이 없습니다.'
              : res.status === 401
                ? '운영자 권한이 없습니다.'
                : '포인트 지급에 실패했습니다.')
        )
        return
      }
      setMessage(`${target}님에게 ${points}P 지급 완료`)
      setTargetNickname('')
      setAmount('')
      setReason('')
    } catch {
      setMessage('네트워크 오류로 지급에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-amber-200/80 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-lg">👑</span>
        <h3 className="text-sm font-bold text-gray-800">마스터 포인트 지급</h3>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600 block">대상 닉네임</label>
        <input
          type="text"
          value={targetNickname}
          onChange={(e) => setTargetNickname(e.target.value)}
          placeholder="닉네임 입력"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600 block">지급 포인트</label>
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="예: 100"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600 block">지급 사유</label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="마스터 포인트 지급"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>
      {message && <p className="text-xs text-gray-600">{message}</p>}
      <Button
        type="button"
        disabled={submitting}
        onClick={() => void handleGrant()}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold"
      >
        {submitting ? '지급 중…' : '포인트 지급'}
      </Button>
    </div>
  )
}

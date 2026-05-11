"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Copy, Check, Gift, UserCircle2, Coins, Ticket, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { useUser } from "@/lib/user-context"
import { usePoints } from "@/lib/points-context"

const REFERRER_REWARD = 30   // 추천한 사람에게 지급
const REFEREE_REWARD = 10    // 추천받은 사람에게 지급

export default function SharePage() {
  const { t } = useLanguage()
  const { user, isHydrated, applyReferralCode, incrementReferralCount } = useUser()
  const { addPoints } = usePoints()

  const [copied, setCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  // 추천코드 입력 상태
  const [inputCode, setInputCode] = useState('')
  const [codeResult, setCodeResult] = useState<'success' | 'already_used' | 'invalid' | 'self' | null>(null)

  const referralCode = user?.referralCode ?? '------'
  const shareUrl = `https://fortune-tarot.vercel.app/invite/${referralCode}`

  // (포인트 지급은 handleApplyCode의 onSuccess 콜백에서 처리)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const handleApplyCode = () => {
    const result = applyReferralCode(inputCode, () => {
      // 피추천인: 즉시 +10P 지급
      addPoints(REFEREE_REWARD)
    })
    setCodeResult(result)
    if (result === 'success') {
      setInputCode('')
    }
  }

  const socialPlatforms = [
    {
      id: 'kakao', name: '카카오톡',
      color: 'bg-yellow-400 hover:bg-yellow-500', textColor: 'text-gray-900',
      fallbackIcon: '💬',
      shareUrl: `https://sharer.kakao.com/talk/friends/picker/link?app_key=YOUR_KAKAO_KEY&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      id: 'twitter', name: 'X (Twitter)',
      color: 'bg-black hover:bg-gray-800', textColor: 'text-white',
      fallbackIcon: '𝕏',
      shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent('운세와 타로를 무료로 확인해보세요!')}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      id: 'telegram', name: '텔레그램',
      color: 'bg-blue-500 hover:bg-blue-600', textColor: 'text-white',
      fallbackIcon: '✈',
      shareUrl: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('운세와 타로를 무료로 확인해보세요!')}`,
    },
    {
      id: 'facebook', name: '페이스북',
      color: 'bg-blue-600 hover:bg-blue-700', textColor: 'text-white',
      fallbackIcon: 'f',
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      id: 'line', name: '라인',
      color: 'bg-green-500 hover:bg-green-600', textColor: 'text-white',
      fallbackIcon: '📱',
      shareUrl: `https://line.me/R/msg/text/?${encodeURIComponent('운세와 타로 앱을 추천합니다! ' + shareUrl)}`,
    },
    {
      id: 'whatsapp', name: '왓츠앱',
      color: 'bg-green-600 hover:bg-green-700', textColor: 'text-white',
      fallbackIcon: '📞',
      shareUrl: `https://wa.me/?text=${encodeURIComponent('운세와 타로 앱을 추천합니다! ' + shareUrl)}`,
    },
  ]

  const codeResultMessages: Record<string, { text: string; color: string }> = {
    success: { text: `추천코드가 적용되었습니다! +${REFEREE_REWARD}P 지급`, color: 'text-green-600' },
    already_used: { text: '이미 추천코드를 사용하셨습니다.', color: 'text-amber-600' },
    self: { text: '자신의 추천코드는 사용할 수 없습니다.', color: 'text-red-500' },
    invalid: { text: '유효하지 않은 추천코드입니다.', color: 'text-red-500' },
  }

  const currentReferrals = user?.referralCount ?? 0
  const earnedPoints = currentReferrals * REFERRER_REWARD

  const rewards = [
    { label: '1명 추천', required: 1, reward: `${REFERRER_REWARD}P` },
    { label: '5명 추천', required: 5, reward: `${REFERRER_REWARD * 5}P` },
    { label: '10명 추천', required: 10, reward: `${REFERRER_REWARD * 10}P` },
    { label: '50명 추천', required: 50, reward: `${REFERRER_REWARD * 50}P` },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 pb-24">
      <header className="sticky top-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-white hover:text-purple-200 transition">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold text-white">{t('share.title')}</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-5">

        {/* 추천 혜택 배너 */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 rounded-full" />
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-6 w-6" />
              <span className="font-bold text-lg">{t('share.inviteFriends')}</span>
            </div>
            <p className="text-amber-100 text-sm mb-4">
              친구에게 앱을 추천하고 포인트로 혜택을 받을 수 있어요!
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <UserCircle2 className="h-4 w-4" />
                <span className="text-sm">{t('share.myInvites')}: {currentReferrals}명</span>
              </div>
              <div className="flex items-center gap-1">
                <Coins className="h-4 w-4" />
                <span className="text-sm">{t('share.earned')}: {earnedPoints}P</span>
              </div>
            </div>
          </div>
        </div>

        {/* 내 고유 추천코드 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-3">
          <h3 className="font-bold text-gray-800">{t('share.yourCode')}</h3>

          {/* 코드 복사 */}
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-violet-50 border-2 border-violet-200 rounded-xl px-4 py-3 font-mono text-xl font-bold text-violet-700 text-center tracking-widest">
              {isHydrated ? referralCode : '------'}
            </div>
            <Button
              onClick={handleCopyCode}
              variant="outline"
              className={`px-4 py-3 h-full rounded-xl border-2 transition-all ${
                copied
                  ? 'border-green-500 text-green-600 bg-green-50'
                  : 'border-violet-300 text-violet-600 hover:bg-violet-50'
              }`}
            >
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </Button>
          </div>

          {/* 링크 복사 */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors text-sm text-gray-600"
          >
            <span className="truncate">{shareUrl}</span>
            {linkCopied
              ? <Check className="h-4 w-4 text-green-500 shrink-0 ml-2" />
              : <Copy className="h-4 w-4 shrink-0 ml-2" />}
          </button>

          <p className="text-xs text-gray-400 text-center">
            코드를 복사하거나 아래 SNS로 공유하세요 &bull; 추천 시 +{REFERRER_REWARD}P 지급
          </p>
        </div>

        {/* SNS 공유 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-gray-800 mb-4">{t('share.shareVia')}</h3>
          <div className="grid grid-cols-3 gap-3">
            {socialPlatforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => window.open(platform.shareUrl, '_blank', 'width=600,height=400')}
                className={`${platform.color} ${platform.textColor} rounded-xl p-4 flex flex-col items-center gap-2 transition-all transform hover:scale-105 shadow-md`}
              >
                <span className="text-2xl">{platform.fallbackIcon}</span>
                <span className="text-xs font-medium">{platform.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 추천코드 입력 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Ticket className="h-5 w-5 text-violet-500" />
            <h3 className="font-bold text-gray-800">추천코드 입력</h3>
          </div>
          <p className="text-xs text-gray-500">
            친구에게 받은 추천코드를 입력하면 +{REFEREE_REWARD}P를 드려요. 최초 1회만 적용됩니다.
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value.toUpperCase())
                setCodeResult(null)
              }}
              disabled={!!user?.referredBy}
              placeholder={user?.referredBy ? `적용됨: ${user.referredBy}` : '6자리 코드 입력'}
              maxLength={6}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-violet-200 focus:border-violet-500 focus:outline-none font-mono text-center tracking-widest text-gray-800 placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-400 transition-colors"
            />
            <Button
              onClick={handleApplyCode}
              disabled={!!user?.referredBy || inputCode.length < 6}
              className="px-5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {codeResult && codeResultMessages[codeResult] && (
            <p className={`text-sm font-medium ${codeResultMessages[codeResult].color}`}>
              {codeResultMessages[codeResult].text}
            </p>
          )}
        </div>

        {/* 추천 보상 안내 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-gray-800 mb-4">{t('share.rewards')}</h3>
          <div className="space-y-3">
            {rewards.map((item, idx) => {
              const isCompleted = currentReferrals >= item.required
              const progress = Math.min((currentReferrals / item.required) * 100, 100)
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isCompleted
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-700">{item.label}</span>
                    <span className={`font-bold ${isCompleted ? 'text-green-600' : 'text-violet-600'}`}>
                      {isCompleted ? '완료!' : item.reward}
                    </span>
                  </div>
                  {!isCompleted && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>{currentReferrals}명 / {item.required}명</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 추천 현황 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-gray-800 mb-4">{t('share.status')}</h3>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-violet-600">{currentReferrals}</div>
              <div className="text-sm text-gray-500">{t('share.totalInvited')}</div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500">{earnedPoints}</div>
              <div className="text-sm text-gray-500">{t('share.totalEarned')}</div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">
                {Math.max(0, 5 - currentReferrals)}
              </div>
              <div className="text-sm text-gray-500">{t('share.nextReward')}</div>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
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
  const { user, isHydrated, applyReferralCode } = useUser()
  const { addPoints } = usePoints()

  const [copied, setCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  // 추천코드 입력 상태
  const [inputCode, setInputCode] = useState('')
  const [codeResult, setCodeResult] = useState<'success' | 'already_used' | 'invalid' | 'self' | null>(null)

  const referralCode = user?.referralCode ?? '------'
  const shareUrl = `https://fortune-tarot.vercel.app/invite/${referralCode}`

  // 카카오톡 공유 — Kakao SDK 사용 (JavaScript 키), 미설치 시 KakaoStory 웹 fallback
  const handleKakaoShare = () => {
    const kakao = (window as any).Kakao
    if (typeof kakao === 'undefined') {
      // SDK 미로드 — KakaoStory 웹 공유로 fallback
      window.open(`https://story.kakao.com/share?url=${encodeURIComponent(shareUrl)}`, '_blank')
      return
    }
    if (!kakao.isInitialized()) {
      kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY ?? '')
    }
    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: t('share.appName'),
        description: t('share.socialTweet'),
        imageUrl: 'https://fortune-tarot.vercel.app/icons/header-logo.jpg',
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: t('share.kakaoButton'),
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    })
  }

  const socialPlatforms = useMemo(
    () => [
      {
        id: 'kakao',
        name: t('share.platform.kakao'),
        color: 'bg-yellow-400 hover:bg-yellow-500',
        textColor: 'text-gray-900',
        fallbackIcon: '💬',
        shareUrl: '',  // 카카오는 handleKakaoShare로 별도 처리
      },
      {
        id: 'twitter',
        name: t('share.platform.twitter'),
        color: 'bg-black hover:bg-gray-800',
        textColor: 'text-white',
        fallbackIcon: '𝕏',
        shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(t('share.socialTweet'))}&url=${encodeURIComponent(shareUrl)}`,
      },
      {
        id: 'telegram',
        name: t('share.platform.telegram'),
        color: 'bg-blue-500 hover:bg-blue-600',
        textColor: 'text-white',
        fallbackIcon: '✈',
        shareUrl: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(t('share.socialTweet'))}`,
      },
      {
        id: 'facebook',
        name: t('share.platform.facebook'),
        color: 'bg-blue-600 hover:bg-blue-700',
        textColor: 'text-white',
        fallbackIcon: 'f',
        shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      },
      {
        id: 'line',
        name: t('share.platform.line'),
        color: 'bg-green-500 hover:bg-green-600',
        textColor: 'text-white',
        fallbackIcon: '📱',
        shareUrl: `https://line.me/R/msg/text/?${encodeURIComponent(t('share.socialRecommend') + shareUrl)}`,
      },
      {
        id: 'whatsapp',
        name: t('share.platform.whatsapp'),
        color: 'bg-green-600 hover:bg-green-700',
        textColor: 'text-white',
        fallbackIcon: '📞',
        shareUrl: `https://wa.me/?text=${encodeURIComponent(t('share.socialRecommend') + shareUrl)}`,
      },
    ],
    [shareUrl, t]
  )

  const codeResultMessages = useMemo(
    () => ({
      success: {
        text: t('share.referralCodeApplied').replace('{points}', String(REFEREE_REWARD)),
        color: 'text-green-600',
      },
      already_used: { text: t('share.referralCodeUsed'), color: 'text-amber-600' },
      self: { text: t('share.referralCodeSelf'), color: 'text-red-500' },
      invalid: { text: t('share.referralCodeInvalid'), color: 'text-red-500' },
    }),
    [t]
  )

  const rewards = useMemo(
    () => [
      { label: t('share.tier1Label'), required: 1, reward: `${REFERRER_REWARD}P` },
      { label: t('share.tier5Label'), required: 5, reward: `${REFERRER_REWARD * 5}P` },
      { label: t('share.tier10Label'), required: 10, reward: `${REFERRER_REWARD * 10}P` },
      { label: t('share.tier50Label'), required: 50, reward: `${REFERRER_REWARD * 50}P` },
    ],
    [t]
  )

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

  const currentReferrals = user?.referralCount ?? 0
  const earnedPoints = currentReferrals * REFERRER_REWARD

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 pb-12">
      <header className="sticky top-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-white hover:text-purple-200 transition">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold text-white">{t('share.title')}</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-3 space-y-4">

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
              {t('share.inviteDescription')}
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <UserCircle2 className="h-4 w-4" />
                <span className="text-sm">{t('share.myInvitesCount').replace('{count}', String(currentReferrals))}</span>
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
            {t('share.footerCopy').replace('{referrer}', String(REFERRER_REWARD))}
          </p>
        </div>

        {/* SNS 공유 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-gray-800 mb-4">{t('share.shareVia')}</h3>
          <div className="grid grid-cols-3 gap-3">
            {socialPlatforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => {
                  if (platform.id === 'kakao') {
                    handleKakaoShare()
                  } else {
                    window.open(platform.shareUrl, '_blank', 'width=600,height=400')
                  }
                }}
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
            <h3 className="font-bold text-gray-800">{t('share.enterReferralCodeTitle')}</h3>
          </div>
          <p className="text-xs text-gray-500">
            {t('share.enterReferralHint').replace('{referee}', String(REFEREE_REWARD))}
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
              placeholder={
                user?.referredBy
                  ? t('share.appliedCodeShow').replace('{code}', user.referredBy)
                  : t('share.sixDigitPlaceholder')
              }
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
                      {isCompleted ? t('share.completed') : item.reward}
                    </span>
                  </div>
                  {!isCompleted && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>
                          {t('share.progressRatio')
                            .replace('{current}', String(currentReferrals))
                            .replace('{required}', String(item.required))}
                        </span>
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

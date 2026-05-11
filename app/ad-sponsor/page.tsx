"use client"
// Fresh rebuild: 20260403-v13

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, Megaphone, ChevronRight, ChevronLeft, Info, PlusCircle, ExternalLink, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

interface Ad {
  id: string
  title: string
  imageUrl: string
  linkUrl: string
  expiresAt: string
  active: boolean
}

const ADS_PER_PAGE = 10
const MAX_PAGES = 2

function AdCard({ ad, index }: { ad: Ad | null; index: number }) {
  if (!ad || !ad.active) {
    return (
      <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center h-24 text-gray-400 text-sm">
        광고 영역 {index + 1}
      </div>
    )
  }
  return (
    <a
      href={ad.linkUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex items-center gap-3 h-24 hover:shadow-md transition-shadow"
    >
      {ad.imageUrl ? (
        <img
          src={ad.imageUrl}
          alt={ad.title}
          className="w-24 h-24 object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
          <Megaphone className="h-8 w-8 text-purple-400" />
        </div>
      )}
      <div className="flex-1 min-w-0 pr-3">
        <p className="font-semibold text-gray-800 text-sm truncate">{ad.title}</p>
        {ad.linkUrl && (
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <ExternalLink className="h-3 w-3" />
            <span className="truncate">{ad.linkUrl}</span>
          </p>
        )}
        <p className="text-xs text-purple-500 mt-1">
          ~{new Date(ad.expiresAt).toLocaleDateString('ko-KR')} 까지
        </p>
      </div>
    </a>
  )
}

export default function AdSponsorPage() {
  const { t, language } = useLanguage()
  const pathname = usePathname()
  const [currentPage, setCurrentPage] = useState(1)
  const [ads, setAds] = useState<Ad[]>([])
  const [showGuide, setShowGuide] = useState(false)

  useEffect(() => {
    console.log("[v0] Ad-sponsor: Language changed to:", language)
  }, [language])

  useEffect(() => {
    console.log("[v0] Ad-sponsor: Route changed to:", pathname)
  }, [pathname])

  useEffect(() => {
    const stored = localStorage.getItem("adSponsorList")
    if (stored) {
      const parsed: Ad[] = JSON.parse(stored)
      const now = new Date()
      const updated = parsed.map(ad => ({
        ...ad,
        active: ad.active && new Date(ad.expiresAt) > now,
      }))
      setAds(updated)
      localStorage.setItem("adSponsorList", JSON.stringify(updated))
    }
  }, [])

  const startIdx = (currentPage - 1) * ADS_PER_PAGE
  const activeAds = ads.filter(a => a.active)
  const pageAds = Array.from({ length: ADS_PER_PAGE }, (_, i) => {
    return activeAds[startIdx + i] || null
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 pb-24">
      <header className="sticky top-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-white hover:text-purple-200 transition">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-bold text-white">{t('adSponsor.title')}</h1>
          </div>
          <Link
            href="/partner"
            className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-1.5 rounded-full transition"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t('adSponsor.partnership')}
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-5 space-y-4">
        <button
          onClick={() => setShowGuide(true)}
          className="w-full flex items-center justify-between bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white hover:bg-white/20 transition"
        >
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-sky-300" />
            <span className="font-medium">{t('adSponsor.howToUse')}</span>
          </div>
          <ChevronRight className="h-5 w-5 text-white/60" />
        </button>

        <Link href="/ad-sponsor/register">
          <Button className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">
            <PlusCircle className="h-5 w-5" />
            {t('adSponsor.register')}
          </Button>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-white/70 text-sm font-medium">
            {t('adSponsor.list')} — {currentPage} / {MAX_PAGES} {t('adSponsor.page')}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/20 transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(MAX_PAGES, p + 1))}
              disabled={currentPage === MAX_PAGES}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/20 transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {pageAds.map((ad, i) => (
            <AdCard key={startIdx + i} ad={ad} index={startIdx + i} />
          ))}
        </div>

        <div className="flex justify-center gap-3 pt-2">
          {Array.from({ length: MAX_PAGES }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`w-9 h-9 rounded-full font-bold text-sm transition ${
                currentPage === p
                  ? 'bg-sky-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </main>

      {showGuide && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative">
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-6 w-6 text-sky-500" />
              <h3 className="text-lg font-bold text-gray-900">{t('adSponsor.guide')}</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {`홍보용 광고 영역입니다.

협찬이 필요한 경우 파이 결제 후 일정 기간(예: 7일, 1개월) 광고 등록이 가능합니다.

현재는 무료로 제공되며, 공지 전까지 자유롭게 이용 가능합니다.

단, 불법 도박, 금융, 음란물, 사기, 혐오에 관한 협찬은 불가함을 알려 드리며 위반 사항 확인 시 개발자가 강제 삭제 조치합니다.`}
            </p>
            <Button
              onClick={() => setShowGuide(false)}
              className="w-full mt-5 bg-sky-500 hover:bg-sky-600 text-white font-bold"
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

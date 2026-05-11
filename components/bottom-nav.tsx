"use client"
// v-rebuild-2

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, MessageSquare, Share2, User } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const NAV_ITEMS = [
  {
    id: 'home', href: '/', Icon: Home,
    label: { ko: '홈화면', en: 'Home', ja: 'ホーム', zh: '主页', es: 'Inicio', fr: 'Accueil', de: 'Startseite', pt: 'Início', ru: 'Главная', ar: 'الرئيسية', hi: 'होम', vi: 'Trang chủ', th: 'หน้าแรก', id: 'Beranda' },
  },
  {
    id: 'community', href: '/community', Icon: MessageSquare,
    label: { ko: '커뮤니티', en: 'Community', ja: 'コミュニティ', zh: '社区', es: 'Comunidad', fr: 'Communauté', de: 'Community', pt: 'Comunidade', ru: 'Сообщество', ar: 'مجتمع', hi: 'समुदाय', vi: 'Cộng đồng', th: 'ชุมชน', id: 'Komunitas' },
  },
  {
    id: 'support', href: '/support', Icon: Heart,
    label: { ko: '후원', en: 'Support', ja: '支援', zh: '支持', es: 'Apoyo', fr: 'Soutien', de: 'Unterstütz.', pt: 'Apoio', ru: 'Поддержка', ar: 'دعم', hi: 'सहयोग', vi: 'Hỗ trợ', th: 'สนับสนุน', id: 'Dukungan' },
  },
  {
    id: 'share', href: '/share', Icon: Share2,
    label: { ko: '추천', en: 'Refer', ja: '紹介', zh: '推荐', es: 'Referir', fr: 'Référer', de: 'Empfehlen', pt: 'Indicar', ru: 'Реферал', ar: 'إحالة', hi: 'रेफर', vi: 'Giới thiệu', th: 'แนะนำ', id: 'Referral' },
  },
  {
    id: 'profile', href: '/user-profile', Icon: User,
    label: { ko: '프로필', en: 'Profile', ja: 'プロフィール', zh: '个人资料', es: 'Perfil', fr: 'Profil', de: 'Profil', pt: 'Perfil', ru: 'Профиль', ar: 'الملف', hi: 'प्रोफाइल', vi: 'Hồ sơ', th: 'โปรไฟล์', id: 'Profil' },
  },
] as const

export function BottomNav() {
  const pathname = usePathname()
  const { language } = useLanguage()

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ 
        background: 'linear-gradient(180deg, #3d1a80 0%, #2d1560 50%, #1e0a3c 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
    >
      <div className="max-w-lg mx-auto px-2">
        <div className="flex justify-around items-center h-18 py-2">
          {NAV_ITEMS.map(({ id, href, Icon, label }) => {
            const isActive = pathname === href
            const text = (label as Record<string, string>)[language] ?? label['ko']
            return (
              <Link
                key={id}
                href={href}
                className="flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all min-w-0 gap-1"
              >
                <div 
                  className="rounded-2xl p-3 transition-all duration-200 shadow-md"
                  style={isActive ? { 
                    background: 'linear-gradient(135deg, #6c2bd9 0%, #8b5cf6 50%, #5b21b6 100%)',
                    boxShadow: '0 6px 20px rgba(91, 33, 182, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.3)'
                  } : {
                    background: 'transparent',
                    boxShadow: 'none'
                  }}
                >
                  <Icon 
                    className="h-5 w-5 flex-shrink-0 transition-colors"
                    style={{ color: isActive ? '#fbbf24' : 'rgba(255,255,255,0.6)' }}
                  />
                </div>
                <span 
                  className="text-[10px] font-semibold truncate w-full text-center leading-tight transition-colors"
                  style={{ color: isActive ? '#fbbf24' : 'rgba(255,255,255,0.5)' }}
                >
                  {text}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

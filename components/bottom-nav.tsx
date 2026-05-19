"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/lib/language-context"

// ── Icon components ──────────────────────────────────────────────

function IconHome({ active }: { active: boolean }) {
  const c = active ? '#fff' : 'rgba(255,255,255,0.6)'
  const w = 2
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      {/* roof */}
      <path d="M3 12L13 3L23 12" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
      {/* left wall */}
      <path d="M6 10V22H10.5V16.5H15.5V22H20V10" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* door */}
      <rect x="10.5" y="16.5" width="5" height="5.5" rx="1" stroke={c} strokeWidth={w * 0.8} />
    </svg>
  )
}

function IconCommunity({ active }: { active: boolean }) {
  const c = active ? '#fff' : '#a78bfa'
  const w = 1.9
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      {/* bubble */}
      <path
        d="M4 4.5C4 3.95 4.45 3.5 5 3.5H21C21.55 3.5 22 3.95 22 4.5V15C22 15.55 21.55 16 21 16H10L4 20V4.5Z"
        stroke={c} strokeWidth={w} strokeLinejoin="round"
        fill={active ? 'rgba(167,139,250,0.12)' : 'none'}
      />
      {/* dots */}
      <circle cx="9.5" cy="9.8" r="1.2" fill={c} />
      <circle cx="13"  cy="9.8" r="1.2" fill={c} />
      <circle cx="16.5" cy="9.8" r="1.2" fill={c} />
    </svg>
  )
}

function IconSupport({ active }: { active: boolean }) {
  const c = active ? '#fff' : '#22d3ee'
  const w = 1.9
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      {/* top flat edge */}
      <path d="M8.5 6H17.5L21 10H5L8.5 6Z"
        stroke={c} strokeWidth={w} strokeLinejoin="round"
        fill={active ? 'rgba(34,211,238,0.15)' : 'none'} />
      {/* left facet */}
      <path d="M5 10L9.5 14L13 22L5 10Z"
        stroke={c} strokeWidth={w * 0.85} strokeLinejoin="round"
        fill={active ? 'rgba(34,211,238,0.1)' : 'none'} />
      {/* right facet */}
      <path d="M21 10L16.5 14L13 22L21 10Z"
        stroke={c} strokeWidth={w * 0.85} strokeLinejoin="round"
        fill={active ? 'rgba(34,211,238,0.08)' : 'none'} />
      {/* center facet */}
      <path d="M9.5 14H16.5L13 22Z"
        stroke={c} strokeWidth={w * 0.85} strokeLinejoin="round"
        fill={active ? 'rgba(34,211,238,0.18)' : 'none'} />
      {/* top center divide */}
      <line x1="13" y1="6" x2="13" y2="10" stroke={c} strokeWidth={w * 0.7} />
    </svg>
  )
}

function IconShare({ active }: { active: boolean }) {
  const c = active ? '#fff' : '#38bdf8'
  const lc = active ? 'rgba(255,255,255,0.7)' : 'rgba(56,189,248,0.6)'
  const w = 1.9
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      {/* lines */}
      <line x1="18" y1="7.5" x2="8.5" y2="12.5" stroke={lc} strokeWidth={w * 0.85} strokeLinecap="round" />
      <line x1="8.5" y1="13.5" x2="18" y2="18.5" stroke={lc} strokeWidth={w * 0.85} strokeLinecap="round" />
      {/* nodes */}
      <circle cx="20" cy="6.5" r="3"
        stroke={c} strokeWidth={w}
        fill={active ? 'rgba(56,189,248,0.25)' : 'none'} />
      <circle cx="20" cy="19.5" r="3"
        stroke={c} strokeWidth={w}
        fill={active ? 'rgba(56,189,248,0.25)' : 'none'} />
      <circle cx="6"  cy="13" r="3"
        stroke={c} strokeWidth={w}
        fill={active ? 'rgba(56,189,248,0.15)' : 'none'} />
    </svg>
  )
}

function IconProfile({ active }: { active: boolean }) {
  const c = active ? '#fff' : '#e879f9'
  const w = 1.9
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      {/* head */}
      <circle cx="13" cy="9.5" r="4"
        stroke={c} strokeWidth={w}
        fill={active ? 'rgba(232,121,249,0.15)' : 'none'} />
      {/* shoulders */}
      <path d="M4.5 22.5C4.5 18.91 8.36 16 13 16C17.64 16 21.5 18.91 21.5 22.5"
        stroke={c} strokeWidth={w} strokeLinecap="round" />
    </svg>
  )
}

// ── Nav config ───────────────────────────────────────────────────

const NAV_ITEMS = [
  {
    id: 'home', href: '/', Icon: IconHome,
    label: { ko: '홈화면', en: 'Home', ja: 'ホーム', zh: '主页', es: 'Inicio', fr: 'Accueil', de: 'Startseite', pt: 'Início', ru: 'Главная', ar: 'الرئيسية', hi: 'होम', vi: 'Trang chủ', th: 'หน้าแรก', id: 'Beranda' },
    activeColor: '#fdba74',   // light orange
    glowColor: 'rgba(253,186,116,0.32)',
  },
  {
    id: 'community', href: '/community', Icon: IconCommunity,
    label: { ko: '커뮤니티', en: 'Community', ja: 'コミュニティ', zh: '社区', es: 'Comunidad', fr: 'Communauté', de: 'Community', pt: 'Comunidade', ru: 'Сообщество', ar: 'مجتمع', hi: 'समुदाय', vi: 'Cộng đồng', th: 'ชุมชน', id: 'Komunitas' },
    activeColor: '#a78bfa',   // purple
    glowColor: 'rgba(167,139,250,0.5)',
  },
  {
    id: 'support', href: '/support', Icon: IconSupport,
    label: { ko: '후원', en: 'Support', ja: '支援', zh: '支持', es: 'Apoyo', fr: 'Soutien', de: 'Unterstütz.', pt: 'Apoio', ru: 'Поддержка', ar: 'دعم', hi: 'सहयोग', vi: 'Hỗ trợ', th: 'สนับสนุน', id: 'Dukungan' },
    activeColor: '#22d3ee',   // cyan
    glowColor: 'rgba(34,211,238,0.5)',
  },
  {
    id: 'share', href: '/share', Icon: IconShare,
    label: { ko: '추천', en: 'Refer', ja: '紹介', zh: '推荐', es: 'Referir', fr: 'Référer', de: 'Empfehlen', pt: 'Indicar', ru: 'Реферал', ar: 'إحالة', hi: 'रेफर', vi: 'Giới thiệu', th: 'แนะนำ', id: 'Referral' },
    activeColor: '#38bdf8',   // sky blue
    glowColor: 'rgba(56,189,248,0.5)',
  },
  {
    id: 'profile', href: '/user-profile', Icon: IconProfile,
    label: { ko: '프로필', en: 'Profile', ja: 'プロフィール', zh: '个人资料', es: 'Perfil', fr: 'Profil', de: 'Profil', pt: 'Perfil', ru: 'Профиль', ar: 'الملف', hi: 'प्रोफाइल', vi: 'Hồ sơ', th: 'โปรไฟล์', id: 'Profil' },
    activeColor: '#e879f9',   // pink-purple
    glowColor: 'rgba(232,121,249,0.5)',
  },
] as const

// ── Component ────────────────────────────────────────────────────

export function BottomNav() {
  const pathname = usePathname()
  const { language } = useLanguage()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'linear-gradient(180deg, #2a1660 0%, #1e1050 60%, #150a3a 100%)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        boxShadow: '0 -6px 32px rgba(30,10,80,0.7), 0 -1px 0 rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-lg mx-auto">
        <div
          className="flex items-stretch"
          style={{ minHeight: '64px' }}
        >
          {NAV_ITEMS.map(({ id, href, Icon, label, activeColor, glowColor }, idx) => {
            const isActive = pathname === href
            const text = (label as Record<string, string>)[language] ?? label['ko']
            const isLast = idx === NAV_ITEMS.length - 1

            return (
              <div
                key={id}
                className="flex flex-1 relative"
                style={{
                  // subtle vertical divider between items (not after last)
                  borderRight: isLast ? 'none' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <Link
                  href={href}
                  className="flex flex-col items-center justify-center flex-1 py-2 px-1 gap-1"
                  style={{ textDecoration: 'none', minHeight: '64px' }}
                >
                  {/* Icon area */}
                  <div
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 46,
                      height: 36,
                      borderRadius: 18,
                      transition: 'all 0.2s ease',
                      ...(isActive && id !== 'home' ? {
                        background: `radial-gradient(ellipse at 50% 50%, ${glowColor} 0%, transparent 75%)`,
                        filter: `drop-shadow(0 0 8px ${glowColor})`,
                      } : {}),
                    }}
                  >
                    {/* home active: no background circle or glow */}
                    <div style={{ position: 'relative', zIndex: 1, filter: isActive ? `drop-shadow(0 0 6px ${glowColor})` : 'none' }}>
                      <Icon active={isActive} />
                    </div>
                  </div>

                  {/* Label */}
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.01em',
                      color: isActive ? activeColor : 'rgba(255,255,255,0.45)',
                      textShadow: isActive ? `0 0 8px ${glowColor}` : 'none',
                      transition: 'color 0.2s',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                      textAlign: 'center',
                      lineHeight: 1.2,
                    }}
                  >
                    {text}
                  </span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

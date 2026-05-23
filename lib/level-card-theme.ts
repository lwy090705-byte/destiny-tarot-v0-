import type { LevelTierKey } from '@/lib/level-system'

/** Clean RPG tier card themes — gold / silver / bronze */
export type LevelCardTheme = {
  cardGradient: string
  cardShine: string
  cardBorder: string
  cardBorderGlow: string
  cardShadow: string
  cardShadowHover: string
  outerGlow: string
  activeBorder: string
  radialCenter: string
  emblemAura: string
  lvBoxBg: string
  lvBoxBorder: string
  lvLabel: string
  lvNumber: string
  title: string
  pointValue: string
  pointGlow: string
  crownFill: string
  crownGlow: string
  divider: string
}

export const LEVEL_CARD_THEMES: Record<LevelTierKey, LevelCardTheme> = {
  master: {
    cardGradient: 'from-[#fffbeb]/99 via-white to-[#fef9c7]/98',
    cardShine: 'from-amber-300/35 via-white/60 to-transparent',
    cardBorder: 'border-amber-300/70',
    cardBorderGlow: 'shadow-[inset_0_0_24px_rgba(251,191,36,0.12),inset_0_2px_0_rgba(255,255,255,0.95)]',
    cardShadow:
      'shadow-[0_10px_36px_rgba(217,119,6,0.22),0_4px_14px_rgba(0,0,0,0.06),inset_0_2px_5px_rgba(255,255,255,1)]',
    cardShadowHover:
      'group-hover:shadow-[0_16px_48px_rgba(217,119,6,0.32),0_0_40px_rgba(251,191,36,0.28),inset_0_2px_6px_rgba(255,255,255,1)]',
    outerGlow: 'bg-amber-400/45 group-hover:bg-amber-400/60',
    activeBorder: 'ring-2 ring-amber-400/90 border-amber-400',
    radialCenter: 'bg-[radial-gradient(circle_at_38%_32%,rgba(251,191,36,0.4)_0%,transparent_55%)]',
    emblemAura: 'bg-[radial-gradient(circle,rgba(251,191,36,0.45)_0%,transparent_65%)]',
    lvBoxBg: 'bg-gradient-to-br from-amber-100/95 via-yellow-50 to-amber-200/80',
    lvBoxBorder: 'border border-amber-300/50 shadow-[inset_0_2px_8px_rgba(255,255,255,0.95),inset_0_-2px_6px_rgba(217,119,6,0.1)]',
    lvLabel: 'text-amber-700',
    lvNumber: 'text-amber-600',
    title: 'text-amber-600',
    pointValue: 'text-amber-600',
    pointGlow: '[text-shadow:0_0_14px_rgba(251,191,36,0.5)]',
    crownFill: 'text-amber-500',
    crownGlow: 'drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]',
    divider: 'border-amber-200/80',
  },
  sage: {
    cardGradient: 'from-slate-50/99 via-white to-slate-100/98',
    cardShine: 'from-slate-300/30 via-white/60 to-transparent',
    cardBorder: 'border-slate-300/70',
    cardBorderGlow: 'shadow-[inset_0_0_24px_rgba(148,163,184,0.14),inset_0_2px_0_rgba(255,255,255,0.95)]',
    cardShadow:
      'shadow-[0_10px_36px_rgba(100,116,139,0.18),0_4px_14px_rgba(0,0,0,0.06),inset_0_2px_5px_rgba(255,255,255,1)]',
    cardShadowHover:
      'group-hover:shadow-[0_16px_48px_rgba(100,116,139,0.26),0_0_40px_rgba(203,213,225,0.3),inset_0_2px_6px_rgba(255,255,255,1)]',
    outerGlow: 'bg-slate-300/40 group-hover:bg-slate-300/55',
    activeBorder: 'ring-2 ring-slate-400/90 border-slate-400',
    radialCenter: 'bg-[radial-gradient(circle_at_38%_32%,rgba(203,213,225,0.45)_0%,transparent_55%)]',
    emblemAura: 'bg-[radial-gradient(circle,rgba(203,213,225,0.5)_0%,transparent_65%)]',
    lvBoxBg: 'bg-gradient-to-br from-slate-100/95 via-slate-50 to-slate-200/80',
    lvBoxBorder: 'border border-slate-300/50 shadow-[inset_0_2px_8px_rgba(255,255,255,0.95),inset_0_-2px_6px_rgba(100,116,139,0.08)]',
    lvLabel: 'text-slate-600',
    lvNumber: 'text-slate-600',
    title: 'text-slate-700',
    pointValue: 'text-slate-700',
    pointGlow: '[text-shadow:0_0_14px_rgba(203,213,225,0.55)]',
    crownFill: 'text-slate-500',
    crownGlow: 'drop-shadow-[0_0_8px_rgba(203,213,225,0.65)]',
    divider: 'border-slate-200/80',
  },
  reader: {
    cardGradient: 'from-[#fff7ed]/99 via-white to-[#ffedd5]/98',
    cardShine: 'from-orange-400/30 via-white/60 to-transparent',
    cardBorder: 'border-orange-300/70',
    cardBorderGlow: 'shadow-[inset_0_0_24px_rgba(234,88,12,0.1),inset_0_2px_0_rgba(255,255,255,0.95)]',
    cardShadow:
      'shadow-[0_10px_36px_rgba(194,65,12,0.2),0_4px_14px_rgba(0,0,0,0.06),inset_0_2px_5px_rgba(255,255,255,1)]',
    cardShadowHover:
      'group-hover:shadow-[0_16px_48px_rgba(194,65,12,0.28),0_0_40px_rgba(249,115,22,0.24),inset_0_2px_6px_rgba(255,255,255,1)]',
    outerGlow: 'bg-orange-500/40 group-hover:bg-orange-500/55',
    activeBorder: 'ring-2 ring-orange-400/90 border-orange-500',
    radialCenter: 'bg-[radial-gradient(circle_at_38%_32%,rgba(234,88,12,0.32)_0%,transparent_55%)]',
    emblemAura: 'bg-[radial-gradient(circle,rgba(249,115,22,0.48)_0%,transparent_68%)]',
    lvBoxBg: 'bg-gradient-to-br from-orange-100/95 via-amber-50 to-orange-200/80',
    lvBoxBorder: 'border border-orange-300/50 shadow-[inset_0_2px_8px_rgba(255,255,255,0.95),inset_0_-2px_6px_rgba(194,65,12,0.08)]',
    lvLabel: 'text-orange-800',
    lvNumber: 'text-orange-800',
    title: 'text-orange-800',
    pointValue: 'text-orange-800',
    pointGlow: '[text-shadow:0_0_14px_rgba(234,88,12,0.42)]',
    crownFill: 'text-orange-700',
    crownGlow: 'drop-shadow-[0_0_8px_rgba(234,88,12,0.6)]',
    divider: 'border-orange-200/80',
  },
  explorer: {
    cardGradient: 'from-[#fffbeb]/99 via-white to-[#fef3c7]/98',
    cardShine: 'from-amber-300/32 via-white/60 to-transparent',
    cardBorder: 'border-amber-300/70',
    cardBorderGlow: 'shadow-[inset_0_0_20px_rgba(251,191,36,0.1),inset_0_2px_0_rgba(255,255,255,0.9)]',
    cardShadow:
      'shadow-[0_8px_32px_rgba(217,119,6,0.24),0_2px_8px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,1)]',
    cardShadowHover:
      'group-hover:shadow-[0_14px_44px_rgba(217,119,6,0.34),0_0_36px_rgba(251,191,36,0.28),inset_0_2px_6px_rgba(255,255,255,1)]',
    outerGlow: 'bg-amber-400/40 group-hover:bg-amber-400/55',
    activeBorder: 'ring-2 ring-amber-400/90 border-amber-400',
    radialCenter: 'bg-[radial-gradient(circle_at_38%_32%,rgba(251,191,36,0.35)_0%,transparent_55%)]',
    emblemAura: 'bg-[radial-gradient(circle,rgba(251,191,36,0.42)_0%,transparent_65%)]',
    lvBoxBg: 'bg-gradient-to-br from-amber-100/95 via-yellow-50 to-amber-200/80',
    lvBoxBorder: 'border border-amber-300/50 shadow-[inset_0_2px_8px_rgba(255,255,255,0.95),inset_0_-2px_6px_rgba(217,119,6,0.08)]',
    lvLabel: 'text-amber-700',
    lvNumber: 'text-amber-600',
    title: 'text-amber-600',
    pointValue: 'text-amber-600',
    pointGlow: '[text-shadow:0_0_14px_rgba(251,191,36,0.45)]',
    crownFill: 'text-amber-500',
    crownGlow: 'drop-shadow-[0_0_8px_rgba(251,191,36,0.65)]',
    divider: 'border-amber-200/80',
  },
  trainee: {
    cardGradient: 'from-violet-50/99 via-white to-slate-50/98',
    cardShine: 'from-violet-300/28 via-white/60 to-transparent',
    cardBorder: 'border-violet-200/70',
    cardBorderGlow: 'shadow-[inset_0_0_24px_rgba(167,139,250,0.12),inset_0_2px_0_rgba(255,255,255,0.95)]',
    cardShadow:
      'shadow-[0_10px_36px_rgba(100,116,139,0.18),0_4px_14px_rgba(0,0,0,0.06),inset_0_2px_5px_rgba(255,255,255,1)]',
    cardShadowHover:
      'group-hover:shadow-[0_16px_48px_rgba(139,92,246,0.22),0_0_40px_rgba(196,181,253,0.28),inset_0_2px_6px_rgba(255,255,255,1)]',
    outerGlow: 'bg-violet-300/35 group-hover:bg-violet-300/50',
    activeBorder: 'ring-2 ring-violet-400/85 border-violet-300',
    radialCenter: 'bg-[radial-gradient(circle_at_38%_32%,rgba(196,181,253,0.38)_0%,transparent_55%)]',
    emblemAura: 'bg-[radial-gradient(circle,rgba(167,139,250,0.42)_0%,transparent_68%)]',
    lvBoxBg: 'bg-gradient-to-br from-slate-100/95 via-slate-50 to-slate-200/80',
    lvBoxBorder: 'border border-slate-300/50 shadow-[inset_0_2px_8px_rgba(255,255,255,0.95),inset_0_-2px_6px_rgba(100,116,139,0.08)]',
    lvLabel: 'text-slate-600',
    lvNumber: 'text-slate-600',
    title: 'text-slate-700',
    pointValue: 'text-slate-700',
    pointGlow: '[text-shadow:0_0_14px_rgba(203,213,225,0.5)]',
    crownFill: 'text-slate-500',
    crownGlow: 'drop-shadow-[0_0_8px_rgba(203,213,225,0.6)]',
    divider: 'border-slate-200/80',
  },
  beginner: {
    cardGradient: 'from-[#fff7ed]/99 via-white to-[#ffedd5]/98',
    cardShine: 'from-orange-300/28 via-white/60 to-transparent',
    cardBorder: 'border-orange-300/65',
    cardBorderGlow: 'shadow-[inset_0_0_20px_rgba(234,88,12,0.07),inset_0_2px_0_rgba(255,255,255,0.9)]',
    cardShadow:
      'shadow-[0_8px_32px_rgba(194,65,12,0.22),0_2px_8px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,1)]',
    cardShadowHover:
      'group-hover:shadow-[0_14px_44px_rgba(194,65,12,0.32),0_0_36px_rgba(234,88,12,0.22),inset_0_2px_6px_rgba(255,255,255,1)]',
    outerGlow: 'bg-orange-500/38 group-hover:bg-orange-500/52',
    activeBorder: 'ring-2 ring-orange-400/85 border-orange-400',
    radialCenter: 'bg-[radial-gradient(circle_at_38%_32%,rgba(234,88,12,0.28)_0%,transparent_55%)]',
    emblemAura: 'bg-[radial-gradient(circle,rgba(234,88,12,0.38)_0%,transparent_65%)]',
    lvBoxBg: 'bg-gradient-to-br from-orange-100/90 via-amber-50 to-orange-200/75',
    lvBoxBorder: 'border border-orange-300/45 shadow-[inset_0_2px_8px_rgba(255,255,255,0.95),inset_0_-2px_6px_rgba(194,65,12,0.07)]',
    lvLabel: 'text-orange-800/90',
    lvNumber: 'text-orange-800',
    title: 'text-orange-800',
    pointValue: 'text-orange-800',
    pointGlow: '[text-shadow:0_0_14px_rgba(234,88,12,0.38)]',
    crownFill: 'text-orange-700',
    crownGlow: 'drop-shadow-[0_0_8px_rgba(234,88,12,0.55)]',
    divider: 'border-orange-200/75',
  },
}

export function getLevelCardTheme(key: LevelTierKey): LevelCardTheme {
  return LEVEL_CARD_THEMES[key]
}

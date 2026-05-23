import type { LevelTierKey } from '@/lib/level-system'

export type PremiumCardTheme = {
  aura: string
  auraHover: string
  surface: string
  shine: string
  vignette: string
  border: string
  borderHighlight: string
  activeRing: string
  lvGem: string
  lvGemShine: string
  emblemGlow: string
  emblemPlate: string
  title: string
  titleGlow: string
  desc: string
  pointValue: string
  pointLabel: string
  shadow: string
  shadowHover: string
}

const THEMES: Record<LevelTierKey | 'operator', PremiumCardTheme> = {
  operator: {
    aura: 'bg-gradient-to-r from-amber-400/55 via-yellow-300/45 to-amber-500/55',
    auraHover: 'group-hover:from-amber-400/75 group-hover:via-yellow-200/55 group-hover:to-amber-400/75',
    surface:
      'bg-gradient-to-br from-amber-950/92 via-amber-900/78 to-yellow-900/82 border-amber-300/45',
    shine: 'from-amber-100/25 via-yellow-50/10 to-transparent',
    vignette: 'from-amber-950/30 via-transparent to-amber-900/20',
    border: 'border-amber-400/35',
    borderHighlight: 'from-amber-200/50 via-transparent to-transparent',
    activeRing: 'ring-2 ring-amber-300/80 shadow-[0_0_28px_rgba(251,191,36,0.55)]',
    lvGem: 'from-amber-300 via-yellow-200 to-amber-500',
    lvGemShine: 'from-white/70 to-transparent',
    emblemGlow: 'shadow-[0_0_22px_rgba(251,191,36,0.65)]',
    emblemPlate: 'from-amber-200/20 via-yellow-100/5 to-amber-900/30',
    title: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-200',
    titleGlow: '[text-shadow:0_0_18px_rgba(251,191,36,0.55)]',
    desc: 'text-amber-100/75',
    pointValue: 'text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 to-amber-300',
    pointLabel: 'text-amber-200/60',
    shadow: 'shadow-[0_8px_32px_rgba(0,0,0,0.35),0_0_0_1px_rgba(251,191,36,0.15)_inset]',
    shadowHover:
      'group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.45),0_0_32px_rgba(251,191,36,0.35),0_0_0_1px_rgba(255,255,255,0.12)_inset]',
  },
  master: {
    aura: 'bg-gradient-to-r from-amber-500/35 via-yellow-400/25 to-amber-600/35',
    auraHover: 'group-hover:from-amber-400/55 group-hover:to-yellow-300/45',
    surface:
      'bg-gradient-to-br from-slate-900/95 via-amber-950/80 to-slate-900/90 border-amber-500/30',
    shine: 'from-amber-200/20 via-white/5 to-transparent',
    vignette: 'from-black/25 via-transparent to-amber-900/15',
    border: 'border-amber-500/25',
    borderHighlight: 'from-amber-300/40 via-white/10 to-transparent',
    activeRing: 'ring-2 ring-amber-400/70 shadow-[0_0_24px_rgba(245,158,11,0.45)]',
    lvGem: 'from-amber-400 via-yellow-300 to-amber-600',
    lvGemShine: 'from-white/60 to-transparent',
    emblemGlow: 'shadow-[0_0_20px_rgba(245,158,11,0.5)]',
    emblemPlate: 'from-amber-300/15 via-transparent to-amber-900/25',
    title: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-200',
    titleGlow: '',
    desc: 'text-slate-300/80',
    pointValue: 'text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-400',
    pointLabel: 'text-amber-200/50',
    shadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)]',
    shadowHover: 'group-hover:shadow-[0_14px_40px_rgba(0,0,0,0.4),0_0_24px_rgba(245,158,11,0.28)]',
  },
  sage: {
    aura: 'bg-gradient-to-r from-blue-600/30 via-indigo-500/25 to-blue-700/30',
    auraHover: 'group-hover:from-blue-500/45 group-hover:to-indigo-400/40',
    surface:
      'bg-gradient-to-br from-slate-900/95 via-blue-950/85 to-indigo-950/90 border-blue-400/30',
    shine: 'from-blue-200/15 via-white/5 to-transparent',
    vignette: 'from-black/25 via-transparent to-blue-950/20',
    border: 'border-blue-400/25',
    borderHighlight: 'from-blue-300/35 via-transparent to-transparent',
    activeRing: 'ring-2 ring-blue-400/65 shadow-[0_0_24px_rgba(59,130,246,0.45)]',
    lvGem: 'from-blue-400 via-indigo-400 to-blue-700',
    lvGemShine: 'from-white/55 to-transparent',
    emblemGlow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
    emblemPlate: 'from-blue-400/15 via-transparent to-indigo-950/30',
    title: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-sky-100 to-indigo-200',
    titleGlow: '',
    desc: 'text-slate-300/80',
    pointValue: 'text-transparent bg-clip-text bg-gradient-to-b from-blue-100 to-indigo-300',
    pointLabel: 'text-blue-200/50',
    shadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)]',
    shadowHover: 'group-hover:shadow-[0_14px_40px_rgba(0,0,0,0.4),0_0_24px_rgba(59,130,246,0.28)]',
  },
  reader: {
    aura: 'bg-gradient-to-r from-orange-700/30 via-amber-700/25 to-orange-800/30',
    auraHover: 'group-hover:from-orange-600/45 group-hover:to-amber-600/40',
    surface:
      'bg-gradient-to-br from-stone-900/95 via-orange-950/80 to-stone-950/90 border-orange-500/30',
    shine: 'from-orange-200/12 via-amber-100/5 to-transparent',
    vignette: 'from-black/25 via-transparent to-orange-950/20',
    border: 'border-orange-500/25',
    borderHighlight: 'from-orange-300/30 via-transparent to-transparent',
    activeRing: 'ring-2 ring-orange-400/65 shadow-[0_0_24px_rgba(234,88,12,0.4)]',
    lvGem: 'from-orange-500 via-amber-600 to-orange-800',
    lvGemShine: 'from-amber-100/50 to-transparent',
    emblemGlow: 'shadow-[0_0_20px_rgba(234,88,12,0.45)]',
    emblemPlate: 'from-orange-400/12 via-transparent to-orange-950/25',
    title: 'text-transparent bg-clip-text bg-gradient-to-r from-orange-100 via-amber-100 to-orange-200',
    titleGlow: '',
    desc: 'text-stone-300/80',
    pointValue: 'text-transparent bg-clip-text bg-gradient-to-b from-orange-100 to-amber-400',
    pointLabel: 'text-orange-200/50',
    shadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.07)]',
    shadowHover: 'group-hover:shadow-[0_14px_40px_rgba(0,0,0,0.4),0_0_24px_rgba(234,88,12,0.25)]',
  },
  explorer: {
    aura: 'bg-gradient-to-r from-violet-600/35 via-purple-500/30 to-fuchsia-600/30',
    auraHover: 'group-hover:from-violet-500/50 group-hover:to-purple-400/45',
    surface:
      'bg-gradient-to-br from-slate-900/95 via-purple-950/85 to-violet-950/90 border-purple-400/30',
    shine: 'from-purple-200/15 via-fuchsia-100/5 to-transparent',
    vignette: 'from-black/25 via-transparent to-purple-950/25',
    border: 'border-purple-400/25',
    borderHighlight: 'from-purple-300/35 via-transparent to-transparent',
    activeRing: 'ring-2 ring-purple-400/65 shadow-[0_0_24px_rgba(168,85,247,0.45)]',
    lvGem: 'from-purple-400 via-violet-500 to-fuchsia-600',
    lvGemShine: 'from-white/50 to-transparent',
    emblemGlow: 'shadow-[0_0_22px_rgba(168,85,247,0.55)]',
    emblemPlate: 'from-purple-400/15 via-transparent to-violet-950/30',
    title: 'text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-violet-100 to-fuchsia-200',
    titleGlow: '',
    desc: 'text-slate-300/80',
    pointValue: 'text-transparent bg-clip-text bg-gradient-to-b from-purple-100 to-fuchsia-300',
    pointLabel: 'text-purple-200/50',
    shadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)]',
    shadowHover: 'group-hover:shadow-[0_14px_40px_rgba(0,0,0,0.4),0_0_28px_rgba(168,85,247,0.3)]',
  },
  trainee: {
    aura: 'bg-gradient-to-r from-fuchsia-500/30 via-pink-500/25 to-purple-500/30',
    auraHover: 'group-hover:from-fuchsia-400/45 group-hover:to-pink-400/40',
    surface:
      'bg-gradient-to-br from-slate-900/95 via-fuchsia-950/80 to-purple-950/90 border-fuchsia-400/30',
    shine: 'from-fuchsia-200/12 via-pink-100/5 to-transparent',
    vignette: 'from-black/25 via-transparent to-fuchsia-950/20',
    border: 'border-fuchsia-400/25',
    borderHighlight: 'from-fuchsia-300/30 via-transparent to-transparent',
    activeRing: 'ring-2 ring-fuchsia-400/65 shadow-[0_0_24px_rgba(217,70,239,0.45)]',
    lvGem: 'from-fuchsia-400 via-pink-400 to-purple-500',
    lvGemShine: 'from-white/50 to-transparent',
    emblemGlow: 'shadow-[0_0_20px_rgba(217,70,239,0.5)]',
    emblemPlate: 'from-fuchsia-300/12 via-transparent to-purple-950/25',
    title: 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-100 via-pink-100 to-purple-200',
    titleGlow: '',
    desc: 'text-slate-300/80',
    pointValue: 'text-transparent bg-clip-text bg-gradient-to-b from-fuchsia-100 to-pink-300',
    pointLabel: 'text-fuchsia-200/50',
    shadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)]',
    shadowHover: 'group-hover:shadow-[0_14px_40px_rgba(0,0,0,0.4),0_0_24px_rgba(217,70,239,0.28)]',
  },
  beginner: {
    aura: 'bg-gradient-to-r from-sky-400/30 via-cyan-400/25 to-blue-400/30',
    auraHover: 'group-hover:from-sky-400/45 group-hover:to-cyan-300/40',
    surface:
      'bg-gradient-to-br from-slate-900/95 via-sky-950/80 to-cyan-950/90 border-sky-400/30',
    shine: 'from-sky-200/15 via-cyan-100/5 to-transparent',
    vignette: 'from-black/20 via-transparent to-sky-950/20',
    border: 'border-sky-400/25',
    borderHighlight: 'from-sky-300/30 via-transparent to-transparent',
    activeRing: 'ring-2 ring-sky-400/65 shadow-[0_0_24px_rgba(56,189,248,0.45)]',
    lvGem: 'from-sky-400 via-cyan-300 to-blue-500',
    lvGemShine: 'from-white/55 to-transparent',
    emblemGlow: 'shadow-[0_0_18px_rgba(56,189,248,0.45)]',
    emblemPlate: 'from-sky-300/12 via-transparent to-cyan-950/25',
    title: 'text-transparent bg-clip-text bg-gradient-to-r from-sky-100 via-cyan-100 to-blue-200',
    titleGlow: '',
    desc: 'text-slate-300/80',
    pointValue: 'text-transparent bg-clip-text bg-gradient-to-b from-sky-100 to-cyan-300',
    pointLabel: 'text-sky-200/50',
    shadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)]',
    shadowHover: 'group-hover:shadow-[0_14px_40px_rgba(0,0,0,0.4),0_0_24px_rgba(56,189,248,0.25)]',
  },
}

export function getPremiumTheme(key: LevelTierKey | 'operator'): PremiumCardTheme {
  return THEMES[key]
}

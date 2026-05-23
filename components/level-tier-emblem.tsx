'use client'

import type { LevelTierKey } from '@/lib/level-system'

type LevelTierEmblemProps = {
  variant: LevelEmblemVariant
  className?: string
}

type MetalTone = 'gold' | 'silver' | 'bronze'
type IconShape = 'star' | 'diamond'

type DiamondPreset = {
  palette: 'gold' | 'silver-purple' | 'bronze-orange'
  elongated?: boolean
  glowStrength: number
}

type TierIcon = {
  tone: MetalTone
  shape: IconShape
  glow: string
  bloom: string
  ornate?: boolean
  operatorBadge?: boolean
  diamond?: DiamondPreset
}

export type LevelEmblemVariant = LevelTierKey | 'operator'

const TIER_ICONS: Record<LevelEmblemVariant, TierIcon> = {
  operator: {
    tone: 'gold',
    shape: 'star',
    glow: '#fbbf24',
    bloom: '#fff7d6',
    ornate: true,
    operatorBadge: true,
  },
  master: { tone: 'gold', shape: 'star', glow: '#fbbf24', bloom: '#fde68a', ornate: true },
  sage: { tone: 'silver', shape: 'star', glow: '#e2e8f0', bloom: '#ffffff' },
  reader: { tone: 'bronze', shape: 'star', glow: '#f97316', bloom: '#fdba74' },
  explorer: {
    tone: 'gold',
    shape: 'diamond',
    glow: '#fcd34d',
    bloom: '#fef08a',
    diamond: { palette: 'gold', glowStrength: 1 },
  },
  trainee: {
    tone: 'silver',
    shape: 'diamond',
    glow: '#c4b5fd',
    bloom: '#e9d5ff',
    diamond: { palette: 'silver-purple', elongated: true, glowStrength: 0.85 },
  },
  beginner: {
    tone: 'bronze',
    shape: 'diamond',
    glow: '#fb923c',
    bloom: '#fed7aa',
    diamond: { palette: 'bronze-orange', glowStrength: 0.65 },
  },
}

const METAL: Record<
  MetalTone,
  { light: string; mid: string; dark: string; rim: string; shine: string; core: string }
> = {
  gold: {
    light: '#fffbeb',
    mid: '#fbbf24',
    dark: '#92400e',
    rim: '#fde047',
    shine: '#fef9c3',
    core: '#f59e0b',
  },
  silver: {
    light: '#f8fafc',
    mid: '#cbd5e1',
    dark: '#475569',
    rim: '#f1f5f9',
    shine: '#ffffff',
    core: '#94a3b8',
  },
  bronze: {
    light: '#fff7ed',
    mid: '#ea580c',
    dark: '#7c2d12',
    rim: '#fdba74',
    shine: '#ffedd5',
    core: '#c2410c',
  },
}

const DIAMOND_PALETTE = {
  gold: {
    f1: '#fffef5',
    f2: '#fde68a',
    f3: '#fbbf24',
    f4: '#d97706',
    f5: '#92400e',
    core: '#f59e0b',
  },
  'silver-purple': {
    f1: '#faf5ff',
    f2: '#e9d5ff',
    f3: '#c4b5fd',
    f4: '#94a3b8',
    f5: '#64748b',
    core: '#a78bfa',
  },
  'bronze-orange': {
    f1: '#fff7ed',
    f2: '#fed7aa',
    f3: '#fb923c',
    f4: '#c2410c',
    f5: '#7c2d12',
    core: '#ea580c',
  },
}

const EMBLEM_SIZES = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  avatar: 'w-[3.5rem] h-[3.5rem]',
  lg: 'w-[6.25rem] h-[6.25rem] sm:w-[7rem] sm:h-[7rem]',
} as const

type EmblemSize = keyof typeof EMBLEM_SIZES

/** Premium RPG tier emblems — metallic stars & faceted crystal diamonds */
export function LevelTierEmblem({
  variant,
  className = '',
}: {
  variant: LevelTierKey
  className?: string
}) {
  return (
    <LevelTierEmblemInner variant={variant} className={className} size="lg" />
  )
}

/** Inline badge for community author lines (14–18px). */
export function LevelTierEmblemBadge({
  variant,
  size = 'md',
  className = '',
}: {
  variant: LevelEmblemVariant
  size?: 'sm' | 'md'
  className?: string
}) {
  return <LevelTierEmblemInner variant={variant} className={className} size={size} />
}

/** Profile avatar slot (~80px circle) — full RPG glow. */
export function LevelTierEmblemAvatar({
  variant,
  className = '',
}: {
  variant: LevelEmblemVariant
  className?: string
}) {
  return <LevelTierEmblemInner variant={variant} className={className} size="avatar" />
}

function emblemVisualStyle(size: EmblemSize, glow: string, bloom: string) {
  if (size === 'sm' || size === 'md') {
    return {
      glowClass: 'scale-125 blur-md opacity-55',
      glowAlpha: '88',
      bloomAlpha: '55',
      filter: `drop-shadow(0 1px 2px rgba(0,0,0,0.2)) drop-shadow(0 0 6px ${glow}aa)`,
    }
  }
  if (size === 'avatar') {
    return {
      glowClass: 'scale-[1.4] blur-xl opacity-70',
      glowAlpha: '92',
      bloomAlpha: '62',
      filter: `drop-shadow(0 4px 10px rgba(0,0,0,0.28)) drop-shadow(0 0 16px ${glow}dd) drop-shadow(0 0 32px ${bloom}77)`,
    }
  }
  return {
    glowClass: 'scale-[1.18] blur-3xl opacity-75 transition-opacity duration-500 group-hover:opacity-100',
    glowAlpha: '70',
    bloomAlpha: '40',
    filter: `drop-shadow(0 8px 18px rgba(0,0,0,0.28)) drop-shadow(0 0 22px ${glow}cc) drop-shadow(0 0 42px ${bloom}55)`,
  }
}

function LevelTierEmblemInner({
  variant,
  className = '',
  size,
}: LevelTierEmblemProps & { size: EmblemSize }) {
  const cfg = TIER_ICONS[variant]
  const metal = METAL[cfg.tone]
  const visual = emblemVisualStyle(size, cfg.glow, cfg.bloom)

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      aria-hidden
    >
      <div
        className={`absolute inset-0 rounded-full ${visual.glowClass}`}
        style={{
          background: `radial-gradient(circle, ${cfg.glow}${visual.glowAlpha} 0%, ${cfg.bloom}${visual.bloomAlpha} 42%, transparent 72%)`,
        }}
        aria-hidden
      />
      <svg
        viewBox="0 0 120 120"
        className={`relative z-10 ${EMBLEM_SIZES[size]}`}
        aria-hidden
        shapeRendering="geometricPrecision"
        style={{ filter: visual.filter }}
      >
        <EmblemDefs variant={variant} cfg={cfg} metal={metal} />
        <circle cx="60" cy="60" r="50" fill={cfg.glow} opacity="0.14" />
        <circle cx="60" cy="60" r="44" fill={cfg.bloom} opacity="0.1" />

        {cfg.ornate && (
          <>
            <circle
              cx="60"
              cy="60"
              r="43"
              fill="none"
              stroke={`url(#${variant}-bevel)`}
              strokeWidth="2"
              opacity="0.55"
            />
            <circle
              cx="60"
              cy="60"
              r="38"
              fill="none"
              stroke={`url(#${variant}-rim)`}
              strokeWidth="1"
              opacity="0.35"
            />
          </>
        )}

        {cfg.shape === 'star' ? (
          <MetallicStar
            variant={variant}
            ornate={cfg.ornate}
            operatorBadge={cfg.operatorBadge}
            metal={metal}
            glow={cfg.glow}
          />
        ) : (
          <FacetedDiamond variant={variant} preset={cfg.diamond!} glow={cfg.glow} />
        )}
      </svg>
    </div>
  )
}

function EmblemDefs({
  variant,
  cfg,
  metal,
}: {
  variant: string
  cfg: TierIcon
  metal: (typeof METAL)[MetalTone]
}) {
  const dp = cfg.diamond ? DIAMOND_PALETTE[cfg.diamond.palette] : null

  return (
    <defs>
      <radialGradient id={`${variant}-plate`} cx="38%" cy="28%" r="72%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="30%" stopColor={metal.light} />
        <stop offset="65%" stopColor={metal.mid} />
        <stop offset="100%" stopColor={metal.dark} />
      </radialGradient>
      <linearGradient id={`${variant}-bevel`} x1="12%" y1="4%" x2="88%" y2="96%">
        <stop offset="0%" stopColor={metal.shine} />
        <stop offset="38%" stopColor={metal.mid} />
        <stop offset="72%" stopColor={metal.dark} />
        <stop offset="100%" stopColor={metal.dark} />
      </linearGradient>
      <linearGradient id={`${variant}-rim`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={metal.rim} />
        <stop offset="100%" stopColor={metal.mid} />
      </linearGradient>
      <linearGradient id={`${variant}-facet-c`} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={metal.light} stopOpacity="0.95" />
        <stop offset="100%" stopColor={metal.core} />
      </linearGradient>
      <radialGradient id={`${variant}-core`} cx="50%" cy="42%" r="38%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="35%" stopColor={metal.shine} />
        <stop offset="100%" stopColor={metal.core} stopOpacity="0.85" />
      </radialGradient>
      {dp && (
        <>
          <linearGradient id={`${variant}-d-f1`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={dp.f1} />
            <stop offset="100%" stopColor={dp.f2} />
          </linearGradient>
          <linearGradient id={`${variant}-d-f2`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={dp.f2} />
            <stop offset="100%" stopColor={dp.f3} />
          </linearGradient>
          <linearGradient id={`${variant}-d-f3`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor={dp.f3} />
            <stop offset="100%" stopColor={dp.f4} />
          </linearGradient>
          <linearGradient id={`${variant}-d-f4`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={dp.f2} />
            <stop offset="100%" stopColor={dp.f5} />
          </linearGradient>
          <radialGradient id={`${variant}-d-core`} cx="50%" cy="38%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="40%" stopColor={dp.core} stopOpacity="0.75" />
            <stop offset="100%" stopColor={dp.f5} stopOpacity="0.9" />
          </radialGradient>
        </>
      )}
      <filter id={`${variant}-fx`} x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#000" floodOpacity="0.35" />
        <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor={cfg.glow} floodOpacity="0.75" />
      </filter>
    </defs>
  )
}

function MetallicStar({
  variant,
  ornate,
  operatorBadge,
  metal,
  glow,
}: {
  variant: string
  ornate?: boolean
  operatorBadge?: boolean
  metal: (typeof METAL)[MetalTone]
  glow: string
}) {
  const starPath =
    'M60 18 L69.5 44.5 H98 L74.5 59.5 L84 88 L60 71 L36 88 L45.5 59.5 L22 44.5 H50.5 Z'
  const midPath = 'M60 28 L66 47 H84 L70 57 L76 76 L60 64 L44 76 L50 57 L36 47 H54 Z'
  const innerPath = 'M60 36 L64 48 H78 L68 55 L72 68 L60 60 L48 68 L52 55 L42 48 H56 Z'

  return (
    <g filter={`url(#${variant}-fx)`}>
      {operatorBadge && (
        <g transform="translate(60, 14) scale(0.55) translate(-20, -8)">
          <path
            d="M4 24h32L34 9 20 17 6 9 4 24z"
            fill={glow}
            opacity="0.35"
          />
          <path
            d="M7 22h26L30 11 20 16 10 11 7 22z"
            fill={`url(#${variant}-bevel)`}
            stroke={metal.rim}
            strokeWidth="1.2"
          />
          <circle cx="10" cy="10" r="2.5" fill={metal.mid} />
          <circle cx="20" cy="7" r="3" fill={metal.shine} />
          <circle cx="30" cy="10" r="2.5" fill={metal.mid} />
        </g>
      )}
      {ornate && (
        <>
          <circle cx="60" cy="60" r="36" fill={`url(#${variant}-plate)`} opacity="0.42" />
          <circle cx="60" cy="60" r="30" fill={glow} opacity="0.14" />
        </>
      )}
      <path
        d={starPath}
        fill={`url(#${variant}-bevel)`}
        stroke={`url(#${variant}-rim)`}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d={midPath} fill={`url(#${variant}-facet-c)`} opacity="0.55" />
      <path d={innerPath} fill="#ffffff" opacity="0.32" />
      <path d="M60 22 L63 42 L60 38 L57 42 Z" fill="#ffffff" opacity="0.55" />
      <ellipse cx="60" cy="34" rx="16" ry="7" fill="#ffffff" opacity="0.5" />
      <ellipse cx="52" cy="40" rx="4" ry="2.5" fill="#ffffff" opacity="0.35" />
      <circle cx="60" cy="58" r="4" fill={`url(#${variant}-core)`} opacity="0.85" />
    </g>
  )
}

function FacetedDiamond({
  variant,
  preset,
  glow,
}: {
  variant: string
  preset: DiamondPreset
  glow: string
}) {
  const cx = 60
  const elong = preset.elongated ? 1.1 : 1
  const w = preset.elongated ? 26 : 32
  const tableY = 20 * elong
  const girdleY = preset.elongated ? 50 : 48
  const pointY = preset.elongated ? 104 : 100
  const halfG = w * 0.88

  const crownLeft = `${cx},${tableY} ${cx - halfG},${girdleY} ${cx},${girdleY + 2}`
  const crownRight = `${cx},${tableY} ${cx + halfG},${girdleY} ${cx},${girdleY + 2}`
  const table = `${cx - w * 0.38},${tableY + 8} ${cx + w * 0.38},${tableY + 8} ${cx + w * 0.22},${girdleY - 2} ${cx - w * 0.22},${girdleY - 2}`
  const pavilionL = `${cx},${girdleY + 2} ${cx - halfG},${girdleY} ${cx},${pointY}`
  const pavilionR = `${cx},${girdleY + 2} ${cx + halfG},${girdleY} ${cx},${pointY}`
  const pavilionC = `${cx - w * 0.22},${girdleY - 2} ${cx + w * 0.22},${girdleY - 2} ${cx + w * 0.14},${pointY - 8} ${cx - w * 0.14},${pointY - 8}`
  const starL = `${cx},${tableY} ${cx - w * 0.55},${tableY + 14} ${cx - w * 0.18},${girdleY - 4}`
  const starR = `${cx},${tableY} ${cx + w * 0.55},${tableY + 14} ${cx + w * 0.18},${girdleY - 4}`

  return (
    <g filter={`url(#${variant}-fx)`}>
      <ellipse
        cx={cx}
        cy={girdleY + 6}
        rx={halfG * 0.9}
        ry={4}
        fill={glow}
        opacity={0.18 * preset.glowStrength}
      />

      <polygon points={pavilionL} fill={`url(#${variant}-d-f3)`} />
      <polygon points={pavilionR} fill={`url(#${variant}-d-f4)`} />
      <polygon points={pavilionC} fill={`url(#${variant}-d-f2)`} opacity="0.92" />

      <polygon points={crownLeft} fill={`url(#${variant}-d-f1)`} />
      <polygon points={crownRight} fill={`url(#${variant}-d-f2)`} />
      <polygon points={starL} fill={`url(#${variant}-d-f1)`} opacity="0.88" />
      <polygon points={starR} fill={`url(#${variant}-d-f3)`} opacity="0.88" />
      <polygon points={table} fill={`url(#${variant}-d-f1)`} opacity="0.95" />

      <polygon
        points={`${cx - w * 0.12},${tableY + 10} ${cx + w * 0.12},${tableY + 10} ${cx},${girdleY - 6}`}
        fill="#ffffff"
        opacity="0.45"
      />
      <path
        d={`M${cx - 4} ${tableY + 12} L${cx} ${tableY + 6} L${cx + 5} ${tableY + 18} L${cx} ${pointY - 22} Z`}
        fill="#ffffff"
        opacity="0.38"
      />
      <ellipse cx={cx} cy={tableY + 10} rx={w * 0.28} ry={4.5} fill="#ffffff" opacity="0.62" />

      <circle cx={cx} cy={girdleY - 8} r={preset.elongated ? 7 : 8} fill={`url(#${variant}-d-core)`} opacity="0.92" />
      <circle cx={cx} cy={girdleY - 8} r={preset.elongated ? 3.5 : 4} fill="#ffffff" opacity="0.55" />

      <ellipse cx={cx - 8} cy={girdleY + 2} rx={3} ry={5} fill="#ffffff" opacity="0.22" />
    </g>
  )
}

function PointCrown({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 40 30" className={className} aria-hidden shapeRendering="geometricPrecision">
      <defs>
        <linearGradient id="lvl-crown-g" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path d="M4 24h32L34 9 20 17 6 9 4 24z" fill="currentColor" opacity="0.18" />
      <path
        d="M7 22h26L30 11 20 16 10 11 7 22z"
        fill="url(#lvl-crown-g)"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.8" fill="currentColor" />
      <circle cx="20" cy="7" r="3.2" fill="currentColor" />
      <circle cx="30" cy="10" r="2.8" fill="currentColor" />
      <rect x="7" y="21" width="26" height="2.5" rx="1" fill="currentColor" opacity="0.85" />
    </svg>
  )
}

export { PointCrown }

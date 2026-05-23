'use client'

import { LEVEL_TIERS, type LevelTierDefinition } from '@/lib/level-system'
import { getLevelCardTheme, type LevelCardTheme } from '@/lib/level-card-theme'
import { LevelTierEmblem, PointCrown } from '@/components/level-tier-emblem'

type LevelSystemCardsProps = {
  currentLevel: number
  guideOnly?: boolean
  t: (key: string) => string
}

function LvBox({ level, theme }: { level: number; theme: LevelCardTheme }) {
  return (
    <div
      className={`
        relative shrink-0 w-[3.25rem] h-[3.75rem] sm:w-[4rem] sm:h-[4.5rem]
        rounded-lg sm:rounded-xl overflow-hidden
        ${theme.lvBoxBg} ${theme.lvBoxBorder}
        flex flex-col items-center justify-center
      `}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-white/20 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-0 left-0 w-[55%] h-[45%] bg-gradient-to-br from-white/90 to-transparent rounded-br-2xl"
        aria-hidden
      />
      <span className={`relative z-10 text-[8px] sm:text-[9px] font-bold leading-none mb-0.5 ${theme.lvLabel}`}>
        LV.
      </span>
      <span className={`relative z-10 text-2xl sm:text-[1.75rem] font-black leading-none tabular-nums ${theme.lvNumber}`}>
        {level}
      </span>
    </div>
  )
}

function CardGlassLayers({ theme }: { theme: LevelCardTheme }) {
  return (
    <>
      <div className={`pointer-events-none absolute inset-0 ${theme.radialCenter}`} aria-hidden />
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.cardShine}`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-[52%] bg-gradient-to-b from-white/85 via-white/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-0 left-0 w-2/5 h-full bg-gradient-to-r from-white/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/[0.04] to-transparent"
        aria-hidden
      />
      <div className={`pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl ${theme.cardBorderGlow}`} aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white via-white/70 to-white/20"
        aria-hidden
      />
    </>
  )
}

function LevelCard({
  tier,
  title,
  pointsLabel,
  isActive,
  isLocked,
}: {
  tier: LevelTierDefinition
  title: string
  pointsLabel: string
  isActive: boolean
  isLocked: boolean
}) {
  const theme = getLevelCardTheme(tier.key)

  return (
    <div className={`group relative ${isLocked ? 'opacity-45 saturate-[0.6]' : ''}`}>
      <div
        className={`
          absolute -inset-1 rounded-[1.4rem] opacity-50 blur-[28px] transition-all duration-500
          group-hover:opacity-90 group-hover:blur-[36px] ${theme.outerGlow}
        `}
        aria-hidden
      />

      <div
        className={`
          relative overflow-hidden rounded-2xl sm:rounded-3xl border
          bg-white/[0.97] backdrop-blur-md
          bg-gradient-to-br ${theme.cardGradient}
          transition-all duration-500 ease-out
          hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.995]
          ${theme.cardBorder} ${theme.cardShadow} ${theme.cardShadowHover}
          ${isActive ? theme.activeBorder : ''}
        `}
      >
        <CardGlassLayers theme={theme} />

        <div className="relative flex items-center gap-2 sm:gap-3 p-3 sm:p-4 min-w-0">
          <LvBox level={tier.level} theme={theme} />

          <div className="flex flex-1 items-center gap-3 sm:gap-4 min-w-0">
            <div className="relative shrink-0 w-[6.5rem] h-[6.5rem] sm:w-[7.25rem] sm:h-[7.25rem] flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full ${theme.emblemAura} opacity-90 transition-opacity duration-500 group-hover:opacity-100`}
                aria-hidden
              />
              <LevelTierEmblem variant={tier.key} className="transition-transform duration-500 group-hover:scale-[1.05]" />
            </div>
            <p className={`flex-1 min-w-0 text-base sm:text-xl font-extrabold leading-tight truncate ${theme.title}`}>
              {title}
            </p>
          </div>

          <div
            className={`shrink-0 w-[4.25rem] sm:w-[5.25rem] flex flex-col items-center justify-center pl-2 sm:pl-4 border-l ${theme.divider}`}
          >
            <p
              className={`text-base sm:text-xl font-black tabular-nums whitespace-nowrap leading-none text-center ${theme.pointValue} ${theme.pointGlow}`}
            >
              {pointsLabel}
            </p>
            <PointCrown
              className={`mt-1.5 w-7 h-5 sm:w-8 sm:h-6 ${theme.crownFill} ${theme.crownGlow}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function LevelSystemCards({ currentLevel, guideOnly, t }: LevelSystemCardsProps) {
  return (
    <div className="space-y-3 sm:space-y-3.5">
      {LEVEL_TIERS.map((tier) => {
        const isActive = !guideOnly && tier.level === currentLevel
        const isLocked = !guideOnly && tier.level > currentLevel
        return (
          <LevelCard
            key={tier.level}
            tier={tier}
            title={t(tier.titleKey)}
            pointsLabel={`${tier.minPoints.toLocaleString()}P`}
            isActive={isActive}
            isLocked={isLocked}
          />
        )
      })}
    </div>
  )
}

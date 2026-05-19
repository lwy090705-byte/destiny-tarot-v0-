/**
 * Attaches Hindi (hi) content to fortune/tarot pools at module load.
 */
import { attachHi } from './fortune-lang-extend'
import {
  templatePoolsHi,
  fallbackHi,
  yearlyComprehensiveHi,
  yearlyDetailedHi,
  monthlyDetailedHi,
  lifetimeDetailedHi,
  monthlyFortunesHi,
  tarotPoolsHi,
} from './fortune-pools-hi'
import {
  loveFortuneTemplates,
  wealthFortuneTemplates,
  careerFortuneTemplates,
  healthFortuneTemplates,
  opportunityFortuneTemplates,
  warningFortuneTemplates,
  relationshipFortuneTemplates,
  fallbackTemplatesByLang,
  lifetimeDetailedTemplates,
  yearlyComprehensiveTemplates,
  yearlyDetailedTemplates,
  monthlyDetailedTemplates,
} from './fortune-templates'
import { monthlyFortunes } from './monthly-fortunes'
import {
  totalPools,
  wealthPools,
  luckPools,
  cautionPools,
  lovePools,
  careerPools,
  healthPools,
} from './tarot-message-pools'

let wiredHi = false

function attachHiToRecord<T extends Record<string, Record<string, string[]>>>(
  root: T,
  pairs: Record<keyof T, string[]>
): void {
  for (const key of Object.keys(pairs) as (keyof T)[]) {
    const hi = pairs[key]
    if (hi && root[key]) {
      attachHi(root[key], hi)
    }
  }
}

function attachFallbackHi(): void {
  const enRow = fallbackTemplatesByLang.en ?? fallbackTemplatesByLang.ko
  if (!enRow) return
  if (!fallbackTemplatesByLang.hi) {
    fallbackTemplatesByLang.hi = { ...enRow }
  }
  const hiRow = fallbackTemplatesByLang.hi!
  for (const key of ['lifetime', 'yearly', 'monthly', 'general'] as const) {
    hiRow[key] = fallbackHi[key][0] ?? enRow[key]
  }
}

function attachMonthlyFortunesHi(): void {
  for (let month = 1; month <= 12; month++) {
    const hiArr = monthlyFortunesHi[month]
    if (!hiArr || !monthlyFortunes[month]) continue
    const entry = monthlyFortunes[month] as Record<string, string>
    entry.hi = hiArr[0] ?? entry.en
  }
}

export function wireFortunePoolsHi(): void {
  if (wiredHi) return
  wiredHi = true

  attachHiToRecord(
    {
      love: loveFortuneTemplates,
      wealth: wealthFortuneTemplates,
      career: careerFortuneTemplates,
      health: healthFortuneTemplates,
      opportunity: opportunityFortuneTemplates,
      warning: warningFortuneTemplates,
      relationship: relationshipFortuneTemplates,
    },
    templatePoolsHi
  )

  attachHi(lifetimeDetailedTemplates, lifetimeDetailedHi)
  attachHi(yearlyComprehensiveTemplates, yearlyComprehensiveHi)
  attachHi(yearlyDetailedTemplates, yearlyDetailedHi)
  attachHi(monthlyDetailedTemplates, monthlyDetailedHi)

  attachHiToRecord(
    {
      total: totalPools,
      wealth: wealthPools,
      luck: luckPools,
      caution: cautionPools,
      love: lovePools,
      career: careerPools,
      health: healthPools,
    },
    tarotPoolsHi
  )

  attachFallbackHi()
  attachMonthlyFortunesHi()
}

wireFortunePoolsHi()

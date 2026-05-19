/**
 * Attaches Vietnamese (vi) content to fortune/tarot pools at module load.
 */
import { attachVi } from './fortune-lang-extend'
import {
  templatePoolsVi,
  fallbackVi,
  yearlyComprehensiveVi,
  yearlyDetailedVi,
  monthlyDetailedVi,
  lifetimeDetailedVi,
  monthlyFortunesVi,
  tarotPoolsVi,
} from './fortune-pools-vi'
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

let wiredVi = false

function attachViToRecord<T extends Record<string, Record<string, string[]>>>(
  root: T,
  pairs: Record<keyof T, string[]>
): void {
  for (const key of Object.keys(pairs) as (keyof T)[]) {
    const vi = pairs[key]
    if (vi && root[key]) {
      attachVi(root[key], vi)
    }
  }
}

function attachFallbackVi(): void {
  const enRow = fallbackTemplatesByLang.en ?? fallbackTemplatesByLang.ko
  if (!enRow) return
  if (!fallbackTemplatesByLang.vi) {
    fallbackTemplatesByLang.vi = { ...enRow }
  }
  const viRow = fallbackTemplatesByLang.vi!
  for (const key of ['lifetime', 'yearly', 'monthly', 'general'] as const) {
    viRow[key] = fallbackVi[key][0] ?? enRow[key]
  }
}

function attachMonthlyFortunesVi(): void {
  for (let month = 1; month <= 12; month++) {
    const viArr = monthlyFortunesVi[month]
    if (!viArr || !monthlyFortunes[month]) continue
    const entry = monthlyFortunes[month] as Record<string, string>
    entry.vi = viArr[0] ?? entry.en
  }
}

export function wireFortunePoolsVi(): void {
  if (wiredVi) return
  wiredVi = true

  attachViToRecord(
    {
      love: loveFortuneTemplates,
      wealth: wealthFortuneTemplates,
      career: careerFortuneTemplates,
      health: healthFortuneTemplates,
      opportunity: opportunityFortuneTemplates,
      warning: warningFortuneTemplates,
      relationship: relationshipFortuneTemplates,
    },
    templatePoolsVi
  )

  attachVi(lifetimeDetailedTemplates, lifetimeDetailedVi)
  attachVi(yearlyComprehensiveTemplates, yearlyComprehensiveVi)
  attachVi(yearlyDetailedTemplates, yearlyDetailedVi)
  attachVi(monthlyDetailedTemplates, monthlyDetailedVi)

  attachViToRecord(
    {
      total: totalPools,
      wealth: wealthPools,
      luck: luckPools,
      caution: cautionPools,
      love: lovePools,
      career: careerPools,
      health: healthPools,
    },
    tarotPoolsVi
  )

  attachFallbackVi()
  attachMonthlyFortunesVi()
}

wireFortunePoolsVi()

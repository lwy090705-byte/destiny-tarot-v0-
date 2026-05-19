/**
 * Attaches Thai (th) content to fortune/tarot pools at module load.
 */
import { attachTh } from './fortune-lang-extend'
import {
  templatePoolsTh,
  fallbackTh,
  yearlyComprehensiveTh,
  yearlyDetailedTh,
  monthlyDetailedTh,
  lifetimeDetailedTh,
  monthlyFortunesTh,
  tarotPoolsTh,
} from './fortune-pools-th'
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

let wiredTh = false

function attachThToRecord<T extends Record<string, Record<string, string[]>>>(
  root: T,
  pairs: Record<keyof T, string[]>
): void {
  for (const key of Object.keys(pairs) as (keyof T)[]) {
    const th = pairs[key]
    if (th && root[key]) {
      attachTh(root[key], th)
    }
  }
}

function attachFallbackTh(): void {
  const enRow = fallbackTemplatesByLang.en ?? fallbackTemplatesByLang.ko
  if (!enRow) return
  if (!fallbackTemplatesByLang.th) {
    fallbackTemplatesByLang.th = { ...enRow }
  }
  const thRow = fallbackTemplatesByLang.th!
  for (const key of ['lifetime', 'yearly', 'monthly', 'general'] as const) {
    thRow[key] = fallbackTh[key][0] ?? enRow[key]
  }
}

function attachMonthlyFortunesTh(): void {
  for (let month = 1; month <= 12; month++) {
    const thArr = monthlyFortunesTh[month]
    if (!thArr || !monthlyFortunes[month]) continue
    const entry = monthlyFortunes[month] as Record<string, string>
    entry.th = thArr[0] ?? entry.en
  }
}

export function wireFortunePoolsTh(): void {
  if (wiredTh) return
  wiredTh = true

  attachThToRecord(
    {
      love: loveFortuneTemplates,
      wealth: wealthFortuneTemplates,
      career: careerFortuneTemplates,
      health: healthFortuneTemplates,
      opportunity: opportunityFortuneTemplates,
      warning: warningFortuneTemplates,
      relationship: relationshipFortuneTemplates,
    },
    templatePoolsTh
  )

  attachTh(lifetimeDetailedTemplates, lifetimeDetailedTh)
  attachTh(yearlyComprehensiveTemplates, yearlyComprehensiveTh)
  attachTh(yearlyDetailedTemplates, yearlyDetailedTh)
  attachTh(monthlyDetailedTemplates, monthlyDetailedTh)

  attachThToRecord(
    {
      total: totalPools,
      wealth: wealthPools,
      luck: luckPools,
      caution: cautionPools,
      love: lovePools,
      career: careerPools,
      health: healthPools,
    },
    tarotPoolsTh
  )

  attachFallbackTh()
  attachMonthlyFortunesTh()
}

wireFortunePoolsTh()

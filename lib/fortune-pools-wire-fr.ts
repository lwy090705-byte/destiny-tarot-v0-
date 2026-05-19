/**
 * Attaches French (fr) content to fortune/tarot pools at module load.
 */
import { attachFr } from './fortune-lang-extend'
import {
  templatePoolsFr,
  fallbackFr,
  yearlyComprehensiveFr,
  yearlyDetailedFr,
  monthlyDetailedFr,
  lifetimeDetailedFr,
  monthlyFortunesFr,
  tarotPoolsFr,
} from './fortune-pools-fr'
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

let wiredFr = false

function attachFrToRecord<T extends Record<string, Record<string, string[]>>>(
  root: T,
  pairs: Record<keyof T, string[]>
): void {
  for (const key of Object.keys(pairs) as (keyof T)[]) {
    const fr = pairs[key]
    if (fr && root[key]) {
      attachFr(root[key], fr)
    }
  }
}

function attachFallbackFr(): void {
  const enRow = fallbackTemplatesByLang.en ?? fallbackTemplatesByLang.ko
  if (!enRow) return
  if (!fallbackTemplatesByLang.fr) {
    fallbackTemplatesByLang.fr = { ...enRow }
  }
  const frRow = fallbackTemplatesByLang.fr!
  for (const key of ['lifetime', 'yearly', 'monthly', 'general'] as const) {
    frRow[key] = fallbackFr[key][0] ?? enRow[key]
  }
}

function attachMonthlyFortunesFr(): void {
  for (let month = 1; month <= 12; month++) {
    const frArr = monthlyFortunesFr[month]
    if (!frArr || !monthlyFortunes[month]) continue
    const entry = monthlyFortunes[month] as Record<string, string>
    entry.fr = frArr[0] ?? entry.en
  }
}

export function wireFortunePoolsFr(): void {
  if (wiredFr) return
  wiredFr = true

  attachFrToRecord(
    {
      love: loveFortuneTemplates,
      wealth: wealthFortuneTemplates,
      career: careerFortuneTemplates,
      health: healthFortuneTemplates,
      opportunity: opportunityFortuneTemplates,
      warning: warningFortuneTemplates,
      relationship: relationshipFortuneTemplates,
    },
    templatePoolsFr
  )

  attachFr(lifetimeDetailedTemplates, lifetimeDetailedFr)
  attachFr(yearlyComprehensiveTemplates, yearlyComprehensiveFr)
  attachFr(yearlyDetailedTemplates, yearlyDetailedFr)
  attachFr(monthlyDetailedTemplates, monthlyDetailedFr)

  attachFrToRecord(
    {
      total: totalPools,
      wealth: wealthPools,
      luck: luckPools,
      caution: cautionPools,
      love: lovePools,
      career: careerPools,
      health: healthPools,
    },
    tarotPoolsFr
  )

  attachFallbackFr()
  attachMonthlyFortunesFr()
}

wireFortunePoolsFr()

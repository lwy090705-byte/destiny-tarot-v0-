/**
 * Attaches German (de) content to fortune/tarot pools at module load.
 */
import { attachDe } from './fortune-lang-extend'
import {
  templatePoolsDe,
  fallbackDe,
  yearlyComprehensiveDe,
  yearlyDetailedDe,
  monthlyDetailedDe,
  lifetimeDetailedDe,
  monthlyFortunesDe,
  tarotPoolsDe,
} from './fortune-pools-de'
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

let wiredDe = false

function attachDeToRecord<T extends Record<string, Record<string, string[]>>>(
  root: T,
  pairs: Record<keyof T, string[]>
): void {
  for (const key of Object.keys(pairs) as (keyof T)[]) {
    const de = pairs[key]
    if (de && root[key]) {
      attachDe(root[key], de)
    }
  }
}

function attachFallbackDe(): void {
  const enRow = fallbackTemplatesByLang.en ?? fallbackTemplatesByLang.ko
  if (!enRow) return
  if (!fallbackTemplatesByLang.de) {
    fallbackTemplatesByLang.de = { ...enRow }
  }
  const deRow = fallbackTemplatesByLang.de!
  for (const key of ['lifetime', 'yearly', 'monthly', 'general'] as const) {
    deRow[key] = fallbackDe[key][0] ?? enRow[key]
  }
}

function attachMonthlyFortunesDe(): void {
  for (let month = 1; month <= 12; month++) {
    const deArr = monthlyFortunesDe[month]
    if (!deArr || !monthlyFortunes[month]) continue
    const entry = monthlyFortunes[month] as Record<string, string>
    entry.de = deArr[0] ?? entry.en
  }
}

export function wireFortunePoolsDe(): void {
  if (wiredDe) return
  wiredDe = true

  attachDeToRecord(
    {
      love: loveFortuneTemplates,
      wealth: wealthFortuneTemplates,
      career: careerFortuneTemplates,
      health: healthFortuneTemplates,
      opportunity: opportunityFortuneTemplates,
      warning: warningFortuneTemplates,
      relationship: relationshipFortuneTemplates,
    },
    templatePoolsDe
  )

  attachDe(lifetimeDetailedTemplates, lifetimeDetailedDe)
  attachDe(yearlyComprehensiveTemplates, yearlyComprehensiveDe)
  attachDe(yearlyDetailedTemplates, yearlyDetailedDe)
  attachDe(monthlyDetailedTemplates, monthlyDetailedDe)

  attachDeToRecord(
    {
      total: totalPools,
      wealth: wealthPools,
      luck: luckPools,
      caution: cautionPools,
      love: lovePools,
      career: careerPools,
      health: healthPools,
    },
    tarotPoolsDe
  )

  attachFallbackDe()
  attachMonthlyFortunesDe()
}

wireFortunePoolsDe()

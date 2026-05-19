/**
 * Attaches Portuguese (pt) content to fortune/tarot pools at module load.
 */
import { attachPt } from './fortune-lang-extend'
import {
  templatePoolsPt,
  fallbackPt,
  yearlyComprehensivePt,
  yearlyDetailedPt,
  monthlyDetailedPt,
  lifetimeDetailedPt,
  monthlyFortunesPt,
  tarotPoolsPt,
} from './fortune-pools-pt'
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

let wiredPt = false

function attachPtToRecord<T extends Record<string, Record<string, string[]>>>(
  root: T,
  pairs: Record<keyof T, string[]>
): void {
  for (const key of Object.keys(pairs) as (keyof T)[]) {
    const pt = pairs[key]
    if (pt && root[key]) {
      attachPt(root[key], pt)
    }
  }
}

function attachFallbackPt(): void {
  const enRow = fallbackTemplatesByLang.en ?? fallbackTemplatesByLang.ko
  if (!enRow) return
  if (!fallbackTemplatesByLang.pt) {
    fallbackTemplatesByLang.pt = { ...enRow }
  }
  const ptRow = fallbackTemplatesByLang.pt!
  for (const key of ['lifetime', 'yearly', 'monthly', 'general'] as const) {
    ptRow[key] = fallbackPt[key][0] ?? enRow[key]
  }
}

function attachMonthlyFortunesPt(): void {
  for (let month = 1; month <= 12; month++) {
    const ptArr = monthlyFortunesPt[month]
    if (!ptArr || !monthlyFortunes[month]) continue
    const entry = monthlyFortunes[month] as Record<string, string>
    entry.pt = ptArr[0] ?? entry.en
  }
}

export function wireFortunePoolsPt(): void {
  if (wiredPt) return
  wiredPt = true

  attachPtToRecord(
    {
      love: loveFortuneTemplates,
      wealth: wealthFortuneTemplates,
      career: careerFortuneTemplates,
      health: healthFortuneTemplates,
      opportunity: opportunityFortuneTemplates,
      warning: warningFortuneTemplates,
      relationship: relationshipFortuneTemplates,
    },
    templatePoolsPt
  )

  attachPt(lifetimeDetailedTemplates, lifetimeDetailedPt)
  attachPt(yearlyComprehensiveTemplates, yearlyComprehensivePt)
  attachPt(yearlyDetailedTemplates, yearlyDetailedPt)
  attachPt(monthlyDetailedTemplates, monthlyDetailedPt)

  attachPtToRecord(
    {
      total: totalPools,
      wealth: wealthPools,
      luck: luckPools,
      caution: cautionPools,
      love: lovePools,
      career: careerPools,
      health: healthPools,
    },
    tarotPoolsPt
  )

  attachFallbackPt()
  attachMonthlyFortunesPt()
}

wireFortunePoolsPt()

/**
 * Attaches Spanish (es) and Indonesian (id) content to fortune/tarot pools at module load.
 * Import this module once from fortune entry points so generators stay language-consistent.
 */
import './fortune-pools-wire-hi'
import './fortune-pools-wire-pt'
import './fortune-pools-wire-fr'
import './fortune-pools-wire-de'
import './fortune-pools-wire-vi'
import './fortune-pools-wire-th'
import { attachEsId, attachEsIdToRecord } from './fortune-lang-extend'
import {
  templatePoolsEsId,
  fallbackEsId,
  yearlyComprehensiveEsId,
  yearlyDetailedEsId,
  monthlyDetailedEsId,
  lifetimeDetailedEsId,
  monthlyFortunesEsId,
} from './fortune-pools-es-id'
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

let wired = false

function attachFallbackEsId(): void {
  const enRow = fallbackTemplatesByLang.en ?? fallbackTemplatesByLang.ko
  if (!enRow) return
  if (!fallbackTemplatesByLang.es) {
    fallbackTemplatesByLang.es = { ...enRow }
  }
  if (!fallbackTemplatesByLang.id) {
    fallbackTemplatesByLang.id = { ...enRow }
  }
  const esRow = fallbackTemplatesByLang.es!
  const idRow = fallbackTemplatesByLang.id!
  for (const key of ['lifetime', 'yearly', 'monthly', 'general'] as const) {
    const pair = fallbackEsId[key]
    esRow[key] = pair.es[0] ?? enRow[key]
    idRow[key] = pair.id[0] ?? enRow[key]
  }
}

function attachMonthlyFortunesEsId(): void {
  for (let month = 1; month <= 12; month++) {
    const pair = monthlyFortunesEsId[month]
    if (!pair || !monthlyFortunes[month]) continue
    const entry = monthlyFortunes[month] as Record<string, string>
    entry.es = pair.es[0] ?? entry.en
    entry.id = pair.id[0] ?? entry.en
  }
}

export function wireFortunePoolsEsId(): void {
  if (wired) return
  wired = true

  attachEsIdToRecord(
    {
      love: loveFortuneTemplates,
      wealth: wealthFortuneTemplates,
      career: careerFortuneTemplates,
      health: healthFortuneTemplates,
      opportunity: opportunityFortuneTemplates,
      warning: warningFortuneTemplates,
      relationship: relationshipFortuneTemplates,
    },
    templatePoolsEsId
  )

  attachEsId(lifetimeDetailedTemplates, lifetimeDetailedEsId)
  attachEsId(yearlyComprehensiveTemplates, yearlyComprehensiveEsId)
  attachEsId(yearlyDetailedTemplates, yearlyDetailedEsId)
  attachEsId(monthlyDetailedTemplates, monthlyDetailedEsId)

  attachFallbackEsId()
  attachMonthlyFortunesEsId()
}

wireFortunePoolsEsId()

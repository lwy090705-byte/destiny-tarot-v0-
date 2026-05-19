import type { FortuneContentLanguage } from './fortune-generator'

export type LangMap = Record<FortuneContentLanguage, string[]>

export type EsIdPair = { es: string[]; id: string[] }

/** Attach Spanish and Indonesian string arrays to a ko/en/ja/zh LangMap. */
export function attachEsId(
  map: Record<string, string[]>,
  pair: EsIdPair
): asserts map is LangMap {
  map.es = pair.es
  map.id = pair.id
}

/** Attach Hindi string array to a ko/en/ja/zh/es/id LangMap. */
export function attachHi(map: Record<string, string[]>, hi: string[]): void {
  map.hi = hi
}

/** Attach Portuguese string array to a ko/en/ja/zh/es/id LangMap. */
export function attachPt(map: Record<string, string[]>, pt: string[]): void {
  map.pt = pt
}

/** Attach French string array to a ko/en/ja/zh/es/id/pt LangMap. */
export function attachFr(map: Record<string, string[]>, fr: string[]): void {
  map.fr = fr
}

/** Attach German string array to a ko/en/ja/zh/es/id/pt/fr LangMap. */
export function attachDe(map: Record<string, string[]>, de: string[]): void {
  map.de = de
}

/** Attach Vietnamese string array to a ko/en/ja/zh/es/id/pt/fr/de LangMap. */
export function attachVi(map: Record<string, string[]>, vi: string[]): void {
  map.vi = vi
}

/** Attach Thai string array to a ko/en/ja/zh/es/id/pt/fr/de/vi LangMap. */
export function attachTh(map: Record<string, string[]>, th: string[]): void {
  map.th = th
}

export function attachEsIdToRecord<T extends Record<string, Record<string, string[]>>>(
  root: T,
  pairs: Record<keyof T, EsIdPair>
): void {
  for (const key of Object.keys(pairs) as (keyof T)[]) {
    const pair = pairs[key]
    if (pair && root[key]) {
      attachEsId(root[key], pair)
    }
  }
}

export type LifetimePhaseMap = Record<
  'early' | 'mid' | 'late',
  Record<FortuneContentLanguage, string[]>
>

export function attachEsIdToLifetime(
  root: Record<string, LifetimePhaseMap>,
  pairs: Record<string, Record<'early' | 'mid' | 'late', EsIdPair>>
): void {
  for (const cat of Object.keys(pairs)) {
    const phasePairs = pairs[cat]
    const target = root[cat]
    if (!target || !phasePairs) continue
    for (const phase of ['early', 'mid', 'late'] as const) {
      if (target[phase] && phasePairs[phase]) {
        attachEsId(target[phase], phasePairs[phase])
      }
    }
  }
}

"use client"

import type { SajuResult as SajuResultType } from "@/lib/types"
import type { Language } from "@/lib/i18n"
import { translations } from "@/lib/i18n"

interface SajuResultProps {
  result: SajuResultType
  language: Language
}

export function SajuResult({ result, language }: SajuResultProps) {
  const t = (key: string) => translations[language][key] || key

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-purple-400">
      <h3 className="text-base font-bold text-gray-800 mb-4">{t('saju.title')}</h3>
      
      {/* 4기둥 가로 배치 */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {/* 년주 */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">{t('saju.yearPillar')}</p>
          <div className="bg-purple-50 rounded-xl p-2">
            <p className="text-2xl font-bold text-gray-800">{result.yearPillar.heavenlyStem}</p>
            <p className="text-xl text-gray-600">{result.yearPillar.earthlyBranch}</p>
            <p className="text-xs text-purple-600 mt-1 leading-tight">{result.yearPillar.combined}</p>
          </div>
        </div>

        {/* 월주 */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">{t('saju.monthPillar')}</p>
          <div className="bg-purple-50 rounded-xl p-2">
            <p className="text-2xl font-bold text-gray-800">{result.monthPillar.heavenlyStem}</p>
            <p className="text-xl text-gray-600">{result.monthPillar.earthlyBranch}</p>
            <p className="text-xs text-purple-600 mt-1 leading-tight">{result.monthPillar.combined}</p>
          </div>
        </div>

        {/* 일주 (주) */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">{t('saju.dayPillar')}</p>
          <div className="bg-yellow-100 rounded-xl p-2 ring-2 ring-yellow-300">
            <p className="text-2xl font-bold text-gray-800">{result.dayPillar.heavenlyStem}</p>
            <p className="text-xl text-gray-600">{result.dayPillar.earthlyBranch}</p>
            <p className="text-xs text-yellow-700 mt-1 leading-tight">{result.dayPillar.combined}</p>
          </div>
        </div>

        {/* 시주 */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">{t('saju.hourPillar')}</p>
          <div className="bg-purple-50 rounded-xl p-2">
            <p className="text-2xl font-bold text-gray-800">{result.hourPillar.heavenlyStem}</p>
            <p className="text-xl text-gray-600">{result.hourPillar.earthlyBranch}</p>
            <p className="text-xs text-purple-600 mt-1 leading-tight">{result.hourPillar.combined}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 border-t pt-4">
        <p>• {t('saju.yearDesc')}</p>
        <p>• {t('saju.monthDesc')}</p>
        <p>• {t('saju.dayDesc')}</p>
        <p>• {t('saju.hourDesc')}</p>
      </div>
    </div>
  )
}

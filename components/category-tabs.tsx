"use client"

import { Coins, Sun, Wand2, Sparkle, Brain } from "lucide-react"
import type { Category } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"

interface CategoryTabsProps {
  activeCategory: Category
  onCategoryChange: (category: Category) => void
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const { t } = useLanguage()

  const categories: {
    id: Category
    labelKey: string
    icon: React.ReactNode
    descriptionKey: string
    // 비활성 상태 스타일
    idleBg: string
    idleBorder: string
    idleIcon: string
    idleTitle: string
    idleOrb1: string
    idleOrb2: string
    // 활성 상태 스타일
    activeBg: string
    activeShadow: string
  }[] = [
    {
      id: 'myungli',
      labelKey: 'category.myungli',
      icon: <Coins className="h-6 w-6" />,
      descriptionKey: 'category.desc.myungli',
      idleBg: 'bg-[#fdf6e3]',
      idleBorder: 'border border-[#e8d48b]',
      idleIcon: 'bg-[#f5e6a3] text-[#8a6c00]',
      idleTitle: 'text-[#3d2800]',
      idleOrb1: 'bg-[#d4af37]',
      idleOrb2: 'bg-[#f0d97a]',
      activeBg: 'bg-gradient-to-br from-[#d4af37] via-[#b8962e] to-[#8a6c00]',
      activeShadow: 'shadow-[#d4af37]/40',
    },
    {
      id: 'daily',
      labelKey: 'category.daily',
      icon: <Sun className="h-6 w-6" />,
      descriptionKey: 'category.desc.daily',
      idleBg: 'bg-[#f3eeff]',
      idleBorder: 'border border-[#c9aaf0]',
      idleIcon: 'bg-[#e4d4f8] text-[#5a22b8]',
      idleTitle: 'text-[#2d0a6e]',
      idleOrb1: 'bg-[#9b59f7]',
      idleOrb2: 'bg-[#c9aaf0]',
      activeBg: 'bg-gradient-to-br from-[#8b3ff5] via-[#6c2bd9] to-[#4a1a9e]',
      activeShadow: 'shadow-[#6c2bd9]/40',
    },
    {
      id: 'compatibility',
      labelKey: 'category.compatibility',
      icon: <Sparkle className="h-6 w-6" />,
      descriptionKey: 'category.desc.compatibility',
      idleBg: 'bg-rose-50',
      idleBorder: 'border border-rose-200',
      idleIcon: 'bg-rose-100 text-rose-600',
      idleTitle: 'text-rose-900',
      idleOrb1: 'bg-rose-300',
      idleOrb2: 'bg-pink-200',
      activeBg: 'bg-gradient-to-br from-pink-400 via-rose-500 to-rose-700',
      activeShadow: 'shadow-rose-400/40',
    },
    {
      id: 'tarot',
      labelKey: 'category.tarot',
      icon: <Wand2 className="h-6 w-6" />,
      descriptionKey: 'category.desc.tarot',
      idleBg: 'bg-[#f3eeff]',
      idleBorder: 'border border-[#c9aaf0]',
      idleIcon: 'bg-[#e4d4f8] text-[#5a22b8]',
      idleTitle: 'text-[#2d0a6e]',
      idleOrb1: 'bg-[#7c3aed]',
      idleOrb2: 'bg-[#c4b5fd]',
      activeBg: 'bg-gradient-to-br from-[#5a22b8] via-[#3d1278] to-[#2d0a6e]',
      activeShadow: 'shadow-[#5a22b8]/40',
    },
  ]

  const mbtiActive = activeCategory === 'mbti'

  return (
    <div className="flex flex-col gap-4">
      {/* 상단 4개 카테고리 */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`group relative overflow-hidden rounded-3xl p-4 transition-all duration-300 ${
                isActive
                  ? `${cat.activeBg} shadow-2xl ${cat.activeShadow} scale-105`
                  : `${cat.idleBg} hover:shadow-lg hover:brightness-97`
              }`}
              style={{
                border: isActive ? '2px solid rgba(255, 255, 255, 0.4)' : '1.5px solid #d4af37',
                boxShadow: isActive 
                  ? '0 12px 40px rgba(212, 175, 55, 0.5), 0 0 25px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
                  : '0 4px 16px rgba(212, 175, 55, 0.2), 0 0 8px rgba(212, 175, 55, 0.1)'
              }}
            >
              {/* 배경 구체 장식 */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className={`absolute -right-5 -top-5 h-20 w-20 rounded-full opacity-25 ${isActive ? 'bg-white' : cat.idleOrb1}`} />
                <div className={`absolute -left-3 -bottom-3 h-14 w-14 rounded-full opacity-20 ${isActive ? 'bg-white' : cat.idleOrb2}`} />
              </div>

              {/* 컨텐츠 */}
              <div className="relative z-10 flex flex-col items-center gap-2.5 text-center">
                <div className={`rounded-full p-3 transition-all duration-200 ${
                  isActive ? 'bg-white/25 text-white shadow-lg' : cat.idleIcon
                }`}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className={`text-sm font-bold tracking-tight transition-colors ${
                    isActive ? 'text-white' : cat.idleTitle
                  }`}>
                    {t(cat.labelKey)}
                  </h3>
                  <p className={`text-xs mt-1 transition-colors ${
                    isActive ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    {t(cat.descriptionKey)}
                  </p>
                </div>
              </div>

              {/* 활성 테두리 펄스 */}
              {isActive && (
                <div className="absolute inset-0 rounded-3xl border border-white/40 opacity-70" />
              )}
            </button>
          )
        })}
      </div>

      {/* MBTI - 전체 너비 */}
      <button
        onClick={() => onCategoryChange('mbti')}
        className={`group relative overflow-hidden rounded-3xl p-5 transition-all duration-300 w-full ${
          mbtiActive
            ? 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 scale-[1.02] shadow-2xl'
            : 'bg-fuchsia-50 hover:shadow-lg hover:brightness-97'
        }`}
        style={{
          border: mbtiActive ? '2px solid rgba(255, 255, 255, 0.4)' : '1.5px solid #d4af37',
          boxShadow: mbtiActive 
            ? '0 12px 40px rgba(212, 175, 55, 0.5), 0 0 25px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
            : '0 4px 16px rgba(212, 175, 55, 0.2), 0 0 8px rgba(212, 175, 55, 0.1)'
        }}
      >
        {/* 배경 구체 장식 */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className={`absolute -right-8 -top-8 h-36 w-36 rounded-full opacity-25 ${mbtiActive ? 'bg-white' : 'bg-fuchsia-300'}`} />
          <div className={`absolute -left-6 -bottom-6 h-24 w-24 rounded-full opacity-20 ${mbtiActive ? 'bg-white' : 'bg-violet-200'}`} />
          <div className={`absolute right-1/3 top-0 h-16 w-16 rounded-full opacity-15 ${mbtiActive ? 'bg-white' : 'bg-pink-200'}`} />
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className={`rounded-full p-3 transition-all duration-200 ${
            mbtiActive ? 'bg-white/25 text-white shadow-lg' : 'bg-fuchsia-100 text-fuchsia-600'
          }`}>
            <Brain className="h-7 w-7" />
          </div>
          <div className="text-left">
            <h3 className={`text-base font-bold tracking-tight transition-colors ${
              mbtiActive ? 'text-white' : 'text-fuchsia-900'
            }`}>
              {t('category.mbti')}
            </h3>
            <p className={`text-sm transition-colors ${
              mbtiActive ? 'text-white/80' : 'text-gray-500'
            }`}>
              {t('mbti.subtitle')}
            </p>
          </div>
          <div className={`ml-auto text-xs font-bold px-3 py-1.5 rounded-full shrink-0 transition-all ${
            mbtiActive ? 'bg-white/25 text-white shadow-md' : 'bg-fuchsia-100 text-fuchsia-600 border border-fuchsia-300'
          }`}>
            HOT
          </div>
        </div>

        {mbtiActive && (
          <div className="absolute inset-0 rounded-3xl border border-white/40 opacity-70" />
        )}
      </button>
    </div>
  )
}

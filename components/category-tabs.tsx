"use client"

import Image from "next/image"
import type { Category } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"

interface CategoryTabsProps {
  activeCategory: Category
  onCategoryChange: (category: Category) => void
}

const CATEGORY_CONFIG = [
  {
    id: 'myungli' as Category,
    labelKey: 'category.myungli',
    descriptionKey: 'category.desc.myungli',
    image: '/icons/saju.jpg',
    imageAlt: '동양사주 - 초승달과 별',
    // idle
    idleBg: '#fdf6e3',
    idleTitleColor: '#3d2800',
    // active
    activeBg: 'linear-gradient(135deg, #d4af37 0%, #b8962e 50%, #8a6c00 100%)',
    activeBorder: 'rgba(255,255,255,0.45)',
    activeGlow: 'rgba(212,175,55,0.55)',
    idleBorder: '#e8d48b',
  },
  {
    id: 'daily' as Category,
    labelKey: 'category.daily',
    descriptionKey: 'category.desc.daily',
    image: '/icons/daily.jpg',
    imageAlt: '오늘의 운세 - 태양',
    idleBg: '#ede8fb',
    idleTitleColor: '#2d0a6e',
    activeBg: 'linear-gradient(135deg, #8b3ff5 0%, #6c2bd9 50%, #4a1a9e 100%)',
    activeBorder: 'rgba(255,255,255,0.45)',
    activeGlow: 'rgba(108,43,217,0.55)',
    idleBorder: '#c9aaf0',
  },
  {
    id: 'compatibility' as Category,
    labelKey: 'category.compatibility',
    descriptionKey: 'category.desc.compatibility',
    image: '/icons/compatibility.jpg',
    imageAlt: '궁합 - 겹쳐진 하트',
    idleBg: '#fff0f6',
    idleTitleColor: '#9d174d',
    activeBg: 'linear-gradient(135deg, #f472b6 0%, #e11d74 50%, #be185d 100%)',
    activeBorder: 'rgba(255,255,255,0.45)',
    activeGlow: 'rgba(225,29,116,0.55)',
    idleBorder: '#fbb6d4',
  },
  {
    id: 'tarot' as Category,
    labelKey: 'category.tarot',
    descriptionKey: 'category.desc.tarot',
    image: '/icons/tarot.jpg',
    imageAlt: '타로 - 수정구슬',
    idleBg: '#f0ebff',
    idleTitleColor: '#3b1280',
    activeBg: 'linear-gradient(135deg, #5a22b8 0%, #3d1278 50%, #2d0a6e 100%)',
    activeBorder: 'rgba(255,255,255,0.45)',
    activeGlow: 'rgba(90,34,184,0.55)',
    idleBorder: '#c4b5fd',
  },
]

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const { t } = useLanguage()

  const mbtiActive = activeCategory === 'mbti'

  return (
    <div className="flex flex-col gap-3">
      {/* 상단 2x2 그리드 */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {CATEGORY_CONFIG.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 active:scale-95"
              style={{
                background: isActive ? cat.activeBg : cat.idleBg,
                border: `2px solid ${isActive ? cat.activeBorder : cat.idleBorder}`,
                boxShadow: isActive
                  ? `0 8px 32px ${cat.activeGlow}, 0 0 0 1px ${cat.activeBorder}`
                  : '0 2px 12px rgba(180,140,60,0.13)',
                transform: isActive ? 'scale(1.03)' : 'scale(1)',
              }}
            >
              {/* 이미지 영역 */}
              <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
                <Image
                  src={cat.image}
                  alt={cat.imageAlt}
                  fill
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 45vw, 25vw"
                />
                {/* 하단 그라데이션 오버레이 - 텍스트 가독성 */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3"
                  style={{
                    background: isActive
                      ? 'linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 100%)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.10) 0%, transparent 100%)',
                  }}
                />
                {/* 활성 반짝임 오버레이 */}
                {isActive && (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.18) 0%, transparent 65%)',
                    }}
                  />
                )}
              </div>

              {/* 텍스트 */}
              <div
                className="px-2 pb-3 pt-2 text-center"
                style={{
                  background: isActive ? 'transparent' : undefined,
                }}
              >
                <h3
                  className="text-sm font-bold tracking-tight leading-tight"
                  style={{ color: isActive ? '#ffffff' : cat.idleTitleColor }}
                >
                  {t(cat.labelKey)}
                </h3>
                <p
                  className="text-xs mt-0.5 leading-tight"
                  style={{ color: isActive ? 'rgba(255,255,255,0.82)' : '#6b7280' }}
                >
                  {t(cat.descriptionKey)}
                </p>
              </div>

              {/* 활성 테두리 내부 하이라이트 */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)' }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* MBTI 전체 너비 */}
      <button
        onClick={() => onCategoryChange('mbti')}
        className="group relative overflow-hidden rounded-2xl transition-all duration-300 active:scale-[0.99] w-full flex items-center gap-0"
        style={{
          background: mbtiActive
            ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 40%, #ec4899 100%)'
            : '#f5f0ff',
          border: `2px solid ${mbtiActive ? 'rgba(255,255,255,0.4)' : '#d8b4fe'}`,
          boxShadow: mbtiActive
            ? '0 8px 32px rgba(168,85,247,0.5), 0 0 0 1px rgba(255,255,255,0.3)'
            : '0 2px 12px rgba(180,140,60,0.13)',
          transform: mbtiActive ? 'scale(1.02)' : 'scale(1)',
          height: 96,
        }}
      >
        {/* 좌측 이미지 */}
        <div className="relative shrink-0" style={{ width: 96, height: 96 }}>
          <Image
            src="/icons/mbti.jpg"
            alt="MBTI - 퍼즐 조각"
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            sizes="96px"
          />
          {/* 우측 페이드 */}
          <div
            className="absolute inset-y-0 right-0 w-8"
            style={{
              background: mbtiActive
                ? 'linear-gradient(to right, transparent, rgba(124,58,237,0.4))'
                : 'linear-gradient(to right, transparent, #f5f0ff)',
            }}
          />
        </div>

        {/* 텍스트 */}
        <div className="flex-1 text-left px-3">
          <h3
            className="text-base font-bold tracking-tight"
            style={{ color: mbtiActive ? '#ffffff' : '#4c1d95' }}
          >
            {t('category.mbti')}
          </h3>
          <p
            className="text-sm mt-0.5 leading-snug"
            style={{ color: mbtiActive ? 'rgba(255,255,255,0.82)' : '#6b7280' }}
          >
            {t('mbti.subtitle')}
          </p>
        </div>

        {/* HOT 뱃지 */}
        <div className="shrink-0 mr-4">
          <span
            className="text-xs font-extrabold px-3 py-1.5 rounded-full"
            style={
              mbtiActive
                ? { background: 'rgba(255,255,255,0.25)', color: '#ffffff' }
                : { background: '#ef4444', color: '#ffffff' }
            }
          >
            HOT
          </span>
        </div>

        {/* 활성 내부 하이라이트 */}
        {mbtiActive && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)' }}
          />
        )}
      </button>
    </div>
  )
}

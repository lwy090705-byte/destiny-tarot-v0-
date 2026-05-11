"use client"
// Build: 20260413-v13-korean-only

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ProfileManager } from "@/components/profile-manager"
import { CategoryTabs } from "@/components/category-tabs"
import { MyungliSection } from "@/components/myungli-section"
import { DailyFortuneSection } from "@/components/daily-fortune"
import { TarotSection } from "@/components/tarot-section"
import { CompatibilitySection } from "@/components/compatibility-section"
import { MbtiSection } from "@/components/mbti-section"
import { BottomNav } from "@/components/bottom-nav"
import { MysticalBackground } from "@/components/mystical-background"
import { ErrorBoundary } from "@/components/error-boundary"
import { AnnouncementModal } from "@/components/announcement-modal"
import { NicknameModal } from "@/components/nickname-modal"
import { safeStorage } from "@/lib/safe-storage"
import { useAnnouncement } from "@/lib/announcement-context"
import { useUser } from "@/lib/user-context"
import type { UserProfile, Category } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"

export default function Home() {
  const [profiles, setProfiles] = useState<UserProfile[]>([])
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null)
  const [activeCategory, setActiveCategory] = useState<Category>('daily')
  const [calendarType, setCalendarType] = useState<'solar' | 'lunar'>('solar')
  const [isHydrated, setIsHydrated] = useState(false)
  const [showAnnouncement, setShowAnnouncement] = useState(false)

  const { language, t } = useLanguage()
  const { shouldShowAnnouncement } = useAnnouncement()
  const { isHydrated: userHydrated, needsNickname, saveNickname } = useUser()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // 닉네임 미입력 시 닉네임 모달 먼저 표시, 이후 공지사항 표시
  const [showNickname, setShowNickname] = useState(false)

  useEffect(() => {
    if (!userHydrated) return
    if (needsNickname) {
      setShowNickname(true)
    } else if (shouldShowAnnouncement) {
      setShowAnnouncement(true)
    }
  }, [userHydrated, needsNickname, shouldShowAnnouncement])

  const handleNicknameSave = (nickname: string) => {
    saveNickname(nickname)
    setShowNickname(false)
    // 닉네임 저장 후 공지사항은 shouldShowAnnouncement state 변화로 자동 처리
  }

  useEffect(() => {
    if (!isHydrated) return
    const savedProfiles = safeStorage.getItem<UserProfile[]>('fortune-profiles', null)
    if (savedProfiles && Array.isArray(savedProfiles) && savedProfiles.length > 0) {
      setProfiles(savedProfiles)
      setSelectedProfile(savedProfiles[0])
    }
  }, [isHydrated])

  useEffect(() => {
    if (isHydrated && profiles.length > 0) {
      safeStorage.setItem('fortune-profiles', profiles)
    }
  }, [profiles, isHydrated])

  const handleAddProfile = (profile: UserProfile) => {
    const newProfiles = [...profiles, { ...profile }]
    setProfiles(newProfiles)
    setSelectedProfile(profile)
  }

  const handleDeleteProfile = (id: string) => {
    const newProfiles = profiles.filter(p => p.id !== id)
    setProfiles(newProfiles)
    if (newProfiles.length === 0) localStorage.removeItem('fortune-profiles')
    if (selectedProfile?.id === id) setSelectedProfile(newProfiles[0] || null)
  }

  const handleSelectProfile = (profile: UserProfile) => {
    setSelectedProfile(profile)
    setCalendarType(profile.calendarType)
  }

  const handleCalendarTypeChange = (type: 'solar' | 'lunar') => {
    setCalendarType(type)
    if (selectedProfile) {
      const updated = { ...selectedProfile, calendarType: type }
      setSelectedProfile(updated)
      setProfiles(profiles.map(p => p.id === updated.id ? updated : p))
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0f0520 0%, #1a0a35 15%, #2d1560 40%, #3d1a80 60%, #2d1560 80%, #1a0a35 100%)' }}>
      {/* Mystical celestial background effects */}
      <MysticalBackground />
      
      <Header />

      {/* 닉네임 입력 팝업 - 최초 1회 */}
      <NicknameModal
        isOpen={showNickname}
        onSave={handleNicknameSave}
      />

      <AnnouncementModal
        isOpen={showAnnouncement}
        onClose={() => setShowAnnouncement(false)}
      />

      <main className="container mx-auto px-4 py-3 max-w-lg pb-28 relative z-10">
        <div className="mb-4">
          <ProfileManager
            profiles={profiles}
            selectedProfile={selectedProfile}
            onAddProfile={handleAddProfile}
            onDeleteProfile={handleDeleteProfile}
            onSelectProfile={handleSelectProfile}
            isHydrated={isHydrated}
          />
        </div>

        <div 
          className="rounded-3xl p-6"
          style={{ 
            background: 'linear-gradient(180deg, #fefcf8 0%, #faf5ff 50%, #fefcf8 100%)',
            boxShadow: '0 8px 40px rgba(108, 43, 217, 0.12)',
            border: '2px solid #d4af37'
          }}
        >
          <h2 className="text-xl font-bold text-[#5b21b6] mb-4 text-center" suppressHydrationWarning>
            {isHydrated ? t('category.title') : '카테고리 선택'}
          </h2>

          <div className="mb-6">
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          <div className="mt-6">
            <ErrorBoundary>
              {activeCategory === 'myungli' && (
                <MyungliSection
                  key={`${language}-${selectedProfile?.name || 'default'}`}
                  initialYear={selectedProfile?.birthYear}
                  initialMonth={selectedProfile?.birthMonth}
                  initialDay={selectedProfile?.birthDay}
                  initialHour={selectedProfile?.birthHour}
                  initialName={selectedProfile?.name}
                  initialGender={selectedProfile?.gender}
                  calendarType={calendarType}
                  onCalendarTypeChange={handleCalendarTypeChange}
                />
              )}

              {activeCategory === 'daily' && (
                <DailyFortuneSection
                  key={language}
                  initialYear={selectedProfile?.birthYear}
                  initialMonth={selectedProfile?.birthMonth}
                  initialDay={selectedProfile?.birthDay}
                  initialHour={selectedProfile?.birthHour}
                  initialGender={selectedProfile?.gender}
                  calendarType={calendarType}
                  onCalendarTypeChange={handleCalendarTypeChange}
                />
              )}

              {activeCategory === 'tarot' && (
                <TarotSection key={language} />
              )}

              {activeCategory === 'compatibility' && (
                <CompatibilitySection
                  key={language}
                  profiles={profiles}
                  selectedProfile={selectedProfile}
                />
              )}

              {activeCategory === 'mbti' && (
                <MbtiSection key={language} />
              )}
            </ErrorBoundary>
          </div>
        </div>

        <div className="h-20" />
      </main>

      <BottomNav />
    </div>
  )
}

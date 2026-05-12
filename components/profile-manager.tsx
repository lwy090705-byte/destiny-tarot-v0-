// Profile Manager Component - v58 (cache-bust)
"use client"

import { useState, useMemo, useEffect } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { UserProfile } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"

interface ProfileManagerProps {
  profiles: UserProfile[]
  selectedProfile: UserProfile | null
  onAddProfile: (profile: UserProfile) => void
  onDeleteProfile: (id: string) => void
  onSelectProfile: (profile: UserProfile) => void
  isHydrated?: boolean
}

export function ProfileManager({
  profiles,
  selectedProfile,
  onAddProfile,
  onDeleteProfile,
  onSelectProfile,
  isHydrated = false
}: ProfileManagerProps) {
  const { t } = useLanguage()
  
  const [name, setName] = useState("")
  const [birthYear, setBirthYear] = useState(2000)
  const [birthMonth, setBirthMonth] = useState(1)
  const [birthDay, setBirthDay] = useState(1)
  const [birthHour, setBirthHour] = useState<number | undefined>(undefined)
  const [hourUnknown, setHourUnknown] = useState(false)
  const [calendarType, setCalendarType] = useState<'solar' | 'lunar'>('solar')
  const [gender, setGender] = useState<'male' | 'female'>('male')

  // Use fixed year to avoid hydration mismatch
  const years = useMemo(() => Array.from({ length: 100 }, (_, i) => 2026 - i), [])
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), [])
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), [])

  // 12지 시간 목록
  const hourOptions = [
    { value: 23, label: '子時', time: '23~01시' },
    { value: 1,  label: '丑時', time: '01~03시' },
    { value: 3,  label: '寅時', time: '03~05시' },
    { value: 5,  label: '卯時', time: '05~07시' },
    { value: 7,  label: '辰時', time: '07~09시' },
    { value: 9,  label: '巳時', time: '09~11시' },
    { value: 11, label: '午時', time: '11~13시' },
    { value: 13, label: '未時', time: '13~15시' },
    { value: 15, label: '申時', time: '15~17시' },
    { value: 17, label: '酉時', time: '17~19시' },
    { value: 19, label: '戌時', time: '19~21시' },
    { value: 21, label: '亥時', time: '21~23시' },
  ]

  // 시간 Select 값: 'unknown' | 숫자 문자열
  const hourSelectValue = hourUnknown ? 'unknown' : (birthHour !== undefined ? birthHour.toString() : '')
  const handleHourSelect = (val: string) => {
    if (val === 'unknown') {
      setHourUnknown(true)
      setBirthHour(undefined)
    } else {
      setHourUnknown(false)
      setBirthHour(parseInt(val))
    }
  }

  // 프로필 선택 시 입력 폼 날짜 동기화
  const handleSelectProfileWithSync = (profile: UserProfile) => {
    setBirthYear(profile.birthYear)
    setBirthMonth(profile.birthMonth)
    setBirthDay(profile.birthDay)
    setCalendarType(profile.calendarType)
    setGender(profile.gender || 'male')
    if (profile.birthHour !== undefined) {
      setBirthHour(profile.birthHour)
      setHourUnknown(false)
    } else {
      setBirthHour(undefined)
      setHourUnknown(false)
    }
    onSelectProfile(profile)
  }

  const handleAddProfile = () => {
    if (!name.trim()) return
    
    const newProfile: UserProfile = {
      id: Date.now().toString(),
      name: name.trim(),
      birthYear: birthYear,
      birthMonth: birthMonth,
      birthDay: birthDay,
      birthHour: hourUnknown ? undefined : birthHour,
      calendarType: calendarType,
      gender: gender
    }
    
    onAddProfile(newProfile)
    setName("")
    setBirthYear(2000)
    setBirthMonth(1)
    setBirthDay(1)
    setBirthHour(undefined)
    setHourUnknown(false)
    setCalendarType('solar')
    setGender('male')
  }

  // Premium card styling matching reference image exactly
  return (
    <div 
      className="rounded-3xl p-6 relative overflow-hidden shadow-xl"
      style={{ 
        background: 'linear-gradient(180deg, #fefcf8 0%, #faf5ff 50%, #fefcf8 100%)',
        boxShadow: '0 12px 50px rgba(108, 43, 217, 0.15), 0 0 30px rgba(108, 43, 217, 0.08)',
        border: '1.5px solid #d4af37'
      }}
    >
      {/* Moon decoration in top right corner */}
      <div className="absolute top-5 right-5 pointer-events-none">
        <div className="relative">
          {/* Moon glow */}
          <div 
            className="absolute -inset-2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)' }}
          />
          {/* Moon body */}
          <div 
            className="w-10 h-10 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 50%, #f59e0b 100%)',
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)',
            }}
          />
          {/* Crescent shadow */}
          <div 
            className="absolute top-0.5 right-0 w-8 h-8 rounded-full"
            style={{ background: 'linear-gradient(135deg, #fefcf8 0%, #faf5ff 100%)' }}
          />
        </div>
      </div>

      {/* Card title with sparkle */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-purple-400">✧</span>
        <h2 className="text-lg font-bold text-[#5b21b6]">{t('profile.basicInfoTitle')}</h2>
      </div>
      
      {/* 이름 입력 */}
      <div className="mb-6">
        <Label className="text-[#2d1b4e] text-sm font-bold mb-2 block">{t('profile.name')}</Label>
        <div className="flex gap-3">
          <Input
            placeholder={t('profile.namePlaceholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 h-12 bg-white rounded-full text-[#2d1b4e] placeholder:text-gray-400 px-5"
            style={{ border: '1.5px solid #e5d4b8' }}
          />
          <Button 
            onClick={handleAddProfile}
            className="h-12 px-6 rounded-full text-white font-bold shadow-lg transition-all active:scale-95 hover:shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #6c2bd9 0%, #8b5cf6 50%, #5b21b6 100%)',
              boxShadow: '0 6px 25px rgba(91, 33, 182, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            <Plus className="h-4 w-4 mr-1" />
            {t('profile.add')}
          </Button>
        </div>
      </div>

      {/* 달력 선택 */}
      <div className="mb-6">
        <Label className="text-[#2d1b4e] text-sm font-bold mb-2 block">{t('date.calendar')}</Label>
        <RadioGroup
          value={calendarType}
          onValueChange={(value) => setCalendarType(value as 'solar' | 'lunar')}
          className="flex gap-3"
        >
          <label 
            htmlFor="profile-solar" 
            className="flex items-center gap-3 cursor-pointer flex-1 rounded-full px-4 py-3 transition-all active:scale-95"
            style={calendarType === 'solar' ? {
              background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #4c1d95 100%)',
              border: '2px solid #d4af37',
              boxShadow: '0 4px 20px rgba(91, 33, 182, 0.4)'
            } : {
              background: '#ffffff',
              border: '1.5px solid #c9b896'
            }}
          >
            <div 
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
              style={{ borderColor: calendarType === 'solar' ? '#ffffff' : '#7c3aed' }}
            >
              {calendarType === 'solar' && <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />}
            </div>
            <RadioGroupItem value="solar" id="profile-solar" className="sr-only" />
            <span className={`text-sm font-semibold ${calendarType === 'solar' ? 'text-white' : 'text-[#2d1b4e]'}`}>
              {t('profile.solar')}
            </span>
            {calendarType === 'solar' && <span className="ml-auto text-amber-300 text-xs">✦</span>}
          </label>
          <label 
            htmlFor="profile-lunar" 
            className="flex items-center gap-3 cursor-pointer flex-1 rounded-full px-4 py-3 transition-all active:scale-95"
            style={calendarType === 'lunar' ? {
              background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #4c1d95 100%)',
              border: '2px solid #d4af37',
              boxShadow: '0 4px 20px rgba(91, 33, 182, 0.4)'
            } : {
              background: '#ffffff',
              border: '1.5px solid #c9b896'
            }}
          >
            <div 
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
              style={{ borderColor: calendarType === 'lunar' ? '#ffffff' : '#a8a29e' }}
            >
              {calendarType === 'lunar' && <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />}
            </div>
            <RadioGroupItem value="lunar" id="profile-lunar" className="sr-only" />
            <span className={`text-sm font-semibold ${calendarType === 'lunar' ? 'text-white' : 'text-[#2d1b4e]'}`}>
              {t('profile.lunar')}
            </span>
            {calendarType === 'lunar' && <span className="ml-auto text-amber-300 text-xs">✦</span>}
          </label>
        </RadioGroup>
      </div>

      {/* 성별 선택 */}
      <div className="mb-6">
        <Label className="text-[#2d1b4e] text-sm font-bold mb-2 block">{t('profile.gender') || '성별'}</Label>
        <RadioGroup
          value={gender}
          onValueChange={(value) => setGender(value as 'male' | 'female')}
          className="flex gap-3"
        >
          <label 
            htmlFor="profile-male" 
            className="flex items-center gap-3 cursor-pointer flex-1 rounded-full px-4 py-3 transition-all active:scale-95"
            style={gender === 'male' ? {
              background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #4c1d95 100%)',
              border: '2px solid #d4af37',
              boxShadow: '0 4px 20px rgba(91, 33, 182, 0.4)'
            } : {
              background: '#ffffff',
              border: '1.5px solid #c9b896'
            }}
          >
            <div 
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
              style={{ borderColor: gender === 'male' ? '#ffffff' : '#7c3aed' }}
            >
              {gender === 'male' && <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />}
            </div>
            <RadioGroupItem value="male" id="profile-male" className="sr-only" />
            <span className={`text-sm font-semibold ${gender === 'male' ? 'text-white' : 'text-[#2d1b4e]'}`}>
              {t('profile.male') || '남성'}
            </span>
          </label>
          <label 
            htmlFor="profile-female" 
            className="flex items-center gap-3 cursor-pointer flex-1 rounded-full px-4 py-3 transition-all active:scale-95"
            style={gender === 'female' ? {
              background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #4c1d95 100%)',
              border: '2px solid #d4af37',
              boxShadow: '0 4px 20px rgba(91, 33, 182, 0.4)'
            } : {
              background: '#ffffff',
              border: '1.5px solid #c9b896'
            }}
          >
            <div 
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
              style={{ borderColor: gender === 'female' ? '#ffffff' : '#a8a29e' }}
            >
              {gender === 'female' && <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />}
            </div>
            <RadioGroupItem value="female" id="profile-female" className="sr-only" />
            <span className={`text-sm font-semibold ${gender === 'female' ? 'text-white' : 'text-[#2d1b4e]'}`}>
              {t('profile.female') || '여성'}
            </span>
          </label>
        </RadioGroup>
      </div>

      {/* 날짜 선택 */}
      <div className="mb-6">
        <Label className="text-[#2d1b4e] text-sm font-bold mb-2 block">{t('date.select')}</Label>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div>
            <Label className="text-[#7c5cbf] text-xs font-medium mb-1 block">{t('date.year')}</Label>
            <Select value={birthYear.toString()} onValueChange={(v) => setBirthYear(parseInt(v))}>
              <SelectTrigger 
                className="h-12 bg-white rounded-xl text-[#2d1b4e] font-medium"
                style={{ border: '1.5px solid #c9b896' }}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl shadow-xl border-gray-100">
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()} className="text-[#2d1b4e]">{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-[#7c5cbf] text-xs font-medium mb-1 block">{t('date.month')}</Label>
            <Select value={birthMonth.toString()} onValueChange={(v) => setBirthMonth(parseInt(v))}>
              <SelectTrigger 
                className="h-12 bg-white rounded-xl text-[#2d1b4e] font-medium"
                style={{ border: '1.5px solid #c9b896' }}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl shadow-xl border-gray-100">
                {months.map((m) => (
                  <SelectItem key={m} value={m.toString()} className="text-[#2d1b4e]">{String(m).padStart(2, '0')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-[#7c5cbf] text-xs font-medium mb-1 block">{t('date.day')}</Label>
            <Select value={birthDay.toString()} onValueChange={(v) => setBirthDay(parseInt(v))}>
              <SelectTrigger 
                className="h-12 bg-white rounded-xl text-[#2d1b4e] font-medium"
                style={{ border: '1.5px solid #c9b896' }}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl shadow-xl border-gray-100">
                {days.map((d) => (
                  <SelectItem key={d} value={d.toString()} className="text-[#2d1b4e]">{String(d).padStart(2, '0')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#e8dcc8] mb-6" />

      {/* 시간 선택 */}
      <div className="mb-6">
        <Label className="text-[#2d1b4e] text-sm font-bold mb-2 block">{t('date.hour') || '시간 선택'}</Label>
        <Select value={hourSelectValue} onValueChange={handleHourSelect}>
          <SelectTrigger 
            className="h-12 bg-white rounded-xl text-[#2d1b4e] font-medium max-w-[200px]"
            style={{ border: '1.5px solid #c9b896' }}
          >
            <SelectValue placeholder={t('date.hour') || '시간 선택'} />
          </SelectTrigger>
          <SelectContent className="bg-white rounded-xl shadow-xl border-gray-100">
            <SelectItem value="unknown" className="text-[#2d1b4e]">{t('profile.hourUnknown')}</SelectItem>
            {hourOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value.toString()} className="text-[#2d1b4e]">
                {opt.label} ({opt.time})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 저장된 프로필 목록 */}
      <div className="flex items-center gap-2 mb-4 mt-2">
        <span className="text-purple-400">✧</span>
        <h3 className="text-base font-bold text-[#5b21b6]">{t('profile.title')}</h3>
      </div>
      <div className="space-y-2" suppressHydrationWarning>
        {!isHydrated ? (
          <p className="text-center text-gray-400 py-4 text-sm" suppressHydrationWarning>
            {t('profile.loading')}
          </p>
        ) : profiles.length > 0 ? (
          profiles.map((profile) => (
            <div
              key={profile.id}
              onClick={() => handleSelectProfileWithSync(profile)}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                selectedProfile?.id === profile.id
                  ? "bg-gradient-to-r from-[#f3e8ff] to-[#e9d5ff] border-2 border-[#6c2bd9] shadow-md"
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              <div>
                <p className="font-semibold text-[#2d1b4e]">{profile.name}</p>
                <p className="text-xs text-[#6c2bd9] mt-0.5">
                  {profile.birthYear}-{String(profile.birthMonth).padStart(2, '0')}-{String(profile.birthDay).padStart(2, '0')}
                  {profile.birthHour !== undefined
                    ? ` · ${hourOptions.find(h => h.value === profile.birthHour)?.label ?? ''}(${hourOptions.find(h => h.value === profile.birthHour)?.time ?? ''})`
                    : ` · ${t('profile.hourNotEntered')}`}
                  {' '}({profile.calendarType === 'lunar' ? t('profile.lunar') : t('profile.solar')})
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteProfile(profile.id)
                }}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 py-4 text-sm" suppressHydrationWarning>
            {t('profile.emptyList')}
          </p>
        )}
      </div>
    </div>
  )
}

"use client"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Language } from "@/lib/i18n"
import { translations } from "@/lib/i18n"

interface DateSelectorProps {
  year: number
  month: number
  day: number
  hour?: number
  calendarType: 'solar' | 'lunar'
  showHour?: boolean
  onYearChange: (year: number) => void
  onMonthChange: (month: number) => void
  onDayChange: (day: number) => void
  onHourChange?: (hour: number) => void
  onCalendarTypeChange: (type: 'solar' | 'lunar') => void
  language: Language
}

export function DateSelector({
  year,
  month,
  day,
  hour,
  calendarType,
  showHour = false,
  onYearChange,
  onMonthChange,
  onDayChange,
  onHourChange,
  onCalendarTypeChange,
  language
}: DateSelectorProps) {
  const t = (key: string) => translations[language][key] || key
  
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-400">
        <h3 className="font-semibold text-purple-700 mb-3">{t('date.calendar')}</h3>
        <RadioGroup
          value={calendarType}
          onValueChange={(value) => onCalendarTypeChange(value as 'solar' | 'lunar')}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="solar" id="solar" className="border-purple-400 text-purple-600" />
            <Label htmlFor="solar" className="text-gray-700 cursor-pointer">{t('profile.solar')}</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="lunar" id="lunar" className="border-purple-400 text-purple-600" />
            <Label htmlFor="lunar" className="text-gray-700 cursor-pointer">{t('profile.lunar')}</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-400">
        <h3 className="font-semibold text-purple-700 mb-3">{t('date.select')}</h3>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="text-gray-600 text-sm">{t('date.year')}</Label>
            <Select value={year.toString()} onValueChange={(v) => onYearChange(parseInt(v))}>
              <SelectTrigger className="mt-1 border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-gray-600 text-sm">{t('date.month')}</Label>
            <Select value={month.toString()} onValueChange={(v) => onMonthChange(parseInt(v))}>
              <SelectTrigger className="mt-1 border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m} value={m.toString()}>{String(m).padStart(2, '0')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-gray-600 text-sm">{t('date.day')}</Label>
            <Select value={day.toString()} onValueChange={(v) => onDayChange(parseInt(v))}>
              <SelectTrigger className="mt-1 border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {days.map((d) => (
                  <SelectItem key={d} value={d.toString()}>{String(d).padStart(2, '0')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {showHour && (
          <div className="mt-3">
            <Label className="text-gray-600 text-sm">{t('date.hour')}</Label>
            <Select 
              value={hour?.toString() || ""} 
              onValueChange={(v) => onHourChange?.(parseInt(v))}
            >
              <SelectTrigger className="mt-1 border-gray-200 w-24">
                <SelectValue placeholder={t('date.hour')} />
              </SelectTrigger>
              <SelectContent>
                {hours.map((h) => (
                  <SelectItem key={h} value={h.toString()}>
                    {String(h).padStart(2, '0')}:00
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  )
}

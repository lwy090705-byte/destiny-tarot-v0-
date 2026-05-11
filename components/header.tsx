"use client"

import { Sparkles, Coins } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { languages, type Language } from "@/lib/i18n"
import { useLanguage } from "@/lib/language-context"
import { usePoints } from "@/lib/points-context"

export function Header() {
  const { language, setLanguage } = useLanguage()
  const { points } = usePoints()

  return (
    <header className="flex items-center justify-between px-5 py-4 relative z-20">
      {/* Logo with sparkle and single-line gold title */}
      <div className="flex items-center gap-3">
        <Sparkles 
          className="h-6 w-6" 
          style={{ 
            color: '#d4af37',
            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.7))'
          }} 
        />
        <span 
          className="text-lg font-bold tracking-wide whitespace-nowrap"
          style={{ 
            color: '#d4af37',
            textShadow: '0 0 12px rgba(212, 175, 55, 0.5), 0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          운명과 타로
        </span>
        {/* Points display */}
        <div 
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
          style={{
            background: 'rgba(212, 175, 55, 0.2)',
            color: '#d4af37',
            border: '1px solid rgba(212, 175, 55, 0.4)'
          }}
        >
          <Coins className="h-3.5 w-3.5" />
          <span>{points}P</span>
        </div>
      </div>

      {/* Language selector - white pill */}
      <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
        <SelectTrigger 
          className="h-11 text-sm rounded-full font-semibold px-4 gap-2 border-0 transition-all hover:shadow-lg"
          style={{ 
            background: '#ffffff',
            color: '#6c2bd9',
            boxShadow: '0 6px 25px rgba(0,0,0,0.12)',
            minWidth: '140px',
            border: '1px solid rgba(212, 175, 55, 0.2)'
          }}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent 
          className="bg-white border-0 rounded-2xl overflow-hidden shadow-2xl" 
          style={{ boxShadow: '0 12px 50px rgba(0,0,0,0.2)' }}
        >
          {languages.map((lang) => (
            <SelectItem 
              key={lang.id} 
              value={lang.id} 
              className="text-[#2d1b4e] focus:bg-gradient-to-r focus:from-[#f3eeff] focus:to-[#ede9f8] focus:text-[#6c2bd9] py-3 px-5 cursor-pointer text-sm font-medium transition-all"
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </header>
  )
}

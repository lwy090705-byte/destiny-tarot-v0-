"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { languages, type Language } from "@/lib/i18n"

import { useLanguage } from "@/lib/language-context"
import { usePoints } from "@/lib/points-context"

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const { points, isHydrated } = usePoints()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const currentCode = language.toUpperCase()
  const appTitle = t("app.title")

  return (
    <header className="px-4 pt-3 pb-3 z-20" style={{ position: "relative" }}>
      {/* Main row: logo+text on left, right column (v3.0 + lang) on right */}
      <div className="flex items-stretch gap-2">

        {/* Left: logo + title + points — vertically centered */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Logo image */}
          <div className="shrink-0 relative" style={{ width: 68, height: 68 }}>
            <Image
              src="/icons/header-logo.jpg"
              alt="로고"
              fill
              className="object-cover rounded-2xl"
              style={{
                boxShadow: "0 0 20px rgba(139,59,245,0.45), 0 4px 16px rgba(212,175,55,0.3)",
              }}
            />
          </div>

          {/* Title + points */}
          <div className="min-w-0 flex flex-col justify-center">
            <h1
              className="font-black leading-tight"
              style={{
                /* Fluid: shrinks for long translated titles, wraps if needed */
                fontSize: "clamp(17px, 5.5vw, 26px)",
                color: "#d4af37",
                textShadow: "0 0 18px rgba(212,175,55,0.65), 0 2px 6px rgba(0,0,0,0.45)",
                letterSpacing: "-0.01em",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {appTitle}
            </h1>
            {isHydrated && (
              <div
                className="inline-flex items-center gap-1 mt-1.5 px-3 py-1 rounded-full font-black self-start"
                style={{
                  background: "rgba(212,175,55,0.15)",
                  border: "1px solid rgba(212,175,55,0.45)",
                  color: "#d4af37",
                  fontSize: "0.85rem",
                  textShadow: "0 0 10px rgba(212,175,55,0.55)",
                }}
              >
                <span style={{ fontSize: 11 }}>✦</span>
                {points}P
              </div>
            )}
          </div>
        </div>

        {/* Right column: v3.0 badge top, language selector bottom — same height as left */}
        <div
          className="shrink-0 flex flex-col items-end justify-between"
          style={{ minHeight: 68 }}
          ref={dropdownRef}
        >
          {/* v3.0 badge — top of right column */}
          <div
            className="font-black px-3 py-1 rounded-full flex items-center gap-1 whitespace-nowrap"
            style={{
              border: "1.5px solid #d4af37",
              color: "#d4af37",
              background: "transparent",
              fontSize: "0.85rem",
              textShadow: "0 0 10px rgba(212,175,55,0.55)",
            }}
          >
            <span style={{ fontSize: 11 }}>✦</span> v3.0
          </div>

          {/* Language selector — bottom of right column, naturally aligned with points pill */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-full font-bold transition-all active:scale-95"
            style={{
              background: "#ffffff",
              color: "#6c2bd9",
              border: "1.5px solid rgba(212,175,55,0.35)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.14)",
              padding: "6px 12px",
              fontSize: 13,
              whiteSpace: "nowrap",
            }}
          >
            <span>{currentCode}</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              style={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            >
              <path
                d="M1 3l4 4 4-4"
                stroke="#6c2bd9"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {open && (
            <div
              className="absolute right-4 mt-2 rounded-2xl overflow-hidden"
              style={{
                top: "100%",
                background: "#fff",
                boxShadow: "0 12px 40px rgba(0,0,0,0.22)",
                width: 160,
                maxHeight: 280,
                overflowY: "auto",
                zIndex: 50,
              }}
            >
              {languages.map((lang) => {
                const isSelected = lang.id === language
                return (
                  <button
                    key={lang.id}
                    onClick={() => {
                      setLanguage(lang.id as Language)
                      setOpen(false)
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium transition-colors"
                    style={{
                      color: isSelected ? "#6c2bd9" : "#2d1b4e",
                      background: isSelected
                        ? "linear-gradient(90deg, #f3eeff, #ede9f8)"
                        : "transparent",
                    }}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="truncate">{lang.label}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </header>
  )
}

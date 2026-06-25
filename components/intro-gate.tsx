'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { IntroVideoOverlay } from '@/components/intro-video-overlay'
import { shouldShowIntroToday } from '@/lib/intro-storage'

type IntroGateContextValue = {
  introFinished: boolean
}

const IntroGateContext = createContext<IntroGateContextValue>({ introFinished: false })

export function useIntroFinished(): boolean {
  return useContext(IntroGateContext).introFinished
}

export function IntroGate({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [introFinished, setIntroFinished] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (shouldShowIntroToday()) {
      setShowIntro(true)
      setIntroFinished(false)
    } else {
      setIntroFinished(true)
    }
  }, [])

  return (
    <IntroGateContext.Provider value={{ introFinished }}>
      {children}
      {mounted && showIntro && (
        <IntroVideoOverlay
          onComplete={() => {
            setShowIntro(false)
            setIntroFinished(true)
          }}
        />
      )}
    </IntroGateContext.Provider>
  )
}

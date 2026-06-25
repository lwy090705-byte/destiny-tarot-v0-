'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { markIntroShownToday } from '@/lib/intro-storage'

const INTRO_SRC = '/videos/intro.mp4'
const FADE_OUT_MS = 400
const LOAD_TIMEOUT_MS = 12000

interface IntroVideoOverlayProps {
  onComplete: () => void
}

export function IntroVideoOverlay({ onComplete }: IntroVideoOverlayProps) {
  const { t } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)
  const completedRef = useRef(false)
  const [fadeOut, setFadeOut] = useState(false)

  const finish = useCallback(
    (withFade: boolean) => {
      if (completedRef.current) return
      completedRef.current = true
      markIntroShownToday()

      if (withFade) {
        setFadeOut(true)
        window.setTimeout(onComplete, FADE_OUT_MS)
      } else {
        onComplete()
      }
    },
    [onComplete]
  )

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleError = () => finish(false)
    const handleEnded = () => finish(true)

    video.addEventListener('error', handleError)
    video.addEventListener('ended', handleEnded)

    const loadTimeout = window.setTimeout(() => {
      if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        finish(false)
      }
    }, LOAD_TIMEOUT_MS)

    video.play().catch(() => finish(false))

    return () => {
      video.removeEventListener('error', handleError)
      video.removeEventListener('ended', handleEnded)
      window.clearTimeout(loadTimeout)
    }
  }, [finish])

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-[400ms] ease-out"
      style={{ opacity: fadeOut ? 0 : 1 }}
      role="dialog"
      aria-label={t('intro.videoLabel')}
    >
      <video
        ref={videoRef}
        src={INTRO_SRC}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <button
        type="button"
        onClick={() => finish(false)}
        className="absolute top-4 right-4 z-10 px-4 py-2 rounded-full text-sm font-semibold text-white/95 bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-sm transition-colors active:scale-95"
      >
        {t('intro.skip')}
      </button>
    </div>
  )
}

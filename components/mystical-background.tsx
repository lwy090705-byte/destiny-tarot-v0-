"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  delay: number
  duration: number
}

export function MysticalBackground() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Generate twinkling stars - more stars for richer night sky
    const generatedStars: Star[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
    setStars(generatedStars)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(75, 0, 130, 0.3) 0%, transparent 50%)',
        }}
      />

      {/* Crescent Moon - upper right */}
      <div className="absolute top-16 right-8 sm:top-20 sm:right-16">
        <div className="relative">
          {/* Moon glow */}
          <div 
            className="absolute -inset-4 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 215, 100, 0.15) 0%, transparent 70%)',
            }}
          />
          {/* Moon body */}
          <div 
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 40%, #f59e0b 100%)',
              boxShadow: '0 0 30px rgba(251, 191, 36, 0.4), 0 0 60px rgba(251, 191, 36, 0.2)',
            }}
          />
          {/* Moon shadow (crescent effect) */}
          <div 
            className="absolute top-1 right-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #1e0a3c 0%, #2d1560 100%)',
            }}
          />
        </div>
      </div>

      {/* Twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.size > 1.5 
              ? 'radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.5) 50%, transparent 100%)' 
              : '#ffffff',
            boxShadow: star.size > 1.2 
              ? `0 0 ${star.size * 3}px rgba(255, 255, 255, ${star.opacity * 0.6})` 
              : 'none',
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            opacity: star.opacity,
          }}
        />
      ))}

      {/* Constellation lines - subtle decorative */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]">
        {/* Upper left constellation */}
        <line x1="10%" y1="15%" x2="18%" y2="25%" stroke="#d4af37" strokeWidth="0.5" />
        <line x1="18%" y1="25%" x2="15%" y2="35%" stroke="#d4af37" strokeWidth="0.5" />
        <line x1="18%" y1="25%" x2="28%" y2="22%" stroke="#d4af37" strokeWidth="0.5" />
        
        {/* Lower right constellation */}
        <line x1="75%" y1="70%" x2="82%" y2="78%" stroke="#d4af37" strokeWidth="0.5" />
        <line x1="82%" y1="78%" x2="78%" y2="88%" stroke="#d4af37" strokeWidth="0.5" />
        <line x1="82%" y1="78%" x2="92%" y2="75%" stroke="#d4af37" strokeWidth="0.5" />
        
        {/* Center-right constellation */}
        <line x1="85%" y1="40%" x2="90%" y2="48%" stroke="#d4af37" strokeWidth="0.5" />
        <line x1="90%" y1="48%" x2="95%" y2="45%" stroke="#d4af37" strokeWidth="0.5" />
      </svg>

      {/* Small sparkle decorations */}
      <div className="absolute top-32 left-12 w-1.5 h-1.5">
        <div className="absolute inset-0 bg-white rounded-full animate-pulse" style={{ animationDuration: '2s' }} />
        <div className="absolute -inset-0.5 bg-white/30 rounded-full blur-sm" />
      </div>
      <div className="absolute top-48 right-24 w-1 h-1">
        <div className="absolute inset-0 bg-amber-200 rounded-full animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />
      </div>
      <div className="absolute bottom-40 left-8 w-1 h-1">
        <div className="absolute inset-0 bg-purple-200 rounded-full animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: var(--tw-opacity, 0.5);
            transform: scale(1);
          }
          50% {
            opacity: calc(var(--tw-opacity, 0.5) * 0.3);
            transform: scale(0.7);
          }
        }
      `}</style>
    </div>
  )
}

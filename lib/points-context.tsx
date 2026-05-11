"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface PointsContextType {
  points: number
  deductPoints: (amount: number) => boolean  // returns true if successful
  addPoints: (amount: number) => void
  hasEnoughPoints: (amount: number) => boolean
  isHydrated: boolean
}

const PointsContext = createContext<PointsContextType | undefined>(undefined)

const STORAGE_KEY = "fortune-app-points"
const VERSION_KEY = "fortune-app-points-version"
const CURRENT_VERSION = 2  // Increment to reset points for existing users
const INITIAL_POINTS = 0

export function PointsProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(INITIAL_POINTS)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load points from localStorage on mount
  useEffect(() => {
    const storedVersion = localStorage.getItem(VERSION_KEY)
    const stored = localStorage.getItem(STORAGE_KEY)
    
    // If version mismatch or no version, reset to initial points
    if (storedVersion !== CURRENT_VERSION.toString()) {
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION.toString())
      localStorage.setItem(STORAGE_KEY, INITIAL_POINTS.toString())
      setPoints(INITIAL_POINTS)
    } else if (stored !== null) {
      setPoints(parseInt(stored, 10))
    }
    setIsHydrated(true)
  }, [])

  // Save points to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, points.toString())
    }
  }, [points, isHydrated])

  const hasEnoughPoints = (amount: number): boolean => {
    return points >= amount
  }

  const deductPoints = (amount: number): boolean => {
    if (points >= amount) {
      const newPoints = points - amount
      setPoints(newPoints)
      // Immediately save to localStorage to ensure persistence
      localStorage.setItem(STORAGE_KEY, newPoints.toString())
      return true
    }
    return false
  }

  const addPoints = (amount: number) => {
    const newPoints = points + amount
    setPoints(newPoints)
    // Immediately save to localStorage to ensure persistence
    localStorage.setItem(STORAGE_KEY, newPoints.toString())
  }

  return (
    <PointsContext.Provider value={{ points, deductPoints, addPoints, hasEnoughPoints, isHydrated }}>
      {children}
    </PointsContext.Provider>
  )
}

export function usePoints() {
  const context = useContext(PointsContext)
  if (context === undefined) {
    throw new Error("usePoints must be used within a PointsProvider")
  }
  return context
}

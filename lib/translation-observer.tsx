"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useLanguage } from "./language-context"

const TRANSLATABLE_ATTRIBUTES = [
  "placeholder",
  "title",
  "alt",
  "aria-label",
  "data-label",
  "data-title",
]

export function TranslationObserver() {
  const { language, t } = useLanguage()
  const pathname = usePathname()
  const tRef = useRef(t)
  const observerRef = useRef<MutationObserver | null>(null)
  const cacheRef = useRef<Set<Element>>(new Set())
  
  // Keep t function ref up to date
  useEffect(() => {
    tRef.current = t
  }, [t])
  
  // Translate a node
  const translateNode = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim()
      if (text && text.length > 0 && text.length < 150) {
        const translated = tRef.current(text)
        if (translated !== text) {
          node.textContent = translated
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element
      if (cacheRef.current.has(element)) return

      if (element.children.length === 0 && element.textContent?.trim()) {
        const text = element.textContent.trim()
        if (text.length < 150) {
          const translated = tRef.current(text)
          if (translated !== text) {
            element.textContent = translated
          }
        }
      }

      TRANSLATABLE_ATTRIBUTES.forEach((attr) => {
        const val = element.getAttribute(attr)
        if (val) {
          const translated = tRef.current(val)
          if (translated !== val) {
            element.setAttribute(attr, translated)
          }
        }
      })

      cacheRef.current.add(element)
    }
  }

  // Walk DOM tree
  const walkDOM = (node: Node) => {
    translateNode(node)
    node.childNodes.forEach((child) => walkDOM(child))
  }

  // Translate page
  const translatePage = () => {
    cacheRef.current.clear()
    if (document.body) {
      walkDOM(document.body)
    }
  }

  // Language change handler
  useEffect(() => {
    translatePage()
  }, [language])

  // Route change handler - translate immediately and after a delay for dynamic content
  useEffect(() => {
    translatePage()
    // Translate again after short delays to catch async-rendered content
    const timer1 = setTimeout(() => translatePage(), 100)
    const timer2 = setTimeout(() => translatePage(), 300)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [pathname])

  // Listen for custom language route change event
  useEffect(() => {
    const handleLanguageRouteChange = () => {
      translatePage()
      setTimeout(() => translatePage(), 150)
    }
    window.addEventListener('languageRouteChange', handleLanguageRouteChange)
    return () => window.removeEventListener('languageRouteChange', handleLanguageRouteChange)
  }, [])

  // MutationObserver for dynamic content
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 || node.nodeType === 3) {
              walkDOM(node)
            }
          })
        } else if (mutation.type === "attributes" && mutation.attributeName) {
          const el = mutation.target as Element
          if (TRANSLATABLE_ATTRIBUTES.includes(mutation.attributeName)) {
            const attr = mutation.attributeName
            const val = el.getAttribute(attr)
            if (val) {
              const translated = tRef.current(val)
              if (translated !== val) {
                el.setAttribute(attr, translated)
              }
            }
          }
        }
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: TRANSLATABLE_ATTRIBUTES,
    })

    return () => observer.disconnect()
  }, [])

  return null
}

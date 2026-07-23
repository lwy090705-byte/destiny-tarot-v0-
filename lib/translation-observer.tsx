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

/** Never translate URL-bearing attributes (prevents /community → /지역 사회 style rewrites). */
const SKIP_ATTRIBUTES = new Set(["href", "src", "action", "data-href", "formaction"])

function shouldSkipElement(element: Element): boolean {
  if (element.closest?.(".notranslate, [translate='no']")) return true
  const tag = element.tagName
  if (tag === "SCRIPT" || tag === "STYLE" || tag === "CODE" || tag === "PRE") return true
  // Anchor/link elements: translate visible text only via children walk, never href
  return false
}

export function TranslationObserver() {
  const { language, t } = useLanguage()
  const pathname = usePathname()
  const tRef = useRef(t)
  const cacheRef = useRef<Set<Element>>(new Set())

  useEffect(() => {
    tRef.current = t
  }, [t])

  const translateNode = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parent = node.parentElement
      if (parent && shouldSkipElement(parent)) return
      // Do not rewrite text that looks like an app path
      const text = node.textContent?.trim()
      if (text && text.length > 0 && text.length < 150 && !text.startsWith("/")) {
        const translated = tRef.current(text)
        if (translated !== text && !translated.startsWith("/")) {
          node.textContent = translated
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element
      if (cacheRef.current.has(element)) return
      if (shouldSkipElement(element)) {
        cacheRef.current.add(element)
        return
      }

      if (element.children.length === 0 && element.textContent?.trim()) {
        const text = element.textContent.trim()
        if (text.length < 150 && !text.startsWith("/")) {
          const translated = tRef.current(text)
          if (translated !== text && !translated.startsWith("/")) {
            element.textContent = translated
          }
        }
      }

      TRANSLATABLE_ATTRIBUTES.forEach((attr) => {
        if (SKIP_ATTRIBUTES.has(attr)) return
        const val = element.getAttribute(attr)
        if (val && !val.startsWith("/") && !val.startsWith("http")) {
          const translated = tRef.current(val)
          if (translated !== val && !translated.startsWith("/")) {
            element.setAttribute(attr, translated)
          }
        }
      })

      cacheRef.current.add(element)
    }
  }

  const walkDOM = (node: Node) => {
    translateNode(node)
    node.childNodes.forEach((child) => walkDOM(child))
  }

  const translatePage = () => {
    cacheRef.current.clear()
    if (document.body) {
      walkDOM(document.body)
    }
  }

  useEffect(() => {
    translatePage()
  }, [language])

  useEffect(() => {
    translatePage()
    const timer1 = setTimeout(() => translatePage(), 100)
    const timer2 = setTimeout(() => translatePage(), 300)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [pathname])

  useEffect(() => {
    const handleLanguageRouteChange = () => {
      translatePage()
      setTimeout(() => translatePage(), 150)
    }
    window.addEventListener("languageRouteChange", handleLanguageRouteChange)
    return () => window.removeEventListener("languageRouteChange", handleLanguageRouteChange)
  }, [])

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
          if (SKIP_ATTRIBUTES.has(mutation.attributeName)) return
          const el = mutation.target as Element
          if (TRANSLATABLE_ATTRIBUTES.includes(mutation.attributeName)) {
            const attr = mutation.attributeName
            const val = el.getAttribute(attr)
            if (val && !val.startsWith("/") && !val.startsWith("http")) {
              const translated = tRef.current(val)
              if (translated !== val && !translated.startsWith("/")) {
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

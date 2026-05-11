import type { Language } from "./i18n"

export const languageTypography: Record<Language, {
  fontSize: string
  lineHeight: string
  letterSpacing: string
  wordBreak: string
  fontFamily: string
}> = {
  ko: {
    fontSize: "clamp(13px, 0.95vw, 16px)",
    lineHeight: "1.4",
    letterSpacing: "-0.3px",
    wordBreak: "keep-all",
    fontFamily: "'Noto Sans KR', 'Noto Sans', sans-serif",
  },
}

export function getLanguageTypographyClass(language: Language): string {
  return `lang-${language}`
}

export function injectLanguageTypographyStyles(language: Language): void {
  const typo = languageTypography[language]
  const className = getLanguageTypographyClass(language)
  
  // Remove existing language style
  const existingStyle = document.getElementById("language-typography-style")
  if (existingStyle) {
    existingStyle.remove()
  }

  // Create and inject new style
  const style = document.createElement("style")
  style.id = "language-typography-style"
  style.textContent = `
    .${className} {
      font-size: ${typo.fontSize};
      line-height: ${typo.lineHeight};
      letter-spacing: ${typo.letterSpacing};
      word-break: ${typo.wordBreak};
      font-family: ${typo.fontFamily};
      overflow-wrap: break-word;
      white-space: normal;
    }
    
    .${className} button {
      font-size: ${typo.fontSize};
      word-break: ${typo.wordBreak};
    }
    
    .${className} input,
    .${className} textarea {
      font-size: ${typo.fontSize};
      line-height: ${typo.lineHeight};
      word-break: ${typo.wordBreak};
    }
    
    .${className} [role="dialog"],
    .${className} .modal {
      font-size: ${typo.fontSize};
      line-height: ${typo.lineHeight};
    }
    
    .${className} nav,
    .${className} [role="navigation"] {
      font-size: clamp(11px, 0.9vw, 14px);
      word-break: ${typo.wordBreak};
    }
    
    .${className} h1 {
      font-size: clamp(24px, 5vw, 32px);
      line-height: 1.2;
    }
    
    .${className} h2 {
      font-size: clamp(20px, 4vw, 28px);
      line-height: 1.3;
    }
    
    .${className} h3 {
      font-size: clamp(16px, 2.5vw, 22px);
      line-height: 1.4;
    }
  `
  document.head.appendChild(style)
}

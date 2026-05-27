import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { OnboardingGate } from '@/components/onboarding-gate'
import { LanguageProvider } from '@/lib/language-context'
import { PointsProvider } from '@/lib/points-context'
import { AnnouncementProvider } from '@/lib/announcement-context'
import { UserProvider } from '@/lib/user-context'
import { PremiumProvider } from '@/lib/premium-context'
import { VisitLogTracker } from '@/components/visit-log-tracker'
import './globals.css'

const notoSansKR = Noto_Sans_KR({ 
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: '운명과 타로 - Destiny & Tarot',
  description: '타로 카드, 사주팔자, 오늘의 운세를 확인하세요. 당신의 운명을 알아보세요.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1e0a3c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className="bg-[#1e0a3c]">
      <head>
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3800755907918334"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${notoSansKR.variable} font-sans antialiased`} suppressHydrationWarning>
        <LanguageProvider>
          <UserProvider>
            <PremiumProvider>
            <VisitLogTracker />
            <PointsProvider>
              <AnnouncementProvider>
                <OnboardingGate>
                  {children}
                </OnboardingGate>
                <Analytics />
              </AnnouncementProvider>
            </PointsProvider>
            </PremiumProvider>
          </UserProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

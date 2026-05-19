import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import { PointsProvider } from '@/lib/points-context'
import { AnnouncementProvider } from '@/lib/announcement-context'
import { UserProvider } from '@/lib/user-context'
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
      <body className={`${notoSansKR.variable} font-sans antialiased`} suppressHydrationWarning>
        {/* Kakao SDK — strategy="lazyOnload" 으로 페이지 로드 블로킹 없이 로드 */}
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          strategy="lazyOnload"
        />
        <LanguageProvider>
          <PointsProvider>
            <UserProvider>
              <AnnouncementProvider>
                {children}
                <Analytics />
              </AnnouncementProvider>
            </UserProvider>
          </PointsProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

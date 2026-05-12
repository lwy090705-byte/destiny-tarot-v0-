"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function PrivacyPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 pb-24">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-purple-100 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/user-profile" className="text-purple-600 hover:text-purple-800 transition">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-lg font-bold text-purple-800">{t('privacy.title')}</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* 안내 문구 */}
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <p className="text-sm text-purple-700">
            {t('privacy.intro')}
          </p>
        </div>

        {/* Section 1 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section1.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
            <p>{t('privacy.section1.content')}</p>
            <div className="whitespace-pre-line">{t('privacy.bodySection1Extra')}</div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section2.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
            <p>{t('privacy.section2.content')}</p>
            <div className="whitespace-pre-line">{t('privacy.bodySection2Extra')}</div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section3.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm whitespace-pre-line">
            {t('privacy.section3.body')}
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section4.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm whitespace-pre-line">
            {t('privacy.section4.body')}
          </div>
        </section>

        {/* Section 5 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section5.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm whitespace-pre-line">
            {t('privacy.section5.body')}
          </div>
        </section>

        {/* Section 6 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section6.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm whitespace-pre-line">
            {t('privacy.section6.body')}
          </div>
        </section>

        {/* Section 7 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section7.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm whitespace-pre-line">
            {t('privacy.section7.body')}
          </div>
        </section>

        {/* Section 8 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section8.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm whitespace-pre-line">
            {t('privacy.section8.body')}
          </div>
        </section>

        {/* Section 9 - 문의 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section9.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
            <p>{t('privacy.contactDesc')}</p>
            <p className="font-medium text-purple-700">{t('privacy.emailContact')}</p>
          </div>
        </section>
      </main>

    </div>
  )
}

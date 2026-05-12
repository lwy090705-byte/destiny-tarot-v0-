"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function TermsPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 pb-8">
      {/* 상단 헤더 */}
      <header className="sticky top-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-white hover:text-purple-200 transition">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold text-white">{t('terms.title')}</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* 헤더 카드 */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
          <h1 className="text-2xl font-bold mb-2">{t('terms.title')}</h1>
          <p className="text-purple-100 text-sm">{t('terms.lastUpdated')}</p>
        </div>

        {/* 목차 */}
        <div className="bg-white rounded-2xl p-5 mb-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('terms.toc')}</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#section1" className="text-purple-600 hover:text-purple-700">{t('terms.section1.title')}</a></li>
            <li><a href="#section2" className="text-purple-600 hover:text-purple-700">{t('terms.section2.title')}</a></li>
            <li><a href="#section3" className="text-purple-600 hover:text-purple-700">{t('terms.section3.title')}</a></li>
            <li><a href="#section4" className="text-purple-600 hover:text-purple-700">{t('terms.section4.title')}</a></li>
            <li><a href="#section5" className="text-purple-600 hover:text-purple-700">{t('terms.section5.title')}</a></li>
            <li><a href="#section6" className="text-purple-600 hover:text-purple-700">{t('terms.section6.title')}</a></li>
            <li><a href="#section7" className="text-purple-600 hover:text-purple-700">{t('terms.section7.title')}</a></li>
            <li><a href="#section8" className="text-purple-600 hover:text-purple-700">{t('terms.section8.title')}</a></li>
          </ul>
        </div>

        {/* 약관 내용 */}
        <div className="space-y-4">
          {/* Section 1 */}
          <section id="section1" className="bg-white rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t('terms.section1.title')}</h2>
            <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
              <p>{t('terms.section1.content1')}</p>
              <p>{t('terms.section1.content2')}</p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section2" className="bg-white rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t('terms.section2.title')}</h2>
            <div className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
              {t('terms.bodySection2')}
            </div>
          </section>

          {/* Section 3 */}
          <section id="section3" className="bg-white rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t('terms.section3.title')}</h2>
            <div className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
              {t('terms.bodySection3')}
            </div>
          </section>

          {/* Section 4 */}
          <section id="section4" className="bg-white rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t('terms.section4.title')}</h2>
            <div className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
              {t('terms.bodySection4')}
            </div>
          </section>

          {/* Section 5 */}
          <section id="section5" className="bg-white rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t('terms.section5.title')}</h2>
            <div className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
              {t('terms.bodySection5')}
            </div>
          </section>

          {/* Section 6 */}
          <section id="section6" className="bg-white rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t('terms.section6.title')}</h2>
            <div className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
              {t('terms.bodySection6')}
            </div>
          </section>

          {/* Section 7 - 파이 및 포인트 */}
          <section id="section7" className="bg-white rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t('terms.section7.title')}</h2>
            <div className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
              {t('terms.bodySection7')}
            </div>
          </section>

          {/* Section 8 - 광고 및 협력 정책 */}
          <section id="section8" className="bg-white rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t('terms.section8.title')}</h2>
            <div className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
              {t('terms.bodySection8')}
            </div>
          </section>
        </div>

        {/* 연락처 */}
        <div className="mt-6 p-4 bg-white rounded-2xl shadow-lg">
          <h3 className="text-base font-bold text-gray-800 mb-2">{t('terms.contact')}</h3>
          <p className="text-gray-600 text-sm">{t('terms.contactDesc')}</p>
        </div>
      </div>
    </div>
  )
}

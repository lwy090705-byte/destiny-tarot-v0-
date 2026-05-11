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
            <p>• 이메일, 닉네임</p>
            <p>• 서비스 이용 기록, 접속 로그</p>
            <p>• 기기 정보(모델명, OS 정보 등)</p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section2.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
            <p>{t('privacy.section2.content')}</p>
            <p>• 서비스 제공 및 운영</p>
            <p>• 사용자 식별 및 관리</p>
            <p>• 포인트 지급 및 보너스 기능 제공</p>
            <p>• 광고 및 콘텐츠 제공</p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section3.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
            <p>이용자의 개인정보는 회원 탈퇴 시까지 보관되며, 목적 달성 후 지체 없이 삭제됩니다.</p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section4.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
            <p>본 앱은 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.</p>
            <p>단, 광고 서비스 제공 및 앱 운영을 위해 필요한 경우 일부 정보가 외부 서비스에 제공될 수 있습니다.</p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section5.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
            <p>서비스 향상을 위해 일부 업무를 외부에 위탁할 수 있으며, 이 경우 관련 법령에 따라 안전하게 관리됩니다.</p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section6.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
            <p>이용자는 언제든지 자신의 개인정보를 조회, 수정, 삭제 요청할 수 있습니다.</p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section7.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
            <p>본 앱은 개인정보 보호를 위해 기술적, 관리적 보호 조치를 적용하고 있습니다.</p>
          </div>
        </section>

        {/* Section 8 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section8.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
            <p>본 개인정보처리방침은 변경될 수 있으며, 변경 시 앱 내 공지를 통해 안내합니다.</p>
          </div>
        </section>

        {/* Section 9 - 문의 */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-base font-bold text-gray-900 mb-3">{t('privacy.section9.title')}</h2>
          <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
            <p>{t('privacy.contactDesc')}</p>
            <p className="font-medium text-purple-700">이메일: lwy2016@naver.com</p>
          </div>
        </section>
      </main>

    </div>
  )
}

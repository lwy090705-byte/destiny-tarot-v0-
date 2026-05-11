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
            <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
              <p>• 본 서비스를 이용하는 모든 사용자는 이 약관에 동의합니다.</p>
              <p>• 14세 미만의 미성년자는 부모 또는 보호자의 동의 하에서만 본 서비스를 이용할 수 있습니다.</p>
              <p>• 사용자는 본 서비스를 적법한 목적으로만 이용해야 합니다.</p>
              <p>• 사용자는 다른 사용자의 권리를 침해하거나 불법적인 활동을 해서는 안 됩니다.</p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section3" className="bg-white rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t('terms.section3.title')}</h2>
            <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
              <p>• 사용자는 본 서비스 이용 시 발생하는 모든 책임을 자신이 짊어집니다.</p>
              <p>• 사용자는 본 서비스의 콘텐츠를 신뢰하여 내린 결정에 대한 책임이 있습니다.</p>
              <p>• 불법적인 목적으로 본 서비스를 이용하는 경우 법적 책임이 발생할 수 있습니다.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section4" className="bg-white rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t('terms.section4.title')}</h2>
            <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
              <p>• 본 서비스의 모든 콘텐츠(텍스트, 이미지, 아이콘 등)는 저작권법으로 보호됩니다.</p>
              <p>• 사용자는 개인적인 용도로만 콘텐츠를 사용할 수 있습니다.</p>
              <p>• 사용자는 서비스 운영자의 사전 동의 없이 콘텐츠를 복제, 배포, 수정할 수 없습니다.</p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section5" className="bg-white rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t('terms.section5.title')}</h2>
            <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
              <p>• 본 서비스는 "있는 그대로" 제공되며, 명시적 또는 묵시적 보증이 없습니다.</p>
              <p>• 서비스 운영자는 서비스 이용으로 인한 직접, 간접, 특수, 결과적 손해에 대해 책임지지 않습니다.</p>
              <p>• 서비스의 중단 또는 오류로 인한 손해에 대해 책임지지 않습니다.</p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="section6" className="bg-white rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t('terms.section6.title')}</h2>
            <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
              <p>• 서비스 운영자는 사전 공지 없이 본 약관을 변경할 수 있습니다.</p>
              <p>• 변경된 약관은 웹사이트에 게시되며, 게시일로부터 효력이 발생합니다.</p>
              <p>• 사용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수 있습니다.</p>
            </div>
          </section>

          {/* Section 7 - 파이 및 포인트 */}
          <section id="section7" className="bg-white rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t('terms.section7.title')}</h2>
            <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
              <p className="font-semibold text-purple-700">앱 내 재화 안내</p>
              <p>• 본 서비스는 <strong>파이(Pi)</strong>와 <strong>포인트(P)</strong> 두 가지 재화로만 운영됩니다.</p>
              <p>• 파이(Pi)는 실제 결제를 통해 충전할 수 있는 프리미엄 재화입니다.</p>
              <p>• 포인트(P)는 출석, 이벤트, 룰렛 등을 통해 무료로 적립되는 재화입니다.</p>
              <p>• 그 외 다른 형태의 재화나 암호화폐는 본 서비스에서 사용되지 않습니다.</p>

              <p className="font-semibold text-purple-700 mt-3">포인트 적립 방법</p>
              <p>• 매일 출석 체크: 20P</p>
              <p>• 광고 시청: 10P</p>
              <p>• 친구 추천: 30P</p>
              <p>• 보너스 룰렛 (1일 1회): 10P ~ 20P</p>

              <p className="font-semibold text-purple-700 mt-3">파이/포인트 사용처</p>
              <p>• 프리미엄 운세 분석 (상세 해석 포함)</p>
              <p>• 특별 타로 리딩 (프리미엄 카드 덱)</p>
              <p>• 심화 궁합 분석</p>

              <p className="font-semibold text-purple-700 mt-3">유효기간 및 소멸</p>
              <p>• 포인트의 유효기간은 적립일로부터 1년입니다.</p>
              <p>• 파이의 유효기간은 충전일로부터 5년입니다.</p>
              <p>• 회원 탈퇴 시 보유 재화는 즉시 소멸되며 복구되지 않습니다.</p>
              <p>• 부정한 방법으로 획득한 재화는 회수될 수 있습니다.</p>
            </div>
          </section>

          {/* Section 8 - 광고 및 협력 정책 */}
          <section id="section8" className="bg-white rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t('terms.section8.title')}</h2>
            <div className="text-gray-700 space-y-2 leading-relaxed text-sm">
              <p className="font-semibold text-purple-700">광고 게재 원칙</p>
              <p>• 본 서비스는 사용자 경험을 해치지 않는 범위 내에서 광고를 게재합니다.</p>
              <p>• 모든 광고는 관련 법령을 준수하며, 허위 또는 과장 광고를 게재하지 않습니다.</p>

              <p className="font-semibold text-red-600 mt-3">금지되는 광고 및 협력 콘텐츠</p>
              <p>• <strong>불법 도박</strong>: 온라인 카지노, 불법 스포츠 베팅, 사행성 게임 등</p>
              <p>• <strong>불법 금융</strong>: 불법 대출, 유사수신행위, 다단계 사기 등</p>
              <p>• <strong>성인/음란물</strong>: 성인 콘텐츠, 음란물 사이트 등</p>
              <p>• <strong>불법 의약품</strong>: 무허가 의약품, 마약류 등</p>
              <p>• <strong>허위/사기</strong>: 허위 투자 정보, 피싱 사이트 등</p>
              <p>• <strong>혐오/차별</strong>: 특정 집단에 대한 혐오 또는 차별 조장 콘텐츠</p>

              <p className="font-semibold text-purple-700 mt-3">협력 문의</p>
              <p>• 건전한 광고 및 협력 제안은 lwy2016@naver.com으로 문의해 주세요.</p>
              <p>• 위 금지 항목에 해당하는 제안은 검토 없이 거절됩니다.</p>
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

"use client"

import { useLanguage } from "@/lib/language-context"

export default function CopyrightPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* 헤더 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('copyright.title')}</h1>
          <p className="text-gray-600">{t('copyright.lastUpdated')}</p>
        </div>

        {/* 목차 */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('copyright.toc')}</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#section1" className="text-purple-600 hover:text-purple-700">{t('copyright.section1.title')}</a></li>
            <li><a href="#section2" className="text-purple-600 hover:text-purple-700">{t('copyright.section2.title')}</a></li>
            <li><a href="#section3" className="text-purple-600 hover:text-purple-700">{t('copyright.section3.title')}</a></li>
            <li><a href="#section4" className="text-purple-600 hover:text-purple-700">{t('copyright.section4.title')}</a></li>
            <li><a href="#section5" className="text-purple-600 hover:text-purple-700">{t('copyright.section5.title')}</a></li>
            <li><a href="#section6" className="text-purple-600 hover:text-purple-700">{t('copyright.section6.title')}</a></li>
          </ul>
        </div>

        {/* 저작권 내용 */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section id="section1" className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('copyright.section1.title')}</h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>본 웹사이트 및 서비스의 모든 콘텐츠(텍스트, 이미지, 그래픽, 로고, 아이콘, 비디오, 음성, 소프트웨어 등)는 저작권법 및 국제 조약에 의해 보호됩니다.</p>
              <p>© 2026 Fortune & Tarot Services. All rights reserved.</p>
              <p>본 웹사이트의 콘텐츠는 명시적인 허락 없이는 복제, 배포, 전송, 표시, 또는 사용될 수 없습니다.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section2" className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('copyright.section2.title')}</h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>저희는 사용자에게 제한적이고 비독점적인 라이선스를 부여합니다:</p>
              <p>• 개인적, 비상업적 용도로 본 서비스를 이용할 수 있습니다.</p>
              <p>• 한 개의 기기에서 본 서비스에 접속할 수 있습니다.</p>
              <p>• 본인의 프로필과 개인 정보만 열람할 수 있습니다.</p>
              <p>• 라이선스는 언제든지 취소될 수 있습니다.</p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section3" className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('copyright.section3.title')}</h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>사용자는 다음을 할 수 없습니다:</p>
              <p>• 콘텐츠를 복제, 수정, 배포 또는 판매</p>
              <p>• 서비스를 상업적 목적으로 사용</p>
              <p>• 서비스의 기술적 구조를 역 엔지니어링 또는 해킹</p>
              <p>• 자동화된 도구나 봇을 사용하여 서비스에 접속</p>
              <p>• 저작권 또는 지적재산권 표시 제거</p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section4" className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('copyright.section4.title')}</h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>본 서비스는 다음의 오픈소스 라이브러리를 사용합니다:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Next.js - MIT License</li>
                <li>React - MIT License</li>
                <li>Tailwind CSS - MIT License</li>
                <li>Radix UI - MIT License</li>
              </ul>
              <p className="mt-4">각 라이브러리의 라이선스는 프로젝트 저장소에서 확인할 수 있습니다.</p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section5" className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('copyright.section5.title')}</h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>저작권이 침해되었다고 생각되시면 다음 정보와 함께 신고하시기 바랍니다:</p>
              <p>• 저작권이 침해된 콘텐츠의 설명</p>
              <p>• 저작권 소유자의 이름 및 연락처</p>
              <p>• 침해 콘텐츠의 위치(URL)</p>
              <p>• 저작권 소유자임을 확인하는 진술</p>
              <p className="mt-4">신고는 copyright@example.com으로 보내주시기 바랍니다.</p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="section6" className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('copyright.section6.title')}</h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>• 우리는 제3자의 콘텐츠에 대한 저작권 침해에 책임지지 않습니다.</p>
              <p>• 사용자가 업로드한 콘텐츠의 저작권은 사용자의 책임입니다.</p>
              <p>• 저작권 침해 신고에 대해 즉시 조치하지 않을 수 있습니다.</p>
            </div>
          </section>
        </div>

        {/* 연락처 */}
        <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{t('copyright.contact')}</h3>
          <p className="text-gray-700">{t('copyright.contactDesc')}</p>
        </div>
      </div>
    </div>
  )
}

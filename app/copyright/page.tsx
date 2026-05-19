"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

function CopyrightSectionBody({ body }: { body: string }) {
  const paragraphs = body.split("\n\n").filter((p) => p.trim().length > 0)
  return (
    <div className="text-gray-700 space-y-3 leading-relaxed text-sm">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

export default function CopyrightPage() {
  const { t } = useLanguage()

  const sections = [
    { id: "section1", titleKey: "copyright.section1.title", bodyKey: "copyright.section1.body" },
    { id: "section2", titleKey: "copyright.section2.title", bodyKey: "copyright.section2.body" },
    { id: "section3", titleKey: "copyright.section3.title", bodyKey: "copyright.section3.body" },
    { id: "section4", titleKey: "copyright.section4.title", bodyKey: "copyright.section4.body" },
    { id: "section5", titleKey: "copyright.section5.title", bodyKey: "copyright.section5.body" },
    { id: "section6", titleKey: "copyright.section6.title", bodyKey: "copyright.section6.body" },
  ] as const

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 pb-8">
      <header className="sticky top-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-white hover:text-purple-200 transition">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold text-white">{t("copyright.title")}</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
          <h1 className="text-2xl font-bold mb-2">{t("copyright.title")}</h1>
          <p className="text-purple-100 text-sm">{t("copyright.lastUpdated")}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 mb-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t("copyright.toc")}</h2>
          <ul className="space-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-purple-600 hover:text-purple-700">
                  {t(s.titleKey)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="bg-white rounded-2xl p-4 shadow-lg">
              <h2 className="text-lg font-bold text-gray-900 mb-3">{t(s.titleKey)}</h2>
              <CopyrightSectionBody body={t(s.bodyKey)} />
            </section>
          ))}
        </div>

        <div className="mt-6 p-4 bg-white rounded-2xl shadow-lg">
          <h3 className="text-base font-bold text-gray-800 mb-2">{t("copyright.contact")}</h3>
          <p className="text-gray-600 text-sm">{t("copyright.contactDesc")}</p>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Building2, Mail, Phone, User, MessageSquare, Send, CheckCircle, UserCircle2 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function PartnerPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const businessTypes = [
    { key: 'partner.type.adMarketing', value: '광고/마케팅' },
    { key: 'partner.type.appDev', value: '앱 개발/기술 협력' },
    { key: 'partner.type.content', value: '콘텐츠 제휴' },
    { key: 'partner.type.investment', value: '투자 문의' },
    { key: 'partner.type.piNetwork', value: 'Pi Network 관련' },
    { key: 'partner.type.other', value: '기타' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert(t('partner.errorSubmit'))
      }
    } catch {
      alert(t('partner.errorNetwork'))
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('partner.successTitle')}</h2>
          <p className="text-gray-600 mb-6">
            {t('partner.successMessage')}
            <br />{t('partner.thanks')}
          </p>
          <Link href="/">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              {t('partner.backHome')}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 pb-24">
      <header className="sticky top-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-white hover:text-purple-200 transition">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold text-white">{t('partner.title')}</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
          <h2 className="text-xl font-bold mb-2">{t('partner.headerTitle')}</h2>
          <p className="text-amber-100 text-sm leading-relaxed">
            {t('partner.headerDesc')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg space-y-5">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-3">{t('partner.formTitle')}</h3>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Building2 className="h-4 w-4" />
              {t('partner.companyName')}
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder={t('partner.companyPlaceholder')}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4" />
              {t('partner.contactName')}
            </label>
            <input
              type="text"
              required
              value={formData.contactName}
              onChange={(e) => setFormData({...formData, contactName: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder={t('partner.contactPlaceholder')}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4" />
              {t('partner.email')}
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="example@company.com"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Phone className="h-4 w-4" />
              {t('partner.phone')}
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder={t('partner.phonePlaceholder')}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <UserCircle2 className="h-4 w-4" />
              {t('partner.businessType')}
            </label>
            <select
              required
              value={formData.businessType}
              onChange={(e) => setFormData({...formData, businessType: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition bg-white"
            >
              <option value="">{t('partner.businessTypePlaceholder')}</option>
              {businessTypes.map((type) => (
                <option key={type.key} value={type.value}>{t(type.key)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="h-4 w-4" />
              {t('partner.message')}
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
              placeholder={t('partner.messagePlaceholder')}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 rounded-xl text-lg font-semibold shadow-lg disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t('partner.submitting')}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                {t('partner.submit')}
              </span>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            {t('partner.disclaimer')}
          </p>
        </form>
      </main>
    </div>
  )
}

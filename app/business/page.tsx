"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Building2, Mail, Phone, User, MessageSquare, Send, CheckCircle, UserCircle2 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function BusinessPage() {
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

  const businessTypes = useMemo(
    () => [
      { value: 'ad', label: t('business.type.ad') },
      { value: 'dev', label: t('business.type.dev') },
      { value: 'content', label: t('business.type.content') },
      { value: 'invest', label: t('business.type.invest') },
      { value: 'pi', label: t('business.type.pi') },
      { value: 'other', label: t('business.type.other') },
    ],
    [t]
  )

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
        alert(t('business.errorSubmit'))
      }
    } catch {
      alert(t('business.errorNetwork'))
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('business.submittedTitle')}</h2>
          <p className="text-gray-600 mb-6 whitespace-pre-line">{t('business.submittedDesc')}</p>
          <Link href="/">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              {t('business.home')}
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
          <h1 className="text-xl font-bold text-white">{t('business.title')}</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
          <h2 className="text-xl font-bold mb-2">{t('business.heroTitle')}</h2>
          <p className="text-amber-100 text-sm leading-relaxed">{t('business.heroDesc')}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg space-y-5">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-3">{t('business.formTitle')}</h3>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Building2 className="h-4 w-4" />
              {t('business.companyName')}
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder={t('business.placeholder.company')}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4" />
              {t('business.contactName')}
            </label>
            <input
              type="text"
              required
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder={t('business.placeholder.contact')}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4" />
              {t('business.email')}
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="example@company.com"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Phone className="h-4 w-4" />
              {t('business.phone')}
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="010-0000-0000"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <UserCircle2 className="h-4 w-4" />
              {t('business.type')}
            </label>
            <select
              required
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition bg-white"
            >
              <option value="">{t('business.selectType')}</option>
              {businessTypes.map((type) => (
                <option key={type.value} value={type.label}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="h-4 w-4" />
              {t('business.message')}
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
              placeholder={t('business.placeholder.message')}
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
                {t('business.submitting')}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                {t('business.submit')}
              </span>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">{t('business.privacyNote')}</p>
        </form>
      </main>
    </div>
  )
}

"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, Link2, Clock, CheckCircle, X, AlertCircle, Hourglass, BadgeCheck, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const DURATION_OPTIONS = [
  { label: "7일", days: 7, price: "10 파이" },
  { label: "1개월", days: 30, price: "30 파이" },
]

// 광고 승인 상태 타입
type ApprovalStatus = "pending" | "approved" | "rejected"

type Step = "form" | "awaiting" | "payment" | "done"

interface AdDraft {
  title: string
  linkUrl: string
  imagePreview: string | null
  duration: { label: string; days: number; price: string }
  status: ApprovalStatus
  rejectionReason?: string
}

export default function AdRegisterPage() {
  const [step, setStep] = useState<Step>("form")
  const [title, setTitle] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedDuration, setSelectedDuration] = useState(DURATION_OPTIONS[0])
  const [error, setError] = useState("")
  const [draft, setDraft] = useState<AdDraft | null>(null)

  // 수정 재제출용
  const [resubmitNote, setResubmitNote] = useState("")
  const [resubmitted, setResubmitted] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setImagePreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  // 신청하기 — 결제 없이 승인 대기 상태로 전환
  const handleSubmitForm = () => {
    if (!title.trim()) {
      setError("광고 제목을 입력해 주세요.")
      return
    }
    setError("")

    const newDraft: AdDraft = {
      title: title.trim(),
      linkUrl: linkUrl.trim(),
      imagePreview,
      duration: selectedDuration,
      status: "pending",
    }
    setDraft(newDraft)

    // localStorage에 대기 상태로 저장
    const stored = localStorage.getItem("adDraftList")
    const list = stored ? JSON.parse(stored) : []
    const entry = {
      id: `draft_${Date.now()}`,
      ...newDraft,
      submittedAt: new Date().toISOString(),
    }
    list.push(entry)
    localStorage.setItem("adDraftList", JSON.stringify(list))

    setStep("awaiting")
  }

  // 결제하기 (개발자 승인 후)
  const handlePayment = () => {
    if (!draft) return
    const now = new Date()
    const expiresAt = new Date(now.getTime() + draft.duration.days * 24 * 60 * 60 * 1000)
    const newAd = {
      id: `ad_${Date.now()}`,
      title: draft.title,
      imageUrl: draft.imagePreview || "",
      linkUrl: draft.linkUrl,
      expiresAt: expiresAt.toISOString(),
      active: true,
    }
    const stored = localStorage.getItem("adSponsorList")
    const list = stored ? JSON.parse(stored) : []
    list.push(newAd)
    localStorage.setItem("adSponsorList", JSON.stringify(list))
    setStep("done")
  }

  // 수정 재제출
  const handleResubmit = () => {
    if (!resubmitNote.trim()) return
    setResubmitted(true)
    // 상태를 다시 pending으로 업데이트
    if (draft) {
      setDraft({ ...draft, status: "pending", rejectionReason: undefined })
    }
  }

  // --- 개발자 시뮬레이션 버튼 (개발/테스트용) ---
  const simulateApprove = () => {
    if (draft) setDraft({ ...draft, status: "approved" })
  }
  const simulateReject = () => {
    if (draft) setDraft({
      ...draft,
      status: "rejected",
      rejectionReason: "광고 내용이 서비스 정책에 부합하지 않습니다. 제목 또는 이미지를 수정하여 재제출해 주세요."
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 pb-10">
      <header className="sticky top-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/ad-sponsor" className="text-white hover:text-purple-200 transition">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold text-white">광고 등록하기</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">

        {/* 단계 표시 */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {(["form", "awaiting", "payment", "done"] as Step[]).map((s, i) => {
            const labels = ["정보입력", "승인대기", "결제", "완료"]
            const currentIdx = ["form", "awaiting", "payment", "done"].indexOf(step)
            return (
              <div key={s} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-0.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                    step === s ? 'bg-sky-500 text-white' :
                    currentIdx > i ? 'bg-sky-300 text-white' :
                    'bg-white/20 text-white/50'
                  }`}>
                    {i + 1}
                  </div>
                  <span className="text-[9px] text-white/60">{labels[i]}</span>
                </div>
                {i < 3 && <div className="w-6 h-0.5 bg-white/20 mb-3" />}
              </div>
            )
          })}
        </div>

        {/* STEP 1: 광고 정보 입력 */}
        {step === "form" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-lg space-y-4">
              <h2 className="font-bold text-gray-800 text-base">광고 정보 입력</h2>

              {/* 이미지 업로드 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">광고 이미지 (배너)</label>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-36 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-sky-400 hover:bg-sky-50 transition overflow-hidden"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="text-sm text-gray-500">클릭하여 이미지 업로드</span>
                      <span className="text-xs text-gray-400">JPG, PNG, GIF 권장</span>
                    </>
                  )}
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                {imagePreview && (
                  <button onClick={() => setImagePreview(null)} className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <X className="h-3 w-3" /> 이미지 제거
                  </button>
                )}
              </div>

              {/* 제목 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  광고 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="광고 제목을 입력하세요"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white text-gray-800"
                />
              </div>

              {/* 링크 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">광고 링크 (URL)</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 bg-white">
                  <Link2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={e => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1 py-2.5 text-sm focus:outline-none bg-transparent text-gray-800"
                  />
                </div>
              </div>

              {/* 노출 기간 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />노출 기간
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {DURATION_OPTIONS.map(opt => (
                    <button
                      key={opt.label}
                      onClick={() => setSelectedDuration(opt)}
                      className={`border-2 rounded-xl p-3 text-center transition ${
                        selectedDuration.label === opt.label
                          ? 'border-sky-500 bg-sky-50'
                          : 'border-gray-200 hover:border-sky-300'
                      }`}
                    >
                      <p className="font-bold text-gray-800">{opt.label}</p>
                      <p className="text-sm text-sky-600 font-medium">{opt.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <Button
              onClick={handleSubmitForm}
              className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl"
            >
              다음 - 신청하기
            </Button>
          </div>
        )}

        {/* STEP 2: 승인 대기 */}
        {step === "awaiting" && (
          <div className="space-y-4">
            {/* 승인 대기 중 */}
            {(!draft || draft.status === "pending") && !resubmitted && (
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center space-y-4">
                <Hourglass className="h-14 w-14 text-amber-500 mx-auto animate-pulse" />
                <h2 className="text-lg font-bold text-gray-900">개발자 승인 대기 중</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  광고 신청이 완료되었습니다.<br />
                  검토 후 승인까지 <strong>1~2일</strong>이 소요될 수 있습니다.<br />
                  승인 완료 시 결제를 진행하실 수 있습니다.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-left space-y-1 text-sm">
                  <p className="text-amber-800 font-medium">신청 정보</p>
                  <p className="text-gray-600">제목: <span className="font-medium text-gray-800">{draft?.title}</span></p>
                  <p className="text-gray-600">기간: <span className="font-medium text-gray-800">{draft?.duration.label}</span></p>
                </div>

                {/* 개발/테스트 시뮬레이션 버튼 */}
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <p className="text-xs text-gray-400">[테스트] 개발자 승인 시뮬레이션</p>
                  <div className="flex gap-2">
                    <button onClick={simulateApprove} className="flex-1 text-xs bg-green-100 text-green-700 rounded-lg py-2 hover:bg-green-200 transition">
                      승인 처리
                    </button>
                    <button onClick={simulateReject} className="flex-1 text-xs bg-red-100 text-red-700 rounded-lg py-2 hover:bg-red-200 transition">
                      거절 처리
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 재제출 완료 */}
            {resubmitted && (
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center space-y-4">
                <Hourglass className="h-14 w-14 text-amber-500 mx-auto animate-pulse" />
                <h2 className="text-lg font-bold text-gray-900">수정 내용 재제출 완료</h2>
                <p className="text-gray-500 text-sm">수정된 내용으로 다시 검토 중입니다. 1~2일 내에 결과를 확인해 주세요.</p>
              </div>
            )}

            {/* 승인 완료 */}
            {draft?.status === "approved" && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg text-center space-y-4">
                  <BadgeCheck className="h-14 w-14 text-green-500 mx-auto" />
                  <h2 className="text-lg font-bold text-gray-900">승인 완료!</h2>
                  <p className="text-gray-500 text-sm">광고가 승인되었습니다. 아래 버튼을 눌러 결제를 진행해 주세요.</p>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm text-left">
                    <div className="flex justify-between">
                      <span className="text-gray-500">노출 기간</span>
                      <span className="font-medium">{draft.duration.label}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                      <span className="font-bold text-gray-800">결제 금액</span>
                      <span className="font-bold text-sky-600">{draft.duration.price}</span>
                    </div>
                  </div>
                  <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-xs text-sky-700">
                    현재 무료 제공 기간으로 파이 결제 없이 등록이 가능합니다.
                  </div>
                </div>
                <Button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl"
                >
                  결제하기
                </Button>
              </div>
            )}

            {/* 거절 */}
            {draft?.status === "rejected" && !resubmitted && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
                  <div className="flex items-center gap-3">
                    <XCircle className="h-10 w-10 text-red-500 flex-shrink-0" />
                    <div>
                      <h2 className="text-base font-bold text-gray-900">승인 거절</h2>
                      <p className="text-xs text-gray-500">아래 사유를 확인하고 수정 후 재제출해 주세요.</p>
                    </div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-sm font-medium text-red-700 mb-1">거절 사유</p>
                    <p className="text-sm text-red-600">{draft.rejectionReason}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">수정 내용 입력 <span className="text-red-500">*</span></label>
                    <textarea
                      value={resubmitNote}
                      onChange={e => setResubmitNote(e.target.value)}
                      rows={4}
                      placeholder="수정 사항을 입력하고 다시 제출해 주세요."
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white text-gray-800 resize-none"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleResubmit}
                  disabled={!resubmitNote.trim()}
                  className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl disabled:opacity-50"
                >
                  수정 내용 재제출
                </Button>
                <Button
                  onClick={() => setStep("form")}
                  variant="outline"
                  className="w-full border-white/30 text-white bg-white/10 hover:bg-white/20"
                >
                  처음부터 다시 작성
                </Button>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: 완료 */}
        {step === "done" && (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-xl font-bold text-gray-900">광고 등록 완료!</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              광고가 정상적으로 등록되었습니다.<br />
              선택한 기간({draft?.duration.label}) 동안 광고가 노출됩니다.<br />
              기간 종료 후 자동으로 비활성화됩니다.
            </p>
            <Link href="/ad-sponsor">
              <Button className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold mt-2">
                광고 목록으로 돌아가기
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

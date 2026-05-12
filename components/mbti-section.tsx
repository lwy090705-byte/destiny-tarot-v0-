"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import {
  mbtiCareerLeadership,
  mbtiCareerWorkStyle,
  mbtiCompatResultParagraph,
  mbtiCompatTabScoreLabel,
  mbtiCompatTier,
  mbtiCompatUnlockedDetail,
  mbtiLoveExpressStyle,
  mbtiPersonalityCommStyle,
  mbtiResultCompatScoreLine,
} from "@/components/mbti/mbti-inline-labels"
import { usePoints } from "@/lib/points-context"
import { PointsInsufficientModal } from "./points-insufficient-modal"
import { Brain, Heart, Briefcase, Users, Lock, Sparkles, ChevronRight, Check } from "lucide-react"

type MBTIType = 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP' | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP' | 
                'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ' | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP'

interface Question {
  id: number
  text: string
  optionA: string
  optionB: string
  dimension: 'EI' | 'SN' | 'TF' | 'JP'
}

const questions: Question[] = [
  { id: 1, text: "파티에서 당신은?", optionA: "여러 사람과 대화하며 에너지를 얻는다", optionB: "소수의 친한 사람과 깊은 대화를 선호한다", dimension: 'EI' },
  { id: 2, text: "새로운 프로젝트를 시작할 때?", optionA: "구체적인 계획과 일정을 먼저 세운다", optionB: "큰 그림을 그리고 세부사항은 나중에 정한다", dimension: 'SN' },
  { id: 3, text: "친구가 고민을 말할 때?", optionA: "해결책을 제시하려고 한다", optionB: "공감하고 감정을 이해하려 한다", dimension: 'TF' },
  { id: 4, text: "여행 계획은?", optionA: "미리 일정을 세우고 예약한다", optionB: "즉흥적으로 결정하는 것을 좋아한다", dimension: 'JP' },
  { id: 5, text: "주말에 충전하는 방법?", optionA: "친구들과 만나 활동적으로 보낸다", optionB: "집에서 혼자 취미 활동을 한다", dimension: 'EI' },
  { id: 6, text: "정보를 받아들일 때?", optionA: "사실과 세부 정보에 집중한다", optionB: "패턴과 가능성을 먼저 본다", dimension: 'SN' },
  { id: 7, text: "결정을 내릴 때?", optionA: "논리와 객관적 기준을 중시한다", optionB: "사람들의 감정과 가치를 중시한다", dimension: 'TF' },
  { id: 8, text: "업무 스타일은?", optionA: "마감일 전에 미리 완료한다", optionB: "마감일에 임박해서 집중력이 높아진다", dimension: 'JP' },
  { id: 9, text: "모임에서 당신은?", optionA: "먼저 말을 걸고 대화를 시작한다", optionB: "누군가 말을 걸어주길 기다린다", dimension: 'EI' },
  { id: 10, text: "책이나 영화를 볼 때?", optionA: "현실적이고 실용적인 내용을 선호한다", optionB: "상상력을 자극하는 판타지를 좋아한다", dimension: 'SN' },
  { id: 11, text: "갈등 상황에서?", optionA: "공정하고 원칙에 따라 해결한다", optionB: "조화와 관계 유지를 우선시한다", dimension: 'TF' },
  { id: 12, text: "일상생활에서?", optionA: "규칙적인 루틴을 선호한다", optionB: "유연하게 상황에 맞춰 변한다", dimension: 'JP' },
]

const mbtiData: Record<MBTIType, {
  title: string
  emoji: string
  color: string
  description: string
  strengths: string[]
  weaknesses: string[]
  loveStyle: string
  career: string[]
  bestMatch: MBTIType[]
  goodMatch: MBTIType[]
}> = {
  INTJ: {
    title: "전략가",
    emoji: "🧠",
    color: "from-indigo-500 to-purple-600",
    description: "독립적이고 분석적인 전략가. 높은 기준을 가지고 있으며, 효율성과 논리를 중시합니다. 장기적인 비전을 세우고 목표를 향해 꾸준히 나아갑니다.",
    strengths: ["전략적 사고", "독립성", "결단력", "높은 기준", "지식 탐구"],
    weaknesses: ["완벽주의", "감정 표현 어려움", "지나친 비판", "융통성 부족"],
    loveStyle: "깊고 의미 있는 관계를 추구하며, 지적인 대화를 즐깁니다. 파트너에게 충실하지만 감정 표현이 서툴 수 있어요.",
    career: ["과학자", "전략 컨설턴트", "투자 분석가", "소프트웨어 개발자", "교수"],
    bestMatch: ["ENFP", "ENTP"],
    goodMatch: ["INFJ", "INTJ", "ENTJ"]
  },
  INTP: {
    title: "논리술사",
    emoji: "🔬",
    color: "from-cyan-500 to-blue-600",
    description: "혁신적인 아이디어를 가진 사색가. 논리와 분석을 사랑하며, 복잡한 문제를 해결하는 것을 즐깁니다.",
    strengths: ["분석력", "창의성", "객관성", "호기심", "문제 해결력"],
    weaknesses: ["우유부단", "사회성 부족", "감정 무시", "실행력 부족"],
    loveStyle: "지적인 연결을 중요시하며, 자유로운 관계를 원합니다. 깊은 토론을 즐기는 파트너를 좋아해요.",
    career: ["연구원", "프로그래머", "철학자", "수학자", "게임 개발자"],
    bestMatch: ["ENTJ", "ESTJ"],
    goodMatch: ["INTP", "ENTP", "INFP"]
  },
  ENTJ: {
    title: "통솔자",
    emoji: "👔",
    color: "from-rose-500 to-red-600",
    description: "타고난 리더십을 가진 지휘관. 효율성을 추구하고, 목표 달성을 위해 조직을 이끌어 나갑니다.",
    strengths: ["리더십", "자신감", "결단력", "효율성", "전략적 사고"],
    weaknesses: ["지배적", "참을성 부족", "감정 무시", "완고함"],
    loveStyle: "관계에서도 성장을 추구하며, 야망 있는 파트너를 좋아합니다. 솔직하고 직접적인 소통을 선호해요.",
    career: ["CEO", "변호사", "경영 컨설턴트", "정치인", "기업가"],
    bestMatch: ["INTP", "ISTP"],
    goodMatch: ["ENTJ", "INTJ", "ENFJ"]
  },
  ENTP: {
    title: "변론가",
    emoji: "💡",
    color: "from-amber-500 to-orange-600",
    description: "창의적이고 도전적인 혁신가. 토론을 즐기고, 새로운 아이디어를 탐구하는 것을 좋아합니다.",
    strengths: ["창의성", "적응력", "열정", "유머감각", "문제 해결"],
    weaknesses: ["논쟁적", "규칙 무시", "집중력 부족", "감정 무시"],
    loveStyle: "지적이고 재미있는 관계를 원합니다. 토론과 새로운 경험을 함께 즐길 파트너를 찾아요.",
    career: ["기업가", "발명가", "변호사", "마케터", "영화 제작자"],
    bestMatch: ["INFJ", "INTJ"],
    goodMatch: ["ENTP", "ENFP", "INTP"]
  },
  INFJ: {
    title: "옹호자",
    emoji: "🌟",
    color: "from-emerald-500 to-teal-600",
    description: "깊은 통찰력을 가진 이상주의자. 타인을 돕고 세상을 더 나은 곳으로 만들고자 합니다.",
    strengths: ["통찰력", "이상주의", "결단력", "열정", "이타심"],
    weaknesses: ["완벽주의", "번아웃", "비밀스러움", "비판에 민감"],
    loveStyle: "깊고 의미 있는 연결을 추구합니다. 영혼의 동반자를 찾으며, 진정성 있는 관계를 원해요.",
    career: ["상담사", "작가", "심리학자", "교사", "사회운동가"],
    bestMatch: ["ENFP", "ENTP"],
    goodMatch: ["INFJ", "INFP", "INTJ"]
  },
  INFP: {
    title: "중재자",
    emoji: "🦋",
    color: "from-violet-500 to-purple-600",
    description: "이상적인 세계를 꿈꾸는 몽상가. 깊은 감성과 창의성을 가지고 있으며, 진정성을 중시합니다.",
    strengths: ["공감능력", "창의성", "이상주의", "열정", "적응력"],
    weaknesses: ["비현실적", "자기비판", "회피적", "지나친 감수성"],
    loveStyle: "로맨틱하고 이상적인 사랑을 꿈꿉니다. 깊은 감정적 연결과 이해를 원해요.",
    career: ["작가", "예술가", "상담사", "음악가", "사회복지사"],
    bestMatch: ["ENFJ", "ENTJ"],
    goodMatch: ["INFP", "INFJ", "INTP"]
  },
  ENFJ: {
    title: "선도자",
    emoji: "🌈",
    color: "from-pink-500 to-rose-600",
    description: "카리스마 있는 리더. 타인의 성장을 돕고, 긍정적인 영향력을 발휘합니다.",
    strengths: ["카리스마", "이타심", "신뢰성", "열정", "소통능력"],
    weaknesses: ["과도한 이상주의", "자기희생", "비판에 민감", "우유부단"],
    loveStyle: "헌신적이고 따뜻한 파트너입니다. 상대방의 성장을 돕고 지지하는 것을 좋아해요.",
    career: ["교사", "상담사", "HR 매니저", "정치인", "이벤트 플래너"],
    bestMatch: ["INFP", "ISFP"],
    goodMatch: ["ENFJ", "INFJ", "ENTJ"]
  },
  ENFP: {
    title: "활동가",
    emoji: "🎭",
    color: "from-yellow-400 to-amber-500",
    description: "열정적이고 창의적인 자유로운 영혼. 새로운 가능성을 탐구하고, 사람들에게 영감을 줍니다.",
    strengths: ["열정", "창의성", "사교성", "긍정성", "적응력"],
    weaknesses: ["집중력 부족", "과도한 감정", "비현실적", "지나친 낙관"],
    loveStyle: "열정적이고 낭만적인 연애를 즐깁니다. 새로운 경험과 깊은 감정적 연결을 원해요.",
    career: ["배우", "저널리스트", "마케터", "상담사", "기업가"],
    bestMatch: ["INTJ", "INFJ"],
    goodMatch: ["ENFP", "ENTP", "INFP"]
  },
  ISTJ: {
    title: "현실주의자",
    emoji: "📋",
    color: "from-slate-500 to-gray-600",
    description: "신뢰할 수 있는 책임감의 대명사. 규칙을 중시하고, 맡은 일을 끝까지 해냅니다.",
    strengths: ["책임감", "성실함", "체계적", "신뢰성", "인내심"],
    weaknesses: ["고집", "변화 거부", "감정 표현 부족", "지나친 엄격함"],
    loveStyle: "안정적이고 헌신적인 관계를 추구합니다. 믿음직하고 책임감 있는 파트너예요.",
    career: ["회계사", "공무원", "군인", "은행원", "법률가"],
    bestMatch: ["ESFP", "ESTP"],
    goodMatch: ["ISTJ", "ISFJ", "ESTJ"]
  },
  ISFJ: {
    title: "수호자",
    emoji: "🛡️",
    color: "from-sky-500 to-blue-600",
    description: "따뜻하고 헌신적인 보호자. 타인을 돌보는 것을 좋아하며, 조용히 도움을 줍니다.",
    strengths: ["헌신적", "세심함", "신뢰성", "인내심", "관찰력"],
    weaknesses: ["자기희생", "변화 거부", "갈등 회피", "지나친 수줍음"],
    loveStyle: "헌신적이고 따뜻한 사랑을 합니다. 파트너를 세심하게 챙기고 지지해요.",
    career: ["간호사", "교사", "사회복지사", "사서", "행정가"],
    bestMatch: ["ESTP", "ESFP"],
    goodMatch: ["ISFJ", "ISTJ", "ESFJ"]
  },
  ESTJ: {
    title: "경영자",
    emoji: "📊",
    color: "from-blue-600 to-indigo-700",
    description: "효율적인 관리자. 질서와 규칙을 중시하며, 조직을 체계적으로 이끕니다.",
    strengths: ["조직력", "리더십", "성실함", "결단력", "책임감"],
    weaknesses: ["융통성 부족", "고집", "감정 무시", "지배적"],
    loveStyle: "안정적이고 전통적인 관계를 원합니다. 책임감 있고 믿음직한 파트너예요.",
    career: ["관리자", "경찰관", "판사", "재무 담당자", "군 장교"],
    bestMatch: ["INTP", "ISTP"],
    goodMatch: ["ESTJ", "ISTJ", "ENTJ"]
  },
  ESFJ: {
    title: "집정관",
    emoji: "🤝",
    color: "from-green-500 to-emerald-600",
    description: "사교적이고 배려심 깊은 조화의 수호자. 사람들을 돌보고 화합을 이끌어냅니다.",
    strengths: ["사교성", "배려심", "조직력", "협동심", "충성심"],
    weaknesses: ["인정 욕구", "변화 거부", "비판에 민감", "갈등 회피"],
    loveStyle: "따뜻하고 헌신적인 사랑을 합니다. 가정적이고 파트너를 세심하게 돌봐요.",
    career: ["간호사", "교사", "이벤트 플래너", "HR 담당자", "영업직"],
    bestMatch: ["ISFP", "ISTP"],
    goodMatch: ["ESFJ", "ISFJ", "ENFJ"]
  },
  ISTP: {
    title: "장인",
    emoji: "🔧",
    color: "from-zinc-500 to-slate-600",
    description: "논리적이고 실용적인 문제 해결사. 손재주가 뛰어나고, 즉흥적인 행동을 즐깁니다.",
    strengths: ["실용적", "분석력", "적응력", "침착함", "효율성"],
    weaknesses: ["감정 표현 부족", "무심함", "위험 추구", "약속 회피"],
    loveStyle: "자유롭고 독립적인 관계를 원합니다. 행동으로 사랑을 표현해요.",
    career: ["엔지니어", "파일럿", "기술자", "운동선수", "소방관"],
    bestMatch: ["ESFJ", "ESTJ"],
    goodMatch: ["ISTP", "ESTP", "INTP"]
  },
  ISFP: {
    title: "모험가",
    emoji: "🎨",
    color: "from-pink-400 to-fuchsia-500",
    description: "온화하고 예술적인 감성의 소유자. 현재를 즐기고, 아름다움을 추구합니다.",
    strengths: ["예술적 감각", "공감능력", "유연성", "충성심", "모험심"],
    weaknesses: ["자존감 낮음", "갈등 회피", "예측 불가", "계획 부족"],
    loveStyle: "로맨틱하고 감성적인 사랑을 합니다. 조용히 깊은 애정을 표현해요.",
    career: ["예술가", "디자이너", "수의사", "셰프", "사진작가"],
    bestMatch: ["ENFJ", "ESFJ"],
    goodMatch: ["ISFP", "INFP", "ESFP"]
  },
  ESTP: {
    title: "사업가",
    emoji: "🏆",
    color: "from-orange-500 to-red-500",
    description: "활동적이고 현실적인 모험가. 순간을 즐기고, 위험을 두려워하지 않습니다.",
    strengths: ["적응력", "관찰력", "대담함", "실용성", "사교성"],
    weaknesses: ["충동적", "규칙 무시", "인내심 부족", "감정 무시"],
    loveStyle: "재미있고 활동적인 관계를 좋아합니다. 새로운 경험을 함께 즐길 파트너를 원해요.",
    career: ["기업가", "영업직", "운동선수", "배우", "응급 구조대원"],
    bestMatch: ["ISFJ", "ISTJ"],
    goodMatch: ["ESTP", "ISTP", "ESFP"]
  },
  ESFP: {
    title: "연예인",
    emoji: "🎉",
    color: "from-fuchsia-500 to-pink-500",
    description: "사교적이고 즐거운 분위기 메이커. 현재를 즐기고, 사람들과 함께하는 것을 좋아합니다.",
    strengths: ["사교성", "낙관적", "실용적", "관찰력", "대담함"],
    weaknesses: ["집중력 부족", "장기 계획 어려움", "비판에 민감", "충동적"],
    loveStyle: "재미있고 애정 표현이 풍부합니다. 즐거운 경험을 함께 나누는 것을 좋아해요.",
    career: ["연예인", "이벤트 플래너", "여행가이드", "셰프", "유치원 교사"],
    bestMatch: ["ISTJ", "ISFJ"],
    goodMatch: ["ESFP", "ESTP", "ISFP"]
  }
}

export function MbtiSection() {
  const { t, language } = useLanguage()
  const { deductPoints, hasEnoughPoints, points, isHydrated } = usePoints()
  const ANALYSIS_COST = 10
  const [step, setStep] = useState<'start' | 'test' | 'result' | 'personality' | 'love' | 'career' | 'compatibility'>('start')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({})
  const [result, setResult] = useState<MBTIType | null>(null)
  const [savedResult, setSavedResult] = useState<MBTIType | null>(null)
  const [partnerType, setPartnerType] = useState<MBTIType | null>(null)
  const [showPremium, setShowPremium] = useState(false)
  const [unlockedSections, setUnlockedSections] = useState<string[]>([])
  const [showPointsModal, setShowPointsModal] = useState(false)

  // Load saved result from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mbtiResult')
    if (saved) {
      setSavedResult(saved as MBTIType)
    }
    const unlocked = localStorage.getItem('mbtiUnlocked')
    if (unlocked) {
      setUnlockedSections(JSON.parse(unlocked))
    }
  }, [])

  const handleAnswer = (answer: 'A' | 'B') => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }))
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      calculateResult()
    }
  }

  const calculateResult = () => {
    // 포인트 검사 - 최상단에서 먼저 실행
    if ((points ?? 0) < ANALYSIS_COST) {
      setShowPointsModal(true)
      return
    }
    
    // 포인트 차감
    if (!deductPoints(ANALYSIS_COST)) {
      return
    }

    let E = 0, I = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0

    questions.forEach((q, idx) => {
      const ans = answers[idx]
      if (!ans) return
      
      switch (q.dimension) {
        case 'EI':
          ans === 'A' ? E++ : I++
          break
        case 'SN':
          ans === 'A' ? S++ : N++
          break
        case 'TF':
          ans === 'A' ? T++ : F++
          break
        case 'JP':
          ans === 'A' ? J++ : P++
          break
      }
    })

    const type = `${E >= I ? 'E' : 'I'}${S >= N ? 'S' : 'N'}${T >= F ? 'T' : 'F'}${J >= P ? 'J' : 'P'}` as MBTIType
    setResult(type)
    setSavedResult(type)
    localStorage.setItem('mbtiResult', type)
    setStep('result')
  }

  const restartTest = () => {
    setStep('start')
    setCurrentQuestion(0)
    setAnswers({})
    setResult(null)
    setPartnerType(null)
  }

  const handleFeatureClick = (feature: string) => {
    if (!savedResult) {
      // Start the test if user hasn't completed it yet
      // 포인트 검사는 위의 4개 버튼에서 이미 함
      setStep('test')
      return
    }
    
    // 프리미엄 기능에 대한 포인트 검사
    const FEATURE_COST = 10
    if ((points ?? 0) < FEATURE_COST) {
      setShowPointsModal(true)
      return
    }
    
    // 포인트 차감
    if (!deductPoints(FEATURE_COST)) {
      return
    }
    
    setStep(feature as any)
  }

  const unlockPremium = (section: string) => {
    const PREMIUM_COST = 10
    
    // 포인트 검사 - 최상단에서 먼저 실행
    if ((points ?? 0) < PREMIUM_COST) {
      setShowPointsModal(true)
      return
    }
    
    // 포인트 차감
    if (!deductPoints(PREMIUM_COST)) {
      return
    }
    
    const updated = [...unlockedSections, section]
    setUnlockedSections(updated)
    localStorage.setItem('mbtiUnlocked', JSON.stringify(updated))
    setShowPremium(false)
  }

  // Start Screen
  if (step === 'start') {
    return (
      <>
        <div className="space-y-6 bg-gradient-to-br from-violet-50/30 via-white to-fuchsia-100/20 rounded-3xl p-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{t('mbti.title')}</h2>
            <p className="text-gray-500 text-sm">
              {t('mbti.subtitle')}<br />
              {t('mbti.features')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Brain, labelKey: 'mbti.featurePersonality', color: "text-violet-500", action: 'personality' },
              { icon: Heart, labelKey: 'mbti.featureLoveStyle', color: "text-pink-500", action: 'love' },
              { icon: Briefcase, labelKey: 'mbti.featureCareer', color: "text-blue-500", action: 'career' },
              { icon: Users, labelKey: 'mbti.featureCompatibilityShort', color: "text-emerald-500", action: 'compatibility' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  // 포인트 검사 - 최상단에서 먼저 실행
                  if ((points ?? 0) < ANALYSIS_COST) {
                    setShowPointsModal(true)
                    return
                  }
                  // 포인트 검사 완료 후 기존 로직 실행
                  handleFeatureClick(item.action)
                }}
                className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center gap-2 hover:shadow-md hover:bg-gray-50 transition-all"
              >
                <item.icon className={`h-6 w-6 ${item.color}`} />
                <span className="text-sm font-medium text-gray-700">{t(item.labelKey)}</span>
              </button>
            ))}
          </div>

          <Button
            onClick={() => {
              // 포인트 검사 - 최상단에서 먼저 실행
              if ((points ?? 0) < ANALYSIS_COST) {
                setShowPointsModal(true)
                return
              }
              // 포인트 검사 완료 후 테스트 시작
              setStep('test')
            }}
            className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white py-6 rounded-xl text-lg font-bold"
          >
            {t('mbti.start')}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Points Insufficient Modal */}
        <PointsInsufficientModal
          isOpen={showPointsModal}
          onClose={() => setShowPointsModal(false)}
          currentPoints={points}
          requiredPoints={ANALYSIS_COST}
          onWatchAd={() => {
            setShowPointsModal(false)
            window.location.href = '/user-profile#bonus'
          }}
          onBuyPi={() => {
            setShowPointsModal(false)
          }}
        />
      </>
    )
  }

  // Test Screen
  if (step === 'test') {
    const question = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <>
        <div className="space-y-6 bg-gradient-to-br from-violet-50/30 via-white to-fuchsia-100/20 rounded-3xl p-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t('mbti.question')} {currentQuestion + 1}/{questions.length}</span>
              <span className="text-violet-600 font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 text-center mb-6">
              {question.text}
            </h3>

            <div className="space-y-3">
              <button
                onClick={() => handleAnswer('A')}
                className="w-full p-4 rounded-xl border-2 border-violet-200 bg-violet-50 hover:bg-violet-100 hover:border-violet-400 transition-all text-left"
              >
                <span className="font-semibold text-violet-700">A. </span>
                <span className="text-gray-700">{question.optionA}</span>
              </button>
              <button
                onClick={() => handleAnswer('B')}
                className="w-full p-4 rounded-xl border-2 border-fuchsia-200 bg-fuchsia-50 hover:bg-fuchsia-100 hover:border-fuchsia-400 transition-all text-left"
              >
                <span className="font-semibold text-fuchsia-700">B. </span>
                <span className="text-gray-700">{question.optionB}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Points Insufficient Modal */}
        <PointsInsufficientModal
          isOpen={showPointsModal}
          onClose={() => setShowPointsModal(false)}
          currentPoints={points}
          requiredPoints={ANALYSIS_COST}
          onWatchAd={() => {
            setShowPointsModal(false)
            window.location.href = '/user-profile#bonus'
          }}
          onBuyPi={() => {
            setShowPointsModal(false)
          }}
        />
      </>
    )
  }

  // Result Screen
  if (step === 'result' && result) {
    const data = mbtiData[result]

    return (
      <>
        <div className="space-y-4 bg-gradient-to-br from-violet-50/30 via-white to-fuchsia-100/20 rounded-3xl p-6">
        {/* Result Header */}
        <div className={`bg-gradient-to-br ${data.color} rounded-2xl p-6 text-white text-center`}>
          <div className="text-4xl mb-2">{data.emoji}</div>
          <div className="text-sm opacity-80 mb-1">{t('mbti.yourType')}</div>
          <div className="text-4xl font-black mb-2">{result}</div>
          <div className="text-xl font-bold">{data.title}</div>
        </div>

        {/* Personality Description */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Brain className="h-5 w-5 text-violet-500" />
            {t('mbti.personality')}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">{data.description}</p>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
            <h4 className="font-bold text-emerald-700 mb-2 text-sm">{t('mbti.strengths')}</h4>
            <ul className="space-y-1">
              {data.strengths.map((s, i) => (
                <li key={i} className="text-xs text-emerald-600 flex items-center gap-1">
                  <Check className="h-3 w-3" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200">
            <h4 className="font-bold text-rose-700 mb-2 text-sm">{t('mbti.weaknesses')}</h4>
            <ul className="space-y-1">
              {data.weaknesses.map((w, i) => (
                <li key={i} className="text-xs text-rose-600 flex items-center gap-1">
                  <span className="w-3 h-3 text-center">-</span> {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Love Style */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            {t('mbti.loveStyle')}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">{data.loveStyle}</p>
        </div>

        {/* Career */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-500" />
            {t('mbti.career')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.career.map((c, i) => (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Best Match */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            {t('mbti.compatibility')}
          </h4>
          <div className="space-y-3">
            <div>
              <span className="text-xs text-gray-500">{t('mbti.bestMatch')}</span>
              <div className="flex gap-2 mt-1">
                {data.bestMatch.map(type => (
                  <span key={type} className="px-3 py-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 rounded-lg text-sm font-bold border border-amber-200">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs text-gray-500">{t('mbti.goodMatch')}</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {data.goodMatch.map(type => (
                  <span key={type} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Premium: Detailed Report */}
        {!unlockedSections.includes('detailed') ? (
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border-2 border-dashed border-gray-300">
            <div className="absolute inset-0 backdrop-blur-[1px] bg-white/50 rounded-2xl flex flex-col items-center justify-center">
              <Lock className="h-8 w-8 text-gray-400 mb-2" />
              <span className="font-bold text-gray-600">{t('mbti.detailedReport')}</span>
              <Button 
                onClick={() => unlockPremium('detailed')}
                className="mt-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm"
              >
                {t('mbti.unlockForPoints')}
              </Button>
            </div>
            <div className="opacity-20">
              <h4 className="font-bold text-gray-800 mb-2">{t('mbti.detailedTeaserTitle')}</h4>
              <p className="text-sm text-gray-600">{t('mbti.detailedTeaserDesc')}</p>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-5 border border-violet-200">
            <h4 className="font-bold text-violet-800 mb-3">{t('mbti.detailedFullTitle')}</h4>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>{t('mbti.detailedHidden')}</strong>{' '}
                {t('mbti.detailedHiddenBody').replace('{type}', result)}
              </p>
              <p>
                <strong>{t('mbti.detailedGrowth')}</strong>{' '}
                {t('mbti.detailedGrowthBody')}
              </p>
              <p>
                <strong>{t('mbti.detailedStress')}</strong>{' '}
                {t('mbti.detailedStressBody').replace('{type}', result)}
              </p>
            </div>
          </div>
        )}

        {/* MBTI Compatibility Checker */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-500" />
            {t('mbti.checkCompatibility')}
          </h4>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            {(Object.keys(mbtiData) as MBTIType[]).map(type => (
              <button
                key={type}
                onClick={() => setPartnerType(type)}
                className={`p-2 rounded-lg text-xs font-bold transition-all ${
                  partnerType === type
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {partnerType && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-2xl font-black text-violet-600">{result}</span>
                <Heart className="h-6 w-6 text-pink-500" />
                <span className="text-2xl font-black text-fuchsia-600">{partnerType}</span>
              </div>
              
              {!unlockedSections.includes(`compat-${partnerType}`) ? (
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-3">{t('mbti.compatPremiumTeaser')}</p>
                  <Button 
                    onClick={() => unlockPremium(`compat-${partnerType}`)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm"
                  >
                    {t('mbti.unlockForPoints')}
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <p className="text-emerald-700">
                    <strong>{t('mbti.compatScoreStrong')}</strong>{' '}
                    {mbtiResultCompatScoreLine(
                      language,
                      mbtiCompatTier(
                        data.bestMatch.includes(partnerType),
                        data.goodMatch.includes(partnerType)
                      )
                    )}
                  </p>
                  <p className="text-gray-600">
                    {t('mbti.compatPairPrefix').replace('{a}', result).replace('{b}', partnerType)}{' '}
                    {mbtiCompatResultParagraph(
                      language,
                      mbtiCompatTier(
                        data.bestMatch.includes(partnerType),
                        data.goodMatch.includes(partnerType)
                      )
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Restart Button */}
        <Button
          onClick={restartTest}
          variant="outline"
          className="w-full border-violet-300 text-violet-600 hover:bg-violet-50"
        >
          {t('mbti.restart')}
        </Button>
        </div>

        {/* Points Insufficient Modal */}
        <PointsInsufficientModal
          isOpen={showPointsModal}
          onClose={() => setShowPointsModal(false)}
          currentPoints={points}
          requiredPoints={ANALYSIS_COST}
          onWatchAd={() => {
            setShowPointsModal(false)
            window.location.href = '/user-profile#bonus'
          }}
          onBuyPi={() => {
            setShowPointsModal(false)
          }}
        />
      </>
    )
  }

  // Personality Analysis Page
  if (step === 'personality' && savedResult) {
    const data = mbtiData[savedResult]
    return (
      <>
        <div className="space-y-4 bg-gradient-to-br from-violet-50/30 via-white to-fuchsia-100/20 rounded-3xl p-6">
        <Button
          variant="ghost"
          onClick={() => setStep(result ? 'result' : 'start')}
          className="text-violet-600"
        >
          {`← ${t('button.back')}`}
        </Button>

        <div className={`bg-gradient-to-br ${data.color} rounded-2xl p-6 text-white text-center`}>
          <div className="text-4xl mb-2">{data.emoji}</div>
          <div className="text-3xl font-black">{savedResult}</div>
          <div className="text-xl font-bold">{data.title}</div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-3">{t('mbti.personalityCoreTitle')}</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{data.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
              <h4 className="font-bold text-emerald-700 mb-3">{t('mbti.strengths')}</h4>
              <ul className="space-y-2">
                {data.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-emerald-600 flex items-center gap-2">
                    <Check className="h-4 w-4" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200">
              <h4 className="font-bold text-rose-700 mb-3">{t('mbti.weaknesses')}</h4>
              <ul className="space-y-2">
                {data.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-rose-600 flex items-center gap-2">
                    <span>-</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-3">{t('mbti.commStyleTitle')}</h4>
            <p className="text-gray-600 text-sm">
              {mbtiPersonalityCommStyle(language, savedResult.startsWith('E'))}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-3">{t('mbti.growthDirectionTitle')}</h4>
            <p className="text-gray-600 text-sm">{t('mbti.growthDirectionBody')}</p>
          </div>
        </div>
        </div>

        {/* Points Insufficient Modal */}
        <PointsInsufficientModal
          isOpen={showPointsModal}
          onClose={() => setShowPointsModal(false)}
          currentPoints={points}
          requiredPoints={ANALYSIS_COST}
          onWatchAd={() => {
            setShowPointsModal(false)
            window.location.href = '/user-profile#bonus'
          }}
          onBuyPi={() => {
            setShowPointsModal(false)
          }}
        />
      </>
    )
  }

  // Love Style Page
  if (step === 'love' && savedResult) {
    const data = mbtiData[savedResult]
    return (
      <>
        <div className="space-y-4 bg-gradient-to-br from-pink-50/30 via-white to-rose-100/20 rounded-3xl p-6">
        <Button
          variant="ghost"
          onClick={() => setStep(result ? 'result' : 'start')}
          className="text-pink-600"
        >
          {`← ${t('button.back')}`}
        </Button>

        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white text-center">
          <div className="text-4xl mb-2">💕</div>
          <div className="text-3xl font-bold">{t('mbti.lovePageTitle').replace('{type}', savedResult)}</div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-rose-700 mb-2 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              {t('mbti.loveTendencyTitle')}
            </h4>
            <p className="text-gray-600 text-sm">{data.loveStyle}</p>
          </div>

          <div className="bg-rose-50 rounded-2xl p-5 border border-rose-200">
            <h4 className="font-bold text-rose-700 mb-3">{t('mbti.emotionExpressTitle')}</h4>
            <p className="text-gray-600 text-sm">
              {mbtiLoveExpressStyle(language, savedResult.includes('F'))}
            </p>
          </div>

          <div className="bg-pink-50 rounded-2xl p-5 border border-pink-200">
            <h4 className="font-bold text-pink-700 mb-3">{t('mbti.relationshipStrengthTitle')}</h4>
            <p className="text-gray-600 text-sm">
              {t('mbti.relationshipStrengthBody')
                .replace('{type}', savedResult)
                .replace('{match}', data.bestMatch[0])}
            </p>
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
            <h4 className="font-bold text-amber-700 mb-3">{t('mbti.cautionTitle')}</h4>
            <p className="text-gray-600 text-sm">{t('mbti.cautionBody')}</p>
          </div>
        </div>
        </div>

        {/* Points Insufficient Modal */}
        <PointsInsufficientModal
          isOpen={showPointsModal}
          onClose={() => setShowPointsModal(false)}
          currentPoints={points}
          requiredPoints={ANALYSIS_COST}
          onWatchAd={() => {
            setShowPointsModal(false)
            window.location.href = '/user-profile#bonus'
          }}
          onBuyPi={() => {
            setShowPointsModal(false)
          }}
        />
      </>
    )
  }

  // Career Tendency Page
  if (step === 'career' && savedResult) {
    const data = mbtiData[savedResult]
    return (
      <>
        <div className="space-y-4 bg-gradient-to-br from-blue-50/30 via-white to-indigo-100/20 rounded-3xl p-6">
        <Button
          variant="ghost"
          onClick={() => setStep(result ? 'result' : 'start')}
          className="text-blue-600"
        >
          {`← ${t('button.back')}`}
        </Button>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white text-center">
          <div className="text-4xl mb-2">💼</div>
          <div className="text-3xl font-bold">{t('mbti.careerPageTitle').replace('{type}', savedResult)}</div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              {t('mbti.recommendedJobsTitle')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.career.map((c, i) => (
                <span key={i} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
            <h4 className="font-bold text-blue-700 mb-3">{t('mbti.workStyleTitle')}</h4>
            <p className="text-gray-600 text-sm">
              {mbtiCareerWorkStyle(language, savedResult.includes('J'))}
            </p>
          </div>

          <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-200">
            <h4 className="font-bold text-indigo-700 mb-3">{t('mbti.leadershipStyleTitle')}</h4>
            <p className="text-gray-600 text-sm">
              {mbtiCareerLeadership(language, savedResult.startsWith('E'))}
            </p>
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
            <h4 className="font-bold text-amber-700 mb-3">{t('mbti.careerAdviceTitle')}</h4>
            <p className="text-gray-600 text-sm">{t('mbti.careerAdviceBody')}</p>
          </div>
        </div>
        </div>

        {/* Points Insufficient Modal */}
        <PointsInsufficientModal
          isOpen={showPointsModal}
          onClose={() => setShowPointsModal(false)}
          currentPoints={points}
          requiredPoints={ANALYSIS_COST}
          onWatchAd={() => {
            setShowPointsModal(false)
            window.location.href = '/user-profile#bonus'
          }}
          onBuyPi={() => {
            setShowPointsModal(false)
          }}
        />
      </>
    )
  }

  // Compatibility Checker
  if (step === 'compatibility' && savedResult) {
    const data = mbtiData[savedResult]
    const compatibilityScore = () => {
      if (data.bestMatch.includes(partnerType as MBTIType)) return 95
      if (data.goodMatch.includes(partnerType as MBTIType)) return 80
      return 65
    }

    return (
      <>
        <div className="space-y-4 bg-gradient-to-br from-emerald-50/30 via-white to-teal-100/20 rounded-3xl p-6">
        <Button
          variant="ghost"
          onClick={() => setStep(result ? 'result' : 'start')}
          className="text-emerald-600"
        >
          {`← ${t('button.back')}`}
        </Button>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white text-center">
          <div className="text-4xl mb-2">💞</div>
          <div className="text-3xl font-bold">{t('mbti.compatPageTitle')}</div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4">{t('mbti.selectPartnerTitle')}</h4>
            <div className="grid grid-cols-4 gap-2">
              {(Object.keys(mbtiData) as MBTIType[]).map(type => (
                <button
                  key={type}
                  onClick={() => setPartnerType(type)}
                  className={`p-3 rounded-lg text-xs font-bold transition-all ${
                    partnerType === type
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {partnerType && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-200">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-3xl font-black text-violet-600">{savedResult}</span>
                  <Heart className="h-8 w-8 text-pink-500" />
                  <span className="text-3xl font-black text-fuchsia-600">{partnerType}</span>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-black text-emerald-600">
                    {compatibilityScore()}
                    {t('mbti.scoreUnit')}
                  </div>
                  <p className="text-emerald-700 font-bold mt-1">
                    {mbtiCompatTabScoreLabel(
                      language,
                      mbtiCompatTier(
                        compatibilityScore() === 95,
                        compatibilityScore() === 80
                      )
                    )}
                  </p>
                </div>
              </div>

              {!unlockedSections.includes(`compat-${partnerType}`) ? (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200 text-center">
                  <Lock className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-amber-700 font-semibold mb-3">{t('mbti.compatPremiumLockedTitle')}</p>
                  <Button 
                    onClick={() => unlockPremium(`compat-${partnerType}`)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white w-full"
                  >
                    {t('mbti.unlockForPoints')}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
                    <h4 className="font-bold text-emerald-700 mb-2">{t('mbti.strengthsTogetherTitle')}</h4>
                    <p className="text-gray-600 text-sm">
                      서로의 다른 점을 보완하며 함께 성장할 수 있습니다.{' '}
                      {mbtiCompatUnlockedDetail(
                        language,
                        mbtiCompatTier(
                          data.bestMatch.includes(partnerType as MBTIType),
                          data.goodMatch.includes(partnerType as MBTIType)
                        )
                      )}
                    </p>
                  </div>

                  <div className="bg-rose-50 rounded-2xl p-5 border border-rose-200">
                    <h4 className="font-bold text-rose-700 mb-2">{t('mbti.conflictRiskTitle')}</h4>
                    <p className="text-gray-600 text-sm">{t('mbti.conflictRiskBody')}</p>
                  </div>

                  <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
                    <h4 className="font-bold text-blue-700 mb-2">{t('mbti.communicationTipsTitle')}</h4>
                    <p className="text-gray-600 text-sm">{t('mbti.communicationTipsBody')}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        </div>

        {/* Points Insufficient Modal */}
        <PointsInsufficientModal
          isOpen={showPointsModal}
          onClose={() => setShowPointsModal(false)}
          currentPoints={points}
          requiredPoints={ANALYSIS_COST}
          onWatchAd={() => {
            setShowPointsModal(false)
            window.location.href = '/user-profile#bonus'
          }}
          onBuyPi={() => {
            setShowPointsModal(false)
          }}
        />
      </>
    )
  }
}

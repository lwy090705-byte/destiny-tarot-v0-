import type { MBTIType } from './mbti-types'

/** Language-neutral display metadata (emoji, colors, match lists). */
export const mbtiMeta: Record<
  MBTIType,
  { emoji: string; color: string; bestMatch: MBTIType[]; goodMatch: MBTIType[] }
> = {
  INTJ: { emoji: '🧠', color: 'from-indigo-500 to-purple-600', bestMatch: ['ENFP', 'ENTP'], goodMatch: ['INFJ', 'INTJ', 'ENTJ'] },
  INTP: { emoji: '🔬', color: 'from-cyan-500 to-blue-600', bestMatch: ['ENTJ', 'ESTJ'], goodMatch: ['INTP', 'ENTP', 'INFP'] },
  ENTJ: { emoji: '👔', color: 'from-rose-500 to-red-600', bestMatch: ['INTP', 'ISTP'], goodMatch: ['ENTJ', 'INTJ', 'ENFJ'] },
  ENTP: { emoji: '💡', color: 'from-amber-500 to-orange-600', bestMatch: ['INFJ', 'INTJ'], goodMatch: ['ENTP', 'ENFP', 'INTP'] },
  INFJ: { emoji: '🌟', color: 'from-emerald-500 to-teal-600', bestMatch: ['ENFP', 'ENTP'], goodMatch: ['INFJ', 'INFP', 'INTJ'] },
  INFP: { emoji: '🦋', color: 'from-violet-500 to-purple-600', bestMatch: ['ENFJ', 'ENTJ'], goodMatch: ['INFP', 'INFJ', 'INTP'] },
  ENFJ: { emoji: '🌈', color: 'from-pink-500 to-rose-600', bestMatch: ['INFP', 'ISFP'], goodMatch: ['ENFJ', 'INFJ', 'ENTJ'] },
  ENFP: { emoji: '🎭', color: 'from-yellow-400 to-amber-500', bestMatch: ['INTJ', 'INFJ'], goodMatch: ['ENFP', 'ENTP', 'INFP'] },
  ISTJ: { emoji: '📋', color: 'from-slate-500 to-gray-600', bestMatch: ['ESFP', 'ESTP'], goodMatch: ['ISTJ', 'ISFJ', 'ESTJ'] },
  ISFJ: { emoji: '🛡️', color: 'from-sky-500 to-blue-600', bestMatch: ['ESTP', 'ESFP'], goodMatch: ['ISFJ', 'ISTJ', 'ESFJ'] },
  ESTJ: { emoji: '📊', color: 'from-blue-600 to-indigo-700', bestMatch: ['INTP', 'ISTP'], goodMatch: ['ESTJ', 'ISTJ', 'ENTJ'] },
  ESFJ: { emoji: '🤝', color: 'from-green-500 to-emerald-600', bestMatch: ['ISFP', 'ISTP'], goodMatch: ['ESFJ', 'ISFJ', 'ENFJ'] },
  ISTP: { emoji: '🔧', color: 'from-zinc-500 to-slate-600', bestMatch: ['ESFJ', 'ESTJ'], goodMatch: ['ISTP', 'ESTP', 'INTP'] },
  ISFP: { emoji: '🎨', color: 'from-pink-400 to-fuchsia-500', bestMatch: ['ENFJ', 'ESFJ'], goodMatch: ['ISFP', 'INFP', 'ESFP'] },
  ESTP: { emoji: '🏆', color: 'from-orange-500 to-red-500', bestMatch: ['ISFJ', 'ISTJ'], goodMatch: ['ESTP', 'ISTP', 'ESFP'] },
  ESFP: { emoji: '🎉', color: 'from-fuchsia-500 to-pink-500', bestMatch: ['ISTJ', 'ISFJ'], goodMatch: ['ESFP', 'ESTP', 'ISFP'] },
}

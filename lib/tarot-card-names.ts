import type { Language } from './i18n'
import type { FortuneContentLanguage } from './fortune-generator'

export type TarotCardNameLang = FortuneContentLanguage | 'hi'

const MAJOR_ES = [
  'El Loco', 'El Mago', 'La Sacerdotisa', 'La Emperatriz', 'El Emperador', 'El Hierofante',
  'Los Enamorados', 'El Carro', 'La Fuerza', 'El Ermitaño', 'La Rueda de la Fortuna', 'La Justicia',
  'El Colgado', 'La Muerte', 'La Templanza', 'El Diablo', 'La Torre', 'La Estrella', 'La Luna',
  'El Sol', 'El Juicio', 'El Mundo',
]

const MAJOR_FR = [
  'Le Mat', 'Le Bateleur', 'La Papesse', "L'Impératrice", "L'Empereur", 'Le Pape',
  "L'Amoureux", 'Le Chariot', 'La Force', "L'Ermite", 'La Roue de Fortune', 'La Justice',
  'Le Pendu', 'La Mort', 'Tempérance', 'Le Diable', 'La Maison Dieu', "L'Étoile", 'La Lune',
  'Le Soleil', 'Le Jugement', 'Le Monde',
]

const MAJOR_DE = [
  'Der Narr', 'Der Magier', 'Die Hohepriesterin', 'Die Herrscherin', 'Der Herrscher', 'Der Hierophant',
  'Die Liebenden', 'Der Wagen', 'Die Kraft', 'Der Eremit', 'Das Rad des Schicksals', 'Die Gerechtigkeit',
  'Der Gehängte', 'Der Tod', 'Die Mäßigung', 'Der Teufel', 'Der Turm', 'Der Stern', 'Der Mond',
  'Die Sonne', 'Das Gericht', 'Die Welt',
]

const MAJOR_PT = [
  'O Louco', 'O Mago', 'A Sacerdotisa', 'A Imperatriz', 'O Imperador', 'O Hierofante',
  'Os Enamorados', 'O Carro', 'A Força', 'O Eremita', 'A Roda da Fortuna', 'A Justiça',
  'O Enforcado', 'A Morte', 'A Temperança', 'O Diabo', 'A Torre', 'A Estrela', 'A Lua',
  'O Sol', 'O Julgamento', 'O Mundo',
]

const MAJOR_ID = [
  'Si Bodoh', 'Sang Pesulap', 'Sang Pendeta Wanita', 'Sang Permaisuri', 'Sang Kaisar', 'Sang Hierofan',
  'Si Kekasih', 'Kereta Kemenangan', 'Kekuatan', 'Sang Pertapa', 'Roda Keberuntungan', 'Keadilan',
  'Si Tergantung', 'Kematian', 'Kesederhanaan', 'Sang Iblis', 'Menara', 'Bintang', 'Bulan',
  'Matahari', 'Penghakiman', 'Dunia',
]

const MAJOR_HI = [
  'मूर्ख', 'जादूगर', 'महिला पुजारी', 'साम्राज्ञी', 'सम्राट', 'पोप',
  'प्रेमी', 'रथ', 'शक्ति', 'साधु', 'भाग्य चक्र', 'न्याय',
  'लटका हुआ', 'मृत्यु', 'संयम', 'शैतान', 'मीनार', 'तारा', 'चंद्रमा',
  'सूर्य', 'निर्णय', 'विश्व',
]

const MAJOR_VI = [
  'Kẻ Điên', 'Ảo Thuật Gia', 'Nữ Tư Tế', 'Nữ Hoàng', 'Hoàng Đế', 'Giáo Hoàng',
  'Người Yêu', 'Cỗ Xe', 'Sức Mạnh', 'Ẩn Sĩ', 'Bánh Xe Vận Mệnh', 'Công Lý',
  'Kẻ Treo Ngược', 'Cái Chết', 'Tiết Chế', 'Ác Quỷ', 'Tháp', 'Ngôi Sao', 'Mặt Trăng',
  'Mặt Trời', 'Phán Xét', 'Thế Giới',
]

const MAJOR_TH = [
  'คนโง่', 'นักมายากล', 'นักบวชหญิง', 'จักรพรรดินี', 'จักรพรรดิ', 'พระสันตะปาปา',
  'คนรัก', 'รถม้า', 'พลัง', 'ฤาษี', 'กงล้อโชคชะตา', 'ความยุติธรรม',
  'คนแขวนคอ', 'ความตาย', 'การยับยั้ง', 'ปีศาจ', 'หอคอย', 'ดาว', 'พระจันทร์',
  'พระอาทิตย์', 'การพิพากษา', 'โลก',
]

const MAJOR_BY_LANG: Partial<Record<TarotCardNameLang, string[]>> = {
  es: MAJOR_ES,
  fr: MAJOR_FR,
  de: MAJOR_DE,
  pt: MAJOR_PT,
  id: MAJOR_ID,
  hi: MAJOR_HI,
  vi: MAJOR_VI,
  th: MAJOR_TH,
}

type MinorSuits = { Cups: string; Swords: string; Wands: string; Pentacles: string }

const SUITS: Record<Exclude<TarotCardNameLang, 'ko' | 'ja' | 'zh'>, MinorSuits> = {
  en: { Cups: 'Cups', Swords: 'Swords', Wands: 'Wands', Pentacles: 'Pentacles' },
  es: { Cups: 'Copas', Swords: 'Espadas', Wands: 'Bastos', Pentacles: 'Oros' },
  fr: { Cups: 'Coupes', Swords: 'Épées', Wands: 'Bâtons', Pentacles: 'Deniers' },
  de: { Cups: 'Kelche', Swords: 'Schwerter', Wands: 'Stäbe', Pentacles: 'Münzen' },
  pt: { Cups: 'Copas', Swords: 'Espadas', Wands: 'Paus', Pentacles: 'Ouros' },
  id: { Cups: 'Piala', Swords: 'Pedang', Wands: 'Tongkat', Pentacles: 'Koin' },
  hi: { Cups: 'कप', Swords: 'तलवार', Wands: 'छड़ी', Pentacles: 'सिक्का' },
  vi: { Cups: 'Cốc', Swords: 'Kiếm', Wands: 'Gậy', Pentacles: 'Xu' },
  th: { Cups: 'ถ้วย', Swords: 'ดาบ', Wands: 'ไม้เท้า', Pentacles: 'เหรียญ' },
}

const RANKS: Record<Exclude<TarotCardNameLang, 'ko' | 'ja' | 'zh'>, readonly string[]> = {
  en: ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'],
  es: ['As', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve', 'Diez', 'Sota', 'Caballo', 'Reina', 'Rey'],
  fr: ['As', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six', 'Sept', 'Huit', 'Neuf', 'Dix', 'Valet', 'Cavalier', 'Reine', 'Roi'],
  de: ['Ass', 'Zwei', 'Drei', 'Vier', 'Fünf', 'Sechs', 'Sieben', 'Acht', 'Neun', 'Zehn', 'Bube', 'Ritter', 'Königin', 'König'],
  pt: ['Ás', 'Dois', 'Três', 'Quatro', 'Cinco', 'Seis', 'Sete', 'Oito', 'Nove', 'Dez', 'Pajem', 'Cavaleiro', 'Rainha', 'Rei'],
  id: ['As', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Pelayan', 'Kesatria', 'Ratu', 'Raja'],
  hi: ['इक्का', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ', 'दस', 'पेज', 'नाइट', 'रानी', 'राजा'],
  vi: ['Át', 'Hai', 'Ba', 'Bốn', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười', 'Tiểu đồng', 'Kỵ sĩ', 'Hoàng hậu', 'Vua'],
  th: ['เอซ', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า', 'สิบ', 'เพจ', 'อัศวิน', 'ราชินี', 'ราชา'],
}

function minorFormat(lang: Exclude<TarotCardNameLang, 'ko' | 'ja' | 'zh'>, rank: string, suit: string): string {
  if (lang === 'en') return `${rank} of ${suit}`
  if (lang === 'de') return `${rank} der ${suit}`
  if (lang === 'fr' || lang === 'es' || lang === 'pt') return `${rank} de ${suit}`
  if (lang === 'id') return `${rank} ${suit}`
  if (lang === 'hi') return `${suit} का ${rank}`
  if (lang === 'vi') return `${rank} ${suit}`
  if (lang === 'th') return `${rank} ${suit}`
  return `${rank} of ${suit}`
}

function getMinorSuitKey(cardId: number): { base: number; suit: keyof MinorSuits } | null {
  if (cardId >= 22 && cardId < 36) return { base: 22, suit: 'Cups' }
  if (cardId >= 36 && cardId < 50) return { base: 36, suit: 'Swords' }
  if (cardId >= 50 && cardId < 64) return { base: 50, suit: 'Wands' }
  if (cardId >= 64 && cardId < 78) return { base: 64, suit: 'Pentacles' }
  return null
}

export function resolveTarotNameLang(language: Language | string): TarotCardNameLang {
  const l = String(language).toLowerCase()
  if (l === 'ko') return 'ko'
  if (l === 'ja') return 'ja'
  if (l === 'zh') return 'zh'
  if (l === 'es') return 'es'
  if (l === 'id') return 'id'
  if (l === 'fr') return 'fr'
  if (l === 'de') return 'de'
  if (l === 'pt') return 'pt'
  if (l === 'hi') return 'hi'
  if (l === 'vi') return 'vi'
  if (l === 'th') return 'th'
  return 'en'
}

export function getExtendedMajorName(cardId: number, lang: TarotCardNameLang): string {
  if (cardId < 0 || cardId > 21) return ''
  const list = MAJOR_BY_LANG[lang]
  return list?.[cardId] ?? ''
}

export function getExtendedMinorName(cardId: number, lang: TarotCardNameLang): string {
  if (lang === 'ko' || lang === 'ja' || lang === 'zh') return ''
  const info = getMinorSuitKey(cardId)
  if (!info) return ''
  const idx = cardId - info.base
  const ranks = RANKS[lang as keyof typeof RANKS]
  const suits = SUITS[lang as keyof typeof SUITS]
  if (!ranks || !suits || idx < 0 || idx >= ranks.length) return ''
  return minorFormat(lang as Exclude<TarotCardNameLang, 'ko' | 'ja' | 'zh'>, ranks[idx], suits[info.suit])
}

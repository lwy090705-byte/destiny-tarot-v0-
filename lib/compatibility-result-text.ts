import type { Language } from './i18n'
import type { FortuneContentLanguage } from './fortune-generator'
import { getFortuneContentLanguage, normalizeLanguage } from './fortune-generator'
import {
  compatibilityElementLabelsHi,
  p1TraitHi,
  p2TraitHi,
  relationshipFlowHi,
  personalityOtherHi,
  strengthsCautionsHi,
  futureAdviceHi,
} from './compatibility-pools-hi'
import {
  compatibilityElementLabelsPt,
  p1TraitPt,
  p2TraitPt,
  relationshipFlowPt,
  personalityOtherPt,
  strengthsCautionsPt,
  futureAdvicePt,
} from './compatibility-pools-pt'
import {
  compatibilityElementLabelsFr,
  p1TraitFr,
  p2TraitFr,
  relationshipFlowFr,
  personalityOtherFr,
  strengthsCautionsFr,
  futureAdviceFr,
} from './compatibility-pools-fr'
import {
  compatibilityElementLabelsDe,
  p1TraitDe,
  p2TraitDe,
  relationshipFlowDe,
  personalityOtherDe,
  strengthsCautionsDe,
  futureAdviceDe,
} from './compatibility-pools-de'
import {
  compatibilityElementLabelsVi,
  p1TraitVi,
  p2TraitVi,
  relationshipFlowVi,
  personalityOtherVi,
  strengthsCautionsVi,
  futureAdviceVi,
} from './compatibility-pools-vi'
import {
  compatibilityElementLabelsTh,
  p1TraitTh,
  p2TraitTh,
  relationshipFlowTh,
  personalityOtherTh,
  strengthsCautionsTh,
  futureAdviceTh,
} from './compatibility-pools-th'

type CompatContentLanguage = FortuneContentLanguage | 'hi'

function getCompatContentLanguage(lang: Language): CompatContentLanguage {
  if (normalizeLanguage(lang) === 'hi') return 'hi'
  return getFortuneContentLanguage(lang)
}

export type FiveElementKey = 'wood' | 'fire' | 'earth' | 'metal' | 'water'

export function compatibilityElementLabel(el: string, language: Language): string {
  const L = getCompatContentLanguage(language)
  const row: Record<FiveElementKey, Record<CompatContentLanguage, string>> = {
    wood: { ko: '목(木)', en: 'Wood', ja: '木', zh: '木', es: 'Madera', id: 'Kayu', pt: compatibilityElementLabelsPt.wood, fr: compatibilityElementLabelsFr.wood, de: compatibilityElementLabelsDe.wood, vi: compatibilityElementLabelsVi.wood, th: compatibilityElementLabelsTh.wood, hi: compatibilityElementLabelsHi.wood },
    fire: { ko: '화(火)', en: 'Fire', ja: '火', zh: '火', es: 'Fuego', id: 'Api', pt: compatibilityElementLabelsPt.fire, fr: compatibilityElementLabelsFr.fire, de: compatibilityElementLabelsDe.fire, vi: compatibilityElementLabelsVi.fire, th: compatibilityElementLabelsTh.fire, hi: compatibilityElementLabelsHi.fire },
    earth: { ko: '토(土)', en: 'Earth', ja: '土', zh: '土', es: 'Tierra', id: 'Tanah', pt: compatibilityElementLabelsPt.earth, fr: compatibilityElementLabelsFr.earth, de: compatibilityElementLabelsDe.earth, vi: compatibilityElementLabelsVi.earth, th: compatibilityElementLabelsTh.earth, hi: compatibilityElementLabelsHi.earth },
    metal: { ko: '금(金)', en: 'Metal', ja: '金', zh: '金', es: 'Metal', id: 'Logam', pt: compatibilityElementLabelsPt.metal, fr: compatibilityElementLabelsFr.metal, de: compatibilityElementLabelsDe.metal, vi: compatibilityElementLabelsVi.metal, th: compatibilityElementLabelsTh.metal, hi: compatibilityElementLabelsHi.metal },
    water: { ko: '수(水)', en: 'Water', ja: '水', zh: '水', es: 'Agua', id: 'Air', pt: compatibilityElementLabelsPt.water, fr: compatibilityElementLabelsFr.water, de: compatibilityElementLabelsDe.water, vi: compatibilityElementLabelsVi.water, th: compatibilityElementLabelsTh.water, hi: compatibilityElementLabelsHi.water },
  }
  const k = el as FiveElementKey
  return row[k]?.[L] ?? row[k]?.en ?? row[k]?.ko ?? el
}

function named(L: CompatContentLanguage, name: string): string {
  if (L === 'ko') return `${name}님`
  if (L === 'ja') return `${name}さん`
  if (L === 'es' || L === 'id' || L === 'pt' || L === 'fr' || L === 'de' || L === 'vi' || L === 'th' || L === 'hi') return name
  return name
}

function sub(
  template: string,
  vars: { n1: string; n2: string; e1: string; e2: string; t1?: string; t2?: string }
): string {
  return template
    .replace(/\{n1\}/g, vars.n1)
    .replace(/\{n2\}/g, vars.n2)
    .replace(/\{e1\}/g, vars.e1)
    .replace(/\{e2\}/g, vars.e2)
    .replace(/\{t1\}/g, vars.t1 ?? '')
    .replace(/\{t2\}/g, vars.t2 ?? '')
}

const p1Trait: Record<CompatContentLanguage, Record<FiveElementKey, string>> = {
  ko: {
    wood: '성장과 발전을 추구하며 진취적',
    fire: '열정적이고 활동적',
    earth: '안정적이고 신중',
    metal: '결단력 있고 원칙적',
    water: '지혜롭고 유연',
  },
  en: {
    wood: 'forward-looking and growth-oriented',
    fire: 'passionate and energetic',
    earth: 'steady and thoughtful',
    metal: 'decisive and principled',
    water: 'wise and adaptable',
  },
  ja: {
    wood: '成長と発展を求め前向き',
    fire: '情熱的で行動的',
    earth: '安定志向で慎重',
    metal: '決断力があり原則的',
    water: '知的で柔軟',
  },
  zh: {
    wood: '追求成长与发展、积极进取',
    fire: '热情而活跃',
    earth: '稳重而审慎',
    metal: '果断而有原则',
    water: '聪慧而灵活',
  },
  es: {
    wood: 'orientado al crecimiento y con visión de futuro',
    fire: 'apasionado y enérgico',
    earth: 'estable y reflexivo',
    metal: 'decidido y con principios',
    water: 'sabio y adaptable',
  },
  id: {
    wood: 'berorientasi pada pertumbuhan dan berwawasan ke depan',
    fire: 'penuh gairah dan energik',
    earth: 'stabil dan bijaksana',
    metal: 'tegas dan berprinsip',
    water: 'bijak dan mudah beradaptasi',
  },
  hi: p1TraitHi,
  pt: p1TraitPt,
  fr: p1TraitFr,
  de: p1TraitDe,
  vi: p1TraitVi,
  th: p1TraitTh,
}

const p2Trait: Record<CompatContentLanguage, Record<FiveElementKey, string>> = {
  ko: {
    wood: '창의적이고 포용력이 넓',
    fire: '사교적이고 낙천적',
    earth: '책임감이 강하고 현실적',
    metal: '섬세하고 완벽주의적',
    water: '적응력이 뛰어나고 직관적',
  },
  en: {
    wood: 'creative and open-minded',
    fire: 'sociable and optimistic',
    earth: 'responsible and practical',
    metal: 'detail-oriented with high standards',
    water: 'highly adaptable and intuitive',
  },
  ja: {
    wood: '創造的で包容力がある',
    fire: '社交的で楽観的',
    earth: '責任感が強く現実的',
    metal: '繊細で完璧を求める',
    water: '適応力が高く直感的',
  },
  zh: {
    wood: '富有创意与包容',
    fire: '外向而乐观',
    earth: '责任心强且务实',
    metal: '细致并追求完美',
    water: '适应力强且直觉敏锐',
  },
  es: {
    wood: 'creativo y de mente abierta',
    fire: 'sociable y optimista',
    earth: 'responsable y práctico',
    metal: 'orientado al detalle con altos estándares',
    water: 'muy adaptable e intuitivo',
  },
  id: {
    wood: 'kreatif dan berpikiran terbuka',
    fire: 'sosial dan optimis',
    earth: 'bertanggung jawab dan praktis',
    metal: 'teliti dan berstandar tinggi',
    water: 'sangat adaptif dan intuitif',
  },
  hi: p2TraitHi,
  pt: p2TraitPt,
  fr: p2TraitFr,
  de: p2TraitDe,
  vi: p2TraitVi,
  th: p2TraitTh,
}

const relationshipFlow: Record<CompatContentLanguage, [string, string, string]> = {
  ko: [
    '{n1}과 {n2}의 만남은 우연이 아닌 필연입니다. {e1}의 에너지와 {e2}의 에너지가 서로를 끌어당기며, 두 분 사이에는 강한 연결고리가 형성되어 있습니다. 현재 두 분의 관계는 서로에 대한 호기심과 탐구의 단계에 있으며, 시간이 흐를수록 더 깊은 이해와 신뢰가 쌓일 것입니다. 감정의 교류가 원활하며, 서로의 마음을 읽는 능력이 뛰어납니다.',
    '두 분의 관계는 물처럼 자연스럽게 흐르고 있습니다. {e1}의 기운을 가진 {n1}이 {e2}의 기운을 가진 {n2}과 만나 아름다운 조화를 이루고 있습니다. 현재 감정적 균형이 잘 맞춰져 있으며, 서로에게 편안함을 주는 관계입니다. 다만, 때로는 너무 편안해서 긴장감이 사라질 수 있으니 가끔은 새로운 도전을 함께 해보세요.',
    '{n1}과 {n2} 사이에는 특별한 기운이 흐르고 있습니다. {e1}과 {e2}의 조합은 서로를 성장시키는 힘을 가지고 있습니다. 두 분이 함께할 때 창의적인 에너지가 샘솟으며, 혼자서는 상상하지 못했던 일들을 함께 이룰 수 있습니다.',
  ],
  en: [
    'For {n1} and {n2}, this connection feels less like chance and more like meaning. The energy of {e1} and {e2} pulls you together, forming a strong bond. You are in a phase of curiosity and discovery; over time, understanding and trust can deepen. Emotional exchange flows easily, and you read each other unusually well.',
    'Your relationship moves naturally, like water. {n1}, with the tone of {e1}, and {n2}, with the tone of {e2}, meet in a gentle harmony. Emotional balance feels steady, and you offer each other comfort. Because comfort can become routine, try a new challenge together from time to time.',
    'Between {n1} and {n2}, a special current runs. The pairing of {e1} and {e2} carries a growth-promoting force. When you are together, creative energy rises, and you can accomplish things neither would attempt alone.',
  ],
  ja: [
    '{n1}と{n2}の出会いは偶然ではなく必然のように感じられます。{e1}のエネルギーと{e2}のエネルギーが互いを引き寄せ、強いつながりが生まれています。今は好奇心と探求の段階にあり、時間とともに理解と信頼が深まるでしょう。感情の交流がスムーズで、相手の心を読む力に優れています。',
    'ふたりの関係は水のように自然に流れています。{e1}の気を持つ{n1}と、{e2}の気を持つ{n2}が出会い、美しい調和を作っています。感情のバランスがよく取れ、互いに安心感を与え合えます。安心しすぎて刺激が薄れることもあるので、ときどき新しい挑戦を一緒に試してください。',
    '{n1}と{n2}のあいだには特別な気が流れています。{e1}と{e2}の組み合わせは互いを成長させる力を持ちます。一緒にいると創造的なエネルギーが湧き、ひとりでは想像しなかったことを共に成し遂げられます。',
  ],
  zh: [
    '{n1}与{n2}的相遇不像偶然，更像一种必然的牵引。{e1}的能量与{e2}的能量彼此吸引，在你们之间形成牢固的连结。你们正处在好奇与探索的阶段，随着时间推移，理解与信任会不断加深。情绪交流顺畅，也擅长读懂彼此的心。',
    '你们的关系像水一样自然流动。带着{e1}气质的{n1}与带着{e2}气质的{n2}相遇，形成柔和而美好的协调。情感平衡较好，彼此也能带来安心感。若过于舒适而失去张力，不妨偶尔一起尝试新的挑战。',
    '{n1}与{n2}之间流动着特别的气息。{e1}与{e2}的组合具有彼此促进成长的力量。在一起时创造力会涌现，你们能一起完成独自时难以想象的事情。',
  ],
  es: [
    'Para {n1} y {n2}, esta conexión parece menos casualidad y más destino. La energía de {e1} y {e2} los atrae mutuamente y forma un vínculo fuerte. Están en una fase de curiosidad y descubrimiento; con el tiempo, la comprensión y la confianza pueden profundizarse. El intercambio emocional fluye con facilidad y se leen sorprendentemente bien.',
    'La relación entre ambos avanza con naturalidad, como el agua. {n1}, con la esencia de {e1}, y {n2}, con la de {e2}, se encuentran en una armonía suave. El equilibrio emocional se siente estable y se aportan confort mutuo. Como la comodidad puede volverse rutina, conviene probar un reto nuevo juntos de vez en cuando.',
    'Entre {n1} y {n2} circula una corriente especial. La combinación de {e1} y {e2} lleva una fuerza que impulsa el crecimiento. Cuando están juntos, surge energía creativa y pueden lograr cosas que ninguno intentaría solo.',
  ],
  id: [
    'Bagi {n1} dan {n2}, hubungan ini terasa kurang seperti kebetulan dan lebih seperti takdir. Energi {e1} dan {e2} saling menarik, membentuk ikatan yang kuat. Kalian berada di fase rasa ingin tahu dan penemuan; seiring waktu, pemahaman dan kepercayaan dapat semakin dalam. Pertukaran emosi mengalir dengan mudah, dan kalian sangat pandai membaca hati satu sama lain.',
    'Hubungan kalian bergerak secara alami, seperti air. {n1}, dengan nuansa {e1}, dan {n2}, dengan nuansa {e2}, bertemu dalam harmoni yang lembut. Keseimbangan emosional terasa stabil, dan kalian saling memberi rasa nyaman. Karena kenyamanan bisa menjadi rutinitas, cobalah tantangan baru bersama sesekali.',
    'Antara {n1} dan {n2} mengalir arus yang istimewa. Pasangan {e1} dan {e2} membawa kekuatan yang mendorong pertumbuhan. Saat bersama, energi kreatif meningkat, dan kalian dapat mencapai hal-hal yang tidak akan dicoba sendirian.',
  ],
  hi: relationshipFlowHi,
  pt: relationshipFlowPt,
  fr: relationshipFlowFr,
  de: relationshipFlowDe,
  vi: relationshipFlowVi,
  th: relationshipFlowTh,
}

const personalityOther: Record<CompatContentLanguage, [string, string]> = {
  ko: [
    '{e1}의 {n1}과 {e2}의 {n2}는 서로 다른 매력을 가지고 있습니다. {n1}의 강점이 {n2}의 약점을 보완하고, 반대로 {n2}의 장점이 {n1}에게 새로운 시각을 열어줍니다. 두 분의 성격 차이는 갈등의 원인이 아니라 성장의 기회입니다.',
    '성격적으로 두 분은 서로를 자극하는 관계입니다. {n1}의 {e1}적 성향과 {n2}의 {e2}적 성향이 만나 독특한 케미스트리를 만들어냅니다. 서로의 다름을 인정하고 존중할 때 최고의 파트너십이 완성됩니다.',
  ],
  en: [
    "{n1} ({e1}) and {n2} ({e2}) carry different charms. {n1}'s strengths can balance {n2}'s blind spots, while {n2}'s strengths can open new perspective for {n1}. Your differences need not be conflict—they can be fuel for growth.",
    'You stimulate each other. The {e1}-leaning side of {n1} meets the {e2}-leaning side of {n2}, creating a distinctive chemistry. When you accept and respect the differences, partnership reaches its best form.',
  ],
  ja: [
    '{e1}の{n1}と{e2}の{n2}はそれぞれ違う魅力を持っています。{n1}の強みが{n2}の弱みを補い、逆に{n2}の強みが{n1}に新しい視点を開きます。性格の違いは対立の原因ではなく、成長の機会になり得ます。',
    'ふたりは互いを刺激し合う関係です。{n1}の{e1}寄りの傾きと{n2}の{e2}寄りの傾きが合わさり、独特のケミストリーを生みます。違いを認め尊重するとき、最高のパートナーシップが完成します。',
  ],
  zh: [
    '带有{e1}气质的{n1}与带有{e2}气质的{n2}各有不同的魅力。{n1}的长处能补足{n2}的短板，而{n2}的优点也能为{n1}打开新的视角。性格差异不必成为冲突，也可以成为成长的契机。',
    '在性格上，你们会彼此激发。{n1}偏{e1}的特质与{n2}偏{e2}的特质相遇，形成独特的化学反应。当你们承认并尊重彼此时，伙伴关系会走向最好的形态。',
  ],
  es: [
    '{n1} ({e1}) y {n2} ({e2}) tienen encantos distintos. Las fortalezas de {n1} pueden equilibrar los puntos ciegos de {n2}, mientras que las de {n2} pueden abrir una nueva perspectiva para {n1}. Las diferencias no tienen por qué ser conflicto: pueden ser combustible para crecer.',
    'Se estimulan mutuamente. El lado inclinado a {e1} de {n1} se encuentra con el lado inclinado a {e2} de {n2}, creando una química distintiva. Cuando aceptan y respetan las diferencias, la pareja alcanza su mejor forma.',
  ],
  id: [
    '{n1} ({e1}) dan {n2} ({e2}) memiliki daya tarik yang berbeda. Kekuatan {n1} dapat menyeimbangkan kelemahan {n2}, sementara kekuatan {n2} dapat membuka sudut pandang baru bagi {n1}. Perbedaan kalian tidak harus menjadi konflik—bisa menjadi bahan untuk tumbuh.',
    'Kalian saling menggugah. Sisi {n1} yang condong ke {e1} bertemu sisi {n2} yang condong ke {e2}, menciptakan chemistry yang khas. Saat kalian menerima dan menghormati perbedaan, kemitraan mencapai bentuk terbaiknya.',
  ],
  hi: personalityOtherHi,
  pt: personalityOtherPt,
  fr: personalityOtherFr,
  de: personalityOtherDe,
  vi: personalityOtherVi,
  th: personalityOtherTh,
}

function personalityLine0(L: CompatContentLanguage, n1: string, n2: string, e1: string, e2: string, el1: FiveElementKey, el2: FiveElementKey): string {
  const t1 = p1Trait[L][el1]
  const t2 = p2Trait[L][el2]
  if (L === 'ko') {
    return `${n1}은 ${e1}의 특성상 ${t1}인 성향을 가지고 있습니다. 반면 ${n2}은 ${e2}의 영향으로 ${t2}습니다. 이 두 성향이 만나면 서로의 부족한 부분을 채워주며 완전한 조화를 이룹니다.`
  }
  if (L === 'en') {
    return `${n1} tends toward a ${e1}-toned style: ${t1}. ${n2} leans ${e2}-toned: ${t2}. Together these tendencies can complement each other and move toward a fuller balance.`
  }
  if (L === 'ja') {
    return `${n1}は${e1}の性質として${t1}な傾向があります。一方${n2}は${e2}の影響で${t2}です。この二つの傾きは互いの不足を補い、より調和した関係を育てられます。`
  }
  if (L === 'es') {
    return `${n1} tiende a un estilo con tono de ${e1}: ${t1}. ${n2} se inclina hacia ${e2}: ${t2}. Juntos, estas tendencias pueden complementarse y avanzar hacia un equilibrio más pleno.`
  }
  if (L === 'id') {
    return `${n1} cenderung ke gaya bernada ${e1}: ${t1}. ${n2} condong ke nada ${e2}: ${t2}. Bersama, kecenderungan ini dapat saling melengkapi dan bergerak menuju keseimbangan yang lebih utuh.`
  }
  if (L === 'hi') {
    return `${n1} ${e1} की झलक में ${t1} प्रवृत्ति रखते हैं। ${n2} ${e2} के प्रभाव में अधिक ${t2} हैं। साथ मिलकर ये प्रवृत्तियाँ एक-दूसरे की कमियाँ पूरी कर सकती हैं और पूर्ण संतुलन की ओर बढ़ सकती हैं।`
  }
  if (L === 'pt') {
    return `${n1} tende a um estilo com tom de ${e1}: ${t1}. ${n2} inclina-se para ${e2}: ${t2}. Juntos, essas tendências podem se complementar e avançar para um equilíbrio mais pleno.`
  }
  if (L === 'fr') {
    return `${n1} tend vers un style à tonalité ${e1} : ${t1}. ${n2} penche vers ${e2} : ${t2}. Ensemble, ces tendances peuvent se compléter et avancer vers un équilibre plus plein.`
  }
  if (L === 'de') {
    return `${n1} tendiert zu einem Stil mit ${e1}-Ton: ${t1}. ${n2} neigt zu ${e2}: ${t2}. Zusammen können diese Tendenzen sich ergänzen und zu einem volleren Gleichgewicht führen.`
  }
  if (L === 'vi') {
    return `${n1} có xu hướng theo phong cách mang sắc thái ${e1}: ${t1}. ${n2} nghiêng về ${e2}: ${t2}. Khi ở bên nhau, hai xu hướng này có thể bổ sung cho nhau và hướng tới sự cân bằng trọn vẹn hơn.`
  }
  if (L === 'th') {
    return `${n1} มีแนวโน้มสไตล์โทน ${e1}: ${t1} ส่วน ${n2} โน้มไปทาง ${e2}: ${t2} เมื่ออยู่ด้วยกัน แนวโน้มเหล่านี้อาจเติมเต็มกันและมุ่งสู่ความสมดุลที่สมบูรณ์ยิ่งขึ้น`
  }
  return `${n1}在${e1}特质上往往表现出${t1}的倾向；而${n2}在${e2}影响下更偏${t2}。两种倾向相遇时，可以互相补足，走向更完整的协调。`
}

const strengthsCautions: Record<CompatContentLanguage, { strengths: string; cautions: string }[]> = {
  ko: [
    {
      strengths: `두 분의 관계에서 가장 큰 강점은 '상호 보완성'입니다. {n1}이 앞서 나갈 때 {n2}이 든든한 지원군이 되어주고, {n2}이 어려움에 처했을 때 {n1}이 해결사 역할을 합니다. 또한 대화가 잘 통하며, 서로의 유머 코드가 맞아 함께 있으면 즐겁습니다. 공동의 목표를 향해 나아갈 때 시너지가 극대화됩니다.`,
      cautions: `주의해야 할 점은 '소통의 단절'입니다. 서로를 잘 안다고 생각해서 표현을 소홀히 하면 오해가 쌓일 수 있습니다. 바쁜 일상 속에서도 매일 대화하는 시간을 확보하세요. 또한 {n1}은 조급함을, {n2}은 우유부단함을 조심하세요.`,
    },
    {
      strengths: `두 분 관계의 강점은 '깊은 유대감'입니다. 시간이 흐를수록 서로에 대한 이해가 깊어지며, 말하지 않아도 상대방의 마음을 읽을 수 있게 됩니다. 위기 상황에서 더욱 단결하는 모습을 보이며, 외부의 어떤 시련에도 흔들리지 않는 관계를 구축할 수 있습니다.`,
      cautions: `조심해야 할 부분은 '감정적 충돌'입니다. 두 분 모두 자존심이 강한 편이라 한번 감정이 상하면 화해하기까지 시간이 걸릴 수 있습니다. 싸움 후에는 반드시 대화로 마무리하고, '옳고 그름'보다 '관계의 회복'에 초점을 맞추세요.`,
    },
    {
      strengths: `관계의 가장 큰 강점은 '성장 촉진'입니다. 두 분이 함께하면 개인일 때보다 더 나은 사람이 됩니다. 서로에게 좋은 자극을 주며, 꿈을 향해 나아가는 과정에서 최고의 응원군이 되어줍니다. 취미나 관심사를 공유하면 더욱 돈독해집니다.`,
      cautions: `주의점은 '기대치 관리'입니다. 상대방에게 과도한 기대를 하면 실망할 수 있습니다. 완벽한 사람은 없으며, 서로의 한계를 인정하는 것이 중요합니다. 또한 각자의 시간과 공간을 존중하세요.`,
    },
  ],
  en: [
    {
      strengths: `A major strength is mutual complementarity. When {n1} moves forward, {n2} can be a steady support; when {n2} struggles, {n1} can help find a way through. Conversation clicks, and shared humor makes time together light. When you aim at a shared goal, synergy grows strongest.`,
      cautions: `Watch for quiet drift in communication. Assuming you are fully understood without saying it can stack misunderstandings. Even on busy days, protect a small daily window to talk. {n1}, watch impatience; {n2}, watch indecision.`,
    },
    {
      strengths: `A deep sense of bond can grow between you. Understanding may deepen with time, and you can sense each other even without many words. In hard moments you may pull closer, building a relationship that can weather outside pressure.`,
      cautions: `Emotional clashes need care. If pride runs high, making up can take time. After tension, close the loop with conversation—prioritize repairing the relationship over winning the argument.`,
    },
    {
      strengths: `You can accelerate each other’s growth. Together you may become a better version than alone: good mutual stimulation, strong cheering for dreams, and stronger closeness when you share hobbies and interests.`,
      cautions: `Manage expectations. Demanding perfection from a partner invites disappointment. Everyone has limits—accept them. Respect each person’s need for time and space.`,
    },
  ],
  ja: [
    {
      strengths: `最大の強みは「相互補完」です。{n1}が前に進むとき{n2}が支えになり、{n2}が苦しいとき{n1}が道を切り開く助けになります。会話の波長が合い、ユーモアも共有しやすく、一緒にいる時間が軽やかです。共通の目標に向かうほどシナジーが高まります。`,
      cautions: `注意したいのは「対話の途切れ」です。分かり合えているつもりで言葉を省略すると誤解が積もります。忙しい日でも短い対話の時間を確保を。{n1}は焦り、{n2}は優柔不断さに注意を。`,
    },
    {
      strengths: `強みは「深い絆」です。時間とともに理解が深まり、言葉少なくとも気持ちが通じ合うことが増えます。危機のときほど結束し、外の試練にも揺れにくい関係を築けます。`,
      cautions: `感情の衝突には注意が必要です。プライドが強いと、一度傷つくと和解まで時間がかかることがあります。衝突のあとは必ず対話で締め、「正しさ」より「関係の回復」を優先してください。`,
    },
    {
      strengths: `強みは「成長の促し」です。ふたりでいるほど一人のときより良い自分になれる刺激があります。夢に向かう道のりで最高の応援役になれます。趣味や関心を共有するとさらに絆が深まります。`,
      cautions: `注意は「期待値の管理」です。相手に過度の期待をかけると失望しやすくなります。完璧な人はいません。互いの限界を認め、それぞれの時間と空間も尊重してください。`,
    },
  ],
  zh: [
    {
      strengths: `你们关系里很突出的一点是「互补」。当{n1}往前冲时，{n2}能成为稳固后盾；当{n2}遇到困难时，{n1}也能帮忙找到出路。你们聊得来，笑点也合拍，相处轻松。朝着共同目标前进时，协同效应最强。`,
      cautions: `需要留意「沟通变少」。以为彼此都懂而少表达，误会会慢慢堆积。再忙也尽量每天留一点对话时间。{n1}注意急躁，{n2}注意优柔寡断。`,
    },
    {
      strengths: `你们的优势是「深层连结」。随着时间推移，理解会更深，有时不必多说也能读懂对方。在危机中反而可能更团结，建立更能抵御外界压力的关系。`,
      cautions: `要小心「情绪碰撞」。若自尊心都强，一旦受伤，和好可能需要时间。争执后务必用对话收尾，把重点放在修复关系，而不是争输赢。`,
    },
    {
      strengths: `关系的长处是「彼此促进成长」。在一起时往往比独处时更容易成为更好的自己。你们能互相给良性刺激，在追梦路上成为彼此最好的支持者；共享兴趣也会让连结更厚。`,
      cautions: `注意「期待管理」。对伴侣期待过高容易失望。没有完美的人，承认彼此限度很重要；也要尊重各自需要独处与空间。`,
    },
  ],
  es: [
    {
      strengths: `Una gran fortaleza es la complementariedad mutua. Cuando {n1} avanza, {n2} puede ser un apoyo firme; cuando {n2} atraviesa dificultades, {n1} puede ayudar a encontrar salida. La conversación encaja, el humor compartido aligera el tiempo juntos. Al apuntar a un objetivo común, la sinergia se intensifica.`,
      cautions: `Cuidado con el desgaste silencioso en la comunicación. Dar por hecho que todo se entiende sin decirlo puede acumular malentendidos. Aun en días ocupados, reserven un pequeño espacio diario para hablar. {n1}, cuidado con la impaciencia; {n2}, con la indecisión.`,
    },
    {
      strengths: `Puede crecer un vínculo profundo entre ustedes. La comprensión puede profundizar con el tiempo y sentirse mutuamente incluso con pocas palabras. En momentos difíciles pueden unirse más y construir una relación que resista la presión externa.`,
      cautions: `Los choques emocionales requieren cuidado. Si el orgullo es fuerte, reconciliarse puede llevar tiempo. Tras la tensión, cierren el ciclo con diálogo: prioricen reparar la relación antes que ganar la discusión.`,
    },
    {
      strengths: `Pueden acelerar el crecimiento mutuo. Juntos pueden volverse una mejor versión que en solitario: buen estímulo, fuerte apoyo a los sueños y mayor cercanía al compartir aficiones e intereses.`,
      cautions: `Gestione las expectativas. Exigir perfección al otro invita a la decepción. Todos tienen límites: acéptenlos. Respeten la necesidad de tiempo y espacio de cada uno.`,
    },
  ],
  id: [
    {
      strengths: `Kekuatan utama adalah saling melengkapi. Saat {n1} maju, {n2} bisa menjadi dukungan yang kokoh; saat {n2} kesulitan, {n1} dapat membantu menemukan jalan keluar. Percakapan selaras, humor bersama membuat waktu berdua terasa ringan. Saat mengejar tujuan bersama, sinergi paling kuat.`,
      cautions: `Waspadai komunikasi yang mereda tanpa disadari. Menganggap sudah saling paham tanpa mengatakannya bisa menumpuk kesalahpahaman. Meski sibuk, sisihkan waktu singkat setiap hari untuk bicara. {n1}, waspadai ketergesaan; {n2}, waspadai keragu-raguan.`,
    },
    {
      strengths: `Ikatan yang dalam dapat tumbuh di antara kalian. Pemahaman bisa semakin dalam seiring waktu, dan kalian bisa merasakan satu sama lain bahkan tanpa banyak kata. Di saat sulit, kalian bisa semakin kompak dan membangun hubungan yang tahan tekanan dari luar.`,
      cautions: `Benturan emosi perlu perhatian. Jika harga diri kuat, berdamai bisa memakan waktu. Setelah ketegangan, tutup dengan percakapan—utamakan memperbaiki hubungan daripada memenangkan argumen.`,
    },
    {
      strengths: `Kalian dapat saling mendorong pertumbuhan. Bersama, kalian bisa menjadi versi diri yang lebih baik daripada sendiri: stimulasi yang sehat, dukungan kuat untuk mimpi, dan kedekatan yang bertambah saat berbagi hobi dan minat.`,
      cautions: `Kelola ekspektasi. Menuntut kesempurnaan dari pasangan mudah menimbulkan kecewa. Semua orang punya batas—akui itu. Hormati kebutuhan masing-masing akan waktu dan ruang pribadi.`,
    },
  ],
  hi: strengthsCautionsHi,
  pt: strengthsCautionsPt,
  fr: strengthsCautionsFr,
  de: strengthsCautionsDe,
  vi: strengthsCautionsVi,
  th: strengthsCautionsTh,
}

const futureAdvice: Record<CompatContentLanguage, [string, string, string]> = {
  ko: [
    '두 분의 미래는 밝습니다. {e1}과 {e2}의 조합은 장기적으로 안정적인 관계를 유지할 수 있는 좋은 궁합입니다. 앞으로의 관계를 더욱 발전시키려면 \'함께하는 경험\'을 많이 쌓으세요. 여행, 취미 활동, 새로운 도전을 함께하면 추억이 쌓이고 유대감이 강해집니다. 서로의 가족을 소중히 여기고, 주변 사람들과도 좋은 관계를 유지하세요. 1년 후, 5년 후, 10년 후의 모습을 함께 그려보고 공동의 목표를 설정하면 관계가 더욱 견고해집니다.',
    '두 분의 앞길에는 무한한 가능성이 펼쳐져 있습니다. 현재의 좋은 에너지를 유지하면서 서로에게 감사하는 마음을 잊지 마세요. 조언 드리자면, 매일 하루에 한 번은 상대방에게 고마운 점을 말해주세요. 갈등이 생겼을 때는 \'우리\'라는 관점에서 문제를 바라보고, 승패가 아닌 해결에 초점을 맞추세요. 정기적으로 데이트를 하고, 특별한 날뿐만 아니라 평범한 날도 소중히 여기면 행복이 배가 됩니다.',
    '{n1}과 {n2}의 관계는 계속해서 성장할 잠재력을 가지고 있습니다. 미래를 위한 조언으로는, 첫째, 소통을 게을리하지 마세요. 둘째, 서로의 꿈을 응원하고 지지하세요. 셋째, 어려운 시기가 와도 함께 극복할 수 있다는 믿음을 가지세요. 두 분이 서로를 선택한 것은 최고의 선택이었습니다. 그 선택을 매일 새롭게 다짐하며 아름다운 미래를 만들어가세요.',
  ],
  en: [
    'Your future together looks bright. The pairing of {e1} and {e2} can support a stable long-term bond. To deepen it, collect shared experiences—travel, hobbies, new challenges—so memories stack and closeness grows. Honor each other’s families and keep goodwill with people around you. Sketch where you hope to be in one, five, and ten years, and set shared aims; that clarity steadies the relationship.',
    'Many possibilities lie ahead. Keep the good energy you have now, and do not forget gratitude. Try saying one specific thank-you to each other every day. In conflict, look from a “we” angle and focus on solutions, not scorekeeping. Date regularly, and treat ordinary days as worth cherishing—small joys multiply.',
    '{n1} and {n2}, your bond still has room to grow. Three anchors for the future: keep communication steady, cheer for each other’s dreams, and trust that hard seasons can be survived together. Choosing each other was a strong choice—renew that choice in small ways each day and build a future you both want.',
  ],
  ja: [
    'ふたりの未来は明るいです。{e1}と{e2}の組み合わせは長期的に安定した関係を育てやすい相性です。関係を深めるには「一緒に経験すること」を増やしましょう。旅行や趣味、新しい挑戦で思い出が積み重なり、絆が強まります。互いの家族を大切にし、周囲とも良い関係を保ってください。1年後、5年後、10年後の姿を一緒に描き、共通の目標を置くと関係がより堅くなります。',
    '前には可能性が広がっています。今の良いエネルギーを保ちつつ、感謝を忘れないでください。毎日ひとつ、相手へのありがとうを言葉にしてみてください。対立のときは「私たち」の視点で見て、勝ち負けではなく解決に焦点を。定期的なデートをし、特別な日だけでなく普通の日も大切にすると幸福が増えます。',
    '{n1}と{n2}の関係はこれからも成長し続けられます。未来のために、第一に対話を怠らない。第二に互いの夢を応援する。第三に、難しい時期も共に越えられるという信頼を持つ。この選択を日々小さく更新し、望む未来を一緒に築いてください。',
  ],
  zh: [
    '你们的未来是明亮的。{e1}与{e2}的组合有助于长期稳定的关系。想让关系更进一步，请多积累「共同经历」——旅行、爱好、新的挑战都会堆叠回忆、加深连结。也请珍视彼此的家庭，与身边人保持善意。一起勾勒一年、五年、十年后的画面并设定共同目标，关系会更稳固。',
    '前路有许多可能。在保持当下良好能量的同时，别忘了感恩。建议每天对彼此说一句具体的感谢。发生冲突时，用「我们」的视角看待问题，聚焦解决而非输赢。定期约会，把平凡的日子也当作值得珍惜的时光，幸福会加倍。',
    '{n1}与{n2}的关系仍有持续成长的潜力。面向未来：第一，别让沟通松懈；第二，支持彼此的梦想；第三，相信难关可以一起度过。彼此的选择很值得，请用日常的小行动不断重申这份选择，共同走向你们想要的未来。',
  ],
  es: [
    'El futuro juntos se ve luminoso. La combinación de {e1} y {e2} puede sostener un vínculo estable a largo plazo. Para profundizarlo, acumulen experiencias compartidas—viajes, aficiones, retos nuevos—para que los recuerdos se sumen y la cercanía crezca. Valoren las familias de cada uno y mantengan buena relación con quienes los rodean. Dibujen dónde esperan estar en uno, cinco y diez años, y fijen metas comunes; esa claridad fortalece la relación.',
    'Por delante hay muchas posibilidades. Conserven la buena energía actual y no olviden la gratitud. Intenten decirse un agradecimiento concreto cada día. En el conflicto, miren desde un «nosotros» y enfoquen soluciones, no puntajes. Salgan en citas con regularidad y valoren también los días ordinarios: las pequeñas alegrías se multiplican.',
    '{n1} y {n2}, su vínculo aún tiene margen para crecer. Tres anclas para el futuro: mantengan la comunicación constante, animen los sueños del otro y confíen en que las épocas difíciles pueden superarse juntos. Elegirse fue una buena decisión—renuévenla en gestos pequeños cada día y construyan el futuro que ambos desean.',
  ],
  id: [
    'Masa depan bersama tampak cerah. Pasangan {e1} dan {e2} dapat menopang ikatan yang stabil dalam jangka panjang. Untuk memperdalamnya, kumpulkan pengalaman bersama—perjalanan, hobi, tantangan baru—agar kenangan bertambah dan kedekatan tumbuh. Hormati keluarga masing-masing dan jaga hubungan baik dengan orang di sekitar kalian. Gambarkan harapan satu, lima, dan sepuluh tahun ke depan, lalu tetapkan tujuan bersama; kejelasan itu menguatkan hubungan.',
    'Banyak kemungkinan terbentang di depan. Pertahankan energi baik yang ada sekarang, dan jangan lupa rasa syukur. Cobalah mengucapkan satu terima kasih yang konkret setiap hari. Saat konflik, lihat dari sudut «kita» dan fokus pada solusi, bukan skor. Kencan secara teratur, dan anggap hari-hari biasa juga berharga—kebahagiaan kecil akan berlipat.',
    '{n1} dan {n2}, ikatan kalian masih punya ruang untuk tumbuh. Tiga penopang untuk masa depan: jaga komunikasi tetap stabil, dukung mimpi satu sama lain, dan percaya musim sulit bisa dihadapi bersama. Memilih satu sama lain adalah keputusan yang kuat—perbarui pilihan itu dalam hal-hal kecil setiap hari dan bangun masa depan yang kalian inginkan.',
  ],
  hi: futureAdviceHi,
  pt: futureAdvicePt,
  fr: futureAdviceFr,
  de: futureAdviceDe,
  vi: futureAdviceVi,
  th: futureAdviceTh,
}

const warnedCompatPools = new Set<string>()

function compatPoolRow<T>(
  rows: Record<CompatContentLanguage, T>,
  L: CompatContentLanguage,
  context: string
): T {
  if (rows[L] != null) return rows[L]
  const key = `${context}:${L}`
  if (!warnedCompatPools.has(key)) {
    warnedCompatPools.add(key)
    console.warn(`[compatibility] Missing "${L}" pool for ${context}; falling back to English`)
  }
  return rows.en ?? rows.ko
}

export function buildCompatibilityNarrative(
  language: Language,
  p1: { name: string },
  p2: { name: string },
  el1: FiveElementKey,
  el2: FiveElementKey,
  seed: number
): { summary: string; personalityMatch: string; strengths: string; cautions: string; advice: string } {
  const L = getCompatContentLanguage(language)
  const e1 = compatibilityElementLabel(el1, language)
  const e2 = compatibilityElementLabel(el2, language)
  const n1 = named(L, p1.name)
  const n2 = named(L, p2.name)
  const vars = { n1, n2, e1, e2 }

  const si = seed % 3
  const scIdx = seed % 3

  const flow = compatPoolRow(relationshipFlow, L, 'relationshipFlow')
  const summary = sub(flow[si] ?? flow[0] ?? '', vars)

  const personalityMatch =
    si === 0
      ? personalityLine0(L, n1, n2, e1, e2, el1, el2)
      : sub(compatPoolRow(personalityOther, L, 'personalityOther')[si - 1] ?? '', vars)

  const sc = compatPoolRow(strengthsCautions, L, 'strengthsCautions')[scIdx] ?? {
    strengths: '',
    cautions: '',
  }
  const strengths = sub(sc.strengths, vars)
  const cautions = sub(sc.cautions, vars)

  const advicePool = compatPoolRow(futureAdvice, L, 'futureAdvice')
  const advice = sub(advicePool[si] ?? advicePool[0] ?? '', vars)

  return { summary, personalityMatch, strengths, cautions, advice }
}

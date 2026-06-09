/**
 * 운세 템플릿 풀
 * 각 카테고리별로 풍부한 템플릿과 동적 로테이션을 통해 개인맞춤형 운세 생성
 */

import type { FortuneContentLanguage } from './fortune-generator'
import { getFortuneContentLanguage, pickFortunePool, pickFortuneString } from './fortune-generator'
import type { Language } from './i18n'
import { generateRichMonthlyFortune } from './monthly-fortune-generator'

// ─── Fallback Templates (장애 복구용 기본 템플릿) ──────────────────────────────

export type FallbackTemplateKey = 'lifetime' | 'yearly' | 'monthly' | 'general'

export const fallbackTemplatesByLang: Partial<Record<FortuneContentLanguage, Record<FallbackTemplateKey, string>>> = {
  ko: {
    lifetime:
      '당신의 인생은 지속적인 성장과 변화의 흐름입니다. 초반부에는 기초를 다지는 시기로 인내심과 노력이 필요하며, 중반부에는 노력이 결실을 맺기 시작합니다. 후반부에는 지혜와 경험으로 주변 사람들을 돕게 됩니다.',
    yearly:
      '올해는 당신에게 새로운 기회와 변화가 있는 해입니다. 상반기는 준비와 계획의 시기이고, 하반기는 그 노력의 결과를 맺는 시간이 될 것입니다. 긍정적인 마음으로 도전해보세요.',
    monthly:
      '이 달은 새로운 시작의 기운이 있습니다. 계획한 일을 추진하기에 좋은 시기이며, 인간관계도 좋아질 것입니다. 현재에 충실하세요.',
    general:
      '지금 당신에게는 새로운 가능성이 열려있습니다. 믿음을 가지고 도전해보세요. 노력은 반드시 보상받을 것입니다.',
  },
  en: {
    lifetime:
      'Your life flows through steady growth and change. Early years ask for patience and foundations; mid-life brings the fruit of effort; later years turn wisdom and experience toward helping others.',
    yearly:
      'This year brings fresh chances and change. The first half favors planning and preparation; the second half gathers results from what you have built. Stay hopeful and keep trying.',
    monthly:
      'This month carries the energy of a new start. It is a good time to move plans forward and warm up relationships. Stay present with what matters now.',
    general:
      'New possibilities are open to you now. Move forward with faith. Effort you invest will find its reward.',
  },
  ja: {
    lifetime:
      'あなたの人生は成長と変化の流れです。前半は忍耐と土台づくり、中盤で努力が実を結び、後半は知恵と経験で周囲を支える時期が訪れます。',
    yearly:
      '今年は新しい機会と変化の年です。上半期は準備と計画、下半期はその成果が形になる時期です。前向きに挑戦してください。',
    monthly:
      '今月は新しい始まりの気があります。計画を進め、人間関係も好転しやすい時期です。今この瞬間に集中してください。',
    general:
      '今、新しい可能性が開けています。信じて一歩を踏み出してください。努力は必ず報われます。',
  },
  zh: {
    lifetime:
      '你的人生在持续成长与变化中展开。前期需要耐心打基础，中期努力开始结果，后期则以智慧与经验帮助他人。',
    yearly:
      '今年对你意味着新的机会与变化。上半年适合准备与规划，下半年收获努力的成果。请保持积极并勇敢尝试。',
    monthly:
      '这个月带有新的开始的能量。适合推进计划，人际关系也会转好。请专注于当下。',
    general:
      '此刻新的可能正在向你敞开。带着信念去尝试，你的努力会得到回报。',
  },
}

export function getFallbackTemplate(key: FallbackTemplateKey, language: Language | string = 'ko'): string {
  const koRow = fallbackTemplatesByLang.ko
  const enRow = fallbackTemplatesByLang.en ?? koRow
  const jaRow = fallbackTemplatesByLang.ja ?? enRow
  const zhRow = fallbackTemplatesByLang.zh ?? enRow
  const esRow = fallbackTemplatesByLang.es ?? enRow
  const idRow = fallbackTemplatesByLang.id ?? enRow
  const ptRow = fallbackTemplatesByLang.pt ?? enRow
  const frRow = fallbackTemplatesByLang.fr ?? enRow
  const deRow = fallbackTemplatesByLang.de ?? enRow
  const viRow = fallbackTemplatesByLang.vi ?? enRow
  const thRow = fallbackTemplatesByLang.th ?? enRow
  const hiRow = fallbackTemplatesByLang.hi ?? enRow
  return pickFortuneString(
    {
      ko: koRow?.[key],
      en: enRow?.[key],
      ja: jaRow?.[key],
      zh: zhRow?.[key],
      es: esRow?.[key],
      id: idRow?.[key],
      pt: ptRow?.[key],
      fr: frRow?.[key],
      de: deRow?.[key],
      vi: viRow?.[key],
      th: thRow?.[key],
      hi: hiRow?.[key],
    },
    language,
    `fallback:${key}`
  )
}

/** @deprecated Prefer getFallbackTemplate(lang) — Korean-only snapshot */
export const fallbackTemplates = fallbackTemplatesByLang.ko

// ─── Detailed Lifetime Fortune Templates (평생운 - 길이 있는 상세 버전) ────────

export const lifetimeDetailedTemplates = {
  ko: [
    '당신의 인생은 지속적인 성장과 변화의 흐름입니다. 초반부에는 기초를 다지는 시기로, 인내심과 노력이 필요합니다. 중반부에 접어들면서 그동안의 노력이 결실을 맺기 시작하며, 사람들과의 깊이 있는 관계 형성이 당신의 큰 자산이 될 것입니다. 후반부에는 지혜와 경험을 바탕으로 주변 사람들을 돕고 인도하는 역할을 하게 되며, 이를 통해 진정한 만족감을 얻을 것입니다. 재물운은 꾸준한 노력으로 안정적으로 증가하는 추세를 보이며, 특히 인간관계와 신용을 소중히 할 때 더욱 좋은 기회가 찾아올 것입니다.',
    
    '당신의 삶은 창의성과 도전정신이 주축을 이루는 여정입니다. 초기에는 다양한 경험을 통해 자신의 방향을 찾는 과정을 거치게 됩니다. 이 시기의 시행착오는 모두 자산이 되어, 중반부에 독자적인 길을 개척하게 만듭니다. 감정의 변화가 풍요롭지만 때로는 불안정할 수 있으니, 신뢰할 수 있는 사람들과의 연결이 중요합니다. 재물운은 흐름이 있어서 부침이 있겠지만, 창의적인 노력으로 새로운 수입원을 만들 기회가 많으며, 건강은 마음의 안정이 가장 중요한 요소입니다.',
    
    '당신의 인생은 차분한 안정감과 내면의 깊이가 특징입니다. 겉으로는 조용하지만 내면으로는 깊은 생각과 지혜를 지니고 있어, 주변 사람들에게 신뢰감을 주게 될 것입니다. 초반부의 신중함이 중반부의 성공을 만들며, 후반부에는 그 성공을 바탕으로 여유로운 삶을 누리게 됩니다. 인간관계에서는 수심이 깊어서 좋은 사람들만 남게 되며, 이들이 당신의 진정한 재산이 될 것입니다. 재물운은 안정적이고 꾸준하며, 건강은 정신력과 육체의 균형을 유지할 때 최상의 상태를 유지합니다.',
    
    '당신의 삶은 실천력과 행동력이 이끌어나가는 여정입니다. 계획하고 실행하는 능력이 뛰어나서, 자신이 목표한 것들을 대부분 이루게 될 것입니다. 초반부의 에너지가 중반부의 성과를 만들고, 후반부에는 그 경험으로 새로운 도전을 할 수 있는 용기가 생깁니다. 성격이 직설적이어서 때로는 주변과의 마찰이 있을 수 있으니, 타인을 배려하는 마음을 기르세요. 재물운은 활동적인 노력으로 만들어지며, 건강은 꾸준한 운동과 규칙적인 생활이 핵심입니다.',
    
    '당신의 인생은 조화와 균형을 추구하는 섬세한 흐름입니다. 대인관계에서 뛰어난 능력을 발휘하여 많은 사람들로부터 사랑받게 될 것입니다. 초반부에는 타인의 영향을 많이 받지만, 점차 자신의 중심을 잡아가며 독립적이 됩니다. 미적 감각과 직관력이 뛰어나서 창의적인 일에 소질을 보이며, 이것이 당신만의 길을 만들 수 있습니다. 재물운은 안정적이면서도 새로운 기회가 수시로 찾아오며, 건강은 정서적 안정이 가장 중요한 요소입니다.',
    
    '당신의 삶은 지혜와 통찰력으로 가득 찬 깊이 있는 여정입니다. 많은 경험 속에서 배우고 성장하며, 후반부에는 그 경험을 바탕으로 다른 사람들을 지혜롭게 이끌어갈 수 있습니다. 초반부의 시련은 후반부의 강점이 되며, 인생의 난제들을 통해 진정한 자신을 찾게 됩니다. 감정의 폭이 넓어서 공감 능력이 뛰어나며, 이것이 좋은 인간관계를 만듭니다. 재물운은 중반부부터 안정적으로 증가하며, 건강은 마음가짐이 육체의 상태를 결정합니다.',
  ],
  en: [
    'Your life flows through steady growth and change. Early years build foundations with patience; mid-life turns effort into deep bonds and assets; later years bring meaning through wisdom and helping others. Prosperity rises steadily when you honor trust and relationships.',
    'Creativity and courage shape your path. Early exploration and mistakes become assets that open an independent route by mid-life. Emotions run rich—stay anchored in reliable people. Income may fluctuate, yet creative work opens new streams; emotional calm anchors health.',
    'Calm depth defines you. Quiet on the outside yet thoughtful within, you earn trust. Early caution seeds mid-life success and later ease. Relationships filter to true allies—your greatest wealth. Money stays steady; balance mind and body for peak vitality.',
    'Action and execution carry you. You reach most goals you set; early drive becomes mid-life results and later courage for new leaps. Blunt honesty may spark friction—practice empathy. Prosperity follows effort; steady routines protect health.',
    'You seek harmony and balance. People are drawn to your care; you grow from influence toward independence. Strong aesthetics and intuition suit creative work. Money stays steady with fresh chances; emotional peace is the health key.',
    'Wisdom and insight fill your journey. Trials in youth become strengths later; empathy builds bonds. Prosperity firms from mid-life onward; mindset shapes how your body feels.',
  ],
  ja: [
    'あなたの人生は成長と変化の流れです。前半は忍耐と土台づくり、中盤で努力が人間関係という大きな資産に実り、後半は知恵で人を支えます。信頼と縁を重ねるほど金運も安定して伸びます。',
    '創造性と挑戦が軸です。初期の試行錯誤は中盤の独自の道につながります。感情の揺れには信頼できる人とのつながりが支えに。収入は波がありつつも創意で開け、心の安定が健康の要です。',
    '静かな深みと安定感が特徴です。内面の知恵で信頼を得て、前半の慎重さが中盤の成功と後半の余裕を生みます。人間関係は本当に大切な人だけが残ります。金運は着実、心身のバランスが鍵です。',
    '実行力が道を切り開きます。目標の多くを達成し、前半のエネルギーが中盤の成果、後半の新たな挑戦の勇気になります。言葉は角が立ちやすいので配慮を。金は行動力で育ち、規則正しい生活が健康の核です。',
    '調和とバランスを求めます。対人で愛され、徐々に自立へ。美的感覚と直感が創造の仕事に向きます。金運は安定しつつ機会も訪れ、情緒の安定が健康の要です。',
    '知恵と洞察力に満ちた旅です。前半の試練は後半の強みに変わり、共感が良い縁を生みます。中盤以降金運は安定して増え、心の持ち方が体の調子を決めます。',
  ],
  zh: [
    '你的人生在持续成长与变化中展开：前期打基础需耐心，中期努力化为深厚人脉与资产，后期以智慧助人并获得满足。珍惜信用与人缘，财运会稳步上升。',
    '创造与挑战是主轴。早期摸索会成为中期的独立之路；情绪起伏时请依靠可信的人。收入或有波动，但创意能带来新财源；内心安定是健康关键。',
    '你内敛而稳重，以深思赢得信任。前期的谨慎孕育中期成功与后期从容。人际关系会筛出真正的伙伴，那是你最宝贵的财富。财运平稳，身心平衡决定状态。',
    '实践力带你达成目标：前期冲劲化为中期成果与后期再挑战的勇气。直言可能引发摩擦，请多体谅他人。财富随努力而来，规律生活守护健康。',
    '你追求和谐，擅长经营关系，并逐渐找到自我中心。审美与直觉利于创作。财运稳中带机，情绪平稳是健康的核心。',
    '智慧贯穿人生：早年考验化为晚年力量，共情带来好人缘。中期起财运趋稳，心境决定身体感受。',
  ],
}

// ─── Comprehensive Yearly Fortune Templates (한해운 - 상세 버전) ──────────────

export const yearlyComprehensiveTemplates = {
  ko: [
    '올해는 당신의 인생에서 새로운 장(章)이 시작되는 의미 있는 해입니다. 지난해까지의 준비와 노력이 이 한 해의 토대가 되며, 1분기는 그 기초를 다지는 시기로 신중함이 중요합니다. 2분기부터는 본격적인 변화의 물결이 시작되어 많은 일들이 당신에게 유리하게 흘러갈 것이며, 특히 상반기 말에서 하반기 초로 접어드는 시점에 중요한 기회가 찾아올 것으로 예상됩니다. 재물운은 꾸준하게 증가하는 흐름이나 무리한 투자는 피하는 것이 좋습니다. 대인관계에서는 진정한 인연들이 더욱 가까워지고, 새로운 귀인도 나타날 것입니다. 건강은 규칙적인 관리로 최고의 컨디션을 유지할 수 있으며, 후반기에는 축복과 감사의 시간이 될 것입니다.',

    '올해는 당신의 능력이 최대한 발휘되고 인정받는 한 해가 될 것입니다. 상반기는 도전과 시도의 시기로, 새로운 영역에 발을 들이거나 기존의 틀을 벗어나는 변화가 일어날 수 있습니다. 이 시기의 결정과 행동이 하반기의 성과로 이어지므로 신중하되 주저하지 마세요. 3월에서 5월 사이에 특별한 기회나 제안이 들어올 가능성이 높으며, 이를 놓치지 말아야 합니다. 재정적으로는 안정적인 수입이 지속되면서도 새로운 수익 창출 기회가 나타나므로 현명한 판단이 필요합니다. 인간관계에서는 팀워크와 협력이 성공의 열쇠가 되며, 주변 사람들의 신뢰가 점점 높아질 것입니다. 건강은 전반적으로 좋으나 스트레스 관리에 신경을 써야 하며, 연말로 갈수록 성취감과 만족감으로 가득 찬 시간을 맞이할 것입니다.',

    '올해는 내적 성장과 변화의 년도입니다. 겉으로 드러나는 큰 변화보다는 마음속 깊은 곳에서 많은 일이 일어나게 되며, 이것이 내년 이후를 결정짓는 중요한 시간이 될 것입니다. 상반기는 자신을 돌아보고 성찰하는 기간으로, 현재의 삶에서 필요한 것과 버려야 할 것들을 구분하게 될 것입니다. 이 과정 속에서 새로운 관점과 지혜를 얻게 되며, 이는 하반기의 행동을 더욱 명확하고 단호하게 만들 것입니다. 재정적으로는 큰 변화가 없지만 안정적이며, 불필요한 지출을 줄이고 저축을 늘리기에 좋은 시기입니다. 인간관계에서는 표면적인 만남보다 깊이 있는 관계가 형성되며, 영적이거나 정신적인 활동이 도움이 될 것입니다. 건강은 마음의 안정이 무엇보다 중요하며, 명상이나 요가 같은 활동을 추천합니다. 조용하지만 의미 있는 한 해가 될 것입니다.',

    '올해는 행운과 기회가 집중된 매우 특별한 한 해입니다. 많은 일들이 당신에게 유리하게 진행될 것이며, 예상치 못한 좋은 소식들이 연이어 들어올 것으로 예상됩니다. 1월과 2월의 준비된 자세가 3월 이후의 큰 기회로 이어질 것이므로, 새해 초부터 확실한 목표를 세우고 준비하세요. 4월에서 7월 사이는 특히 강력한 성공의 기운이 따르므로, 이 시기를 활용해 중요한 결정을 내리거나 새로운 프로젝트를 시작하면 좋은 결과를 기대할 수 있습니다. 재정운이 뛰어난 한 해로, 새로운 투자나 사업이 성공할 가능성이 높으며, 예기치 못한 임금 인상이나 보너스가 있을 수 있습니다. 인간관계에서도 귀인의 도움이 크며, 새로운 인맥이 형성되어 앞으로의 인생에 긍정적인 영향을 미칠 것입니다. 건강하고 번영하는 한 해가 될 것이며, 연말에는 풍요로운 만족감을 느끼게 될 것입니다.',

    '올해는 도전과 성장의 시기입니다. 변화의 바람이 불어올 텐데, 이를 두려워하기보다는 성장의 기회로 받아들이는 자세가 중요합니다. 상반기는 새로운 것을 배우고 도전하는 시기로, 교육이나 자기계발에 투자하기에 좋습니다. 여름을 지나면서 그 노력의 성과가 나타나기 시작하며, 가을부터는 본격적인 결실의 시간을 맞이하게 됩니다. 재정적으로는 약간의 변동성이 있을 수 있지만, 전반적인 흐름은 상승하고 있으며 신중한 관리로 안정성을 유지할 수 있습니다. 인간관계에서는 기존의 관계가 더욱 단단해지는 한편, 새로운 사람들과의 만남도 있을 것입니다. 건강은 활동적인 생활 방식이 도움이 되므로, 운동이나 야외 활동을 자주 하는 것을 권장합니다. 결과적으로 이 한 해는 당신을 한 단계 높은 수준으로 이끌어 올릴 것입니다.',

    '올해는 안정과 조화를 찾는 의미 있는 한 해입니다. 지난 몇 년간의 분주함에서 벗어나 진정한 평온함을 경험할 수 있는 시기로, 이 침착함이 앞으로의 성공을 위한 튼튼한 기반이 됩니다. 상반기는 현재의 상황을 정리하고 재정렬하는 시간으로, 불필요한 것들을 정리하고 중요한 것에 집중해야 합니다. 하반기로 접어들면서 새로운 가능성이 보이기 시작하며, 이전과는 다른 관점에서 기회를 발견하게 될 것입니다. 재정운은 꾸준하고 안정적이며, 새로운 수입원이 생길 가능성도 있습니다. 가족과의 관계가 더욱 돈독해지고, 진정한 친구들의 가치를 깨닫는 시간을 가질 것입니다. 건강은 마음의 안정으로부터 비롯되므로, 스트레스 관리와 충분한 휴식이 중요합니다. 이 한 해는 내면의 풍요로움을 느끼는 시간이 될 것입니다.',

    '올해는 창의성과 표현의 시간입니다. 당신 안에 갇혀있던 새로운 아이디어나 재능이 표현될 기회가 주어지는 한 해로, 용기 있는 표현이 성공으로 이어질 것입니다. 1분기는 계획과 준비의 시기로, 당신의 비전을 명확히 하고 실행 계획을 세우세요. 봄과 여름을 거치면서 다양한 활동과 시도들이 이루어질 것이며, 이 과정에서 새로운 가능성들을 발견하게 될 것입니다. 특히 6월에서 9월 사이에 중요한 기회가 나타날 수 있으니, 항상 준비된 자세를 유지하세요. 재정운은 새로운 시도가 성공으로 이어지는 흐름이므로, 창의적인 부업이나 프로젝트에 좋은 결과를 기대할 수 있습니다. 인간관계에서는 같은 관심사를 가진 사람들을 만나게 되며, 이들이 당신의 성장을 도울 것입니다. 건강하고 영감으로 가득 찬 한 해가 될 것입니다.',

    '올해는 성숙함과 지혜가 발현되는 시간입니다. 인생의 경험이 쌓이면서 새로운 관점에서 세상을 보게 되며, 이러한 변화가 주변 사람들에게 긍정적인 영향을 미칠 것입니다. 상반기는 지난 시간을 돌아보고 정리하는 기간으로, 이 과정에서 중요한 교훈들을 얻게 될 것입니다. 하반기로 가면서 그러한 지혜를 바탕으로 새로운 도전을 시작하게 되며, 이전과는 다른 차원의 성공을 경험할 것입니다. 재정운은 안정적이면서도 꾸준한 증가 추세를 보이므로, 장기적인 투자나 계획이 좋은 결과를 줄 것입니다. 가족과 친구들과의 관계에서 깊이 있는 유대감을 느낄 것이며, 당신의 경험이 다른 사람들을 돕는 데 큰 역할을 하게 됩니다. 건강하고 의미 있는 한 해가 될 것입니다.',

    '올해는 회복과 재시작의 시간입니다. 지난 시간이 힘들었다면, 이 한 해는 그로부터 벗어나 새로운 시작을 하는 기회를 제공할 것입니다. 상반기는 치유와 회복에 집중해야 할 시기로, 자신을 돌보고 부족한 부분을 채우는 데 시간과 노력을 기울이세요. 심신의 안정이 이루어지면서 하반기부터는 자연스럽게 새로운 에너지가 생기기 시작할 것입니다. 새로운 기회들이 나타나기 시작하며, 이전에는 할 수 없었던 것들을 시도해볼 수 있을 것입니다. 재정적으로는 회복의 시간이므로 무리한 지출을 피하고 저축에 집중하는 것이 좋습니다. 인간관계에서는 진정한 지지자들의 소중함을 알게 될 것이며, 새로운 관계 형성의 기초도 마련될 것입니다. 마음이 편하고 희망 찬 한 해가 될 것입니다.',

    '올해는 번영과 풍요의 시간입니다. 재정운이 매우 좋아서 여러 방면에서 수입 기회가 생길 것이며, 새로운 사업이나 투자가 성공할 가능성이 높습니다. 1월부터 3월까지는 새로운 프로젝트를 시작하기에 좋은 시기이며, 4월 이후 그 결과가 가시화되기 시작할 것입니다. 특히 여름철에는 재정운이 절정에 달할 것으로 예상되므로, 중요한 결정이나 투자는 이 시기에 진행하는 것이 좋습니다. 다만 풍요로움 속에서도 감리를 잃지 않는 것이 중요하며, 무분별한 지출은 피해야 합니다. 인간관계도 좋아서 귀인의 도움을 받을 기회가 많으며, 비즈니스 파트너나 중요한 인맥이 형성될 것입니다. 건강을 잘 관리하면서 이 복의 시간을 누려야 할 것입니다. 풍요롭고 행운이 가득한 한 해가 될 것입니다.',

    '올해는 변화의 흐름 속에서 당신의 진정한 가치를 발견하는 한 해입니다. 많은 변화가 일어날 것이지만, 이는 모두 당신을 더 나은 방향으로 이끌어갈 것입니다. 상반기는 변화에 적응하는 시기로, 유연한 마음과 긍정적인 태도가 중요합니다. 당신이 예상하지 못했던 새로운 기회들이 나타나기 시작할 것이며, 이들을 올바르게 판단하고 선택하는 것이 중요합니다. 재정적으로는 변동성이 있을 수 있지만, 전반적으로는 상승하는 추세를 보일 것입니다. 신중한 재정 관리로 안정성을 유지하면서도 새로운 기회에 대비해야 합니다. 인간관계에서는 기존의 관계가 재정의되는 시간이 있을 것이며, 진정한 인연들은 더욱 가까워질 것입니다. 건강하고 성장 있는 한 해가 될 것입니다.',

    '올해는 꿈과 현실이 만나는 의미 있는 한 해입니다. 당신이 품었던 꿈이 현실로 이루어질 가능성이 높으며, 이를 위해서는 현실적인 노력과 준비가 필요합니다. 상반기는 꿈을 구체화하고 실행 계획을 세우는 시기로, 이 과정에서 필요한 지원과 도움을 받을 수 있을 것입니다. 여름을 지나면서 그 계획의 결과가 나타나기 시작하며, 가을에는 예상 이상의 성과를 경험할 수 있을 것입니다. 재정운은 꿈 실현을 위한 필요한 자원이 충분할 것으로 예상되며, 현명한 사용으로 더욱 큰 성과를 이룰 수 있습니다. 인간관계에서는 당신의 꿈을 응원하고 지원해주는 사람들이 나타날 것입니다. 희망과 설렘으로 가득한 한 해가 될 것이며, 연말에는 진정한 성취감을 느끼게 될 것입니다.',

    '올해는 소통과 이해가 깊어지는 한 해입니다. 인간관계에서 더욱 세심한 감정 교류가 이루어지며, 이를 통해 기존의 관계들이 한층 강화될 것입니다. 상반기는 타인과의 대화와 소통을 통해 새로운 관점을 얻는 시기로, 이는 당신의 내적 성장으로 이어질 것입니다. 하반기로 가면서 그러한 이해의 바탕 위에서 새로운 프로젝트나 계획들이 시작될 것이며, 더욱 큰 성공을 거두게 될 것입니다. 재정운은 안정적이면서도 새로운 수입 기회가 나타날 것으로 예상되며, 특히 사람 관계를 통한 기회가 많을 것입니다. 창의적인 활동이나 예술 분야에서의 성과도 기대할 수 있을 것입니다. 건강은 정서적 안정이 가장 중요하므로, 사랑하는 사람들과의 시간을 소중히 하세요. 따뜻하고 의미 있는 한 해가 될 것입니다.',

    '올해는 인내와 끈기가 보상받는 한 해입니다. 지난 시간 동안의 노력과 준비가 이제 본격적으로 열매를 맺기 시작할 시기로, 당신의 지속적인 노력이 결코 헛되지 않았음을 깨닫게 될 것입니다. 상반기는 아직도 마지막 마무리 단계이므로, 집중력을 유지하고 성급해하지 마세요. 여름 이후부터는 본격적인 성과가 나타나기 시작하며, 가을에는 예상을 뛰어넘는 결과를 경험할 수 있을 것입니다. 재정운이 꾸준하게 증가하는 흐름을 보이며, 노력에 따른 정당한 보상이 따를 것입니다. 인간관계에서도 당신의 성실함이 인정받아 더 많은 신뢰와 지지를 받을 것입니다. 건강하고 만족스러운 한 해가 될 것이며, 연말에는 진정한 보람과 행복을 느끼게 될 것입니다.',
  ],
}

export const yearlyDetailedTemplates = {
  ko: [
    '올해는 당신에게 새로운 시작과 전환의 해입니다. 지난 시간의 밑거름 위에서 새로운 발전이 시작되며, 많은 변화가 일어나겠지만 모두 긍정적인 방향으로 흘러갈 것입니다. 1분기는 계획과 준비의 시기로, 신중하게 기초를 다져야 합니다. 2분기에는 실행의 시간으로, 준비된 계획을 단계적으로 펼쳐나가세요. 3분기는 성과가 나타나는 시기로, 노력의 결실을 느끼게 될 것입니다. 4분기에는 정리와 정산의 시간으로, 올해를 되돌아보며 내년을 준비합니다. 재물운은 중반부에 특히 좋으니 중요한 결정은 그 시기에 하세요. 건강하고 행복한 한 해가 될 것입니다.',
    
    '올해는 당신의 노력이 정당한 평가를 받는 해입니다. 그동안 묵묵히 준비해온 일들이 주목받기 시작하며, 주변 사람들의 인정과 지지가 증가합니다. 상반기는 기존의 일에 집중하되, 새로운 기회에도 열린 마음을 가지세요. 하반기로 갈수록 새로운 방향으로의 도전이 나타날 것이며, 이를 긍정적으로 받아들이면 좋은 결과를 얻을 수 있습니다. 인간관계에서는 진정한 친구들이 드러나는 시기로, 깊이 있는 관계만 남게 됩니다. 재물운은 꾸준하게 증가하며, 특히 상반기에 중요한 재정 결정을 하면 좋을 것입니다. 건강하게 한 해를 마무리할 수 있을 것입니다.',
    
    '올해는 당신에게 안정과 조화가 찾아오는 해입니다. 지난날의 분주함에서 벗어나 내면의 평온함을 찾을 수 있는 시기로, 정신적 성숙이 이루어집니다. 상반기는 현재의 상황에 집중하되, 장기적인 계획을 세우는 데 시간을 쓰세요. 하반기는 그 계획을 실행에 옮기는 시기로, 인내심을 가지고 차근차근 진행하면 됩니다. 새로운 사람들과의 만남이 있을 것이고, 이들이 긍정적인 영향을 줄 것입니다. 재물운은 평탄하면서도 안정적이며, 큰 변화보다는 현재를 지키고 조금씩 증가시키는 전략이 좋습니다. 건강은 마음의 안정이 키포인트입니다.',
    
    '올해는 당신의 행운과 기회가 집중되는 해입니다. 많은 일들이 당신에게 유리하게 흘러갈 것이고, 예상치 못한 좋은 소식들이 연이어 들어올 것입니다. 초반부의 작은 결정이 큰 변화를 만들 수 있으니, 중요한 결정은 신중하게 하되 기회를 놓치지는 마세요. 중반부는 당신의 능력이 최대한 발휘되는 시기로, 이 시간을 활용해 성과를 만드세요. 후반부는 그 성과를 확대하고 내년을 준비하는 시간입니다. 재물운이 특히 좋은 해로, 투자나 새로운 시도가 좋은 결과를 줄 것입니다. 건강하고 풍요로운 한 해가 될 것입니다.',
    
    '올해는 당신에게 내적 성장과 깨달음이 찾아오는 해입니다. 겉으로 크게 드러나지 않을 수 있지만, 내면에서는 많은 변화가 일어나고 성숙해질 것입니다. 상반기는 자신을 돌아보고 정렬하는 시간으로, 불필요한 것들을 내려놓으세요. 하반기는 새로운 것을 받아들일 준비가 되는 시기로, 긍정적인 변화를 맞이할 준비를 하세요. 영적이거나 정신적인 활동이 도움이 될 것입니다. 재물운은 평탄하지만 안정적이며, 무리한 활동보다는 신중한 관리가 필요합니다. 건강하고 의미 있는 한 해가 될 것입니다.',
  ],
}

// ─── Detailed Monthly Fortune Templates (월별운세 - 길이 있는 상세 버전) ────────

export const monthlyDetailedTemplates = {
  ko: [
    '1월: 새로운 시작의 기운이 충만한 한 달입니다. 지난해의 정리를 마치고 새로운 목표를 설정하세요. 계획 수립이 중요하며, 신체와 정신을 정화하는 데 시간을 쓰는 것이 좋습니다. 재물운은 평탄하나 새로운 기회를 찾기에 좋은 시기입니다. 새로운 만남이나 기회를 놓치지 마세요.',
    
    '2월: 차분하고 내적 성장이 일어나는 한 달입니다. 겨울의 끝자락에서 봄을 준비하는 시기로, 조용히 준비하되 앞으로의 변화에 마음을 열어두세요. 인간관계에서 깊이 있는 만남이 있을 수 있습니다. 재물운은 조용하지만 안정적이며, 현재를 소중히 여기는 시기입니다.',
    
    '3월: 새로운 에너지와 활력이 돌아오는 한 달입니다. 봄의 시작과 함께 많은 변화가 일어나기 시작하며, 행동력을 발휘할 때입니다. 새로운 프로젝트나 계획을 시작하기에 좋은 타이밍입니다. 재물운이 상승하기 시작하니 활동적으로 움직이세요. 건강하게 계절의 변화에 적응하세요.',
    
    '4월: 성장과 발전이 가시화되는 한 달입니다. 3월에 시작한 일들이 가시적인 성과를 보이기 시작하며, 주변의 변화도 눈에 띕니다. 동료나 팀원과의 협력이 중요하며, 좋은 시너지를 만들 수 있는 시기입니다. 재물운은 좋으나 무리한 지출은 피하세요. 인간관계가 활발해지는 시기입니다.',
    
    '5월: 에너지와 열정이 최고조에 달하는 한 달입니다. 모든 일에 적극적으로 참여하고, 새로운 도전에 나서기에 좋은 시기입니다. 다만 과도한 활동으로 인한 피로에 주의하세요. 재물운이 좋아서 새로운 시도가 성공할 가능성이 높습니다. 건강관리에 신경을 써야 하는 시기입니다.',
    
    '6월: 성숙함과 조화가 찾아오는 한 달입니다. 5월의 활동이 일단락되고 정리하는 시간을 가지세요. 관계에서 깊이를 더하고, 지난 시간을 성찰할 좋은 시기입니다. 재물운은 평탄하지만 안정적이며, 현재를 만족하고 감사하는 마음이 중요합니다. 휴식과 회복이 필요한 시기입니다.',
    
    '7월: 변화와 새로운 가능성이 나타나는 한 달입니다. 날씨의 변화처럼 생활에도 변화가 생길 수 있으니 유연하게 대처하세요. 새로운 기회나 제안이 들어올 수 있으며, 신중한 판단이 필요합니다. 재물운은 변동성이 있으나 전체적으로는 좋습니다. 감정 변화가 있을 수 있으니 자신의 마음을 잘 다루세요.',
    
    '8월: 본격적인 활동과 도전이 이루어지는 한 달입니다. 여름의 한 가운데에서 당신의 열정과 에너지가 빛을 발합니다. 중요한 결정이나 행동에 좋은 시기이며, 주변의 협력도 따를 것입니다. 재물운이 크게 상승하는 시기로, 새로운 투자나 프로젝트가 좋은 결과를 가져올 것입니다. 에너지 관리가 중요합니다.',
    
    '9월: 성과가 맺어지고 정산하는 한 달입니다. 봄에 시작한 일들이 가을에 수확되는 시기로, 노력의 결실을 느낄 수 있습니다. 현재까지의 과정을 정리하고 다음 계획을 세우세요. 재물운이 좋으며, 지난 노력이 인정받는 시기입니다. 감사와 만족의 시간을 가지세요.',
    
    '10월: 가을의 깊이와 성숙이 드러나는 한 달입니다. 모든 것이 자신의 자리로 돌아가는 시기로, 질서와 조화가 이루어집니다. 인간관계에서 진정성이 드러나고, 진정한 친구들이 남게 될 것입니다. 재물운은 안정적이며, 현재의 상황에 감사하고 준비하는 시기입니다. 내적 평온함을 찾으세요.',
    
    '11월: 겨울을 향한 준비와 정리의 한 달입니다. 해가 마무리되어 가면서 지난 시간을 돌아보고 정산하는 시기입니다. 새로운 것을 더하기보다는 현재를 정리하고 다음을 준비하세요. 재물운은 평탄하나 안정적이며, 무리한 활동은 피하는 것이 좋습니다. 건강하고 의미 있는 마무리를 하세요.',
    
    '12월: 한 해를 완성하고 새로운 해를 준비하는 마지막 한 달입니다. 지난 시간 전체를 되돌아보고 감사하세요. 성취를 축하하고, 미흡한 부분은 내년의 목표로 삼으세요. 재물운은 좋으며, 새로운 시작을 위한 투자가 이루어질 시기입니다. 조용하고 의미 있는 마무리로 새로운 시작을 맞이하세요.',
  ],
}

/** Parallel to `yearlyComprehensiveTemplates.ko` (11 entries) for non-Korean yearly profile text. */
const yearlyComprehensiveEn: string[] = [
  'This year opens a meaningful new chapter. Early months reward careful foundations; from late spring into summer momentum builds and a decisive window appears. Income trends upward—avoid reckless bets. Genuine bonds draw closer and helpful allies arrive. Steady self-care keeps energy high, and the closing months feel full of gratitude.',
  'Your strengths surface and gain recognition. The first half favors bold tries in new areas; choices made then shape second-half wins. Watch March–May for offers. Cash flow stays workable while new earning angles appear—choose with clarity. Collaboration and trust climb; manage stress and finish the year with solid satisfaction.',
  'A year of inner growth more than loud headlines. The first half favors reflection—sort what to keep and release. New perspective steadies decisions after midyear. Money stays even and calm; trim waste and grow savings. Relationships deepen beyond small talk; quiet practices soothe the body. The year feels subtle yet deeply meaningful.',
  'Luck and openings cluster this year. January–February posture sets up a strong March onward. April–July carries peak momentum for launches and bold calls. Finances can spike—still spend with discipline. Mentors and fresh networks arrive; protect health amid the rush. Year-end feels abundant and bright.',
  'Challenge and growth travel together. Learning and skill investment shine in the first half; visible results gather after summer. Income may wobble but the slope points up—stay prudent. Old ties strengthen while new faces appear. Active routines keep you resilient; you step up a level by December.',
  'You seek calm and realignment. The first half clears clutter and restores order; the second half reveals new angles on old chances. Money stays steady with possible side streams. Family and close friends feel more precious. Rest and nervous-system care are medicine—inner richness grows.',
  'Creativity wants a voice. Q1 clarifies vision; spring and summer spread experiments—watch June–September for a pivot chance. Creative side work can pay; kindred spirits accelerate growth. Guard rest so inspiration stays sustainable; the year sparkles with ideas made real.',
  'Maturity and perspective lead. Early months review lessons; later months launch wiser moves than before. Long-range money plans pay off. Depth with family and friends matters; your experience helps others. Health stays sound when pace stays human; the year feels grounded and purposeful.',
  'Recovery and restart if you need them. First half heals and refills the tank; energy returns for new tries after midyear. Keep spending gentle and savings kind. Supporters show their worth; new trust begins. Hope feels lighter by winter.',
  'Prosperity season. New projects favor Jan–Mar launches; results show from April. Mid-summer can peak finances—choose wisely and avoid waste. Allies and partners multiply; steward health so you can enjoy the wave; fortune feels generous.',
  'Change reveals your value. Early months ask flexibility; unexpected doors still aim you upward. Cash flow may swing yet trends positive—keep reserves. Relationships redefine themselves; true bonds tighten. You grow steadier through motion.',
  'Dreams meet logistics. First half shapes plans and attracts help; summer shows early wins and autumn can exceed targets. Resources align with vision if you spend mindfully. Cheerleaders appear in your circle; hope and pride build toward year-end.',
  'Communication and empathy deepen ties. Dialogue in the first half widens perspective; joint projects bloom later. People-based income chances appear; creative arts may shine. Emotional steadiness is the health key—warm, meaningful months ahead.',
  'Patience finally pays. Early year still finishes old work—stay focused, not rushed. After summer results accelerate; autumn may surprise you. Income tracks effort upward; integrity wins trust. Healthy routines carry you to a fulfilled close.',
]

const yearlyComprehensiveJa: string[] = [
  '今年は新しい章が始まる意味のある年です。年初は土台づけ、春以降は勢いが増し、前半終わりから後半初めに重要な転機がありそうです。収入は着実に伸びますが無謀な投資は避け、本当の縁と協力者が近づきます。規則正しいセルフケアで後半は感謝に満ちた時間に。',
  '能力が認められやすい年です。前半は新分野への挑戦、夏以降に成果が結びつきます。3〜5月は提案に注意。収入は安定しつつ副線も。チームワークと信頼が鍵。ストレスを整え年末は達成感を。',
  '内面の成長が主役の年です。上半期は省察と整理、下半期は行動が明確に。お金は大きく動かず安定。表面的な付き合いより深い関係。瞑想や軽い運動が心身に効き、静かに濃い一年に。',
  '幸運とチャンスが集まる年です。1〜2月の準備が3月以降の大きな扉に。4〜7月は推進力最大。収入も上向きですが支出は節度を。貴人と新しい人脈。健康を守れば年末は豊かな満足感に。',
  '挑戦と成長の年です。学びや自己投資が前半、夏以降に実感。収入は変動あっても上昇基調。古い縁が強まり新しい出会いも。活動的な生活で体力を保てば一段上の自分へ。',
  '安定と再整理の年です。上半期は整理と優先順位、下半期に新しい見方で機会が。収入は堅実に、副収入の可能性も。家族や親友がより大切に。休息とストレス管理が健康の基盤、内面の豊かさが育ちます。',
  '創造と表現の年です。1四半期は構想、春夏に試行、6〜9月に転機の可能性。創造的な副業が実を結び、同好の人が成長を後押し。休息を挟みながら靈感を大切に。',
  '成熟と知恵の年です。上半期は振り返りと教訓、下半期は新たな挑戦が別次元の成果に。長期のお金の計画が実る。家族や友人との絆が深まり、経験が人助けに。無理のないペースが健康を守ります。',
  '回復と再出発の年です。上半期はケアと充填、下半期から新しいエネルギー。支出は控えめに、貯蓄を。支えてくれる人の価値が見え、新しい信頼の土台に。希望が戻る冬に。',
  '繁栄の年です。1〜3月に新規が有利で4月以降に可視化。夏は金運のピークも乱費は避け。協力者が増え健康を整えれば恵みを味わえます。',
  '変化の中で自分の価値を発見する年です。前半は適応力、思わぬチャンスは良い方向へ。お金は変動も上向き、準備が要る。関係は再定義され本物が近づく。成長と安定が両立します。',
  '夢と現実が接する年です。上半期は具体化と支援、夏に芽、秋には上振れの成果も。資源は夢に追いつくよう整え、応援団が現れます。希望と充実の年末に。',
  '対話と理解が深まる年です。上半期の会話が視野を広げ、下半期に共同の計画。人を介した収入チャンスや芸術の成果も。情緒の安定が健康の要、温かい一年に。',
  '忍耐が報われる年です。上半期は仕上げに集中、夏以降に成果加速、秋には驚く結果も。収入は努力に比例し誠実さが信頼を呼びます。規則正しい生活で充実の締めくくりに。',
]

const yearlyComprehensiveZh: string[] = [
  '今年是人生新篇章：年初宜打基础，春夏之交起势，上末下初有关键窗口。收入稳步上升但忌冒险投资，真情与贵人靠近。规律作息让身心稳健，年末多感恩与收获感。',
  '才华与付出被看见：上半年适合尝试新领域，决策影响下半年成果。留意三至五月的邀约。现金流稳且有增收可能，善用合作与信任，管理压力，年终更有成就感。',
  '偏内在成长的一年：上半年整理取舍，下半年行动更清晰。财务平稳宜节流增储。关系走向深度，静心活动有益身心，整体安静却厚重。',
  '机遇集中：一二月准备决定三月后的走势，四至七月利于推进与决断。财运上扬仍要节制，贵人与人脉增多，注意节奏与健康，年末丰盛感强。',
  '挑战与成长并行：上半年学习投入，夏秋见成果。收入或有波动但趋势向上。旧缘加固新缘出现，保持运动与节奏，年终能感到自我升级。',
  '求稳与重整：上半年清理与聚焦，下半年以新视角看见机会。财务稳健或有副业。亲情友情更珍贵，休息与减压是健康之本，内心更富足。',
  '表达与创造：一季度厘清愿景，春夏多尝试，六至九月或有转折。创意副业可期，同好相助。劳逸结合守住灵感与健康。',
  '阅历化为智慧：上半年沉淀教训，下半年开启更成熟的选择。长线财务易有回报，亲友羁绊加深，经验助人。节奏温和则身心皆安。',
  '疗愈与重启：上半年养精蓄锐，下半年能量回升。支出宜保守、储蓄为先，支持者更显珍贵，关系有新基础，心境转暖。',
  '丰盛之年：一至三月利于开局，四月后结果显现，夏季财运可能冲高，切忌挥霍。合作者增多，照顾好身体以承接好运。',
  '在变局中认清价值：上半年需弹性，意外之门仍偏利好。现金流或有起伏但整体向上，关系被筛选后更真，动中有进。',
  '梦想落地：上半年把愿景具体化并争取协助，夏秋见初步成绩，秋季或有超预期回报。资源与梦想匹配则事半功倍，身边多鼓励之声。',
  '沟通深化情感：上半年交流带来新视角，下半年适合共创项目。人脉带来机会，艺术或创作易有成绩，情绪稳定即健康关键，氛围温暖。',
  '耐力得回报：上半年仍在收尾，请专注勿躁，夏季后成果加速，秋季或有惊喜。收入随努力上升，诚信换信任，规律生活带来踏实收尾。',
]

export function getYearlyComprehensivePool(language: Language | string): string[] {
  const ext = yearlyComprehensiveTemplates as {
    es?: string[]
    id?: string[]
    pt?: string[]
    fr?: string[]
    de?: string[]
    vi?: string[]
    th?: string[]
    hi?: string[]
  }
  return pickFortunePool(
    {
      ko: yearlyComprehensiveTemplates.ko,
      en: yearlyComprehensiveEn,
      ja: yearlyComprehensiveJa,
      zh: yearlyComprehensiveZh,
      es: ext.es,
      id: ext.id,
      pt: ext.pt,
      fr: ext.fr,
      de: ext.de,
      vi: ext.vi,
      th: ext.th,
      hi: ext.hi,
    },
    language,
    'yearlyComprehensive'
  )
}

const yearlyDetailedEn: string[] = [
  'This year is a fresh pivot: Q1 plans, Q2 execution, Q3 visible wins, Q4 review. Mid-year favors key money moves. Stay hopeful and steady.',
  'Quiet work finally earns spotlight; first half doubles down, second half opens new lanes. True friends stay close. Wealth climbs—use the first half for big money choices.',
  'Calm returns after busy seasons. First half stabilizes and plans; second half executes patiently. New allies help. Money stays even—small steady gains beat risky leaps.',
  'Luck concentrates: small early choices ripple wide, mid-year shows peak skill, late year expands wins. Investments and tries lean positive—stay vigorous and grateful.',
  'Inner maturation: first half sheds weight, second half welcomes better habits. Spiritual or reflective practice helps. Money is flat yet safe—gentle management is enough.',
]

const yearlyDetailedJa: string[] = [
  '今年は新しい転換：1四半期は計画、2四半期は実行、3四半期に成果、4四半期は振り返り。中盤は金の決断に良し。',
  '地道な努力が評価に。上半期は集中、下半期に新方向。真の友人が残る。収入は上向き、上半期に大きな金判断を。',
  '忙しさから落ち着きへ。上半期は整えと計画、下半期は着実実行。新しい出会いが後押し。お金は平穏、小さく積むのが吉。',
  '幸運集中：小さな決断が波及、中盤に実力、後半に拡大。投資や挑戦は前向き。活力と感謝を。',
  '内面の成熟：上半期は手放し、下半期は良習慣。瞑想などが助けに。お金は安定、穏やかな管理で十分。',
]

const yearlyDetailedZh: string[] = [
  '今年是新的转折：一季度规划、二季度执行、三季度见果、四季度复盘。年中利于重要财务决定，保持乐观稳健。',
  '默默耕耘终被看见：上半年深耕，下半年有新方向。真朋友留下，财运上升，重要金钱安排宜放在上半年。',
  '从忙碌走向安定：上半年整理与规划，下半年耐心执行。新相识带来助力，财运平顺，以小步积累为佳。',
  '好运集中：早期小决定影响深远，年中发挥所长，后期扩大成果。投资与尝试偏正面，保持活力与感恩。',
  '内在成熟：上半年放下负担，下半年建立更好习惯，静心活动有助。财务平稳，温和管理即可。',
]

export function getYearlyDetailedPool(language: Language | string): string[] {
  const ext = yearlyDetailedTemplates as {
    es?: string[]
    id?: string[]
    pt?: string[]
    fr?: string[]
    de?: string[]
    vi?: string[]
    th?: string[]
    hi?: string[]
  }
  return pickFortunePool(
    {
      ko: yearlyDetailedTemplates.ko,
      en: yearlyDetailedEn,
      ja: yearlyDetailedJa,
      zh: yearlyDetailedZh,
      es: ext.es,
      id: ext.id,
      pt: ext.pt,
      fr: ext.fr,
      de: ext.de,
      vi: ext.vi,
      th: ext.th,
      hi: ext.hi,
    },
    language,
    'yearlyDetailed'
  )
}

const monthlyDetailedEn: string[] = [
  'January: Fresh-start energy. Close last year, set goals, cleanse body and mind. Money is steady—watch for openings; do not miss new ties.',
  'February: Quiet inner growth. Prepare for spring with patience; deeper talks may appear. Money is calm—value the present.',
  'March: Vitality returns with spring. Good moment to launch plans; income trends up—move actively and adapt to the season.',
  'April: Growth shows. Cooperation shines; mind spending while networking warms up.',
  'May: Peak passion—join boldly but watch fatigue. Money favors new tries; guard health.',
  'June: Mature harmony after May’s rush. Reflect in relationships; money is even—rest and gratitude help.',
  'July: Change and offers arrive—stay flexible. Money may swing yet stays favorable; steady your emotions.',
  'August: Bold action mid-summer—decisions and teamwork align. Income can jump—manage energy.',
  'September: Harvest and review—celebrate gains and plan next steps. Money acknowledges past effort.',
  'October: Autumn depth—order returns, true friends stand out. Money steadies; inner calm matters.',
  'November: Prep for winter—tidy accounts and pace. Money is flat-safe; avoid overwork.',
  'December: Close the year with gratitude, celebrate wins, set next goals. Money supports a quiet fresh start.',
]

const monthlyDetailedJa: string[] = [
  '1月：新しい始まりの気。去年を締め、目標を。心身を整え、出会いとチャンスを逃さず。',
  '2月：内面の成長。春へ静かに準備、対話が深まる。金運は穏やか、今を大切に。',
  '3月：春とともに活力。計画開始に良し、金運上昇、積極的に動き季節に順応を。',
  '4月：成長が見える。協力が鍵、支出に注意しつつ交流が活発に。',
  '5月：熱量最高、挑戦に良し。疲労注意。金運良好、健康管理を。',
  '6月：調和と整理。関係に深み、金運は平準、休息と感謝。',
  '7月：変化と提案。柔軟に。金は変動も好調、感情のコントロールを。',
  '8月：本格行動の夏。決断と協力、金運上昇、エネルギー配分を。',
  '9月：収穫と振り返り。次の計画を。金運良、努力が認められる。',
  '10月：秋の深み。秩序と誠実な縁。金運安定、内の平穏を。',
  '11月：冬支度と整理。無理なく締める。金運平坦で堅実。',
  '12月：一年の完了と感謝。来年の種まき。金運は新しい始まりを後押し。',
]

const monthlyDetailedZh: string[] = [
  '一月：新气象。总结去年、设定目标，净化身心。财运平稳，留意机会与人脉。',
  '二月：内敛成长。静待春来，或有深度交流。财运安静，珍惜当下。',
  '三月：春日活力。适合启动计划，财运回升，积极行动并顺应季节。',
  '四月：成长显化。协作重要，控制开支，社交升温。',
  '五月：热情高涨，勇于挑战，注意过劳。财运利于新尝试，关注健康。',
  '六月：沉淀与和谐。整理关系，财运平稳，休息与感恩。',
  '七月：变化与邀约，保持弹性。财运有波动仍偏佳，稳住情绪。',
  '八月：盛夏行动，利于决断与合作。财运上扬，管理好精力。',
  '九月：收获与复盘，感恩成果并规划下一步。财运认可过往努力。',
  '十月：深秋秩序，真诚之友更清晰。财运稳定，求内心安宁。',
  '十一月：入冬准备，整理与节制。财运平实，避免透支。',
  '十二月：收官与感恩，庆祝成就并设定新年方向。财运支持安静的新开始。',
]

export function getMonthlyDetailedLine(month: number, language: Language | string): string {
  if (month >= 1 && month <= 12) {
    return generateRichMonthlyFortune(month, month * 2003, language, 'total')
  }
  const idx = Math.max(0, Math.min(11, month - 1))
  const ext = monthlyDetailedTemplates as {
    es?: string[]
    id?: string[]
    pt?: string[]
    fr?: string[]
    de?: string[]
    vi?: string[]
    th?: string[]
    hi?: string[]
  }
  const pool = pickFortunePool(
    {
      ko: monthlyDetailedTemplates.ko,
      en: monthlyDetailedEn,
      ja: monthlyDetailedJa,
      zh: monthlyDetailedZh,
      es: ext.es,
      id: ext.id,
      pt: ext.pt,
      fr: ext.fr,
      de: ext.de,
      vi: ext.vi,
      th: ext.th,
      hi: ext.hi,
    },
    language,
    'monthlyDetailed'
  )
  return pool[idx] ?? ''
}

export type FortuneCategory = 'love' | 'wealth' | 'career' | 'health' | 'opportunity' | 'warning' | 'relationship'

export type LocalizedTemplatePool = Partial<Record<FortuneContentLanguage, string[]>>

export const loveFortuneTemplates: LocalizedTemplatePool = {
  ko: [
    '연애운이 상승하는 시기입니다. 새로운 만남의 기회가 찾아올 수 있습니다.',
    '현재의 인연을 소중히 여기세요. 작은 배려가 큰 사랑으로 발전합니다.',
    '감정 표현이 중요한 시기입니다. 솔직한 마음을 전하세요.',
    '기다림 속에서 예상치 못한 기쁨이 찾아옵니다.',
    '짝사랑이 있다면 용기를 내보세요. 긍정적인 신호가 있습니다.',
    '관계의 전환기입니다. 대화와 소통을 통해 깊이를 더하세요.',
    '연인과의 시간을 더 소중히 하세요. 함께의 가치를 느낄 것입니다.',
    '새로운 만남보다 현재를 돌보는 것이 중요합니다.',
    '연애에 주의가 필요한 시기입니다. 성급한 결정은 피하세요.',
    '독신이라면 자신을 더 사랑하세요. 그것이 진정한 매력입니다.',
  ],
  en: [
    'Love luck is rising—new encounters may appear.',
    'Cherish the bond you have; small kindness grows into deep love.',
    'This is a time to express feelings—share your heart honestly.',
    'While you wait, unexpected joy may still find you.',
    'If you have a crush, take a brave step—signals look positive.',
    'The relationship is at a turning point—deepen it through dialogue.',
    'Treasure time with your partner—you will feel the value of togetherness.',
    'Tending the present matters more than chasing someone new.',
    'Romance needs care now—avoid rash decisions.',
    'If you are single, love yourself first—that becomes your true charm.',
  ],
  ja: [
    '恋愛運が上昇中です。新しい出会いのチャンスが訪れるかもしれません。',
    '今の縁を大切に。小さな思いやりが大きな愛に育ちます。',
    '感情表現が大切な時期です。素直な気持ちを伝えましょう。',
    '待つ時間の中にも、思わぬ喜びが訪れます。',
    '片思いなら勇気を。前向きなサインがあります。',
    '関係の転換期です。対話で深みを増しましょう。',
    '恋人との時間を大切に。ふたりでいる価値を感じられます。',
    '新しい出会いより、今を育てることが大切です。',
    '恋愛では注意が必要です。性急な決断は避けましょう。',
    '独身なら、まず自分を愛してください。それが本当の魅力です。',
  ],
  zh: [
    '恋爱运势上升，可能出现新的缘分。',
    '请珍惜当下的缘分，小小的体贴会酝酿成更深的爱。',
    '这是重视情感表达的时期，请坦诚说出心声。',
    '在等待中，也可能迎来意想不到的快乐。',
    '若有暗恋，不妨勇敢一点，信号偏向积极。',
    '关系处于转折点，通过沟通能加深彼此。',
    '多珍惜与伴侣相处的时光，你会更体会相伴的意义。',
    '比起寻找新缘分，经营当下更重要。',
    '恋爱上需要谨慎，避免仓促决定。',
    '若单身，请先好好爱自己，那才是持久的魅力。',
  ],
}

export const wealthFortuneTemplates: LocalizedTemplatePool = {
  ko: [
    '재물운이 크게 상승하는 시기입니다. 새로운 수입 기회가 생길 수 있습니다.',
    '신중한 재정 관리가 필요합니다. 불필요한 지출은 피하세요.',
    '예상외의 임금 인상이나 보너스가 있을 수 있습니다.',
    '투자는 신중하게 접근하세요. 장기 계획이 효과적입니다.',
    '금전적 기회가 두 번 찾아옵니다. 첫 번째를 놓치지 마세요.',
    '저축을 늘릴 절호의 기회입니다. 미래를 위해 준비하세요.',
    '부업이나 사이드 프로젝트로 추가 수입을 얻을 수 있습니다.',
    '재물운이 안정적입니다. 현재의 계획을 유지하세요.',
    '예기치 않은 지출이 있을 수 있습니다. 여유 자금을 비축하세요.',
    '귀인의 도움으로 경제적 상황이 개선됩니다.',
  ],
  en: [
    'Wealth luck rises—new income chances may appear.',
    'Mindful money management matters; trim unnecessary spending.',
    'A raise or bonus may arrive sooner than you expect.',
    'Approach investments carefully; long-term plans work best.',
    'Money chances may knock twice—do not miss the first.',
    'A strong window to grow savings and prepare for the future.',
    'Side projects or freelance work can add useful income.',
    'Wealth flow stays steady—keep your current plan.',
    'Unexpected bills may appear—keep a cash cushion.',
    'Helpful people improve your financial outlook.',
  ],
  ja: [
    '金運が大きく上昇する時期です。新しい収入のチャンスがありそうです。',
    '慎重な家計管理が必要です。不要な出費は控えましょう。',
    '思わぬ昇給やボーナスがあるかもしれません。',
    '投資は慎重に。長期的な計画が効きます。',
    '金銭的チャンスが二度訪れます。最初を逃さないで。',
    '貯蓄を増やす好機です。未来のために備えましょう。',
    '副業やサイドプロジェクトで追加収入が得られます。',
    '金運は安定しています。今の計画を維持しましょう。',
    '思わぬ支出があるかもしれません。余資を確保を。',
    '貴人の助けで経済面が好転しそうです。',
  ],
  zh: [
    '财运明显上升，可能出现新的收入机会。',
    '需要谨慎理财，避免不必要开支。',
    '可能有意料之外的加薪或奖金。',
    '投资宜稳健，长期规划更有效。',
    '财务机会可能来两次，别错过第一次。',
    '这是增加储蓄、为未来准备的好时机。',
    '副业或兼职可能带来额外收入。',
    '财运平稳，维持现有计划即可。',
    '或有意外支出，建议预留流动资金。',
    '贵人相助，经济状况有望改善。',
  ],
}

export const careerFortuneTemplates: LocalizedTemplatePool = {
  ko: [
    '직업운이 상승하는 시기입니다. 승진이나 좋은 기회가 올 수 있습니다.',
    '현재 업무에 더 집중하세요. 성과가 인정받을 것입니다.',
    '동료와의 협력이 중요합니다. 팀워크가 성공의 열쇠입니다.',
    '새로운 도전을 시작하기에 좋은 시기입니다.',
    '스킬 개발에 투자하세요. 역량 강화가 미래를 좌우합니다.',
    '현재 직장에서의 만족도가 높아집니다.',
    '이직을 고려한다면 신중하게 결정하세요.',
    '업무에서 창의성이 돋보이는 시기입니다.',
    '상사와의 관계가 좋아집니다. 신뢰가 쌓입니다.',
    '프로젝트 성공의 기운이 있습니다.',
  ],
  en: [
    'Career luck rises—promotion or strong offers may come.',
    'Focus on current work; results will be noticed.',
    'Teamwork matters now—collaboration is the key to success.',
    'A good time to start a bold new challenge.',
    'Invest in skills—capability shapes your future.',
    'Satisfaction at your current workplace can grow.',
    'If you consider a move, decide with care.',
    'Creativity at work stands out now.',
    'Relations with leadership improve; trust builds.',
    'Project success is within reach.',
  ],
  ja: [
    '仕事運が上昇中です。昇進や良いチャンスがありそうです。',
    '今の業務に集中すれば成果が認められます。',
    '同僚との協力が重要です。チームワークが成功の鍵です。',
    '新しい挑戦を始めるのに良い時期です。',
    'スキル開発に投資を。力が未来を左右します。',
    '今の職場での満足度が高まります。',
    '転職を考えるなら慎重に決めましょう。',
    '仕事で創造性が光る時期です。',
    '上司との関係が良くなり、信頼が積み上がります。',
    'プロジェクト成功の気があります。',
  ],
  zh: [
    '事业运上升，可能有晋升或好机会。',
    '专注当下工作，成果会被看见。',
    '与同事协作很重要，团队合作是成功之钥。',
    '适合开启新的挑战。',
    '投资技能，能力决定未来走向。',
    '对现有工作的满意度会提升。',
    '若考虑跳槽，请慎重决定。',
    '工作中创意容易脱颖而出。',
    '与上司关系转好，信任逐步累积。',
    '项目成功的机会正在靠近。',
  ],
}

export const healthFortuneTemplates: LocalizedTemplatePool = {
  ko: [
    '건강운이 좋습니다. 활기찬 에너지로 가득합니다.',
    '규칙적인 운동과 식생활이 중요합니다. 건강한 습관을 만드세요.',
    '스트레스 관리가 필요한 시기입니다. 명상이나 휴식을 추천합니다.',
    '면역력이 약해질 수 있습니다. 예방에 신경 쓰세요.',
    '부상이나 질병에 주의하세요. 조심스러운 행동이 필요합니다.',
    '건강검진을 받기에 좋은 시기입니다.',
    '신체와 정신의 균형을 맞추세요.',
    '에너지 수준이 높아지는 시기입니다. 이 기간을 활용하세요.',
    '만성 질환이 있다면 관리에 신경 쓰세요.',
    '충분한 수면이 건강의 핵심입니다.',
  ],
  en: [
    'Health luck is strong—energy feels bright.',
    'Steady exercise and meals matter; build healthy habits.',
    'Manage stress—rest or quiet practice helps.',
    'Immunity may dip; focus on prevention.',
    'Mind injury or illness—move with care.',
    'A good window for checkups and screenings.',
    'Balance body and mind.',
    'Energy rises—use this stretch well.',
    'If you have a chronic issue, stay consistent with care.',
    'Sleep enough—it anchors everything else.',
  ],
  ja: [
    '健康運は良好です。活力に満ちた時期です。',
    '規則的な運動と食事が大切です。良い習慣を。',
    'ストレス管理が必要な時期です。休息や瞑想を。',
    '免疫力が落ちやすいので予防を意識を。',
    '怪我や病気に注意。無理な動きは避けましょう。',
    '健康診断を受けるのに良い時期です。',
    '心身のバランスを整えましょう。',
    'エネルギーが高まる時期です。活かしましょう。',
    '持病があるなら管理を怠らないで。',
    '十分な睡眠が健康の要です。',
  ],
  zh: [
    '健康运势不错，精力充沛。',
    '规律运动与饮食很重要，请养成好习惯。',
    '需要管理压力，冥想或休息会有帮助。',
    '免疫力可能偏弱，注意预防。',
    '留意受伤或疾病，行动宜谨慎。',
    '适合安排体检与健康检查。',
    '保持身心平衡。',
    '体能上升，好好利用这段时期。',
    '若有慢性病，请持续管理。',
    '充足睡眠是健康的核心。',
  ],
}

export const opportunityFortuneTemplates: LocalizedTemplatePool = {
  ko: [
    '좋은 기회가 여러 번 찾아올 시기입니다.',
    '한 번의 결정이 큰 변화를 만들 수 있습니다.',
    '예상치 못한 만남이 인생을 바꿀 수 있습니다.',
    '지금 취한 행동이 미래를 결정합니다.',
    '기회는 짧게 지나갑니다. 빠른 판단이 필요합니다.',
    '주변을 잘 살피세요. 기회는 이미 눈 앞에 있습니다.',
    '용기 있는 선택이 성공으로 이어집니다.',
    '지난 노력이 결실을 맺는 시기입니다.',
    '새로운 시작에 최적의 시기입니다.',
    '귀인의 도움으로 기회가 증가합니다.',
  ],
  en: [
    'Good chances may arrive more than once.',
    'One decision can shift your path in a big way.',
    'A surprise meeting may change your story.',
    'Actions you take now shape what comes next.',
    'Opportunities pass quickly—judgment must be swift.',
    'Look around carefully—the opening is already near.',
    'Brave choices lean toward success.',
    'Past effort finally bears fruit.',
    'Timing favors a fresh start.',
    'Helpful allies multiply your openings.',
  ],
  ja: [
    '良いチャンスが何度も訪れそうです。',
    '一度の決断が大きな変化を生むことがあります。',
    '思わぬ出会いが人生を変えるかもしれません。',
    '今の行動が未来を決めます。',
    'チャンスは短い。素早い判断が必要です。',
    '周りをよく見てください。機会はもう近くに。',
    '勇気ある選択が成功につながります。',
    'これまでの努力が実を結ぶ時期です。',
    '新しい始まりに最適な時期です。',
    '貴人の助けでチャンスが増えます。',
  ],
  zh: [
    '好机会可能不止一次出现。',
    '一次决定就可能带来很大变化。',
    '意外的相遇可能改变人生轨迹。',
    '当下的行动正在塑造未来。',
    '机会稍纵即逝，需要果断判断。',
    '多留意周遭，机会往往已在眼前。',
    '勇敢的选择更容易走向成功。',
    '过往努力正在结出成果。',
    '非常适合开启新篇章。',
    '贵人相助，机会随之增加。',
  ],
}

export const warningFortuneTemplates: LocalizedTemplatePool = {
  ko: [
    '신중함이 필요한 시기입니다. 성급한 결정은 피하세요.',
    '재정 거래에서 사기 위험이 있습니다. 검증을 충분히 하세요.',
    '인간관계에서 갈등이 생길 수 있습니다. 소통을 소중히 하세요.',
    '건강에 주의가 필요합니다. 정기적인 검진을 추천합니다.',
    '큰 결정은 미루는 것이 좋습니다. 시간을 두고 생각하세요.',
    '약속과 계약은 세부 사항을 꼼꼼히 확인하세요.',
    '감정적인 판단을 피하세요. 이성적으로 접근하세요.',
    '새로운 사업이나 투자는 신중하게 검토하세요.',
    '친한 사람과의 금전 거래는 피하세요.',
    '무리하지 마세요. 체력과 정신력을 보존하세요.',
  ],
  en: [
    'Caution matters—avoid hasty decisions.',
    'Money deals carry fraud risk—verify everything.',
    'Tension may appear in relationships—keep communication kind.',
    'Health needs attention—regular checkups help.',
    'Big choices benefit from more time—think twice.',
    'Read promises and contracts line by line.',
    'Do not let emotions steer major calls—stay rational.',
    'Review new ventures or investments carefully.',
    'Avoid mixing money with close friends if you can.',
    'Do not overextend—protect your body and focus.',
  ],
  ja: [
    '慎重さが必要な時期です。性急な決定は避けましょう。',
    '金銭取引には詐欺のリスクがあります。十分に確認を。',
    '人間関係で摩擦が出やすいです。対話を大切に。',
    '健康に注意が必要です。定期検診をおすすめします。',
    '大きな決断は時間を置いて考えましょう。',
    '約束と契約は細部まで確認を。',
    '感情に流されず理性的に。',
    '新規事業や投資は慎重に検討を。',
    '親しい人との金銭のやり取りは避けましょう。',
    '無理をせず、体力と集中を守って。',
  ],
  zh: [
    '需要谨慎，避免仓促决定。',
    '财务往来有诈骗风险，务必核实。',
    '人际关系可能出现摩擦，请重视沟通。',
    '健康需留意，建议定期体检。',
    '重大决定宜暂缓，多给自己思考时间。',
    '承诺与合同请逐条核对。',
    '避免让情绪主导重要判断，保持理性。',
    '新业务或投资务必审慎评估。',
    '尽量避免与亲友发生金钱往来。',
    '不要过度消耗，注意保存体力与精力。',
  ],
}

export const relationshipFortuneTemplates: LocalizedTemplatePool = {
  ko: [
    '가족과의 관계가 돈독해지는 시기입니다.',
    '친구와의 깊이 있는 대화가 필요합니다.',
    '오랜 친구와 다시 연락해보세요. 좋은 일이 생길 수 있습니다.',
    '새로운 인맥이 형성될 시기입니다. 좋은 사람들을 만나세요.',
    '선후배와의 관계에서 배울 점이 많습니다.',
    '팀 활동에서 리더십을 발휘하세요.',
    '갈등이 있는 관계를 회복할 기회입니다.',
    '주변 사람들의 도움이 큰 역할을 할 것입니다.',
    '네트워킹이 중요한 시기입니다.',
    '기존 관계를 더욱 소중히 하세요.',
  ],
  en: [
    'Family bonds can grow warmer now.',
    'A deep talk with a friend is overdue.',
    'Reach out to an old friend—good news may follow.',
    'New circles form—seek people who uplift you.',
    'Seniors and juniors both teach you something useful.',
    'Team settings reward steady leadership.',
    'A strained tie can heal if you try.',
    'People around you play a bigger role than you expect.',
    'Networking matters—show up and connect.',
    'Cherish relationships you already have.',
  ],
  ja: [
    '家族との絆が深まる時期です。',
    '友人との深い対話が必要です。',
    '久しぶりの友人に連絡を。良いことがあるかもしれません。',
    '新しい人脈ができる時期です。良い人と出会いましょう。',
    '先輩後輩から学ぶことが多いです。',
    'チーム活動でリーダーシップを発揮を。',
    '対立していた関係を修復するチャンスです。',
    '周囲の助けが大きな役割を果たします。',
    'ネットワークづくりが重要な時期です。',
    '今ある関係をより大切に。',
  ],
  zh: [
    '与家人关系可能更加紧密。',
    '需要与朋友进行更有深度的交流。',
    '不妨联系许久未见的朋友，或有好事发生。',
    '适合拓展新的人脉，多遇见正向的人。',
    '与前辈后辈相处都能学到东西。',
    '在团队活动中可发挥领导力。',
    '有机会修复曾有矛盾的关系。',
    '身边人的帮助会起到关键作用。',
    '拓展人脉很重要，多参与连结。',
    '请更加珍惜已有的关系。',
  ],
}

export const allTemplates: Record<FortuneCategory, LocalizedTemplatePool> = {
  love: loveFortuneTemplates,
  wealth: wealthFortuneTemplates,
  career: careerFortuneTemplates,
  health: healthFortuneTemplates,
  opportunity: opportunityFortuneTemplates,
  warning: warningFortuneTemplates,
  relationship: relationshipFortuneTemplates,
}

function pickLocalizedPool(pool: LocalizedTemplatePool, language: string): string[] {
  return pickFortunePool(pool, language, 'template')
}

/**
 * 템플릿 풀에서 인덱스에 해당하는 템플릿 가져오기
 * @param category 운세 카테고리
 * @param index 템플릿 인덱스
 * @param language 언어
 */
export function getTemplateByIndex(category: FortuneCategory, index: number, language: string = 'ko'): string {
  const templates = pickLocalizedPool(allTemplates[category], language)
  return templates[index % templates.length]
}

/**
 * 카테고리의 총 템플릿 개수
 */
export function getTemplateCount(category: FortuneCategory): number {
  return allTemplates[category].ko.length
}

/**
 * 월별운세 심화 데이터
 * 각 월별로 3~5문장의 상세한 운세를 제공합니다
 */

type MonthlyFortuneMap = Record<number, Record<'ko' | 'en', string>>

export const monthlyFortunes: MonthlyFortuneMap = {
  1: {
    ko: '새로운 한해의 시작입니다. 명확한 목표를 세우고 실행 계획을 짜는 것이 중요합니다. 이 시기의 결정과 행동이 한 해 전체의 방향을 결정하므로 신중하게 접근하세요. 재물운으로는 계획적인 투자와 저축이 좋으며, 인간관계는 새로운 만남의 시기입니다. 작은 기회도 놓치지 마세요.',
    en: 'The beginning of a new year. Setting clear goals and making action plans is crucial. Decisions and actions in this period will determine the direction of your entire year. Financial fortune favors planned investment and savings. It\'s a time for new relationships. Don\'t miss any opportunities.'
  },
  2: {
    ko: '정적이고 사려 깊은 시간의 시기입니다. 지난 한 달을 되돌아보고 전략을 다시 정리하세요. 대인관계에서는 진심 있는 소통이 중요하며, 오해를 풀 수 있는 좋은 시기입니다. 건강면에서는 면역력 강화에 신경 쓰고, 재물운은 평탄하지만 부업으로 새로운 기회를 찾을 수 있습니다. 조용하지만 충실한 달입니다.',
    en: 'A period of quietness and thoughtfulness. Review the past month and reorganize your strategy. Sincere communication is important in relationships, and this is a good time to resolve misunderstandings. Focus on strengthening immunity for health. Financial fortune is steady, but new opportunities can be found in side work. A quiet but fulfilling month.'
  },
  3: {
    ko: '새로운 시작의 기운이 다시 찾아옵니다. 겨울을 지나고 봄이 오는 것처럼 성장의 시기가 시작됩니다. 새로운 프로젝트나 사업을 시작하기에 매우 좋은 달입니다. 인간관계에서는 넓은 네트워크 형성이 가능하고, 애정운도 상승합니다. 주의할 점은 너무 성급해지지 않는 것입니다. 신중함과 균형을 유지하세요.',
    en: 'The energy of new beginnings returns. Like spring following winter, a period of growth begins. An excellent month to start new projects or business. Building a wider network is possible in relationships, and romantic fortune rises. Be careful not to rush. Maintain caution and balance.'
  },
  4: {
    ko: '활발한 행동과 변화의 달입니다. 지금까지 준비한 것들을 실행에 옮길 때입니다. 재물운이 상승하고 새로운 수입원이 생길 수 있습니다. 직장이나 사업에서 성과를 낼 수 있는 시기이므로 집중력을 발휘하세요. 다만 과로로 인한 건강 악화에 주의하고, 대인관계에서는 겸손을 잊지 마세요. 성공의 문이 활짝 열려 있습니다.',
    en: 'A month of active action and change. It\'s time to implement what you\'ve prepared so far. Financial fortune rises and new income sources may appear. This is a time when you can achieve results in work or business, so focus your concentration. However, be careful of health problems from overwork, and don\'t forget humility in relationships. The door to success is wide open.'
  },
  5: {
    ko: '안정과 번영의 시간입니다. 4월의 활동이 좋은 결과로 나타나는 달입니다. 재무 상태가 개선되고 신뢰받는 위치로 올라갈 수 있습니다. 가족 관계가 원만하고 중요한 결정을 내리기에 좋은 시기입니다. 건강운도 양호하지만, 긴장을 풀고 충분한 휴식을 취하는 것이 중요합니다. 이 시기의 노력은 장기적인 성과로 이어집니다.',
    en: 'A time of stability and prosperity. The activities of April show good results this month. Your financial situation improves and you can rise to a trusted position. Family relationships are harmonious, and it\'s a good time to make important decisions. Health fortune is good, but it\'s important to relax and get adequate rest. Efforts during this period lead to long-term results.'
  },
  6: {
    ko: '변화의 바람이 부는 시기입니다. 어떤 전환점이나 선택의 기로에 놓일 수 있습니다. 너무 급격한 변화는 피하고 신중하게 결정하세요. 인간관계에서는 솔직한 대화가 중요하고, 오해가 있다면 이 시기에 풀어야 합니다. 재물운은 보수적인 관리가 필요하고, 건강면에서는 스트레스 관리가 중요합니다. 변화를 받아들이되 현명하게 대처하세요.',
    en: 'A period when winds of change blow. You may face a turning point or choice. Avoid sudden changes and decide carefully. Honest conversation is important in relationships, and misunderstandings should be resolved now. Conservative financial management is needed, and stress management is important for health. Accept change but deal with it wisely.'
  },
  7: {
    ko: '열정과 표현의 달입니다. 자신의 의견과 감정을 적극적으로 표현할 수 있는 시기입니다. 창의적인 활동이나 새로운 취미를 시작하기에 좋고, 애정운이 매우 높습니다. 다만 감정적 표현이 과할 수 있으니 절제를 잊지 마세요. 재물운은 투기를 피하고 안정적인 투자에 집중하세요. 주변 사람들과의 관계도 활발해지는 사회성의 달입니다.',
    en: 'A month of passion and expression. A time when you can actively express your opinions and feelings. It\'s good to start creative activities or new hobbies, and romantic fortune is very high. However, don\'t forget moderation as emotional expression may be excessive. For financial fortune, avoid speculation and focus on stable investment. It\'s a social month when relationships with those around you become more active.'
  },
  8: {
    ko: '수확과 결산의 달입니다. 상반기의 노력이 좋은 결과로 나타나는 시기입니다. 재물운이 상승하고 예상치 못한 이득이 있을 수 있습니다. 명예나 인정을 받을 가능성이 높으니 자신감을 가지세요. 가족과의 관계도 돈독해지고, 중요한 계약이나 협상에 유리합니다. 이 시기의 성공은 하반기의 발판이 됩니다. 감사의 마음을 잊지 마세요.',
    en: 'A month of harvest and settlement. A time when efforts in the first half bear fruit. Financial fortune rises and unexpected gains are possible. There\'s a high chance of recognition and honor, so be confident. Family relationships deepen, and important contracts or negotiations are favored. Success this month becomes the foundation for the second half. Don\'t forget gratitude.'
  },
  9: {
    ko: '변화와 정리의 시간입니다. 여름의 열정에서 벗어나 차분해지는 시기입니다. 불필요한 것들을 정리하고 앞으로의 계획을 재점검하세요. 새로운 학습이나 자기개발에 집중하기 좋은 달입니다. 인간관계에서는 깊이 있는 관계 형성에 유리하고, 혼자만의 시간도 중요합니다. 재물운은 보수적이지만 지속적인 성장이 예상됩니다. 내면의 성장에 집중하세요.',
    en: 'A time of change and organization. Moving away from summer passion to become calm. Organize unnecessary things and recheck your plans. It\'s a good month to focus on new learning or self-development. It\'s favorable for forming deeper relationships, and personal time is also important. Financial fortune is conservative but steady growth is expected. Focus on inner growth.'
  },
  10: {
    ko: '안정과 수확의 달입니다. 3월 이후 준비한 것들이 성숙해지는 시기입니다. 재물운이 좋고 투자의 수익이 나타날 수 있습니다. 사업이나 직장에서 중요한 프로젝트 완료에 유리한 시기입니다. 건강운도 양호하고 전반적인 운이 상승합니다. 다만 성공에 취해 겸손을 잃지 말고, 주변 사람들과의 관계 유지에 신경 쓰세요. 조화와 균형이 중요한 달입니다.',
    en: 'A month of stability and harvest. A time when things prepared since March mature. Financial fortune is good and investment returns may appear. It\'s a favorable time for completing important projects in business or work. Health fortune is good and overall luck rises. However, don\'t lose humility to success, and take care of relationships with those around you. Balance and harmony are important this month.'
  },
  11: {
    ko: '성찰과 준비의 달입니다. 한해를 마무리하면서 지난 일들을 정리하고 내년을 준비할 시간입니다. 재물운은 평탄하지만 다음해의 투자 기회를 살펴보는 것이 좋습니다. 인간관계에서는 소중한 사람들에게 감사를 표현하세요. 건강면에서는 피로가 쌓일 수 있으니 충분한 휴식이 필요합니다. 내적 성찰을 통해 마음의 충만함을 찾으세요. 차분한 마음으로 한해를 마무리하세요.',
    en: 'A month of reflection and preparation. It\'s time to organize past events while concluding the year and prepare for next year. Financial fortune is steady, but it\'s good to look for investment opportunities for the coming year. Express gratitude to loved ones in relationships. Fatigue may accumulate for health, so adequate rest is needed. Find peace of mind through inner reflection. Conclude the year with a calm heart.'
  },
  12: {
    ko: '마무리와 새로운 시작의 달입니다. 한해를 완성하고 새로운 해를 맞이할 준비를 하세요. 지난 한해 동안의 성과를 정산하고 감사를 느껴보세요. 재물운은 정리와 정산의 시기이며, 남은 계획을 마무리하는 것이 중요합니다. 가족과 친구들과의 시간을 소중히 하고, 새로운 해에 대한 희망을 가져보세요. 이 시기의 준비가 내년의 성공을 결정합니다. 감사와 희망으로 새해를 맞이하세요.',
    en: 'A month of conclusion and new beginnings. Prepare to complete the year and welcome the new year. Take stock of achievements over the past year and feel gratitude. Financial fortune is a time of settlement and completion, and finishing remaining plans is important. Cherish time with family and friends, and have hope for the new year. Preparation during this period determines success next year. Welcome the new year with gratitude and hope.'
  }
}

export function getMonthlyFortune(month: number, language: 'ko' | 'en' = 'ko'): string {
  const fortune = monthlyFortunes[month]
  if (!fortune) {
    return language === 'ko' 
      ? '유효한 월별운세 정보를 찾을 수 없습니다.'
      : 'Monthly fortune information not available.'
  }
  return fortune[language]
}

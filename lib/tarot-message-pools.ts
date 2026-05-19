import type { Language } from './i18n'
import type { FortuneContentLanguage } from './fortune-generator'
import { pickFortunePool } from './fortune-generator'
import { attachEsIdToRecord } from './fortune-lang-extend'
import { tarotPoolsEsId } from './fortune-pools-es-id'

export type TarotMessagePools = Partial<Record<FortuneContentLanguage, string[]>>

export function pickTarotParagraph(pools: TarotMessagePools, language: Language, index: number): string {
  const chosen = pickFortunePool(pools, language, 'tarot')
  if (!chosen.length) return ''
  return chosen[index % chosen.length] ?? ''
}

export const totalPools: TarotMessagePools = {
  ko: [
    '지금은 당신의 직관이 그 어느 때보다 예민한 시기입니다. 다가오는 중요한 결정에서 머리보다 마음의 소리에 귀 기울이세요. 당신 안에 이미 답이 있습니다. 외부의 조언도 좋지만, 최종 결정은 당신의 내면에서 나와야 합니다.',
    '새로운 기회의 문이 활짝 열리고 있습니다. 지금까지의 노력이 결실을 맺을 때가 다가오고 있으니, 두려워하지 말고 그 문을 향해 한 발짝 내딛으세요. 변화는 때로 두렵지만, 그 안에 당신이 원하던 것이 숨어 있습니다.',
    '현재 겪고 있는 어려움은 일시적인 것입니다. 어둠이 깊을수록 새벽은 가까이 있다는 것을 기억하세요. 이 시간을 버티고 나면 더 강해진 자신을 발견하게 될 것입니다. 지금 가장 필요한 것은 인내와 자기 신뢰입니다.',
    '꾸준히 쌓아온 당신의 노력이 드디어 빛을 발할 때가 왔습니다. 주변에서 당신의 진가를 알아보는 사람들이 나타날 것이며, 예상치 못한 곳에서 인정을 받게 될 것입니다. 자만하지 말고 겸손한 자세를 유지하세요.',
    '인간관계가 당신 인생의 핵심 열쇠가 되는 시기입니다. 가족, 친구, 동료와의 관계를 돌아보고 소홀했던 부분이 있다면 다시 연결하세요. 진정한 풍요로움은 물질이 아닌 사람과의 유대에서 옵니다.',
    '내면의 목소리가 당신에게 중요한 메시지를 전하고 있습니다. 바쁜 일상에서 잠시 멈추어 명상이나 산책을 통해 자신과 대화하는 시간을 가지세요. 그 속에서 오랫동안 찾던 해답을 발견하게 될 것입니다.',
    '변화가 두렵게 느껴질 수 있지만, 지금 일어나고 있는 변화는 당신을 위한 것입니다. 익숙한 것을 놓아버리고 새로운 것을 받아들일 준비를 하세요. 이 변화의 끝에는 더 나은 당신이 기다리고 있습니다.',
    '지금은 서두르지 말고 신중하게 준비하는 시기입니다. 큰 계획이 있다면 세부적인 것까지 꼼꼼히 점검하세요. 철저한 준비가 성공의 90%를 결정합니다. 기다림도 하나의 실력입니다.',
  ],
  en: [
    'Your intuition is sharper than usual. For the next important decision, listen to your heart as much as your head. The answer is already inside you. Outside advice can help, but the final choice should come from within.',
    'A door of new opportunity is wide open. The effort you have built is about to bear fruit—take one brave step toward that door without fear. Change can be frightening, but what you long for may be waiting on the other side.',
    'What you are going through now is temporary. Remember: the deeper the night, the closer the dawn. After you endure, you will meet a stronger version of yourself. What you need most now is patience and self-trust.',
    'The steady work you have invested is finally ready to shine. People will begin to see your true worth, and recognition may arrive from an unexpected place. Stay humble and avoid complacency.',
    'Relationships are becoming a master key in your life. Look back at family, friends, and colleagues—reconnect where you have grown distant. True abundance often comes from bonds with people, not from things alone.',
    'Your inner voice is carrying an important message. Pause your busy routine; meditation or a walk can open a real conversation with yourself. You may find answers you have sought for a long time.',
    'Change may feel scary, but what is unfolding now is meant for your growth. Let go of the overly familiar and open yourself to the new. A better version of you waits beyond this shift.',
    'This is a season to prepare rather than rush. If you have a big plan, check the details carefully. Thorough preparation decides most of success. Waiting well is also a skill.',
  ],
  ja: [
    '今は直感がいつにも増して鋭い時期です。重要な決断では頭だけでなく心の声にも耳を澄ませてください。答えはすでにあなたの内側にあります。外の助言も大切ですが、最終的な選択は内面から生まれるべきです。',
    '新しいチャンスの扉が大きく開いています。これまでの努力が実を結ぶ時が近づいています。恐れずに一歩踏み出してください。変化は怖く感じることもありますが、その先に望んでいたものが隠れているかもしれません。',
    '今直面している困難は一時的なものです。夜が深いほど夜明けは近いことを忘れないでください。この時間を越えたあなたは、より強い自分に出会えます。今いちばん必要なのは忍耐と自己信頼です。',
    '地道に積み上げてきた努力がついに光を放つ時が来ました。周囲があなたの本質を見抜き、思いがけない場所から評価が届くでしょう。慢心せず、謙虚さを保ってください。',
    '人間関係が人生の核となる鍵になる時期です。家族・友人・同僚とのつながりを振り返り、疎遠になったところがあれば再接続してください。本当の豊かさは物より人との絆から生まれます。',
    '内なる声が大切なメッセージを届けています。忙しい日常から少し立ち止まり、瞑想や散歩で自分と対話する時間を持ってください。そこに長く探していた答えが見つかるかもしれません。',
    '変化は怖く感じることもありますが、今起きている変化はあなたのためのものです。慣れにしがみつかず、新しいものを受け入れる準備をしてください。この変化の先には、よりよいあなたが待っています。',
    '今は急がず、慎重に準備する時期です。大きな計画があるなら細部まで点検してください。周到な準備が成功の多くを決めます。待つことも立派な力です。',
  ],
  zh: [
    '此刻你的直觉比以往更敏锐。面对重要决定时，请多倾听内心，而不只依赖理性。答案其实早已在你心中。外界的建议有帮助，但最终选择应来自你的内在。',
    '新的机会之门已经敞开。你长期积累的努力即将结出果实，请鼓起勇气向前迈出一步。变化有时令人害怕，但你渴望的东西也许就藏在门的另一侧。',
    '你正在经历的困难是暂时的。请记住：夜越深，黎明越近。挺过这段时间，你会遇见更坚强的自己。此刻你最需要的是耐心与对自己的信任。',
    '你持续付出的努力终于要发光。会有人看见你的价值，认可也可能来自意想不到的地方。请保持谦逊，不要自满。',
    '人际关系正成为你人生的关键钥匙。回顾家人、朋友与同事，若曾有疏忽，请重新连结。真正的丰盛往往来自人与人的纽带，而不只是物质。',
    '你内心的声音正在传递重要信息。在忙碌中暂停片刻，用冥想或散步与自己对话，你可能会找到寻觅已久的答案。',
    '变化可能令人不安，但正在发生的事是为了你的成长。放下过度熟悉的事物，准备接纳新的可能。在这次转变之后，更好的你在等待。',
    '这是适合准备而非急躁推进的阶段。若有重大计划，请仔细检查细节。扎实的准备决定成功的大部分。善于等待也是一种能力。',
  ],
}

export const wealthPools: TarotMessagePools = {
  ko: [
    '재정적으로 중요한 분기점에 서 있습니다. 지출을 관리하면서도 가치 있는 투자에는 과감해지세요. 너무 보수적이면 기회를 놓치고, 너무 공격적이면 위험에 노출됩니다. 균형 잡힌 재정 전략이 필요한 때입니다.',
    '예상치 못한 곳에서 재정적 기회가 찾아올 수 있습니다. 평소 관심 있던 분야나 인맥을 통해 좋은 소식이 올 수 있으니, 열린 마음으로 새로운 제안을 검토해보세요. 단, 충분한 검토 없이 서두르지 마세요.',
    '장기적인 관점에서 재정을 바라볼 시기입니다. 당장의 이익보다는 미래를 위한 저축과 투자에 집중하세요. 지금 심는 씨앗이 몇 년 후 큰 나무가 될 것입니다. 복리의 힘을 믿으세요.',
    '부업이나 새로운 수입원을 진지하게 고려해볼 만한 시기입니다. 당신의 취미나 특기가 수익으로 연결될 가능성이 있습니다. 작은 시작이 큰 변화를 만들 수 있으니, 첫 걸음을 내딛어 보세요.',
    '재물운이 상승하는 시기입니다. 하지만 돈이 들어온다고 해서 무분별하게 사용하지 마세요. 들어오는 만큼 관리하는 것이 중요합니다. 재정 관리 앱이나 가계부를 활용해 수입과 지출을 체계적으로 관리하세요.',
    '금전적인 결정을 내리기 전에 충분히 조사하고 전문가의 조언을 구하세요. 지금은 감정보다 이성적인 판단이 필요한 시기입니다. 서류의 작은 글씨까지 꼼꼼히 읽고, 계약 조건을 명확히 이해하세요.',
    '절약과 지출 사이에서 균형을 찾아야 합니다. 지나친 절약은 삶의 질을 떨어뜨리고, 과도한 지출은 미래의 안정을 해칩니다. 필요와 욕구를 구분하고, 현명한 소비를 실천하세요.',
    '지금 하고 있는 일에 최선을 다하세요. 성실함이 재정적 보상으로 돌아올 것입니다. 승진이나 보너스의 기회가 다가오고 있으며, 당신의 노력을 인정받게 될 것입니다.',
  ],
  en: [
    'You stand at an important financial turning point. Manage spending, yet be willing to invest where there is real value. Being too conservative can mean missed chances; being too aggressive can expose you to risk. A balanced money strategy matters now.',
    'Financial opportunity may arrive from an unexpected direction. Good news can come through interests or connections you already have—review new proposals with an open mind, but do not rush without due diligence.',
    'This is a time to see money with a long-term lens. Focus on saving and investing for the future more than on quick wins. Seeds you plant now can grow into something large over the years. Trust the quiet power of compounding.',
    'A side project or new income stream is worth serious thought. A hobby or strength could turn into revenue. A small first step can still start a big change—try taking that step.',
    'Money luck is rising, but inflows still need discipline. Do not spend carelessly just because cash moves faster. Track income and expenses clearly—apps or a simple ledger can help you stay organized.',
    'Before major money decisions, research thoroughly and seek expert advice when needed. Cool judgment beats impulse now. Read the fine print and make sure you truly understand contract terms.',
    'Find balance between saving and spending. Extreme thrift can lower your quality of life; overspending can harm future stability. Separate needs from wants and practice mindful spending.',
    'Give your best to the work in front of you. Steadiness tends to return as financial reward. Promotion or bonus chances may be near, and your effort is more likely to be recognized.',
  ],
  ja: [
    '金銭面で重要な分岐点に立っています。支出は管理しつつ、価値のある投資には勇気を持ってください。保守的すぎると機会を逃し、攻めすぎるとリスクが増えます。バランスの取れた資金計画が求められる時です。',
    '思いがけないところから金銭的なチャンスが来るかもしれません。関心のある分野や人脈から良い知らせが届くことも。新しい提案は前向きに検討しつつ、十分な確認なしに急がないでください。',
    'お金を長期的な視点で見る時期です。目先の利益より、将来のための貯蓄と投資に力を入れましょう。今蒔いた種は数年後に大きな木になります。複利の力を信じてください。',
    '副業や新しい収入源を真剣に考える価値があります。趣味や特技が収益につながる可能性があります。小さな一歩が大きな変化を生むこともあるので、最初の一歩を踏み出してみてください。',
    '金運が上昇する時期ですが、入ってきたからといって無計画に使わないでください。入金と同じくらい管理が大切です。家計簿やアプリで収支を整理しましょう。',
    '金銭的な決断の前には十分に調べ、必要なら専門家の意見も聞いてください。今は感情より冷静な判断が求められます。細かい条項まで読み、契約内容をはっきり理解しましょう。',
    '節約と支出のバランスが必要です。過度な節約は生活の質を下げ、使いすぎは将来の安定を損ないます。必要と欲を区別し、賢い消費を心がけてください。',
    '今の仕事に誠実に取り組んでください。まじめさは金銭的な報いとして返ってきます。昇進やボーナスの機会が近づいており、努力が認められやすい時です。',
  ],
  zh: [
    '你正站在重要的财务转折点上。既要管理支出，也要在真正有价值的投资上果断一些。过于保守可能错失机会，过于激进则可能暴露风险。现在需要平衡的理财策略。',
    '财务机会可能来自意想不到的方向。你平时关注的领域或人脉可能带来好消息。请以开放心态评估新提议，但不要在未充分核实前就仓促决定。',
    '这是用长期眼光看待金钱的时段。比起眼前小利，更应关注为未来储蓄与投资。现在种下的种子，几年后可能长成大树。请相信复利的力量。',
    '副业或新的收入来源值得认真考虑。你的爱好或特长有可能转化为收入。小小的开始也可能带来大变化，不妨迈出第一步。',
    '财运正在上升，但进账加快时更要自律。不要因为钱来得快就随意挥霍。用记账软件或账本清晰记录收支。',
    '在重大金钱决定前，请充分调研并在需要时咨询专业人士。此刻理性判断比情绪冲动更重要。细读条款，确保你真正理解合同内容。',
    '在节俭与支出之间找到平衡。过度节俭可能降低生活质量，过度消费则可能损害未来稳定。区分需要与欲望，践行理性消费。',
    '请把眼前的工作做到最好。踏实往往会在财务上得到回报。晋升或奖金的机会可能临近，你的努力也更容易被看见。',
  ],
}

export const luckPools: TarotMessagePools = {
  ko: [
    '당신의 긍정적인 에너지가 행운을 끌어당기고 있습니다. 좋은 일이 생기면 주변과 나누세요. 나눔은 행운을 더욱 증폭시킵니다. 작은 친절이 예상치 못한 큰 행운으로 돌아올 수 있습니다.',
    '우연한 만남이나 대화가 인생의 전환점이 될 수 있습니다. 새로운 사람들에게 마음을 열고, 평소 가지 않던 장소도 방문해 보세요. 운명적인 인연이 당신을 기다리고 있을 수 있습니다.',
    '오늘 하루는 특별히 행운이 당신 편입니다. 평소 미루던 일이나 새로운 시도를 해보기에 좋은 날입니다. 행운은 준비된 자에게 찾아오니, 기회가 오면 바로 잡으세요.',
    '작은 행운들이 쌓여 큰 기쁨을 만들어갈 것입니다. 일상의 소소한 행복에 감사하는 마음을 가지세요. 감사하는 마음은 더 많은 행운을 불러옵니다. 행운 일기를 써보는 것도 좋습니다.',
    '당신 주변에 행운을 가져다 주는 사람이 있습니다. 그 사람과의 관계를 더욱 소중히 여기세요. 함께하는 시간이 서로에게 좋은 에너지를 가져다 줄 것입니다.',
    '예상치 못한 좋은 소식이 곧 찾아올 것입니다. 전화나 메시지에 주의를 기울이세요. 오랫동안 연락이 없던 사람으로부터 반가운 소식이 올 수 있습니다.',
    '행운의 기운이 당신을 감싸고 있는 시기입니다. 이 시기에 복권을 사거나 중요한 결정을 내리는 것이 좋을 수 있습니다. 단, 무모한 도박은 금물입니다.',
    '당신의 행운 번호와 행운 색상에 주목하세요. 이들이 일상에서 자주 나타난다면 좋은 징조입니다. 중요한 날에 행운의 색상을 착용하면 더 좋은 결과를 얻을 수 있습니다.',
  ],
  en: [
    'Your positive energy is drawing good fortune toward you. When something good happens, share it with people around you—generosity can amplify luck. A small kindness can return as unexpected luck.',
    'A chance meeting or conversation can become a turning point. Open your heart to new people and visit places you rarely go. A meaningful connection may be waiting.',
    'Luck is leaning in your favor today. It is a good day for tasks you have postponed or for a fresh try. Luck favors the prepared—when a chance appears, grasp it.',
    'Small strokes of luck can stack into real joy. Practice gratitude for everyday happiness; gratitude often invites more luck. Keeping a simple “luck journal” can help you notice it.',
    'Someone near you carries fortunate energy for you. Cherish that relationship; time together can lift you both.',
    'Unexpected good news may arrive soon. Stay attentive to calls and messages—you might hear welcome word from someone you have not spoken to in a while.',
    'A fortunate atmosphere surrounds you. This can be a favorable window for a modest lottery ticket or an important decision—yet reckless gambling is never wise.',
    'Notice your lucky numbers and colors. If they keep appearing in daily life, treat it as a gentle good sign. Wearing a lucky color on an important day can steady your mindset.',
  ],
  ja: [
    '前向きなエネルギーが幸運を引き寄せています。良いことがあったら周りと分かち合いましょう。分かち合いは幸運をさらに増幅します。小さな親切が思いがけない幸運として返ってくることもあります。',
    '偶然の出会いや会話が人生の転機になることがあります。新しい人に心を開き、普段行かない場所にも足を運んでみてください。運命的なご縁が待っているかもしれません。',
    '今日は特に運が味方してくれる日です。先延ばしにしていたことや新しい挑戦に向いています。幸運は準備した人に来るので、チャンスが来たら掴みましょう。',
    '小さな幸運が積み重なって大きな喜びになります。日々のささやかな幸福に感謝の気持ちを。感謝はさらなる幸運を呼びます。幸運日記もおすすめです。',
    'あなたの周りに幸運を運んでくれる人がいます。その人との関係を大切にしてください。一緒に過ごす時間はお互いに良いエネルギーをもたらします。',
    '思わぬ良い知らせがすぐそこまで来ているかもしれません。電話やメッセージに注意を払ってください。久しぶりの人から嬉しい連絡があるかもしれません。',
    '幸運の気があなたを包む時期です。宝くじを買ったり重要な決断をするのに良い時期かもしれません。ただし無謀な賭けは避けてください。',
    'ラッキーナンバーとラッキーカラーに注目してください。日常でよく目にするなら良い兆しです。大事な日にラッキーカラーを取り入れると気持ちが整いやすくなります。',
  ],
  zh: [
    '你积极的能量正在吸引好运。好事发生时不妨与身边人分享，分享往往会让好运放大。小小的善意也可能以意想不到的方式回报你。',
    '偶然的相遇或对话可能成为转折点。对新的人敞开心门，也去平时少去的地方走走，也许缘分正在等你。',
    '今天运气格外站在你这边，适合处理拖延的事或尝试新事物。机会眷顾有准备的人，出现时请果断把握。',
    '小幸运会累积成真正的快乐。对日常里的小幸福心怀感激，感激常常会带来更多好运。写简单的“幸运日记”也有助于你看见它。',
    '身边有人能为你带来好运的能量。请珍惜这段关系，相处的时光会让彼此都更有力量。',
    '意想不到的好消息可能很快到来。留意电话与信息，久未联系的人也许会传来令人愉快的消息。',
    '幸运的氛围正环绕着你。这可能是小额彩票或重要决定的窗口期，但鲁莽赌博绝不可取。',
    '请关注你的幸运数字与幸运色。若它们在生活中频繁出现，可视为温和的好兆头。在重要日子穿戴幸运色有助于稳定心态。',
  ],
}

export const cautionPools: TarotMessagePools = {
  ko: [
    '충동적인 결정은 나중에 후회를 불러옵니다. 중요한 선택을 앞두고 있다면 최소 24시간의 생각 시간을 가지세요. 급하게 결정해야 한다고 압박받더라도, 당신의 페이스를 유지하는 것이 중요합니다.',
    '건강에 더욱 신경 쓸 시기입니다. 무리한 스케줄이나 과도한 업무로 몸에 무리가 가지 않도록 하세요. 작은 증상도 무시하지 말고, 정기 검진을 받아보는 것이 좋습니다. 건강이 가장 큰 재산입니다.',
    '말 한마디가 관계를 바꿀 수 있는 민감한 시기입니다. 화가 나더라도 바로 말하지 말고, 감정이 가라앉은 후에 대화하세요. 오해는 쉽게 생기지만 풀기는 어렵습니다. 경청하는 자세가 중요합니다.',
    '스트레스 관리에 특별히 주의가 필요합니다. 운동, 명상, 취미 활동 등을 통해 스트레스를 해소하는 시간을 반드시 가지세요. 번아웃은 갑자기 찾아오니, 미리 예방하는 것이 중요합니다.',
    '중요한 서류나 계약은 여러 번 꼼꼼히 읽으세요. 작은 조항 하나가 큰 문제가 될 수 있습니다. 이해되지 않는 부분은 반드시 질문하고, 필요하다면 전문가의 도움을 받으세요.',
    '주변의 말에 너무 흔들리지 마세요. 많은 조언 속에서 혼란스러울 수 있지만, 최종 결정은 당신이 내려야 합니다. 당신의 상황을 가장 잘 아는 것은 당신 자신입니다.',
    '서두르면 일을 그르칩니다. 빨리 끝내고 싶은 마음이 앞서도, 과정을 충실히 하세요. 조급함에서 비롯된 실수는 더 큰 시간 낭비를 초래합니다. 천천히 하되 확실하게 하세요.',
    '감정에 휩쓸려 결정을 내리지 마세요. 특히 분노나 슬픔이 클 때는 중요한 결정을 미루세요. 감정이 평온해진 후에 같은 상황을 다시 바라보면 다른 답이 보일 수 있습니다.',
  ],
  en: [
    'Impulsive choices often bring regret later. Before a major decision, give yourself at least a day to think—even if you feel pressured to decide fast, keeping your own pace matters.',
    'Pay extra attention to health. Avoid schedules or workloads that push your body too hard. Do not ignore small symptoms, and consider routine checkups. Health is your greatest asset.',
    'Words can shift relationships quickly now. Even when angry, wait until emotions settle before you speak. Misunderstandings form easily but take effort to repair—listening helps.',
    'Stress management needs special care. Make time to release tension through movement, meditation, or hobbies. Burnout can arrive suddenly; prevention is wiser than recovery alone.',
    'Read important documents or contracts more than once. A single small clause can become a big problem. Ask questions about anything unclear, and get professional help if needed.',
    'Do not let every outside opinion sway you. Many voices can feel confusing, yet the final decision must be yours—you understand your situation best.',
    'Rushing can spoil the work. Even when you want it finished fast, honor the process. Mistakes born of impatience often waste more time than careful steps. Go slowly and surely.',
    'Avoid big decisions while emotions run high, especially anger or deep sadness. When you feel calmer, the same situation may show a different answer.',
  ],
  ja: [
    '衝動的な決断は後悔を招きやすいです。重要な選択の前には少なくとも一日考える時間を。急かされても、自分のペースを保つことが大切です。',
    '健康により一層気を配る時期です。無理なスケジュールや過度な業務で身体を痛めないようにしてください。小さな症状も見過ごさず、定期検診も検討を。健康は最大の財産です。',
    '一言で関係が変わるほど敏感な時期です。怒っていてもすぐに言わず、感情が静まってから話しましょう。誤解は生まれやすく、解くのは大変です。傾聴の姿勢が大切です。',
    'ストレス管理に特に注意が必要です。運動・瞑想・趣味などで発散する時間を必ず取ってください。燃え尽きは突然来ることがあり、予防が重要です。',
    '重要な書類や契約は何度も丁寧に読んでください。小さな条項が大きな問題になることがあります。分からない点は必ず質問し、必要なら専門家の助けを借りてください。',
    '周囲の言葉に揺さぶられすぎないでください。多くの助言は混乱を招くこともありますが、最終判断はあなたが下すべきです。状況をいちばん知っているのはあなた自身です。',
    '急ぐと仕事を損ないます。早く終わらせたくても、過程を大切にしてください。焦りからのミスは、のんびり進めるより大きな時間ロスになりがちです。ゆっくり、しかし確実に。',
    '感情に流されて決めないでください。特に怒りや深い悲しみのときは重要な決断を先延ばしに。心が落ち着いたあと、同じ状況が違って見えることがあります。',
  ],
  zh: [
    '冲动决定容易带来后悔。面对重大选择前，请至少给自己一天的思考时间。即使感到被催促，也要守住自己的节奏。',
    '请格外关注健康。避免让过满的日程或过量工作透支身体。不要忽视小症状，定期体检也值得考虑。健康是最大的财富。',
    '此刻言语格外能影响关系。即便生气，也请等情绪平复后再沟通。误会容易产生，化解却费力，倾听尤为重要。',
    '压力管理需要特别用心。务必通过运动、冥想或爱好留出释放压力的时间。倦怠可能突然袭来，预防胜于事后补救。',
    '重要文件或合同请多读几遍。一条小条款也可能演变成大问题。不懂之处一定要追问，必要时寻求专业帮助。',
    '不要被所有外界声音牵着走。意见太多会让人困惑，但最终决定仍应由你做出——你最了解自己的处境。',
    '急躁容易坏事。即便想快点完成，也要尊重过程。因急躁犯的错，往往比稳扎稳打浪费更多时间。请慢而稳。',
    '不要在情绪高涨时做重大决定，尤其是愤怒或深悲之时。等心境平静后，同一件事也许会呈现不同的答案。',
  ],
}

export const lovePools: TarotMessagePools = {
  ko: [
    '감정 표현이 조심스러워 보입니다. 당신의 진심이 상대방에게 닿지 않을까봐 두렵지 마세요. 용기 내어 마음을 전해보세요. 진정한 감정은 반드시 누군가의 마음에 닿게 됩니다.',
    '연애에서는 지나친 기대와 집착이 독이 될 수 있습니다. 상대방을 그대로 받아들이고, 서로 성장할 수 있는 관계를 만들어가세요. 완벽한 사람보다는 함께 성장하는 사람이 더 소중합니다.',
    '새로운 만남의 기운이 감지됩니다. 평소 가지 않던 장소에 가보거나, 새로운 활동을 시작하면 뜻밖의 인연이 찾아올 수 있습니다. 열린 마음으로 주변을 살펴보세요.',
    '기존의 관계가 새로운 단계로 나아갈 시기입니다. 더 깊은 이해와 소통을 통해 관계를 업그레이드하세요. 지금이 중요한 대화를 나눌 좋은 타이밍입니다.',
    '혼자만의 시간이 당신의 감정을 정리하는 데 도움이 될 것입니다. 사랑하는 방법을 다시 배우고, 자신을 사랑하는 것부터 시작하세요. 자기 사랑이 가장 아름다운 사랑입니다.',
    '어려운 시기를 맞이한 연애 관계도 있습니다. 하지만 위기는 관계를 더욱 단단하게 만들 기회입니다. 솔직한 대화와 노력이 있다면 더 강한 유대를 만들 수 있습니다.',
    '당신의 매력이 빛나는 시기입니다. 자신감을 가지고 당신 그대로를 드러내세요. 진정한 매력은 외모가 아닌 태도와 에너지에서 나옵니다.',
    '사랑은 아름다운 일이기도 하고 어려운 일이기도 합니다. 기쁨과 슬픔 모두 사랑의 일부입니다. 지금 느끼는 감정이 어떤 것이든 소중하게 받아들이고 시간을 가지세요.',
  ],
  en: [
    'You may be careful about showing feelings. Do not fear that sincerity will miss the other person—try speaking from the heart. True emotion tends to find its way to someone who can receive it.',
    'In love, heavy expectations and clinging can become poison. Accept your partner as they are and build a bond where you both grow. Someone who grows with you can matter more than an imagined “perfect” person.',
    'The energy of a new meeting is in the air. Try a new place or activity—an unexpected connection may appear. Keep an open eye on the world around you.',
    'An existing bond can move to a new stage. Deeper understanding and honest talk can upgrade the relationship—this can be a good window for an important conversation.',
    'Time alone can help you sort your feelings. Relearn how to love by starting with self-love. Loving yourself is also a beautiful form of love.',
    'Some relationships pass through hard chapters. Yet crisis can forge stronger ties if you stay honest and willing to work. Patience and dialogue can deepen the bond.',
    'Your charm is shining now. Show up with confidence as you are. Lasting attraction often comes from attitude and energy more than from surface alone.',
    'Love can be beautiful and difficult. Joy and sorrow are both part of it. Whatever you feel now, honor it and give it time.',
  ],
  ja: [
    '感情表現が慎重に見える時期かもしれません。本音が届かないのではと恐れず、勇気を出して伝えてみてください。本当の想いは必ず誰かの心に届きます。',
    '恋愛では過度な期待や執着が毒になることがあります。相手をありのまま受け入れ、共に成長できる関係を育てましょう。完璧な人より、一緒に育つ人がかけがえのない存在になります。',
    '新しい出会いの気配が感じられます。普段行かない場所へ行ったり、新しい活動を始めると思いがけないご縁があるかもしれません。周りを開いた心で見てください。',
    '既存の関係が新しい段階へ進む時期です。より深い理解と対話で関係を育てましょう。大事な話をするには良いタイミングです。',
    'ひとりの時間は感情を整理する助けになります。愛し方を学び直し、まず自分を愛することから。自己愛も美しい愛の形です。',
    '難しい時期にある恋もあります。しかし危機は絆を強くする機会にもなります。正直な対話と努力があれば、より強い結びつきができます。',
    'あなたの魅力が輝く時期です。自信を持ってありのままを見せてください。本当の魅力は外見より態度とエネルギーから生まれます。',
    '愛は美しくもあり、難しくもあります。喜びも悲しみも愛の一部です。今感じている感情を大切に受け止め、時間をかけてください。',
  ],
  zh: [
    '你可能在表达感情上较为谨慎。不必害怕真心无法传达，请试着鼓起勇气表达。真挚的情感往往会抵达能承接它的人心里。',
    '恋爱中，过高的期待与执念可能变成毒药。接纳对方本来的样子，建立能彼此成长的关系。能一起成长的人，往往比幻想中的“完美对象”更珍贵。',
    '新的缘分气息正在靠近。去平时少去的地方，或开始一项新活动，意外之缘可能出现。请以开放心态观察周遭。',
    '现有关系可能进入新阶段。更深的理解与沟通能升级这段关系，此刻或许是进行重要对话的窗口。',
    '独处有助于整理情绪。从学会爱自己开始，重新学习如何去爱。自爱也是一种美好的爱。',
    '有些恋情会经历艰难章节，但危机也可能让关系更坚固。若愿意坦诚沟通并付出努力，纽带可以更深。',
    '你的魅力正在发光。请带着自信展现真实的自己。持久的吸引力往往来自态度与能量，而不只是外表。',
    '爱既美好也艰难。喜悦与悲伤都是爱的一部分。无论此刻感受如何，请珍视它并给予时间。',
  ],
}

export const careerPools: TarotMessagePools = {
  ko: [
    '새로운 프로젝트나 기회가 당신의 앞에 나타나고 있습니다. 두려워하지 말고 도전해보세요. 당신의 능력은 생각보다 훨씬 크며, 이 기회는 당신을 위해 준비된 것입니다.',
    '현재의 직업이나 업무에서 일시적인 정체기를 느낄 수 있습니다. 하지만 이 시간도 당신을 성장시키고 있습니다. 기초를 다지면서 다음 단계를 준비하세요.',
    '팀 내에서의 협력이 중요한 시기입니다. 혼자하려는 마음을 내려놓고 주변과 소통하세요. 함께 하는 것이 더 큰 성과를 만들어낼 것입니다.',
    '당신의 노력이 인정받을 시기가 다가오고 있습니다. 승진이나 새로운 역할의 기회가 올 수 있으니, 항상 준비된 상태를 유지하세요. 기회는 준비된 자에게만 찾아옵니다.',
    '일에서의 스트레스가 누적되고 있을 수 있습니다. 잠시 멈추어 자신을 돌볼 시간을 가지세요. 건강한 일과 삶의 균형이 더 나은 성과를 만듭니다.',
    '새로운 기술이나 지식을 배울 좋은 시기입니다. 자기 계발에 투자하면 미래의 경쟁력이 됩니다. 배움의 여정을 즐기세요.',
    '업무에 대한 당신의 열정이 주변에 영감을 주고 있습니다. 이 에너지를 유지하되, 과도하지 않도록 주의하세요. 지속 가능한 열정이 진정한 성공을 만듭니다.',
    '현재의 업무를 되돌아보고 개선할 점을 찾아보세요. 작은 변화가 큰 효율성을 가져올 수 있습니다. 당신의 경험과 노하우를 더 잘 활용할 차례입니다.',
  ],
  en: [
    'A new project or opportunity is appearing in front of you. Do not shrink from the challenge—you are more capable than you think, and this opening may be shaped for you.',
    'You may feel a temporary plateau in work or career. Even this season is growing you. Strengthen foundations while you prepare the next step.',
    'Team cooperation matters now. Set aside the urge to do everything alone and communicate with people around you. Together you can produce stronger results.',
    'Recognition for your effort is drawing closer. Promotion or a new role may appear—stay ready. Opportunity tends to visit those who prepared while no one was watching.',
    'Work stress may be stacking. Pause to care for yourself. A healthier balance between job and life often improves outcomes, not weakens them.',
    'This is a good time to learn a new skill or body of knowledge. Investing in growth becomes future leverage. Try to enjoy the learning path itself.',
    'Your passion for work is inspiring others. Keep that energy, yet guard against burnout. Sustainable drive builds real success over time.',
    'Review your current tasks and look for small improvements. Tiny changes can lift efficiency a lot. It may be time to use your experience more deliberately.',
  ],
  ja: [
    '新しいプロジェクトやチャンスが目の前に現れています。恐れず挑戦してください。あなたの能力は思っている以上に大きく、この機会はあなたのために用意されているかもしれません。',
    '今の仕事で一時的な停滞を感じることもあります。しかしこの時間もあなたを成長させています。基礎を固めながら次の段階を準備しましょう。',
    'チームでの協力が大切な時期です。一人で抱え込む気持ちを手放し、周囲と対話してください。協力がより大きな成果を生みます。',
    '努力が認められる時期が近づいています。昇進や新しい役割のチャンスがあるかもしれません。常に準備を。機会は準備した人に来ます。',
    '仕事のストレスが積み重なっているかもしれません。立ち止まって自分を労いましょう。仕事と生活の健全なバランスが、より良い成果を生みます。',
    '新しい技術や知識を学ぶ良い時期です。自己投資は将来の強みになります。学びの旅を楽しんでください。',
    '仕事への情熱が周囲に刺激を与えています。そのエネルギーは保ちつつ、過剰にならないよう注意してください。持続可能な情熱が本当の成功をつくります。',
    '今の業務を振り返り、改善点を探しましょう。小さな変化が大きな効率向上につながることもあります。経験とノウハウをより活かす時です。',
  ],
  zh: [
    '新的项目或机会正出现在你面前。不必畏惧挑战——你比想象中更有能力，这次机会也许正是为你准备。',
    '你或许会在工作或职业上感到短暂的停滞。但这段时光同样在塑造你。巩固基础，同时为下一步做准备。',
    '团队配合此刻尤为重要。放下凡事独自扛的习惯，多与周围人沟通。协作往往能带来更大的成果。',
    '你的努力正越来越可能被看见。晋升或新角色的机会可能出现，请保持准备。机会更常眷顾早有准备的人。',
    '工作压力可能正在累积。请暂停片刻照顾自己。更健康的工作与生活平衡通常会带来更好的结果，而不是削弱它。',
    '这是学习新技能或知识的好时段。为成长投资会成为未来的竞争力。尽量享受学习过程本身。',
    '你对工作的热情正在鼓舞他人。保持这份能量，同时警惕过劳。可持续的投入才能带来长期真正的成功。',
    '回顾当前工作并寻找可改进之处。小改变也可能显著提升效率。也许是更有意识地运用经验与方法的时机。',
  ],
}

export const healthPools: TarotMessagePools = {
  ko: [
    '신체 건강도 중요하지만, 정신 건강이 더욱 중요한 시기입니다. 명상, 요가, 또는 심리 상담 등을 통해 마음을 돌봐보세요. 건강한 마음이 건강한 몸을 만듭니다.',
    '생활 습관을 되돌아볼 시기입니다. 충분한 수면, 규칙적인 운동, 균형 잡힌 식단이 당신의 건강을 지탱합니다. 작은 습관의 변화가 큰 건강 변화를 만듭니다.',
    '만성적인 피로를 느끼고 있다면, 전문가의 도움을 받아보세요. 건강 검진을 통해 몸 상태를 정확히 파악하는 것이 중요합니다. 예방이 치료보다 낫습니다.',
    '운동과 활동이 당신의 건강을 회복시킬 것입니다. 무거운 운동이 아니어도 좋습니다. 산책, 스트레칭, 춤 등 즐거운 움직임으로 시작하세요.',
    '정서적 스트레스가 신체 증상으로 나타날 수 있습니다. 마음을 편안하게 하기 위해 좋아하는 일을 하거나 누군가와 대화하세요. 감정 해소가 곧 건강 개선입니다.',
    '건강이 회복되고 있습니다. 현재의 좋은 상태를 유지하기 위해 계속해서 건강한 생활 습관을 지키세요. 꾸준함이 당신의 최고의 건강 비결입니다.',
    '식생활 개선이 건강 개선의 시작입니다. 가공식품을 줄이고 자연 식품을 더하세요. 입으로 들어가는 것이 곧 당신의 건강입니다.',
    '휴식과 활동의 균형을 찾으세요. 너무 많은 활동도, 너무 적은 활동도 건강에 좋지 않습니다. 당신의 몸과 마음이 원하는 리듬을 찾아가세요.',
  ],
  en: [
    'Body health matters, yet mental health may matter even more right now. Care for your mind through meditation, gentle yoga, counseling, or quiet rest—a steady mind supports a steady body.',
    'Review daily habits. Enough sleep, regular movement, and balanced food are pillars of vitality. Small habit shifts can create large health changes over time.',
    'If chronic fatigue lingers, consider professional help. Checkups can clarify what your body needs. Prevention is often easier than repair.',
    'Movement can restore you. You do not need heavy training—walking, stretching, or dance you enjoy can be a strong start.',
    'Emotional stress can show up as physical symptoms. Do things that soothe you and talk with someone you trust. Releasing feelings is part of healing.',
    'Health is trending upward. Keep the habits that support this good phase—consistency is one of the best “secrets” of wellness.',
    'Food is a practical starting line for better health. Reduce ultra-processed foods when you can and add more whole, simple ingredients. What you eat becomes part of you.',
    'Balance rest with activity. Too much of either can unsettle health. Listen for the rhythm your body and mind are asking for.',
  ],
  ja: [
    '身体の健康も大切ですが、今は心の健康がさらに大切な時期かもしれません。瞑想・軽いヨガ・カウンセリングなどで心を整えましょう。穏やかな心は体を支えます。',
    '生活習慣を見直す時期です。十分な睡眠、適度な運動、バランスの取れた食事が健康の土台です。小さな習慣の変化が大きな健康改善につながります。',
    '慢性的な疲れがあるなら専門家の力を借りてみてください。健康診断で体の状態を把握することも大切です。予防は治療より優れます。',
    '動くことが回復を助けます。激しい運動でなくても大丈夫です。散歩、ストレッチ、楽しいダンスから始めましょう。',
    '感情のストレスが身体の症状として現れることがあります。好きなことをしたり信頼できる人と話したりして心を軽くしてください。感情の解放も健康改善の一部です。',
    '健康は回復傾向にあります。この良い状態を保つため、健康的な習慣を続けましょう。継続こそ最高の健康の秘訣です。',
    '食生活の改善は健康改善の出発点です。加工食品を減らし、自然に近い食材を増やしましょう。口にするものがそのまま健康になります。',
    '休息と活動のバランスを取りましょう。どちらか一方に偏りすぎても健康を損ないます。体と心が求めるリズムを見つけてください。',
  ],
  zh: [
    '身体健康重要，此刻心理健康或许更为关键。用冥想、温和瑜伽、咨询或安静休息照顾内心，平稳的心往往能支撑更稳的身体。',
    '适合回顾生活习惯。充足睡眠、规律活动与均衡饮食是活力的支柱。小习惯的改变，时间久了也能带来显著健康变化。',
    '若长期疲惫挥之不去，不妨寻求专业帮助。体检有助于弄清身体需要什么。预防通常比事后修复更轻松。',
    '动起来有助于恢复。你不必从高强度训练开始——散步、拉伸或你喜欢的舞蹈都可以是很好的起点。',
    '情绪压力可能以身体症状呈现。做些让你放松的事，并与信任的人交谈。释放情绪也是疗愈的一部分。',
    '健康趋势正在向好。请延续支持这段好状态的习惯——坚持往往是最朴素也最有效的“秘诀”。',
    '改善饮食是迈向更好健康的务实起点。在可行范围内减少过度加工食品，增加更接近天然的食材。你吃进去的东西，会成为你的一部分。',
    '在休息与活动之间找平衡。过多或过少都可能扰动健康。请倾听身心正在呼唤的节奏。',
  ],
}

export function getTarotParagraphPools(category: string): TarotMessagePools {
  switch (category) {
    case 'wealth':
      return wealthPools
    case 'love':
      return lovePools
    case 'career':
      return careerPools
    case 'health':
      return healthPools
    case 'luck':
      return luckPools
    case 'caution':
      return cautionPools
    default:
      return totalPools
  }
}

attachEsIdToRecord(
  {
    total: totalPools,
    wealth: wealthPools,
    luck: luckPools,
    caution: cautionPools,
    love: lovePools,
    career: careerPools,
    health: healthPools,
  },
  tarotPoolsEsId
)

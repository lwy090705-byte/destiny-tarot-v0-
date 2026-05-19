const fs = require('fs')
const p = 'lib/i18n.ts'
let s = fs.readFileSync(p, 'utf8')

s = s.replace(/'level\.4':\s*'[^']*',/g, "'level.4': '탐구자',")

const body7 = `    'terms.bodySection7':
      '앱 내 재화 안내\\n• 본 서비스는 파이(Pi)와 포인트(P) 두 가지 재화로만 운영됩니다.\\n• 파이(Pi)는 실제 결제를 통해 충전할 수 있는 프리미엄 재화입니다.\\n• 포인트(P)는 출석, 이벤트, 룰렛 등을 통해 무료로 적립되는 재화입니다.\\n• 그 외 다른 형태의 재화나 암호화폐는 본 서비스에서 사용되지 않습니다.\\n\\n포인트 적립 방법\\n• 매일 출석 체크: 20P\\n• 광고 시청: 10P\\n• 친구 추천: 30P\\n• 보너스 룰렛 (1일 1회): 10P ~ 50P\\n\\n파이/포인트 사용처\\n• 프리미엄 운세 분석 (상세 해석 포함)\\n• 특별 타로 리딩 (프리미엄 카드 덱)\\n• 심화 궁합 분석\\n\\n유효기간 및 소멸\\n• 포인트의 유효기간은 적립일로부터 1년입니다.\\n• 파이의 유효기간은 충전일로부터 5년입니다.\\n• 회원 탈퇴 시 보유 재화는 즉시 소멸되며 복구되지 않습니다.\\n• 부정한 방법으로 획득한 재화는 회수될 수 있습니다.',`

s = s.replace(/'terms\.bodySection7':[\s\S]*?',\n    'terms\.bodySection8':/, `${body7}\n    'terms.bodySection8':`)

fs.writeFileSync(p, s)
console.log('fixed i18n ko strings')

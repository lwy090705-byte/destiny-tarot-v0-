import type { Language } from '@/lib/i18n'
import { pickLabel, type FullLabelRow } from '@/lib/fortune-generator'

export type MbtiCompatTier = 'best' | 'good' | 'other'

const compatScoreLine: Record<MbtiCompatTier, FullLabelRow> = {
  best: {
    ko: '95점 (최고의 궁합!)',
    en: '95 pts (Perfect match!)',
    ja: '95点（最高の相性！）',
    zh: '95 分（绝佳配对！）',
    es: '95 pts (¡Compatibilidad perfecta!)',
    id: '95 poin (Kecocokan sempurna!)',
    fr: '95 pts (Match parfait !)',
    de: '95 Pkt. (Perfektes Match!)',
    pt: '95 pts (Combinação perfeita!)',
    hi: '95 अंक (सर्वोत्तम मिलान!)',
    vi: '95 điểm (Hợp nhất!)',
    th: '95 คะแนน (เข้ากันที่สุด!)',
  },
  good: {
    ko: '80점 (좋은 궁합)',
    en: '80 pts (Great match)',
    ja: '80点（良い相性）',
    zh: '80 分（良好配对）',
    es: '80 pts (Buena compatibilidad)',
    id: '80 poin (Kecocokan bagus)',
    fr: '80 pts (Bon match)',
    de: '80 Pkt. (Gutes Match)',
    pt: '80 pts (Boa combinação)',
    hi: '80 अंक (अच्छा मिलान)',
    vi: '80 điểm (Hợp tốt)',
    th: '80 คะแนน (เข้ากันดี)',
  },
  other: {
    ko: '65점 (노력이 필요한 궁합)',
    en: '65 pts (Match that needs effort)',
    ja: '65点（努力が必要な相性）',
    zh: '65 分（需要经营的配对）',
    es: '65 pts (Compatibilidad que requiere esfuerzo)',
    id: '65 poin (Perlu usaha)',
    fr: '65 pts (Match à cultiver)',
    de: '65 Pkt. (Match braucht Arbeit)',
    pt: '65 pts (Combinação que pede esforço)',
    hi: '65 अंक (प्रयास वाला मिलान)',
    vi: '65 điểm (Cần nỗ lực)',
    th: '65 คะแนน (ต้องใส่ใจดูแล)',
  },
}

const compatScoreShort: Record<MbtiCompatTier, FullLabelRow> = {
  best: {
    ko: '최고의 궁합!',
    en: 'Perfect match!',
    ja: '最高の相性！',
    zh: '绝佳配对！',
    es: '¡Compatibilidad perfecta!',
    id: 'Kecocokan sempurna!',
    fr: 'Match parfait !',
    de: 'Perfektes Match!',
    pt: 'Combinação perfeita!',
    hi: 'सर्वोत्तम मिलान!',
    vi: 'Hợp nhất!',
    th: 'เข้ากันที่สุด!',
  },
  good: {
    ko: '좋은 궁합',
    en: 'Great match',
    ja: '良い相性',
    zh: '良好配对',
    es: 'Buena compatibilidad',
    id: 'Kecocokan bagus',
    fr: 'Bon match',
    de: 'Gutes Match',
    pt: 'Boa combinação',
    hi: 'अच्छा मिलान',
    vi: 'Hợp tốt',
    th: 'เข้ากันดี',
  },
  other: {
    ko: '도전적인 궁합',
    en: 'Challenging match',
    ja: 'チャレンジの相性',
    zh: '有挑战的配对',
    es: 'Compatibilidad exigente',
    id: 'Perlu usaha',
    fr: 'Match exigeant',
    de: 'Herausforderndes Match',
    pt: 'Combinação desafiadora',
    hi: 'चुनौतीपूर्ण मिलान',
    vi: 'Cần nỗ lực',
    th: 'ท้าทาย',
  },
}

const compatResultParagraph: Record<MbtiCompatTier, FullLabelRow> = {
  best: {
    ko: '서로를 완벽하게 보완하는 환상의 궁합입니다! 깊은 이해와 존중을 바탕으로 오래도록 행복한 관계를 유지할 수 있습니다.',
    en: 'You complement each other beautifully! With deep understanding and respect, you can keep a happy relationship for a long time.',
    ja: 'お互いを完璧に補い合える素晴らしい相性です。深い理解と尊重を基盤に、長く幸せな関係を築けます。',
    zh: '你们彼此完美互补！以深刻的理解与尊重为基础，可以长久维持幸福的关系。',
    es: '¡Se complementan de maravilla! Con comprensión y respeto pueden mantener una relación feliz durante mucho tiempo.',
    id: 'Kalian saling melengkapi dengan indah! Dengan pemahaman dan rasa hormat yang dalam, hubungan bahagia bisa bertahan lama.',
    fr: 'Vous vous complétez merveilleusement ! Avec compréhension et respect, vous pouvez préserver une relation heureuse durable.',
    de: 'Ihr ergänzt euch wunderbar! Mit Verständnis und Respekt könnt ihr lange eine glückliche Beziehung führen.',
    pt: 'Vocês se complementam de forma linda! Com compreensão e respeito, podem manter um relacionamento feliz por muito tempo.',
    hi: 'आप एक-दूसरे को बखूबी पूरक बनाते हैं! गहरी समझ और सम्मान से आप लंबे समय तक खुश रिश्ता निभा सकते हैं।',
    vi: 'Hai bạn bổ sung cho nhau rất đẹp! Với sự thấu hiểu và tôn trọng, bạn có thể duy trì mối quan hệ hạnh phúc lâu dài.',
    th: 'คุณเติมเต็มกันได้อย่างลงตัว! ด้วยความเข้าใจและเคารพ คุณสามารถรักษาความสัมพันธ์ที่มีความสุขได้ยาวนาน',
  },
  good: {
    ko: '서로의 차이점이 오히려 매력이 되는 좋은 궁합입니다. 소통을 통해 더욱 깊은 관계로 발전할 수 있습니다.',
    en: 'Your differences become charm—this is a strong match. Through communication you can grow into an even deeper bond.',
    ja: '違いが魅力になる良い相性です。対話を通じて、さらに深い関係へ育てられます。',
    zh: '差异反而成为吸引力，是不错的配对。通过沟通可以发展成更深的关系。',
    es: 'Las diferencias se vuelven atractivas: buena compatibilidad. La comunicación puede profundizar el vínculo.',
    id: 'Perbedaan menjadi daya tarik—kecocokan yang kuat. Lewat komunikasi, ikatan bisa semakin dalam.',
    fr: 'Vos différences deviennent un atout : bon match. La communication peut approfondir le lien.',
    de: 'Unterschiede werden zur Stärke—gutes Match. Durch Gespräch wächst die Verbundenheit.',
    pt: 'As diferenças viram charme—boa combinação. A conversa pode aprofundar o vínculo.',
    hi: 'अंतर आकर्षण बन जाते हैं—अच्छा मिलान। संवाद से रिश्ता गहरा हो सकता है।',
    vi: 'Khác biệt trở thành điểm hấp dẫn—hợp tốt. Trao chuyện giúp gắn kết sâu hơn.',
    th: 'ความต่างกลายเป็นเสน่ห์—เข้ากันดี การสื่อสารช่วยให้สัมพันธ์ลึกซึ้งขึ้น',
  },
  other: {
    ko: '서로 다른 점이 많지만, 그만큼 배울 점도 많습니다. 인내심을 가지고 상대방을 이해하려 노력하면 성장하는 관계가 될 수 있습니다.',
    en: 'You differ in many ways—and there is much to learn from each other. With patience and effort to understand, the relationship can grow.',
    ja: '違いは多いですが、学ぶことも多いです。忍耐と理解の努力があれば、成長する関係になれます。',
    zh: '你们有许多不同，也因此有许多可学习之处。若有耐心并努力理解对方，关系可以一起成长。',
    es: 'Son distintos en muchos aspectos—y hay mucho que aprender. Con paciencia y esfuerzo por entenderse, la relación puede crecer.',
    id: 'Kalian berbeda di banyak hal—dan banyak yang bisa dipelajari. Dengan kesabaran dan usaha memahami, hubungan bisa tumbuh.',
    fr: 'Vous différez sur bien des points—et il y a beaucoup à apprendre. Avec patience et effort pour comprendre, la relation peut grandir.',
    de: 'Ihr unterscheidet euch oft—und könnt viel voneinander lernen. Mit Geduld und Verständnis wächst die Beziehung.',
    pt: 'Há muitas diferenças—e muito a aprender. Com paciência e esforço para entender, a relação pode crescer.',
    hi: 'कई मतभेद हैं—और सीखने को बहुत कुछ है। धैर्य और समझने की कोशिश से रिश्ता बढ़ सकता है।',
    vi: 'Khác biệt nhiều—và cũng nhiều điều để học hỏi. Kiên nhẫn và cố hiểu nhau giúp quan hệ phát triển.',
    th: 'แตกต่างกันหลายด้าน—และมีอะไรให้เรียนรู้อีกมาก ด้วยความอดทนและพยายามเข้าใจ ความสัมพันธ์จะเติบโตได้',
  },
}

const personalityCommE: FullLabelRow = {
  ko: 'E형: 외향적이고 적극적인 소통을 선호합니다. 말을 통해 생각을 정리하고 관계를 형성합니다.',
  en: 'E: Prefers outgoing, active communication. Organizes thoughts through talking and builds relationships that way.',
  ja: 'E型：外向的で積極的なコミュニケーションを好みます。話して考えを整理し、関係を築きます。',
  zh: 'E 型：偏好外向、积极的沟通。通过说话整理思绪并建立关系。',
  es: 'E: Prefiere comunicación activa y extrovertida. Ordena ideas hablando y crea vínculos así.',
  id: 'E: Lebih suka komunikasi aktif dan ekstrovert. Mengatur pikiran lewat bicara dan membangun relasi seperti itu.',
  fr: 'E : communication active et extravertie. Structure ses idées en parlant et crée des liens ainsi.',
  de: 'E: Mag aktive, extravertierte Kommunikation. Denkt laut und knüpft Kontakte durch Gespräch.',
  pt: 'E: Prefere comunicação ativa e extrovertida. Organiza ideias falando e constrói laços assim.',
  hi: 'E: बहिर्मुखी, सक्रिय संवाद पसंद करता है। बोलकर सोच साझा करता है और रिश्ते बनाता है।',
  vi: 'E: Thích giao tiếp hướng ngoại, chủ động. Sắp xếp suy nghĩ qua nói chuyện và tạo kết nối.',
  th: 'E: ชอบสื่อสารแบบเปิดกว้างและกระตือรือร้น จัดความคิดด้วยการพูดและสร้างความสัมพันธ์',
}

const personalityCommI: FullLabelRow = {
  ko: 'I형: 내향적이고 신중한 소통을 선호합니다. 깊이 있는 대화와 일대일 상호작용을 좋아합니다.',
  en: 'I: Prefers thoughtful, reserved communication. Enjoys deep one-on-one conversation.',
  ja: 'I型：内向的で慎重なコミュニケーションを好みます。深い一対一の対話を好みます。',
  zh: 'I 型：偏好内敛、审慎的沟通。喜欢有深度的一对一交流。',
  es: 'I: Prefiere comunicación reservada y reflexiva. Disfruta conversaciones profundas uno a uno.',
  id: 'I: Lebih suka komunikasi tenang dan penuh pertimbangan. Menikmati percakapan mendalam satu lawan satu.',
  fr: 'I : communication réservée et réfléchie. Aime les échanges profonds en tête-à-tête.',
  de: 'I: Mag zurückhaltende, bedachte Kommunikation. Schätzt tiefe Gespräche unter vier Augen.',
  pt: 'I: Prefere comunicação reservada e reflexiva. Gosta de conversas profundas um a um.',
  hi: 'I: संयमी, विचारपूर्ण संवाद पसंद करता है। गहरी एक-पर-एक बातचीत पसंद है।',
  vi: 'I: Thích giao tiếp kín đáo, chậm rãi. Thích trò chuyện sâu một-một.',
  th: 'I: ชอบสื่อสารแบบเก็บตัวและรอบคอบ ชอบสนทนาเชิงลึกแบบตัวต่อตัว',
}

const loveExpressF: FullLabelRow = {
  ko: 'F형: 감정을 솔직하게 표현하고 상대방의 감정을 중시합니다. 깊은 감정적 연결을 원합니다.',
  en: 'F: Expresses feelings openly and values the partner’s emotions. Seeks a deep emotional connection.',
  ja: 'F型：感情を率直に表し、相手の感情を大切にします。深い感情的つながりを求めます。',
  zh: 'F 型：坦诚表达情绪并重视对方的感受，渴望深度的情感连结。',
  es: 'F: Expresa sentimientos con franqueza y valora las emociones del otro. Busca un vínculo emocional profundo.',
  id: 'F: Mengekspresikan perasaan secara terbuka dan menghargai emosi pasangan. Mencari koneksi emosional yang dalam.',
  fr: 'F : exprime ses sentiments et valorise ceux du partenaire. Cherche une connexion émotionnelle profonde.',
  de: 'F: Zeigt Gefühle offen und achtet auf die des Partners. Sucht tiefe emotionale Nähe.',
  pt: 'F: Expressa sentimentos com franqueza e valoriza os do parceiro. Busca conexão emocional profunda.',
  hi: 'F: भावनाएँ खुलकर व्यक्त करता है और साथी की भावनाओं को महत्व देता है। गहरा भावनात्मक जुड़ाव चाहता है।',
  vi: 'F: Bày tỏ cảm xúc thẳng thắn và trân trọng cảm xúc đối phương. Muốn kết nối cảm xúc sâu sắc.',
  th: 'F: แสดงความรู้สึกตรงไปตรงมาและให้ความสำคัญกับอีกฝ่าย ต้องการเชื่อมโยงทางอารมณ์ที่ลึกซึ้ง',
}

const loveExpressT: FullLabelRow = {
  ko: 'T형: 논리적이고 차분한 표현을 선호합니다. 행동으로 사랑을 표현하는 경향이 있습니다.',
  en: 'T: Prefers calm, logical expression. Tends to show love through actions.',
  ja: 'T型：論理的で落ち着いた表現を好みます。行動で愛を示す傾向があります。',
  zh: 'T 型：偏好冷静、理性的表达，往往用行动表达爱。',
  es: 'T: Prefiere expresión lógica y serena. Suele mostrar amor con hechos.',
  id: 'T: Lebih suka ekspresi tenang dan logis. Cenderung menunjukkan cinta lewat tindakan.',
  fr: 'T : expression calme et logique. Montre souvent l’amour par les actes.',
  de: 'T: Mag ruhigen, logischen Ausdruck. Zeigt Liebe eher durch Taten.',
  pt: 'T: Prefere expressão lógica e calma. Costuma mostrar amor por ações.',
  hi: 'T: तार्किक, शांत अभिव्यक्ति पसंद करता है। प्यार कार्यों से दिखाता है।',
  vi: 'T: Thích diễn đạt điềm tĩnh, logic. Thường thể hiện tình yêu bằng hành động.',
  th: 'T: ชอบการแสดงออกแบบมีเหตุผลและนิ่ง มักแสดงความรักผ่านการกระทำ',
}

const careerStyleJ: FullLabelRow = {
  ko: 'J형: 체계적이고 계획적인 업무 방식을 선호합니다. 마감일을 중시하며 체계적으로 일을 진행합니다.',
  en: 'J: Prefers structured, planned work. Takes deadlines seriously and proceeds methodically.',
  ja: 'J型：体系的で計画的な仕事の進め方を好みます。締切を重視し、着実に進めます。',
  zh: 'J 型：偏好有条理、有计划的工作方式，重视截止日期并按部就班推进。',
  es: 'J: Prefiere trabajo planificado y estructurado. Respeta plazos y avanza con método.',
  id: 'J: Lebih suka kerja terstruktur dan terencana. Menghargai tenggat dan bergerak metodis.',
  fr: 'J : travail structuré et planifié. Respecte les échéances et avance méthodiquement.',
  de: 'J: Mag geplante, strukturierte Arbeit. Hält Fristen ein und arbeitet methodisch.',
  pt: 'J: Prefere trabalho planejado e estruturado. Leva prazos a sério e avança com método.',
  hi: 'J: संरचित, योजनाबद्ध काम पसंद करता है। समय सीमा का सम्मान करता है।',
  vi: 'J: Thích làm việc có kế hoạch, có cấu trúc. Coi trọng deadline và làm có phương pháp.',
  th: 'J: ชอบทำงานเป็นระบบมีแผน ให้ความสำคัญกับเส้นตายและดำเนินการเป็นขั้นตอน',
}

const careerStyleP: FullLabelRow = {
  ko: 'P형: 유연하고 적응적인 업무 방식을 선호합니다. 상황에 맞춰 빠르게 대응하고 변화를 잘 받아들입니다.',
  en: 'P: Prefers flexible, adaptive work. Responds quickly to situations and embraces change.',
  ja: 'P型：柔軟で適応的な仕事の進め方を好みます。状況に合わせて素早く対応し、変化を受け入れます。',
  zh: 'P 型：偏好灵活、适应性强的工作方式，能随情境快速应变并乐于接受变化。',
  es: 'P: Prefiere trabajo flexible y adaptable. Reacciona rápido y acepta el cambio.',
  id: 'P: Lebih suka kerja fleksibel dan adaptif. Merespons situasi dengan cepat dan menerima perubahan.',
  fr: 'P : travail flexible et adaptable. Réagit vite et accepte le changement.',
  de: 'P: Mag flexibles, adaptives Arbeiten. Reagiert schnell und nimmt Veränderung an.',
  pt: 'P: Prefere trabalho flexível e adaptável. Reage rápido e aceita mudanças.',
  hi: 'P: लचीला, अनुकूलनीय काम पसंद करता है। तेज़ प्रतिक्रिया और बदलाव स्वीकार करता है।',
  vi: 'P: Thích làm việc linh hoạt, thích ứng. Phản ứng nhanh và chấp nhận thay đổi.',
  th: 'P: ชอบทำงานยืดหยุ่นปรับตัวได้ ตอบสนองสถานการณ์ได้เร็วและยอมรับการเปลี่ยนแปลง',
}

const leadershipE: FullLabelRow = {
  ko: 'E형: 적극적이고 주도적인 리더십을 보입니다. 팀을 이끌고 영감을 주는 역할에 적합합니다.',
  en: 'E: Shows proactive, driving leadership. Fits roles that lead teams and inspire others.',
  ja: 'E型：積極的で主導的なリーダーシップを発揮します。チームを率い、刺激を与える役に向きます。',
  zh: 'E 型：展现积极主动的领导力，适合带领团队、激励他人的角色。',
  es: 'E: Liderazgo proactivo y empuje. Encaja en roles que guían equipos e inspiran.',
  id: 'E: Menunjukkan kepemimpinan proaktif dan mendorong. Cocok memimpin tim dan menginspirasi orang lain.',
  fr: 'E : leadership proactif et moteur. Convient pour diriger et inspirer une équipe.',
  de: 'E: Proaktive, treibende Führung. Passt zu Rollen, die Teams führen und inspirieren.',
  pt: 'E: Liderança proativa e motriz. Combina com liderar equipes e inspirar.',
  hi: 'E: सक्रिय, अग्रणी नेतृत्व। टीम का नेतृत्व और प्रेरणा के लिए उपयुक्त।',
  vi: 'E: Lãnh đạo chủ động, dẫn dắt. Hợp với vai trò dẫn dắt nhóm và truyền cảm hứng.',
  th: 'E: ภาวะผู้นำที่กระตือรือรือและขับเคลื่อน เหมาะกับบทบาทที่นำทีมและสร้างแรงบันดาลใจ',
}

const leadershipI: FullLabelRow = {
  ko: 'I형: 신중하고 신뢰할 수 있는 리더십을 보입니다. 깊이 있는 생각과 전략으로 팀을 이끕니다.',
  en: 'I: Shows careful, dependable leadership. Leads the team with deep thought and strategy.',
  ja: 'I型：慎重で信頼できるリーダーシップを発揮します。深い思考と戦略でチームを導きます。',
  zh: 'I 型：展现审慎、可靠的领导力，以深思熟虑与策略带领团队。',
  es: 'I: Liderazgo cuidadoso y confiable. Guía al equipo con reflexión y estrategia.',
  id: 'I: Menunjukkan kepemimpinan hati-hati dan dapat diandalkan. Memimpin tim dengan pemikiran dan strategi mendalam.',
  fr: 'I : leadership prudent et fiable. Mène l’équipe par la réflexion et la stratégie.',
  de: 'I: Bedachte, verlässliche Führung. Führt mit Tiefgang und Strategie.',
  pt: 'I: Liderança cuidadosa e confiável. Guia a equipe com reflexão e estratégia.',
  hi: 'I: सावधान, भरोसेमंद नेतृत्व। गहरी सोच और रणनीति से टीम का नेतृत्व।',
  vi: 'I: Lãnh đạo thận trọng, đáng tin. Dẫn dắt nhóm bằng tư duy và chiến lược.',
  th: 'I: ภาวะผู้นำที่รอบคอบและน่าเชื่อถือ นำทีมด้วยความคิดเชิงลึกและกลยุทธ์',
}

const compatUnlockedDetail: Record<MbtiCompatTier, FullLabelRow> = {
  best: {
    ko: '완벽한 균형을 이루는 조합으로 깊은 유대감을 형성할 수 있습니다.',
    en: 'A balanced pairing that can build a deep sense of connection.',
    ja: '完璧なバランスの組み合わせで、深い絆を築けます。',
    zh: '彼此平衡的组合，能建立深厚的连结感。',
    es: 'Una combinación equilibrada que puede crear un vínculo profundo.',
    id: 'Pasangan seimbang yang dapat membangun ikatan yang dalam.',
    fr: 'Une combinaison équilibrée qui peut créer un lien profond.',
    de: 'Ein ausgewogenes Paar, das tiefe Verbundenheit schaffen kann.',
    pt: 'Uma combinação equilibrada que pode criar laço profundo.',
    hi: 'संतुलित जोड़ जो गहरा जुड़ाव बना सकता है।',
    vi: 'Cặp đôi cân bằng, có thể tạo gắn kết sâu sắc.',
    th: 'คู่ที่สมดุลกัน สร้างความผูกพันลึกซึ้งได้',
  },
  good: {
    ko: '잘 맞는 조합으로 서로를 이해하고 지지할 수 있습니다.',
    en: 'A strong fit where you can understand and support each other.',
    ja: '相性の良い組み合わせで、互いを理解し支え合えます。',
    zh: '相当契合的组合，能够相互理解与支持。',
    es: 'Buena afinidad: pueden entenderse y apoyarse mutuamente.',
    id: 'Kecocokan kuat di mana kalian saling memahami dan mendukung.',
    fr: 'Bonne affinité : vous pouvez vous comprendre et vous soutenir.',
    de: 'Gute Passform: Ihr könnt euch verstehen und unterstützen.',
    pt: 'Boa afinidade: podem se entender e apoiar.',
    hi: 'अच्छा मिलान—एक-दूसरे को समझ और सहारा दे सकते हैं।',
    vi: 'Hợp tốt—có thể hiểu và hỗ trợ nhau.',
    th: 'เข้ากันได้ดี เข้าใจและสนับสนุนกันได้',
  },
  other: {
    ko: '차이를 이해하고 존중하려는 노력이 필요하지만 성장의 기회가 있습니다.',
    en: 'It takes effort to understand and respect differences—but there is room to grow together.',
    ja: '違いを理解し尊重する努力が必要ですが、共に成長する機会があります。',
    zh: '需要努力理解与尊重差异，但也有一起成长的空间。',
    es: 'Requiere esfuerzo entender y respetar las diferencias, pero hay espacio para crecer juntos.',
    id: 'Perlu usaha memahami dan menghormati perbedaan—tetapi ada ruang untuk tumbuh bersama.',
    fr: 'Il faut des efforts pour comprendre et respecter les différences—mais la croissance est possible.',
    de: 'Unterschiede zu achten braucht Arbeit—aber gemeinsames Wachstum ist möglich.',
    pt: 'Exige esforço para entender e respeitar diferenças—mas há espaço para crescer juntos.',
    hi: 'अंतर समझने और सम्मान में प्रयास चाहिए—साथ बढ़ने का अवसर है।',
    vi: 'Cần nỗ lực để hiểu và tôn trọng khác biệt—nhưng vẫn có chỗ để cùng phát triển.',
    th: 'ต้องพยายามเข้าใจและเคารพความต่าง—แต่มีโอกาสเติบโตไปด้วยกัน',
  },
}

export function mbtiCompatTier(
  bestMatch: boolean,
  goodMatch: boolean
): MbtiCompatTier {
  if (bestMatch) return 'best'
  if (goodMatch) return 'good'
  return 'other'
}

export function mbtiResultCompatScoreLine(lang: Language, tier: MbtiCompatTier): string {
  return pickLabel(compatScoreLine[tier], lang)
}

export function mbtiCompatTabScoreLabel(lang: Language, tier: MbtiCompatTier): string {
  return pickLabel(compatScoreShort[tier], lang)
}

export function mbtiCompatResultParagraph(lang: Language, tier: MbtiCompatTier): string {
  return pickLabel(compatResultParagraph[tier], lang)
}

export function mbtiCompatUnlockedDetail(lang: Language, tier: MbtiCompatTier): string {
  return pickLabel(compatUnlockedDetail[tier], lang)
}

export function mbtiPersonalityCommStyle(lang: Language, extravert: boolean): string {
  return pickLabel(extravert ? personalityCommE : personalityCommI, lang)
}

export function mbtiLoveExpressStyle(lang: Language, feeling: boolean): string {
  return pickLabel(feeling ? loveExpressF : loveExpressT, lang)
}

export function mbtiCareerWorkStyle(lang: Language, judging: boolean): string {
  return pickLabel(judging ? careerStyleJ : careerStyleP, lang)
}

export function mbtiCareerLeadership(lang: Language, extravert: boolean): string {
  return pickLabel(extravert ? leadershipE : leadershipI, lang)
}

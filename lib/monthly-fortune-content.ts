import type { FortuneContentLanguage } from './fortune-generator'

export type MonthlyParagraphPool = string[][] // index 0 = month 1, each inner array has exactly 3 variant paragraphs

type LanguageMonthlyBase = {
  flow: [string, string, string]
  monthLead: string[]
  opportunity: string[]
  caution: [string, string, string]
  advice: [string, string, string]
  accent: Record<string, [string, string, string]>
}

function buildMonthlyPool(base: LanguageMonthlyBase): MonthlyParagraphPool {
  return base.monthLead.map((lead, monthIdx) => {
    const chance = base.opportunity[monthIdx]
    return [0, 1, 2].map((v) =>
      `${base.flow[v]} ${lead} ${chance} ${base.caution[v]} ${base.advice[v]}`
    )
  })
}

const KO_BASE: LanguageMonthlyBase = {
  flow: [
    '이번 달은 호흡을 길게 가져가면 작은 파동도 내 편으로 돌릴 수 있는 시기다.',
    '달의 기운이 천천히 올라오며 선택의 기준을 또렷하게 세우게 만든다.',
    '분주한 장면이 많아도 중심만 지키면 흐름이 안정적으로 이어지는 달이다.',
  ],
  monthLead: [
    '새 출발의 의지가 강해져 목표를 다시 적고 우선순위를 정리할수록 방향이 선명해진다.',
    '관계의 온도가 성과를 좌우하니 협업에서 신뢰를 먼저 쌓으면 일이 부드럽게 풀린다.',
    '배움의 밀도가 높아져 공부와 자기계발에 투자한 시간이 다음 단계의 실력으로 축적된다.',
    '변화와 도전이 연속으로 들어오며 익숙한 틀을 벗어날수록 새로운 가능성이 열린다.',
    '돈의 흐름과 기회가 가까이 와 있어 정보를 빠르게 읽으면 유리한 선택을 만들 수 있다.',
    '사람 사이의 거리 조절이 핵심이라 말의 톤을 부드럽게 하면 오해가 빠르게 해소된다.',
    '실행력이 강해지는 구간이라 미뤄 둔 계획을 행동으로 옮기면 속도가 붙는다.',
    '그동안 쌓은 노력이 결과로 돌아오며 수확의 순간을 현실적으로 정리할 필요가 커진다.',
    '정리와 리셋에 적합한 달이라 일정, 공간, 감정을 비우면 집중력이 다시 살아난다.',
    '감정과 사랑의 결이 섬세해져 솔직한 대화가 관계의 깊이를 크게 바꾼다.',
    '업무와 비즈니스에서 판단력이 빛나니 수치와 근거를 챙길수록 결정이 단단해진다.',
    '한 해를 마무리하며 내년 준비를 병행하면 성취감과 안정감을 함께 가져갈 수 있다.',
  ],
  opportunity: [
    '작게 시작한 루틴이 빠르게 자리 잡아 연초 페이스를 끌어올리는 발판이 된다.',
    '도움을 주고받는 장면에서 예상보다 큰 제안이 들어올 수 있어 열린 태도가 이익이 된다.',
    '짧은 강의나 독서 메모 같은 기초 훈련이 의외의 연결을 만들어 준다.',
    '새로운 역할 제안이나 낯선 프로젝트가 커리어 폭을 넓히는 기회로 작동한다.',
    '부수입, 할인, 협상 여지처럼 숨은 포인트를 챙기면 체감 수익이 커진다.',
    '지인의 소개나 모임 재회가 유익한 인연으로 확장될 가능성이 높다.',
    '빠른 피드백과 즉시 실행이 경쟁 구간에서 눈에 띄는 성과를 만든다.',
    '완료된 과제의 성과를 정리해 공개하면 평판과 신뢰를 동시에 얻는다.',
    '버릴 것과 남길 것을 나누는 결정이 다음 분기 효율을 크게 높여 준다.',
    '다정한 표현 한마디가 관계의 긴장을 풀고 친밀도를 끌어올린다.',
    '협상, 제안서, 일정 관리에서 디테일을 챙기면 거래 조건이 개선된다.',
    '회고 기록을 남기면 내년 전략이 훨씬 구체적으로 설계된다.',
  ],
  caution: [
    '다만 초반 의욕만 믿고 과속하면 중반에 체력이 떨어질 수 있으니 리듬 조절이 필요하다.',
    '서두른 확신은 작은 신호를 놓치게 하므로 확인 없는 약속이나 지출은 한 번 더 점검하라.',
    '감정이 누적된 채 결정을 내리면 판단이 흔들릴 수 있어 휴식 없이 밀어붙이는 방식은 피하는 편이 좋다.',
  ],
  advice: [
    '핵심 한 가지를 매일 같은 시간에 반복하면 이번 달 성과가 눈에 띄게 커진다.',
    '기록과 대화를 병행해 기준을 외부에 공유하면 협력 운이 확실히 올라간다.',
    '완벽보다 지속을 택하고 주간 점검표를 쓰면 원하는 지점에 안정적으로 도착한다.',
  ],
  accent: {
    total: ['전체 분위기는 단단한 우상향이다.', '작은 균형 조정이 큰 차이를 만든다.', '속도보다 호흡이 운을 지킨다.'],
    wealth: ['돈은 흐름을 읽는 사람이 잡는다.', '지출 기준을 세우면 여유가 남는다.', '작은 절약이 큰 선택을 만든다.'],
    business: ['업무는 근거가 설득력이 된다.', '일정 관리가 성과의 절반이다.', '협상은 타이밍이 승부를 가른다.'],
    love: ['감정은 솔직함에서 힘을 얻는다.', '따뜻한 표현이 관계를 살린다.', '기대보다 이해가 먼저다.'],
    relationships: ['관계는 말의 온도에서 시작된다.', '경청이 갈등을 줄여 준다.', '선의의 한마디가 분위기를 바꾼다.'],
    health: ['수면 리듬이 컨디션을 지킨다.', '가벼운 스트레칭이 집중을 돕는다.', '휴식 계획도 일정에 넣어라.'],
  },
}

const EN_BASE: LanguageMonthlyBase = {
  flow: [
    'This month moves best when you keep a steady pace and make deliberate choices instead of reacting to every signal.',
    'Momentum builds gradually, and your decisions gain clarity when you return to a practical routine each day.',
    'Even with many moving pieces, the period stays workable if you protect your focus and avoid scattered priorities.',
  ],
  monthLead: [
    'January highlights fresh starts and goal setting, so rewriting your priorities gives the year a cleaner launch.',
    'February centers on relationships and cooperation, making trust and timing more valuable than solo speed.',
    'March favors study and self-development, and disciplined learning converts quickly into visible confidence.',
    'April brings change and challenge, where flexibility turns uncertainty into a strategic advantage.',
    'May emphasizes money and opportunity, rewarding careful comparison and timely financial decisions.',
    'June puts interpersonal dynamics in front, so tone and boundaries shape outcomes as much as effort.',
    'July rewards action and drive, and unfinished plans finally move when you commit to clear execution.',
    'August is about results and harvest, inviting you to consolidate gains instead of chasing distractions.',
    'September supports organization and reset, making cleanup the fastest path back to momentum.',
    'October deepens love and emotions, and honest conversation can repair distance faster than assumptions.',
    'November spotlights work and business, where structure and evidence strengthen every negotiation.',
    'December asks for closure and next-year preparation, pairing reflection with practical planning.',
  ],
  opportunity: [
    'A small repeatable habit can lock in early progress and set the tone for upcoming projects.',
    'Mutual support may open doors through introductions, partnerships, or well-timed collaboration.',
    'Notes from books, classes, or short practice sessions can become useful tools sooner than expected.',
    'A new role or demanding assignment can expand your range if you accept the learning curve.',
    'Hidden value appears in terms, discounts, and side options when you review details carefully.',
    'Reconnecting with people can produce unexpected alliances that are both warm and useful.',
    'Fast feedback loops and immediate follow-through create standout momentum in competitive situations.',
    'Sharing completed outcomes can improve both reputation and practical leverage for the next step.',
    'Deciding what to keep, automate, or remove unlocks extra energy for high-impact work.',
    'One gentle message can shift emotional weather and restore closeness with surprising speed.',
    'Better preparation in proposals and scheduling can improve deal quality without extra conflict.',
    'A clear year-end review can transform vague hopes into a realistic roadmap for the next cycle.',
  ],
  caution: [
    'Still, running on initial excitement alone can drain energy midmonth, so preserve your stamina and pacing.',
    'Quick certainty may hide critical details, so confirm commitments and spending before locking them in.',
    'If emotions pile up silently, judgment can wobble; avoid forcing final decisions without recovery time.',
  ],
  advice: [
    'Choose one priority and repeat it at the same time daily to create compounding results.',
    'Keep a brief written log and share expectations early so cooperation becomes easier and cleaner.',
    'Pick consistency over perfection and use a weekly checkpoint to stay aligned with your real target.',
  ],
  accent: {
    total: ['The month trends upward with discipline.', 'Small adjustments create major leverage.', 'Your rhythm matters more than speed.'],
    wealth: ['Money favors clear criteria.', 'Review terms before you commit.', 'Modest savings fund bigger choices.'],
    business: ['Evidence strengthens every proposal.', 'Calendar control protects output.', 'Timing decides negotiation outcomes.'],
    love: ['Honesty softens emotional distance.', 'Warm language changes the tone.', 'Understanding beats assumptions.'],
    relationships: ['Respectful tone keeps bonds steady.', 'Listening prevents avoidable conflict.', 'One thoughtful reply can reset trust.'],
    health: ['Sleep consistency supports everything.', 'Short movement breaks sharpen focus.', 'Schedule recovery as a real task.'],
  },
}

const JA_BASE: LanguageMonthlyBase = {
  flow: [
    '今月は勢いだけで進むより、呼吸を整えて一つずつ確かめるほど流れが味方になりやすい時期です。',
    '運びはゆっくり立ち上がりますが、日々の基準を決めると判断の精度が目に見えて上がっていきます。',
    '予定が重なっても軸を失わなければ、全体は安定して前進し、無理なく成果につなげられます。',
  ],
  monthLead: [
    '一月は新しい始まりと目標設定が主題で、優先順位を書き直すほど一年の見通しが整います。',
    '二月は人間関係と協力が中心となり、信頼を積む姿勢が結果の早さと質を左右します。',
    '三月は学びと自己成長に追い風があり、基礎を丁寧に積むほど実力が静かに伸びます。',
    '四月は変化と挑戦の連続で、慣れた型を少し外すことで新しい道が見えてきます。',
    '五月は金運と好機に焦点が当たり、比較検討を怠らない人ほど得を積み上げられます。',
    '六月は対人運が鍵となり、言葉の温度と距離感の調整が誤解を防ぎます。',
    '七月は行動力が高まり、先延ばしにしていた案件ほど着手後の伸びが速くなります。',
    '八月は成果と収穫の月で、積み重ねを見える形に整理すると評価が安定します。',
    '九月は整理とリセットに向き、手放す判断が次の集中力を生み出します。',
    '十月は恋愛と感情が深まり、本音を交わす対話が関係の質を大きく変えます。',
    '十一月は仕事とビジネスの比重が増し、根拠ある判断が交渉を有利に導きます。',
    '十二月は締めくくりと来年準備を同時に進めるほど、安心感のある年越しになります。',
  ],
  opportunity: [
    '小さな習慣を先に固定すると、年初の流れを長く保つ土台になります。',
    '助け合いの場面から、想定外に有益な提案や紹介が入りやすくなります。',
    '短い講座や読書メモの継続が、実務で使える発想に結びつきます。',
    '新役割や難度の高い案件が、守備範囲を広げる好機として働きます。',
    '条件の見直しや細かな比較で、収支の体感を確実に改善できます。',
    '再会や紹介が、温かさと実利を兼ねた縁へ発展しやすいでしょう。',
    '即時の実行と素早い修正が、競争局面で一歩抜ける力になります。',
    '完了した成果を共有すると、信用と次のチャンスが同時に育ちます。',
    '残すものと削るものを分ける決断が、次月の効率を底上げします。',
    '短い気遣いの言葉が、感情の行き違いをほどく鍵になります。',
    '提案資料と日程設計を詰めるほど、取引条件の改善余地が広がります。',
    '振り返りの記録を残すことで、来年の計画が具体的な戦略に変わります。',
  ],
  caution: [
    'ただし序盤の熱量だけで走ると中盤に息切れしやすいので、配分を意識してください。',
    '早合点は小さな見落としを招くため、約束や支出は最終確認を入れると安心です。',
    '感情をためたまま結論を急ぐと判断がぶれるので、休息なしの押し切りは避けましょう。',
  ],
  advice: [
    '最重要の一点を毎日同じ時間に進めると、手応えが一段深まります。',
    '短い記録と早めの共有を続けると、協力が自然に集まりやすくなります。',
    '完璧さより継続を選び、週ごとに軌道修正すると安定して到達できます。',
  ],
  accent: {
    total: ['今月は着実な上向きです。', '小さな調整が大きく効きます。', '速さよりリズムが鍵です。'],
    wealth: ['お金は基準の明確さが守ります。', '条件確認が損失を防ぎます。', '小さな節約が選択肢を増やします。'],
    business: ['根拠が交渉力を高めます。', '予定管理が成果を支えます。', 'タイミングが勝負を分けます。'],
    love: ['本音が距離を縮めます。', 'やさしい言葉が空気を変えます。', '思い込みより対話を優先しましょう。'],
    relationships: ['関係は言葉の温度で整います。', '傾聴が衝突を減らします。', '丁寧な返答が信頼を戻します。'],
    health: ['睡眠のリズムを守ってください。', '軽い運動が集中を助けます。', '休む予定も先に確保しましょう。'],
  },
}

const ZH_BASE: LanguageMonthlyBase = {
  flow: [
    '这个月更适合稳步推进，先把节奏握在手里，再做选择，很多事情会顺着你的安排展开，整体氛围偏向踏实而有方向。',
    '整体推进是缓慢上扬的，只要每天有清晰标准，你会发现判断越来越准，执行也更省力，不必被短期波动牵着走。',
    '即使任务同时出现，只要守住重点，不被杂讯牵走，局面依然能够稳定前进，越到月末越能看出积累的价值。',
  ],
  monthLead: [
    '一月强调新开始与目标重设，把优先顺序写清楚，全年开局会更干净。',
    '二月主题是关系与协作，先建立信任再谈效率，成果反而更快落地。',
    '三月适合学习与自我提升，持续输入与练习会迅速转化为实力。',
    '四月围绕变化与挑战，敢于调整旧方法，反而容易找到新机会。',
    '五月聚焦财富与机会，细看条件与时机，收益空间会被你放大。',
    '六月看重人际互动，语气与边界拿捏得当，很多误会能提前化解。',
    '七月行动力增强，拖延已久的计划一旦启动，就会形成连续推进。',
    '八月进入结果与收获期，把阶段成果整理出来会得到更稳定认可。',
    '九月适合整理与重启，删减无效负担后，注意力会明显回到正轨。',
    '十月偏向爱情与情绪，真诚表达比猜测更能拉近彼此距离。',
    '十一月重心落在工作与业务，数据与结构准备充分，谈判更有底气。',
    '十二月要兼顾收尾与明年准备，复盘越具体，下一轮越容易起步。',
  ],
  opportunity: [
    '先固定一个可重复的小习惯，会成为本月最稳的加速器。',
    '互相支持的场景里，容易出现意料之外的合作或引荐机会。',
    '短课程、读书笔记和小练习，会在实务场景里很快派上用场。',
    '新职责或高难度任务，可能成为你扩展能力边界的入口。',
    '优惠条款、补充方案和议价空间里藏着可观的增益。',
    '旧友重联或圈层再遇，可能延伸出兼具温度与价值的关系。',
    '快速反馈加立即执行，会在竞争场景中形成明显优势。',
    '公开展示已完成成果，可同时提升口碑与后续筹码。',
    '明确保留与舍弃的清单，会直接提升下阶段效率。',
    '一句体贴的话，往往就能缓和情绪并修复连接。',
    '提前打磨提案与排期，合作条件通常会出现改善空间。',
    '把年度记录写下来，明年的策略会从愿望变成方案。',
  ],
  caution: [
    '但如果只靠开头的冲劲硬推，中段容易疲惫，节奏管理必须提前安排，否则好机会也可能因体力不支而错过。',
    '过早下结论会漏掉关键信号，承诺与支出最好再做一次核对，把细节确认清楚能避免后续反复。',
    '情绪累积时勉强拍板容易偏差，别在没有休整的状态里做终局决定，先稳住心态再行动会更稳妥。',
  ],
  advice: [
    '选一件最关键的事，每天在固定时段推进，结果会持续放大，月底回顾时往往能看到明显进步。',
    '保持简短记录并尽早对齐预期，协作会顺畅许多，周围人的建议也值得认真听取。',
    '优先选择可持续而非完美，配合每周复盘，就能稳稳到位，一步一步走反而更容易超出预期。',
  ],
  accent: {
    total: ['本月趋势稳中向上。', '微调会带来大回报。', '节奏比速度更重要。'],
    wealth: ['财富偏爱有标准的人。', '先看条款再做决定。', '小额节省能换来大空间。'],
    business: ['证据让方案更有说服力。', '日程掌控决定产出质量。', '时机常常决定谈判结果。'],
    love: ['坦诚能缩短情感距离。', '温柔表达比沉默更有效。', '先理解，再判断。'],
    relationships: ['关系从说话分寸开始。', '认真倾听会减少冲突。', '及时回应能修复信任。'],
    health: ['先守住睡眠节律。', '轻量活动能提高清醒度。', '把休息写进计划里。'],
  },
}

const ES_BASE: LanguageMonthlyBase = {
  flow: [
    'Este mes rinde mejor cuando avanzas con ritmo constante y eliges con calma en lugar de reaccionar a todo.',
    'La energía sube de forma gradual, y tus decisiones se vuelven más precisas cuando vuelves a hábitos concretos.',
    'Aunque haya varios frentes abiertos, puedes sostener el rumbo si proteges la prioridad principal.',
  ],
  monthLead: [
    'Enero impulsa nuevos comienzos y metas claras; redefinir prioridades ordena todo el arranque.',
    'Febrero pone el foco en relaciones y cooperación; la confianza vale más que correr solo.',
    'Marzo favorece estudio y desarrollo personal; la práctica disciplinada se nota pronto.',
    'Abril trae cambio y desafío; adaptarte con flexibilidad abre puertas que antes no veías.',
    'Mayo activa dinero y oportunidades; revisar condiciones con detalle mejora tus resultados.',
    'Junio destaca vínculos interpersonales; el tono y los límites bien puestos evitan desgaste.',
    'Julio premia acción y empuje; lo postergado avanza cuando ejecutas sin rodeos.',
    'Agosto es de resultados y cosecha; consolidar lo logrado te da estabilidad real.',
    'Septiembre favorece organización y reinicio; limpiar lo innecesario recupera enfoque.',
    'Octubre intensifica amor y emociones; hablar con honestidad acerca posiciones.',
    'Noviembre enfatiza trabajo y negocio; método y evidencia fortalecen cada trato.',
    'Diciembre pide cierre y preparación del próximo año; balancear ambos te da tranquilidad.',
  ],
  opportunity: [
    'Un hábito pequeño pero repetible puede acelerar tu progreso desde el inicio.',
    'La ayuda mutua puede abrir propuestas, alianzas o contactos muy útiles.',
    'Notas de lectura, cursos cortos o práctica breve pueden convertirse en ventaja aplicada.',
    'Un rol nuevo o una tarea exigente puede ampliar tu campo profesional.',
    'En descuentos, términos y opciones secundarias puede estar la ganancia escondida.',
    'Reencuentros y presentaciones tienen potencial de volverse vínculos valiosos.',
    'Feedback rápido y ejecución inmediata te destacan en contextos competitivos.',
    'Mostrar resultados concretos mejora reputación y margen para negociar lo siguiente.',
    'Decidir qué mantener y qué soltar eleva mucho tu eficiencia del próximo tramo.',
    'Un mensaje amable puede cambiar el clima emocional en pocos minutos.',
    'Afinar propuesta y calendario suele mejorar condiciones sin aumentar tensión.',
    'Una revisión anual bien escrita convierte intenciones en plan accionable.',
  ],
  caution: [
    'Aun así, si te apoyas solo en el entusiasmo inicial, puedes llegar fatigado a mitad de mes.',
    'La certeza apresurada oculta detalles críticos; confirma compromisos y gastos antes de cerrar.',
    'Si acumulas emoción sin pausa, el criterio se vuelve inestable; evita decidir al límite.',
  ],
  advice: [
    'Elige una prioridad central y trabájala a la misma hora cada día para crear tracción.',
    'Lleva un registro breve y alinea expectativas con anticipación para facilitar la cooperación.',
    'Prefiere consistencia antes que perfección y revisa semanalmente el rumbo real.',
  ],
  accent: {
    total: ['La tendencia del mes es favorable.', 'Un ajuste pequeño cambia mucho.', 'Tu ritmo sostiene la suerte.'],
    wealth: ['El dinero premia criterios claros.', 'Revisa términos antes de firmar.', 'Ahorrar poco y constante suma poder.'],
    business: ['La evidencia vende mejor que la prisa.', 'La agenda ordenada protege resultados.', 'El momento correcto define acuerdos.'],
    love: ['La sinceridad acorta distancias.', 'La ternura cambia conversaciones.', 'Comprender primero evita choques.'],
    relationships: ['El vínculo depende del tono.', 'Escuchar reduce conflictos.', 'Responder a tiempo recupera confianza.'],
    health: ['Dormir regular mejora todo.', 'Moverte un poco afina la mente.', 'Programa descanso como tarea real.'],
  },
}

const FR_BASE: LanguageMonthlyBase = {
  flow: [
    'Ce mois-ci, les choses avancent mieux avec un rythme stable et des choix réfléchis plutôt qu’avec la précipitation.',
    'La dynamique monte progressivement, et tes décisions gagnent en justesse quand tes repères quotidiens restent simples.',
    'Même avec plusieurs sujets en parallèle, la période reste maîtrisable si tu protèges l’essentiel.',
  ],
  monthLead: [
    'Janvier favorise le nouveau départ et les objectifs; clarifier les priorités donne un cap net.',
    'Février met l’accent sur les relations et la coopération; la confiance fait gagner du temps.',
    'Mars soutient l’étude et l’évolution personnelle; l’apprentissage régulier devient vite concret.',
    'Avril apporte changement et défi; l’adaptation ouvre des pistes inattendues.',
    'Mai concerne finances et opportunités; comparer avec précision améliore les décisions.',
    'Juin insiste sur l’équilibre relationnel; la qualité du dialogue évite les malentendus.',
    'Juillet valorise l’action et l’élan; les projets reportés repartent franchement.',
    'Août correspond aux résultats et à la récolte; structurer les acquis renforce ta position.',
    'Septembre est idéal pour organiser et repartir; alléger l’inutile rend l’énergie disponible.',
    'Octobre touche l’amour et les émotions; une parole sincère rapproche vraiment.',
    'Novembre souligne travail et business; méthode et preuves sécurisent les négociations.',
    'Décembre demande clôture et préparation de l’an prochain; les deux ensemble apportent de la sérénité.',
  ],
  opportunity: [
    'Une petite habitude répétable peut installer un socle très efficace dès le début.',
    'L’entraide peut amener des propositions ou des connexions plus fortes que prévu.',
    'Cours courts, lecture active et notes pratiques deviennent rapidement utiles.',
    'Un nouveau rôle exigeant peut élargir ton périmètre de compétences.',
    'Des gains se cachent dans les conditions, remises et marges de négociation.',
    'Retrouvailles et recommandations peuvent évoluer en alliances solides.',
    'Réagir vite puis ajuster immédiatement crée un avantage visible.',
    'Mettre en avant ce qui est déjà accompli renforce image et influence.',
    'Choisir ce que tu gardes, automatises ou supprimes libère une grande capacité.',
    'Un message attentionné peut calmer une tension émotionnelle en peu de temps.',
    'Un dossier mieux préparé améliore souvent les conditions d’accord.',
    'Un vrai bilan d’année transforme les intentions en plan clair.',
  ],
  caution: [
    'Mais si tu comptes seulement sur l’enthousiasme du départ, la fatigue peut arriver au milieu du mois.',
    'Une conviction trop rapide fait oublier des détails; vérifie engagements et dépenses avant validation.',
    'Décider sous charge émotionnelle prolongée fragilise le jugement; ménage des temps de récupération.',
  ],
  advice: [
    'Choisis une priorité majeure et traite-la chaque jour à heure fixe pour ancrer les progrès.',
    'Garde une trace concise et partage tôt les attentes afin de fluidifier la coopération.',
    'Mise sur la continuité plutôt que la perfection, avec un point hebdomadaire de recalage.',
  ],
  accent: {
    total: ['Le mois évolue favorablement.', 'Un micro-ajustement crée un grand effet.', 'Le rythme compte plus que la vitesse.'],
    wealth: ['Les finances aiment les règles claires.', 'Relis les conditions avant de t’engager.', 'L’épargne régulière ouvre des choix.'],
    business: ['Les preuves renforcent chaque proposition.', 'Un agenda net protège la performance.', 'Le bon timing décide souvent du résultat.'],
    love: ['La sincérité rapproche rapidement.', 'La douceur change le ton.', 'Comprendre d’abord évite les tensions.'],
    relationships: ['Le lien se joue dans la manière de parler.', 'Écouter réduit les frictions.', 'Une réponse soignée répare la confiance.'],
    health: ['La régularité du sommeil est centrale.', 'Un mouvement léger améliore la concentration.', 'Planifie le repos comme un rendez-vous.'],
  },
}

const DE_BASE: LanguageMonthlyBase = {
  flow: [
    'Dieser Monat funktioniert am besten mit ruhigem Takt und klaren Entscheidungen statt hektischer Reaktionen.',
    'Die Entwicklung steigt schrittweise, und deine Urteile werden treffsicherer, wenn du bei einfachen Routinen bleibst.',
    'Auch mit mehreren offenen Themen bleibt die Lage gut steuerbar, solange der Fokus geschützt ist.',
  ],
  monthLead: [
    'Im Januar stehen Neustart und Zielklarheit im Vordergrund; saubere Prioritäten geben dem Jahr Richtung.',
    'Im Februar zählen Beziehungen und Zusammenarbeit; Vertrauen bringt schneller tragfähige Ergebnisse.',
    'Im März fördern Lernen und Selbstentwicklung den Fortschritt; konsequentes Üben zahlt sich sofort aus.',
    'Im April prägen Wandel und Herausforderung den Alltag; Flexibilität öffnet neue Optionen.',
    'Im Mai rücken Finanzen und Chancen in den Fokus; genaue Prüfung verbessert den Ertrag.',
    'Im Juni ist Zwischenmenschliches entscheidend; Tonfall und Grenzen verhindern Reibungsverluste.',
    'Im Juli werden Tatkraft und Antrieb stark; verschobene Vorhaben kommen endlich in Bewegung.',
    'Im August geht es um Resultate und Ernte; geordnete Darstellung von Erfolgen stärkt deine Position.',
    'Im September unterstützen Ordnung und Reset; das Aussortieren gibt dir Energie zurück.',
    'Im Oktober stehen Liebe und Gefühle im Zentrum; ehrliche Gespräche bauen Distanz ab.',
    'Im November dominieren Arbeit und Geschäft; Struktur und Fakten verbessern jede Verhandlung.',
    'Im Dezember verbinden sich Abschluss und Vorbereitung aufs neue Jahr; das gibt Stabilität.',
  ],
  opportunity: [
    'Eine kleine, wiederholbare Gewohnheit kann deinen Monatsstart deutlich beschleunigen.',
    'Gegenseitige Unterstützung kann zu wertvollen Angeboten oder Kontakten führen.',
    'Kurzformate beim Lernen liefern schneller als gedacht anwendbare Vorteile.',
    'Eine neue Rolle oder ein anspruchsvolles Projekt erweitert dein berufliches Spektrum.',
    'In Konditionen, Rabatten und Nebenoptionen steckt oft unterschätzter Mehrwert.',
    'Wiederaufgenommene Kontakte können zu hilfreichen Allianzen wachsen.',
    'Schnelles Feedback plus direkte Umsetzung erzeugt sichtbaren Vorsprung.',
    'Wenn du Ergebnisse aktiv zeigst, steigen Vertrauen und Handlungsspielraum zugleich.',
    'Klare Entscheidungen über Behalten, Automatisieren und Streichen steigern die Effizienz.',
    'Eine warme Nachricht kann emotionale Spannung überraschend schnell lösen.',
    'Bessere Vorbereitung bei Angebot und Zeitplan hebt die Verhandlungsqualität.',
    'Ein sauberer Jahresrückblick macht aus Vorsätzen einen realistischen Plan.',
  ],
  caution: [
    'Wenn du jedoch nur vom Anfangselan lebst, droht zur Monatsmitte ein deutlicher Energieeinbruch.',
    'Zu frühe Gewissheit blendet Details aus; prüfe Zusagen und Ausgaben vor dem finalen Schritt.',
    'Unter aufgestautem Druck leiden Entscheidungen; vermeide endgültige Beschlüsse ohne Erholung.',
  ],
  advice: [
    'Wähle eine Kernaufgabe und bearbeite sie täglich zur gleichen Zeit, damit Fortschritt kumuliert.',
    'Halte kurze Notizen fest und kläre Erwartungen früh, damit Zusammenarbeit reibungslos bleibt.',
    'Setze auf Beständigkeit statt Perfektion und kalibriere den Kurs einmal pro Woche nach.',
  ],
  accent: {
    total: ['Der Monat zeigt stabile Aufwärtstendenz.', 'Kleine Korrekturen wirken stark.', 'Rhythmus schlägt reines Tempo.'],
    wealth: ['Klare Regeln schützen dein Geld.', 'Vertragsdetails zuerst prüfen.', 'Regelmäßiges Sparen erweitert Optionen.'],
    business: ['Belege erhöhen Überzeugungskraft.', 'Planung sichert Ergebnisse.', 'Timing entscheidet Verhandlungen.'],
    love: ['Ehrlichkeit verkürzt emotionale Distanz.', 'Wärme verändert den Ton.', 'Erst verstehen, dann bewerten.'],
    relationships: ['Beziehungen leben vom Umgangston.', 'Zuhören senkt Konfliktpotenzial.', 'Sorgfältige Antworten bauen Vertrauen auf.'],
    health: ['Konstanter Schlaf stabilisiert Leistung.', 'Kurze Bewegung stärkt Fokus.', 'Erholung gehört in den Kalender.'],
  },
}

const PT_BASE: LanguageMonthlyBase = {
  flow: [
    'Neste mês, tudo rende mais quando você mantém constância e decide com calma, sem reagir a cada ruído.',
    'O movimento cresce aos poucos, e suas escolhas ficam mais certeiras quando a rotina tem critérios simples.',
    'Mesmo com demandas simultâneas, o período permanece favorável se você proteger o foco principal.',
  ],
  monthLead: [
    'Janeiro pede recomeço e metas claras; revisar prioridades organiza o ano desde o início.',
    'Fevereiro destaca relacionamentos e cooperação; confiança abre caminho mais rápido que pressa isolada.',
    'Março favorece estudo e desenvolvimento pessoal; prática consistente vira competência visível.',
    'Abril traz mudança e desafio; flexibilidade transforma incerteza em avanço real.',
    'Maio acende temas de dinheiro e oportunidade; comparar bem as condições melhora o ganho.',
    'Junho coloca as relações interpessoais em evidência; tom e limites evitam desgaste.',
    'Julho impulsiona ação e iniciativa; planos adiados andam quando a execução começa.',
    'Agosto foca resultados e colheita; consolidar entregas fortalece sua posição.',
    'Setembro combina organização e reinício; limpar excessos devolve energia produtiva.',
    'Outubro aprofunda amor e emoções; conversa honesta aproxima mais do que suposições.',
    'Novembro enfatiza trabalho e negócios; método e dados elevam o poder de negociação.',
    'Dezembro pede fechamento e preparo do próximo ano; equilibrar os dois traz segurança.',
  ],
  opportunity: [
    'Um hábito pequeno e repetível pode acelerar seu ritmo logo nas primeiras semanas.',
    'Apoio mútuo tende a abrir propostas, parcerias e contatos bem posicionados.',
    'Curso curto, leitura ativa e anotações práticas viram vantagem aplicada rapidamente.',
    'Um papel novo ou projeto exigente pode ampliar seu alcance profissional.',
    'Valor escondido aparece em termos, descontos e alternativas complementares.',
    'Reencontros e indicações podem se transformar em vínculos úteis e confiáveis.',
    'Feedback rápido com ação imediata cria destaque em cenários competitivos.',
    'Ao mostrar resultados concretos, você fortalece reputação e margem de escolha.',
    'Definir o que manter e o que cortar aumenta bastante sua eficiência.',
    'Uma mensagem gentil pode mudar o clima emocional e reaproximar pessoas.',
    'Preparação melhor de proposta e agenda tende a melhorar acordos.',
    'Uma retrospectiva bem escrita converte desejo em plano praticável.',
  ],
  caution: [
    'Ainda assim, confiar só no entusiasmo inicial pode gerar queda de energia no meio do mês.',
    'Certeza apressada esconde detalhe importante; revise compromissos e gastos antes de fechar.',
    'Decidir sob acúmulo emocional reduz clareza; evite conclusões finais sem pausa de recuperação.',
  ],
  advice: [
    'Escolha uma prioridade central e trabalhe nela no mesmo horário todos os dias.',
    'Registre avanços em poucas linhas e alinhe expectativas cedo para cooperar melhor.',
    'Prefira constância à perfeição e faça checagem semanal para manter o rumo.',
  ],
  accent: {
    total: ['A tendência do mês é positiva.', 'Pequenos ajustes geram grande efeito.', 'Ritmo consistente protege seu avanço.'],
    wealth: ['Dinheiro responde a critérios claros.', 'Leia condições antes de assumir.', 'Economia regular amplia escolhas.'],
    business: ['Evidência fortalece qualquer proposta.', 'Agenda organizada sustenta resultado.', 'Timing define muitas negociações.'],
    love: ['Sinceridade aproxima de verdade.', 'Delicadeza muda o tom da relação.', 'Compreender primeiro evita atrito.'],
    relationships: ['Relações melhoram com fala respeitosa.', 'Escuta ativa reduz conflitos.', 'Resposta cuidadosa reconstrói confiança.'],
    health: ['Sono regular sustenta desempenho.', 'Movimento leve melhora foco.', 'Inclua descanso no planejamento.'],
  },
}

const HI_BASE: LanguageMonthlyBase = {
  flow: [
    'इस महीने काम सबसे बेहतर तब चलेगा जब आप स्थिर लय रखें और हर संकेत पर तुरंत प्रतिक्रिया देने के बजाय सोचकर कदम उठाएँ।',
    'गति धीरे-धीरे ऊपर जाएगी, और रोज की स्पष्ट दिनचर्या आपके फैसलों को ज्यादा सटीक और भरोसेमंद बनाएगी।',
    'एक साथ कई जिम्मेदारियां रहेंगी, फिर भी प्राथमिकता साफ रखेंगे तो पूरा महीना नियंत्रण में रहेगा।',
  ],
  monthLead: [
    'जनवरी नई शुरुआत और लक्ष्य तय करने का समय है; प्राथमिकताएं लिखने से साल की दिशा साफ होती है।',
    'फरवरी रिश्तों और सहयोग पर केंद्रित है; भरोसा बनाकर चलना अकेले तेज भागने से बेहतर परिणाम देगा।',
    'मार्च पढ़ाई और आत्म-विकास के लिए अनुकूल है; अनुशासित अभ्यास जल्दी प्रभाव दिखाएगा।',
    'अप्रैल बदलाव और चुनौती लेकर आएगा; लचीला दृष्टिकोण नए रास्ते खोल सकता है।',
    'मई धन और अवसर का महीना है; शर्तों की बारीक जांच से लाभ बढ़ेगा।',
    'जून में पारस्परिक संबंध अहम रहेंगे; बोलने का तरीका और सीमाएं स्थिति संभालेंगी।',
    'जुलाई में कार्यशीलता और ड्राइव बढ़ेगी; रुके हुए काम तेजी से आगे बढ़ सकते हैं।',
    'अगस्त परिणाम और प्राप्ति का समय है; उपलब्धियों को व्यवस्थित करना भविष्य के लिए उपयोगी रहेगा।',
    'सितंबर संगठन और रीसेट का चरण है; अनावश्यक चीजें हटाकर फोकस लौटेगा।',
    'अक्टूबर प्रेम और भावनाओं को गहराई देगा; खुलकर संवाद करने से दूरी कम होगी।',
    'नवंबर काम और व्यवसाय को प्रमुखता देगा; तथ्य और योजना से बातचीत मजबूत होगी।',
    'दिसंबर समापन और अगले वर्ष की तैयारी साथ-साथ मांगता है; यही संयोजन स्थिरता देगा।',
  ],
  opportunity: [
    'छोटी लेकिन दोहराई जा सकने वाली आदत शुरुआत में मजबूत बढ़त बना सकती है।',
    'आपसी सहयोग से उम्मीद से बेहतर प्रस्ताव या संपर्क मिल सकते हैं।',
    'छोटे कोर्स, पढ़ाई नोट्स और नियमित अभ्यास जल्दी व्यावहारिक लाभ देंगे।',
    'नई भूमिका या कठिन प्रोजेक्ट आपकी क्षमता का दायरा बढ़ा सकता है।',
    'छिपा फायदा अक्सर शर्तों, छूट और वैकल्पिक विकल्पों में मिलता है।',
    'पुराने परिचितों से फिर जुड़ना उपयोगी नेटवर्क में बदल सकता है।',
    'तेज फीडबैक और तुरंत अमल आपको प्रतिस्पर्धा में आगे रखेगा।',
    'पूर्ण कामों को साझा करने से भरोसा और अगला मौका दोनों बढ़ेंगे।',
    'क्या रखना है और क्या हटाना है, इसका निर्णय दक्षता बढ़ा देगा।',
    'एक संवेदनशील संदेश भावनात्मक दूरी को जल्दी कम कर सकता है।',
    'प्रस्ताव और समय-योजना की तैयारी सौदे की शर्तें बेहतर कर सकती है।',
    'वर्ष-अंत समीक्षा लिखने से अगले साल की योजना व्यवहारिक बनती है।',
  ],
  caution: [
    'फिर भी सिर्फ शुरुआती उत्साह पर चलने से महीने के बीच में ऊर्जा गिर सकती है, इसलिए गति संतुलित रखें।',
    'जल्दी बनी निश्चितता जरूरी विवरण छिपा देती है; प्रतिबद्धता और खर्च दोबारा जांचें।',
    'भावनात्मक दबाव में तुरंत अंतिम निर्णय लेने से भ्रम बढ़ सकता है; पहले रिकवरी लें।',
  ],
  advice: [
    'एक मुख्य प्राथमिकता चुनें और उसे रोज लगभग एक ही समय पर आगे बढ़ाएं।',
    'संक्षिप्त लिखित रिकॉर्ड रखें और अपेक्षाएं पहले साझा करें, सहयोग आसान होगा।',
    'पूर्णता के बजाय निरंतरता चुनें और साप्ताहिक समीक्षा से दिशा सुधारते रहें।',
  ],
  accent: {
    total: ['महीने की दिशा स्थिर रूप से बेहतर है।', 'छोटा सुधार बड़ा असर देगा।', 'गति नहीं, लय आपकी ताकत है।'],
    wealth: ['धन स्पष्ट मानदंड वालों का साथ देता है।', 'शर्तें पढ़कर ही निर्णय लें।', 'नियमित बचत बड़े विकल्प बनाती है।'],
    business: ['तथ्य आपकी बात को मजबूत बनाते हैं।', 'समय प्रबंधन आधी जीत है।', 'सही समय पर बात करना जरूरी है।'],
    love: ['सच बोलना दूरी घटाता है।', 'कोमल शब्द रिश्ते बचाते हैं।', 'पहले समझें, फिर निष्कर्ष लें।'],
    relationships: ['रिश्ते बोलने के ढंग से बनते हैं।', 'ध्यान से सुनना टकराव घटाता है।', 'समय पर जवाब भरोसा लौटाता है।'],
    health: ['नींद की लय संभालकर रखें।', 'हलचल और स्ट्रेचिंग फोकस बढ़ाते हैं।', 'आराम को भी योजना में रखें।'],
  },
}

const VI_BASE: LanguageMonthlyBase = {
  flow: [
    'Thang nay hieu qua nhat khi ban giu nhip deu va quyet dinh co chu y, khong phan ung voi moi tin hieu nho.',
    'Dong luc tang dan theo tung tuan, va phan doan cua ban se chac hon neu quay ve nhung ne nep don gian.',
    'Du nhieu viec den cung luc, ban van giu duoc the chu dong neu uu tien duoc bao ve ro rang.',
  ],
  monthLead: [
    'Thang 1 nhan manh khoi dau moi va muc tieu; sap xep lai uu tien giup nam moi vao nep nhanh hon.',
    'Thang 2 tap trung vao quan he va hop tac; xay dung niem tin se hieu qua hon viec tu minh tang toc.',
    'Thang 3 thuan loi cho hoc tap va phat trien ban than; ren luyen deu dan se thay ket qua som.',
    'Thang 4 mang den thay doi va thu thach; linh hoat cach lam mo ra huong di moi.',
    'Thang 5 nghieng ve tai chinh va co hoi; xem ky dieu kien de toi uu loi ich.',
    'Thang 6 de cao tuong tac giua nguoi voi nguoi; cach noi va gioi han giup giam hieu lam.',
    'Thang 7 tang manh hanh dong va dong luc; ke hoach tre han se bat dau chay nhanh.',
    'Thang 8 la giai doan ket qua va thu hoach; tong hop thanh qua giup vi the on dinh hon.',
    'Thang 9 hop voi sap xep va lam moi; loai bo thu du thua se tra lai su tap trung.',
    'Thang 10 lien quan tinh cam va cam xuc; doi thoai that long de xoa khoang cach.',
    'Thang 11 uu tien cong viec va kinh doanh; du lieu va cau truc giup dam phan vung vang.',
    'Thang 12 can vua ket thuc vua chuan bi nam sau; tong ket cu the se de bat dau hon.',
  ],
  opportunity: [
    'Mot thoi quen nho lap lai duoc co the tao da tang truong rat som.',
    'Tinh huong ho tro lan nhau de mo ra de xuat hoac ket noi gia tri.',
    'Khoa hoc ngan, ghi chu doc sach va luyen tap nho se som thanh loi the.',
    'Vai tro moi hay du an kho co the mo rong nang luc nghe nghiep.',
    'Gia tri an thuong nam trong dieu khoan, uu dai va lua chon bo sung.',
    'Gap lai nguoi quen cu co the tro thanh mang luoi huu ich lau dai.',
    'Phan hoi nhanh va hanh dong ngay tao uu the ro trong canh tranh.',
    'Cong bo ket qua da hoan thanh giup tang uy tin va du dia cho buoc tiep.',
    'Quyet dinh giu, cat hay tu dong hoa se nang hieu suat len ro.',
    'Mot loi nhan am ap co the lam diu tinh hinh cam xuc rat nhanh.',
    'Chuan bi de xuat va lich trinh ky hon thuong cai thien dieu kien hop tac.',
    'Ghi lai tong ket cuoi nam bien du dinh thanh ke hoach kha thi.',
  ],
  caution: [
    'Tuy vay, neu chi dua vao hung khoi dau thang, ban de hut hoi o giua chang nen can chia suc hop ly.',
    'Su chac chan qua nhanh de bo sot chi tiet; hay kiem tra lai cam ket va chi tieu.',
    'Khi cam xuc dồn nen, quyet dinh de lech huong; dung ep ket luan luc chua nghi ngo.',
  ],
  advice: [
    'Chon mot uu tien trung tam va lam vao khung gio co dinh moi ngay.',
    'Ghi chep ngan gon va thong nhat ky vong som de viec phoi hop muot hon.',
    'Uu tien tinh ben bi hon su hoan hao, dong thoi ra soat theo tuan.',
  ],
  accent: {
    total: ['Xu huong thang nay dang di len.', 'Dieu chinh nho tao tac dong lon.', 'Nhip deu quan trong hon toc do.'],
    wealth: ['Tien bac uu ai nguoi co tieu chi ro.', 'Doc ky dieu khoan truoc khi dong y.', 'Tiet kiem deu tay mo rong lua chon.'],
    business: ['Bang chung lam de xuat thuyet phuc hon.', 'Lich lam viec gon gang giu phong do.', 'Dung thoi diem se quyet dinh dam phan.'],
    love: ['Chan that giup rut ngan khoang cach.', 'Loi noi nhe nhang doi khong khi.', 'Hieu nhau truoc khi phan xet.'],
    relationships: ['Quan he bat dau tu cach noi chuyen.', 'Lang nghe ky giam va cham.', 'Phan hoi dung luc khoi phuc niem tin.'],
    health: ['Giu nhịp ngu deu la uu tien.', 'Van dong nhe giup dau oc tinh tao.', 'Xep nghi ngoi vao lich nhu mot viec that.'],
  },
}

const TH_BASE: LanguageMonthlyBase = {
  flow: [
    'เดือนนี้จะไปได้ดีเมื่อคุณรักษาจังหวะให้คงที่และตัดสินใจอย่างมีสติ แทนการตอบสนองทุกสัญญาณแบบรีบเร่ง',
    'พลังโดยรวมค่อย ๆ สูงขึ้น หากมีกรอบรายวันที่ชัดเจน การตัดสินใจจะคมขึ้นและลงมือทำได้แม่นกว่าเดิม',
    'แม้งานหลายด้านจะเข้ามาพร้อมกัน แต่ถ้าคุณรักษาโฟกัสหลักไว้ ภาพรวมยังเดินหน้าได้อย่างมั่นคง',
  ],
  monthLead: [
    'มกราคมเด่นเรื่องการเริ่มต้นใหม่และการตั้งเป้าหมาย การจัดลำดับความสำคัญจะทำให้ทั้งปีเริ่มได้ชัดเจน',
    'กุมภาพันธ์เน้นความสัมพันธ์และความร่วมมือ ความไว้วางใจสำคัญกว่าการเร่งคนเดียว',
    'มีนาคมเหมาะกับการเรียนรู้และพัฒนาตนเอง การฝึกอย่างมีวินัยจะเห็นผลเร็ว',
    'เมษายนมาพร้อมการเปลี่ยนแปลงและความท้าทาย ความยืดหยุ่นจะเปิดทางเลือกใหม่',
    'พฤษภาคมเน้นการเงินและโอกาส การดูเงื่อนไขละเอียดช่วยเพิ่มผลตอบแทน',
    'มิถุนายนให้ความสำคัญกับความสัมพันธ์ระหว่างคน น้ำเสียงและขอบเขตที่พอดีช่วยลดความเข้าใจผิด',
    'กรกฎาคมหนุนการลงมือทำและแรงขับ งานที่ค้างไว้จะเดินเร็วเมื่อเริ่มจริงจัง',
    'สิงหาคมคือช่วงเห็นผลและเก็บเกี่ยว การสรุปผลงานจะทำให้ความน่าเชื่อถือมั่นคงขึ้น',
    'กันยายนเหมาะกับการจัดระเบียบและรีเซ็ต การตัดสิ่งไม่จำเป็นช่วยคืนสมาธิ',
    'ตุลาคมเน้นความรักและอารมณ์ การสื่อสารตรงไปตรงมาช่วยลดระยะห่าง',
    'พฤศจิกายนเด่นเรื่องงานและธุรกิจ การเตรียมข้อมูลกับโครงสร้างทำให้ต่อรองได้ดี',
    'ธันวาคมต้องปิดงานเก่าและเตรียมปีหน้าไปพร้อมกัน ยิ่งทบทวนชัดยิ่งเริ่มรอบใหม่ง่าย',
  ],
  opportunity: [
    'นิสัยเล็ก ๆ ที่ทำซ้ำได้จะกลายเป็นแรงส่งสำคัญตั้งแต่ช่วงต้นเดือน',
    'จังหวะที่ช่วยเหลือกันอาจพาไปสู่ข้อเสนอหรือเครือข่ายที่มีคุณค่า',
    'คอร์สสั้น โน้ตอ่านหนังสือ และการฝึกสั้น ๆ นำไปใช้จริงได้เร็วกว่าที่คิด',
    'บทบาทใหม่หรือโปรเจกต์ยากอาจขยายขอบเขตความสามารถของคุณ',
    'มูลค่าที่ซ่อนอยู่มักอยู่ในเงื่อนไข ส่วนลด และตัวเลือกเสริม',
    'การกลับมาเชื่อมต่อคนเดิมอาจต่อยอดเป็นความร่วมมือที่ดี',
    'รับฟีดแบ็กไวและลงมือทันที จะทำให้คุณโดดเด่นในสนามแข่งขัน',
    'การโชว์ผลลัพธ์ที่ทำเสร็จแล้วช่วยเพิ่มทั้งชื่อเสียงและอำนาจต่อรอง',
    'การตัดสินใจว่าอะไรควรเก็บ อะไรควรตัด จะเพิ่มประสิทธิภาพอย่างชัดเจน',
    'ข้อความที่อ่อนโยนเพียงประโยคเดียวอาจเปลี่ยนอุณหภูมิทางอารมณ์ได้',
    'การเตรียมข้อเสนอและไทม์ไลน์ให้แน่น ช่วยให้เงื่อนไขข้อตกลงดีขึ้น',
    'บันทึกสรุปปลายปีทำให้แผนปีหน้าชัดและทำได้จริงมากขึ้น',
  ],
  caution: [
    'อย่างไรก็ตาม หากพึ่งแรงฮึดช่วงต้นอย่างเดียว กลางเดือนอาจหมดแรง จึงควรวางจังหวะพักให้ดี',
    'ความมั่นใจที่เร็วเกินไปทำให้พลาดรายละเอียดสำคัญ ตรวจสัญญาและรายจ่ายก่อนยืนยัน',
    'เมื่ออารมณ์สะสมมากเกินไป การตัดสินใจจะไม่นิ่ง อย่าฝืนสรุปเรื่องใหญ่โดยไม่พัก',
  ],
  advice: [
    'เลือกหนึ่งเป้าหมายหลักและทำในเวลาเดิมทุกวันเพื่อสร้างแรงต่อเนื่อง',
    'จดบันทึกสั้น ๆ และคุยความคาดหวังให้เร็วขึ้นเพื่อให้การร่วมงานลื่นไหล',
    'ให้ความสำคัญกับความสม่ำเสมอมากกว่าความสมบูรณ์แบบ พร้อมทบทวนรายสัปดาห์',
  ],
  accent: {
    total: ['แนวโน้มเดือนนี้ค่อย ๆ ดีขึ้น.', 'ปรับเล็กน้อยแต่ผลต่างชัดเจน.', 'จังหวะที่ดีสำคัญกว่าความเร็ว.'],
    wealth: ['การเงินชอบคนที่มีเกณฑ์ชัด.', 'อ่านเงื่อนไขให้ครบก่อนตัดสินใจ.', 'ออมสม่ำเสมอทำให้เลือกได้มากขึ้น.'],
    business: ['ข้อมูลชัดทำให้ข้อเสนอมีน้ำหนัก.', 'จัดตารางดีช่วยคงผลงาน.', 'จังหวะเวลาตัดสินผลการเจรจา.'],
    love: ['ความจริงใจทำให้ใกล้กันขึ้น.', 'คำพูดนุ่มนวลเปลี่ยนบรรยากาศได้.', 'เข้าใจกันก่อนดีกว่าคาดเดา.'],
    relationships: ['ความสัมพันธ์เริ่มจากน้ำเสียง.', 'การฟังอย่างตั้งใจลดการปะทะ.', 'ตอบกลับอย่างใส่ใจช่วยคืนความเชื่อใจ.'],
    health: ['รักษาเวลานอนให้สม่ำเสมอ.', 'ขยับร่างกายเบา ๆ ช่วยโฟกัส.', 'ใส่เวลาพักลงในตารางจริงจัง.'],
  },
}

const ID_BASE: LanguageMonthlyBase = {
  flow: [
    'Bulan ini berjalan paling baik saat kamu menjaga ritme tetap stabil dan mengambil keputusan dengan tenang.',
    'Laju energi naik perlahan, dan ketepatan keputusan meningkat ketika rutinitas harianmu punya patokan jelas.',
    'Meski banyak urusan datang bersamaan, keadaan tetap terkendali jika fokus utama tidak lepas.',
  ],
  monthLead: [
    'Januari menonjolkan awal baru dan penetapan target; menyusun ulang prioritas memberi arah tahun ini.',
    'Februari berfokus pada relasi dan kerja sama; kepercayaan lebih penting daripada bergerak sendiri terlalu cepat.',
    'Maret mendukung belajar dan pengembangan diri; latihan konsisten cepat terlihat hasilnya.',
    'April membawa perubahan dan tantangan; sikap luwes membuka peluang yang sebelumnya tertutup.',
    'Mei menekankan uang dan kesempatan; meninjau syarat dengan teliti meningkatkan keuntungan.',
    'Juni menyorot hubungan antarmanusia; nada bicara dan batas sehat mencegah salah paham.',
    'Juli menguatkan aksi dan dorongan; rencana tertunda akan melaju saat eksekusi dimulai.',
    'Agustus adalah fase hasil dan panen; merapikan capaian membuat posisi lebih kokoh.',
    'September cocok untuk penataan dan reset; membuang yang tidak perlu mengembalikan fokus.',
    'Oktober menajamkan cinta dan emosi; obrolan jujur memperpendek jarak hati.',
    'November menekankan kerja dan bisnis; data serta struktur memperkuat negosiasi.',
    'Desember meminta penutupan tahun sambil menyiapkan tahun depan; keduanya memberi rasa mantap.',
  ],
  opportunity: [
    'Kebiasaan kecil yang bisa diulang dapat menjadi mesin percepatan sejak awal bulan.',
    'Momen saling bantu berpotensi membuka tawaran atau koneksi bernilai tinggi.',
    'Kursus singkat, catatan baca, dan latihan kecil cepat berubah jadi keunggulan praktis.',
    'Peran baru atau proyek menantang bisa memperluas kapasitas profesionalmu.',
    'Nilai tersembunyi sering ada di diskon, syarat, dan opsi tambahan.',
    'Pertemuan ulang dengan kenalan lama bisa tumbuh jadi jejaring yang berguna.',
    'Umpan balik cepat dan eksekusi langsung membuatmu menonjol saat kompetisi ketat.',
    'Menunjukkan hasil yang sudah selesai meningkatkan reputasi sekaligus daya tawar.',
    'Keputusan tegas tentang apa yang dipertahankan atau dilepas menaikkan efisiensi.',
    'Satu pesan hangat bisa mengubah suasana emosi lebih cepat dari dugaan.',
    'Persiapan proposal dan jadwal yang rapi biasanya memperbaiki syarat kerja sama.',
    'Catatan refleksi akhir tahun mengubah niat umum menjadi rencana yang bisa dijalankan.',
  ],
  caution: [
    'Tetap waspada, karena hanya mengandalkan semangat awal bisa membuat energi turun di pertengahan bulan.',
    'Keyakinan yang terlalu cepat kerap menutup detail penting; cek lagi komitmen dan pengeluaran.',
    'Saat emosi menumpuk, keputusan mudah bergeser; jangan memaksa putusan final tanpa jeda pulih.',
  ],
  advice: [
    'Pilih satu prioritas inti dan kerjakan di jam yang sama setiap hari agar hasil menumpuk.',
    'Buat catatan singkat lalu samakan ekspektasi lebih awal agar kolaborasi lebih lancar.',
    'Utamakan konsistensi daripada sempurna, lalu lakukan evaluasi mingguan secara jujur.',
  ],
  accent: {
    total: ['Arah bulan ini cenderung naik stabil.', 'Penyesuaian kecil memberi dampak besar.', 'Ritme lebih penting daripada kecepatan.'],
    wealth: ['Keuangan berpihak pada kriteria yang jelas.', 'Periksa syarat sebelum menyetujui.', 'Hemat kecil yang rutin memperbesar pilihan.'],
    business: ['Bukti membuat usulan lebih kuat.', 'Jadwal rapi menjaga kualitas hasil.', 'Timing menentukan hasil negosiasi.'],
    love: ['Kejujuran memendekkan jarak batin.', 'Bahasa yang hangat mengubah suasana.', 'Pahami dulu sebelum menilai.'],
    relationships: ['Relasi dimulai dari cara berbicara.', 'Mendengar sungguh-sungguh meredakan konflik.', 'Respons tepat waktu memulihkan kepercayaan.'],
    health: ['Jaga pola tidur tetap teratur.', 'Gerak ringan membantu fokus tetap tajam.', 'Masukkan waktu pulih ke agenda harian.'],
  },
}

export const MONTHLY_FORTUNE_PARAGRAPHS: Record<FortuneContentLanguage, MonthlyParagraphPool> = {
  ko: buildMonthlyPool(KO_BASE),
  en: buildMonthlyPool(EN_BASE),
  ja: buildMonthlyPool(JA_BASE),
  zh: buildMonthlyPool(ZH_BASE),
  es: buildMonthlyPool(ES_BASE),
  fr: buildMonthlyPool(FR_BASE),
  de: buildMonthlyPool(DE_BASE),
  pt: buildMonthlyPool(PT_BASE),
  hi: buildMonthlyPool(HI_BASE),
  vi: buildMonthlyPool(VI_BASE),
  th: buildMonthlyPool(TH_BASE),
  id: buildMonthlyPool(ID_BASE),
}

function buildCategoryAccents(base: LanguageMonthlyBase): Record<string, string[]> {
  return {
    total: [...base.accent.total],
    wealth: [...base.accent.wealth],
    business: [...base.accent.business],
    love: [...base.accent.love],
    relationships: [...base.accent.relationships],
    health: [...base.accent.health],
  }
}

export const MONTHLY_CATEGORY_ACCENTS: Record<
  FortuneContentLanguage,
  Record<string, string[]>
> = {
  ko: buildCategoryAccents(KO_BASE),
  en: buildCategoryAccents(EN_BASE),
  ja: buildCategoryAccents(JA_BASE),
  zh: buildCategoryAccents(ZH_BASE),
  es: buildCategoryAccents(ES_BASE),
  fr: buildCategoryAccents(FR_BASE),
  de: buildCategoryAccents(DE_BASE),
  pt: buildCategoryAccents(PT_BASE),
  hi: buildCategoryAccents(HI_BASE),
  vi: buildCategoryAccents(VI_BASE),
  th: buildCategoryAccents(TH_BASE),
  id: buildCategoryAccents(ID_BASE),
}

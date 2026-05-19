/**
 * Portuguese (pt) compatibility / love result narrative pools.
 */
type FiveElementKey = 'wood' | 'fire' | 'earth' | 'metal' | 'water'

export const compatibilityElementLabelsPt: Record<FiveElementKey, string> = {
  wood: 'Madeira',
  fire: 'Fogo',
  earth: 'Terra',
  metal: 'Metal',
  water: 'Água',
}

export const p1TraitPt: Record<FiveElementKey, string> = {
  wood: 'voltado ao crescimento e com visão de futuro',
  fire: 'apaixonado e enérgico',
  earth: 'estável e reflexivo',
  metal: 'decidido e com princípios',
  water: 'sábio e adaptável',
}

export const p2TraitPt: Record<FiveElementKey, string> = {
  wood: 'criativo e de mente aberta',
  fire: 'sociável e otimista',
  earth: 'responsável e prático',
  metal: 'orientado ao detalhe com altos padrões',
  water: 'muito adaptável e intuitivo',
}

export const relationshipFlowPt: [string, string, string] = [
  'Para {n1} e {n2}, essa conexão parece menos casualidade e mais destino. A energia de {e1} e {e2} os atrai mutuamente e forma um vínculo forte. Vocês estão numa fase de curiosidade e descoberta; com o tempo, a compreensão e a confiança podem se aprofundar. A troca emocional flui com facilidade e vocês se leem surpreendentemente bem.',
  'A relação entre vocês avança com naturalidade, como a água. {n1}, com a essência de {e1}, e {n2}, com a de {e2}, se encontram numa harmonia suave. O equilíbrio emocional parece estável e vocês oferecem conforto mútuo. Como o conforto pode virar rotina, vale tentar um desafio novo juntos de vez em quando.',
  'Entre {n1} e {n2} circula uma corrente especial. A combinação de {e1} e {e2} traz uma força que impulsiona o crescimento. Quando estão juntos, surge energia criativa e podem alcançar coisas que nenhum tentaria sozinho.',
]

export const personalityOtherPt: [string, string] = [
  '{n1} ({e1}) e {n2} ({e2}) têm encantos distintos. Os pontos fortes de {n1} podem equilibrar os pontos cegos de {n2}, enquanto os de {n2} podem abrir uma nova perspectiva para {n1}. As diferenças não precisam ser conflito: podem ser combustível para crescer.',
  'Vocês se estimulam mutuamente. O lado inclinado a {e1} de {n1} encontra o lado inclinado a {e2} de {n2}, criando uma química distinta. Quando aceitam e respeitam as diferenças, a parceria alcança sua melhor forma.',
]

export const strengthsCautionsPt: { strengths: string; cautions: string }[] = [
  {
    strengths:
      'Uma grande força é a complementaridade mútua. Quando {n1} avança, {n2} pode ser um apoio firme; quando {n2} passa por dificuldades, {n1} pode ajudar a encontrar saída. A conversa combina, e o humor compartilhado deixa o tempo juntos mais leve. Ao mirar um objetivo comum, a sinergia se intensifica.',
    cautions:
      'Cuidado com o desgaste silencioso na comunicação. Dar por certo que tudo se entende sem dizer pode acumular mal-entendidos. Mesmo em dias ocupados, reservem um pequeno espaço diário para conversar. {n1}, cuidado com a impaciência; {n2}, com a indecisão.',
  },
  {
    strengths:
      'Pode crescer um vínculo profundo entre vocês. A compreensão pode se aprofundar com o tempo, e vocês podem se sentir mesmo com poucas palavras. Em momentos difíceis podem se unir mais e construir uma relação que resista à pressão externa.',
    cautions:
      'Choques emocionais exigem cuidado. Se o orgulho for forte, reconciliar pode levar tempo. Após a tensão, fechem o ciclo com diálogo: priorizem reparar a relação antes de vencer a discussão.',
  },
  {
    strengths:
      'Vocês podem acelerar o crescimento mútuo. Juntos podem se tornar uma versão melhor do que sozinhos: bom estímulo, forte apoio aos sonhos e maior proximidade ao compartilhar hobbies e interesses.',
    cautions:
      'Gerenciem as expectativas. Exigir perfeição do outro convida à decepção. Todos têm limites: aceitem-nos. Respeitem a necessidade de tempo e espaço de cada um.',
  },
]

export const futureAdvicePt: [string, string, string] = [
  'O futuro juntos parece luminoso. A combinação de {e1} e {e2} pode sustentar um vínculo estável a longo prazo. Para aprofundar, acumulem experiências compartilhadas—viagens, hobbies, desafios novos—para que as memórias se somem e a proximidade cresça. Valorizem as famílias de cada um e mantenham boa relação com quem os rodeia. Desenhem onde esperam estar em um, cinco e dez anos e fixem metas comuns; essa clareza fortalece a relação.',
  'Por diante há muitas possibilidades. Conservem a boa energia atual e não esqueçam a gratidão. Tentem dizer um agradecimento concreto um ao outro todos os dias. No conflito, olhem a partir de um «nós» e foquem soluções, não placar. Saiam em encontros com regularidade e valorizem também os dias comuns: as pequenas alegrias se multiplicam.',
  '{n1} e {n2}, o vínculo de vocês ainda tem margem para crescer. Três âncoras para o futuro: mantenham a comunicação constante, animem os sonhos um do outro e confiem de que épocas difíceis podem ser superadas juntos. Escolherem-se foi uma boa decisão—renovem essa escolha em gestos pequenos todos os dias e construam o futuro que ambos desejam.',
]

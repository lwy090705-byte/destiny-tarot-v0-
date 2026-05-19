/**
 * Portuguese (pt-BR) fortune / tarot content pools.
 * Array lengths match English counterparts in fortune-templates.ts,
 * tarot-message-pools.ts, and monthly-fortunes.ts.
 */

// ─── Fallback (4 keys, 1 string each) ─────────────────────────────────────────

export const fallbackPt: Record<'lifetime' | 'yearly' | 'monthly' | 'general', string[]> = {
  lifetime: [
    'Sua vida avanca entre crescimento e mudanca constantes. Os primeiros anos pedem paciencia e bases solidas; a metade da vida colhe os frutos do esforco; os anos seguintes transformam sabedoria e experiencia em ajuda aos outros.',
  ],
  yearly: [
    'Este ano traz oportunidades novas e mudancas. A primeira metade favorece planejamento e preparacao; a segunda colhe os resultados do que voce construiu. Mantenha a esperanca e continue tentando.',
  ],
  monthly: [
    'Este mes carrega a energia de um novo comeco. E um bom momento para avancar com seus planos e aquecer as relacoes. Fique presente no que importa agora.',
  ],
  general: [
    'Novas possibilidades estao abertas para voce agora. Avance com fe. O esforco que voce investir encontrara sua recompensa.',
  ],
}

// ─── Category template pools (10 strings each) ────────────────────────────────

export const templatePoolsPt: Record<
  'love' | 'wealth' | 'career' | 'health' | 'opportunity' | 'warning' | 'relationship',
  string[]
> = {
  love: [
    'A sorte no amor esta em alta: novos encontros podem surgir.',
    'Valorize o vinculo que voce tem; um pequeno gesto pode crescer em amor profundo.',
    'E hora de expressar o que voce sente: compartilhe seu coracao com honestidade.',
    'Enquanto voce espera, uma alegria inesperada ainda pode te encontrar.',
    'Se ha alguem de quem voce gosta, de um passo corajoso: os sinais sao positivos.',
    'A relacao esta num ponto de virada: aprofunde com dialogo.',
    'Cuide do tempo com seu par: voce sentira o valor de estarem juntos.',
    'Cuidar do presente importa mais do que perseguir alguem novo.',
    'O romance precisa de cuidado agora: evite decisoes impulsivas.',
    'Se voce esta solteiro ou solteira, ame-se primeiro: ai esta seu verdadeiro encanto.',
  ],
  wealth: [
    'A sorte financeira esta subindo: novas fontes de renda podem surgir.',
    'Uma gestao consciente do dinheiro e essencial; reduza gastos desnecessarios.',
    'Um aumento ou bonus pode chegar antes do que voce espera.',
    'Aborde investimentos com calma; planos de longo prazo funcionam melhor.',
    'As oportunidades de dinheiro podem bater duas vezes: nao perca a primeira.',
    'Bom momento para aumentar a poupanca e preparar o futuro.',
    'Projetos paralelos ou trabalho freelance podem somar uma renda util.',
    'O fluxo de dinheiro se mantem estavel: preserve seu plano atual.',
    'Gastos imprevistos podem aparecer: mantenha uma reserva de emergencia.',
    'Pessoas que te apoiam melhoram seu panorama financeiro.',
  ],
  career: [
    'A sorte profissional esta em alta: pode chegar uma promocao ou propostas solidas.',
    'Concentre-se no trabalho atual; os resultados serao notados.',
    'O trabalho em equipe importa agora: colaboracao e chave para o sucesso.',
    'Bom momento para iniciar um desafio novo e ousado.',
    'Invista em habilidades: sua capacidade define seu futuro.',
    'A satisfacao no cargo atual pode crescer.',
    'Se voce pensa em mudar, decida com cuidado.',
    'A criatividade no trabalho se destaca agora.',
    'As relacoes com a lideranca melhoram; a confianca se fortalece.',
    'O sucesso do projeto esta ao alcance.',
  ],
  health: [
    'A saude vai bem: a energia esta luminosa.',
    'Exercicio e alimentacao regular importam; crie habitos saudaveis.',
    'Gerencie o estresse: descanso ou praticas tranquilas ajudam.',
    'A imunidade pode cair; foque na prevencao.',
    'Cuidado com lesoes ou mal-estar: mova-se com prudencia.',
    'Bom momento para exames e check-ups.',
    'Equilibre corpo e mente.',
    'A energia sobe: aproveite este periodo.',
    'Se voce tem algo cronico, mantenha o cuidado constante.',
    'Durma o suficiente: isso sustenta todo o resto.',
  ],
  opportunity: [
    'Boas oportunidades podem chegar mais de uma vez.',
    'Uma unica decisao pode mudar seu caminho de forma grande.',
    'Um encontro inesperado pode mudar sua historia.',
    'O que voce faz agora molda o que vem depois.',
    'As oportunidades passam rapido: e preciso agir com discernimento.',
    'Olhe bem ao seu redor: a porta ja esta perto.',
    'Decisoes corajosas tendem ao sucesso.',
    'O esforco do passado finalmente da fruto.',
    'O momento favorece um novo comeco.',
    'Aliados uteis multiplicam suas possibilidades.',
  ],
  warning: [
    'A cautela importa: evite decisoes apressadas.',
    'Negociacoes com dinheiro trazem risco de fraude: verifique tudo.',
    'Pode haver tensao nas relacoes: cuide da comunicacao.',
    'A saude pede atencao: check-ups regulares ajudam.',
    'Grandes decisoes ganham com mais tempo: pense duas vezes.',
    'Leia promessas e contratos linha por linha.',
    'Nao deixe as emocoes conduzirem decisoes importantes: mantenha a razao.',
    'Revise com cuidado novos negocios ou investimentos.',
    'Se puder, evite misturar dinheiro com amigos muito proximos.',
    'Nao se exceda: proteja seu corpo e sua concentracao.',
  ],
  relationship: [
    'Os lacos familiares podem ficar mais calorosos agora.',
    'Uma conversa profunda com um amigo ou amiga se faz necessaria.',
    'Entre em contato com um velho amigo: pode chegar boa noticia.',
    'Novos circulos estao se formando: busque pessoas que te elevem.',
    'Mais velhos e mais novos te ensinam algo util.',
    'Em equipe, a lideranca constante e valorizada.',
    'Um vinculo tenso pode se curar se voce tentar.',
    'Quem te cerca tem um papel maior do que voce imagina.',
    'Fazer networking importa: apareca e conecte-se.',
    'Valorize os relacionamentos que voce ja tem.',
  ],
}

// ─── Tarot message pools (8 strings each) ─────────────────────────────────────

export const tarotPoolsPt: Record<
  'total' | 'wealth' | 'luck' | 'caution' | 'love' | 'career' | 'health',
  string[]
> = {
  total: [
    'Sua intuicao esta mais afiada do que o normal. Na proxima decisao importante, escute seu coracao tanto quanto sua cabeca. A resposta ja esta dentro de voce. Conselhos externos ajudam, mas a escolha final precisa vir de dentro.',
    'Uma porta de nova oportunidade esta escancarada. O esforco que voce construiu esta prestes a dar fruto: de um passo corajoso em direcao a essa porta sem medo. A mudanca pode assustar, mas o que voce deseja pode estar do outro lado.',
    'O que voce vive agora e temporario. Lembre-se: quanto mais profunda a noite, mais perto esta o amanhecer. Depois de resistir, voce conhecera uma versao mais forte de si. O que voce mais precisa agora e paciencia e confianca em si.',
    'O trabalho constante que voce investiu finalmente esta pronto para brilhar. As pessoas comecarao a ver seu verdadeiro valor, e o reconhecimento pode vir de um lugar inesperado. Mantenha a humildade e evite acomodacao.',
    'Os relacionamentos estao se tornando uma chave mestra na sua vida. Olhe para familia, amigos e colegas; reconecte-se onde houver distancia. A verdadeira abundancia costuma vir dos vinculos com as pessoas, nao apenas das coisas.',
    'Sua voz interior traz uma mensagem importante. Pause a rotina corrida; meditacao ou uma caminhada podem abrir uma conversa real com voce mesmo. Voce pode encontrar respostas que buscava ha muito tempo.',
    'A mudanca pode dar medo, mas o que esta se revelando agora e para seu crescimento. Solte o que esta familiar demais e abra-se ao novo. Uma versao melhor de voce espera do outro lado desta virada.',
    'Esta e uma temporada de preparar mais do que de correr. Se voce tem um grande plano, revise os detalhes com cuidado. A preparacao minuciosa decide grande parte do sucesso. Saber esperar tambem e uma habilidade.',
  ],
  wealth: [
    'Voce esta num ponto de virada financeiro importante. Controle gastos, mas invista com coragem onde houver valor real. Ser conservador demais pode fazer perder oportunidades; ser agressivo demais pode aumentar riscos. Agora, uma estrategia equilibrada e essencial.',
    'A oportunidade financeira pode chegar por uma direcao inesperada. Boas noticias podem vir de interesses ou contatos que voce ja tem: avalie propostas novas com mente aberta, mas nao se apresse sem a devida analise.',
    'E hora de olhar o dinheiro com foco no longo prazo. Concentre-se mais em poupar e investir para o futuro do que em ganhos rapidos. As sementes que voce planta agora podem crescer muito com os anos. Confie na forca silenciosa dos juros compostos.',
    'Vale a pena pensar seriamente em um projeto paralelo ou nova fonte de renda. Um hobby ou ponto forte pode virar ganho financeiro. Um primeiro passo pequeno ainda pode iniciar uma grande mudanca: tente dar esse passo.',
    'A sorte com dinheiro esta subindo, mas as entradas ainda pedem disciplina. Nao gaste sem cuidado so porque o caixa esta fluindo melhor. Registre receitas e despesas com clareza: aplicativos ou um caderno simples podem ajudar.',
    'Antes de decisoes financeiras grandes, pesquise a fundo e busque conselho especializado quando necessario. O julgamento frio vence o impulso agora. Leia as letras miudas e garanta que entende os termos do contrato.',
    'Encontre equilibrio entre economizar e gastar. Austeridade extrema pode reduzir sua qualidade de vida; gasto excessivo pode comprometer a estabilidade futura. Separe necessidades de desejos e pratique consumo consciente.',
    'Entregue o seu melhor no trabalho que esta diante de voce. A constancia costuma voltar em forma de recompensa financeira. Promocao ou bonus podem estar proximos, e seu esforco tem mais chance de ser reconhecido.',
  ],
  luck: [
    'Sua energia positiva esta atraindo boa sorte. Quando algo bom acontecer, compartilhe com quem esta ao seu redor: a generosidade pode ampliar a sorte. Uma pequena gentileza pode voltar como sorte inesperada.',
    'Um encontro casual ou uma conversa pode ser um ponto de virada. Abra o coracao para pessoas novas e visite lugares que voce raramente frequenta. Pode haver uma conexao significativa te esperando.',
    'A sorte esta do seu lado hoje. E um bom dia para tarefas adiadas ou para uma tentativa nova. A fortuna favorece quem se prepara: quando a oportunidade aparecer, agarre-a.',
    'Pequenos golpes de sorte podem se somar em alegria real. Pratique gratidao pela felicidade cotidiana; a gratidao costuma atrair mais sorte. Manter um diario simples de "sorte" pode ajudar a perceber isso.',
    'Alguem perto de voce traz energia afortunada para a sua vida. Cuide dessa relacao; o tempo juntos pode elevar voces dois.',
    'Uma boa noticia inesperada pode chegar em breve. Fique atento a ligacoes e mensagens: voce pode receber algo agradavel de alguem com quem nao fala ha tempo.',
    'Uma atmosfera de sorte te envolve. Pode ser uma janela favoravel para um bilhete modesto ou uma decisao importante, mas jogo imprudente nunca e sabio.',
    'Observe seus numeros e cores da sorte. Se aparecerem com frequencia no dia a dia, tome como um sinal positivo sutil. Usar uma cor da sorte em um dia importante pode estabilizar seu animo.',
  ],
  caution: [
    'Decisoes impulsivas costumam trazer arrependimento depois. Antes de uma decisao importante, de a si pelo menos um dia para pensar; mesmo que haja pressao para decidir rapido, manter seu proprio ritmo importa.',
    'Dedicacao extra a saude e necessaria. Evite agendas ou cargas de trabalho que exijam demais do seu corpo. Nao ignore sintomas pequenos e considere exames de rotina. Saude e seu maior ativo.',
    'As palavras podem mudar relacionamentos rapidamente agora. Mesmo se voce estiver com raiva, espere a emocao baixar antes de falar. Mal-entendidos se formam facil, mas custam para corrigir: escutar ajuda.',
    'A gestao do estresse precisa de cuidado especial. Reserve tempo para liberar tensao com movimento, meditacao ou hobbies. O esgotamento pode chegar de repente; prevenir e mais sabio do que so remediar.',
    'Leia documentos ou contratos importantes mais de uma vez. Uma clausula pequena pode virar um problema grande. Pergunte o que nao entender e busque ajuda profissional se for preciso.',
    'Nao deixe que cada opiniao externa te abale. Muitas vozes podem confundir, mas a decisao final deve ser sua: voce entende melhor sua propria situacao.',
    'A pressa pode estragar o trabalho. Mesmo querendo terminar rapido, respeite o processo. Erros por impaciencia costumam desperdiçar mais tempo do que passos cuidadosos. Va devagar e com seguranca.',
    'Evite grandes decisoes enquanto as emocoes estiverem no auge, especialmente raiva ou tristeza profunda. Quando voce estiver mais calmo ou calma, a mesma situacao pode revelar outra resposta.',
  ],
  love: [
    'Voce pode estar cauteloso ou cautelosa para mostrar sentimentos. Nao tenha medo de que a sinceridade nao chegue ao outro: tente falar do coracao. A emocao verdadeira costuma encontrar quem possa recebe-la.',
    'No amor, expectativas pesadas e apego excessivo podem envenenar. Aceite sua parceira ou parceiro como e e construa um vinculo em que ambos crescam. Alguem que cresce com voce pode importar mais do que uma pessoa "perfeita" imaginada.',
    'Ha energia de encontro novo no ar. Experimente um lugar ou atividade diferente: uma conexao inesperada pode aparecer. Mantenha os olhos abertos para o mundo ao seu redor.',
    'Um vinculo existente pode passar para uma nova fase. Compreensao mais profunda e conversa honesta podem melhorar a relacao: pode ser um bom momento para uma conversa importante.',
    'O tempo a sos pode te ajudar a organizar os sentimentos. Reaprenda a amar comecando pelo amor-proprio. Amar a si mesmo ou a si mesma tambem e uma forma bonita de amar.',
    'Algumas relacoes passam por capitulos dificeis. Ainda assim, a crise pode fortalecer os lacos se voce mantiver honestidade e disposicao para construir junto. Paciencia e dialogo podem aprofundar o vinculo.',
    'Seu encanto esta brilhando agora. Apresente-se com confianca, sendo quem voce e. A atracao duradoura costuma vir mais da atitude e da energia do que da superficie.',
    'O amor pode ser bonito e dificil ao mesmo tempo. Alegria e tristeza fazem parte dele. O que voce estiver sentindo agora, honre e de tempo ao processo.',
  ],
  career: [
    'Um projeto ou oportunidade nova aparece diante de voce. Nao recue diante do desafio: voce e mais capaz do que imagina, e essa porta pode ter sido feita para voce.',
    'Voce pode sentir um plateau temporario no trabalho ou na carreira. Mesmo assim, essa fase esta te fazendo crescer. Fortaleça as bases enquanto prepara o proximo passo.',
    'A cooperacao em equipe importa agora. Deixe de lado o impulso de fazer tudo sozinho e comunique-se com quem esta ao redor. Juntos, voces podem obter resultados mais fortes.',
    'O reconhecimento pelo seu esforco esta se aproximando. Pode surgir promocao ou um papel novo: mantenha-se pronto ou pronta. A oportunidade costuma visitar quem se preparou quando ninguem estava olhando.',
    'O estresse no trabalho pode se acumular. Faça uma pausa para cuidar de si. Um equilibrio mais saudavel entre trabalho e vida costuma melhorar os resultados, nao enfraquece-los.',
    'E um bom momento para aprender uma nova habilidade ou um novo corpo de conhecimento. Investir em crescimento vira vantagem no futuro. Tente aproveitar o caminho do aprendizado.',
    'Sua paixao pelo trabalho inspira outras pessoas. Mantenha essa energia, mas cuide-se contra o esgotamento. Um ritmo sustentavel constrói sucesso real com o tempo.',
    'Revise suas tarefas atuais e busque pequenas melhorias. Mudancas minimas podem elevar bastante a eficiencia. Pode ser a hora de usar sua experiencia com mais intencao.',
  ],
  health: [
    'A saude do corpo importa, mas a saude mental pode importar ainda mais agora. Cuide da mente com meditacao, yoga leve, terapia ou descanso tranquilo: uma mente estavel sustenta um corpo estavel.',
    'Revise seus habitos diarios. Dormir o suficiente, mover-se com regularidade e comer de forma equilibrada sao pilares da vitalidade. Pequenas mudancas de habito podem criar grandes mudancas de saude ao longo do tempo.',
    'Se o cansaço cronico persistir, considere ajuda profissional. Exames podem esclarecer o que seu corpo precisa. Prevenir costuma ser mais facil do que reparar.',
    'O movimento pode te restaurar. Nao e preciso treino pesado: caminhar, alongar ou dancar com prazer pode ser um otimo comeco.',
    'Estresse emocional pode aparecer como sintomas fisicos. Faça coisas que te acalmem e converse com alguem de confianca. Liberar emocao tambem faz parte da cura.',
    'A saude tende a melhorar. Mantenha os habitos que sustentam essa fase boa: a constancia e um dos melhores "segredos" do bem-estar.',
    'A alimentacao e uma linha de partida pratica para uma saude melhor. Reduza ultraprocessados quando puder e inclua ingredientes mais simples e naturais. O que voce come vira parte de voce.',
    'Equilibre descanso e atividade. Excesso de qualquer um pode desestabilizar a saude. Escute o ritmo que seu corpo e sua mente estao pedindo.',
  ],
}

// ─── Monthly fortunes (months 1–12, 1 string each) ───────────────────────────

export const monthlyFortunesPt: Record<number, string[]> = {
  1: [
    'Inicio de um novo ano. E crucial definir metas claras e planos de acao. As decisoes e atitudes deste periodo vao marcar a direcao de todo o ano. A sorte financeira favorece investimento planejado e poupanca. E tempo de novos relacionamentos. Nao deixe nenhuma oportunidade passar.',
  ],
  2: [
    'Periodo de calma e reflexao. Revise o mes passado e reorganize sua estrategia. A comunicacao sincera importa nas relacoes; e um bom momento para resolver mal-entendidos. Reforce a imunidade na saude. A sorte financeira e estavel, mas voce pode achar oportunidades em trabalho paralelo. Um mes tranquilo, mas pleno.',
  ],
  3: [
    'A energia de novos comecos volta. Como a primavera depois do inverno, inicia-se um periodo de crescimento. Excelente mes para iniciar projetos ou negocios. Voce pode ampliar sua rede e a sorte romantica sobe. Cuidado com a pressa: mantenha prudencia e equilibrio.',
  ],
  4: [
    'Mes de acao ativa e mudanca. E hora de colocar em pratica o que voce preparou. A sorte financeira sobe e novas fontes de renda podem aparecer. Voce pode alcancar resultados no trabalho ou negocio: concentre sua energia. Cuide da saude por excesso de trabalho e nao esqueça a humildade nas relacoes. A porta para o sucesso esta aberta.',
  ],
  5: [
    'Tempo de estabilidade e prosperidade. As atividades de abril trazem bons resultados neste mes. Sua situacao financeira melhora e voce pode subir para uma posicao de confianca. Relacoes familiares harmoniosas; bom momento para decisoes importantes. A saude vai bem, mas relaxe e descanse o suficiente. O esforco deste periodo rende no longo prazo.',
  ],
  6: [
    'Ventos de mudanca estao soprando. Voce pode estar em um ponto de virada ou de escolha. Evite mudancas bruscas e decida com cuidado. Conversa honesta importa nas relacoes; resolva mal-entendidos agora. E preciso gestao financeira conservadora e controle do estresse para a saude. Aceite a mudanca, mas enfrente-a com sabedoria.',
  ],
  7: [
    'Mes de paixao e expressao. Voce pode expressar opinioes e sentimentos com mais liberdade. Bom momento para atividades criativas ou hobbies novos; a sorte romantica esta muito alta. Nao esqueça da moderacao se a emocao exagerar. Nas financas, evite especulacao e priorize investimentos estaveis. Mes social: as relacoes com quem esta ao seu redor se ativam.',
  ],
  8: [
    'Mes de colheita e fechamento. Os esforcos do primeiro semestre dao fruto. A sorte financeira sobe e pode haver ganhos inesperados. Ha alta probabilidade de reconhecimento: confie em si. Os lacos familiares se aprofundam; contratos ou negociacoes importantes sao favoraveis. O sucesso deste mes sera base do segundo semestre. Nao esqueça da gratidao.',
  ],
  9: [
    'Tempo de mudanca e organizacao. Voce se afasta do calor do verao em direcao a calma. Organize o desnecessario e revise seus planos. Bom mes para aprender ou se desenvolver. Favorece relacionamentos mais profundos; o tempo a sos tambem importa. A sorte financeira e conservadora, mas com crescimento constante. Foque no crescimento interior.',
  ],
  10: [
    'Mes de estabilidade e colheita. Amadurece o que foi preparado desde marco. A sorte financeira e boa e podem surgir retornos de investimentos. Favorece concluir projetos importantes no trabalho ou negocio. A saude vai bem e a sorte geral sobe. Nao perca a humildade com o sucesso e cuide das relacoes. O equilibrio importa neste mes.',
  ],
  11: [
    'Mes de reflexao e preparacao. Ao fechar o ano, organize o que foi vivido e prepare o proximo. A sorte financeira e estavel; vale buscar oportunidades de investimento para o ano seguinte. Expresse gratidao a quem voce ama nas relacoes. O cansaço pode acumular: descanse o suficiente. Encontre plenitude com reflexao interior e termine o ano com calma.',
  ],
  12: [
    'Mes de encerramento e novos comecos. Prepare-se para concluir o ano e receber o novo. Faça um balanco das conquistas do ano e sinta gratidao. Nas financas, e tempo de fechamento: finalize planos pendentes. Valorize o tempo com familia e amigos e abrace a esperanca para o ano novo. A preparacao deste periodo define o sucesso do proximo ano. Receba o ano novo com gratidao e esperanca.',
  ],
}

// ─── Yearly comprehensive (13 strings) ───────────────────────────────────────

export const yearlyComprehensivePt: string[] = [
  'Este ano abre um capitulo novo e significativo. Os primeiros meses recompensam bases cuidadosas; do fim da primavera ao verao, o ritmo acelera e surge uma janela decisiva. A renda tende a subir: evite apostas imprudentes. Vinculos genuinos se aproximam e aliados uteis chegam. O autocuidado constante mantem sua energia alta; o fim do ano se sente cheio de gratidao.',
  'Seus pontos fortes aparecem e ganham reconhecimento. A primeira metade favorece tentativas ousadas em areas novas; o que voce decidir ali molda as vitorias do segundo semestre. Observe marco a maio para propostas. O fluxo de caixa se mantem controlavel e surgem novas formas de renda: escolha com clareza. Colaboracao e confianca sobem; gerencie o estresse e encerre o ano com satisfacao solida.',
  'Um ano de crescimento interior mais do que de barulho externo. A primeira metade favorece reflexao: organize o que manter e o que soltar. A nova perspectiva fortalece decisoes depois da metade do ano. O dinheiro se mantem equilibrado e calmo; corte excessos e aumente a poupanca. Relacoes se aprofundam alem da superficialidade; praticas tranquilas acalmam o corpo. O ano parece sutil, mas muito significativo.',
  'A sorte e as aberturas se concentram neste ano. A postura de janeiro e fevereiro prepara um marco em diante forte. Abril a julho traz o impulso maximo para lancamentos e decisoes corajosas. As financas podem disparar: gaste com disciplina. Mentores e redes novas chegam; cuide da saude no meio do ritmo. O fim do ano se sente abundante e luminoso.',
  'Desafio e crescimento caminham juntos. Aprender e investir em habilidades brilha na primeira metade; resultados visiveis se acumulam depois do verao. A renda pode oscilar, mas a tendencia e de alta: mantenha prudencia. Vinculos antigos se fortalecem e novos rostos aparecem. Rotinas ativas te mantem resiliente; voce sobe de nivel ate dezembro.',
  'Voce busca calma e realinhamento. A primeira metade limpa bagunca e restaura ordem; a segunda revela novos angulos sobre oportunidades antigas. O dinheiro se mantem estavel com possivel renda extra. Familia e amigos proximos ficam mais valiosos. Descanso e cuidado com o sistema nervoso sao remedio: sua riqueza interior cresce.',
  'A criatividade quer voz. O primeiro trimestre clareia sua visao; primavera e verao expandem experimentos: observe junho a setembro por uma virada. Trabalho criativo paralelo pode render; pessoas afins aceleram crescimento. Preserve descanso para que a inspiracao seja sustentavel; o ano brilha com ideias realizadas.',
  'Maturidade e perspectiva lideram. Os primeiros meses revisam licoes; os ultimos lancam movimentos mais sabios do que antes. Planos financeiros de longo prazo rendem. Profundidade com familia e amigos importa; sua experiencia ajuda outras pessoas. A saude se mantem quando o ritmo e humano; o ano se sente com os pes no chao e com proposito.',
  'Recuperacao e recomeço, se voce precisar. A primeira metade cura e recarrega energia; depois do meio do ano volta o impulso para novas tentativas. Mantenha gasto suave e poupanca constante. Quem te apoia mostra seu valor; nasce nova confianca. A esperanca fica mais leve rumo ao inverno.',
  'Temporada de prosperidade. Novos projetos favorecem lancamentos de janeiro a marco; os resultados aparecem a partir de abril. Meio do verao pode marcar o pico financeiro: escolha com sabedoria e evite desperdicio. Aliados e parceiros se multiplicam; cuide da saude para aproveitar a onda; a sorte se sente generosa.',
  'A mudanca revela seu valor. Os primeiros meses pedem flexibilidade; portas inesperadas ainda te orientam para cima. O fluxo de caixa pode oscilar, mas a tendencia e positiva: mantenha reservas. Relacionamentos se redefinem; vinculos verdadeiros se estreitam. Voce cresce com mais firmeza no meio do movimento.',
  'Os sonhos encontram a logistica. A primeira metade da forma a planos e atrai ajuda; o verao mostra as primeiras vitorias e o outono pode superar metas. Os recursos se alinham a visao se voce gastar com consciencia. Pessoas que te incentivam aparecem; esperanca e orgulho crescem ate o fim do ano.',
  'Comunicacao e empatia aprofundam vinculos. O dialogo na primeira metade amplia a perspectiva; projetos conjuntos florescem depois. Surgem rendas ligadas a pessoas; artes criativas podem brilhar. Estabilidade emocional e a chave da saude: meses calorosos e significativos estao por vir.',
  'A paciencia finalmente compensa. Ainda e primeiro semestre de encerramento de trabalhos antigos: mantenha foco, sem pressa. Depois do verao os resultados aceleram; o outono pode surpreender. A renda acompanha o esforco em alta; integridade conquista confianca. Rotinas saudaveis te levam a um encerramento pleno.',
]

// ─── Yearly detailed (5 strings) ──────────────────────────────────────────────

export const yearlyDetailedPt: string[] = [
  'Este ano e uma nova virada: o primeiro trimestre planeja, o segundo executa, o terceiro mostra conquistas visiveis e o quarto revisa. A metade do ano favorece movimentos financeiros importantes. Mantenha a esperanca e a constancia.',
  'O trabalho discreto finalmente ganha destaque; a primeira metade foca, a segunda abre novos caminhos. Amigos verdadeiros permanecem por perto. A prosperidade sobe: use a primeira metade para decisoes financeiras importantes.',
  'A calma retorna depois de periodos agitados. A primeira metade estabiliza e planeja; a segunda executa com paciencia. Novos aliados ajudam. O dinheiro se mantem equilibrado: pequenos ganhos constantes vencem saltos arriscados.',
  'A sorte se concentra: pequenas decisoes iniciais geram ondas amplas; a metade do ano mostra sua melhor habilidade; o fim amplia vitorias. Investimentos e tentativas inclinam para o positivo: mantenha vigor e gratidao.',
  'Maturacao interior: a primeira metade solta peso, a segunda acolhe habitos melhores. Pratica espiritual ou reflexiva ajuda. O dinheiro fica estavel e seguro: uma gestao suave ja e suficiente.',
]

// ─── Monthly detailed (12 strings) ────────────────────────────────────────────

export const monthlyDetailedPt: string[] = [
  'Janeiro: energia de novo comeco. Feche o ano passado, defina metas e purifique corpo e mente. O dinheiro e estavel: fique atento a oportunidades; nao perca novos vinculos.',
  'Fevereiro: crescimento interior tranquilo. Prepare-se para a primavera com paciencia; conversas mais profundas podem surgir. O dinheiro esta calmo: valorize o presente.',
  'Marco: a vitalidade retorna com a primavera. Bom momento para lancar planos; a renda sobe: mova-se com atividade e adapte-se a estacao.',
  'Abril: o crescimento aparece. A cooperacao brilha; cuide dos gastos enquanto a rede esquenta.',
  'Maio: paixao no maximo: participe com ousadia, mas cuide da fadiga. O dinheiro favorece novas tentativas; cuide da saude.',
  'Junho: harmonia madura depois do ritmo de maio. Reflita sobre relacionamentos; o dinheiro segue equilibrado: descanso e gratidao ajudam.',
  'Julho: mudancas e propostas chegam: mantenha-se flexivel. O dinheiro pode oscilar, mas segue favoravel; estabilize suas emocoes.',
  'Agosto: acao ousada no meio do verao: decisoes e equipe alinhadas. A renda pode dar salto: gerencie sua energia.',
  'Setembro: colheita e revisao: celebre conquistas e planeje o proximo passo. O dinheiro reconhece o esforco passado.',
  'Outubro: profundidade de outono: a ordem volta, os amigos verdadeiros se destacam. O dinheiro se estabiliza; a calma interior importa.',
  'Novembro: prepare-se para o inverno: organize contas e ritmo. O dinheiro fica plano e seguro; evite excesso de trabalho.',
  'Dezembro: feche o ano com gratidao, celebre vitorias e defina novas metas. O dinheiro apoia um comeco tranquilo.',
]

// ─── Lifetime detailed (6 strings) ────────────────────────────────────────────

export const lifetimeDetailedPt: string[] = [
  'Sua vida avanca entre crescimento e mudanca constantes. Os primeiros anos constroem bases com paciencia; a metade da vida transforma esforco em lacos profundos e patrimonio; os anos finais trazem sentido com sabedoria e ajuda aos outros. A prosperidade sobe de forma constante quando voce honra a confianca e os relacionamentos.',
  'Criatividade e coragem marcam seu caminho. Exploracao e erros iniciais viram ativos que abrem uma rota independente na metade da vida. As emocoes sao intensas: mantenha-se ancorado em pessoas confiaveis. A renda pode oscilar, mas trabalho criativo abre novas fontes; calma emocional sustenta a saude.',
  'Uma calma profunda te define. Por fora, voce pode parecer mais reservado ou reservada; por dentro, e reflexivo e conquista confianca. A cautela no inicio semeia sucesso na metade da vida e tranquilidade depois. Relacoes se filtram ate aliados verdadeiros, sua maior riqueza. O dinheiro se mantem estavel; equilibre mente e corpo para a melhor vitalidade.',
  'Acao e execucao te movem. Voce alcanca a maioria das metas que define; o impulso inicial vira resultado na metade da vida e coragem para novos saltos depois. Honestidade direta pode gerar atrito: pratique empatia. Prosperidade segue esforco; rotinas constantes protegem a saude.',
  'Voce busca harmonia e equilibrio. As pessoas se sentem atraidas pelo seu cuidado; voce cresce da influencia para a independencia. Estetica e intuicao fortes combinam com trabalho criativo. O dinheiro se mantem estavel com oportunidades novas; paz emocional e chave da saude.',
  'Sabedoria e discernimento preenchem sua jornada. Provas da juventude se tornam forca depois; empatia constrói lacos. A prosperidade se fortalece desde a metade da vida; sua atitude mental molda como seu corpo se sente.',
]

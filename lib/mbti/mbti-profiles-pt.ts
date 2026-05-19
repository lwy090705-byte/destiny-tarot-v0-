import type { MBTIType } from './mbti-types'
import type { MbtiTypeProfile } from './mbti-types'

export const mbtiProfilesPt: Record<MBTIType, MbtiTypeProfile> = {
  INTJ: {
    title: 'Arquiteto',
    description:
      'Estrategista independente e analítico, com altos padrões, que valoriza eficiência e lógica. Você define visões de longo prazo e avança com constância rumo aos seus objetivos.',
    strengths: ['Pensamento estratégico', 'Independência', 'Decisão', 'Altos padrões', 'Amor por aprender'],
    weaknesses: ['Perfeccionismo', 'Dificuldade para expressar emoções', 'Crítica excessiva', 'Pouca flexibilidade'],
    loveStyle:
      'Você busca relacionamentos profundos e significativos e gosta de conversas intelectuais. É leal, embora expressar emoções possa ser difícil.',
    career: ['Cientista', 'Consultor estratégico', 'Analista de investimentos', 'Desenvolvedor de software', 'Professor'],
  },
  INTP: {
    title: 'Lógico',
    description: 'Inovador reflexivo que ama lógica e análise e gosta de resolver problemas complexos.',
    strengths: ['Análise', 'Criatividade', 'Objetividade', 'Curiosidade', 'Resolução de problemas'],
    weaknesses: ['Indecisão', 'Pouca sociabilidade', 'Ignorar emoções', 'Baixa execução'],
    loveStyle:
      'A conexão intelectual é importante para você; quer liberdade no relacionamento e gosta de parceiros que apreciam debates profundos.',
    career: ['Pesquisador', 'Programador', 'Filósofo', 'Matemático', 'Desenvolvedor de jogos'],
  },
  ENTJ: {
    title: 'Comandante',
    description: 'Líder nato que busca eficiência e conduz organizações em direção aos seus objetivos.',
    strengths: ['Liderança', 'Confiança', 'Decisão', 'Eficiência', 'Pensamento estratégico'],
    weaknesses: ['Dominador', 'Impaciência', 'Ignorar emoções', 'Teimosia'],
    loveStyle:
      'Você busca crescimento na relação e prefere parceiros ambiciosos. Gosta de comunicação honesta e direta.',
    career: ['CEO', 'Advogado', 'Consultor de gestão', 'Político', 'Empreendedor'],
  },
  ENTP: {
    title: 'Inovador',
    description: 'Inovador criativo que gosta de debater e explorar ideias novas.',
    strengths: ['Criatividade', 'Adaptabilidade', 'Paixão', 'Humor', 'Resolução de problemas'],
    weaknesses: ['Argumentativo', 'Quebrar regras', 'Pouca concentração', 'Ignorar emoções'],
    loveStyle:
      'Você quer relações intelectuais e divertidas, com um parceiro que curta debate e experiências novas.',
    career: ['Empreendedor', 'Inventor', 'Advogado', 'Profissional de marketing', 'Cineasta'],
  },
  INFJ: {
    title: 'Advogado',
    description: 'Idealista com intuição profunda que quer ajudar os outros e melhorar o mundo.',
    strengths: ['Intuição', 'Idealismo', 'Decisão', 'Paixão', 'Altruísmo'],
    weaknesses: ['Perfeccionismo', 'Esgotamento', 'Reserva excessiva', 'Sensibilidade a críticas'],
    loveStyle: 'Você busca vínculos profundos e autênticos e deseja encontrar uma verdadeira alma gêmea.',
    career: ['Conselheiro', 'Escritor', 'Psicólogo', 'Professor', 'Ativista'],
  },
  INFP: {
    title: 'Mediador',
    description: 'Sonhador de um mundo ideal, sensível e criativo, que valoriza autenticidade.',
    strengths: ['Empatia', 'Criatividade', 'Idealismo', 'Paixão', 'Adaptabilidade'],
    weaknesses: ['Irrealismo', 'Autocrítica', 'Evitação', 'Hipersensibilidade'],
    loveStyle: 'Você sonha com um amor romântico e ideal e quer uma conexão emocional profunda.',
    career: ['Escritor', 'Artista', 'Conselheiro', 'Músico', 'Assistente social'],
  },
  ENFJ: {
    title: 'Protagonista',
    description: 'Líder carismático que ajuda outras pessoas a crescer e exerce influência positiva.',
    strengths: ['Carisma', 'Altruísmo', 'Confiabilidade', 'Paixão', 'Comunicação'],
    weaknesses: ['Idealismo excessivo', 'Autossacrifício', 'Sensibilidade a críticas', 'Indecisão'],
    loveStyle: 'Você é um parceiro dedicado e acolhedor; gosta de apoiar o crescimento da outra pessoa.',
    career: ['Professor', 'Conselheiro', 'Gerente de RH', 'Político', 'Organizador de eventos'],
  },
  ENFP: {
    title: 'Ativista',
    description: 'Espírito livre, criativo e apaixonado que explora possibilidades e inspira os outros.',
    strengths: ['Paixão', 'Criatividade', 'Sociabilidade', 'Positividade', 'Adaptabilidade'],
    weaknesses: ['Pouca concentração', 'Emoções intensas', 'Irrealismo', 'Otimismo excessivo'],
    loveStyle:
      'Você gosta de um amor apaixonado e romântico e quer experiências novas com conexão profunda.',
    career: ['Ator', 'Jornalista', 'Profissional de marketing', 'Conselheiro', 'Empreendedor'],
  },
  ISTJ: {
    title: 'Logístico',
    description:
      'Pilar confiável de responsabilidade, que valoriza regras e termina tudo o que começa.',
    strengths: ['Responsabilidade', 'Diligência', 'Organização', 'Confiabilidade', 'Paciência'],
    weaknesses: ['Teimosia', 'Resistência a mudanças', 'Pouca expressão emocional', 'Rigidez excessiva'],
    loveStyle:
      'Você busca relações estáveis e dedicadas; é um parceiro responsável e de confiança.',
    career: ['Contador', 'Servidor público', 'Militar', 'Banqueiro', 'Profissional do direito'],
  },
  ISFJ: {
    title: 'Defensor',
    description: 'Protetor caloroso e dedicado que gosta de cuidar dos outros em silêncio.',
    strengths: ['Dedicação', 'Atenção aos detalhes', 'Confiabilidade', 'Paciência', 'Observação'],
    weaknesses: ['Autossacrifício', 'Resistência a mudanças', 'Evitar conflitos', 'Timidez excessiva'],
    loveStyle:
      'Você ama com dedicação e calor; cuida e apoia seu parceiro com muito cuidado.',
    career: ['Enfermeiro', 'Professor', 'Assistente social', 'Bibliotecário', 'Administrador'],
  },
  ESTJ: {
    title: 'Executivo',
    description: 'Gestor eficiente que valoriza ordem e regras e lidera de forma metódica.',
    strengths: ['Organização', 'Liderança', 'Diligência', 'Decisão', 'Responsabilidade'],
    weaknesses: ['Pouca flexibilidade', 'Teimosia', 'Ignorar emoções', 'Dominador'],
    loveStyle:
      'Você quer relações estáveis e tradicionais; é um parceiro responsável e confiável.',
    career: ['Gerente', 'Policial', 'Juiz', 'Finanças', 'Oficial militar'],
  },
  ESFJ: {
    title: 'Cônsul',
    description:
      'Guardião sociável e atencioso da harmonia, que cuida das pessoas e une o grupo.',
    strengths: ['Sociabilidade', 'Cuidado', 'Organização', 'Cooperação', 'Lealdade'],
    weaknesses: ['Necessidade de aprovação', 'Resistência a mudanças', 'Sensibilidade a críticas', 'Evitar conflitos'],
    loveStyle:
      'Você ama com carinho e dedicação; é voltado para a família e cuida muito bem do parceiro.',
    career: ['Enfermeiro', 'Professor', 'Organizador de eventos', 'RH', 'Vendas'],
  },
  ISTP: {
    title: 'Virtuoso',
    description:
      'Solucionador prático e lógico, com grande habilidade manual, que gosta de ação espontânea.',
    strengths: ['Praticidade', 'Análise', 'Adaptabilidade', 'Calma', 'Eficiência'],
    weaknesses: ['Pouca expressão emocional', 'Distanciamento', 'Busca por risco', 'Evitar compromissos'],
    loveStyle:
      'Você quer liberdade e independência no amor e demonstra carinho por meio de ações.',
    career: ['Engenheiro', 'Piloto', 'Técnico', 'Atleta', 'Bombeiro'],
  },
  ISFP: {
    title: 'Aventureiro',
    description:
      'Alma gentil com sensibilidade artística, que aproveita o presente e busca beleza.',
    strengths: ['Senso artístico', 'Empatia', 'Flexibilidade', 'Lealdade', 'Aventura'],
    weaknesses: ['Baixa autoestima', 'Evitar conflitos', 'Imprevisibilidade', 'Pouco planejamento'],
    loveStyle:
      'Você ama de forma romântica e sensível, expressando afeto profundo de maneira discreta.',
    career: ['Artista', 'Designer', 'Veterinário', 'Chef', 'Fotógrafo'],
  },
  ESTP: {
    title: 'Empreendedor',
    description:
      'Aventureiro ativo e realista que vive o momento e não tem medo de correr riscos.',
    strengths: ['Adaptabilidade', 'Observação', 'Audácia', 'Praticidade', 'Sociabilidade'],
    weaknesses: ['Impulsividade', 'Quebrar regras', 'Pouca paciência', 'Ignorar emoções'],
    loveStyle:
      'Você gosta de relacionamentos divertidos e ativos, e de um parceiro para viver novas experiências.',
    career: ['Empreendedor', 'Vendas', 'Atleta', 'Ator', 'Serviços de emergência'],
  },
  ESFP: {
    title: 'Animador',
    description:
      'Pessoa sociável que anima o ambiente, aproveita o presente e gosta de estar com os outros.',
    strengths: ['Sociabilidade', 'Otimismo', 'Praticidade', 'Observação', 'Audácia'],
    weaknesses: ['Pouca concentração', 'Dificuldade com planos longos', 'Sensibilidade a críticas', 'Impulsividade'],
    loveStyle:
      'Você é carinhoso e divertido e gosta de compartilhar experiências alegres a dois.',
    career: ['Artista de palco', 'Organizador de eventos', 'Guia turístico', 'Chef', 'Professor infantil'],
  },
}

export default mbtiProfilesPt

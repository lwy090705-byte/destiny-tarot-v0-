/**
 * Generates ES/ID/JA/ZH MBTI profile files from English source.
 * Run: node scripts/gen-mbti-locale-profiles.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const enPath = path.join(root, 'lib/mbti/mbti-profiles-en.ts')
const enSrc = fs.readFileSync(enPath, 'utf8')

const types = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP',
]

function extractProfiles(src) {
  const out = {}
  for (const t of types) {
    const re = new RegExp(`${t}:\\s*\\{([\\s\\S]*?)\\n  \\},`, 'm')
    const m = src.match(re)
    if (!m) throw new Error(`Missing type ${t}`)
    const block = m[1]
    const pick = (key) => {
      if (key === 'strengths' || key === 'weaknesses' || key === 'career') {
        const arr = block.match(new RegExp(`${key}:\\s*\\[([^\\]]+)\\]`))
        if (!arr) throw new Error(`${t}.${key}`)
        return arr[1]
          .split(',')
          .map((s) => s.trim().replace(/^'|'$/g, ''))
      }
      const s = block.match(new RegExp(`${key}:\\s*'((?:\\\\'|[^'])*)'`))
      if (!s) throw new Error(`${t}.${key}`)
      return s[1].replace(/\\'/g, "'")
    }
    out[t] = {
      title: pick('title'),
      description: pick('description'),
      strengths: pick('strengths'),
      weaknesses: pick('weaknesses'),
      loveStyle: pick('loveStyle'),
      career: pick('career'),
    }
  }
  return out
}

const en = extractProfiles(enSrc)

/** @type {Record<string, Record<string, Partial<typeof en.INTJ>>>} */
const overrides = {
  es: {
    INTJ: {
      title: 'Arquitecto',
      description:
        'Estratega independiente y analítico con altos estándares que valora la eficiencia y la lógica. Fijas visiones a largo plazo y avanzas con constancia hacia tus metas.',
      strengths: ['Pensamiento estratégico', 'Independencia', 'Decisión', 'Altos estándares', 'Amor por aprender'],
      weaknesses: ['Perfeccionismo', 'Dificultad para expresar emociones', 'Crítica excesiva', 'Poca flexibilidad'],
      loveStyle:
        'Buscas relaciones profundas y significativas y disfrutas la conversación intelectual. Eres leal, aunque expresar emociones puede costarte.',
      career: ['Científico', 'Consultor estratégico', 'Analista de inversiones', 'Desarrollador de software', 'Profesor'],
    },
    INTP: {
      title: 'Lógico',
      description:
        'Innovador reflexivo que ama la lógica y el análisis y disfruta resolver problemas complejos.',
      strengths: ['Análisis', 'Creatividad', 'Objetividad', 'Curiosidad', 'Resolución de problemas'],
      weaknesses: ['Indecisión', 'Poca sociabilidad', 'Ignorar emociones', 'Poca ejecución'],
      loveStyle:
        'La conexión intelectual importa; quieres libertad en la relación y disfrutas parejas que aman el debate profundo.',
      career: ['Investigador', 'Programador', 'Filósofo', 'Matemático', 'Desarrollador de juegos'],
    },
    ENTJ: {
      title: 'Comandante',
      description:
        'Líder nato que busca eficiencia y guía organizaciones hacia sus objetivos.',
      strengths: ['Liderazgo', 'Confianza', 'Decisión', 'Eficiencia', 'Pensamiento estratégico'],
      weaknesses: ['Dominante', 'Impaciencia', 'Ignorar emociones', 'Terquedad'],
      loveStyle:
        'Buscas crecimiento en la pareja y prefieres socios ambiciosos. Te gusta la comunicación honesta y directa.',
      career: ['CEO', 'Abogado', 'Consultor de gestión', 'Político', 'Emprendedor'],
    },
    ENTP: {
      title: 'Innovador',
      description:
        'Innovador creativo que disfruta el debate y explorar ideas nuevas.',
      strengths: ['Creatividad', 'Adaptabilidad', 'Pasión', 'Humor', 'Resolución de problemas'],
      weaknesses: ['Argumentativo', 'Romper reglas', 'Poca concentración', 'Ignorar emociones'],
      loveStyle:
        'Quieres relaciones intelectuales y divertidas y una pareja que disfrute debate y experiencias nuevas.',
      career: ['Emprendedor', 'Inventor', 'Abogado', 'Marketer', 'Cineasta'],
    },
    INFJ: {
      title: 'Abogado',
      description:
        'Idealista con profunda intuición que quiere ayudar a otros y mejorar el mundo.',
      strengths: ['Intuición', 'Idealismo', 'Decisión', 'Pasión', 'Altruismo'],
      weaknesses: ['Perfeccionismo', 'Agotamiento', 'Secretismo', 'Sensibilidad a la crítica'],
      loveStyle:
        'Buscas vínculos profundos y auténticos y una verdadera alma gemela.',
      career: ['Consejero', 'Escritor', 'Psicólogo', 'Profesor', 'Activista'],
    },
    INFP: {
      title: 'Mediador',
      description:
        'Soñador de un mundo ideal con sensibilidad y creatividad que valora la autenticidad.',
      strengths: ['Empatía', 'Creatividad', 'Idealismo', 'Pasión', 'Adaptabilidad'],
      weaknesses: ['Irrealismo', 'Autocrítica', 'Evitación', 'Hipersensibilidad'],
      loveStyle:
        'Sueñas con un amor romántico e ideal y quieres conexión emocional profunda.',
      career: ['Escritor', 'Artista', 'Consejero', 'Músico', 'Trabajador social'],
    },
    ENFJ: {
      title: 'Protagonista',
      description:
        'Líder carismático que ayuda a otros a crecer y ejerce influencia positiva.',
      strengths: ['Carisma', 'Altruismo', 'Fiabilidad', 'Pasión', 'Comunicación'],
      weaknesses: ['Idealismo excesivo', 'Autosacrificio', 'Sensibilidad a la crítica', 'Indecisión'],
      loveStyle:
        'Eres pareja dedicada y cálida; te gusta apoyar el crecimiento del otro.',
      career: ['Profesor', 'Consejero', 'Gerente de RR. HH.', 'Político', 'Organizador de eventos'],
    },
    ENFP: {
      title: 'Activista',
      description:
        'Espíritu libre creativo y apasionado que explora posibilidades e inspira a otros.',
      strengths: ['Pasión', 'Creatividad', 'Sociabilidad', 'Positividad', 'Adaptabilidad'],
      weaknesses: ['Poca concentración', 'Emociones intensas', 'Irrealismo', 'Optimismo excesivo'],
      loveStyle:
        'Disfrutas el amor apasionado y romántico y quieres experiencias nuevas con conexión profunda.',
      career: ['Actor', 'Periodista', 'Marketer', 'Consejero', 'Emprendedor'],
    },
    ISTJ: {
      title: 'Logístico',
      description:
        'Pilar fiable de responsabilidad que valora las reglas y termina lo que empieza.',
      strengths: ['Responsabilidad', 'Diligencia', 'Organización', 'Fiabilidad', 'Paciencia'],
      weaknesses: ['Terquedad', 'Resistencia al cambio', 'Poca expresión emocional', 'Demasiado estricto'],
      loveStyle:
        'Buscas relaciones estables y dedicadas; eres pareja responsable y de confianza.',
      career: ['Contador', 'Funcionario', 'Militar', 'Banquero', 'Profesional legal'],
    },
    ISFJ: {
      title: 'Defensor',
      description:
        'Protector cálido y dedicado que disfruta cuidar de otros en silencio.',
      strengths: ['Devoción', 'Atención al detalle', 'Fiabilidad', 'Paciencia', 'Observación'],
      weaknesses: ['Autosacrificio', 'Resistencia al cambio', 'Evitar conflictos', 'Timidez excesiva'],
      loveStyle:
        'Amas con devoción y calidez; cuidas y apoyas a tu pareja con esmero.',
      career: ['Enfermero', 'Profesor', 'Trabajador social', 'Bibliotecario', 'Administrador'],
    },
    ESTJ: {
      title: 'Ejecutivo',
      description:
        'Gestor eficiente que valora el orden y las reglas y lidera con método.',
      strengths: ['Organización', 'Liderazgo', 'Diligencia', 'Decisión', 'Responsabilidad'],
      weaknesses: ['Poca flexibilidad', 'Terquedad', 'Ignorar emociones', 'Dominante'],
      loveStyle:
        'Quieres relaciones estables y tradicionales; eres responsable y fiable.',
      career: ['Gerente', 'Policía', 'Juez', 'Finanzas', 'Oficial militar'],
    },
    ESFJ: {
      title: 'Cónsul',
      description:
        'Guardián sociable y atento de la armonía que cuida a la gente y une al grupo.',
      strengths: ['Sociabilidad', 'Cuidado', 'Organización', 'Cooperación', 'Lealtad'],
      weaknesses: ['Necesidad de aprobación', 'Resistencia al cambio', 'Sensibilidad a la crítica', 'Evitar conflictos'],
      loveStyle:
        'Amas con calidez y dedicación; eres hogareño y atiendes bien a tu pareja.',
      career: ['Enfermero', 'Profesor', 'Organizador de eventos', 'RR. HH.', 'Ventas'],
    },
    ISTP: {
      title: 'Virtuoso',
      description:
        'Solucionador lógico y práctico con gran habilidad manual que disfruta la acción espontánea.',
      strengths: ['Practicidad', 'Análisis', 'Adaptabilidad', 'Calma', 'Eficiencia'],
      weaknesses: ['Poca expresión emocional', 'Distancia', 'Buscar riesgo', 'Evitar compromisos'],
      loveStyle: 'Quieres libertad e independencia en el amor y muestras cariño con hechos.',
      career: ['Ingeniero', 'Piloto', 'Técnico', 'Atleta', 'Bombero'],
    },
    ISFP: {
      title: 'Aventurero',
      description:
        'Alma gentil con sensibilidad artística que disfruta el presente y busca belleza.',
      strengths: ['Sentido artístico', 'Empatía', 'Flexibilidad', 'Lealtad', 'Aventura'],
      weaknesses: ['Baja autoestima', 'Evitar conflictos', 'Imprevisibilidad', 'Poca planificación'],
      loveStyle:
        'Amas de forma romántica y sensible, expresando afecto profundo en silencio.',
      career: ['Artista', 'Diseñador', 'Veterinario', 'Chef', 'Fotógrafo'],
    },
    ESTP: {
      title: 'Emprendedor',
      description:
        'Aventurero activo y realista que disfruta el momento y no teme el riesgo.',
      strengths: ['Adaptabilidad', 'Observación', 'Audacia', 'Practicidad', 'Sociabilidad'],
      weaknesses: ['Impulsividad', 'Romper reglas', 'Poca paciencia', 'Ignorar emociones'],
      loveStyle:
        'Te gustan relaciones divertidas y activas y una pareja para vivir experiencias nuevas.',
      career: ['Emprendedor', 'Ventas', 'Atleta', 'Actor', 'Emergencias'],
    },
    ESFP: {
      title: 'Animador',
      description:
        'Creador de ambiente sociable que disfruta el presente y estar con la gente.',
      strengths: ['Sociabilidad', 'Optimismo', 'Practicidad', 'Observación', 'Audacia'],
      weaknesses: ['Poca concentración', 'Dificultad con planes largos', 'Sensibilidad a la crítica', 'Impulsividad'],
      loveStyle:
        'Eres cariñoso y divertido y disfrutas compartir experiencias alegres juntos.',
      career: ['Artista escénico', 'Organizador de eventos', 'Guía turístico', 'Chef', 'Maestro infantil'],
    },
  },
  id: {
    INTJ: {
      title: 'Arsitek',
      description:
        'Strategis independen dan analitis dengan standar tinggi yang menghargai efisiensi dan logika. Kamu membuat visi jangka panjang dan bergerak mantap menuju tujuan.',
      strengths: ['Berpikir strategis', 'Independen', 'Tegas', 'Standar tinggi', 'Suka belajar'],
      weaknesses: ['Perfeksionis', 'Sulit mengekspresikan emosi', 'Terlalu kritis', 'Kurang fleksibel'],
      loveStyle:
        'Kamu mencari hubungan yang dalam dan bermakna serta menikmati percakapan intelektual. Setia, meski ekspresi emosi bisa terasa sulit.',
      career: ['Ilmuwan', 'Konsultan strategi', 'Analis investasi', 'Pengembang perangkat lunak', 'Profesor'],
    },
    INTP: {
      title: 'Ahli Logika',
      description:
        'Inovator reflektif yang mencintai logika dan analisis serta menikmati memecahkan masalah rumit.',
      strengths: ['Analitis', 'Kreatif', 'Objektif', 'Penasaran', 'Pemecah masalah'],
      weaknesses: ['Ragu-ragu', 'Kurang sosial', 'Mengabaikan emosi', 'Kurang eksekusi'],
      loveStyle:
        'Koneksi intelektual penting; kamu ingin kebebasan dalam hubungan dan menyukai pasangan yang suka debat mendalam.',
      career: ['Peneliti', 'Programmer', 'Filsuf', 'Matematikawan', 'Pengembang game'],
    },
    ENTJ: {
      title: 'Komandan',
      description:
        'Pemimpin alami yang mengejar efisiensi dan memimpin organisasi menuju tujuan.',
      strengths: ['Kepemimpinan', 'Percaya diri', 'Tegas', 'Efisiensi', 'Berpikir strategis'],
      weaknesses: ['Dominan', 'Tidak sabar', 'Mengabaikan emosi', 'Keras kepala'],
      loveStyle:
        'Kamu mencari pertumbuhan dalam hubungan dan menyukai pasangan ambisius. Lebih suka komunikasi jujur dan langsung.',
      career: ['CEO', 'Pengacara', 'Konsultan manajemen', 'Politikus', 'Pengusaha'],
    },
    ENTP: {
      title: 'Debater',
      description:
        'Inovator kreatif yang menikmati debat dan mengeksplorasi ide baru.',
      strengths: ['Kreatif', 'Adaptif', 'Bersemangat', 'Humor', 'Pemecah masalah'],
      weaknesses: ['Argumentatif', 'Melanggar aturan', 'Kurang fokus', 'Mengabaikan emosi'],
      loveStyle:
        'Kamu ingin hubungan intelektual dan menyenangkan serta pasangan yang suka debat dan pengalaman baru.',
      career: ['Pengusaha', 'Penemu', 'Pengacara', 'Pemasar', 'Sineas'],
    },
    INFJ: {
      title: 'Advokat',
      description:
        'Idealis dengan wawasan mendalam yang ingin membantu orang lain dan membuat dunia lebih baik.',
      strengths: ['Wawasan', 'Idealisme', 'Tegas', 'Semangat', 'Altruisme'],
      weaknesses: ['Perfeksionis', 'Burnout', 'Tertutup', 'Sensitif terhadap kritik'],
      loveStyle:
        'Kamu mengejar ikatan yang dalam dan autentik serta mencari belahan jiwa sejati.',
      career: ['Konselor', 'Penulis', 'Psikolog', 'Guru', 'Aktivis'],
    },
    INFP: {
      title: 'Mediator',
      description:
        'Pemimpi dunia ideal dengan perasaan dan kreativitas mendalam yang menghargai keaslian.',
      strengths: ['Empati', 'Kreatif', 'Idealisme', 'Semangat', 'Adaptif'],
      weaknesses: ['Tidak realistis', 'Kritik diri', 'Menghindar', 'Terlalu sensitif'],
      loveStyle:
        'Kamu memimpikan cinta romantis dan ideal serta menginginkan koneksi emosional yang dalam.',
      career: ['Penulis', 'Seniman', 'Konselor', 'Musisi', 'Pekerja sosial'],
    },
    ENFJ: {
      title: 'Protagonis',
      description:
        'Pemimpin karismatik yang membantu orang lain tumbuh dan memberi pengaruh positif.',
      strengths: ['Karisma', 'Altruisme', 'Dapat diandalkan', 'Semangat', 'Komunikasi'],
      weaknesses: ['Idealisme berlebihan', 'Mengorbankan diri', 'Sensitif kritik', 'Ragu-ragu'],
      loveStyle:
        'Kamu pasangan yang setia dan hangat; senang mendukung pertumbuhan pasangan.',
      career: ['Guru', 'Konselor', 'Manajer SDM', 'Politikus', 'Perencana acara'],
    },
    ENFP: {
      title: 'Juru Kampanye',
      description:
        'Jiwa bebas kreatif dan bersemangat yang mengeksplorasi kemungkinan dan menginspirasi orang lain.',
      strengths: ['Semangat', 'Kreatif', 'Sosial', 'Positif', 'Adaptif'],
      weaknesses: ['Kurang fokus', 'Emosi kuat', 'Tidak realistis', 'Terlalu optimis'],
      loveStyle:
        'Kamu menikmati cinta yang penuh gairah dan romantis serta ingin pengalaman baru dengan koneksi emosional mendalam.',
      career: ['Aktor', 'Jurnalis', 'Pemasar', 'Konselor', 'Pengusaha'],
    },
    ISTJ: {
      title: 'Ahli Logistik',
      description:
        'Pilar tanggung jawab yang dapat diandalkan, menghargai aturan dan menyelesaikan apa yang dimulai.',
      strengths: ['Tanggung jawab', 'Rajin', 'Terorganisir', 'Dapat diandalkan', 'Sabar'],
      weaknesses: ['Keras kepala', 'Menolak perubahan', 'Kurang ekspresi emosi', 'Terlalu ketat'],
      loveStyle:
        'Kamu mencari hubungan stabil dan setia; pasangan yang bertanggung jawab dan tepercaya.',
      career: ['Akuntan', 'Pegawai negeri', 'Tentara', 'Bankir', 'Profesional hukum'],
    },
    ISFJ: {
      title: 'Pembela',
      description:
        'Pelindung hangat dan setia yang senang merawat orang lain secara diam-diam.',
      strengths: ['Pengabdian', 'Perhatian detail', 'Dapat diandalkan', 'Sabar', 'Pengamatan'],
      weaknesses: ['Mengorbankan diri', 'Menolak perubahan', 'Menghindari konflik', 'Terlalu pemalu'],
      loveStyle:
        'Kamu mencintai dengan pengabdian dan kehangatan, merawat dan mendukung pasangan dengan cermat.',
      career: ['Perawat', 'Guru', 'Pekerja sosial', 'Pustakawan', 'Administrator'],
    },
    ESTJ: {
      title: 'Eksekutif',
      description:
        'Manajer efisien yang menghargai ketertiban dan aturan serta memimpin secara sistematis.',
      strengths: ['Organisasi', 'Kepemimpinan', 'Rajin', 'Tegas', 'Tanggung jawab'],
      weaknesses: ['Kurang fleksibel', 'Keras kepala', 'Mengabaikan emosi', 'Dominan'],
      loveStyle:
        'Kamu menginginkan hubungan stabil dan tradisional; pasangan yang bertanggung jawab dan dapat diandalkan.',
      career: ['Manajer', 'Polisi', 'Hakim', 'Keuangan', 'Perwira militer'],
    },
    ESFJ: {
      title: 'Konsul',
      description:
        'Penjaga harmoni yang sosial dan peduli, merawat orang dan menyatukan kelompok.',
      strengths: ['Sosial', 'Peduli', 'Organisasi', 'Kerja sama', 'Loyalitas'],
      weaknesses: ['Butuh pengakuan', 'Menolak perubahan', 'Sensitif kritik', 'Menghindari konflik'],
      loveStyle:
        'Kamu mencintai dengan hangat dan setia, berorientasi keluarga, dan merawat pasangan dengan baik.',
      career: ['Perawat', 'Guru', 'Perencana acara', 'SDM', 'Penjualan'],
    },
    ISTP: {
      title: 'Virtuoso',
      description:
        'Pemecah masalah logis dan praktis dengan keterampilan tangan kuat yang menikmati tindakan spontan.',
      strengths: ['Praktis', 'Analitis', 'Adaptif', 'Tenang', 'Efisiensi'],
      weaknesses: ['Kurang ekspresi emosi', 'Dingin', 'Mencari risiko', 'Menghindari komitmen'],
      loveStyle: 'Kamu ingin kebebasan dan kemandirian dalam cinta serta sering menunjukkan kasih lewat tindakan.',
      career: ['Insinyur', 'Pilot', 'Teknisi', 'Atlet', 'Pemadam kebakaran'],
    },
    ISFP: {
      title: 'Petualang',
      description:
        'Jiwa lembut dengan kepekaan artistik yang menikmati saat ini dan mengejar keindahan.',
      strengths: ['Rasa seni', 'Empati', 'Fleksibel', 'Loyalitas', 'Petualangan'],
      weaknesses: ['Harga diri rendah', 'Menghindari konflik', 'Tidak terduga', 'Kurang perencanaan'],
      loveStyle:
        'Kamu mencintai secara romantis dan sensitif, mengekspresikan kasih sayang yang dalam dengan tenang.',
      career: ['Seniman', 'Desainer', 'Dokter hewan', 'Koki', 'Fotografer'],
    },
    ESTP: {
      title: 'Pengusaha',
      description:
        'Petualang aktif dan realistis yang menikmati momen dan tidak takut risiko.',
      strengths: ['Adaptif', 'Pengamatan', 'Berani', 'Praktis', 'Sosial'],
      weaknesses: ['Impulsif', 'Melanggar aturan', 'Kurang sabar', 'Mengabaikan emosi'],
      loveStyle:
        'Kamu menyukai hubungan yang menyenangkan dan aktif serta pasangan untuk berbagi pengalaman baru.',
      career: ['Pengusaha', 'Penjualan', 'Atlet', 'Aktor', 'Penolong darurat'],
    },
    ESFP: {
      title: 'Penghibur',
      description:
        'Pembawa suasana sosial yang menikmati saat ini dan senang bersama orang lain.',
      strengths: ['Sosial', 'Optimis', 'Praktis', 'Pengamatan', 'Berani'],
      weaknesses: ['Kurang fokus', 'Sulit rencana jangka panjang', 'Sensitif kritik', 'Impulsif'],
      loveStyle:
        'Kamu penuh kasih sayang dan suka bersenang-senang serta menikmati berbagi pengalaman menyenangkan bersama.',
      career: ['Penghibur', 'Perencana acara', 'Pemandu wisata', 'Koki', 'Guru TK'],
    },
  },
  ja: {
    INTJ: { title: '建築家' },
    INTP: { title: '論理学者' },
    ENTJ: { title: '指揮官' },
    ENTP: { title: '討論者' },
    INFJ: { title: '提唱者' },
    INFP: { title: '仲介者' },
    ENFJ: { title: '主人公' },
    ENFP: { title: '運動家' },
    ISTJ: { title: '管理者' },
    ISFJ: { title: '擁護者' },
    ESTJ: { title: '幹部' },
    ESFJ: { title: '領事' },
    ISTP: { title: '巨匠' },
    ISFP: { title: '冒険家' },
    ESTP: { title: '起業家' },
    ESFP: { title: 'エンターテイナー' },
  },
  zh: {
    INTJ: { title: '建筑师' },
    INTP: { title: '逻辑学家' },
    ENTJ: { title: '指挥官' },
    ENTP: { title: '辩论家' },
    INFJ: { title: '提倡者' },
    INFP: { title: '调停者' },
    ENFJ: { title: '主人公' },
    ENFP: { title: '竞选者' },
    ISTJ: { title: '物流师' },
    ISFJ: { title: '守卫者' },
    ESTJ: { title: '总经理' },
    ESFJ: { title: '执政官' },
    ISTP: { title: '鉴赏家' },
    ISFP: { title: '探险家' },
    ESTP: { title: '企业家' },
    ESFP: { title: '表演者' },
  },
}

function mergeProfile(type, base, patch) {
  return {
    title: patch.title ?? base.title,
    description: patch.description ?? base.description,
    strengths: patch.strengths ?? base.strengths,
    weaknesses: patch.weaknesses ?? base.weaknesses,
    loveStyle: patch.loveStyle ?? base.loveStyle,
    career: patch.career ?? base.career,
  }
}

function emitFile(exportName, profiles) {
  const lines = [
    "import type { MBTIType } from './mbti-types'",
    "import type { MbtiTypeProfile } from './mbti-types'",
    '',
    `export const ${exportName}: Record<MBTIType, MbtiTypeProfile> = {`,
  ]
  for (const t of types) {
    const p = profiles[t]
    lines.push(`  ${t}: {`)
    lines.push(`    title: ${JSON.stringify(p.title)},`)
    lines.push(`    description: ${JSON.stringify(p.description)},`)
    lines.push(`    strengths: ${JSON.stringify(p.strengths)},`)
    lines.push(`    weaknesses: ${JSON.stringify(p.weaknesses)},`)
    lines.push(`    loveStyle: ${JSON.stringify(p.loveStyle)},`)
    lines.push(`    career: ${JSON.stringify(p.career)},`)
    lines.push('  },')
  }
  lines.push('}', '')
  return lines.join('\n')
}

function buildLocale(langKey) {
  const patchMap = overrides[langKey]
  const out = {}
  for (const t of types) {
    out[t] = mergeProfile(t, en[t], patchMap[t] || {})
  }
  return out
}

const esProfiles = buildLocale('es')
const idProfiles = buildLocale('id')
const jaProfiles = buildLocale('ja')
const zhProfiles = buildLocale('zh')

const esIdPath = path.join(root, 'lib/mbti/mbti-profiles-es-id.ts')
fs.writeFileSync(
  esIdPath,
  emitFile('mbtiProfilesEs', esProfiles).replace(
    "export const mbtiProfilesEs",
    "export const mbtiProfilesEs"
  ) +
    '\n' +
    emitFile('mbtiProfilesId', idProfiles).split('\n').slice(3).join('\n')
)

// Fix es-id to single file with two exports
const esIdContent =
  emitFile('mbtiProfilesEs', esProfiles).trimEnd() +
  '\n\n' +
  emitFile('mbtiProfilesId', idProfiles).split('\n').slice(3).join('\n')
fs.writeFileSync(esIdPath, esIdContent)

const jaZhPath = path.join(root, 'lib/mbti/mbti-profiles-ja-zh.ts')
const jaZhContent =
  emitFile('mbtiProfilesJa', jaProfiles).trimEnd() +
  '\n\n' +
  emitFile('mbtiProfilesZh', zhProfiles).split('\n').slice(3).join('\n')
fs.writeFileSync(jaZhPath, jaZhContent)

console.log('Wrote', esIdPath, jaZhPath)

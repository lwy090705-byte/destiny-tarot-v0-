import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const filePath = path.join(__dirname, '../components/mbti/mbti-inline-labels.ts')
const lines = fs.readFileSync(filePath, 'utf8').split('\n')
const out = []

for (let i = 0; i < lines.length; i++) {
  out.push(lines[i])
  const m = lines[i].match(/^(\s+)es: /)
  if (!m) continue
  const next = lines[i + 1] ?? ''
  if (!next.trim().startsWith('fr:')) continue
  const block = lines.slice(Math.max(0, i - 20), i + 1).join('\n')
  if (block.includes('id:')) continue
  const enM = block.match(/en: '((?:\\'|[^'])*)',/)
  const enVal = enM ? enM[1].replace(/\\'/g, "'") : ''
  const idTranslations = {
    '95 pts (Perfect match!)': '95 poin (Kecocokan sempurna!)',
    '80 pts (Great match)': '80 poin (Kecocokan bagus)',
    '65 pts (Match that needs effort)': '65 poin (Perlu usaha)',
    'Perfect match!': 'Kecocokan sempurna!',
    'Great match': 'Kecocokan bagus',
    'Challenging match': 'Perlu usaha',
    'You complement each other beautifully! With deep understanding and respect, you can keep a happy relationship for a long time.':
      'Kalian saling melengkapi dengan indah! Dengan pemahaman dan rasa hormat yang dalam, hubungan bahagia bisa bertahan lama.',
    'Your differences become charm—this is a strong match. Through communication you can grow into an even deeper bond.':
      'Perbedaan menjadi daya tarik—kecocokan yang kuat. Lewat komunikasi, ikatan bisa semakin dalam.',
    'You differ in many ways—and there is much to learn from each other. With patience and effort to understand, the relationship can grow.':
      'Kalian berbeda di banyak hal—dan banyak yang bisa dipelajari. Dengan kesabaran dan usaha memahami, hubungan bisa tumbuh.',
    'E: Prefers outgoing, active communication. Organizes thoughts through talking and builds relationships that way.':
      'E: Lebih suka komunikasi aktif dan ekstrovert. Mengatur pikiran lewat bicara dan membangun relasi seperti itu.',
    'I: Prefers thoughtful, reserved communication. Enjoys deep one-on-one conversation.':
      'I: Lebih suka komunikasi tenang dan penuh pertimbangan. Menikmati percakapan mendalam satu lawan satu.',
    'F: Expresses feelings openly and values the partner’s emotions. Seeks a deep emotional connection.':
      'F: Mengekspresikan perasaan secara terbuka dan menghargai emosi pasangan. Mencari koneksi emosional yang dalam.',
    'T: Prefers calm, logical expression. Tends to show love through actions.':
      'T: Lebih suka ekspresi tenang dan logis. Cenderung menunjukkan cinta lewat tindakan.',
    'J: Prefers structured, planned work. Takes deadlines seriously and proceeds methodically.':
      'J: Lebih suka kerja terstruktur dan terencana. Menghargai tenggat dan bergerak metodis.',
    'P: Prefers flexible, adaptive work. Responds quickly to situations and embraces change.':
      'P: Lebih suka kerja fleksibel dan adaptif. Merespons situasi dengan cepat dan menerima perubahan.',
    'E: Shows proactive, driving leadership. Fits roles that lead teams and inspire others.':
      'E: Menunjukkan kepemimpinan proaktif dan mendorong. Cocok memimpin tim dan menginspirasi orang lain.',
    'I: Shows careful, dependable leadership. Leads the team with deep thought and strategy.':
      'I: Menunjukkan kepemimpinan hati-hati dan dapat diandalkan. Memimpin tim dengan pemikiran dan strategi mendalam.',
    'A balanced pairing that can build a deep sense of connection.':
      'Pasangan seimbang yang dapat membangun ikatan yang dalam.',
    'A strong fit where you can understand and support each other.':
      'Kecocokan kuat di mana kalian saling memahami dan mendukung.',
    'It takes effort to understand and respect differences—but there is room to grow together.':
      'Butuh usaha untuk memahami dan menghormati perbedaan—tetapi masih ada ruang tumbuh bersama.',
  }
  const idVal = idTranslations[enVal] ?? enVal
  const escaped = idVal.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  out.push(`${m[1]}id: '${escaped}',`)
}

fs.writeFileSync(filePath, out.join('\n'))
console.log('Updated', filePath)

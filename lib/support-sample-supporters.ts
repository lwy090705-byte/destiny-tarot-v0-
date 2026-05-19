import type { Language } from './i18n'

export type SampleSupporter = {
  id: string
  name: string
  amount: string
  date: string
  message?: string
}

const SUPPORTERS: Record<Language, SampleSupporter[]> = {
  ko: [
    { id: '1', name: '행복한별***', amount: '3.14π', date: '2026-03-30', message: '좋은 서비스 감사합니다!' },
    { id: '2', name: '운세마니***', amount: '31.4π', date: '2026-03-29' },
    { id: '3', name: '타로러버***', amount: '0.314π', date: '2026-03-28', message: '항상 응원해요' },
    { id: '4', name: '사주덕후***', amount: '3.14π', date: '2026-03-27' },
    { id: '5', name: '익명의후***', amount: '314π', date: '2026-03-25', message: '최고의 앱입니다' },
  ],
  en: [
    { id: '1', name: 'HappyStar***', amount: '3.14π', date: '2026-03-30', message: 'Thank you for this great service!' },
    { id: '2', name: 'FortuneFan***', amount: '31.4π', date: '2026-03-29' },
    { id: '3', name: 'TarotLover***', amount: '0.314π', date: '2026-03-28', message: 'Always cheering you on!' },
    { id: '4', name: 'SajuFan***', amount: '3.14π', date: '2026-03-27' },
    { id: '5', name: 'Anonymous***', amount: '314π', date: '2026-03-25', message: 'Best app ever!' },
  ],
  ja: [
    { id: '1', name: 'しあわせ星***', amount: '3.14π', date: '2026-03-30', message: '素敵なサービスありがとう！' },
    { id: '2', name: '運勢マニア***', amount: '31.4π', date: '2026-03-29' },
    { id: '3', name: 'タロット愛***', amount: '0.314π', date: '2026-03-28', message: 'いつも応援しています' },
    { id: '4', name: '四柱ファン***', amount: '3.14π', date: '2026-03-27' },
    { id: '5', name: '匿名***', amount: '314π', date: '2026-03-25', message: '最高のアプリです' },
  ],
  zh: [
    { id: '1', name: '幸福星***', amount: '3.14π', date: '2026-03-30', message: '感谢提供这么好的服务！' },
    { id: '2', name: '运势迷***', amount: '31.4π', date: '2026-03-29' },
    { id: '3', name: '塔罗爱好者***', amount: '0.314π', date: '2026-03-28', message: '一直支持你们' },
    { id: '4', name: '八字粉***', amount: '3.14π', date: '2026-03-27' },
    { id: '5', name: '匿名***', amount: '314π', date: '2026-03-25', message: '最好的应用！' },
  ],
  es: [
    { id: '1', name: 'EstrellaFeliz***', amount: '3.14π', date: '2026-03-30', message: '¡Gracias por este gran servicio!' },
    { id: '2', name: 'FanFortuna***', amount: '31.4π', date: '2026-03-29' },
    { id: '3', name: 'AmanteTarot***', amount: '0.314π', date: '2026-03-28', message: '¡Siempre apoyándolos!' },
    { id: '4', name: 'FanSaju***', amount: '3.14π', date: '2026-03-27' },
    { id: '5', name: 'Anónimo***', amount: '314π', date: '2026-03-25', message: '¡La mejor app!' },
  ],
  id: [
    { id: '1', name: 'BintangBahagia***', amount: '3.14π', date: '2026-03-30', message: 'Terima kasih atas layanan hebatnya!' },
    { id: '2', name: 'PenggemarRamalan***', amount: '31.4π', date: '2026-03-29' },
    { id: '3', name: 'PecintaTarot***', amount: '0.314π', date: '2026-03-28', message: 'Selalu mendukung!' },
    { id: '4', name: 'FanSaju***', amount: '3.14π', date: '2026-03-27' },
    { id: '5', name: 'Anonim***', amount: '314π', date: '2026-03-25', message: 'Aplikasi terbaik!' },
  ],
  fr: [
    { id: '1', name: 'ÉtoileHeureuse***', amount: '3.14π', date: '2026-03-30', message: 'Merci pour ce super service !' },
    { id: '2', name: 'FanFortune***', amount: '31.4π', date: '2026-03-29' },
    { id: '3', name: 'AmourTarot***', amount: '0.314π', date: '2026-03-28', message: 'Toujours avec vous !' },
    { id: '4', name: 'FanSaju***', amount: '3.14π', date: '2026-03-27' },
    { id: '5', name: 'Anonyme***', amount: '314π', date: '2026-03-25', message: 'La meilleure appli !' },
  ],
  de: [
    { id: '1', name: 'Glücksstern***', amount: '3.14π', date: '2026-03-30', message: 'Danke für den tollen Service!' },
    { id: '2', name: 'GlücksFan***', amount: '31.4π', date: '2026-03-29' },
    { id: '3', name: 'TarotFan***', amount: '0.314π', date: '2026-03-28', message: 'Immer Unterstützung!' },
    { id: '4', name: 'SajuFan***', amount: '3.14π', date: '2026-03-27' },
    { id: '5', name: 'Anonym***', amount: '314π', date: '2026-03-25', message: 'Beste App überhaupt!' },
  ],
  pt: [
    { id: '1', name: 'EstrelaFeliz***', amount: '3.14π', date: '2026-03-30', message: 'Obrigado pelo ótimo serviço!' },
    { id: '2', name: 'FãFortuna***', amount: '31.4π', date: '2026-03-29' },
    { id: '3', name: 'AmanteTarô***', amount: '0.314π', date: '2026-03-28', message: 'Sempre torcendo!' },
    { id: '4', name: 'FãSaju***', amount: '3.14π', date: '2026-03-27' },
    { id: '5', name: 'Anônimo***', amount: '314π', date: '2026-03-25', message: 'Melhor app!' },
  ],
  hi: [
    { id: '1', name: 'खुशतारा***', amount: '3.14π', date: '2026-03-30', message: 'बढ़िया सेवा के लिए धन्यवाद!' },
    { id: '2', name: 'भाग्यप्रेमी***', amount: '31.4π', date: '2026-03-29' },
    { id: '3', name: 'टैरोप्रेमी***', amount: '0.314π', date: '2026-03-28', message: 'हमेशा समर्थन!' },
    { id: '4', name: 'साजूफैन***', amount: '3.14π', date: '2026-03-27' },
    { id: '5', name: 'अज्ञात***', amount: '314π', date: '2026-03-25', message: 'सबसे अच्छा ऐप!' },
  ],
  vi: [
    { id: '1', name: 'SaoVui***', amount: '3.14π', date: '2026-03-30', message: 'Cảm ơn dịch vụ tuyệt vời!' },
    { id: '2', name: 'FanVậnMay***', amount: '31.4π', date: '2026-03-29' },
    { id: '3', name: 'YêuTarot***', amount: '0.314π', date: '2026-03-28', message: 'Luôn ủng hộ!' },
    { id: '4', name: 'FanTửVi***', amount: '3.14π', date: '2026-03-27' },
    { id: '5', name: 'ẨnDanh***', amount: '314π', date: '2026-03-25', message: 'Ứng dụng hay nhất!' },
  ],
  th: [
    { id: '1', name: 'ดาวมีความสุข***', amount: '3.14π', date: '2026-03-30', message: 'ขอบคุณสำหรับบริการที่ดี!' },
    { id: '2', name: 'แฟนดวง***', amount: '31.4π', date: '2026-03-29' },
    { id: '3', name: 'รักทาโรต์***', amount: '0.314π', date: '2026-03-28', message: 'เชียร์เสมอ!' },
    { id: '4', name: 'แฟนดวงจีน***', amount: '3.14π', date: '2026-03-27' },
    { id: '5', name: 'ไม่ระบุชื่อ***', amount: '314π', date: '2026-03-25', message: 'แอปที่ดีที่สุด!' },
  ],
}

export function getSupportSampleSupporters(language: Language): SampleSupporter[] {
  return SUPPORTERS[language] ?? SUPPORTERS.en
}

export function getAnonymousSupporterName(language: Language): string {
  const names: Record<Language, string> = {
    ko: '익명의사용자',
    en: 'Anonymous user',
    ja: '匿名ユーザー',
    zh: '匿名用户',
    es: 'Usuario anónimo',
    id: 'Pengguna anonim',
    fr: 'Utilisateur anonyme',
    de: 'Anonymer Nutzer',
    pt: 'Usuário anônimo',
    hi: 'अज्ञात उपयोगकर्ता',
    vi: 'Người dùng ẩn danh',
    th: 'ผู้ใช้ไม่ระบุชื่อ',
  }
  return names[language] ?? names.en
}

import type { Language } from '../i18n'

/** Birth-hour branch values used in profile forms (start hour of each 2-hour slot). */
export const BIRTH_HOUR_VALUES = [23, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21] as const

export type BirthHourValue = (typeof BIRTH_HOUR_VALUES)[number]

type HourLabelRow = { label: string; range: string }

const KO: Record<BirthHourValue, HourLabelRow> = {
  23: { label: '子時', range: '23~01시' },
  1: { label: '丑時', range: '01~03시' },
  3: { label: '寅時', range: '03~05시' },
  5: { label: '卯時', range: '05~07시' },
  7: { label: '辰時', range: '07~09시' },
  9: { label: '巳時', range: '09~11시' },
  11: { label: '午時', range: '11~13시' },
  13: { label: '未時', range: '13~15시' },
  15: { label: '申時', range: '15~17시' },
  17: { label: '酉時', range: '17~19시' },
  19: { label: '戌時', range: '19~21시' },
  21: { label: '亥時', range: '21~23시' },
}

const EN: Record<BirthHourValue, HourLabelRow> = {
  23: { label: 'Zi hour (Rat)', range: '11 PM – 1 AM' },
  1: { label: 'Chou hour (Ox)', range: '1 – 3 AM' },
  3: { label: 'Yin hour (Tiger)', range: '3 – 5 AM' },
  5: { label: 'Mao hour (Rabbit)', range: '5 – 7 AM' },
  7: { label: 'Chen hour (Dragon)', range: '7 – 9 AM' },
  9: { label: 'Si hour (Snake)', range: '9 – 11 AM' },
  11: { label: 'Wu hour (Horse)', range: '11 AM – 1 PM' },
  13: { label: 'Wei hour (Goat)', range: '1 – 3 PM' },
  15: { label: 'Shen hour (Monkey)', range: '3 – 5 PM' },
  17: { label: 'You hour (Rooster)', range: '5 – 7 PM' },
  19: { label: 'Xu hour (Dog)', range: '7 – 9 PM' },
  21: { label: 'Hai hour (Pig)', range: '9 – 11 PM' },
}

const JA: Record<BirthHourValue, HourLabelRow> = {
  23: { label: '子の刻', range: '23~01時' },
  1: { label: '丑の刻', range: '01~03時' },
  3: { label: '寅の刻', range: '03~05時' },
  5: { label: '卯の刻', range: '05~07時' },
  7: { label: '辰の刻', range: '07~09時' },
  9: { label: '巳の刻', range: '09~11時' },
  11: { label: '午の刻', range: '11~13時' },
  13: { label: '未の刻', range: '13~15時' },
  15: { label: '申の刻', range: '15~17時' },
  17: { label: '酉の刻', range: '17~19時' },
  19: { label: '戌の刻', range: '19~21時' },
  21: { label: '亥の刻', range: '21~23時' },
}

const ZH: Record<BirthHourValue, HourLabelRow> = {
  23: { label: '子时', range: '23~01点' },
  1: { label: '丑时', range: '01~03点' },
  3: { label: '寅时', range: '03~05点' },
  5: { label: '卯时', range: '05~07点' },
  7: { label: '辰时', range: '07~09点' },
  9: { label: '巳时', range: '09~11点' },
  11: { label: '午时', range: '11~13点' },
  13: { label: '未时', range: '13~15点' },
  15: { label: '申时', range: '15~17点' },
  17: { label: '酉时', range: '17~19点' },
  19: { label: '戌时', range: '19~21点' },
  21: { label: '亥时', range: '21~23点' },
}

const ES: Record<BirthHourValue, HourLabelRow> = {
  23: { label: 'Hora Zi (Rata)', range: '23:00–01:00' },
  1: { label: 'Hora Chou (Buey)', range: '01:00–03:00' },
  3: { label: 'Hora Yin (Tigre)', range: '03:00–05:00' },
  5: { label: 'Hora Mao (Conejo)', range: '05:00–07:00' },
  7: { label: 'Hora Chen (Dragón)', range: '07:00–09:00' },
  9: { label: 'Hora Si (Serpiente)', range: '09:00–11:00' },
  11: { label: 'Hora Wu (Caballo)', range: '11:00–13:00' },
  13: { label: 'Hora Wei (Cabra)', range: '13:00–15:00' },
  15: { label: 'Hora Shen (Mono)', range: '15:00–17:00' },
  17: { label: 'Hora You (Gallo)', range: '17:00–19:00' },
  19: { label: 'Hora Xu (Perro)', range: '19:00–21:00' },
  21: { label: 'Hora Hai (Cerdo)', range: '21:00–23:00' },
}

const ID: Record<BirthHourValue, HourLabelRow> = {
  23: { label: 'Jam Zi (Tikus)', range: '23.00–01.00' },
  1: { label: 'Jam Chou (Kerbau)', range: '01.00–03.00' },
  3: { label: 'Jam Yin (Harimau)', range: '03.00–05.00' },
  5: { label: 'Jam Mao (Kelinci)', range: '05.00–07.00' },
  7: { label: 'Jam Chen (Naga)', range: '07.00–09.00' },
  9: { label: 'Jam Si (Ular)', range: '09.00–11.00' },
  11: { label: 'Jam Wu (Kuda)', range: '11.00–13.00' },
  13: { label: 'Jam Wei (Kambing)', range: '13.00–15.00' },
  15: { label: 'Jam Shen (Monyet)', range: '15.00–17.00' },
  17: { label: 'Jam You (Ayam)', range: '17.00–19.00' },
  19: { label: 'Jam Xu (Anjing)', range: '19.00–21.00' },
  21: { label: 'Jam Hai (Babi)', range: '21.00–23.00' },
}

const FR: Record<BirthHourValue, HourLabelRow> = {
  23: { label: 'Heure Zi (Rat)', range: '23h–01h' },
  1: { label: 'Heure Chou (Bœuf)', range: '01h–03h' },
  3: { label: 'Heure Yin (Tigre)', range: '03h–05h' },
  5: { label: 'Heure Mao (Lapin)', range: '05h–07h' },
  7: { label: 'Heure Chen (Dragon)', range: '07h–09h' },
  9: { label: 'Heure Si (Serpent)', range: '09h–11h' },
  11: { label: 'Heure Wu (Cheval)', range: '11h–13h' },
  13: { label: 'Heure Wei (Chèvre)', range: '13h–15h' },
  15: { label: 'Heure Shen (Singe)', range: '15h–17h' },
  17: { label: 'Heure You (Coq)', range: '17h–19h' },
  19: { label: 'Heure Xu (Chien)', range: '19h–21h' },
  21: { label: 'Heure Hai (Cochon)', range: '21h–23h' },
}

const DE: Record<BirthHourValue, HourLabelRow> = {
  23: { label: 'Zi-Stunde (Ratte)', range: '23–01 Uhr' },
  1: { label: 'Chou-Stunde (Ochse)', range: '01–03 Uhr' },
  3: { label: 'Yin-Stunde (Tiger)', range: '03–05 Uhr' },
  5: { label: 'Mao-Stunde (Hase)', range: '05–07 Uhr' },
  7: { label: 'Chen-Stunde (Drache)', range: '07–09 Uhr' },
  9: { label: 'Si-Stunde (Schlange)', range: '09–11 Uhr' },
  11: { label: 'Wu-Stunde (Pferd)', range: '11–13 Uhr' },
  13: { label: 'Wei-Stunde (Ziege)', range: '13–15 Uhr' },
  15: { label: 'Shen-Stunde (Affe)', range: '15–17 Uhr' },
  17: { label: 'You-Stunde (Hahn)', range: '17–19 Uhr' },
  19: { label: 'Xu-Stunde (Hund)', range: '19–21 Uhr' },
  21: { label: 'Hai-Stunde (Schwein)', range: '21–23 Uhr' },
}

const PT: Record<BirthHourValue, HourLabelRow> = {
  23: { label: 'Hora Zi (Rato)', range: '23h–01h' },
  1: { label: 'Hora Chou (Boi)', range: '01h–03h' },
  3: { label: 'Hora Yin (Tigre)', range: '03h–05h' },
  5: { label: 'Hora Mao (Coelho)', range: '05h–07h' },
  7: { label: 'Hora Chen (Dragão)', range: '07h–09h' },
  9: { label: 'Hora Si (Cobra)', range: '09h–11h' },
  11: { label: 'Hora Wu (Cavalo)', range: '11h–13h' },
  13: { label: 'Hora Wei (Cabra)', range: '13h–15h' },
  15: { label: 'Hora Shen (Macaco)', range: '15h–17h' },
  17: { label: 'Hora You (Galo)', range: '17h–19h' },
  19: { label: 'Hora Xu (Cão)', range: '19h–21h' },
  21: { label: 'Hora Hai (Porco)', range: '21h–23h' },
}

const HI: Record<BirthHourValue, HourLabelRow> = {
  23: { label: 'ज़ी घंटा (चूहा)', range: '23:00–01:00' },
  1: { label: 'चाउ घंटा (बैल)', range: '01:00–03:00' },
  3: { label: 'यिन घंटा (बाघ)', range: '03:00–05:00' },
  5: { label: 'माओ घंटा (खरगोश)', range: '05:00–07:00' },
  7: { label: 'चेन घंटा (ड्रैगन)', range: '07:00–09:00' },
  9: { label: 'सी घंटा (साँप)', range: '09:00–11:00' },
  11: { label: 'वू घंटा (घोड़ा)', range: '11:00–13:00' },
  13: { label: 'वेई घंटा (बकरी)', range: '13:00–15:00' },
  15: { label: 'शेन घंटा (बंदर)', range: '15:00–17:00' },
  17: { label: 'यू घंटा (मुर्गा)', range: '17:00–19:00' },
  19: { label: 'शू घंटा (कुत्ता)', range: '19:00–21:00' },
  21: { label: 'हाई घंटा (सूअर)', range: '21:00–23:00' },
}

const VI: Record<BirthHourValue, HourLabelRow> = {
  23: { label: 'Giờ Tý (Chuột)', range: '23h–01h' },
  1: { label: 'Giờ Sửu (Trâu)', range: '01h–03h' },
  3: { label: 'Giờ Dần (Hổ)', range: '03h–05h' },
  5: { label: 'Giờ Mão (Mèo)', range: '05h–07h' },
  7: { label: 'Giờ Thìn (Rồng)', range: '07h–09h' },
  9: { label: 'Giờ Tỵ (Rắn)', range: '09h–11h' },
  11: { label: 'Giờ Ngọ (Ngựa)', range: '11h–13h' },
  13: { label: 'Giờ Mùi (Dê)', range: '13h–15h' },
  15: { label: 'Giờ Thân (Khỉ)', range: '15h–17h' },
  17: { label: 'Giờ Dậu (Gà)', range: '17h–19h' },
  19: { label: 'Giờ Tuất (Chó)', range: '19h–21h' },
  21: { label: 'Giờ Hợi (Heo)', range: '21h–23h' },
}

const TH: Record<BirthHourValue, HourLabelRow> = {
  23: { label: 'ช่วงจื่อ (ชวด)', range: '23:00–01:00' },
  1: { label: 'ช่วงฉิว (ฉลู)', range: '01:00–03:00' },
  3: { label: 'ช่วงอิ๊ง (ขาล)', range: '03:00–05:00' },
  5: { label: 'ช่วงเม้า (เถาะ)', range: '05:00–07:00' },
  7: { label: 'ช่วงเฉิน (มะโรง)', range: '07:00–09:00' },
  9: { label: 'ช่วงซื่อ (มะเส็ง)', range: '09:00–11:00' },
  11: { label: 'ช่วงอู้ (มะเมีย)', range: '11:00–13:00' },
  13: { label: 'ช่วงเว่ย (มะแม)', range: '13:00–15:00' },
  15: { label: 'ช่วงเซิน (วอก)', range: '15:00–17:00' },
  17: { label: 'ช่วงโหยว (ระกา)', range: '17:00–19:00' },
  19: { label: 'ช่วงซวี่ (จอ)', range: '19:00–21:00' },
  21: { label: 'ช่วงไห่ (กุน)', range: '21:00–23:00' },
}

const BY_LANG: Record<Language, Record<BirthHourValue, HourLabelRow>> = {
  ko: KO,
  en: EN,
  ja: JA,
  zh: ZH,
  es: ES,
  id: ID,
  fr: FR,
  de: DE,
  pt: PT,
  hi: HI,
  vi: VI,
  th: TH,
}

export function getBirthHourLabel(
  language: Language,
  value: number
): HourLabelRow | undefined {
  const row = BY_LANG[language] ?? EN
  return row[value as BirthHourValue]
}

export function getBirthHourOptions(language: Language): Array<{
  value: BirthHourValue
  label: string
  time: string
}> {
  const row = BY_LANG[language] ?? EN
  return BIRTH_HOUR_VALUES.map((value) => ({
    value,
    label: row[value].label,
    time: row[value].range,
  }))
}

export function formatBirthHourDisplay(
  language: Language,
  birthHour: number | undefined
): string {
  if (birthHour === undefined) return ''
  const entry = getBirthHourLabel(language, birthHour)
  if (!entry) return ''
  return `${entry.label} (${entry.range})`
}

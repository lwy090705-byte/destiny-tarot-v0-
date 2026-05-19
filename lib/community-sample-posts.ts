import type { Language } from './i18n'

export type CommunityCategoryKey = 'tarot' | 'saju' | 'compatibility' | 'fortune' | 'other'

export type CommunitySamplePost = {
  id: number
  title: string
  author: string
  date: string
  likes: number
  comments: number
  categoryKey: CommunityCategoryKey
  preview: string
  isRecommended?: boolean
}

const POSTS: Record<Language, CommunitySamplePost[]> = {
  ko: [
    { id: 9, title: '2025년 타로로 보는 하반기 운세 정리', author: '별빛타로', date: '2025-01-12', likes: 142, comments: 38, categoryKey: 'tarot', preview: '2025년 하반기 주요 타로 카드 해석을 모아봤습니다...', isRecommended: true },
    { id: 8, title: '용띠 2025년 총운 분석', author: '동양철학자', date: '2025-01-11', likes: 98, comments: 22, categoryKey: 'saju', preview: '용띠 분들의 2025년 운세를 상세히 분석해드립니다...' },
    { id: 7, title: '궁합 볼 때 꼭 알아야 할 5가지', author: '운명의실', date: '2025-01-10', likes: 215, comments: 61, categoryKey: 'compatibility', preview: '궁합을 볼 때 많은 분들이 놓치는 중요한 포인트들...', isRecommended: true },
    { id: 6, title: '오늘 운세가 안 좋을 때 극복하는 법', author: '희망별', date: '2025-01-09', likes: 77, comments: 14, categoryKey: 'fortune', preview: '오늘의 운세가 좋지 않게 나왔다면 이렇게 해보세요...' },
    { id: 5, title: '사주 보기 전에 꼭 확인해야 할 것들', author: '철학도', date: '2025-01-08', likes: 156, comments: 44, categoryKey: 'saju', preview: '사주 상담을 받기 전에 미리 알아두면 좋은 정보들...', isRecommended: true },
    { id: 4, title: '2025년 12간지 새해 운세 총정리', author: '천간지지', date: '2025-01-07', likes: 304, comments: 89, categoryKey: 'fortune', preview: '2025년 12간지별 신년 운세를 한눈에 정리했습니다...' },
    { id: 3, title: '타로 카드 메이저 아르카나 완벽 정리', author: '달빛마녀', date: '2025-01-06', likes: 189, comments: 55, categoryKey: 'tarot', preview: '메이저 아르카나 22장의 의미와 해석 방법을 정리...' },
    { id: 2, title: '소띠와 말띠 궁합은 정말 안 맞을까?', author: '궁합연구소', date: '2025-01-05', likes: 63, comments: 19, categoryKey: 'compatibility', preview: '소띠와 말띠 궁합에 대한 속설을 팩트체크해봤어요...' },
    { id: 1, title: '처음 운세 앱 쓰는 분들을 위한 가이드', author: '운세초보', date: '2025-01-04', likes: 41, comments: 7, categoryKey: 'other', preview: '운세 앱을 처음 쓰시는 분들을 위한 기본 사용법 안내...' },
  ],
  en: [
    { id: 9, title: 'Second-half 2025 tarot outlook', author: 'Starlight Tarot', date: '2025-01-12', likes: 142, comments: 38, categoryKey: 'tarot', preview: 'Key tarot card readings for the second half of 2025...', isRecommended: true },
    { id: 8, title: 'Dragon sign 2025 yearly forecast', author: 'Eastern Sage', date: '2025-01-11', likes: 98, comments: 22, categoryKey: 'saju', preview: 'A detailed look at 2025 for Dragon signs...' },
    { id: 7, title: '5 things to know before compatibility readings', author: 'Destiny Room', date: '2025-01-10', likes: 215, comments: 61, categoryKey: 'compatibility', preview: 'Important points many people miss in compatibility...', isRecommended: true },
    { id: 6, title: 'When today’s fortune feels low', author: 'Hope Star', date: '2025-01-09', likes: 77, comments: 14, categoryKey: 'fortune', preview: 'Try these steps when daily luck looks unfavorable...' },
    { id: 5, title: 'Before your first saju reading', author: 'Philosopher', date: '2025-01-08', likes: 156, comments: 44, categoryKey: 'saju', preview: 'Useful tips before a saju consultation...', isRecommended: true },
    { id: 4, title: '2025 zodiac new-year roundup', author: 'Heavenly Stems', date: '2025-01-07', likes: 304, comments: 89, categoryKey: 'fortune', preview: 'All twelve signs for the 2025 new year at a glance...' },
    { id: 3, title: 'Major Arcana cheat sheet', author: 'Moon Witch', date: '2025-01-06', likes: 189, comments: 55, categoryKey: 'tarot', preview: 'Meanings and tips for all 22 Major Arcana cards...' },
    { id: 2, title: 'Rat and Horse: really incompatible?', author: 'Match Lab', date: '2025-01-05', likes: 63, comments: 19, categoryKey: 'compatibility', preview: 'Fact-checking a popular compatibility myth...' },
    { id: 1, title: 'Beginner’s guide to fortune apps', author: 'Newbie Luck', date: '2025-01-04', likes: 41, comments: 7, categoryKey: 'other', preview: 'Basics for first-time users of fortune apps...' },
  ],
  ja: [
    { id: 9, title: '2025年下半期タロット運勢まとめ', author: '星灯りタロット', date: '2025-01-12', likes: 142, comments: 38, categoryKey: 'tarot', preview: '2025年下半期の主要タロットカード解説...', isRecommended: true },
    { id: 8, title: '辰年2025年総運分析', author: '東洋哲学者', date: '2025-01-11', likes: 98, comments: 22, categoryKey: 'saju', preview: '辰年生まれの2025年運勢を詳しく分析...' },
    { id: 7, title: '相性を見る前に知っておきたい5つ', author: '運命の部屋', date: '2025-01-10', likes: 215, comments: 61, categoryKey: 'compatibility', preview: '相性鑑定で見落としがちなポイント...', isRecommended: true },
    { id: 6, title: '今日の運勢が悪いときの乗り越え方', author: '希望の星', date: '2025-01-09', likes: 77, comments: 14, categoryKey: 'fortune', preview: '今日の運勢が低いときに試してみて...' },
    { id: 5, title: '四柱を見る前のチェックリスト', author: '哲学者', date: '2025-01-08', likes: 156, comments: 44, categoryKey: 'saju', preview: '鑑定前に知っておくと良い情報...', isRecommended: true },
    { id: 4, title: '2025年十二支新年運勢総まとめ', author: '天干地支', date: '2025-01-07', likes: 304, comments: 89, categoryKey: 'fortune', preview: '十二支別の2025年新年運勢...' },
    { id: 3, title: 'メジャーアルカナ完全整理', author: '月の魔女', date: '2025-01-06', likes: 189, comments: 55, categoryKey: 'tarot', preview: '22枚の意味と読み方...' },
    { id: 2, title: '子年と午年は本当に相性が悪い？', author: '相性研究所', date: '2025-01-05', likes: 63, comments: 19, categoryKey: 'compatibility', preview: 'よくある相性の噂を検証...' },
    { id: 1, title: '初めての占いアプリガイド', author: '運勢初心者', date: '2025-01-04', likes: 41, comments: 7, categoryKey: 'other', preview: '初めて使う方向けの基本ガイド...' },
  ],
  zh: [
    { id: 9, title: '2025下半年塔罗运势整理', author: '星光塔罗', date: '2025-01-12', likes: 142, comments: 38, categoryKey: 'tarot', preview: '2025年下半年主要塔罗牌解读...', isRecommended: true },
    { id: 8, title: '龙年2025总运分析', author: '东方哲者', date: '2025-01-11', likes: 98, comments: 22, categoryKey: 'saju', preview: '属龙者2025年运势详细分析...' },
    { id: 7, title: '看配对前必知的5件事', author: '命运之室', date: '2025-01-10', likes: 215, comments: 61, categoryKey: 'compatibility', preview: '配对时容易忽略的重要要点...', isRecommended: true },
    { id: 6, title: '今日运势不佳时怎么办', author: '希望之星', date: '2025-01-09', likes: 77, comments: 14, categoryKey: 'fortune', preview: '当今日运势不理想时可以尝试...' },
    { id: 5, title: '看八字前的准备清单', author: '哲人', date: '2025-01-08', likes: 156, comments: 44, categoryKey: 'saju', preview: '咨询前建议了解的信息...', isRecommended: true },
    { id: 4, title: '2025十二生肖新年运势总览', author: '天干地支', date: '2025-01-07', likes: 304, comments: 89, categoryKey: 'fortune', preview: '十二生肖2025新年运势一览...' },
    { id: 3, title: '大阿尔卡那完整整理', author: '月光女巫', date: '2025-01-06', likes: 189, comments: 55, categoryKey: 'tarot', preview: '22张大阿尔卡那含义与解读...' },
    { id: 2, title: '鼠马配对真的不合吗？', author: '配对研究所', date: '2025-01-05', likes: 63, comments: 19, categoryKey: 'compatibility', preview: '验证常见的配对传言...' },
    { id: 1, title: '占卜应用新手指南', author: '运势新手', date: '2025-01-04', likes: 41, comments: 7, categoryKey: 'other', preview: '首次使用占卜应用的基本指南...' },
  ],
  es: [
    { id: 9, title: 'Tarot: segunda mitad de 2025', author: 'Tarot Estelar', date: '2025-01-12', likes: 142, comments: 38, categoryKey: 'tarot', preview: 'Interpretaciones clave de tarot para el segundo semestre...', isRecommended: true },
    { id: 8, title: 'Dragón: pronóstico 2025', author: 'Sabio Oriental', date: '2025-01-11', likes: 98, comments: 22, categoryKey: 'saju', preview: 'Análisis detallado del 2025 para signo Dragón...' },
    { id: 7, title: '5 cosas antes de ver compatibilidad', author: 'Sala del Destino', date: '2025-01-10', likes: 215, comments: 61, categoryKey: 'compatibility', preview: 'Puntos que muchos olvidan en compatibilidad...', isRecommended: true },
    { id: 6, title: 'Cuando la suerte de hoy es baja', author: 'Estrella de Esperanza', date: '2025-01-09', likes: 77, comments: 14, categoryKey: 'fortune', preview: 'Qué hacer si el pronóstico diario es desfavorable...' },
    { id: 5, title: 'Antes de tu primera lectura saju', author: 'Filósofo', date: '2025-01-08', likes: 156, comments: 44, categoryKey: 'saju', preview: 'Consejos útiles antes de una consulta...', isRecommended: true },
    { id: 4, title: 'Resumen año nuevo 2025 por signo', author: 'Cielo y Tierra', date: '2025-01-07', likes: 304, comments: 89, categoryKey: 'fortune', preview: 'Los doce signos para el año nuevo 2025...' },
    { id: 3, title: 'Arcanos Mayores: guía rápida', author: 'Bruja Lunar', date: '2025-01-06', likes: 189, comments: 55, categoryKey: 'tarot', preview: 'Significado de las 22 cartas mayores...' },
    { id: 2, title: '¿Rata y Caballo son incompatibles?', author: 'Lab Compatibilidad', date: '2025-01-05', likes: 63, comments: 19, categoryKey: 'compatibility', preview: 'Verificando un mito popular...' },
    { id: 1, title: 'Guía para principiantes', author: 'Novato Suerte', date: '2025-01-04', likes: 41, comments: 7, categoryKey: 'other', preview: 'Lo básico para usar apps de fortuna...' },
  ],
  id: [
    { id: 9, title: 'Ramalan tarot paruh kedua 2025', author: 'Tarot Bintang', date: '2025-01-12', likes: 142, comments: 38, categoryKey: 'tarot', preview: 'Interpretasi kartu tarot utama paruh kedua 2025...', isRecommended: true },
    { id: 8, title: 'Analisis Shio Naga 2025', author: 'Bijak Timur', date: '2025-01-11', likes: 98, comments: 22, categoryKey: 'saju', preview: 'Ramalan detail 2025 untuk Shio Naga...' },
    { id: 7, title: '5 hal sebelum cek kecocokan', author: 'Ruang Takdir', date: '2025-01-10', likes: 215, comments: 61, categoryKey: 'compatibility', preview: 'Poin penting yang sering terlewat...', isRecommended: true },
    { id: 6, title: 'Saat keberuntungan hari ini rendah', author: 'Bintang Harapan', date: '2025-01-09', likes: 77, comments: 14, categoryKey: 'fortune', preview: 'Langkah saat ramalan harian kurang baik...' },
    { id: 5, title: 'Sebelum konsultasi saju pertama', author: 'Filsuf', date: '2025-01-08', likes: 156, comments: 44, categoryKey: 'saju', preview: 'Tips berguna sebelum konsultasi...', isRecommended: true },
    { id: 4, title: 'Ringkasan Tahun Baru 2025 12 shio', author: 'Langit Bumi', date: '2025-01-07', likes: 304, comments: 89, categoryKey: 'fortune', preview: 'Ramalan tahun baru untuk 12 shio...' },
    { id: 3, title: 'Panduan Arkana Mayor', author: 'Penyihir Bulan', date: '2025-01-06', likes: 189, comments: 55, categoryKey: 'tarot', preview: 'Arti 22 kartu Arkana Mayor...' },
    { id: 2, title: 'Tikus dan Kuda tidak cocok?', author: 'Lab Kecocokan', date: '2025-01-05', likes: 63, comments: 19, categoryKey: 'compatibility', preview: 'Memeriksa mitos populer...' },
    { id: 1, title: 'Panduan pemula aplikasi ramalan', author: 'Pemula Keberuntungan', date: '2025-01-04', likes: 41, comments: 7, categoryKey: 'other', preview: 'Dasar untuk pengguna baru...' },
  ],
  fr: [
    { id: 9, title: 'Tarot : seconde moitié 2025', author: 'Tarot Stellaire', date: '2025-01-12', likes: 142, comments: 38, categoryKey: 'tarot', preview: 'Lectures clés pour le second semestre 2025...', isRecommended: true },
    { id: 8, title: 'Dragon : prévisions 2025', author: 'Sage Oriental', date: '2025-01-11', likes: 98, comments: 22, categoryKey: 'saju', preview: 'Analyse détaillée pour le signe Dragon...' },
    { id: 7, title: '5 points avant compatibilité', author: 'Salle du Destin', date: '2025-01-10', likes: 215, comments: 61, categoryKey: 'compatibility', preview: 'Points souvent oubliés en compatibilité...', isRecommended: true },
    { id: 6, title: 'Quand la chance du jour est basse', author: 'Étoile Espoir', date: '2025-01-09', likes: 77, comments: 14, categoryKey: 'fortune', preview: 'Que faire si le pronostic est défavorable...' },
    { id: 5, title: 'Avant votre première lecture saju', author: 'Philosophe', date: '2025-01-08', likes: 156, comments: 44, categoryKey: 'saju', preview: 'Conseils avant une consultation...', isRecommended: true },
    { id: 4, title: 'Résumé Nouvel An 2025 par signe', author: 'Ciel et Terre', date: '2025-01-07', likes: 304, comments: 89, categoryKey: 'fortune', preview: 'Les douze signes pour 2025...' },
    { id: 3, title: 'Arcanes Majeurs : guide', author: 'Sorcière Lunaire', date: '2025-01-06', likes: 189, comments: 55, categoryKey: 'tarot', preview: 'Sens des 22 arcanes majeurs...' },
    { id: 2, title: 'Rat et Cheval incompatibles ?', author: 'Lab Compatibilité', date: '2025-01-05', likes: 63, comments: 19, categoryKey: 'compatibility', preview: 'Vérification d\'un mythe populaire...' },
    { id: 1, title: 'Guide débutant applications', author: 'Novice Chance', date: '2025-01-04', likes: 41, comments: 7, categoryKey: 'other', preview: 'Les bases pour les nouveaux utilisateurs...' },
  ],
  de: [
    { id: 9, title: 'Tarot: zweite Jahreshälfte 2025', author: 'Sternen-Tarot', date: '2025-01-12', likes: 142, comments: 38, categoryKey: 'tarot', preview: 'Wichtige Tarot-Deutungen für H2 2025...', isRecommended: true },
    { id: 8, title: 'Drache: Prognose 2025', author: 'Ost-Weiser', date: '2025-01-11', likes: 98, comments: 22, categoryKey: 'saju', preview: 'Detaillierte Analyse für Drache-Geborene...' },
    { id: 7, title: '5 Punkte vor Kompatibilität', author: 'Schicksalsraum', date: '2025-01-10', likes: 215, comments: 61, categoryKey: 'compatibility', preview: 'Oft übersehene Punkte bei Partnerchecks...', isRecommended: true },
    { id: 6, title: 'Wenn das Tagesglück niedrig ist', author: 'Hoffnungsstern', date: '2025-01-09', likes: 77, comments: 14, categoryKey: 'fortune', preview: 'Schritte bei ungünstigem Tageshoroskop...' },
    { id: 5, title: 'Vor der ersten Saju-Beratung', author: 'Philosoph', date: '2025-01-08', likes: 156, comments: 44, categoryKey: 'saju', preview: 'Nützliche Tipps vor der Beratung...', isRecommended: true },
    { id: 4, title: 'Neujahr 2025: alle 12 Zeichen', author: 'Himmel Erde', date: '2025-01-07', likes: 304, comments: 89, categoryKey: 'fortune', preview: 'Jahreshoroskop für alle Tierkreiszeichen...' },
    { id: 3, title: 'Große Arkana: Spickzettel', author: 'Mondhexe', date: '2025-01-06', likes: 189, comments: 55, categoryKey: 'tarot', preview: 'Bedeutung aller 22 Großen Arkana...' },
    { id: 2, title: 'Ratte und Pferd unvereinbar?', author: 'Match-Lab', date: '2025-01-05', likes: 63, comments: 19, categoryKey: 'compatibility', preview: 'Ein populäres Gerücht im Check...' },
    { id: 1, title: 'Einsteiger-Guide Glücks-Apps', author: 'Glücks-Neuling', date: '2025-01-04', likes: 41, comments: 7, categoryKey: 'other', preview: 'Grundlagen für Erstnutzer...' },
  ],
  pt: [
    { id: 9, title: 'Tarô: segunda metade de 2025', author: 'Tarô Estelar', date: '2025-01-12', likes: 142, comments: 38, categoryKey: 'tarot', preview: 'Leituras principais para o segundo semestre...', isRecommended: true },
    { id: 8, title: 'Dragão: previsão 2025', author: 'Sábio Oriental', date: '2025-01-11', likes: 98, comments: 22, categoryKey: 'saju', preview: 'Análise detalhada para signo Dragão...' },
    { id: 7, title: '5 coisas antes da compatibilidade', author: 'Sala do Destino', date: '2025-01-10', likes: 215, comments: 61, categoryKey: 'compatibility', preview: 'Pontos que muitos esquecem...', isRecommended: true },
    { id: 6, title: 'Quando a sorte de hoje está baixa', author: 'Estrela Esperança', date: '2025-01-09', likes: 77, comments: 14, categoryKey: 'fortune', preview: 'O que fazer com previsão desfavorável...' },
    { id: 5, title: 'Antes da primeira leitura saju', author: 'Filósofo', date: '2025-01-08', likes: 156, comments: 44, categoryKey: 'saju', preview: 'Dicas antes da consulta...', isRecommended: true },
    { id: 4, title: 'Resumo Ano Novo 2025 por signo', author: 'Céu e Terra', date: '2025-01-07', likes: 304, comments: 89, categoryKey: 'fortune', preview: 'Os doze signos para 2025...' },
    { id: 3, title: 'Arcanos Maiores: guia', author: 'Bruxa Lunar', date: '2025-01-06', likes: 189, comments: 55, categoryKey: 'tarot', preview: 'Significado das 22 cartas maiores...' },
    { id: 2, title: 'Rato e Cavalo são incompatíveis?', author: 'Lab Compatibilidade', date: '2025-01-05', likes: 63, comments: 19, categoryKey: 'compatibility', preview: 'Verificando um mito popular...' },
    { id: 1, title: 'Guia para iniciantes', author: 'Novato Sorte', date: '2025-01-04', likes: 41, comments: 7, categoryKey: 'other', preview: 'O básico para novos usuários...' },
  ],
  hi: [
    { id: 9, title: '2025 का दूसरा अर्ध टैरो', author: 'स्टारलाइट टैरो', date: '2025-01-12', likes: 142, comments: 38, categoryKey: 'tarot', preview: '2025 के दूसरे अर्ध के लिए मुख्य टैरो पढ़ाई...', isRecommended: true },
    { id: 8, title: 'ड्रैगन 2025 वार्षिक', author: 'पूर्वी ज्ञानी', date: '2025-01-11', likes: 98, comments: 22, categoryKey: 'saju', preview: 'ड्रैगन राशि के लिए 2025 विस्तृत विश्लेषण...' },
    { id: 7, title: 'मिलान से पहले 5 बातें', author: 'भाग्य कक्ष', date: '2025-01-10', likes: 215, comments: 61, categoryKey: 'compatibility', preview: 'मिलान में अक्सर छूटने वाले बिंदु...', isRecommended: true },
    { id: 6, title: 'जब आज का भाग्य कम हो', author: 'आशा तारा', date: '2025-01-09', likes: 77, comments: 14, categoryKey: 'fortune', preview: 'दैनिक भाग्य कम हो तो ये करें...' },
    { id: 5, title: 'पहली साजू रीडिंग से पहले', author: 'दार्शनिक', date: '2025-01-08', likes: 156, comments: 44, categoryKey: 'saju', preview: 'परामर्श से पहले उपयोगी जानकारी...', isRecommended: true },
    { id: 4, title: '2025 नववर्ष 12 राशियाँ', author: 'आकाश पृथ्वी', date: '2025-01-07', likes: 304, comments: 89, categoryKey: 'fortune', preview: 'बारह राशियों का 2025 नववर्ष सारांश...' },
    { id: 3, title: 'मेजर आर्काना गाइड', author: 'चंद्र जादूगरनी', date: '2025-01-06', likes: 189, comments: 55, categoryKey: 'tarot', preview: '22 मेजर आर्काना के अर्थ...' },
    { id: 2, title: 'चूहा और घोड़ा मेल नहीं?', author: 'मिलान लैब', date: '2025-01-05', likes: 63, comments: 19, categoryKey: 'compatibility', preview: 'एक लोकप्रिय मिथक की जाँच...' },
    { id: 1, title: 'शुरुआती गाइड', author: 'नव भाग्य', date: '2025-01-04', likes: 41, comments: 7, categoryKey: 'other', preview: 'नए उपयोगकर्ताओं के लिए मूल बातें...' },
  ],
  vi: [
    { id: 9, title: 'Tarot nửa cuối 2025', author: 'Tarot Ánh Sao', date: '2025-01-12', likes: 142, comments: 38, categoryKey: 'tarot', preview: 'Giải bài tarot chính cho nửa sau 2025...', isRecommended: true },
    { id: 8, title: 'Tuổi Rồng: dự báo 2025', author: 'Đạo Giả Phương Đông', date: '2025-01-11', likes: 98, comments: 22, categoryKey: 'saju', preview: 'Phân tích chi tiết vận 2025 cho tuổi Rồng...' },
    { id: 7, title: '5 điều trước khi xem hợp', author: 'Phòng Định Mệnh', date: '2025-01-10', likes: 215, comments: 61, categoryKey: 'compatibility', preview: 'Điểm quan trọng thường bị bỏ qua...', isRecommended: true },
    { id: 6, title: 'Khi vận hôm nay thấp', author: 'Sao Hy Vọng', date: '2025-01-09', likes: 77, comments: 14, categoryKey: 'fortune', preview: 'Làm gì khi vận ngày không thuận...' },
    { id: 5, title: 'Trước buổi xem tử vi đầu tiên', author: 'Triết Gia', date: '2025-01-08', likes: 156, comments: 44, categoryKey: 'saju', preview: 'Mẹo hữu ích trước tư vấn...', isRecommended: true },
    { id: 4, title: 'Tổng hợp Tết 2025 12 con giáp', author: 'Thiên Can Địa Chi', date: '2025-01-07', likes: 304, comments: 89, categoryKey: 'fortune', preview: 'Vận năm mới cho 12 con giáp...' },
    { id: 3, title: 'Hướng dẫn Major Arcana', author: 'Phù Thủy Ánh Trăng', date: '2025-01-06', likes: 189, comments: 55, categoryKey: 'tarot', preview: 'Ý nghĩa 22 lá Major Arcana...' },
    { id: 2, title: 'Chuột và Ngựa có hợp không?', author: 'Lab Tương Hợp', date: '2025-01-05', likes: 63, comments: 19, categoryKey: 'compatibility', preview: 'Kiểm chứng đồn đại phổ biến...' },
    { id: 1, title: 'Hướng dẫn cho người mới', author: 'Tân Thủ Vận', date: '2025-01-04', likes: 41, comments: 7, categoryKey: 'other', preview: 'Cơ bản cho người dùng lần đầu...' },
  ],
  th: [
    { id: 9, title: 'ไพ่ทาโรต์ครึ่งหลังปี 2025', author: 'ทาโรต์แสงดาว', date: '2025-01-12', likes: 142, comments: 38, categoryKey: 'tarot', preview: 'คำทำนายไพ่ทาโรต์สำคัญช่วงหลังปี 2025...', isRecommended: true },
    { id: 8, title: 'ปีมังกร 2025 ภาพรวม', author: 'ปราชญ์ตะวันออก', date: '2025-01-11', likes: 98, comments: 22, categoryKey: 'saju', preview: 'วิเคราะห์ดวงปี 2025 สำหรับปีมังกร...' },
    { id: 7, title: '5 สิ่งก่อนดูความเข้ากัน', author: 'ห้องโชคชะตา', date: '2025-01-10', likes: 215, comments: 61, categoryKey: 'compatibility', preview: 'จุดสำคัญที่มักมองข้าม...', isRecommended: true },
    { id: 6, title: 'เมื่อดวงวันนี้ต่ำ', author: 'ดาวแห่งความหวัง', date: '2025-01-09', likes: 77, comments: 14, categoryKey: 'fortune', preview: 'ทำอย่างไรเมื่อดวงรายวันไม่ดี...' },
    { id: 5, title: 'ก่อนดูดวงจีนครั้งแรก', author: 'นักปรัชญา', date: '2025-01-08', likes: 156, comments: 44, categoryKey: 'saju', preview: 'เคล็ดลับก่อนปรึกษา...', isRecommended: true },
    { id: 4, title: 'สรุปปีใหม่ 2025 12 นักษัตร', author: 'ฟ้าดิน', date: '2025-01-07', likes: 304, comments: 89, categoryKey: 'fortune', preview: 'ดวงปีใหม่ทั้ง 12 นักษัตร...' },
    { id: 3, title: 'คู่มือ Major Arcana', author: 'แม่มดจันทร์', date: '2025-01-06', likes: 189, comments: 55, categoryKey: 'tarot', preview: 'ความหมายไพ่ Major 22 ใบ...' },
    { id: 2, title: 'หนูกับม้าเข้ากันไหม?', author: 'แล็บความเข้ากัน', date: '2025-01-05', likes: 63, comments: 19, categoryKey: 'compatibility', preview: 'ตรวจสอบข่าวลือยอดนิยม...' },
    { id: 1, title: 'คู่มือมือใหม่แอปดูดวง', author: 'มือใหม่โชค', date: '2025-01-04', likes: 41, comments: 7, categoryKey: 'other', preview: 'พื้นฐานสำหรับผู้ใช้ครั้งแรก...' },
  ],
}

export function getCommunitySamplePosts(language: Language): CommunitySamplePost[] {
  return POSTS[language] ?? POSTS.en
}

export const COMMUNITY_CATEGORY_COLOR: Record<CommunityCategoryKey, string> = {
  tarot: 'bg-purple-100 text-purple-700',
  saju: 'bg-amber-100 text-amber-700',
  compatibility: 'bg-rose-100 text-rose-700',
  fortune: 'bg-blue-100 text-blue-700',
  other: 'bg-gray-100 text-gray-600',
}

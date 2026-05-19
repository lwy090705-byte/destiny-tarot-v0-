import type { MBTIType } from './mbti-types'
import type { MbtiTypeProfile } from './mbti-types'

export const mbtiProfilesDe: Record<MBTIType, MbtiTypeProfile> = {
  INTJ: {
    title: 'Architekt',
    description:
      'Unabhängiger, analytischer Stratege mit hohen Standards, der Effizienz und Logik schätzt. Sie entwickeln langfristige Visionen und verfolgen Ihre Ziele konsequent.',
    strengths: ['Strategisches Denken', 'Unabhängigkeit', 'Entschlossenheit', 'Hohe Standards', 'Lernfreude'],
    weaknesses: ['Perfektionismus', 'Schwierigkeit, Gefühle auszudrücken', 'Übermäßige Kritik', 'Geringe Flexibilität'],
    loveStyle:
      'Sie suchen tiefe und bedeutsame Beziehungen und schätzen intellektuelle Gespräche. Sie sind loyal, auch wenn es schwerfallen kann, Gefühle offen zu zeigen.',
    career: ['Wissenschaftler', 'Strategieberater', 'Investment-Analyst', 'Softwareentwickler', 'Lehrer'],
  },
  INTP: {
    title: 'Logiker',
    description:
      'Nachdenklicher Innovator, der Logik und Analyse liebt und gerne komplexe Probleme löst.',
    strengths: ['Analyse', 'Kreativität', 'Objektivität', 'Neugier', 'Problemlösung'],
    weaknesses: ['Unentschlossenheit', 'Geringe Geselligkeit', 'Gefühle ignorieren', 'Schwache Umsetzung'],
    loveStyle:
      'Intellektuelle Verbindung ist Ihnen wichtig; Sie wünschen sich Freiheit in der Beziehung und schätzen Partner, die tiefe Diskussionen mögen.',
    career: ['Forscher', 'Programmierer', 'Philosoph', 'Mathematiker', 'Spieleentwickler'],
  },
  ENTJ: {
    title: 'Kommandeur',
    description:
      'Natürliche Führungspersönlichkeit, die Effizienz anstrebt und Organisationen zu ihren Zielen führt.',
    strengths: ['Führung', 'Selbstvertrauen', 'Entschlossenheit', 'Effizienz', 'Strategisches Denken'],
    weaknesses: ['Dominant', 'Ungeduldig', 'Gefühle ignorieren', 'Sturheit'],
    loveStyle:
      'Sie suchen eine Beziehung, in der Sie wachsen, und bevorzugen ambitionierte Partner. Sie mögen ehrliche und direkte Kommunikation.',
    career: ['CEO', 'Anwalt', 'Managementberater', 'Politiker', 'Unternehmer'],
  },
  ENTP: {
    title: 'Innovator',
    description:
      'Kreativer Innovator, der Debatten liebt und gerne neue Ideen erkundet.',
    strengths: ['Kreativität', 'Anpassungsfähigkeit', 'Leidenschaft', 'Humor', 'Problemlösung'],
    weaknesses: ['Streitlustig', 'Regelbrecher', 'Geringe Konzentration', 'Gefühle ignorieren'],
    loveStyle:
      'Sie wünschen sich anregende und spielerische Beziehungen, mit einem Partner, der Debatten und neue Erfahrungen liebt.',
    career: ['Unternehmer', 'Erfinder', 'Anwalt', 'Marketing-Spezialist', 'Filmemacher'],
  },
  INFJ: {
    title: 'Anwalt',
    description:
      'Idealist mit starker Intuition, der anderen helfen und die Welt verbessern möchte.',
    strengths: ['Intuition', 'Idealismus', 'Entschlossenheit', 'Leidenschaft', 'Altruismus'],
    weaknesses: ['Perfektionismus', 'Erschöpfung', 'Übermäßige Zurückhaltung', 'Kritikempfindlichkeit'],
    loveStyle: 'Sie suchen tiefe, authentische Bindungen und einen echten Seelenverwandten.',
    career: ['Berater', 'Schriftsteller', 'Psychologe', 'Lehrer', 'Aktivist'],
  },
  INFP: {
    title: 'Mediator',
    description:
      'Träumer einer idealen Welt, sensibel und kreativ, der Authentizität schätzt.',
    strengths: ['Empathie', 'Kreativität', 'Idealismus', 'Leidenschaft', 'Anpassungsfähigkeit'],
    weaknesses: ['Realitätsferne', 'Selbstkritik', 'Vermeidung', 'Überempfindlichkeit'],
    loveStyle:
      'Sie träumen von romantischer, idealer Liebe und suchen eine tiefe emotionale Verbindung.',
    career: ['Schriftsteller', 'Künstler', 'Berater', 'Musiker', 'Sozialarbeiter'],
  },
  ENFJ: {
    title: 'Protagonist',
    description:
      'Charismatische Führungspersönlichkeit, die anderen beim Wachsen hilft und positiv wirkt.',
    strengths: ['Charisma', 'Altruismus', 'Verlässlichkeit', 'Leidenschaft', 'Kommunikation'],
    weaknesses: ['Übertriebener Idealismus', 'Selbstaufopferung', 'Kritikempfindlichkeit', 'Unentschlossenheit'],
    loveStyle:
      'Sie sind ein warmherziger, hingebungsvoller Partner und unterstützen gerne die Entwicklung des anderen.',
    career: ['Lehrer', 'Berater', 'HR-Manager', 'Politiker', 'Event-Organisator'],
  },
  ENFP: {
    title: 'Kämpfer',
    description:
      'Freigeistig, kreativ und leidenschaftlich; erkundet Möglichkeiten und inspiriert andere.',
    strengths: ['Leidenschaft', 'Kreativität', 'Geselligkeit', 'Positivität', 'Anpassungsfähigkeit'],
    weaknesses: ['Geringe Konzentration', 'Starke Emotionen', 'Realitätsferne', 'Übermäßiger Optimismus'],
    loveStyle:
      'Sie lieben leidenschaftliche und romantische Liebe und suchen neue Erfahrungen mit tiefer Verbindung.',
    career: ['Schauspieler', 'Journalist', 'Marketing-Spezialist', 'Berater', 'Unternehmer'],
  },
  ISTJ: {
    title: 'Logistiker',
    description:
      'Verlässliche Säule der Verantwortung, die Regeln schätzt und Dinge konsequent zu Ende bringt.',
    strengths: ['Verantwortungsbewusstsein', 'Fleiß', 'Organisation', 'Zuverlässigkeit', 'Geduld'],
    weaknesses: ['Sturheit', 'Widerstand gegen Veränderung', 'Geringer emotionaler Ausdruck', 'Übermäßige Strenge'],
    loveStyle:
      'Sie suchen stabile, verbindliche Beziehungen; Sie sind ein verantwortungsvoller und vertrauenswürdiger Partner.',
    career: ['Buchhalter', 'Beamter', 'Militär', 'Banker', 'Jurist'],
  },
  ISFJ: {
    title: 'Verteidiger',
    description:
      'Warmherziger, engagierter Beschützer, der sich im Stillen um andere kümmert.',
    strengths: ['Hingabe', 'Auge fürs Detail', 'Zuverlässigkeit', 'Geduld', 'Beobachtungsgabe'],
    weaknesses: ['Selbstaufopferung', 'Widerstand gegen Veränderung', 'Konfliktvermeidung', 'Übermäßige Schüchternheit'],
    loveStyle:
      'Sie lieben hingebungsvoll und warmherzig; Sie kümmern sich mit viel Aufmerksamkeit um Ihren Partner.',
    career: ['Pflegekraft', 'Lehrer', 'Sozialarbeiter', 'Bibliothekar', 'Administrator'],
  },
  ESTJ: {
    title: 'Exekutive',
    description:
      'Effizienter Organisator, der Ordnung und Regeln schätzt und methodisch führt.',
    strengths: ['Organisation', 'Führung', 'Fleiß', 'Entschlossenheit', 'Verantwortungsbewusstsein'],
    weaknesses: ['Geringe Flexibilität', 'Sturheit', 'Gefühle ignorieren', 'Dominant'],
    loveStyle:
      'Sie wünschen sich stabile, traditionelle Beziehungen; Sie sind verantwortungsvoll und verlässlich.',
    career: ['Manager', 'Polizist', 'Richter', 'Finanzwesen', 'Militäroffizier'],
  },
  ESFJ: {
    title: 'Konsul',
    description:
      'Geselliger, aufmerksamer Hüter von Harmonie, der sich um andere kümmert und Gruppen zusammenhält.',
    strengths: ['Geselligkeit', 'Freundlichkeit', 'Organisation', 'Kooperation', 'Loyalität'],
    weaknesses: ['Bedürfnis nach Bestätigung', 'Widerstand gegen Veränderung', 'Kritikempfindlichkeit', 'Konfliktvermeidung'],
    loveStyle:
      'Sie lieben mit Wärme und Verbindlichkeit; familienorientiert kümmern Sie sich sehr gut um Ihren Partner.',
    career: ['Pflegekraft', 'Lehrer', 'Event-Organisator', 'HR', 'Vertrieb'],
  },
  ISTP: {
    title: 'Virtuose',
    description:
      'Praktischer, logischer Problemlöser mit hoher handwerklicher Geschicklichkeit, der spontane Aktion mag.',
    strengths: ['Pragmatismus', 'Analyse', 'Anpassungsfähigkeit', 'Gelassenheit', 'Effizienz'],
    weaknesses: ['Geringer emotionaler Ausdruck', 'Distanziertheit', 'Risikoneigung', 'Vermeidung von Bindung'],
    loveStyle:
      'Sie wollen Freiheit und Unabhängigkeit in der Liebe und zeigen Zuneigung durch konkrete Taten.',
    career: ['Ingenieur', 'Pilot', 'Techniker', 'Athlet', 'Feuerwehrmann'],
  },
  ISFP: {
    title: 'Abenteurer',
    description:
      'Sanfte Seele mit künstlerischer Sensibilität, die die Gegenwart genießt und Schönheit sucht.',
    strengths: ['Künstlerisches Gespür', 'Empathie', 'Flexibilität', 'Loyalität', 'Abenteuerlust'],
    weaknesses: ['Geringes Selbstwertgefühl', 'Konfliktvermeidung', 'Unvorhersehbarkeit', 'Wenig Planung'],
    loveStyle:
      'Sie lieben romantisch und sensibel und zeigen tiefe Zuneigung eher zurückhaltend.',
    career: ['Künstler', 'Designer', 'Tierarzt', 'Koch', 'Fotograf'],
  },
  ESTP: {
    title: 'Unternehmer',
    description:
      'Aktiver, realistischer Abenteurer, der im Moment lebt und keine Angst vor Risiken hat.',
    strengths: ['Anpassungsfähigkeit', 'Beobachtungsgabe', 'Mut', 'Pragmatismus', 'Geselligkeit'],
    weaknesses: ['Impulsivität', 'Regelbruch', 'Wenig Geduld', 'Gefühle ignorieren'],
    loveStyle:
      'Sie mögen dynamische, unterhaltsame Beziehungen und einen Partner, mit dem Sie neue Erfahrungen machen können.',
    career: ['Unternehmer', 'Vertrieb', 'Athlet', 'Schauspieler', 'Notfalldienste'],
  },
  ESFP: {
    title: 'Entertainer',
    description:
      'Gesellige Persönlichkeit, die Stimmung macht, den Moment genießt und gern unter Menschen ist.',
    strengths: ['Geselligkeit', 'Optimismus', 'Pragmatismus', 'Beobachtungsgabe', 'Mut'],
    weaknesses: ['Geringe Konzentration', 'Schwierigkeiten mit langfristigen Plänen', 'Kritikempfindlichkeit', 'Impulsivität'],
    loveStyle:
      'Sie sind liebevoll und lebensfroh und teilen gern glückliche Erlebnisse zu zweit.',
    career: ['Bühnenkünstler', 'Event-Organisator', 'Reiseführer', 'Koch', 'Erzieher'],
  },
}

export default mbtiProfilesDe

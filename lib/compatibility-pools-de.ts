/**
 * German (de) compatibility / love result narrative pools.
 */
type FiveElementKey = 'wood' | 'fire' | 'earth' | 'metal' | 'water'

export const compatibilityElementLabelsDe: Record<FiveElementKey, string> = {
  wood: 'Holz',
  fire: 'Feuer',
  earth: 'Erde',
  metal: 'Metall',
  water: 'Wasser',
}

export const p1TraitDe: Record<FiveElementKey, string> = {
  wood: 'wachstumsorientiert und zukunftsgerichtet',
  fire: 'leidenschaftlich und energiegeladen',
  earth: 'stabil und bedacht',
  metal: 'entschlossen und prinzipientreu',
  water: 'weise und anpassungsfähig',
}

export const p2TraitDe: Record<FiveElementKey, string> = {
  wood: 'kreativ und aufgeschlossen',
  fire: 'gesellig und optimistisch',
  earth: 'verantwortungsbewusst und praktisch',
  metal: 'detailorientiert mit hohen Ansprüchen',
  water: 'sehr anpassungsfähig und intuitiv',
}

export const relationshipFlowDe: [string, string, string] = [
  'Für {n1} und {n2} wirkt diese Verbindung weniger wie Zufall und mehr wie Bedeutung. Die Energie von {e1} und {e2} zieht euch zusammen und bildet ein starkes Band. Ihr seid in einer Phase der Neugier und Entdeckung; mit der Zeit können Verständnis und Vertrauen wachsen. Der emotionale Austausch fließt leicht, und ihr lest einander erstaunlich gut.',
  'Eure Beziehung bewegt sich natürlich, wie Wasser. {n1} mit der Tonalität von {e1} und {n2} mit der von {e2} treffen sich in sanfter Harmonie. Das emotionale Gleichgewicht wirkt stabil, und ihr schenkt einander Geborgenheit. Weil Geborgenheit zur Routine werden kann, probiert ab und zu eine neue Herausforderung gemeinsam.',
  'Zwischen {n1} und {n2} fließt eine besondere Strömung. Die Kombination aus {e1} und {e2} trägt eine Kraft, die Wachstum fördert. Zusammen steigt die kreative Energie, und ihr könnt Dinge erreichen, die keiner allein wagen würde.',
]

export const personalityOtherDe: [string, string] = [
  '{n1} ({e1}) und {n2} ({e2}) haben unterschiedliche Reize. Die Stärken von {n1} können die blinden Flecken von {n2} ausgleichen, während die von {n2} {n1} neue Perspektiven eröffnen können. Unterschiede müssen kein Konflikt sein – sie können Wachstum antreiben.',
  'Ihr regt euch gegenseitig an. Die {e1}-geprägte Seite von {n1} trifft die {e2}-geprägte von {n2} und schafft eine eigene Chemie. Wenn ihr Unterschiede annehmt und respektiert, erreicht die Partnerschaft ihre beste Form.',
]

export const strengthsCautionsDe: { strengths: string; cautions: string }[] = [
  {
    strengths:
      'Eine große Stärke ist die gegenseitige Ergänzung. Wenn {n1} vorangeht, kann {n2} eine feste Stütze sein; wenn {n2} Schwierigkeiten hat, kann {n1} helfen, einen Weg zu finden. Gespräche passen gut zusammen, und gemeinsamer Humor macht die Zeit leicht. Bei einem gemeinsamen Ziel ist die Synergie am größten.',
    cautions:
      'Achten Sie auf stillen Kommunikationsabbau. Wenn ihr meint, alles verstehe sich von selbst, können Missverständnisse sich stapeln. Auch an vollen Tagen: kurze tägliche Gesprächszeit einplanen. {n1}, Vorsicht vor Ungeduld; {n2}, vor Unentschlossenheit.',
  },
  {
    strengths:
      'Zwischen euch kann eine tiefe Bindung wachsen. Mit der Zeit vertieft sich das Verständnis, und ihr spürt einander oft auch mit wenigen Worten. In schweren Momenten könnt ihr enger werden und eine Beziehung aufbauen, die äußeren Druck aushält.',
    cautions:
      'Emotionale Konflikte brauchen Aufmerksamkeit. Wenn der Stolz stark ist, kann Versöhnung Zeit kosten. Nach Spannung unbedingt im Gespräch abschließen – Beziehung reparieren statt Recht behalten.',
  },
  {
    strengths:
      'Ihr könnt euer gemeinsames Wachstum beschleunigen. Zusammen werdet ihr oft besser als allein: gute gegenseitige Impulse, starke Unterstützung für Träume und mehr Nähe durch gemeinsame Hobbys und Interessen.',
    cautions:
      'Erwartungen managen. Perfektion vom Partner zu verlangen führt leicht zu Enttäuschung. Jeder hat Grenzen – akzeptiert sie. Respektiert das Bedürfnis nach Zeit und Raum.',
  },
]

export const futureAdviceDe: [string, string, string] = [
  'Die gemeinsame Zukunft wirkt hell. Die Kombination aus {e1} und {e2} kann eine stabile langfristige Bindung tragen. Um sie zu vertiefen, sammelt gemeinsame Erlebnisse – Reisen, Hobbys, neue Herausforderungen – damit Erinnerungen wachsen und die Nähe stärker wird. Schätzt die Familien des anderen und pflegt gute Beziehungen zu eurem Umfeld. Skizziert, wo ihr in einem, fünf und zehn Jahren sein wollt, und setzt gemeinsame Ziele – diese Klarheit festigt die Beziehung.',
  'Viele Möglichkeiten liegen vor euch. Bewahrt die gute Energie von jetzt und vergesst die Dankbarkeit nicht. Versucht, jeden Tag ein konkretes Danke auszusprechen. Bei Konflikten aus einer «wir»-Perspektive schauen und Lösungen statt Punkte zählen. Regelmäßig Zeit zu zweit und auch gewöhnliche Tage wertschätzen – kleine Freuden vervielfachen sich.',
  '{n1} und {n2}, eure Bindung hat noch Raum zu wachsen. Drei Anker für die Zukunft: Kommunikation regelmäßig halten, die Träume des anderen ermutigen und glauben, dass schwere Phasen gemeinsam überstanden werden können. Euch zu wählen war eine gute Entscheidung – erneuert sie täglich in kleinen Gesten und baut die Zukunft, die ihr beide wollt.',
]

/**
 * German (de) fortune / tarot content pools.
 * Array lengths match English counterparts in fortune-templates.ts,
 * tarot-message-pools.ts, and monthly-fortunes.ts.
 */

// ─── Fallback (4 keys, 1 string each) ─────────────────────────────────────────

export const fallbackDe: Record<'lifetime' | 'yearly' | 'monthly' | 'general', string[]> = {
  lifetime: [
    "Ihr Leben verläuft zwischen Wachstum und stetigem Wandel. Die frühen Jahre verlangen Geduld und stabile Grundlagen; in der Lebensmitte ernten Sie die Früchte Ihrer Anstrengungen; die späteren Jahre verwandeln Weisheit und Erfahrung in Hilfe für andere.",
  ],
  yearly: [
    "Dieses Jahr bringt neue Chancen und Veränderung. Die erste Hälfte begünstigt Planung und Vorbereitung; die zweite Hälfte erntet die Ergebnisse dessen, was Sie aufgebaut haben. Bewahren Sie Zuversicht und bleiben Sie dran.",
  ],
  monthly: [
    "Dieser Monat trägt die Energie eines Neuanfangs. Das ist der richtige Zeitpunkt, um Ihre Vorhaben voranzubringen und Ihre Beziehungen zu stärken. Bleiben Sie ganz bei dem, was jetzt zählt.",
  ],
  general: [
    "Derzeit öffnen sich Ihnen neue Möglichkeiten. Gehen Sie mit Vertrauen voran. Die Mühe, die Sie investieren, wird sich auszahlen.",
  ],
}

// ─── Category template pools (10 strings each) ────────────────────────────────

export const templatePoolsDe: Record<
  'love' | 'wealth' | 'career' | 'health' | 'opportunity' | 'warning' | 'relationship',
  string[]
> = {
  love: [
    'Ihr Liebesglück nimmt zu: Neue Begegnungen sind möglich.',
    'Schätzen Sie die Verbindung, die Sie haben; eine kleine Geste kann zu tiefer Liebe werden.',
    'Es ist Zeit, Ihre Gefühle auszudrücken: Teilen Sie Ihr Herz ehrlich mit.',
    'Während Sie warten, kann Sie dennoch eine unerwartete Freude finden.',
    'Wenn es jemanden gibt, den Sie mögen, machen Sie mutig den ersten Schritt: Die Zeichen stehen gut.',
    'Die Beziehung steht an einem Wendepunkt: Vertiefen Sie sie durch Gespräch.',
    'Achten Sie auf die gemeinsame Zeit mit Ihrem Partner: Sie werden den Wert des Zusammenseins spüren.',
    'Die Gegenwart zu pflegen ist wichtiger, als jemand Neuem hinterherzulaufen.',
    'Romantik braucht jetzt Aufmerksamkeit: Vermeiden Sie impulsive Entscheidungen.',
    'Wenn Sie Single sind, lieben Sie zuerst sich selbst: Darin liegt Ihre wahre Ausstrahlung.',
  ],
  wealth: [
    'Das finanzielle Glück steigt: Neue Einnahmequellen können entstehen.',
    'Bewusster Umgang mit Geld ist entscheidend; reduzieren Sie unnötige Ausgaben.',
    'Eine Gehaltserhöhung oder ein Bonus kann schneller kommen als gedacht.',
    'Gehen Sie Investitionen ruhig an; langfristige Pläne funktionieren besser.',
    'Geldchancen können zweimal anklopfen: Verpassen Sie nicht die erste.',
    'Gute Zeit, um Ersparnisse zu stärken und die Zukunft vorzubereiten.',
    'Nebenprojekte oder Freelance-Arbeit können hilfreiche Zusatzeinnahmen bringen.',
    'Der Geldfluss bleibt stabil: Halten Sie an Ihrem aktuellen Plan fest.',
    'Unerwartete Ausgaben können auftauchen: Halten Sie eine Sicherheitsreserve bereit.',
    'Menschen, die Sie unterstützen, verbessern Ihre finanzielle Lage.',
  ],
  career: [
    'Das berufliche Glück steigt: Eine Beförderung oder starke Angebote sind möglich.',
    'Konzentrieren Sie sich auf Ihre aktuelle Arbeit; die Ergebnisse werden bemerkt.',
    'Teamarbeit ist jetzt wichtig: Zusammenarbeit ist der Schlüssel zum Erfolg.',
    'Guter Zeitpunkt, um eine ambitionierte neue Herausforderung zu starten.',
    'Investieren Sie in Ihre Fähigkeiten: Ihre Kompetenz gestaltet Ihre Zukunft.',
    'Ihre Zufriedenheit in der aktuellen Position kann wachsen.',
    'Wenn Sie einen Wechsel erwägen, entscheiden Sie mit Bedacht.',
    'Ihre Kreativität bei der Arbeit sticht derzeit hervor.',
    'Die Beziehung zur Führungsebene verbessert sich; das Vertrauen wächst.',
    'Der Erfolg eines Projekts ist in greifbarer Nähe.',
  ],
  health: [
    'Gesundheitlich läuft es gut: Ihre Energie strahlt.',
    'Bewegung und regelmäßige Ernährung sind wichtig; etablieren Sie gesunde Gewohnheiten.',
    'Gehen Sie mit Stress bewusst um: Ruhe oder eine beruhigende Praxis helfen.',
    'Die Immunabwehr kann sinken; fokussieren Sie sich auf Prävention.',
    'Achten Sie auf Verletzungen oder Unwohlsein: Bewegen Sie sich vorsichtig.',
    'Gute Zeit für Kontrollen und Gesundheits-Checks.',
    'Bringen Sie Körper und Geist in Balance.',
    'Ihre Energie steigt wieder: Nutzen Sie diese Phase.',
    'Wenn Sie ein chronisches Thema haben, bleiben Sie bei kontinuierlicher Pflege.',
    'Schlafen Sie ausreichend: Das trägt alles andere mit.',
  ],
  opportunity: [
    'Gute Chancen können mehr als einmal auftauchen.',
    'Eine einzige Entscheidung kann Ihren Weg stark verändern.',
    'Eine unerwartete Begegnung kann Ihre Geschichte verändern.',
    'Was Sie jetzt tun, formt den nächsten Abschnitt.',
    'Chancen ziehen schnell vorbei: Handeln Sie mit klarem Urteil.',
    'Schauen Sie genau hin: Die Tür ist bereits in Ihrer Nähe.',
    'Mutige Entscheidungen führen oft Richtung Erfolg.',
    'Vergangene Anstrengungen tragen endlich Früchte.',
    'Die Zeit begünstigt einen Neuanfang.',
    'Hilfreiche Verbündete vervielfachen Ihre Möglichkeiten.',
  ],
  warning: [
    'Vorsicht ist entscheidend: Vermeiden Sie überstürzte Entscheidungen.',
    'Bei Geldtransaktionen besteht Betrugsrisiko: Prüfen Sie alles sorgfältig.',
    'In Beziehungen können Spannungen entstehen: Achten Sie auf Kommunikation.',
    'Gesundheit braucht Aufmerksamkeit: Regelmäßige Checks helfen.',
    'Große Entscheidungen gewinnen, wenn Sie sich mehr Zeit nehmen: Denken Sie zweimal nach.',
    'Lesen Sie Zusagen und Verträge Zeile für Zeile.',
    'Lassen Sie Emotionen wichtige Entscheidungen nicht steuern: Bewahren Sie einen kühlen Kopf.',
    'Prüfen Sie neue Projekte oder Investitionen sehr sorgfältig.',
    'Vermeiden Sie nach Möglichkeit, Geld und enge Freundschaften zu vermischen.',
    'Übernehmen Sie sich nicht: Schützen Sie Ihren Körper und Ihre Konzentration.',
  ],
  relationship: [
    'Familiäre Beziehungen können sich jetzt erwärmen.',
    'Ein tiefes Gespräch mit einem Freund oder einer Freundin wird notwendig.',
    'Nehmen Sie wieder Kontakt zu einem alten Freund auf: Gute Nachrichten sind möglich.',
    'Neue Kreise bilden sich: Suchen Sie Menschen, die Sie wachsen lassen.',
    'Sowohl Ältere als auch Jüngere können Ihnen etwas Wertvolles beibringen.',
    'Im Team wird konstante Führung geschätzt.',
    'Eine angespannte Beziehung kann heilen, wenn Sie den ersten Schritt machen.',
    'Die Menschen um Sie herum spielen eine größere Rolle, als Sie denken.',
    'Netzwerke aufzubauen ist wichtig: Zeigen Sie sich und knüpfen Sie Verbindungen.',
    'Schätzen Sie die Beziehungen, die Sie bereits haben.',
  ],
}

// ─── Tarot message pools (8 strings each) ─────────────────────────────────────

export const tarotPoolsDe: Record<
  'total' | 'wealth' | 'luck' | 'caution' | 'love' | 'career' | 'health',
  string[]
> = {
  total: [
    'Ihre Intuition ist schärfer als gewöhnlich. Hören Sie bei Ihrer nächsten wichtigen Entscheidung sowohl auf Ihr Herz als auch auf Ihren Verstand. Die Antwort liegt bereits in Ihnen. Ratschläge von außen können helfen, doch die endgültige Entscheidung sollte von Ihnen kommen.',
    'Eine Tür zu einer neuen Chance steht weit offen. Die Mühe, die Sie aufgebaut haben, ist kurz davor, Früchte zu tragen: Gehen Sie mutig und ohne Angst durch diese Tür. Veränderung kann verunsichern, aber das, was Sie sich wünschen, kann auf der anderen Seite liegen.',
    'Was Sie jetzt erleben, ist vorübergehend. Erinnern Sie sich: Je tiefer die Nacht, desto näher die Morgendämmerung. Wenn Sie standhalten, entdecken Sie eine stärkere Version Ihrer selbst. Was Sie gerade am meisten brauchen, ist Geduld und Vertrauen in sich selbst.',
    'Ihre konsequente Arbeit ist endlich bereit, sichtbar zu werden. Menschen beginnen, Ihren wahren Wert zu erkennen, und Anerkennung kann aus unerwarteter Richtung kommen. Bleiben Sie bescheiden und ruhen Sie sich nicht auf Erfolgen aus.',
    'Beziehungen werden zum Schlüsselthema in Ihrem Leben. Blicken Sie auf Familie, Freunde und Kollegen; knüpfen Sie dort wieder an, wo Distanz entstanden ist. Echte Fülle kommt oft aus menschlichen Verbindungen, nicht nur aus Dingen.',
    'Ihre innere Stimme trägt eine wichtige Botschaft. Legen Sie im hektischen Rhythmus eine Pause ein; Meditation oder ein Spaziergang können ein echtes Gespräch mit sich selbst öffnen. Sie könnten Antworten finden, nach denen Sie lange gesucht haben.',
    'Veränderung kann Angst machen, doch was sich jetzt entfaltet, dient Ihrem Wachstum. Lassen Sie zu Vertrautes los und öffnen Sie sich für Neues. Eine bessere Version von Ihnen wartet auf der anderen Seite dieser Wende.',
    'Dies ist eine Phase des Vorbereitens statt des Überstürzens. Wenn Sie ein großes Vorhaben haben, prüfen Sie die Details sorgfältig. Gründliche Vorbereitung bestimmt einen großen Teil des Erfolgs. Warten zu können ist ebenfalls eine Fähigkeit.',
  ],
  wealth: [
    'Sie stehen an einem wichtigen finanziellen Wendepunkt. Kontrollieren Sie Ausgaben, investieren Sie aber mutig dort, wo echter Wert liegt. Zu viel Vorsicht kann Chancen kosten; zu viel Aggressivität kann Risiken erhöhen. Eine ausgewogene Strategie ist jetzt entscheidend.',
    'Eine finanzielle Chance kann aus unerwarteter Richtung kommen. Gute Nachrichten können aus bestehenden Interessen oder Kontakten entstehen: Prüfen Sie neue Angebote offen, aber überstürzen Sie nichts ohne gründliche Verifikation.',
    'Jetzt ist der richtige Zeitpunkt, Geld mit langfristiger Perspektive zu betrachten. Konzentrieren Sie sich stärker auf Sparen und Zukunftsinvestitionen statt auf schnelle Gewinne. Heute gesäte Samen können über Jahre stark wachsen. Vertrauen Sie auf die stille Kraft des Zinseszinses.',
    'Es lohnt sich, ernsthaft über ein Nebenprojekt oder eine neue Einkommensquelle nachzudenken. Ein Hobby oder eine Stärke kann zu einer Einnahmequelle werden. Schon ein kleiner erster Schritt kann große Veränderungen auslösen: Probieren Sie es aus.',
    'Das finanzielle Glück nimmt zu, doch Zuflüsse brauchen weiterhin Disziplin. Geben Sie nicht unachtsam aus, nur weil die Liquidität besser wird. Erfassen Sie Einnahmen und Ausgaben klar: Eine App oder ein einfaches Notizbuch kann helfen.',
    'Vor jeder großen finanziellen Entscheidung sollten Sie gründlich recherchieren und bei Bedarf Expertenrat einholen. Ruhiges Urteilsvermögen schlägt Impuls in dieser Phase. Lesen Sie das Kleingedruckte und stellen Sie sicher, dass Sie die Vertragsbedingungen verstehen.',
    'Finden Sie die Balance zwischen Sparen und Ausgeben. Extreme Sparsamkeit kann Ihre Lebensqualität belasten; übermäßige Ausgaben können Ihre spätere Stabilität schwächen. Unterscheiden Sie Bedürfnisse von Wünschen und praktizieren Sie bewussten Konsum.',
    'Geben Sie Ihr Bestes in der Arbeit, die vor Ihnen liegt. Beständigkeit kehrt oft als finanzielle Belohnung zurück. Eine Beförderung oder ein Bonus kann näher rücken, und Ihre Anstrengungen haben gute Chancen, anerkannt zu werden.',
  ],
  luck: [
    'Ihre positive Energie zieht Glück an. Wenn etwas Gutes passiert, teilen Sie es mit Ihrem Umfeld: Großzügigkeit kann Glück verstärken. Eine kleine freundliche Handlung kann als unerwartetes Glück zurückkommen.',
    'Eine zufällige Begegnung oder ein Gespräch kann zum Wendepunkt werden. Öffnen Sie Ihr Herz für neue Menschen und gehen Sie an Orte, die Sie selten besuchen. Dort kann eine bedeutende Verbindung auf Sie warten.',
    'Heute steht das Glück auf Ihrer Seite. Es ist ein guter Tag für aufgeschobene Aufgaben oder einen neuen Versuch. Das Glück begünstigt Vorbereitete: Wenn sich eine Chance zeigt, greifen Sie zu.',
    'Kleine Glücksmomente können sich zu echter Freude summieren. Üben Sie Dankbarkeit für Alltagsglück; Dankbarkeit zieht oft noch mehr Glück an. Ein kleines Glückstagebuch kann helfen, es wahrzunehmen.',
    'Jemand in Ihrer Nähe bringt glückliche Energie in Ihr Leben. Pflegen Sie diese Beziehung; gemeinsame Zeit kann Sie beide voranbringen.',
    'Unerwartet gute Nachrichten könnten bald eintreffen. Achten Sie auf Anrufe und Nachrichten: Vielleicht erhalten Sie erfreuliche Neuigkeiten von jemandem, mit dem Sie lange nicht gesprochen haben.',
    'Eine günstige Atmosphäre umgibt Sie. Das kann ein gutes Zeitfenster für eine moderate Wette oder eine wichtige Entscheidung sein, doch unüberlegtes Glücksspiel ist niemals klug.',
    'Achten Sie auf Ihre Glückszahlen und -farben. Wenn sie häufig in Ihrem Alltag auftauchen, sehen Sie es als leises positives Zeichen. Eine Glücksfarbe an einem wichtigen Tag zu tragen, kann Ihre innere Stabilität stärken.',
  ],
  caution: [
    'Impulsive Entscheidungen bringen später oft Reue. Gönnen Sie sich vor wichtigen Entscheidungen mindestens einen Tag Bedenkzeit; selbst wenn Druck entsteht, schnell zu entscheiden, ist Ihr eigenes Tempo wichtig.',
    'Schenken Sie Ihrer Gesundheit zusätzliche Aufmerksamkeit. Vermeiden Sie Zeitpläne oder Arbeitslasten, die Ihren Körper überfordern. Ignorieren Sie kleine Symptome nicht und denken Sie über Routinekontrollen nach. Gesundheit ist Ihr größtes Kapital.',
    'Worte können Beziehungen in dieser Phase sehr schnell verändern. Auch wenn Sie verärgert sind, warten Sie mit dem Sprechen, bis die Emotion abgeklungen ist. Missverständnisse entstehen leicht, kosten aber viel in der Reparatur: Zuhören hilft.',
    'Stressmanagement braucht besondere Sorgfalt. Reservieren Sie Zeit, um Spannung durch Bewegung, Meditation oder Hobbys abzubauen. Erschöpfung kann plötzlich kommen; Vorbeugen ist klüger als nur zu reparieren.',
    'Lesen Sie wichtige Dokumente oder Verträge mehr als einmal. Eine kleine Klausel kann zum großen Problem werden. Fragen Sie nach, wenn etwas unklar ist, und holen Sie bei Bedarf professionelle Hilfe ein.',
    'Lassen Sie sich nicht von jeder äußeren Meinung verunsichern. Zu viele Stimmen können verwirren, doch die endgültige Entscheidung sollte Ihre bleiben: Sie verstehen Ihre Situation am besten.',
    'Überstürzung kann die Arbeit beschädigen. Auch wenn Sie schnell fertig werden wollen, respektieren Sie den Prozess. Fehler aus Ungeduld kosten oft mehr Zeit als saubere Zwischenschritte. Gehen Sie langsam und sicher voran.',
    'Vermeiden Sie große Entscheidungen, solange die Emotionen stark sind, besonders bei Wut oder tiefer Traurigkeit. In einem ruhigeren Zustand kann dieselbe Situation eine andere Antwort zeigen.',
  ],
  love: [
    'Sie könnten beim Ausdrücken Ihrer Gefühle vorsichtig sein. Haben Sie keine Angst, dass Ihre Aufrichtigkeit nicht angenommen wird: Sprechen Sie aus dem Herzen. Echte Gefühle finden oft jemanden, der sie aufnehmen kann.',
    'In der Liebe können überhöhte Erwartungen und übermäßige Abhängigkeit toxisch werden. Nehmen Sie Ihren Partner so an, wie er ist, und bauen Sie eine Beziehung auf, in der Sie beide wachsen. Jemand, der mit Ihnen wächst, kann wichtiger sein als ein imaginiertes perfektes Ideal.',
    'Die Energie einer neuen Begegnung liegt in der Luft. Probieren Sie einen neuen Ort oder eine andere Aktivität: Eine unerwartete Verbindung kann entstehen. Halten Sie die Augen für die Welt um Sie herum offen.',
    'Eine bestehende Beziehung kann auf die nächste Stufe gehen. Tieferes Verständnis und ehrliche Gespräche können die Beziehung verbessern: Vielleicht ist jetzt der richtige Zeitpunkt für einen wichtigen Austausch.',
    'Zeit allein kann Ihnen helfen, Ihre Gefühle zu klären. Lernen Sie wieder zu lieben, beginnend mit Selbstliebe. Sich selbst zu lieben ist ebenfalls eine schöne Form von Liebe.',
    'Manche Beziehungen durchlaufen schwierige Kapitel. Dennoch kann eine Krise Bindungen stärken, wenn Sie Ehrlichkeit und den Willen zum gemeinsamen Aufbau bewahren. Geduld und Dialog können die Beziehung vertiefen.',
    'Ihr Charme strahlt derzeit. Zeigen Sie sich selbstbewusst, so wie Sie sind. Dauerhafte Anziehung entsteht oft mehr aus Haltung und Energie als nur aus Äußerlichkeiten.',
    'Liebe kann gleichzeitig schön und schwierig sein. Freude und Traurigkeit gehören beide dazu. Was immer Sie gerade fühlen, würdigen Sie es und geben Sie dem Prozess Zeit.',
  ],
  career: [
    'Ein neues Projekt oder eine Chance zeigt sich Ihnen. Weichen Sie der Herausforderung nicht aus: Sie sind fähiger, als Sie denken, und diese Tür könnte für Sie bestimmt sein.',
    'Sie könnten vorübergehend ein Plateau in Arbeit oder Karriere spüren. Auch diese Phase lässt Sie wachsen. Stärken Sie Ihre Grundlagen, während Sie den nächsten Schritt vorbereiten.',
    'Teamarbeit ist jetzt wichtig. Legen Sie den Drang beiseite, alles allein zu machen, und kommunizieren Sie mit den Menschen um Sie herum. Gemeinsam können Sie solidere Ergebnisse erzielen.',
    'Die Anerkennung für Ihre Mühen rückt näher. Eine Beförderung oder neue Rolle kann auftauchen: Bleiben Sie bereit. Chancen besuchen oft jene, die sich vorbereitet haben, als niemand hinsah.',
    'Beruflicher Stress kann sich aufbauen. Machen Sie eine Pause und kümmern Sie sich um sich selbst. Eine bessere Balance zwischen Beruf und Privatleben verbessert meist die Ergebnisse, statt sie zu schwächen.',
    'Dies ist eine gute Zeit, um eine neue Fähigkeit oder ein neues Wissensfeld zu lernen. Investitionen in Ihre Entwicklung werden zu einem Vorteil in der Zukunft. Versuchen Sie, den Lernweg zu genießen.',
    'Ihre Leidenschaft für die Arbeit inspiriert andere. Behalten Sie diese Energie, aber schützen Sie sich vor Erschöpfung. Ein nachhaltiges Tempo baut mit der Zeit echten Erfolg auf.',
    'Überprüfen Sie Ihre aktuellen Aufgaben und suchen Sie nach kleinen Verbesserungen. Kleine Änderungen können die Effizienz deutlich erhöhen. Vielleicht ist jetzt der Moment, Ihre Erfahrung gezielter einzusetzen.',
  ],
  health: [
    'Die Gesundheit des Körpers ist wichtig, doch die mentale Gesundheit kann jetzt noch wichtiger sein. Kümmern Sie sich mit Meditation, sanftem Yoga, Therapie oder ruhiger Erholung um Ihren Geist: Ein stabiler Geist trägt einen stabilen Körper.',
    'Überprüfen Sie Ihre täglichen Gewohnheiten. Ausreichend Schlaf, regelmäßige Bewegung und ausgewogene Ernährung sind die Säulen von Vitalität. Kleine Gewohnheitsänderungen können mit der Zeit große gesundheitliche Verbesserungen bewirken.',
    'Wenn chronische Müdigkeit anhält, ziehen Sie professionelle Hilfe in Betracht. Untersuchungen können klären, was Ihr Körper braucht. Vorbeugen ist oft leichter als reparieren.',
    'Bewegung kann Sie wieder aufbauen. Intensives Training ist nicht nötig: Gehen, Dehnen oder freies Tanzen kann ein hervorragender Anfang sein.',
    'Emotionaler Stress kann sich in körperlichen Symptomen zeigen. Tun Sie Dinge, die Sie beruhigen, und sprechen Sie mit einer Vertrauensperson. Emotionen zu lösen gehört ebenfalls zur Heilung.',
    'Die Gesundheit tendiert zur Verbesserung. Behalten Sie Gewohnheiten bei, die diese gute Phase unterstützen: Konstanz ist eines der besten Geheimnisse für Wohlbefinden.',
    'Ernährung ist eine praktische Grundlage für bessere Gesundheit. Reduzieren Sie, wenn möglich, hochverarbeitete Lebensmittel und ergänzen Sie einfachere, natürlichere Zutaten. Was Sie essen, wird ein Teil von Ihnen.',
    'Bringen Sie Ruhe und Aktivität ins Gleichgewicht. Ein Zuviel auf einer Seite kann die Gesundheit schwächen. Hören Sie auf den Rhythmus, den Körper und Geist von Ihnen verlangen.',
  ],
}

// ─── Monthly fortunes (months 1–12, 1 string each) ───────────────────────────

export const monthlyFortunesDe: Record<number, string[]> = {
  1: [
    'Beginn eines neuen Jahres. Es ist entscheidend, klare Ziele und einen Aktionsplan festzulegen. Die Entscheidungen und Schritte in dieser Zeit prägen das ganze Jahr. Finanzielles Glück begünstigt geplante Investitionen und Sparen. Es ist eine Zeit für neue Beziehungen. Lassen Sie keine Gelegenheit ungenutzt.',
  ],
  2: [
    'Eine Phase der Ruhe und Reflexion. Schauen Sie auf den vergangenen Monat zurück und ordnen Sie Ihre Strategie neu. In Beziehungen zählt aufrichtige Kommunikation; es ist ein guter Zeitpunkt, Missverständnisse zu klären. Stärken Sie gesundheitlich Ihr Immunsystem. Das finanzielle Glück ist stabil, doch über Nebenaktivitäten können sich Chancen zeigen. Ein ruhiger, aber ergiebiger Monat.',
  ],
  3: [
    'Die Energie des Neuanfangs kehrt zurück. Wie der Frühling nach dem Winter beginnt eine Wachstumsphase. Ein ausgezeichneter Monat, um ein Projekt oder Vorhaben zu starten. Sie können Ihr Netzwerk erweitern, und das Liebesglück steigt. Achten Sie auf Hast: Bleiben Sie vorsichtig und ausgewogen.',
  ],
  4: [
    'Ein Monat der Aktion und Veränderung. Jetzt ist die Zeit, das umzusetzen, was Sie vorbereitet haben. Das finanzielle Glück steigt, und neue Einkommensquellen können auftauchen. Sie können bei Arbeit oder Geschäft gute Ergebnisse erzielen: Fokussieren Sie Ihre Energie. Achten Sie bei Überlastung auf Ihre Gesundheit und bleiben Sie in Beziehungen demütig. Die Tür zum Erfolg steht offen.',
  ],
  5: [
    'Zeit der Stabilität und des Wohlstands. Die Schritte aus dem April liefern in diesem Monat gute Ergebnisse. Ihre finanzielle Lage verbessert sich, und Sie können eine vertrauensvolle Position erreichen. Familiäre Beziehungen sind harmonisch; ein guter Zeitpunkt für wichtige Entscheidungen. Die Gesundheit ist gut, aber gönnen Sie sich ausreichend Entspannung und Ruhe. Ihre Mühe in dieser Zeit zahlt sich langfristig aus.',
  ],
  6: [
    'Winde der Veränderung wehen. Sie könnten an einem Wendepunkt oder vor einer Wahl stehen. Vermeiden Sie abrupte Veränderungen und entscheiden Sie mit Sorgfalt. In Beziehungen ist ein ehrliches Gespräch wesentlich; klären Sie Missverständnisse jetzt. Für die Gesundheit sind vorsichtige Finanzführung und gutes Stressmanagement nötig. Nehmen Sie Veränderung an, aber gehen Sie weise damit um.',
  ],
  7: [
    'Ein Monat voller Leidenschaft und Ausdruck. Sie können Meinungen und Gefühle freier äußern. Gute Zeit für kreative Aktivitäten oder neue Hobbys; romantisches Glück ist sehr hoch. Denken Sie an Maßhalten, wenn Emotionen überfließen. Finanziell sollten Sie Spekulation vermeiden und stabile Anlagen bevorzugen. Ein sozialer Monat: Ihre Beziehungen zum Umfeld werden aktiver.',
  ],
  8: [
    'Monat der Ernte und Bilanz. Die Mühen des ersten Halbjahres tragen Früchte. Das finanzielle Glück steigt, und unerwartete Gewinne sind möglich. Die Chancen auf Anerkennung sind hoch: Vertrauen Sie sich. Familiäre Bindungen vertiefen sich; wichtige Verträge oder Verhandlungen stehen günstig. Der Erfolg dieses Monats bildet die Basis für das zweite Halbjahr. Vergessen Sie die Dankbarkeit nicht.',
  ],
  9: [
    'Zeit für Veränderung und Ordnung. Sie verlassen die Sommerhitze und gehen in mehr Ruhe. Sortieren Sie Überflüssiges aus und überprüfen Sie Ihre Pläne. Ein guter Monat zum Lernen oder zur Weiterentwicklung. Er begünstigt tiefere Beziehungen; auch Zeit allein ist wichtig. Das finanzielle Glück bleibt vorsichtig, aber mit stetigem Wachstum. Fokussieren Sie Ihr inneres Wachstum.',
  ],
  10: [
    'Monat der Stabilität und Ernte. Was seit März vorbereitet wurde, reift jetzt aus. Das finanzielle Glück ist gut, und Renditen aus Investitionen können auftreten. Günstig, um wichtige Projekte in Arbeit oder Geschäft abzuschließen. Die Gesundheit ist gut, und das allgemeine Glück steigt. Verlieren Sie bei Erfolg nicht Ihre Bescheidenheit und pflegen Sie Ihre Beziehungen. Balance ist in diesem Monat entscheidend.',
  ],
  11: [
    'Monat der Reflexion und Vorbereitung. Gegen Jahresende ordnen Sie Erlebtes und bereiten das nächste Jahr vor. Das finanzielle Glück ist stabil; es ist hilfreich, Chancen für Investitionen im kommenden Jahr zu prüfen. Zeigen Sie den Menschen, die Sie lieben, Ihre Dankbarkeit. Müdigkeit kann sich aufbauen: Ruhen Sie ausreichend aus. Finden Sie Erfüllung in innerer Einkehr und schließen Sie das Jahr ruhig ab.',
  ],
  12: [
    'Monat des Abschlusses und des Neuanfangs. Bereiten Sie sich darauf vor, das Jahr zu beenden und das nächste zu begrüßen. Ziehen Sie Bilanz über Ihre Erfolge und empfinden Sie Dankbarkeit. Finanziell ist es Zeit für Abschlüsse: Finalisieren Sie offene Pläne. Schätzen Sie die Zeit mit Familie und Freunden und begrüßen Sie das neue Jahr mit Hoffnung. Die Vorbereitung in dieser Phase bestimmt den Erfolg des kommenden Jahres. Gehen Sie mit Dankbarkeit und Zuversicht ins neue Jahr.',
  ],
}

// ─── Yearly comprehensive (13 strings) ───────────────────────────────────────

export const yearlyComprehensiveDe: string[] = [
  'Dieses Jahr eröffnet ein neues und prägendes Kapitel. Die ersten Monate belohnen solide Grundlagen; vom späten Frühling bis zum Sommer beschleunigt sich der Schwung, und ein entscheidendes Zeitfenster öffnet sich. Die Einnahmen tendieren nach oben: Vermeiden Sie unüberlegte Risiken. Echte Beziehungen rücken näher, und hilfreiche Verbündete kommen hinzu. Kontinuierliche Selbstfürsorge hält Ihre Energie hoch; das Jahresende wird mit Dankbarkeit erlebt.',
  'Ihre Stärken werden sichtbar und gewinnen an Anerkennung. Die erste Jahreshälfte begünstigt mutige Versuche in neuen Bereichen; was Sie dort entscheiden, prägt die Erfolge der zweiten Hälfte. Achten Sie von März bis Mai auf Angebote. Die Liquidität bleibt kontrollierbar, und neue Einkommensformen entstehen: Wählen Sie mit Klarheit. Zusammenarbeit und Vertrauen wachsen; managen Sie Stress und beenden Sie das Jahr mit solider Zufriedenheit.',
  'Ein Jahr des inneren Wachstums, mehr als des äußeren Lärms. Die erste Hälfte begünstigt Reflexion: Sortieren Sie, was Sie behalten und was Sie loslassen. Diese neue Perspektive stärkt Entscheidungen nach der Jahresmitte. Geld bleibt ausgeglichen und ruhig; reduzieren Sie Übermaß und erhöhen Sie das Sparen. Beziehungen werden jenseits der Oberfläche tiefer; beruhigende Praktiken entspannen den Körper. Das Jahr wirkt leise, ist aber sehr bedeutend.',
  'Glück und Öffnungen bündeln sich in diesem Jahr. Ihre Haltung im Januar und Februar bereitet eine kraftvolle Fortsetzung ab März vor. Von April bis Juli ist der Schwung für Starts und mutige Entscheidungen am stärksten. Finanzen können sprunghaft steigen: Geben Sie diszipliniert aus. Neue Mentoren und Netzwerke treten auf; schützen Sie Ihre Gesundheit im Tempo. Das Jahresende fühlt sich reich und hell an.',
  'Herausforderung und Wachstum gehen Hand in Hand. Lernen und Investitionen in Ihre Fähigkeiten glänzen in der ersten Hälfte; sichtbare Ergebnisse sammeln sich nach dem Sommer. Einnahmen können schwanken, doch der Trend bleibt aufwärtsgerichtet: Bleiben Sie vorsichtig. Alte Bindungen festigen sich, und neue Gesichter kommen hinzu. Aktive Routinen halten Sie widerstandsfähig; bis Dezember steigen Sie auf das nächste Niveau.',
  'Sie suchen Ruhe und Neuabstimmung. Die erste Hälfte räumt Unordnung auf und stellt Ordnung wieder her; die zweite zeigt neue Blickwinkel auf alte Chancen. Geld bleibt stabil, mit möglichen Zusatzeinnahmen. Familie und enge Freunde werden noch wertvoller. Erholung und Pflege des Nervensystems wirken wie Medizin: Ihr innerer Reichtum wächst.',
  'Ihre Kreativität will sich ausdrücken. Das erste Quartal klärt Ihre Vision; Frühling und Sommer erweitern Experimente: Achten Sie von Juni bis September auf einen Wendepunkt. Kreative Nebenarbeit kann Ertrag bringen; passende Menschen beschleunigen Ihren Fortschritt. Schützen Sie Ihre Erholung, damit die Inspiration nachhaltig bleibt; das Jahr glänzt mit umgesetzten Ideen.',
  'Reife und Perspektive führen den Tanz. Die ersten Monate überarbeiten Lektionen; die späteren setzen klügere Bewegungen als zuvor in Gang. Langfristige Finanzpläne tragen Früchte. Tiefe in Familie und Freundschaften zählt; Ihre Erfahrung hilft anderen. Die Gesundheit bleibt stabil, wenn das Tempo menschlich bleibt; das Jahr wird geerdet und sinnvoll erlebt.',
  'Erholung und Neuanfang, falls Sie ihn brauchen. Die erste Hälfte heilt und lädt Energie auf; nach der Jahresmitte kehrt der Schwung für neue Versuche zurück. Halten Sie Ausgaben sanft und sparen Sie regelmäßig. Diejenigen, die Sie unterstützen, zeigen ihren Wert; neues Selbstvertrauen entsteht. Die Hoffnung wird leichter auf dem Weg in den Winter.',
  'Eine Saison des Wohlstands. Neue Projekte begünstigen Starts von Januar bis März; Ergebnisse zeigen sich bereits ab April. Der Hochsommer kann einen finanziellen Höhepunkt markieren: Wählen Sie mit Weisheit und vermeiden Sie Verschwendung. Verbündete und Partner nehmen zu; achten Sie auf Ihre Gesundheit, um die Welle zu nutzen; das Glück zeigt sich großzügig.',
  'Veränderung macht Ihren Wert sichtbar. Die ersten Monate verlangen Flexibilität; unerwartete Türen lenken Sie weiter nach oben. Der Geldfluss kann schwanken, doch der Trend ist positiv: Halten Sie Reserven. Beziehungen ordnen sich neu; echte Bindungen werden enger. Inmitten der Bewegung wachsen Sie mit größerer Stabilität.',
  'Träume treffen auf Logistik. Die erste Hälfte gibt Plänen Form und zieht Unterstützung an; der Sommer zeigt erste Erfolge, und der Herbst kann Ziele übertreffen. Ressourcen richten sich an Ihrer Vision aus, wenn Sie bewusst ausgeben. Menschen, die Sie ermutigen, erscheinen; Hoffnung und Stolz steigen bis zum Jahresende.',
  'Kommunikation und Empathie vertiefen Beziehungen. Der Dialog in der ersten Hälfte erweitert die Perspektive; gemeinsame Projekte blühen danach auf. Einnahmen aus Beziehungen können entstehen; kreative Künste können glänzen. Emotionale Stabilität ist der Schlüssel zur Gesundheit: Warme und bedeutungsvolle Monate liegen vor Ihnen.',
  'Geduld zahlt sich endlich aus. Das erste Halbjahr bleibt eine Phase des Abschließens alter Themen: Halten Sie Kurs, ohne zu überstürzen. Nach dem Sommer beschleunigen sich die Ergebnisse; der Herbst kann überraschen. Die Einnahmen folgen steigender Leistung; Integrität gewinnt Vertrauen. Gesunde Routinen führen Sie zu einem erfüllten Jahresende.',
]

// ─── Yearly detailed (5 strings) ──────────────────────────────────────────────

export const yearlyDetailedDe: string[] = [
  'Dieses Jahr markiert einen neuen Wendepunkt: Das erste Quartal plant, das zweite setzt um, das dritte zeigt sichtbare Ergebnisse und das vierte überprüft. Die Jahresmitte begünstigt wichtige finanzielle Schritte. Bewahren Sie Zuversicht und Beständigkeit.',
  'Unauffällige Arbeit gewinnt endlich an Sichtbarkeit; die erste Hälfte fokussiert, die zweite öffnet neue Wege. Wahre Freunde bleiben nah. Der Wohlstand steigt: Nutzen Sie die erste Hälfte für wichtige Finanzentscheidungen.',
  'Ruhe kehrt nach bewegten Zeiten zurück. Die erste Hälfte stabilisiert und plant; die zweite setzt mit Geduld um. Neue Verbündete helfen Ihnen. Das Geld bleibt ausgeglichen: Kleine, konstante Gewinne sind besser als riskante Wetten.',
  'Das Glück bündelt sich: Früh getroffene kleine Entscheidungen erzeugen große Wellen; die Jahresmitte zeigt Ihr bestes Niveau; das Ende verstärkt die Erfolge. Investitionen und Versuche tendieren ins Positive: Halten Sie Energie und Dankbarkeit.',
  'Innere Reifung: Die erste Hälfte nimmt Lasten weg, die zweite nimmt bessere Gewohnheiten auf. Eine spirituelle oder reflektierende Praxis hilft. Das Geld bleibt stabil und sicher: Sanftes Management reicht aus.',
]

// ─── Monthly detailed (12 strings) ────────────────────────────────────────────

export const monthlyDetailedDe: string[] = [
  'Januar: Energie des Neuanfangs. Schließen Sie das vergangene Jahr ab, setzen Sie Ziele und reinigen Sie Körper und Geist. Das Geld ist stabil: Achten Sie auf Chancen; verpassen Sie keine neuen Verbindungen.',
  'Februar: Ruhiges inneres Wachstum. Bereiten Sie sich geduldig auf den Frühling vor; tiefere Gespräche können entstehen. Das Geld ist ruhig: Schätzen Sie die Gegenwart.',
  'März: Mit dem Frühling kehrt die Vitalität zurück. Gute Zeit, um Pläne zu starten; die Einnahmen steigen: Bewegen Sie sich mit Schwung und passen Sie sich der Saison an.',
  'April: Wachstum wird sichtbar. Zusammenarbeit glänzt; beobachten Sie Ausgaben, während Ihr Netzwerk aktiver wird.',
  'Mai: Leidenschaft auf dem Höhepunkt: Gehen Sie mutig vor, achten Sie aber auf Erschöpfung. Geld begünstigt neue Versuche; kümmern Sie sich um Ihre Gesundheit.',
  'Juni: Reife Harmonie nach dem Mai-Rhythmus. Denken Sie über Ihre Beziehungen nach; Geld bleibt ausgeglichen: Ruhe und Dankbarkeit helfen.',
  'Juli: Veränderungen und Angebote kommen: Bleiben Sie flexibel. Geld kann schwanken, bleibt aber günstig; stabilisieren Sie Ihre Emotionen.',
  'August: Mutiges Handeln im Hochsommer: Entscheidungen und Team sind aufeinander abgestimmt. Einnahmen können springen: Managen Sie Ihre Energie.',
  'September: Ernte und Überprüfung: Feiern Sie Erfolge und planen Sie den nächsten Schritt. Geld erkennt vergangene Anstrengungen an.',
  'Oktober: Herbstliche Tiefe: Ordnung kehrt zurück, echte Freunde werden sichtbar. Das Geld stabilisiert sich; innere Ruhe zählt.',
  'November: Bereiten Sie den Winter vor: Ordnen Sie Finanzen und Rhythmus. Geld bleibt stabil und sicher; vermeiden Sie Überarbeitung.',
  'Dezember: Schließen Sie das Jahr mit Dankbarkeit ab, feiern Sie Erfolge und setzen Sie neue Ziele. Geld unterstützt einen ruhigen Neuanfang.',
]

// ─── Lifetime detailed (6 strings) ────────────────────────────────────────────

export const lifetimeDetailedDe: string[] = [
  'Ihr Leben verläuft zwischen Wachstum und stetigem Wandel. Die frühen Jahre bauen mit Geduld Grundlagen auf; die Lebensmitte verwandelt Einsatz in tiefe Beziehungen und Vermögen; die späteren Jahre geben Sinn durch Weisheit und Hilfe für andere. Wohlstand wächst stetig, wenn Sie Vertrauen und Beziehungen pflegen.',
  'Kreativität und Mut prägen Ihren Weg. Erkundung und Fehler am Anfang werden zu Stärken, die in der Lebensmitte einen unabhängigen Weg öffnen. Gefühle sind intensiv: Bleiben Sie mit verlässlichen Menschen geerdet. Einnahmen können schwanken, doch kreative Arbeit öffnet neue Quellen; emotionale Ruhe trägt die Gesundheit.',
  'Tiefe Gelassenheit zeichnet Sie aus. Nach außen wirken Sie vielleicht zurückhaltend; innerlich sind Sie reflektiert und gewinnen an Selbstvertrauen. Vorsicht am Anfang sät Erfolg in der Lebensmitte und Ruhe danach. Beziehungen filtern sich zu echten Verbündeten, Ihrem größten Reichtum. Geld bleibt stabil; balancieren Sie Geist und Körper für optimale Vitalität.',
  'Handeln und Umsetzung tragen Sie. Sie erreichen die meisten Ziele, die Sie sich setzen; der Anfangsschwung wird in der Lebensmitte zu Ergebnissen und später zu Mut für neue Sprünge. Zu direkte Ehrlichkeit kann Reibung erzeugen: Üben Sie Empathie. Wohlstand folgt dem Einsatz; regelmäßige Routinen schützen die Gesundheit.',
  'Sie suchen Harmonie und Gleichgewicht. Menschen fühlen sich von Ihrer Fürsorge angezogen; Sie entwickeln sich von Einfluss hin zu Unabhängigkeit. Ein starkes ästhetisches Gespür und Intuition passen gut zu kreativer Arbeit. Geld bleibt stabil bei neuen Chancen; emotionale Ruhe ist der Schlüssel zur Gesundheit.',
  'Weisheit und Urteilsvermögen füllen Ihren Weg. Prüfungen in der Jugend werden später zu Stärke; Empathie baut dauerhafte Bindungen auf. Wohlstand festigt sich ab der Lebensmitte; Ihre innere Haltung prägt, wie sich Ihr Körper anfühlt.',
]

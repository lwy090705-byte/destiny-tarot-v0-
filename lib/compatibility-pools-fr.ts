/**
 * French (fr) compatibility / love result narrative pools.
 */
type FiveElementKey = 'wood' | 'fire' | 'earth' | 'metal' | 'water'

export const compatibilityElementLabelsFr: Record<FiveElementKey, string> = {
  wood: 'Bois',
  fire: 'Feu',
  earth: 'Terre',
  metal: 'Métal',
  water: 'Eau',
}

export const p1TraitFr: Record<FiveElementKey, string> = {
  wood: 'tourné vers la croissance et l’avenir',
  fire: 'passionné et énergique',
  earth: 'stable et réfléchi',
  metal: 'décisif et guidé par des principes',
  water: 'sage et adaptable',
}

export const p2TraitFr: Record<FiveElementKey, string> = {
  wood: 'créatif et ouvert d’esprit',
  fire: 'sociable et optimiste',
  earth: 'responsable et pratique',
  metal: 'attentif aux détails avec des exigences élevées',
  water: 'très adaptable et intuitif',
}

export const relationshipFlowFr: [string, string, string] = [
  'Pour {n1} et {n2}, ce lien semble moins une coïncidence qu’une rencontre porteuse de sens. L’énergie de {e1} et {e2} vous attire l’un vers l’autre et forme un lien solide. Vous êtes dans une phase de curiosité et de découverte ; avec le temps, la compréhension et la confiance peuvent s’approfondir. L’échange émotionnel coule facilement et vous vous lisez étonnamment bien.',
  'Votre relation avance naturellement, comme l’eau. {n1}, avec la tonalité de {e1}, et {n2}, avec celle de {e2}, se rencontrent dans une harmonie douce. L’équilibre émotionnel paraît stable et vous vous apportez du réconfort. Comme le confort peut devenir routine, essayez parfois un nouveau défi ensemble.',
  'Entre {n1} et {n2} circule un courant particulier. L’association de {e1} et {e2} porte une force qui favorise la croissance. Ensemble, l’énergie créative monte et vous pouvez accomplir ce qu’aucun n’essaierait seul.',
]

export const personalityOtherFr: [string, string] = [
  '{n1} ({e1}) et {n2} ({e2}) ont des charmes distincts. Les forces de {n1} peuvent équilibrer les angles morts de {n2}, tandis que celles de {n2} peuvent ouvrir une nouvelle perspective à {n1}. Les différences n’ont pas à être un conflit : elles peuvent être un moteur de croissance.',
  'Vous vous stimulez mutuellement. Le côté orienté vers {e1} de {n1} rencontre le côté orienté vers {e2} de {n2}, créant une alchimie distinctive. Quand vous acceptez et respectez les différences, le partenariat atteint sa meilleure forme.',
]

export const strengthsCautionsFr: { strengths: string; cautions: string }[] = [
  {
    strengths:
      'Une grande force est la complémentarité mutuelle. Quand {n1} avance, {n2} peut être un soutien solide ; quand {n2} traverse des difficultés, {n1} peut aider à trouver une issue. La conversation s’accorde, et l’humour partagé allège le temps ensemble. En visant un objectif commun, la synergie est maximale.',
    cautions:
      'Attention à l’usure silencieuse de la communication. Supposer que tout se comprend sans le dire peut accumuler les malentendus. Même les jours chargés, gardez un petit moment quotidien pour parler. {n1}, méfiez-vous de l’impatience ; {n2}, de l’indécision.',
  },
  {
    strengths:
      'Un lien profond peut se développer entre vous. La compréhension peut s’approfondir avec le temps, et vous pouvez vous sentir l’un l’autre même avec peu de mots. Dans les moments difficiles, vous pouvez vous rapprocher et construire une relation qui résiste aux pressions extérieures.',
    cautions:
      'Les chocs émotionnels demandent de l’attention. Si l’orgueil est fort, se réconcilier peut prendre du temps. Après une tension, concluez par le dialogue : privilégiez la réparation du lien plutôt que gagner la dispute.',
  },
  {
    strengths:
      'Vous pouvez accélérer votre croissance mutuelle. Ensemble, vous pouvez devenir une meilleure version que seuls : bonne stimulation, fort soutien aux rêves, et plus de proximité en partageant hobbies et intérêts.',
    cautions:
      'Gérez les attentes. Exiger la perfection de l’autre invite à la déception. Chacun a des limites : acceptez-les. Respectez le besoin de temps et d’espace de chacun.',
  },
]

export const futureAdviceFr: [string, string, string] = [
  'L’avenir ensemble paraît lumineux. L’association de {e1} et {e2} peut soutenir un lien stable à long terme. Pour l’approfondir, accumulez des expériences partagées—voyages, loisirs, nouveaux défis—afin que les souvenirs s’additionnent et la proximité grandisse. Honorez les familles de chacun et gardez de bonnes relations avec votre entourage. Esquissez où vous espérez être dans un, cinq et dix ans, et fixez des objectifs communs ; cette clarté renforce le lien.',
  'De nombreuses possibilités s’ouvrent devant vous. Conservez la bonne énergie actuelle et n’oubliez pas la gratitude. Essayez de dire un merci concret chaque jour. En cas de conflit, adoptez un regard « nous » et concentrez-vous sur les solutions, pas le score. Sortez régulièrement ensemble et accordez de la valeur aux jours ordinaires : les petites joies se multiplient.',
  '{n1} et {n2}, votre lien a encore de la marge pour grandir. Trois ancres pour l’avenir : gardez une communication régulière, encouragez les rêves de l’autre et croyez que les saisons difficiles peuvent être surmontées ensemble. Vous choisir l’un l’autre fut un bon choix—renouvelez ce choix par de petits gestes chaque jour et construisez l’avenir que vous désirez tous les deux.',
]

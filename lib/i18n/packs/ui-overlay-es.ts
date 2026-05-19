import { uiOverlayFortuneEs } from './ui-overlay-fortune-noncore'
import { uiOverlayPagesEs } from './ui-overlay-pages-locales'
import { uiOverlayEsLegal } from './ui-overlay-es-legal'

/** Spanish UI overlay (overrides English fallback in es pack) */
export const uiOverlayEs: Record<string, string> = {
  ...uiOverlayFortuneEs,
  ...uiOverlayPagesEs,
  ...uiOverlayEsLegal,
  'mbti.featurePersonality': 'Personalidad',
  'mbti.featureLoveStyle': 'Estilo de amor',
  'mbti.featureCareer': 'Carrera',
  'mbti.featureCompatibilityShort': 'Compatibilidad MBTI',
  'mbti.unlockForPoints': 'Desbloquear por 10P',
  'mbti.compatPremiumTeaser': 'La compatibilidad detallada es contenido premium',
  'mbti.compatScoreStrong': 'Puntuación de compatibilidad:',
  'mbti.detailedTeaserTitle': 'Informe detallado',
  'mbti.detailedTeaserDesc': 'Rasgos profundos, fortalezas ocultas, caminos de crecimiento…',
  'mbti.detailedFullTitle': 'Informe detallado',
  'mbti.detailedHidden': 'Rasgos ocultos:',
  'mbti.detailedHiddenBody':
    'Los tipos {type} suelen tener una gran sensibilidad bajo la superficie. El tiempo a solas ayuda a encontrar el verdadero yo e inspira ideas creativas.',
  'mbti.detailedGrowth': 'Enfoque de crecimiento:',
  'mbti.detailedGrowthBody':
    'Practica expresar tus sentimientos con más franqueza. Mantén la curiosidad por nuevas experiencias para crecer más.',
  'mbti.detailedStress': 'Manejo del estrés:',
  'mbti.detailedStressBody':
    'Los tipos {type} pueden agotarse con exigencias sociales intensas o cambios bruscos. Mantén el equilibrio con descanso y aficiones.',
  'mbti.personalityCoreTitle': 'Personalidad central',
  'mbti.commStyleTitle': 'Estilo de comunicación',
  'mbti.growthDirectionTitle': 'Dirección de crecimiento',
  'mbti.growthDirectionBody':
    'Reconoce tus puntos débiles y trabájalos con constancia. Potencia tus fortalezas y acoge el feedback como motor de aprendizaje.',
  'mbti.lovePageTitle': 'Estilo de amor de {type}',
  'mbti.loveTendencyTitle': 'Tendencias de relación',
  'mbti.emotionExpressTitle': 'Cómo expresas tus emociones',
  'mbti.relationshipStrengthTitle': 'Fortalezas en la relación',
  'mbti.relationshipStrengthBody':
    'Como {type}, conectas especialmente bien con {match}. Busca puntos en común para profundizar el vínculo.',
  'mbti.cautionTitle': 'Puntos a tener en cuenta',
  'mbti.cautionBody':
    'Intenta entender las emociones y necesidades de tu pareja. Piensa desde su perspectiva, valora los pequeños gestos y exprésalo con frecuencia.',
  'mbti.careerPageTitle': 'Orientación profesional de {type}',
  'mbti.recommendedJobsTitle': 'Profesiones recomendadas',
  'mbti.workStyleTitle': 'Estilo de trabajo',
  'mbti.leadershipStyleTitle': 'Estilo de liderazgo',
  'mbti.careerAdviceTitle': 'Consejo profesional',
  'mbti.careerAdviceBody':
    'Busca roles que aprovechen tus fortalezas. Sigue aprendiendo para compensar debilidades y aprende de mentores y compañeros.',
  'mbti.compatPageTitle': 'Compatibilidad MBTI',
  'mbti.selectPartnerTitle': 'Elige el MBTI de la pareja',
  'mbti.scoreUnit': ' pts',
  'mbti.compatPremiumLockedTitle': 'El análisis completo es contenido premium',
  'mbti.strengthsTogetherTitle': 'Fortalezas juntos',
  'mbti.strengthsTogetherLead': 'Podéis complementaros en las diferencias y crecer juntos.',
  'mbti.conflictRiskTitle': 'Riesgos de fricción',
  'mbti.conflictRiskBody':
    'Los valores distintos pueden chocar. Procura entender su punto de vista y hablar con calma cuando haya tensión.',
  'mbti.communicationTipsTitle': 'Consejos de comunicación',
  'mbti.communicationTipsBody':
    'Mantén una comunicación clara y honesta. Escucha con atención y expresa sentimientos y pensamientos con claridad.',
  'mbti.compatPairPrefix': '{a} y {b}:',
}

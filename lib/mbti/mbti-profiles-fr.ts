import type { MBTIType } from './mbti-types'
import type { MbtiTypeProfile } from './mbti-types'

export const mbtiProfilesFr: Record<MBTIType, MbtiTypeProfile> = {
  INTJ: {
    title: 'Architecte',
    description:
      "Stratège indépendant et analytique, avec des standards élevés, qui valorise l'efficacité et la logique. Vous définissez des visions à long terme et avancez avec constance vers vos objectifs.",
    strengths: ['Pensée stratégique', 'Indépendance', 'Décision', 'Standards élevés', 'Goût d’apprendre'],
    weaknesses: ['Perfectionnisme', 'Difficulté à exprimer les émotions', 'Critique excessive', 'Peu de flexibilité'],
    loveStyle:
      "Vous recherchez des relations profondes et significatives, et vous appréciez les conversations intellectuelles. Vous êtes loyal, même si exprimer vos émotions peut être difficile.",
    career: ['Scientifique', 'Consultant stratégique', 'Analyste en investissements', 'Développeur logiciel', 'Enseignant'],
  },
  INTP: {
    title: 'Logicien',
    description: "Innovateur réfléchi qui aime la logique et l'analyse et apprécie de résoudre des problèmes complexes.",
    strengths: ['Analyse', 'Créativité', 'Objectivité', 'Curiosité', 'Résolution de problèmes'],
    weaknesses: ['Indécision', 'Peu de sociabilité', 'Ignorer les émotions', "Faible mise en oeuvre"],
    loveStyle:
      "La connexion intellectuelle est importante pour vous ; vous voulez de la liberté dans la relation et appréciez les partenaires qui aiment les débats profonds.",
    career: ['Chercheur', 'Programmeur', 'Philosophe', 'Mathématicien', 'Développeur de jeux'],
  },
  ENTJ: {
    title: 'Commandant',
    description: 'Leader naturel qui recherche l’efficacité et guide les organisations vers leurs objectifs.',
    strengths: ['Leadership', 'Confiance', 'Décision', 'Efficacité', 'Pensée stratégique'],
    weaknesses: ['Dominant', 'Impatience', 'Ignorer les émotions', 'Entêtement'],
    loveStyle:
      "Vous recherchez une relation qui vous fait grandir et préférez des partenaires ambitieux. Vous aimez une communication honnête et directe.",
    career: ['PDG', 'Avocat', 'Consultant en management', 'Politicien', 'Entrepreneur'],
  },
  ENTP: {
    title: 'Innovateur',
    description: "Innovateur créatif qui aime le débat et l'exploration de nouvelles idées.",
    strengths: ['Créativité', 'Adaptabilité', 'Passion', 'Humour', 'Résolution de problèmes'],
    weaknesses: ['Argumentatif', 'Brise les règles', 'Faible concentration', 'Ignorer les émotions'],
    loveStyle:
      "Vous voulez des relations stimulantes et ludiques, avec un partenaire qui aime débattre et vivre de nouvelles expériences.",
    career: ['Entrepreneur', 'Inventeur', 'Avocat', 'Spécialiste marketing', 'Cinéaste'],
  },
  INFJ: {
    title: 'Avocat',
    description: 'Idéaliste à forte intuition qui veut aider les autres et améliorer le monde.',
    strengths: ['Intuition', 'Idéalisme', 'Décision', 'Passion', 'Altruisme'],
    weaknesses: ['Perfectionnisme', 'Épuisement', 'Réserve excessive', 'Sensibilité à la critique'],
    loveStyle: 'Vous recherchez des liens profonds et authentiques, et une véritable âme soeur.',
    career: ['Conseiller', 'Écrivain', 'Psychologue', 'Enseignant', 'Activiste'],
  },
  INFP: {
    title: 'Médiateur',
    description: "Rêveur d'un monde idéal, sensible et créatif, qui valorise l'authenticité.",
    strengths: ['Empathie', 'Créativité', 'Idéalisme', 'Passion', 'Adaptabilité'],
    weaknesses: ['Irréalisme', 'Autocritique', 'Évitement', 'Hypersensibilité'],
    loveStyle: "Vous rêvez d'un amour romantique et idéal, et vous recherchez une connexion émotionnelle profonde.",
    career: ['Écrivain', 'Artiste', 'Conseiller', 'Musicien', 'Travailleur social'],
  },
  ENFJ: {
    title: 'Protagoniste',
    description: 'Leader charismatique qui aide les autres à grandir et exerce une influence positive.',
    strengths: ['Charisme', 'Altruisme', 'Fiabilité', 'Passion', 'Communication'],
    weaknesses: ['Idéalisme excessif', 'Sacrifice de soi', 'Sensibilité à la critique', 'Indécision'],
    loveStyle: "Vous êtes un partenaire dévoué et chaleureux ; vous aimez soutenir l'évolution de l'autre.",
    career: ['Enseignant', 'Conseiller', 'Responsable RH', 'Politicien', 'Organisateur d’événements'],
  },
  ENFP: {
    title: 'Militant',
    description: "Esprit libre, créatif et passionné, qui explore les possibilités et inspire les autres.",
    strengths: ['Passion', 'Créativité', 'Sociabilité', 'Positivité', 'Adaptabilité'],
    weaknesses: ['Faible concentration', 'Émotions intenses', 'Irréalisme', 'Optimisme excessif'],
    loveStyle:
      "Vous aimez un amour passionné et romantique, et recherchez de nouvelles expériences avec une connexion profonde.",
    career: ['Acteur', 'Journaliste', 'Spécialiste marketing', 'Conseiller', 'Entrepreneur'],
  },
  ISTJ: {
    title: 'Logisticien',
    description: 'Pilier fiable de responsabilité, qui valorise les règles et va au bout de ce qu’il commence.',
    strengths: ['Responsabilité', 'Application', 'Organisation', 'Fiabilité', 'Patience'],
    weaknesses: ['Entêtement', 'Résistance au changement', 'Peu d’expression émotionnelle', 'Rigidité excessive'],
    loveStyle:
      "Vous recherchez des relations stables et engagées ; vous êtes un partenaire responsable et digne de confiance.",
    career: ['Comptable', 'Fonctionnaire', 'Militaire', 'Banquier', 'Professionnel du droit'],
  },
  ISFJ: {
    title: 'Défenseur',
    description: 'Protecteur chaleureux et dévoué qui aime prendre soin des autres en silence.',
    strengths: ['Dévouement', 'Attention au détail', 'Fiabilité', 'Patience', 'Observation'],
    weaknesses: ['Sacrifice de soi', 'Résistance au changement', 'Éviter les conflits', 'Timidité excessive'],
    loveStyle:
      'Vous aimez avec dévouement et chaleur ; vous prenez soin de votre partenaire avec beaucoup d’attention.',
    career: ['Infirmier', 'Enseignant', 'Travailleur social', 'Bibliothécaire', 'Administrateur'],
  },
  ESTJ: {
    title: 'Exécutif',
    description: "Gestionnaire efficace qui valorise l'ordre et les règles et dirige de manière méthodique.",
    strengths: ['Organisation', 'Leadership', 'Application', 'Décision', 'Responsabilité'],
    weaknesses: ['Peu de flexibilité', 'Entêtement', 'Ignorer les émotions', 'Dominant'],
    loveStyle: 'Vous voulez des relations stables et traditionnelles ; vous êtes responsable et fiable.',
    career: ['Manager', 'Policier', 'Juge', 'Finance', 'Officier militaire'],
  },
  ESFJ: {
    title: 'Consul',
    description: "Gardien sociable et attentif de l'harmonie, qui prend soin des autres et unit le groupe.",
    strengths: ['Sociabilité', 'Bienveillance', 'Organisation', 'Coopération', 'Loyauté'],
    weaknesses: ['Besoin d’approbation', 'Résistance au changement', 'Sensibilité à la critique', 'Éviter les conflits'],
    loveStyle:
      "Vous aimez avec chaleur et engagement ; tourné vers la famille, vous prenez très bien soin de votre partenaire.",
    career: ['Infirmier', 'Enseignant', 'Organisateur d’événements', 'RH', 'Ventes'],
  },
  ISTP: {
    title: 'Virtuose',
    description: "Résolveur de problèmes pratique et logique, avec une grande habileté manuelle, qui aime l'action spontanée.",
    strengths: ['Pragmatisme', 'Analyse', 'Adaptabilité', 'Calme', 'Efficacité'],
    weaknesses: ['Peu d’expression émotionnelle', 'Distance', 'Recherche de risque', 'Éviter les engagements'],
    loveStyle:
      "Vous voulez de la liberté et de l'indépendance en amour, et vous montrez votre affection par des actes concrets.",
    career: ['Ingénieur', 'Pilote', 'Technicien', 'Athlète', 'Pompier'],
  },
  ISFP: {
    title: 'Aventurier',
    description: 'Âme douce avec une sensibilité artistique, qui profite du présent et recherche la beauté.',
    strengths: ['Sens artistique', 'Empathie', 'Flexibilité', 'Loyauté', 'Aventure'],
    weaknesses: ['Faible estime de soi', 'Éviter les conflits', 'Imprévisibilité', 'Peu de planification'],
    loveStyle:
      "Vous aimez de façon romantique et sensible, en exprimant un attachement profond avec discrétion.",
    career: ['Artiste', 'Designer', 'Vétérinaire', 'Chef cuisinier', 'Photographe'],
  },
  ESTP: {
    title: 'Entrepreneur',
    description: "Aventurier actif et réaliste qui vit l'instant et n'a pas peur de prendre des risques.",
    strengths: ['Adaptabilité', 'Observation', 'Audace', 'Pragmatisme', 'Sociabilité'],
    weaknesses: ['Impulsivité', 'Briser les règles', 'Peu de patience', 'Ignorer les émotions'],
    loveStyle:
      "Vous aimez des relations dynamiques et amusantes, et un partenaire avec qui vivre de nouvelles expériences.",
    career: ['Entrepreneur', 'Ventes', 'Athlète', 'Acteur', "Services d'urgence"],
  },
  ESFP: {
    title: 'Amuseur',
    description: "Personnalité sociable qui anime l'ambiance, profite du présent et aime être entourée.",
    strengths: ['Sociabilité', 'Optimisme', 'Pragmatisme', 'Observation', 'Audace'],
    weaknesses: ['Faible concentration', 'Difficulté avec les plans longs', 'Sensibilité à la critique', 'Impulsivité'],
    loveStyle:
      "Vous êtes affectueux et plein de joie, et vous aimez partager des expériences heureuses à deux.",
    career: ['Artiste de scène', 'Organisateur d’événements', 'Guide touristique', 'Chef cuisinier', 'Éducateur petite enfance'],
  },
}

export default mbtiProfilesFr

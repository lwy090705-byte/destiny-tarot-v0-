/**
 * French (fr) fortune / tarot content pools.
 * Array lengths match English counterparts in fortune-templates.ts,
 * tarot-message-pools.ts, and monthly-fortunes.ts.
 */

// ─── Fallback (4 keys, 1 string each) ─────────────────────────────────────────

export const fallbackFr: Record<'lifetime' | 'yearly' | 'monthly' | 'general', string[]> = {
  lifetime: [
    "Votre vie avance entre croissance et changements constants. Les premières années demandent de la patience et des bases solides ; le milieu de vie récolte les fruits de vos efforts ; les années suivantes transforment sagesse et expérience en aide apportée aux autres.",
  ],
  yearly: [
    "Cette année apporte de nouvelles opportunités et du changement. La première moitié favorise la planification et la préparation ; la seconde récolte les résultats de ce que vous avez construit. Gardez l'espoir et continuez d'essayer.",
  ],
  monthly: [
    "Ce mois porte l'énergie d'un nouveau départ. C'est le bon moment pour avancer dans vos projets et réchauffer vos relations. Restez pleinement présent à ce qui compte maintenant.",
  ],
  general: [
    "De nouvelles possibilités s'ouvrent à vous en ce moment. Avancez avec foi. Les efforts que vous investissez trouveront leur récompense.",
  ],
}

// ─── Category template pools (10 strings each) ────────────────────────────────

export const templatePoolsFr: Record<
  'love' | 'wealth' | 'career' | 'health' | 'opportunity' | 'warning' | 'relationship',
  string[]
> = {
  love: [
    "La chance en amour est en hausse : de nouvelles rencontres peuvent se présenter.",
    "Valorisez le lien que vous avez ; un petit geste peut devenir un amour profond.",
    "Il est temps d'exprimer ce que vous ressentez : partagez votre coeur avec sincérité.",
    "Pendant que vous attendez, une joie inattendue peut encore vous trouver.",
    "S'il y a quelqu'un qui vous plaît, faites un pas courageux : les signes sont positifs.",
    "La relation est à un tournant : approfondissez-la par le dialogue.",
    "Prenez soin du temps passé avec votre partenaire : vous sentirez la valeur d'être ensemble.",
    "Prendre soin du présent compte plus que courir après quelqu'un de nouveau.",
    "La romance demande de l'attention maintenant : évitez les décisions impulsives.",
    "Si vous êtes célibataire, aimez-vous d'abord : c'est là votre vrai charme.",
  ],
  wealth: [
    'La chance financière monte : de nouvelles sources de revenus peuvent apparaître.',
    "Une gestion consciente de l'argent est essentielle ; réduisez les dépenses inutiles.",
    "Une augmentation ou une prime peut arriver plus vite que vous ne l'imaginez.",
    'Abordez les investissements avec calme ; les plans à long terme fonctionnent mieux.',
    "Les opportunités d'argent peuvent frapper deux fois : ne manquez pas la première.",
    "Bon moment pour renforcer l'épargne et préparer l'avenir.",
    'Des projets parallèles ou du travail freelance peuvent ajouter des revenus utiles.',
    "Le flux d'argent reste stable : conservez votre plan actuel.",
    "Des dépenses imprévues peuvent surgir : gardez une réserve de sécurité.",
    'Des personnes qui vous soutiennent améliorent votre situation financière.',
  ],
  career: [
    "La chance professionnelle augmente : une promotion ou des offres solides peuvent arriver.",
    'Concentrez-vous sur votre travail actuel ; les résultats seront remarqués.',
    "Le travail d'équipe compte maintenant : la collaboration est la clé du succès.",
    "Bon moment pour lancer un nouveau défi ambitieux.",
    'Investissez dans vos compétences : votre capacité façonne votre avenir.',
    'Votre satisfaction dans le poste actuel peut grandir.',
    'Si vous envisagez un changement, décidez avec prudence.',
    'Votre créativité au travail se distingue en ce moment.',
    'Les relations avec la direction s’améliorent ; la confiance se renforce.',
    "Le succès d'un projet est à portée de main.",
  ],
  health: [
    'La santé va bien : votre énergie est lumineuse.',
    "L'exercice et une alimentation régulière comptent ; créez des habitudes saines.",
    'Gérez le stress : le repos ou une pratique apaisante aident.',
    "L'immunité peut baisser ; concentrez-vous sur la prévention.",
    'Attention aux blessures ou au mal-être : bougez avec prudence.',
    'Bon moment pour des contrôles et bilans de santé.',
    "Équilibrez le corps et l'esprit.",
    "L'énergie remonte : profitez de cette période.",
    'Si vous avez un souci chronique, maintenez des soins constants.',
    'Dormez suffisamment : cela soutient tout le reste.',
  ],
  opportunity: [
    'Les bonnes opportunités peuvent arriver plus d’une fois.',
    'Une seule décision peut changer votre trajectoire de façon majeure.',
    'Une rencontre inattendue peut changer votre histoire.',
    'Ce que vous faites maintenant façonne la suite.',
    'Les opportunités passent vite : il faut agir avec discernement.',
    'Regardez bien autour de vous : la porte est déjà proche.',
    'Les décisions courageuses tendent vers le succès.',
    "Les efforts passés portent enfin leurs fruits.",
    'Le moment favorise un nouveau départ.',
    'Des alliés utiles multiplient vos possibilités.',
  ],
  warning: [
    'La prudence est essentielle : évitez les décisions précipitées.',
    "Les transactions d'argent comportent un risque de fraude : vérifiez tout.",
    'Des tensions peuvent apparaître dans les relations : soignez la communication.',
    "La santé demande de l'attention : les bilans réguliers aident.",
    'Les grandes décisions gagnent à prendre plus de temps : réfléchissez à deux fois.',
    'Lisez promesses et contrats ligne par ligne.',
    "Ne laissez pas les émotions guider les décisions importantes : gardez la tête froide.",
    'Examinez avec soin les nouveaux projets ou investissements.',
    "Évitez, si possible, de mélanger argent et amitiés très proches.",
    'N’en faites pas trop : protégez votre corps et votre concentration.',
  ],
  relationship: [
    'Les liens familiaux peuvent se réchauffer maintenant.',
    "Une conversation profonde avec un ami ou une amie devient nécessaire.",
    'Recontactez un vieil ami : une bonne nouvelle peut arriver.',
    'De nouveaux cercles se forment : cherchez des personnes qui vous élèvent.',
    'Les aînés comme les plus jeunes vous apprennent quelque chose d’utile.',
    "En équipe, un leadership constant est valorisé.",
    'Un lien tendu peut guérir si vous faites un pas.',
    'Les personnes qui vous entourent jouent un rôle plus grand que vous ne le pensez.',
    'Développer son réseau compte : montrez-vous et créez des liens.',
    'Valorisez les relations que vous avez déjà.',
  ],
}

// ─── Tarot message pools (8 strings each) ─────────────────────────────────────

export const tarotPoolsFr: Record<
  'total' | 'wealth' | 'luck' | 'caution' | 'love' | 'career' | 'health',
  string[]
> = {
  total: [
    "Votre intuition est plus affûtée que d'habitude. Lors de votre prochaine décision importante, écoutez votre coeur autant que votre tête. La réponse est déjà en vous. Les conseils extérieurs peuvent aider, mais le choix final doit venir de vous.",
    "Une porte vers une nouvelle opportunité est grande ouverte. L'effort que vous avez construit est sur le point de porter ses fruits : faites un pas courageux vers cette porte sans peur. Le changement peut inquiéter, mais ce que vous désirez peut se trouver de l'autre côté.",
    "Ce que vous vivez maintenant est temporaire. Rappelez-vous : plus la nuit est profonde, plus l'aube est proche. Après avoir tenu bon, vous découvrirez une version plus forte de vous-même. Ce dont vous avez le plus besoin en ce moment, c'est de patience et de confiance en vous.",
    "Le travail constant que vous avez investi est enfin prêt à briller. Les gens vont commencer à voir votre vraie valeur, et la reconnaissance peut venir d'un endroit inattendu. Restez humble et évitez de vous reposer sur vos acquis.",
    "Les relations deviennent une clé maîtresse dans votre vie. Regardez votre famille, vos amis et vos collègues ; reconnectez-vous là où la distance s'est installée. L'abondance véritable vient souvent des liens avec les personnes, pas seulement des choses.",
    "Votre voix intérieure porte un message important. Faites une pause dans le rythme agité ; la méditation ou une promenade peuvent ouvrir une vraie conversation avec vous-même. Vous pourriez trouver des réponses que vous cherchiez depuis longtemps.",
    "Le changement peut faire peur, mais ce qui se déploie maintenant est là pour votre croissance. Lâchez ce qui est trop familier et ouvrez-vous au nouveau. Une meilleure version de vous vous attend de l'autre côté de ce tournant.",
    "C'est une période pour préparer davantage que pour se précipiter. Si vous avez un grand projet, relisez les détails avec soin. Une préparation minutieuse détermine une grande partie du succès. Savoir attendre est aussi une compétence.",
  ],
  wealth: [
    "Vous êtes à un tournant financier important. Contrôlez les dépenses, mais investissez avec courage là où la valeur est réelle. Être trop conservateur peut vous faire rater des opportunités ; être trop agressif peut vous exposer au risque. Une stratégie équilibrée est essentielle maintenant.",
    "L'opportunité financière peut arriver d'une direction inattendue. De bonnes nouvelles peuvent venir d'intérêts ou de contacts que vous avez déjà : examinez les nouvelles propositions avec ouverture d'esprit, mais ne vous précipitez pas sans vérification sérieuse.",
    "C'est le moment de regarder l'argent avec une perspective de long terme. Concentrez-vous davantage sur l'épargne et l'investissement pour l'avenir que sur les gains rapides. Les graines plantées aujourd'hui peuvent grandir fortement avec les années. Faites confiance à la force silencieuse des intérêts composés.",
    "Il vaut la peine de réfléchir sérieusement à un projet parallèle ou à une nouvelle source de revenus. Un hobby ou un point fort peut devenir une source financière. Même un petit premier pas peut lancer un grand changement : essayez de le faire.",
    "La chance financière est en hausse, mais les entrées demandent encore de la discipline. Ne dépensez pas sans attention simplement parce que la trésorerie circule mieux. Notez clairement vos revenus et dépenses : une application ou un carnet simple peut aider.",
    "Avant toute grande décision financière, renseignez-vous en profondeur et demandez un avis expert si nécessaire. Le jugement calme l'emporte sur l'impulsion en ce moment. Lisez les petites lignes et assurez-vous de bien comprendre les termes du contrat.",
    "Trouvez l'équilibre entre économiser et dépenser. Une austérité extrême peut nuire à votre qualité de vie ; des dépenses excessives peuvent fragiliser votre stabilité future. Distinguez besoins et envies, et pratiquez une consommation consciente.",
    "Donnez le meilleur de vous-même dans le travail que vous avez devant vous. La constance revient souvent sous forme de récompense financière. Une promotion ou une prime peut approcher, et vos efforts ont de fortes chances d'être reconnus.",
  ],
  luck: [
    "Votre énergie positive attire la bonne fortune. Quand quelque chose de bon arrive, partagez-le avec votre entourage : la générosité peut amplifier la chance. Un petit geste de bonté peut revenir sous forme de chance inattendue.",
    "Une rencontre fortuite ou une conversation peut devenir un tournant. Ouvrez votre coeur à de nouvelles personnes et allez dans des lieux que vous fréquentez rarement. Une connexion significative peut vous y attendre.",
    "La chance est de votre côté aujourd'hui. C'est une bonne journée pour les tâches reportées ou pour une nouvelle tentative. La fortune favorise ceux qui se préparent : quand l'opportunité apparaît, saisissez-la.",
    "De petits coups de chance peuvent s'accumuler en vraie joie. Pratiquez la gratitude pour les bonheurs du quotidien ; la gratitude attire souvent davantage de chance. Tenir un petit journal de chance peut vous aider à la remarquer.",
    'Quelqu’un près de vous apporte une énergie chanceuse dans votre vie. Prenez soin de cette relation ; le temps partagé peut vous élever tous les deux.',
    "Une bonne nouvelle inattendue peut arriver bientôt. Restez attentif aux appels et messages : vous pourriez recevoir des nouvelles agréables de quelqu'un avec qui vous n'aviez pas parlé depuis longtemps.",
    "Une atmosphère favorable vous entoure. Cela peut être une fenêtre propice pour un pari modeste ou une décision importante, mais le jeu imprudent n'est jamais sage.",
    "Faites attention à vos numéros et couleurs porte-bonheur. S'ils apparaissent souvent dans votre quotidien, prenez-les comme un signe positif discret. Porter une couleur porte-bonheur un jour important peut stabiliser votre état d'esprit.",
  ],
  caution: [
    "Les décisions impulsives amènent souvent des regrets ensuite. Avant une décision importante, accordez-vous au moins une journée de réflexion ; même si vous ressentez une pression pour décider vite, garder votre propre rythme est important.",
    "Accordez une attention supplémentaire à votre santé. Évitez les horaires ou charges de travail qui poussent trop votre corps. N'ignorez pas les petits symptômes et envisagez des contrôles de routine. La santé est votre plus grand actif.",
    "Les mots peuvent changer les relations très vite en ce moment. Même si vous êtes en colère, attendez que l'émotion redescende avant de parler. Les malentendus se créent facilement mais coûtent cher à réparer : écouter aide.",
    "La gestion du stress demande un soin particulier. Réservez du temps pour relâcher la tension avec du mouvement, de la méditation ou des loisirs. L'épuisement peut arriver d'un coup ; prévenir est plus sage que seulement réparer.",
    "Lisez les documents ou contrats importants plus d'une fois. Une petite clause peut devenir un gros problème. Posez des questions sur ce que vous ne comprenez pas et demandez une aide professionnelle si besoin.",
    "Ne laissez pas chaque opinion extérieure vous déstabiliser. Trop de voix peuvent embrouiller, mais la décision finale doit rester la vôtre : vous comprenez mieux votre situation.",
    "Se précipiter peut abîmer le travail. Même si vous voulez finir vite, respectez le processus. Les erreurs d'impatience font souvent perdre plus de temps que des étapes soignées. Avancez lentement et sûrement.",
    "Évitez les grandes décisions tant que les émotions sont fortes, surtout la colère ou une tristesse profonde. Quand vous serez plus calme, la même situation pourra révéler une autre réponse.",
  ],
  love: [
    "Vous pouvez être prudent dans l'expression de vos sentiments. N'ayez pas peur que votre sincérité ne soit pas reçue : essayez de parler avec le coeur. Une émotion vraie trouve souvent quelqu'un capable de l'accueillir.",
    "En amour, des attentes trop lourdes et l'attachement excessif peuvent devenir toxiques. Acceptez votre partenaire tel qu'il est et construisez un lien où vous grandissez tous les deux. Quelqu'un qui évolue avec vous peut compter davantage qu'une personne parfaite imaginée.",
    "Une énergie de nouvelle rencontre flotte dans l'air. Essayez un nouvel endroit ou une activité différente : une connexion inattendue peut apparaître. Gardez les yeux ouverts sur le monde autour de vous.",
    "Un lien existant peut passer à une nouvelle étape. Une compréhension plus profonde et une conversation honnête peuvent améliorer la relation : c'est peut-être le bon moment pour un échange important.",
    "Le temps passé seul peut vous aider à clarifier vos sentiments. Réapprenez à aimer en commençant par l'amour de soi. Vous aimer vous-même est aussi une belle manière d'aimer.",
    "Certaines relations traversent des chapitres difficiles. Pourtant, la crise peut renforcer les liens si vous gardez l'honnêteté et la volonté de construire ensemble. Patience et dialogue peuvent approfondir la relation.",
    "Votre charme rayonne en ce moment. Présentez-vous avec confiance, tel que vous êtes. L'attirance durable vient souvent plus de l'attitude et de l'énergie que de la seule apparence.",
    "L'amour peut être beau et difficile à la fois. La joie comme la tristesse en font partie. Quoi que vous ressentiez maintenant, honorez-le et laissez du temps au processus.",
  ],
  career: [
    "Un nouveau projet ou une opportunité se présente à vous. Ne reculez pas devant le défi : vous êtes plus capable que vous ne le pensez, et cette porte pourrait être faite pour vous.",
    "Vous pouvez ressentir un plateau temporaire dans votre travail ou votre carrière. Même cette période vous fait grandir. Renforcez vos bases pendant que vous préparez la prochaine étape.",
    "La coopération en équipe est importante maintenant. Laissez de côté l'envie de tout faire seul et communiquez avec les personnes autour de vous. Ensemble, vous pouvez obtenir des résultats plus solides.",
    "La reconnaissance de vos efforts approche. Une promotion ou un nouveau rôle peut apparaître : restez prêt. L'opportunité visite souvent ceux qui se sont préparés quand personne ne regardait.",
    "Le stress professionnel peut s'accumuler. Faites une pause pour prendre soin de vous. Un meilleur équilibre entre vie pro et vie perso améliore généralement les résultats, au lieu de les affaiblir.",
    "C'est un bon moment pour apprendre une nouvelle compétence ou un nouveau domaine de connaissance. Investir dans votre progression devient un avantage futur. Essayez d'apprécier le chemin de l'apprentissage.",
    "Votre passion pour le travail inspire les autres. Gardez cette énergie, mais protégez-vous de l'épuisement. Un rythme durable construit un vrai succès avec le temps.",
    "Revoyez vos tâches actuelles et cherchez de petites améliorations. Des changements minimes peuvent fortement augmenter l'efficacité. C'est peut-être le moment d'utiliser votre expérience avec plus d'intention.",
  ],
  health: [
    "La santé du corps compte, mais la santé mentale peut compter encore plus maintenant. Prenez soin de votre esprit avec la méditation, du yoga doux, une thérapie ou un repos calme : un esprit stable soutient un corps stable.",
    "Revoyez vos habitudes quotidiennes. Dormir suffisamment, bouger régulièrement et manger équilibré sont les piliers de la vitalité. De petits changements d'habitude peuvent créer de grandes améliorations de santé avec le temps.",
    "Si la fatigue chronique persiste, envisagez une aide professionnelle. Des bilans peuvent clarifier ce dont votre corps a besoin. Prévenir est souvent plus facile que réparer.",
    "Le mouvement peut vous restaurer. Pas besoin d'entraînement intense : marcher, s'étirer ou danser avec plaisir peut être un excellent départ.",
    "Le stress émotionnel peut se manifester en symptômes physiques. Faites des activités qui vous apaisent et parlez à une personne de confiance. Libérer les émotions fait aussi partie de la guérison.",
    "La santé tend à s'améliorer. Gardez les habitudes qui soutiennent cette bonne phase : la constance est l'un des meilleurs secrets du bien-être.",
    "L'alimentation est une base pratique pour une meilleure santé. Réduisez les aliments ultra-transformés quand c'est possible et ajoutez des ingrédients plus simples et naturels. Ce que vous mangez devient une part de vous.",
    "Équilibrez repos et activité. L'excès de l'un ou l'autre peut fragiliser la santé. Écoutez le rythme que votre corps et votre esprit vous demandent.",
  ],
}

// ─── Monthly fortunes (months 1–12, 1 string each) ───────────────────────────

export const monthlyFortunesFr: Record<number, string[]> = {
  1: [
    "Début d'une nouvelle année. Il est crucial de fixer des objectifs clairs et un plan d'action. Les décisions et gestes de cette période orienteront toute l'année. La chance financière favorise les investissements planifiés et l'épargne. C'est le moment de nouvelles relations. Ne laissez passer aucune opportunité.",
  ],
  2: [
    "Période de calme et de réflexion. Revisitez le mois passé et réorganisez votre stratégie. Une communication sincère compte dans les relations ; c'est un bon moment pour résoudre les malentendus. Renforcez votre immunité côté santé. La chance financière est stable, mais vous pouvez trouver des opportunités via une activité parallèle. Un mois paisible mais riche.",
  ],
  3: [
    "L'énergie des nouveaux départs revient. Comme le printemps après l'hiver, une période de croissance commence. Excellent mois pour lancer un projet ou une activité. Vous pouvez élargir votre réseau et la chance amoureuse monte. Attention à la précipitation : gardez prudence et équilibre.",
  ],
  4: [
    "Mois d'action et de changement. C'est le moment de mettre en oeuvre ce que vous avez préparé. La chance financière augmente et de nouvelles sources de revenus peuvent apparaître. Vous pouvez obtenir des résultats au travail ou dans vos affaires : concentrez votre énergie. Prenez soin de votre santé face à la surcharge et n'oubliez pas l'humilité dans les relations. La porte du succès est ouverte.",
  ],
  5: [
    "Temps de stabilité et de prospérité. Les actions d'avril donnent de bons résultats ce mois-ci. Votre situation financière s'améliore et vous pouvez accéder à une position de confiance. Les relations familiales sont harmonieuses ; bon moment pour des décisions importantes. La santé va bien, mais détendez-vous et reposez-vous assez. Les efforts de cette période paient sur le long terme.",
  ],
  6: [
    "Des vents de changement soufflent. Vous pouvez être à un point de bascule ou de choix. Évitez les changements brusques et décidez avec soin. Une conversation honnête est essentielle dans les relations ; réglez les malentendus maintenant. Une gestion financière prudente et une bonne gestion du stress sont nécessaires pour la santé. Acceptez le changement, mais abordez-le avec sagesse.",
  ],
  7: [
    "Mois de passion et d'expression. Vous pouvez exprimer opinions et sentiments plus librement. Bon moment pour des activités créatives ou de nouveaux loisirs ; la chance romantique est très élevée. N'oubliez pas la modération si l'émotion déborde. Côté finances, évitez la spéculation et privilégiez des placements stables. Mois social : vos relations avec l'entourage s'activent.",
  ],
  8: [
    "Mois de récolte et de bilan. Les efforts du premier semestre portent leurs fruits. La chance financière monte et des gains inattendus sont possibles. Les chances de reconnaissance sont élevées : ayez confiance en vous. Les liens familiaux s'approfondissent ; contrats ou négociations importantes sont favorables. Le succès de ce mois servira de base au second semestre. N'oubliez pas la gratitude.",
  ],
  9: [
    "Temps de changement et d'ordre. Vous quittez la chaleur de l'été pour plus de calme. Triez l'inutile et revoyez vos plans. Bon mois pour apprendre ou vous développer. Il favorise des relations plus profondes ; le temps seul compte aussi. La chance financière reste prudente mais avec une croissance régulière. Concentrez-vous sur votre croissance intérieure.",
  ],
  10: [
    "Mois de stabilité et de récolte. Ce qui a été préparé depuis mars arrive à maturité. La chance financière est bonne et des retours d'investissement peuvent apparaître. Favorable pour achever des projets importants au travail ou en affaires. La santé va bien et la chance générale augmente. Ne perdez pas votre humilité face au succès et prenez soin de vos relations. L'équilibre est essentiel ce mois-ci.",
  ],
  11: [
    "Mois de réflexion et de préparation. En fin d'année, mettez de l'ordre dans ce qui a été vécu et préparez la suivante. La chance financière est stable ; il est utile de rechercher des opportunités d'investissement pour l'année à venir. Exprimez votre gratitude à ceux que vous aimez. La fatigue peut s'accumuler : reposez-vous suffisamment. Trouvez la plénitude dans la réflexion intérieure et terminez l'année avec calme.",
  ],
  12: [
    "Mois de clôture et de nouveaux départs. Préparez-vous à terminer l'année et à accueillir la suivante. Faites le bilan de vos réussites et ressentez de la gratitude. Côté finances, c'est le temps des clôtures : finalisez les plans en attente. Valorisez le temps avec votre famille et vos amis, et accueillez la nouvelle année avec espoir. La préparation de cette période détermine le succès de l'année prochaine. Entrez dans la nouvelle année avec gratitude et confiance.",
  ],
}

// ─── Yearly comprehensive (13 strings) ───────────────────────────────────────

export const yearlyComprehensiveFr: string[] = [
  "Cette année ouvre un chapitre nouveau et marquant. Les premiers mois récompensent des bases solides ; de la fin du printemps à l'été, l'élan s'accélère et une fenêtre décisive apparaît. Les revenus tendent à monter : évitez les paris imprudents. Des liens authentiques se rapprochent et des alliés utiles arrivent. Un soin constant de vous-même maintient une énergie élevée ; la fin d'année se vit avec gratitude.",
  "Vos points forts deviennent visibles et gagnent en reconnaissance. La première moitié favorise des tentatives audacieuses dans de nouveaux domaines ; ce que vous décidez alors façonne les victoires du second semestre. Surveillez la période de mars à mai pour des propositions. La trésorerie reste maîtrisable et de nouvelles formes de revenus apparaissent : choisissez avec clarté. Collaboration et confiance progressent ; gérez le stress et terminez l'année avec une satisfaction solide.",
  "Une année de croissance intérieure plus que de bruit extérieur. La première moitié favorise la réflexion : triez ce que vous gardez et ce que vous laissez. Cette nouvelle perspective renforce les décisions après le milieu d'année. L'argent reste équilibré et calme ; réduisez les excès et augmentez l'épargne. Les relations deviennent plus profondes au-delà de la surface ; des pratiques apaisantes calment le corps. L'année semble discrète mais très significative.",
  "La chance et les ouvertures se concentrent cette année. L'attitude de janvier et février prépare une suite puissante dès mars. D'avril à juillet, l'élan est maximal pour les lancements et décisions courageuses. Les finances peuvent bondir : dépensez avec discipline. De nouveaux mentors et réseaux arrivent ; protégez votre santé dans le rythme. La fin d'année se sent abondante et lumineuse.",
  "Défi et croissance avancent ensemble. Apprendre et investir dans vos compétences brillent dans la première moitié ; des résultats visibles s'accumulent après l'été. Les revenus peuvent osciller, mais la tendance reste haussière : gardez la prudence. Les anciens liens se renforcent et de nouveaux visages apparaissent. Des routines actives vous maintiennent résilient ; vous montez de niveau d'ici décembre.",
  "Vous cherchez le calme et le réalignement. La première moitié nettoie le désordre et restaure l'ordre ; la seconde révèle de nouveaux angles sur d'anciennes opportunités. L'argent reste stable avec de possibles revenus complémentaires. La famille et les amis proches deviennent encore plus précieux. Repos et soin du système nerveux sont un remède : votre richesse intérieure grandit.",
  "La créativité veut s'exprimer. Le premier trimestre clarifie votre vision ; printemps et été élargissent les expérimentations : surveillez juin à septembre pour un tournant. Un travail créatif parallèle peut rapporter ; des personnes alignées accélèrent la progression. Préservez le repos pour que l'inspiration reste durable ; l'année brille avec des idées concrétisées.",
  "Maturité et perspective mènent la danse. Les premiers mois revisitent les leçons ; les derniers lancent des mouvements plus sages qu'avant. Les plans financiers à long terme portent leurs fruits. La profondeur avec la famille et les amis compte ; votre expérience aide les autres. La santé se maintient quand le rythme reste humain ; l'année se vit avec ancrage et sens.",
  "Récupération et nouveau départ, si vous en avez besoin. La première moitié soigne et recharge l'énergie ; après le milieu d'année, l'élan revient pour de nouvelles tentatives. Gardez des dépenses douces et une épargne régulière. Ceux qui vous soutiennent montrent leur valeur ; une nouvelle confiance naît. L'espoir devient plus léger en allant vers l'hiver.",
  "Saison de prospérité. Les nouveaux projets favorisent les lancements de janvier à mars ; les résultats apparaissent dès avril. Le milieu de l'été peut marquer un pic financier : choisissez avec sagesse et évitez le gaspillage. Les alliés et partenaires se multiplient ; prenez soin de votre santé pour profiter de la vague ; la fortune se montre généreuse.",
  "Le changement révèle votre valeur. Les premiers mois demandent de la flexibilité ; des portes inattendues continuent de vous orienter vers le haut. Le flux de trésorerie peut fluctuer, mais la tendance est positive : gardez des réserves. Les relations se redéfinissent ; les vrais liens se resserrent. Vous grandissez avec plus de solidité au milieu du mouvement.",
  "Les rêves rencontrent la logistique. La première moitié donne forme aux plans et attire de l'aide ; l'été montre les premières victoires et l'automne peut dépasser les objectifs. Les ressources s'alignent avec la vision si vous dépensez consciemment. Des personnes qui vous encouragent apparaissent ; espoir et fierté montent jusqu'à la fin de l'année.",
  "Communication et empathie approfondissent les liens. Le dialogue de la première moitié élargit la perspective ; les projets communs fleurissent ensuite. Des revenus liés aux relations peuvent apparaître ; les arts créatifs peuvent briller. La stabilité émotionnelle est la clé de la santé : des mois chaleureux et significatifs vous attendent.",
  "La patience finit enfin par payer. Le premier semestre reste une période de clôture d'anciens dossiers : gardez le cap, sans précipitation. Après l'été, les résultats accélèrent ; l'automne peut surprendre. Les revenus suivent des efforts en hausse ; l'intégrité gagne la confiance. Des routines saines vous mènent vers une fin d'année accomplie.",
]

// ─── Yearly detailed (5 strings) ──────────────────────────────────────────────

export const yearlyDetailedFr: string[] = [
  "Cette année marque un nouveau tournant : le premier trimestre planifie, le deuxième exécute, le troisième montre des résultats visibles et le quatrième révise. Le milieu d'année favorise des mouvements financiers clés. Gardez espoir et constance.",
  "Le travail discret gagne enfin en visibilité ; la première moitié se concentre, la seconde ouvre de nouvelles voies. Les vrais amis restent proches. La prospérité monte : utilisez la première moitié pour des décisions financières importantes.",
  "Le calme revient après des périodes agitées. La première moitié stabilise et planifie ; la seconde met en oeuvre avec patience. De nouveaux alliés vous aident. L'argent reste équilibré : de petits gains constants valent mieux que des paris risqués.",
  "La chance se concentre : de petites décisions prises tôt créent de grandes vagues ; le milieu d'année révèle votre meilleur niveau ; la fin amplifie les victoires. Investissements et tentatives penchent vers le positif : gardez énergie et gratitude.",
  "Maturation intérieure : la première moitié allège les charges, la seconde accueille de meilleures habitudes. Une pratique spirituelle ou réflexive aide. L'argent reste stable et sûr : une gestion douce suffit.",
]

// ─── Monthly detailed (12 strings) ────────────────────────────────────────────

export const monthlyDetailedFr: string[] = [
  "Janvier : énergie de nouveau départ. Clôturez l'année passée, fixez vos objectifs et purifiez corps et esprit. L'argent est stable : restez attentif aux opportunités ; ne manquez pas les nouveaux liens.",
  "Février : croissance intérieure paisible. Préparez-vous au printemps avec patience ; des échanges plus profonds peuvent émerger. L'argent est calme : appréciez le présent.",
  "Mars : la vitalité revient avec le printemps. Bon moment pour lancer vos plans ; les revenus montent : bougez avec élan et adaptez-vous à la saison.",
  "Avril : la croissance devient visible. La coopération brille ; surveillez les dépenses pendant que votre réseau s'active.",
  "Mai : passion au maximum : engagez-vous avec audace mais veillez à la fatigue. L'argent favorise de nouvelles tentatives ; prenez soin de votre santé.",
  "Juin : harmonie mature après le rythme de mai. Réfléchissez à vos relations ; l'argent reste équilibré : repos et gratitude aident.",
  "Juillet : changements et propositions arrivent : restez flexible. L'argent peut fluctuer mais reste favorable ; stabilisez vos émotions.",
  "Août : action audacieuse au coeur de l'été : décisions et équipe alignées. Les revenus peuvent bondir : gérez votre énergie.",
  "Septembre : récolte et révision : célébrez vos réussites et planifiez la prochaine étape. L'argent reconnaît les efforts passés.",
  "Octobre : profondeur automnale : l'ordre revient, les vrais amis se distinguent. L'argent se stabilise ; le calme intérieur compte.",
  "Novembre : préparez l'hiver : organisez vos comptes et votre rythme. L'argent reste stable et sûr ; évitez le surmenage.",
  "Décembre : terminez l'année avec gratitude, célébrez les victoires et fixez de nouveaux objectifs. L'argent soutient un nouveau départ serein.",
]

// ─── Lifetime detailed (6 strings) ────────────────────────────────────────────

export const lifetimeDetailedFr: string[] = [
  "Votre vie avance entre croissance et changements constants. Les premières années bâtissent des fondations avec patience ; le milieu de vie transforme l'effort en liens profonds et en patrimoine ; les dernières années donnent du sens grâce à la sagesse et à l'aide aux autres. La prospérité progresse régulièrement quand vous honorez la confiance et les relations.",
  "La créativité et le courage marquent votre chemin. L'exploration et les erreurs du début deviennent des atouts qui ouvrent une voie indépendante au milieu de la vie. Les émotions sont intenses : restez ancré auprès de personnes fiables. Les revenus peuvent fluctuer, mais le travail créatif ouvre de nouvelles sources ; le calme émotionnel soutient la santé.",
  "Une profonde sérénité vous caractérise. De l'extérieur, vous pouvez sembler réservé ; à l'intérieur, vous êtes réfléchi et gagnez en confiance. La prudence du début sème le succès au milieu de la vie et la tranquillité ensuite. Les relations se filtrent jusqu'aux alliés authentiques, votre plus grande richesse. L'argent reste stable ; équilibrez esprit et corps pour une vitalité optimale.",
  "L'action et l'exécution vous portent. Vous atteignez la plupart des objectifs que vous vous fixez ; l'élan initial devient des résultats au milieu de la vie puis du courage pour de nouveaux sauts ensuite. Une honnêteté trop directe peut créer des frictions : pratiquez l'empathie. La prospérité suit l'effort ; des routines régulières protègent la santé.",
  "Vous recherchez l'harmonie et l'équilibre. Les gens sont attirés par votre attention aux autres ; vous évoluez de l'influence vers l'indépendance. Un fort sens esthétique et l'intuition s'accordent bien avec le travail créatif. L'argent reste stable avec de nouvelles opportunités ; la paix émotionnelle est la clé de la santé.",
  "Sagesse et discernement remplissent votre parcours. Les épreuves de jeunesse deviennent une force ensuite ; l'empathie construit des liens durables. La prospérité se consolide à partir du milieu de la vie ; votre état d'esprit façonne la manière dont votre corps se sent.",
]

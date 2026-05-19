/**
 * Spanish (es) and Indonesian (id) fortune / tarot content pools.
 * Array lengths match English counterparts in fortune-templates.ts,
 * tarot-message-pools.ts, and monthly-fortunes.ts.
 */

export type EsIdPair = { es: string[]; id: string[] }

function pair(es: string[], id: string[]): EsIdPair {
  return { es, id }
}

// ─── Fallback (4 keys, 1 string each) ─────────────────────────────────────────

export const fallbackEsId: Record<'lifetime' | 'yearly' | 'monthly' | 'general', EsIdPair> = {
  lifetime: pair(
    [
      'Tu vida avanza entre crecimiento y cambio constantes. Los primeros años piden paciencia y bases sólidas; la mitad de la vida da fruto al esfuerzo; los años posteriores vuelcan sabiduría y experiencia hacia ayudar a otros.',
    ],
    [
      'Hidupmu mengalir lewat pertumbuhan dan perubahan yang stabil. Tahun-tahun awal menuntut kesabaran dan fondasi; pertengahan hidup memetik hasil usaha; tahun-tahun kemudian mengarahkan kebijaksanaan dan pengalaman untuk membantu orang lain.',
    ],
  ),
  yearly: pair(
    [
      'Este año trae oportunidades frescas y cambio. La primera mitad favorece la planificación y la preparación; la segunda recoge los resultados de lo que has construido. Mantén la esperanza y sigue intentándolo.',
    ],
    [
      'Tahun ini membawa peluang baru dan perubahan. Semester pertama mendukung perencanaan dan persiapan; semester kedua mengumpulkan hasil dari apa yang telah kamu bangun. Tetaplah berharap dan terus berusaha.',
    ],
  ),
  monthly: pair(
    [
      'Este mes lleva la energía de un nuevo comienzo. Es buen momento para avanzar con tus planes y calentar las relaciones. Quédate presente con lo que importa ahora.',
    ],
    [
      'Bulan ini membawa energi awal yang baru. Waktu yang baik untuk melanjutkan rencana dan mempererat hubungan. Hadir sepenuhnya pada hal yang penting sekarang.',
    ],
  ),
  general: pair(
    [
      'Nuevas posibilidades están abiertas para ti ahora. Avanza con fe. El esfuerzo que inviertas encontrará su recompensa.',
    ],
    [
      'Kemungkinan baru terbuka untukmu sekarang. Majulah dengan keyakinan. Usaha yang kamu tanamkan akan menemukan balasannya.',
    ],
  ),
}

// ─── Category template pools (10 strings each) ────────────────────────────────

export const templatePoolsEsId: Record<
  'love' | 'wealth' | 'career' | 'health' | 'opportunity' | 'warning' | 'relationship',
  EsIdPair
> = {
  love: pair(
    [
      'La suerte en el amor está en alza: pueden aparecer nuevos encuentros.',
      'Valora el vínculo que tienes; un pequeño gesto puede crecer en amor profundo.',
      'Es momento de expresar lo que sientes: comparte tu corazón con honestidad.',
      'Mientras esperas, la alegría inesperada aún puede encontrarte.',
      'Si hay alguien que te gusta, da un paso valiente: las señales son positivas.',
      'La relación está en un punto de inflexión: profundízala con el diálogo.',
      'Cuida el tiempo con tu pareja: sentirás el valor de estar juntos.',
      'Cuidar el presente importa más que perseguir a alguien nuevo.',
      'El romance necesita cuidado ahora: evita decisiones impulsivas.',
      'Si estás soltero o soltera, ámate primero: ahí está tu verdadero encanto.',
    ],
    [
      'Keberuntungan cinta sedang naik—pertemuan baru mungkin muncul.',
      'Hargai ikatan yang ada; kebaikan kecil bisa tumbuh menjadi cinta yang dalam.',
      'Ini waktunya mengekspresikan perasaan—bagikan isi hatimu dengan jujur.',
      'Saat menunggu, kegembiraan tak terduga masih bisa datang.',
      'Jika ada orang yang kamu sukai, ambil langkah berani—sinyalnya positif.',
      'Hubungan berada di titik balik—perdalam melalui dialog.',
      'Hargai waktu bersama pasangan—kamu akan merasakan nilai kebersamaan.',
      'Merawat yang ada kini lebih penting daripada mengejar seseorang yang baru.',
      'Romansa perlu perhatian sekarang—hindari keputusan terburu-buru.',
      'Jika masih sendiri, cintai dirimu dulu—itulah daya tarikmu yang sejati.',
    ],
  ),
  wealth: pair(
    [
      'La suerte financiera sube: pueden surgir nuevas fuentes de ingreso.',
      'Importa una gestión consciente del dinero; reduce gastos innecesarios.',
      'Un aumento o bono puede llegar antes de lo que esperas.',
      'Aborda las inversiones con calma; los planes a largo plazo funcionan mejor.',
      'Las oportunidades de dinero pueden llamar dos veces: no pierdas la primera.',
      'Buen momento para aumentar el ahorro y preparar el futuro.',
      'Proyectos paralelos o trabajo freelance pueden sumar ingresos útiles.',
      'El flujo de dinero se mantiene estable: conserva tu plan actual.',
      'Pueden aparecer gastos imprevistos: guarda un colchón de efectivo.',
      'Personas que te apoyan mejoran tu panorama económico.',
    ],
    [
      'Keberuntungan keuangan naik—peluang penghasilan baru mungkin muncul.',
      'Kelola uang dengan sadar; kurangi pengeluaran yang tidak perlu.',
      'Kenaikan gaji atau bonus bisa datang lebih cepat dari perkiraan.',
      'Investasi perlu hati-hati; rencana jangka panjang paling efektif.',
      'Peluang uang bisa datang dua kali—jangan lewatkan yang pertama.',
      'Waktu yang kuat untuk menambah tabungan dan menyiapkan masa depan.',
      'Proyek sampingan atau pekerja lepas bisa menambah pemasukan.',
      'Aliran keuangan stabil—pertahankan rencana yang ada.',
      'Tagihan tak terduga mungkin muncul—sisihkan dana darurat.',
      'Orang yang membantu memperbaiki prospek keuanganmu.',
    ],
  ),
  career: pair(
    [
      'La suerte laboral sube: puede llegar un ascenso u ofertas sólidas.',
      'Concéntrate en el trabajo actual; los resultados serán notados.',
      'El trabajo en equipo importa ahora: la colaboración es clave del éxito.',
      'Buen momento para iniciar un reto nuevo y audaz.',
      'Invierte en habilidades: la capacidad define tu futuro.',
      'La satisfacción en tu puesto actual puede crecer.',
      'Si piensas en un cambio, decide con cuidado.',
      'La creatividad en el trabajo destaca ahora.',
      'Mejoran las relaciones con el liderazgo; la confianza se construye.',
      'El éxito del proyecto está al alcance.',
    ],
    [
      'Keberuntungan karier naik—promosi atau tawaran kuat mungkin datang.',
      'Fokus pada pekerjaan saat ini; hasil akan terlihat.',
      'Kerja tim penting sekarang—kolaborasi adalah kunci sukses.',
      'Waktu yang baik untuk memulai tantangan baru yang berani.',
      'Investasikan pada keterampilan—kemampuan membentuk masa depanmu.',
      'Kepuasan di tempat kerja saat ini bisa meningkat.',
      'Jika mempertimbangkan pindah, putuskan dengan hati-hati.',
      'Kreativitas di tempat kerja menonjol sekarang.',
      'Hubungan dengan pimpinan membaik; kepercayaan terbangun.',
      'Keberhasilan proyek sudah di depan mata.',
    ],
  ),
  health: pair(
    [
      'La salud va bien: la energía se siente luminosa.',
      'El ejercicio y la alimentación regulares importan; crea hábitos sanos.',
      'Gestiona el estrés: el descanso o una práctica tranquila ayudan.',
      'La inmunidad puede bajar; enfócate en la prevención.',
      'Cuidado con lesiones o malestar: muévete con prudencia.',
      'Buen momento para chequeos y revisiones.',
      'Equilibra cuerpo y mente.',
      'La energía sube: aprovecha este tramo.',
      'Si tienes algo crónico, mantén el cuidado constante.',
      'Duerme lo suficiente: sostiene todo lo demás.',
    ],
    [
      'Keberuntungan kesehatan kuat—energi terasa cerah.',
      'Olahraga dan pola makan teratur penting; bangun kebiasaan sehat.',
      'Kelola stres—istirahat atau latihan tenang membantu.',
      'Imunitas mungkin menurun; fokus pada pencegahan.',
      'Waspadai cedera atau sakit—bergeraklah dengan hati-hati.',
      'Waktu yang baik untuk pemeriksaan kesehatan.',
      'Seimbangkan tubuh dan pikiran.',
      'Energi naik—manfaatkan periode ini.',
      'Jika ada kondisi kronis, jaga perawatannya konsisten.',
      'Tidur cukup—itu menopang segalanya.',
    ],
  ),
  opportunity: pair(
    [
      'Las buenas oportunidades pueden llegar más de una vez.',
      'Una sola decisión puede cambiar tu camino de forma grande.',
      'Un encuentro inesperado puede cambiar tu historia.',
      'Lo que hagas ahora moldea lo que viene después.',
      'Las oportunidades pasan rápido: hace falta juicio ágil.',
      'Mira bien a tu alrededor: la puerta ya está cerca.',
      'Las decisiones valientes tienden al éxito.',
      'El esfuerzo pasado por fin da fruto.',
      'El momento favorece un nuevo comienzo.',
      'Aliados útiles multiplican tus posibilidades.',
    ],
    [
      'Peluang baik mungkin datang lebih dari sekali.',
      'Satu keputusan bisa mengubah jalurmu secara besar.',
      'Pertemuan tak terduga bisa mengubah kisah hidupmu.',
      'Tindakanmu sekarang membentuk apa yang akan datang.',
      'Peluang berlalu cepat—penilaian harus tanggap.',
      'Perhatikan sekitar dengan saksama—peluang sudah dekat.',
      'Pilihan berani cenderung menuju kesuksesan.',
      'Usaha masa lalu akhirnya berbuah.',
      'Waktunya mendukung awal yang baru.',
      'Sekutu yang membantu memperbanyak peluangmu.',
    ],
  ),
  warning: pair(
    [
      'La cautela importa: evita decisiones apresuradas.',
      'Los tratos de dinero llevan riesgo de fraude: verifica todo.',
      'Puede haber tensión en las relaciones: cuida la comunicación.',
      'La salud necesita atención: los chequeos regulares ayudan.',
      'Las decisiones grandes ganan con más tiempo: piénsalo dos veces.',
      'Lee promesas y contratos línea por línea.',
      'No dejes que las emociones dirijan decisiones importantes: mantén la razón.',
      'Revisa con cuidado nuevos negocios o inversiones.',
      'Evita mezclar dinero con amigos cercanos si puedes.',
      'No te excedas: protege tu cuerpo y tu concentración.',
    ],
    [
      'Kehati-hatian penting—hindari keputusan terburu-buru.',
      'Transaksi uang berisiko penipuan—verifikasi semuanya.',
      'Ketegangan mungkin muncul dalam hubungan—jaga komunikasi yang baik.',
      'Kesehatan perlu perhatian—pemeriksaan rutin membantu.',
      'Keputusan besar butuh waktu lebih—pikirkan dua kali.',
      'Baca janji dan kontrak baris demi baris.',
      'Jangan biarkan emosi mengarahkan keputusan besar—tetap rasional.',
      'Tinjau usaha atau investasi baru dengan saksama.',
      'Hindari mencampur uang dengan teman dekat jika bisa.',
      'Jangan memaksakan diri—lindungi tubuh dan fokusmu.',
    ],
  ),
  relationship: pair(
    [
      'Los lazos familiares pueden calentarse ahora.',
      'Hace falta una charla profunda con un amigo o una amiga.',
      'Contacta a un viejo amigo: puede llegar buena noticia.',
      'Se forman círculos nuevos: busca personas que te eleven.',
      'Mayores y menores te enseñan algo útil.',
      'En equipo, el liderazgo constante es recompensado.',
      'Un vínculo tenso puede sanar si lo intentas.',
      'Quienes te rodean juegan un papel más grande de lo que crees.',
      'Hacer red importa: preséntate y conecta.',
      'Valora las relaciones que ya tienes.',
    ],
    [
      'Ikatan keluarga bisa semakin hangat sekarang.',
      'Percakapan mendalam dengan teman sudah waktunya.',
      'Hubungi teman lama—kabar baik mungkin menyusul.',
      'Lingkaran baru terbentuk—cari orang yang mengangkatmu.',
      'Senior dan junior sama-sama mengajarkan hal berguna.',
      'Di tim, kepemimpinan yang stabil dihargai.',
      'Hubungan yang tegang bisa pulih jika kamu mencoba.',
      'Orang di sekitarmu berperan lebih besar dari yang kamu kira.',
      'Jaringan penting—hadir dan terhubung.',
      'Hargai hubungan yang sudah kamu miliki.',
    ],
  ),
}

// ─── Tarot message pools (8 strings each) ─────────────────────────────────────

export const tarotPoolsEsId: Record<
  'total' | 'wealth' | 'luck' | 'caution' | 'love' | 'career' | 'health',
  EsIdPair
> = {
  total: pair(
    [
      'Tu intuición está más aguda de lo habitual. En la próxima decisión importante, escucha tu corazón tanto como tu cabeza. La respuesta ya está dentro de ti. Los consejos externos ayudan, pero la elección final debe salir de ti.',
      'Una puerta de nueva oportunidad está abierta de par en par. El esfuerzo que has construido está por dar fruto: da un paso valiente hacia esa puerta sin miedo. El cambio puede asustar, pero lo que anhelas puede estar al otro lado.',
      'Lo que vives ahora es temporal. Recuerda: cuanto más profunda es la noche, más cerca está el amanecer. Después de resistir, conocerás una versión más fuerte de ti. Lo que más necesitas ahora es paciencia y confianza en ti mismo o en ti misma.',
      'El trabajo constante que has invertido por fin está listo para brillar. La gente empezará a ver tu verdadero valor, y el reconocimiento puede llegar de un lugar inesperado. Mantente humilde y evita la complacencia.',
      'Las relaciones se están convirtiendo en una llave maestra en tu vida. Mira a familia, amigos y colegas; reconecta donde te hayas distanciado. La abundancia verdadera suele venir de los vínculos con las personas, no solo de las cosas.',
      'Tu voz interior lleva un mensaje importante. Pausa la rutina agitada; la meditación o un paseo pueden abrir una conversación real contigo. Puedes encontrar respuestas que buscabas desde hace tiempo.',
      'El cambio puede dar miedo, pero lo que se despliega ahora es para tu crecimiento. Suelta lo demasiado familiar y ábrete a lo nuevo. Una mejor versión de ti espera al otro lado de este giro.',
      'Es temporada de preparar más que de apresurarse. Si tienes un gran plan, revisa los detalles con cuidado. La preparación minuciosa decide gran parte del éxito. Saber esperar también es una habilidad.',
    ],
    [
      'Intuisimu lebih tajam dari biasanya. Untuk keputusan penting berikutnya, dengarkan hatimu sebanyak pikiranmu. Jawabannya sudah ada di dalam dirimu. Nasihat luar bisa membantu, tetapi pilihan akhir harus datang dari dalam.',
      'Pintu peluang baru terbuka lebar. Usaha yang telah kamu bangun akan segera berbuah—ambil satu langkah berani menuju pintu itu tanpa rasa takut. Perubahan bisa menakutkan, tetapi yang kamu dambakan mungkin menunggu di sisi lainnya.',
      'Yang kamu alami sekarang bersifat sementara. Ingat: semakin gelap malam, semakin dekat fajar. Setelah bertahan, kamu akan bertemu versi dirimu yang lebih kuat. Yang paling kamu butuhkan sekarang adalah kesabaran dan kepercayaan pada diri sendiri.',
      'Kerja konsisten yang telah kamu investasikan akhirnya siap bersinar. Orang akan mulai melihat nilai sejatimu, dan pengakuan bisa datang dari tempat tak terduga. Tetaplah rendah hati dan hindari sombong.',
      'Hubungan menjadi kunci utama dalam hidupmu. Tinjau keluarga, teman, dan rekan—hubungkan kembali jika ada yang merenggang. Kekayaan sejati sering datang dari ikatan dengan orang, bukan hanya dari benda.',
      'Suara batinmu membawa pesan penting. Jeda rutinitas yang sibuk; meditasi atau berjalan bisa membuka percakapan nyata dengan diri sendiri. Kamu mungkin menemukan jawaban yang lama dicari.',
      'Perubahan bisa terasa menakutkan, tetapi yang terjadi sekarang dimaksudkan untuk pertumbuhanmu. Lepaskan yang terlalu familiar dan buka diri pada yang baru. Versi dirimu yang lebih baik menunggu di balik pergeseran ini.',
      'Ini musim untuk mempersiapkan, bukan terburu-buru. Jika ada rencana besar, periksa detailnya dengan teliti. Persiapan menyeluruh menentukan sebagian besar kesuksesan. Menunggu dengan baik juga merupakan keterampilan.',
    ],
  ),
  wealth: pair(
    [
      'Estás en un punto de inflexión financiero importante. Controla los gastos, pero invierte con valor donde haya valor real. Ser demasiado conservador puede hacer perder oportunidades; ser demasiado agresivo puede exponerte al riesgo. Ahora importa una estrategia equilibrada.',
      'La oportunidad financiera puede llegar por una dirección inesperada. Buenas noticias pueden venir por intereses o contactos que ya tienes: revisa propuestas nuevas con mente abierta, pero no te apresures sin la debida diligencia.',
      'Es momento de ver el dinero con mirada a largo plazo. Enfócate más en ahorrar e invertir para el futuro que en ganancias rápidas. Las semillas que plantes ahora pueden crecer mucho con los años. Confía en el poder silencioso del interés compuesto.',
      'Vale la pena pensar en serio un proyecto paralelo o una nueva fuente de ingreso. Un hobby o fortaleza podría convertirse en ingresos. Un primer paso pequeño aún puede iniciar un gran cambio: intenta darlo.',
      'La suerte del dinero sube, pero las entradas aún necesitan disciplina. No gastes con descuido solo porque el efectivo fluye más rápido. Registra ingresos y gastos con claridad: apps o un cuaderno simple pueden ayudarte.',
      'Antes de decisiones financieras grandes, investiga a fondo y busca consejo experto cuando haga falta. El juicio frío vence al impulso ahora. Lee la letra pequeña y asegúrate de entender los términos del contrato.',
      'Encuentra equilibrio entre ahorrar y gastar. La austeridad extrema puede bajar tu calidad de vida; el gasto excesivo puede dañar la estabilidad futura. Separa necesidades de deseos y practica un consumo consciente.',
      'Da lo mejor en el trabajo que tienes delante. La constancia suele volver como recompensa financiera. Pueden acercarse ascenso o bono, y tu esfuerzo tiene más probabilidades de ser reconocido.',
    ],
    [
      'Kamu berada di titik balik keuangan yang penting. Kelola pengeluaran, tetapi berani berinvestasi di tempat yang benar-benar berharga. Terlalu konservatif bisa berarti kehilangan peluang; terlalu agresif bisa mengekspos risiko. Strategi uang yang seimbang penting sekarang.',
      'Peluang keuangan mungkin datang dari arah tak terduga. Kabar baik bisa lewat minat atau koneksi yang sudah ada—tinjau proposal baru dengan pikiran terbuka, tetapi jangan terburu-buru tanpa uji tuntas.',
      'Ini waktu melihat uang dengan lensa jangka panjang. Fokus pada menabung dan berinvestasi untuk masa depan lebih dari kemenangan cepat. Benih yang kamu tanam sekarang bisa tumbuh besar dalam beberapa tahun. Percayalah pada kekuatan bunga majemuk.',
      'Proyek sampingan atau sumber penghasilan baru layak dipikirkan serius. Hobi atau kekuatan bisa berubah menjadi pendapatan. Langkah pertama kecil tetap bisa memulai perubahan besar—cobalah mengambilnya.',
      'Keberuntungan uang sedang naik, tetapi arus masuk tetap butuh disiplin. Jangan boros hanya karena uang bergerak lebih cepat. Catat pemasukan dan pengeluaran dengan jelas—aplikasi atau buku catatan sederhana bisa membantu.',
      'Sebelum keputusan uang besar, risetlah menyeluruh dan minta nasihat ahli bila perlu. Penilaian dingin mengalahkan dorongan sekarang. Baca ketentuan kecil dan pastikan kamu benar-benar memahami kontrak.',
      'Temukan keseimbangan antara menabung dan membelanjakan. Hemat berlebihan bisa menurunkan kualitas hidup; boros bisa merusak stabilitas masa depan. Pisahkan kebutuhan dari keinginan dan praktikkan konsumsi yang sadar.',
      'Berikan yang terbaik pada pekerjaan di depanmu. Ketekunan cenderung kembali sebagai imbalan finansial. Promosi atau bonus mungkin dekat, dan usahamu lebih mungkin diakui.',
    ],
  ),
  luck: pair(
    [
      'Tu energía positiva está atrayendo la buena fortuna. Cuando pase algo bueno, compártelo con quienes te rodean: la generosidad puede amplificar la suerte. Una pequeña amabilidad puede volver como suerte inesperada.',
      'Un encuentro casual o una conversación puede ser un punto de inflexión. Abre el corazón a gente nueva y visita lugares que rara vez vas. Puede haber una conexión significativa esperándote.',
      'La suerte está de tu lado hoy. Es buen día para tareas que has pospuesto o para un intento nuevo. La fortuna favorece a quien se prepara: cuando aparezca la oportunidad, tómala.',
      'Pequeños golpes de suerte pueden acumularse en alegría real. Practica gratitud por la felicidad cotidiana; la gratitud suele invitar más suerte. Llevar un diario simple de “suerte” puede ayudarte a notarla.',
      'Alguien cerca de ti trae energía afortunada para ti. Cuida esa relación; el tiempo juntos puede elevaros a ambos.',
      'Puede llegar pronto una buena noticia inesperada. Estate atento a llamadas y mensajes: podrías tener noticias agradables de alguien con quien no hablabas hace tiempo.',
      'Una atmósfera afortunada te rodea. Puede ser una ventana favorable para un boleto modesto o una decisión importante, pero el juego imprudente nunca es sabio.',
      'Fíjate en tus números y colores de la suerte. Si aparecen a menudo en la vida diaria, tómalo como buen signo suave. Llevar un color de la suerte en un día importante puede estabilizar tu ánimo.',
    ],
    [
      'Energi positifmu menarik keberuntungan baik. Saat sesuatu yang baik terjadi, bagikan dengan orang di sekitarmu—kemurahan hati bisa memperkuat keberuntungan. Kebaikan kecil bisa kembali sebagai keberuntungan tak terduga.',
      'Pertemuan kebetulan atau percakapan bisa menjadi titik balik. Buka hati pada orang baru dan kunjungi tempat yang jarang kamu datangi. Ikatan bermakna mungkin sedang menunggu.',
      'Keberuntungan condong ke sisimu hari ini. Hari yang baik untuk tugas yang ditunda atau percobaan baru. Keberuntungan menyukai yang siap—saat peluang muncul, raihlah.',
      'Keberuntungan kecil bisa menumpuk menjadi sukacita nyata. Latih rasa syukur untuk kebahagiaan sehari-hari; rasa syukur sering mengundang lebih banyak keberuntungan. Menulis “buku harian keberuntungan” sederhana bisa membantu kamu melihatnya.',
      'Seseorang di dekatmu membawa energi keberuntungan untukmu. Hargai hubungan itu; waktu bersama bisa mengangkat kalian berdua.',
      'Kabar baik tak terduga mungkin segera datang. Perhatikan panggilan dan pesan—kamu mungkin mendengar kabar menyenangkan dari seseorang yang lama tak dihubungi.',
      'Suasana beruntung mengelilingimu. Ini bisa jadi waktu yang baik untuk tiket lotre kecil atau keputusan penting—namun judi sembrono tidak pernah bijak.',
      'Perhatikan angka dan warna keberuntunganmu. Jika sering muncul dalam kehidupan sehari-hari, anggap sebagai pertanda baik yang lembut. Memakai warna keberuntungan pada hari penting bisa menenangkan pikiran.',
    ],
  ),
  caution: pair(
    [
      'Las decisiones impulsivas suelen traer arrepentimiento después. Antes de una decisión importante, date al menos un día para pensar; aunque sientas presión por decidir rápido, mantener tu propio ritmo importa.',
      'Presta atención extra a la salud. Evita horarios o cargas de trabajo que empujen demasiado tu cuerpo. No ignores síntomas pequeños y considera chequeos de rutina. La salud es tu mayor activo.',
      'Las palabras pueden cambiar las relaciones rápido ahora. Aunque estés enojado o enojada, espera a que baje la emoción antes de hablar. Los malentendidos se forman fácil pero cuestan arreglar: escuchar ayuda.',
      'La gestión del estrés necesita cuidado especial. Reserva tiempo para soltar tensión con movimiento, meditación o hobbies. El agotamiento puede llegar de golpe; prevenir es más sabio que solo recuperarse.',
      'Lee documentos o contratos importantes más de una vez. Una sola cláusula pequeña puede volverse un gran problema. Pregunta lo que no entiendas y pide ayuda profesional si hace falta.',
      'No dejes que cada opinión externa te sacuda. Muchas voces pueden confundir, pero la decisión final debe ser tuya: tú entiendes mejor tu situación.',
      'Apresurarse puede estropear el trabajo. Aunque quieras terminar rápido, respeta el proceso. Los errores por impaciencia suelen desperdiciar más tiempo que los pasos cuidadosos. Ve despacio y seguro.',
      'Evita decisiones grandes mientras las emociones estén altas, sobre todo ira o tristeza profunda. Cuando te sientas más calmado o calmada, la misma situación puede mostrar otra respuesta.',
    ],
    [
      'Pilihan impulsif sering menimbulkan penyesalan kemudian. Sebelum keputusan besar, beri diri setidaknya sehari untuk berpikir—meski merasa ditekan untuk cepat memutuskan, menjaga ritmemu sendiri penting.',
      'Perhatikan kesehatan ekstra. Hindari jadwal atau beban kerja yang memaksakan tubuh. Jangan abaikan gejala kecil, pertimbangkan pemeriksaan rutin. Kesehatan adalah aset terbesarmu.',
      'Kata-kata bisa mengubah hubungan dengan cepat sekarang. Meski marah, tunggu emosi mereda sebelum berbicara. Kesalahpahaman mudah terbentuk tetapi sulit diperbaiki—mendengarkan membantu.',
      'Manajemen stres butuh perhatian khusus. Luangkan waktu melepaskan ketegangan lewat gerak, meditasi, atau hobi. Burnout bisa datang tiba-tiba; pencegahan lebih bijak daripada hanya pulih.',
      'Baca dokumen atau kontrak penting lebih dari sekali. Satu klausul kecil bisa menjadi masalah besar. Tanyakan apa yang tidak jelas, dan minta bantuan profesional bila perlu.',
      'Jangan biarkan setiap pendapat luar menggoyahkanmu. Banyak suara bisa membingungkan, tetapi keputusan akhir harus milikmu—kamu paling memahami situasimu.',
      'Terburu-buru bisa merusak pekerjaan. Meski ingin cepat selesai, hormati prosesnya. Kesalahan karena tidak sabar sering membuang lebih banyak waktu daripada langkah hati-hati. Perlahan dan pasti.',
      'Hindari keputusan besar saat emosi memuncak, terutama amarah atau kesedihan dalam. Saat lebih tenang, situasi yang sama mungkin menunjukkan jawaban berbeda.',
    ],
  ),
  love: pair(
    [
      'Puede que seas cuidadoso o cuidadosa al mostrar sentimientos. No temas que la sinceridad no llegue a la otra persona: intenta hablar desde el corazón. La emoción verdadera suele encontrar quien pueda recibirla.',
      'En el amor, expectativas pesadas y aferramiento pueden envenenar. Acepta a tu pareja como es y construye un vínculo donde ambos crezcan. Alguien que crece contigo puede importar más que una persona “perfecta” imaginada.',
      'Hay energía de un encuentro nuevo en el aire. Prueba un lugar o actividad nueva: puede aparecer una conexión inesperada. Mantén los ojos abiertos al mundo que te rodea.',
      'Un vínculo existente puede pasar a una nueva etapa. Comprensión más profunda y charla honesta pueden mejorar la relación: puede ser buen momento para una conversación importante.',
      'El tiempo a solas puede ayudarte a ordenar tus sentimientos. Reaprende a amar empezando por el amor propio. Amarte a ti mismo o a ti misma también es una forma hermosa de amar.',
      'Algunas relaciones pasan por capítulos difíciles. Aun así, la crisis puede forjar lazos más fuertes si mantienes honestidad y disposición a trabajar. La paciencia y el diálogo pueden profundizar el vínculo.',
      'Tu encanto brilla ahora. Preséntate con confianza como eres. La atracción duradera suele venir más de la actitud y la energía que de la superficie sola.',
      'El amor puede ser hermoso y difícil. La alegría y la tristeza son parte de él. Lo que sientas ahora, honóralo y dale tiempo.',
    ],
    [
      'Kamu mungkin hati-hati menunjukkan perasaan. Jangan takut kejujuran tidak sampai—cobalah berbicara dari hati. Emosi sejati cenderung menemukan seseorang yang bisa menerimanya.',
      'Dalam cinta, ekspektasi berat dan melekat bisa menjadi racun. Terima pasangan apa adanya dan bangun ikatan di mana kalian sama-sama tumbuh. Seseorang yang tumbuh bersamamu bisa lebih berarti daripada sosok “sempurna” yang dibayangkan.',
      'Energi pertemuan baru terasa di udara. Coba tempat atau aktivitas baru—koneksi tak terduga mungkin muncul. Jaga mata terbuka pada dunia sekitar.',
      'Ikatan yang ada bisa naik ke tahap baru. Pemahaman lebih dalam dan obrolan jujur bisa meningkatkan hubungan—ini bisa jadi waktu baik untuk percakapan penting.',
      'Waktu sendiri membantu merapikan perasaan. Belajar lagi mencintai dengan memulai dari cinta diri. Mencintai diri sendiri juga bentuk cinta yang indah.',
      'Beberapa hubungan melewati bab sulit. Namun krisis bisa memperkuat ikatan jika kamu tetap jujur dan mau bekerja. Kesabaran dan dialog bisa memperdalam hubungan.',
      'Pesonamu bersinar sekarang. Tampillah dengan percaya diri sebagai dirimu. Daya tarik yang bertahan sering datang dari sikap dan energi, bukan hanya penampilan.',
      'Cinta bisa indah sekaligus sulit. Sukacita dan duka sama-sama bagian darinya. Apa pun yang kamu rasakan sekarang, hormatilah dan beri waktu.',
    ],
  ),
  career: pair(
    [
      'Un proyecto u oportunidad nueva aparece frente a ti. No te encojas ante el reto: eres más capaz de lo que crees, y esta puerta puede estar hecha para ti.',
      'Puedes sentir una meseta temporal en el trabajo o la carrera. Aun esta temporada te está haciendo crecer. Fortalece bases mientras preparas el siguiente paso.',
      'La cooperación en equipo importa ahora. Deja el impulso de hacerlo todo solo y comunícate con quienes te rodean. Juntos pueden lograr resultados más fuertes.',
      'El reconocimiento por tu esfuerzo se acerca. Puede aparecer ascenso o un rol nuevo: mantente listo o lista. La oportunidad suele visitar a quien se preparó cuando nadie miraba.',
      'El estrés laboral puede acumularse. Pausa para cuidarte. Un equilibrio más sano entre trabajo y vida suele mejorar los resultados, no debilitarlos.',
      'Es buen momento para aprender una habilidad o un cuerpo de conocimiento nuevo. Invertir en crecimiento se vuelve ventaja futura. Intenta disfrutar el camino del aprendizaje.',
      'Tu pasión por el trabajo inspira a otros. Mantén esa energía, pero cuídate del agotamiento. El impulso sostenible construye éxito real con el tiempo.',
      'Revisa tus tareas actuales y busca mejoras pequeñas. Cambios mínimos pueden elevar mucho la eficiencia. Puede ser momento de usar tu experiencia con más intención.',
    ],
    [
      'Proyek atau peluang baru muncul di depanmu. Jangan mundur dari tantangan—kamu lebih mampu dari yang kamu kira, dan pintu ini mungkin dibuat untukmu.',
      'Kamu mungkin merasakan plateau sementara dalam pekerjaan atau karier. Bahkan musim ini tetap menumbuhkanmu. Perkuat fondasi sambil menyiapkan langkah berikutnya.',
      'Kerja sama tim penting sekarang. Singkirkan keinginan melakukan semuanya sendiri dan berkomunikasi dengan orang di sekitar. Bersama kalian bisa menghasilkan hasil yang lebih kuat.',
      'Pengakuan atas usahamu semakin dekat. Promosi atau peran baru mungkin muncul—tetaplah siap. Peluang cenderung mengunjungi mereka yang mempersiapkan diri saat tak ada yang melihat.',
      'Stres kerja mungkin menumpuk. Berhentilah sejenak untuk merawat diri. Keseimbangan yang lebih sehat antara kerja dan hidup sering memperbaiki hasil, bukan melemahkannya.',
      'Ini waktu yang baik untuk mempelajari keterampilan atau pengetahuan baru. Investasi pada pertumbuhan menjadi daya unggul masa depan. Nikmati perjalanan belajar itu sendiri.',
      'Gairahmu pada pekerjaan menginspirasi orang lain. Pertahankan energi itu, tetapi waspadai kelelahan. Dorongan berkelanjutan membangun kesuksesan nyata seiring waktu.',
      'Tinjau tugas saat ini dan cari perbaikan kecil. Perubahan kecil bisa meningkatkan efisiensi banyak. Mungkin saatnya memanfaatkan pengalamanmu dengan lebih sengaja.',
    ],
  ),
  health: pair(
    [
      'La salud del cuerpo importa, pero la salud mental puede importar aún más ahora. Cuida tu mente con meditación, yoga suave, terapia o descanso tranquilo: una mente estable sostiene un cuerpo estable.',
      'Revisa tus hábitos diarios. Dormir lo suficiente, moverte con regularidad y comer de forma equilibrada son pilares de la vitalidad. Pequeños cambios de hábito pueden crear grandes cambios de salud con el tiempo.',
      'Si la fatiga crónica persiste, considera ayuda profesional. Los chequeos pueden aclarar lo que tu cuerpo necesita. Prevenir suele ser más fácil que reparar.',
      'El movimiento puede restaurarte. No hace falta entrenamiento pesado: caminar, estirar o bailar con gusto puede ser un buen comienzo.',
      'El estrés emocional puede manifestarse en síntomas físicos. Haz cosas que te calmen y habla con alguien de confianza. Soltar emociones es parte de sanar.',
      'La salud tiende a mejorar. Mantén los hábitos que apoyan esta buena fase: la constancia es uno de los mejores “secretos” del bienestar.',
      'La comida es una línea de partida práctica para mejor salud. Reduce alimentos ultraprocesados cuando puedas y suma ingredientes más simples y naturales. Lo que comes se vuelve parte de ti.',
      'Equilibra descanso y actividad. Demasiado de cualquiera puede inquietar la salud. Escucha el ritmo que tu cuerpo y tu mente están pidiendo.',
    ],
    [
      'Kesehatan tubuh penting, tetapi kesehatan mental mungkin lebih penting sekarang. Rawat pikiran lewat meditasi, yoga ringan, konseling, atau istirahat tenang—pikiran stabil menopang tubuh yang stabil.',
      'Tinjau kebiasaan harian. Tidur cukup, gerak teratur, dan makan seimbang adalah pilar vitalitas. Perubahan kecil pada kebiasaan bisa menciptakan perubahan kesehatan besar seiring waktu.',
      'Jika kelelahan kronis bertahan, pertimbangkan bantuan profesional. Pemeriksaan bisa memperjelas apa yang tubuh butuhkan. Pencegahan sering lebih mudah daripada perbaikan.',
      'Gerak bisa memulihkanmu. Tidak perlu latihan berat—berjalan, peregangan, atau menari yang kamu nikmati bisa menjadi awal yang kuat.',
      'Stres emosional bisa muncul sebagai gejala fisik. Lakukan hal yang menenangkan dan bicara dengan orang yang dipercaya. Melepaskan perasaan adalah bagian dari penyembuhan.',
      'Kesehatan cenderung membaik. Pertahankan kebiasaan yang mendukung fase baik ini—konsistensi adalah salah satu “rahasia” kesejahteraan terbaik.',
      'Makanan adalah garis start praktis untuk kesehatan lebih baik. Kurangi makanan ultra-proses jika bisa dan tambahkan bahan yang lebih utuh dan sederhana. Apa yang kamu makan menjadi bagian dari dirimu.',
      'Seimbangkan istirahat dan aktivitas. Terlalu banyak salah satu bisa mengganggu kesehatan. Dengarkan ritme yang tubuh dan pikiranmu minta.',
    ],
  ),
}

// ─── Monthly fortunes (months 1–12, 1 string each) ───────────────────────────

export const monthlyFortunesEsId: Record<number, EsIdPair> = {
  1: pair(
    [
      'Comienzo de un año nuevo. Es crucial fijar metas claras y planes de acción. Las decisiones y actos de este periodo marcarán la dirección de todo el año. La fortuna financiera favorece la inversión planificada y el ahorro. Es tiempo de nuevas relaciones. No dejes pasar ninguna oportunidad.',
    ],
    [
      'Awal tahun baru. Menetapkan tujuan jelas dan rencana aksi sangat penting. Keputusan dan tindakan pada periode ini akan menentukan arah seluruh tahunmu. Keuangan mendukung investasi terencana dan tabungan. Waktu untuk hubungan baru. Jangan lewatkan peluang apa pun.',
    ],
  ),
  2: pair(
    [
      'Periodo de calma y reflexión. Revisa el mes pasado y reorganiza tu estrategia. La comunicación sincera importa en las relaciones; es buen momento para resolver malentendidos. Refuerza la inmunidad en salud. La fortuna financiera es estable, pero puedes hallar oportunidades en trabajo paralelo. Un mes tranquilo pero pleno.',
    ],
    [
      'Periode ketenangan dan perenungan. Tinjau bulan lalu dan susun ulang strategimu. Komunikasi tulus penting dalam hubungan; waktu yang baik untuk menyelesaikan kesalahpahaman. Perkuat imunitas untuk kesehatan. Keuangan stabil, tetapi peluang baru bisa ditemukan di pekerjaan sampingan. Bulan yang tenang namun bermakna.',
    ],
  ),
  3: pair(
    [
      'Vuelve la energía de nuevos comienzos. Como la primavera tras el invierno, empieza un periodo de crecimiento. Excelente mes para iniciar proyectos o negocios. Puedes ampliar tu red y la fortuna romántica sube. Cuidado con apresurarte: mantén prudencia y equilibrio.',
    ],
    [
      'Energi awal yang baru kembali. Seperti musim semi setelah musim dingin, periode pertumbuhan dimulai. Bulan yang sangat baik untuk memulai proyek atau bisnis. Membangun jaringan lebih luas memungkinkan, dan keberuntungan asmara naik. Jangan terburu-buru—jaga keseimbangan dan kehati-hatian.',
    ],
  ),
  4: pair(
    [
      'Mes de acción activa y cambio. Es momento de poner en marcha lo que has preparado. La fortuna financiera sube y pueden aparecer nuevas fuentes de ingreso. Puedes lograr resultados en trabajo o negocio: concentra tu energía. Cuida la salud por exceso de trabajo y no olvides la humildad en las relaciones. La puerta al éxito está abierta.',
    ],
    [
      'Bulan aksi aktif dan perubahan. Saatnya menjalankan apa yang telah kamu persiapkan. Keuangan naik dan sumber penghasilan baru mungkin muncul. Kamu bisa meraih hasil di pekerjaan atau bisnis—fokuskan energimu. Waspadai kesehatan karena kelelahan kerja, dan jangan lupa kerendahan hati dalam hubungan. Pintu kesuksesan terbuka lebar.',
    ],
  ),
  5: pair(
    [
      'Tiempo de estabilidad y prosperidad. Las actividades de abril dan buenos resultados este mes. Mejora tu situación financiera y puedes ascender a una posición de confianza. Las relaciones familiares son armoniosas; es buen momento para decisiones importantes. La salud va bien, pero relájate y descansa lo suficiente. El esfuerzo de este periodo rinde a largo plazo.',
    ],
    [
      'Waktu stabilitas dan kemakmuran. Aktivitas bulan April membuahkan hasil baik bulan ini. Keuangan membaik dan kamu bisa naik ke posisi yang dipercaya. Hubungan keluarga harmonis; waktu baik untuk keputusan penting. Kesehatan baik, tetapi relaksasi dan istirahat cukup penting. Usaha pada periode ini berbuah jangka panjang.',
    ],
  ),
  6: pair(
    [
      'Soplan vientos de cambio. Puedes estar en un punto de inflexión o elección. Evita cambios bruscos y decide con cuidado. La conversación honesta importa en las relaciones; resuelve malentendidos ahora. Hace falta gestión financiera conservadora y manejo del estrés para la salud. Acepta el cambio, pero enfrentarlo con sabiduría.',
    ],
    [
      'Angin perubahan bertiup. Kamu mungkin di persimpangan atau pilihan. Hindari perubahan mendadak dan putuskan dengan hati-hati. Percakapan jujur penting dalam hubungan; selesaikan kesalahpahaman sekarang. Kelola keuangan secara konservatif dan kelola stres untuk kesehatan. Terima perubahan, tetapi hadapi dengan bijak.',
    ],
  ),
  7: pair(
    [
      'Mes de pasión y expresión. Puedes expresar opiniones y sentimientos con más libertad. Buen momento para actividades creativas o hobbies nuevos; la fortuna romántica es muy alta. No olvides la moderación si la emoción se excede. En finanzas, evita la especulación y prioriza inversiones estables. Mes social: las relaciones con quienes te rodean se activan.',
    ],
    [
      'Bulan gairah dan ekspresi. Waktu untuk mengekspresikan pendapat dan perasaan secara aktif. Baik untuk memulai aktivitas kreatif atau hobi baru; keberuntungan romantis sangat tinggi. Jangan lupa moderasi jika emosi berlebihan. Untuk keuangan, hindari spekulasi dan fokus pada investasi stabil. Bulan sosial—hubungan dengan orang di sekitar menjadi lebih aktif.',
    ],
  ),
  8: pair(
    [
      'Mes de cosecha y balance. Los esfuerzos del primer semestre dan fruto. La fortuna financiera sube y puede haber ganancias inesperadas. Hay alta probabilidad de reconocimiento: ten confianza. Se profundizan los lazos familiares; contratos o negociaciones importantes son favorables. El éxito de este mes será base del segundo semestre. No olvides la gratitud.',
    ],
    [
      'Bulan panen dan penyelesaian. Usaha semester pertama berbuah. Keuangan naik dan keuntungan tak terduga mungkin ada. Peluang pengakuan tinggi—percaya dirilah. Hubungan keluarga semakin erat; kontrak atau negosiasi penting menguntungkan. Kesuksesan bulan ini menjadi fondasi semester kedua. Jangan lupa bersyukur.',
    ],
  ),
  9: pair(
    [
      'Tiempo de cambio y orden. Te alejas del calor del verano hacia la calma. Ordena lo innecesario y revisa tus planes. Buen mes para aprender o desarrollarte. Favorece relaciones más profundas; el tiempo a solas también importa. La fortuna financiera es conservadora pero con crecimiento constante. Enfócate en el crecimiento interior.',
    ],
    [
      'Waktu perubahan dan penataan. Bergerak dari gairah musim panas menuju ketenangan. Rapikan hal yang tidak perlu dan tinjau kembali rencanamu. Bulan baik untuk belajar atau pengembangan diri. Menguntungkan untuk hubungan yang lebih dalam; waktu sendiri juga penting. Keuangan konservatif tetapi pertumbuhan stabil diharapkan. Fokus pada pertumbuhan batin.',
    ],
  ),
  10: pair(
    [
      'Mes de estabilidad y cosecha. Madura lo preparado desde marzo. La fortuna financiera es buena y pueden aparecer rendimientos de inversiones. Favorece completar proyectos importantes en trabajo o negocio. La salud va bien y la suerte general sube. No pierdas la humildad con el éxito y cuida las relaciones. El equilibrio importa este mes.',
    ],
    [
      'Bulan stabilitas dan panen. Hal yang disiapkan sejak Maret matang. Keuangan baik dan imbal investasi mungkin muncul. Menguntungkan untuk menyelesaikan proyek penting di pekerjaan atau bisnis. Kesehatan baik dan keberuntungan umum naik. Jangan kehilangan kerendahan hati karena sukses, dan rawat hubungan. Keseimbangan penting bulan ini.',
    ],
  ),
  11: pair(
    [
      'Mes de reflexión y preparación. Al cerrar el año, ordena lo vivido y prepara el siguiente. La fortuna financiera es estable; conviene buscar oportunidades de inversión para el año entrante. Expresa gratitud a quienes quieres en las relaciones. Puede acumularse fatiga: descansa lo suficiente. Encuentra plenitud con reflexión interior y cierra el año con calma.',
    ],
    [
      'Bulan refleksi dan persiapan. Saat menutup tahun, rapikan peristiwa lalu dan siapkan tahun depan. Keuangan stabil; baik mencari peluang investasi untuk tahun mendatang. Ungkapkan rasa terima kasih kepada orang terkasih. Kelelahan mungkin menumpuk—istirahat cukup penting. Temukan ketenangan batin dan akhiri tahun dengan hati yang tenang.',
    ],
  ),
  12: pair(
    [
      'Mes de cierre y nuevos comienzos. Prepárate para completar el año y recibir el nuevo. Haz balance de logros del año y siente gratitud. En finanzas es tiempo de cierre: termina los planes pendientes. Valora el tiempo con familia y amigos y abraza la esperanza para el año nuevo. La preparación de este periodo define el éxito del próximo año. Recibe el año nuevo con gratitud y esperanza.',
    ],
    [
      'Bulan penutupan dan awal baru. Siapkan diri menyelesaikan tahun dan menyambut yang baru. Hitung pencapaian tahun ini dan rasakan syukur. Keuangan adalah waktu penyelesaian—selesaikan rencana yang tersisa. Hargai waktu dengan keluarga dan teman, dan bawa harapan untuk tahun baru. Persiapan pada periode ini menentukan kesuksesan tahun depan. Sambut tahun baru dengan syukur dan harapan.',
    ],
  ),
}

// ─── Yearly comprehensive (13 strings) ───────────────────────────────────────

export const yearlyComprehensiveEsId: EsIdPair = pair(
  [
    'Este año abre un capítulo nuevo y significativo. Los primeros meses premian bases cuidadosas; de finales de primavera al verano gana impulso y aparece una ventana decisiva. Los ingresos tienden a subir: evita apuestas imprudentes. Los vínculos genuinos se acercan y llegan aliados útiles. El autocuidado constante mantiene la energía alta; el cierre del año se siente lleno de gratitud.',
    'Tus fortalezas salen a la luz y ganan reconocimiento. La primera mitad favorece intentos audaces en áreas nuevas; lo que decidas entonces moldea los logros del segundo semestre. Vigila marzo a mayo por ofertas. El flujo de caja se mantiene manejable y aparecen nuevas formas de ingreso: elige con claridad. La colaboración y la confianza suben; gestiona el estrés y cierra el año con satisfacción sólida.',
    'Un año de crecimiento interior más que de titulares ruidosos. La primera mitad favorece la reflexión: ordena qué conservar y qué soltar. La nueva perspectiva afianza decisiones después de mediados de año. El dinero se mantiene parejo y calmado; recorta gastos y aumenta el ahorro. Las relaciones se profundizan más allá del saludo superficial; prácticas tranquilas calman el cuerpo. El año se siente sutil pero muy significativo.',
    'La suerte y las aperturas se concentran este año. La postura de enero y febrero prepara un marzo en adelante fuerte. Abril a julio lleva el impulso máximo para lanzamientos y decisiones valientes. Las finanzas pueden dispararse: gasta con disciplina. Llegan mentores y redes nuevas; cuida la salud en medio del ritmo. El fin de año se siente abundante y luminoso.',
    'El reto y el crecimiento van juntos. Aprender e invertir en habilidades brilla en la primera mitad; resultados visibles se acumulan después del verano. Los ingresos pueden oscilar, pero la pendiente apunta arriba: mantente prudente. Los lazos viejos se fortalecen y aparecen caras nuevas. Rutinas activas te mantienen resiliente; subes de nivel para diciembre.',
    'Buscas calma y realineación. La primera mitad limpia desorden y restaura el orden; la segunda mitad revela nuevos ángulos sobre viejas oportunidades. El dinero se mantiene estable con posibles ingresos extra. Familia y amigos cercanos se sienten más valiosos. Descanso y cuidado del sistema nervioso son medicina: crece la riqueza interior.',
    'La creatividad quiere voz. El primer trimestre aclara la visión; primavera y verano expanden experimentos: vigila junio a septiembre por un giro. El trabajo creativo paralelo puede pagar; personas afines aceleran el crecimiento. Guarda descanso para que la inspiración sea sostenible; el año brilla con ideas hechas realidad.',
    'La madurez y la perspectiva lideran. Los primeros meses repasan lecciones; los últimos lanzan movimientos más sabios que antes. Los planes financieros a largo plazo rinden. La profundidad con familia y amigos importa; tu experiencia ayuda a otros. La salud se mantiene cuando el ritmo es humano; el año se siente con los pies en la tierra y con propósito.',
    'Recuperación y reinicio si los necesitas. La primera mitad sana y recarga energía; después de mediados de año vuelve impulso para nuevos intentos. Mantén el gasto suave y el ahorro amable. Los que te apoyan muestran su valor; nace nueva confianza. La esperanza se aligera hacia el invierno.',
    'Temporada de prosperidad. Los proyectos nuevos favorecen lanzamientos de enero a marzo; los resultados se ven desde abril. Mediados de verano pueden marcar el pico financiero: elige con sabiduría y evita el despilfarro. Se multiplican aliados y socios; cuida la salud para disfrutar la ola; la fortuna se siente generosa.',
    'El cambio revela tu valor. Los primeros meses piden flexibilidad; puertas inesperadas aún te orientan hacia arriba. El flujo de caja puede oscilar, pero la tendencia es positiva: guarda reservas. Las relaciones se redefinen; los lazos verdaderos se estrechan. Creces con más firmeza en medio del movimiento.',
    'Los sueños encuentran la logística. La primera mitad da forma a planes y atrae ayuda; el verano muestra primeras victorias y el otoño puede superar metas. Los recursos se alinean con la visión si gastas con conciencia. Aparecen quienes te animan; la esperanza y el orgullo crecen hacia fin de año.',
    'La comunicación y la empatía profundizan vínculos. El diálogo en la primera mitad amplía la perspectiva; proyectos conjuntos florecen después. Aparecen ingresos ligados a personas; las artes creativas pueden brillar. La estabilidad emocional es la clave de salud: meses cálidos y significativos por delante.',
    'La paciencia por fin paga. Aún es primer semestre de cierre de trabajos viejos: mantén el foco, sin prisa. Después del verano los resultados aceleran; el otoño puede sorprenderte. Los ingresos siguen el esfuerzo al alza; la integridad gana confianza. Rutinas sanas te llevan a un cierre pleno.',
  ],
  [
    'Tahun ini membuka bab baru yang bermakna. Bulan awal menghargai fondasi yang hati-hati; dari akhir musim semi ke musim panas momentum meningkat dan jendela decisif muncul. Pemasukan cenderung naik—hindari taruhan sembrono. Ikatan tulus mendekat dan sekutu membantu datang. Perawatan diri yang konsisten menjaga energi tinggi; penutup tahun terasa penuh syukur.',
    'Kekuatanmu terlihat dan diakui. Semester pertama mendukung percobaan berani di bidang baru; pilihan saat itu membentuk kemenangan semester kedua. Perhatikan Maret–Mei untuk tawaran. Arus kas tetap terkendali sementara sudut penghasilan baru muncul—pilih dengan jernih. Kolaborasi dan kepercayaan naik; kelola stres dan akhiri tahun dengan kepuasan yang solid.',
    'Tahun pertumbuhan batin lebih dari headline yang ramai. Semester pertama mendukung refleksi—pisahkan yang dipertahankan dan dilepaskan. Perspektif baru menegaskan keputusan setelah pertengahan tahun. Uang tetap rata dan tenang; kurangi pemborosan dan tambah tabungan. Hubungan mendalam melampaui basa-basi; praktik tenang menenangkan tubuh. Tahun terasa halus namun sangat bermakna.',
    'Keberuntungan dan peluang berkumpul tahun ini. Sikap Januari–Februari menyiapkan Maret ke depan yang kuat. April–Juli membawa momentum puncak untuk peluncuran dan keputusan berani. Keuangan bisa melonjak—belanjakan dengan disiplin. Mentor dan jaringan baru datang; jaga kesehatan di tengah kesibukan. Akhir tahun terasa berlimpah dan cerah.',
    'Tantangan dan pertumbuhan berjalan bersama. Belajar dan investasi keterampilan bersinar di semester pertama; hasil terlihat mengumpul setelah musim panas. Pendapatan mungkin goyah tetapi kemiringannya naik—tetap bijak. Ikatan lama menguat sementara wajah baru muncul. Rutinitas aktif menjaga ketahanan; kamu naik level menjelang Desember.',
    'Kamu mencari ketenangan dan penataan ulang. Semester pertama membersihkan kekacauan dan memulihkan tatanan; semester kedua menampilkan sudut baru pada peluang lama. Uang stabil dengan kemungkinan aliran samping. Keluarga dan teman dekat terasa lebih berharga. Istirahat dan perawatan sistem saraf adalah obat—kekayaan batin tumbuh.',
    'Kreativitas ingin bersuara. Kuartal pertama memperjelas visi; musim semi dan panas menyebar eksperimen—awas Juni–September untuk titik balik. Pekerjaan kreatif sampingan bisa membuahkan; orang sejiwa mempercepat pertumbuhan. Jaga istirahat agar inspirasi berkelanjutan; tahun berkilau dengan ide yang menjadi nyata.',
    'Kedewasaan dan perspektif memimpin. Bulan awal meninjau pelajaran; bulan akhir meluncurkan langkah lebih bijak dari sebelumnya. Rencana uang jangka panjang membuahkan. Kedalaman dengan keluarga dan teman penting; pengalamanmu membantu orang lain. Kesehatan terjaga saat ritme manusiawi; tahun terasa membumi dan penuh tujuan.',
    'Pemulihan dan memulai lagi jika kamu membutuhkannya. Semester pertama menyembuhkan dan mengisi ulang energi; setelah pertengahan tahun energi kembali untuk percobaan baru. Jaga pengeluaran lembut dan tabungan baik. Penopang menunjukkan nilainya; kepercayaan baru lahir. Harapan terasa lebih ringan menjelang musim dingin.',
    'Musim kemakmuran. Proyek baru mendukung peluncuran Jan–Mar; hasil terlihat dari April. Pertengahan musim panas bisa memuncakkan keuangan—pilih dengan bijak dan hindari pemborosan. Sekutu dan mitra bertambah; rawat kesehatan untuk menikmati gelombang; keberuntungan terasa murah hati.',
    'Perubahan mengungkap nilaimu. Bulan awal meminta fleksibilitas; pintu tak terduga tetap mengarah ke atas. Arus kas mungkin berayun tetapi tren positif—jaga cadangan. Hubungan mendefinisikan ulang diri; ikatan sejati mengencang. Kamu tumbuh lebih mantap di tengah gerak.',
    'Mimpi bertemu logistik. Semester pertama membentuk rencana dan menarik bantuan; musim panas menunjukkan kemenangan awal dan musim gugur bisa melampaui target. Sumber daya selaras dengan visi jika kamu belanja dengan sadar. Penyemangat muncul; harapan dan bangga tumbuh menuju akhir tahun.',
    'Komunikasi dan empati memperdalam ikatan. Dialog di semester pertama memperluas perspektif; proyek bersama mekar kemudian. Peluang penghasilan berbasis orang muncul; seni kreatif bisa bersinar. Stabilitas emosional adalah kunci kesehatan—bulan hangat dan bermakna di depan.',
    'Kesabaran akhirnya membuahkan. Masih semester pertama menutup pekerjaan lama—jaga fokus, jangan terburu-buru. Setelah musim panas hasil mempercepat; musim gugur bisa mengejutkan. Pendapatan mengikuti usaha naik; integritas memenangkan kepercayaan. Rutinitas sehat membawamu ke penutup yang penuh.',
  ],
)

// ─── Yearly detailed (5 strings) ──────────────────────────────────────────────

export const yearlyDetailedEsId: EsIdPair = pair(
  [
    'Este año es un giro nuevo: el primer trimestre planifica, el segundo ejecuta, el tercero muestra logros visibles, el cuarto revisa. Mediados de año favorecen movimientos financieros clave. Mantén la esperanza y la constancia.',
    'El trabajo discreto por fin gana protagonismo; la primera mitad se concentra, la segunda abre carriles nuevos. Los amigos verdaderos se quedan cerca. La riqueza sube: usa la primera mitad para decisiones de dinero importantes.',
    'Vuelve la calma tras temporadas agitadas. La primera mitad estabiliza y planifica; la segunda ejecuta con paciencia. Nuevos aliados ayudan. El dinero se mantiene parejo: pequeñas ganancias constantes vencen saltos arriesgados.',
    'La suerte se concentra: decisiones tempranas pequeñas generan ondas amplias; mediados de año muestran tu mejor habilidad; el final amplía victorias. Inversiones e intentos inclinan positivo: mantente vigoroso y agradecido.',
    'Maduración interior: la primera mitad suelta peso, la segunda recibe mejores hábitos. La práctica espiritual o reflexiva ayuda. El dinero es plano pero seguro: basta una gestión suave.',
  ],
  [
    'Tahun ini adalah pivot baru: Kuartal 1 merencanakan, Kuartal 2 mengeksekusi, Kuartal 3 menunjukkan kemenangan, Kuartal 4 meninjau. Pertengahan tahun mendukung langkah uang kunci. Tetaplah berharap dan mantap.',
    'Kerja sunyi akhirnya mendapat sorotan; semester pertama fokus, semester kedua membuka jalur baru. Teman sejati tetap dekat. Kekayaan naik—gunakan semester pertama untuk keputusan uang besar.',
    'Ketenangan kembali setelah musim sibuk. Semester pertama menstabilkan dan merencanakan; semester kedua mengeksekusi dengan sabar. Sekutu baru membantu. Uang tetap rata—peningkatan kecil yang stabil mengalahkan lompatan berisiko.',
    'Keberuntungan terkonsentrasi: keputusan kecil awal beriak luas; pertengahan tahun menunjukkan kemampuan puncak; akhir tahun memperluas kemenangan. Investasi dan percobaan condong positif—tetap bertenaga dan bersyukur.',
    'Kematangan batin: semester pertama melepaskan beban, semester kedua menyambut kebiasaan lebih baik. Praktik spiritual atau reflektif membantu. Uang datar namun aman—manajemen lembut sudah cukup.',
  ],
)

// ─── Monthly detailed (12 strings) ────────────────────────────────────────────

export const monthlyDetailedEsId: EsIdPair = pair(
  [
    'Enero: energía de nuevo comienzo. Cierra el año pasado, fija metas y purifica cuerpo y mente. El dinero es estable: atento a oportunidades; no pierdas nuevos vínculos.',
    'Febrero: crecimiento interior tranquilo. Prepárate para la primavera con paciencia; pueden surgir charlas más profundas. El dinero es calmado: valora el presente.',
    'Marzo: vuelve la vitalidad con la primavera. Buen momento para lanzar planes; los ingresos suben: muévete con actividad y adapta la temporada.',
    'Abril: el crecimiento se ve. Brilla la cooperación; cuida el gasto mientras la red se calienta.',
    'Mayo: pasión al máximo: participa con audacia pero cuida la fatiga. El dinero favorece intentos nuevos; cuida la salud.',
    'Junio: armonía madura tras el ritmo de mayo. Reflexiona en las relaciones; el dinero es parejo: el descanso y la gratitud ayudan.',
    'Julio: llegan cambio y ofertas: mantente flexible. El dinero puede oscilar pero sigue favorable; estabiliza tus emociones.',
    'Agosto: acción audaz a mitad de verano: decisiones y equipo alineados. Los ingresos pueden saltar: gestiona tu energía.',
    'Septiembre: cosecha y revisión: celebra logros y planifica el siguiente paso. El dinero reconoce el esfuerzo pasado.',
    'Octubre: profundidad otoñal: vuelve el orden, los amigos verdaderos destacan. El dinero se estabiliza; importa la calma interior.',
    'Noviembre: prepárate para el invierno: ordena cuentas y ritmo. El dinero es plano y seguro; evita el exceso de trabajo.',
    'Diciembre: cierra el año con gratitud, celebra victorias y fija metas nuevas. El dinero apoya un comienzo tranquilo.',
  ],
  [
    'Januari: energi awal baru. Tutup tahun lalu, tetapkan tujuan, bersihkan tubuh dan pikiran. Uang stabil—perhatikan peluang; jangan lewatkan ikatan baru.',
    'Februari: pertumbuhan batin yang tenang. Persiapkan musim semi dengan sabar; percakapan lebih dalam mungkin muncul. Uang tenang—hargai saat ini.',
    'Maret: vitalitas kembali bersama musim semi. Waktu baik meluncurkan rencana; pendapatan naik—bergerak aktif dan sesuaikan musim.',
    'April: pertumbuhan terlihat. Kerja sama bersinar; perhatikan pengeluaran sementara jejaring memanas.',
    'Mei: gairah puncak—ikut berani tetapi waspadai kelelahan. Uang mendukung percobaan baru; jaga kesehatan.',
    'Juni: harmoni matang setelah gejolak Mei. Renungkan hubungan; uang rata—istirahat dan syukur membantu.',
    'Juli: perubahan dan tawaran datang—tetap fleksibel. Uang mungkin berayun tetapi tetap menguntungkan; tenangkan emosi.',
    'Agustus: aksi berani di pertengahan musim panas—keputusan dan kerja tim selaras. Pendapatan bisa melonjak—kelola energi.',
    'September: panen dan tinjauan—rayakan hasil dan rencanakan langkah berikutnya. Uang mengakui usaha lalu.',
    'Oktober: kedalaman musim gugur—tatanan kembali, teman sejati menonjol. Uang stabil; ketenangan batin penting.',
    'November: persiapan musim dingin—rapikan akun dan ritme. Uang datar-amannya; hindari kerja berlebihan.',
    'Desember: tutup tahun dengan syukur, rayakan kemenangan, tetapkan tujuan baru. Uang mendukung awal yang tenang.',
  ],
)

// ─── Lifetime detailed (6 strings) ────────────────────────────────────────────

export const lifetimeDetailedEsId: EsIdPair = pair(
  [
    'Tu vida avanza entre crecimiento y cambio constantes. Los primeros años construyen bases con paciencia; la mitad de la vida convierte el esfuerzo en lazos profundos y activos; los últimos años aportan sentido con la sabiduría y ayudar a otros. La prosperidad sube de forma constante cuando honras la confianza y las relaciones.',
    'La creatividad y el valor marcan tu camino. La exploración y los errores tempranos se vuelven activos que abren una ruta independiente a mitad de vida. Las emociones son intensas: mantente anclado en personas fiables. Los ingresos pueden fluctuar, pero el trabajo creativo abre nuevas fuentes; la calma emocional sostiene la salud.',
    'Te define una calma profunda. Por fuera puedes parecer reservado o reservada, pero por dentro eres reflexivo o reflexiva y ganas confianza. La cautela temprana siembra el éxito a mitad de vida y la tranquilidad después. Las relaciones se filtran hasta aliados verdaderos, tu mayor riqueza. El dinero se mantiene estable; equilibra mente y cuerpo para la mejor vitalidad.',
    'La acción y la ejecución te llevan. Alcanzas la mayoría de metas que te planteas; el impulso temprano se vuelve resultados a mitad de vida y valor para nuevos saltos después. La honestidad directa puede generar roce: practica la empatía. La prosperidad sigue al esfuerzo; rutinas constantes protegen la salud.',
    'Buscas armonía y equilibrio. La gente se siente atraída por tu cuidado; creces de la influencia hacia la independencia. La estética y la intuición fuertes encajan con el trabajo creativo. El dinero se mantiene estable con oportunidades frescas; la paz emocional es la clave de la salud.',
    'La sabiduría y la perspicacia llenan tu recorrido. Las pruebas de la juventud se vuelven fortalezas después; la empatía construye lazos. La prosperidad se afianza desde la mitad de la vida; la actitud mental moldea cómo se siente tu cuerpo.',
  ],
  [
    'Hidupmu mengalir lewat pertumbuhan dan perubahan yang stabil. Tahun awal membangun fondasi dengan kesabaran; pertengahan hidup mengubah usaha menjadi ikatan dan aset yang dalam; tahun kemudian membawa makna lewat kebijaksanaan dan membantu orang lain. Kemakmuran naik stabil saat kamu menghormati kepercayaan dan hubungan.',
    'Kreativitas dan keberanian membentuk jalurmu. Eksplorasi dan kesalahan awal menjadi aset yang membuka rute mandiri di pertengahan hidup. Emosi kaya—berlabuh pada orang yang dapat diandalkan. Pendapatan mungkin berfluktuasi, tetapi kerja kreatif membuka aliran baru; ketenangan emosional menopang kesehatan.',
    'Kedalaman tenang mendefinisikanmu. Tenang di luar namun penuh pikiran di dalam, kamu mendapat kepercayaan. Kehati-hatian awal menanam kesuksesan pertengahan hidup dan kenyamanan kemudian. Hubungan tersaring hingga sekutu sejati—kekayaan terbesarmu. Uang tetap stabil; seimbangkan pikiran dan tubuh untuk vitalitas puncak.',
    'Aksi dan eksekusi membawamu. Kamu mencapai sebagian besar tujuan yang ditetapkan; dorongan awal menjadi hasil pertengahan hidup dan keberanian untuk lompatan baru kemudian. Kejujuran blak-blakan bisa memicu gesekan—latih empati. Kemakmuran mengikuti usaha; rutinitas stabil melindungi kesehatan.',
    'Kamu mencari harmoni dan keseimbangan. Orang tertarik pada perhatianmu; kamu tumbuh dari pengaruh menuju kemandirian. Estetika dan intuisi kuat cocok untuk pekerjaan kreatif. Uang tetap stabil dengan peluang segar; kedamaian emosional adalah kunci kesehatan.',
    'Kebijaksanaan dan wawasan memenuhi perjalananmu. Ujian di masa muda menjadi kekuatan kemudian; empati membangun ikatan. Kemakmuran menguat dari pertengahan hidup; pola pikir membentuk bagaimana tubuhmu terasa.',
  ],
)

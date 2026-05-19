import type { Language } from '../i18n'

/** Multiline copyright section bodies (paragraphs separated by \\n\\n) */
export type CopyrightBodyKeys =
  | 'copyright.section1.body'
  | 'copyright.section2.body'
  | 'copyright.section3.body'
  | 'copyright.section4.body'
  | 'copyright.section5.body'
  | 'copyright.section6.body'

const KO: Record<CopyrightBodyKeys, string> = {
  'copyright.section1.body':
    '본 웹사이트 및 서비스의 모든 콘텐츠(텍스트, 이미지, 그래픽, 로고, 아이콘, 비디오, 음성, 소프트웨어 등)는 저작권법 및 국제 조약에 의해 보호됩니다.\n\n© 2026 Fortune & Tarot Services. All rights reserved.\n\n본 웹사이트의 콘텐츠는 명시적인 허락 없이는 복제, 배포, 전송, 표시, 또는 사용될 수 없습니다.',
  'copyright.section2.body':
    '저희는 사용자에게 제한적이고 비독점적인 라이선스를 부여합니다:\n\n• 개인적, 비상업적 용도로 본 서비스를 이용할 수 있습니다.\n• 한 개의 기기에서 본 서비스에 접속할 수 있습니다.\n• 본인의 프로필과 개인 정보만 열람할 수 있습니다.\n• 라이선스는 언제든지 취소될 수 있습니다.',
  'copyright.section3.body':
    '사용자는 다음을 할 수 없습니다:\n\n• 콘텐츠를 복제, 수정, 배포 또는 판매\n• 서비스를 상업적 목적으로 사용\n• 서비스의 기술적 구조를 역 엔지니어링 또는 해킹\n• 자동화된 도구나 봇을 사용하여 서비스에 접속\n• 저작권 또는 지적재산권 표시 제거',
  'copyright.section4.body':
    '본 서비스는 다음의 오픈소스 라이브러리를 사용합니다:\n\n• Next.js - MIT License\n• React - MIT License\n• Tailwind CSS - MIT License\n• Radix UI - MIT License\n\n각 라이브러리의 라이선스는 프로젝트 저장소에서 확인할 수 있습니다.',
  'copyright.section5.body':
    '저작권이 침해되었다고 생각되시면 다음 정보와 함께 신고하시기 바랍니다:\n\n• 저작권이 침해된 콘텐츠의 설명\n• 저작권 소유자의 이름 및 연락처\n• 침해 콘텐츠의 위치(URL)\n• 저작권 소유자임을 확인하는 진술\n\n신고는 copyright@example.com으로 보내주시기 바랍니다.',
  'copyright.section6.body':
    '• 우리는 제3자의 콘텐츠에 대한 저작권 침해에 책임지지 않습니다.\n• 사용자가 업로드한 콘텐츠의 저작권은 사용자의 책임입니다.\n• 저작권 침해 신고에 대해 즉시 조치하지 않을 수 있습니다.',
}

const EN: Record<CopyrightBodyKeys, string> = {
  'copyright.section1.body':
    'All content on this website and service (text, images, graphics, logos, icons, video, audio, software, etc.) is protected by copyright law and international treaties.\n\n© 2026 Fortune & Tarot Services. All rights reserved.\n\nContent may not be copied, distributed, transmitted, displayed, or used without explicit permission.',
  'copyright.section2.body':
    'We grant users a limited, non-exclusive license:\n\n• You may use the service for personal, non-commercial purposes.\n• You may access the service on one device.\n• You may view only your own profile and personal information.\n• The license may be revoked at any time.',
  'copyright.section3.body':
    'You may not:\n\n• Copy, modify, distribute, or sell content\n• Use the service for commercial purposes\n• Reverse engineer or hack the service\n• Access the service using automated tools or bots\n• Remove copyright or intellectual property notices',
  'copyright.section4.body':
    'This service uses the following open-source libraries:\n\n• Next.js - MIT License\n• React - MIT License\n• Tailwind CSS - MIT License\n• Radix UI - MIT License\n\nSee the project repository for each library license.',
  'copyright.section5.body':
    'If you believe your copyright was infringed, please report with:\n\n• A description of the infringed content\n• Copyright owner name and contact\n• Location of the infringing content (URL)\n• A statement that you are the copyright owner\n\nSend reports to copyright@example.com.',
  'copyright.section6.body':
    '• We are not liable for third-party copyright infringement.\n• Users are responsible for content they upload.\n• We may not act immediately on infringement reports.',
}

const ES: Record<CopyrightBodyKeys, string> = {
  'copyright.section1.body':
    'Todo el contenido de este sitio y servicio (texto, imágenes, gráficos, logotipos, iconos, video, audio, software, etc.) está protegido por leyes de derechos de autor y tratados internacionales.\n\n© 2026 Fortune & Tarot Services. Todos los derechos reservados.\n\nEl contenido no puede copiarse, distribuirse, transmitirse, mostrarse ni usarse sin permiso explícito.',
  'copyright.section2.body':
    'Otorgamos una licencia limitada y no exclusiva:\n\n• Uso personal y no comercial del servicio.\n• Acceso desde un dispositivo.\n• Solo puede ver su propio perfil e información personal.\n• La licencia puede revocarse en cualquier momento.',
  'copyright.section3.body':
    'No puede:\n\n• Copiar, modificar, distribuir o vender contenido\n• Usar el servicio con fines comerciales\n• Realizar ingeniería inversa o hackear el servicio\n• Acceder con herramientas automatizadas o bots\n• Eliminar avisos de derechos de autor',
  'copyright.section4.body':
    'Este servicio utiliza las siguientes bibliotecas de código abierto:\n\n• Next.js - MIT License\n• React - MIT License\n• Tailwind CSS - MIT License\n• Radix UI - MIT License\n\nConsulte el repositorio del proyecto para cada licencia.',
  'copyright.section5.body':
    'Si cree que se infringió su derecho de autor, informe con:\n\n• Descripción del contenido infringido\n• Nombre y contacto del titular\n• Ubicación del contenido (URL)\n• Declaración de titularidad\n\nEnvíe informes a copyright@example.com.',
  'copyright.section6.body':
    '• No somos responsables de infracciones de terceros.\n• Los usuarios son responsables del contenido que suben.\n• Podemos no actuar de inmediato ante informes.',
}

const ID: Record<CopyrightBodyKeys, string> = {
  'copyright.section1.body':
    'Semua konten di situs dan layanan ini (teks, gambar, grafik, logo, ikon, video, audio, perangkat lunak, dll.) dilindungi oleh hukum hak cipta dan perjanjian internasional.\n\n© 2026 Fortune & Tarot Services. Hak cipta dilindungi.\n\nKonten tidak boleh disalin, didistribusikan, dikirim, ditampilkan, atau digunakan tanpa izin tertulis.',
  'copyright.section2.body':
    'Kami memberikan lisensi terbatas dan non-eksklusif:\n\n• Penggunaan pribadi dan non-komersial.\n• Akses dari satu perangkat.\n• Hanya melihat profil dan data pribadi Anda sendiri.\n• Lisensi dapat dicabut kapan saja.',
  'copyright.section3.body':
    'Anda tidak boleh:\n\n• Menyalin, mengubah, mendistribusikan, atau menjual konten\n• Menggunakan layanan untuk tujuan komersial\n• Reverse engineering atau meretas layanan\n• Mengakses dengan bot atau alat otomatis\n• Menghapus pemberitahuan hak cipta',
  'copyright.section4.body':
    'Layanan ini menggunakan pustaka sumber terbuka berikut:\n\n• Next.js - MIT License\n• React - MIT License\n• Tailwind CSS - MIT License\n• Radix UI - MIT License\n\nLihat repositori proyek untuk setiap lisensi.',
  'copyright.section5.body':
    'Jika Anda yakin hak cipta dilanggar, laporkan dengan:\n\n• Deskripsi konten yang dilanggar\n• Nama dan kontak pemilik hak cipta\n• Lokasi konten (URL)\n• Pernyataan bahwa Anda pemilik hak cipta\n\nKirim laporan ke copyright@example.com.',
  'copyright.section6.body':
    '• Kami tidak bertanggung jawab atas pelanggaran pihak ketiga.\n• Pengguna bertanggung jawab atas konten yang diunggah.\n• Kami mungkin tidak segera menindak laporan.',
}

const PT: Record<CopyrightBodyKeys, string> = {
  'copyright.section1.body':
    'Todo o conteúdo deste site e serviço (texto, imagens, gráficos, logotipos, ícones, vídeo, áudio, software, etc.) é protegido por leis de direitos autorais e tratados internacionais.\n\n© 2026 Fortune & Tarot Services. Todos os direitos reservados.\n\nO conteúdo não pode ser copiado, distribuído, transmitido, exibido ou usado sem permissão explícita.',
  'copyright.section2.body':
    'Concedemos uma licença limitada e não exclusiva:\n\n• Uso pessoal e não comercial do serviço.\n• Acesso em um dispositivo.\n• Visualizar apenas seu próprio perfil e dados pessoais.\n• A licença pode ser revogada a qualquer momento.',
  'copyright.section3.body':
    'Você não pode:\n\n• Copiar, modificar, distribuir ou vender conteúdo\n• Usar o serviço para fins comerciais\n• Fazer engenharia reversa ou hackear o serviço\n• Acessar com ferramentas automatizadas ou bots\n• Remover avisos de direitos autorais',
  'copyright.section4.body':
    'Este serviço usa as seguintes bibliotecas de código aberto:\n\n• Next.js - MIT License\n• React - MIT License\n• Tailwind CSS - MIT License\n• Radix UI - MIT License\n\nConsulte o repositório do projeto para cada licença.',
  'copyright.section5.body':
    'Se acredita que seus direitos autorais foram violados, informe com:\n\n• Descrição do conteúdo violado\n• Nome e contato do titular\n• Localização do conteúdo (URL)\n• Declaração de titularidade\n\nEnvie relatórios para copyright@example.com.',
  'copyright.section6.body':
    '• Não somos responsáveis por violações de terceiros.\n• Os usuários são responsáveis pelo conteúdo enviado.\n• Podemos não agir imediatamente em denúncias.',
}

const FR: Record<CopyrightBodyKeys, string> = {
  'copyright.section1.body':
    'Tout le contenu de ce site et service (texte, images, graphiques, logos, icônes, vidéo, audio, logiciels, etc.) est protégé par le droit d’auteur et les traités internationaux.\n\n© 2026 Fortune & Tarot Services. Tous droits réservés.\n\nLe contenu ne peut être copié, distribué, transmis, affiché ou utilisé sans autorisation explicite.',
  'copyright.section2.body':
    'Nous accordons une licence limitée et non exclusive :\n\n• Usage personnel et non commercial.\n• Accès depuis un appareil.\n• Consultation uniquement de votre profil et de vos données.\n• La licence peut être révoquée à tout moment.',
  'copyright.section3.body':
    'Vous ne pouvez pas :\n\n• Copier, modifier, distribuer ou vendre le contenu\n• Utiliser le service à des fins commerciales\n• Faire de l’ingénierie inverse ou pirater le service\n• Accéder avec des outils automatisés ou des bots\n• Supprimer les mentions de droits d’auteur',
  'copyright.section4.body':
    'Ce service utilise les bibliothèques open source suivantes :\n\n• Next.js - MIT License\n• React - MIT License\n• Tailwind CSS - MIT License\n• Radix UI - MIT License\n\nVoir le dépôt du projet pour chaque licence.',
  'copyright.section5.body':
    'Si vous pensez qu’un droit d’auteur a été violé, signalez avec :\n\n• Description du contenu concerné\n• Nom et contact du titulaire\n• Emplacement du contenu (URL)\n• Déclaration de titularité\n\nEnvoyez les signalements à copyright@example.com.',
  'copyright.section6.body':
    '• Nous ne sommes pas responsables des violations par des tiers.\n• Les utilisateurs sont responsables du contenu qu’ils publient.\n• Nous pouvons ne pas agir immédiatement sur les signalements.',
}

const DE: Record<CopyrightBodyKeys, string> = {
  'copyright.section1.body':
    'Alle Inhalte dieser Website und dieses Dienstes (Text, Bilder, Grafiken, Logos, Symbole, Video, Audio, Software usw.) sind durch Urheberrecht und internationale Abkommen geschützt.\n\n© 2026 Fortune & Tarot Services. Alle Rechte vorbehalten.\n\nInhalte dürfen ohne ausdrückliche Erlaubnis nicht kopiert, verteilt, übertragen, angezeigt oder genutzt werden.',
  'copyright.section2.body':
    'Wir gewähren eine begrenzte, nicht ausschließliche Lizenz:\n\n• Persönliche, nicht kommerzielle Nutzung.\n• Zugriff von einem Gerät.\n• Nur eigenes Profil und persönliche Daten einsehen.\n• Die Lizenz kann jederzeit widerrufen werden.',
  'copyright.section3.body':
    'Sie dürfen nicht:\n\n• Inhalte kopieren, ändern, verteilen oder verkaufen\n• Den Dienst kommerziell nutzen\n• Reverse Engineering oder Hacking betreiben\n• Mit automatisierten Tools oder Bots zugreifen\n• Urheberrechtshinweise entfernen',
  'copyright.section4.body':
    'Dieser Dienst nutzt folgende Open-Source-Bibliotheken:\n\n• Next.js - MIT License\n• React - MIT License\n• Tailwind CSS - MIT License\n• Radix UI - MIT License\n\nLizenzen finden Sie im Projekt-Repository.',
  'copyright.section5.body':
    'Wenn Sie eine Urheberrechtsverletzung vermuten, melden Sie mit:\n\n• Beschreibung des betroffenen Inhalts\n• Name und Kontakt des Rechteinhabers\n• Ort des Inhalts (URL)\n• Erklärung der Berechtigung\n\nMeldungen an copyright@example.com.',
  'copyright.section6.body':
    '• Wir haften nicht für Verletzungen durch Dritte.\n• Nutzer sind für hochgeladene Inhalte verantwortlich.\n• Wir handeln möglicherweise nicht sofort bei Meldungen.',
}

const HI: Record<CopyrightBodyKeys, string> = {
  'copyright.section1.body':
    'इस वेबसाइट और सेवा की सभी सामग्री (पाठ, चित्र, ग्राफ़िक, लोगो, आइकन, वीडियो, ऑडियो, सॉफ़्टवेयर आदि) कॉपीराइट कानून और अंतर्राष्ट्रीय संधियों द्वारा संरक्षित है।\n\n© 2026 Fortune & Tarot Services. सर्वाधिकार सुरक्षित।\n\nस्पष्ट अनुमति के बिना सामग्री की प्रतिलिपि, वितरण, प्रसारण, प्रदर्शन या उपयोग नहीं किया जा सकता।',
  'copyright.section2.body':
    'हम सीमित, गैर-विशिष्ट लाइसेंस प्रदान करते हैं:\n\n• व्यक्तिगत, गैर-व्यावसायिक उपयोग।\n• एक डिवाइस से पहुँच।\n• केवल अपना प्रोफ़ाइल और व्यक्तिगत जानकारी देखें।\n• लाइसेंस कभी भी रद्द किया जा सकता है।',
  'copyright.section3.body':
    'आप नहीं कर सकते:\n\n• सामग्री की प्रतिलिपि, संशोधन, वितरण या बिक्री\n• व्यावसायिक उद्देश्यों के लिए सेवा का उपयोग\n• रिवर्स इंजीनियरिंग या हैकिंग\n• बॉट या स्वचालित उपकरणों से पहुँच\n• कॉपीराइट नोटिस हटाना',
  'copyright.section4.body':
    'यह सेवा निम्न ओपन-सोर्स लाइब्रेरी का उपयोग करती है:\n\n• Next.js - MIT License\n• React - MIT License\n• Tailwind CSS - MIT License\n• Radix UI - MIT License\n\nप्रत्येक लाइसेंस के लिए प्रोजेक्ट रिपॉजिटरी देखें।',
  'copyright.section5.body':
    'यदि आपको लगता है कि कॉपीराइट का उल्लंघन हुआ है, तो रिपोर्ट करें:\n\n• उल्लंघित सामग्री का विवरण\n• स्वामी का नाम और संपर्क\n• सामग्री का स्थान (URL)\n• स्वामित्व का बयान\n\nरिपोर्ट copyright@example.com पर भेजें।',
  'copyright.section6.body':
    '• हम तृतीय-पक्ष उल्लंघन के लिए जिम्मेदार नहीं हैं।\n• उपयोगकर्ता अपलोड की गई सामग्री के लिए जिम्मेदार हैं।\n• हम तुरंत कार्रवाई नहीं भी कर सकते।',
}

const VI: Record<CopyrightBodyKeys, string> = {
  'copyright.section1.body':
    'Mọi nội dung trên trang web và dịch vụ này (văn bản, hình ảnh, đồ họa, logo, biểu tượng, video, âm thanh, phần mềm, v.v.) được bảo vệ bởi luật bản quyền và các hiệp ước quốc tế.\n\n© 2026 Fortune & Tarot Services. Bảo lưu mọi quyền.\n\nKhông được sao chép, phân phối, truyền tải, hiển thị hoặc sử dụng nội dung khi chưa có sự cho phép rõ ràng.',
  'copyright.section2.body':
    'Chúng tôi cấp giấy phép hạn chế, không độc quyền:\n\n• Sử dụng cá nhân, phi thương mại.\n• Truy cập trên một thiết bị.\n• Chỉ xem hồ sơ và thông tin cá nhân của bạn.\n• Giấy phép có thể bị thu hồi bất cứ lúc nào.',
  'copyright.section3.body':
    'Bạn không được:\n\n• Sao chép, sửa, phân phối hoặc bán nội dung\n• Dùng dịch vụ cho mục đích thương mại\n• Reverse engineering hoặc hack dịch vụ\n• Truy cập bằng công cụ tự động hoặc bot\n• Xóa thông báo bản quyền',
  'copyright.section4.body':
    'Dịch vụ sử dụng các thư viện mã nguồn mở sau:\n\n• Next.js - MIT License\n• React - MIT License\n• Tailwind CSS - MIT License\n• Radix UI - MIT License\n\nXem kho lưu trữ dự án để biết từng giấy phép.',
  'copyright.section5.body':
    'Nếu bạn cho rằng bản quyền bị vi phạm, hãy báo cáo kèm:\n\n• Mô tả nội dung vi phạm\n• Tên và liên hệ chủ sở hữu\n• Vị trí nội dung (URL)\n• Tuyên bố quyền sở hữu\n\nGửi báo cáo tới copyright@example.com.',
  'copyright.section6.body':
    '• Chúng tôi không chịu trách nhiệm về vi phạm của bên thứ ba.\n• Người dùng chịu trách nhiệm về nội dung họ tải lên.\n• Chúng tôi có thể không xử lý ngay các báo cáo.',
}

const TH: Record<CopyrightBodyKeys, string> = {
  'copyright.section1.body':
    'เนื้อหาทั้งหมดบนเว็บไซต์และบริการนี้ (ข้อความ รูปภาพ กราฟิก โลโก้ ไอคอน วิดีโอ เสียง ซอฟต์แวร์ ฯลฯ) ได้รับการคุ้มครองตามกฎหมายลิขสิทธิ์และสนธิสัญญาระหว่างประเทศ\n\n© 2026 Fortune & Tarot Services สงวนลิขสิทธิ์\n\nห้ามคัดลอก แจกจ่าย ส่งต่อ แสดง หรือใช้เนื้อหาโดยไม่ได้รับอนุญาตอย่างชัดแจ้ง',
  'copyright.section2.body':
    'เรามอบใบอนุญาตแบบจำกัดและไม่ผูกขาด:\n\n• ใช้เพื่อวัตถุประสงค์ส่วนบุคคลและไม่ใช่เชิงพาณิชย์\n• เข้าถึงจากอุปกรณ์เครื่องเดียว\n• ดูเฉพาะโปรไฟล์และข้อมูลส่วนตัวของคุณ\n• ใบอนุญาตอาจถูกเพิกถอนได้ทุกเมื่อ',
  'copyright.section3.body':
    'คุณต้องไม่:\n\n• คัดลอก แก้ไข แจกจ่าย หรือขายเนื้อหา\n• ใช้บริการเพื่อวัตถุประสงค์เชิงพาณิชย์\n• ทำ reverse engineering หรือแฮ็กบริการ\n• เข้าถึงด้วยเครื่องมืออัตโนมัติหรือบอท\n• ลบประกาศลิขสิทธิ์',
  'copyright.section4.body':
    'บริการนี้ใช้ไลบรารีโอเพนซอร์สดังต่อไปนี้:\n\n• Next.js - MIT License\n• React - MIT License\n• Tailwind CSS - MIT License\n• Radix UI - MIT License\n\nดูที่ repository ของโปรเจกต์สำหรับแต่ละใบอนุญาต',
  'copyright.section5.body':
    'หากคุณเชื่อว่าลิขสิทธิ์ถูกละเมิด โปรดรายงานพร้อม:\n\n• คำอธิบายเนื้อหาที่ถูกละเมิด\n• ชื่อและข้อมูลติดต่อเจ้าของลิขสิทธิ์\n• ตำแหน่งเนื้อหา (URL)\n• คำแถลงความเป็นเจ้าของ\n\nส่งรายงานไปที่ copyright@example.com',
  'copyright.section6.body':
    '• เราไม่รับผิดชอบการละเมิดของบุคคลที่สาม\n• ผู้ใช้รับผิดชอบเนื้อหาที่อัปโหลด\n• เราอาจไม่ดำเนินการทันทีต่อรายงาน',
}

const JA: Record<CopyrightBodyKeys, string> = {
  'copyright.section1.body':
    '本ウェブサイトおよびサービスのすべてのコンテンツ（テキスト、画像、グラフィック、ロゴ、アイコン、動画、音声、ソフトウェアなど）は著作権法および国際条約により保護されています。\n\n© 2026 Fortune & Tarot Services. All rights reserved.\n\n明示的な許可なく、コンテンツを複製、配布、送信、表示、または使用することはできません。',
  'copyright.section2.body':
    '当社はユーザーに限定的かつ非独占的なライセンスを付与します：\n\n• 個人的・非商用目的での利用\n• 1台のデバイスからのアクセス\n• 自身のプロフィールと個人情報のみ閲覧\n• ライセンスはいつでも取り消される場合があります',
  'copyright.section3.body':
    'ユーザーは以下を行ってはなりません：\n\n• コンテンツの複製、改変、配布、販売\n• 商用目的での利用\n• リバースエンジニアリングまたはハッキング\n• 自動ツールやボットによるアクセス\n• 著作権表示の削除',
  'copyright.section4.body':
    '本サービスは次のオープンソースライブラリを使用しています：\n\n• Next.js - MIT License\n• React - MIT License\n• Tailwind CSS - MIT License\n• Radix UI - MIT License\n\n各ライセンスはプロジェクトリポジトリで確認できます。',
  'copyright.section5.body':
    '著作権侵害があると思われる場合は、次の情報とともにご報告ください：\n\n• 侵害コンテンツの説明\n• 著作権者の氏名と連絡先\n• コンテンツの場所（URL）\n• 著作権者であることの声明\n\n報告先：copyright@example.com',
  'copyright.section6.body':
    '• 第三者の著作権侵害について当社は責任を負いません。\n• ユーザーがアップロードしたコンテンツの著作権はユーザーの責任です。\n• 侵害報告に即時対応しない場合があります。',
}

const ZH: Record<CopyrightBodyKeys, string> = {
  'copyright.section1.body':
    '本网站及服务的所有内容（文字、图像、图形、标志、图标、视频、音频、软件等）均受版权法和国际条约保护。\n\n© 2026 Fortune & Tarot Services. 保留所有权利。\n\n未经明确许可，不得复制、分发、传输、展示或使用内容。',
  'copyright.section2.body':
    '我们授予用户有限、非独占许可：\n\n• 仅供个人、非商业用途\n• 可在单台设备上访问\n• 仅可查看本人的资料与个人信息\n• 许可可随时撤销',
  'copyright.section3.body':
    '您不得：\n\n• 复制、修改、分发或出售内容\n• 将服务用于商业目的\n• 对服务进行逆向工程或黑客攻击\n• 使用自动化工具或机器人访问\n• 移除版权或知识产权声明',
  'copyright.section4.body':
    '本服务使用以下开源库：\n\n• Next.js - MIT License\n• React - MIT License\n• Tailwind CSS - MIT License\n• Radix UI - MIT License\n\n请在项目仓库中查看各库许可。',
  'copyright.section5.body':
    '如您认为版权受到侵犯，请提供以下信息举报：\n\n• 被侵权内容说明\n• 版权所有者姓名及联系方式\n• 侵权内容位置（URL）\n• 版权所有者声明\n\n请发送至 copyright@example.com。',
  'copyright.section6.body':
    '• 我们对第三方侵权不承担责任。\n• 用户对其上传内容负责。\n• 我们可能不会立即处理侵权举报。',
}

export const copyrightBodiesByLang: Partial<Record<Language, Record<CopyrightBodyKeys, string>>> = {
  ko: KO,
  en: EN,
  ja: JA,
  zh: ZH,
  es: ES,
  id: ID,
  pt: PT,
  fr: FR,
  de: DE,
  hi: HI,
  vi: VI,
  th: TH,
}

export function getCopyrightBodies(language: Language): Record<string, string> {
  return copyrightBodiesByLang[language] ?? copyrightBodiesByLang.en ?? EN
}

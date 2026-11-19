// KALECAD illustration refresh: one concept-matched vector diagram for each tool.
// Responsive, self-contained SVGs avoid third-party image loading and oversized mobile layouts.
(() => {
  const questionData = {
    AutoCAD: [
      ['LINE', 'İki veya daha fazla noktayı düz çizgi parçalarıyla birleştirir.'],
      ['PLINE', 'Birbirine bağlı çizgi ve yay parçalarını tek bir çoklu çizgi nesnesi olarak oluşturur.'],
      ['CIRCLE', 'Merkez ve yarıçap/çap bilgisiyle daire çizer.'],
      ['ARC', 'Belirlenen noktalar, merkez veya açı bilgileriyle yay çizer.'],
      ['RECTANG', 'Karşılıklı köşeleri belirleyerek dikdörtgen oluşturur.'],
      ['POLYGON', 'Kenar sayısı ve ölçüsüne göre düzgün çokgen oluşturur.'],
      ['MOVE', 'Seçilen nesneleri bir konumdan başka bir konuma taşır.'],
      ['COPY', 'Seçilen nesnelerin bir veya daha fazla kopyasını üretir.'],
      ['ROTATE', 'Nesneleri bir taban noktası çevresinde belirtilen açıyla döndürür.'],
      ['MIRROR', 'Nesnelerin belirlenen eksene göre simetrik kopyasını oluşturur.'],
      ['SCALE', 'Nesneleri taban noktasına göre büyütür veya küçültür.'],
      ['OFFSET', 'Bir nesneye belirli uzaklıkta paralel veya eş merkezli kopya oluşturur.'],
      ['TRIM', 'Nesnelerin istenmeyen kısımlarını kesme sınırlarına göre temizler.'],
      ['EXTEND', 'Nesneleri seçilen sınır kenarlarına kadar uzatır.'],
      ['FILLET', 'İki nesne arasına belirlenen yarıçapta yuvarlatılmış geçiş ekler.'],
      ['CHAMFER', 'İki nesnenin köşesini belirlenen mesafelerle pah kırarak birleştirir.'],
      ['ARRAY', 'Nesnelerin dikdörtgen, dairesel veya yol boyunca düzenli kopyalarını oluşturur.'],
      ['HATCH', 'Kapalı alanları tarama deseni, renk veya dolgu ile gösterir.'],
      ['LAYER', 'Çizim nesnelerini özellikleri ve görünürlükleri yönetilen katmanlarda düzenler.'],
      ['OSNAP', 'Uç nokta, orta nokta ve merkez gibi hassas geometrik noktalara yakalamayı sağlar.'],
      ['DIMENSION', 'Çizimde uzunluk, açı veya çap gibi ölçü bilgilerini gösterir.'],
      ['BLOCK', 'Seçilen nesneleri yeniden kullanılabilen tek bir blok tanımında toplar.'],
      ['XREF', 'Başka bir çizim dosyasını ana çizime dış referans olarak bağlar.'],
      ['UCS', 'Kullanıcı koordinat sisteminin başlangıç noktasını ve eksen yönlerini belirler.'],
      ['PLOT', 'Çizimi seçilen kâğıt, ölçek ve çıktı ayarlarıyla yazdırır veya PDF olarak alır.']
    ],
    SketchUp: [
      ['Select (Seç)', 'Modeldeki yüzleri, kenarları ve grupları seçer.'],
      ['Line (Çizgi)', 'Kenarlar ve yüzler oluşturarak model geometrisini çizer.'],
      ['Rectangle (Dikdörtgen)', 'Dikdörtgen bir yüzey oluşturmak için karşılıklı köşeleri belirler.'],
      ['Circle (Daire)', 'Merkez, yarıçap ve kenar sayısıyla dairesel yüzey oluşturur.'],
      ['Push/Pull (İt/Çek)', 'Düz bir yüzeyi iterek veya çekerek 3B hacme dönüştürür.'],
      ['Orbit (Yörünge)', 'Kamerayı modelin çevresinde döndürerek farklı açılardan görünüm sağlar.'],
      ['Pan (Kaydır)', 'Kamera açısını değiştirmeden görünümü yatay veya dikey kaydırır.'],
      ['Zoom (Yakınlaştır)', 'Model görünümünü yaklaştırır veya uzaklaştırır.'],
      ['Move (Taşı)', 'Geometriyi, grubu veya bileşeni başka bir konuma taşır.'],
      ['Rotate (Döndür)', 'Seçilen geometriyi bir merkez ve açı çevresinde döndürür.'],
      ['Scale (Ölçek)', 'Bir nesnenin veya grubun boyutlarını büyütür ya da küçültür.'],
      ['Follow Me (Beni İzle)', 'Bir profili seçilen yol boyunca süpürerek 3B biçim oluşturur.'],
      ['Offset (Ötele)', 'Bir yüzün kenarlarından eşit uzaklıkta iç veya dış sınır oluşturur.'],
      ['Paint Bucket (Boya Kovası)', 'Yüzeylere renk, malzeme veya doku uygular.'],
      ['Eraser (Silgi)', 'Kenarları siler; yumuşatma ayarlarıyla kenar görünümünü düzenler.'],
      ['Tape Measure (Şerit Metre)', 'Mesafe ölçer ve modelde kılavuz çizgiler oluşturur.'],
      ['Protractor (Açıölçer)', 'Açı ölçer ve açılı kılavuzlar oluşturur.'],
      ['Group (Grup)', 'Geometriyi diğer model parçalarından bağımsız düzenlenebilen bir birim yapar.'],
      ['Component (Bileşen)', 'Tekrarlanan nesneleri ortak tanım ve eş zamanlı güncellemeyle yönetir.'],
      ['Tags (Etiketler)', 'Model öğelerinin görünürlüğünü etiketlere göre yönetir.'],
      ['Scenes (Sahneler)', 'Kamera görünümü ve görünürlük ayarlarını kaydedip sunumda kullanır.'],
      ['Section Plane (Kesit Düzlemi)', 'Modelin içini göstermek için kesit görünümü oluşturur.'],
      ['Axes (Eksenler)', 'Modelin kırmızı, yeşil ve mavi koordinat eksenlerini yeniden konumlandırır.'],
      ['Sandbox (Arazi)', 'Kontur çizgilerinden veya ağlardan üç boyutlu arazi yüzeyi üretir.'],
      ['Shadows (Gölgeler)', 'Saat ve tarihe göre güneş ışığı ile model gölgelerini görüntüler.']
    ]
  };

  const autoCadDrawings = [
    '<path d="M72 166 160 72 268 166"/><circle cx="72" cy="166" r="6"/><circle cx="160" cy="72" r="6"/><circle cx="268" cy="166" r="6"/><text x="160" y="195" text-anchor="middle">A — B — C</text>',
    '<path d="M65 165 118 92 174 145 225 82 275 155"/><circle cx="65" cy="165" r="5"/><circle cx="275" cy="155" r="5"/><text x="165" y="194" text-anchor="middle">TEK BAĞLI ÇİZGİ</text>',
    '<circle cx="164" cy="122" r="64"/><path d="M164 122 210 77M164 46v14"/><circle cx="164" cy="122" r="5"/><text x="208" y="72">R</text>',
    '<path d="M80 164 A82 82 0 0 1 244 164"/><path d="M80 164h164M164 164V82" stroke-dasharray="5 5"/><circle cx="164" cy="164" r="5"/>',
    '<rect x="82" y="70" width="164" height="104"/><path d="M82 190h164M82 184v12M246 184v12"/><text x="164" y="211" text-anchor="middle">GENİŞLİK</text>',
    '<path d="M164 56 231 105 205 184 123 184 97 105Z"/><circle cx="164" cy="122" r="4"/><text x="164" y="211" text-anchor="middle">5 KENARLI ÇOKGEN</text>',
    '<rect x="68" y="107" width="64" height="52"/><rect x="218" y="107" width="64" height="52" stroke-dasharray="5 5"/><path d="M140 133h63m-12-9 12 9-12 9"/><text x="164" y="190" text-anchor="middle">TABAN NOKTASINDAN TAŞI</text>',
    '<rect x="67" y="105" width="58" height="52"/><rect x="184" y="105" width="58" height="52"/><rect x="247" y="105" width="40" height="52" stroke-dasharray="5 5"/><path d="M134 130h38m-10-9 10 9-10 9"/><text x="164" y="190" text-anchor="middle">ÖZGÜN + KOPYALAR</text>',
    '<rect x="104" y="95" width="120" height="70"/><path d="M164 130V58m0 0-8 13m8-13 8 13"/><path d="M104 79a82 82 0 0 1 115 24" fill="none"/><text x="164" y="198" text-anchor="middle">TABAN NOKTASI ÇEVRESİNDE</text>',
    '<rect x="71" y="103" width="74" height="58"/><rect x="185" y="103" width="74" height="58"/><path d="M165 58v130" stroke-dasharray="6 5"/><path d="M154 92h22"/><text x="165" y="213" text-anchor="middle">AYNA EKSENİ</text>',
    '<rect x="79" y="102" width="70" height="56"/><rect x="185" y="86" width="105" height="84""/><path d="M164 130h16m-8-8 8 8-8 8"/><text x="164" y="197" text-anchor="middle">ÖLÇEK KATSAYISI</text>',
    '<rect x="88" y="82" width="150" height="100"/><rect x="108" y="102" width="110" height="60" stroke-dasharray="5 4"/><path d="M240 94h36m-8-8 8 8-8 8"/><text x="164" y="210" text-anchor="middle">EŞİT UZAKLIKLI PARALEL</text>',
    '<path d="M72 165h196M164 72v122"/><path d="M72 120h92M164 120h104" stroke-width="8"/><path d="M153 109l11 11-11 11"/><text x="164" y="218" text-anchor="middle">KESME SINIRINDA TEMİZLE</text>',
    '<path d="M72 166h196M112 166V85"/><path d="M112 166V95" stroke-dasharray="5 5"/><path d="M103 106l9-11 9 11"/><text x="194" y="92">SINIRA UZAT</text>',
    '<path d="M82 166V82h82v84h92"/><path d="M164 82v84" stroke-dasharray="5 5"/><path d="M164 112a30 30 0 0 1 30 30"/><text x="164" y="205" text-anchor="middle">YUVARLATILMIŞ KÖŞE</text>',
    '<path d="M82 166V82h82v84h92"/><path d="M164 82 194 112"/><path d="M164 72v20M194 103h20"/><text x="164" y="205" text-anchor="middle">PAH KIRILMIŞ KÖŞE</text>',
    '<circle cx="164" cy="126" r="8"/><g><circle cx="164" cy="72" r="15"/><circle cx="218" cy="126" r="15"/><circle cx="164" cy="180" r="15"/><circle cx="110" cy="126" r="15"/></g><path d="M164 83v27m43 16h-27m-16 43v-27m-43-16h27"/>',
    '<rect x="83" y="72" width="162" height="104"/><path d="M95 170l80-86m-48 92 80-86m-48 92 72-77"/><text x="164" y="207" text-anchor="middle">KAPALI ALAN TARAMASI</text>',
    '<path d="M83 83h162M83 119h162M83 155h162"/><circle cx="101" cy="101" r="7"/><circle cx="101" cy="137" r="7"/><circle cx="101" cy="173" r="7"/><text x="164" y="207" text-anchor="middle">KATMAN 1 · 2 · 3</text>',
    '<path d="M82 166 164 72 246 166"/><circle cx="82" cy="166" r="8"/><circle cx="164" cy="72" r="8"/><circle cx="246" cy="166" r="8"/><path d="M70 184h24m-12-12v24"/><text x="164" y="210" text-anchor="middle">UÇ · ORTA · MERKEZ NOKTASI</text>',
    '<path d="M84 160h160"/><path d="M84 151v18m160-18v18M90 160h148m-9-7 9 7-9 7"/><text x="164" y="137" text-anchor="middle">1200</text><text x="164" y="201" text-anchor="middle">ÖLÇÜ ÇİZGİSİ</text>',
    '<rect x="87" y="76" width="154" height="102" rx="8" stroke-dasharray="7 5"/><rect x="125" y="101" width="78" height="52"/><path d="M164 76v25M87 127h38"/><text x="164" y="207" text-anchor="middle">YENİDEN KULLANILABİLİR BLOK</text>',
    '<rect x="79" y="76" width="92" height="104"/><rect x="185" y="76" width="92" height="104" stroke-dasharray="6 4"/><path d="M171 126h14m-8-8 8 8-8 8"/><text x="164" y="207" text-anchor="middle">HARİCİ ÇİZİM REFERANSI</text>',
    '<circle cx="164" cy="141" r="5"/><path d="M164 141h92m-12-8 12 8-12 8" stroke="#ff7777"/><path d="M164 141 111 88m0 12V88h12" stroke="#75dc9b"/><path d="M164 141v-76m-8 12 8-12 8 12" stroke="#6fc5ff"/><text x="270" y="145">X</text><text x="105" y="82">Y</text><text x="172" y="65">Z</text>',
    '<rect x="88" y="65" width="152" height="116"/><path d="M100 78h128M100 168h128M164 65v116" stroke-dasharray="5 4"/><path d="M96 191h136"/><text x="164" y="215" text-anchor="middle">KÂĞIT · ÖLÇEK · PDF</text>'
  ];

  const sketchUpDrawings = [
    '<path d="M83 77h150v98H83z"/><path d="M72 66h172v120H72z" stroke-dasharray="5 5"/><path d="M235 74l18-16 12 9-18 17z"/><text x="164" y="213" text-anchor="middle">YÜZ / KENAR SEÇİMİ</text>',
    '<path d="M86 162 163 83 244 162z"/><path d="M86 162h158M163 83v79" stroke-dasharray="5 4"/><circle cx="86" cy="162" r="5"/><circle cx="244" cy="162" r="5"/>',
    '<path d="M84 75h158v101H84z"/><path d="M84 75l75-32 83 32M242 75v101"/><text x="164" y="207" text-anchor="middle">DİKDÖRTGEN YÜZ</text>',
    '<ellipse cx="164" cy="125" rx="77" ry="51"/><path d="M87 125h154M164 74v102" stroke-dasharray="5 4"/><circle cx="164" cy="125" r="5"/><text x="214" y="111">R</text>',
    '<path d="M91 164h144l43-29-144 0z"/><path d="M91 164V111l43-28v52M235 164v-53l43-28v52M134 83h144"/><path d="M212 106V55m-9 12 9-12 9 12"/><text x="164" y="207" text-anchor="middle">YÜZEYİ 3B HACME ÇEK</text>',
    '<path d="M105 150 164 82l62 68M164 82v83M81 167h166"/><path d="M104 99a76 76 0 0 1 128 8"/><path d="M222 96l10 11-14 3"/><text x="164" y="207" text-anchor="middle">MODEL ÇEVRESİNDE KAMERA</text>',
    '<path d="M103 100h119v78H103z"/><path d="M164 84v-26m-8 9 8-9 8 9M91 139H65m9-8-9 8 9 8M234 139h27m-9-8 9 8-9 8"/><text x="164" y="207" text-anchor="middle">GÖRÜNÜMÜ KAYDIR</text>',
    '<rect x="119" y="87" width="90" height="68"/><path d="M101 74h126v94H101z" stroke-dasharray="5 5"/><circle cx="164" cy="121" r="50"/><path d="M164 71v14m0 72v14m-50-50h14m72 0h14"/>',
    '<path d="M83 150 131 104h47l44 46M83 150h139"/><path d="M144 127h93m-11-9 11 9-11 9"/><path d="M94 166 142 120" stroke-dasharray="5 4"/><text x="164" y="207" text-anchor="middle">GEOMETRİYİ YENİ KONUMA TAŞI</text>',
    '<path d="M100 150 164 92l64 58M100 150h128M164 92v58"/><path d="M164 78v-22m-8 9 8-9 8 9M238 150h22m-9-8 9 8-9 8"/><path d="M89 164a92 92 0 0 0 150 0"/>',
    '<path d="M104 154 164 104l64 50M104 154h124M164 104v50"/><path d="M92 80h144v105H92z" stroke-dasharray="5 5"/><rect x="92" y="80" width="8" height="8"/><rect x="232" y="80" width="8" height="8"/><rect x="92" y="177" width="8" height="8"/><rect x="232" y="177" width="8" height="8"/><text x="164" y="210" text-anchor="middle">SINIR KUTUSUYLA ÖLÇEKLE</text>',
    '<path d="M75 160h179M103 160l61-77 61 77"/><path d="M103 160 164 83l30 77 30-77" stroke-dasharray="5 4"/><path d="M95 173h139"/><text x="164" y="207" text-anchor="middle">PROFİLİ YOL BOYUNCA SÜPÜR</text>',
    '<path d="M92 77h144v100H92z"/><path d="M111 96h106v62H111z"/><path d="M92 77h144v100" stroke-dasharray="5 4"/><text x="164" y="207" text-anchor="middle">İÇ / DIŞ EŞİT KENAR</text>',
    '<path d="M84 84h160v92H84z"/><path d="M84 115h160M137 84v92M191 84v92"/><path d="M105 100h12v10h-12zM158 132h12v10h-12zM212 96h12v10h-12z" fill="#70e0ba"/><text x="164" y="207" text-anchor="middle">YÜZEYE MALZEME / DOKU</text>',
    '<path d="M80 156h180M80 98h180M164 98v58"/><path d="M157 111l7-13 7 13"/><path d="M219 91l22-22 8 8-22 22z"/><text x="164" y="207" text-anchor="middle">KENARI SİL / YUMUŞAT</text>',
    '<path d="M91 159h145M91 151v16m145-16v16M99 159h129m-9-7 9 7-9 7"/><path d="M91 87v95M236 87v95" stroke-dasharray="5 5"/><text x="164" y="207" text-anchor="middle">MESAFE ÖLÇ + KILAVUZ EKLE</text>',
    '<path d="M164 162 91 162M164 162 164 78M164 162 222 103"/><path d="M121 162a43 43 0 0 1 31-41"/><text x="132" y="134">45°</text><circle cx="164" cy="162" r="5"/>',
    '<path d="M84 78h160v105H84z" stroke-dasharray="6 5"/><path d="M104 158 150 112h48l28 46M104 158h122"/><text x="164" y="207" text-anchor="middle">BAĞIMSIZ DÜZENLENEN GRUP</text>',
    '<rect x="81" y="84" width="70" height="70"/><rect x="177" y="84" width="70" height="70"/><path d="M151 119h25m-9-9 9 9-9 9"/><path d="M92 165h145"/><text x="164" y="207" text-anchor="middle">EŞ BİLEŞENLERİ BİRLİKTE GÜNCELLE</text>',
    '<path d="M84 88h172M84 123h172M84 158h172"/><circle cx="100" cy="88" r="7" fill="#70e0ba"/><circle cx="100" cy="123" r="7" fill="#70e0ba"/><circle cx="100" cy="158" r="7"/><text x="164" y="195" text-anchor="middle">ETİKET GÖRÜNÜRLÜĞÜ</text>',
    '<rect x="82" y="76" width="78" height="95"/><rect x="170" y="76" width="78" height="95"/><path d="M104 143 122 112l18 31M192 143l18-31 18 31"/><text x="121" y="190" text-anchor="middle">1</text><text x="209" y="190" text-anchor="middle">2</text>',
    '<path d="M91 155 139 112l43 24 61-61M91 155h152M139 112v43M182 136v19"/><path d="M121 80h122v95" stroke="#ff918c" stroke-dasharray="6 4"/><text x="164" y="207" text-anchor="middle">KESİT DÜZLEMİ MODELİ AÇAR</text>',
    '<circle cx="164" cy="139" r="5"/><path d="M164 139h85m-11-8 11 8-11 8" stroke="#ff7777"/><path d="M164 139 111 86m0 12V86h12" stroke="#75dc9b"/><path d="M164 139V59m-8 12 8-12 8 12" stroke="#6fc5ff"/><text x="256" y="143">X</text><text x="104" y="81">Y</text><text x="171" y="59">Z</text>',
    '<path d="M83 163 111 135 137 145 164 104 192 127 218 91 247 119 264 163z"/><path d="M83 151h181M98 141h151M119 130h112M139 119h71" stroke-dasharray="4 4"/><text x="164" y="197" text-anchor="middle">KONTURDAN 3B ARAZİ</text>',
    '<path d="M88 166 164 87l76 79M88 166h152M164 87v79"/><circle cx="98" cy="76" r="13" fill="#f5d66f"/><path d="M108 87 134 111M128 111l11 2-4-10" stroke="#f5d66f"/><path d="M174 101 224 151M178 108 213 143" stroke="#ffffff55" stroke-dasharray="4 4"/><text x="164" y="204" text-anchor="middle">GÜNEŞ YÖNÜ → GÖLGE</text>'
  ];

  const phrasings = [
    name => `${name} aracı/komutu ne işe yarar?`,
    name => `${name} kullanıldığında modelde veya çizimde hangi işlem yapılır?`,
    name => `Hangi CAD aracı şu işlevi gerçekleştirir: ${name}?`,
    name => `${name} aracının temel kullanım amacı nedir?`
  ];
  const allQuestions = [];
  Object.entries(questionData).forEach(([category, entries]) => {
    entries.forEach(([name, answer], itemIndex) => {
      phrasings.forEach((makeQuestion, phrasingIndex) => allQuestions.push({
        id: `illustrated-${category}-${itemIndex}-${phrasingIndex}`,
        category, name, answer, q: makeQuestion(name), difficulty: 'medium', illustrationIndex: itemIndex
      }));
    });
  });

  // Keep the existing question UI and filters, replacing only its question content.
  facts.AutoCAD = questionData.AutoCAD;
  facts.SketchUp = questionData.SketchUp;
  bank = allQuestions;
  usedIds.clear();
  updatePool();

  const questionHeading = $('question');
  const drawFor = item => (item.category === 'SketchUp' ? sketchUpDrawings : autoCadDrawings)[item.illustrationIndex] || '';
  const renderIllustration = () => {
    const item = round[index];
    if (!item || !questionHeading) return;
    const key = `${item.category}:${item.illustrationIndex}`;
    if (questionHeading.dataset.diagramKey === key) return;
    questionHeading.dataset.diagramKey = key;
    document.getElementById('questionIllustration')?.remove();

    const figure = document.createElement('figure');
    figure.id = 'questionIllustration';
    figure.setAttribute('aria-label', `${item.name} aracını açıklayan teknik şema`);
    figure.style.cssText = 'width:min(100%,440px);margin:8px auto 12px;line-height:0';
    const image = document.createElement('img');
    const accent = item.category === 'SketchUp' ? '#70e0ba' : '#62d8ff';
    const title = String(item.name).replace(/[&<>"']/g, '');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 328 235"><rect width="328" height="235" rx="14" fill="#091a3d"/><g stroke="#294267" stroke-width="1" opacity=".55"><path d="M28 25v170M73 25v170M118 25v170M163 25v170M208 25v170M253 25v170M298 25v170M25 35h278M25 80h278M25 125h278M25 170h278"/></g><g fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${drawFor(item)}</g><rect x="12" y="202" width="304" height="24" rx="7" fill="#ffffff10"/><text x="22" y="218" fill="#f5f7ff" font-family="Arial,sans-serif" font-size="12" font-weight="700">${title}</text><text x="306" y="218" text-anchor="end" fill="${accent}" font-family="Arial,sans-serif" font-size="9">${item.category === 'SketchUp' ? '3B MODEL' : '2B ÇİZİM'}</text></svg>`;
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    image.alt = `${item.name}: ${item.answer}`;
    image.loading = 'eager';
    image.style.cssText = 'display:block;width:100%;height:auto;max-height:clamp(125px,30vh,220px);object-fit:contain;border:1px solid #ffffff2e;border-radius:14px;background:#091a3d';
    figure.appendChild(image);
    questionHeading.insertAdjacentElement('afterend', figure);
  };

  if (questionHeading) {
    new MutationObserver(renderIllustration).observe(questionHeading, { childList: true, characterData: true, subtree: true });
    renderIllustration();
  }
})();

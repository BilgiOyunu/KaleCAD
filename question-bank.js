// KALECAD illustrated question bank: 25 concepts x 4 phrasings = 100 questions per category.
// Original, lightweight SVG technical illustrations are generated locally (no external image downloads).
const kaleCadQuestionData = {
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

// Four distinct phrasings for each of the 25 concepts make exactly 100 quiz entries per category.
const kaleCadQuestionPhrasings = [
  name => `${name} aracı/komutu ne işe yarar?`,
  name => `${name} kullanıldığında modelde veya çizimde hangi işlem yapılır?`,
  name => `Hangi CAD aracı şu işlevi gerçekleştirir: ${name}?`,
  name => `${name} aracının temel kullanım amacı nedir?`
];

function buildBank() {
  const questions = [];
  for (const [category, entries] of Object.entries(kaleCadQuestionData)) {
    entries.forEach(([name, answer], itemIndex) => {
      kaleCadQuestionPhrasings.forEach((makeQuestion, phrasingIndex) => {
        questions.push({
          id: `illustrated-${category}-${itemIndex}-${phrasingIndex}`,
          category,
          name,
          answer,
          q: makeQuestion(name),
          difficulty: 'medium',
          illustrationIndex: itemIndex
        });
      });
    });
  }
  return questions;
}

function kaleCadEscapeSvgText(value) {
  return String(value).replace(/[&<>\"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
}

function kaleCadIllustration(item) {
  const isSketchUp = item.category === 'SketchUp';
  const idx = item.illustrationIndex || 0;
  const accent = isSketchUp ? '#70e0ba' : '#62d8ff';
  const grid = Array.from({ length: 8 }, (_, i) => `<path d="M${25 + i * 42} 24v192M24 ${25 + i * 25}h292"/>`).join('');
  let drawing = '';
  switch (idx % 8) {
    case 0: drawing = '<path d="M65 160 145 68 267 150"/><circle cx="145" cy="68" r="7"/><circle cx="65" cy="160" r="7"/><circle cx="267" cy="150" r="7"/><path d="M65 185h202" stroke-dasharray="5 7"/>'; break;
    case 1: drawing = '<rect x="76" y="72" width="170" height="104" rx="4"/><path d="M76 190h170M76 183v14M246 183v14"/><circle cx="161" cy="124" r="31"/>'; break;
    case 2: drawing = '<circle cx="160" cy="122" r="58"/><path d="M160 122 210 93M160 49v14M160 181v14M87 122h14M219 122h14"/><circle cx="160" cy="122" r="5"/>'; break;
    case 3: drawing = '<path d="M75 160 150 85l96 38-75 76zM150 85v76M171 199v-76M246 123v40"/><path d="M75 160v-50l75-75 96 38v50" stroke-dasharray="6 5"/>'; break;
    case 4: drawing = '<path d="M77 172h166M99 172V94h122v78M99 94l61-37 61 37M128 172v-44h64v44M105 105h22v22h-22M193 105h22v22h-22"/>'; break;
    case 5: drawing = '<path d="M79 164 160 63l81 101M79 164h162M111 125h98M129 102h62"/><path d="M160 63v101" stroke-dasharray="4 5"/><circle cx="160" cy="164" r="6"/>'; break;
    case 6: drawing = '<path d="M88 165 147 106l35 35 46-70M88 165h158M88 165v-60M147 106V60M228 71v-34"/><path d="M92 181h156" stroke-dasharray="4 5"/>'; break;
    default: drawing = '<path d="M87 160h146M102 143h116M119 126h82M136 109h48M153 92h14"/><path d="M87 160v-70l73-42 73 42v70M160 48v112"/><circle cx="160" cy="90" r="7"/>';
  }
  const title = kaleCadEscapeSvgText(item.name);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 245" role="img" aria-label="${title} CAD teknik çizim görseli"><rect width="340" height="245" rx="18" fill="#091a3d"/><g stroke="#294267" stroke-width="1" opacity=".55">${grid}</g><g fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${drawing}</g><rect x="18" y="204" width="304" height="27" rx="8" fill="#ffffff0d"/><text x="30" y="222" fill="#f5f7ff" font-family="Arial,sans-serif" font-size="13" font-weight="700">${title}</text><text x="310" y="222" fill="${accent}" text-anchor="end" font-family="Arial,sans-serif" font-size="10">${isSketchUp ? '3B MODEL' : '2B ÇİZİM'}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Replace the starter bank with exactly 100 AutoCAD + 100 SketchUp questions.
facts.AutoCAD = kaleCadQuestionData.AutoCAD;
facts.SketchUp = kaleCadQuestionData.SketchUp;
bank = buildBank();
usedIds.clear();
updatePool();

// Render a matching original technical illustration for every question.
const kaleCadQuestionHeading = $('question');
const kaleCadImageObserver = new MutationObserver(() => {
  const item = round[index];
  if (!item || !kaleCadQuestionHeading || !kaleCadQuestionHeading.parentNode) return;
  const key = `${item.category}:${item.name}`;
  if (kaleCadQuestionHeading.dataset.illustrationKey === key) return;
  kaleCadQuestionHeading.dataset.illustrationKey = key;
  document.getElementById('questionIllustration')?.remove();
  const figure = document.createElement('figure');
  figure.id = 'questionIllustration';
  figure.style.cssText = 'max-width:520px;margin:12px auto 18px;text-align:center';
  const image = document.createElement('img');
  image.src = kaleCadIllustration(item);
  image.alt = `${item.category}: ${item.name} için özgün CAD çizim görseli`;
  image.loading = 'eager';
  image.style.cssText = 'display:block;width:100%;max-height:300px;object-fit:contain;border:1px solid #ffffff2e;border-radius:16px;background:#091a3d';
  figure.appendChild(image);
  kaleCadQuestionHeading.parentNode.insertBefore(figure, kaleCadQuestionHeading);
});
kaleCadImageObserver.observe(kaleCadQuestionHeading, { childList: true, characterData: true, subtree: true });

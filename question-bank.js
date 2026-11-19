
/* KALECAD - SORU SISTEMI V2 */
(() => {
'use strict';

const questionData = {
  AutoCAD: [
    ['LINE','İki veya daha fazla noktayı düz çizgi parçalarıyla birleştirir.'],
    ['PLINE','Birbirine bağlı çizgi ve yay parçalarını tek nesne olarak oluşturur.'],
    ['CIRCLE','Merkez ve yarıçap veya çap bilgisiyle daire çizer.'],
    ['ARC','Belirlenen nokta ve açılarla yay çizer.'],
    ['RECTANG','Karşılıklı köşeleri belirleyerek dikdörtgen oluşturur.'],
    ['POLYGON','Kenar sayısına göre düzgün çokgen oluşturur.'],
    ['MOVE','Seçilen nesneleri başka bir konuma taşır.'],
    ['COPY','Seçilen nesnelerin kopyalarını oluşturur.'],
    ['ROTATE','Nesneleri taban noktası çevresinde döndürür.'],
    ['MIRROR','Nesnelerin simetrik kopyasını oluşturur.'],
    ['SCALE','Nesneleri büyütür veya küçültür.'],
    ['OFFSET','Bir nesneye belirli uzaklıkta paralel kopya oluşturur.'],
    ['TRIM','Nesnelerin istenmeyen kısımlarını keser.'],
    ['EXTEND','Nesneleri belirlenen sınıra kadar uzatır.'],
    ['FILLET','İki nesne arasına yuvarlatılmış geçiş ekler.'],
    ['CHAMFER','İki nesnenin köşesine pah kırar.'],
    ['ARRAY','Nesnelerin düzenli kopyalarını oluşturur.'],
    ['HATCH','Kapalı alanları tarama veya dolgu ile gösterir.'],
    ['LAYER','Çizimleri katmanlarda düzenler.'],
    ['OSNAP','Uç nokta ve orta nokta gibi hassas noktalara yakalar.'],
    ['DIMENSION','Uzunluk, açı ve çap gibi ölçüleri gösterir.'],
    ['BLOCK','Nesneleri yeniden kullanılabilir blok haline getirir.'],
    ['XREF','Başka bir çizimi dış referans olarak bağlar.'],
    ['UCS','Kullanıcı koordinat sistemini düzenler.'],
    ['PLOT','Çizimi yazdırır veya PDF olarak dışa aktarır.']
  ],
  SketchUp: [
    ['Select (Seç)','Modeldeki yüzleri, kenarları ve grupları seçer.'],
    ['Line (Çizgi)','Kenarlar ve yüzler oluşturarak geometri çizer.'],
    ['Rectangle (Dikdörtgen)','Dikdörtgen bir yüzey oluşturur.'],
    ['Circle (Daire)','Dairesel yüzey oluşturur.'],
    ['Push/Pull (İt/Çek)','Düz yüzeyi iterek veya çekerek 3B hacme dönüştürür.'],
    ['Orbit (Yörünge)','Kamerayı modelin çevresinde döndürür.'],
    ['Pan (Kaydır)','Görünümü yatay veya dikey kaydırır.'],
    ['Zoom (Yakınlaştır)','Model görünümünü yakınlaştırır veya uzaklaştırır.'],
    ['Move (Taşı)','Geometriyi veya grubu başka konuma taşır.'],
    ['Rotate (Döndür)','Seçilen geometriyi döndürür.'],
    ['Scale (Ölçek)','Nesnelerin boyutlarını değiştirir.'],
    ['Follow Me (Beni İzle)','Bir profili seçilen yol boyunca uzatır.'],
    ['Offset (Ötele)','Bir yüzün kenarlarından eşit uzaklıkta sınır oluşturur.'],
    ['Paint Bucket (Boya Kovası)','Yüzeylere renk ve malzeme uygular.'],
    ['Eraser (Silgi)','Kenarları siler veya yumuşatır.'],
    ['Tape Measure (Şerit Metre)','Mesafe ölçer ve kılavuz çizgiler oluşturur.'],
    ['Protractor (Açıölçer)','Açı ölçer ve açılı kılavuz oluşturur.'],
    ['Group (Grup)','Geometriyi bağımsız düzenlenebilir birim yapar.'],
    ['Component (Bileşen)','Tekrarlanan nesneleri ortak tanımla yönetir.'],
    ['Tags (Etiketler)','Model öğelerinin görünürlüğünü yönetir.'],
    ['Scenes (Sahneler)','Kamera görünümlerini kaydeder.'],
    ['Section Plane (Kesit)','Modelin içini göstermek için kesit oluşturur.'],
    ['Axes (Eksenler)','Koordinat eksenlerini yeniden konumlandırır.'],
    ['Sandbox (Arazi)','Kontur çizgilerinden üç boyutlu arazi oluşturur.'],
    ['Shadows (Gölgeler)','Güneş ışığı ve gölge görünümünü gösterir.']
  ]
};

const phrasings = [
  name => `${name} aracı/komutu ne işe yarar?`,
  name => `${name} kullanıldığında çizimde veya modelde hangi işlem yapılır?`,
  name => `${name} aracının temel kullanım amacı nedir?`,
  name => `${name} ile hangi işlem gerçekleştirilir?`
];

const allQuestions = [];

Object.entries(questionData).forEach(([category, entries]) => {
  entries.forEach(([name, answer], itemIndex) => {
    phrasings.forEach((makeQuestion, phrasingIndex) => {
      allQuestions.push({
        id: `kalecad-${category}-${itemIndex}-${phrasingIndex}`,
        category,
        name,
        answer,
        q: makeQuestion(name),
        difficulty: 'medium'
      });
    });
  });
});

/* MEVCUT OYUN SORU HAVUZUNA BAGLANTI */
facts.AutoCAD = questionData.AutoCAD;
facts.SketchUp = questionData.SketchUp;
bank = allQuestions;
usedIds.clear();
updatePool();

/* ESKI SORU GORSELLERINI TEMIZLE */
function removeQuestionImages() {
  document.getElementById('questionIllustration')?.remove();

  document.querySelectorAll(
    '#questionIllustration, .question-illustration, .question-image'
  ).forEach(el => el.remove());
}

/* MOBIL SORU EKRANI */
const styleId = 'kalecad-question-mobile';
document.getElementById(styleId)?.remove();

const style = document.createElement('style');
style.id = styleId;

style.textContent = `
  #questionIllustration,
  .question-illustration,
  .question-image {
    display:none !important;
  }

  @media(max-width:760px) {
    html,body {
      width:100% !important;
      max-width:100% !important;
      overflow-x:hidden !important;
    }

    body {
      min-height:100dvh;
    }

    #question,
    .question,
    .question-text {
      width:100% !important;
      max-width:100% !important;
      min-width:0 !important;
      font-size:clamp(19px,5.3vw,25px) !important;
      line-height:1.4 !important;
      margin:12px 0 16px !important;
      overflow-wrap:anywhere !important;
      word-break:normal !important;
    }

    #answers,
    .answers,
    .options,
    .answer-list {
      display:grid !important;
      grid-template-columns:minmax(0,1fr) !important;
      width:100% !important;
      gap:9px !important;
    }

    #answers button,
    .answers button,
    .options button,
    .answer,
    .option {
      display:block !important;
      width:100% !important;
      max-width:100% !important;
      min-width:0 !important;
      min-height:52px !important;
      padding:12px 14px !important;
      font-size:15px !important;
      line-height:1.4 !important;
      white-space:normal !important;
      overflow-wrap:anywhere !important;
      box-sizing:border-box !important;
    }

    .stats,
    .game-stats,
    .question-stats {
      display:flex !important;
      flex-wrap:wrap !important;
      justify-content:space-between !important;
      gap:8px !important;
      width:100% !important;
    }

    .feedback,
    .result,
    .explanation {
      width:100% !important;
      max-width:100% !important;
      overflow-wrap:anywhere !important;
    }

    button {
      touch-action:manipulation;
      -webkit-tap-highlight-color:transparent;
    }

    input,select {
      max-width:100% !important;
      font-size:16px !important;
    }

    img.question-image,
    #question img {
      display:none !important;
    }
  }

  @media(max-height:650px) and (max-width:760px) {
    #question,
    .question {
      font-size:18px !important;
      margin:6px 0 10px !important;
    }

    #answers button,
    .answers button {
      min-height:43px !important;
      padding:9px 12px !important;
    }
  }
`;

document.head.appendChild(style);

/* SORU EKRANI DEGISTIGINDE GORSELLERI TEMIZLE */
removeQuestionImages();

const observer = new MutationObserver(() => {
  removeQuestionImages();
});

observer.observe(document.body, {
  childList:true,
  subtree:true
});

})();

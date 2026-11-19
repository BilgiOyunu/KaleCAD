
/* KALECAD - AUTOCAD VE DIJITAL TASARIM ATOLYESI */
(() => {
  'use strict';

  const STORE = 'kalecad_autocad_atolye_v1';

  const commands = [
    ['LINE','Çizgi','İki nokta arasında düz çizgi çizer.','Duvar kenarı çizmek.'],
    ['PLINE','Çoklu Çizgi','Birbirine bağlı çizgiler oluşturur.','Bir oda sınırını tek nesne olarak çizmek.'],
    ['RECTANG','Dikdörtgen','Dikdörtgen oluşturur.','Oda planı çizmek.'],
    ['CIRCLE','Daire','Belirlenen merkez ve yarıçapla daire çizer.','Kolon veya masa çizmek.'],
    ['ARC','Yay','Dairesel yay oluşturur.','Kavisli duvar çizmek.'],
    ['OFFSET','Ötele','Bir nesnenin belirli mesafede paralel kopyasını oluşturur.','Duvar kalınlığı vermek.'],
    ['TRIM','Budama','Fazla çizgi parçalarını keser.','Kesişen çizgilerin fazlalıklarını silmek.'],
    ['EXTEND','Uzatma','Çizgileri sınır nesnesine kadar uzatır.','Duvar çizgilerini birleştirmek.'],
    ['FILLET','Yuvarlatma','İki nesne arasına yuvarlatılmış köşe oluşturur.','Mobilya köşelerini yumuşatmak.'],
    ['CHAMFER','Pah','İki nesne arasına açılı köşe oluşturur.','Köşelere pah vermek.'],
    ['MOVE','Taşı','Nesneleri başka bir konuma taşır.','Kapı konumunu değiştirmek.'],
    ['COPY','Kopyala','Nesnelerin kopyasını oluşturur.','Pencereleri çoğaltmak.'],
    ['ROTATE','Döndür','Nesneleri belirlenen açıyla döndürür.','Mobilyayı çevirmek.'],
    ['MIRROR','Aynala','Nesnelerin simetrik kopyasını oluşturur.','Simetrik cephe çizmek.'],
    ['SCALE','Ölçekle','Nesneleri büyütür veya küçültür.','Çizimi ölçeklendirmek.'],
    ['ARRAY','Dizi','Nesneleri düzenli şekilde çoğaltır.','Kolonları veya sandalyeleri çoğaltmak.'],
    ['ERASE','Sil','Seçilen nesneleri siler.','Gereksiz çizgileri kaldırmak.'],
    ['STRETCH','Ger','Nesnelerin seçilen bölümünü uzatır.','Oda ölçüsünü değiştirmek.'],
    ['HATCH','Tarama','Kapalı alanlara tarama uygular.','Kesitte malzeme göstermek.'],
    ['MATCHPROP','Özellik Eşleştir','Bir nesnenin özelliklerini diğerine aktarır.','Çizgi özelliklerini eşitlemek.'],
    ['DIM','Ölçülendirme','Nesnelerin ölçülerini gösterir.','Duvar uzunluğunu ölçülendirmek.'],
    ['DIMLINEAR','Doğrusal Ölçü','Yatay ve düşey ölçülendirme yapar.','Oda genişliğini göstermek.'],
    ['MTEXT','Çok Satırlı Yazı','Çok satırlı metin ekler.','Mahal isimlerini yazmak.'],
    ['TEXT','Yazı','Tek satırlı yazı ekler.','Çizime not eklemek.'],
    ['LAYER','Katman','Çizim katmanlarını yönetir.','Duvar, kapı ve mobilyayı ayırmak.'],
    ['BLOCK','Blok','Seçilen nesneleri tek blok haline getirir.','Kapı sembolü oluşturmak.'],
    ['INSERT','Ekle','Hazır blokları çizime ekler.','Mobilya sembolü yerleştirmek.'],
    ['EXPLODE','Patlat','Blok veya birleşik nesneleri parçalarına ayırır.','Bloğu ayrı çizgilere dönüştürmek.'],
    ['ZOOM','Yakınlaştır','Çizim görünümünü büyütür veya küçültür.','Detaylara yaklaşmak.'],
    ['PAN','Kaydır','Çizim alanında görünümü kaydırır.','Çizimin başka bölümüne geçmek.']
  ];

  const questions = [
    ['LINE komutu ne işe yarar?',['Çizgi çizer','Daire çizer','Yazı yazar','Alan tarar'],0],
    ['Dikdörtgen çizmek için hangi komut kullanılır?',['CIRCLE','RECTANG','OFFSET','TRIM'],1],
    ['Daire çizme komutu hangisidir?',['ARC','LINE','CIRCLE','COPY'],2],
    ['Duvar kalınlığı vermek için hangi komut kullanılır?',['OFFSET','ERASE','ZOOM','TEXT'],0],
    ['Fazla çizgileri kesmek için hangi komut kullanılır?',['EXTEND','TRIM','MOVE','SCALE'],1],
    ['Bir nesneyi taşımak için hangi komut kullanılır?',['COPY','ROTATE','MOVE','MIRROR'],2],
    ['Bir nesnenin kopyasını oluşturmak için hangisi kullanılır?',['COPY','ERASE','PAN','HATCH'],0],
    ['Simetrik kopya oluşturma komutu hangisidir?',['ARRAY','MIRROR','FILLET','BLOCK'],1],
    ['Nesneyi döndürmek için hangi komut kullanılır?',['SCALE','MOVE','ROTATE','TRIM'],2],
    ['Alan taraması yapmak için hangi komut kullanılır?',['HATCH','TEXT','LINE','PAN'],0],
    ['Katmanları yönetmek için hangi komut kullanılır?',['BLOCK','LAYER','ARC','COPY'],1],
    ['Ölçülendirme için kullanılan genel komut hangisidir?',['DIM','ERASE','ZOOM','INSERT'],0],
    ['Yazı eklemek için hangi komut kullanılır?',['OFFSET','TEXT','TRIM','SCALE'],1],
    ['Bir nesneyi büyütüp küçültmek için hangisi kullanılır?',['MOVE','COPY','SCALE','PAN'],2],
    ['Çizimi yakınlaştırmak için hangi komut kullanılır?',['ZOOM','HATCH','BLOCK','ARC'],0],
    ['Çizimi ekranda kaydırmak için hangi komut kullanılır?',['TRIM','PAN','DIM','TEXT'],1],
    ['Blok oluşturmak için hangi komut kullanılır?',['INSERT','EXPLODE','BLOCK','ERASE'],2],
    ['Hazır bloğu çizime eklemek için hangisi kullanılır?',['INSERT','MOVE','OFFSET','FILLET'],0],
    ['Bir bloğu parçalarına ayırmak için hangisi kullanılır?',['BLOCK','EXPLODE','COPY','ARRAY'],1],
    ['İki çizgiyi yuvarlak köşeyle birleştirmek için hangisi kullanılır?',['CHAMFER','FILLET','TRIM','EXTEND'],1],
    ['İki çizgi arasına pah oluşturmak için hangisi kullanılır?',['FILLET','ARC','CHAMFER','MIRROR'],2],
    ['Çizgiyi sınırına kadar uzatmak için hangisi kullanılır?',['EXTEND','TRIM','ERASE','SCALE'],0],
    ['Birden fazla bağlı çizgi oluşturmak için hangisi kullanılır?',['CIRCLE','PLINE','TEXT','PAN'],1],
    ['Düzenli çoğaltma yapmak için hangi komut kullanılır?',['ARRAY','MOVE','ARC','DIM'],0],
    ['Nesnenin özelliklerini başka nesneye aktaran komut hangisidir?',['MATCHPROP','ERASE','ZOOM','INSERT'],0],
    ['Kapı sembolü oluşturmak için hangi yöntem uygundur?',['BLOCK','PAN','ZOOM','HATCH'],0],
    ['Yatay ve düşey ölçü almak için hangi komut kullanılır?',['DIMLINEAR','CIRCLE','MIRROR','ARC'],0],
    ['Bir nesneyi silmek için hangi komut kullanılır?',['COPY','ERASE','OFFSET','BLOCK'],1],
    ['Kavisli çizgi oluşturmak için hangi komut kullanılır?',['ARC','LINE','TEXT','LAYER'],0],
    ['Bir çizimin farklı bölümlerini ayırmak için ne kullanılır?',['Katman','Zoom','Pan','Sil'],0],
    ['Oda planında duvar kalınlığı genellikle hangi komutla verilir?',['OFFSET','ROTATE','ERASE','TEXT'],0],
    ['Mimari çizimde kapı ve pencere sembolleri ne sağlar?',['Çizimi anlaşılır kılar','Dosyayı siler','Ölçeği değiştirir','Rengi kaldırır'],0],
    ['Çizim ölçeği neyi ifade eder?',['Gerçek ölçü ile çizim ölçüsü ilişkisini','Çizgi rengini','Dosya adını','Katman sayısını'],0],
    ['AutoCAD dosyasının temel çalışma uzantısı hangisidir?',['.DOCX','.DWG','.MP3','.JPG'],1],
    ['Çizimi PDF olarak paylaşmanın amacı nedir?',['Kolay görüntüleme ve çıktı','Çizimi silme','Katmanları kapatma','Ölçüleri bozma'],0],
    ['Kesit çizimi neyi gösterir?',['Yapının düşey düzlemde kesilmiş görünüşünü','Sadece çatıyı','Sadece vaziyeti','Mobilya rengini'],0],
    ['Plan çizimi hangi görünüşü ifade eder?',['Üstten görünüş','Alttan görünüş','Perspektif','Arka görünüş'],0],
    ['Cephe çizimi neyi gösterir?',['Yapının dış görünüşünü','Temel detayını','Sadece oda planını','Elektrik tesisatını'],0],
    ['Rölöve nedir?',['Mevcut yapının ölçülerek belgelenmesi','Yeni yapı ruhsatı','Mobilya kataloğu','Peyzaj sulaması'],0],
    ['Ölçü alırken hangi araç kullanılabilir?',['Şerit metre','Fırça','Makas','Zımpara'],0],
    ['SketchUp temel olarak hangi amaçla kullanılır?',['3B modelleme','Video montajı','Müzik düzenleme','Tablo hazırlama'],0],
    ['3B modellemede yükseklik hangi eksendir?',['X','Y','Z','Hiçbiri'],2],
    ['Bir yüzeyi yükselterek hacim oluşturma aracı hangisidir?',['Push/Pull','Eraser','Orbit','Paint'],0],
    ['Modeli farklı açılardan incelemek için hangi araç kullanılır?',['Orbit','Text','Line','Bucket'],0],
    ['SketchUp modelinde yüzey boyamak için hangi araç kullanılır?',['Paint Bucket','Move','Push/Pull','Tape Measure'],0],
    ['Bir modeli gruplamak neden faydalıdır?',['Geometriyi düzenli tutmak','Dosyayı silmek','Ekranı kapatmak','Ölçüyü küçültmek'],0],
    ['Mimari modellemede önce ne yapılması uygundur?',['Temel ölçü ve planı oluşturmak','Rastgele renk vermek','Dosyayı kapatmak','Gölge açmak'],0],
    ['Bir odanın uzunluğu ve genişliği hangi tür ölçülerdir?',['Yatay ölçüler','Düşey ölçüler','Açı ölçüleri','Renk değerleri'],0],
    ['Maket yapımında ölçek neden önemlidir?',['Gerçek boyutları orantılı küçültmek için','Renk seçmek için','Yapıştırıcı seçmek için','Işık ayarlamak için'],0],
    ['Teknik çizimde çizgi kalınlıkları neden farklıdır?',['Çizgi türlerini ve önemlerini ayırt etmek için','Dosyayı küçültmek için','Renkleri kaldırmak için','Ölçüleri silmek için'],0]
  ];

  const tasks = [
    ['Oda Planı','4 m × 5 m ölçülerinde dikdörtgen bir oda planı oluştur.','RECTANG, OFFSET, DIM'],
    ['Kapı ve Pencere','Oda planına bir kapı ve iki pencere yerleştir.','LINE, TRIM, ARC'],
    ['Mobilya Yerleşimi','Odaya yatak, dolap ve çalışma masası yerleştir.','RECTANG, COPY, MOVE'],
    ['Mutfak Planı','Mutfak tezgâhını ve temel ekipmanları çiz.','LINE, OFFSET, RECTANG'],
    ['Ölçülendirme','Hazırladığın planın duvar ölçülerini göster.','DIM, DIMLINEAR, TEXT'],
    ['Katman Düzeni','Duvar, kapı, pencere ve mobilyaları ayrı katmanlara ayır.','LAYER, MATCHPROP']
  ];

  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(STORE) || '{}');
  } catch (e) {
    saved = {};
  }

  function save() {
    try {
      localStorage.setItem(STORE, JSON.stringify(saved));
    } catch (e) {}
  }

  function addStyles() {
    if (document.getElementById('kale-cad-style')) return;

    const style = document.createElement('style');
    style.id = 'kale-cad-style';
    style.textContent = `
      #kale-cad-card{background:linear-gradient(135deg,#172d4d,#244c70);border:1px solid #426487;border-radius:16px;padding:20px;color:#fff;margin:16px 0;cursor:pointer}
      #kale-cad-card h3{font-size:21px;margin:0 0 8px}
      #kale-cad-card p{margin:0;color:#cbd8e8;font-size:13px}
      #kale-cad-modal{position:fixed;inset:0;background:#07111eee;z-index:999999;display:none;align-items:center;justify-content:center;padding:12px;font-family:Arial,sans-serif;color:#eef4ff}
      #kale-cad-modal .kcm-window{width:min(100%,1000px);height:min(92vh,850px);background:#101f34;border:1px solid #36516e;border-radius:18px;display:flex;flex-direction:column;overflow:hidden}
      #kale-cad-modal .kcm-head{padding:16px 18px;background:#172d49;display:flex;justify-content:space-between;align-items:center;gap:10px}
      #kale-cad-modal .kcm-head h2{font-size:20px;margin:0}
      #kale-cad-modal button{cursor:pointer}
      #kale-cad-modal .kcm-close{border:0;background:#304963;color:white;border-radius:9px;padding:9px 13px;font-size:18px}
      #kale-cad-modal .kcm-tabs{display:flex;gap:7px;padding:10px;overflow-x:auto;background:#12243a}
      #kale-cad-modal .kcm-tab{border:1px solid #36516e;background:#1b3049;color:#dce8f7;padding:10px 13px;border-radius:9px;white-space:nowrap}
      #kale-cad-modal .kcm-tab.active{background:#3977ad;border-color:#68a9e2;color:white}
      #kale-cad-modal .kcm-content{padding:17px;overflow:auto;flex:1}
      #kale-cad-modal .kcm-card{background:#192d45;border:1px solid #304a67;border-radius:12px;padding:14px;margin-bottom:10px}
      #kale-cad-modal .kcm-card h3{margin:0 0 7px;font-size:16px;color:#fff}
      #kale-cad-modal .kcm-card p{margin:5px 0;color:#c8d5e5;line-height:1.5;font-size:13px}
      #kale-cad-modal .kcm-muted{color:#aebed0;font-size:13px}
      #kale-cad-modal .kcm-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}
      #kale-cad-modal input,#kale-cad-modal select{background:#0d1b2c;color:white;border:1px solid #405a77;padding:10px;border-radius:8px;max-width:100%}
      #kale-cad-modal .kcm-action{background:#3977ad;color:white;border:0;padding:10px 14px;border-radius:8px;margin:4px 3px 4px 0}
      #kale-cad-modal .kcm-secondary{background:#304963;color:white;border:0;padding:10px 14px;border-radius:8px;margin:4px 3px 4px 0}
      #kale-cad-modal .kcm-answer{display:block;width:100%;text-align:left;background:#203750;border:1px solid #3d5874;color:#fff;border-radius:9px;padding:12px;margin:7px 0}
      #kale-cad-modal .kcm-answer:disabled{opacity:.8}
      #kale-cad-modal .kcm-answer.correct{background:#176344;border-color:#38b887}
      #kale-cad-modal .kcm-answer.wrong{background:#71343c;border-color:#d86b75}
      #kale-cad-modal #kcm-canvas{width:100%;height:360px;background:#f4f6f8;border-radius:10px;touch-action:none;display:block}
      #kale-cad-modal .kcm-tool{background:#203750;color:white;border:1px solid #46617c;padding:9px 12px;border-radius:8px;margin:3px}
      #kale-cad-modal .kcm-tool.active{background:#3977ad}
      #kale-cad-modal .kcm-link{display:inline-block;color:#9dd0ff;margin-top:10px;text-decoration:none;font-weight:bold}
      @media(max-width:600px){#kale-cad-modal{padding:0}#kale-cad-modal .kcm-window{height:100dvh;width:100%;border-radius:0}#kale-cad-modal .kcm-content{padding:12px}#kale-cad-modal #kcm-canvas{height:300px}#kale-cad-modal .kcm-head h2{font-size:17px}}
    `;
    document.head.appendChild(style);
  }

  function mountCard() {
    if (document.getElementById('kale-cad-card')) return;

    const home = document.getElementById('home');
    if (!home) return;

    const card = document.createElement('div');
    card.id = 'kale-cad-card';
    card.innerHTML = `
      <h3>AutoCAD ve Dijital Tasarım Atölyesi</h3>
      <p>Komut rehberi • Bilgi yarışması • Uygulama görevleri • Dijital tasarım araçları</p>
    `;
    card.addEventListener('click', openWorkshop);

    const target = home.querySelector('.menu-grid,.games-grid,.home-grid,.game-grid');
    if (target) target.appendChild(card);
    else home.appendChild(card);
  }

  function openWorkshop() {
    addStyles();

    let modal = document.getElementById('kale-cad-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'kale-cad-modal';
      modal.innerHTML = `
        <div class="kcm-window">
          <div class="kcm-head">
            <h2>AutoCAD ve Dijital Tasarım Atölyesi</h2>
            <button class="kcm-close" id="kcm-close" aria-label="Kapat">✕</button>
          </div>
          <div class="kcm-tabs">
            <button class="kcm-tab active" data-tab="learn">Komut Rehberi</button>
            <button class="kcm-tab" data-tab="quiz">Bilgi Yarışması</button>
            <button class="kcm-tab" data-tab="tasks">Uygulama Görevleri</button>
            <button class="kcm-tab" data-tab="draw">Çizim Alanı</button>
            <button class="kcm-tab" data-tab="digital">Dijital Atölye</button>
          </div>
          <div class="kcm-content" id="kcm-content"></div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener('click', e => {
        if (e.target === modal) closeWorkshop();
      });

      modal.querySelector('#kcm-close').addEventListener('click', closeWorkshop);

      modal.querySelectorAll('.kcm-tab').forEach(btn => {
        btn.addEventListener('click', () => showTab(btn.dataset.tab));
      });

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeWorkshop();
      });
    }

    modal.style.display = 'flex';
    showTab('learn');
  }

  function closeWorkshop() {
    const modal = document.getElementById('kale-cad-modal');
    if (modal) modal.style.display = 'none';
  }

  function showTab(tab) {
    const modal = document.getElementById('kale-cad-modal');
    if (!modal) return;

    modal.querySelectorAll('.kcm-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    const panel = modal.querySelector('#kcm-content');

    if (tab === 'learn') renderLearn(panel);
    if (tab === 'quiz') renderQuiz(panel);
    if (tab === 'tasks') renderTasks(panel);
    if (tab === 'draw') renderDraw(panel);
    if (tab === 'digital') renderDigital(panel);
  }

  function renderLearn(panel) {
    panel.innerHTML = `
      <h2>AutoCAD Komut Rehberi</h2>
      <p class="kcm-muted">Temel komutları incele, ne işe yaradıklarını ve mimari çizimde nerelerde kullanıldıklarını öğren.</p>
      <input id="kcm-search" placeholder="Komut veya açıklama ara..." style="width:100%;box-sizing:border-box;margin:12px 0">
      <div id="kcm-command-list" class="kcm-grid"></div>
    `;

    const list = panel.querySelector('#kcm-command-list');

    function draw(filter = '') {
      const q = filter.toLocaleLowerCase('tr');
      list.innerHTML = '';

      commands.filter(c => c.join(' ').toLocaleLowerCase('tr').includes(q)).forEach(c => {
        const item = document.createElement('div');
        item.className = 'kcm-card';
        item.innerHTML = `
          <h3>${c[0]} – ${c[1]}</h3>
          <p>${c[2]}</p>
          <p><strong>Kullanım örneği:</strong> ${c[3]}</p>
        `;
        list.appendChild(item);
      });

      if (!list.children.length) {
        list.innerHTML = '<p class="kcm-muted">Aradığın komut bulunamadı.</p>';
      }
    }

    panel.querySelector('#kcm-search').addEventListener('input', e => draw(e.target.value));
    draw();
  }

  function renderQuiz(panel) {
    let current = 0;
    let score = 0;
    let order = [...questions].sort(() => Math.random() - .5).slice(0, 10);
    let answered = false;

    panel.innerHTML = `
      <h2>AutoCAD Bilgi Yarışması</h2>
      <p class="kcm-muted">Her turda 10 soru bulunur. Her doğru cevap 10 puandır.</p>
      <div id="kcm-quiz-area"></div>
    `;

    const area = panel.querySelector('#kcm-quiz-area');

    function drawQuestion() {
      answered = false;

      if (current >= order.length) {
        area.innerHTML = `
          <div class="kcm-card">
            <h3>Tur Tamamlandı</h3>
            <p>Doğru cevap sayın: <strong>${score / 10} / 10</strong></p>
            <p>Toplam puanın: <strong>${score}</strong></p>
            <button class="kcm-action" id="kcm-restart">Yeni Tur Başlat</button>
          </div>
        `;
        area.querySelector('#kcm-restart').addEventListener('click', () => {
          current = 0;
          score = 0;
          order = [...questions].sort(() => Math.random() - .5).slice(0, 10);
          drawQuestion();
        });
        return;
      }

      const q = order[current];
      area.innerHTML = `
        <div class="kcm-card">
          <p class="kcm-muted">Soru ${current + 1} / ${order.length} · Puan: ${score}</p>
          <h3>${q[0]}</h3>
          <div id="kcm-options"></div>
          <p id="kcm-feedback" class="kcm-muted"></p>
          <button class="kcm-action" id="kcm-next" style="display:none">Sonraki Soru</button>
        </div>
      `;

      const options = area.querySelector('#kcm-options');

      q[1].forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'kcm-answer';
        btn.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
        btn.addEventListener('click', () => {
          if (answered) return;
          answered = true;

          const correct = index === q[2];
          if (correct) score += 10;

          options.querySelectorAll('button').forEach((b, i) => {
            b.disabled = true;
            if (i === q[2]) b.classList.add('correct');
            else if (i === index) b.classList.add('wrong');
          });

          area.querySelector('#kcm-feedback').textContent = correct
            ? 'Doğru cevap! 10 puan kazandın.'
            : `Yanlış cevap. Doğru cevap: ${q[1][q[2]]}`;

          area.querySelector('#kcm-next').style.display = 'inline-block';
        });
        options.appendChild(btn);
      });

      area.querySelector('#kcm-next').addEventListener('click', () => {
        current++;
        drawQuestion();
      });
    }

    drawQuestion();
  }

  function renderTasks(panel) {
    panel.innerHTML = `
      <h2>Uygulama Görevleri</h2>
      <p class="kcm-muted">Görevleri sırayla tamamla. Tamamladığın görevleri işaretleyebilirsin.</p>
      <div id="kcm-task-list"></div>
      <p id="kcm-task-progress" class="kcm-muted"></p>
    `;

    const list = panel.querySelector('#kcm-task-list');

    function draw() {
      list.innerHTML = '';

      tasks.forEach((task, i) => {
        const done = !!(saved.tasks && saved.tasks[i]);
        const card = document.createElement('div');
        card.className = 'kcm-card';

        const title = document.createElement('h3');
        title.textContent = `${i + 1}. ${task[0]}`;

        const desc = document.createElement('p');
        desc.textContent = task[1];

        const tools = document.createElement('p');
        tools.innerHTML = `<strong>Kullanılabilecek komutlar:</strong> ${task[2]}`;

        const label = document.createElement('label');
        label.style.display = 'block';
        label.style.marginTop = '12px';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = done;
        checkbox.style.marginRight = '8px';
        checkbox.addEventListener('change', () => {
          if (!saved.tasks) saved.tasks = {};
          saved.tasks[i] = checkbox.checked;
          save();
          draw();
        });

        label.append(checkbox, document.createTextNode('Görevi tamamladım'));

        card.append(title, desc, tools, label);
        list.appendChild(card);
      });

      const count = tasks.filter((_, i) => saved.tasks && saved.tasks[i]).length;
      panel.querySelector('#kcm-task-progress').textContent =
        `Tamamlanan görev: ${count} / ${tasks.length}`;
    }

    draw();
  }

  function renderDraw(panel) {
    panel.innerHTML = `
      <h2>Basit Çizim Alanı</h2>
      <p class="kcm-muted">Bu alan temel çizim alıştırmaları içindir. Gerçek AutoCAD yerine geçmez ve DWG dosyası oluşturmaz.</p>
      <div style="margin:10px 0">
        <button class="kcm-tool active" data-tool="line">Çizgi</button>
        <button class="kcm-tool" data-tool="rect">Dikdörtgen</button>
        <button class="kcm-tool" data-tool="circle">Daire</button>
        <button class="kcm-secondary" id="kcm-undo">Geri Al</button>
        <button class="kcm-secondary" id="kcm-clear">Temizle</button>
        <button class="kcm-action" id="kcm-export">PNG İndir</button>
      </div>
      <canvas id="kcm-canvas" width="1000" height="600"></canvas>
      <p class="kcm-muted">Seçtiğin aracı kullanarak çizim alanına dokun veya tıkla. Şekli tamamlamak için ikinci noktayı belirle.</p>
    `;

    const canvas = panel.querySelector('#kcm-canvas');
    const ctx = canvas.getContext('2d');
    let tool = 'line';
    let start = null;
    let preview = null;
    let shapes = [];

    function point(e) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) * canvas.width / rect.width,
        y: (e.clientY - rect.top) * canvas.height / rect.height
      };
    }

    function paint() {
      ctx.fillStyle = '#f4f6f8';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#dce3ea';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      [...shapes, ...(preview ? [preview] : [])].forEach(s => {
        ctx.strokeStyle = '#183b5b';
        ctx.lineWidth = 3;
        ctx.beginPath();

        if (s.type === 'line') {
          ctx.moveTo(s.x1, s.y1);
          ctx.lineTo(s.x2, s.y2);
        } else if (s.type === 'rect') {
          ctx.rect(s.x1, s.y1, s.x2 - s.x1, s.y2 - s.y1);
        } else if (s.type === 'circle') {
          const r = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
          ctx.arc(s.x1, s.y1, r, 0, Math.PI * 2);
        }

        ctx.stroke();
      });
    }

    panel.querySelectorAll('[data-tool]').forEach(btn => {
      btn.addEventListener('click', () => {
        tool = btn.dataset.tool;
        start = null;
        panel.querySelectorAll('[data-tool]').forEach(b => b.classList.toggle('active', b === btn));
      });
    });

    canvas.addEventListener('pointerdown', e => {
      start = point(e);
      preview = null;
      canvas.setPointerCapture(e.pointerId);
    });

    canvas.addEventListener('pointermove', e => {
      if (!start) return;
      const p = point(e);
      preview = { type: tool, x1: start.x, y1: start.y, x2: p.x, y2: p.y };
      paint();
    });

    canvas.addEventListener('pointerup', e => {
      if (!start) return;
      const p = point(e);
      shapes.push({ type: tool, x1: start.x, y1: start.y, x2: p.x, y2: p.y });
      start = null;
      preview = null;
      paint();
    });

    panel.querySelector('#kcm-undo').addEventListener('click', () => {
      shapes.pop();
      paint();
    });

    panel.querySelector('#kcm-clear').addEventListener('click', () => {
      shapes = [];
      preview = null;
      start = null;
      paint();
    });

    panel.querySelector('#kcm-export').addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'kalecad-cizim.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });

    paint();
  }

  function renderDigital(panel) {
    const tools = [
      {
        name: 'SketchUp Free',
        type: '3B Modelleme',
        desc: 'Konut, oda, mobilya ve iç mekân modelleri oluşturmak için tarayıcı üzerinden 3B modelleme.',
        url: 'https://app.sketchup.com/',
        button: 'SketchUp Web’i Aç'
      },
      {
        name: 'Tinkercad',
        type: '3B Tasarım',
        desc: 'Temel geometrik şekillerle 3B tasarıma başlamak ve modelleme mantığını öğrenmek için.',
        url: 'https://www.tinkercad.com/',
        button: 'Tinkercad’i Aç'
      },
      {
        name: 'OpenPlan3D',
        type: 'Mimari Plan',
        desc: 'Kat planı hazırlamak, oda yerleşimi yapmak ve mekânı 3B olarak incelemek için.',
        url: 'https://openplan3d.com/',
        button: 'OpenPlan3D’yi Aç'
      },
      {
        name: 'OpenCAD Studio',
        type: '2B CAD Çizim',
        desc: 'Tarayıcı üzerinden 2B teknik çizim ve CAD araçlarıyla çalışmak için.',
        url: 'https://www.opencad.studio/2d-cad-online/',
        button: 'OpenCAD’i Aç'
      },
      {
        name: 'FlatCAD',
        type: '2B Teknik Çizim',
        desc: 'Ölçülü çizim, temel CAD düzenlemeleri ve teknik çizim alıştırmaları için.',
        url: 'https://flatcad.com/',
        button: 'FlatCAD’i Aç'
      },
      {
        name: 'Cadelo',
        type: 'DWG / DXF Çizim',
        desc: 'Tarayıcı üzerinden 2B CAD çizimleri açmak ve düzenlemek için çevrim içi araç.',
        url: 'https://cadelo.app/',
        button: 'Cadelo’yu Aç'
      }
    ];

    panel.innerHTML = `
      <h2>Dijital Atölye</h2>
      <p class="kcm-muted">Bilgisayara program kurmadan, internet tarayıcısı üzerinden kullanabileceğin tasarım ve çizim araçları.</p>
      <div class="kcm-grid" id="kcm-digital-list"></div>
      <div class="kcm-card" style="margin-top:12px">
        <h3>Kullanım Bilgisi</h3>
        <p>Bu bağlantılar KALECAD dışındaki çevrim içi hizmetlere yönlendirir. Bazı araçlar hesap açmanı isteyebilir. Ücretsiz kullanım koşulları ve özellikleri zaman içinde değişebilir.</p>
        <p>Öğretmeninin yönlendirmesiyle uygun aracı seçerek çalışmalarına başlayabilirsin.</p>
      </div>
    `;

    const list = panel.querySelector('#kcm-digital-list');

    tools.forEach(tool => {
      const card = document.createElement('div');
      card.className = 'kcm-card';

      const heading = document.createElement('h3');
      heading.textContent = tool.name;

      const type = document.createElement('p');
      type.innerHTML = `<strong>${tool.type}</strong>`;

      const desc = document.createElement('p');
      desc.textContent = tool.desc;

      const link = document.createElement('a');
      link.className = 'kcm-link';
      link.href = tool.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = tool.button;

      card.append(heading, type, desc, link);
      list.appendChild(card);
    });
  }

  function boot() {
    addStyles();
    mountCard();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  const observer = new MutationObserver(() => {
    if (!document.getElementById('kale-cad-card')) mountCard();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

})();

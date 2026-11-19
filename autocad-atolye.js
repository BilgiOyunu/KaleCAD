
/* KALECAD - YENI DİJİTAL TASARIM ATOLYESI */
(() => {
  'use strict';

  if (window.KALECAD_ATOLYE_V2) return;
  window.KALECAD_ATOLYE_V2 = true;

  const STORE = 'kalecad_atolye_v2';
  const commands = [
    ['LINE','Çizgi','İki nokta arasında çizgi çizer.','Duvar kenarı çizmek.'],
    ['PLINE','Çoklu Çizgi','Birbirine bağlı çizgiler oluşturur.','Oda sınırı çizmek.'],
    ['RECTANG','Dikdörtgen','Dikdörtgen oluşturur.','Oda planı çizmek.'],
    ['CIRCLE','Daire','Daire oluşturur.','Kolon veya masa çizmek.'],
    ['ARC','Yay','Dairesel yay oluşturur.','Kapı açılımı çizmek.'],
    ['OFFSET','Ötele','Paralel kopya oluşturur.','Duvar kalınlığı vermek.'],
    ['TRIM','Budama','Fazla çizgileri keser.','Kapı boşluğu açmak.'],
    ['EXTEND','Uzatma','Çizgileri uzatır.','Duvarları birleştirmek.'],
    ['MOVE','Taşı','Nesneleri taşır.','Mobilya konumunu değiştirmek.'],
    ['COPY','Kopyala','Nesneleri çoğaltır.','Pencere kopyalamak.'],
    ['ROTATE','Döndür','Nesneleri döndürür.','Mobilyayı çevirmek.'],
    ['MIRROR','Aynala','Simetrik kopya oluşturur.','Cephe çizmek.'],
    ['SCALE','Ölçekle','Nesneleri büyütür veya küçültür.','Çizimi ölçeklendirmek.'],
    ['ARRAY','Dizi','Düzenli çoğaltma yapar.','Kolonları çoğaltmak.'],
    ['ERASE','Sil','Nesneleri siler.','Gereksiz çizgileri kaldırmak.'],
    ['HATCH','Tarama','Kapalı alanları tarar.','Kesitte malzeme göstermek.'],
    ['DIM','Ölçülendirme','Ölçü ekler.','Duvar uzunluğunu göstermek.'],
    ['MTEXT','Çok Satırlı Yazı','Çok satırlı metin ekler.','Mahal isimlerini yazmak.'],
    ['LAYER','Katman','Çizim katmanlarını yönetir.','Duvar ve mobilyayı ayırmak.'],
    ['BLOCK','Blok','Nesneleri blok haline getirir.','Kapı sembolü oluşturmak.'],
    ['INSERT','Ekle','Hazır blok ekler.','Mobilya sembolü yerleştirmek.'],
    ['EXPLODE','Patlat','Blokları parçalarına ayırır.','Bloğu düzenlemek.'],
    ['FILLET','Yuvarlatma','Köşeleri yuvarlatır.','Mobilya köşesi düzenlemek.'],
    ['CHAMFER','Pah','Açılı köşe oluşturur.','Köşelere pah vermek.']
  ];

  const questions = [
    ['LINE komutu ne işe yarar?',['Çizgi çizer','Daire çizer','Yazı yazar','Tarama yapar'],0],
    ['Dikdörtgen komutu hangisidir?',['CIRCLE','RECTANG','OFFSET','TRIM'],1],
    ['Daire çizmek için hangi komut kullanılır?',['ARC','LINE','CIRCLE','COPY'],2],
    ['Duvar kalınlığı hangi komutla verilir?',['OFFSET','ERASE','ZOOM','TEXT'],0],
    ['Fazla çizgileri kesen komut hangisidir?',['EXTEND','TRIM','MOVE','SCALE'],1],
    ['Nesne taşımak için hangisi kullanılır?',['COPY','ROTATE','MOVE','MIRROR'],2],
    ['Simetrik kopya komutu hangisidir?',['ARRAY','MIRROR','FILLET','BLOCK'],1],
    ['Nesneyi döndürme komutu hangisidir?',['SCALE','MOVE','ROTATE','TRIM'],2],
    ['Katmanları hangi komut yönetir?',['BLOCK','LAYER','ARC','COPY'],1],
    ['Alan taraması hangi komutla yapılır?',['HATCH','TEXT','LINE','PAN'],0],
    ['AutoCAD dosya uzantısı hangisidir?',['DOCX','DWG','MP3','JPG'],1],
    ['Plan çizimi hangi görünüşü ifade eder?',['Üstten','Alttan','Perspektif','Arka'],0],
    ['Kesit çizimi neyi gösterir?',['Düşey kesilmiş görünüşü','Sadece çatıyı','Sadece vaziyeti','Mobilyayı'],0],
    ['Rölöve nedir?',['Mevcut yapının ölçülerek belgelenmesi','Ruhsat','Mobilya kataloğu','Peyzaj'],0],
    ['SketchUp hangi amaçla kullanılır?',['3B modelleme','Video montajı','Müzik','Tablo'],0],
    ['SketchUp Push/Pull aracı ne yapar?',['Yüzeyi yükseltip hacim oluşturur','Silme yapar','Boyar','Döndürür'],0],
    ['SketchUp Orbit aracı ne işe yarar?',['Modelin çevresinde görünümü döndürür','Yazı yazar','Ölçü alır','Silme yapar'],0],
    ['3B modellemede yükseklik ekseni hangisidir?',['X','Y','Z','Hiçbiri'],2],
    ['Bir modeli gruplamak neden önemlidir?',['Geometriyi düzenlemek','Dosyayı silmek','Rengi kaldırmak','Ekranı kapatmak'],0],
    ['Ölçek neyi ifade eder?',['Gerçek ölçü ile çizim ölçüsü ilişkisini','Renkleri','Katman sayısını','Dosya adını'],0]
  ];

  const tasks = [
    ['Oda Planı','4 × 5 metre ölçülerinde bir oda planı oluştur.','RECTANG • OFFSET • DIM'],
    ['Kapı ve Pencere','Oda planına bir kapı ve iki pencere yerleştir.','LINE • TRIM • ARC'],
    ['Mobilya Yerleşimi','Odaya yatak, dolap ve çalışma masası yerleştir.','RECTANG • COPY • MOVE'],
    ['Mutfak Planı','Mutfak tezgâhı ve temel ekipmanları çiz.','LINE • OFFSET • RECTANG'],
    ['SketchUp Oda Modeli','Çizdiğin oda planını üç boyutlu modele dönüştür.','Rectangle • Push/Pull • Orbit'],
    ['Konut Giriş Holü','Vestiyer ve giriş holü modeli oluştur.','Rectangle • Move • Push/Pull']
  ];

  const sketchLessons = [
    ['Arayüzü Tanı','Modelleme alanı, araç çubukları ve görünüş kontrolünü öğren.'],
    ['Temel Şekiller','Rectangle, Line ve Circle araçlarıyla geometrik şekiller çiz.'],
    ['Push/Pull','Çizdiğin yüzeyleri yükselterek üç boyutlu hacimler oluştur.'],
    ['Move ve Copy','Nesneleri taşı, kopyala ve doğru konumlandır.'],
    ['Orbit ve Pan','Modelini farklı açılardan incele ve görünüşü kaydır.'],
    ['Gruplama','Duvar, mobilya ve diğer elemanları ayrı gruplara ayır.'],
    ['Malzeme ve Renk','Paint Bucket ile yüzeylere malzeme ve renk uygula.'],
    ['İç Mekân Modelleme','Oda, mutfak, vestiyer ve mobilya modellemeyi dene.']
  ];

  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(STORE) || '{}'); }
  catch (_) { saved = {}; }

  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(saved)); }
    catch (_) {}
  }

  function styles() {
    if (document.getElementById('kcv2-style')) return;
    const s = document.createElement('style');
    s.id = 'kcv2-style';
    s.textContent = `
      #kale-cad-card {
        display:block;width:100%;box-sizing:border-box;
        padding:22px;margin:18px 0;border-radius:19px;
        cursor:pointer;color:white;
        background:linear-gradient(130deg,#102c50,#12618a);
        border:1px solid #3a8cba;box-shadow:0 10px 25px #0002;
      }
      #kale-cad-card h3{font-size:21px;margin:0 0 8px;color:white}
      #kale-cad-card p{font-size:13px;color:#d4eaff;margin:0}
      #kcv2{position:fixed;inset:0;z-index:9999999;
        display:none;background:#071426;color:#eef6ff;
        font-family:Arial,sans-serif;overflow:auto}
      #kcv2 *{box-sizing:border-box}
      #kcv2 .shell{max-width:1200px;min-height:100%;
        margin:auto;background:#0b1d32}
      #kcv2 .top{position:sticky;top:0;z-index:5;
        display:flex;align-items:center;justify-content:space-between;
        gap:12px;padding:15px 18px;background:#102b49;
        border-bottom:1px solid #294967}
      #kcv2 .brand{font-size:19px;font-weight:900}
      #kcv2 .brand small{display:block;color:#91badb;
        font-size:10px;letter-spacing:2px;margin-top:4px}
      #kcv2 button{cursor:pointer;font:inherit}
      #kcv2 .close{background:#294966;border:0;color:white;
        border-radius:10px;padding:11px 15px}
      #kcv2 .hero{padding:24px 20px 18px;
        background:linear-gradient(120deg,#123c62,#0d2946)}
      #kcv2 .hero h1{font-size:clamp(24px,5vw,38px);
        line-height:1.15;margin:0 0 10px}
      #kcv2 .hero p{color:#c0d9ef;line-height:1.6;margin:0}
      #kcv2 .nav{display:flex;gap:8px;padding:12px;
        overflow-x:auto;background:#0d223a;
        position:sticky;top:65px;z-index:4}
      #kcv2 .nav button{white-space:nowrap;flex:0 0 auto;
        padding:11px 14px;border-radius:10px;
        color:#d7e9f8;background:#183653;
        border:1px solid #345775;font-weight:700}
      #kcv2 .nav button.active{background:#087bb4;
        border-color:#65c9f4;color:white}
      #kcv2 .body{padding:20px;min-height:400px}
      #kcv2 h2{font-size:23px;margin:0 0 10px}
      #kcv2 h3{font-size:17px;margin:0 0 8px}
      #kcv2 p{line-height:1.55}
      #kcv2 .muted{color:#a9bfd3;font-size:13px}
      #kcv2 .grid{display:grid;
        grid-template-columns:repeat(auto-fit,minmax(230px,1fr));
        gap:12px;margin-top:16px}
      #kcv2 .card{padding:16px;border-radius:14px;
        background:#142d48;border:1px solid #2b4a68;
        min-width:0}
      #kcv2 .card p{font-size:13px;color:#c5d7e8;margin:7px 0}
      #kcv2 .tag{display:inline-block;font-size:11px;
        color:#9ce1ff;background:#123e5c;
        padding:5px 9px;border-radius:20px;margin-bottom:9px}
      #kcv2 input{width:100%;padding:13px;
        background:#091a2c;border:1px solid #385a78;
        border-radius:10px;color:white;margin:12px 0}
      #kcv2 .btn{border:0;border-radius:9px;
        background:#087db8;color:white;padding:11px 14px;
        font-weight:700;margin:4px 3px 4px 0}
      #kcv2 .btn.alt{background:#294965}
      #kcv2 .answer{width:100%;display:block;text-align:left;
        padding:14px;margin:8px 0;border-radius:10px;
        color:white;background:#1b3856;border:1px solid #42617e}
      #kcv2 .answer.good{background:#176344;border-color:#36bd8b}
      #kcv2 .answer.bad{background:#71343c;border-color:#d86b75}
      #kcv2 .progress{height:8px;background:#263e56;
        border-radius:20px;overflow:hidden;margin:12px 0}
      #kcv2 .progress span{display:block;height:100%;
        background:#24a8e0;width:0}
      #kcv2 .tool-link{display:inline-block;margin-top:8px;
        color:#8bd9ff;font-weight:bold;text-decoration:none}
      #kcv2 canvas{display:block;width:100%;height:340px;
        background:#f7f9fc;border-radius:12px;
        touch-action:none;border:1px solid #b5c9da}
      #kcv2 .toolrow{display:flex;flex-wrap:wrap;gap:6px;
        margin:14px 0}
      #kcv2 .toolrow button{padding:10px 12px;
        border-radius:9px;border:1px solid #41617e;
        background:#1a3856;color:white}
      #kcv2 .toolrow button.active{background:#087db8}
      #kcv2 .task-check{display:flex;gap:9px;
        align-items:center;margin-top:12px;color:#bde5ff}
      #kcv2 .task-check input{width:20px;margin:0}
      @media(max-width:600px){
        #kcv2 .top{padding:12px}
        #kcv2 .brand{font-size:16px}
        #kcv2 .hero{padding:20px 15px}
        #kcv2 .body{padding:13px}
        #kcv2 .nav{top:57px;padding:9px}
        #kcv2 .nav button{padding:10px 12px;font-size:12px}
        #kcv2 canvas{height:280px}
        #kcv2 .grid{grid-template-columns:1fr}
      }
    `;
    document.head.appendChild(s);
  }

  function ensureCard() {
    const home = document.getElementById('home');
    if (!home || document.getElementById('kale-cad-card')) return;
    const card = document.createElement('section');
    card.id = 'kale-cad-card';
    card.innerHTML = '<h3>KALECAD Dijital Tasarım Atölyesi</h3><p>AutoCAD • SketchUp • 3B Modelleme • Teknik Çizim</p>';
    card.addEventListener('click', open);
    const target = home.querySelector('.menu-grid,.games-grid,.home-grid,.game-grid');
    (target || home).appendChild(card);
  }

  function open() {
    styles();
    let app = document.getElementById('kcv2');
    if (!app) {
      app = document.createElement('div');
      app.id = 'kcv2';
      app.innerHTML = `
        <div class="shell">
          <header class="top">
            <div class="brand">KALECAD <small>DİJİTAL TASARIM ATÖLYESİ</small></div>
            <button class="close" id="kcv2-close">✕ Kapat</button>
          </header>
          <section class="hero">
            <h1>Tasarım Atölyesine Hoş Geldin</h1>
            <p>Teknik çizimden üç boyutlu modellemeye kadar tasarım becerilerini geliştir. Öğren, dene, üret.</p>
          </section>
          <nav class="nav">
            <button data-tab="auto" class="active">AutoCAD Akademi</button>
            <button data-tab="sketch">SketchUp Akademi</button>
            <button data-tab="quiz">Bilgi Yarışması</button>
            <button data-tab="tasks">Proje Görevleri</button>
            <button data-tab="draw">Çizim Masası</button>
            <button data-tab="digital">Dijital Araçlar</button>
          </nav>
          <main class="body" id="kcv2-content"></main>
        </div>`;
      document.body.appendChild(app);
      app.querySelector('#kcv2-close').addEventListener('click', close);
      app.addEventListener('click', e => { if (e.target === app) close(); });
      app.querySelectorAll('[data-tab]').forEach(b =>
        b.addEventListener('click', () => show(b.dataset.tab))
      );
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') close();
      });
    }
    app.style.display = 'block';
    document.body.style.overflow = 'hidden';
    show('auto');
  }

  function close() {
    const app = document.getElementById('kcv2');
    if (app) app.style.display = 'none';
    document.body.style.overflow = '';
  }

  function show(tab) {
    const app = document.getElementById('kcv2');
    if (!app) return;
    app.querySelectorAll('[data-tab]').forEach(b =>
      b.classList.toggle('active', b.dataset.tab === tab)
    );
    const panel = app.querySelector('#kcv2-content');
    if (tab === 'auto') renderAuto(panel);
    if (tab === 'sketch') renderSketch(panel);
    if (tab === 'quiz') renderQuiz(panel);
    if (tab === 'tasks') renderTasks(panel);
    if (tab === 'draw') renderDraw(panel);
    if (tab === 'digital') renderDigital(panel);
  }

  function renderAuto(panel) {
    panel.innerHTML = `
      <h2>AutoCAD Akademi</h2>
      <p class="muted">Komutları öğren, mimari ve teknik çizimlerde nasıl kullanıldıklarını keşfet.</p>
      <input id="kcv2-search" placeholder="Komut ara: LINE, OFFSET, TRIM...">
      <div class="grid" id="kcv2-commands"></div>`;
    const list = panel.querySelector('#kcv2-commands');
    function draw(q='') {
      list.innerHTML = '';
      const term = q.toLocaleLowerCase('tr');
      commands.filter(c => c.join(' ').toLocaleLowerCase('tr').includes(term))
        .forEach(c => {
          const el = document.createElement('article');
          el.className = 'card';
          el.innerHTML = `<span class="tag">${c[0]}</span><h3>${c[1]}</h3><p>${c[2]}</p><p><b>Kullanım:</b> ${c[3]}</p>`;
          list.appendChild(el);
        });
      if (!list.children.length) list.innerHTML = '<p class="muted">Komut bulunamadı.</p>';
    }
    panel.querySelector('#kcv2-search').addEventListener('input', e => draw(e.target.value));
    draw();
  }

  function renderSketch(panel) {
    panel.innerHTML = `
      <h2>SketchUp Akademi</h2>
      <p class="muted">Üç boyutlu modelleme araçlarını öğren. Konut, oda, mobilya ve iç mekân çalışmalarına hazırlan.</p>
      <div class="card">
        <span class="tag">BAŞLANGIÇ</span>
        <h3>SketchUp Web</h3>
        <p>Tarayıcı üzerinden SketchUp kullanarak kendi 3B modellerini oluştur.</p>
        <a class="tool-link" href="https://app.sketchup.com/" target="_blank" rel="noopener">SketchUp Web'i Aç ↗</a>
      </div>
      <div class="grid" id="kcv2-lessons"></div>`;
    const list = panel.querySelector('#kcv2-lessons');
    sketchLessons.forEach((lesson,i) => {
      const el = document.createElement('article');
      el.className = 'card';
      el.innerHTML = `<span class="tag">DERS ${i+1}</span><h3>${lesson[0]}</h3><p>${lesson[1]}</p>`;
      list.appendChild(el);
    });
  }

  function renderQuiz(panel) {
    let order = [...questions].sort(() => Math.random() - .5).slice(0,10);
    let current = 0, score = 0, locked = false;
    panel.innerHTML = `
      <h2>Bilgi Yarışması</h2>
      <p class="muted">AutoCAD ve SketchUp konularından 10 soru. Her doğru cevap 10 puan.</p>
      <div class="progress"><span id="kcv2-bar"></span></div>
      <div id="kcv2-question"></div>`;
    const area = panel.querySelector('#kcv2-question');

    function next() {
      locked = false;
      if (current >= order.length) {
        area.innerHTML = `<div class="card"><span class="tag">TUR TAMAMLANDI</span><h2>${score} / 100 Puan</h2><p>${score/10} doğru cevap verdin.</p><button class="btn" id="kcv2-again">Yeni Tur</button></div>`;
        area.querySelector('#kcv2-again').onclick = () => {
          order = [...questions].sort(() => Math.random() - .5).slice(0,10);
          current = 0; score = 0; next();
        };
        return;
      }
      const q = order[current];
      panel.querySelector('#kcv2-bar').style.width = (current*10)+'%';
      area.innerHTML = `<div class="card"><span class="tag">SORU ${current+1} / 10</span><h3>${q[0]}</h3><div id="kcv2-answers"></div><p id="kcv2-feedback" class="muted"></p><button class="btn" id="kcv2-next" style="display:none">Sonraki Soru</button></div>`;
      const answers = area.querySelector('#kcv2-answers');
      q[1].forEach((answer,i) => {
        const b = document.createElement('button');
        b.className = 'answer';
        b.textContent = String.fromCharCode(65+i)+'. '+answer;
        b.onclick = () => {
          if (locked) return;
          locked = true;
          if (i === q[2]) score += 10;
          answers.querySelectorAll('button').forEach((x,j) => {
            x.disabled = true;
            if (j === q[2]) x.classList.add('good');
            else if (j === i) x.classList.add('bad');
          });
          area.querySelector('#kcv2-feedback').textContent =
            i === q[2] ? 'Doğru cevap! +10 puan' : 'Doğru cevap: '+q[1][q[2]];
          area.querySelector('#kcv2-next').style.display = 'inline-block';
        };
        answers.appendChild(b);
      });
      area.querySelector('#kcv2-next').onclick = () => { current++; next(); };
    }
    next();
  }

  function renderTasks(panel) {
    panel.innerHTML = `
      <h2>Proje Görevleri</h2>
      <p class="muted">Görevlerini tamamladıkça işaretle. İlerlemen bu cihazda saklanır.</p>
      <div class="progress"><span id="kcv2-taskbar"></span></div>
      <div id="kcv2-tasklist" class="grid"></div>
      <p id="kcv2-taskcount" class="muted"></p>`;
    const list = panel.querySelector('#kcv2-tasklist');
    function draw() {
      list.innerHTML = '';
      tasks.forEach((t,i) => {
        const el = document.createElement('article');
        el.className = 'card';
        el.innerHTML = `<span class="tag">GÖREV ${i+1}</span><h3>${t[0]}</h3><p>${t[1]}</p><p><b>Araçlar:</b> ${t[2]}</p>`;
        const label = document.createElement('label');
        label.className = 'task-check';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = !!(saved.tasks && saved.tasks[i]);
        cb.onchange = () => {
          if (!saved.tasks) saved.tasks = {};
          saved.tasks[i] = cb.checked;
          save(); draw();
        };
        label.append(cb,document.createTextNode('Tamamlandı'));
        el.appendChild(label);
        list.appendChild(el);
      });
      const count = tasks.filter((_,i) => saved.tasks && saved.tasks[i]).length;
      panel.querySelector('#kcv2-taskcount').textContent = `Tamamlanan görev: ${count} / ${tasks.length}`;
      panel.querySelector('#kcv2-taskbar').style.width = (count/tasks.length*100)+'%';
    }
    draw();
  }

  function renderDraw(panel) {
    panel.innerHTML = `
      <h2>Çizim Masası</h2>
      <p class="muted">Temel çizim alıştırmaları yap. Bu alan gerçek AutoCAD veya DWG yazılımı değildir.</p>
      <div class="toolrow">
        <button class="active" data-shape="line">Çizgi</button>
        <button data-shape="rect">Dikdörtgen</button>
        <button data-shape="circle">Daire</button>
        <button id="kcv2-undo">Geri Al</button>
        <button id="kcv2-clear">Temizle</button>
        <button id="kcv2-save">PNG Kaydet</button>
      </div>
      <canvas id="kcv2-canvas" width="1200" height="650"></canvas>
      <p class="muted">Ekrana dokunarak veya fareyle sürükleyerek şekil çiz.</p>`;
    const canvas = panel.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    let tool = 'line', start = null, preview = null, shapes = [];

    function point(e) {
      const r = canvas.getBoundingClientRect();
      return {x:(e.clientX-r.left)*canvas.width/r.width,
              y:(e.clientY-r.top)*canvas.height/r.height};
    }
    function paint() {
      ctx.fillStyle = '#f7f9fc';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.strokeStyle = '#e0e7ee'; ctx.lineWidth = 1;
      for(let x=0;x<canvas.width;x+=25){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke();}
      for(let y=0;y<canvas.height;y+=25){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke();}
      [...shapes,...(preview?[preview]:[])].forEach(s=>{
        ctx.strokeStyle='#173c5c';ctx.lineWidth=3;ctx.beginPath();
        if(s.type==='line'){ctx.moveTo(s.x1,s.y1);ctx.lineTo(s.x2,s.y2);}
        if(s.type==='rect')ctx.rect(s.x1,s.y1,s.x2-s.x1,s.y2-s.y1);
        if(s.type==='circle')ctx.arc(s.x1,s.y1,Math.hypot(s.x2-s.x1,s.y2-s.y1),0,Math.PI*2);
        ctx.stroke();
      });
    }
    panel.querySelectorAll('[data-shape]').forEach(b=>b.onclick=()=>{
      tool=b.dataset.shape;
      panel.querySelectorAll('[data-shape]').forEach(x=>x.classList.toggle('active',x===b));
    });
    canvas.addEventListener('pointerdown',e=>{
      start=point(e);canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove',e=>{
      if(!start)return;
      const p=point(e);preview={type:tool,x1:start.x,y1:start.y,x2:p.x,y2:p.y};paint();
    });
    canvas.addEventListener('pointerup',e=>{
      if(!start)return;
      const p=point(e);shapes.push({type:tool,x1:start.x,y1:start.y,x2:p.x,y2:p.y});
      start=null;preview=null;paint();
    });
    panel.querySelector('#kcv2-undo').onclick=()=>{shapes.pop();paint();};
    panel.querySelector('#kcv2-clear').onclick=()=>{shapes=[];preview=null;start=null;paint();};
    panel.querySelector('#kcv2-save').onclick=()=>{
      const a=document.createElement('a');a.download='kalecad-cizim.png';
      a.href=canvas.toDataURL('image/png');a.click();
    };
    paint();
  }

  function renderDigital(panel) {
    const tools = [
      ['SketchUp Web','3B modelleme','Konut, oda ve mobilya modelleme.','https://app.sketchup.com/'],
      ['Tinkercad','3B tasarım','Temel geometrik şekillerle üç boyutlu tasarım.','https://www.tinkercad.com/'],
      ['OpenPlan3D','Mimari plan','Kat planı ve mekân yerleşimi çalışmaları.','https://openplan3d.com/'],
      ['Floorplanner','İç mekân planlama','Oda planı ve mobilya yerleşimi.','https://floorplanner.com/'],
      ['Sweet Home 3D','İç mekân modelleme','Konut iç mekânı planlama ve 3B görüntüleme.','https://www.sweethome3d.com/'],
      ['Onshape','Parametrik 3B CAD','Tarayıcı üzerinden 3B teknik modelleme.','https://www.onshape.com/']
    ];
    panel.innerHTML = `
      <h2>Dijital Tasarım Araçları</h2>
      <p class="muted">Tarayıcı üzerinden kullanabileceğin çevrim içi çizim ve modelleme araçları.</p>
      <div class="grid" id="kcv2-tools"></div>
      <p class="muted">Not: Bu hizmetlerin ücretsiz özellikleri, üyelik koşulları ve kullanım sınırları değişebilir. Bazıları hesap açmanı isteyebilir.</p>`;
    const list = panel.querySelector('#kcv2-tools');
    tools.forEach(t=>{
      const el=document.createElement('article');el.className='card';
      el.innerHTML=`<span class="tag">${t[1]}</span><h3>${t[0]}</h3><p>${t[2]}</p>`;
      const a=document.createElement('a');a.className='tool-link';
      a.href=t[3];a.target='_blank';a.rel='noopener noreferrer';
      a.textContent='Aracı Aç ↗';
      el.appendChild(a);list.appendChild(el);
    });
  }

  // Eski atölye düğmelerini yeni ekrana yönlendir.
  document.addEventListener('click', e => {
    const el = e.target.closest('button,a,[role="button"],.card');
    if (!el || el.id === 'kale-cad-card' || el.closest('#kcv2')) return;
    const label = (el.innerText || el.textContent || '').trim().toLocaleLowerCase('tr');
    if (label === 'atölye' || label === 'atolye' ||
        label.includes('autocad atölye') ||
        label.includes('autocad atolye') ||
        label.includes('dijital atölye')) {
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      open();
    }
  }, true);

  function boot() {
    styles();
    ensureCard();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',boot);
  } else {
    boot();
  }

  const observer = new MutationObserver(() => {
    if (!document.getElementById('kale-cad-card')) ensureCard();
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();

/* KALECAD AutoCAD Atölyesi — mevcut oyuna eklenen, çevrimdışı çalışabilen eğitim modülü.
   Not: Bu modül AutoCAD'in kendisi değildir; komut öğrenme, mini sınav ve öğretmen
   kontrollü sınıf etkinliği sağlar. Veriler aynı cihazın tarayıcısında saklanır. */
(() => {
  'use strict';
  const STORE = 'kalecad_autocad_atolye_v1';
  const commands = [
    ['LINE','Çizgi','İki veya daha fazla noktayı düz çizgi parçalarıyla birleştirir.','Bir duvarın düz kenarını çizmek.'],
    ['PLINE','Çoklu çizgi','Birbirine bağlı çizgi ve yay parçalarını tek nesne olarak oluşturur.','Birden fazla kenarı tek nesne olarak çizmek.'],
    ['CIRCLE','Daire','Merkez ve yarıçap veya çap bilgisiyle daire çizer.','Kolon veya dairesel eleman göstermek.'],
    ['ARC','Yay','Belirlenen nokta, merkez veya açı bilgileriyle yay çizer.','Kapı açılımını yayla göstermek.'],
    ['RECTANG','Dikdörtgen','Karşılıklı iki köşeyi belirleyerek dikdörtgen oluşturur.','Oda sınırını hızlıca çizmek.'],
    ['POLYGON','Çokgen','Kenar sayısı ve ölçüsüne göre düzgün çokgen oluşturur.','Altıgen veya sekizgen çizmek.'],
    ['MOVE','Taşı','Seçilen nesneleri bir konumdan başka bir konuma taşır.','Pencereyi duvar üzerinde başka yere almak.'],
    ['COPY','Kopyala','Seçilen nesnelerin bir veya daha fazla kopyasını üretir.','Aynı ölçüdeki pencereleri çoğaltmak.'],
    ['ROTATE','Döndür','Nesneleri bir taban noktası çevresinde belirtilen açıyla döndürür.','Mobilya sembolünü 90 derece çevirmek.'],
    ['MIRROR','Aynala','Nesnelerin belirlenen eksene göre simetrik kopyasını oluşturur.','Simetrik cephe elemanları çizmek.'],
    ['SCALE','Ölçekle','Nesneleri taban noktasına göre büyütür veya küçültür.','Bir bloğu uygun katsayıyla ölçeklemek.'],
    ['OFFSET','Ötele','Bir nesneye belirli uzaklıkta paralel veya eş merkezli kopya oluşturur.','Duvar kalınlığını oluşturmak.'],
    ['TRIM','Budama','Nesnelerin istenmeyen kısımlarını kesme sınırlarına göre temizler.','Kesişen çizgilerin fazlalıklarını silmek.'],
    ['EXTEND','Uzat','Nesneleri seçilen sınır kenarlarına kadar uzatır.','Duvar çizgisini başka bir sınıra ulaştırmak.'],
    ['FILLET','Yuvarlat','İki nesne arasına belirlenen yarıçapta yuvarlatılmış geçiş ekler.','İki çizginin köşesini radyüsle birleştirmek.'],
    ['CHAMFER','Pah kır','İki nesnenin köşesini belirlenen mesafelerle pah kırarak birleştirir.','Keskin köşeye eğimli geçiş vermek.'],
    ['ARRAY','Dizi','Nesnelerin dikdörtgen, dairesel veya yol boyunca düzenli kopyalarını oluşturur.','Eşit aralıklı kolonları çoğaltmak.'],
    ['HATCH','Tarama','Kapalı alanları tarama deseni, renk veya dolgu ile gösterir.','Kesitte beton veya zemin taraması yapmak.'],
    ['LAYER','Katman','Çizim nesnelerini özellikleri ve görünürlükleri yönetilen katmanlarda düzenler.','Duvar, kapı ve ölçüleri ayrı katmanlarda tutmak.'],
    ['OSNAP','Nesne yakalama','Uç nokta, orta nokta ve merkez gibi hassas geometrik noktalara yakalamayı sağlar.','Çizgileri tam uç noktasından birleştirmek.'],
    ['DIM','Ölçülendirme','Uzunluk, açı veya çap gibi ölçü bilgilerini çizimde gösterir.','Oda duvarının uzunluğunu belirtmek.'],
    ['BLOCK','Blok','Seçilen nesneleri yeniden kullanılabilen tek bir blok tanımında toplar.','Kapı sembolünü tekrar kullanılabilir yapmak.'],
    ['XREF','Dış referans','Başka bir çizim dosyasını ana çizime dış referans olarak bağlar.','Mimari altlığı ayrı dosyadan kullanmak.'],
    ['UCS','Kullanıcı koordinat sistemi','Kullanıcı koordinat sisteminin başlangıç noktasını ve eksen yönlerini belirler.','Eğik bir yüzeyde yerel koordinatla çalışmak.'],
    ['PLOT','Yazdır','Çizimi seçilen kâğıt, ölçek ve çıktı ayarlarıyla yazdırır veya PDF olarak alır.','Planı uygun ölçekte PDF almak.'],
    ['ERASE','Sil','Seçilen çizim nesnelerini siler.','Gereksiz yardımcı çizgileri kaldırmak.'],
    ['UNDO','Geri al','Son yapılan işlemi veya işlemleri geri alır.','Yanlışlıkla taşınan nesneyi eski konumuna döndürmek.'],
    ['REDO','Yinele','Geri alınan son işlemi yeniden uygular.','Geri alınan doğru işlemi tekrar yapmak.'],
    ['EXPLODE','Patlat','Birleşik nesneyi bileşen nesnelerine ayırır.','Bir bloğu ayrı çizgi ve yaylara ayırmak.'],
    ['DIST','Mesafe','İki nokta arasındaki uzaklığı ve yön bilgilerini ölçer.','İki duvar köşesi arasındaki mesafeyi kontrol etmek.']
  ];
  const tasks = [
    ['Oda sınırı','RECTANG komutuyla 4000 × 3000 birim ölçülerinde bir oda dikdörtgeni oluştur.','Komut doğru seçildi; iki köşe doğru girildi; ölçüler kontrol edildi.'],
    ['Duvar kalınlığı','Kapalı oda çizgisinin iç tarafına 200 birim OFFSET uygula.','OFFSET kullanıldı; 200 değeri girildi; paralellik korundu.'],
    ['Kapı boşluğu','Duvar çizgisindeki kapı açıklığını TRIM ile temizle.','Kesme sınırı doğru seçildi; yalnızca açıklık içindeki parça kaldırıldı.'],
    ['Pencere çoğaltma','Bir pencere sembolünü COPY ile ikinci duvara taşı.','Kaynak nesne korundu; kopya doğru konumlandırıldı.'],
    ['Planı düzenleme','Duvar, kapı, pencere ve ölçü için ayrı LAYER oluştur.','Katmanlar adlandırıldı; nesneler doğru katmanlara atandı.'],
    ['Pafta çıktısı','Çizimi A4 yatay kâğıda PDF olarak almak için PLOT ayarlarını hazırla.','Kâğıt ve yön seçildi; çizim alanı ve ölçek kontrol edildi.']
  ];
  const read = () => { try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (_) { return {}; } };
  const write = data => { try { localStorage.setItem(STORE, JSON.stringify(data)); } catch (_) {} };
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const questions = [];
  commands.forEach((item, i) => {
    const pool = commands.filter((_, j) => j !== i);
    const distractors = [pool[(i + 2) % pool.length][0], pool[(i + 9) % pool.length][0], pool[(i + 17) % pool.length][0]];
    questions.push({q:`${item[0]} komutunun temel görevi nedir?`, a:item[2], options:[item[2], ...distractors.map(code => commands.find(c => c[0] === code)[2])], correct:0, command:item[0]});
    const choices = [item[0], ...distractors];
    questions.push({q:`“${item[3]}” işlemi için hangi komut en uygundur?`, a:item[0], options:choices, correct:0, command:item[0]});
  });
  // Doğru yanıtı her soruda farklı konuma taşı.
  questions.forEach((q, i) => {
    const correct = q.options[q.correct];
    const shift = (i * 3 + 1) % q.options.length;
    q.options = q.options.slice(shift).concat(q.options.slice(0, shift));
    q.correct = q.options.indexOf(correct);
  });

  function mount() {
    const home = document.getElementById('home');
    if (!home || document.getElementById('autocadWorkshopCard')) return false;
    const card = document.createElement('section');
    card.id = 'autocadWorkshopCard';
    card.className = 'setting-card';
    card.style.cssText = 'margin:18px 0;padding:18px;border:1px solid #4b78aa;border-radius:16px;background:linear-gradient(135deg,#10264d,#0b1a38);color:#f4f7ff';
    card.innerHTML = `<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><div style="font-size:32px">📐</div><div style="flex:1;min-width:180px"><h2 style="margin:0 0 5px;font-size:20px">AutoCAD Atölyesi</h2><p style="margin:0;color:#c7d7ef">30 komut • 50 soruluk havuz • uygulama görevleri • öğretmen puan tablosu</p></div><button type="button" id="openAutocadWorkshop" style="border:0;border-radius:10px;padding:12px 16px;background:#64d9ff;color:#07163c;font-weight:800">Atölyeyi aç</button></div>`;
    const anchor = home.querySelector('.settings') || home.querySelector('.hero') || home.firstElementChild;
    if (anchor && anchor !== home.querySelector('.settings')) anchor.insertAdjacentElement('afterend', card);
    else if (anchor) anchor.insertAdjacentElement('beforebegin', card);
    else home.appendChild(card);
    document.getElementById('openAutocadWorkshop').addEventListener('click', openWorkshop);
    return true;
  }

  function openWorkshop() {
    if (document.getElementById('autocadWorkshopModal')) return;
    const modal = document.createElement('div');
    modal.id = 'autocadWorkshopModal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#050d20ee;overflow:auto;padding:12px;display:flex;align-items:flex-start;justify-content:center;color:#f5f7ff;font-family:system-ui,sans-serif';
    modal.innerHTML = `<section style="width:min(900px,100%);margin:12px auto;background:#0d1d3b;border:1px solid #34547d;border-radius:18px;padding:16px;box-shadow:0 20px 60px #0009"><header style="display:flex;gap:10px;align-items:center;justify-content:space-between"><div><div style="font-size:12px;color:#79dfff;letter-spacing:1px">KALECAD / MESLEKİ EĞİTİM</div><h2 style="margin:4px 0 0;font-size:23px">AutoCAD Atölyesi</h2></div><button id="closeAutocadWorkshop" aria-label="Kapat" style="font-size:24px;border:0;background:#20385e;color:white;border-radius:10px;width:42px;height:42px">×</button></header><nav id="cadTabs" style="display:flex;gap:8px;flex-wrap:wrap;margin:16px 0"><button data-tab="learn">Komut rehberi</button><button data-tab="quiz">50 soruluk havuz</button><button data-tab="tasks">Uygulama görevleri</button><button data-tab="draw">Çizim alanı</button><button data-tab="teacher">Öğretmen paneli</button></nav><main id="cadPanel"></main><p style="font-size:11px;color:#9db1d0;margin:16px 0 0">Eğitim simülasyonudur; AutoCAD yazılımının yerini almaz. Puanlar ve ilerleme bu cihazın tarayıcısında saklanır.</p></section>`;
    document.body.appendChild(modal);
    const style = document.createElement('style');
    style.id = 'autocadWorkshopStyles';
    style.textContent = `#autocadWorkshopModal button{cursor:pointer}#autocadWorkshopModal nav button,#autocadWorkshopModal .cad-btn{border:1px solid #45658f;border-radius:9px;background:#172d52;color:#f5f7ff;padding:10px 12px;font-weight:650}#autocadWorkshopModal nav button.active,#autocadWorkshopModal .cad-primary{background:#64d9ff;color:#07163c;border-color:#64d9ff}#autocadWorkshopModal .cad-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}#autocadWorkshopModal .cad-item{background:#14294c;border:1px solid #29486e;border-radius:12px;padding:12px}#autocadWorkshopModal .cad-muted{color:#b7c8e2;font-size:13px}#autocadWorkshopModal input,#autocadWorkshopModal select{box-sizing:border-box;width:100%;padding:11px;border-radius:8px;border:1px solid #45658f;background:#081831;color:white;margin:5px 0 10px}#autocadWorkshopModal .cad-option{display:block;width:100%;text-align:left;margin:8px 0;padding:12px;border:1px solid #45658f;border-radius:10px;background:#14294c;color:white}#autocadWorkshopModal .cad-option:disabled{opacity:.8}#autocadWorkshopModal .cad-option.correct{border-color:#52d6a2;background:#123b39}#autocadWorkshopModal .cad-option.wrong{border-color:#ff8c8c;background:#482b3b}#autocadWorkshopModal h3{margin:8px 0}#autocadWorkshopModal .cad-stat{font-size:24px;font-weight:800;color:#64d9ff}`;
    document.head.appendChild(style);
    modal.querySelector('#closeAutocadWorkshop').addEventListener('click', () => { modal.remove(); style.remove(); });
    modal.addEventListener('click', e => { if (e.target === modal) { modal.remove(); style.remove(); } });
    modal.querySelectorAll('[data-tab]').forEach(btn => btn.addEventListener('click', () => showTab(btn.dataset.tab)));
    showTab('learn');

    function showTab(tab) {
      modal.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
      const panel = modal.querySelector('#cadPanel');
      if (tab === 'learn') renderLearn(panel);
      if (tab === 'quiz') renderQuiz(panel);
      if (tab === 'tasks') renderTasks(panel);
      if (tab === 'draw') renderDraw(panel);
      if (tab === 'teacher') renderTeacher(panel);
    }
    function renderLearn(panel) {
      panel.innerHTML = `<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;justify-content:space-between"><div><h3>Temel komut kartları</h3><p class="cad-muted">Komut adını, görevini ve mimari çizimdeki kullanımını incele.</p></div><input id="cadSearch" placeholder="Komut ara (ör. OFFSET)" style="max-width:240px"></div><div class="cad-grid" id="cadCommandGrid"></div>`;
      const grid = panel.querySelector('#cadCommandGrid');
      const draw = filter => {
        grid.innerHTML = '';
        commands.filter(c => c.join(' ').toLocaleLowerCase('tr-TR').includes(filter.toLocaleLowerCase('tr-TR'))).forEach(c => {
          const item = document.createElement('article'); item.className = 'cad-item';
          item.innerHTML = `<div style="color:#64d9ff;font-size:12px;font-weight:800">AUTOCAD KOMUTU</div><h3 style="font-size:19px;margin:4px 0">${esc(c[0])} <span class="cad-muted">/ ${esc(c[1])}</span></h3><p>${esc(c[2])}</p><p class="cad-muted"><b>Örnek:</b> ${esc(c[3])}</p>`;
          grid.appendChild(item);
        });
      };
      draw(''); panel.querySelector('#cadSearch').addEventListener('input', e => draw(e.target.value));
    }
    function renderQuiz(panel) {
      let state = {list:shuffle(questions).slice(0,10), index:0, score:0, locked:false};
      panel.innerHTML = `<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><div><h3>Hızlı sınıf sınavı</h3><p class="cad-muted">50 soruluk havuzdan her turda 10 soru seçilir.</p></div><div class="cad-stat" id="cadQuizProgress">1 / 10</div></div><div class="cad-item"><div class="cad-muted" id="cadQuizTopic"></div><h3 id="cadQuizQuestion" style="font-size:19px"></h3><div id="cadQuizOptions"></div><p id="cadQuizFeedback" aria-live="polite"></p><button class="cad-btn cad-primary" id="cadQuizNext" disabled>Sonraki soru</button></div>`;
      const show = () => {
        const q = state.list[state.index]; state.locked = false;
        panel.querySelector('#cadQuizProgress').textContent = `${state.index+1} / 10`;
        panel.querySelector('#cadQuizTopic').textContent = `KOMUT: ${q.command} · SORU HAVUZU: 50`;
        panel.querySelector('#cadQuizQuestion').textContent = q.q;
        panel.querySelector('#cadQuizFeedback').textContent = '';
        panel.querySelector('#cadQuizNext').disabled = true;
        const opts = panel.querySelector('#cadQuizOptions'); opts.innerHTML = '';
        q.options.forEach((opt, i) => { const b = document.createElement('button'); b.className='cad-option'; b.textContent = opt; b.addEventListener('click', () => answer(i)); opts.appendChild(b); });
      };
      const answer = picked => {
        if (state.locked) return; state.locked = true;
        const q = state.list[state.index]; const ok = picked === q.correct; if (ok) state.score++;
        [...panel.querySelectorAll('.cad-option')].forEach((b,i) => { b.disabled = true; if(i===q.correct)b.classList.add('correct'); else if(i===picked)b.classList.add('wrong'); });
        panel.querySelector('#cadQuizFeedback').textContent = ok ? 'Doğru! +10 puan' : `Doğru cevap: ${q.options[q.correct]}`;
        panel.querySelector('#cadQuizNext').disabled = false;
      };
      panel.querySelector('#cadQuizNext').addEventListener('click', () => {
        if (!state.locked) return;
        if (state.index < 9) { state.index++; show(); }
        else {
          const data = read(); data.quizBest = Math.max(Number(data.quizBest)||0,state.score*10); data.lastQuiz = {score:state.score*10, date:new Date().toISOString()}; write(data);
          panel.innerHTML = `<div class="cad-item" style="text-align:center"><div style="font-size:42px">🏆</div><h3>Tur tamamlandı</h3><div class="cad-stat">${state.score*10} / 100 puan</div><p class="cad-muted">${state.score} doğru · ${10-state.score} yanlış</p><button class="cad-btn cad-primary" id="cadQuizAgain">Yeni tur başlat</button></div>`;
          panel.querySelector('#cadQuizAgain').addEventListener('click', () => renderQuiz(panel));
        }
      });
      show();
    }
    function renderTasks(panel) {
      const data = read(); data.tasksDone = data.tasksDone || [];
      panel.innerHTML = `<h3>Çizim öncesi / sonrası uygulama görevleri</h3><p class="cad-muted">Öğrenci görevi AutoCAD'de tamamlar; öğretmen kontrol listesini işaretler.</p><div class="cad-grid" id="cadTaskGrid"></div>`;
      const grid = panel.querySelector('#cadTaskGrid');
      tasks.forEach((t,i) => {
        const box = document.createElement('article'); box.className='cad-item';
        box.innerHTML = `<h3>${i+1}. ${esc(t[0])}</h3><p>${esc(t[1])}</p><p class="cad-muted"><b>Kontrol:</b> ${esc(t[2])}</p><label style="display:flex;gap:8px;align-items:center"><input type="checkbox" data-task="${i}" style="width:auto;margin:0" ${data.tasksDone.includes(i)?'checked':''}> Görev tamamlandı</label>`;
        grid.appendChild(box);
      });
      grid.querySelectorAll('[data-task]').forEach(input => input.addEventListener('change', () => { const d=read(); d.tasksDone=d.tasksDone||[]; const i=Number(input.dataset.task); d.tasksDone=input.checked?[...new Set([...d.tasksDone,i])]:d.tasksDone.filter(x=>x!==i); write(d); }));
    }
    function renderDraw(panel) {
      const data = read();
      const saved = Array.isArray(data.drawItems) ? data.drawItems : [];
      let items = saved.map(item => ({...item}));
      let tool = 'LINE';
      let start = null;
      let preview = null;
      let pointerDown = false;
      const world = {w:4000,h:3000};
      panel.innerHTML = `
        <style>
          .cad-draw-toolbar{display:flex;gap:7px;flex-wrap:wrap;margin:10px 0}
          .cad-draw-toolbar button,.cad-draw-actions button{border:1px solid #49658e;background:#172e53;color:#f4f7ff;border-radius:9px;padding:9px 12px;font-weight:700;min-height:40px}
          .cad-draw-toolbar button.active{background:#64d9ff;color:#07163c;border-color:#64d9ff}
          .cad-draw-board{width:100%;aspect-ratio:4/3;background:#071329;border:1px solid #45638c;border-radius:12px;display:block;touch-action:none;cursor:crosshair}
          .cad-draw-actions{display:flex;gap:7px;flex-wrap:wrap;margin:10px 0}
          .cad-draw-hint{font-size:13px;color:#c5d5ed;line-height:1.5}
        </style>
        <div class="cad-item">
          <div style="display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap"><div><h3 style="margin:0">2B çizim alanı</h3><p class="cad-muted" style="margin:5px 0 0">Dokunarak veya fareyle çiz. Izgara aralığı 100 birimdir.</p></div><span class="cad-stat" id="cadDrawCount">0 nesne</span></div>
          <div class="cad-draw-toolbar" role="group" aria-label="Çizim araçları">
            <button type="button" data-tool="LINE" class="active">LINE</button>
            <button type="button" data-tool="RECTANG">RECTANG</button>
            <button type="button" data-tool="CIRCLE">CIRCLE</button>
          </div>
          <canvas id="cadDrawCanvas" class="cad-draw-board" aria-label="Izgaralı teknik çizim alanı"></canvas>
          <div class="cad-draw-hint" id="cadDrawStatus" aria-live="polite">LINE seçili. Başlangıç noktasına dokun, sonra bitiş noktasına dokun.</div>
          <div class="cad-draw-actions">
            <button type="button" id="cadDrawUndo">↶ Geri al</button>
            <button type="button" id="cadDrawClear">Temizle</button>
            <button type="button" id="cadDrawExport">PNG olarak indir</button>
          </div>
          <p class="cad-draw-hint"><b>Alıştırma:</b> RECTANG aracını seçerek 4000 × 3000 birimlik oda sınırı çiz. Yaklaşık doğru ölçü için ızgarada 40 × 30 aralık kaplamalısın. Bu alan temel geometri pratiği içindir; DWG üretmez ve gerçek AutoCAD komut motoru değildir.</p>
          <p class="cad-muted" style="font-size:12px;margin-bottom:0">Aktif araç: <b id="cadDrawToolLabel">LINE</b> · Çizim bu cihazda saklanır.</p>
        </div>`;
      const canvas = panel.querySelector('#cadDrawCanvas');
      const ctx = canvas.getContext('2d');
      const count = panel.querySelector('#cadDrawCount');
      const status = panel.querySelector('#cadDrawStatus');
      const snap = v => Math.max(0, Math.min(4000, Math.round(v / 100) * 100));
      const pointFromEvent = e => {
        const r = canvas.getBoundingClientRect();
        return {x:snap((e.clientX-r.left)/r.width*world.w), y:snap((e.clientY-r.top)/r.height*world.h)};
      };
      function sizeCanvas() {
        const r = canvas.getBoundingClientRect();
        const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        canvas.width = Math.round(r.width*dpr); canvas.height = Math.round(r.height*dpr);
        ctx.setTransform(dpr,0,0,dpr,0,0); draw();
      }
      function drawOne(item, ghost=false) {
        const sx = canvas.clientWidth/world.w, sy = canvas.clientHeight/world.h;
        ctx.save(); ctx.strokeStyle = ghost ? '#7de7ff' : '#e8f3ff'; ctx.lineWidth = 2; ctx.setLineDash(ghost?[6,4]:[]);
        ctx.beginPath();
        if(item.type==='LINE'){ctx.moveTo(item.x1*sx,item.y1*sy);ctx.lineTo(item.x2*sx,item.y2*sy);}
        if(item.type==='RECTANG'){ctx.rect(Math.min(item.x1,item.x2)*sx,Math.min(item.y1,item.y2)*sy,Math.abs(item.x2-item.x1)*sx,Math.abs(item.y2-item.y1)*sy);}
        if(item.type==='CIRCLE'){ctx.arc(item.x1*sx,item.y1*sy,Math.hypot((item.x2-item.x1)*sx,(item.y2-item.y1)*sy),0,Math.PI*2);}
        ctx.stroke(); ctx.restore();
      }
      function draw() {
        const w=canvas.clientWidth,h=canvas.clientHeight; if(!w||!h)return;
        ctx.clearRect(0,0,w,h); ctx.fillStyle='#071329';ctx.fillRect(0,0,w,h);
        const sx=w/world.w,sy=h/world.h;
        ctx.strokeStyle='#1b3458';ctx.lineWidth=1;
        for(let x=0;x<=world.w;x+=100){ctx.beginPath();ctx.moveTo(x*sx,0);ctx.lineTo(x*sx,h);ctx.stroke();}
        for(let y=0;y<=world.h;y+=100){ctx.beginPath();ctx.moveTo(0,y*sy);ctx.lineTo(w,y*sy);ctx.stroke();}
        ctx.strokeStyle='#35577f';ctx.lineWidth=1.4;ctx.strokeRect(0,0,w,h);
        items.forEach(item=>drawOne(item)); if(preview)drawOne(preview,true);
        count.textContent=`${items.length} nesne`;
      }
      function persist(){const d=read();d.drawItems=items;write(d);}
      function setTool(next){tool=next;start=null;preview=null;panel.querySelectorAll('[data-tool]').forEach(b=>b.classList.toggle('active',b.dataset.tool===tool));panel.querySelector('#cadDrawToolLabel').textContent=tool;status.textContent=tool+' seçili. '+(tool==='LINE'?'Başlangıç ve bitiş noktalarını belirle.':tool==='RECTANG'?'Karşılıklı iki köşeyi belirle.':'Merkezi ve yarıçapı belirle.');draw();}
      panel.querySelectorAll('[data-tool]').forEach(b=>b.addEventListener('click',()=>setTool(b.dataset.tool)));
      canvas.addEventListener('pointerdown',e=>{e.preventDefault();canvas.setPointerCapture(e.pointerId);pointerDown=true;start=pointFromEvent(e);preview={type:tool,x1:start.x,y1:start.y,x2:start.x,y2:start.y};draw();});
      canvas.addEventListener('pointermove',e=>{if(!pointerDown||!start)return;const p=pointFromEvent(e);preview={type:tool,x1:start.x,y1:start.y,x2:p.x,y2:p.y};status.textContent=`İlk nokta: ${start.x}, ${start.y} · İkinci nokta: ${p.x}, ${p.y}`;draw();});
      function finish(e){if(!pointerDown||!start)return;const p=pointFromEvent(e);pointerDown=false;const item={type:tool,x1:start.x,y1:start.y,x2:p.x,y2:p.y};if(item.x1!==item.x2||item.y1!==item.y2){items.push(item);persist();status.textContent=`${tool} tamamlandı · (${item.x1}, ${item.y1}) → (${item.x2}, ${item.y2})`; }else status.textContent='Çizim için farklı iki nokta seçmelisin.';start=null;preview=null;draw();}
      canvas.addEventListener('pointerup',finish);canvas.addEventListener('pointercancel',()=>{pointerDown=false;start=null;preview=null;draw();});
      panel.querySelector('#cadDrawUndo').addEventListener('click',()=>{items.pop();persist();status.textContent='Son nesne geri alındı.';draw();});
      panel.querySelector('#cadDrawClear').addEventListener('click',()=>{if(!items.length)return;if(!confirm('Çizim alanı tamamen temizlensin mi?'))return;items=[];persist();status.textContent='Çizim alanı temizlendi.';draw();});
      panel.querySelector('#cadDrawExport').addEventListener('click',()=>{const a=document.createElement('a');a.download='KaleCAD-cizim.png';a.href=canvas.toDataURL('image/png');a.click();});
      if('ResizeObserver' in window){const ro=new ResizeObserver(sizeCanvas);ro.observe(canvas);}else window.addEventListener('resize',sizeCanvas);
      sizeCanvas();
    }

    function renderTeacher(panel) {
      const data = read(); data.teams = data.teams || [];
      panel.innerHTML = `<h3>Öğretmen kontrol paneli</h3><p class="cad-muted">Takım adlarını ekle; doğru cevap veya tamamlanan görev için puan ver. Bu tablo yalnızca bu cihazda tutulur.</p><div class="cad-item"><label>Takım adı<input id="cadTeamName" placeholder="Örn. Mimarlar"></label><button class="cad-btn cad-primary" id="cadAddTeam">Takım ekle</button></div><div id="cadTeamList" class="cad-grid" style="margin-top:10px"></div><div class="cad-item" style="margin-top:12px"><b>Öğrenme özeti</b><p class="cad-muted">En iyi sınav: <strong>${Number(data.quizBest)||0}/100</strong> · Tamamlanan uygulama: <strong>${(data.tasksDone||[]).length}/${tasks.length}</strong></p><button class="cad-btn" id="cadResetTeams">Takım puanlarını sıfırla</button></div>`;
      const list = panel.querySelector('#cadTeamList');
      const redraw = () => {
        list.innerHTML=''; const current=read(); (current.teams||[]).sort((a,b)=>b.score-a.score).forEach((team,i)=>{
          const item=document.createElement('article'); item.className='cad-item';
          const heading=document.createElement('h3'); heading.textContent=`${i+1}. ${team.name}`;
          const score=document.createElement('div'); score.className='cad-stat'; score.textContent=`${team.score} puan`;
          const controls=document.createElement('div'); controls.style.cssText='display:flex;gap:6px;flex-wrap:wrap;margin-top:8px';
          [['+10',10],['+5',5],['−5',-5]].forEach(([label,delta])=>{const b=document.createElement('button');b.className='cad-btn';b.textContent=label;b.addEventListener('click',()=>{const d=read();const t=d.teams.find(x=>x.id===team.id);if(t){t.score=Math.max(0,t.score+delta);write(d);redraw();}});controls.appendChild(b);});
          item.append(heading,score,controls);list.appendChild(item);
        });
        if (!list.children.length) list.innerHTML='<p class="cad-muted">Henüz takım eklenmedi.</p>';
      };
      panel.querySelector('#cadAddTeam').addEventListener('click',()=>{const input=panel.querySelector('#cadTeamName');const name=input.value.trim();if(!name)return;const d=read();d.teams=d.teams||[];d.teams.push({id:`${Date.now()}-${Math.random().toString(16).slice(2)}`,name,score:0});write(d);input.value='';redraw();});
      panel.querySelector('#cadResetTeams').addEventListener('click',()=>{if(!confirm('Tüm takım puanları sıfırlansın mı?'))return;const d=read();d.teams=(d.teams||[]).map(t=>({...t,score:0}));write(d);redraw();});
      redraw();
    }
  }
  function shuffle(items) { const a=items.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
  function boot() {
    if (mount()) return;
    const observer = new MutationObserver(() => { if (mount()) observer.disconnect(); });
    observer.observe(document.documentElement, {childList:true,subtree:true});
    setTimeout(() => observer.disconnect(), 30000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true}); else boot();
})();

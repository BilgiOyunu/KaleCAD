
/* KALECAD - AUTOCAD + SKETCHUP ATOLYESI */
(() => {
  'use strict';

  const STORE = 'kalecad_atolye_v2';

  const autoTools = [
    ['LINE','Çizgi','İki nokta arasında çizgi çizer.','Duvar kenarı çizmek.'],
    ['PLINE','Çoklu Çizgi','Birleşik çizgi oluşturur.','Birden fazla duvar kenarı çizmek.'],
    ['CIRCLE','Daire','Daire oluşturur.','Kolon sembolü çizmek.'],
    ['ARC','Yay','Yay oluşturur.','Kapı açılımı çizmek.'],
    ['RECTANG','Dikdörtgen','Dikdörtgen oluşturur.','Oda sınırı çizmek.'],
    ['POLYGON','Çokgen','Düzgün çokgen oluşturur.','Altıgen çizmek.'],
    ['MOVE','Taşı','Nesneleri taşır.','Pencerenin yerini değiştirmek.'],
    ['COPY','Kopyala','Nesneleri çoğaltır.','Pencereleri çoğaltmak.'],
    ['ROTATE','Döndür','Nesneleri döndürür.','Mobilyayı çevirmek.'],
    ['MIRROR','Aynala','Simetrik kopya oluşturur.','Cepheyi aynalamak.'],
    ['SCALE','Ölçekle','Boyutları değiştirir.','Çizimi büyütmek.'],
    ['OFFSET','Ötele','Paralel çizgi oluşturur.','Duvar kalınlığı vermek.'],
    ['TRIM','Budama','Fazla çizgileri keser.','Kapı boşluğu açmak.'],
    ['EXTEND','Uzat','Çizgileri sınıra uzatır.','Duvar çizgisini uzatmak.'],
    ['FILLET','Yuvarlat','Köşeleri yuvarlatır.','Köşe geçişi oluşturmak.'],
    ['CHAMFER','Pah Kır','Köşelere pah verir.','Eğimli köşe oluşturmak.'],
    ['ARRAY','Dizi','Düzenli kopyalar oluşturur.','Kolonları çoğaltmak.'],
    ['HATCH','Tarama','Kapalı alanları tarar.','Kesitte beton göstermek.'],
    ['LAYER','Katman','Çizimleri katmanlara ayırır.','Kapı ve duvarı ayırmak.'],
    ['OSNAP','Nesne Yakalama','Hassas noktalara yakalar.','Uç noktaları birleştirmek.'],
    ['DIM','Ölçülendirme','Ölçüleri gösterir.','Duvar uzunluğunu yazmak.'],
    ['BLOCK','Blok','Nesneleri blok yapar.','Kapı sembolü oluşturmak.'],
    ['XREF','Dış Referans','Başka çizimi bağlar.','Altlık kullanmak.'],
    ['UCS','Koordinat Sistemi','Çalışma eksenini değiştirir.','Eğik yüzeyde çizim yapmak.'],
    ['PLOT','Yazdır','Çizimi çıktıya hazırlar.','PDF pafta almak.'],
    ['ERASE','Sil','Nesneleri siler.','Yardımcı çizgileri kaldırmak.'],
    ['UNDO','Geri Al','Son işlemi geri alır.','Hatalı işlemi düzeltmek.'],
    ['REDO','Yinele','Geri alınan işlemi tekrarlar.','İşlemi geri getirmek.'],
    ['EXPLODE','Patlat','Birleşik nesneyi ayırır.','Bloğu parçalamak.'],
    ['DIST','Mesafe','İki nokta arası mesafeyi ölçer.','Duvar uzunluğunu kontrol etmek.']
  ];

  const sketchTools = [
    ['Select','Seç','Modeldeki nesneleri seçer.'],
    ['Line','Çizgi','Kenar ve çizgiler oluşturur.'],
    ['Rectangle','Dikdörtgen','Dikdörtgen yüzey çizer.'],
    ['Circle','Daire','Dairesel yüzey oluşturur.'],
    ['Push/Pull','İt/Çek','Yüzeyi yükseltir veya içeri iter.'],
    ['Move','Taşı','Nesneleri taşır.'],
    ['Rotate','Döndür','Nesneleri döndürür.'],
    ['Scale','Ölçekle','Nesnelerin boyutunu değiştirir.'],
    ['Offset','Ötele','Paralel kenar oluşturur.'],
    ['Follow Me','Beni İzle','Profili bir yol boyunca uzatır.'],
    ['Paint Bucket','Boya Kovası','Yüzeylere malzeme uygular.'],
    ['Eraser','Silgi','Kenarları siler.'],
    ['Orbit','Yörünge','Modelin çevresinde görünümü döndürür.'],
    ['Pan','Kaydır','Görünümü sağa veya sola taşır.'],
    ['Zoom','Yakınlaştır','Modeli yakınlaştırır veya uzaklaştırır.']
  ];

  const autoTasks = [
    ['Oda Planı','RECTANG ile 4000 × 3000 birim ölçülerinde oda çiz.'],
    ['Duvar Kalınlığı','OFFSET ile 200 birim duvar kalınlığı oluştur.'],
    ['Kapı Boşluğu','TRIM komutuyla kapı açıklığını oluştur.'],
    ['Pencere','COPY ile pencere sembolünü çoğalt.'],
    ['Katmanlar','Duvar, kapı ve pencere için ayrı katman oluştur.'],
    ['Pafta','Çizimini A4 yatay PDF çıktısına hazırla.']
  ];

  const sketchTasks = [
    ['Oda Zemini','400 × 300 cm ölçülerinde dikdörtgen zemin oluştur.'],
    ['Duvarlar','Push/Pull ile duvarları 280 cm yükselt.'],
    ['Kapı ve Pencere','Modeline bir kapı ve iki pencere ekle.'],
    ['Mobilya','Odaya masa, sandalye ve dolap modelle.'],
    ['Malzemeler','Zemin ve duvarlara farklı malzemeler uygula.'],
    ['Sunum','Modelini farklı açılardan incele ve kaydet.']
  ];

  const autoQuestions = autoTools.map((t,i) => ({
    q: `${t[0]} komutunun görevi nedir?`,
    a: t[2],
    options: [t[2],autoTools[(i+3)%30][2],autoTools[(i+9)%30][2],autoTools[(i+17)%30][2]]
  }));

  const sketchQuestions = [
    ['Yüzeyi 3B hacme dönüştüren araç hangisidir?','Push/Pull',['Move','Push/Pull','Scale','Orbit']],
    ['Nesneleri seçmek için hangi araç kullanılır?','Select',['Select','Eraser','Pan','Zoom']],
    ['Yüzeye malzeme uygulamak için hangisi kullanılır?','Paint Bucket',['Line','Offset','Paint Bucket','Circle']],
    ['Modeli büyütüp küçültmek için hangisi kullanılır?','Scale',['Scale','Move','Orbit','Eraser']],
    ['Model çevresinde görünümü döndürmek için hangisi kullanılır?','Orbit',['Pan','Orbit','Line','Rectangle']],
    ['Dikdörtgen yüzey oluşturmak için hangisi kullanılır?','Rectangle',['Circle','Select','Rectangle','Move']],
    ['Bir profili yol boyunca uzatan araç hangisidir?','Follow Me',['Follow Me','Scale','Pan','Eraser']],
    ['Kenarları silmek için hangi araç kullanılır?','Eraser',['Move','Eraser','Zoom','Orbit']],
    ['Görünümü yakınlaştırmak için hangisi kullanılır?','Zoom',['Pan','Select','Zoom','Line']],
    ['Dairesel yüzey oluşturmak için hangisi kullanılır?','Circle',['Rectangle','Circle','Scale','Move']]
  ];

  const read = () => {
    try { return JSON.parse(localStorage.getItem(STORE) || '{}'); }
    catch(e) { return {}; }
  };

  const write = data => {
    try { localStorage.setItem(STORE,JSON.stringify(data)); }
    catch(e) {}
  };

  const esc = s => String(s).replace(/[&<>"']/g,c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));

  const shuffle = arr => {
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  };

  function mount() {
    const home = document.getElementById('home');
    if(!home || document.getElementById('kaleAtolyeCard')) return false;

    const card = document.createElement('section');
    card.id = 'kaleAtolyeCard';
    card.style.cssText = `
      margin:18px 0;padding:18px;border-radius:16px;
      border:1px solid #426b91;
      background:linear-gradient(135deg,#10264d,#0b1a38);
      color:#f4f7ff;
    `;

    card.innerHTML = `
      <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
        <div style="font-size:34px">🏰</div>
        <div style="flex:1;min-width:180px">
          <h2 style="margin:0 0 5px">Mesleki Tasarım Atölyesi</h2>
          <p style="margin:0;color:#c7d7ef">AutoCAD • SketchUp • Mimari Tasarım</p>
        </div>
        <button id="kaleAtolyeOpen" class="ka-button ka-primary">Atölyeyi Aç</button>
      </div>
    `;

    const anchor = home.querySelector('.settings') ||
                   home.querySelector('.hero') ||
                   home.firstElementChild;

    if(anchor) anchor.insertAdjacentElement('afterend',card);
    else home.appendChild(card);

    card.querySelector('#kaleAtolyeOpen').onclick = openWorkshop;
    return true;
  }

  function openWorkshop() {
    if(document.getElementById('kaleAtolyeModal')) return;

    const modal = document.createElement('div');
    modal.id = 'kaleAtolyeModal';
    modal.innerHTML = `
      <section class="ka-window">
        <header class="ka-header">
          <div>
            <small>KALECAD / MESLEKİ EĞİTİM</small>
            <h2>Mesleki Tasarım Atölyesi</h2>
          </div>
          <button id="kaClose" class="ka-close">×</button>
        </header>

        <nav class="ka-tabs">
          <button data-tab="auto">AutoCAD</button>
          <button data-tab="sketch">SketchUp</button>
          <button data-tab="teacher">Öğretmen Paneli</button>
        </nav>

        <main id="kaPanel"></main>
        <footer>Eğitim amaçlı simülasyondur. İlerleme bu cihazda saklanır.</footer>
      </section>
    `;

    const style = document.createElement('style');
    style.id = 'kaleAtolyeStyle';
    style.textContent = `
      #kaleAtolyeModal {
        position:fixed;inset:0;z-index:999999;
        background:#050d20ee;overflow:auto;padding:12px;
        color:#f5f7ff;font-family:system-ui,sans-serif;
      }
      #kaleAtolyeModal * {box-sizing:border-box}
      .ka-window {
        width:min(950px,100%);margin:10px auto;padding:16px;
        background:#0d1d3b;border:1px solid #34547d;
        border-radius:18px;min-height:300px;
      }
      .ka-header {
        display:flex;justify-content:space-between;
        align-items:center;gap:10px;
      }
      .ka-header small {color:#79dfff;letter-spacing:1px}
      .ka-header h2 {margin:5px 0;font-size:22px}
      .ka-close {
        width:42px;height:42px;border:0;border-radius:10px;
        background:#20385e;color:white;font-size:26px;
      }
      .ka-tabs {display:flex;gap:8px;flex-wrap:wrap;margin:18px 0}
      .ka-tabs button,.ka-button,.ka-btn {
        border:1px solid #45658f;border-radius:9px;
        background:#172d52;color:#f5f7ff;
        padding:11px 14px;font-weight:700;cursor:pointer;
      }
      .ka-tabs button.active,.ka-primary {
        background:#64d9ff!important;color:#07163c!important;
        border-color:#64d9ff!important;
      }
      .ka-grid {
        display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
        gap:10px;
      }
      .ka-card {
        background:#14294c;border:1px solid #29486e;
        border-radius:12px;padding:14px;margin-bottom:10px;
      }
      .ka-muted {color:#b7c8e2;font-size:13px}
      .ka-card h3 {margin:5px 0 10px}
      .ka-option {
        display:block;width:100%;text-align:left;margin:8px 0;
        padding:12px;border:1px solid #45658f;border-radius:10px;
        background:#14294c;color:white;cursor:pointer;
      }
      .ka-option:disabled {opacity:.85}
      .ka-option.good {background:#123b39;border-color:#52d6a2}
      .ka-option.bad {background:#482b3b;border-color:#ff8c8c}
      .ka-stat {font-size:25px;font-weight:800;color:#64d9ff}
      .ka-field {width:100%;padding:11px;margin:7px 0 12px;
        border-radius:8px;border:1px solid #45658f;
        background:#081831;color:white}
      .ka-check {display:flex;gap:9px;align-items:flex-start;margin:12px 0}
      .ka-check input {width:20px;height:20px;flex:none}
      .ka-canvas {display:block;width:100%;aspect-ratio:4/3;
        background:#071329;border:1px solid #45638c;
        border-radius:12px;touch-action:none}
      .ka-tools {display:flex;gap:7px;flex-wrap:wrap;margin:10px 0}
      #kaleAtolyeModal footer {color:#9db1d0;font-size:11px;margin-top:18px}
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    modal.querySelector('#kaClose').onclick = close;
    modal.addEventListener('click',e=>{
      if(e.target===modal) close();
    });

    function close() {
      modal.remove();
      style.remove();
    }

    modal.querySelectorAll('[data-tab]').forEach(btn=>{
      btn.onclick=()=>{
        modal.querySelectorAll('[data-tab]').forEach(b=>
          b.classList.toggle('active',b===btn)
        );
        const tab=btn.dataset.tab;
        if(tab==='auto') renderAuto();
        if(tab==='sketch') renderSketch();
        if(tab==='teacher') renderTeacher();
      };
    });

    modal.querySelector('[data-tab="auto"]').click();

    function renderAuto() {
      const panel=modal.querySelector('#kaPanel');
      panel.innerHTML=`
        <div class="ka-grid">
          <button class="ka-button ka-primary" data-page="guide">Komut Rehberi</button>
          <button class="ka-button" data-page="quiz">Mini Sınav</button>
          <button class="ka-button" data-page="tasks">Uygulama Görevleri</button>
          <button class="ka-button" data-page="draw">2B Çizim Alanı</button>
        </div>
        <div id="kaSubPanel" style="margin-top:14px"></div>
      `;
      panel.querySelectorAll('[data-page]').forEach(b=>{
        b.onclick=()=>{
          panel.querySelectorAll('[data-page]').forEach(x=>
            x.classList.toggle('ka-primary',x===b)
          );
          if(b.dataset.page==='guide') autoGuide();
          if(b.dataset.page==='quiz') quiz(autoQuestions,'auto');
          if(b.dataset.page==='tasks') taskList(autoTasks,'auto');
          if(b.dataset.page==='draw') drawArea();
        };
      });
      autoGuide();

      function autoGuide() {
        const box=panel.querySelector('#kaSubPanel');
        box.innerHTML=`
          <div class="ka-card">
            <h3>AutoCAD Komut Rehberi</h3>
            <input class="ka-field" id="kaAutoSearch" placeholder="Komut ara...">
          </div>
          <div class="ka-grid" id="kaAutoList"></div>
        `;
        const list=box.querySelector('#kaAutoList');
        function fill(term='') {
          list.innerHTML='';
          autoTools.filter(t=>t.join(' ').toLocaleLowerCase('tr-TR')
            .includes(term.toLocaleLowerCase('tr-TR')))
            .forEach(t=>{
              const c=document.createElement('article');
              c.className='ka-card';
              c.innerHTML=`<h3>${esc(t[0])} / ${esc(t[1])}</h3>
                <p>${esc(t[2])}</p><p class="ka-muted">Örnek: ${esc(t[3])}</p>`;
              list.appendChild(c);
            });
        }
        fill();
        box.querySelector('#kaAutoSearch').oninput=e=>fill(e.target.value);
      }

      function drawArea() {
        const box=panel.querySelector('#kaSubPanel');
        box.innerHTML=`
          <div class="ka-card">
            <h3>2B Teknik Çizim Alanı</h3>
            <p class="ka-muted">Izgaraya dokunarak çizim yap. Çizimlerin bu cihazda saklanır.</p>
            <div class="ka-tools">
              <button class="ka-btn ka-primary" data-tool="LINE">LINE</button>
              <button class="ka-btn" data-tool="RECT">RECTANG</button>
              <button class="ka-btn" data-tool="CIRCLE">CIRCLE</button>
              <button class="ka-btn" id="kaUndo">Geri Al</button>
              <button class="ka-btn" id="kaClear">Temizle</button>
              <button class="ka-btn" id="kaExport">PNG İndir</button>
            </div>
            <canvas id="kaCanvas" class="ka-canvas"></canvas>
            <p id="kaDrawStatus" class="ka-muted">LINE seçili. İki nokta belirle.</p>
          </div>
        `;

        const canvas=box.querySelector('#kaCanvas');
        const ctx=canvas.getContext('2d');
        const saved=read().autoDrawing||[];
        let items=saved.slice();
        let tool='LINE',start=null,preview=null;

        function resize() {
          const r=canvas.getBoundingClientRect();
          const d=Math.min(2,window.devicePixelRatio||1);
          canvas.width=r.width*d;
          canvas.height=r.height*d;
          ctx.setTransform(d,0,0,d,0,0);
          paint();
        }

        function point(e) {
          const r=canvas.getBoundingClientRect();
          return {
            x:Math.round((e.clientX-r.left)/r.width*4000/100)*100,
            y:Math.round((e.clientY-r.top)/r.height*3000/100)*100
          };
        }

        function shape(item) {
          const sx=canvas.clientWidth/4000;
          const sy=canvas.clientHeight/3000;
          ctx.beginPath();
          if(item.type==='LINE'){
            ctx.moveTo(item.x1*sx,item.y1*sy);
            ctx.lineTo(item.x2*sx,item.y2*sy);
          }
          if(item.type==='RECT'){
            ctx.rect(Math.min(item.x1,item.x2)*sx,
              Math.min(item.y1,item.y2)*sy,
              Math.abs(item.x2-item.x1)*sx,
              Math.abs(item.y2-item.y1)*sy);
          }
          if(item.type==='CIRCLE'){
            ctx.arc(item.x1*sx,item.y1*sy,
              Math.hypot((item.x2-item.x1)*sx,(item.y2-item.y1)*sy),
              0,Math.PI*2);
          }
          ctx.stroke();
        }

        function paint() {
          const w=canvas.clientWidth,h=canvas.clientHeight;
          if(!w||!h)return;
          ctx.clearRect(0,0,w,h);
          ctx.fillStyle='#071329';ctx.fillRect(0,0,w,h);
          ctx.strokeStyle='#1b3458';ctx.lineWidth=1;
          for(let x=0;x<=4000;x+=100){
            ctx.beginPath();ctx.moveTo(x*w/4000,0);
            ctx.lineTo(x*w/4000,h);ctx.stroke();
          }
          for(let y=0;y<=3000;y+=100){
            ctx.beginPath();ctx.moveTo(0,y*h/3000);
            ctx.lineTo(w,y*h/3000);ctx.stroke();
          }
          ctx.strokeStyle='#e8f3ff';ctx.lineWidth=2;
          items.forEach(shape);
          if(preview){ctx.strokeStyle='#64d9ff';shape(preview);}
        }

        function save() {
          const d=read();d.autoDrawing=items;write(d);
        }

        canvas.onpointerdown=e=>{
          start=point(e);
          preview={type:tool,x1:start.x,y1:start.y,x2:start.x,y2:start.y};
          canvas.setPointerCapture(e.pointerId);
        };
        canvas.onpointermove=e=>{
          if(!start)return;
          const p=point(e);
          preview={type:tool,x1:start.x,y1:start.y,x2:p.x,y2:p.y};
          paint();
        };
        canvas.onpointerup=e=>{
          if(!start)return;
          const p=point(e);
          const item={type:tool,x1:start.x,y1:start.y,x2:p.x,y2:p.y};
          if(item.x1!==item.x2||item.y1!==item.y2){
            items.push(item);save();
          }
          start=null;preview=null;paint();
        };

        box.querySelectorAll('[data-tool]').forEach(b=>{
          b.onclick=()=>{
            tool=b.dataset.tool;
            box.querySelectorAll('[data-tool]').forEach(x=>
              x.classList.toggle('ka-primary',x===b)
            );
          };
        });
        box.querySelector('#kaUndo').onclick=()=>{
          items.pop();save();paint();
        };
        box.querySelector('#kaClear').onclick=()=>{
          if(confirm('Çizim tamamen silinsin mi?')){
            items=[];save();paint();
          }
        };
        box.querySelector('#kaExport').onclick=()=>{
          const a=document.createElement('a');
          a.download='KaleCAD-cizim.png';
          a.href=canvas.toDataURL('image/png');
          a.click();
        };
        if('ResizeObserver' in window){
          new ResizeObserver(resize).observe(canvas);
        } else window.addEventListener('resize',resize);
        resize();
      }
    }

    function renderSketch() {
      const panel=modal.querySelector('#kaPanel');
      panel.innerHTML=`
        <div class="ka-grid">
          <button class="ka-button ka-primary" data-page="guide">Araç Rehberi</button>
          <button class="ka-button" data-page="quiz">Mini Sınav</button>
          <button class="ka-button" data-page="tasks">3B Modelleme Görevleri</button>
        </div>
        <div id="kaSubPanel" style="margin-top:14px"></div>
      `;
      panel.querySelectorAll('[data-page]').forEach(b=>{
        b.onclick=()=>{
          panel.querySelectorAll('[data-page]').forEach(x=>
            x.classList.toggle('ka-primary',x===b)
          );
          if(b.dataset.page==='guide') sketchGuide();
          if(b.dataset.page==='quiz') quiz(sketchQuestions,'sketch');
          if(b.dataset.page==='tasks') taskList(sketchTasks,'sketch');
        };
      });
      sketchGuide();

      function sketchGuide() {
        const box=panel.querySelector('#kaSubPanel');
        box.innerHTML=`
          <div class="ka-card">
            <h3>SketchUp Araç Rehberi</h3>
            <p class="ka-muted">Mimari modelleme için temel araçlar.</p>
          </div>
          <div class="ka-grid" id="kaSketchList"></div>
        `;
        const list=box.querySelector('#kaSketchList');
        sketchTools.forEach(t=>{
          const c=document.createElement('article');
          c.className='ka-card';
          c.innerHTML=`<h3>${esc(t[0])} / ${esc(t[1])}</h3><p>${esc(t[2])}</p>`;
          list.appendChild(c);
        });
      }
    }

    function quiz(source,type) {
      const box=modal.querySelector('#kaSubPanel');
      const questions=shuffle(source).slice(0,10);
      let index=0,score=0,locked=false;

      function show() {
        locked=false;
        const q=questions[index];
        const options=shuffle(q.options || [
          q.a,
          source[(index+1)%source.length].a,
          source[(index+2)%source.length].a,
          source[(index+3)%source.length].a
        ]);
        box.innerHTML=`
          <div class="ka-card">
            <div class="ka-muted">${type==='auto'?'AUTOCAD':'SKETCHUP'} · SORU ${index+1}/10</div>
            <h3>${esc(q.q)}</h3>
            <div id="kaAnswers"></div>
            <p id="kaFeedback" aria-live="polite"></p>
            <button class="ka-btn ka-primary" id="kaNext" disabled>Sonraki Soru</button>
          </div>
        `;

        const answers=box.querySelector('#kaAnswers');
        options.forEach(option=>{
          const b=document.createElement('button');
          b.className='ka-option';
          b.textContent=option;
          b.onclick=()=>{
            if(locked)return;
            locked=true;
            const ok=option===q.a;
            if(ok)score++;
            answers.querySelectorAll('button').forEach(x=>{
              x.disabled=true;
              if(x.textContent===q.a)x.classList.add('good');
              else if(x===b)x.classList.add('bad');
            });
            box.querySelector('#kaFeedback').textContent=
              ok?'Doğru cevap! +10 puan':'Doğru cevap: '+q.a;
            box.querySelector('#kaNext').disabled=false;
          };
          answers.appendChild(b);
        });

        box.querySelector('#kaNext').onclick=()=>{
          if(!locked)return;
          index++;
          if(index<10)show();
          else finish();
        };
      }

      function finish() {
        const d=read();
        d[type+'Best']=Math.max(d[type+'Best']||0,score*10);
        d[type+'Last']=score*10;
        write(d);
        box.innerHTML=`
          <div class="ka-card" style="text-align:center">
            <div style="font-size:42px">🏆</div>
            <h3>Sınav Tamamlandı</h3>
            <div class="ka-stat">${score*10}/100</div>
            <p>${score} doğru · ${10-score} yanlış</p>
            <button class="ka-btn ka-primary" id="kaAgain">Yeniden Dene</button>
          </div>
        `;
        box.querySelector('#kaAgain').onclick=()=>quiz(source,type);
      }

      show();
    }

    function taskList(tasks,type) {
      const box=modal.querySelector('#kaSubPanel');
      const data=read();
      const done=data[type+'Tasks']||[];

      box.innerHTML=`
        <div class="ka-card">
          <h3>${type==='auto'?'AutoCAD':'SketchUp'} Uygulama Görevleri</h3>
          <p class="ka-muted">Görevleri tamamladıkça kutuları işaretle.</p>
          <div id="kaTaskList"></div>
          <p class="ka-stat" id="kaTaskProgress"></p>
        </div>
      `;

      const list=box.querySelector('#kaTaskList');

      function update() {
        const d=read();
        const current=d[type+'Tasks']||[];
        box.querySelector('#kaTaskProgress').textContent=
          current.length+' / '+tasks.length+' görev tamamlandı';
      }

      tasks.forEach((t,i)=>{
        const label=document.createElement('label');
        label.className='ka-check';
        const input=document.createElement('input');
        input.type='checkbox';
        input.checked=done.includes(i);
        input.onchange=()=>{
          const d=read();
          let current=d[type+'Tasks']||[];
          current=input.checked?
            [...new Set([...current,i])]:
            current.filter(x=>x!==i);
          d[type+'Tasks']=current;
          write(d);
          update();
        };
        const text=document.createElement('span');
        text.innerHTML='<b>'+esc(t[0])+'</b><br><span class="ka-muted">'+esc(t[1])+'</span>';
        label.append(input,text);
        list.appendChild(label);
      });
      update();
    }

    function renderTeacher() {
      const panel=modal.querySelector('#kaPanel');
      const d=read();
      d.teams=d.teams||[];

      panel.innerHTML=`
        <div class="ka-card">
          <h3>Öğretmen Kontrol Paneli</h3>
          <p class="ka-muted">Sınıf takımlarını oluştur ve puanlarını yönet.</p>
          <input class="ka-field" id="kaTeamName" placeholder="Takım adı">
          <button class="ka-btn ka-primary" id="kaAddTeam">Takım Ekle</button>
        </div>
        <div class="ka-grid" id="kaTeams"></div>
        <div class="ka-card">
          <h3>Atölye İlerleme Özeti</h3>
          <p>AutoCAD en iyi sınav: <b>${d.autoBest||0}/100</b></p>
          <p>SketchUp en iyi sınav: <b>${d.sketchBest||0}/100</b></p>
          <p>AutoCAD görevleri: <b>${(d.autoTasks||[]).length}/6</b></p>
          <p>SketchUp görevleri: <b>${(d.sketchTasks||[]).length}/6</b></p>
        </div>
      `;

      const list=panel.querySelector('#kaTeams');

      function redraw() {
        const current=read();
        list.innerHTML='';
        (current.teams||[]).sort((a,b)=>b.score-a.score).forEach((team,i)=>{
          const card=document.createElement('article');
          card.className='ka-card';
          const h=document.createElement('h3');
          h.textContent=(i+1)+'. '+team.name;
          const score=document.createElement('div');
          score.className='ka-stat';
          score.textContent=team.score+' puan';
          card.append(h,score);

          [['+10',10],['+5',5],['-5',-5]].forEach(([label,value])=>{
            const b=document.createElement('button');
            b.className='ka-btn';
            b.textContent=label;
            b.style.margin='5px';
            b.onclick=()=>{
              const d=read();
              const t=d.teams.find(x=>x.id===team.id);
              if(t){
                t.score=Math.max(0,t.score+value);
                write(d);
                redraw();
              }
            };
            card.appendChild(b);
          });
          list.appendChild(card);
        });
        if(!list.children.length){
          list.innerHTML='<p class="ka-muted">Henüz takım eklenmedi.</p>';
        }
      }

      panel.querySelector('#kaAddTeam').onclick=()=>{
        const input=panel.querySelector('#kaTeamName');
        const name=input.value.trim();
        if(!name)return;
        const d=read();
        d.teams=d.teams||[];
        d.teams.push({
          id:Date.now()+'-'+Math.random(),
          name,
          score:0
        });
        write(d);
        input.value='';
        redraw();
      };
      redraw();
    }
  }

  function boot() {
    if(mount())return;
    const observer=new MutationObserver(()=>{
      if(mount())observer.disconnect();
    });
    observer.observe(document.documentElement,{
      childList:true,subtree:true
    });
    setTimeout(()=>observer.disconnect(),30000);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',boot,{once:true});
  } else {
    boot();
  }
})();


/* KALECAD - AUTOCAD + SKETCHUP */
(() => {
'use strict';

const KEY='kalecad_atolye_v2';

const auto=[
['LINE','Çizgi','İki nokta arasında çizgi çizer.'],
['PLINE','Çoklu Çizgi','Birleşik çizgi oluşturur.'],
['CIRCLE','Daire','Daire oluşturur.'],
['ARC','Yay','Yay çizer.'],
['RECTANG','Dikdörtgen','Dikdörtgen oluşturur.'],
['MOVE','Taşı','Nesneleri taşır.'],
['COPY','Kopyala','Nesneleri çoğaltır.'],
['ROTATE','Döndür','Nesneleri döndürür.'],
['MIRROR','Aynala','Simetrik kopya oluşturur.'],
['SCALE','Ölçekle','Boyutları değiştirir.'],
['OFFSET','Ötele','Paralel çizgi oluşturur.'],
['TRIM','Budama','Fazla çizgileri keser.'],
['EXTEND','Uzat','Çizgileri uzatır.'],
['HATCH','Tarama','Kapalı alanları tarar.'],
['LAYER','Katman','Çizimleri katmanlara ayırır.'],
['DIM','Ölçülendirme','Ölçüleri gösterir.'],
['BLOCK','Blok','Nesneleri blok haline getirir.'],
['ERASE','Sil','Nesneleri siler.'],
['UNDO','Geri Al','Son işlemi geri alır.'],
['DIST','Mesafe','İki nokta arasını ölçer.']
];

const sketch=[
['Select','Seç','Nesneleri seçer.'],
['Line','Çizgi','Kenar ve çizgi oluşturur.'],
['Rectangle','Dikdörtgen','Dikdörtgen yüzey çizer.'],
['Circle','Daire','Dairesel yüzey oluşturur.'],
['Push/Pull','İt/Çek','Yüzeyi yükseltir.'],
['Move','Taşı','Nesneleri taşır.'],
['Rotate','Döndür','Nesneleri döndürür.'],
['Scale','Ölçekle','Boyutları değiştirir.'],
['Offset','Ötele','Paralel kenar oluşturur.'],
['Follow Me','Beni İzle','Profili yol boyunca uzatır.'],
['Paint Bucket','Boya Kovası','Yüzeye malzeme uygular.'],
['Eraser','Silgi','Kenarları siler.'],
['Orbit','Yörünge','Modelin çevresinde döner.'],
['Pan','Kaydır','Görünümü taşır.'],
['Zoom','Yakınlaştır','Modeli yakınlaştırır.']
];

const questions=[
['LINE komutu ne yapar?','İki nokta arasında çizgi çizer.',['Daire oluşturur.','İki nokta arasında çizgi çizer.','Nesne siler.','Ölçü verir.']],
['OFFSET komutu ne yapar?','Paralel çizgi oluşturur.',['Paralel çizgi oluşturur.','Daire çizer.','Nesne döndürür.','Dosya kaydeder.']],
['TRIM komutu ne yapar?','Fazla çizgileri keser.',['Çizgiyi uzatır.','Fazla çizgileri keser.','Katman açar.','Daire çizer.']],
['HATCH komutu ne yapar?','Kapalı alanları tarar.',['Nesne taşır.','Kapalı alanları tarar.','Ölçü verir.','Çizgiyi siler.']],
['COPY komutu ne yapar?','Nesneleri çoğaltır.',['Nesneleri çoğaltır.','Nesneleri siler.','Döndürür.','Ölçer.']],
['Push/Pull ne işe yarar?','Yüzeyi yükseltir.',['Yüzeyi yükseltir.','Nesne siler.','Görünümü taşır.','Çizgiyi uzatır.']],
['Orbit aracı ne yapar?','Model çevresinde görünümü döndürür.',['Malzeme uygular.','Model çevresinde görünümü döndürür.','Çizgi siler.','Nesne boyar.']],
['Paint Bucket ne işe yarar?','Yüzeye malzeme uygular.',['Nesne taşır.','Yüzeye malzeme uygular.','Model döndürür.','Çizgi çizer.']],
['Rectangle aracı ne yapar?','Dikdörtgen yüzey oluşturur.',['Daire oluşturur.','Dikdörtgen yüzey oluşturur.','Nesne siler.','Görünümü döndürür.']],
['Follow Me ne yapar?','Profili yol boyunca uzatır.',['Profili yol boyunca uzatır.','Nesne taşır.','Yüzey boyar.','Çizgi siler.']]
];

const taskData={
auto:[
'Oda planı çiz: 4000 × 3000 birim.',
'OFFSET ile 200 birim duvar kalınlığı oluştur.',
'TRIM ile kapı boşluğu aç.',
'COPY ile pencereyi çoğalt.',
'Duvar, kapı ve pencere katmanları oluştur.',
'Çizimini PDF çıktısına hazırla.'
],
sketch:[
'400 × 300 cm ölçülerinde oda zemini oluştur.',
'Push/Pull ile duvarları 280 cm yükselt.',
'Bir kapı ve iki pencere ekle.',
'Odaya masa, sandalye ve dolap modelle.',
'Zemin ve duvarlara malzeme uygula.',
'Modelini farklı açılardan incele.'
]
};

function read(){
try{return JSON.parse(localStorage.getItem(KEY)||'{}');}
catch(e){return {};}
}
function write(d){localStorage.setItem(KEY,JSON.stringify(d));}
function esc(s){
return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function shuffle(a){
let b=a.slice();
for(let i=b.length-1;i>0;i--){
let j=Math.floor(Math.random()*(i+1));
[b[i],b[j]]=[b[j],b[i]];
}
return b;
}

function mount(){
const home=document.getElementById('home');
if(!home||document.getElementById('kaAtolyeCard'))return false;
const card=document.createElement('section');
card.id='kaAtolyeCard';
card.style.cssText='margin:18px 0;padding:18px;border-radius:16px;background:#10264d;color:white;border:1px solid #426b91';
card.innerHTML='<h2>🏰 Mesleki Tasarım Atölyesi</h2><p>AutoCAD • SketchUp • Mimari Tasarım</p><button id="kaOpen" style="padding:12px 20px;border:0;border-radius:9px;background:#64d9ff;color:#07163c;font-weight:bold">Atölyeyi Aç</button>';
const anchor=home.querySelector('.settings')||home.querySelector('.hero');
if(anchor)anchor.insertAdjacentElement('afterend',card);
else home.appendChild(card);
card.querySelector('#kaOpen').onclick=open;
return true;
}

function open(){
if(document.getElementById('kaModal'))return;
const modal=document.createElement('div');
modal.id='kaModal';
modal.innerHTML=`
<div class="kaWindow">
<header><h2>Mesleki Tasarım Atölyesi</h2><button id="kaClose">✕</button></header>
<nav>
<button data-tab="auto">AutoCAD</button>
<button data-tab="sketch">SketchUp</button>
<button data-tab="teacher">Öğretmen Paneli</button>
</nav>
<main id="kaContent"></main>
</div>`;
const style=document.createElement('style');
style.textContent=`
#kaModal{position:fixed;inset:0;z-index:999999;background:#050d20ee;overflow:auto;padding:12px;color:white;font-family:Arial,sans-serif}
#kaModal *{box-sizing:border-box}
.kaWindow{max-width:900px;margin:10px auto;padding:16px;background:#0d1d3b;border:1px solid #45658f;border-radius:16px}
.kaWindow header{display:flex;justify-content:space-between;align-items:center}
.kaWindow button{padding:11px;margin:4px;border:1px solid #45658f;border-radius:8px;background:#193458;color:white;cursor:pointer}
.kaWindow button.active,.kaWindow button.primary{background:#64d9ff;color:#07163c}
.kaGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px}
.kaCard{background:#14294c;border:1px solid #29486e;border-radius:12px;padding:14px;margin:10px 0}
.kaCard h3{margin:5px 0 10px}
.kaMuted{color:#b7c8e2;font-size:13px}
.kaField{width:100%;padding:12px;margin:8px 0;border-radius:8px;background:#081831;color:white;border:1px solid #45658f}
.kaOption{display:block;width:100%;text-align:left;padding:12px;margin:7px 0;border-radius:8px;background:#193458;color:white;border:1px solid #45658f}
.kaGood{background:#15513e!important}
.kaBad{background:#652e3a!important}
.kaScore{font-size:28px;color:#64d9ff;font-weight:bold}
.kaCheck{display:flex;gap:10px;margin:14px 0}
`;
document.head.appendChild(style);
document.body.appendChild(modal);
const content=modal.querySelector('#kaContent');
modal.querySelector('#kaClose').onclick=()=>{modal.remove();style.remove();};

modal.querySelectorAll('[data-tab]').forEach(b=>{
b.onclick=()=>{
modal.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('active',x===b));
if(b.dataset.tab==='auto')render('auto');
if(b.dataset.tab==='sketch')render('sketch');
if(b.dataset.tab==='teacher')teacher();
};
});

function render(type){
const isAuto=type==='auto';
const tools=isAuto?auto:sketch;
const title=isAuto?'AutoCAD':'SketchUp';
content.innerHTML=`
<div class="kaGrid">
<button data-page="guide" class="primary">Araç Rehberi</button>
<button data-page="quiz">Mini Sınav</button>
<button data-page="tasks">Uygulama Görevleri</button>
</div>
<div id="kaSub"></div>`;
const sub=content.querySelector('#kaSub');
content.querySelectorAll('[data-page]').forEach(b=>{
b.onclick=()=>{
content.querySelectorAll('[data-page]').forEach(x=>x.classList.toggle('primary',x===b));
if(b.dataset.page==='guide')guide();
if(b.dataset.page==='quiz')quiz(type);
if(b.dataset.page==='tasks')tasks(type);
};
});
function guide(){
sub.innerHTML='<div class="kaCard"><h3>'+title+' Araç Rehberi</h3><input id="kaSearch" class="kaField" placeholder="Komut ara..."></div><div id="kaTools" class="kaGrid"></div>';
const list=sub.querySelector('#kaTools');
function fill(term=''){
list.innerHTML='';
tools.filter(t=>t.join(' ').toLocaleLowerCase('tr-TR').includes(term.toLocaleLowerCase('tr-TR'))).forEach(t=>{
const c=document.createElement('div');
c.className='kaCard';
c.innerHTML='<h3>'+esc(t[0])+' / '+esc(t[1])+'</h3><p>'+esc(t[2])+'</p>';
list.appendChild(c);
});
}
fill();
sub.querySelector('#kaSearch').oninput=e=>fill(e.target.value);
}
function quiz(kind){
let qs=kind==='auto'?shuffle(auto).slice(0,10).map((t,i)=>({
q:t[0]+' komutunun görevi nedir?',
a:t[2],
options:[t[2],auto[(i+3)%auto.length][2],auto[(i+8)%auto.length][2],auto[(i+13)%auto.length][2]]
})):shuffle(questions);
let index=0,score=0;
function show(){
const q=qs[index];
sub.innerHTML='<div class="kaCard"><p class="kaMuted">'+title+' • Soru '+(index+1)+'/'+qs.length+'</p><h3>'+esc(q.q)+'</h3><div id="kaAnswers"></div><p id="kaFeedback"></p></div>';
const answers=sub.querySelector('#kaAnswers');
shuffle(q.options).forEach(option=>{
const b=document.createElement('button');
b.className='kaOption';
b.textContent=option;
b.onclick=()=>{
if(answers.dataset.done)return;
answers.dataset.done='1';
const correct=option===q.a;
if(correct)score++;
answers.querySelectorAll('button').forEach(x=>{
x.disabled=true;
if(x.textContent===q.a)x.classList.add('kaGood');
});
if(!correct)b.classList.add('kaBad');
sub.querySelector('#kaFeedback').textContent=correct?'Doğru cevap!':'Doğru cevap: '+q.a;
const next=document.createElement('button');
next.className='primary';
next.textContent=index===qs.length-1?'Sonucu Gör':'Sonraki Soru';
next.onclick=()=>{
index++;
if(index<qs.length)show();
else finish();
};
answers.appendChild(next);
};
answers.appendChild(b);
});
}
function finish(){
const points=Math.round(score/qs.length*100);
const d=read();
d[kind+'Best']=Math.max(d[kind+'Best']||0,points);
d[kind+'Last']=points;
write(d);
sub.innerHTML='<div class="kaCard"><h2>Sınav Tamamlandı</h2><div class="kaScore">'+points+'/100</div><p>'+score+' doğru cevap</p><button id="kaAgain" class="primary">Tekrar Dene</button></div>';
sub.querySelector('#kaAgain').onclick=()=>quiz(kind);
}
show();
}
function tasks(kind){
const items=taskData[kind];
const d=read();
const done=d[kind+'Tasks']||[];
sub.innerHTML='<div class="kaCard"><h3>'+title+' Uygulama Görevleri</h3><div id="kaTaskList"></div><p id="kaProgress" class="kaScore"></p></div>';
const list=sub.querySelector('#kaTaskList');
items.forEach((item,i)=>{
const label=document.createElement('label');
label.className='kaCheck';
label.innerHTML='<input type="checkbox" '+(done.includes(i)?'checked':'')+'><span>'+esc(item)+'</span>';
label.querySelector('input').onchange=()=>{
const d=read();
let selected=d[kind+'Tasks']||[];
selected=label.querySelector('input').checked?[...new Set([...selected,i])]:selected.filter(x=>x!==i);
d[kind+'Tasks']=selected;
write(d);
update();
};
list.appendChild(label);
});
function update(){
const count=list.querySelectorAll('input:checked').length;
sub.querySelector('#kaProgress').textContent=count+'/'+items.length+' görev tamamlandı';
}
update();
}
guide();
}

function teacher(){
const d=read();
content.innerHTML=`
<div class="kaCard">
<h3>Öğretmen Paneli</h3>
<p>AutoCAD en iyi sınav puanı: <b>${d.autoBest||0}/100</b></p>
<p>SketchUp en iyi sınav puanı: <b>${d.sketchBest||0}/100</b></p>
<p>AutoCAD tamamlanan görev: <b>${(d.autoTasks||[]).length}/6</b></p>
<p>SketchUp tamamlanan görev: <b>${(d.sketchTasks||[]).length}/6</b></p>
</div>
<div class="kaCard">
<h3>Takım Puan Tablosu</h3>
<input id="kaTeam" class="kaField" placeholder="Takım adı">
<button id="kaAdd" class="primary">Takım Ekle</button>
<div id="kaTeams"></div>
</div>`;
const list=content.querySelector('#kaTeams');
function redraw(){
const data=read();
list.innerHTML='';
(data.teams||[]).sort((a,b)=>b.score-a.score).forEach((t,i)=>{
const row=document.createElement('div');
row.className='kaCard';
row.innerHTML='<h3>'+(i+1)+'. '+esc(t.name)+'</h3><p class="kaScore">'+t.score+' puan</p>';
const plus=document.createElement('button');
plus.textContent='+10';
plus.onclick=()=>change(t.id,10);
const minus=document.createElement('button');
minus.textContent='-5';
minus.onclick=()=>change(t.id,-5);
row.append(plus,minus);
list.appendChild(row);
});
}
function change(id,value){
const data=read();
const team=(data.teams||[]).find(t=>t.id===id);
if(team){team.score=Math.max(0,team.score+value);write(data);redraw();}
}
content.querySelector('#kaAdd').onclick=()=>{
const input=content.querySelector('#kaTeam');
const name=input.value.trim();
if(!name)return;
const data=read();
data.teams=data.teams||[];
data.teams.push({id:Date.now(),name,score:0});
write(data);
input.value='';
redraw();
};
redraw();
}
modal.querySelector('[data-tab="auto"]').click();
}

function boot(){
if(mount())return;
const observer=new MutationObserver(()=>{
if(mount())observer.disconnect();
});
observer.observe(document.documentElement,{childList:true,subtree:true});
setTimeout(()=>observer.disconnect(),30000);
}

if(document.readyState==='loading'){
document.addEventListener('DOMContentLoaded',boot,{once:true});
}else{
boot();
}

})();

/* KALECAD - DIJITAL ATOLYE EKLENTISI */
(() => {
  'use strict';

  const tools = [
    {
      name: 'SketchUp Web',
      category: '3D Modelleme',
      icon: '🏠',
      description: 'Mimari modelleme, iç mekân tasarımı ve üç boyutlu yapı çalışmaları.',
      url: 'https://app.sketchup.com/',
      tag: '3D'
    },
    {
      name: 'Tinkercad',
      category: '3D Modelleme',
      icon: '🧊',
      description: 'Temel üç boyutlu modelleme ve geometrik tasarım çalışmaları.',
      url: 'https://www.tinkercad.com/',
      tag: '3D'
    },
    {
      name: 'OpenPlan3D',
      category: 'Mimari Plan',
      icon: '📐',
      description: '2D kat planı hazırlama, mobilya yerleştirme ve 3D görünüm.',
      url: 'https://openplan3d.com/',
      tag: 'PLAN'
    },
    {
      name: 'OpenCAD Studio',
      category: '2D Teknik Çizim',
      icon: '📏',
      description: 'Tarayıcı üzerinden teknik çizim, katman ve ölçülendirme araçları.',
      url: 'https://www.opencad.studio/2d-cad-online/',
      tag: 'CAD'
    },
    {
      name: 'FlatCAD',
      category: '2D Teknik Çizim',
      icon: '✏️',
      description: 'Ölçülü 2D çizimler, teknik planlar ve DXF çıktısı.',
      url: 'https://flatcad.com/',
      tag: 'CAD'
    },
    {
      name: 'Cadelo',
      category: '2D Teknik Çizim',
      icon: '📋',
      description: 'Tarayıcıda DWG ve DXF dosyalarıyla 2D çizim düzenleme.',
      url: 'https://cadelo.app/',
      tag: 'CAD'
    }
  ];

  function addDigitalWorkshop() {
    const modal = document.getElementById('autocadWorkshopModal');
    if (!modal) return;

    const nav = modal.querySelector('#cadTabs');
    if (!nav || nav.querySelector('[data-tab="digital"]')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.tab = 'digital';
    button.textContent = '🌐 Dijital Atölye';
    nav.appendChild(button);

    button.addEventListener('click', () => {
      nav.querySelectorAll('[data-tab]').forEach(b => {
        b.classList.toggle('active', b === button);
      });
      renderDigital(modal.querySelector('#cadPanel'));
    });
  }

  function renderDigital(panel) {
    if (!panel) return;

    panel.innerHTML = `
      <div style="margin-bottom:18px">
        <div style="color:#64d9ff;font-size:12px;font-weight:800;letter-spacing:1px">
          KALECAD / ONLINE ARAÇLAR
        </div>
        <h3 style="font-size:22px;margin:6px 0">Dijital Atölye</h3>
        <p class="cad-muted">
          Bilgisayarına program kurmadan, internet tarayıcısından
          çizim ve modelleme araçlarını kullan.
        </p>
      </div>

      <div id="digitalFilters" style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:16px">
        <button class="cad-btn cad-primary" data-filter="Tümü">Tümü</button>
        <button class="cad-btn" data-filter="2D Teknik Çizim">2D Çizim</button>
        <button class="cad-btn" data-filter="3D Modelleme">3D Modelleme</button>
        <button class="cad-btn" data-filter="Mimari Plan">Mimari Plan</button>
      </div>

      <div id="digitalToolGrid" class="cad-grid"></div>

      <div class="cad-item" style="margin-top:16px">
        <h3>💡 Öğrenci çalışma önerisi</h3>
        <p class="cad-muted">
          Önce 2D ortamda bir oda planı çiz.
          Ardından SketchUp Web veya Tinkercad ile
          üç boyutlu modelleme denemesi yap.
        </p>
      </div>

      <p class="cad-muted" style="font-size:12px;margin-top:12px">
        Bu araçlar KALECAD dışında, kendi internet sitelerinde açılır.
        Bazıları hesap oluşturmanı isteyebilir. Kullanım ve kayıt koşulları
        ilgili platforma aittir.
      </p>
    `;

    const grid = panel.querySelector('#digitalToolGrid');
    const filters = panel.querySelector('#digitalFilters');

    function draw(filter) {
      grid.innerHTML = '';

      tools
        .filter(tool => filter === 'Tümü' || tool.category === filter)
        .forEach(tool => {
          const card = document.createElement('article');
          card.className = 'cad-item';
          card.style.cssText = 'display:flex;flex-direction:column;min-height:190px';

          const icon = document.createElement('div');
          icon.textContent = tool.icon;
          icon.style.fontSize = '30px';

          const title = document.createElement('h3');
          title.textContent = tool.name;
          title.style.margin = '8px 0 4px';

          const category = document.createElement('div');
          category.textContent = tool.category;
          category.style.cssText = 'font-size:11px;color:#64d9ff;font-weight:800';

          const description = document.createElement('p');
          description.className = 'cad-muted';
          description.textContent = tool.description;

          const link = document.createElement('a');
          link.href = tool.url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = 'Aracı Aç ↗';
          link.style.cssText = `
            display:block;
            margin-top:auto;
            padding:12px;
            text-align:center;
            border-radius:9px;
            background:#64d9ff;
            color:#07163c;
            font-weight:800;
            text-decoration:none;
          `;

          card.append(icon, category, title, description, link);
          grid.appendChild(card);
        });
    }

    filters.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        filters.querySelectorAll('button').forEach(b => {
          b.classList.toggle('cad-primary', b === btn);
        });
        draw(btn.dataset.filter);
      });
    });

    draw('Tümü');
  }

  const observer = new MutationObserver(() => {
    addDigitalWorkshop();
  });

  function start() {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    addDigitalWorkshop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();


/* KALECAD MESLEKI SOZLUK V2 */
(() => {
'use strict';
if(window.KALECAD_DICTIONARY_V2)return;
window.KALECAD_DICTIONARY_V2=true;

const terms=[
['Kolon','Column','Düşey taşıyıcı yapı elemanı.','Yapı Elemanları'],
['Kiriş','Beam','Yükleri taşıyan yatay taşıyıcı eleman.','Yapı Elemanları'],
['Döşeme','Slab','Katlar arasında yatay yüzey oluşturan yapı elemanı.','Yapı Elemanları'],
['Temel','Foundation','Yapı yüklerini zemine aktaran bölüm.','Yapı Elemanları'],
['Duvar','Wall','Mekânları ayıran veya çevreleyen yapı elemanı.','Yapı Elemanları'],
['Merdiven','Staircase','Farklı kotlar arasında ulaşım sağlar.','Yapı Elemanları'],
['Çatı','Roof','Yapının üstünü örten yapı bölümü.','Yapı Elemanları'],
['Cephe','Facade','Yapının dış yüzey görünümü.','Mimarlık'],
['Kesit','Section','Yapının düşey düzlemde kesilerek gösterimi.','Teknik Çizim'],
['Görünüş','Elevation','Yapının belirli yönden görünüm çizimi.','Teknik Çizim'],
['Plan','Floor Plan','Yapının yatay düzlemde kesilerek gösterimi.','Teknik Çizim'],
['Ölçek','Scale','Çizim ile gerçek ölçü arasındaki oran.','Teknik Çizim'],
['Ölçülendirme','Dimensioning','Çizimde ölçülerin belirtilmesi.','Teknik Çizim'],
['Aks','Grid Axis','Yapı elemanlarının konumunu belirleyen referans çizgisi.','Teknik Çizim'],
['Kot','Level','Bir noktanın referans düzlemine göre yüksekliği.','Teknik Çizim'],
['Rölöve','Measured Survey','Mevcut yapının ölçülerek çizime aktarılması.','Teknik Çizim'],
['Metraj','Quantity Takeoff','Projede bulunan imalat miktarlarının hesaplanması.','Teknik Çizim'],
['Vaziyet Planı','Site Plan','Yapının arsa üzerindeki yerleşimini gösteren plan.','Mimarlık'],
['Kesit Alma','Sectioning','Yapıyı keserek iç yapısını gösterme işlemi.','Teknik Çizim'],
['Perspektif','Perspective','Üç boyutlu görünümün düzlem üzerinde gösterimi.','Mimarlık'],
['Mekân','Space','Belirli işlevi olan iç veya dış alan.','İç Mimarlık'],
['Antre','Entrance Hall','Yapı girişinde bulunan karşılama alanı.','İç Mimarlık'],
['Vestiyer','Coat Rack','Dış giyim eşyalarının asıldığı mobilya.','İç Mimarlık'],
['Konsol','Console Table','Duvar önünde kullanılan dar mobilya.','İç Mimarlık'],
['Sehpa','Coffee Table','Oturma alanlarında kullanılan alçak masa.','İç Mimarlık'],
['Gardırop','Wardrobe','Giysi ve eşyaların saklandığı dolap.','İç Mimarlık'],
['Mutfak Tezgâhı','Kitchen Countertop','Mutfakta hazırlık yapılan çalışma yüzeyi.','İç Mimarlık'],
['Evye','Kitchen Sink','Mutfakta bulaşık ve yıkama için kullanılan hazne.','İç Mimarlık'],
['Asma Tavan','Suspended Ceiling','Ana tavanın altında oluşturulan ikincil tavan.','İç Mimarlık'],
['Zemin Kaplaması','Flooring','Zemin yüzeyini kaplayan malzeme.','Malzeme'],
['Seramik','Ceramic Tile','Kil esaslı, pişirilerek üretilen kaplama malzemesi.','Malzeme'],
['Granit','Granite','Sert ve dayanıklı doğal taş.','Malzeme'],
['Mermer','Marble','Dekoratif amaçlı kullanılan doğal taş.','Malzeme'],
['Laminat','Laminate','Katmanlı yapıda üretilen kaplama malzemesi.','Malzeme'],
['Alçıpan','Drywall','Hafif bölme duvar ve tavan sistemlerinde kullanılan levha.','Malzeme'],
['Beton','Concrete','Çimento, su ve agreganın karışımıyla oluşan yapı malzemesi.','Malzeme'],
['Donatı','Reinforcement','Betonarme elemanlarda çekme dayanımını artıran çelik.','Malzeme'],
['Yalıtım','Insulation','Isı, su veya ses geçişini azaltan uygulama.','Malzeme'],
['Derz','Joint','Kaplama veya yapı elemanları arasındaki birleşim boşluğu.','Malzeme'],
['Sıva','Plaster','Duvar ve tavan yüzeylerini düzeltmek için uygulanan kaplama.','Malzeme'],
['LINE','Line','İki nokta arasında düz çizgi oluşturur.','AutoCAD'],
['PLINE','Polyline','Birbirine bağlı çizgi ve yay parçaları oluşturur.','AutoCAD'],
['CIRCLE','Circle','Daire çizer.','AutoCAD'],
['ARC','Arc','Yay çizer.','AutoCAD'],
['OFFSET','Offset','Belirli mesafede paralel veya eş merkezli kopya oluşturur.','AutoCAD'],
['TRIM','Trim','Fazlalık çizgi parçalarını keser.','AutoCAD'],
['EXTEND','Extend','Çizgileri belirlenen sınıra kadar uzatır.','AutoCAD'],
['MOVE','Move','Seçilen nesneleri taşır.','AutoCAD'],
['COPY','Copy','Seçilen nesnelerin kopyasını oluşturur.','AutoCAD'],
['ROTATE','Rotate','Nesneleri belirlenen açıyla döndürür.','AutoCAD'],
['SCALE','Scale','Nesnelerin boyutunu değiştirir.','AutoCAD'],
['MIRROR','Mirror','Nesnelerin simetrik kopyasını oluşturur.','AutoCAD'],
['HATCH','Hatch','Kapalı alanları tarama veya dolgu ile doldurur.','AutoCAD'],
['LAYER','Layer','Çizim elemanlarını katmanlarda düzenler.','AutoCAD'],
['DIM','Dimension','Çizime ölçülendirme ekler.','AutoCAD'],
['OSNAP','Object Snap','Nesnelerin uç, orta ve merkez gibi noktalarına yakalar.','AutoCAD'],
['BLOCK','Block','Birden fazla nesneyi tek bir blok haline getirir.','AutoCAD'],
['EXPLODE','Explode','Blok veya birleşik nesneleri bileşenlerine ayırır.','AutoCAD'],
['PUSH/PULL','Push/Pull','Bir yüzeyi iterek veya çekerek 3B hacim oluşturur.','SketchUp'],
['ORBIT','Orbit','Modelin çevresinde kamera görünümünü döndürür.','SketchUp'],
['PAN','Pan','Görünümü yatay veya dikey kaydırır.','SketchUp'],
['TAPE MEASURE','Tape Measure','Mesafe ölçer ve kılavuz oluşturur.','SketchUp'],
['FOLLOW ME','Follow Me','Bir profili belirlenen yol boyunca uzatır.','SketchUp'],
['PAINT BUCKET','Paint Bucket','Yüzeylere renk ve malzeme uygular.','SketchUp'],
['GROUP','Group','Geometriyi bağımsız bir grup haline getirir.','SketchUp'],
['COMPONENT','Component','Tekrar kullanılabilir bileşen oluşturur.','SketchUp'],
['SCENES','Scenes','Kamera ve görünüm durumlarını kaydeder.','SketchUp'],
['OUTLINER','Outliner','Modeldeki grup ve bileşenleri listeler.','SketchUp']
];

const css=document.createElement('style');
css.textContent=`
#ksBtn{
position:fixed;
z-index:99990;
left:15px;
bottom:18px;
border:0;
border-radius:50px;
padding:14px 18px;
background:linear-gradient(135deg,#12a889,#2674d9);
color:white;
font-weight:900;
font-size:14px;
box-shadow:0 8px 25px #0005;
cursor:pointer;
white-space:nowrap;
}
#ksApp{
display:none;
position:fixed;
inset:0;
z-index:100001;
background:#071326;
color:#f4f7ff;
font-family:Arial,sans-serif;
overflow:auto;
}
#ksApp *{box-sizing:border-box}
.ks-wrap{max-width:1000px;margin:auto;padding:20px}
.ks-head{display:flex;justify-content:space-between;align-items:center;gap:12px}
.ks-title{font-size:24px;font-weight:900}
.ks-close{background:#263e60;color:white;border:0;border-radius:12px;padding:11px 16px;font-size:18px}
.ks-intro{padding:22px 0 12px}
.ks-intro h1{font-size:clamp(26px,5vw,38px);margin:0 0 8px}
.ks-intro p{color:#aabbd3;line-height:1.5}
.ks-search{width:100%;padding:17px;border-radius:14px;border:1px solid #496385;background:#132744;color:white;font-size:16px;outline:none}
.ks-search:focus{border-color:#55c9ff;box-shadow:0 0 0 3px #55c9ff22}
.ks-filters{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0}
.ks-filter{border:1px solid #3a5274;background:#172d4b;color:#dce8f8;padding:9px 12px;border-radius:30px;font-weight:700}
.ks-filter.active{background:#1a8b80;border-color:#52e0c4;color:white}
.ks-tools{display:flex;gap:9px;flex-wrap:wrap;margin:12px 0}
.ks-tools button,.ks-tools select{background:#203959;color:white;border:1px solid #496385;border-radius:10px;padding:10px}
.ks-count{color:#9fb1ca;font-size:13px;margin:12px 0}
.ks-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}
.ks-item{position:relative;background:linear-gradient(145deg,#172e4d,#10213a);border:1px solid #344e70;border-radius:15px;padding:15px;min-width:0}
.ks-en{font-size:19px;font-weight:900;color:#67d5ff;overflow-wrap:anywhere}
.ks-tr{font-size:14px;color:#fff;margin-top:5px;font-weight:700}
.ks-desc{font-size:13px;color:#aebed2;line-height:1.5;margin-top:9px}
.ks-cat{display:inline-block;margin-top:10px;background:#263e60;color:#c5d8f2;padding:5px 9px;border-radius:20px;font-size:11px}
.ks-star{position:absolute;right:10px;top:10px;border:0;background:#ffffff12;color:#ffd76b;border-radius:9px;padding:7px;font-size:17px}
.ks-empty{grid-column:1/-1;text-align:center;padding:35px;color:#aabbd3}
.ks-direction{display:flex;gap:8px;flex-wrap:wrap}
.ks-direction button{border:1px solid #496385;background:#203959;color:white;border-radius:10px;padding:10px 13px}
.ks-direction button.active{background:#247b9e;border-color:#67d5ff}
@media(max-width:650px){
.ks-wrap{padding:13px}
.ks-list{grid-template-columns:1fr}
.ks-title{font-size:19px}
}
`;
document.head.appendChild(css);

const btn=document.createElement('button');
btn.id='ksBtn';
btn.textContent='📘 MESLEKİ SÖZLÜK';
document.body.appendChild(btn);

const app=document.createElement('div');
app.id='ksApp';
app.innerHTML=`
<div class="ks-wrap">
<div class="ks-head"><div class="ks-title">📘 KALECAD MESLEKİ SÖZLÜK</div><button class="ks-close" id="ksClose">✕</button></div>
<div class="ks-intro"><h1>Mesleki terimleri keşfet.</h1><p>İnşaat, mimarlık, iç mimarlık ve CAD terimlerini ara, öğren ve favorilerine ekle.</p></div>
<input id="ksSearch" class="ks-search" type="search" placeholder="Terim ara... Örn: Kolon, Beam, AutoCAD">
<div class="ks-tools">
<div class="ks-direction">
<button class="active" data-direction="both">TR ↔ EN</button>
<button data-direction="tr">Türkçe → İngilizce</button>
<button data-direction="en">English → Turkish</button>
</div>
<select id="ksSort"><option value="all">Tüm terimler</option><option value="favorites">★ Favorilerim</option></select>
</div>
<div class="ks-filters" id="ksFilters"></div>
<div class="ks-count" id="ksCount"></div>
<div class="ks-list" id="ksList"></div>
</div>`;
document.body.appendChild(app);

let category='Tümü';
let direction='both';
let favorites=new Set();
try{
favorites=new Set(JSON.parse(localStorage.getItem('kalecad_dictionary_favorites')||'[]'));
}catch(e){}

const categories=['Tümü',...new Set(terms.map(t=>t[3]))];
const filters=document.getElementById('ksFilters');

categories.forEach(cat=>{
const b=document.createElement('button');
b.className='ks-filter'+(cat==='Tümü'?' active':'');
b.textContent=cat;
b.onclick=()=>{
category=cat;
filters.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));
render();
};
filters.appendChild(b);
});

btn.onclick=()=>{app.style.display='block';render()};
document.getElementById('ksClose').onclick=()=>app.style.display='none';
app.addEventListener('click',e=>{
if(e.target===app)app.style.display='none';
});

document.getElementById('ksSearch').addEventListener('input',render);
document.getElementById('ksSort').addEventListener('change',render);

document.querySelectorAll('[data-direction]').forEach(b=>{
b.onclick=()=>{
direction=b.dataset.direction;
document.querySelectorAll('[data-direction]').forEach(x=>x.classList.toggle('active',x===b));
render();
};
});

/* OYUN MERKEZI DUGMESIYLE AYNI BOYUT VE TASARIM */

function syncButton(){
  const gameBtn=document.getElementById('kaleGamesBtn');
  if(!gameBtn)return false;

  const rect=gameBtn.getBoundingClientRect();
  const style=getComputedStyle(gameBtn);

  btn.style.position='fixed';
  btn.style.left='auto';
  btn.style.right=(window.innerWidth-rect.right)+'px';
  btn.style.top='auto';
  btn.style.bottom=(window.innerHeight-rect.top+8)+'px';

  btn.style.width=rect.width+'px';
  btn.style.height=rect.height+'px';
  btn.style.minHeight=rect.height+'px';
  btn.style.padding=style.padding;
  btn.style.margin='0';
  btn.style.boxSizing='border-box';

  btn.style.display='flex';
  btn.style.alignItems='center';
  btn.style.justifyContent='center';

  btn.style.background=style.background;
  btn.style.color=style.color;
  btn.style.border=style.border;
  btn.style.borderRadius=style.borderRadius;
  btn.style.boxShadow=style.boxShadow;
  btn.style.fontFamily=style.fontFamily;
  btn.style.fontSize=style.fontSize;
  btn.style.fontWeight=style.fontWeight;
  btn.style.zIndex='99990';
  btn.style.whiteSpace='nowrap';

  return true;
}

let attempts=0;
function locateGameButton(){
if(syncButton())return;
attempts++;
if(attempts<30)setTimeout(locateGameButton,250);
}
locateGameButton();

window.addEventListener('resize',syncButton);
window.addEventListener('scroll',syncButton,true);

const observer=new MutationObserver(()=>{
if(!syncButton())locateGameButton();
});
observer.observe(document.body,{childList:true,subtree:true});

function render(){
const query=document.getElementById('ksSearch').value.trim().toLocaleLowerCase('tr');
const onlyFav=document.getElementById('ksSort').value==='favorites';
const list=document.getElementById('ksList');
list.replaceChildren();

const results=terms.filter(t=>{
const matchCat=category==='Tümü'||t[3]===category;
const matchFav=!onlyFav||favorites.has(t[0]);
const haystack=(t[0]+' '+t[1]+' '+t[2]+' '+t[3]).toLocaleLowerCase('tr');
const matchQuery=!query||haystack.includes(query);
return matchCat&&matchFav&&matchQuery;
});

document.getElementById('ksCount').textContent=results.length+' terim listeleniyor';

if(!results.length){
const empty=document.createElement('div');
empty.className='ks-empty';
empty.textContent='Aradığın terim bulunamadı. Farklı bir kelime deneyebilirsin.';
list.appendChild(empty);
return;
}

results.forEach(t=>{
const card=document.createElement('article');
card.className='ks-item';

const star=document.createElement('button');
star.className='ks-star';
star.textContent=favorites.has(t[0])?'★':'☆';
star.title='Favorilere ekle';
star.onclick=()=>{
if(favorites.has(t[0]))favorites.delete(t[0]);
else favorites.add(t[0]);
try{
localStorage.setItem('kalecad_dictionary_favorites',JSON.stringify([...favorites]));
}catch(e){}
render();
};

const primary=document.createElement('div');
primary.className='ks-en';
primary.textContent=direction==='tr'?t[0]:t[1];

const secondary=document.createElement('div');
secondary.className='ks-tr';
secondary.textContent=direction==='tr'?t[1]:t[0];

const desc=document.createElement('div');
desc.className='ks-desc';
desc.textContent=t[2];

const cat=document.createElement('span');
cat.className='ks-cat';
cat.textContent=t[3];

card.append(star,primary,secondary,desc,cat);
list.appendChild(card);
});
}

render();
})();

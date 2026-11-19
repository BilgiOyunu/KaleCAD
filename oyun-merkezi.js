
/* KALECAD GAME STUDIO - COMPLETE REBUILD */
(() => {
'use strict';

if (window.KALECAD_STUDIO_V4) return;
window.KALECAD_STUDIO_V4 = true;

const previous = document.getElementById('kaleGames');
if (previous) previous.remove();
const previousButton = document.getElementById('kaleGamesBtn');
if (previousButton) previousButton.remove();
const previousStyle = document.getElementById('kaleGamesStyle');
if (previousStyle) previousStyle.remove();

const style = document.createElement('style');
style.id = 'kaleGamesStyle';
style.textContent = `
#kaleGames{
 position:fixed;inset:0;z-index:999999;background:#081326;color:#f4f6ff;
 display:none;overflow-y:auto;font-family:Arial,sans-serif;
}
#kaleGames *{box-sizing:border-box}
#kaleGames button{font:inherit;cursor:pointer}
#kaleGames .kg-wrap{max-width:1150px;margin:auto;padding:18px}
#kaleGames .kg-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:22px}
#kaleGames .kg-logo{color:#ff9b61;font-size:12px;font-weight:900;letter-spacing:3px}
#kaleGames h1{font-size:clamp(27px,5vw,43px);margin:7px 0;font-weight:950}
#kaleGames h2{font-size:24px;margin:5px 0 12px}
#kaleGames h3{font-size:16px;margin:18px 0 10px}
#kaleGames p{color:#b4c0d2;line-height:1.5;font-size:14px}
#kaleGames .kg-muted{color:#9eacc2;font-size:12px}
#kaleGames .kg-close,#kaleGames .kg-secondary{
 background:#203653;border:1px solid #3a5273;color:#fff;border-radius:12px;padding:11px 14px
}
#kaleGames .kg-primary{
 background:linear-gradient(110deg,#f47b3c,#ec575d);border:0;color:#fff;
 padding:13px 16px;border-radius:12px;font-weight:900;width:100%;margin-top:12px
}
#kaleGames .kg-hero{
 padding:25px;border-radius:23px;background:linear-gradient(120deg,#16365a,#293354,#4c3049);
 margin-bottom:20px;position:relative;overflow:hidden
}
#kaleGames .kg-hero:after{
 content:"🏗️";position:absolute;right:22px;bottom:10px;font-size:100px;opacity:.22
}
#kaleGames .kg-eyebrow{color:#ffad7b;font-size:11px;font-weight:900;letter-spacing:2px}
#kaleGames .kg-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}
#kaleGames .kg-card{background:#11243f;border:1px solid #2b4261;border-radius:19px;overflow:hidden}
#kaleGames .kg-cardart{height:175px;display:flex;align-items:center;justify-content:center;font-size:75px;position:relative;overflow:hidden}
#kaleGames .kg-cardbody{padding:17px}
#kaleGames .kg-cardbody h2{font-size:19px}
#kaleGames .kg-tag{font-size:10px;letter-spacing:1px;font-weight:900;color:#ffb17f;background:#3b3442;padding:6px 9px;border-radius:7px}
#kaleGames .kg-panel{background:#11243f;border:1px solid #2b4261;border-radius:18px;padding:17px;margin:13px 0}
#kaleGames .kg-row{display:flex;gap:9px;flex-wrap:wrap;align-items:center}
#kaleGames .kg-stat{background:#091a30;border:1px solid #293f5e;border-radius:12px;padding:11px;flex:1;min-width:100px}
#kaleGames .kg-stat b{display:block;font-size:20px;margin-top:5px}
#kaleGames .kg-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
#kaleGames .kg-item{border:1px solid #3b5273;background:#203653;color:white;border-radius:12px;padding:10px 4px;font-size:12px;min-width:0}
#kaleGames .kg-item span{display:block;font-size:27px;margin-bottom:5px}
#kaleGames .kg-item.active{border:2px solid #ff985e;background:#493b4a}
#kaleGames .kg-room{
 position:relative;width:100%;height:390px;overflow:hidden;border-radius:15px;
 border:2px solid #65768b;touch-action:none;background:#e9dfcf;
}
#kaleGames .kg-backwall{
 position:absolute;inset:0 0 28% 0;
 background:linear-gradient(110deg,#e7d9c5,#f4ebdc);
 border-bottom:7px solid #9a8068;
}
#kaleGames .kg-floor{
 position:absolute;bottom:0;left:0;width:100%;height:29%;
 background:repeating-linear-gradient(90deg,#a47751 0 65px,#d2ad83 66px 68px);
 clip-path:polygon(0 0,100% 0,100% 100%,0 100%);
}
#kaleGames .kg-window{
 position:absolute;top:12%;left:8%;width:23%;height:35%;
 border:9px solid #fff;background:linear-gradient(135deg,#a3d7e7,#e2f7fa);
 box-shadow:0 4px 12px #0003;
}
#kaleGames .kg-window:after{content:"";position:absolute;top:0;bottom:0;left:48%;width:5px;background:white}
#kaleGames .kg-window:before{content:"";position:absolute;left:0;right:0;top:48%;height:5px;background:white}
#kaleGames .kg-door{
 position:absolute;right:8%;bottom:28%;width:14%;height:40%;
 background:linear-gradient(90deg,#8b6248,#bd9471);border:5px solid #72543f;border-bottom:0;border-radius:5px 5px 0 0;
}
#kaleGames .kg-light{
 position:absolute;left:50%;top:0;width:4px;height:58px;background:#786b5b;
}
#kaleGames .kg-light:after{
 content:"";position:absolute;top:52px;left:-18px;width:40px;height:23px;
 background:#ffe3a2;border-radius:50%;box-shadow:0 0 30px 12px #ffe3a266;
}
#kaleGames .kg-object{
 position:absolute;z-index:5;transform:translate(-50%,-50%);
 line-height:1;cursor:grab;user-select:none;touch-action:none;
 filter:drop-shadow(0 5px 4px #0004);
}
#kaleGames .kg-object.selected{outline:2px dashed #ff8c51;outline-offset:7px;border-radius:9px}
#kaleGames .kg-object:active{cursor:grabbing}
#kaleGames .kg-control{background:#091a30;border:1px solid #2c4362;border-radius:14px;padding:14px;margin-top:12px}
#kaleGames input[type=range]{width:100%;accent-color:#ff9256}
#kaleGames .kg-range-label{display:flex;justify-content:space-between;color:#9eacc2;font-size:11px}
#kaleGames .kg-answer{
 width:100%;text-align:left;padding:14px;border-radius:11px;
 background:#203653;color:white;border:1px solid #405878;margin:6px 0
}
#kaleGames .kg-feedback{padding:14px;border-radius:12px;background:#1c3c42;margin-top:12px;color:#d1f5df}
#kaleGames .kg-progress{height:7px;background:#293d5b;border-radius:20px;overflow:hidden;margin:12px 0}
#kaleGames .kg-progress i{display:block;height:100%;background:#ff9356}
#kaleGames .kg-site{
 height:300px;border-radius:16px;position:relative;overflow:hidden;
 background:linear-gradient(#9bc1d3 0 60%,#a8a18b 60% 100%);
}
#kaleGames .kg-siteground{position:absolute;bottom:0;height:36%;width:100%;background:linear-gradient(150deg,#85917a,#5e755e)}
#kaleGames .kg-sitebuilding{
 position:absolute;bottom:27%;left:30%;width:42%;height:48%;
 background:linear-gradient(90deg,#a9a89e,#e2d7c5);
 clip-path:polygon(0 12%,72% 0,100% 12%,100% 100%,0 100%);
}
#kaleGames .kg-sitebuilding:after{
 content:"";position:absolute;inset:20% 12%;
 background:repeating-linear-gradient(90deg,#7195a6 0 24%,transparent 24% 34%),repeating-linear-gradient(0deg,transparent 0 40%,#9b8b73 40% 45%);
}
#kaleGames .kg-crane{position:absolute;left:12%;top:10%;height:70%;width:7px;background:#e8a43f}
#kaleGames .kg-crane:before{content:"";position:absolute;top:0;left:0;width:180px;height:7px;background:#e8a43f}
#kaleGames .kg-crane:after{content:"";position:absolute;top:0;left:150px;width:3px;height:90px;background:#e8a43f}
#kaleGames .kg-house{
 position:absolute;bottom:0;left:17%;width:66%;height:78%;
 background:linear-gradient(90deg,#c8bca9,#eee3d1);
 clip-path:polygon(50% 0,100% 28%,100% 100%,0 100%,0 28%);
}
#kaleGames .kg-house:before{
 content:"";position:absolute;left:39%;top:39%;width:23%;height:61%;background:#927b65
}
#kaleGames .kg-defect{position:absolute;z-index:4;font-size:38px;cursor:pointer}
#kaleGames .kg-defect.active{filter:drop-shadow(0 0 8px red)}
@media(max-width:760px){
 #kaleGames .kg-wrap{padding:12px}
 #kaleGames .kg-cards{grid-template-columns:1fr}
 #kaleGames .kg-cardart{height:145px}
 #kaleGames .kg-room{height:320px}
 #kaleGames .kg-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
 #kaleGames .kg-hero{padding:20px}
}
`;
document.head.appendChild(style);

const root=document.createElement('div');
root.id='kaleGames';
root.innerHTML=`
<div class="kg-wrap">
 <header class="kg-head">
  <div><div class="kg-logo">KALECAD / GAME STUDIO</div><h1>OYUN MERKEZİ</h1></div>
  <button class="kg-close" id="kgClose">✕ Kapat</button>
 </header>
 <main id="kgContent"></main>
</div>`;
document.body.appendChild(root);

const launch=document.createElement('button');
launch.id='kaleGamesBtn';
launch.textContent='🎮 OYUN MERKEZİ';
launch.style.cssText='position:fixed;right:15px;bottom:17px;z-index:99990;border:0;border-radius:15px;padding:14px 17px;background:linear-gradient(110deg,#f4773b,#ec575d);color:white;font-weight:900;box-shadow:0 7px 24px #0008';
document.body.appendChild(launch);

const content=root.querySelector('#kgContent');
const scoreKey='kalecad_studio_xp';
const xp=()=>Number(localStorage.getItem(scoreKey)||0);
const giveXP=n=>localStorage.setItem(scoreKey,xp()+n);
const backButton='<button class="kg-secondary" id="kgBack">← Oyun merkezine dön</button>';

function home(){
content.innerHTML=`
<section class="kg-hero">
 <div class="kg-eyebrow">TASARLA · İNŞA ET · KEŞFET</div>
 <h1>Mesleki becerilerini<br>oyuna dönüştür.</h1>
 <p>Şantiyeyi yönet, yapıları kurtar, kendi iç mekânını tasarla.</p>
 <div class="kg-row">
  <div class="kg-stat"><span class="kg-muted">TOPLAM PUAN</span><b>${xp()} XP</b></div>
  <div class="kg-stat"><span class="kg-muted">OYUN</span><b>03</b></div>
 </div>
</section>
<div class="kg-cards">
 <article class="kg-card">
  <div class="kg-cardart" style="background:linear-gradient(#9bc1d3,#b3a98e)">🏗️</div>
  <div class="kg-cardbody"><span class="kg-tag">İNŞAAT YÖNETİMİ</span><h2>Şantiye Simülatörü</h2><p>Şantiye şefi ol. Malzeme ve uygulama kararlarını vererek projeni tamamla.</p><button class="kg-primary" id="kgSite">ŞANTİYEYE GİR →</button></div>
 </article>
 <article class="kg-card">
  <div class="kg-cardart" style="background:linear-gradient(135deg,#9bb7c9,#e8d7bd)">🏚️</div>
  <div class="kg-cardbody"><span class="kg-tag">YAPI ANALİZİ</span><h2>Binayı Kurtar</h2><p>Yapıdaki hasarları bul, nedenlerini incele ve doğru çözümü seç.</p><button class="kg-primary" id="kgRescue">İNCELEMEYE BAŞLA →</button></div>
 </article>
 <article class="kg-card">
  <div class="kg-cardart" style="background:linear-gradient(135deg,#e4d5bf,#9c7d62)">🛋️</div>
  <div class="kg-cardbody"><span class="kg-tag">İÇ MİMARLIK</span><h2>🛋️ İç Mekân Tasarla</h2><p>Mobilyaları yerleştir, büyüt, küçült ve döndür. Kendi odanı oluştur!</p><button class="kg-primary" id="kgDesign">TASARIMA BAŞLA →</button></div>
 </article>
</div>`;
content.querySelector('#kgSite').onclick=siteStart;
content.querySelector('#kgRescue').onclick=rescueStart;
content.querySelector('#kgDesign').onclick=designStart;
}

/* INTERIOR DESIGN */
let roomItems=[];
let roomType='Salon';
let wall='#e8dfd1';
let floor='#a47751';
let designStyle='Modern';
let selected=-1;

const furniture=[
 ['sofa','🛋️','Koltuk',1.25],
 ['armchair','🪑','Berjer',1],
 ['bed','🛏️','Yatak',1.3],
 ['table','🪵','Sehpa',0.9],
 ['dining','🍽️','Yemek masası',1.1],
 ['chair','🪑','Sandalye',0.75],
 ['plant','🪴','Bitki',0.8],
 ['lamp','💡','Lambader',0.9],
 ['tv','📺','Televizyon',1],
 ['shelf','📚','Kitaplık',1],
 ['wardrobe','🚪','Dolap',1.1],
 ['rug','🟫','Halı',1.2],
 ['desk','🖥️','Çalışma masası',1.1],
 ['mirror','🪞','Ayna',0.9],
 ['picture','🖼️','Tablo',0.8],
 ['flower','🌸','Dekor',0.7]
];

function designStart(){
 roomItems=[
  {type:'sofa',icon:'🛋️',name:'Koltuk',x:35,y:70,size:1.25,angle:0},
  {type:'table',icon:'🪵',name:'Sehpa',x:53,y:82,size:.9,angle:0},
  {type:'plant',icon:'🪴',name:'Bitki',x:82,y:62,size:.8,angle:0},
  {type:'tv',icon:'📺',name:'Televizyon',x:14,y:43,size:1,angle:0}
 ];
 roomType='Salon';wall='#e8dfd1';floor='#a47751';designStyle='Modern';selected=0;
 designShow();
}

function designShow(){
 const chosen=roomItems[selected];
 content.innerHTML=`
 ${backButton}
 <div class="kg-panel">
  <div class="kg-eyebrow">KALECAD INTERIOR DESIGN STUDIO</div>
  <h2>🛋️ İç Mekân Tasarla</h2>
  <p>Mobilya seç, mekâna yerleştir. Seçtiğin mobilyayı sürükle, boyutunu değiştir ve döndür.</p>
  <div class="kg-row">
   <div class="kg-stat"><span class="kg-muted">MEKÂN</span><b>${roomType}</b></div>
   <div class="kg-stat"><span class="kg-muted">TARZ</span><b>${designStyle}</b></div>
   <div class="kg-stat"><span class="kg-muted">EŞYA</span><b>${roomItems.length}</b></div>
  </div>
  <div class="kg-room" id="kgRoom" style="margin-top:15px">
   <div class="kg-backwall" id="kgBackwall" style="background:${wall}"></div>
   <div class="kg-floor" id="kgFloor" style="background:repeating-linear-gradient(90deg,${floor} 0 65px,#ffffff22 66px 68px)"></div>
   <div class="kg-window"></div><div class="kg-door"></div><div class="kg-light"></div>
   <div id="kgObjects"></div>
  </div>
  <div class="kg-control">
   <div class="kg-eyebrow">SEÇİLİ MOBİLYA</div>
   <h3 id="kgSelected">${chosen?chosen.name:'Mobilya seçilmedi'}</h3>
   <div class="kg-row">
    <button class="kg-secondary" id="kgLeft">↶ Döndür</button>
    <button class="kg-secondary" id="kgRight">↷ Döndür</button>
    <button class="kg-secondary" id="kgDelete">🗑️ Sil</button>
    <button class="kg-secondary" id="kgFront">⬆ Öne getir</button>
   </div>
   <h3>Boyut</h3>
   <input id="kgSize" type="range" min=".4" max="2.5" step=".1" value="${chosen?chosen.size:1}">
   <div class="kg-range-label"><span>Küçült</span><span>Büyüt</span></div>
   <h3>Döndürme</h3>
   <input id="kgAngle" type="range" min="0" max="345" step="15" value="${chosen?chosen.angle:0}">
   <div class="kg-range-label"><span>0°</span><span>345°</span></div>
  </div>
  <h3>🪑 Mobilya kataloğu</h3>
  <p class="kg-muted">Bir ürüne dokunarak odana ekle.</p>
  <div class="kg-grid">${furniture.map(f=>`<button class="kg-item" data-add="${f[0]}"><span>${f[1]}</span>${f[2]}</button>`).join('')}</div>
  <h3>🎨 Duvar rengi</h3>
  <div class="kg-grid">
   ${[['#e8dfd1','Krem'],['#bcd0d4','Mavi'],['#c9b8d1','Lila'],['#c5d0b8','Yeşil'],['#f4f0e8','Beyaz'],['#b8a18e','Vizon'],['#d9b5a5','Pudra'],['#777b86','Gri']].map(c=>`<button class="kg-item" data-wall="${c[0]}"><span style="height:23px;background:${c[0]};border-radius:5px"></span>${c[1]}</button>`).join('')}
  </div>
  <h3>🪵 Zemin kaplaması</h3>
  <div class="kg-grid">
   ${[['#a47751','Ahşap'],['#b9b4a9','Mermer'],['#777b80','Gri taş'],['#d6c9ad','Açık parke'],['#694e42','Koyu parke'],['#d8d0c2','Seramik']].map(c=>`<button class="kg-item" data-floor="${c[0]}"><span style="height:23px;background:${c[0]};border-radius:5px"></span>${c[1]}</button>`).join('')}
  </div>
  <h3>✨ Tasarım tarzı</h3>
  <div class="kg-grid">
   ${['Modern','Minimalist','İskandinav','Endüstriyel','Klasik','Bohem'].map(s=>`<button class="kg-item" data-style="${s}"><span>✦</span>${s}</button>`).join('')}
  </div>
  <div class="kg-row" style="margin-top:18px">
   <button class="kg-secondary" id="kgRoomType">🏠 Mekânı değiştir</button>
   <button class="kg-secondary" id="kgReset">↺ Sıfırla</button>
   <button class="kg-primary" id="kgFinish" style="flex:1;margin:0">TASARIMI TAMAMLA ✓</button>
  </div>
  <div id="kgDesignFeedback"></div>
 </div>`;
 content.querySelector('#kgBack').onclick=home;
 const objects=content.querySelector('#kgObjects');
 const room=content.querySelector('#kgRoom');

 function renderObjects(){
  objects.innerHTML=roomItems.map((it,i)=>`
   <div class="kg-object ${i===selected?'selected':''}" data-object="${i}"
    style="left:${it.x}%;top:${it.y}%;font-size:${48*it.size}px;transform:translate(-50%,-50%) rotate(${it.angle}deg);z-index:${i+5}">
    ${it.icon}
   </div>`).join('');

  objects.querySelectorAll('[data-object]').forEach(node=>{
   const i=Number(node.dataset.object);
   let moving=false;
   node.addEventListener('pointerdown',e=>{
    e.preventDefault();
    selected=i;moving=true;
    node.setPointerCapture(e.pointerId);
    renderObjects();updateSelection();
   });
   node.addEventListener('pointermove',e=>{
    if(!moving)return;
    const rect=room.getBoundingClientRect();
    roomItems[i].x=Math.max(3,Math.min(97,(e.clientX-rect.left)/rect.width*100));
    roomItems[i].y=Math.max(3,Math.min(96,(e.clientY-rect.top)/rect.height*100));
    node.style.left=roomItems[i].x+'%';
    node.style.top=roomItems[i].y+'%';
   });
   node.addEventListener('pointerup',()=>{moving=false;});
   node.addEventListener('pointercancel',()=>{moving=false;});
  });
 }
 function updateSelection(){
  const it=roomItems[selected];
  content.querySelector('#kgSelected').textContent=it?it.name:'Mobilya seçilmedi';
  content.querySelector('#kgSize').value=it?it.size:1;
  content.querySelector('#kgAngle').value=it?it.angle:0;
 }
 function updateObject(){
  const it=roomItems[selected];
  if(!it)return;
  const node=objects.querySelector(`[data-object="${selected}"]`);
  if(node){
   node.style.fontSize=(48*it.size)+'px';
   node.style.transform=`translate(-50%,-50%) rotate(${it.angle}deg)`;
  }
 }
 renderObjects();
 updateSelection();

 content.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{
  const f=furniture.find(x=>x[0]===b.dataset.add);
  roomItems.push({type:f[0],icon:f[1],name:f[2],x:45,y:65,size:f[3],angle:0});
  selected=roomItems.length-1;
  renderObjects();updateSelection();
 });
 content.querySelector('#kgSize').oninput=e=>{
  if(!roomItems[selected])return;
  roomItems[selected].size=Number(e.target.value);updateObject();
 };
 content.querySelector('#kgAngle').oninput=e=>{
  if(!roomItems[selected])return;
  roomItems[selected].angle=Number(e.target.value);updateObject();
 };
 content.querySelector('#kgLeft').onclick=()=>{
  if(!roomItems[selected])return;
  roomItems[selected].angle=(roomItems[selected].angle+345)%360;
  updateSelection();updateObject();
 };
 content.querySelector('#kgRight').onclick=()=>{
  if(!roomItems[selected])return;
  roomItems[selected].angle=(roomItems[selected].angle+15)%360;
  updateSelection();updateObject();
 };
 content.querySelector('#kgDelete').onclick=()=>{
  if(!roomItems[selected])return;
  roomItems.splice(selected,1);selected=Math.min(selected,roomItems.length-1);
  renderObjects();updateSelection();
 };
 content.querySelector('#kgFront').onclick=()=>{
  if(!roomItems[selected])return;
  const it=roomItems.splice(selected,1)[0];
  roomItems.push(it);selected=roomItems.length-1;
  renderObjects();updateSelection();
 };
 content.querySelectorAll('[data-wall]').forEach(b=>b.onclick=()=>{
  wall=b.dataset.wall;content.querySelector('#kgBackwall').style.background=wall;
 });
 content.querySelectorAll('[data-floor]').forEach(b=>b.onclick=()=>{
  floor=b.dataset.floor;
  content.querySelector('#kgFloor').style.background=`repeating-linear-gradient(90deg,${floor} 0 65px,#ffffff22 66px 68px)`;
 });
 content.querySelectorAll('[data-style]').forEach(b=>b.onclick=()=>{
  designStyle=b.dataset.style;
 });
 content.querySelector('#kgRoomType').onclick=()=>{
  const types=['Salon','Yatak Odası','Çalışma Odası','Mutfak'];
  roomType=types[(types.indexOf(roomType)+1)%types.length];
  designShow();
 };
 content.querySelector('#kgReset').onclick=designStart;
 content.querySelector('#kgFinish').onclick=()=>{
  const points=30+Math.min(roomItems.length,12)*8;
  giveXP(points);
  content.querySelector('#kgDesignFeedback').innerHTML=`
   <div class="kg-feedback"><h2>🎉 Tasarım tamamlandı!</h2>
   <p>${roomType} · ${designStyle} · ${roomItems.length} mobilya</p>
   <h2>+${points} XP</h2>
   <button class="kg-primary" id="kgAgain">YENİ TASARIM YAP</button>
   <button class="kg-secondary" id="kgHome" style="width:100%;margin-top:8px">OYUN MERKEZİNE DÖN</button></div>`;
  content.querySelector('#kgAgain').onclick=designStart;
  content.querySelector('#kgHome').onclick=home;
 };
}

/* CONSTRUCTION SIMULATOR */
const siteQuestions=[
 ['ARAZİ HAZIRLIĞI','İnşaata başlamadan önce hangi çalışma yapılır?',['Zemin etüdü ve aplikasyon','Duvar boyası','Çatı kaplaması'],0,'Önce zemin özellikleri incelenir ve aplikasyon yapılır.'],
 ['TEMEL','Temel imalatından önce hangisi gerekir?',['Kapı montajı','Kazı ve zemin hazırlığı','İç cephe boyası'],1,'Temel öncesinde projeye uygun kazı ve zemin hazırlığı yapılır.'],
 ['TAŞIYICI SİSTEM','Betonarme taşıyıcı elemanlar hangileridir?',['Kapı ve pencere','Kolon, kiriş ve döşeme','Parke ve seramik'],1,'Kolon, kiriş ve döşeme taşıyıcı sistemin elemanlarıdır.'],
 ['DUVAR','Duvar örümünde hangi kontrol önemlidir?',['Şakül ve doğrultu','Mobilya rengi','Aydınlatma türü'],0,'Duvarın düzgünlüğü için şakül ve doğrultu kontrol edilir.'],
 ['İNCE İŞLER','Hangisi ince işler kapsamındadır?',['Temel kazısı','Zemin kaplama ve boya','Zemin etüdü'],1,'Boya ve zemin kaplamaları ince işlerdir.']
];
let siteIndex=0,sitePoints=0,siteBudget=1000000;
function siteStart(){siteIndex=0;sitePoints=0;siteBudget=1000000;siteShow();}
function siteShow(){
 if(siteIndex>=siteQuestions.length){
  giveXP(sitePoints);
  content.innerHTML=`<div class="kg-panel"><h1>🏗️ Şantiye tamamlandı!</h1><h2>+${sitePoints} XP</h2><p>Kazandığın puan: ${sitePoints}</p><button class="kg-primary" id="kgHome">OYUN MERKEZİNE DÖN</button></div>`;
  content.querySelector('#kgHome').onclick=home;return;
 }
 const q=siteQuestions[siteIndex];
 content.innerHTML=`${backButton}
 <div class="kg-panel">
 <div class="kg-eyebrow">ŞANTİYE SİMÜLATÖRÜ</div>
 <div class="kg-site"><div class="kg-siteground"></div><div class="kg-crane"></div><div class="kg-sitebuilding"></div></div>
 <div class="kg-row" style="margin-top:12px">
 <div class="kg-stat"><span class="kg-muted">AŞAMA</span><b>${siteIndex+1}/5</b></div>
 <div class="kg-stat"><span class="kg-muted">BÜTÇE</span><b>${siteBudget.toLocaleString('tr-TR')} ₺</b></div>
 <div class="kg-stat"><span class="kg-muted">PUAN</span><b>${sitePoints}</b></div>
 </div>
 <div class="kg-progress"><i style="width:${siteIndex*20}%"></i></div>
 <div class="kg-eyebrow">${q[0]}</div><h2>${q[1]}</h2>
 ${q[2].map((a,i)=>`<button class="kg-answer" data-answer="${i}">${['A','B','C'][i]} · ${a}</button>`).join('')}
 <div id="kgSiteFeedback"></div></div>`;
 content.querySelector('#kgBack').onclick=home;
 content.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{
  const correct=Number(b.dataset.answer)===q[3];
  if(correct){sitePoints+=20;siteBudget-=50000;}
  else siteBudget-=100000;
  content.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);
  content.querySelector('#kgSiteFeedback').innerHTML=`<div class="kg-feedback">${correct?'✓ Doğru karar! +20 XP':'Bu seçim doğru değil.'}<p>${q[4]}</p><button class="kg-primary" id="kgNext">SONRAKİ AŞAMA →</button></div>`;
  content.querySelector('#kgNext').onclick=()=>{siteIndex++;siteShow();};
 });
}

/* BUILDING RESCUE */
const defects=[
 ['ÇATLAK KOLON','Kolonda belirgin bir çatlak görülüyor.','Üzerini boyamak|Uzman mühendislik incelemesi|Duvar kâğıdı kaplamak',1,'Taşıyıcı elemanlardaki çatlaklar uzman mühendis tarafından değerlendirilmelidir.'],
 ['ÇATI SIZINTISI','Yağmurdan sonra tavanda su lekesi oluşuyor.','Çatı ve su yalıtımını incelemek|Tavanı boyamak|Pencereyi değiştirmek',0,'Su girişinin kaynağı tespit edilmeli ve yalıtım detayları incelenmelidir.'],
 ['EĞRİ DUVAR','Yeni örülen duvarın doğrultusu bozuk.','Mobilyayla gizlemek|Şakül kontrolü yapmak|Duvarı boyamak',1,'Duvar imalatında şakül ve doğrultu kontrolü önemlidir.'],
 ['ISI KAYBI','Binada aşırı ısı kaybı yaşanıyor.','Isı yalıtımını incelemek|Perde asmak|Lambaları değiştirmek',0,'Isı yalıtımı ve ısı köprüleri birlikte değerlendirilmelidir.'],
 ['YANLIŞ ÖLÇÜ','Kapı boşluğu projedeki ölçüden daha dar.','Ölçüyü önemsememek|Kapıyı zorlamak|Projeye göre uygulamayı kontrol etmek',2,'Uygulama proje ölçülerine uygun olmalıdır.']
];
let defectIndex=0,defectPoints=0;
function rescueStart(){defectIndex=0;defectPoints=0;rescueShow();}
function rescueShow(){
 if(defectIndex>=defects.length){
  giveXP(defectPoints);
  content.innerHTML=`<div class="kg-panel"><h1>🏚️ İnceleme tamamlandı!</h1><h2>+${defectPoints} XP</h2><button class="kg-primary" id="kgHome">OYUN MERKEZİNE DÖN</button></div>`;
  content.querySelector('#kgHome').onclick=home;return;
 }
 const q=defects[defectIndex];
 content.innerHTML=`${backButton}<div class="kg-panel">
 <div class="kg-eyebrow">BİNA KURTARMA EKİBİ</div>
 <div class="kg-site" style="background:linear-gradient(#b6d1dc,#e6d8c4)">
 <div class="kg-house"></div><div class="kg-defect" style="left:47%;top:40%">⚠️</div>
 </div>
 <div class="kg-row" style="margin-top:12px">
 <div class="kg-stat"><span class="kg-muted">İNCELEME</span><b>${defectIndex+1}/5</b></div>
 <div class="kg-stat"><span class="kg-muted">PUAN</span><b>${defectPoints}</b></div>
 </div>
 <div class="kg-eyebrow" style="margin-top:16px">HASAR RAPORU</div>
 <h2>${q[0]}</h2><p>${q[1]}</p>
 ${q[2].split('|').map((a,i)=>`<button class="kg-answer" data-answer="${i}">${['A','B','C'][i]} · ${a}</button>`).join('')}
 <div id="kgRescueFeedback"></div></div>`;
 content.querySelector('#kgBack').onclick=home;
 content.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{
  const correct=Number(b.dataset.answer)===q[3];
  if(correct)defectPoints+=20;
  content.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);
  content.querySelector('#kgRescueFeedback').innerHTML=`<div class="kg-feedback">${correct?'✓ Doğru tespit! +20 XP':'Bu çözüm uygun değil.'}<p>${q[4]}</p><button class="kg-primary" id="kgNext">SONRAKİ HASAR →</button></div>`;
  content.querySelector('#kgNext').onclick=()=>{defectIndex++;rescueShow();};
 });
}

launch.onclick=()=>{root.style.display='block';home();};
root.querySelector('#kgClose').onclick=()=>root.style.display='none';
console.log('KALECAD GAME STUDIO V4 loaded');
})();

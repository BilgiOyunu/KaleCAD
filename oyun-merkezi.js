
/* KALECAD GAME STUDIO - VISUAL EDITION */
(() => {
'use strict';
if(window.KALECAD_GAME_STUDIO) return;
window.KALECAD_GAME_STUDIO=true;

const old=document.getElementById('kaleGames');
if(old) old.remove();
const oldBtn=document.getElementById('kaleGamesBtn');
if(oldBtn) oldBtn.remove();

const css=document.createElement('style');
css.textContent=`
#kaleGames{position:fixed;inset:0;z-index:999999;background:#071326;color:#f7f9ff;display:none;overflow:auto;font-family:Inter,Arial,sans-serif}
#kaleGames *{box-sizing:border-box}
#kaleGames button{font:inherit;cursor:pointer}
#kaleGames .wrap{max-width:1100px;margin:auto;padding:18px}
#kaleGames .top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:24px}
#kaleGames .logo{font-size:13px;letter-spacing:3px;color:#ff985e;font-weight:900}
#kaleGames h1{font-size:clamp(25px,5vw,40px);margin:6px 0;font-weight:950;letter-spacing:-1px}
#kaleGames h2{font-size:25px;margin:0 0 10px}
#kaleGames p{color:#aebbd0;line-height:1.55}
#kaleGames .muted{color:#9baac2;font-size:13px}
#kaleGames .close{border:1px solid #334968;background:#142744;color:white;padding:11px 15px;border-radius:12px}
#kaleGames .hero{border-radius:25px;padding:25px;background:linear-gradient(115deg,#142d51,#1b3151 55%,#422c50);position:relative;overflow:hidden;margin-bottom:20px}
#kaleGames .hero:after{content:"";position:absolute;width:240px;height:240px;border-radius:50%;right:-65px;top:-90px;background:#f4773b22;box-shadow:0 0 0 35px #f4773b0c,0 0 0 70px #f4773b08}
#kaleGames .eyebrow{font-size:11px;color:#ffab76;letter-spacing:2px;font-weight:900}
#kaleGames .cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}
#kaleGames .game{border:1px solid #293e5e;background:#10213b;border-radius:20px;overflow:hidden;transition:.2s}
#kaleGames .game:hover{transform:translateY(-4px);border-color:#f58a50}
#kaleGames .gameart{height:185px;position:relative;overflow:hidden}
#kaleGames .gamebody{padding:17px}
#kaleGames .gamebody h2{font-size:19px}
#kaleGames .pill{display:inline-block;padding:6px 9px;border-radius:8px;background:#263c5b;color:#bcd0ec;font-size:11px;font-weight:800}
#kaleGames .primary{background:linear-gradient(110deg,#f4773b,#ed5c57);border:0;color:white;border-radius:12px;padding:13px 16px;font-weight:900;width:100%;margin-top:12px}
#kaleGames .secondary{background:#203858;color:white;border:1px solid #3a5376;border-radius:11px;padding:11px 14px}
#kaleGames .panel{background:#10213b;border:1px solid #2b4162;border-radius:20px;padding:19px;margin:14px 0}
#kaleGames .row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
#kaleGames .stat{background:#0a192e;border:1px solid #243a59;border-radius:13px;padding:11px 14px;flex:1;min-width:110px}
#kaleGames .stat b{display:block;font-size:20px;margin-top:4px}
#kaleGames .scene{height:320px;border-radius:18px;overflow:hidden;position:relative;background:linear-gradient(#9fc3d4 0%,#d7d7c6 65%,#9b9c86 66%);border:1px solid #627b94}
#kaleGames .scene:after{content:"";position:absolute;bottom:0;left:0;width:100%;height:35%;background:linear-gradient(155deg,#87917e,#64745e)}
#kaleGames .building{position:absolute;z-index:2;bottom:25%;left:31%;width:37%;height:48%;background:linear-gradient(90deg,#a9a89e,#e2d8c5);clip-path:polygon(0 15%,75% 0,100% 13%,100% 100%,0 100%);box-shadow:10px 12px 0 #58677b}
#kaleGames .building:before{content:"";position:absolute;inset:24% 12%;background:repeating-linear-gradient(90deg,#6e8b9b 0 17%,transparent 17% 28%),repeating-linear-gradient(0deg,transparent 0 40%,#9c8c73 40% 44%)}
#kaleGames .crane{position:absolute;z-index:3;left:13%;top:12%;width:8px;height:64%;background:#e6a63e}
#kaleGames .crane:before{content:"";position:absolute;top:0;left:-12px;width:170px;height:7px;background:#e6a63e}
#kaleGames .crane:after{content:"";position:absolute;top:0;left:115px;width:3px;height:75px;background:#e6a63e}
#kaleGames .ground{position:absolute;z-index:4;bottom:15%;left:8%;width:75px;height:27px;border-radius:9px;background:#e47732;box-shadow:0 10px 0 #384b54}
#kaleGames .ground:before{content:"";position:absolute;bottom:-11px;left:8px;width:60px;height:15px;border:4px solid #35495a;border-radius:20px}
#kaleGames .rescueScene{height:320px;position:relative;overflow:hidden;border-radius:18px;background:linear-gradient(145deg,#a5b9c8,#e2d8c6 65%,#7f8b91)}
#kaleGames .rescueHouse{position:absolute;bottom:0;left:18%;width:64%;height:83%;background:linear-gradient(90deg,#c5b9a8,#e7ddcc);clip-path:polygon(50% 0,100% 25%,100% 100%,0 100%,0 25%);border:3px solid #796e65}
#kaleGames .rescueHouse:before{content:"";position:absolute;left:36%;top:35%;width:28%;height:65%;background:#8c7765}
#kaleGames .crack{position:absolute;z-index:3;left:51%;top:37%;font-size:70px;color:#b83d36;text-shadow:1px 1px #fff;transform:rotate(10deg)}
#kaleGames .mark{position:absolute;z-index:4;border:3px solid #e74e43;border-radius:50%;width:40px;height:40px;left:49%;top:38%;box-shadow:0 0 0 8px #e74e4333}
#kaleGames .room{height:360px;position:relative;overflow:hidden;border-radius:17px;background:#d8cbb6;perspective:900px;border:1px solid #71829a;touch-action:pan-y}
#kaleGames .roomWall{position:absolute;top:0;left:0;width:100%;height:72%;background:linear-gradient(90deg,#d7c7ae,#f0e8d9);border-bottom:8px solid #9a8065}
#kaleGames .roomFloor{position:absolute;bottom:0;left:0;width:100%;height:30%;background:repeating-linear-gradient(90deg,#9c704e 0 80px,#ad805b 80px 83px);transform:perspective(300px) rotateX(4deg);transform-origin:bottom}
#kaleGames .roomWindow{position:absolute;top:35px;left:8%;width:22%;height:110px;background:linear-gradient(135deg,#9bd3e5,#d5f2fa);border:9px solid #fff;box-shadow:0 5px 14px #3333}
#kaleGames .roomLight{position:absolute;top:0;left:50%;width:5px;height:65px;background:#5e534a}
#kaleGames .roomLight:after{content:"";position:absolute;top:55px;left:-19px;width:43px;height:25px;background:#f8d27c;border-radius:50%;box-shadow:0 0 35px 14px #f8d27c66}
#kaleGames .furniture{position:absolute;z-index:5;touch-action:none;user-select:none;cursor:grab;filter:drop-shadow(0 8px 5px #0004)}
#kaleGames .furniture:active{cursor:grabbing}
#kaleGames .sofa{bottom:29%;left:32%;width:38%;height:64px;background:#537d91;border-radius:14px 14px 7px 7px;box-shadow:inset 0 10px #ffffff30,0 18px #344f61}
#kaleGames .sofa:before{content:"";position:absolute;left:-10px;top:13px;width:20px;height:48px;background:inherit;border-radius:9px}
#kaleGames .table{bottom:12%;left:44%;width:23%;height:24px;background:#81583c;border-radius:50%;border-bottom:9px solid #5b3c2c}
#kaleGames .plant{bottom:28%;right:9%;font-size:48px}
#kaleGames .chair{bottom:29%;left:12%;font-size:55px}
#kaleGames .bed{bottom:28%;left:31%;width:48%;height:65px;background:#a7a9bb;border-radius:12px;border-bottom:18px solid #655b79}
#kaleGames .catalog{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
#kaleGames .item{background:#203858;border:1px solid #3b5578;border-radius:12px;padding:12px 5px;color:white;text-align:center;font-size:12px}
#kaleGames .item span{display:block;font-size:25px;margin-bottom:5px}
#kaleGames .item.active{border:2px solid #ff965c;background:#3b3850}
#kaleGames .answer{display:block;width:100%;text-align:left;background:#203858;color:#eaf1fc;border:1px solid #3b5578;border-radius:12px;padding:14px;margin:8px 0}
#kaleGames .answer:hover{border-color:#ff985e}
#kaleGames .answer:disabled{opacity:.65}
#kaleGames .feedback{padding:13px;border-radius:12px;background:#1a3b43;margin-top:12px;color:#b9f2dd}
#kaleGames .progress{height:7px;background:#263c5b;border-radius:20px;overflow:hidden;margin:12px 0}
#kaleGames .progress i{display:block;height:100%;background:#f58b50}
@media(max-width:760px){#kaleGames .cards{grid-template-columns:1fr}#kaleGames .gameart{height:165px}#kaleGames .scene,#kaleGames .rescueScene{height:260px}#kaleGames .room{height:300px}#kaleGames .catalog{grid-template-columns:repeat(3,1fr)}#kaleGames .wrap{padding:13px}}
`;
document.head.appendChild(css);

const root=document.createElement('div');
root.id='kaleGames';
root.innerHTML=`<div class="wrap">
<header class="top"><div><div class="logo">KALECAD / GAME STUDIO</div><h1>OYUN MERKEZİ</h1></div><button class="close" id="kgClose">✕ Kapat</button></header>
<div id="kgContent"></div></div>`;
document.body.appendChild(root);
const launch=document.createElement('button');
launch.id='kaleGamesBtn';launch.textContent='🎮 OYUN MERKEZİ';
launch.style.cssText='position:fixed;right:16px;bottom:18px;z-index:99990;border:0;border-radius:15px;padding:14px 18px;background:linear-gradient(110deg,#f4773b,#ed5c57);color:white;font-weight:900;box-shadow:0 8px 25px #0007';
document.body.appendChild(launch);

const el=root.querySelector('#kgContent');
const scoreKey='kalecad_game_score';
const getScore=()=>Number(localStorage.getItem(scoreKey)||0);
const award=n=>localStorage.setItem(scoreKey,getScore()+n);
const show=(html)=>{el.innerHTML=html;};
const back=`<button class="secondary" id="kgBack">← Oyun merkezine dön</button>`;
function home(){
show(`<section class="hero"><div class="eyebrow">TASARLA · İNŞA ET · KEŞFET</div><h1>Mesleki becerilerini<br>oyuna dönüştür.</h1><p>Şantiyeye gir, yapıları kurtar, kendi iç mekânını tasarla.</p><div class="row"><div class="stat"><span class="muted">TOPLAM OYUN PUANI</span><b>${getScore()} XP</b></div><div class="stat"><span class="muted">OYUN SAYISI</span><b>03</b></div></div></section>
<div class="cards">
<article class="game"><div class="gameart" style="background:linear-gradient(#8fb4c5,#d5d2b8 65%,#647e6a)"><div class="crane"></div><div class="building"></div><div class="ground"></div></div><div class="gamebody"><span class="pill">İNŞAAT YÖNETİMİ</span><h2>Şantiye Simülatörü</h2><p>Şantiye şefi ol. Doğru kararlarla inşaatı tamamla, bütçeni koru.</p><button class="primary" id="kgSite">ŞANTİYEYE GİR →</button></div></article>
<article class="game"><div class="gameart" style="background:linear-gradient(145deg,#a8c4d1,#e9d7c2)"><div class="rescueHouse"></div><div class="crack">⌁</div><div class="mark"></div></div><div class="gamebody"><span class="pill">YAPI ANALİZİ</span><h2>Binayı Kurtar</h2><p>Hasarları incele, yapı sorunlarını tespit et ve doğru çözümü bul.</p><button class="primary" id="kgRescue">İNCELEMEYE BAŞLA →</button></div></article>
<article class="game"><div class="gameart" style="background:linear-gradient(140deg,#d8cbb6,#9d8068)"><div style="position:absolute;inset:15px;background:linear-gradient(90deg,#eadfce 50%,#d2c0a5 50%);border:8px solid #9c846b;box-shadow:0 15px 25px #0003"><div style="position:absolute;bottom:15%;left:25%;width:55%;height:48px;border-radius:12px;background:#527d91;box-shadow:0 14px #344f61"></div><div style="position:absolute;top:15%;left:12%;width:25%;height:30%;background:#a9d8e6;border:7px solid white"></div></div></div><div class="gamebody"><span class="pill">İÇ MİMARLIK</span><h2>İç Mekân Tasarımı</h2><p>Boş bir odayı mobilyalarla döşe. Renkleri, tarzı ve yerleşimi sen belirle.</p><button class="primary" id="kgDesign">TASARIMA BAŞLA →</button></div></article>
</div>`);
el.querySelector('#kgSite').onclick=siteStart;
el.querySelector('#kgRescue').onclick=rescueStart;
el.querySelector('#kgDesign').onclick=designStart;
}

const site=[
['ARAZİ HAZIRLIĞI','İnşaata başlamadan önce hangi işlem yapılır?',['Zemin etüdü ve aplikasyon','Duvar boyası','Çatı kaplaması'],0,'Zemin özellikleri incelenir ve yapı aplikasyonu yapılır.'],
['TEMEL','Temel imalatından önce hangi işlem yapılır?',['Kapı montajı','Kazı ve zemin hazırlığı','İç cephe boyası'],1,'Temel öncesinde kazı ve projeye uygun zemin hazırlığı yapılır.'],
['TAŞIYICI SİSTEM','Betonarme yapının taşıyıcı elemanları hangileridir?',['Kapı ve pencere','Kolon, kiriş ve döşeme','Parke ve seramik'],1,'Kolon, kiriş ve döşemeler taşıyıcı sistem elemanlarıdır.'],
['DUVAR İMALATI','Duvar örerken hangi kontroller önemlidir?',['Şakül ve doğrultu','Mobilya rengi','Aydınlatma türü'],0,'Duvarın şakül ve doğrultu kontrolü düzgün imalat için önemlidir.'],
['İNCE İŞLER','Hangisi ince işler kapsamındadır?',['Temel kazısı','Zemin kaplama ve boya','Zemin etüdü'],1,'Boya ve zemin kaplamaları ince işler kapsamındadır.']
];
let qIndex=0,qPoints=0;
function siteStart(){qIndex=0;qPoints=0;siteShow();}
function siteShow(){
if(qIndex===site.length){award(qPoints);show(`<div class="panel"><div class="eyebrow">ŞANTİYE TAMAMLANDI</div><h1>🏗️ Harika iş!</h1><p>Şantiyeyi başarıyla yönettin.</p><div class="stat"><span>Kazandığın XP</span><b>+${qPoints}</b></div><button class="primary" id="kgHome">OYUN MERKEZİNE DÖN</button></div>`);el.querySelector('#kgHome').onclick=home;return;}
const q=site[qIndex];
show(`${back}<div class="panel"><div class="scene"><div class="crane"></div><div class="building"></div><div class="ground"></div></div><div class="row" style="margin-top:15px"><div class="stat"><span class="muted">ŞANTİYE AŞAMASI</span><b>${qIndex+1}/5</b></div><div class="stat"><span class="muted">KAZANILAN PUAN</span><b>${qPoints} XP</b></div></div><div class="progress"><i style="width:${qIndex*20}%"></i></div><div class="eyebrow">GÖREV ${qIndex+1}</div><h2>${q[0]}</h2><p>${q[1]}</p>${q[2].map((v,i)=>`<button class="answer" data-i="${i}">${['A','B','C'][i]}　${v}</button>`).join('')}<div id="kgFeedback"></div></div>`);
el.querySelector('#kgBack').onclick=home;
el.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{
const ok=Number(b.dataset.i)===q[3];if(ok)qPoints+=20;
el.querySelectorAll('[data-i]').forEach(x=>x.disabled=true);
el.querySelector('#kgFeedback').innerHTML=`<div class="feedback">${ok?'✓ Doğru karar! +20 XP':'Bu karar doğru değil.'}<p>${q[4]}</p><button class="primary" id="kgNext">SONRAKİ AŞAMA →</button></div>`;
el.querySelector('#kgNext').onclick=()=>{qIndex++;siteShow();};
});
}

const rescue=[
['TAŞIYICI KOLONDA ÇATLAK','Bir kolon üzerinde belirgin çatlak görülüyor.','Üzerini boyamak|Uzman mühendislik incelemesi|Duvar kâğıdı kaplamak',1,'Taşıyıcı elemanlardaki çatlaklar uzman mühendis tarafından değerlendirilmelidir.'],
['ÇATIDA SU SIZINTISI','Yağmur sonrası tavanda su lekeleri oluşuyor.','Su yalıtımını ve çatı detaylarını incelemek|Tavanı boyamak|Pencereyi değiştirmek',0,'Su girişinin kaynağı belirlenmeli ve uygun yalıtım çözümü değerlendirilmelidir.'],
['EĞRİ DUVAR','Yeni örülen duvarın düşey doğrultusu bozuk.','Mobilyayla gizlemek|Şakül ve doğrultu kontrolü|Duvarı boyamak',1,'Duvar imalatında şakül ve doğrultu kontrolü önemlidir.'],
['ISI KAYBI','Binada kışın aşırı ısı kaybı yaşanıyor.','Isı yalıtımını ve ısı köprülerini incelemek|Perde asmak|Lambaları değiştirmek',0,'Isı yalıtımı ve ısı köprüleri birlikte değerlendirilmelidir.'],
['YANLIŞ ÖLÇÜ','Projede 120 cm olan kapı boşluğu sahada 90 cm yapılmış.','Ölçüyü önemsememek|Kapıyı zorlamak|Projeye göre uygulamayı kontrol etmek',2,'Uygulama proje ölçülerine uygun olmalıdır.']
];
let rIndex=0,rPoints=0;
function rescueStart(){rIndex=0;rPoints=0;rescueShow();}
function rescueShow(){
if(rIndex===rescue.length){award(rPoints);show(`<div class="panel"><h1>🛠️ Bina kurtarıldı!</h1><p>${rPoints/20}/5 doğru çözüm.</p><h2>+${rPoints} XP</h2><button class="primary" id="kgHome">OYUN MERKEZİNE DÖN</button></div>`);el.querySelector('#kgHome').onclick=home;return;}
const q=rescue[rIndex];
show(`${back}<div class="panel"><div class="rescueScene"><div class="rescueHouse"></div><div class="crack">⌁</div><div class="mark"></div></div><div class="row" style="margin-top:14px"><div class="stat"><span class="muted">İNCELEME</span><b>${rIndex+1}/5</b></div><div class="stat"><span class="muted">PUAN</span><b>${rPoints} XP</b></div></div><div class="eyebrow" style="margin-top:18px">YAPI İNCELEME RAPORU</div><h2>${q[0]}</h2><p>${q[1]}</p>${q[2].split('|').map((v,i)=>`<button class="answer" data-i="${i}">${['A','B','C'][i]}　${v}</button>`).join('')}<div id="kgFeedback"></div></div>`);
el.querySelector('#kgBack').onclick=home;
el.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{
const ok=Number(b.dataset.i)===q[3];if(ok)rPoints+=20;
el.querySelectorAll('[data-i]').forEach(x=>x.disabled=true);
el.querySelector('#kgFeedback').innerHTML=`<div class="feedback">${ok?'✓ Sorunu doğru tespit ettin! +20 XP':'Yanlış çözüm.'}<p>${q[4]}</p><button class="primary" id="kgNext">SONRAKİ İNCELEME →</button></div>`;
el.querySelector('#kgNext').onclick=()=>{rIndex++;rescueShow();};
});
}

let roomItems=[];
let roomType='Salon',wall='#e6ddce',floor='#9c704e',styleName='Modern';
function designStart(){
roomItems=[{type:'sofa',icon:'🛋️',x:36,y:57},{type:'table',icon:'🪵',x:48,y:77},{type:'plant',icon:'🪴',x:82,y:60}];
roomType='Salon';wall='#e6ddce';floor='#9c704e';styleName='Modern';designShow();
}
function designShow(){
const furniture=[
['sofa','🛋️','Koltuk'],['chair','🪑','Sandalye'],['table','🪵','Sehpa'],['plant','🪴','Bitki'],['bed','🛏️','Yatak'],['lamp','💡','Lambader'],['shelf','📚','Kitaplık'],['rug','🟫','Halı']
];
show(`${back}<div class="panel"><div class="eyebrow">INTERIOR DESIGN STUDIO</div><h2>${roomType} tasarımın</h2><p>Mobilyaları seç, odaya ekle ve parmağınla sürükleyerek yerleştir.</p>
<div class="room" id="kgRoom" style="background:${wall}"><div class="roomWall" style="background:${wall}"></div><div class="roomFloor" style="background:repeating-linear-gradient(90deg,${floor} 0 80px, #ffffff20 80px 83px)"></div><div class="roomWindow"></div><div class="roomLight"></div><div id="kgPlaced"></div></div>
<div class="row" style="margin:12px 0"><div class="stat"><span class="muted">MEKÂN</span><b>${roomType}</b></div><div class="stat"><span class="muted">TARZ</span><b>${styleName}</b></div><div class="stat"><span class="muted">EŞYA</span><b>${roomItems.length}</b></div></div>
<h3>Mobilya kataloğu</h3><div class="catalog">${furniture.map(f=>`<button class="item" data-add="${f[0]}"><span>${f[1]}</span>${f[2]}</button>`).join('')}</div>
<h3 style="margin-top:20px">Duvar rengi</h3><div class="catalog">${[['#e6ddce','Krem'],['#c4d5d9','Mavi'],['#c9b8d1','Lila'],['#c5d0b8','Yeşil'],['#f4f0e8','Beyaz'],['#b8a18e','Vizon']].map(c=>`<button class="item" data-wall="${c[0]}"><span style="background:${c[0]};height:25px;border-radius:6px"></span>${c[1]}</button>`).join('')}</div>
<h3 style="margin-top:20px">Zemin kaplaması</h3><div class="catalog">${[['#9c704e','Ahşap'],['#b9b4a9','Taş'],['#777b80','Gri'],['#d6c9ad','Açık parke']].map(c=>`<button class="item" data-floor="${c[0]}"><span style="background:${c[0]};height:25px;border-radius:6px"></span>${c[1]}</button>`).join('')}</div>
<h3 style="margin-top:20px">Tasarım tarzı</h3><div class="catalog">${['Modern','Minimalist','İskandinav','Endüstriyel'].map(s=>`<button class="item" data-style="${s}"><span>✦</span>${s}</button>`).join('')}</div>
<div class="row" style="margin-top:15px"><button class="secondary" id="kgRoomType">Mekânı değiştir</button><button class="primary" style="flex:1;margin:0" id="kgEvaluate">TASARIMI TAMAMLA ✓</button></div>
<div id="kgFeedback"></div></div>`);
el.querySelector('#kgBack').onclick=home;
const placed=el.querySelector('#kgPlaced');
function drawItems(){
placed.innerHTML=roomItems.map((it,i)=>`<div class="furniture ${it.type}" data-move="${i}" style="left:${it.x}%;top:${it.y}%;${it.type==='chair'||it.type==='plant'?'font-size:48px;background:none;box-shadow:none':''}">${it.icon}<button data-remove="${i}" style="position:absolute;top:-12px;right:-12px;background:#a83446;color:white;border-radius:50%;width:25px;height:25px;padding:0;font-size:12px">×</button></div>`).join('');
placed.querySelectorAll('[data-remove]').forEach(b=>b.onclick=e=>{e.stopPropagation();roomItems.splice(Number(b.dataset.remove),1);drawItems();});
placed.querySelectorAll('[data-move]').forEach(item=>{
let moving=false;
const move=e=>{
if(!moving)return;
const rect=el.querySelector('#kgRoom').getBoundingClientRect();
const p=e.touches?e.touches[0]:e;
const it=roomItems[Number(item.dataset.move)];
it.x=Math.max(0,Math.min(88,(p.clientX-rect.left)/rect.width*100));
it.y=Math.max(5,Math.min(80,(p.clientY-rect.top)/rect.height*100));
item.style.left=it.x+'%';item.style.top=it.y+'%';
};
const stop=()=>{moving=false;};
item.addEventListener('pointerdown',e=>{if(e.target.closest('[data-remove]'))return;moving=true;item.setPointerCapture(e.pointerId);});
item.addEventListener('pointermove',move);
item.addEventListener('pointerup',stop);
item.addEventListener('pointercancel',stop);
});
}
drawItems();
el.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{
const type=b.dataset.add;
const icons={sofa:'🛋️',chair:'🪑',table:'🪵',plant:'🪴',bed:'🛏️',lamp:'💡',shelf:'📚',rug:'🟫'};
roomItems.push({type,icon:icons[type],x:40+Math.random()*15,y:48+Math.random()*20});
drawItems();
});
el.querySelectorAll('[data-wall]').forEach(b=>b.onclick=()=>{wall=b.dataset.wall;el.querySelector('.roomWall').style.background=wall;});
el.querySelectorAll('[data-floor]').forEach(b=>b.onclick=()=>{floor=b.dataset.floor;el.querySelector('.roomFloor').style.background=`repeating-linear-gradient(90deg,${floor} 0 80px,#ffffff20 80px 83px)`;});
el.querySelectorAll('[data-style]').forEach(b=>b.onclick=()=>{styleName=b.dataset.style;});
el.querySelector('#kgRoomType').onclick=()=>{
const types=['Salon','Yatak Odası','Çalışma Odası','Mutfak'];
roomType=types[(types.indexOf(roomType)+1)%types.length];
designShow();
};
el.querySelector('#kgEvaluate').onclick=()=>{
let points=30+Math.min(roomItems.length,8)*8;
if(roomItems.length>=4)points+=15;
if(styleName)points+=10;
award(points);
el.querySelector('#kgFeedback').innerHTML=`<div class="feedback"><div class="eyebrow">TASARIM RAPORU</div><h2>✨ Tasarımın tamamlandı!</h2><p>${roomType} için ${styleName} tarzında kendi yerleşimini oluşturdun. ${roomItems.length} mobilya kullandın.</p><h2>+${points} XP</h2><button class="primary" id="kgAgain">YENİ TASARIM YAP</button><button class="secondary" id="kgHome" style="width:100%;margin-top:8px">OYUN MERKEZİNE DÖN</button></div>`;
el.querySelector('#kgAgain').onclick=designStart;
el.querySelector('#kgHome').onclick=home;
};
}

launch.onclick=()=>{root.style.display='block';home();};
root.querySelector('#kgClose').onclick=()=>root.style.display='none';
home();
console.log('KALECAD Game Studio hazır.');
})();


/* KALECAD ANA MENU TASARIM V1 */
(() => {
'use strict';
if(window.KALECAD_HOME_ATOLYE_V1)return;
window.KALECAD_HOME_ATOLYE_V1=true;

const css=document.createElement('style');
css.textContent=`
#kale-cad-card{
 display:block!important;
 grid-column:1/-1!important;
 width:100%!important;
 margin:18px 0!important;
 padding:0!important;
 border:0!important;
 background:transparent!important;
 box-shadow:none!important;
 cursor:default!important;
 color:inherit!important;
}
#ka-home-panel{
 width:100%;
 overflow:hidden;
 border-radius:20px;
 background:#102844;
 border:1px solid #294966;
 box-shadow:0 12px 30px #06162b20;
 color:white;
 font-family:Arial,sans-serif;
}
#ka-home-panel *{box-sizing:border-box}
#ka-home-panel .ka-head{
 padding:22px 22px 18px;
 background:linear-gradient(120deg,#102844,#174d70);
}
#ka-home-panel .ka-brand{
 font-size:11px;
 font-weight:800;
 letter-spacing:2.5px;
 color:#9dc7e5;
 margin-bottom:16px;
}
#ka-home-panel h2{
 color:white!important;
 font-size:24px;
 line-height:1.2;
 margin:0 0 8px;
}
#ka-home-panel .ka-intro{
 color:#c5d9e9;
 font-size:13px;
 line-height:1.6;
 margin:0;
}
#ka-home-panel .ka-content{
 padding:18px;
 background:#f1f5f9;
}
#ka-home-panel .ka-section-title{
 display:flex;
 justify-content:space-between;
 align-items:center;
 gap:8px;
 margin:0 0 13px;
 color:#183650;
 font-size:14px;
 font-weight:800;
 letter-spacing:.4px;
}
#ka-home-panel .ka-section-title span{
 color:#71869a;
 font-size:10px;
 font-weight:700;
}
#ka-home-panel .ka-grid{
 display:grid;
 grid-template-columns:repeat(2,minmax(0,1fr));
 gap:10px;
}
#ka-home-panel .ka-item{
 min-width:0;
 min-height:112px;
 padding:14px;
 border-radius:13px;
 background:#fff;
 border:1px solid #dce5ed;
 text-align:left;
 color:#183650;
 cursor:pointer;
 display:flex;
 flex-direction:column;
 justify-content:space-between;
 gap:12px;
 transition:transform .15s,border-color .15s;
}
#ka-home-panel .ka-item:active{
 transform:scale(.98);
 border-color:#3988b5;
}
#ka-home-panel .ka-number{
 color:#2682b4;
 font-size:11px;
 font-weight:900;
 letter-spacing:1px;
}
#ka-home-panel .ka-name{
 display:block;
 font-size:14px;
 line-height:1.25;
 font-weight:800;
 color:#183650;
}
#ka-home-panel .ka-desc{
 display:block;
 margin-top:5px;
 font-size:11px;
 line-height:1.4;
 color:#728397;
}
#ka-home-panel .ka-game{
 margin-top:17px;
 width:100%;
 border:0;
 border-radius:13px;
 padding:17px;
 text-align:left;
 background:linear-gradient(110deg,#123454,#17648a);
 color:white;
 cursor:pointer;
}
#ka-home-panel .ka-game strong{
 display:block;
 font-size:17px;
 letter-spacing:.5px;
}
#ka-home-panel .ka-game small{
 display:block;
 color:#d0e3f0;
 margin-top:5px;
 font-size:11px;
}
@media(max-width:380px){
 #ka-home-panel .ka-head{padding:18px}
 #ka-home-panel .ka-content{padding:12px}
 #ka-home-panel .ka-item{padding:11px;min-height:108px}
 #ka-home-panel .ka-name{font-size:12px}
}
`;
document.head.appendChild(css);

const modules=[
 ['01','AutoCAD Akademi','Teknik çizim ve komutlar','auto'],
 ['02','SketchUp Akademi','Üç boyutlu modelleme','sketch'],
 ['03','Mesleki Sözlük','Türkçe ve İngilizce terimler','dictionary'],
 ['04','Kitaplık','Mesleki kaynaklar','library'],
 ['05','Bilgi Yarışması','Bilgini test et','quiz'],
 ['06','Proje Görevleri','Uygulama ve tasarım','tasks'],
 ['07','Çizim Masası','Ekran üzerinde çizim','draw'],
 ['08','Dijital Araçlar','Çevrim içi tasarım araçları','digital']
];

let legacyCard=null;

function openModule(key){
 if(!legacyCard)return;
 legacyCard.click();

 if(key==='dictionary'){
  const atelier=document.getElementById('kcv2');
  const app=document.getElementById('ksApp');
  if(atelier)atelier.style.display='none';
  if(app)app.style.display='block';
  document.body.style.overflow='hidden';
  return;
 }
 if(key==='library'){
  const atelier=document.getElementById('kcv2');
  const app=document.getElementById('kaleKitapOverlay');
  if(atelier)atelier.style.display='none';
  if(app)app.classList.add('open');
  document.body.style.overflow='hidden';
  return;
 }

 const button=document.querySelector('#kcv2 [data-tab="'+key+'"]');
 if(button)button.click();
}

function build(){
 const old=document.getElementById('kale-cad-card');
 if(!old || old.dataset.kaDesigned)return;
 legacyCard=old;
 old.dataset.kaDesigned='1';

 const panel=document.createElement('section');
 panel.id='ka-home-panel';

 panel.innerHTML=`
 <header class="ka-head">
  <div class="ka-brand">KALECAD / LEARNING PLATFORM</div>
  <h2>Dijital Tasarım Atölyesi</h2>
  <p class="ka-intro">Mimarlık, iç mimarlık ve inşaat teknolojileri için öğrenme ve uygulama alanı.</p>
 </header>
 <div class="ka-content">
  <div class="ka-section-title">
   ATÖLYE BÖLÜMLERİ
   <span>08 MODÜL</span>
  </div>
  <div class="ka-grid" id="ka-module-grid"></div>
  <button class="ka-game" id="ka-game-open">
   <strong>OYUN MERKEZİ</strong>
   <small>Mesleki oyunlar ve uygulamalı simülasyonlar</small>
  </button>
 </div>`;

 const grid=panel.querySelector('#ka-module-grid');
 modules.forEach(([number,name,desc,key])=>{
  const button=document.createElement('button');
  button.className='ka-item';
  button.innerHTML=`
   <span class="ka-number">${number}</span>
   <span>
    <strong class="ka-name">${name}</strong>
    <small class="ka-desc">${desc}</small>
   </span>`;
  button.addEventListener('click',()=>openModule(key));
  grid.appendChild(button);
 });

 panel.querySelector('#ka-game-open').addEventListener('click',()=>{
  const game=document.getElementById('kaleGamesBtn');
  if(game)game.click();
 });

 old.replaceWith(panel);
}

function boot(){
 build();
}

if(document.readyState==='loading'){
 document.addEventListener('DOMContentLoaded',boot);
}else{
 boot();
}

const observer=new MutationObserver(boot);
observer.observe(document.documentElement,{childList:true,subtree:true});

})();

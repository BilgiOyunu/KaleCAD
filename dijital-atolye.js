
/* KALECAD DIJITAL ATOLYE V4 */
(() => {
'use strict';
if(window.KALECAD_ATOLYE_V4)return;
window.KALECAD_ATOLYE_V4=true;

const style=document.createElement('style');
style.textContent=`
#ksBtn,#kaleKitapBtn{display:none!important}
#kcv2 .ka-extra-tab{
border:1px solid #345775;
background:#183653;
color:#fff;
padding:11px 14px;
border-radius:10px;
font-weight:700;
cursor:pointer;
white-space:nowrap
}
#kcv2 .ka-extra-tab.active{
background:#087bb4;
border-color:#65c9f4
}`;
document.head.appendChild(style);

function boot(){
const game=document.getElementById('kaleGamesBtn');
if(game&&game.textContent.trim()!=='OYUN MERKEZİ'){
game.textContent='OYUN MERKEZİ';
}

const atelier=document.getElementById('kcv2');
if(!atelier)return;

const nav=atelier.querySelector('.nav');
if(!nav)return;

[
['dictionary','Mesleki Sözlük'],
['library','Kitaplık']
].forEach(([key,label])=>{
if(nav.querySelector('[data-ka-extra="'+key+'"]'))return;
const b=document.createElement('button');
b.className='ka-extra-tab';
b.dataset.kaExtra=key;
b.textContent=label;
b.addEventListener('click',()=>{
atelier.style.display='none';
if(key==='dictionary'){
const app=document.getElementById('ksApp');
if(app)app.style.display='block';
}else{
const app=document.getElementById('kaleKitapOverlay');
if(app)app.classList.add('open');
}
document.body.style.overflow='hidden';
});
nav.appendChild(b);
});
}

function returnToAtelier(){
const dict=document.getElementById('ksApp');
const book=document.getElementById('kaleKitapOverlay');
const atelier=document.getElementById('kcv2');
if(dict)dict.style.display='none';
if(book)book.classList.remove('open');
if(atelier)atelier.style.display='block';
document.body.style.overflow='hidden';
}

document.addEventListener('click',e=>{
if(e.target.closest('#ksClose')||
e.target.closest('#kaleKitapClose')){
setTimeout(returnToAtelier,100);
}
});

document.addEventListener('keydown',e=>{
if(e.key==='Escape'){
const dict=document.getElementById('ksApp');
const book=document.getElementById('kaleKitapOverlay');
if((dict&&dict.style.display==='block')||
(book&&book.classList.contains('open'))){
returnToAtelier();
}
}
});

boot();

const observer=new MutationObserver(boot);
observer.observe(document.documentElement,{
childList:true,
subtree:true
});
})();

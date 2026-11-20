
/* KALECAD DIJITAL ATOLYE MERKEZI V1 */
(() => {
'use strict';

if (window.KALECAD_ATOLYE_MERKEZI_V1) return;
window.KALECAD_ATOLYE_MERKEZI_V1 = true;

const style = document.createElement('style');
style.textContent = `
#ksBtn,#kaleKitapBtn{display:none!important}
#kaleGamesBtn{font-size:13px!important;letter-spacing:.3px}
#kcv2 .nav .ka-extra-tab{
  border:1px solid #345775;
  background:#183653;
  color:#d7e9f8;
  padding:11px 14px;
  border-radius:10px;
  font-weight:700;
  white-space:nowrap;
  cursor:pointer
}
#kcv2 .nav .ka-extra-tab.active{
  background:#087bb4;
  border-color:#65c9f4;
  color:white
}
`;
document.head.appendChild(style);

function cleanButtons(){
  const gameButton=document.getElementById('kaleGamesBtn');
  if(gameButton) gameButton.textContent='OYUN MERKEZİ';

  const dictButton=document.getElementById('ksBtn');
  if(dictButton) dictButton.style.display='none';

  const bookButton=document.getElementById('kaleKitapBtn');
  if(bookButton) bookButton.style.display='none';
}

function restore(tab){
  const atelier=document.getElementById('kcv2');
  if(!atelier) return;

  const dictionary=document.getElementById('ksApp');
  const library=document.getElementById('kaleKitapOverlay');

  if(dictionary) dictionary.style.display='none';
  if(library) library.classList.remove('open');

  atelier.style.display='block';
  document.body.style.overflow='hidden';

  atelier.querySelectorAll('.nav button').forEach(button=>{
    button.classList.toggle(
      'active',
      button.dataset.tab===tab ||
      button.dataset.kaExtra===tab
    );
  });
}

function openExtra(tab){
  const atelier=document.getElementById('kcv2');
  if(!atelier) return;

  atelier.style.display='none';

  if(tab==='dictionary'){
    const app=document.getElementById('ksApp');
    if(!app) return;
    app.style.display='block';
    document.body.style.overflow='hidden';
  }

  if(tab==='library'){
    const app=document.getElementById('kaleKitapOverlay');
    if(!app) return;
    app.classList.add('open');
    document.body.style.overflow='hidden';
  }
}

function addTabs(){
  const atelier=document.getElementById('kcv2');
  if(!atelier) return;

  const nav=atelier.querySelector('.nav');
  if(!nav) return;

  if(!nav.querySelector('[data-ka-extra="dictionary"]')){
    const button=document.createElement('button');
    button.className='ka-extra-tab';
    button.dataset.kaExtra='dictionary';
    button.textContent='Mesleki Sözlük';
    button.addEventListener('click',()=>openExtra('dictionary'));
    nav.appendChild(button);
  }

  if(!nav.querySelector('[data-ka-extra="library"]')){
    const button=document.createElement('button');
    button.className='ka-extra-tab';
    button.dataset.kaExtra='library';
    button.textContent='Kitaplık';
    button.addEventListener('click',()=>openExtra('library'));
    nav.appendChild(button);
  }
}

function connectCloseButtons(){
  const dict=document.getElementById('ksApp');
  const dictClose=document.getElementById('ksClose');

  if(dictClose && !dictClose.dataset.kaConnected){
    dictClose.dataset.kaConnected='1';
    dictClose.addEventListener('click',()=>{
      setTimeout(()=>restore('dictionary'),50);
    });
  }

  if(dict && !dict.dataset.kaConnected){
    dict.dataset.kaConnected='1';
    dict.addEventListener('click',event=>{
      if(event.target===dict){
        setTimeout(()=>restore('dictionary'),50);
      }
    });
  }

  const library=document.getElementById('kaleKitapOverlay');
  const libraryClose=document.getElementById('kaleKitapClose');

  if(libraryClose && !libraryClose.dataset.kaConnected){
    libraryClose.dataset.kaConnected='1';
    libraryClose.addEventListener('click',()=>{
      setTimeout(()=>restore('library'),50);
    });
  }

  if(library && !library.dataset.kaConnected){
    library.dataset.kaConnected='1';
    library.addEventListener('click',event=>{
      if(event.target===library){
        setTimeout(()=>restore('library'),50);
      }
    });
  }
}

function boot(){
  cleanButtons();
  addTabs();
  connectCloseButtons();
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',boot);
}else{
  boot();
}

const observer=new MutationObserver(boot);
observer.observe(document.documentElement,{
  childList:true,
  subtree:true
});

document.addEventListener('keydown',event=>{
  if(event.key!=='Escape') return;

  const dict=document.getElementById('ksApp');
  const library=document.getElementById('kaleKitapOverlay');

  if(dict && dict.style.display==='block'){
    dict.style.display='none';
    restore('dictionary');
  }else if(library && library.classList.contains('open')){
    library.classList.remove('open');
    restore('library');
  }
});

})();

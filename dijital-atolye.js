
/* KALECAD DIJITAL ATOLYE V3 */
(() => {
  'use strict';
  if (window.KALECAD_ATOLYE_V3) return;
  window.KALECAD_ATOLYE_V3 = true;

  const style = document.createElement('style');
  style.textContent = `
    #ksBtn,#kaleKitapBtn{display:none!important}
    #kcv2 .nav .ka-extra-tab{
      border:1px solid #345775;background:#183653;color:#fff;
      padding:11px 14px;border-radius:10px;font-weight:700;
      white-space:nowrap;cursor:pointer
    }
    #kcv2 .nav .ka-extra-tab.active{background:#087bb4}
  `;
  document.head.appendChild(style);

  function boot(){
    const game = document.getElementById('kaleGamesBtn');
    if(game && game.textContent.trim() !== 'OYUN MERKEZİ'){
      game.textContent = 'OYUN MERKEZİ';
    }

    const atelier = document.getElementById('kcv2');
    if(!atelier) return;

    const nav = atelier.querySelector('.nav');
    if(!nav) return;

    [
      ['dictionary','Mesleki Sözlük'],
      ['library','Kitaplık']
    ].forEach(([key,label]) => {
      if(nav.querySelector(`[data-ka-extra="${key}"]`)) return;
      const button = document.createElement('button');
      button.className = 'ka-extra-tab';
      button.dataset.kaExtra = key;
      button.textContent = label;
      button.onclick = () => {
        atelier.style.display = 'none';
        if(key === 'dictionary'){
          const app = document.getElementById('ksApp');
          if(app) app.style.display = 'block';
        }else{
          const app = document.getElementById('kaleKitapOverlay');
          if(app) app.classList.add('open');
        }
      };
      nav.appendChild(button);
    });
  }

  boot();
  const observer = new MutationObserver(boot);
  observer.observe(document.documentElement,{childList:true,subtree:true});

  document.addEventListener('click',event => {
    if(event.target.closest('#ksClose')){
      setTimeout(() => {
        const app = document.getElementById('ksApp');
        const atelier = document.getElementById('kcv2');
        if(app) app.style.display = 'none';
        if(atelier) atelier.style.display = 'block';
      },100);
    }
    if(event.target.closest('#kaleKitapClose')){
      setTimeout(() => {
        const app = document.getElementById('kaleKitapOverlay');
        const atelier = document.getElementById('kcv2');
        if(app) app.classList.remove('open');
        if(atelier) atelier.style.display = 'block';
      },100);
    }
  });
})();

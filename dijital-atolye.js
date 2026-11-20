
/* KALECAD DIJITAL ATOLYE MERKEZI V2 */
(() => {
  'use strict';

  if (window.KALECAD_ATOLYE_MERKEZI_V2) return;
  window.KALECAD_ATOLYE_MERKEZI_V2 = true;

  const style = document.createElement('style');
  style.textContent = `
    #ksBtn,#kaleKitapBtn{display:none!important}
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
    const gameButton = document.getElementById('kaleGamesBtn');
    if(gameButton && gameButton.textContent.trim() !== 'OYUN MERKEZİ'){
      gameButton.textContent = 'OYUN MERKEZİ';
    }
  }

  function restore(tab){
    const atelier = document.getElementById('kcv2');
    if(!atelier) return;

    const dictionary = document.getElementById('ksApp');
    const library = document.getElementById('kaleKitapOverlay');

    if(dictionary) dictionary.style.display = 'none';
    if(library) library.classList.remove('open');

    atelier.style.display = 'block';
    document.body.style.overflow = 'hidden';

    atelier.querySelectorAll('.nav button').forEach(button => {
      button.classList.toggle(
        'active',
        button.dataset.tab === tab || button.dataset.kaExtra === tab
      );
    });
  }

  function openExtra(tab){
    const atelier = document.getElementById('kcv2');
    if(!atelier) return;

    atelier.style.display = 'none';

    if(tab === 'dictionary'){
      const app = document.getElementById('ksApp');
      if(!app){
        atelier.style.display = 'block';
        return;
      }
      app.style.display = 'block';
    }

    if(tab === 'library'){
      const app = document.getElementById('kaleKitapOverlay');
      if(!app){
        atelier.style.display = 'block';
        return;
      }
      app.classList.add('open');
    }

    document.body.style.overflow = 'hidden';
  }

  function addTabs(){
    const atelier = document.getElementById('kcv2');
    if(!atelier) return;

    const nav = atelier.querySelector('.nav');
    if(!nav) return;

    const tabs = [
      ['dictionary','Mesleki Sözlük'],
      ['library','Kitaplık']
    ];

    tabs.forEach(([key,label]) => {
      if(nav.querySelector(`[data-ka-extra="${key}"]`)) return;

      const button = document.createElement('button');
      button.className = 'ka-extra-tab';
      button.dataset.kaExtra = key;
      button.textContent = label;
      button.addEventListener('click', () => openExtra(key));
      nav.appendChild(button);
    });
  }

  function connectCloseButtons(){
    const dict = document.getElementById('ksApp');
    const dictClose = document.getElementById('ksClose');

    if(dictClose && !dictClose.dataset.kaConnected){
      dictClose.dataset.kaConnected = '1';
      dictClose.addEventListener('click', () => {
        setTimeout(() => restore('dictionary'), 50);
      });
    }

    if(dict && !dict.dataset.kaConnected){
      dict.dataset.kaConnected = '1';
      dict.addEventListener('click', event => {
        if(event.target === dict){
          setTimeout(() => restore('dictionary'), 50);
        }
      });
    }

    const library = document.getElementById('kaleKitapOverlay');
    const libraryClose = document.getElementById('kaleKitapClose');

    if(libraryClose && !libraryClose.dataset.kaConnected){
      libraryClose.dataset.kaConnected = '1';
      libraryClose.addEventListener('click', () => {
        setTimeout(() => restore('library'), 50);
      });
    }

    if(library && !library.dataset.kaConnected){
      library.dataset.kaConnected = '1';
      library.addEventListener('click', event => {
        if(event.target === library){
          setTimeout(() => restore('library'), 50);
        }
      });
    }
  }

  function boot(){
    cleanButtons();
    addTabs();
    connectCloseButtons();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  }else{
    boot();
  }

  const observer = new MutationObserver(() => {
    boot();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  document.addEventListener('keydown', event => {
    if(event.key !== 'Escape') return;

    const dict = document.getElementById('ksApp');
    const library = document.getElementById('kaleKitapOverlay');

    if(dict && dict.style.display === 'block'){
      dict.style.display = 'none';
      restore('dictionary');
    }else if(library && library.classList.contains('open')){
      library.classList.remove('open');
      restore('library');
    }
  });
})();

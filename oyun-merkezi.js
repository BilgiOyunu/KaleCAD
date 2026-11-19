
/* KALECAD OYUN MERKEZI V5 */
(() => {
  'use strict';

  if (window.KALECAD_GAME_V5) return;
  window.KALECAD_GAME_V5 = true;

  const old = document.getElementById('kaleGames');
  const oldBtn = document.getElementById('kaleGamesBtn');
  const oldStyle = document.getElementById('kaleGamesStyle');
  if (old) old.remove();
  if (oldBtn) oldBtn.remove();
  if (oldStyle) oldStyle.remove();

  const siteQuestions = [
    {
      title:'ARAZİ HAZIRLIĞI',
      question:'İnşaata başlamadan önce hangi çalışma yapılır?',
      answers:['Zemin etüdü ve aplikasyon','Duvar boyası','Çatı kaplaması'],
      correct:0,
      info:'İnşaat öncesinde zemin özellikleri incelenir ve aplikasyon yapılır.',
      visual:'🗺️',
      scene:'📐 🏞️ 🚜',
      caption:'ARAZİ VE ZEMİN ETÜDÜ'
    },
    {
      title:'TEMEL KAZISI',
      question:'Temel imalatından önce hangi işlem yapılır?',
      answers:['Kapı montajı','Projeye uygun kazı','İç cephe boyası'],
      correct:1,
      info:'Temel imalatından önce projeye uygun kazı ve zemin hazırlığı yapılır.',
      visual:'🚜',
      scene:'🚜 ⛏️ 🪨',
      caption:'TEMEL KAZISI'
    },
    {
      title:'BETONARME',
      question:'Betonarme taşıyıcı sistemin elemanları hangileridir?',
      answers:['Kapı ve pencere','Kolon, kiriş ve döşeme','Parke ve seramik'],
      correct:1,
      info:'Kolon, kiriş ve döşeme betonarme taşıyıcı sistemin temel elemanlarıdır.',
      visual:'🏗️',
      scene:'🏗️ 🧱 🏢',
      caption:'BETONARME TAŞIYICI SİSTEM'
    },
    {
      title:'DUVAR İMALATI',
      question:'Duvar örümünde düzgünlük için hangi kontrol yapılır?',
      answers:['Şakül ve doğrultu','Mobilya rengi','Aydınlatma türü'],
      correct:0,
      info:'Duvarın düşey ve yatay düzgünlüğü şakül ve doğrultu kontrolüyle sağlanır.',
      visual:'🧱',
      scene:'🧱 📏 📐',
      caption:'DUVAR ÖRÜMÜ VE ÖLÇÜ KONTROLÜ'
    },
    {
      title:'İNCE İŞLER',
      question:'Hangisi ince işler kapsamındadır?',
      answers:['Temel kazısı','Zemin kaplama ve boya','Zemin etüdü'],
      correct:1,
      info:'Boya, sıva ve zemin kaplamaları ince işler kapsamındadır.',
      visual:'🪣',
      scene:'🪣 🖌️ 🧱',
      caption:'BOYA VE ZEMİN KAPLAMASI'
    },
    {
      title:'İSKELE',
      question:'Yüksekte çalışmada öncelikli konu nedir?',
      answers:['Güvenli çalışma ve korkuluk','Hızlı çalışmak','Malzemeleri gelişigüzel bırakmak'],
      correct:0,
      info:'İskele güvenliği, korkuluklar ve uygun kişisel koruyucu donanımlar önemlidir.',
      visual:'🦺',
      scene:'🏗️ 🦺 🪜',
      caption:'İŞ GÜVENLİĞİ VE İSKELE'
    }
  ];

  const rescueQuestions = [
    {
      title:'ÇATLAK KOLON',
      question:'Bir binanın taşıyıcı kolonunda çatlak görülüyor. Ne yapılmalıdır?',
      answers:['Üzerini boyamak','Uzman mühendislik incelemesi yaptırmak','Duvar kâğıdı kaplamak'],
      correct:1,
      info:'Taşıyıcı elemanlardaki çatlaklar uzman mühendis tarafından değerlendirilmelidir.',
      visual:'🏢',
      scene:'🏢 ⚡ 🧱',
      caption:'TAŞIYICI KOLONDA ÇATLAK'
    },
    {
      title:'TEMEL PROBLEMİ',
      question:'Binada temel kaynaklı oturma şüphesi varsa ne yapılmalıdır?',
      answers:['Sadece duvarı boyamak','Rastgele dolgu yapmak','Uzman incelemesi ve zemin değerlendirmesi'],
      correct:2,
      info:'Temel ve zemin kaynaklı sorunlar uzmanlar tarafından incelenmelidir.',
      visual:'🏚️',
      scene:'🏚️ ⬇️ 🪨',
      caption:'TEMEL VE ZEMİN OTURMASI'
    },
    {
      title:'KİRİŞ HASARI',
      question:'Betonarme kirişte ciddi hasar fark edildiğinde ne yapılmalıdır?',
      answers:['Alanı güvenli hale getirip uzman çağırmak','Hasarı gizlemek','Üzerine dekoratif kaplama yapmak'],
      correct:0,
      info:'Kiriş taşıyıcı bir elemandır. Hasar uzmanlarca değerlendirilmelidir.',
      visual:'🏗️',
      scene:'🏢 ⚠️ 🧱',
      caption:'BETONARME KİRİŞ HASARI'
    },
    {
      title:'ÇATI SIZINTISI',
      question:'Yağmurdan sonra tavanda su lekesi oluşuyor. İlk olarak ne incelenmelidir?',
      answers:['Mobilyalar','Çatı ve su yalıtımı','Kapı kolu'],
      correct:1,
      info:'Su girişinin kaynağı belirlenmeli, çatı ve yalıtım detayları kontrol edilmelidir.',
      visual:'🏠',
      scene:'🏠 🌧️ 💧',
      caption:'ÇATI VE SU YALITIMI'
    },
    {
      title:'ISI YALITIMI',
      question:'Binada aşırı ısı kaybını azaltmak için ne yapılmalıdır?',
      answers:['Pencereyi sürekli açık bırakmak','Duvarları koyu renge boyamak','Isı yalıtımını değerlendirmek'],
      correct:2,
      info:'Isı yalıtımı ve ısı köprüleri birlikte değerlendirilmelidir.',
      visual:'🌡️',
      scene:'🏠 ❄️ 🔥',
      caption:'BİNA ISI YALITIMI'
    },
    {
      title:'DUVAR ÇATLAĞI',
      question:'Duvar üzerinde yeni oluşan geniş bir çatlak fark edilirse ne yapılmalıdır?',
      answers:['Çatlağın nedeni uzman tarafından incelenmeli','Hemen üzeri kapatılmalı','Mobilyayla gizlenmeli'],
      correct:0,
      info:'Çatlağın nedeni ve yapısal öneminin uzman tarafından değerlendirilmesi gerekir.',
      visual:'🧱',
      scene:'🧱 ⚡ 📏',
      caption:'DUVAR ÇATLAĞI'
    }
  ];

  const furniture = [
    ['sofa','🛋️','Koltuk'],
    ['single','🪑','Tekli koltuk'],
    ['dining','🪑','Yemek sandalyesi'],
    ['table','🪵','Yemek masası'],
    ['bed','🛏️','Yatak'],
    ['wardrobe','🚪','Gardırop'],
    ['desk','⬛️','Çalışma masası'],
    ['chair','🪑','Çalışma koltuğu'],
    ['tv','📺','Televizyon'],
    ['plant','🪴','Bitki'],
    ['lamp','💡','Lambader'],
    ['rug','🟫','Halı'],
    ['bookcase','📚','Kitaplık'],
    ['fridge','🧊','Buzdolabı'],
    ['stove','🍳','Ocak'],
    ['sink','🪣','Evye'],
    ['shower','🛁','Duş'],
    ['toilet','🚽','Klozet'],
    ['mirror','🪞','Ayna']
  ];

  const style = document.createElement('style');
  style.id = 'kaleGamesStyle';
  style.textContent = `
  #kaleGamesBtn{
    position:fixed;right:15px;bottom:18px;z-index:99990;
    border:0;border-radius:50px;padding:14px 19px;
    color:white;background:linear-gradient(135deg,#ff8a00,#ed3c65);
    font-size:14px;font-weight:900;box-shadow:0 8px 25px #0005;
    cursor:pointer
  }
  #kaleGames{
    position:fixed;inset:0;z-index:99999;background:#071326;
    color:#f7f9ff;font-family:Arial,sans-serif;display:none;
    overflow:auto
  }
  #kaleGames *{box-sizing:border-box}
  .kg-wrap{max-width:1100px;margin:auto;padding:18px}
  .kg-top{display:flex;align-items:center;justify-content:space-between;gap:12px}
  .kg-logo{font-size:23px;font-weight:1000;letter-spacing:1px}
  .kg-close{background:#263b5c;color:white;border:0;border-radius:12px;padding:11px 15px;font-size:18px}
  .kg-intro{padding:28px 0 18px}
  .kg-intro h1{font-size:clamp(27px,5vw,43px);margin:0 0 8px}
  .kg-intro p{color:#9fb1ca;line-height:1.5}
  .kg-games{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}
  .kg-card{border:1px solid #34496a;background:linear-gradient(145deg,#172b49,#102039);border-radius:22px;padding:19px;cursor:pointer;min-height:205px;transition:.2s}
  .kg-card:active{transform:scale(.98)}
  .kg-card .emoji{font-size:47px;margin-bottom:15px}
  .kg-card h2{font-size:19px;margin:0 0 8px}
  .kg-card p{color:#a9bad0;font-size:13px;line-height:1.5}
  .kg-tag{display:inline-block;background:#263e60;padding:6px 9px;border-radius:20px;font-size:11px;color:#c8d8f0}
  .kg-panel{margin-top:18px;background:#10213a;border:1px solid #304766;border-radius:20px;padding:18px}
  .kg-back{border:0;border-radius:10px;background:#263e60;color:white;padding:10px 14px;margin-bottom:15px}
  .kg-scene{position:relative;min-height:185px;border-radius:17px;overflow:hidden;background:linear-gradient(180deg,#b9ddf3 0%,#d7e8ed 62%,#7b9b70 62%,#55774c 100%);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:9px;color:#172b49}
  .kg-scene-art{font-size:clamp(45px,10vw,78px);letter-spacing:5px;filter:drop-shadow(0 5px 3px #0002)}
  .kg-scene-caption{background:#ffffffd9;border-radius:30px;padding:7px 13px;font-size:11px;font-weight:900;letter-spacing:1px}
  .kg-question-title{font-size:12px;color:#ffb24d;font-weight:900;letter-spacing:1.4px;margin:17px 0 8px}
  .kg-question{font-size:clamp(19px,4vw,25px);line-height:1.35;font-weight:900;margin:0 0 17px}
  .kg-answers{display:grid;gap:10px}
  .kg-answer{width:100%;padding:15px;text-align:left;background:#1c3353;color:white;border:1px solid #3a5274;border-radius:13px;font-size:14px;font-weight:700}
  .kg-answer:disabled{opacity:1}
  .kg-answer.good{background:#155c45;border-color:#38d69a}
  .kg-answer.bad{background:#702f3b;border-color:#ff7585}
  .kg-feedback{padding:13px;border-radius:12px;margin-top:13px;line-height:1.5;font-size:14px}
  .kg-next{display:block;margin:15px 0 0 auto;background:#ff9d29;color:#15233b;border:0;border-radius:12px;padding:13px 20px;font-weight:900}
  .kg-progress{height:7px;background:#263c5c;border-radius:10px;overflow:hidden;margin:15px 0}
  .kg-progress span{display:block;height:100%;background:#ff9d29;transition:.2s}
  .kg-score{color:#a9bad0;font-size:13px}
  .kg-room-layout{display:grid;grid-template-columns:1fr 260px;gap:14px}
  .kg-room-area{background:#d7c5a9;border-radius:16px;padding:12px;min-width:0}
  .kg-room{
    position:relative;width:100%;height:430px;overflow:hidden;
    border:9px solid #8a654b;border-radius:5px;
    background-color:#e9dfcc;
    background-image:linear-gradient(#b9aa9540 1px,transparent 1px),linear-gradient(90deg,#b9aa9540 1px,transparent 1px);
    background-size:25px 25px;touch-action:none
  }
  .kg-room:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent 49%,#ffffff55 50%,transparent 51%);pointer-events:none}
  .kg-object{position:absolute;display:flex;align-items:center;justify-content:center;
    font-size:38px;width:65px;height:65px;user-select:none;touch-action:none;
    cursor:grab;transform-origin:center;filter:drop-shadow(0 3px 2px #0003)}
  .kg-object.selected{outline:2px dashed #ff8b00;outline-offset:3px;border-radius:10px}
  .kg-tools{background:#172c49;border-radius:16px;padding:14px}
  .kg-tools h3{font-size:15px;margin:0 0 12px}
  .kg-furniture{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}
  .kg-furn{border:1px solid #3c5270;background:#233b5b;color:white;border-radius:10px;padding:9px 3px;font-size:11px;min-height:68px}
  .kg-furn b{display:block;font-size:24px;margin-bottom:4px}
  .kg-control{width:100%;margin:5px 0 11px;accent-color:#ff9d29}
  .kg-tools label{font-size:12px;color:#b9c9dc}
  .kg-action{border:0;background:#304a6d;color:white;border-radius:9px;padding:10px;margin:3px 2px;font-weight:700}
  .kg-action.primary{background:#ff9d29;color:#182942}
  .kg-room-select{width:100%;padding:10px;border-radius:9px;background:#263e60;color:white;border:1px solid #536985;margin-bottom:10px}
  .kg-hint{font-size:12px;color:#a9bad0;line-height:1.5}
  .kg-finish{width:100%;border:0;border-radius:11px;padding:12px;background:#168d68;color:white;font-weight:900;margin-top:10px}
  .kg-result{text-align:center;padding:30px 10px}
  .kg-result .big{font-size:65px}
  .kg-result h2{font-size:26px}
  @media(max-width:700px){
    .kg-games{grid-template-columns:1fr}
    .kg-card{min-height:145px;display:grid;grid-template-columns:65px 1fr;column-gap:13px;align-items:center}
    .kg-card .emoji{grid-row:span 2;font-size:43px;margin:0}
    .kg-card h2{align-self:end}
    .kg-card p{margin:4px 0}
    .kg-room-layout{grid-template-columns:1fr}
    .kg-room{height:360px}
    .kg-furniture{grid-template-columns:repeat(5,1fr)}
    .kg-furn{font-size:9px}
    .kg-tools{padding:11px}
    .kg-wrap{padding:12px}
  }
  `;
  document.head.appendChild(style);

  const btn = document.createElement('button');
  btn.id = 'kaleGamesBtn';
  btn.textContent = '🎮 OYUN MERKEZİ';
  document.body.appendChild(btn);

  const app = document.createElement('div');
  app.id = 'kaleGames';
  app.innerHTML = `
    <div class="kg-wrap">
      <div class="kg-top">
        <div class="kg-logo">🎮 KALECAD OYUN MERKEZİ</div>
        <button class="kg-close" id="kgClose">✕</button>
      </div>
      <div id="kgHome">
        <div class="kg-intro">
          <h1>Mesleğini oyunla keşfet.</h1>
          <p>İnşaat, yapı ve iç mekân tasarımı becerilerini geliştir.</p>
        </div>
        <div class="kg-games">
          <div class="kg-card" data-game="site">
            <div class="emoji">🏗️</div>
            <h2>Şantiye Simülatörü</h2>
            <p>Şantiyedeki uygulamaları ve yapı aşamalarını keşfet.</p>
            <span class="kg-tag">İNŞAAT TEKNOLOJİLERİ</span>
          </div>
          <div class="kg-card" data-game="rescue">
            <div class="emoji">🏚️</div>
            <h2>Binayı Kurtar</h2>
            <p>Yapı sorunlarını tanı, doğru müdahale yaklaşımını seç.</p>
            <span class="kg-tag">YAPI BİLGİSİ</span>
          </div>
          <div class="kg-card" data-game="design">
            <div class="emoji">🛋️</div>
            <h2>İç Mekân Tasarla</h2>
            <p>Mobilyaları yerleştir, döndür, boyutlandır ve odanı tasarla.</p>
            <span class="kg-tag">İÇ MİMARLIK</span>
          </div>
        </div>
      </div>
      <div id="kgGameArea"></div>
    </div>`;
  document.body.appendChild(app);

  const $ = id => document.getElementById(id);
  const home = $('kgHome');
  const area = $('kgGameArea');

  btn.addEventListener('click', () => app.style.display = 'block');
  $('kgClose').addEventListener('click', () => app.style.display = 'none');
  app.addEventListener('click', e => {
    if (e.target === app) app.style.display = 'none';
  });

  document.querySelectorAll('.kg-card').forEach(card => {
    card.addEventListener('click', () => {
      const game = card.dataset.game;
      home.style.display = 'none';
      if (game === 'design') startDesign();
      else startQuiz(game);
    });
  });

  function backButton() {
    return '<button class="kg-back" id="kgBack">← Oyun merkezine dön</button>';
  }

  function bindBack() {
    const back = $('kgBack');
    if (back) back.onclick = () => {
      area.innerHTML = '';
      home.style.display = 'block';
    };
  }

  function startQuiz(type) {
    const data = type === 'site' ? siteQuestions : rescueQuestions;
    const name = type === 'site' ? 'ŞANTİYE SİMÜLATÖRÜ' : 'BİNAYI KURTAR';
    let index = 0;
    let score = 0;
    let answered = false;

    function render() {
      if (index >= data.length) {
        area.innerHTML = `
          <div class="kg-panel kg-result">
            <div class="big">${score >= 4 ? '🏆' : '🎓'}</div>
            <h2>Görev tamamlandı!</h2>
            <p>${data.length} soruda ${score} doğru cevap verdin.</p>
            <p class="kg-score">Başarı oranı: %${Math.round(score / data.length * 100)}</p>
            <button class="kg-next" id="kgAgain">Yeniden oyna</button>
            ${backButton()}
          </div>`;
        $('kgAgain').onclick = () => { index = 0; score = 0; render(); };
        bindBack();
        return;
      }

      answered = false;
      const q = data[index];
      area.innerHTML = `
        <div class="kg-panel">
          ${backButton()}
          <div class="kg-score">${name} · Soru ${index + 1}/${data.length} · Puan: ${score}</div>
          <div class="kg-progress"><span style="width:${index / data.length * 100}%"></span></div>
          <div class="kg-scene">
            <div class="kg-scene-art">${q.scene}</div>
            <div class="kg-scene-caption">${q.caption}</div>
          </div>
          <div class="kg-question-title">${q.title}</div>
          <h2 class="kg-question">${q.question}</h2>
          <div class="kg-answers">
            ${q.answers.map((a,i) => `<button class="kg-answer" data-answer="${i}">${String.fromCharCode(65+i)} · ${a}</button>`).join('')}
          </div>
          <div id="kgFeedback"></div>
          <button class="kg-next" id="kgNext" style="display:none">Sonraki soru →</button>
        </div>`;
      bindBack();

      area.querySelectorAll('[data-answer]').forEach(button => {
        button.onclick = () => {
          if (answered) return;
          answered = true;
          const choice = Number(button.dataset.answer);
          if (choice === q.correct) score++;

          area.querySelectorAll('[data-answer]').forEach(b => {
            b.disabled = true;
            const n = Number(b.dataset.answer);
            if (n === q.correct) b.classList.add('good');
            else if (n === choice) b.classList.add('bad');
          });

          $('kgFeedback').innerHTML = `
            <div class="kg-feedback" style="background:${choice === q.correct ? '#155c45' : '#702f3b'}">
              <b>${choice === q.correct ? '✓ Doğru cevap!' : '✕ Bu cevap doğru değil.'}</b><br>${q.info}
            </div>`;
          $('kgNext').style.display = 'block';
        };
      });

      $('kgNext').onclick = () => { index++; render(); };
    }
    render();
  }

  function startDesign() {
    let objects = [];
    let selected = -1;
    let moving = null;
    let roomColor = '#e9dfcc';
    let roomType = 'Salon';

    area.innerHTML = `
      <div class="kg-panel">
        ${backButton()}
        <h2 style="margin:0 0 6px">🛋️ İç Mekân Tasarla</h2>
        <p class="kg-hint">Mobilyaları seç, odaya ekle ve parmağınla sürükleyerek yerleştir.</p>
        <div class="kg-room-layout">
          <div class="kg-room-area">
            <div class="kg-room" id="kgRoom"></div>
            <p class="kg-hint">Mobilyayı seçmek için dokun. Sürükleyerek yerini değiştir.</p>
          </div>
          <div class="kg-tools">
            <h3>ODA AYARLARI</h3>
            <select class="kg-room-select" id="kgRoomType">
              <option>Salon</option><option>Yatak Odası</option>
              <option>Mutfak</option><option>Çalışma Odası</option>
              <option>Banyo</option>
            </select>
            <label>Zemin rengi</label>
            <input class="kg-control" type="color" id="kgColor" value="${roomColor}">
            <h3 style="margin-top:12px">MOBİLYALAR</h3>
            <div class="kg-furniture" id="kgFurniture">
              ${furniture.map(f => `<button class="kg-furn" data-furn="${f[0]}"><b>${f[1]}</b>${f[2]}</button>`).join('')}
            </div>
            <div id="kgSelectedTools" style="display:none;margin-top:17px">
              <h3>SEÇİLİ MOBİLYA</h3>
              <label>Boyut</label>
              <input class="kg-control" id="kgSize" type="range" min="25" max="115" value="65">
              <label>Döndür</label>
              <input class="kg-control" id="kgRotate" type="range" min="0" max="345" step="15" value="0">
              <button class="kg-action" id="kgTurn">↻ 15° döndür</button>
              <button class="kg-action" id="kgDelete">🗑️ Sil</button>
              <button class="kg-action" id="kgFront">⬆ Öne getir</button>
            </div>
            <p class="kg-hint" id="kgHint">Önce listeden bir mobilya seç.</p>
            <button class="kg-finish" id="kgFinish">✓ Tasarımı tamamla</button>
          </div>
        </div>
      </div>`;
    bindBack();

    const room = $('kgRoom');
    const tools = $('kgSelectedTools');

    function draw() {
      room.innerHTML = '';
      room.style.backgroundColor = roomColor;
      objects.forEach((obj,i) => {
        const node = document.createElement('div');
        node.className = 'kg-object' + (i === selected ? ' selected' : '');
        node.textContent = obj.emoji;
        node.style.left = obj.x + '%';
        node.style.top = obj.y + '%';
        node.style.width = obj.size + 'px';
        node.style.height = obj.size + 'px';
        node.style.fontSize = Math.round(obj.size * .66) + 'px';
        node.style.transform = `rotate(${obj.rotation}deg)`;
        node.style.zIndex = obj.z;
        node.addEventListener('pointerdown', e => {
          e.preventDefault();
          e.stopPropagation();
          selected = i;
          moving = {id:i, startX:e.clientX, startY:e.clientY, x:obj.x, y:obj.y};
          updateSelection();
          node.setPointerCapture(e.pointerId);
        });
        node.addEventListener('pointermove', e => {
          if (!moving || moving.id !== i) return;
          const rect = room.getBoundingClientRect();
          obj.x = Math.max(0,Math.min(100 - obj.size / rect.width * 100, moving.x + (e.clientX - moving.startX) / rect.width * 100));
          obj.y = Math.max(0,Math.min(100 - obj.size / rect.height * 100, moving.y + (e.clientY - moving.startY) / rect.height * 100));
          node.style.left = obj.x + '%';
          node.style.top = obj.y + '%';
        });
        node.addEventListener('pointerup', () => { moving = null; });
        node.addEventListener('pointercancel', () => { moving = null; });
        room.appendChild(node);
      });
      updateSelection();
    }

    function updateSelection() {
      room.querySelectorAll('.kg-object').forEach((node,i) => {
        node.classList.toggle('selected',i === selected);
      });
      tools.style.display = selected >= 0 ? 'block' : 'none';
      if (selected >= 0 && objects[selected]) {
        $('kgSize').value = objects[selected].size;
        $('kgRotate').value = objects[selected].rotation;
        $('kgHint').textContent = objects[selected].name + ' seçildi.';
      } else {
        $('kgHint').textContent = 'Önce listeden bir mobilya seç.';
      }
    }

    $('kgFurniture').querySelectorAll('[data-furn]').forEach(button => {
      button.onclick = () => {
        const f = furniture.find(item => item[0] === button.dataset.furn);
        if (!f) return;
        objects.push({
          type:f[0],emoji:f[1],name:f[2],
          x:35 + Math.random()*20,y:35 + Math.random()*20,
          size:65,rotation:0,z:objects.length+1
        });
        selected = objects.length - 1;
        draw();
      };
    });

    $('kgSize').oninput = e => {
      if (selected < 0) return;
      objects[selected].size = Number(e.target.value);
      draw();
    };

    $('kgRotate').oninput = e => {
      if (selected < 0) return;
      objects[selected].rotation = Number(e.target.value);
      draw();
    };

    $('kgTurn').onclick = () => {
      if (selected < 0) return;
      objects[selected].rotation = (objects[selected].rotation + 15) % 360;
      draw();
    };

    $('kgDelete').onclick = () => {
      if (selected < 0) return;
      objects.splice(selected,1);
      selected = -1;
      draw();
    };

    $('kgFront').onclick = () => {
      if (selected < 0) return;
      objects[selected].z = Math.max(0,...objects.map(o => o.z)) + 1;
      draw();
    };

    $('kgColor').oninput = e => {
      roomColor = e.target.value;
      room.style.backgroundColor = roomColor;
    };

    $('kgRoomType').onchange = e => {
      roomType = e.target.value;
      $('kgHint').textContent = roomType + ' tasarımı yapıyorsun.';
    };

    room.addEventListener('pointerdown', e => {
      if (e.target === room) {
        selected = -1;
        updateSelection();
      }
    });

    $('kgFinish').onclick = () => {
      area.innerHTML = `
        <div class="kg-panel kg-result">
          <div class="big">🎨</div>
          <h2>Tasarımın hazır!</h2>
          <p>${roomType} tasarımında ${objects.length} mobilya kullandın.</p>
          <p class="kg-score">Kendi mekânını oluşturdun.</p>
          <button class="kg-next" id="kgContinue">Tasarıma devam et</button>
          ${backButton()}
        </div>`;
      $('kgContinue').onclick = startDesign;
      bindBack();
    };

    draw();
  }

})();

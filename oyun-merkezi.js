
/* KALECAD - OYUN MERKEZI */
(() => {
  'use strict';

  if (window.KALECAD_OYUN_MERKEZI) return;
  window.KALECAD_OYUN_MERKEZI = true;

  const style = document.createElement('style');
  style.textContent = `
    #kaleGamesBtn {
      position:fixed; right:16px; bottom:18px; z-index:99990;
      border:0; border-radius:16px; padding:14px 19px;
      color:white; background:linear-gradient(135deg,#ed6b28,#e83e69);
      font-weight:900; font-size:14px; box-shadow:0 8px 25px #0005;
      cursor:pointer;
    }
    #kaleGames {
      position:fixed; inset:0; z-index:999999; background:#071329;
      color:#fff; overflow:auto; display:none;
      font-family:Arial,sans-serif;
    }
    #kaleGames * {box-sizing:border-box}
    #kaleGames .kg-wrap {max-width:900px;margin:auto;padding:18px}
    #kaleGames .kg-top {
      display:flex;justify-content:space-between;align-items:center;
      gap:12px;margin-bottom:20px
    }
    #kaleGames h1 {font-size:25px;margin:8px 0}
    #kaleGames h2 {font-size:22px;margin:10px 0}
    #kaleGames p {color:#c3cee0;line-height:1.5}
    #kaleGames .kg-card {
      background:#112344;border:1px solid #294268;
      border-radius:18px;padding:18px;margin:12px 0
    }
    #kaleGames .kg-grid {
      display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px
    }
    #kaleGames button {
      cursor:pointer;border:0;border-radius:12px;padding:13px;
      font-weight:800;font-size:14px
    }
    #kaleGames .kg-main {
      width:100%;background:#f07835;color:white;margin-top:8px
    }
    #kaleGames .kg-option {
      width:100%;background:#20395e;color:white;
      border:1px solid #3d5d88;margin:5px 0;text-align:left
    }
    #kaleGames .kg-option:active {background:#e66b32}
    #kaleGames .kg-back {
      background:#253b5e;color:white;padding:10px 14px
    }
    #kaleGames .kg-close {
      background:#a83248;color:white;padding:10px 14px
    }
    #kaleGames .kg-stat {
      display:flex;justify-content:space-between;gap:8px;
      background:#0b1b35;padding:12px;border-radius:12px;margin:10px 0
    }
    #kaleGames .kg-room {
      min-height:220px;border-radius:15px;position:relative;
      overflow:hidden;border:8px solid #b9a17c;
      background:linear-gradient(90deg,#d8c7ae 0 50%,#c6b398 50%);
      transition:.2s
    }
    #kaleGames .kg-floor {
      position:absolute;bottom:0;left:0;width:100%;height:30%;
      background:#9b704c;border-top:7px solid #76563d
    }
    #kaleGames .kg-window {
      position:absolute;top:22px;left:18px;width:75px;height:65px;
      background:#9dd8ed;border:7px solid #fff
    }
    #kaleGames .kg-sofa {
      position:absolute;bottom:30%;left:25%;width:48%;height:45px;
      background:#477b9d;border-radius:12px 12px 5px 5px;
      box-shadow:0 15px 0 #31556e
    }
    #kaleGames .kg-table {
      position:absolute;bottom:18%;left:40%;width:25%;height:22px;
      background:#79543b;border-radius:50%
    }
    #kaleGames .kg-lamp {
      position:absolute;top:25px;right:35px;width:12px;height:75px;
      background:#4c4c4c
    }
    #kaleGames .kg-lamp:before {
      content:"";position:absolute;top:-8px;left:-14px;
      width:40px;height:25px;background:#f4d36c;border-radius:50%
    }
    #kaleGames .kg-result {
      padding:14px;background:#153d38;border-radius:12px;
      color:#a9f5d7;margin-top:12px
    }
    #kaleGames select {
      width:100%;padding:12px;border-radius:10px;
      background:#20395e;color:white;border:1px solid #45648c;
      margin:5px 0 12px
    }
    @media(max-width:600px) {
      #kaleGames .kg-wrap{padding:13px}
      #kaleGames .kg-grid{grid-template-columns:1fr}
      #kaleGames h1{font-size:22px}
      #kaleGames .kg-card{padding:14px}
    }
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.id = 'kaleGames';
  root.innerHTML = `
    <div class="kg-wrap">
      <div class="kg-top">
        <div>
          <div style="color:#f58b45;font-weight:900;letter-spacing:2px">KALECAD</div>
          <h1>OYUN MERKEZİ</h1>
        </div>
        <button class="kg-close" id="kgClose">✕ Kapat</button>
      </div>
      <div id="kgContent"></div>
    </div>`;
  document.body.appendChild(root);

  const btn = document.createElement('button');
  btn.id = 'kaleGamesBtn';
  btn.textContent = '🎮 OYUN MERKEZİ';
  document.body.appendChild(btn);

  const content = root.querySelector('#kgContent');
  let score = 0;
  let step = 0;
  let faults = [];
  let design = {};

  function open() {
    root.style.display = 'block';
    home();
  }
  function close() {
    root.style.display = 'none';
  }
  btn.addEventListener('click', open);
  root.querySelector('#kgClose').addEventListener('click', close);

  function home() {
    content.innerHTML = `
      <p>Mesleki becerilerini oyunlarla geliştir. Görevleri tamamla, puan kazan!</p>
      <div class="kg-grid">
        <div class="kg-card">
          <div style="font-size:42px">🏗️</div>
          <h2>Şantiye Simülatörü</h2>
          <p>Şantiye şefi ol. İnşaatı doğru sırayla tamamla, bütçeni yönet.</p>
          <button class="kg-main" id="kgSite">ŞANTİYEYE GİR</button>
        </div>
        <div class="kg-card">
          <div style="font-size:42px">🛠️</div>
          <h2>Binayı Kurtar</h2>
          <p>Yapıdaki sorunları bul. Hataları tespit ederek binayı kurtar.</p>
          <button class="kg-main" id="kgRescue">GÖREVE BAŞLA</button>
        </div>
        <div class="kg-card">
          <div style="font-size:42px">🛋️</div>
          <h2>İç Mekân Tasarımı</h2>
          <p>Boş bir odayı tasarla. Renkleri, mobilyaları ve dekorasyonu seç.</p>
          <button class="kg-main" id="kgDesign">TASARIMA BAŞLA</button>
        </div>
        <div class="kg-card">
          <div style="font-size:30px">🏆</div>
          <h2>Oyun Puanın</h2>
          <div class="kg-stat"><span>Toplam puan</span><b>${getScore()}</b></div>
          <p>Oyunları tamamlayarak puanını artır.</p>
        </div>
      </div>`;
    content.querySelector('#kgSite').onclick = siteGame;
    content.querySelector('#kgRescue').onclick = rescueGame;
    content.querySelector('#kgDesign').onclick = designGame;
  }

  function getScore() {
    return Number(localStorage.getItem('kalecad_game_score') || 0);
  }
  function addScore(n) {
    localStorage.setItem('kalecad_game_score', getScore() + n);
  }

  // 1 - ŞANTİYE SIMULATORU
  const siteSteps = [
    {
      title:'1. Arazi hazırlığı',
      question:'İnşaata başlamadan önce ilk olarak ne yapılmalıdır?',
      options:['Temel betonu dökülür','Zemin etüdü ve aplikasyon yapılır','Duvarlar örülür'],
      correct:1,
      info:'Önce zemin özellikleri incelenir ve yapı aplikasyonu yapılır.'
    },
    {
      title:'2. Temel aşaması',
      question:'Temel imalatından önce hangi işlem yapılır?',
      options:['Kazı ve gerekli zemin hazırlığı','Çatı kaplaması','İç cephe boyası'],
      correct:0,
      info:'Temel öncesinde kazı ve projeye uygun zemin hazırlığı yapılır.'
    },
    {
      title:'3. Taşıyıcı sistem',
      question:'Betonarme yapıda taşıyıcı elemanlar hangileridir?',
      options:['Kapı ve pencereler','Kolon, kiriş ve döşemeler','Seramik ve parke'],
      correct:1,
      info:'Kolon, kiriş ve döşemeler taşıyıcı sistemin temel elemanlarıdır.'
    },
    {
      title:'4. Duvar imalatı',
      question:'Duvar örerken öncelikle neye dikkat edilmelidir?',
      options:['Renk seçimine','Doğrultu, şakül ve ölçülere','Mobilya düzenine'],
      correct:1,
      info:'Duvarın düzgün olması için doğrultu, şakül ve ölçüler kontrol edilir.'
    },
    {
      title:'5. Son işler',
      question:'İç mekân bitirme işlerinde hangi işlem yapılabilir?',
      options:['Zemin kaplama ve boya','Temel kazısı','Zemin etüdü'],
      correct:0,
      info:'Boya ve zemin kaplamaları ince işler kapsamındadır.'
    }
  ];

  function siteGame() {
    step = 0;
    score = 0;
    siteQuestion();
  }
  function siteQuestion() {
    if (step >= siteSteps.length) {
      addScore(score);
      content.innerHTML = `
        <div class="kg-card">
          <h2>🏗️ Şantiye Tamamlandı!</h2>
          <p>Şantiyeyi başarıyla yönettin.</p>
          <div class="kg-stat"><span>Kazandığın puan</span><b>${score}</b></div>
          <button class="kg-main" id="kgHome">OYUN MERKEZİNE DÖN</button>
        </div>`;
      content.querySelector('#kgHome').onclick = home;
      return;
    }
    const q = siteSteps[step];
    content.innerHTML = `
      <button class="kg-back" id="kgBack">← Oyunlara dön</button>
      <div class="kg-card">
        <div class="kg-stat"><span>Şantiye aşaması ${step+1}/${siteSteps.length}</span><b>${score} puan</b></div>
        <h2>${q.title}</h2>
        <p>${q.question}</p>
        ${q.options.map((x,i)=>`<button class="kg-option" data-i="${i}">${x}</button>`).join('')}
        <div id="kgFeedback"></div>
      </div>`;
    content.querySelector('#kgBack').onclick = home;
    content.querySelectorAll('[data-i]').forEach(b => {
      b.onclick = () => {
        const correct = Number(b.dataset.i) === q.correct;
        if (correct) score += 20;
        content.querySelector('#kgFeedback').innerHTML = `
          <div class="kg-result">
            ${correct ? '✅ Doğru! +20 puan' : '❌ Bu cevap doğru değil.'}
            <p>${q.info}</p>
            <button class="kg-main" id="kgNext">SONRAKİ AŞAMA</button>
          </div>`;
        content.querySelectorAll('[data-i]').forEach(x=>x.disabled=true);
        content.querySelector('#kgNext').onclick = () => {
          step++;
          siteQuestion();
        };
      };
    });
  }

  // 2 - BINAYI KURTAR
  const rescueQuestions = [
    {
      title:'Çatlak duvar',
      desc:'Bir yapının taşıyıcı kolonunda belirgin çatlak görülüyor.',
      options:['Üzerini boyamak','Uzman incelemesi ve mühendislik değerlendirmesi','Duvar kâğıdı kaplamak'],
      correct:1,
      info:'Taşıyıcı elemanlardaki çatlaklar uzman mühendis tarafından incelenmelidir.'
    },
    {
      title:'Su alan çatı',
      desc:'Yağmur sonrasında tavanda su lekeleri oluşuyor.',
      options:['Su yalıtımını ve çatı detaylarını kontrol etmek','Tavanı boyamak','Pencereyi değiştirmek'],
      correct:0,
      info:'Su girişinin kaynağı belirlenmeli ve uygun su yalıtımı çözümü uygulanmalıdır.'
    },
    {
      title:'Eğri duvar',
      desc:'Yeni örülen duvarın düşey doğrultusu bozuk.',
      options:['Mobilyayla gizlemek','Şakül ve doğrultu kontrolü yapıp imalatı düzeltmek','Duvarı boyamak'],
      correct:1,
      info:'Duvar imalatında şakül ve doğrultu kontrolü önemlidir.'
    },
    {
      title:'Isı kaybı',
      desc:'Binada kışın aşırı ısı kaybı yaşanıyor.',
      options:['Yalıtım ve ısı köprülerini incelemek','Daha kalın perde asmak','Sadece lambaları değiştirmek'],
      correct:0,
      info:'Isı yalıtımı, doğrama ve ısı köprüleri birlikte değerlendirilmelidir.'
    },
    {
      title:'Yanlış ölçü',
      desc:'Projede 120 cm görünen kapı boşluğu sahada 90 cm yapılmış.',
      options:['Projeyi ve uygulamayı kontrol edip hatayı gidermek','Kapıyı zorlayarak takmak','Ölçüyü önemsememek'],
      correct:0,
      info:'Uygulama proje ölçülerine uygun olmalıdır. Değişiklikler yetkili kişilerce değerlendirilmelidir.'
    }
  ];

  function rescueGame() {
    faults = [];
    rescueQuestion();
  }
  function rescueQuestion() {
    const i = faults.length;
    if (i >= rescueQuestions.length) {
      const points = faults.filter(Boolean).length * 20;
      addScore(points);
      content.innerHTML = `
        <div class="kg-card">
          <h2>🛠️ Bina Kurtarıldı!</h2>
          <p>${faults.filter(Boolean).length} / ${rescueQuestions.length} soruyu doğru çözdün.</p>
          <div class="kg-stat"><span>Kazandığın puan</span><b>${points}</b></div>
          <button class="kg-main" id="kgHome">OYUN MERKEZİNE DÖN</button>
        </div>`;
      content.querySelector('#kgHome').onclick = home;
      return;
    }
    const q = rescueQuestions[i];
    content.innerHTML = `
      <button class="kg-back" id="kgBack">← Oyunlara dön</button>
      <div class="kg-card">
        <div class="kg-stat"><span>İnceleme ${i+1}/${rescueQuestions.length}</span><b>🔍</b></div>
        <h2>${q.title}</h2><p>${q.desc}</p>
        ${q.options.map((x,n)=>`<button class="kg-option" data-i="${n}">${x}</button>`).join('')}
        <div id="kgFeedback"></div>
      </div>`;
    content.querySelector('#kgBack').onclick = home;
    content.querySelectorAll('[data-i]').forEach(b=>{
      b.onclick=()=>{
        const correct=Number(b.dataset.i)===q.correct;
        faults.push(correct);
        content.querySelectorAll('[data-i]').forEach(x=>x.disabled=true);
        content.querySelector('#kgFeedback').innerHTML=`
          <div class="kg-result">
            ${correct?'✅ Sorunu doğru tespit ettin!':'❌ Bu çözüm doğru değil.'}
            <p>${q.info}</p>
            <button class="kg-main" id="kgNext">SONRAKİ SORUN</button>
          </div>`;
        content.querySelector('#kgNext').onclick=rescueQuestion;
      };
    });
  }

  // 3 - IC MEKAN TASARIMI
  function designGame() {
    design = {
      room:'Salon',
      wall:'#d8c7ae',
      floor:'#9b704c',
      sofa:'#477b9d',
      style:'Modern',
      furniture:'Koltuk ve sehpa',
      light:'Sarkıt aydınlatma'
    };
    designScreen();
  }

  function designScreen() {
    content.innerHTML = `
      <button class="kg-back" id="kgBack">← Oyunlara dön</button>
      <div class="kg-card">
        <h2>🛋️ Kendi Mekânını Tasarla</h2>
        <p>Seçimlerini yap ve kendi iç mekânını oluştur.</p>
        <div class="kg-room" id="kgRoom" style="background:${design.wall}">
          <div class="kg-window"></div>
          <div class="kg-lamp"></div>
          <div class="kg-sofa" style="background:${design.sofa}"></div>
          <div class="kg-table"></div>
          <div class="kg-floor" style="background:${design.floor}"></div>
        </div>
        <label>Mekân türü</label>
        <select id="kgType">
          <option>Salon</option><option>Yatak Odası</option>
          <option>Çalışma Odası</option><option>Mutfak</option>
        </select>
        <label>Duvar rengi</label>
        <select id="kgWall">
          <option value="#d8c7ae">Krem</option>
          <option value="#b8c9d9">Açık Mavi</option>
          <option value="#c6b6cf">Lila</option>
          <option value="#b7c9ad">Adaçayı Yeşili</option>
          <option value="#eeeeee">Beyaz</option>
          <option value="#b5a08b">Vizon</option>
        </select>
        <label>Zemin kaplaması</label>
        <select id="kgFloor">
          <option value="#9b704c">Ahşap Parke</option>
          <option value="#c9c4b9">Açık Seramik</option>
          <option value="#777777">Gri Seramik</option>
          <option value="#684c3d">Koyu Ahşap</option>
        </select>
        <label>Koltuk / Mobilya rengi</label>
        <select id="kgSofa">
          <option value="#477b9d">Mavi</option>
          <option value="#9c6c55">Kahverengi</option>
          <option value="#75866a">Yeşil</option>
          <option value="#b77a91">Pembe</option>
          <option value="#555555">Antrasit</option>
        </select>
        <label>Tasarım tarzı</label>
        <select id="kgStyle">
          <option>Modern</option><option>Minimalist</option>
          <option>İskandinav</option><option>Endüstriyel</option>
          <option>Geleneksel</option>
        </select>
        <label>Mobilya seçimi</label>
        <select id="kgFurniture">
          <option>Koltuk ve sehpa</option>
          <option>Yatak ve komodin</option>
          <option>Çalışma masası ve kitaplık</option>
          <option>Mutfak dolabı ve ada</option>
        </select>
        <label>Aydınlatma</label>
        <select id="kgLight">
          <option>Sarkıt aydınlatma</option>
          <option>Spot aydınlatma</option>
          <option>Abajur ve lambader</option>
        </select>
        <button class="kg-main" id="kgPreview">TASARIMI DEĞERLENDİR</button>
        <div id="kgDesignResult"></div>
      </div>`;
    content.querySelector('#kgBack').onclick=home;

    const fields = {
      kgType:'room',kgWall:'wall',kgFloor:'floor',
      kgSofa:'sofa',kgStyle:'style',
      kgFurniture:'furniture',kgLight:'light'
    };
    Object.entries(fields).forEach(([id,key])=>{
      const el=content.querySelector('#'+id);
      el.value=design[key];
      el.onchange=()=>{
        design[key]=el.value;
        const room=content.querySelector('#kgRoom');
        room.style.background=design.wall;
        room.querySelector('.kg-floor').style.background=design.floor;
        room.querySelector('.kg-sofa').style.background=design.sofa;
      };
    });

    content.querySelector('#kgPreview').onclick=()=>{
      let points=40;
      if(design.wall!==design.floor) points+=10;
      if(design.style==='Modern'||design.style==='Minimalist') points+=10;
      if(design.light) points+=10;
      if(design.furniture) points+=10;
      addScore(points);
      content.querySelector('#kgDesignResult').innerHTML=`
        <div class="kg-result">
          <h2>🎉 Tasarımın Hazır!</h2>
          <p><b>${design.room}</b> için ${design.style} tarzında bir tasarım oluşturdun.</p>
          <p>Mobilya: ${design.furniture}</p>
          <p>Aydınlatma: ${design.light}</p>
          <h2>+${points} PUAN</h2>
          <button class="kg-main" id="kgAgain">YENİ TASARIM YAP</button>
          <button class="kg-option" id="kgHome">OYUN MERKEZİNE DÖN</button>
        </div>`;
      content.querySelector('#kgAgain').onclick=designGame;
      content.querySelector('#kgHome').onclick=home;
    };
  }

  // Mevcut sayfaya dokunmadan oyun merkezini açan buton
  console.log('KALECAD Oyun Merkezi hazır.');
})();

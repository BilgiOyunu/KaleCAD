/* KALECAD - SKETCHUP ATÖLYESİ */
(() => {
  "use strict";

  const STORE = "kalecad_sketchup_atolye_v1";

  const tools = [
    ["Select","Seç","Modeldeki nesneleri seçer."],
    ["Line","Çizgi","Kenar ve yüzey oluşturmak için çizgi çizer."],
    ["Rectangle","Dikdörtgen","Dikdörtgen yüzey oluşturur."],
    ["Circle","Daire","Dairesel yüzey oluşturur."],
    ["Push/Pull","İt/Çek","2D yüzeyi 3D hacme dönüştürür."],
    ["Move","Taşı","Nesneleri farklı konumlara taşır."],
    ["Rotate","Döndür","Nesneleri belirli bir açıyla döndürür."],
    ["Scale","Ölçekle","Modelin boyutlarını değiştirir."],
    ["Offset","Ötele","Yüzey üzerinde paralel sınır oluşturur."],
    ["Follow Me","Beni İzle","Bir profili belirlenen yol boyunca taşır."],
    ["Tape Measure","Şerit Metre","Mesafe ölçer ve kılavuz çizgiler oluşturur."],
    ["Paint Bucket","Boya Kovası","Yüzeylere malzeme ve renk uygular."],
    ["Orbit","Yörünge","Modelin çevresinde görünümü döndürür."],
    ["Pan","Kaydır","Görünümü yatay ve dikey hareket ettirir."],
    ["Zoom","Yakınlaştır","Model görünümünü yakınlaştırır veya uzaklaştırır."]
  ];

  const questions = [
    ["Bir yüzeyi 3 boyutlu hâle getirmek için hangi araç kullanılır?",["Push/Pull","Move","Orbit","Paint Bucket"],0],
    ["Modeli çevresinden incelemek için hangi araç kullanılır?",["Scale","Orbit","Offset","Line"],1],
    ["Bir nesneyi başka yere taşımak için hangisi kullanılır?",["Move","Circle","Zoom","Pan"],0],
    ["Yüzeye malzeme uygulamak için hangi araç kullanılır?",["Line","Rotate","Paint Bucket","Select"],2],
    ["Mesafe ölçmek için hangi araç kullanılır?",["Tape Measure","Orbit","Push/Pull","Rectangle"],0],
    ["Bir profili yol boyunca ilerletmek için hangisi kullanılır?",["Follow Me","Scale","Pan","Circle"],0],
    ["Dikdörtgen yüzey oluşturmak için hangisi kullanılır?",["Rectangle","Move","Orbit","Offset"],0],
    ["Nesnenin boyutunu değiştirmek için hangisi kullanılır?",["Zoom","Scale","Select","Line"],1],
    ["Bir nesneyi belirli açıyla çevirmek için hangisi kullanılır?",["Rotate","Pan","Circle","Paint Bucket"],0],
    ["Model üzerinde çizgi oluşturmak için hangisi kullanılır?",["Line","Orbit","Zoom","Move"],0]
  ];

  const read = () => {
    try {
      return JSON.parse(localStorage.getItem(STORE) || "{}");
    } catch (_) {
      return {};
    }
  };

  const write = data => {
    localStorage.setItem(STORE, JSON.stringify(data));
  };

  const esc = value => String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));

  function mount() {
    const modal = document.getElementById("autocadWorkshopModal");
    if (!modal || modal.dataset.sketchupReady) return;

    const nav = modal.querySelector("#cadTabs");
    const cadPanel = modal.querySelector("#cadPanel");
    if (!nav || !cadPanel) return;

    modal.dataset.sketchupReady = "1";

    const tab = document.createElement("button");
    tab.type = "button";
    tab.dataset.tab = "sketchup";
    tab.textContent = "SketchUp Atölyesi";
    nav.appendChild(tab);

    const panel = document.createElement("div");
    panel.id = "sketchupPanel";
    panel.style.display = "none";
    cadPanel.insertAdjacentElement("afterend", panel);

    nav.addEventListener("click", e => {
      const btn = e.target.closest("[data-tab]");
      if (!btn) return;

      if (btn.dataset.tab === "sketchup") {
        e.preventDefault();
        e.stopImmediatePropagation();

        nav.querySelectorAll("[data-tab]").forEach(b => {
          b.classList.toggle("active", b === tab);
        });

        cadPanel.style.display = "none";
        panel.style.display = "block";
        render("home");
      } else {
        panel.style.display = "none";
        cadPanel.style.display = "block";
      }
    }, true);

    function render(section) {
      if (section === "home") {
        panel.innerHTML = `
          <div class="cad-item">
            <h3>SketchUp 3D Atölyesi</h3>
            <p class="cad-muted">Mimari modelleme araçlarını öğren, 3D görevleri tamamla ve bilgini test et.</p>
            <div class="cad-grid">
              <button class="cad-btn cad-primary" data-sk="tools">Araç Rehberi</button>
              <button class="cad-btn cad-primary" data-sk="model">3D Modelleme</button>
              <button class="cad-btn cad-primary" data-sk="quiz">Mini Sınav</button>
              <button class="cad-btn cad-primary" data-sk="tasks">Uygulama Görevleri</button>
            </div>
            <p class="cad-muted" style="margin-top:14px">Tamamlanan Görev: ${(read().done || []).length} / 5</p>
          </div>`;

        panel.querySelectorAll("[data-sk]").forEach(b =>
          b.addEventListener("click", () => render(b.dataset.sk))
        );
      }

      if (section === "tools") {
        panel.innerHTML = `
          <button class="cad-btn" data-back>← Atölyeye Dön</button>
          <h3>SketchUp Araç Rehberi</h3>
          <p class="cad-muted">Araçların görevlerini ve mimari tasarımdaki kullanımını incele.</p>
          <div class="cad-grid">
            ${tools.map(t => `
              <article class="cad-item">
                <div style="color:#64d9ff;font-weight:800">${esc(t[0])}</div>
                <h3>${esc(t[1])}</h3>
                <p>${esc(t[2])}</p>
              </article>`).join("")}
          </div>`;
        back();
      }

      if (section === "model") {
        panel.innerHTML = `
          <button class="cad-btn" data-back>← Atölyeye Dön</button>
          <h3>3D Modelleme Öğrenme Alanı</h3>
          <p class="cad-muted">SketchUp'ta uygulayabileceğin modelleme adımları.</p>
          <div class="cad-grid">
            ${[
              ["01","Temel Geometri","Rectangle ve Line araçlarıyla bir yüzey oluştur."],
              ["02","Hacim Oluşturma","Push/Pull ile yüzeyi 300 cm yüksekliğinde yükselt."],
              ["03","Kapı ve Pencere","Duvar üzerinde açıklıklar oluştur."],
              ["04","Mobilya Modelleme","Masa, sandalye veya dolap modelle."],
              ["05","Malzeme ve Görünüm","Yüzeylere malzeme uygula ve modeli incele."]
            ].map(x => `
              <article class="cad-item">
                <div class="cad-stat">${x[0]}</div>
                <h3>${x[1]}</h3>
                <p>${x[2]}</p>
              </article>`).join("")}
          </div>
          <p class="cad-muted">Bu bölüm uygulama yönergeleri sunar; gerçek SketchUp yazılımında modelleme yapılır.</p>`;
        back();
      }

      if (section === "quiz") {
        let index = 0;
        let score = 0;
        const list = questions.slice().sort(() => Math.random() - .5).slice(0,8);

        function show() {
          const q = list[index];
          panel.innerHTML = `
            <button class="cad-btn" data-back>← Atölyeye Dön</button>
            <div class="cad-item">
              <div class="cad-stat">${index + 1} / 8</div>
              <h3>${q[0]}</h3>
              <div id="skOptions"></div>
              <p id="skFeedback" aria-live="polite"></p>
            </div>`;

          const options = panel.querySelector("#skOptions");

          q[1].forEach((option, i) => {
            const b = document.createElement("button");
            b.className = "cad-option";
            b.textContent = option;

            b.addEventListener("click", () => {
              if (b.disabled) return;

              [...options.children].forEach((item, j) => {
                item.disabled = true;
                if (j === q[2]) item.classList.add("correct");
                else if (j === i) item.classList.add("wrong");
              });

              const correct = i === q[2];
              if (correct) score++;

              panel.querySelector("#skFeedback").textContent =
                correct ? "Doğru cevap! +10 puan" : "Doğru cevap: " + q[1][q[2]];

              const next = document.createElement("button");
              next.className = "cad-btn cad-primary";
              next.textContent = index === 7 ? "Sonucu Gör" : "Sonraki Soru";
              next.addEventListener("click", () => {
                index++;
                if (index < 8) show();
                else finish();
              });
              options.appendChild(next);
            });

            options.appendChild(b);
          });
          back();
        }

        function finish() {
          const points = score * 10;
          const data = read();
          data.bestQuiz = Math.max(data.bestQuiz || 0, points);
          data.lastQuiz = points;
          write(data);

          panel.innerHTML = `
            <div class="cad-item" style="text-align:center">
              <div style="font-size:42px">🏆</div>
              <h3>Sınav Tamamlandı</h3>
              <div class="cad-stat">${points} / 80 Puan</div>
              <p>${score} Doğru · ${8-score} Yanlış</p>
              <button class="cad-btn cad-primary" id="skAgain">Yeniden Dene</button>
              <button class="cad-btn" data-back>Atölyeye Dön</button>
            </div>`;
          panel.querySelector("#skAgain").addEventListener("click", () => render("quiz"));
          back();
        }

        show();
      }

      if (section === "tasks") {
        const taskList = [
          "400 × 300 cm ölçülerinde bir oda modeli oluştur.",
          "Duvarları Push/Pull ile 280 cm yükselt.",
          "Bir kapı ve iki pencere açıklığı oluştur.",
          "Bir masa ve dört sandalye modelle.",
          "Modeline malzeme uygula ve uygun bir sahne kaydet."
        ];

        const data = read();
        data.done = data.done || [];

        panel.innerHTML = `
          <button class="cad-btn" data-back>← Atölyeye Dön</button>
          <h3>SketchUp Uygulama Görevleri</h3>
          <p class="cad-muted">Görevleri SketchUp yazılımında tamamla, ardından işaretle.</p>
          <div class="cad-grid">
            ${taskList.map((task,i) => `
              <article class="cad-item">
                <h3>${i+1}. Görev</h3>
                <p>${task}</p>
                <label style="display:flex;gap:8px;align-items:center">
                  <input type="checkbox" data-task="${i}" style="width:auto"
                    ${data.done.includes(i) ? "checked" : ""}>
                  Tamamlandı
                </label>
              </article>`).join("")}
          </div>`;

        panel.querySelectorAll("[data-task]").forEach(input => {
          input.addEventListener("change", () => {
            const d = read();
            d.done = d.done || [];
            const i = Number(input.dataset.task);
            d.done = input.checked
              ? [...new Set([...d.done,i])]
              : d.done.filter(x => x !== i);
            write(d);
          });
        });

        back();
      }

      function back() {
        panel.querySelectorAll("[data-back]").forEach(b =>
          b.addEventListener("click", () => render("home"))
        );
      }
    }
  }

  const observer = new MutationObserver(mount);
  observer.observe(document.documentElement, {childList:true,subtree:true});
  mount();
})();

(() => {
  'use strict';

  const tools = [
    ['Select','Seç','Modeldeki nesneleri seçer.'],
    ['Line','Çizgi','Kenar ve profil oluşturur.'],
    ['Rectangle','Dikdörtgen','Dikdörtgen yüzey çizer.'],
    ['Circle','Daire','Dairesel yüzey oluşturur.'],
    ['Push/Pull','İt/Çek','2B yüzeyi 3B hacme dönüştürür.'],
    ['Move','Taşı','Nesneleri konumlandırır.'],
    ['Rotate','Döndür','Nesneleri eksen etrafında döndürür.'],
    ['Scale','Ölçekle','Modelin boyutunu değiştirir.'],
    ['Offset','Ofset','Paralel kenarlar oluşturur.'],
    ['Follow Me','Beni İzle','Bir profili yol boyunca uzatır.'],
    ['Paint Bucket','Boya Kovası','Yüzeylere malzeme uygular.'],
    ['Eraser','Silgi','Kenarları siler.']
  ];

  const questions = [
    ['Bir yüzeyi 3B hacme dönüştüren araç hangisidir?','Push/Pull',['Move','Push/Pull','Scale']],
    ['Nesneleri seçmek için hangi araç kullanılır?','Select',['Select','Eraser','Orbit']],
    ['Yüzeye malzeme uygulamak için hangisi kullanılır?','Paint Bucket',['Line','Offset','Paint Bucket']],
    ['Modeli büyütüp küçültmek için hangisi kullanılır?','Scale',['Scale','Move','Circle']],
    ['Model çevresinde görünümü döndürmek için hangisi kullanılır?','Orbit',['Eraser','Orbit','Rectangle']]
  ];

  const tasks = [
    '400 × 300 cm ölçülerinde bir oda tabanı oluştur.',
    'Push/Pull ile duvarları 280 cm yükselt.',
    'Bir kapı ve iki pencere boşluğu oluştur.',
    'Odaya bir masa ve iki sandalye modelle.',
    'Duvarlara ve zemine farklı malzemeler uygula.'
  ];

  let mounted = false;

  function mount() {
    const modal = document.getElementById('autocadWorkshopModal');
    if (!modal || mounted) return;

    const nav = modal.querySelector('#cadTabs');
    const panel = modal.querySelector('#cadPanel');
    if (!nav || !panel) return;

    mounted = true;

    const tab = document.createElement('button');
    tab.type = 'button';
    tab.dataset.tab = 'sketchup';
    tab.textContent = 'SketchUp Atölyesi';
    nav.appendChild(tab);

    function show() {
      nav.querySelectorAll('[data-tab]').forEach(b =>
        b.classList.toggle('active', b === tab)
      );

      panel.innerHTML = `
        <div class="cad-item">
          <h3>SketchUp 3D Atölyesi</h3>
          <p class="cad-muted">Mimari modelleme araçlarını öğren, sınavı çöz ve uygulama görevlerini tamamla.</p>
          <div class="cad-grid">
            <div class="cad-item">
              <h3>🧰 Araç Rehberi</h3>
              <div id="skTools"></div>
            </div>
            <div class="cad-item">
              <h3>🧠 Mini Sınav</h3>
              <div id="skQuiz"></div>
            </div>
            <div class="cad-item">
              <h3>🏗️ 3B Modelleme Görevleri</h3>
              <div id="skTasks"></div>
            </div>
          </div>
        </div>`;

      const guide = panel.querySelector('#skTools');
      tools.forEach(t => {
        const item = document.createElement('p');
        item.innerHTML = `<b>${t[0]} – ${t[1]}</b><br><span class="cad-muted">${t[2]}</span>`;
        guide.appendChild(item);
      });

      const quiz = panel.querySelector('#skQuiz');
      let index = 0;
      let score = 0;

      function ask() {
        if (index >= questions.length) {
          quiz.innerHTML = `<h3>${score * 20} / 100 puan</h3>
            <button class="cad-btn cad-primary" id="skAgain">Yeniden Dene</button>`;
          quiz.querySelector('#skAgain').onclick = () => {
            index = 0;
            score = 0;
            ask();
          };
          return;
        }

        const q = questions[index];
        quiz.innerHTML = `<p><b>${index + 1}/${questions.length}</b> — ${q[0]}</p>`;

        q[2].forEach(option => {
          const b = document.createElement('button');
          b.className = 'cad-option';
          b.textContent = option;
          b.onclick = () => {
            if (option === q[1]) {
              score++;
              b.classList.add('correct');
            } else {
              b.classList.add('wrong');
            }
            quiz.querySelectorAll('button').forEach(x => x.disabled = true);
            const next = document.createElement('button');
            next.className = 'cad-btn cad-primary';
            next.textContent = 'Sonraki Soru';
            next.onclick = () => {
              index++;
              ask();
            };
            quiz.appendChild(next);
          };
          quiz.appendChild(b);
        });
      }
      ask();

      const taskArea = panel.querySelector('#skTasks');
      tasks.forEach((task, i) => {
        const label = document.createElement('label');
        label.style.cssText = 'display:block;margin:12px 0';
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.style.width = 'auto';
        check.checked = localStorage.getItem('kale_sk_task_' + i) === '1';
        check.onchange = () =>
          localStorage.setItem('kale_sk_task_' + i, check.checked ? '1' : '0');
        label.append(check, document.createTextNode(' ' + (i + 1) + '. ' + task));
        taskArea.appendChild(label);
      });
    }

    tab.addEventListener('click', show);
  }

  const observer = new MutationObserver(mount);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  mount();
})();


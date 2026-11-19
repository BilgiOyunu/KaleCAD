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

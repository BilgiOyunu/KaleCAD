(() => {
  const STORAGE_KEY = "kalecad_conquest";
  const CAMPUS_KEY = "kalecad_campus";
  const cities = {
    Istanbul: { name: "İstanbul", color: "#64d9ff", x: 178, y: 105 },
    Kocaeli: { name: "Kocaeli", color: "#83d6b1", x: 222, y: 112 },
    Sakarya: { name: "Sakarya", color: "#f5d66f", x: 246, y: 126 },
    Mugla: { name: "Muğla", color: "#ff918c", x: 190, y: 285 },
  };
  const aliases = {
    İstanbul: "Istanbul",
    Istanbul: "Istanbul",
    Kocaeli: "Kocaeli",
    Sakarya: "Sakarya",
    Muğla: "Mugla",
    Mugla: "Mugla",
  };
  const cityKey = (value) => aliases[value] || null;
  const readState = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (_) {
      return {};
    }
  };
  const writeState = (state) =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  const captured = (key) => {
    const value = readState()[key];
    return !!value;
  };
  const mapMarkup = () => ` <svg id="territoryMap" viewBox="0 0 420 370" role="img" aria-label="Türkiye haritası üzerinde kale konumları" style="width:100%;display:block;border-radius:14px;background:linear-gradient(160deg,#102b52,#07172f)"> <defs><linearGradient id="land" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d5c49b"/><stop offset="1" stop-color="#8e9b82"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs> <path d="M35 105 L52 88 78 91 94 77 120 82 139 67 160 74 178 62 199 70 219 61 239 72 259 68 278 82 300 79 317 94 341 98 354 115 377 121 386 139 370 154 353 151 338 165 319 161 302 177 282 174 268 188 249 184 233 198 215 194 199 207 183 202 168 216 149 209 134 222 116 214 99 225 81 214 66 219 54 202 39 195 44 178 29 164 39 146 27 130Z" fill="url(#land)" stroke="#f1dfb7" stroke-width="3" stroke-linejoin="round"/> <path d="M55 128 Q105 110 154 126 T250 122 T355 135 M74 190 Q140 163 198 183 T330 180 M120 91 Q145 135 132 185 T170 220 M245 85 Q230 130 255 177" fill="none" stroke="#536b62" stroke-width="1.5" opacity=".45" stroke-dasharray="4 5"/> <text x="210" y="32" text-anchor="middle" fill="#dbe8f5" font-size="13" font-weight="800" letter-spacing="3">TÜRKİYE</text> ${Object.entries(cities) .map( ([key, c]) => `<g class="castle-marker" data-city="${key}" tabindex="0" role="button" aria-label="${ c.name } Kalesi"><circle cx="${c.x}" cy="${c.y}" r="13" fill="${ captured(key) ? c.color : "#182d48" }" stroke="${captured(key) ? "#fff" : c.color}" stroke-width="3" ${ captured(key) ? 'filter="url(#glow)"' : "" }/><text x="${c.x}" y="${ c.y + 5 }" text-anchor="middle" font-size="14" font-weight="900" fill="${ captured(key) ? "#07163c" : "#fff" }">${captured(key) ? "✓" : "♜"}</text><text x="${c.x}" y="${ c.y + 30 }" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" stroke="#07172f" stroke-width="3" paint-order="stroke">${ c.name } Kalesi</text></g>` ) .join("")} </svg>`;
  function injectMap() {
    const home = document.getElementById("home");
    if (!home || document.getElementById("conquestMap")) return;
    const card = document.createElement("section");
    card.id = "conquestMap";
    card.className = "setting-card";
    card.style.cssText = "margin:18px 0;overflow:hidden";
    card.innerHTML = `<h2 class="setting-title">🗺️ <span>Kale Fetih Haritası</span></h2><p class="summary" id="conquestStatus">Bir kale seç ve 10 sorunun tamamını doğru yanıtlayarak fethet.</p>${mapMarkup()}<div id="conquestList" class="summary" style="margin-top:12px"></div>`;
    const picker = document.getElementById("campusPicker");
    if (picker) picker.after(card);
    else home.appendChild(card);
    const refresh = () => {
      const selected = cityKey(localStorage.getItem(CAMPUS_KEY));
      card.querySelectorAll("[data-city]").forEach((g) => {
        const key = g.dataset.city;
        g.style.opacity = selected === key ? "1" : ".82";
        g.style.cursor = "pointer";
        g.querySelector("circle").setAttribute(
          "stroke-width",
          selected === key ? "5" : "3"
        );
      });
      const won = Object.keys(cities).filter(captured);
      document.getElementById("conquestList").innerHTML = won.length
        ? `<strong>Fethedilen kaleler</strong><br>${won .map((k) => `🏰 ${cities[k].name} Kalesi`) .join(" · ")}`
        : "Henüz fethedilen kale yok.";
      document.getElementById("conquestStatus").textContent = selected
        ? `Hedefin: ${cities[selected].name} Kalesi · 10/10 doğru cevapla fethet.`
        : "Önce kampüsünü seç.";
      card
        .querySelectorAll("[data-city]")
        .forEach((g) =>
          g
            .querySelector("circle")
            .setAttribute(
              "fill",
              captured(g.dataset.city)
                ? cities[g.dataset.city].color
                : "#182d48"
            )
        );
    };
    card.querySelectorAll("[data-city]").forEach((g) => {
      const choose = () => {
        const name = cities[g.dataset.city].name;
        localStorage.setItem(CAMPUS_KEY, name);
        document.querySelectorAll("[data-campus]").forEach((b) => {
          const on = b.dataset.campus === name;
          b.classList.toggle("selected", on);
          b.setAttribute("aria-pressed", String(on));
        });
        const s = document.getElementById("campusStatus");
        if (s) s.textContent = `Seçilen hedef: ${name} Kalesi`;
        const start = document.getElementById("start");
        if (start) {
          start.disabled = false;
          start.removeAttribute("aria-disabled");
        }
        refresh();
      };
      g.addEventListener("click", choose);
      g.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          choose();
        }
      });
    });
    window.addEventListener("kalecad:campus-selected", refresh);
    refresh();
  }
  function showVictory(city) {
    let modal = document.getElementById("conquestVictory");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "conquestVictory";
      modal.style.cssText =
        "position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:20px;background:#020817eF;";
      document.body.appendChild(modal);
    }
    modal.innerHTML = `<div style="width:min(100%,520px);padding:30px 22px;text-align:center;border:1px solid #f5d66f;border-radius:24px;background:radial-gradient(circle at top,#294778,#09152f 70%);box-shadow:0 20px 80px #000b;color:#fff"><div style="font-size:54px">🏰</div><p style="margin:8px 0;color:#f5d66f;font-weight:900;letter-spacing:.16em">FETİH TAMAMLANDI</p><h1 style="font-size:clamp(25px,6vw,38px);margin:12px 0">${city} Kalesi Fethedildi!</h1><p style="font-size:clamp(19px,4.5vw,27px);font-weight:900;line-height:1.35">Sen ${city} Kalesi'nin CADparatoru oldun!</p><p style="color:#cbd7ea">10 soruda 10 doğru cevap · 10/10</p><button id="closeConquestVictory" style="margin-top:12px;padding:13px 24px;border:0;border-radius:12px;background:#f5d66f;color:#17213a;font-weight:900;font-size:16px">Haritaya dön</button></div>`;
    modal
      .querySelector("#closeConquestVictory")
      .addEventListener("click", () => modal.remove());
  }
  function finishConquest(correctCount) {
    if (Number(correctCount) !== 10) return false;
    const selected = cityKey(localStorage.getItem(CAMPUS_KEY));
    if (!selected) return false;
    const state = readState();
    if (state[selected]) {
      showVictory(cities[selected].name);
      return true;
    }
    state[selected] = { capturedAt: new Date().toISOString(), correct: 10 };
    writeState(state);
    const resultText = document.getElementById("resultText");
    if (resultText)
      resultText.textContent = `10 doğru, 0 yanlış. ${cities[selected].name} Kalesi fethedildi!`;
    showVictory(cities[selected].name);
    const map = document.getElementById("conquestMap");
    if (map) {
      map.remove();
      injectMap();
    }
    return true;
  }
  function watchResults() {
    const result = document.getElementById("result");
    if (!result) return;
    let handled = false;
    const observer = new MutationObserver(() => {
      if (!result.classList.contains("active")) {
        handled = false;
        return;
      }
      if (handled) return;
      const text = document.getElementById("correctCount")?.textContent || "";
      const match = text.match(/(\d+)\s*\/\s*10/);
      if (match && Number(match[1]) === 10) {
        handled = true;
        finishConquest(10);
      }
    });
    observer.observe(result, { attributes: true, attributeFilter: ["class"] });
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", () => {
      injectMap();
      watchResults();
    });
  else {
    injectMap();
    watchResults();
  }
  window.KALECAD_CONQUEST = { finish: finishConquest, cities };
})();

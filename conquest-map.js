
(() => {
  "use strict";

  const STORAGE_KEY = "kalecad_conquest";
  const CAMPUS_KEY = "kalecad_campus";

  const cities = {
    Istanbul: { name: "İstanbul", x: 164, y: 91 },
    Kocaeli:  { name: "Kocaeli",  x: 187, y: 105 },
    Sakarya:  { name: "Sakarya",  x: 208, y: 112 },
    Mugla:    { name: "Muğla",    x: 119, y: 246 }
  };

  const aliases = {
    "İstanbul": "Istanbul",
    "Istanbul": "Istanbul",
    "Kocaeli": "Kocaeli",
    "Sakarya": "Sakarya",
    "Muğla": "Mugla",
    "Mugla": "Mugla"
  };

  const cityKey = value => aliases[value] || null;

  function readState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (_) {
      return {};
    }
  }

  function writeState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  }

  function isCaptured(key) {
    return !!readState()[key];
  }

  function addStyles() {
    if (document.getElementById("kalecad-map-styles")) return;

    const style = document.createElement("style");
    style.id = "kalecad-map-styles";
    style.textContent = `
      #kalecadHistoricMap {
        margin: 18px 0;
        padding: 13px;
        border: 1px solid #b89556;
        border-radius: 18px;
        color: #382817;
        background:
          radial-gradient(ellipse at 18% 12%, #fff4d5 0, transparent 42%),
          radial-gradient(ellipse at 88% 85%, #d8bd83 0, transparent 45%),
          linear-gradient(135deg,#ead8ad,#c8a873);
        box-shadow: 0 10px 28px #0005, inset 0 0 22px #7a542c33;
      }

      #kalecadHistoricMap .map-heading {
        margin: 2px 0 4px;
        text-align: center;
        color: #4a321c;
        font-size: 1.12rem;
        font-weight: 900;
        letter-spacing: .04em;
      }

      #kalecadHistoricMap .map-subtitle {
        margin: 0 0 10px;
        text-align: center;
        color: #674b2b;
        font-size: .82rem;
      }

      #kalecadHistoricMap svg {
        display: block;
        width: 100%;
        height: auto;
        border: 1px solid #8b693e;
        border-radius: 12px;
        background: #d9c18e;
        box-shadow: inset 0 0 28px #68431d55;
      }

      #kalecadHistoricMap .castle-marker {
        cursor: pointer;
        outline: none;
      }

      #kalecadHistoricMap .castle-marker:focus .marker-ring,
      #kalecadHistoricMap .castle-marker:hover .marker-ring {
        stroke: #fff1a8;
        stroke-width: 3.5;
      }

      #kalecadHistoricMap .castle-marker text {
        font: 800 10px Inter, "Segoe UI", sans-serif;
        fill: #382817;
        paint-order: stroke;
        stroke: #f1dfb9;
        stroke-width: 3px;
        stroke-linejoin: round;
      }

      #kalecadHistoricMap .map-legend {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 12px;
        margin: 10px 0 4px;
        color: #51391f;
        font-size: .78rem;
        font-weight: 750;
      }

      #kalecadHistoricMap .legend-dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 5px;
        border-radius: 50%;
        vertical-align: -1px;
      }

      #kalecadMapStatus {
        min-height: 24px;
        margin: 9px 0 0;
        text-align: center;
        color: #3e2b19;
        font-size: .88rem;
        font-weight: 800;
      }

      @media (max-width: 420px) {
        #kalecadHistoricMap { padding: 8px; }
        #kalecadHistoricMap .map-heading { font-size: 1rem; }
      }
    `;

    document.head.appendChild(style);
  }

  function castleMarkup(key, city) {
    const won = isCaptured(key);
    const stone = won ? "#e8b94e" : "#73777a";
    const dark = won ? "#8c5d19" : "#424950";
    const glow = won ? 'filter="url(#kalecadGoldGlow)"' : "";

    return `
      <g class="castle-marker"
         data-city="${key}"
         tabindex="0"
         role="button"
         aria-label="${city.name} Kalesi${won ? ", fethedildi" : ", fethedilmedi"}"
         transform="translate(${city.x} ${city.y})">

        <circle class="marker-ring"
          r="19"
          fill="${dark}"
          stroke="${stone}"
          stroke-width="2.4"
          ${glow}/>

        <path d="M-12 8V-4h4v-5h5v5h6v-5h5v5h4V8Z"
          fill="${stone}"
          stroke="#3d3020"
          stroke-width="1.2"
          stroke-linejoin="round"/>

        <path d="M-14 8h28v4h-28z"
          fill="${dark}"
          stroke="#3d3020"
          stroke-width="1"/>

        <path d="M-2 12V4h4v8"
          fill="#49351f"/>

        <path d="M-15 -5l5 -5 5 5M5 -5l5 -5 5 5"
          fill="none"
          stroke="${stone}"
          stroke-width="2"/>

        <text x="0" y="31" text-anchor="middle">${city.name} Kalesi</text>

        ${won ? '<circle cx="13" cy="-13" r="5" fill="#f9dc76" stroke="#795019"/>' : ""}
      </g>`;
  }

function mapMarkup() {
  return `
    <div class="map-heading">⚔ KALECAD FETİH HARİTASI</div>
    <p class="map-subtitle">Dört kaleden birini seç, 10 soruyu doğru yanıtla ve fethet!</p>

    <svg viewBox="0 0 420 330" role="img"
      aria-label="İstanbul, Kocaeli, Sakarya ve Muğla kalelerinin bulunduğu Türkiye haritası">

      <defs>
        <linearGradient id="kalecadSea" x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0" stop-color="#b9d5d0"/>
          <stop offset="1" stop-color="#789fa0"/>
        </linearGradient>
        <linearGradient id="kalecadLand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f4e4bd"/>
          <stop offset=".55" stop-color="#dfc28a"/>
          <stop offset="1" stop-color="#b99560"/>
        </linearGradient>
        <pattern id="kalecadPaper" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="5" r="1" fill="#80613a" opacity=".16"/>
          <path d="M0 17L18 0" stroke="#80613a" stroke-width=".4" opacity=".10"/>
        </pattern>
        <filter id="kalecadGoldGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <!-- Deniz -->
      <rect width="420" height="330" rx="12" fill="url(#kalecadSea)"/>

      <!-- Deniz dalgaları -->
      <g fill="none" stroke="#e1eee1" stroke-width="1" opacity=".45">
        <path d="M15 45q15-8 30 0t30 0M280 55q15-8 30 0t30 0"/>
        <path d="M15 270q15-8 30 0t30 0M290 260q15-8 30 0t30 0"/>
        <path d="M310 150q15-8 30 0t30 0"/>
      </g>

      <!-- Türkiye silüeti -->
      <path d="
        M38 112 L53 98 65 104 76 91 91 96 102 84
        116 91 130 82 144 90 157 84 171 91
        184 85 198 91 214 84 230 91 247 83
        264 88 282 80 299 87 316 82 334 90
        351 87 369 98 389 103 397 117
        385 128 390 141 377 151 381 165
        366 174 359 188 342 190 330 205
        311 201 298 214 281 207 267 220
        248 212 233 225 216 216 199 227
        182 216 166 225 150 214 136 220
        122 205 106 211 95 194 81 196
        72 179 59 176 62 159 48 151
        52 137 39 128 Z"
        fill="url(#kalecadLand)"
        stroke="#79552e" stroke-width="3"
        stroke-linejoin="round"/>

      <path d="
        M38 112 L53 98 65 104 76 91 91 96 102 84
        116 91 130 82 144 90 157 84 171 91
        184 85 198 91 214 84 230 91 247 83
        264 88 282 80 299 87 316 82 334 90
        351 87 369 98 389 103 397 117
        385 128 390 141 377 151 381 165
        366 174 359 188 342 190 330 205
        311 201 298 214 281 207 267 220
        248 212 233 225 216 216 199 227
        182 216 166 225 150 214 136 220
        122 205 106 211 95 194 81 196
        72 179 59 176 62 159 48 151
        52 137 39 128 Z"
        fill="url(#kalecadPaper)" opacity=".8"/>

      <!-- Dağ sıraları -->
      <g fill="none" stroke="#9b7949" stroke-width="1.5" opacity=".48">
        <path d="M225 145l13-17 13 17 13-19 14 19 13-16 13 16"/>
        <path d="M155 177l12-15 12 15 12-14 12 14"/>
        <path d="M260 188l12-16 12 16 12-13 12 13"/>
      </g>

      <!-- İç bölgeler ve eski ticaret yolları -->
      <g fill="none" stroke="#a17b48" stroke-width="1.2"
        stroke-dasharray="4 5" opacity=".55">
        <path d="M95 130Q170 115 235 145T350 135"/>
        <path d="M125 185Q190 165 260 190T345 180"/>
        <path d="M170 105Q185 160 145 210"/>
      </g>

      <!-- Bölge isimleri -->
      <g fill="#765a35" font-size="8" font-weight="700" opacity=".8">
        <text x="215" y="165">İÇ ANADOLU</text>
        <text x="300" y="112">KARADENİZ</text>
        <text x="215" y="242">AKDENİZ</text>
      </g>

      <!-- Pusula -->
      <g transform="translate(365 48)">
        <circle r="19" fill="#f0dfb8" stroke="#80603a" stroke-width="1.5"/>
        <path d="M0-14L5 0 0 14 -5 0Z" fill="#79552e"/>
        <path d="M0-14L0 14" stroke="#f6e9c9" stroke-width="1"/>
        <text x="0" y="-23" text-anchor="middle"
          font-size="9" font-weight="900" fill="#684b29">K</text>
      </g>

      <!-- Kaleler -->
      ${Object.entries(cities).map(([key, city]) => castleMarkup(key, city)).join("")}

      <text x="210" y="310" text-anchor="middle"
        font-size="9" font-weight="800" letter-spacing="2"
        fill="#604629">KALECAD • DÖRT KALE MÜCADELESİ</text>
    </svg>

    <div class="map-legend">
      <span><i class="legend-dot" style="background:#73777a"></i>Fethedilmedi</span>
      <span><i class="legend-dot" style="background:#e8b94e"></i>Fethedildi</span>
    </div>
    <p id="kalecadMapStatus" aria-live="polite">Haritadan bir kale seç.</p>
  `;
}


  function chooseCity(key) {
    const city = cities[key];
    if (!city) return;
    const campusButton = document.querySelector(`[data-campus="${city.name}"]`);
    if (campusButton) campusButton.click();
    else {
      try { localStorage.setItem(CAMPUS_KEY, city.name); } catch (_) {}
      window.dispatchEvent(new CustomEvent("kalecad:campus-selected", {
        detail: { campus: city.name }
      }));
      const start = document.getElementById("start");
      if (start) {
        start.disabled = false;
        start.removeAttribute("aria-disabled");
      }
    }
    const status = document.getElementById("kalecadMapStatus");
    if (status) {
      status.textContent = isCaptured(key)
        ? `${city.name} Kalesi daha önce fethedildi. Yeniden mücadele edebilirsin.`
        : `${city.name} Kalesi seçildi. 10 sorunun tamamını doğru yanıtlayarak fethet!`;
    }
  }

  function renderMap() {
    const home = document.getElementById("home");
    if (!home) return false;
    addStyles();
    let panel = document.getElementById("kalecadHistoricMap");
    if (!panel) {
      panel = document.createElement("section");
      panel.id = "kalecadHistoricMap";
      panel.setAttribute("aria-label", "Fetih haritası");
      const picker = document.getElementById("campusPicker");
      const hero = home.querySelector(".hero");
      if (picker) picker.after(panel);
      else if (hero) hero.after(panel);
      else home.prepend(panel);
    }
    panel.innerHTML = mapMarkup();
    panel.querySelectorAll(".castle-marker").forEach(marker => {
      const activate = () => chooseCity(marker.dataset.city);
      marker.addEventListener("click", activate);
      marker.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
    });
    return true;
  }

  function finishConquest(correctCount) {
    const selected = cityKey(localStorage.getItem(CAMPUS_KEY));
    if (Number(correctCount) !== 10 || !selected) return false;

    const state = readState();
    state[selected] = true;
    writeState(state);

    const city = cities[selected];
    const resultText = document.getElementById("resultText");
    if (resultText && !resultText.textContent.includes("CADparatoru")) {
      resultText.textContent += ` ${city.name} Kalesi fethedildi! Sen ${city.name} Kalesi'nin CADparatoru oldun!`;
    }
    renderMap();
    return true;
  }

  function watchResults() {
    const result = document.getElementById("result");
    const correct = document.getElementById("correctCount");
    if (!result || !correct || result.dataset.kalecadObserver) return;
    result.dataset.kalecadObserver = "true";

    const observer = new MutationObserver(() => {
      if (!result.classList.contains("active")) return;
      const match = correct.textContent.match(/(\d+)\s*\/\s*10/);
      if (!match) return;
      const signature = `${localStorage.getItem(CAMPUS_KEY)}:${match[0]}`;
      if (result.dataset.kalecadLastRound === signature) return;
      result.dataset.kalecadLastRound = signature;
      finishConquest(Number(match[1]));
    });
    observer.observe(result, { attributes: true, attributeFilter: ["class"] });
    observer.observe(correct, { childList: true, characterData: true, subtree: true });
  }

  function init() {
    if (!renderMap()) return;
    watchResults();
    const saved = cityKey(localStorage.getItem(CAMPUS_KEY));
    if (saved) {
      const status = document.getElementById("kalecadMapStatus");
      if (status) {
        const city = cities[saved];
        status.textContent = isCaptured(saved)
          ? `${city.name} Kalesi fethedildi.`
          : `Seçili hedef: ${city.name} Kalesi`;
      }
    }
  }

  window.KALECAD_CONQUEST = {
    finish: finishConquest,
    cities,
    refresh: renderMap
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();


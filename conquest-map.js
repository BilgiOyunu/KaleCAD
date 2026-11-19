
(() => {
  "use strict";

  const STORAGE_KEY = "kalecad_conquest";
  const HOME_CAMPUS_KEY = "kalecad_home_campus";
  const TARGET_KEY = "kalecad_campus";

  const cities = {
    Istanbul: { name: "İstanbul" },
    Kocaeli: { name: "Kocaeli" },
    Sakarya: { name: "Sakarya" },
    Mugla: { name: "Muğla" }
  };

  const aliases = {
    "İstanbul": "Istanbul",
    "Istanbul": "Istanbul",
    "Kocaeli": "Kocaeli",
    "Sakarya": "Sakarya",
    "Muğla": "Mugla",
    "Mugla": "Mugla"
  };

  function readState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (_) {
      return {};
    }
  }

  function homeKey() {
    return aliases[localStorage.getItem(HOME_CAMPUS_KEY)] || null;
  }

  function targetKey() {
    return aliases[localStorage.getItem(TARGET_KEY)] || null;
  }

  function addStyles() {
    if (document.getElementById("kalecad-map-styles")) return;

    const style = document.createElement("style");
    style.id = "kalecad-map-styles";
    style.textContent = `
      #kalecadHistoricMap {
        margin:20px 0;
        padding:22px 14px;
        border-radius:24px;
        color:#fff;
        overflow:hidden;
        background:
          radial-gradient(ellipse at 50% 100%,#174c7d 0%,transparent 60%),
          linear-gradient(160deg,#06152e,#0b2850 65%,#10365e);
        border:1px solid #245582;
        box-shadow:0 12px 30px #0005;
      }

      #kalecadHistoricMap .map-heading {
        text-align:center;
        font-size:clamp(21px,5vw,30px);
        font-weight:1000;
        letter-spacing:1.5px;
        color:#f4f8ff;
        text-shadow:0 3px 12px #56baff66;
        margin:4px 0 7px;
      }

      #kalecadHistoricMap .map-subtitle {
        text-align:center;
        color:#a9d5ff;
        font-size:13px;
        margin:0 0 20px;
      }

      #kalecadHistoricMap .home-base {
        display:flex;
        align-items:center;
        justify-content:center;
        gap:10px;
        padding:12px;
        margin-bottom:17px;
        border:1px solid #3c8ebd;
        border-radius:15px;
        background:linear-gradient(110deg,#123d61,#0b2745);
        color:#d8efff;
        font-size:13px;
        font-weight:800;
      }

      #kalecadHistoricMap .home-base strong {
        color:#65d2ff;
      }

      #kalecadHistoricMap .castle-platform {
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:12px;
      }

      #kalecadHistoricMap .castle-choice {
        min-width:0;
        padding:12px 7px;
        border:1px solid #285b89;
        border-radius:19px;
        background:linear-gradient(160deg,#102f53,#071b35);
        color:white;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-between;
        gap:7px;
        cursor:pointer;
        box-shadow:0 6px 15px #0005;
      }

      #kalecadHistoricMap .castle-choice.selected {
        border:2px solid #26c5ff;
        box-shadow:0 0 18px #00aaff77,inset 0 0 18px #008cff22;
        background:linear-gradient(160deg,#104675,#082342);
      }

      #kalecadHistoricMap .castle-choice.captured {
        border:2px solid #e9b943;
        background:linear-gradient(160deg,#655020,#302b20);
        box-shadow:0 0 17px #e9b94355;
      }

      #kalecadHistoricMap .castle-art {
        display:block;
        width:100%;
        max-width:175px;
        height:auto;
      }

      #kalecadHistoricMap .castle-name {
        font-size:clamp(12px,3vw,16px);
        font-weight:1000;
        letter-spacing:.5px;
        text-align:center;
      }

      #kalecadHistoricMap .castle-status {
        width:100%;
        box-sizing:border-box;
        text-align:center;
        padding:8px 3px;
        border-radius:30px;
        background:#103c68;
        border:1px solid #2678b7;
        color:#b8dcff;
        font-size:12px;
        font-weight:900;
      }

      #kalecadHistoricMap .selected .castle-status {
        background:linear-gradient(90deg,#0878ba,#13b9ed);
        border-color:#6cddff;
        color:#fff;
      }

      #kalecadHistoricMap .captured .castle-status {
        background:linear-gradient(90deg,#886019,#d99d22);
        border-color:#ffe08a;
        color:#fff;
      }

      #kalecadMapStatus {
        text-align:center;
        color:#c5e5ff;
        font-size:13px;
        font-weight:800;
        margin:19px 0 2px;
        padding:12px 8px;
        border:1px solid #28618e;
        border-radius:30px;
        background:#061a33aa;
      }

      @media(min-width:560px) {
        #kalecadHistoricMap .castle-platform {
          grid-template-columns:repeat(3,minmax(0,1fr));
        }
      }
    `;
    document.head.appendChild(style);
  }

  function castleSVG(key, captured) {
    const color = captured ? "#f6c65a" :
      key === targetKey() ? "#55caff" : "#83bce9";

    const dark = captured ? "#95631c" : "#24699e";

    return `
      <svg class="castle-art" viewBox="0 0 180 150"
           xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="wall-${key}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${color}"/>
            <stop offset="100%" stop-color="${dark}"/>
          </linearGradient>
          <linearGradient id="tower-${key}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e1f5ff"/>
            <stop offset="100%" stop-color="${color}"/>
          </linearGradient>
        </defs>

        <g stroke="#d9f0ff" stroke-width="2.2"
           stroke-linejoin="round" stroke-linecap="round">
          <path d="M17 125V83H29V65H53V83H65V70H115V83H127V65H151V83H163V125Z"
                fill="url(#wall-${key})"/>
          <path d="M29 83V43H53V83Z" fill="url(#tower-${key})"/>
          <path d="M25 43L41 28L57 43Z" fill="${color}"/>
          <path d="M37 28V18H45V28" fill="none"/>
          <path d="M41 18V9L57 17L41 24Z" fill="#24c5ff"/>
          <path d="M127 83V43H151V83Z" fill="url(#tower-${key})"/>
          <path d="M123 43L139 28L155 43Z" fill="${color}"/>
          <path d="M135 28V18H143V28" fill="none"/>
          <path d="M65 70V29H115V70Z" fill="url(#tower-${key})"/>
          <path d="M60 29L90 5L120 29Z" fill="${color}"/>
          <path d="M86 5V-2H94V5" fill="none"/>
          <path d="M90 -2V-10L107 -2L90 5Z" fill="#24c5ff"/>
          <path d="M39 57V67M143 57V67M79 43V55M101 43V55"
                stroke="#092443" stroke-width="5"/>
          <path d="M76 125V105Q90 82 104 105V125Z"
                fill="#071a32" stroke="#b9e5ff"/>
        </g>
        <path d="M10 129H170" stroke="${color}"
              stroke-width="3" stroke-linecap="round"/>
      </svg>
    `;
  }

  function chooseCity(key) {
    const city = cities[key];
    if (!city || key === homeKey()) return;

    const button = [...document.querySelectorAll("[data-campus]")]
      .find(el => el.dataset.campus === city.name);

    if (button) {
      button.click();
    } else {
      localStorage.setItem(TARGET_KEY, city.name);
      window.dispatchEvent(new CustomEvent("kalecad:campus-selected", {
        detail: { campus: city.name }
      }));
    }

    localStorage.setItem(TARGET_KEY, city.name);
    renderMap();
  }

  function mapMarkup() {
    const state = readState();
    const home = homeKey();
    const target = targetKey();

    const availableCities = Object.entries(cities)
      .filter(([key]) => key !== home);

    return `
      <div class="map-heading">Fethedilecek Kaleler</div>
      <p class="map-subtitle">
        Ana Kampüsün Dışındaki Şehirleri Fethet!
      </p>

      <div class="home-base">
        <span>⌂</span>
        <span>Okulumun Şehri: <strong>
          ${home ? cities[home].name : "Henüz Seçilmedi"}
        </strong></span>
      </div>

      <div class="castle-platform">
        ${availableCities.map(([key, city]) => {
          const captured = !!state[key];
          const isSelected = target === key;

          return `
            <button type="button"
              class="castle-choice ${isSelected ? "selected" : ""}
                ${captured ? "captured" : ""}"
              data-castle="${key}">
              ${castleSVG(key, captured)}
              <span class="castle-name">
                ${city.name} Kalesi
              </span>
              <span class="castle-status">
                ${captured ? "★ Fethedildi" :
                  isSelected ? "✓ Hedef Seçildi" : "Kaleyi Seç"}
              </span>
            </button>
          `;
        }).join("")}
      </div>

      <div id="kalecadMapStatus" aria-live="polite">
        ${!home ? "Önce Okulunun Şehrini Seç." :
          target && target !== home ?
          "Fetih Hedefin: " + cities[target].name :
          "Fethetmek İstediğin Kaleyi Seç."}
      </div>
    `;
  }

  function renderMap() {
    const home = document.getElementById("home");
    if (!home) return false;

    addStyles();

    let panel = document.getElementById("kalecadHistoricMap");

    if (!panel) {
      panel = document.createElement("section");
      panel.id = "kalecadHistoricMap";

      const picker = document.getElementById("campusPicker");
      const hero = home.querySelector(".hero");

      if (picker) picker.after(panel);
      else if (hero) hero.after(panel);
      else home.prepend(panel);
    }

    panel.innerHTML = mapMarkup();

    panel.querySelectorAll("[data-castle]").forEach(button => {
      button.addEventListener("click", () => {
        chooseCity(button.dataset.castle);
      });
    });

    return true;
  }

  function finishConquest(correctCount) {
    const key = targetKey();

    if (!key || key === homeKey() || Number(correctCount) !== 10) {
      return false;
    }

    const state = readState();
    state[key] = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    const city = cities[key];
    const resultText = document.getElementById("resultText");

    if (resultText && !resultText.textContent.includes("CADparatoru")) {
      resultText.textContent +=
        ` ${city.name} Kalesi Fethedildi! Sen ${city.name} Kalesi'nin CADparatoru Oldun!`;
    }

    renderMap();
    return true;
  }

  function watchResults() {
    const result = document.getElementById("result");
    const correct = document.getElementById("correctCount");

    if (!result || !correct || result.dataset.kalecadObserver) return;
    result.dataset.kalecadObserver = "true";

    const check = () => {
      if (!result.classList.contains("active")) return;

      const match = correct.textContent.match(/(\d+)\s*\/\s*10/);
      if (!match) return;

      const signature =
        `${localStorage.getItem(TARGET_KEY)}:${match[0]}`;

      if (result.dataset.kalecadLastRound === signature) return;

      result.dataset.kalecadLastRound = signature;
      finishConquest(Number(match[1]));
    };

    new MutationObserver(check).observe(result, {
      attributes: true,
      attributeFilter: ["class"]
    });

    new MutationObserver(check).observe(correct, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  function init() {
    if (!renderMap()) return;
    watchResults();
  }

  window.KALECAD_CONQUEST = {
    finish: finishConquest,
    cities,
    refresh: renderMap
  };

  window.addEventListener("kalecad:home-campus-selected", renderMap);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

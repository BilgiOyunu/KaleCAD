
(() => {
  "use strict";

  const STORAGE_KEY = "kalecad_conquest";
  const CAMPUS_KEY = "kalecad_campus";

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

  const LOGO = "https://bilgioyunu.github.io/KaleCAD/logo.svg";

  function readState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (_) {
      return {};
    }
  }

  function writeState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function selectedKey() {
    return aliases[localStorage.getItem(CAMPUS_KEY)] || null;
  }

  function addStyles() {
    if (document.getElementById("kalecad-map-styles")) return;

    const style = document.createElement("style");
    style.id = "kalecad-map-styles";
    style.textContent = `
      #kalecadHistoricMap {
        margin:20px 0;
        padding:20px 12px;
        border-radius:22px;
        background:linear-gradient(145deg,#102544,#173d68);
        border:1px solid #31577e;
        color:#fff;
        box-shadow:0 10px 28px #0004;
      }
      #kalecadHistoricMap .map-heading {
        text-align:center;
        font-size:21px;
        font-weight:900;
        letter-spacing:1px;
        margin:4px 0;
      }
      #kalecadHistoricMap .map-subtitle {
        text-align:center;
        color:#b5d1ed;
        font-size:13px;
        margin:5px 0 20px;
      }
      #kalecadHistoricMap .castle-platform {
        display:grid;
        grid-template-columns:repeat(4,minmax(0,1fr));
        gap:8px;
        padding:14px 7px 11px;
        border-radius:17px;
        background:linear-gradient(180deg,#28547e,#183957);
        border-bottom:5px solid #0a2038;
      }
      #kalecadHistoricMap .castle-choice {
        min-width:0;
        padding:10px 3px;
        border:1px solid #47749b;
        border-radius:13px;
        background:linear-gradient(180deg,#315f8c,#1b4168);
        color:#fff;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:9px;
        cursor:pointer;
      }
      #kalecadHistoricMap .castle-choice.selected {
        border:2px solid #8bd4ff;
        box-shadow:0 0 14px #69bfff66;
      }
      #kalecadHistoricMap .castle-choice.captured {
        background:linear-gradient(180deg,#65532b,#3c3b35);
        border:2px solid #e9bd57;
        box-shadow:0 0 13px #e9bd5755;
      }
      #kalecadHistoricMap .castle-logo {
        display:block;
        width:100%;
        max-width:68px;
        height:64px;
        object-fit:contain;
        filter:none !important;
      }
      #kalecadHistoricMap .castle-name {
        font-size:11px;
        font-weight:900;
        text-align:center;
        overflow-wrap:anywhere;
      }
      #kalecadMapStatus {
        text-align:center;
        color:#d0e5f8;
        font-size:13px;
        font-weight:700;
        margin:15px 0 2px;
        min-height:20px;
      }
      @media(max-width:360px) {
        #kalecadHistoricMap { padding:14px 6px; }
        #kalecadHistoricMap .castle-platform { gap:5px; padding:9px 4px; }
        #kalecadHistoricMap .castle-logo { height:49px; }
        #kalecadHistoricMap .castle-name { font-size:10px; }
      }
    `;
    document.head.appendChild(style);
  }

  function chooseCity(key) {
    const city = cities[key];
    if (!city) return;

    const button = [...document.querySelectorAll("[data-campus]")]
      .find(el => el.dataset.campus === city.name);

    if (button) {
      button.click();
    } else {
      localStorage.setItem(CAMPUS_KEY, city.name);
      window.dispatchEvent(new CustomEvent("kalecad:campus-selected", {
        detail: { campus: city.name }
      }));
      const start = document.getElementById("start");
      if (start) {
        start.disabled = false;
        start.removeAttribute("aria-disabled");
      }
    }

    localStorage.setItem(CAMPUS_KEY, city.name);
    renderMap();
  }

  function mapMarkup() {
    const state = readState();
    const selected = selectedKey();

    return `
      <div class="map-heading">KALECAD KALELERİ</div>
      <p class="map-subtitle">Bir kale seç, 10 soruyu doğru yanıtla ve fethet!</p>
      <div class="castle-platform">
        ${Object.entries(cities).map(([key, city]) => `
          <button type="button"
            class="castle-choice
              ${selected === key ? "selected" : ""}
              ${state[key] ? "captured" : ""}"
            data-castle="${key}">
            <img class="castle-logo"
              src="${LOGO}"
              alt="KaleCAD logosu"
              onerror="this.style.display='none'">
            <span class="castle-name">${city.name}</span>
          </button>
        `).join("")}
      </div>
      <div id="kalecadMapStatus" aria-live="polite">
        ${selected ? cities[selected].name + " seçildi." : "Bir kale seçerek başla."}
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
    const key = selectedKey();
    if (Number(correctCount) !== 10 || !key) return false;

    const state = readState();
    state[key] = true;
    writeState(state);

    const city = cities[key];
    const resultText = document.getElementById("resultText");

    if (resultText && !resultText.textContent.includes("CADparatoru")) {
      resultText.textContent +=
        ` ${city.name} Kalesi fethedildi! Sen ${city.name} Kalesi'nin CADparatoru oldun!`;
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

      const signature = `${localStorage.getItem(CAMPUS_KEY)}:${match[0]}`;
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();


(() => {
  const STORAGE_KEY = "kalecad_conquest";
  const CAMPUS_KEY = "kalecad_campus";

  const cities = {
    istanbul: { name: "İstanbul" },
    kocaeli: { name: "Kocaeli" },
    sakarya: { name: "Sakarya" },
    mugla: { name: "Muğla" }
  };

  function readState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function writeState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function addStyles() {
    if (document.getElementById("kalecadCastleStyles")) return;

    const style = document.createElement("style");
    style.id = "kalecadCastleStyles";
    style.textContent = `
      #kalecadHistoricMap {
        margin: 22px auto;
        padding: 20px 12px;
        width: 100%;
        box-sizing: border-box;
        border-radius: 22px;
        background: linear-gradient(145deg,#102544,#173c66);
        border: 1px solid #31577e;
        color: white;
        box-shadow: 0 12px 30px #07182d55;
      }
      #kalecadHistoricMap .castleTitle {
        text-align:center;
        font-size:20px;
        font-weight:900;
        letter-spacing:1px;
        margin-bottom:5px;
      }
      #kalecadHistoricMap .castleSubtitle {
        text-align:center;
        color:#a9c9e8;
        font-size:12px;
        margin-bottom:20px;
      }
      #kalecadHistoricMap .castlePlatform {
        display:grid;
        grid-template-columns:repeat(4,minmax(0,1fr));
        gap:8px;
        padding:13px 7px 10px;
        border-radius:17px;
        background:linear-gradient(180deg,#244d78,#173657);
        border-bottom:5px solid #0b2038;
      }
      #kalecadHistoricMap .castleChoice {
        min-width:0;
        padding:10px 3px;
        border:1px solid #47729a;
        border-radius:13px;
        background:linear-gradient(180deg,#315d88,#1c4168);
        color:white;
        cursor:pointer;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:9px;
        transition:.2s;
      }
      #kalecadHistoricMap .castleChoice:active {
        transform:scale(.96);
      }
      #kalecadHistoricMap .castleChoice.selected {
        border:2px solid #8bd4ff;
        background:linear-gradient(180deg,#3975a8,#214d78);
        box-shadow:0 0 15px #67bfff55;
      }
      #kalecadHistoricMap .castleChoice.captured {
        border-color:#e9bd57;
        background:linear-gradient(180deg,#66552d,#3b3b35);
      }
      #kalecadHistoricMap .castleLogo {
        width:100%;
        max-width:65px;
        height:62px;
        object-fit:contain;
        filter:brightness(0) invert(1);
      }
      #kalecadHistoricMap .captured .castleLogo {
        filter:brightness(0) saturate(100%) invert(78%) sepia(56%) saturate(520%) hue-rotate(3deg);
      }
      #kalecadHistoricMap .castleName {
        font-size:11px;
        font-weight:800;
        text-align:center;
        overflow-wrap:anywhere;
      }
      #kalecadMapStatus {
        text-align:center;
        color:#c5ddf4;
        font-size:12px;
        margin-top:15px;
        min-height:18px;
      }
      @media(max-width:360px) {
        #kalecadHistoricMap { padding:15px 7px; }
        #kalecadHistoricMap .castlePlatform { gap:5px; padding:9px 4px; }
        #kalecadHistoricMap .castleLogo { height:48px; }
        #kalecadHistoricMap .castleName { font-size:10px; }
      }
    `;
    document.head.appendChild(style);
  }

  function chooseCity(key) {
    const city = cities[key];
    if (!city) return;

    const campusButton = [...document.querySelectorAll("[data-campus]")]
      .find(button => button.dataset.campus === city.name);

    if (campusButton) {
      campusButton.click();
    } else {
      localStorage.setItem(CAMPUS_KEY, city.name);
      document.dispatchEvent(new CustomEvent("kalecad:campus-selected", {
        detail: { campus: city.name }
      }));

      const start = document.getElementById("start");
      if (start) start.disabled = false;
    }

    localStorage.setItem(CAMPUS_KEY, city.name);
    renderMap();
  }

  function mapMarkup() {
    const state = readState();
    const selected = localStorage.getItem(CAMPUS_KEY);

    return `
      <div class="castleTitle">KALELERİ FETHET</div>
      <div class="castleSubtitle">Bir kale seç ve CADparatorluğunu kur!</div>
      <div class="castlePlatform">
        ${Object.entries(cities).map(([key, city]) => `
          <button class="castleChoice
            ${selected === city.name ? "selected" : ""}
            ${state[key] ? "captured" : ""}"
            data-castle="${key}" type="button">
            <img class="castleLogo" src="./logo.svg" alt="KaleCAD kalesi">
            <span class="castleName">${city.name}</span>
          </button>
        `).join("")}
      </div>
      <div id="kalecadMapStatus">
        ${selected ? selected + " seçildi." : "Devam etmek için bir kale seç."}
      </div>
    `;
  }

  function renderMap() {
    const home = document.getElementById("home");
    if (!home) return;

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
  }

  function finishConquest(correctCount) {
    const selected = localStorage.getItem(CAMPUS_KEY);
    const entry = Object.entries(cities).find(([, city]) => city.name === selected);

    if (correctCount === 10 && entry) {
      const [key, city] = entry;
      const state = readState();
      state[key] = true;
      writeState(state);

      const resultText = document.getElementById("resultText");
      if (resultText && !resultText.textContent.includes("CADparatoru")) {
        resultText.textContent +=
          ` ${city.name} Kalesi fethedildi! Sen ${city.name} Kalesi'nin CADparatoru oldun!`;
      }
    }

    renderMap();
    return true;
  }

  function watchResults() {
    const result = document.getElementById("result");
    const correct = document.getElementById("correctCount");

    if (!result || !correct || result.dataset.kalecadWatching) return;

    result.dataset.kalecadWatching = "true";

    const check = () => {
      if (!result.classList.contains("active")) return;

      const match = correct.textContent.match(/(\d+)\s*\/\s*10/);
      if (!match) return;

      const round = result.dataset.kalecadLastRound;
      const current = match[1] + "-" + Date.now();

      if (round && result.dataset.kalecadDone === "true") return;

      result.dataset.kalecadLastRound = current;
      result.dataset.kalecadDone = "true";
      finishConquest(Number(match[1]));
    };

    new MutationObserver(() => {
      if (!result.classList.contains("active")) {
        result.dataset.kalecadDone = "false";
      }
      check();
    }).observe(result, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true
    });

    new MutationObserver(check).observe(correct, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  function init() {
    renderMap();
    watchResults();

    const selected = localStorage.getItem(CAMPUS_KEY);
    if (selected) renderMap();
  }

  window.KALECAD_CONQUEST = {
    finish: finishConquest,
    cities,
    refresh: renderMap
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


(() => {
  "use strict";

  const STORAGE_KEY = "kalecad_conquest";
  const CAMPUS_KEY = "kalecad_campus";

  const cities = {
    Istanbul: {
      name: "İstanbul",
      lat: 41.0082,
      lng: 28.9784
    },
    Kocaeli: {
      name: "Kocaeli",
      lat: 40.7654,
      lng: 29.9408
    },
    Sakarya: {
      name: "Sakarya",
      lat: 40.7731,
      lng: 30.3948
    },
    Mugla: {
      name: "Muğla",
      lat: 37.2153,
      lng: 28.3636
    }
  };

  const aliases = {
    "İstanbul": "Istanbul",
    "Istanbul": "Istanbul",
    "Kocaeli": "Kocaeli",
    "Sakarya": "Sakarya",
    "Muğla": "Mugla",
    "Mugla": "Mugla"
  };

  let mapInstance = null;
  let markerLayer = null;
  let leafletPromise = null;

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
        margin: 20px 0;
        padding: 14px;
        border: 1px solid #a98b5b;
        border-radius: 18px;
        color: #49351f;
        background:
          radial-gradient(ellipse at top left,#fff3d6,transparent 65%),
          linear-gradient(145deg,#ead9b5,#c5a675);
        box-shadow: 0 9px 25px #0004;
      }

      #kalecadHistoricMap .map-heading {
        text-align:center;
        font-size:1.15rem;
        font-weight:900;
        letter-spacing:.04em;
        color:#493018;
        margin:3px 0 5px;
      }

      #kalecadHistoricMap .map-subtitle {
        text-align:center;
        font-size:.83rem;
        color:#715334;
        margin:0 0 12px;
      }

      #kalecadRealMap {
        width:100%;
        height:420px;
        border:2px solid #8b693e;
        border-radius:13px;
        overflow:hidden;
        background:#c2d5d1;
        box-shadow:inset 0 0 15px #0004;
        z-index:1;
      }

      #kalecadHistoricMap .map-legend {
        display:flex;
        justify-content:center;
        flex-wrap:wrap;
        gap:15px;
        margin:12px 0 5px;
        font-size:.78rem;
        font-weight:800;
        color:#51391f;
      }

      #kalecadHistoricMap .legend-dot {
        display:inline-block;
        width:11px;
        height:11px;
        margin-right:5px;
        border-radius:50%;
        vertical-align:-1px;
      }

      #kalecadMapStatus {
        min-height:24px;
        margin:10px 0 2px;
        text-align:center;
        color:#493018;
        font-size:.88rem;
        font-weight:800;
      }

      .kalecad-castle-icon {
        display:flex;
        align-items:center;
        justify-content:center;
        width:38px;
        height:38px;
        border:2px solid #665039;
        border-radius:50%;
        background:#e4d1a9;
        box-shadow:0 3px 9px #0006;
        font-size:23px;
        transition:transform .2s;
      }

      .kalecad-castle-icon.captured {
        background:#f5d47c;
        border-color:#a36b14;
        box-shadow:0 0 13px 5px #f6c64b;
      }

      .kalecad-castle-icon:hover {
        transform:scale(1.15);
      }

      .kalecad-map-label {
        background:#f4e5c5;
        color:#493018;
        border:1px solid #8b693e;
        border-radius:6px;
        padding:3px 7px;
        font-weight:900;
        font-size:12px;
        box-shadow:0 2px 5px #0004;
      }

      .kalecad-map-label:before {
        display:none;
      }

      @media(max-width:480px) {
        #kalecadHistoricMap { padding:9px; }
        #kalecadRealMap { height:360px; }
      }
    `;

    document.head.appendChild(style);
  }

  function loadLeaflet() {
    if (window.L) return Promise.resolve(window.L);
    if (leafletPromise) return leafletPromise;

    leafletPromise = new Promise((resolve, reject) => {
      if (!document.getElementById("kalecad-leaflet-css")) {
        const css = document.createElement("link");
        css.id = "kalecad-leaflet-css";
        css.rel = "stylesheet";
        css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(css);
      }

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => resolve(window.L);
      script.onerror = () => reject(
        new Error("Harita kütüphanesi yüklenemedi.")
      );
      document.head.appendChild(script);
    });

    return leafletPromise;
  }

  function castleIcon(key) {
    const won = isCaptured(key);

    return L.divIcon({
      className: "",
      html: `<div class="kalecad-castle-icon ${won ? "captured" : ""}">🏰</div>`,
      iconSize: [38, 38],
      iconAnchor: [19, 19]
    });
  }

  function chooseCity(key) {
    const city = cities[key];
    if (!city) return;

    const campusButton = document.querySelector(
      `[data-campus="${city.name}"]`
    );

    if (campusButton) {
      campusButton.click();
    } else {
      try {
        localStorage.setItem(CAMPUS_KEY, city.name);
      } catch (_) {}

      window.dispatchEvent(
        new CustomEvent("kalecad:campus-selected", {
          detail: { campus: city.name }
        })
      );

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

  function mapMarkup() {
    return `
      <div class="map-heading">⚔ KALECAD FETİH HARİTASI</div>

      <p class="map-subtitle">
        Gerçek coğrafya üzerinde dört kaleli mücadele
      </p>

      <div id="kalecadRealMap"
        role="application"
        aria-label="Türkiye fetih haritası"></div>

      <div class="map-legend">
        <span>
          <i class="legend-dot" style="background:#73777a"></i>
          Fethedilmedi
        </span>
        <span>
          <i class="legend-dot" style="background:#e8b94e"></i>
          Fethedildi
        </span>
      </div>

      <p id="kalecadMapStatus" aria-live="polite">
        Haritadan bir kale seç.
      </p>
    `;
  }

  async function buildRealMap() {
    const container = document.getElementById("kalecadRealMap");
    if (!container) return;

    try {
      const L = await loadLeaflet();

      if (!document.getElementById("kalecadRealMap")) return;

      if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
      }

      mapInstance = L.map("kalecadRealMap", {
        zoomControl: true,
        scrollWheelZoom: false
      });

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> katkıcıları',
          maxZoom: 19
        }
      ).addTo(mapInstance);

      markerLayer = L.layerGroup().addTo(mapInstance);

      Object.entries(cities).forEach(([key, city]) => {
        const marker = L.marker(
          [city.lat, city.lng],
          { icon: castleIcon(key) }
        ).addTo(markerLayer);

        marker.bindTooltip(
          `${city.name} Kalesi`,
          {
            permanent: true,
            direction: "bottom",
            offset: [0, 13],
            className: "kalecad-map-label"
          }
        );

        marker.on("click", () => chooseCity(key));
      });

      const bounds = L.latLngBounds(
        Object.values(cities).map(city => [city.lat, city.lng])
      );

      mapInstance.fitBounds(bounds, {
        padding: [40, 40],
        maxZoom: 7
      });

      setTimeout(() => {
        if (mapInstance) mapInstance.invalidateSize();
      }, 250);

      updateStatus();

    } catch (error) {
      const status = document.getElementById("kalecadMapStatus");
      if (status) {
        status.textContent =
          "Harita yüklenemedi. İnternet bağlantını kontrol edip sayfayı yenile.";
      }
    }
  }

  function updateStatus() {
    const saved = cityKey(localStorage.getItem(CAMPUS_KEY));
    const status = document.getElementById("kalecadMapStatus");

    if (!status) return;

    if (saved) {
      const city = cities[saved];
      status.textContent = isCaptured(saved)
        ? `${city.name} Kalesi daha önce fethedildi.`
        : `Seçili hedef: ${city.name} Kalesi`;
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
      panel.setAttribute("aria-label", "Gerçek Türkiye fetih haritası");

      const picker = document.getElementById("campusPicker");
      const hero = home.querySelector(".hero");

      if (picker) picker.after(panel);
      else if (hero) hero.after(panel);
      else home.prepend(panel);
    }

    panel.innerHTML = mapMarkup();

    buildRealMap();
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

    if (
      resultText &&
      !resultText.textContent.includes("CADparatoru")
    ) {
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

    const observer = new MutationObserver(() => {
      if (!result.classList.contains("active")) return;

      const match = correct.textContent.match(/(\d+)\s*\/\s*10/);
      if (!match) return;

      const signature =
        `${localStorage.getItem(CAMPUS_KEY)}:${match[0]}`;

      if (result.dataset.kalecadLastRound === signature) return;

      result.dataset.kalecadLastRound = signature;
      finishConquest(Number(match[1]));
    });

    observer.observe(result, {
      attributes: true,
      attributeFilter: ["class"]
    });

    observer.observe(correct, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  function init() {
    if (!renderMap()) return;
    watchResults();
    updateStatus();
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


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

      <p class="map-subtitle">
        Bir kale seç, 10 soruyu doğru yanıtla ve kaleni fethet.
      </p>

      <svg viewBox="0 0 420 330"
        role="img"
        aria-label="Dört kaleli tarihî Türkiye haritası">

        <defs>
          <linearGradient id="kalecadLand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#f1dfb9"/>
            <stop offset="1" stop-color="#b9955d"/>
          </linearGradient>

          <filter id="kalecadGoldGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <pattern id="kalecadPaper"
            width="24" height="24"
            patternUnits="userSpaceOnUse">
            <path d="M0 12h24M12 0v24"
              stroke="#8b693e"
              stroke-opacity=".12"
              stroke-width=".6"/>
            <circle cx="4" cy="5" r=".8"
              fill="#79552e" opacity=".18"/>
          </pattern>
        </defs>

        <rect width="420" height="330" fill="#d9c18e"/>
        <rect width="420" height="330" fill="url(#kalecadPaper)"/>

        <path d="M24 93l18-14 23 5 17-13 25 7 18-14 22 8 18-12 22 10 19-8 20 13 23-6 18 13 22-2 19 16 22 1 15 18 22 8-4 17-18 8-10 17-20-3-17 14-22-4-15 16-22-6-16 17-21-7-17 13-20-8-17 13-20-7-16 11-18-11-16 4-13-17-17-4 4-17-13-13 8-17-8-15z"
          fill="url(#kalecadLand)"
          stroke="#76552e"
          stroke-width="2.2"
          stroke-linejoin="round"/>

        <path d="M33 105c55-28 94-20 130-15s82 5 123 24 71 29 94 24M51 178c63-12 110-5 151 7s87 17 147 1M91 252c34-13 68-14 100-4"
          fill="none"
          stroke="#8d6b3d"
          stroke-width="1.2"
          stroke-dasharray="4 5"
          opacity=".55"/>

        <path d="M28 286q55-22 105 0t105 0 105 0 55 0"
          fill="none"
          stroke="#6b9ba0"
          stroke-width="2"
          opacity=".7"/>

        <text x="316" y="299" font-size="10"
          fill="#456b70" font-style="italic">Akdeniz</text>

        <text x="31" y="35" font-size="12"
          fill="#684b29" font-weight="800

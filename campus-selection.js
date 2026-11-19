
(() => {
  "use strict";

  const campuses = ["İstanbul", "Kocaeli", "Sakarya", "Muğla"];
  const HOME_CAMPUS_KEY = "kalecad_home_campus";

  function schoolIcon() {
    return `
      <svg viewBox="0 0 100 85" width="66" height="58"
        aria-hidden="true">
        <defs>
          <linearGradient id="schoolGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#9be2ff"/>
            <stop offset="100%" stop-color="#2585c5"/>
          </linearGradient>
        </defs>
        <path d="M8 35L50 7L92 35" fill="none"
          stroke="url(#schoolGold)" stroke-width="7"
          stroke-linejoin="round"/>
        <path d="M17 37H83V75H17Z" fill="#17436b"
          stroke="#79c9f5" stroke-width="3"/>
        <path d="M37 75V51Q50 35 63 51V75Z" fill="#071a32"
          stroke="#9be2ff" stroke-width="3"/>
        <path d="M27 44V54M73 44V54" stroke="#9be2ff"
          stroke-width="5" stroke-linecap="round"/>
        <path d="M10 78H90" stroke="#e9bd57" stroke-width="5"
          stroke-linecap="round"/>
      </svg>`;
  }

  function installCampusPicker() {
    const home = document.getElementById("home");
    const start = document.getElementById("start");

    if (!home || !start || document.getElementById("campusPicker")) return;

    const picker = document.createElement("section");
    picker.id = "campusPicker";
    picker.className = "setting-card";

    picker.innerHTML = `
      <div class="campus-title">
        ${schoolIcon()}
        <div>
          <h2 class="setting-title">Okulumun Şehri</h2>
          <p class="summary">Öğrenim Gördüğün Okulun Bulunduğu Şehri Seç.</p>
        </div>
      </div>

      <div class="campus-options" role="group"
        aria-label="Okul Şehri Seçimi">
        ${campuses.map(name => `
          <button type="button" class="campus-option"
            data-home-campus="${name}" aria-pressed="false">
            <span class="campus-symbol">⌂</span>
            <span>${name}</span>
          </button>
        `).join("")}
      </div>

      <p id="campusStatus" class="summary" aria-live="polite">
        Devam Etmek İçin Okulunun Şehrini Seç.
      </p>
    `;

    const style = document.createElement("style");
    style.id = "kalecad-campus-styles";
    style.textContent = `
      #campusPicker {
        padding:17px;
        border-radius:20px;
        background:linear-gradient(145deg,#102c4c,#081a32);
        border:1px solid #315d83;
        color:#fff;
        margin:18px 0;
      }

      #campusPicker .campus-title {
        display:flex;
        align-items:center;
        gap:12px;
        margin-bottom:16px;
      }

      #campusPicker .setting-title {
        color:#fff;
        font-size:19px;
        font-weight:900;
        margin:0 0 5px;
      }

      #campusPicker .summary {
        color:#b8d7f0;
        font-size:12px;
        margin:5px 0;
      }

      #campusPicker .campus-options {
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:9px;
      }

      #campusPicker .campus-option {
        display:flex;
        align-items:center;
        justify-content:flex-start;
        gap:9px;
        padding:13px 10px;
        border-radius:13px;
        border:1px solid #37658e;
        background:#153858;
        color:#fff;
        font-size:14px;
        font-weight:800;
        cursor:pointer;
      }

      #campusPicker .campus-option.selected {
        border:2px solid #51caff;
        background:linear-gradient(120deg,#145a88,#087db5);
        box-shadow:0 0 13px #31baff55;
      }

      #campusPicker .campus-symbol {
        font-size:22px;
        color:#9be2ff;
      }

      #campusPicker #campusStatus {
        text-align:center;
        margin-top:14px;
        font-weight:800;
      }
    `;

    if (!document.getElementById("kalecad-campus-styles")) {
      document.head.appendChild(style);
    }

    const hero = home.querySelector(".hero");
    if (hero) hero.after(picker);
    else home.prepend(picker);

    function selectHomeCampus(name) {
      if (!campuses.includes(name)) return;

      localStorage.setItem(HOME_CAMPUS_KEY, name);

      picker.querySelectorAll("[data-home-campus]").forEach(button => {
        const selected = button.dataset.homeCampus === name;
        button.classList.toggle("selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      });

      document.getElementById("campusStatus").textContent =
        `Ana Kampüsün: ${name}`;

      start.disabled = false;
      start.removeAttribute("aria-disabled");

      window.dispatchEvent(new CustomEvent("kalecad:home-campus-selected", {
        detail: { campus: name }
      }));

      if (window.KALECAD_CONQUEST) {
        window.KALECAD_CONQUEST.refresh();
      }
    }

    picker.querySelectorAll("[data-home-campus]").forEach(button => {
      button.addEventListener("click", () => {
        selectHomeCampus(button.dataset.homeCampus);
      });
    });

    const saved = localStorage.getItem(HOME_CAMPUS_KEY);

    if (campuses.includes(saved)) {
      selectHomeCampus(saved);
    } else {
      start.disabled = true;
      start.setAttribute("aria-disabled", "true");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installCampusPicker);
  } else {
    installCampusPicker();
  }
})();

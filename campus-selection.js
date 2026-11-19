(() => {
  const campuses = ["İstanbul", "Kocaeli", "Sakarya", "Muğla"];
  const campusKey = "kalecad_campus";
  function installCampusPicker() {
    const home = document.getElementById("home");
    const start = document.getElementById("start");
    if (!home || !start || document.getElementById("campusPicker")) return;
    const picker = document.createElement("section");
    picker.id = "campusPicker";
    picker.className = "setting-card";
    picker.style.cssText = "margin:18px 0";
    picker.innerHTML = ` <h2 class="setting-title">🏫 <span>Kampüsünü seç</span></h2> <p class="summary">Mücadele edeceğin kaleyi seç. Her turda 10 sorunun tamamını doğru yanıtlayarak kaleni fethet.</p> <div class="inline-options" role="group" aria-label="Kampüs seçimi"> ${campuses .map( (name) => `<button type="button" class="option" data-campus="${name}" aria-pressed="false">${name} Kalesi</button>` ) .join("")} </div> <p id="campusStatus" class="summary" aria-live="polite"></p>`;
    home.querySelector(".hero")?.after(picker);
    const selectCampus = (name) => {
      localStorage.setItem(campusKey, name);
      picker.querySelectorAll("[data-campus]").forEach((button) => {
        const selected = button.dataset.campus === name;
        button.classList.toggle("selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      document.getElementById(
        "campusStatus"
      ).textContent = `Seçilen hedef: ${name} Kalesi`;
      start.disabled = false;
      start.removeAttribute("aria-disabled");
      window.dispatchEvent(
        new CustomEvent("kalecad:campus-selected", { detail: { campus: name } })
      );
    };
    picker
      .querySelectorAll("[data-campus]")
      .forEach((button) =>
        button.addEventListener("click", () =>
          selectCampus(button.dataset.campus)
        )
      );
    const saved = localStorage.getItem(campusKey);
    if (campuses.includes(saved)) selectCampus(saved);
    else {
      start.disabled = true;
      start.setAttribute("aria-disabled", "true");
      document.getElementById("campusStatus").textContent =
        "Devam etmek için bir kale seç.";
    }
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", installCampusPicker);
  else installCampusPicker();
})();

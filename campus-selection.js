(() => {
  const campuses = ['İstanbul', 'Kocaeli', 'Sakarya', 'Muğla'];
  const campusKey = 'kalecad_campus';
  const scoreKey = 'kalecad_campus_scores';
  const loadScores = () => {
    try { return JSON.parse(localStorage.getItem(scoreKey) || '{}'); }
    catch { return {}; }
  };

  function installCampusPicker() {
    const home = document.getElementById('home');
    const start = document.getElementById('start');
    if (!home || !start || document.getElementById('campusPicker')) return;

    const picker = document.createElement('section');
    picker.id = 'campusPicker';
    picker.className = 'setting-card';
    picker.setAttribute('aria-labelledby', 'campusTitle');
    picker.style.margin = '18px 0';
    picker.innerHTML = `
      <h2 class="setting-title" id="campusTitle">🏫 <span>Kampüsünü seç</span></h2>
      <p class="summary">Oyuna başlamak için kampüs seçmelisin. Seçimin bu cihazda saklanır.</p>
      <div class="inline-options" role="group" aria-label="Kampüs seçimi">
        ${campuses.map(name => `<button type="button" class="option" data-campus="${name}" aria-pressed="false">${name}</button>`).join('')}
      </div>
      <p id="campusStatus" class="summary" aria-live="polite"></p>
      <div id="campusScores" class="summary"></div>`;
    home.querySelector('.hero')?.after(picker);

    const showScores = () => {
      const scores = loadScores();
      const sorted = campuses
        .map(name => [name, Number(scores[name]) || 0])
        .sort((a, b) => b[1] - a[1]);
      document.getElementById('campusScores').innerHTML =
        `<strong>Kampüs rekor tablosu (bu cihaz)</strong><br>${sorted.map(([name, score], i) => `${i + 1}. ${name}: ${score} puan`).join('<br>')}`;
    };

    const selectCampus = name => {
      localStorage.setItem(campusKey, name);
      picker.querySelectorAll('[data-campus]').forEach(button => {
        const selected = button.dataset.campus === name;
        button.classList.toggle('selected', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      document.getElementById('campusStatus').textContent = `Seçilen kampüs: ${name}`;
      start.disabled = false;
      start.removeAttribute('aria-disabled');
    };

    picker.querySelectorAll('[data-campus]').forEach(button => {
      button.addEventListener('click', () => selectCampus(button.dataset.campus));
    });

    const savedCampus = localStorage.getItem(campusKey);
    if (campuses.includes(savedCampus)) selectCampus(savedCampus);
    else {
      start.disabled = true;
      start.setAttribute('aria-disabled', 'true');
      document.getElementById('campusStatus').textContent = 'Devam etmek için bir kampüs seç.';
    }
    showScores();

    const resultObserver = new MutationObserver(() => {
      const campus = localStorage.getItem(campusKey);
      const scoreElement = document.getElementById('roundScore');
      if (!campuses.includes(campus) || !scoreElement) return;
      const score = Number(scoreElement.textContent) || 0;
      const scores = loadScores();
      scores[campus] = Math.max(Number(scores[campus]) || 0, score);
      localStorage.setItem(scoreKey, JSON.stringify(scores));
      showScores();
    });
    const result = document.getElementById('result');
    if (result) resultObserver.observe(result, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installCampusPicker);
  else installCampusPicker();
})();

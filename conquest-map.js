(() => {
  const STORAGE_KEY = 'kalecad_conquest';
  const CAMPUS_KEY = 'kalecad_campus';
  const cities = {
    Istanbul: {name:'İstanbul', color:'#64d9ff', path:'M225 62 C211 52 194 57 184 68 C174 80 177 96 191 103 C205 109 220 101 225 88 C230 77 232 68 225 62Z', label:[205,79]},
    Kocaeli: {name:'Kocaeli', color:'#83d6b1', path:'M225 62 C242 50 267 52 281 66 C290 77 284 91 270 98 C253 105 233 98 225 88Z', label:[251,78]},
    Sakarya: {name:'Sakarya', color:'#f5d66f', path:'M230 88 C242 103 261 108 278 101 C295 94 304 106 298 123 C287 145 258 145 237 130 C224 121 218 103 230 88Z', label:[257,119]},
    Mugla: {name:'Muğla', color:'#ff918c', path:'M188 160 C221 148 262 151 301 171 C322 182 330 208 317 229 C300 257 258 274 218 260 C184 248 158 223 164 195 C168 178 176 168 188 160Z', label:[242,211]}
  };

  const loadState = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; } };
  const saveState = state => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  function injectMap() {
    const home = document.getElementById('home');
    if (!home || document.getElementById('conquestMap')) return;

    const selectedName = localStorage.getItem(CAMPUS_KEY);
    const state = loadState();

    const card = document.createElement('section');
    card.id = 'conquestMap';
    card.className = 'setting-card';
    card.style.cssText = 'margin:18px 0;overflow:hidden';

    card.innerHTML = `
      <h2 class="setting-title">🗺️ <span>Şehrini Fethet</span><span class="setting-caption">Haritadan bir şehir seç</span></h2>
      <p class="summary" id="conquestStatus">Turda tüm 10 soruyu doğru biliyorsan seçtiğin şehri feth edersin.</p>
      <svg id="territoryMap" viewBox="0 0 430 300" role="img" aria-label="İstanbul, Kocaeli, Sakarya ve Muğla Türkiye idari harita muadili" style="width:100%;max-height:330px;display:block;border-radius:14px;background:#091a3d">
        <g stroke="#07163c" stroke-width="5" stroke-linejoin="round">
          ${Object.entries(cities).map(([key, city]) => `<path id="territory-${key}" d="${city.path}" fill="${state[key] ? city.color : '#243a63'}" data-city="${key}" tabindex="0" role="button" aria-label="${city.name}" style="cursor:pointer"/>`).join('')}
        </g>
        ${Object.entries(cities).map(([key, city]) => `<g pointer-events="none"><circle cx="${city.label[0]}" cy="${city.label[1]}" r="17" fill="${state[key] ? city.color : '#ffffff26'}"/><text x="${city.label[0]}" y="${city.label[1]+5}" text-anchor="middle" fill="#07163c" font-size="12" font-weight="900">${state[key] ? '✓' : city.name.slice(0,3).toUpperCase()}</text></g>`).join('')}
      </svg>
      <div id="conquestList" class="summary" style="margin-top:12px"></div>`;

    const parent = home.querySelector('.settings') || home.querySelector('.hero')?.nextSibling;
    if (parent) parent.before(card); else home.appendChild(card);

    const sync = () => {
      const selected = localStorage.getItem(CAMPUS_KEY);
      document.querySelectorAll('#territoryMap [data-city]').forEach(path => {
        const key = path.dataset.city;
        path.style.opacity = selected === key ? '1' : '.72';
        path.style.filter = selected === key ? 'drop-shadow(0 0 10px #64d9ff)' : 'none';
        path.setAttribute('aria-pressed', String(selected === key));
      });
      const captured = Object.keys(cities).filter(key => state[key]);
      document.getElementById('conquestList').innerHTML = captured.length
        ? `<strong>Fethedilen şehirler</strong><br>${captured.map(key => `🏆 ${cities[key].name}`).join('<br>')}`
        : '<strong>Henüz fethedilen şehir yok.</strong><br>Bir şehir seç ve 10 soruyu da doğru tamamla.';
      if (selected && cities[selected]) document.getElementById('conquestStatus').textContent = `Hedefin: ${cities[selected].name} — 10/10 doğru yaparak feth et.`;
    };

    const select = key => {
      localStorage.setItem(CAMPUS_KEY, key);
      document.querySelectorAll('[data-campus]').forEach(button => {
        const match = button.dataset.campus === key;
        button.classList.toggle('selected', match);
        button.setAttribute('aria-pressed', String(match));
      });
      sync();
    };

    card.querySelectorAll('[data-city]').forEach(path => {
      path.addEventListener('click', () => select(path.dataset.city));
      path.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventEventDefault(); select(path.dataset.city); } });
    });

    sync();
  }

  function finishConquest(correctCount) {
    if (correctCount !== 10) return;
    const selected = localStorage.getItem(CAMPUS_KEY);
    if (!selected || !cities[selected]) return;
    const state = loadState();
    if (state[selected]) return;
    state[selected] = {capturedAt:new Date().toISOString(), count:(state[selected]?.count || 0)+1};
    saveState(state);
    const path = document.getElementById(`territory-${selected}`);
    if (path) path.setAttribute('fill', cities[selected].color);
    const status = document.getElementById('resultText');
    if (status) status.textContent += ` ${cities[selected].name} fethedildi — 10/10 tamamlandı!`;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectMap);
  else injectMap();

  window.KALECAD_CONQUEST = {finish:finishConquest, cities};
})();

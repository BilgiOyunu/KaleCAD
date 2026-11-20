
/* KALECAD KITAPLIK V1 */
(() => {
'use strict';

if (window.KALECAD_KITAPLIK_V1) return;
window.KALECAD_KITAPLIK_V1 = true;

const books = [
{title:'Mimarlıkta Teknik Resim',category:'Teknik Çizim',desc:'Mimari çizim, plan, kesit ve görünüş çalışmalarına yönelik kaynak.',level:'Başlangıç ve orta seviye',color:'#D9E5F2',mark:'ÇİZİM'},
{title:'İç Mimarlıkta Malzeme ve Detay',category:'İç Mimarlık',desc:'İç mekân malzemelerini ve uygulama detaylarını tanımak için.',level:'Orta seviye',color:'#E9DCCB',mark:'MALZEME'},
{title:'Eskizler',category:'Tasarım',desc:'Çizerek düşünme, fikir geliştirme ve tasarım anlatımı üzerine.',level:'Tüm seviyeler',color:'#E7D9D2',mark:'ESKİZ'},
{title:'Rölöve',category:'Teknik Çizim',desc:'Mevcut yapıların ölçülmesi, belgelenmesi ve çizime aktarılması.',level:'Orta seviye',color:'#DCE7D8',mark:'RÖLÖVE'},
{title:'Temel Tasarım',category:'Tasarım',desc:'Tasarım ilkeleri, kompozisyon, biçim, renk ve düzen üzerine.',level:'Başlangıç',color:'#E8E0F1',mark:'TASARIM'},
{title:'Yapı ve Malzeme',category:'İnşaat',desc:'Yapı malzemelerini ve yapıdaki kullanım alanlarını tanımaya yönelik.',level:'Başlangıç ve orta seviye',color:'#E7E0D2',mark:'YAPI'},
{title:'Mimarlık Tarihi',category:'Mimarlık',desc:'Mimarlığın tarihsel gelişimini ve önemli yapı örneklerini keşfet.',level:'Tüm seviyeler',color:'#E8D8C7',mark:'MİMARLIK'},
{title:'Mekân Tasarımı',category:'İç Mimarlık',desc:'İç mekân organizasyonu, işlev, dolaşım ve tasarım ilişkisi.',level:'Orta seviye',color:'#D9E4E8',mark:'MEKÂN'},
{title:'Yapı Detayları',category:'İnşaat',desc:'Yapı elemanları ve uygulama detaylarını incelemek için.',level:'Orta seviye',color:'#E5E2D7',mark:'DETAY'},
{title:'Dijital Tasarım',category:'Dijital Tasarım',desc:'Bilgisayar destekli tasarım ve üç boyutlu düşünme üzerine.',level:'Başlangıç',color:'#DDE1F0',mark:'DİJİTAL'}
];

const categories = ['Tümü','Mimarlık','İç Mimarlık','İnşaat','Teknik Çizim','Tasarım','Dijital Tasarım'];

const style = document.createElement('style');
style.textContent = `
#kaleKitapBtn{position:fixed;right:15px;bottom:126px;z-index:99990;width:190px;height:46px;border:0;border-radius:50px;color:#fff;background:linear-gradient(135deg,#173d72,#3978b9);font-size:14px;font-weight:900;box-shadow:0 8px 25px #0005;cursor:pointer}
#kaleKitapOverlay{position:fixed;inset:0;z-index:100010;background:#071326eF;display:none;overflow-y:auto;padding:22px;box-sizing:border-box;font-family:Arial,sans-serif}
#kaleKitapOverlay.open{display:block}
#kaleKitapWindow{max-width:1050px;min-height:90vh;margin:auto;background:#f5f3ee;border-radius:22px;overflow:hidden;color:#17243b}
#kaleKitapTop{background:#10213b;color:white;padding:26px 28px;position:relative}
#kaleKitapTop small{color:#e8bd76;font-weight:800;letter-spacing:2px}
#kaleKitapTop h2{font-size:30px;margin:12px 0 8px}
#kaleKitapTop p{color:#d5deea;margin:0;line-height:1.6}
#kaleKitapClose{position:absolute;right:20px;top:18px;border:0;background:#ffffff20;color:white;border-radius:50%;width:40px;height:40px;font-size:23px;cursor:pointer}
#kaleKitapContent{padding:24px}
#kaleKitapSearch{width:100%;box-sizing:border-box;padding:15px 17px;border:1px solid #d5d9df;border-radius:12px;font-size:15px;background:white;color:#17243b;outline:none}
#kaleKitapFilters{display:flex;gap:8px;flex-wrap:wrap;margin:16px 0 24px}
.kaleKitapFilter{border:1px solid #d5d9df;background:white;color:#26364d;border-radius:30px;padding:9px 14px;font-weight:700;cursor:pointer}
.kaleKitapFilter.active{background:#173d72;color:white;border-color:#173d72}
#kaleKitapGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:17px}
.kaleKitapCard{background:white;border:1px solid #e5e3de;border-radius:15px;overflow:hidden;display:flex;flex-direction:column;min-width:0}
.kaleKitapCover{height:190px;display:flex;align-items:center;justify-content:center;padding:18px;box-sizing:border-box}
.kaleKitapBook{width:125px;height:160px;background:linear-gradient(145deg,#fff,#e9e5dd);box-shadow:7px 8px 14px #0003;border-left:7px solid #b8b2a7;display:flex;flex-direction:column;justify-content:space-between;padding:14px;box-sizing:border-box;text-align:left}
.kaleKitapBook small{font-size:9px;letter-spacing:2px;color:#596274;font-weight:900}
.kaleKitapBook strong{font-family:Georgia,serif;font-size:17px;line-height:1.2;color:#17243b}
.kaleKitapBook span{font-size:8px;color:#596274;letter-spacing:1px}
.kaleKitapInfo{padding:15px;display:flex;flex-direction:column;flex:1}
.kaleKitapTag{font-size:10px;font-weight:900;letter-spacing:1px;color:#59718e;text-transform:uppercase}
.kaleKitapInfo h3{font-family:Georgia,serif;font-size:19px;line-height:1.25;margin:9px 0}
.kaleKitapInfo p{font-size:13px;color:#657080;line-height:1.55;margin:0 0 12px}
.kaleKitapLevel{font-size:11px;color:#657080;margin-top:auto;padding:8px 0}
.kaleKitapLink{display:block;text-align:center;text-decoration:none;background:#173d72;color:white;border-radius:9px;padding:11px;font-size:12px;font-weight:800}
#kaleKitapEmpty{text-align:center;padding:35px;color:#687386;display:none}
#kaleKitapFooter{padding:18px 24px;background:#eae8e2;color:#667085;font-size:12px;line-height:1.6}
@media(max-width:700px){
#kaleKitapBtn{width:190px;right:15px;bottom:126px}
#kaleKitapOverlay{padding:0}
#kaleKitapWindow{width:100%;min-height:100dvh;border-radius:0}
#kaleKitapTop{padding:25px 18px}
#kaleKitapTop h2{font-size:25px;padding-right:35px}
#kaleKitapContent{padding:17px 13px}
#kaleKitapGrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.kaleKitapCover{height:150px;padding:10px}
.kaleKitapBook{width:105px;height:130px;padding:10px}
.kaleKitapBook strong{font-size:14px}
.kaleKitapInfo{padding:11px}
.kaleKitapInfo h3{font-size:16px}
.kaleKitapInfo p{font-size:12px}
.kaleKitapLink{font-size:11px;padding:10px 5px}
}
@media(max-width:370px){
#kaleKitapGrid{grid-template-columns:1fr}
.kaleKitapCover{height:170px}
}
`;
document.head.appendChild(style);

const button = document.createElement('button');
button.id = 'kaleKitapBtn';
button.type = 'button';
button.textContent = '📚  KİTAPLIK';
document.body.appendChild(button);

const overlay = document.createElement('div');
overlay.id = 'kaleKitapOverlay';
overlay.innerHTML = `
<div id="kaleKitapWindow">
<header id="kaleKitapTop">
<button id="kaleKitapClose" aria-label="Kapat">×</button>
<small>KALECAD • DİJİTAL KÜTÜPHANE</small>
<h2>Bilginin izinde, tasarımın içinde.</h2>
<p>Mimarlık, iç mimarlık ve inşaat teknolojileri için seçilmiş kitaplar ve okuma önerileri.</p>
</header>
<main id="kaleKitapContent">
<input id="kaleKitapSearch" type="search" placeholder="Kitap, konu veya kategori ara..." aria-label="Kitap ara">
<nav id="kaleKitapFilters"></nav>
<div id="kaleKitapGrid"></div>
<div id="kaleKitapEmpty">Aramana uygun kitap bulunamadı.</div>
</main>
<footer id="kaleKitapFooter">
Kitap tanıtımları KALECAD tarafından hazırlanmıştır. Kitapları incelemek ve satın alma bilgilerine ulaşmak için YEM Kitabevi'nin internet sitesini ziyaret edebilirsin. Kitap kapakları ve ürün bilgileri yayıncı tarafından doğrulanmalıdır.
</footer>
</div>`;
document.body.appendChild(overlay);

let activeCategory = 'Tümü';

const grid = document.getElementById('kaleKitapGrid');
const search = document.getElementById('kaleKitapSearch');
const filters = document.getElementById('kaleKitapFilters');
const empty = document.getElementById('kaleKitapEmpty');

function renderFilters() {
filters.innerHTML = categories.map(category =>
`<button type="button" class="kaleKitapFilter ${category === activeCategory ? 'active' : ''}" data-category="${category}">${category}</button>`
).join('');

filters.querySelectorAll('button').forEach(btn => {
btn.addEventListener('click', () => {
activeCategory = btn.dataset.category;
renderFilters();
renderBooks();
});
});
}

function renderBooks() {
const query = search.value.toLocaleLowerCase('tr-TR').trim();

const filtered = books.filter(book => {
const matchesCategory = activeCategory === 'Tümü' || book.category === activeCategory;
const text = (book.title + ' ' + book.category + ' ' + book.desc).toLocaleLowerCase('tr-TR');
return matchesCategory && text.includes(query);
});

grid.innerHTML = filtered.map(book => `
<article class="kaleKitapCard">
<div class="kaleKitapCover" style="background:${book.color}">
<div class="kaleKitapBook">
<small>KALECAD SEÇKİSİ</small>
<strong>${book.title}</strong>
<span>${book.mark}</span>
</div>
</div>
<div class="kaleKitapInfo">
<span class="kaleKitapTag">${book.category}</span>
<h3>${book.title}</h3>
<p>${book.desc}</p>
<div class="kaleKitapLevel">${book.level}</div>
<a class="kaleKitapLink" href="https://www.yemkitabevi.com/" target="_blank" rel="noopener noreferrer">YEM KİTABEVİ'NDE İNCELE ↗</a>
</div>
</article>
`).join('');

empty.style.display = filtered.length ? 'none' : 'block';
}

function openLibrary() {
overlay.classList.add('open');
document.body.style.overflow = 'hidden';
search.focus();
}

function closeLibrary() {
overlay.classList.remove('open');
document.body.style.overflow = '';
}

button.addEventListener('click', openLibrary);
document.getElementById('kaleKitapClose').addEventListener('click', closeLibrary);

overlay.addEventListener('click', event => {
if (event.target === overlay) closeLibrary();
});

document.addEventListener('keydown', event => {
if (event.key === 'Escape' && overlay.classList.contains('open')) closeLibrary();
});

search.addEventListener('input', renderBooks);

renderFilters();
renderBooks();

})();

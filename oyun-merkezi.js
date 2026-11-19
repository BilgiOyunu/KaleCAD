
/* KALECAD OYUN MERKEZI V6 */
(() => {
'use strict';
if(window.KALECAD_GAME_V6)return;
window.KALECAD_GAME_V6=true;

document.getElementById('kaleGames')?.remove();
document.getElementById('kaleGamesBtn')?.remove();
document.getElementById('kaleGamesStyle')?.remove();

const siteQuestions=[
{title:'ARAZİ HAZIRLIĞI',question:'İnşaata başlamadan önce hangi çalışma yapılır?',answers:['Zemin etüdü ve aplikasyon','Duvar boyası','Çatı kaplaması'],correct:0,info:'Zemin özellikleri incelenir ve proje aplikasyonu yapılır.',scene:'🗺️ 🏞️ 📐',caption:'ARAZİ VE ZEMİN ETÜDÜ'},
{title:'TEMEL KAZISI',question:'Temel imalatından önce hangi işlem yapılır?',answers:['Kapı montajı','Projeye uygun kazı','İç cephe boyası'],correct:1,info:'Temel projesine uygun kazı ve zemin hazırlığı yapılır.',scene:'🚜 ⛏️ 🪨',caption:'TEMEL KAZISI'},
{title:'BETONARME',question:'Betonarme taşıyıcı sistemin temel elemanları hangileridir?',answers:['Kapı ve pencere','Kolon, kiriş ve döşeme','Parke ve seramik'],correct:1,info:'Kolon, kiriş ve döşeme taşıyıcı sistemin temel elemanlarıdır.',scene:'🏗️ 🧱 🏢',caption:'BETONARME TAŞIYICI SİSTEM'},
{title:'DUVAR İMALATI',question:'Duvar örümünde düzgünlük için hangi kontrol yapılır?',answers:['Şakül ve doğrultu','Mobilya rengi','Aydınlatma türü'],correct:0,info:'Duvarın düşey ve yatay düzgünlüğü kontrol edilir.',scene:'🧱 📏 📐',caption:'DUVAR ÖRÜMÜ'},
{title:'İNCE İŞLER',question:'Hangisi ince işler kapsamındadır?',answers:['Temel kazısı','Zemin kaplama ve boya','Zemin etüdü'],correct:1,info:'Boya, sıva ve zemin kaplamaları ince işlerdendir.',scene:'🪣 🖌️ 🧱',caption:'BOYA VE ZEMİN KAPLAMASI'},
{title:'İSKELE',question:'Yüksekte çalışmada öncelikli konu nedir?',answers:['Güvenli çalışma ve korkuluk','Hızlı çalışmak','Malzemeleri gelişigüzel bırakmak'],correct:0,info:'İskele güvenliği ve uygun kişisel koruyucu donanımlar önemlidir.',scene:'🦺 🏗️ 🪜',caption:'İŞ GÜVENLİĞİ'}
];

const rescueQuestions=[
{title:'ÇATLAK KOLON',question:'Bir binanın taşıyıcı kolonunda çatlak görülüyor. Ne yapılmalıdır?',answers:['Üzerini boyamak','Uzman mühendislik incelemesi yaptırmak','Duvar kâğıdı kaplamak'],correct:1,info:'Taşıyıcı elemandaki çatlak uzman mühendis tarafından değerlendirilmelidir.',scene:'🏢 ⚠️ 🧱',caption:'TAŞIYICI KOLON HASARI'},
{title:'TEMEL PROBLEMİ',question:'Binada temel kaynaklı oturma şüphesi varsa ne yapılmalıdır?',answers:['Sadece duvarı boyamak','Rastgele dolgu yapmak','Uzman incelemesi ve zemin değerlendirmesi'],correct:2,info:'Temel ve zemin sorunları uzmanlar tarafından incelenmelidir.',scene:'🏚️ ⬇️ 🪨',caption:'TEMEL VE ZEMİN OTURMASI'},
{title:'KİRİŞ HASARI',question:'Betonarme kirişte ciddi hasar fark edildiğinde ne yapılmalıdır?',answers:['Alanı güvenli hale getirip uzman çağırmak','Hasarı gizlemek','Üzerine kaplama yapmak'],correct:0,info:'Kiriş taşıyıcı elemandır. Hasar uzmanlarca değerlendirilmelidir.',scene:'🏗️ ⚠️ 📐',caption:'BETONARME KİRİŞ HASARI'},
{title:'ÇATI SIZINTISI',question:'Yağmurdan sonra tavanda su lekesi oluşuyor. İlk olarak ne incelenmelidir?',answers:['Mobilyalar','Çatı ve su yalıtımı','Kapı kolu'],correct:1,info:'Su girişinin kaynağı ve çatı yalıtımı kontrol edilmelidir.',scene:'🏠 🌧️ 💧',caption:'ÇATI VE SU YALITIMI'},
{title:'ISI YALITIMI',question:'Binada aşırı ısı kaybını azaltmak için ne yapılmalıdır?',answers:['Pencereyi sürekli açık bırakmak','Duvarları koyu renge boyamak','Isı yalıtımını değerlendirmek'],correct:2,info:'Isı yalıtımı ve ısı köprüleri birlikte değerlendirilmelidir.',scene:'🏠 ❄️ 🌡️',caption:'BİNA ISI YALITIMI'},
{title:'DUVAR ÇATLAĞI',question:'Duvar üzerinde yeni oluşan geniş bir çatlak fark edilirse ne yapılmalıdır?',answers:['Çatlağın nedeni uzman tarafından incelenmeli','Hemen üzeri kapatılmalı','Mobilyayla gizlenmeli'],correct:0,info:'Çatlağın nedeni ve yapısal önemi uzman tarafından değerlendirilmelidir.',scene:'🧱 ⚡ 📏',caption:'DUVAR ÇATLAĞI'}
];

const style=document.createElement('style');
style.id='kaleGamesStyle';
style.textContent=`
#kaleGamesBtn{position:fixed;right:15px;bottom:18px;z-index:99990;border:0;border-radius:50px;padding:14px 19px;color:white;background:linear-gradient(135deg,#ff8a00,#ed3c65);font-size:14px;font-weight:900;box-shadow:0 8px 25px #0005;cursor:pointer}
#kaleGames{position:fixed;inset:0;z-index:99999;background:#071326;color:#f7f9ff;font-family:Arial,sans-serif;display:none;overflow:auto}
#kaleGames *{box-sizing:border-box}
.kg-wrap{max-width:1100px;margin:auto;padding:18px}
.kg-top{display:flex;align-items:center;justify-content:space-between;gap:12px}
.kg-logo{font-size:23px;font-weight:1000;letter-spacing:1px}
.kg-close{background:#263b5c;color:white;border:0;border-radius:12px;padding:11px 15px;font-size:18px}
.kg-intro{padding:28px 0 18px}
.kg-intro h1{font-size:clamp(27px,5vw,43px);margin:0 0 8px}
.kg-intro p{color:#9fb1ca;line-height:1.5}
.kg-games{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}
.kg-card{border:1px solid #34496a;background:linear-gradient(145deg,#172b49,#102039);border-radius:22px;padding:19px;cursor:pointer;min-height:205px}
.kg-card:active{transform:scale(.98)}
.kg-card .emoji{font-size:55px;margin-bottom:15px}
.kg-card h2{font-size:19px;margin:0 0 8px}
.kg-card p{color:#a9bad0;font-size:13px;line-height:1.5}
.kg-tag{display:inline-block;background:#263e60;padding:6px 9px;border-radius:20px;font-size:11px;color:#c8d8f0}
.kg-panel{margin-top:18px;background:#10213a;border:1px solid #304766;border-radius:20px;padding:18px}
.kg-back{border:0;border-radius:10px;background:#263e60;color:white;padding:10px 14px;margin-bottom:15px}
.kg-scene{min-height:190px;border-radius:17px;overflow:hidden;background:linear-gradient(180deg,#b9ddf3 0%,#d7e8ed 62%,#7b9b70 62%,#55774c 100%);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:9px;color:#172b49}
.kg-scene-art{font-size:clamp(48px,12vw,85px);letter-spacing:5px;filter:drop-shadow(0 5px 3px #0002)}
.kg-scene-caption{background:#ffffffd9;border-radius:30px;padding:7px 13px;font-size:11px;font-weight:900;letter-spacing:1px}
.kg-question-title{font-size:12px;color:#ffb24d;font-weight:900;letter-spacing:1.4px;margin:17px 0 8px}
.kg-question{font-size:clamp(19px,4vw,25px);line-height:1.35;font-weight:900;margin:0 0 17px}
.kg-answers{display:grid;gap:10px}
.kg-answer{width:100%;padding:15px;text-align:left;background:#1c3353;color:white;border:1px solid #3a5274;border-radius:13px;font-size:14px;font-weight:700}
.kg-answer:disabled{opacity:1}
.kg-answer.good{background:#155c45;border-color:#38d69a}
.kg-answer.bad{background:#702f3b;border-color:#ff7585}
.kg-feedback{padding:13px;border-radius:12px;margin-top:13px;line-height:1.5;font-size:14px}
.kg-next{display:block;margin:15px 0 0 auto;background:#ff9d29;color:#15233b;border:0;border-radius:12px;padding:13px 20px;font-weight:900}
.kg-progress{height:7px;background:#263c5c;border-radius:10px;overflow:hidden;margin:15px 0}
.kg-progress span{display:block;height:100%;background:#ff9d29}
.kg-score{color:#a9bad0;font-size:13px}
.kg-result{text-align:center;padding:30px 10px}
.kg-result .big{font-size:65px}
.kg-result h2{font-size:26px}
@media(max-width:700px){.kg-games{grid-template-columns:1fr}.kg-card{min-height:145px;display:grid;grid-template-columns:65px 1fr;column-gap:13px;align-items:center}.kg-card .emoji{grid-row:span 3;font-size:43px;margin:0}.kg-card h2{align-self:end}.kg-card p{margin:4px 0}.kg-wrap{padding:12px}}
`;
document.head.appendChild(style);

const btn=document.createElement('button');
btn.id='kaleGamesBtn';
btn.textContent='🎮 OYUN MERKEZİ';
document.body.appendChild(btn);

const app=document.createElement('div');
app.id='kaleGames';
app.innerHTML=`
<div class="kg-wrap">
<div class="kg-top"><div class="kg-logo">🎮 KALECAD OYUN MERKEZİ</div><button class="kg-close" id="kgClose">✕</button></div>
<div id="kgHome">
<div class="kg-intro"><h1>Mesleğini oyunla keşfet.</h1><p>İnşaat ve yapı teknolojileri becerilerini geliştir.</p></div>
<div class="kg-games">
<div class="kg-card" data-game="site"><div class="emoji">🏗️</div><h2>Şantiye Simülatörü</h2><p>Şantiyedeki uygulamaları ve yapı aşamalarını keşfet.</p><span class="kg-tag">İNŞAAT TEKNOLOJİLERİ</span></div>
<div class="kg-card" data-game="rescue"><div class="emoji">🏚️</div><h2>Binayı Kurtar</h2><p>Yapı sorunlarını tanı, doğru müdahale yaklaşımını seç.</p><span class="kg-tag">YAPI BİLGİSİ</span></div>
</div>
</div>
<div id="kgGameArea"></div>
</div>`;
document.body.appendChild(app);

const $=id=>document.getElementById(id);
const home=$('kgHome'),area=$('kgGameArea');
btn.onclick=()=>app.style.display='block';
$('kgClose').onclick=()=>app.style.display='none';
app.addEventListener('click',e=>{if(e.target===app)app.style.display='none'});

document.querySelectorAll('.kg-card').forEach(card=>{
card.onclick=()=>{
home.style.display='none';
startQuiz(card.dataset.game);
};
});

function backButton(){return '<button class="kg-back" id="kgBack">← Oyun merkezine dön</button>'}
function bindBack(){
const back=$('kgBack');
if(back)back.onclick=()=>{area.innerHTML='';home.style.display='block'};
}

function startQuiz(type){
const data=type==='site'?siteQuestions:rescueQuestions;
const name=type==='site'?'ŞANTİYE SİMÜLATÖRÜ':'BİNAYI KURTAR';
let index=0,score=0,answered=false;

function render(){
if(index>=data.length){
area.innerHTML=`<div class="kg-panel kg-result"><div class="big">${score>=4?'🏆':'🎓'}</div><h2>Görev tamamlandı!</h2><p>${data.length} soruda ${score} doğru cevap verdin.</p><p class="kg-score">Başarı oranı: %${Math.round(score/data.length*100)}</p><button class="kg-next" id="kgAgain">Yeniden oyna</button>${backButton()}</div>`;
$('kgAgain').onclick=()=>{index=0;score=0;render()};
bindBack();return;
}
answered=false;
const q=data[index];
area.innerHTML=`
<div class="kg-panel">
${backButton()}
<div class="kg-score">${name} · Soru ${index+1}/${data.length} · Puan: ${score}</div>
<div class="kg-progress"><span style="width:${index/data.length*100}%"></span></div>
<div class="kg-scene"><div class="kg-scene-art">${q.scene}</div><div class="kg-scene-caption">${q.caption}</div></div>
<div class="kg-question-title">${q.title}</div>
<h2 class="kg-question">${q.question}</h2>
<div class="kg-answers">${q.answers.map((a,i)=>`<button class="kg-answer" data-answer="${i}">${String.fromCharCode(65+i)} · ${a}</button>`).join('')}</div>
<div id="kgFeedback"></div>
<button class="kg-next" id="kgNext" style="display:none">Sonraki soru →</button>
</div>`;
bindBack();

area.querySelectorAll('[data-answer]').forEach(button=>{
button.onclick=()=>{
if(answered)return;
answered=true;
const choice=Number(button.dataset.answer);
if(choice===q.correct)score++;
area.querySelectorAll('[data-answer]').forEach(b=>{
b.disabled=true;
const n=Number(b.dataset.answer);
if(n===q.correct)b.classList.add('good');
else if(n===choice)b.classList.add('bad');
});
$('kgFeedback').innerHTML=`<div class="kg-feedback" style="background:${choice===q.correct?'#155c45':'#702f3b'}"><b>${choice===q.correct?'✓ Doğru cevap!':'✕ Bu cevap doğru değil.'}</b><br>${q.info}</div>`;
$('kgNext').style.display='block';
};
});
$('kgNext').onclick=()=>{index++;render()};
}
render();
}
})();

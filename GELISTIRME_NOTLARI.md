# KaleCAD geliştirme notları

## Bu sürümde
- Mevcut ana oyun ve soru bankası yükleme akışı korundu.
- `conquest-map.js` ana oyunun yükleme zincirine eklendi; kampüs adları ile harita şehir anahtarları eşleştirildi ve klavye erişimindeki `preventDefault()` hatası giderildi.
- `autocad-atolye.js` eklendi: 30 AutoCAD komut kartı, 50 soruluk havuz, her turda 10 soru, 6 uygulama görevi ve öğretmen kontrollü takım puan tablosu.
- **2B Çizim Alanı** eklendi: dokunmatik/fare ile LINE, RECTANG ve CIRCLE çizimi, 100 birim ızgara yakalama, geri alma, temizleme ve PNG dışa aktarma.
- Çizim nesneleri ve atölye puanları aynı cihazın tarayıcısında `localStorage` ile saklanır.

## Önemli teknik sınırlar
- `index.html`, ana oyun HTML'ini GitHub Raw üzerinden sabitlenmiş bir commit'ten indiriyor. ZIP'te ana oyunun tam HTML kaynağı bulunmuyor.
- Atölye verileri aynı cihazdaki tarayıcıda tutulur. Gerçek çok kullanıcılı sınıf senkronizasyonu için sunucu/veritabanı gerekir.
- 2B çizim alanı temel geometri pratiği sağlar; DWG/DXF üretmez ve gerçek AutoCAD komut motoru değildir.
- Bu ZIP henüz GitHub deposuna gönderilmedi.

## Kontroller
- `autocad-atolye.js` için `node --check` sözdizimi kontrolü başarılı.
- Tarayıcıda gerçek ana oyun ile uçtan uca test ve GitHub Pages yayını henüz yapılmadı.

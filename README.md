# KALECAD

CAD bilgi yarışması ve eğitim oyunu.

## Bu geliştirme paketindeki yenilik
- Ana oyunun mevcut GitHub Pages yükleme yaklaşımı korunur.
- Kampüs seçimi ve fetih haritası betikleri yüklenir.
- **AutoCAD Atölyesi**: 30 komut kartı, 50 soruluk havuzdan 10 soruluk turlar, 6 uygulama görevi ve öğretmen takım puan tablosu.
- **2B Çizim Alanı**: mobil dokunmatik kullanım destekli LINE, RECTANG ve CIRCLE çizimi; ızgara yakalama; geri alma; PNG dışa aktarma.

## Çalıştırma
Bu proje ana oyun HTML'ini sabitlenmiş bir GitHub Raw adresinden yüklediği için `index.html` dosyasını telefonda `file://` üzerinden açmak yeterli değildir. Projeyi GitHub deposuna yükleyip GitHub Pages üzerinden çalıştırın veya bir yerel web sunucusu kullanın.

## Veri ve sınırlamalar
- Atölye puanları, görev işaretleri ve çizim nesneleri aynı tarayıcı/cihazdaki `localStorage` içinde saklanır; cihazlar arasında senkronize olmaz.
- Çizim alanı temel 2B geometri eğitim simülasyonudur; DWG/DXF üretmez ve gerçek AutoCAD'in yerini almaz.
- Ana oyun HTML'i halen sabitlenmiş GitHub Raw kaynağından alınır. Bu nedenle ana oyunun tam kaynak kodu bu depoda yerel değildir.

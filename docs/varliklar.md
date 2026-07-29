# Varlık kütüphanesi

Markdown yalnızca metin katmanıdır. Haritalar, çizimler, sesler, PDF'ler ve kaynak dosyaları doğrudan bu depoda saklanabilir.

## Klasör düzeni

```text
docs/public/assets/
├── maps/          # SVG, PNG, WebP ve harita kaynakları
├── illustrations/ # İllüstrasyonlar
├── documents/     # PDF ve indirilebilir belgeler
└── audio/         # Ses dosyaları
```

`docs/public` altındaki dosyalar site köküne olduğu gibi kopyalanır. Örneğin `docs/public/assets/maps/avarra.svg` dosyasının web adresi `/assets/maps/avarra.svg` olur.

## Görsel yerleştirme

```md
![Kıtalar haritası](/assets/maps/kitallar.svg)
```

SVG, şemalar ve web için optimize edilmiş WebP/PNG formatları haritalar için iyi seçimlerdir. Kaynak dosyaları (örneğin `.psd`, `.kra`, `.blend`) de depoda tutulabilir; ancak sayfada gösterilecek sürüm için ayrıca SVG, PNG veya WebP dışa aktarın.

## Büyük dosyalar

GitHub normal Git dosyalarını 100 MB ile sınırlar. Büyük raster haritalar veya kaynak dosyaları için [Git LFS](https://git-lfs.com/) etkinleştirin:

```bash
git lfs install
git lfs track "*.psd" "*.kra" "*.tif"
git add .gitattributes
```

GitHub Pages için mümkün olduğunca sıkıştırılmış, web-uyumlu çıktılar kullanın.

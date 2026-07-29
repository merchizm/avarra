# Avarra Wiki

GitHub Pages üzerinde yayınlanmak üzere hazırlanmış, dosya-temelli VitePress wiki'si.

## Yerelde çalıştırma

```bash
npm install
npm run docs:dev
```

Üretim derlemesini kontrol etmek için:

```bash
npm run docs:build
```

## İçerik ve varlıklar

- Sayfalar `docs/` altında Markdown olarak bulunur.
- Görseller, haritalar, PDF'ler ve diğer dosyalar `docs/public/assets/` altında tutulur.
- Bir varlığa içerikten kök-relative yolla bağlanın: `![Harita](/assets/maps/kita-haritasi.svg)`.
- Büyük ikili dosyalar için Git LFS kullanılması önerilir; ayrıntılar `docs/varliklar.md` sayfasındadır.

## GitHub Pages

`.github/workflows/deploy-pages.yml`, `main` dalına yapılan her push'ta siteyi GitHub Pages'e dağıtır.
Depo ayarlarında **Settings → Pages → Build and deployment → GitHub Actions** seçeneğini etkinleştirin.

Proje bir depo alt yolunda yayınlanacağı için `docs/.vitepress/config.mjs` içindeki `base` değeri `/<depo-adi>/` olmalıdır. Özel alan adı kullanacaksanız `base: '/'` yapın.

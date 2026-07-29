# Avarra

Kendi yarattığım Dungeons & Dragons evreni **Avarra** ve bu evren için hazırlanmış yaşayan dünya wiki’si.

Wiki; halkları, devletleri, inançları, şehirleri, tarihçeyi, ticaret yollarını ve macera için kullanılabilecek dünya kayıtlarını bir araya getirir. Avarra’yı oyun masasında geliştirdikçe kayıtlar da büyür; bu yüzden içerik dosya-temelli, görsel ve harita eklemeye açık biçimde tutulur.

## Evren rehberi

- **Halklar:** Soy, kültür, yurttaşlık ve toplumsal durumun birbirinden ayrıldığı Avarra toplulukları.
- **Devletler:** Veraset savaşları, ittifaklar, kaynak çatışmaları ve diplomatik gerilimler.
- **Yerleşimler:** Başkentler, limanlar, yeraltı şehirleri ve gündelik hayat kayıtları.
- **Dinler ve kültürler:** İnanç aileleri, ritüeller, ölüm ve dönüş gelenekleri.
- **Atlas ve varlıklar:** Haritalar, çizimler, PDF’ler ve oyun sırasında kullanılacak diğer dünya varlıkları.

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

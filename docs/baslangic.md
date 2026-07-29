# Başlangıç

Bu wiki, Avarra dünyasına ait bilgileri dosya olarak saklar. Her konu kendi Markdown dosyasında yaşar; haritalar ve diğer medya dosyaları da depoda sürümlenir.

## Yeni sayfa eklemek

1. Uygun klasörde bir `.md` dosyası oluşturun. Örneğin `docs/cografya/yeni-bolge.md`.
2. Sayfanın başına başlık ekleyin: `# Yeni Bölge`.
3. Sol menüye eklemek için `docs/.vitepress/config.mjs` dosyasındaki ilgili `sidebar` bölümünü güncelleyin.
4. Değişikliği yerelde `npm run docs:dev` ile inceleyin.

## Bağlantılar

Wiki içi sayfalara uzantısız bağlanın:

```md
[Dünya haritası](/haritalar/dunya)
```

Dosyalara ise `/assets/` ile başlayarak bağlanın:

```md
![Avarra dünya haritası](/assets/maps/avarra-dunya.svg)
```

Harita sayfasındaki örnek akışı kullanarak ilk atlas kaydınızı oluşturabilirsiniz.

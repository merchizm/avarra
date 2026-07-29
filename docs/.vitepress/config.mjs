import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'tr-TR',
  title: 'Avarra',
  description: 'Avarra dünya wiki’si',
  // GitHub deposu adı değişirse bunu da güncelleyin. Özel alan adında '/' kullanın.
  base: '/avarra/',
  themeConfig: {
    nav: [
      { text: 'Başlangıç', link: '/baslangic' },
      { text: 'Atlas', link: '/haritalar/dunya' },
      { text: 'Halklar', link: '/irklar/' },
      { text: 'Varlıklar', link: '/varliklar' }
    ],
    sidebar: [
      {
        text: 'Wiki',
        items: [
          { text: 'Başlangıç', link: '/baslangic' },
          { text: 'Varlık kütüphanesi', link: '/varliklar' }
        ]
      },
      {
        text: 'Coğrafya',
        items: [
          { text: 'Genel bakış', link: '/cografya/' },
          { text: 'Kıtalar', link: '/cografya/kitallar' },
          { text: 'Dünya haritası', link: '/haritalar/dunya' }
        ]
      },
      {
        text: 'Halklar',
        items: [
          { text: 'Tüm halklar', link: '/irklar/' },
          { text: 'Eladrin', link: '/irklar/eladrin' }
        ]
      },
      {
        text: 'Tarih',
        items: [{ text: 'Genel bakış', link: '/tarih/' }]
      }
    ],
    socialLinks: []
  }
})

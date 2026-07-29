import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'tr-TR',
  title: 'Avarra',
  description: 'Avarra dünya wiki’si',
  appearance: false,
  // GitHub deposu adı değişirse bunu da güncelleyin. Özel alan adında '/' kullanın.
  base: '/avarra/',
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Başlangıç', link: '/baslangic' },
      { text: 'Atlas', link: '/haritalar/dunya' },
      { text: 'Halklar', link: '/irklar/' },
      { text: 'Varlıklar', link: '/varliklar' }
    ],
    sidebar: false,
    outline: false,
    docFooter: { prev: false, next: false },
    footer: { message: 'Avarra Kronikleri', copyright: 'Dünya rehberi' }
  }
})

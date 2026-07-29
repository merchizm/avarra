import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'tr-TR',
  title: 'Avarra',
  description: 'Avarra dünya wiki’si',
  appearance: true,
  // GitHub deposu adı değişirse bunu da güncelleyin. Özel alan adında '/' kullanın.
  base: '/avarra/',
  locales: {
    root: { label: 'Türkçe', lang: 'tr-TR' },
    en: { label: 'English', lang: 'en-US', link: '/en/' }
  },
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Atlas', link: '/haritalar/dunya' },
      { text: 'Halklar', link: '/irklar/' },
      { text: 'Devletler', link: '/devletler/' },
      { text: 'Dinler ve Kültürler', link: '/kulturler/' },
      { text: 'Yerleşimler', link: '/yerlesimler/' }
    ],
    sidebar: false,
    outline: false,
    docFooter: { prev: false, next: false },
    footer: { message: 'Avarra Kronikleri', copyright: 'Dünya rehberi' },
    locales: {
      en: {
        nav: [
          { text: 'Atlas', link: '/en/atlas' },
          { text: 'Peoples', link: '/en/peoples/' },
          { text: 'States', link: '/en/states/' },
          { text: 'Cultures', link: '/en/cultures/' },
          { text: 'Settlements', link: '/en/settlements/' }
        ],
        outline: false,
        docFooter: { prev: false, next: false },
        footer: { message: 'The Chronicles of Avarra', copyright: 'World guide' }
      }
    }
  }
})

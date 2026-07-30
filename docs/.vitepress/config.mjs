import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'tr-TR',
  title: 'Avarra',
  description: 'Avarra dünya wiki’si',
  appearance: true,
  base: '/avarra/',
  vite: {
    plugins: [{
      name: 'avarra-public-asset-base',
      enforce: 'pre',
      transform(code, id) {
        if (!/\.md(?:\?|$)/.test(id) || !code.includes('src="/assets/')) return null
        return code.replace(/src="\/assets\/([^"]+)"/g, ':src="\'/avarra/assets/$1\'"')
      }
    }]
  },
  locales: {
    root: { label: 'Türkçe', lang: 'tr-TR' },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Atlas', link: '/en/haritalar/dunya' },
          { text: 'Peoples', link: '/en/irklar/' },
          { text: 'States', link: '/en/devletler/' },
          { text: 'Faiths & Cultures', link: '/en/kulturler/' },
          { text: 'Stagnation', link: '/en/durgunluk/' },
          { text: 'Settlements', link: '/en/yerlesimler/' }
        ],
        outline: false,
        docFooter: { prev: false, next: false },
        footer: { message: 'The Chronicles of Avarra', copyright: 'World guide' }
      }
    }
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
      { text: 'Durgunluk', link: '/durgunluk/' },
      { text: 'Yerleşimler', link: '/yerlesimler/' }
    ],
    sidebar: false,
    outline: false,
    docFooter: { prev: false, next: false },
    footer: { message: 'Avarra Kronikleri', copyright: 'Dünya rehberi' }
  }
})

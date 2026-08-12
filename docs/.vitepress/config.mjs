import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'

const referenceModule = '\0avarra-reference-index'

function collectReferenceRecords(directory, prefix = '') {
  const records = []
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const relative = path.posix.join(prefix, entry.name)
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) records.push(...collectReferenceRecords(fullPath, relative))
    else if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
      const source = fs.readFileSync(fullPath, 'utf8')
      const title = source.match(/^title:\s*(.+)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '')
      if (title) records.push({ title, path: `/${relative.replace(/\.md$/, '')}` })
    }
  }
  return records
}

function wikiReferenceIndex() {
  return {
    name: 'avarra-wiki-reference-index',
    resolveId(id) { return id === 'virtual:avarra-reference-index' ? referenceModule : null },
    load(id) {
      if (id !== referenceModule) return null
      const docsRoot = path.resolve(process.cwd(), 'docs')
      const englishTitles = new Map(
        collectReferenceRecords(path.join(docsRoot, 'en'))
          .map((record) => [record.path, record.title])
      )
      const records = collectReferenceRecords(docsRoot)
        .filter((record) => !record.path.startsWith('/en/'))
        .map((record) => ({ ...record, enTitle: englishTitles.get(record.path) || record.title }))
      return `export default ${JSON.stringify(records)}`
    }
  }
}

export default defineConfig({
  lang: 'tr-TR',
  title: 'Avarra',
  description: 'Avarra dünya wiki’si',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/avarra/favicon.png' }]
  ],
  appearance: true,
  base: '/avarra/',
  vite: {
    plugins: [wikiReferenceIndex(), {
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
        logo: '/assets/brand/avarra-root-and-stars.png',
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
    logo: '/assets/brand/avarra-root-and-stars.png',
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

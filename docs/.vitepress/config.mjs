import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { peopleImages } from './theme/data/peopleImages.js'
import { additionalPeople } from './theme/data/additionalPeople.js'

const referenceModule = '\0avarra-reference-index'
const plainText = (value = '') => value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
const peopleReferenceImages = new Map([
  ...additionalPeople.filter((person) => person.image).map((person) => [person.link, person.image]),
  ...Object.entries(peopleImages)
])

function collectReferenceRecords(directory, prefix = '') {
  const records = []
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const relative = path.posix.join(prefix, entry.name)
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) records.push(...collectReferenceRecords(fullPath, relative))
    else if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
      const source = fs.readFileSync(fullPath, 'utf8')
      const title = source.match(/^title:\s*(.+)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '')
      const lead = plainText(source.match(/<p class="lore-lead">([\s\S]*?)<\/p>/)?.[1])
      const image = source.match(/<img\s+[^>]*src="\/assets\/([^"?#]+)"/)?.[1]
      if (title) records.push({ title, lead, image: image ? `/assets/${image}` : undefined, path: `/${relative.replace(/\.md$/, '')}` })
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
      const englishRecords = new Map(
        collectReferenceRecords(path.join(docsRoot, 'en'))
          .map((record) => [record.path, record])
      )
      const records = collectReferenceRecords(docsRoot)
        .filter((record) => !record.path.startsWith('/en/'))
        .map((record) => {
          const english = englishRecords.get(record.path)
          const image = peopleReferenceImages.get(record.path) || record.image
          const enImage = peopleReferenceImages.get(record.path) || english?.image || image
          return { ...record, image, enTitle: english?.title || record.title, enLead: english?.lead || record.lead, enImage }
      })
      return `export default ${JSON.stringify(records)}`
    },
    handleHotUpdate({ file, server }) {
      const docsRoot = `${path.resolve(process.cwd(), 'docs')}${path.sep}`
      if (!file.startsWith(docsRoot) || !file.endsWith('.md')) return
      const module = server.moduleGraph.getModuleById(referenceModule)
      if (!module) return
      server.moduleGraph.invalidateModule(module)
      return [module]
    }
  }
}

export default defineConfig({
  lang: 'tr-TR',
  title: 'Avarra',
  description: 'Avarra dünya wiki’si',
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

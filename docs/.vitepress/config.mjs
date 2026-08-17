import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { peopleImages } from './theme/data/peopleImages.js'
import { additionalPeople } from './theme/data/additionalPeople.js'

const referenceModule = '\0avarra-reference-index'
const backlinkModule = '\0avarra-backlink-index'
const timelineModule = '\0avarra-timeline-index'
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

function collectMarkdownPages(directory, prefix = '') {
  const pages = []
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.vitepress') continue
    const relative = path.posix.join(prefix, entry.name)
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) pages.push(...collectMarkdownPages(fullPath, relative))
    else if (entry.name.endsWith('.md')) {
      const source = fs.readFileSync(fullPath, 'utf8')
      const title = source.match(/^title:\s*(.+)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '')
      pages.push({
        path: pagePathFromRelative(relative),
        title: title || path.basename(entry.name, '.md'),
        source
      })
    }
  }
  return pages
}

function pagePathFromRelative(relative) {
  const withoutExtension = relative.replace(/\.md$/, '')
  const withoutIndex = withoutExtension.replace(/(?:^|\/)index$/, '')
  return `/${withoutIndex}`.replace(/\/$/, '') || '/'
}

function resolveInternalLink(link, sourcePath) {
  const href = link.trim().replace(/^<|>$/g, '')
  if (!href || href.startsWith('#') || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) return null

  const pathname = href.split(/[?#]/, 1)[0]
  if (!pathname) return null
  const resolved = pathname.startsWith('/')
    ? pathname
    : path.posix.normalize(path.posix.join(path.posix.dirname(sourcePath), pathname))
  return resolved.replace(/\.(?:md|html)$/, '').replace(/\/index$/, '').replace(/\/$/, '') || '/'
}

function extractMarkdownLinks(source) {
  const links = []
  const expression = /(?<!!)(?:\[[^\]]*\])\(([^\s)]+)(?:\s+['"][^)]*['"])?\)/g
  for (const match of source.matchAll(expression)) links.push(match[1])
  return links
}

function wikiBacklinkIndex() {
  return {
    name: 'avarra-wiki-backlink-index',
    resolveId(id) { return id === 'virtual:avarra-backlink-index' ? backlinkModule : null },
    load(id) {
      if (id !== backlinkModule) return null
      const docsRoot = path.resolve(process.cwd(), 'docs')
      const pages = collectMarkdownPages(docsRoot)
      const pagesByPath = new Map(pages.map((page) => [page.path, page]))
      const index = Object.fromEntries(pages.map((page) => [page.path, []]))

      for (const page of pages) {
        const destinations = new Set(
          extractMarkdownLinks(page.source)
            .map((link) => resolveInternalLink(link, page.path))
            .filter((target) => target && target !== page.path && pagesByPath.has(target))
        )
        for (const target of destinations) index[target].push({ path: page.path, title: page.title })
      }

      for (const references of Object.values(index)) {
        references.sort((a, b) => a.title.localeCompare(b.title, 'tr'))
      }
      return `export default ${JSON.stringify(index)}`
    },
    handleHotUpdate({ file, server }) {
      const docsRoot = `${path.resolve(process.cwd(), 'docs')}${path.sep}`
      if (!file.startsWith(docsRoot) || !file.endsWith('.md')) return
      const module = server.moduleGraph.getModuleById(backlinkModule)
      if (!module) return
      server.moduleGraph.invalidateModule(module)
      return [module]
    }
  }
}

function timelineMetadata(source) {
  const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---/)
  const block = frontmatter?.[1]?.match(/^timeline:\s*\n((?:^[ \t]+.*(?:\n|$))*)/m)?.[1]
  if (!block) return null
  const field = (name) => block.match(new RegExp(`^[\\t ]+${name}:\\s*(.+)$`, 'm'))?.[1]?.trim().replace(/^['"]|['"]$/g, '')
  const start = field('start') || field('year')
  if (!start || Number.isNaN(Number(start))) return null
  return {
    start: Number(start),
    end: Number(field('end') || start),
    type: field('type') || 'event',
    summary: field('summary')
  }
}

function parseTimelineDate(value) {
  const date = value.trim()
  const beforePresent = date.match(/SÖ\s*(\d+)(?:\s*[–-]\s*(\d+))?/i)
  if (beforePresent) return { start: -Number(beforePresent[1]), end: -Number(beforePresent[2] || beforePresent[1]), label: beforePresent[0] }
  const beforeCommon = date.match(/(\d+)(?:\s*[–-]\s*(\d+))?\s*BC/i)
  if (beforeCommon) return { start: -Number(beforeCommon[1]), end: -Number(beforeCommon[2] || beforeCommon[1]), label: beforeCommon[0] }
  const present = date.match(/S[SD]\s*(\d+)(?:\s*[–-]\s*(\d+))?/i)
  if (present) return { start: Number(present[1]), end: Number(present[2] || present[1]), label: present[0] }
  return null
}

function timelineSummary(value) {
  return plainText(value
    .replace(/^---[\s\S]*?---\s*/m, '')
    .replace(/!?(\[[^\]]*\])\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, ''))
}

function timelineType(title, summary) {
  const text = `${title} ${summary}`.toLocaleLowerCase('tr')
  if (/savaş|war|sefer|kuşatma|çatışma/.test(text)) return 'war'
  if (/kuruluş|kuruldu|foundation|founding|taç|crown/.test(text)) return 'founding'
  if (/göç|sığınak|migration|refuge/.test(text)) return 'migration'
  return 'event'
}

function collectTimelineEvents(directory, prefix = '') {
  const events = []
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.vitepress') continue
    const relative = path.posix.join(prefix, entry.name)
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      events.push(...collectTimelineEvents(fullPath, relative))
      continue
    }
    if (!entry.name.endsWith('.md') || entry.name === 'index.md') continue

    const source = fs.readFileSync(fullPath, 'utf8')
    const title = source.match(/^title:\s*(.+)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '') || path.basename(entry.name, '.md')
    const pagePath = pagePathFromRelative(relative)
    const lead = timelineSummary(source.match(/<p class="lore-lead">([\s\S]*?)<\/p>/)?.[1] || '')
    const metadata = timelineMetadata(source)
    if (metadata) {
      events.push({ ...metadata, title, summary: metadata.summary || lead, path: pagePath, label: String(metadata.start) })
      continue
    }

    const datedHeadings = [...source.matchAll(/^##\s+(.+?)\s+·\s+(.+)$/gm)]
      .map((match, index, all) => {
        const date = parseTimelineDate(match[2])
        if (!date) return null
        const sectionEnd = all[index + 1]?.index ?? source.length
        const section = source.slice(match.index + match[0].length, sectionEnd)
        const summary = timelineSummary(section).slice(0, 220)
        return {
          ...date,
          title: match[1].trim(),
          summary: summary || lead,
          type: timelineType(match[1], summary),
          path: pagePath
        }
      })
      .filter(Boolean)
    if (datedHeadings.length) events.push(...datedHeadings)
    else {
      const kicker = source.match(/<div class="lore-kicker">([\s\S]*?)<\/div>/)?.[1]
      const date = kicker && parseTimelineDate(kicker)
      if (date) events.push({ ...date, title, summary: lead, type: timelineType(title, lead), path: pagePath })
    }
  }
  return events
}

function wikiTimelineIndex() {
  return {
    name: 'avarra-wiki-timeline-index',
    resolveId(id) { return id === 'virtual:avarra-timeline-index' ? timelineModule : null },
    load(id) {
      if (id !== timelineModule) return null
      const docsRoot = path.resolve(process.cwd(), 'docs')
      const events = collectTimelineEvents(path.join(docsRoot, 'tarih'), 'tarih')
        .concat(collectTimelineEvents(path.join(docsRoot, 'en', 'tarih'), 'en/tarih'))
        .sort((a, b) => a.start - b.start || a.end - b.end || a.title.localeCompare(b.title, 'tr'))
      return `export default ${JSON.stringify(events)}`
    },
    handleHotUpdate({ file, server }) {
      const docsRoot = `${path.resolve(process.cwd(), 'docs')}${path.sep}`
      if (!file.startsWith(docsRoot) || !file.endsWith('.md')) return
      const module = server.moduleGraph.getModuleById(timelineModule)
      if (!module) return
      server.moduleGraph.invalidateModule(module)
      return [module]
    }
  }
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
    plugins: [wikiReferenceIndex(), wikiBacklinkIndex(), wikiTimelineIndex(), {
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

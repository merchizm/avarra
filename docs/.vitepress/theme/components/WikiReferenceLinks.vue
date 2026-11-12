<script setup>
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'
import references from 'virtual:avarra-reference-index'

const { page, lang } = useData()
const router = useRouter()
let activeCard
let closeTimer
let openLink
// Dokunmatik cihazlarda ilk dokunuş popup açar, ikinci dokunuş bağlantıya gider.
const touchMode = () => window.matchMedia('(hover: none)').matches

const esc = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const destinationFor = (entry, english) => entry.path.startsWith('#') ? entry.path : withBase(`${english ? '/en' : ''}${entry.path}`)

function closePreview() {
  clearTimeout(closeTimer)
  activeCard?.remove()
  activeCard = undefined
  openLink = undefined
}

function scheduleClose() {
  if (touchMode()) return
  clearTimeout(closeTimer)
  closeTimer = setTimeout(closePreview, 130)
}

function openPreview(link, entry) {
  clearTimeout(closeTimer)
  if (!entry?.path || !link.isConnected) return
  if (activeCard?.dataset.referencePath === entry.path) return
  closePreview()
  const english = lang.value.startsWith('en')
  const title = english ? entry.enTitle : entry.title
  const lead = english ? entry.enLead : entry.lead
  const image = english ? entry.enImage : entry.image
  const card = document.createElement('aside')
  card.className = `wiki-reference-preview${image ? '' : ' is-text-only'}`
  card.dataset.referencePath = entry.path
  card.setAttribute('role', 'tooltip')
  const destination = destinationFor(entry, english)
  card.innerHTML = `${image ? `<img src="${withBase(image)}" alt="" />` : ''}<div><small>${english ? 'AVARRA REFERENCE' : 'AVARRA KAYDI'}</small><strong>${title}</strong>${lead ? `<p>${lead}</p>` : ''}<a href="${destination}">${english ? 'Open record →' : 'Kaydı aç →'}</a></div>`
  document.body.append(card)
  activeCard = card
  card.addEventListener('pointerenter', () => clearTimeout(closeTimer))
  card.addEventListener('pointerleave', scheduleClose)
  openLink = link
  const rect = link.getBoundingClientRect()
  const width = Math.min(330, window.innerWidth - 24)
  const left = Math.max(12, Math.min(rect.left, window.innerWidth - width - 12))
  const top = rect.bottom + 10 + 8 > window.innerHeight ? Math.max(12, rect.top - card.offsetHeight - 10) : rect.bottom + 10
  Object.assign(card.style, { width: `${width}px`, left: `${left}px`, top: `${top}px` })
}

function bindPreview(link, entry, destination) {
  link.addEventListener('pointerenter', () => { if (!touchMode()) openPreview(link, entry) })
  link.addEventListener('pointerleave', scheduleClose)
  link.addEventListener('focus', () => { if (!touchMode()) openPreview(link, entry) })
  link.addEventListener('blur', scheduleClose)
  if (!touchMode()) return
  // Dokunmatikte kelime <span role="link"> olur: VitePress yönlendiricisi tıklamayı kapmaz.
  // İlk dokunuş popup'ı açar, aynı kelimeye ikinci dokunuş kaydı açar.
  const activate = () => {
    if (openLink === link) { router.go(destination); return }
    closePreview()
    openPreview(link, entry)
  }
  link.addEventListener('click', activate)
  link.addEventListener('keydown', (event) => { if (event.key === 'Enter') activate() })
}

function dismissOnOutsideTap(event) {
  if (!activeCard || !touchMode()) return
  if (activeCard.contains(event.target) || event.target.closest?.('.wiki-reference')) return
  closePreview()
}

// Etiketlerden önce kelime sınırı şart ("themselves" içindeki "elves" bağlanmasın). Sonrasında:
// İngilizce'de kesin sınır; Türkçe'de tam başlık ek alabilir, kısa takma ad ise en fazla 4 harflik ek alır.
function labelPattern(entry, english) {
  const label = esc(entry.label)
  const before = '(?<![\\p{L}])'
  if (english) return `${before}${label}(?![\\p{L}])`
  if (!entry.alias) return `${before}${label}`
  return entry.label.length >= 5 ? `${before}${label}(?=\\p{L}{0,4}(?![\\p{L}]))` : `${before}${label}(?![\\p{L}])`
}

function replaceText(node, entries, byLabel, expression) {
  if (!node.nodeValue?.trim()) return
  const parts = node.nodeValue.split(expression)
  if (parts.length === 1) return
  const fragment = document.createDocumentFragment()
  for (const part of parts) {
    const entry = byLabel.get(part.toLowerCase())
    if (!entry) fragment.append(part)
    else {
      const english = lang.value.startsWith('en')
      const destination = destinationFor(entry, english)
      const link = document.createElement(touchMode() ? 'span' : 'a')
      if (touchMode()) { link.setAttribute('role', 'link'); link.tabIndex = 0 } else link.href = destination
      link.className = 'wiki-reference'
      link.textContent = part
      bindPreview(link, entry, destination)
      fragment.append(link)
    }
  }
  node.replaceWith(fragment)
}

function linkReferences() {
  closePreview()
  const root = document.querySelector('.VPContent')
  if (!root) return
  const english = lang.value.startsWith('en')
  const local = [...root.querySelectorAll('h2[id], h3[id]')]
    .map((heading) => ({ label: heading.textContent.trim(), path: `#${heading.id}`, lead: '', enLead: '' }))
    .filter((entry) => entry.label.length > 2)
  const aliasEntries = references.flatMap((entry) => (english ? entry.enAliases : entry.aliases).map((label) => ({ ...entry, label, alias: true })))
  const entries = [...references.map((entry) => ({ ...entry, label: english ? entry.enTitle : entry.title })), ...aliasEntries, ...local]
    .filter((entry) => entry.label !== page.value.title && entry.path !== `/${page.value.relativePath.replace(/\.md$/, '')}`.replace(/^\/en\//, '/'))
    .sort((a, b) => b.label.length - a.label.length)
  const byLabel = new Map()
  for (const entry of entries) if (!byLabel.has(entry.label.toLowerCase())) byLabel.set(entry.label.toLowerCase(), entry)
  const expression = new RegExp(`(${entries.map((entry) => labelPattern(entry, english)).join('|')})`, 'giu')
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes = []
  while (walker.nextNode()) {
    const node = walker.currentNode
    const parent = node.parentElement
    if (!parent || parent.closest('a, code, pre, script, style, h1, h2, h3, h4, .wiki-reference')) continue
    nodes.push(node)
  }
  nodes.forEach((node) => replaceText(node, entries, byLabel, expression))
}

function refresh() { nextTick(linkReferences) }
onMounted(() => {
  refresh()
  document.addEventListener('pointerdown', dismissOnOutsideTap)
})
onUnmounted(() => {
  document.removeEventListener('pointerdown', dismissOnOutsideTap)
  closePreview()
})
watch(() => page.value.relativePath, refresh)
</script>

<template><span class="wiki-reference-links" aria-hidden="true" /></template>

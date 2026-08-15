<script setup>
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import references from 'virtual:avarra-reference-index'

const { page, lang } = useData()
let activeCard
let closeTimer

const esc = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const destinationFor = (entry, english) => entry.path.startsWith('#') ? entry.path : withBase(`${english ? '/en' : ''}${entry.path}`)

function closePreview() {
  clearTimeout(closeTimer)
  activeCard?.remove()
  activeCard = undefined
}

function scheduleClose() {
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
  const rect = link.getBoundingClientRect()
  const width = Math.min(330, window.innerWidth - 24)
  const left = Math.max(12, Math.min(rect.left, window.innerWidth - width - 12))
  const top = rect.bottom + 10 + 8 > window.innerHeight ? Math.max(12, rect.top - card.offsetHeight - 10) : rect.bottom + 10
  Object.assign(card.style, { width: `${width}px`, left: `${left}px`, top: `${top}px` })
}

function bindPreview(link, entry) {
  link.addEventListener('pointerenter', () => openPreview(link, entry))
  link.addEventListener('pointerleave', scheduleClose)
  link.addEventListener('focus', () => openPreview(link, entry))
  link.addEventListener('blur', scheduleClose)
}

function replaceText(node, entries) {
  if (!node.nodeValue?.trim()) return
  const expression = new RegExp(`(${entries.map((entry) => esc(entry.label)).join('|')})`, 'g')
  const parts = node.nodeValue.split(expression)
  if (parts.length === 1) return
  const fragment = document.createDocumentFragment()
  for (const part of parts) {
    const entry = entries.find((item) => item.label === part)
    if (!entry) fragment.append(part)
    else {
      const link = document.createElement('a')
      const english = lang.value.startsWith('en')
      link.href = destinationFor(entry, english)
      link.className = 'wiki-reference'
      link.textContent = part
      bindPreview(link, entry)
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
  const entries = [...references.map((entry) => ({ ...entry, label: english ? entry.enTitle : entry.title })), ...local]
    .filter((entry) => entry.label !== page.value.title)
    .sort((a, b) => b.label.length - a.label.length)
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes = []
  while (walker.nextNode()) {
    const node = walker.currentNode
    const parent = node.parentElement
    if (!parent || parent.closest('a, code, pre, script, style, h1, h2, h3, h4, .wiki-reference')) continue
    nodes.push(node)
  }
  nodes.forEach((node) => replaceText(node, entries))
}

function refresh() { nextTick(linkReferences) }
onMounted(refresh)
onUnmounted(closePreview)
watch(() => page.value.relativePath, refresh)
</script>

<template><span class="wiki-reference-links" aria-hidden="true" /></template>

<script setup>
import { nextTick, onMounted, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import references from 'virtual:avarra-reference-index'

const { page, lang } = useData()

const esc = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

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
      link.href = withBase(`${english ? '/en' : ''}${entry.path}`)
      link.className = 'wiki-reference'
      link.textContent = part
      fragment.append(link)
    }
  }
  node.replaceWith(fragment)
}

function linkReferences() {
  const root = document.querySelector('.VPContent')
  if (!root) return
  const english = lang.value.startsWith('en')
  const local = [...root.querySelectorAll('h2[id], h3[id]')]
    .map((heading) => ({ label: heading.textContent.trim(), path: `#${heading.id}` }))
    .filter((entry) => entry.label.length > 2)
  const entries = [
    ...references.map((entry) => ({ ...entry, label: english ? entry.enTitle : entry.title })),
    ...local
  ].filter((entry) => entry.label !== page.value.title)
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
watch(() => page.value.relativePath, refresh)
</script>

<template><span class="wiki-reference-links" aria-hidden="true" /></template>

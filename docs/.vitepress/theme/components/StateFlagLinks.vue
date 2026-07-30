<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { lang, site } = useData()
let observer

const states = [
  ['Diken Tacı', 'Thorn Crown', 'diken-taci', 'thorn-crown.png'],
  ['Ordan İmparatorluğu', 'Ordan Empire', 'ordan-imparatorlugu', 'ordan-empire.png'],
  ['Nehir Tahtı', 'River Throne', 'nehir-tahti', 'river-throne.png'],
  ['Ayaz Sarayı', 'Frost Court', 'ayaz-sarayi', 'frost-court.png'],
  ["Saar'ın İki Ejderha Tacı", 'Two Dragon Crowns', 'saarin-iki-ejderha-taci', 'two-dragon-crowns.png'],
  ['Dokuz Fener Birliği', 'Nine Lantern Union', 'dokuz-fener-birligi', 'nine-lantern-union.png'],
  ['Lethar Yıldız Krallığı', 'Lethar Star Kingdom', 'lethar-yildiz-kralligi', 'lethar-star-kingdom.png'],
  ['Kar-Dur Taş Tacı', 'Kar-Dur', 'kar-dur-tas-taci', 'kar-dur.png'],
  ['Tuz Ocakları Cumhuriyeti', 'Salt Hearth Republic', 'tuz-ocaklari-cumhuriyeti', 'salt-hearth-republic.png'],
  ['Camova Konfederasyonu', 'Glassplain Confederation', 'camova-konfederasyonu', 'glassplain-confederation.png'],
  ['Sis Adaları Cumhuriyeti', 'Mist Isles Republic', 'sis-adalari-cumhuriyeti', 'mist-isles-republic.png'],
  ['Altıngüneş Krallığı', 'Goldensun Kingdom', 'altin-gunes-kralligi', 'goldensun-kingdom.png'],
  ['Bakır Prenslikler', 'Copper Principalities', 'bakir-prenslikler', 'copper-principalites.png'],
  ['Yeşil Su Birliği', 'Greenwater League', 'yesil-su-birligi', 'greenwater-league.png']
]

const base = () => site.value.base || '/'
const hrefFor = (slug) => `${base()}${lang.value.startsWith('en') ? 'en/' : ''}devletler/${slug}`
const flag = (file) => `${base()}assets/flags/${file}`

function badge(state, label) {
  const link = document.createElement('a')
  link.className = 'state-flag-link'
  link.href = hrefFor(state[2])
  link.title = label
  const image = document.createElement('img')
  image.src = flag(state[3])
  image.alt = ''
  link.append(image, document.createTextNode(label))
  return link
}

function decorate(root = document) {
  root.querySelectorAll?.('a:not(.state-flag-link)').forEach((link) => {
    if (link.querySelector('img.state-flag')) return
    const state = states.find((item) => link.href.includes(`/devletler/${item[2]}`))
    if (!state) return
    const image = document.createElement('img')
    image.className = 'state-flag'
    image.src = flag(state[3])
    image.alt = ''
    link.prepend(image)
  })
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes = []
  while (walker.nextNode()) {
    const node = walker.currentNode
    const parent = node.parentElement
    if (!parent || parent.closest('a, script, style, code, pre, h1, h2, h3, h4, .state-flag-link')) continue
    if (states.some((state) => node.nodeValue.includes(state[0]) || node.nodeValue.includes(state[1]))) nodes.push(node)
  }
  nodes.forEach((node) => {
    const fragment = document.createDocumentFragment()
    let text = node.nodeValue
    while (text) {
      const match = states.map((state) => ({ state, index: Math.min(...[state[0], state[1]].map((name) => { const i = text.indexOf(name); return i < 0 ? Infinity : i })) })).filter((x) => x.index !== Infinity).sort((a, b) => a.index - b.index)[0]
      if (!match) { fragment.append(text); break }
      if (match.index) fragment.append(text.slice(0, match.index))
      const name = [match.state[0], match.state[1]].find((candidate) => text.startsWith(candidate, match.index))
      fragment.append(badge(match.state, name))
      text = text.slice(match.index + name.length)
    }
    node.replaceWith(fragment)
  })
}

onMounted(() => {
  decorate()
  observer = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) decorate(node)
  })))
  observer.observe(document.body, { childList: true, subtree: true })
})
onUnmounted(() => observer?.disconnect())
</script>

<template><span aria-hidden="true" /></template>

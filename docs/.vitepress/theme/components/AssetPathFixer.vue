<script setup>
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useData } from 'vitepress'

const { page, site } = useData()
let observer

const peoplePortraits = {
  'irklar/dikenkanlilar.md': { src: '/assets/illustrations/dikenkanli.png', alt: 'Dikenkanlı sınır subayı konsept çizimi' },
  'irklar/tuz-cuceleri.md': { src: '/assets/illustrations/tuz-cucesi.png', alt: 'Tuz Cücesi mahzen muhafızı konsept çizimi' },
  'irklar/psiyonik-kalintilar.md': { src: '/assets/illustrations/psiyonik-kalinti.png', alt: 'Mühürden çıkmış psiyon konsept çizimi' },
  'en/irklar/dikenkanlilar.md': { src: '/assets/illustrations/dikenkanli.png', alt: 'Thornblood border officer concept illustration' },
  'en/irklar/tuz-cuceleri.md': { src: '/assets/illustrations/tuz-cucesi.png', alt: 'Salt Dwarf vault warden concept illustration' },
  'en/irklar/psiyonik-kalintilar.md': { src: '/assets/illustrations/psiyonik-kalinti.png', alt: 'Unsealed psion concept illustration' }
}

function fixAssetPath(root = document) {
  const base = site.value.base || '/'
  root.querySelectorAll?.('img[src^="/assets/"]').forEach((image) => {
    image.src = base + image.getAttribute('src').slice(1)
  })
}

function fillPeoplePortrait(root = document) {
  const portrait = peoplePortraits[page.value.relativePath]
  if (!portrait) return
  root.querySelectorAll?.('.portrait-placeholder:not(.has-image)').forEach((placeholder) => {
    if (!placeholder.querySelector('small')?.textContent.includes('Görsel') && !placeholder.querySelector('small')?.textContent.includes('Image')) return
    const image = document.createElement('img')
    image.src = (site.value.base || '/') + portrait.src.slice(1)
    image.alt = portrait.alt
    placeholder.classList.add('has-image')
    placeholder.replaceChildren(image)
  })
}

onMounted(() => {
  fixAssetPath()
  fillPeoplePortrait()
  observer = new MutationObserver((records) => {
    records.forEach((record) => record.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.matches?.('img[src^="/assets/"]')) fixAssetPath(node.parentElement)
        fixAssetPath(node)
        fillPeoplePortrait(node)
      }
    }))
  })
  observer.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => observer?.disconnect())

watch(() => page.value.relativePath, () => nextTick(() => {
  fixAssetPath()
  fillPeoplePortrait()
}))
</script>

<template><span class="asset-path-fixer" aria-hidden="true" /></template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { site } = useData()
let observer

function fixAssetPath(root = document) {
  const base = site.value.base || '/'
  root.querySelectorAll?.('img[src^="/assets/"]').forEach((image) => {
    image.src = base + image.getAttribute('src').slice(1)
  })
}

onMounted(() => {
  fixAssetPath()
  observer = new MutationObserver((records) => {
    records.forEach((record) => record.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.matches?.('img[src^="/assets/"]')) fixAssetPath(node.parentElement)
        fixAssetPath(node)
      }
    }))
  })
  observer.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => observer?.disconnect())
</script>

<template><span class="asset-path-fixer" aria-hidden="true" /></template>

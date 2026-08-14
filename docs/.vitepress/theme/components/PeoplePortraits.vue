<script setup>
import { nextTick, onMounted, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import { peopleImages } from '../data/peopleImages.js'

const { page } = useData()

function portraitFor(relativePath = '') {
  const match = relativePath.match(/^(?:en\/)?irklar\/([^/]+)\.md$/)
  return match ? peopleImages[`/irklar/${match[1]}`] : undefined
}

function installPortrait() {
  const image = portraitFor(page.value.relativePath)
  if (!image || typeof document === 'undefined') return

  const placeholder = document.querySelector('.VPDoc .vp-doc .creature-profile .portrait-placeholder')
  if (!placeholder) return

  const portrait = document.createElement('img')
  portrait.src = withBase(image)
  portrait.alt = `${page.value.title || 'Avarra halkı'} temsili portresi`
  portrait.loading = 'eager'
  placeholder.replaceChildren(portrait)
  placeholder.classList.add('has-image')
}

onMounted(() => nextTick(installPortrait))
watch(() => page.value.relativePath, () => nextTick(installPortrait))
</script>

<template>
  <span class="people-portrait-mounter" aria-hidden="true"></span>
</template>

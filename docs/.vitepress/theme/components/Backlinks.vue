<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import backlinks from 'virtual:avarra-backlink-index'

const { page, lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const currentPath = computed(() => {
  const relativePath = page.value.relativePath.replace(/\.md$/, '').replace(/(?:^|\/)index$/, '')
  return `/${relativePath}`.replace(/\/$/, '') || '/'
})
const references = computed(() => backlinks[currentPath.value] || [])
</script>

<template>
  <section v-if="references.length" class="backlinks" :aria-label="isEnglish ? 'References to this page' : 'Bu sayfaya yapılan atıflar'">
    <p class="backlinks-kicker">{{ isEnglish ? 'Cross-references' : 'Çapraz atıflar' }}</p>
    <h2>{{ isEnglish ? 'References to this page' : 'Bu sayfaya yapılan atıflar' }}</h2>
    <ul>
      <li v-for="reference in references" :key="reference.path">
        <a :href="withBase(reference.path)">{{ reference.title }}</a>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import references from 'virtual:avarra-reference-index'

const settlements = computed(() => references
  .filter((entry) => entry.path.startsWith('/yerlesimler/'))
  .sort((a, b) => a.enTitle.localeCompare(b.enTitle, 'en')))
</script>

<template>
  <section class="city-register-table settlement-directory" aria-label="All settlement records">
    <div class="city-register-labels"><span>Settlement</span><span>Record</span><span></span></div>
    <a v-for="entry in settlements" :key="entry.path" :href="withBase(`/en${entry.path}`)">
      <b><strong>{{ entry.enTitle }}</strong><small>Settlement record</small></b>
      <p><i>Open entry</i><span>Read its people, place, and political record.</span></p>
    </a>
  </section>
</template>

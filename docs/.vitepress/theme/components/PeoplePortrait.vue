<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { page } = useData()
const slug = computed(() => page.value.relativePath.replace(/^en\//, '').replace(/^irklar\//, '').replace(/\.md$/, ''))
const portraits = {
  insanlar: ['human.png', 'İnsan portresi'],
  cuceler: ['dwarf.png', 'Cüce portresi'],
  eladrin: ['eladrin.png', 'Eladrin portresi'],
  genasiler: ['genasi.png', 'Genasi portresi']
}
const portrait = computed(() => portraits[slug.value])
</script>

<template>
  <figure v-if="portrait" class="people-portrait"><img :src="withBase(`/assets/illustrations/${portrait[0]}`)" :alt="portrait[1]" /><figcaption>{{ portrait[1] }}</figcaption></figure>
</template>

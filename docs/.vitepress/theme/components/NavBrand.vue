<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
const word = ref(null)
const open = ref(false)
let link
const on = () => (open.value = true)
const off = () => (open.value = false)
const evs = [['mouseenter', on], ['mouseleave', off], ['focus', on], ['blur', off]]
onMounted(() => { link = word.value?.closest('.title'); evs.forEach(([e, f]) => link?.addEventListener(e, f)) })
onBeforeUnmount(() => evs.forEach(([e, f]) => link?.removeEventListener(e, f)))
</script>

<template>
  <span class="brand" :class="{ open }" aria-label="Avarra">
    <svg class="brand-spear" viewBox="0 0 24 64" aria-hidden="true">
      <path fill="currentColor" d="M12 1 17.5 16 14 19.5V22h-4v-2.5L6.5 16Zm-1 22h2v32h-2Zm-.5 32h3L12 63Z" />
    </svg>
    <span ref="word" class="brand-word" aria-hidden="true"><i v-for="(c, n) in 'AVARRA'" :key="n" :style="{ '--n': n }">{{ c }}</i></span>
  </span>
</template>

<style scoped>
.brand { display: inline-flex; align-items: center; gap: 14px; color: var(--vp-c-brand-3); perspective: 300px; }
.dark .brand { color: var(--vp-c-brand-1); }
.brand-spear { flex: none; width: 16px; height: 38px; transition: transform .9s cubic-bezier(.6, 0, .2, 1); }
.brand-word { display: inline-flex; font: 600 1.3rem/1 var(--font-display); letter-spacing: .26em; margin-right: -.26em; }
.brand-word i { font-style: normal; opacity: 0; transform: translateY(45%); transition: opacity .3s, transform .45s cubic-bezier(.22, 1, .36, 1); transition-delay: calc((5 - var(--n)) * 30ms); }
.open .brand-spear { transform: rotateY(360deg); }
.open .brand-word i { opacity: 1; transform: none; transition-delay: calc(var(--n) * 70ms + 150ms); }
@media (hover: none) { .brand-word i { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .brand-spear, .brand-word i { transition: none; } }
</style>

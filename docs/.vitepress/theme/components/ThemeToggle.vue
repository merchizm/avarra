<script setup>
import { inject } from 'vue'
import { useData } from 'vitepress'
const { isDark } = useData()
const toggle = inject('toggle-appearance', () => { isDark.value = !isDark.value })
</script>

<template>
  <button class="tt" type="button" :aria-pressed="isDark" aria-label="Tema / Theme" @click="toggle($event)">
    <svg class="tt-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="currentColor" /><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M5.3 18.7 7 17M17 7l1.7-1.7" /></g></svg>
    <svg class="tt-moon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" /></svg>
  </button>
</template>

<style scoped>
.tt { position: relative; display: grid; width: 40px; height: 40px; margin-left: 10px; place-items: center; padding: 0; overflow: hidden; border: 0; border-radius: 50%; background: transparent; box-shadow: inset 0 0 0 1px var(--vp-c-divider); color: var(--vp-c-brand-3); cursor: pointer; transition: background .3s, color .3s, box-shadow .3s; }
.tt:hover, .tt:focus-visible { outline: 0; background: var(--vp-c-brand-3); color: #f4e6c8; box-shadow: none; }
.dark .tt { color: var(--vp-c-brand-1); }
.dark .tt:hover, .dark .tt:focus-visible { background: var(--vp-c-brand-1); color: #2a1500; }
.tt svg { grid-area: 1 / 1; width: 20px; height: 20px; transition: transform .6s cubic-bezier(.34, 1.56, .64, 1), opacity .3s; }
.tt-moon { transform: rotate(-90deg) scale(.4); opacity: 0; }
.dark .tt-sun { transform: rotate(90deg) scale(.4); opacity: 0; }
.dark .tt-moon { transform: none; opacity: 1; }
</style>

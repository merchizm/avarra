<script setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import timelineIndex from 'virtual:avarra-timeline-index'

const props = defineProps({
  events: { type: Array, default: () => timelineIndex }
})

const { lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const selected = ref('all')

const labels = {
  event: { tr: 'Olaylar', en: 'Events' },
  war: { tr: 'Savaşlar', en: 'Wars' },
  founding: { tr: 'Kuruluşlar', en: 'Foundings' },
  migration: { tr: 'Göçler', en: 'Migrations' }
}
const label = (type) => labels[type]?.[isEnglish.value ? 'en' : 'tr'] || type

const localeEvents = computed(() => props.events.filter((e) => isEnglish.value === e.path.startsWith('/en/')))
const types = computed(() => [...new Set(localeEvents.value.map((e) => e.type))])
const visible = computed(() => localeEvents.value.filter((e) => selected.value === 'all' || e.type === selected.value))
</script>

<template>
  <section class="tl" :aria-label="isEnglish ? 'Timeline of Avarra' : 'Avarra zaman çizelgesi'">
    <header class="tl-head">
      <div>
        <p class="tl-kicker">{{ isEnglish ? 'Chronicle' : 'Kronik' }}</p>
        <h2>{{ isEnglish ? 'The unfolding of Avarra' : 'Avarra’nın zaman akışı' }}</h2>
      </div>
      <div v-if="types.length > 1" class="tl-filters" role="group" :aria-label="isEnglish ? 'Filter events' : 'Olayları filtrele'">
        <button type="button" :aria-pressed="selected === 'all'" @click="selected = 'all'">{{ isEnglish ? 'All' : 'Tümü' }}</button>
        <button v-for="t in types" :key="t" type="button" :aria-pressed="selected === t" @click="selected = t">{{ label(t) }}</button>
      </div>
    </header>

    <ol class="tl-list">
      <li v-for="e in visible" :key="`${e.path}-${e.title}-${e.label}`" class="tl-item" :class="`is-${e.type}`">
        <span class="tl-dot" aria-hidden="true"></span>
        <a :href="withBase(e.path)">
          <small>{{ e.label }}</small>
          <strong>{{ e.title }}</strong>
          <p>{{ e.summary }}</p>
          <span class="tl-more">{{ isEnglish ? 'Open record →' : 'Kaydı aç →' }}</span>
        </a>
      </li>
    </ol>
    <p v-if="!visible.length" class="tl-empty">{{ isEnglish ? 'No events found.' : 'Olay bulunamadı.' }}</p>
  </section>
</template>

<style scoped>
.tl { margin: 5rem 0 2rem; color: var(--vp-c-text-1); }
.tl-head { display: flex; flex-wrap: wrap; gap: 1.2rem 2rem; align-items: end; justify-content: space-between; margin-bottom: 2.6rem; padding-top: 2.4rem; border-top: 1px solid var(--vp-c-divider); }
.tl-kicker { margin: 0 0 .6rem; color: var(--vp-c-brand-1); font: 500 .78rem var(--font-ui); letter-spacing: .16em; text-transform: uppercase; }
.tl h2 { margin: 0; padding: 0; border: 0; font: 500 clamp(1.9rem, 3.6vw, 2.8rem)/1.08 var(--font-display); letter-spacing: -.03em; }
.tl h2::after { display: none; }
.tl-filters { display: flex; flex-wrap: wrap; gap: .5rem; }
.tl-filters button { padding: .55em 1.15em; border: 0; border-radius: 999px; background: transparent; box-shadow: inset 0 0 0 1px var(--vp-c-divider); color: var(--vp-c-text-1); font: 500 .92rem var(--font-ui); cursor: pointer; transition: background .3s, color .3s, box-shadow .3s; }
.tl-filters button:hover { box-shadow: inset 0 0 0 1px var(--vp-c-brand-1); }
.tl-filters button[aria-pressed='true'] { background: var(--vp-c-brand-3); color: #f4e6c8; box-shadow: none; }
.dark .tl-filters button[aria-pressed='true'] { background: var(--vp-c-brand-1); color: #2a1500; }

.tl-list { position: relative; margin: 0; padding: 0 0 0 2rem; list-style: none; }
.tl-list::before { position: absolute; top: .4rem; bottom: .4rem; left: .55rem; width: 1px; background: linear-gradient(transparent, var(--vp-c-brand-1) 4%, var(--vp-c-brand-1) 96%, transparent); content: ''; opacity: .55; }
.tl-item { position: relative; margin: 0 0 1rem; padding: 0; }
.tl-dot { position: absolute; top: 1.4rem; left: -2rem; width: 13px; height: 13px; border-radius: 50%; background: var(--vp-c-brand-3); box-shadow: 0 0 0 4px var(--vp-c-bg), 0 0 0 5px var(--vp-c-brand-1); }
.dark .tl-dot { background: var(--vp-c-brand-1); }
.is-war .tl-dot { background: #8a1f1f; }
.is-founding .tl-dot { background: #b98a42; }
.is-migration .tl-dot { background: #3f7a79; }
.tl-item a { display: block; padding: 1.3rem 1.5rem; border-radius: 22px; color: inherit; text-decoration: none; box-shadow: inset 0 0 0 1px var(--vp-c-divider); background: var(--vp-c-bg-elv); transition: box-shadow .4s, transform .5s cubic-bezier(.22, 1, .36, 1); }
.tl-item a:hover, .tl-item a:focus-visible { box-shadow: inset 0 0 0 1px var(--vp-c-brand-1), 0 22px 36px -24px rgba(60, 30, 0, .4); outline: 0; transform: translateY(-3px); }
.tl small { display: block; color: var(--vp-c-brand-1); font: 500 .72rem var(--font-ui); letter-spacing: .14em; text-transform: uppercase; }
.tl strong { display: block; margin-top: .4rem; font: 500 1.35rem/1.25 var(--font-display); letter-spacing: -.01em; }
.tl-item p { display: -webkit-box; margin: .6rem 0 0; overflow: hidden; color: var(--vp-c-text-2); font: .95rem/1.6 var(--font-ui); -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
.tl-more { display: block; margin-top: .8rem; color: var(--vp-c-brand-1); font: 500 .88rem var(--font-ui); }
.tl-empty { margin: 0; text-align: center; color: var(--vp-c-text-2); }

@media (min-width: 900px) {
  .tl-list { padding: 0; }
  .tl-list::before { left: calc(50% - .5px); }
  .tl-item { width: calc(50% - 2.2rem); }
  .tl-item:nth-child(odd) { margin-right: auto; }
  .tl-item:nth-child(even) { margin-left: auto; }
  .tl-item:nth-child(odd) .tl-dot { right: -2.75rem; left: auto; }
  .tl-item:nth-child(even) .tl-dot { left: -2.75rem; }
  .tl-item:nth-child(odd) a { text-align: right; }
}
</style>

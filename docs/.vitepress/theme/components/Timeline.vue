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
.tl {
  --tl-ink: #352817; --tl-accent: #87501f; --tl-line: #8f642b; --tl-card: rgb(255 249 225 / .6); --tl-card-hover: #fff3d3; --tl-border: rgb(88 59 20 / .38);
  margin: 2rem 0 2.5rem;
  padding: clamp(1rem, 3vw, 1.75rem);
  border: 1px solid #8b7143;
  background:
    linear-gradient(90deg, rgb(94 67 29 / .07) 1px, transparent 1px) 0 0 / 1.6rem 1.6rem,
    radial-gradient(circle at 15% 0%, rgb(255 233 177 / .25), transparent 29rem),
    #e9dbb9;
  box-shadow: inset 0 0 3rem rgb(85 55 21 / .12), 0 .75rem 1.7rem rgb(0 0 0 / .13);
  color: var(--tl-ink);
}

.tl-head { display: flex; gap: 1rem; align-items: end; justify-content: space-between; margin-bottom: 1.5rem; }
.tl-kicker { margin: 0 0 .25rem; color: var(--tl-accent); font-family: Cinzel, Georgia, serif; font-size: .7rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
.tl h2 { margin: 0; padding: 0; border: 0; color: inherit; font-family: Cinzel, Georgia, serif; font-size: clamp(1.15rem, 2.4vw, 1.55rem); letter-spacing: 0; }
.tl h2::after { display: none; }

.tl-filters { display: flex; gap: .4rem; }
.tl-filters button { flex: none; padding: .45rem .7rem; border: 1px solid var(--tl-border); background: transparent; color: inherit; font-family: Cinzel, Georgia, serif; font-size: .62rem; letter-spacing: .05em; cursor: pointer; transition: background .15s, color .15s; }
.tl-filters button:hover, .tl-filters button:focus-visible { border-color: #9f6426; outline: 0; }
.tl-filters button[aria-pressed='true'] { border-color: #9f6426; background: #70451f; color: #fff1c9; }

/* mobile first: spine on the left, cards stacked */
.tl-list { position: relative; margin: 0; padding: 0 0 0 1.6rem; list-style: none; }
.tl-list::before { position: absolute; top: .4rem; bottom: .4rem; left: .45rem; width: 2px; background: linear-gradient(transparent, var(--tl-line) 4%, var(--tl-line) 96%, transparent); content: ''; }
.tl-item { position: relative; margin: 0 0 1rem; padding: 0; }
.tl-item:last-child { margin-bottom: 0; }
.tl-dot { position: absolute; top: 1rem; left: -1.6rem; width: 1rem; height: 1rem; border: 3px solid #f7e9c8; border-radius: 50%; background: #7b3d20; box-shadow: 0 0 0 2px #7b3d20; }
.is-war .tl-dot { background: #9e2f28; box-shadow: 0 0 0 2px #9e2f28; }
.is-founding .tl-dot { background: #9a7624; box-shadow: 0 0 0 2px #9a7624; }
.is-migration .tl-dot { background: #396f6e; box-shadow: 0 0 0 2px #396f6e; }

.tl-item a { display: block; padding: .95rem 1rem; border: 1px solid var(--tl-border); background: var(--tl-card); color: inherit; text-decoration: none; transition: transform .18s, box-shadow .18s, background .18s; }
.tl-item a:hover, .tl-item a:focus-visible { background: var(--tl-card-hover); box-shadow: 0 .5rem 1.1rem rgb(64 38 13 / .2); outline: 0; transform: translateY(-.15rem); }
.tl small { display: block; color: var(--tl-accent); font-family: Cinzel, Georgia, serif; font-size: .68rem; letter-spacing: .1em; }
.tl strong { display: block; margin-top: .3rem; font-family: Cinzel, Georgia, serif; font-size: .92rem; line-height: 1.35; }
.tl-item p { display: -webkit-box; margin: .5rem 0 0; overflow: hidden; font-size: .85rem; line-height: 1.55; opacity: .82; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
.tl-more { display: block; margin-top: .6rem; color: var(--tl-accent); font-family: Cinzel, Georgia, serif; font-size: .6rem; letter-spacing: .08em; }
.tl-empty { margin: 0; text-align: center; opacity: .7; }

@media (max-width: 700px) {
  .tl-head { display: block; }
  .tl-filters { margin: .9rem -.5rem 0 0; padding-bottom: .25rem; overflow-x: auto; scrollbar-width: none; }
}

/* desktop: centered spine, cards alternate */
@media (min-width: 900px) {
  .tl-list { padding: 0; }
  .tl-list::before { left: calc(50% - 1px); }
  .tl-item { width: calc(50% - 1.6rem); }
  .tl-item:nth-child(odd) { margin-right: auto; }
  .tl-item:nth-child(even) { margin-left: auto; }
  .tl-item:nth-child(odd) .tl-dot { right: -1.1rem; left: auto; }
  .tl-item:nth-child(even) .tl-dot { left: -1.1rem; }
  .tl-item:nth-child(odd) a { text-align: right; }
}
</style>

<style>
/* unscoped: VitePress toggles .dark on <html> */
.dark .tl {
  --tl-ink: #eadab6; --tl-accent: #d9a566; --tl-card: rgb(3 16 19 / .38); --tl-card-hover: #263735; --tl-border: rgb(231 200 139 / .24);
  border-color: #8c7650;
  background:
    linear-gradient(90deg, rgb(229 193 122 / .05) 1px, transparent 1px) 0 0 / 1.6rem 1.6rem,
    radial-gradient(circle at 15% 0%, rgb(191 142 61 / .12), transparent 29rem),
    #1a2524;
}
</style>

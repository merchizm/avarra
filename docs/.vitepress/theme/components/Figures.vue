<script setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { figures, figureKinds, figureLabels } from '../data/figures.js'

const { lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const l = computed(() => (isEnglish.value ? 'en' : 'tr'))
const t = computed(() => figureLabels[l.value])
const selected = ref('all')

const kinds = computed(() => [...new Set(figures.map((f) => f.kind))])
const visible = computed(() => figures.filter((f) => selected.value === 'all' || f.kind === selected.value))
const count = (k) => figures.filter((f) => k === 'all' || f.kind === k).length
const href = (f) => withBase(`${isEnglish.value ? '/en' : ''}/kisiler/${f.id}`)
</script>

<template>
  <section class="fg" :aria-label="isEnglish ? 'Figures of Avarra' : 'Avarra kişileri'">
    <header class="fg-head">
      <p class="fg-kicker">{{ isEnglish ? 'Who shapes the world' : 'Dünyayı yönlendirenler' }}</p>
      <h1>{{ isEnglish ? 'Figures' : 'Kişiler' }}</h1>
      <p class="fg-lead">{{ isEnglish ? 'Rulers, heirs, regents and voices named in the record. Each has a page of their own.' : 'Kayıtta adı geçen hükümdarlar, veliahtlar, naipler ve sesler. Her birinin kendi sayfası var.' }}</p>
    </header>

    <div class="fg-filters" role="group" :aria-label="isEnglish ? 'Filter figures' : 'Kişileri filtrele'">
      <button type="button" :class="{ on: selected === 'all' }" :aria-pressed="selected === 'all'" @click="selected = 'all'">{{ t.all }} <i>{{ count('all') }}</i></button>
      <button v-for="k in kinds" :key="k" type="button" :class="{ on: selected === k }" :aria-pressed="selected === k" @click="selected = k">{{ figureKinds[k][l] }} <i>{{ count(k) }}</i></button>
    </div>

    <TransitionGroup name="fgc" tag="div" class="fg-grid">
      <a v-for="(f, i) in visible" :key="f.id" :href="href(f)" class="fg-card" :style="{ '--i': Math.min(i, 11) }">
        <span class="fg-portrait" :class="{ 'has-image': f.portraits.length }">
          <img v-if="f.portraits.length" :src="withBase(f.portraits[0].thumb)" :alt="f[l].name" loading="lazy" />
          <template v-else>
            <span class="fg-initial" aria-hidden="true">{{ f[l].name.charAt(0) }}</span>
            <small>{{ t.empty }}</small>
          </template>
        </span>
        <span class="fg-meta">{{ figureKinds[f.kind][l] }} · {{ f.place }}</span>
        <h2>{{ f[l].name }}</h2>
        <p class="fg-role">{{ f[l].role }}</p>
      </a>
    </TransitionGroup>
  </section>
</template>

<style scoped>
.fg { width: min(100% - 40px, 1240px); margin: 3rem auto 5rem; color: var(--vp-c-text-1); }
.fg-head { max-width: 44rem; }
.fg-kicker { margin: 0 0 .6rem; color: var(--vp-c-brand-1); font: 500 .78rem var(--font-ui); letter-spacing: .16em; text-transform: uppercase; }
.fg h1 { margin: 0 0 1rem; padding: 0; border: 0; color: var(--vp-c-brand-3); font: 500 clamp(2.6rem, 7vw, 5.2rem)/1 var(--font-display); letter-spacing: -.035em; }
.dark .fg h1 { color: var(--vp-c-text-1); }
.fg-lead { margin: 0; color: var(--vp-c-text-2); font-size: 1.15rem; line-height: 1.6; }
.fg-filters { display: flex; flex-wrap: wrap; gap: .5rem; margin: 2.4rem 0 2.2rem; padding-top: 1.6rem; border-top: 1px solid var(--vp-c-divider); }
.fg-filters button { display: inline-flex; gap: .5em; align-items: center; padding: .55em 1.1em; border: 0; border-radius: 999px; background: transparent; box-shadow: inset 0 0 0 1px var(--vp-c-divider); color: var(--vp-c-text-1); font: 500 .92rem var(--font-ui); cursor: pointer; transition: background .3s, color .3s, box-shadow .3s; }
.fg-filters button i { color: var(--vp-c-text-3); font-size: .78rem; font-style: normal; }
.fg-filters button:hover { box-shadow: inset 0 0 0 1px var(--vp-c-brand-1); }
.fg-filters button.on { background: var(--vp-c-brand-3); color: #f4e6c8; box-shadow: none; }
.fg-filters button.on i { color: rgba(244, 230, 200, .7); }
.dark .fg-filters button.on { background: var(--vp-c-brand-1); color: #2a1500; }
.dark .fg-filters button.on i { color: rgba(42, 21, 0, .6); }

.fg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr)); gap: 3rem 1.6rem; align-items: start; }
.fg-card { display: block; color: inherit; text-decoration: none; transition: transform .5s cubic-bezier(.22, 1, .36, 1); }
.fg-card:hover, .fg-card:focus-visible { transform: translateY(-8px); outline: 0; }
.fg-portrait { position: relative; display: grid; place-items: center; align-content: center; gap: .4rem; aspect-ratio: 3 / 4; overflow: hidden; border-radius: 999px 999px 18px 18px; background: radial-gradient(circle at 50% 40%, #8a2a22, #590e0e 72%); color: #d9b878; box-shadow: 0 0 0 1px var(--vp-c-divider), 0 18px 30px -18px rgba(60, 30, 0, .5); transition: box-shadow .5s; }
.fg-portrait.has-image { background: #322631; }
.fg-card:hover .fg-portrait, .fg-card:focus-visible .fg-portrait { box-shadow: 0 0 0 1px var(--vp-c-brand-1), 0 0 0 7px var(--vp-c-bg), 0 0 0 8px var(--vp-c-brand-1), 0 28px 40px -20px rgba(60, 30, 0, .55); }
.fg-portrait img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 8%; filter: saturate(.85) sepia(.08); transition: transform 1s cubic-bezier(.22, 1, .36, 1), filter .5s; }
.fg-card:hover .fg-portrait img { transform: scale(1.06); filter: none; }
.fg-initial { display: grid; place-items: center; width: 4.4rem; height: 4.4rem; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(217, 184, 120, .55); font: 2rem var(--font-display); }
.fg-portrait small { font: .65rem var(--font-ui); letter-spacing: .1em; text-transform: uppercase; opacity: .75; }
.fg-meta { display: block; margin-top: 1.2rem; color: var(--vp-c-brand-1); font: 500 .7rem var(--font-ui); letter-spacing: .13em; text-align: center; text-transform: uppercase; }
.fg-card h2 { margin: .35rem 0 0; padding: 0; border: 0; font: 500 1.6rem/1.15 var(--font-display); letter-spacing: -.02em; text-align: center; }
.fg-card h2::after { display: none; }
.fg-role { margin: .4rem 0 0; color: var(--vp-c-text-2); font: italic 1.02rem/1.4 var(--font-display); text-align: center; }

.fgc-enter-active { transition: opacity .4s ease, transform .5s cubic-bezier(.22, 1, .36, 1); transition-delay: calc(var(--i, 0) * 30ms); }
.fgc-leave-active { transition: opacity .15s ease, transform .15s ease; }
.fgc-move { transition: transform .45s cubic-bezier(.22, 1, .36, 1); }
.fgc-enter-from { opacity: 0; transform: translateY(16px) scale(.98); }
.fgc-leave-to { opacity: 0; transform: scale(.97); }
@media (max-width: 700px) { .fg { width: min(100% - 32px, 1240px); } .fg-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2rem .9rem; } .fg-card h2 { font-size: 1.2rem; } .fg-role { font-size: .9rem; } .fg-meta { font-size: .62rem; } }
@media (prefers-reduced-motion: reduce) { .fgc-enter-active, .fgc-leave-active, .fgc-move { transition: none; } }
</style>

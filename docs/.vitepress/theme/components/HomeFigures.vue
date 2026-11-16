<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { figures, figureKinds } from '../data/figures.js'

const featured = ['elyra', 'samara', 'doran', 'serel', 'zhaqara', 'ysgrim']
const { lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const l = computed(() => (isEnglish.value ? 'en' : 'tr'))
const items = computed(() => featured.map((id) => figures.find((f) => f.id === id)).filter((f) => f?.portraits.length))
const href = (f) => withBase(`${isEnglish.value ? '/en' : ''}/kisiler/${f.id}`)
</script>

<template>
  <section class="hf" :aria-label="isEnglish ? 'Figures of Avarra' : 'Avarra kişileri'">
    <header class="hf-head">
      <div>
        <p class="lore-kicker">{{ isEnglish ? 'Faces' : 'Yüzler' }}</p>
        <h2>{{ isEnglish ? 'The faces behind the records' : 'Kayıtların ardındaki yüzler' }}</h2>
      </div>
      <a :href="withBase(`${isEnglish ? '/en' : ''}/kisiler/`)">{{ isEnglish ? 'All figures →' : 'Tüm kişiler →' }}</a>
    </header>
    <div class="hf-grid">
      <a v-for="f in items" :key="f.id" :href="href(f)" class="hf-card">
        <img :src="withBase(f.portraits[0].thumb)" :alt="f[l].name" loading="lazy" />
        <span class="hf-kind">{{ figureKinds[f.kind][l] }}</span>
        <span class="hf-text"><strong>{{ f[l].name }}</strong><small>{{ f.state[l] }}</small></span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.hf { max-width: 1240px; margin: 5rem auto 6rem; padding: 0 1rem; }
.hf-head { display: flex; gap: 1rem; align-items: end; justify-content: space-between; margin-bottom: 2.6rem; }
.hf-head .lore-kicker { margin: 0 0 .4rem; }
.hf h2 { margin: 0; padding: 0; border: 0; font: 500 clamp(1.9rem, 4vw, 3rem)/1.05 var(--font-display); letter-spacing: -.03em; }
.hf h2::after { display: none; }
.hf-head > a { flex: none; padding: .7rem 1.3rem; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--vp-c-brand-1); color: var(--vp-c-brand-1); font: 500 .95rem var(--font-ui); text-decoration: none; transition: background .3s, color .3s; }
.hf-head > a:hover { background: var(--vp-c-brand-1); color: var(--vp-c-bg); }
.hf-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1.1rem; align-items: start; }
.hf-card { display: block; color: var(--vp-c-text-1); text-decoration: none; transition: transform .5s cubic-bezier(.22, 1, .36, 1); }
.hf-card:nth-child(even) { margin-top: 2.2rem; }
.hf-card:hover, .hf-card:focus-visible { transform: translateY(-8px); outline: 0; }
.hf-card img { display: block; width: 100%; aspect-ratio: 3 / 4; object-fit: cover; object-position: center 10%; border-radius: 999px 999px 14px 14px; background: #322631; box-shadow: 0 0 0 1px var(--vp-c-divider), 0 14px 26px -14px rgba(60, 30, 0, .45); transition: box-shadow .5s, filter .5s; filter: saturate(.8) sepia(.12); }
.hf-card:hover img, .hf-card:focus-visible img { box-shadow: 0 0 0 1px var(--vp-c-brand-1), 0 0 0 6px var(--vp-c-bg), 0 0 0 7px var(--vp-c-brand-1), 0 22px 34px -16px rgba(60, 30, 0, .55); filter: none; }
.hf-kind { display: block; margin-top: 1rem; color: var(--vp-c-brand-1); font: 500 .68rem var(--font-ui); letter-spacing: .12em; text-align: center; text-transform: uppercase; }
.hf-text { display: grid; gap: .15rem; margin-top: .25rem; text-align: center; }
.hf-text strong { font: 500 1.2rem/1.2 var(--font-display); letter-spacing: -.01em; }
.hf-text small { color: var(--vp-c-text-2); font: .85rem var(--font-ui); }
@media (max-width: 1000px) { .hf-grid { grid-template-columns: repeat(3, 1fr); } .hf-card:nth-child(even) { margin-top: 0; } .hf-card:nth-child(3n+2) { margin-top: 2rem; } }
@media (max-width: 560px) { .hf-grid { grid-template-columns: repeat(2, 1fr); } .hf-card:nth-child(3n+2) { margin-top: 0; } .hf-card:nth-child(even) { margin-top: 1.6rem; } .hf-head { display: block; } .hf-head > a { display: inline-block; margin-top: 1rem; } }
</style>

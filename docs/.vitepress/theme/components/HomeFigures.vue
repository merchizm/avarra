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
.hf { max-width: 1120px; margin: 3.5rem auto 5rem; padding: 0 1px; }
.hf-head { display: flex; gap: 1rem; align-items: end; justify-content: space-between; margin-bottom: 1.2rem; }
.hf-head .lore-kicker { margin: 0 0 .3rem; }
.hf h2 { margin: 0; padding: 0; border: 0; font-family: Cinzel, Georgia, serif; font-size: clamp(1.3rem, 3vw, 1.9rem); }
.hf h2::after { display: none; }
.hf-head > a { flex: none; color: var(--vp-c-brand-1); font-family: Cinzel, Georgia, serif; font-size: .68rem; font-weight: 700; letter-spacing: .08em; text-decoration: none; text-transform: uppercase; }
.hf-head > a:hover { text-decoration: underline; }
.hf-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: .8rem; }
.hf-card { position: relative; display: block; aspect-ratio: 3 / 4; overflow: hidden; border: 1px solid var(--vp-c-divider); background: #322631; color: #f5e8ce; text-decoration: none; }
.hf-card img { width: 100%; height: 100%; object-fit: cover; object-position: center 8%; transition: transform .35s ease; }
.hf-card:hover img, .hf-card:focus-visible img { transform: scale(1.05); }
.hf-card:focus-visible { outline: 2px solid #f2cf7c; outline-offset: 2px; }
.hf-card::after { position: absolute; inset: 45% 0 0; background: linear-gradient(transparent, rgb(20 12 16 / .88)); content: ''; }
.hf-kind { position: absolute; z-index: 1; top: .5rem; left: .5rem; padding: .22rem .4rem; background: rgb(30 20 25 / .78); font-family: Cinzel, Georgia, serif; font-size: .5rem; letter-spacing: .08em; text-transform: uppercase; }
.hf-text { position: absolute; z-index: 1; right: .65rem; bottom: .6rem; left: .65rem; display: grid; gap: .1rem; }
.hf-text strong { font-family: Cinzel, Georgia, serif; font-size: .82rem; line-height: 1.2; }
.hf-text small { font-size: .66rem; opacity: .8; }
@media (max-width: 900px) { .hf-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 520px) { .hf-grid { grid-template-columns: repeat(2, 1fr); } .hf-head { display: block; } .hf-head > a { display: inline-block; margin-top: .6rem; } }
</style>

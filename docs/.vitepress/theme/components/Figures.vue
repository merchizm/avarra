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
const href = (f) => withBase(`${isEnglish.value ? '/en' : ''}/kisiler/${f.id}`)
</script>

<template>
  <section class="fg" :aria-label="isEnglish ? 'Figures of Avarra' : 'Avarra kişileri'">
    <header class="fg-head">
      <div>
        <p class="fg-kicker">{{ isEnglish ? 'Who shapes the world' : 'Dünyayı yönlendirenler' }}</p>
        <h1>{{ isEnglish ? 'Figures' : 'Kişiler' }}</h1>
        <p class="fg-lead">{{ isEnglish ? 'Rulers, heirs, regents and voices named in the record. Each has a page of their own.' : 'Kayıtta adı geçen hükümdarlar, veliahtlar, naipler ve sesler. Her birinin kendi sayfası var.' }}</p>
      </div>
      <div class="fg-filters" role="group" :aria-label="isEnglish ? 'Filter figures' : 'Kişileri filtrele'">
        <button type="button" :aria-pressed="selected === 'all'" @click="selected = 'all'">{{ t.all }}</button>
        <button v-for="k in kinds" :key="k" type="button" :aria-pressed="selected === k" @click="selected = k">{{ figureKinds[k][l] }}</button>
      </div>
    </header>

    <div class="fg-grid">
      <a v-for="f in visible" :key="f.id" :href="href(f)" class="fg-card">
        <div class="fg-portrait" :class="{ 'has-image': f.portraits.length }">
          <img v-if="f.portraits.length" :src="withBase(f.portraits[0].thumb)" :alt="f[l].name" loading="lazy" />
          <template v-else>
            <span class="fg-initial" aria-hidden="true">{{ f[l].name.charAt(0) }}</span>
            <small>{{ t.empty }}</small>
          </template>
          <span class="fg-kind">{{ figureKinds[f.kind][l] }}</span>
        </div>
        <div class="fg-body">
          <p class="fg-place">{{ f.place }} · {{ f.state[l] }}</p>
          <h2>{{ f[l].name }}</h2>
          <p class="fg-people">{{ f.people[l] }}</p>
          <p class="fg-role">{{ f[l].role }}</p>
          <p class="fg-canon">{{ f[l].canon }}</p>
          <span class="fg-open">{{ t.open }} →</span>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.fg { --f-ink: #352817; --f-accent: #87501f; --f-border: rgb(88 59 20 / .38); --f-card: rgb(255 249 225 / .62); width: min(100% - 40px, 1240px); margin: 2.4rem auto 5rem; color: var(--f-ink); }
.fg-head { display: flex; gap: 1.5rem; align-items: end; justify-content: space-between; padding-bottom: 1.6rem; border-bottom: 1px solid var(--f-border); }
.fg-kicker { margin: 0 0 .3rem; color: var(--f-accent); font-family: Cinzel, Georgia, serif; font-size: .72rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
.fg h1 { margin: 0 0 .6rem; padding: 0; border: 0; color: inherit; font-family: Cinzel, Georgia, serif; font-size: clamp(2rem, 7vw, 3.6rem); line-height: 1.12; letter-spacing: .02em; }
.fg-lead { max-width: 44rem; margin: 0; line-height: 1.65; opacity: .85; }
.fg-filters { display: flex; flex-wrap: wrap; gap: .4rem; justify-content: end; }
.fg-filters button { padding: .5rem .75rem; border: 1px solid var(--f-border); background: transparent; color: inherit; font-family: Cinzel, Georgia, serif; font-size: .62rem; letter-spacing: .05em; cursor: pointer; }
.fg-filters button:hover, .fg-filters button:focus-visible { border-color: #9f6426; outline: 0; }
.fg-filters button[aria-pressed='true'] { border-color: #9f6426; background: #70451f; color: #fff1c9; }

.fg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr)); gap: 1.25rem; margin-top: 1.8rem; align-items: stretch; }
.fg-card { display: flex; flex-direction: column; overflow: hidden; border: 1px solid var(--f-border); background: var(--f-card); box-shadow: 0 .6rem 1.4rem rgb(58 34 25 / .12); color: inherit; text-decoration: none; transition: transform .18s, box-shadow .18s; }
.fg-card:hover, .fg-card:focus-visible { transform: translateY(-.25rem); box-shadow: 0 1rem 1.8rem rgb(58 34 25 / .2); outline: 0; }
.fg-portrait { position: relative; display: grid; place-items: center; align-content: center; gap: .4rem; aspect-ratio: 1 / 1; overflow: hidden; background: radial-gradient(circle at 50% 40%, #c99876, #533041 72%); color: #f6d8a1; }
.fg-portrait.has-image { background: #322631; }
.fg-portrait img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 4%; }
.fg-initial { display: grid; place-items: center; width: 4.2rem; height: 4.2rem; border: 1px solid rgb(255 244 214 / .6); font-family: Cinzel, Georgia, serif; font-size: 2rem; }
.fg-portrait small { font-family: Cinzel, Georgia, serif; font-size: .56rem; letter-spacing: .1em; text-transform: uppercase; opacity: .75; }
.fg-kind { position: absolute; left: .7rem; bottom: .65rem; padding: .28rem .45rem; background: rgb(30 20 25 / .78); color: #f5e8ce; font-family: Cinzel, Georgia, serif; font-size: .58rem; letter-spacing: .08em; text-transform: uppercase; }
.fg-body { display: flex; flex: 1; flex-direction: column; padding: 1.1rem 1.2rem 1.2rem; }
.fg-place { margin: 0; color: var(--f-accent); font-family: Cinzel, Georgia, serif; font-size: .6rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.fg-card h2 { margin: .35rem 0 .15rem; padding: 0; border: 0; font-family: Cinzel, Georgia, serif; font-size: 1.3rem; }
.fg-card h2::after { display: none; }
.fg-people { margin: 0 0 .2rem; color: var(--f-accent); font-family: Cinzel, Georgia, serif; font-size: .64rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
.fg-role { margin: 0 0 .7rem; font-style: italic; opacity: .8; }
.fg-canon { display: -webkit-box; margin: 0 0 .9rem; overflow: hidden; font-size: .9rem; line-height: 1.55; -webkit-box-orient: vertical; -webkit-line-clamp: 4; }
.fg-open { margin-top: auto; color: var(--f-accent); font-family: Cinzel, Georgia, serif; font-size: .62rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; }

@media (max-width: 700px) {
  .fg { width: min(100% - 32px, 1240px); }
  .fg-head { display: block; }
  .fg-filters { justify-content: start; margin-top: 1rem; }
}
</style>

<style>
.dark .fg { --f-ink: #eadab6; --f-accent: #d9a566; --f-border: rgb(231 200 139 / .26); --f-card: rgb(3 16 19 / .42); --f-soft: rgb(231 200 139 / .07); }
.dark .fg-card { box-shadow: 0 .6rem 1.4rem rgb(0 0 0 / .3); }
</style>

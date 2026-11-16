<script setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { figures, figureKinds, figureLabels, figureFields, figureStyle } from '../data/figures.js'

const { lang, page } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const l = computed(() => (isEnglish.value ? 'en' : 'tr'))
const t = computed(() => figureLabels[l.value])
const f = computed(() => figures.find((x) => x.id === page.value.params?.id))
const prefix = computed(() => (isEnglish.value ? '/en' : ''))
const fullPrompt = computed(() => `${f.value.prompt}. ${figureStyle}`)
const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(fullPrompt.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1800)
  } catch { /* clipboard unavailable: the prompt stays selectable on the page */ }
}
</script>

<template>
  <article v-if="f" class="fp">
    <a class="fp-back" :href="withBase(`${prefix}/kisiler/`)"><span aria-hidden="true">←</span> {{ t.back.replace(/^[←\s]+/, '') }}</a>

    <div class="fp-layout">
      <aside class="fp-aside">
        <div class="fp-sticky">
          <figure v-for="(img, i) in f.portraits" :key="img.src" class="fp-portrait">
            <img :src="withBase(img.src)" :alt="f[l].name" :loading="i ? 'lazy' : 'eager'" />
            <figcaption v-if="img.caption">{{ img.caption[l] }}</figcaption>
          </figure>
          <div v-if="!f.portraits.length" class="fp-portrait fp-empty">
            <span class="fp-initial" aria-hidden="true">{{ f[l].name.charAt(0) }}</span>
            <small>{{ t.empty }}</small>
          </div>
          <dl class="fp-facts">
            <div><dt>{{ t.people }}</dt><dd>{{ f.people[l] }}</dd></div>
            <div><dt>{{ isEnglish ? 'Place' : 'Mekân' }}</dt><dd>{{ f.place }}</dd></div>
            <div><dt>{{ isEnglish ? 'State' : 'Devlet' }}</dt><dd><a :href="withBase(`${prefix}${f.state.link}`)">{{ f.state[l] }} →</a></dd></div>
          </dl>
        </div>
      </aside>

      <div class="fp-main">
        <p class="fp-kicker">{{ figureKinds[f.kind][l] }} · {{ f.place }}</p>
        <h1>{{ f[l].name }}</h1>
        <p class="fp-role">{{ f[l].role }}</p>
        <div class="fp-canon">
          <p class="fp-canon-label">{{ t.canon }}</p>
          <p>{{ f[l].canon }}</p>
        </div>

        <section v-for="(key, n) in figureFields.filter((k) => f[l][k])" :key="key" class="fp-section">
          <span class="fp-num">{{ String(n + 1).padStart(2, '0') }}</span>
          <h2>{{ t[key] }}</h2>
          <p>{{ f[l][key] }}</p>
        </section>

        <section v-if="!f.portraits.length" class="fp-prompt">
          <div class="fp-prompt-head">
            <h2>{{ t.prompt }}</h2>
            <button type="button" @click="copy">{{ copied ? t.done : t.copy }}</button>
          </div>
          <p>{{ fullPrompt }}</p>
        </section>
      </div>
    </div>
  </article>
</template>

<style scoped>
.fp { width: min(100% - 40px, 1180px); margin: 2.6rem auto 5rem; color: var(--vp-c-text-1); }
.fp-back { display: inline-flex; gap: .5em; padding: .5em 1.1em; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--vp-c-divider); color: var(--vp-c-text-1); font: 500 .9rem var(--font-ui); text-decoration: none; transition: background .3s, color .3s, box-shadow .3s; }
.fp-back:hover { background: var(--vp-c-brand-3); color: #f4e6c8; box-shadow: none; }
.dark .fp-back:hover { background: var(--vp-c-brand-1); color: #2a1500; }
.fp-layout { display: grid; grid-template-columns: 340px minmax(0, 1fr); gap: clamp(2rem, 6vw, 5rem); margin-top: 2.4rem; align-items: start; }
.fp-sticky { position: sticky; top: calc(var(--vp-nav-height) + 24px); display: grid; gap: 1.6rem; }
.fp-portrait { margin: 0; overflow: hidden; border-radius: 999px 999px 24px 24px; background: #322631; box-shadow: 0 0 0 1px var(--vp-c-divider), 0 0 0 8px var(--vp-c-bg), 0 0 0 9px var(--vp-c-divider), 0 30px 50px -26px rgba(60, 30, 0, .55); }
.fp-portrait img { display: block; width: 100%; height: auto; max-height: 520px; object-fit: cover; object-position: center 10%; filter: saturate(.88) sepia(.06); }
.fp-portrait + .fp-portrait { border-radius: 24px; }
.fp-portrait figcaption { padding: .7rem 1rem; background: var(--vp-c-bg-elv); color: var(--vp-c-text-2); font: .8rem var(--font-ui); letter-spacing: .08em; text-transform: uppercase; }
.fp-empty { display: grid; place-items: center; align-content: center; gap: .5rem; aspect-ratio: 3 / 4; background: radial-gradient(circle at 50% 40%, #8a2a22, #590e0e 72%); color: #d9b878; }
.fp-initial { display: grid; place-items: center; width: 5.5rem; height: 5.5rem; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(217, 184, 120, .55); font: 2.6rem var(--font-display); }
.fp-empty small { font: .68rem var(--font-ui); letter-spacing: .1em; text-transform: uppercase; opacity: .75; }
.fp-facts { margin: 0; padding: 1.1rem 1.3rem; border-radius: 20px; background: var(--vp-c-bg-elv); box-shadow: inset 0 0 0 1px var(--vp-c-divider); }
.fp-facts div { display: flex; gap: 1rem; justify-content: space-between; padding: .55rem 0; }
.fp-facts div + div { border-top: 1px solid var(--vp-c-divider); }
.fp-facts dt { color: var(--vp-c-brand-1); font: 500 .7rem var(--font-ui); letter-spacing: .12em; text-transform: uppercase; }
.fp-facts dd { margin: 0; font: .95rem/1.4 var(--font-ui); text-align: right; }
.fp-facts a { color: var(--vp-c-text-1); text-decoration: none; border-bottom: 1px solid var(--vp-c-brand-1); }
.fp-kicker { margin: 0 0 .7rem; color: var(--vp-c-brand-1); font: 500 .78rem var(--font-ui); letter-spacing: .16em; text-transform: uppercase; }
.fp h1 { margin: 0; padding: 0; border: 0; color: var(--vp-c-brand-3); font: 500 clamp(2.8rem, 6.5vw, 5.4rem)/1 var(--font-display); letter-spacing: -.035em; }
.dark .fp h1 { color: var(--vp-c-text-1); }
.fp-role { margin: 1rem 0 0; color: var(--vp-c-text-2); font: italic 1.5rem/1.35 var(--font-display); }
.fp-canon { position: relative; margin: 2.4rem 0 0; padding: 1.6rem 1.9rem; overflow: hidden; border-radius: 22px; background: radial-gradient(ellipse 60% 140% at 100% 0, #7a1a1a, transparent 70%), #590e0e; color: #f2e3c2; box-shadow: 0 24px 44px -26px rgba(60, 10, 8, .7); }
.fp-canon-label { margin: 0 0 .5rem; color: #d9b878; font: 500 .72rem var(--font-ui); letter-spacing: .14em; text-transform: uppercase; }
.fp-canon p:last-child { margin: 0; font-size: 1.18rem; line-height: 1.7; }
.fp-section { margin-top: 3rem; }
.fp-num { display: block; margin-bottom: .5rem; color: var(--vp-c-brand-1); font: 500 .75rem var(--font-ui); letter-spacing: .16em; }
.fp h2 { margin: 0 0 .8rem; padding: 0; border: 0; color: inherit; font: 500 1.9rem/1.15 var(--font-display); letter-spacing: -.025em; text-transform: none; }
.fp h2::after { content: ''; display: block; width: 36px; margin-top: .9rem; border-bottom: 1px solid var(--vp-c-brand-1); }
.fp-section p { margin: 0; font-size: 1.12rem; line-height: 1.8; }
.fp-prompt { margin-top: 3rem; padding: 1.4rem 1.6rem; border-radius: 20px; background: var(--vp-c-bg-elv); box-shadow: inset 0 0 0 1px var(--vp-c-divider); }
.fp-prompt-head { display: flex; gap: 1rem; align-items: center; justify-content: space-between; }
.fp-prompt h2 { margin: 0; font-size: 1.3rem; }
.fp-prompt h2::after { display: none; }
.fp-prompt-head button { padding: .5em 1.2em; border: 0; border-radius: 999px; background: var(--vp-c-brand-3); color: #f4e6c8; font: 500 .88rem var(--font-ui); cursor: pointer; }
.dark .fp-prompt-head button { background: var(--vp-c-brand-1); color: #2a1500; }
.fp-prompt p { margin: 1rem 0 0; font: .82rem/1.6 var(--vp-font-family-mono); word-break: break-word; user-select: all; }

@media (max-width: 900px) {
  .fp-layout { grid-template-columns: 1fr; }
  .fp-sticky { position: static; width: min(300px, 80%); margin: 0 auto; }
}
</style>

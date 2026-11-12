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
    <a class="fp-back" :href="withBase(`${prefix}/kisiler/`)">{{ t.back }}</a>

    <div class="fp-hero">
      <div class="fp-gallery">
        <figure v-for="(img, i) in f.portraits" :key="img.src" class="fp-portrait">
          <img :src="withBase(img.src)" :alt="f[l].name" :loading="i ? 'lazy' : 'eager'" />
          <figcaption v-if="img.caption">{{ img.caption[l] }}</figcaption>
        </figure>
        <div v-if="!f.portraits.length" class="fp-portrait fp-empty">
          <span class="fp-initial" aria-hidden="true">{{ f[l].name.charAt(0) }}</span>
          <small>{{ t.empty }}</small>
        </div>
      </div>
      <div class="fp-intro">
        <p class="fp-kicker">{{ figureKinds[f.kind][l] }} · {{ f.place }}</p>
        <h1>{{ f[l].name }}</h1>
        <p class="fp-role">{{ f[l].role }}</p>
        <p class="fp-people"><b>{{ t.people }}:</b> {{ f.people[l] }}</p>
        <p class="fp-state"><a :href="withBase(`${prefix}${f.state.link}`)">{{ f.state[l] }} →</a></p>
        <p class="fp-canon-label">{{ t.canon }}</p>
        <p class="fp-canon">{{ f[l].canon }}</p>
      </div>
    </div>


    <section v-for="key in figureFields" :key="key" class="fp-section">
      <h2>{{ t[key] }}</h2>
      <p>{{ f[l][key] }}</p>
    </section>

    <section v-if="!f.portraits.length" class="fp-prompt fp-card">
      <div class="fp-prompt-head">
        <h2>{{ t.prompt }}</h2>
        <button type="button" @click="copy">{{ copied ? t.done : t.copy }}</button>
      </div>
      <p>{{ fullPrompt }}</p>
    </section>
  </article>
</template>

<style scoped>
.fp { --f-ink: #352817; --f-accent: #87501f; --f-border: rgb(88 59 20 / .38); --f-soft: rgb(94 67 29 / .09); width: min(100% - 40px, 60rem); margin: 2.4rem auto 5rem; color: var(--f-ink); }
.fp-back { color: var(--f-accent); font-family: Cinzel, Georgia, serif; font-size: .68rem; font-weight: 700; letter-spacing: .08em; text-decoration: none; text-transform: uppercase; }
.fp-back:hover { text-decoration: underline; }
.fp-hero { display: grid; grid-template-columns: minmax(0, 18rem) minmax(0, 1fr); gap: 2rem; margin-top: 1.4rem; align-items: start; }
.fp-gallery { display: grid; gap: 1rem; }
.fp-portrait { margin: 0; overflow: hidden; border: 1px solid var(--f-border); background: #322631; }
.fp-portrait img { display: block; width: 100%; height: auto; }
.fp-portrait figcaption { padding: .55rem .7rem; background: var(--f-soft); font-family: Cinzel, Georgia, serif; font-size: .6rem; letter-spacing: .06em; text-transform: uppercase; }
.fp-empty { display: grid; place-items: center; align-content: center; gap: .5rem; aspect-ratio: 2 / 3; background: radial-gradient(circle at 50% 40%, #c99876, #533041 72%); color: #f6d8a1; }
.fp-initial { display: grid; place-items: center; width: 5rem; height: 5rem; border: 1px solid rgb(255 244 214 / .6); font-family: Cinzel, Georgia, serif; font-size: 2.4rem; }
.fp-portrait small { font-family: Cinzel, Georgia, serif; font-size: .58rem; letter-spacing: .1em; text-transform: uppercase; opacity: .75; }
.fp-kicker { margin: 0 0 .4rem; color: var(--f-accent); font-family: Cinzel, Georgia, serif; font-size: .7rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.fp h1 { margin: 0; padding: 0; border: 0; color: inherit; font-family: Cinzel, Georgia, serif; font-size: clamp(1.9rem, 6vw, 3rem); line-height: 1.12; }
.fp-role { margin: .4rem 0 .2rem; font-size: 1.1rem; font-style: italic; opacity: .85; }
.fp-people { margin: 0 0 .5rem; font-size: .95rem; }
.fp-people b { color: var(--f-accent); font-family: Cinzel, Georgia, serif; font-size: .68rem; letter-spacing: .08em; text-transform: uppercase; }
.fp-state { margin: 0 0 1.4rem; }
.fp-state a { color: var(--f-accent); font-family: Cinzel, Georgia, serif; font-size: .68rem; font-weight: 700; letter-spacing: .08em; text-decoration: none; text-transform: uppercase; }
.fp-canon-label { margin: 0 0 .3rem; padding-top: 1rem; border-top: 1px solid var(--f-border); color: var(--f-accent); font-family: Cinzel, Georgia, serif; font-size: .62rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.fp-canon { margin: 0; line-height: 1.7; }
.fp-section { margin-top: 1.8rem; }
.fp h2 { margin: 0 0 .4rem; padding: 0; border: 0; color: var(--f-accent); font-family: Cinzel, Georgia, serif; font-size: .8rem; letter-spacing: .1em; text-transform: uppercase; }
.fp h2::after { display: none; }
.fp-section p { margin: 0; line-height: 1.75; }
.fp-prompt { margin-top: 2.4rem; padding: 1rem 1.1rem; border: 1px dashed var(--f-border); background: var(--f-soft); }
.fp-prompt-head { display: flex; gap: 1rem; align-items: center; justify-content: space-between; }
.fp-prompt-head h2 { margin: 0; }
.fp-prompt-head button { padding: .45rem .75rem; border: 1px solid #9f6426; background: #70451f; color: #fff1c9; font-family: Cinzel, Georgia, serif; font-size: .6rem; letter-spacing: .05em; cursor: pointer; }
.fp-prompt p { margin: .8rem 0 0; font-family: var(--vp-font-family-mono); font-size: .8rem; line-height: 1.6; word-break: break-word; user-select: all; }

@media (max-width: 700px) {
  .fp { width: min(100% - 32px, 60rem); }
  .fp-hero { grid-template-columns: 1fr; gap: 1.2rem; }
  .fp-empty { aspect-ratio: 4 / 3; }
  .fp-portrait img { max-height: 70vh; object-fit: cover; object-position: center 20%; }
}
</style>

<style>
.dark .fp { --f-ink: #eadab6; --f-accent: #d9a566; --f-border: rgb(231 200 139 / .26); --f-soft: rgb(231 200 139 / .07); }
</style>

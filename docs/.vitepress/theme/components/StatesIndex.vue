<script setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { states, stateGroups } from '../data/states.js'

const { lang } = useData()
const en = computed(() => lang.value.startsWith('en'))
const l = computed(() => (en.value ? 'en' : 'tr'))
const selected = ref('all')
const href = (s) => withBase(`${en.value ? '/en' : ''}/devletler/${s.slug}`)
const flag = (s) => s.flag && withBase(`/assets/flags/${s.flag}`)
const featured = computed(() => states.filter((s) => s.featured))
const list = computed(() => states.filter((s) => selected.value === 'all' || s.group === selected.value))
const count = (k) => states.filter((s) => k === 'all' || s.group === k).length
const t = computed(() => en.value
  ? { kicker: 'Political Atlas', h1: 'States and Sovereignties', lead: 'In Avarra, states are defined not by ancestry, but by law, language, economy, memory, and forms of rule. Members of the same people can be citizens of rival states.', start: 'Start here', big: 'The major powers', bigLead: 'Seven states most stories turn on.', all: 'All states', every: 'All', open: 'Open record' }
  : { kicker: 'Siyasi Atlas', h1: 'Devletler ve Egemenlikler', lead: 'Avarra’da devletler soyla değil; hukuk, dil, ekonomi, hafıza ve yönetim biçimiyle tanımlanır. Aynı halkın üyeleri birbirine rakip devletlerin yurttaşı olabilir.', start: 'Buradan başlayın', big: 'Büyük güçler', bigLead: 'Hikâyelerin çoğunun etrafında döndüğü yedi devlet.', all: 'Tüm devletler', every: 'Tümü', open: 'Kaydı aç' })
</script>

<template>
  <section class="si">
    <header class="si-head">
      <p class="si-kicker">{{ t.kicker }}</p>
      <h1>{{ t.h1 }}</h1>
      <p class="si-lead">{{ t.lead }}</p>
    </header>

    <div class="si-feat-head">
      <p class="si-kicker">{{ t.start }}</p>
      <h2>{{ t.big }}</h2>
      <p>{{ t.bigLead }}</p>
    </div>
    <div class="si-feat">
      <a v-for="s in featured" :key="s.slug" :href="href(s)" class="si-card">
        <span class="si-flag"><img v-if="flag(s)" :src="flag(s)" :alt="s[l].name" loading="lazy" /></span>
        <h3>{{ s[l].name }}</h3>
        <p>{{ s[l].blurb }}</p>
        <span class="si-open">{{ t.open }} <b>→</b></span>
      </a>
    </div>

    <div class="si-all-head">
      <h2>{{ t.all }}</h2>
      <div class="si-filters" role="group">
        <button type="button" :class="{ on: selected === 'all' }" @click="selected = 'all'">{{ t.every }} <i>{{ count('all') }}</i></button>
        <button v-for="(g, k) in stateGroups" :key="k" type="button" :class="{ on: selected === k }" @click="selected = k">{{ g[l] }} <i>{{ count(k) }}</i></button>
      </div>
    </div>
    <TransitionGroup name="sic" tag="ul" class="si-list">
      <li v-for="(s, i) in list" :key="s.slug" :style="{ '--i': Math.min(i, 11) }">
        <a :href="href(s)">
          <span class="si-mini"><img v-if="flag(s)" :src="flag(s)" alt="" loading="lazy" /><i v-else>{{ s[l].name.charAt(0) }}</i></span>
          <span class="si-txt"><strong>{{ s[l].name }}</strong><small>{{ stateGroups[s.group][l] }}</small><em>{{ s[l].blurb }}</em></span>
          <b class="si-go" aria-hidden="true">→</b>
        </a>
      </li>
    </TransitionGroup>
  </section>
</template>

<style scoped>
.si { width: min(100% - 40px, 1240px); margin: 3rem auto 2rem; color: var(--vp-c-text-1); }
.si-kicker { margin: 0 0 .6rem; color: var(--vp-c-brand-1); font: 500 .78rem var(--font-ui); letter-spacing: .16em; text-transform: uppercase; }
.si-head { max-width: 46rem; }
.si h1 { margin: 0 0 1rem; padding: 0; border: 0; color: var(--vp-c-brand-3); font: 500 clamp(2.6rem, 7vw, 5.2rem)/1 var(--font-display); letter-spacing: -.035em; }
.dark .si h1 { color: var(--vp-c-text-1); }
.si-lead { margin: 0; color: var(--vp-c-text-2); font-size: 1.15rem; line-height: 1.65; }
.si h2 { margin: 0; padding: 0; border: 0; font: 500 clamp(1.7rem, 3.4vw, 2.5rem)/1.1 var(--font-display); letter-spacing: -.03em; }
.si h2::after { display: none; }
.si-feat-head { margin: 4rem 0 2rem; padding-top: 2.4rem; border-top: 1px solid var(--vp-c-divider); }
.si-feat-head p:last-child { margin: .7rem 0 0; color: var(--vp-c-text-2); }
.si-feat { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr)); gap: 1.2rem; }
.si-card { display: flex; flex-direction: column; padding: 14px 14px 1.4rem; border-radius: 26px; background: var(--vp-c-bg-elv); box-shadow: inset 0 0 0 1px var(--vp-c-divider); color: inherit; text-decoration: none; transition: transform .5s cubic-bezier(.22, 1, .36, 1), box-shadow .5s; }
.si-card:hover, .si-card:focus-visible { transform: translateY(-6px); box-shadow: inset 0 0 0 1px var(--vp-c-brand-1), 0 26px 40px -22px rgba(60, 30, 0, .45); outline: 0; }
.si-flag { display: block; aspect-ratio: 3 / 2; overflow: hidden; border-radius: 16px; background: #000; box-shadow: 0 0 0 1px rgba(60, 30, 0, .2); }
.si-flag img { display: block; width: 100%; height: 100%; object-fit: contain; transition: transform 1s cubic-bezier(.22, 1, .36, 1); }
.si-card:hover .si-flag img { transform: scale(1.05); }
.si-card h3 { margin: 1.1rem .5rem .4rem; font: 500 1.5rem/1.15 var(--font-display); letter-spacing: -.02em; }
.si-card p { margin: 0 .5rem 1rem; color: var(--vp-c-text-2); font: .95rem/1.55 var(--font-ui); }
.si-open { margin: auto .5rem 0; color: var(--vp-c-brand-1); font: 500 .88rem var(--font-ui); }
.si-open b { display: inline-block; font-weight: 500; transition: transform .4s cubic-bezier(.22, 1, .36, 1); }
.si-card:hover .si-open b { transform: translateX(4px); }

.si-all-head { margin: 5rem 0 1.8rem; padding-top: 2.4rem; border-top: 1px solid var(--vp-c-divider); }
.si-filters { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1.4rem; }
.si-filters button { display: inline-flex; gap: .5em; align-items: center; padding: .55em 1.1em; border: 0; border-radius: 999px; background: transparent; box-shadow: inset 0 0 0 1px var(--vp-c-divider); color: var(--vp-c-text-1); font: 500 .92rem var(--font-ui); cursor: pointer; transition: background .3s, color .3s, box-shadow .3s; }
.si-filters button i { color: var(--vp-c-text-3); font-size: .78rem; font-style: normal; }
.si-filters button:hover { box-shadow: inset 0 0 0 1px var(--vp-c-brand-1); }
.si-filters button.on { background: var(--vp-c-brand-3); color: #f4e6c8; box-shadow: none; }
.si-filters button.on i { color: rgba(244, 230, 200, .7); }
.dark .si-filters button.on { background: var(--vp-c-brand-1); color: #2a1500; }
.dark .si-filters button.on i { color: rgba(42, 21, 0, .6); }
.si-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .7rem 1.6rem; margin: 0; padding: 0; list-style: none; }
.si-list li { margin: 0; }
.si-list a { display: flex; gap: 1rem; align-items: center; height: 100%; padding: 1rem 1.2rem; border-radius: 18px; color: inherit; text-decoration: none; box-shadow: inset 0 0 0 1px var(--vp-c-divider); transition: background .3s, box-shadow .3s, transform .4s cubic-bezier(.22, 1, .36, 1); }
.si-list a:hover, .si-list a:focus-visible { background: var(--vp-c-bg-elv); box-shadow: inset 0 0 0 1px var(--vp-c-brand-1); transform: translateY(-2px); outline: 0; }
.si-mini { display: grid; flex: none; width: 54px; height: 36px; place-items: center; overflow: hidden; border-radius: 6px; background: #590e0e; box-shadow: 0 0 0 1px rgba(60, 30, 0, .25); }
.si-mini img { width: 100%; height: 100%; object-fit: contain; background: #000; }
.si-mini i { color: #d9b878; font: 1.1rem var(--font-display); font-style: normal; }
.si-txt { display: grid; gap: .15rem; min-width: 0; }
.si-txt strong { font: 500 1.2rem/1.2 var(--font-display); letter-spacing: -.01em; }
.si-txt small { color: var(--vp-c-brand-1); font: 500 .68rem var(--font-ui); letter-spacing: .12em; text-transform: uppercase; }
.si-txt em { display: -webkit-box; overflow: hidden; color: var(--vp-c-text-2); font: normal .9rem/1.45 var(--font-ui); -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
.si-go { margin-left: auto; color: var(--vp-c-text-3); font-weight: 500; transition: transform .4s cubic-bezier(.22, 1, .36, 1), color .3s; }
.si-list a:hover .si-go { color: var(--vp-c-brand-1); transform: translateX(4px); }
.sic-enter-active { transition: opacity .4s ease, transform .5s cubic-bezier(.22, 1, .36, 1); transition-delay: calc(var(--i, 0) * 25ms); }
.sic-leave-active { transition: opacity .15s ease, transform .15s ease; }
.sic-move { transition: transform .45s cubic-bezier(.22, 1, .36, 1); }
.sic-enter-from { opacity: 0; transform: translateY(14px); }
.sic-leave-to { opacity: 0; transform: scale(.97); }
@media (max-width: 760px) { .si { width: min(100% - 32px, 1240px); } .si-list { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .sic-enter-active, .sic-leave-active, .sic-move { transition: none; } }
</style>

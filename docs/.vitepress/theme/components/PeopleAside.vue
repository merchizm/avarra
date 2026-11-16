<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import { peopleImages } from '../data/peopleImages.js'
import { peopleThumbnails } from '../data/peopleThumbnails.js'
import { additionalPeople } from '../data/additionalPeople.js'
import { states } from '../data/states.js'
import references from 'virtual:avarra-reference-index'

const { page, lang } = useData()
const en = computed(() => lang.value.startsWith('en'))
const match = computed(() => page.value.relativePath.match(/^(?:en\/)?(irklar|devletler|yerlesimler|kulturler|tarih)\/([^/]+)\.md$/))
const isState = computed(() => match.value?.[1] === 'devletler')
const isCity = computed(() => match.value?.[1] === 'yerlesimler')
const slug = computed(() => match.value?.[2])
const cultureSlugs = { 'halklar-kulturleri': '❖', 'sehir-diasporalari': '⌂', 'city-diasporas': '⌂', 'fey-yollari': '❋', 'fey-roads': '❋' }
const isEra = computed(() => match.value?.[1] === 'tarih')
const isCulture = computed(() => match.value?.[1] === 'kulturler' || isEra.value)
const show = computed(() => slug.value && (isEra.value ? slug.value !== 'index' : isCulture.value ? slug.value in cultureSlugs : !['index', 'kaynak-ve-uyarlama'].includes(slug.value)))
const key = computed(() => `/irklar/${slug.value}`)
const flag = computed(() => isState.value && states.find((x) => x.slug === slug.value)?.flag)
const cityImage = computed(() => isCity.value && references.find((r) => r.path === `/yerlesimler/${slug.value}`)?.image)
const image = computed(() => (isCity.value ? cityImage.value : isState.value ? (flag.value && `/assets/flags/${flag.value}`) : (peopleImages[key.value] || additionalPeople.find((p) => p.link === key.value)?.image)))
const thumb = computed(() => peopleThumbnails[image.value])
const crest = computed(() => (isCulture.value ? cultureSlugs[slug.value] : isState.value || isCity.value ? (page.value.title || '✦').charAt(0) : additionalPeople.find((p) => p.link === key.value)?.crest || '✦'))
const toc = ref([])
function readToc() {
  toc.value = [...document.querySelectorAll('.vp-doc h2[id]')].map((el) => ({ slug: el.id, title: el.textContent.replace(/^\s*#\s*/, '').trim() }))
}
const active = ref('')
let io

function observe() {
  io?.disconnect()
  readToc()
  if (!show.value || !('IntersectionObserver' in window)) return
  io = new IntersectionObserver((entries) => {
    const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
    if (hit) active.value = hit.target.id
  }, { rootMargin: '-90px 0px -65% 0px' })
  document.querySelectorAll('.vp-doc h2[id]').forEach((el) => io.observe(el))
}
onMounted(() => nextTick(observe))
watch(() => page.value.relativePath, () => nextTick(observe))
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <aside v-if="show" class="pa" :aria-label="en ? 'Portrait and contents' : 'Portre ve içindekiler'">
    <div class="pa-sticky">
      <figure v-if="!isCulture" class="pa-portrait" :class="{ 'pa-flag': isState, 'pa-city': isCity }">
        <picture v-if="image">
          <source v-if="thumb && !isState && !isCity" :srcset="withBase(thumb)" type="image/webp" />
          <img :src="withBase(image)" :alt="page.title" loading="eager" />
        </picture>
        <span v-else class="pa-crest">{{ crest }}</span>
      </figure>
      <nav v-if="toc.length" class="pa-toc" :class="{ solo: isCulture }" :aria-label="en ? 'On this page' : 'Bu sayfada'">
        <p>{{ en ? 'On this page' : 'Bu sayfada' }}</p>
        <a v-for="h in toc" :key="h.slug" :href="`#${h.slug}`" :class="{ on: active === h.slug }">{{ h.title }}</a>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.pa { position: absolute; top: 0; right: 0; bottom: 0; width: 330px; }
.pa-sticky { position: sticky; top: calc(var(--vp-nav-height) + 24px); }
.pa-portrait { margin: 0; aspect-ratio: 3 / 4; overflow: hidden; border-radius: 999px 999px 22px 22px; background: radial-gradient(circle at 50% 38%, #8a2a22, #590e0e 70%); box-shadow: 0 0 0 1px var(--vp-c-divider), 0 0 0 8px var(--vp-c-bg), 0 0 0 9px var(--vp-c-divider), 0 30px 50px -26px rgba(60, 30, 0, .55); }
.pa-portrait picture, .pa-portrait img { display: block; width: 100%; height: 100%; }
.pa-portrait img { object-fit: cover; object-position: center 12%; filter: saturate(.86) sepia(.08); }
.pa-crest { display: grid; height: 100%; place-items: center; color: #d9b878; font: 5rem var(--font-display); }
.pa-toc { display: flex; flex-direction: column; margin-top: 2.2rem; padding-left: .2rem; }
.pa-toc p { margin: 0 0 .7rem; color: var(--vp-c-brand-1); font: 500 .72rem var(--font-ui); letter-spacing: .14em; text-transform: uppercase; }
.pa-toc a { padding: .42rem 0 .42rem 1rem; border-left: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); font: .95rem/1.35 var(--font-ui); text-decoration: none; transition: color .25s, border-color .25s, padding .25s; }
.pa-toc a:hover { color: var(--vp-c-text-1); }
.pa-toc a.on { padding-left: 1.2rem; border-left-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); font-weight: 500; }
@media (max-width: 1060px) { .pa { position: static; width: min(260px, 70%); margin: 0 auto 2rem; } .pa-sticky { position: static; } .pa-toc { display: none; } }
.pa-flag { aspect-ratio: 3 / 2; border-radius: 18px; background: #000; box-shadow: 0 0 0 1px var(--vp-c-divider), 0 0 0 8px var(--vp-c-bg), 0 0 0 9px var(--vp-c-divider), 0 24px 40px -22px rgba(60, 30, 0, .5); }
.pa-flag img { object-fit: contain; filter: none; }
.pa-city { aspect-ratio: 4 / 3; border-radius: 22px; background: radial-gradient(circle at 50% 40%, #8a2a22, #590e0e 72%); box-shadow: 0 0 0 1px var(--vp-c-divider), 0 0 0 8px var(--vp-c-bg), 0 0 0 9px var(--vp-c-divider), 0 26px 44px -24px rgba(60, 30, 0, .55); }
.pa-city img { object-fit: cover; object-position: center; }
.pa-toc.solo { margin-top: .6rem; max-height: calc(100vh - var(--vp-nav-height) - 60px); overflow-y: auto; scrollbar-width: thin; }
</style>

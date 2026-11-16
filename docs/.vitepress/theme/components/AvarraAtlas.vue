<script setup>
import { computed, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()
const en = computed(() => lang.value.startsWith('en'))
const mapImage = withBase('/assets/maps/avarra-world-map.jpg')
const p = (path) => withBase(`${en.value ? '/en' : ''}${path}`)
const places = [['Nareth', '/cografya/nareth'], ['Asteron', '/cografya/asteron'], ['Odraka', '/cografya/odraka'], ['Ilyr-Khaz', '/cografya/ilyr-khaz'], ['Avarra', '/cografya/denizler']]
const frame = ref(null)
const on = ref(false)
onMounted(() => {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { on.value = true; return }
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { on.value = true; io.disconnect() } }, { threshold: 0.25 })
  io.observe(frame.value)
})
</script>

<template>
  <section class="atlas" :aria-label="en ? 'Avarra world map' : 'Avarra dünya haritası'">
    <header class="atlas-head">
      <p>{{ en ? 'The World of Avarra' : 'Avarra Dünyası' }}</p>
      <h1>{{ en ? 'World Atlas' : 'Dünya Atlası' }}</h1>
      <span>{{ en ? 'A reference map for the continents, island chains and shores. Hover the map to see it in colour.' : 'Kıtalar, ada grupları ve kıyılar için başvuru haritası. Renkleri görmek için haritanın üzerine gelin.' }}</span>
    </header>

    <div ref="frame" class="atlas-frame" :class="{ on }">
      <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" role="img" :aria-label="en ? 'Avarra: continents and island groups' : 'Avarra: kıtalar ve ada grupları'">
        <defs>
          <filter id="atlasink-f" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="4" seed="9" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="220" xChannelSelector="R" yChannelSelector="G" result="d" />
            <feGaussianBlur in="d" stdDeviation="3" result="b" />
            <feComponentTransfer in="b"><feFuncA type="linear" slope="16" intercept="-7" /></feComponentTransfer>
          </filter>
          <mask id="atlasink-m" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="700">
            <g filter="url(#atlasink-f)" fill="#fff">
              <circle class="b b1" cx="600" cy="350" r="0" />
              <circle class="b b2" cx="170" cy="160" r="0" />
              <circle class="b b3" cx="1030" cy="540" r="0" />
              <circle class="b b4" cx="1020" cy="130" r="0" />
              <circle class="b b5" cx="180" cy="570" r="0" />
              <circle class="b b6" cx="620" cy="620" r="0" />
            </g>
          </mask>
        </defs>
        <image class="base" :href="mapImage" width="1200" height="700" preserveAspectRatio="xMidYMid slice" />
        <image class="ink" :href="mapImage" width="1200" height="700" preserveAspectRatio="xMidYMid slice" mask="url(#atlasink-m)" />
      </svg>
    </div>

    <div class="atlas-bar">
      <nav class="atlas-places" :aria-label="en ? 'Continents' : 'Kıtalar'">
        <a v-for="[name, path] in places" :key="path" :href="p(path)">{{ name }}</a>
      </nav>
      <a class="atlas-full" :href="mapImage" target="_blank" rel="noopener">{{ en ? 'Full-resolution map' : 'Tam çözünürlüklü harita' }} ↗</a>
    </div>

    <p class="atlas-note">{{ en ? 'The world is a work in progress; everything may change. Choose a record below to read a place’s geography and history.' : 'Dünya yapım aşamasındadır, her şey değişebilir. Bir yerin coğrafyasını ve tarihini okumak için aşağıdaki kayıtlardan birini seçin.' }}</p>
  </section>
</template>

<style scoped>
.atlas { width: min(100% - 48px, 1240px); margin: 3rem auto 2rem; text-align: center; }
.atlas-head p { margin: 0 0 .6rem; color: var(--vp-c-brand-1); font: 500 .78rem var(--font-ui); letter-spacing: .16em; text-transform: uppercase; }
.atlas-head h1 { margin: 0; padding: 0; border: 0; font: 500 clamp(2.6rem, 7vw, 5.4rem)/1 var(--font-display); letter-spacing: -.035em; color: var(--vp-c-brand-3); }
.dark .atlas-head h1 { color: var(--vp-c-text-1); }
.atlas-head span { display: block; max-width: 36rem; margin: 1.1rem auto 0; color: var(--vp-c-text-2); font-size: 1.1rem; line-height: 1.6; }
.atlas-frame { position: relative; aspect-ratio: 12 / 7; margin-top: 2.4rem; overflow: hidden; border-radius: 28px; background: var(--vp-c-bg-soft); box-shadow: 0 0 0 1px var(--vp-c-divider), 0 0 0 10px var(--vp-c-bg), 0 0 0 11px var(--vp-c-divider), 0 40px 70px -30px rgba(60, 30, 0, .5); }
.atlas-frame svg { display: block; width: 100%; height: 100%; }
.base { filter: grayscale(1) sepia(.5); opacity: .22; }
.ink { filter: grayscale(1) contrast(1.06); transition: filter .8s ease; }
.atlas-frame:hover .ink { filter: none; }
@media (hover: none) { .ink { filter: none; } }
.b { transition: r 4.5s cubic-bezier(.55, .05, .35, 1); }
.on .b { r: 380px; }
.on .b1 { r: 520px; }
.b2 { transition-delay: .5s; } .b3 { transition-delay: 1s; } .b4 { transition-delay: .7s; } .b5 { transition-delay: 1.3s; } .b6 { transition-delay: .9s; }
.atlas-bar { display: flex; flex-wrap: wrap; gap: .8rem 1.5rem; align-items: center; justify-content: space-between; margin-top: 2.2rem; }
.atlas-places { display: flex; flex-wrap: wrap; gap: .5rem; }
.atlas-places a, .atlas-full { padding: .6em 1.2em; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--vp-c-divider); color: var(--vp-c-text-1); font: 500 .95rem var(--font-ui); text-decoration: none; transition: background .3s, color .3s, box-shadow .3s; }
.atlas-places a:hover, .atlas-full:hover { background: var(--vp-c-brand-3); color: #f4e6c8; box-shadow: none; }
.dark .atlas-places a:hover, .dark .atlas-full:hover { background: var(--vp-c-brand-1); color: #2a1500; }
.atlas-note { max-width: 40rem; margin: 2rem auto 0; color: var(--vp-c-text-3); font-size: .95rem; line-height: 1.6; }
@media (max-width: 700px) { .atlas { width: min(100% - 32px, 1240px); } .atlas-frame { aspect-ratio: 4 / 3; border-radius: 20px; } .atlas-bar { justify-content: center; } }
</style>

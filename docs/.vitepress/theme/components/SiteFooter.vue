<script setup>
import { computed } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'

const { lang } = useData()
const route = useRoute()
const en = computed(() => lang.value.startsWith('en'))
const p = (path) => withBase(`${en.value ? '/en' : ''}${path}`)
const other = computed(() => {
  const path = route.path
  return en.value ? path.replace(/^\/en(?=\/|$)/, '') || '/' : `/en${path === '/' ? '/' : path}`
})
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
const t = computed(() => en.value
  ? { cta: 'Enter through a door', ctaSub: 'Start with the map, follow a name, or wander into an age.', atlas: 'Open the Atlas', eras: 'Browse the Ages', tag: 'The living memory of the known world: its atlas, peoples and ancient traditions.', explore: 'Explore', world: 'The world', archive: 'Archive', tools: 'Tools', peoples: 'Peoples', figures: 'Figures', states: 'States', faiths: 'Faiths & Cultures', stag: 'Stagnation', settle: 'Settlements', ages: 'Ages', geo: 'Geography', names: 'Naming Engine', map: 'World map', switchTo: 'Türkçe', switchLabel: 'Read in Turkish', note: 'The world is a work in progress; everything may change.', top: 'Back to top', rights: 'Avarra Chronicles', quote: '“Every record is a traveler’s note; every map, a path taken back.”' }
  : { cta: 'Bir kapıdan girin', ctaSub: 'Haritayla başlayın, bir isim izleyin ya da bir çağın içinde dolaşın.', atlas: 'Atlası Aç', eras: 'Çağlara Göz At', tag: 'Bilinen dünyanın yaşayan hafızası: atlası, halkları ve kadim gelenekleri.', explore: 'Keşfet', world: 'Dünya', archive: 'Arşiv', tools: 'Araçlar', peoples: 'Halklar', figures: 'Kişiler', states: 'Devletler', faiths: 'Dinler ve Kültürler', stag: 'Durgunluk', settle: 'Yerleşimler', ages: 'Çağlar', geo: 'Coğrafya', names: 'İsim Motoru', map: 'Dünya haritası', switchTo: 'English', switchLabel: 'İngilizce oku', note: 'Dünya yapım aşamasındadır, her şey değişebilir.', top: 'Başa dön', rights: 'Avarra Kronikleri', quote: '“Her kayıt bir seyyahın notu; her harita, geri dönülmüş bir yol.”' })
const cols = computed(() => [
  { h: t.value.explore, l: [[t.value.map, '/haritalar/dunya'], [t.value.peoples, '/irklar/'], [t.value.figures, '/kisiler/']] },
  { h: t.value.world, l: [[t.value.states, '/devletler/'], [t.value.faiths, '/kulturler/'], [t.value.settle, '/yerlesimler/']] },
  { h: t.value.archive, l: [[t.value.ages, '/tarih/'], [t.value.stag, '/durgunluk/'], [t.value.geo, '/cografya/']] }
])
</script>

<template>
  <footer class="sf">
    <div class="sf-cta">
      <div>
        <h2>{{ t.cta }}</h2>
        <p>{{ t.ctaSub }}</p>
      </div>
      <div class="sf-cta-actions">
        <a class="sf-pill sf-pill--solid" :href="p('/haritalar/dunya')">{{ t.atlas }}</a>
        <a class="sf-pill" :href="p('/tarih/')">{{ t.eras }}</a>
      </div>
    </div>

    <div class="sf-main">
      <div class="sf-brand">
        <a :href="p('/')" class="sf-logo" aria-label="Avarra">
          <svg viewBox="0 0 24 64" aria-hidden="true"><path fill="currentColor" d="M12 1 17.5 16 14 19.5V22h-4v-2.5L6.5 16Zm-1 22h2v32h-2Zm-.5 32h3L12 63Z" /></svg>
          <span>AVARRA</span>
        </a>
        <p>{{ t.tag }}</p>
        <blockquote>{{ t.quote }}</blockquote>
      </div>
      <nav v-for="c in cols" :key="c.h" class="sf-col" :aria-label="c.h">
        <h3>{{ c.h }}</h3>
        <a v-for="[label, path] in c.l" :key="path" :href="p(path)">{{ label }}</a>
      </nav>
      <nav class="sf-col" :aria-label="t.tools">
        <h3>{{ t.tools }}</h3>
        <a class="vp-raw" :href="`/isim-motoru.html?lang=${en ? 'en' : 'tr'}`">{{ t.names }}</a>
        <a :href="other" :aria-label="t.switchLabel">{{ t.switchTo }}</a>
      </nav>
    </div>

    <div class="sf-word" aria-hidden="true">AVARRA</div>

    <div class="sf-bottom">
      <span>© {{ new Date().getFullYear() }} {{ t.rights }}</span>
      <span class="sf-note">{{ t.note }}</span>
      <a href="#" @click.prevent="toTop">{{ t.top }} ↑</a>
    </div>
  </footer>
</template>

<style scoped>
.sf { position: relative; margin-top: 5rem; overflow: hidden; background: #2b1600; color: #e9d9b8; font-family: var(--font-ui); }
.sf a { color: inherit; text-decoration: none; }
.sf-cta { display: flex; flex-wrap: wrap; gap: 1.5rem 3rem; align-items: center; justify-content: space-between; max-width: 1240px; margin: 0 auto; padding: 4.5rem clamp(24px, 4vw, 64px) 3.5rem; border-bottom: 1px solid rgba(217, 184, 120, .2); }
.sf-cta h2 { margin: 0; padding: 0; border: 0; color: #f4e6c8; font: 500 clamp(2rem, 4.4vw, 3.6rem)/1.05 var(--font-display); letter-spacing: -.03em; }
.sf-cta h2::after { display: none; }
.sf-cta p { max-width: 30rem; margin: .8rem 0 0; color: rgba(233, 217, 184, .7); font-size: 1.1rem; line-height: 1.55; }
.sf-cta-actions { display: flex; flex-wrap: wrap; gap: .8rem; }
.sf .sf-pill { padding: .95em 1.8em; border-radius: 999px; box-shadow: inset 0 0 0 1px rgba(217, 184, 120, .55); color: #d9b878; font-size: 1.05rem; transition: background .3s, color .3s, transform .4s cubic-bezier(.22, 1, .36, 1); }
.sf .sf-pill:hover { background: rgba(217, 184, 120, .14); transform: translateY(-2px); }
.sf .sf-pill--solid { background: #d9b878; color: #2b1600; box-shadow: none; }
.sf .sf-pill--solid:hover { background: #ecd196; }
.sf-main { display: grid; grid-template-columns: 1.7fr repeat(4, 1fr); gap: 2.5rem; max-width: 1240px; margin: 0 auto; padding: 4rem clamp(24px, 4vw, 64px) 3rem; }
.sf-logo { display: inline-flex; align-items: center; gap: .7rem; color: #d9b878; }
.sf-logo svg { width: 18px; height: 42px; transition: transform .6s cubic-bezier(.34, 1.56, .64, 1); }
.sf-logo:hover svg { transform: rotate(90deg); }
.sf-logo span { font: 600 1.45rem var(--font-display); letter-spacing: .28em; }
.sf-brand p { max-width: 22rem; margin: 1.2rem 0 0; color: rgba(233, 217, 184, .72); font-size: 1.05rem; line-height: 1.6; }
.sf-brand blockquote { max-width: 22rem; margin: 1.4rem 0 0; padding: 0 0 0 1rem; border: 0; border-left: 2px solid rgba(217, 184, 120, .45); background: none; color: #d9b878; font: italic 1rem/1.6 var(--font-display); }
.sf-col { display: flex; flex-direction: column; gap: .8rem; }
.sf-col h3 { margin: 0 0 .5rem; color: #d9b878; font: 500 .8rem var(--font-ui); letter-spacing: .14em; text-transform: uppercase; }
.sf-col a { width: fit-content; padding: 2px 0; font-size: 1.1rem; background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size .4s cubic-bezier(.22, 1, .36, 1), color .3s; }
.sf-col a:hover { color: #fff3d6; background-size: 100% 1px; }
.sf-word { padding: 0 1rem; color: transparent; font: 600 clamp(4rem, 21vw, 20rem)/.82 var(--font-display); letter-spacing: .06em; text-align: center; text-indent: .06em; background: linear-gradient(180deg, rgba(217, 184, 120, .34), rgba(217, 184, 120, 0) 92%); -webkit-background-clip: text; background-clip: text; user-select: none; }
.sf-bottom { display: flex; flex-wrap: wrap; gap: .6rem 2rem; align-items: center; justify-content: space-between; max-width: 1240px; margin: 0 auto; padding: 1.6rem clamp(24px, 4vw, 64px) 1.8rem; color: rgba(233, 217, 184, .6); font-size: .95rem; }
.sf-bottom a:hover { color: #d9b878; }
@media (max-width: 960px) { .sf-main { grid-template-columns: 1fr 1fr 1fr; } .sf-brand { grid-column: 1 / -1; } }
@media (max-width: 600px) { .sf-main { grid-template-columns: 1fr 1fr; } .sf-note { order: 3; flex-basis: 100%; } }
</style>

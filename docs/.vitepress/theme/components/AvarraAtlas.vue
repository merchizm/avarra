<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const mapImage = withBase('/assets/maps/avarra-world-map.jpg')
</script>

<template>
  <section class="atlas" :aria-label="isEnglish ? 'Avarra world map' : 'Avarra dünya haritası'">
    <div class="atlas-heading">
      <p>{{ isEnglish ? 'The World of Avarra' : 'Avarra Dünyası' }}</p>
      <h1>{{ isEnglish ? 'World Atlas' : 'Dünya Atlası' }}</h1>
      <span>{{ isEnglish ? 'A fixed reference map for the continents, island chains and shores.' : 'Kıtalar, ada grupları ve kıyılar için sabit başvuru haritası.' }}</span>
    </div>

    <a
      class="atlas-map"
      :href="mapImage"
      target="_blank"
      rel="noopener"
      :aria-label="isEnglish ? 'Open the full-resolution Avarra map' : 'Avarra haritasını tam çözünürlükte aç'"
    >
      <img
        :src="mapImage"
        :alt="isEnglish ? 'Avarra: continents and island groups' : 'Avarra: kıtalar ve ada grupları'"
      >
      <span>{{ isEnglish ? 'Open the full-resolution map ↗' : 'Haritayı tam çözünürlükte aç ↗' }}</span>
    </a>

    <p class="atlas-note">
      {{ isEnglish ? 'This map is a work in progress and may change as Avarra develops. Select a record below to read the geography and history of a place.' : 'Bu harita yapım aşamasındadır; Avarra geliştikçe değişebilir. Bir yerin coğrafyasını ve tarihini okumak için aşağıdaki kayıtlardan birini seçin.' }}
    </p>
  </section>
</template>

<style scoped>
.atlas {
  --a-ink: #352817; --a-accent: #87501f; --a-border: #8b7143; --a-pill: #473019; --a-pill-ink: #fff1c9;
  width: min(100% - 48px, 1240px);
  margin: 2rem auto 1.5rem;
  padding: clamp(1rem, 3vw, 2rem);
  border: 1px solid var(--a-border);
  background:
    linear-gradient(90deg, rgb(94 67 29 / .07) 1px, transparent 1px) 0 0 / 1.6rem 1.6rem,
    radial-gradient(circle at 15% 0%, rgb(255 233 177 / .25), transparent 29rem),
    #e9dbb9;
  box-shadow: inset 0 0 3rem rgb(85 55 21 / .12), 0 .75rem 1.7rem rgb(0 0 0 / .13);
  color: var(--a-ink);
}
.atlas-heading { max-width: 46rem; margin: 0 auto 1.4rem; text-align: center; }
.atlas-heading p { margin: 0 0 .35rem; color: var(--a-accent); font-family: Cinzel, Georgia, serif; font-size: .72rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
.atlas-heading h1 { margin: 0; color: inherit; font-family: Cinzel, Georgia, serif; font-size: clamp(1.6rem, 5vw, 2.6rem); line-height: 1.15; }
.atlas-heading span, .atlas-note { display: block; margin-top: .55rem; line-height: 1.65; opacity: .8; }
.atlas-map { position: relative; display: block; overflow: hidden; border: 1px solid var(--a-border); background: #8ad7eb; box-shadow: 0 .6rem 1.4rem rgb(0 0 0 / .25); }
.atlas-map img { display: block; width: 100%; height: auto; transition: transform .22s ease; }
.atlas-map span { position: absolute; right: .8rem; bottom: .8rem; padding: .45rem .75rem; border: 1px solid rgb(255 244 216 / .45); background: var(--a-pill); color: var(--a-pill-ink); font-family: Cinzel, Georgia, serif; font-size: .68rem; letter-spacing: .06em; }
.atlas-map:hover img, .atlas-map:focus-visible img { transform: scale(1.012); }
.atlas-map:focus-visible { outline: 3px solid #f2cf7c; outline-offset: 4px; }
.atlas-note { margin: 1rem 0 0; text-align: center; font-size: .9rem; }
@media (max-width: 700px) { .atlas { width: min(100% - 32px, 1240px); } }
@media (max-width: 640px) {
  .atlas-map span { right: .5rem; bottom: .5rem; padding: .35rem .55rem; font-size: .6rem; }
}
</style>

<style>
.dark .atlas {
  --a-ink: #eadab6; --a-accent: #d9a566; --a-border: #8c7650;
  background:
    linear-gradient(90deg, rgb(229 193 122 / .05) 1px, transparent 1px) 0 0 / 1.6rem 1.6rem,
    radial-gradient(circle at 15% 0%, rgb(191 142 61 / .12), transparent 29rem),
    #1a2524;
}
</style>

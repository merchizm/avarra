<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const mapImage = withBase('/assets/maps/avarra-world-map.jpg')
</script>

<template>
  <section class="avarra-atlas-static" :aria-label="isEnglish ? 'Avarra world map' : 'Avarra dünya haritası'">
    <div class="avarra-atlas-static__heading">
      <p>{{ isEnglish ? 'The World of Avarra' : 'Avarra Dünyası' }}</p>
      <h1>{{ isEnglish ? 'World Atlas' : 'Dünya Atlası' }}</h1>
      <span>{{ isEnglish ? 'A fixed reference map for the continents, island chains and shores.' : 'Kıtalar, ada grupları ve kıyılar için sabit başvuru haritası.' }}</span>
    </div>

    <a
      class="avarra-atlas-static__map"
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

    <p class="avarra-atlas-static__note">
      {{ isEnglish ? 'This map is a work in progress and may change as Avarra develops. Select a record below to read the geography and history of a place.' : 'Bu harita yapım aşamasındadır; Avarra geliştikçe değişebilir. Bir yerin coğrafyasını ve tarihini okumak için aşağıdaki kayıtlardan birini seçin.' }}
    </p>
  </section>
</template>

<style scoped>
.avarra-atlas-static {
  margin: 2rem 0 3rem;
  padding: clamp(1rem, 3vw, 2.5rem);
  color: #f5e7c5;
  border: 1px solid rgba(220, 179, 96, 0.38);
  border-radius: 1.2rem;
  background:
    radial-gradient(circle at 15% 0%, rgba(209, 157, 67, 0.16), transparent 32rem),
    linear-gradient(135deg, #1e201a, #121713);
  box-shadow: 0 1.4rem 3.6rem rgba(11, 11, 8, 0.25);
}

.avarra-atlas-static__heading {
  max-width: 46rem;
  margin: 0 auto 1.4rem;
  text-align: center;
}

.avarra-atlas-static__heading p {
  margin: 0 0 0.35rem;
  color: #dcb360;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.avarra-atlas-static__heading h1 {
  margin: 0;
  color: #fff4d8;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(1.8rem, 5vw, 3rem);
}

.avarra-atlas-static__heading span,
.avarra-atlas-static__note {
  display: block;
  margin-top: 0.55rem;
  color: rgba(245, 231, 197, 0.76);
  line-height: 1.65;
}

.avarra-atlas-static__map {
  position: relative;
  display: block;
  overflow: hidden;
  border: 1px solid rgba(245, 231, 197, 0.35);
  border-radius: 0.75rem;
  background: #8ad7eb;
  color: #fff7e5;
  box-shadow: 0 0.8rem 2rem rgba(0, 0, 0, 0.35);
}

.avarra-atlas-static__map img {
  display: block;
  width: 100%;
  aspect-ratio: 12 / 7;
  object-fit: cover;
  transition: transform 220ms ease;
}

.avarra-atlas-static__map span {
  position: absolute;
  right: 0.8rem;
  bottom: 0.8rem;
  padding: 0.45rem 0.75rem;
  border: 1px solid rgba(255, 244, 216, 0.45);
  border-radius: 999px;
  background: rgba(21, 26, 21, 0.86);
  font-size: 0.82rem;
  font-weight: 700;
}

.avarra-atlas-static__map:hover img,
.avarra-atlas-static__map:focus-visible img {
  transform: scale(1.012);
}

.avarra-atlas-static__map:focus-visible {
  outline: 3px solid #f2cf7c;
  outline-offset: 4px;
}

.avarra-atlas-static__note {
  margin: 1rem 0 0;
  text-align: center;
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .avarra-atlas-static {
    margin-inline: -0.5rem;
    border-radius: 0.9rem;
  }

  .avarra-atlas-static__map span {
    right: 0.55rem;
    bottom: 0.55rem;
    font-size: 0.72rem;
  }
}
</style>

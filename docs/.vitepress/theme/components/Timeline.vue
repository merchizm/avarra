<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import timelineIndex from 'virtual:avarra-timeline-index'

const props = defineProps({
  events: { type: Array, default: () => timelineIndex }
})

const { lang } = useData()
const selectedType = ref('all')
const scrollElement = ref()
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
const isEnglish = computed(() => lang.value.startsWith('en'))
const localeEvents = computed(() => props.events.filter((event) => isEnglish.value === event.path.startsWith('/en/')))
const types = computed(() => [...new Set(localeEvents.value.map((event) => event.type))])
const events = computed(() => localeEvents.value.filter((event) => selectedType.value === 'all' || event.type === selectedType.value))

const typeLabels = {
  event: { tr: 'Olaylar', en: 'Events' },
  war: { tr: 'Savaşlar', en: 'Wars' },
  founding: { tr: 'Kuruluşlar', en: 'Foundings' },
  migration: { tr: 'Göçler', en: 'Migrations' }
}

function typeLabel(type) {
  return typeLabels[type]?.[isEnglish.value ? 'en' : 'tr'] || type
}

function updateScrollState() {
  const element = scrollElement.value
  if (!element) return
  canScrollLeft.value = element.scrollLeft > 1
  canScrollRight.value = element.scrollLeft + element.clientWidth < element.scrollWidth - 1
}

function scrollTimeline(direction) {
  const element = scrollElement.value
  if (!element) return
  element.scrollBy({ left: direction * Math.max(element.clientWidth * .78, 260), behavior: 'smooth' })
}

let resizeObserver
onMounted(() => {
  updateScrollState()
  scrollElement.value?.addEventListener('scroll', updateScrollState, { passive: true })
  resizeObserver = new ResizeObserver(updateScrollState)
  if (scrollElement.value) resizeObserver.observe(scrollElement.value)
})
onBeforeUnmount(() => {
  scrollElement.value?.removeEventListener('scroll', updateScrollState)
  resizeObserver?.disconnect()
})
watch(events, () => nextTick(updateScrollState))
</script>

<template>
  <section class="avarra-timeline" :aria-label="isEnglish ? 'Timeline of Avarra' : 'Avarra zaman çizelgesi'">
    <header class="avarra-timeline-header">
      <div>
        <p class="lore-kicker">{{ isEnglish ? 'Chronicle' : 'Kronik' }}</p>
        <h2>{{ isEnglish ? 'The unfolding of Avarra' : 'Avarra’nın zaman akışı' }}</h2>
      </div>
      <div v-if="types.length > 1" class="timeline-filters" :aria-label="isEnglish ? 'Timeline filters' : 'Zaman çizelgesi filtreleri'">
        <button :class="{ active: selectedType === 'all' }" type="button" @click="selectedType = 'all'">{{ isEnglish ? 'All' : 'Tümü' }}</button>
        <button v-for="type in types" :key="type" :class="{ active: selectedType === type }" type="button" @click="selectedType = type">{{ typeLabel(type) }}</button>
      </div>
    </header>

    <div class="timeline-viewport">
      <button class="timeline-arrow timeline-arrow-left" type="button" :disabled="!canScrollLeft" :aria-label="isEnglish ? 'Show earlier events' : 'Önceki olayları göster'" @click="scrollTimeline(-1)">‹</button>
      <div ref="scrollElement" class="timeline-scroll" tabindex="0" @keydown.left.prevent="scrollTimeline(-1)" @keydown.right.prevent="scrollTimeline(1)">
        <ol class="timeline-events">
          <li v-for="event in events" :key="`${event.path}-${event.title}-${event.label}`" class="timeline-event" :class="`is-${event.type}`">
            <span class="timeline-marker" aria-hidden="true"></span>
            <a :href="withBase(event.path)">
              <small>{{ event.label }}</small>
              <strong>{{ event.title }}</strong>
              <p>{{ event.summary }}</p>
              <span class="timeline-open">{{ isEnglish ? 'Open record →' : 'Kaydı aç →' }}</span>
            </a>
          </li>
        </ol>
      </div>
      <button class="timeline-arrow timeline-arrow-right" type="button" :disabled="!canScrollRight" :aria-label="isEnglish ? 'Show later events' : 'Sonraki olayları göster'" @click="scrollTimeline(1)">›</button>
    </div>
  </section>
</template>

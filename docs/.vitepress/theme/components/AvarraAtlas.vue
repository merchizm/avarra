<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const frame = ref(null)
const canvas = ref(null)
const loading = ref(true)
const progress = ref(8)
const selectedId = ref('nareth')
const panelOpen = ref(null)
const iconModalOpen = ref(false)
const hoveredId = ref(null)
const view = reactive({ scale: 1, x: 0, y: 0 })
const globe = reactive({ yaw: -.22, pitch: .06, progress: 0 })
const viewport = reactive({ width: 0, height: 0 })
const drag = reactive({ active: false, mode: 'map', x: 0, y: 0, originX: 0, originY: 0, originYaw: 0, originPitch: 0 })

const landmarks = [
  { id: 'ilyr', icon: 'ilyr', continent: 'ilyr-khaz', x: 47.5, y: 8.4, path: '/cografya/ilyr-khaz', pathEn: '/en/cografya/ilyr-khaz', tr: { name: 'Ilyr-Khaz', type: 'Kuzey kıtaları', description: 'Buz yarıkları, fiyortlar ve kısa yazın geçitleri.' }, en: { name: 'Ilyr-Khaz', type: 'Northern continents', description: 'Ice rifts, fjords, and the passages of brief summer.' } },
  { id: 'nareth', icon: 'nareth', continent: 'nareth', x: 30.7, y: 35.5, path: '/cografya/nareth', pathEn: '/en/cografya/nareth', tr: { name: 'Nareth', type: 'Batı kıtası', description: 'Orman sınırları, tuz havzası ve uzun kök yolları.' }, en: { name: 'Nareth', type: 'Western continent', description: 'Forest borders, the salt basin, and long root roads.' } },
  { id: 'asteron', icon: 'asteron', continent: 'asteron', x: 82, y: 39.7, path: '/cografya/asteron', pathEn: '/en/cografya/asteron', tr: { name: 'Asteron', type: 'Doğu kıtası', description: 'Nehir kayıtları, iç havzalar ve kuzey geçitleri.' }, en: { name: 'Asteron', type: 'Eastern continent', description: 'River records, inner basins, and northern passes.' } },
  { id: 'odraka', icon: 'odraka', continent: 'odraka', x: 54.7, y: 78.2, path: '/cografya/odraka', pathEn: '/en/cografya/odraka', tr: { name: 'Odraka', type: 'Güney kıtası', description: 'Savanlar, muson yolları ve ejderha mirası.' }, en: { name: 'Odraka', type: 'Southern continent', description: 'Savannas, monsoon roads, and dragon heritage.' } },
  { id: 'seas', x: 52, y: 49, path: '/cografya/denizler', pathEn: '/en/cografya/seas', tr: { name: 'İç Denizler', type: 'Ortak sular', description: 'Kıtaları ayıran ve birbirine bağlayan derin geçişler.' }, en: { name: 'Inner Seas', type: 'Shared waters', description: 'Deep passages that divide and connect the continents.' } }
]

const continentDetails = {
  ilyr: {
    map: '/assets/maps/continents/detail/ilyr-khaz.png',
    tr: { name: 'Ilyr-Khaz', eyebrow: 'Kuzey kıtaları', description: 'Buz yarıkları, fiyortlar ve kısa yaz geçitlerinden oluşan kuzey kuşağı. Harita, kıyı lojistiği ve donmuş geçitler için yakın plan okumaya açıktır.', locations: [{ name: 'Nivarra', type: 'Ayaz Sarayı', path: '/yerlesimler/nivarra' }, { name: 'Kar-Dur', type: 'Taş Tacı', path: '/yerlesimler/kar-dur' }] },
    en: { name: 'Ilyr-Khaz', eyebrow: 'Northern continents', description: 'A northern belt of ice rifts, fjords, and the routes of short summer.', locations: [{ name: 'Nivarra', type: 'Frost Court', path: '/en/yerlesimler/nivarra' }, { name: 'Kar-Dur', type: 'Stone Crown', path: '/en/yerlesimler/kar-dur' }] }
  },
  nareth: {
    map: '/assets/maps/continents/detail/nareth.png',
    tr: { name: 'Nareth', eyebrow: 'Batı kıtası', description: 'Orman sınırları, tuz havzası ve kök yolları. Yakın plan harita yeni şehir, köy ve rota işaretleri için çalışma alanıdır.', locations: [{ name: 'Elyrakök', type: 'Diken Tacı', path: '/yerlesimler/elyrakok' }, { name: 'Yabanocak', type: 'Gizli şehir', path: '/yerlesimler/yabanocak' }, { name: 'Halvek', type: 'Nehir erzağı', path: '/yerlesimler/halvek' }] },
    en: { name: 'Nareth', eyebrow: 'Western continent', description: 'Forest borders, the salt basin, and root roads. Its close map is ready for city, village, and route markers.', locations: [{ name: 'Elyrakök', type: 'Thorn Crown', path: '/en/yerlesimler/elyrakok' }, { name: 'Yabanocak', type: 'Hidden city', path: '/en/yerlesimler/yabanocak' }, { name: 'Halvek', type: 'River provisions', path: '/en/yerlesimler/halvek' }] }
  },
  asteron: {
    map: '/assets/maps/continents/detail/asteron.png',
    tr: { name: 'Asteron', eyebrow: 'Doğu kıtası', description: 'Nehir kayıtları, iç havzalar ve kuzey geçitleri. Bu ayrıntı düzeyi yerleşim, geçit ve ticaret noktalarını katmanlamak içindir.', locations: [{ name: 'Ordanor', type: 'İmparatorluk başkenti', path: '/yerlesimler/ordanor' }, { name: 'Gök Eşiği', type: 'Geçit gözlemevi', path: '/yerlesimler/gok-esigi' }, { name: 'Kırk Köprü', type: 'Nehir cumhuriyeti', path: '/yerlesimler/kirk-kopru' }] },
    en: { name: 'Asteron', eyebrow: 'Eastern continent', description: 'River records, inner basins, and northern passes. This detail level is meant for layered settlement, pass, and trade markers.', locations: [{ name: 'Ordanor', type: 'Imperial capital', path: '/en/yerlesimler/ordanor' }, { name: 'Gök Eşiği', type: 'Pass observatory', path: '/en/yerlesimler/gok-esigi' }, { name: 'Kırk Köprü', type: 'River republic', path: '/en/yerlesimler/kirk-kopru' }] }
  },
  odraka: {
    map: '/assets/maps/continents/detail/odraka.png',
    tr: { name: 'Odraka', eyebrow: 'Güney kıtası', description: 'Savanlar, muson yolları ve ejderha mirası. Yakın plan katman, şehirler, nehir ağızları ve göç rotaları için hazırlanmıştır.', locations: [{ name: 'Saar-Kor', type: 'Kaldera başkenti', path: '/yerlesimler/saar-kor' }, { name: 'Yeşil Diş', type: 'Nehir ağzı kalesi', path: '/yerlesimler/yesil-dis' }, { name: 'Ur-Marak', type: 'Toprak surlar', path: '/yerlesimler/ur-marak' }] },
    en: { name: 'Odraka', eyebrow: 'Southern continent', description: 'Savannas, monsoon roads, and dragon heritage. Its close layer is prepared for cities, river mouths, and migration routes.', locations: [{ name: 'Saar-Kor', type: 'Caldera capital', path: '/en/yerlesimler/saar-kor' }, { name: 'Yeşil Diş', type: 'River-mouth fortress', path: '/en/yerlesimler/yesil-dis' }, { name: 'Ur-Marak', type: 'Earthen walls', path: '/en/yerlesimler/ur-marak' }] }
  }
}

const selected = computed(() => landmarks.find((landmark) => landmark.id === selectedId.value) || landmarks[0])
const selectedCopy = computed(() => selected.value[isEnglish.value ? 'en' : 'tr'])
const selectedPath = computed(() => selected.value[isEnglish.value ? 'pathEn' : 'path'])
const panelDetail = computed(() => continentDetails[panelOpen.value])
const panelCopy = computed(() => panelDetail.value?.[isEnglish.value ? 'en' : 'tr'])
const panelLandmark = computed(() => landmarks.find((landmark) => landmark.id === panelOpen.value))
const globeVisible = computed(() => globe.progress > .03)
const isGlobe = computed(() => globe.progress > .6)
// The source map is 3:2. At its resting scale, fit its full latitude range
// inside the viewport; horizontal continuity is supplied by the repeated tile.
const planeBaseHeight = computed(() => Math.max(1, viewport.height))
const planeHeight = computed(() => Math.max(1, planeBaseHeight.value * view.scale))
const tileWidth = computed(() => planeHeight.value * 1.5)
const labelsDetailed = computed(() => view.scale >= 1.16 && globe.progress < .08)
const planeStyle = computed(() => ({
  '--atlas-plane-opacity': 1 - globe.progress,
  backgroundImage: `url(${withBase('/assets/maps/avarra-surface-hq.png')})`,
  backgroundPosition: `calc(50% + ${view.x}px) calc(50% + ${view.y}px)`,
  backgroundRepeat: 'repeat-x',
  backgroundSize: `auto ${planeHeight.value}px`
}))
const globeStyle = computed(() => ({ '--atlas-globe-opacity': globe.progress }))
const highlightedLandmark = computed(() => landmarks.find((landmark) => landmark.id === hoveredId.value))
const highlightStyle = computed(() => {
  const continent = highlightedLandmark.value?.continent
  if (!continent) return {}
  return {
    backgroundImage: `url(${withBase(`/assets/maps/continents/${continent}.png`)})`,
    backgroundPosition: `calc(50% + ${view.x}px) calc(50% + ${view.y}px)`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: `auto ${planeHeight.value}px`
  }
})
const loadingCopy = computed(() => {
  if (progress.value < 40) return isEnglish.value ? 'Reading the world veins' : 'Dünya damarları okunuyor'
  if (progress.value < 82) return isEnglish.value ? 'Raising the relief' : 'Kabartı yükseltiliyor'
  return isEnglish.value ? 'Gathering the high clouds' : 'Yüksek bulutlar toplanıyor'
})
const labelCopies = computed(() => {
  const width = tileWidth.value
  const height = planeHeight.value
  if (!width || !height) return []
  return landmarks.map((landmark) => {
    const unwrappedLeft = viewport.width / 2 + view.x + (landmark.x / 100 - .5) * width
    const left = unwrappedLeft - Math.round((unwrappedLeft - viewport.width / 2) / width) * width
    return { landmark, key: landmark.id, left, top: viewport.height / 2 + view.y + (landmark.y / 100 - .5) * height }
  })
})

let context
let surfacePixels
let cloudPixels
let renderWidth = 0
let renderHeight = 0
let resizeObserver
let loadingTimer
let globeAnimation
let cloudFrame
let lastCloudFrame = 0
let cloudDrift = 0

function loadImage(path) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = withBase(path)
  })
}

function imagePixels(image) {
  const sourceCanvas = document.createElement('canvas')
  sourceCanvas.width = image.naturalWidth
  sourceCanvas.height = image.naturalHeight
  const sourceContext = sourceCanvas.getContext('2d', { willReadFrequently: true })
  sourceContext.drawImage(image, 0, 0)
  return sourceContext.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height)
}

function renderGlobe() {
  if (!context || !surfacePixels || !renderWidth || !renderHeight) return
  const output = context.createImageData(renderWidth, renderHeight)
  const data = output.data
  const cx = renderWidth / 2
  const cy = renderHeight / 2
  // Keep a calm, visible margin around the sphere at every aspect ratio.
  // The canvas itself may be stretched to the viewport, so this deliberately
  // uses a smaller safe radius rather than allowing the polar edge to clip.
  const radius = Math.min(renderWidth, renderHeight) * .39
  const yawCos = Math.cos(globe.yaw)
  const yawSin = Math.sin(globe.yaw)
  const pitchCos = Math.cos(globe.pitch)
  const pitchSin = Math.sin(globe.pitch)
  const sample = (pixels, u, v) => {
    const x = Math.max(0, Math.min(pixels.width - 1, Math.floor(((u % 1 + 1) % 1) * pixels.width)))
    const y = Math.max(0, Math.min(pixels.height - 1, Math.floor(Math.max(0, Math.min(.99999, v)) * pixels.height)))
    return (y * pixels.width + x) * 4
  }
  const cloudDensity = (u, v) => {
    const wrappedU = (u % 1 + 1) % 1
    const x = wrappedU * (cloudPixels.width - 1)
    const y = Math.max(0, Math.min(cloudPixels.height - 1.001, v * (cloudPixels.height - 1)))
    const x0 = Math.floor(x)
    const y0 = Math.floor(y)
    const x1 = (x0 + 1) % cloudPixels.width
    const y1 = Math.min(cloudPixels.height - 1, y0 + 1)
    const mixX = x - x0
    const mixY = y - y0
    const densityAt = (column, row) => {
      const start = (row * cloudPixels.width + column) * 4
      return Math.max(cloudPixels.data[start], cloudPixels.data[start + 1], cloudPixels.data[start + 2]) / 255
    }
    const top = densityAt(x0, y0) * (1 - mixX) + densityAt(x1, y0) * mixX
    const bottom = densityAt(x0, y1) * (1 - mixX) + densityAt(x1, y1) * mixX
    return top * (1 - mixY) + bottom * mixY
  }
  for (let y = 0; y < renderHeight; y += 1) {
    for (let x = 0; x < renderWidth; x += 1) {
      const outputIndex = (y * renderWidth + x) * 4
      const nx = (x - cx) / radius
      const ny = (y - cy) / radius
      const distance = nx * nx + ny * ny
      if (distance > 1) continue
      const front = Math.sqrt(1 - distance)
      const screenY = -ny
      const localY = screenY * pitchCos + front * pitchSin
      const localZ = -screenY * pitchSin + front * pitchCos
      const worldX = nx * yawCos - localZ * yawSin
      const worldZ = nx * yawSin + localZ * yawCos
      const u = Math.atan2(worldX, worldZ) / (Math.PI * 2) + .5
      const v = .5 - Math.asin(localY) / Math.PI
      const source = sample(surfacePixels, u, v)
      const light = Math.max(.2, nx * -.25 + ny * -.28 + front * .88)
      data[outputIndex] = surfacePixels.data[source] * light
      data[outputIndex + 1] = surfacePixels.data[source + 1] * light
      data[outputIndex + 2] = surfacePixels.data[source + 2] * light
      if (cloudPixels) {
        const density = cloudDensity(u + cloudDrift, v)
        const cloudAlpha = Math.max(0, Math.min(.38, (density - .31) * .56))
        data[outputIndex] = data[outputIndex] * (1 - cloudAlpha) + 233 * cloudAlpha
        data[outputIndex + 1] = data[outputIndex + 1] * (1 - cloudAlpha) + 243 * cloudAlpha
        data[outputIndex + 2] = data[outputIndex + 2] * (1 - cloudAlpha) + 250 * cloudAlpha
      }
      data[outputIndex + 3] = 255
    }
  }
  context.clearRect(0, 0, renderWidth, renderHeight)
  context.putImageData(output, 0, 0)
}

function resizeCanvas() {
  if (!canvas.value || !context) return
  const bounds = frame.value?.getBoundingClientRect() || canvas.value.getBoundingClientRect()
  viewport.width = Math.round(bounds.width)
  viewport.height = Math.round(bounds.height)
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
  const nextWidth = Math.max(500, Math.min(1536, Math.round(bounds.width * ratio)))
  const nextHeight = Math.max(340, Math.min(1024, Math.round(bounds.height * ratio)))
  if (nextWidth === renderWidth && nextHeight === renderHeight) return
  renderWidth = nextWidth
  renderHeight = nextHeight
  canvas.value.width = renderWidth
  canvas.value.height = renderHeight
  renderGlobe()
}

function animateGlobe(target) {
  const start = globe.progress
  const startedAt = performance.now()
  cancelAnimationFrame(globeAnimation)
  const tick = (now) => {
    const elapsed = Math.min(1, (now - startedAt) / 620)
    const eased = elapsed < .5 ? 4 * elapsed * elapsed * elapsed : 1 - Math.pow(-2 * elapsed + 2, 3) / 2
    globe.progress = start + (target - start) * eased
    renderGlobe()
    if (elapsed < 1) globeAnimation = requestAnimationFrame(tick)
  }
  globeAnimation = requestAnimationFrame(tick)
}

function changeZoom(direction) {
  if (direction < 0 && view.scale <= 1.14) {
    view.scale = 1
    view.y = 0
    animateGlobe(1)
    return
  }
  const previous = view.scale
  view.scale = Math.max(1, Math.min(2.25, Number((view.scale + direction).toFixed(2))))
  if (view.scale === previous) return
  const maxY = Math.max(0, (planeHeight.value - viewport.height) / 2)
  view.y = Math.max(-maxY, Math.min(maxY, view.y))
  if (globe.progress > 0) animateGlobe(0)
}

function toggleGlobe() {
  if (isGlobe.value) {
    view.scale = 1
    animateGlobe(0)
  } else {
    view.scale = 1
    view.x = 0
    view.y = 0
    animateGlobe(1)
  }
}

function zoomByWheel(event) { changeZoom(event.deltaY < 0 ? .14 : -.14) }

function resetView() {
  view.scale = 1
  view.x = 0
  view.y = 0
  globe.yaw = -.22
  globe.pitch = .06
  animateGlobe(0)
}

function startDrag(event) {
  if (event.button !== 0) return
  drag.active = true
  drag.mode = isGlobe.value ? 'globe' : 'map'
  drag.x = event.clientX
  drag.y = event.clientY
  drag.originX = view.x
  drag.originY = view.y
  drag.originYaw = globe.yaw
  drag.originPitch = globe.pitch
  event.currentTarget.setPointerCapture?.(event.pointerId)
}

function moveDrag(event) {
  if (!drag.active) return
  if (drag.mode === 'globe') {
    globe.yaw = drag.originYaw + (event.clientX - drag.x) / Math.max(1, viewport.width) * 3.8
    globe.pitch = Math.max(-.82, Math.min(.82, drag.originPitch + (event.clientY - drag.y) / Math.max(1, viewport.height) * 1.9))
    renderGlobe()
    return
  }
  view.x = drag.originX + event.clientX - drag.x
  const maxY = Math.max(0, (planeHeight.value - viewport.height) / 2)
  view.y = Math.max(-maxY, Math.min(maxY, drag.originY + event.clientY - drag.y))
}

function endDrag() { drag.active = false }
function selectLandmark(id) { selectedId.value = id }
function openDetails(id) {
  if (!continentDetails[id]) return
  selectedId.value = id
  panelOpen.value = id
}
function hoverLandmark(id) { hoveredId.value = id }
function clearHover() { hoveredId.value = null }

async function initializeAtlas() {
  try {
    progress.value = 24
    context = canvas.value?.getContext('2d', { alpha: true, willReadFrequently: true })
    if (!context) throw new Error('Canvas unavailable')
    progress.value = 48
    const [surface, clouds] = await Promise.all([loadImage('/assets/maps/avarra-surface-hq.png'), loadImage('/assets/maps/avarra-clouds.png')])
    surfacePixels = imagePixels(surface)
    cloudPixels = imagePixels(clouds)
    progress.value = 84
    resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(frame.value)
    resizeCanvas()
    const animateClouds = (now) => {
      if (globe.progress > .08 && now - lastCloudFrame > 45) {
        cloudDrift = (cloudDrift + (now - lastCloudFrame) * .0000038) % 1
        lastCloudFrame = now
        renderGlobe()
      } else if (globe.progress <= .08 || !lastCloudFrame) lastCloudFrame = now
      cloudFrame = requestAnimationFrame(animateClouds)
    }
    cloudFrame = requestAnimationFrame(animateClouds)
  } finally {
    progress.value = 100
    loadingTimer = window.setTimeout(() => { loading.value = false }, 560)
  }
}

onMounted(() => nextTick(initializeAtlas))
onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.clearTimeout(loadingTimer)
  cancelAnimationFrame(globeAnimation)
  cancelAnimationFrame(cloudFrame)
})
</script>

<template>
  <section class="avarra-atlas" :class="{ 'is-dragging': drag.active, 'is-globe': globeVisible, 'is-close': labelsDetailed }" :aria-label="isEnglish ? 'Interactive map of Avarra' : 'Avarra etkileşimli dünya haritası'">
    <div ref="frame" class="avarra-atlas-frame" @wheel.prevent="zoomByWheel" @pointerdown="startDrag" @pointermove="moveDrag" @pointerup="endDrag" @pointercancel="endDrag" @pointerleave="endDrag">
      <div class="avarra-atlas-plane" :style="planeStyle"></div>
      <div v-if="highlightedLandmark?.continent" class="atlas-continent-highlight" :style="highlightStyle" aria-hidden="true"></div>
      <canvas ref="canvas" class="avarra-atlas-canvas atlas-globe-canvas" :style="globeStyle" aria-hidden="true"></canvas>
      <div class="avarra-atlas-vignette" aria-hidden="true"></div>
      <div class="avarra-atlas-labels" aria-label="Map records">
        <button v-for="copy in labelCopies" :key="copy.key" type="button" class="atlas-label" :class="{ active: copy.landmark.id === selectedId }" :style="{ left: `${copy.left}px`, top: `${copy.top}px`, '--atlas-marker-scale': Math.min(2.15, Math.max(.82, view.scale)) }" @pointerdown.stop @mouseenter="hoverLandmark(copy.landmark.id)" @mouseleave="clearHover" @focus="hoverLandmark(copy.landmark.id)" @blur="clearHover" @click="openDetails(copy.landmark.id)">
          <span class="atlas-label-icon" :class="`atlas-icon--${copy.landmark.id}`" aria-hidden="true">
            <img v-if="copy.landmark.icon" :src="withBase(`/assets/maps/icons/${copy.landmark.icon}.png`)" alt="" />
            <svg v-else viewBox="0 0 32 32"><path d="M4 10c4.2-4 8.1 4 12.1 0s7.7-4 11.9 0v4c-4.2-4-8.1 4-11.9 0S8.2 10 4 14v-4Zm0 9c4.2-4 8.1 4 12.1 0s7.7-4 11.9 0v4c-4.2-4-8.1 4-11.9 0S8.2 19 4 23v-4Z"/></svg>
          </span>
          <span class="atlas-label-name">{{ copy.landmark[isEnglish ? 'en' : 'tr'].name }}</span>
        </button>
      </div>
      <div class="avarra-atlas-controls" :aria-label="isEnglish ? 'Map controls' : 'Harita denetimleri'"><button type="button" @pointerdown.stop @click="changeZoom(.2)" :aria-label="isEnglish ? 'Zoom in' : 'Yakınlaş'">+</button><button type="button" @pointerdown.stop @click="changeZoom(-.2)" :aria-label="isEnglish ? 'Zoom out' : 'Uzaklaş'">−</button><button type="button" class="atlas-globe-control" :aria-pressed="isGlobe" @pointerdown.stop @click="toggleGlobe">{{ isEnglish ? 'Globe' : 'Küre' }}</button><button type="button" class="atlas-reset" @pointerdown.stop @click="resetView">{{ isEnglish ? 'Reset' : 'Sıfırla' }}</button></div>
      <div v-if="loading" class="atlas-loader" role="status" aria-live="polite"><p class="atlas-loader-kicker">{{ isEnglish ? 'World Atlas' : 'Dünya Atlası' }}</p><strong>Avarra</strong><span>{{ loadingCopy }}</span><div class="atlas-loader-track"><i :style="{ width: `${progress}%` }"></i></div><small>{{ progress }}%</small></div>
    </div>
    <footer class="avarra-atlas-footer"><div class="atlas-reading"><span>{{ selectedCopy.type }}</span><h2>{{ selectedCopy.name }}</h2><p>{{ selectedCopy.description }}</p></div><a :href="withBase(selectedPath)" class="chronicle-button">{{ isEnglish ? 'Open record' : 'Kaydı aç' }} <b>→</b></a></footer>
    <div v-if="panelDetail && panelCopy" class="atlas-drawer" role="dialog" aria-modal="true" :aria-label="panelCopy.name">
      <button type="button" class="atlas-drawer-backdrop" :aria-label="isEnglish ? 'Close continent details' : 'Kıta ayrıntılarını kapat'" @click="panelOpen = null"></button>
      <aside class="atlas-drawer-panel">
        <button type="button" class="atlas-drawer-close" @click="panelOpen = null">{{ isEnglish ? 'Close' : 'Kapat' }} <b>×</b></button>
        <div class="atlas-drawer-identity">
          <button v-if="panelLandmark?.icon" type="button" class="atlas-drawer-icon" :aria-label="isEnglish ? `View ${panelCopy.name} crest` : `${panelCopy.name} armasını büyüt`" @click="iconModalOpen = true"><img :src="withBase(`/assets/maps/icons/${panelLandmark.icon}.png`)" alt="" /></button>
          <p class="lore-kicker">{{ panelCopy.eyebrow }}</p>
        </div>
        <h2>{{ panelCopy.name }}</h2>
        <p class="atlas-drawer-lead">{{ panelCopy.description }}</p>
        <figure class="atlas-detail-map"><img :src="withBase(panelDetail.map)" :alt="isEnglish ? `${panelCopy.name} detail map` : `${panelCopy.name} ayrıntı haritası`" /><figcaption>{{ isEnglish ? 'Close atlas · markers are being layered' : 'Yakın atlas · işaret katmanı hazırlanıyor' }}</figcaption></figure>
        <section class="atlas-location-list"><p class="lore-kicker">{{ isEnglish ? 'Known cities & locations' : 'Bilinen şehirler ve lokasyonlar' }}</p><a v-for="location in panelCopy.locations" :key="location.name" :href="withBase(location.path)"><span>◈</span><b>{{ location.name }}</b><small>{{ location.type }}</small><i>→</i></a></section>
      </aside>
    </div>
    <div v-if="iconModalOpen && panelLandmark?.icon && panelCopy" class="atlas-icon-modal" role="dialog" aria-modal="true" :aria-label="isEnglish ? `${panelCopy.name} crest` : `${panelCopy.name} arması`" @keydown.esc="iconModalOpen = false">
      <button type="button" class="atlas-icon-modal-backdrop" :aria-label="isEnglish ? 'Close crest' : 'Armadan çık'" @click="iconModalOpen = false"></button>
      <figure class="atlas-icon-modal-card">
        <button type="button" class="atlas-icon-modal-close" :aria-label="isEnglish ? 'Close' : 'Kapat'" @click="iconModalOpen = false">×</button>
        <img :src="withBase(`/assets/maps/icons/${panelLandmark.icon}.png`)" :alt="isEnglish ? `${panelCopy.name} crest` : `${panelCopy.name} arması`" />
        <figcaption>{{ panelCopy.name }}</figcaption>
      </figure>
    </div>
  </section>
</template>

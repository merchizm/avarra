<script setup>
import { onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
defineProps({ href: String, label: String, alt: String })
const root = ref(null)
const on = ref(false)
onMounted(() => {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { on.value = true; return }
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { on.value = true; io.disconnect() } }, { threshold: 0.35 })
  io.observe(root.value)
})
const src = withBase('/assets/maps/avarra-world-map.jpg')
</script>

<template>
  <a ref="root" class="mapink" :class="{ on }" :href="href" :aria-label="label">
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" :aria-label="alt">
      <defs>
        <filter id="mapink-f" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.016" numOctaves="4" seed="5" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="170" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="3" result="b" />
          <feComponentTransfer in="b"><feFuncA type="linear" slope="16" intercept="-7" /></feComponentTransfer>
        </filter>
        <mask id="mapink-m" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="600">
          <g filter="url(#mapink-f)" fill="#fff">
            <circle class="b b1" cx="400" cy="300" r="0" />
            <circle class="b b2" cx="130" cy="140" r="0" />
            <circle class="b b3" cx="690" cy="470" r="0" />
            <circle class="b b4" cx="680" cy="110" r="0" />
            <circle class="b b5" cx="120" cy="500" r="0" />
          </g>
        </mask>
      </defs>
      <image class="base" :href="src" width="800" height="600" preserveAspectRatio="xMidYMid slice" />
      <image class="ink" :href="src" width="800" height="600" preserveAspectRatio="xMidYMid slice" mask="url(#mapink-m)" />
    </svg>
  </a>
</template>

<style scoped>
.mapink svg { display: block; width: 100%; height: 100%; }
.base { filter: grayscale(1) sepia(.5) brightness(1.05); opacity: .22; }
.ink { filter: grayscale(1) contrast(1.06); transition: filter .8s ease; }
.mapink:hover .ink { filter: none; }
.b { transition: r 4s cubic-bezier(.55, .05, .35, 1); }
.on .b { r: 330px; }
.on .b1 { r: 420px; }
.b2 { transition-delay: .5s; } .b3 { transition-delay: 1s; } .b4 { transition-delay: .7s; } .b5 { transition-delay: 1.3s; }
.b1 { transition-delay: 0s; }
</style>

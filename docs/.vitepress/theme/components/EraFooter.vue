<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { page, lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const isHistory = computed(() => page.value.relativePath.replace(/^en\//, '').startsWith('tarih/'))
const current = computed(() => page.value.relativePath.replace(/^en\//, '').replace(/^tarih\//, '').replace(/\.md$/, ''))
const eras = [
  ['sessiz-baslangic', 'SÖ 9000 öncesi', 'Sessiz Başlangıç', 'Before SD 9000', 'Silent Beginning'],
  ['ilk-uyanislar', 'SÖ 9000–5200', 'İlk Uyanışlar', 'SD 9000–5200', 'First Awakenings'],
  ['damar-uygarliklari', 'SÖ 5200–2700', 'Damar Uygarlıkları', 'SD 5200–2700', 'Vein Civilizations'],
  ['kirilma-ve-siginaklar', 'SÖ 2700–1500', 'Kırılma ve Sığınaklar', 'SD 2700–1500', 'Fracture & Refuges'],
  ['taclar-cagi', 'SÖ 1500–350', 'Taçlar Çağı', 'SD 1500–350', 'Age of Crowns'],
  ['meridyen-cagi', 'SÖ 350–0', 'Meridyen Çağı', 'SD 350–0', 'Meridian Age'],
  ['suruklenme-cagi', 'SS 0–83', 'Sürüklenme Çağı', 'SD 0–83', 'Age of Drift']
]
</script>

<template>
  <nav v-if="isHistory" class="era-footer" :aria-label="isEnglish ? 'Ages of Avarra' : 'Avarra çağları'">
    <p>{{ isEnglish ? 'The ages of Avarra' : 'Avarra’nın çağları' }}</p>
    <div><a v-for="era in eras" :key="era[0]" :class="{ active: current === era[0] }" :href="withBase(`${isEnglish ? '/en' : ''}/tarih/${era[0]}`)"><small>{{ isEnglish ? era[3] : era[1] }}</small><strong>{{ isEnglish ? era[4] : era[2] }}</strong></a></div>
  </nav>
</template>

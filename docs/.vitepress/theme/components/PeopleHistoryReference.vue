<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { page, lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const path = computed(() => page.value.relativePath.replace(/^en\//, ''))
const era = computed(() => {
  const value = path.value
  if (/warforged|autognom|svirfneblin|duergar|myconid|kobold/.test(value)) return 'damar-uygarliklari'
  if (/elf|eladrin|drow|firbolg|satyr|dikenkanli/.test(value)) return 'ilk-uyanislar'
  if (/dragonborn|minotaur|centaur|lizardfolk|tortle|grung|tabaxi|kenku|orc/.test(value)) return 'ilk-uyanislar'
  if (/insan|veyran|halfling|goblin|hobgoblin|genasi/.test(value)) return 'taclar-cagi'
  return 'suruklenme-cagi'
})
const show = computed(() => path.value.startsWith('irklar/') && !path.value.endsWith('index.md'))
const names = {
  'ilk-uyanislar': { tr: 'İlk Uyanışlar Çağı', en: 'Age of First Awakenings' },
  'damar-uygarliklari': { tr: 'Damar Uygarlıkları Çağı', en: 'Age of Vein Civilizations' },
  'taclar-cagi': { tr: 'Taçlar Çağı', en: 'Age of Crowns' },
  'suruklenme-cagi': { tr: 'Sürüklenme Çağı', en: 'Age of Drift' }
}
</script>

<template>
  <aside v-if="show" class="people-history-reference">
    <span>⌛</span><div><small>{{ isEnglish ? 'Historical reference' : 'Tarihçe referansı' }}</small><strong>{{ isEnglish ? names[era].en : names[era].tr }}</strong><p>{{ isEnglish ? 'This people’s current identity is shaped by this era and the changes that followed it.' : 'Bu halkın bugünkü kimliği, bu çağ ve ardından gelen dönüşümlerle şekillenmiştir.' }}</p><a :href="withBase(`${isEnglish ? '/en' : ''}/tarih/${era}`)">{{ isEnglish ? 'Read the era →' : 'Çağı oku →' }}</a></div>
  </aside>
</template>

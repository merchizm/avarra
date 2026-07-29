<script setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const query = ref('')
const active = ref('all')

const records = [
  { slug: 'canli-butun', group: 'living', sigil: '◉', tr: 'Canlı Bütün', en: 'Living Whole', trText: 'Dünyanın kendisini canlı ve kutsal kabul eden inanç ailesi.', enText: 'The faith family that understands the world itself as living and sacred.' },
  { slug: 'kok-antlasmasi', group: 'living', sigil: '⌇', tr: 'Kök Antlaşması', en: 'Root Compact', trText: 'Orman, kök, hatıra ve emanet toprak hukuku.', enText: 'Forest memory, roots, and law of entrusted land.' },
  { slug: 'ilk-yanki', group: 'living', sigil: '◇', tr: 'İlk Yankı', en: 'First Echo', trText: 'Taşın hafızası, adlar ve yeminler.', enText: 'Stone memory, names, and binding oaths.' },
  { slug: 'akis-yolu', group: 'living', sigil: '≋', tr: 'Akış Yolu', en: 'Flowing Way', trText: 'Yaşamın akışı, ölüm ve dönüş üzerine nehir öğretisi.', enText: 'A river teaching of life’s flow, death, and return.' },
  { slug: 'son-ocak', group: 'living', sigil: '✹', tr: 'Son Ocak', en: 'Last Hearth', trText: 'Sürgün insan topluluklarının ortak koru.', enText: 'The shared ember of displaced human communities.' },
  { slug: 'goksel-tac', group: 'celestial', sigil: '✦', tr: 'Göksel Taç', en: 'Celestial Crown', trText: 'Dokuz Makam ve göksel düzenin inanç ailesi.', enText: 'The faith family of the nine offices and celestial order.' },
  { slug: 'yildiz-duzeni', group: 'celestial', sigil: '✧', tr: 'Yıldız Düzeni', en: 'Star Order', trText: 'Yıldız haritaları, kader ve hukuk.', enText: 'Star charts, destiny, and law.' },
  { slug: 'mevsim-taclari', group: 'celestial', sigil: '❋', tr: 'Mevsim Taçları', en: 'Seasonal Crowns', trText: 'Değişimi kutsal sayan Eladrin geleneği.', enText: 'An Eladrin tradition that treats change as sacred.' },
  { slug: 'ilk-alev', group: 'celestial', sigil: '♨', tr: 'İlk Alev', en: 'First Flame', trText: 'Yaratım, ejderha mirası ve eylem ateşi.', enText: 'Creation, dragon heritage, and the fire of action.' },
  { slug: 'esik-ve-atalar', group: 'threshold', sigil: '◐', tr: 'Eşik ve Atalar', en: 'Threshold & Ancestors', trText: 'Yaşayanlar ve ölüler arasındaki korunmuş sınır.', enText: 'The guarded boundary between living and dead.' },
  { slug: 'maskeli-atalar', group: 'threshold', sigil: '◌', tr: 'Maskeli Atalar', en: 'Masked Ancestors', trText: 'Ataların hatırasını ayin maskesine davet eden gelenek.', enText: 'A tradition that invites ancestral memory into ritual masks.' },
  { slug: 'perde-bekcileri', group: 'threshold', sigil: '☾', tr: 'Perde Bekçileri', en: 'Veil Keepers', trText: 'Rüya ve gölgede Eşik’i gözleyenler.', enText: 'Watchers of the Threshold through dream and shadow.' },
  { slug: 'sessiz-sofra', group: 'threshold', sigil: '⌂', tr: 'Sessiz Sofra', en: 'Silent Table', trText: 'Ölü için boş yer bırakan konukluk geleneği.', enText: 'The guest rite that leaves a place for the dead.' }
]
const groups = computed(() => [
  { key: 'all', label: isEnglish.value ? 'All records' : 'Tüm kayıtlar', count: records.length },
  { key: 'living', label: isEnglish.value ? 'Living Whole' : 'Canlı Bütün', count: 5 },
  { key: 'celestial', label: isEnglish.value ? 'Celestial Crown' : 'Göksel Taç', count: 4 },
  { key: 'threshold', label: isEnglish.value ? 'Threshold & Ancestors' : 'Eşik & Atalar', count: 4 }
])
const visible = computed(() => {
  const q = query.value.trim().toLocaleLowerCase(isEnglish.value ? 'en-US' : 'tr-TR')
  return records.filter((record) => (active.value === 'all' || record.group === active.value) && (!q || `${record.tr} ${record.en} ${record.trText} ${record.enText}`.toLocaleLowerCase(isEnglish.value ? 'en-US' : 'tr-TR').includes(q)))
})
const linkFor = (slug) => withBase(`${isEnglish.value ? '/en' : ''}/kulturler/dinler/${slug}`)
</script>

<template>
  <section class="faith-catalogue">
    <aside class="faith-sidebar">
      <p class="faith-sidebar-title">{{ isEnglish ? 'Faith archive' : 'İnanç arşivi' }}</p>
      <label class="faith-search"><span>⌕</span><input v-model="query" type="search" :placeholder="isEnglish ? 'Search records…' : 'Kayıtlarda ara…'" /></label>
      <div class="faith-counts"><span>{{ records.length }} <small>{{ isEnglish ? 'records' : 'kayıt' }}</small></span><span>3 <small>{{ isEnglish ? 'families' : 'aile' }}</small></span></div>
      <nav class="faith-tabs" :aria-label="isEnglish ? 'Faith families' : 'İnanç aileleri'">
        <button v-for="group in groups" :key="group.key" :class="{ active: active === group.key }" @click="active = group.key"><b>{{ group.count }}</b>{{ group.label }}</button>
      </nav>
      <div class="faith-sidebar-note"><span>✦</span><p>{{ isEnglish ? 'Sacred power is real; its source remains contested.' : 'Kutsal güç gerçektir; kaynağı ise tartışmalıdır.' }}</p></div>
    </aside>
    <div class="faith-main">
      <header class="faith-heading"><p class="lore-kicker">{{ isEnglish ? 'Avarra Encyclopaedia · Living Traditions' : 'Avarra Ansiklopedisi · Yaşayan Gelenekler' }}</p><h1>{{ isEnglish ? 'Faiths of Avarra' : 'Avarra Dinleri' }}</h1><p>{{ isEnglish ? 'Choose a family from the archive or follow a record into its rites, laws, and disputes.' : 'Arşivden bir aile seçin; ayinlerine, hukukuna ve tartışmalarına doğru ilerleyin.' }}</p></header>
      <div class="faith-records"><a v-for="record in visible" :key="record.slug" :href="linkFor(record.slug)" class="faith-record"><span class="faith-sigil">{{ record.sigil }}</span><div><small>{{ groups.find((group) => group.key === record.group)?.label }}</small><h2>{{ isEnglish ? record.en : record.tr }}</h2><p>{{ isEnglish ? record.enText : record.trText }}</p></div><b>→</b></a></div>
    </div>
  </section>
</template>

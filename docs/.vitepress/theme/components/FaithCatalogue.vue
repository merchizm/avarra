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
const familyBriefs = computed(() => [
  {
    key: 'living', sigil: '◉', count: 5,
    trTitle: 'Canlı Bütün', enTitle: 'Living Whole',
    trQuestion: 'Dünya bizden ne ister?', enQuestion: 'What does the world ask of us?',
    trText: 'Kök, taş, nehir ve ocak üzerinden borç, emanet ve dönüşü okur.', enText: 'Reads debt, stewardship, and return through root, stone, river, and hearth.'
  },
  {
    key: 'celestial', sigil: '✦', count: 4,
    trTitle: 'Göksel Taç', enTitle: 'Celestial Crown',
    trQuestion: 'Düzen kime hesap verir?', enQuestion: 'Who must answer for order?',
    trText: 'Dokuz Makam üzerinden yasa, değişim, yıldız ve yaratımın sorumluluğunu tartışır.', enText: 'Debates responsibility in law, change, stars, and creation through the Nine Offices.'
  },
  {
    key: 'threshold', sigil: '◐', count: 4,
    trTitle: 'Eşik ve Atalar', enTitle: 'Threshold & Ancestors',
    trQuestion: 'Ölüyle aramızdaki sınır nedir?', enQuestion: 'What boundary stands between living and dead?',
    trText: 'Hatıra, yas, rüya ve geri dönüşün rıza ile sınırını korur.', enText: 'Guards the consent-bound limits of memory, grief, dreams, and return.'
  }
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
      <header class="faith-heading">
        <p class="lore-kicker">{{ isEnglish ? 'Avarra Encyclopaedia · Living Traditions' : 'Avarra Ansiklopedisi · Yaşayan Gelenekler' }}</p>
        <h1>{{ isEnglish ? 'Faith Archive' : 'İnanç Arşivi' }}</h1>
        <p>{{ isEnglish ? 'Thirteen records, three families, and no single answer to where sacred power begins. Start with the question a tradition asks, then follow it into its rites, laws, and arguments.' : 'On üç kayıt, üç inanç ailesi ve kutsal kudretin nerede başladığına dair tek bir yanıt yok. Önce geleneğin sorduğu soruyu seçin; sonra ayinlerine, hukukuna ve tartışmalarına ilerleyin.' }}</p>
      </header>
      <section class="faith-archive-guide" :aria-label="isEnglish ? 'How to read the archive' : 'Arşivi nasıl okumalı'">
        <div><span>Ⅰ</span><p><b>{{ isEnglish ? 'A family is not a church.' : 'Aile, kilise değildir.' }}</b>{{ isEnglish ? 'A household may keep more than one way, or none.' : 'Bir hane birden fazla yolu birlikte tutabilir; hiçbirini tutmayabilir de.' }}</p></div>
        <div><span>Ⅱ</span><p><b>{{ isEnglish ? 'Rite has consequences.' : 'Ayin sonuç yaratır.' }}</b>{{ isEnglish ? 'Each record connects belief to labour, law, grief, or public life.' : 'Her kayıt inancı emek, hukuk, yas ya da kamusal hayatla bağlar.' }}</p></div>
        <div><span>Ⅲ</span><p><b>{{ isEnglish ? 'Disagreement is part of belief.' : 'İhtilaf inancın parçasıdır.' }}</b>{{ isEnglish ? 'The archive records competing readings instead of declaring one universal orthodoxy.' : 'Arşiv tek bir ortodoksi ilan etmek yerine çatışan yorumları kaydeder.' }}</p></div>
      </section>
      <section class="faith-family-map" :aria-label="isEnglish ? 'Faith family map' : 'İnanç aileleri haritası'">
        <button v-for="family in familyBriefs" :key="family.key" :class="['faith-family-entry', family.key, { active: active === family.key }]" @click="active = family.key">
          <span class="faith-family-sigil">{{ family.sigil }}</span>
          <span class="faith-family-copy"><small>{{ isEnglish ? family.enQuestion : family.trQuestion }}</small><strong>{{ isEnglish ? family.enTitle : family.trTitle }}</strong><em>{{ isEnglish ? family.enText : family.trText }}</em></span>
          <b>{{ family.count }} {{ isEnglish ? 'records' : 'kayıt' }}</b>
        </button>
      </section>
      <div class="faith-records-heading"><p class="lore-kicker">{{ active === 'all' ? (isEnglish ? 'All records' : 'Tüm kayıtlar') : (isEnglish ? 'Selected family' : 'Seçili aile') }}</p><span>{{ visible.length }} {{ isEnglish ? 'records shown' : 'kayıt gösteriliyor' }}</span></div>
      <div class="faith-records"><a v-for="record in visible" :key="record.slug" :href="linkFor(record.slug)" class="faith-record"><span class="faith-sigil">{{ record.sigil }}</span><div><small>{{ groups.find((group) => group.key === record.group)?.label }}</small><h2>{{ isEnglish ? record.en : record.tr }}</h2><p>{{ isEnglish ? record.enText : record.trText }}</p></div><b>→</b></a></div>
    </div>
  </section>
</template>

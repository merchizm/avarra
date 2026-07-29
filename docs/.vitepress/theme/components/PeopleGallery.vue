<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'

const query = ref('')
const filter = ref('Tümü')
const filters = ['Tümü', 'Fey kökenli', 'Ölümlü', 'Yeraltı', 'Drakonik', 'Soy ve dönüşüm']

const peoples = [
  {
    name: 'Eladrin', type: 'Fey kökenli', status: 'Kayıt açık',
    description: 'Duygularını mevsimler gibi taşıyan, geçitler ve eski antlarla yaşayan uzun ömürlü halk.',
    crest: '✦', className: 'eladrin', link: '/irklar/eladrin'
  },
  {
    name: 'İnsanlar', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Kısa ömürlerini şehirler, hanedanlar ve yolculuklarla genişleten uyumlu halklar.',
    crest: '⌂', className: 'human', link: '/irklar/insanlar'
  },
  {
    name: 'Cüceler', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Taşın hafızasına, derin ocaklara ve kuşaklar boyu süren zanaat antlarına bağlı soylar.',
    crest: '⛰', className: 'dwarf', link: '/irklar/cuceler'
  },
  {
    name: 'Koboldlar', type: 'Yeraltı', status: 'Kayıt açık',
    description: 'Tünelleri, ortak emekleri ve ejderha çağından kalan söylenceleriyle tanınan küçük halk.',
    crest: '◈', className: 'kobold', link: '/irklar/koboldlar'
  },
  {
    name: 'Veyranlar', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Ordan İmparatorluğu’nun kurucu halkı; ölçüm, kayıt ve yazılı hukukla şekillenmiş kültürler.',
    crest: '═', className: 'veyran', link: '/irklar/veyranlar'
  },
  {
    name: 'Svirfneblinler', type: 'Yeraltı', status: 'Kayıt açık',
    description: 'Kendilerine Nimrûn diyen, taşın içindeki yankılardan doğduğuna inanan derin Gnom halkı.',
    crest: '◉', className: 'svirfneblin', link: '/irklar/svirfneblinler'
  },
  {
    name: 'Drowlar', type: 'Yeraltı', status: 'Kayıt açık',
    description: 'İpek Tahtı, Karanlık Liman ve Ayaltı sürgünleri arasında farklı hukuklar altında yaşayan halk.',
    crest: '☾', className: 'drow', link: '/irklar/drowlar'
  },
  {
    name: 'Dragonbornlar', type: 'Drakonik', status: 'Kayıt açık',
    description: 'Odraka’da Kızıl Saar ve Mücevher Yemini arasında ejderha mirasını farklı yorumlayan soylar.',
    crest: '♢', className: 'dragonborn', link: '/irklar/dragonbornlar'
  },
  {
    name: 'Lizardfolklar', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Delta krallıklarında sulak alan mühendisliği ve atalara dayalı su hukukuyla yaşayan halklar.',
    crest: '≋', className: 'lizardfolk', link: '/irklar/lizardfolklar'
  },
  {
    name: 'Genasiler', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Toprak, ateş, kristal, kül, su ve buz soyları; tek bir meslek veya ulusla tanımlanmaz.',
    crest: '◇', className: 'genasi', link: '/irklar/genasiler'
  },
  {
    name: 'Minotaurlar', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Labirenti hapis değil, doğru kararın tek bir düz yoldan ibaret olmadığının kutsal simgesi sayarlar.',
    crest: '⌘', className: 'minotaur', link: '/irklar/minotaurlar'
  },
  {
    name: 'Halflingler', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Nehir, yol ve ada kollarına ayrılan; tahıl, haber ve sigorta ağlarını koruyan topluluklar.',
    crest: '☘', className: 'halfling', link: '/irklar/halflingler'
  },
  {
    name: 'Goblinler', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Büyük imparatorluklardan çok şehirlerin görünmeyen işlerini sürdüren lonca kültürleri.',
    crest: '⚙', className: 'goblin', link: '/irklar/goblinler'
  },
  {
    name: 'Tieflingler', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: 'Kor, ayaz, deniz uçurumu, fey-diken ve Durgunluk kaynaklı farklı soy evleri.',
    crest: '⌁', className: 'tiefling', link: '/irklar/tieflingler'
  },
  {
    name: 'Aasimarlar', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: 'Ayrı bir millet değil, birçok halk içinde görülebilen kutsal veya kozmik işaretliler.',
    crest: '✧', className: 'aasimar', link: '/irklar/aasimarlar'
  },
  {
    name: 'Shifterlar', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: 'Kuzey ormanları ve dağ sınırlarında, av hayvanlarının mevsimsel davranışlarıyla yaşayan topluluklar.',
    crest: '◖', className: 'shifter', link: '/irklar/shifterlar'
  },
  {
    name: 'Warforgedler', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: 'Antik cüce ve Gnom kentlerinde uyanan yapay halklar; yurttaşlıkları hâlâ tartışmalıdır.',
    crest: '▣', className: 'warforged', link: '/irklar/warforgedler'
  },
  {
    name: 'Elf Halkları', type: 'Fey kökenli', status: 'Kayıt açık',
    description: 'Orman, Yüksek ve Deniz Elfleri; Diken Tacı, Lethar ve Mercan Sarayları arasında farklı hayatlar kurar.',
    crest: '☽', className: 'elf', link: '/irklar/diger-halklar#elf-halkları'
  },
  {
    name: 'Firbolglar', type: 'Fey kökenli', status: 'Kayıt açık',
    description: 'Kutsal alanları, hayvan göçlerini ve cenaze koruluklarını koruyan Diken Tacı topluluğu.',
    crest: '♣', className: 'firbolg', link: '/irklar/diger-halklar#firbolglar'
  },
  {
    name: 'Dikenkanlılar', type: 'Fey kökenli', status: 'Kayıt açık',
    description: 'Tenlerinde kabuk, yaprak veya boynuz taşıyan; eşit yurttaşlık isteyen kadim humanoidler.',
    crest: '✤', className: 'thornblood', link: '/irklar/diger-halklar#dikenkanlılar'
  },
  {
    name: 'Changelingler', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: `Sis Adaları'nda farklı aile sözleşmelerine bağlı yurttaşlar; birden fazla yasal kimlik taşıyabilirler.`,
    crest: '◌', className: 'changeling', link: '/irklar/diger-halklar#changelingler'
  },
  {
    name: 'Duergarlar', type: 'Yeraltı', status: 'Kayıt açık',
    description: 'Kor-Dum meclisleri ile Kara Örs Krallığı arasında farklı emek, miras ve yurttaşlık anlayışları.',
    crest: '▰', className: 'duergar', link: '/irklar/diger-halklar#duergarlar'
  },
  {
    name: 'Myconidler', type: 'Yeraltı', status: 'Kayıt açık',
    description: 'Şehri aynı hafızayı paylaşan canlı ağ olarak gören ortak bilinç çemberleri.',
    crest: '❋', className: 'myconid', link: '/irklar/diger-halklar#myconidler'
  },
  {
    name: 'Deniz Halkları', type: 'Yeraltı', status: 'Kayıt açık',
    description: 'Locathahlar, Kuo-Toalar, Tritonlar ve Sahuaginler; havza, derinlik ve av sahası hukuklarıyla ayrılır.',
    crest: '≋', className: 'sea', link: '/irklar/diger-halklar#deniz-halkları'
  },
  {
    name: 'Tortlelar', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Ada, manastır ve göç rotalarından oluşan Uzun Kabuk Yolları kültürel birliği.',
    crest: '◒', className: 'tortle', link: '/irklar/diger-halklar#tortlelar'
  },
  {
    name: 'Centaurlar', type: 'Ölümlü', status: 'Kayıt açık',
    description: `Uçsuz Yol Konfederasyonu'nda mülkiyetten çok geçiş hakkını önemseyen göç toplulukları.`,
    crest: '↠', className: 'centaur', link: '/irklar/diger-halklar#centaurlar'
  },
  {
    name: 'Orman ve Gökyüzü Halkları', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Tabaxi, Kenku, Aarakocra, Owlin, Grung ve Satyr toplulukları farklı orman ile hava koridorlarında yaşar.',
    crest: '⌁', className: 'skyfolk', link: '/irklar/diger-halklar#orman-ve-gökyüzü-halkları'
  },
  {
    name: 'Orclar ve Hobgoblinler', type: 'Ölümlü', status: 'Kayıt açık',
    description: `Kızıl Toprak'ın kontrollü yakma bilgisi ve Külordu'nun profesyonel askerî düzeni farklı yollar gösterir.`,
    crest: '▲', className: 'orc', link: '/irklar/diger-halklar#orclar-ve-hobgoblinler'
  },
  {
    name: 'Rebornlar, Hexbloodlar, Dhampirler', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: 'Durgunluk, cadı antları, fey anlaşmaları ve kan lanetleriyle şekillenmiş dağınık topluluklar.',
    crest: '☿', className: 'changed', link: '/irklar/diger-halklar#dönüşmüş-halklar'
  }
]

const visiblePeople = computed(() => {
  const normalized = query.value.trim().toLocaleLowerCase('tr-TR')
  return peoples.filter((person) => {
    const matchesFilter = filter.value === 'Tümü' || person.type === filter.value
    const matchesSearch = !normalized || `${person.name} ${person.type} ${person.description}`
      .toLocaleLowerCase('tr-TR').includes(normalized)
    return matchesFilter && matchesSearch
  })
})
</script>

<template>
  <section class="people-catalogue">
    <header class="people-catalogue-header">
      <div>
        <p class="lore-kicker">Avarra Ansiklopedisi · Halklar</p>
        <h1>Irklar ve Halklar</h1>
        <p class="lore-lead">Soylar, halklar ve geçitlerden doğan kadim akrabalıklar için yaşayan kayıt defteri.</p>
      </div>
      <label class="people-search">
        <span>⌕</span>
        <input v-model="query" type="search" placeholder="Halk ara…" aria-label="Halk ara" />
      </label>
    </header>

    <div class="people-toolbar">
      <p><b>{{ visiblePeople.length }}</b> kayıt gösteriliyor</p>
      <div class="people-filters" aria-label="Halk türüne göre filtrele">
        <button v-for="item in filters" :key="item" :class="{ active: filter === item }" @click="filter = item">{{ item }}</button>
      </div>
    </div>

    <div class="people-grid">
      <component :is="person.link ? 'a' : 'article'" v-for="person in visiblePeople" :key="person.name"
        :href="person.link ? withBase(person.link) : undefined" class="people-card" :class="[person.className, { 'is-draft': !person.link }]">
        <div class="people-visual" :class="{ 'has-image': person.image }">
          <img v-if="person.image" :src="person.image" :alt="person.name + ' portresi'" />
          <span v-else class="people-crest">{{ person.crest }}</span>
          <span class="people-type">{{ person.type }}</span>
        </div>
        <div class="people-card-content">
          <span class="people-status">{{ person.status }}</span>
          <h2>{{ person.name }}</h2>
          <p>{{ person.description }}</p>
          <span v-if="person.link" class="people-link">Kaydı aç <b>→</b></span>
          <span v-else class="people-draft">Arşivci kaydı hazırlıyor</span>
        </div>
      </component>
    </div>

    <p v-if="!visiblePeople.length" class="people-empty">Bu arama veya filtreyle eşleşen bir halk bulunamadı.</p>
  </section>
</template>

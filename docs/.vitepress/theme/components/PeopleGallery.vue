<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'

const query = ref('')
const filter = ref('Tümü')
const filters = ['Tümü', 'Fey kökenli', 'Ölümlü', 'Yeraltı', 'Deniz', 'Drakonik', 'Soy ve dönüşüm']

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
    name: 'Orman Elfleri', type: 'Fey kökenli', status: 'Kayıt açık',
    description: 'Diken Tacı’nın yaşayan koruluklarında, eski antları ve sınır patikalarını koruyan elf halkı.',
    crest: '☽', className: 'elf', link: '/irklar/orman-elfleri'
  },
  {
    name: 'Yüksek Elfler', type: 'Fey kökenli', status: 'Kayıt açık',
    description: 'Lethar’ın yıldız kayıtları, diplomasi evleri ve uzun süreli bilgi gelenekleriyle yaşayan elfler.',
    crest: '✧', className: 'elf', link: '/irklar/yuksek-elfler'
  },
  {
    name: 'Deniz Elfleri', type: 'Deniz', status: 'Kayıt açık',
    description: 'Mercan Sarayları ile gelgit sınırlarını paylaşan, sualtı yollarının eski bekçileri.',
    crest: '≋', className: 'sea', link: '/irklar/deniz-elfleri'
  },
  {
    name: 'Firbolglar', type: 'Fey kökenli', status: 'Kayıt açık',
    description: 'Kutsal alanları, hayvan göçlerini ve cenaze koruluklarını koruyan Diken Tacı topluluğu.',
    crest: '♣', className: 'firbolg', link: '/irklar/firbolglar'
  },
  {
    name: 'Dikenkanlılar', type: 'Fey kökenli', status: 'Kayıt açık',
    description: 'Tenlerinde kabuk, yaprak veya boynuz taşıyan; eşit yurttaşlık isteyen kadim humanoidler.',
    crest: '✤', className: 'thornblood', link: '/irklar/dikenkanlilar'
  },
  {
    name: 'Changelingler', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: `Sis Adaları'nda farklı aile sözleşmelerine bağlı yurttaşlar; birden fazla yasal kimlik taşıyabilirler.`,
    crest: '◌', className: 'changeling', link: '/irklar/changelingler'
  },
  {
    name: 'Duergarlar', type: 'Yeraltı', status: 'Kayıt açık',
    description: 'Kor-Dum meclisleri ile Kara Örs Krallığı arasında farklı emek, miras ve yurttaşlık anlayışları.',
    crest: '▰', className: 'duergar', link: '/irklar/duergarlar'
  },
  {
    name: 'Myconidler', type: 'Yeraltı', status: 'Kayıt açık',
    description: 'Şehri aynı hafızayı paylaşan canlı ağ olarak gören ortak bilinç çemberleri.',
    crest: '❋', className: 'myconid', link: '/irklar/myconidler'
  },
  {
    name: 'Locathahlar', type: 'Deniz', status: 'Kayıt açık',
    description: 'Sığlık, resif ve nehir ağzı topluluklarında balıkçılık hukukunu koruyan amfibi halk.',
    crest: '≋', className: 'sea', link: '/irklar/locathahlar'
  },
  {
    name: 'Kuo-Toalar', type: 'Deniz', status: 'Kayıt açık',
    description: 'Derin sularda inanç, hafıza ve yön bulma ritüelleri çevresinde örgütlenen halk.',
    crest: '◉', className: 'sea', link: '/irklar/kuo-toalar'
  },
  {
    name: 'Tritonlar', type: 'Deniz', status: 'Kayıt açık',
    description: 'Fırtına kapılarını ve derinlik akıntılarını gözeten, deniz yeminleriyle bağlı topluluklar.',
    crest: '♆', className: 'sea', link: '/irklar/tritonlar'
  },
  {
    name: 'Sahuaginler', type: 'Deniz', status: 'Kayıt açık',
    description: 'Av sahaları ve derin resif hakları için sert yasalarla yaşayan köpekbalığı benzeri halk.',
    crest: '▲', className: 'sea', link: '/irklar/sahuaginler'
  },
  {
    name: 'Tortlelar', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Ada, manastır ve göç rotalarından oluşan Uzun Kabuk Yolları kültürel birliği.',
    crest: '◒', className: 'tortle', link: '/irklar/tortlelar'
  },
  {
    name: 'Centaurlar', type: 'Ölümlü', status: 'Kayıt açık',
    description: `Uçsuz Yol Konfederasyonu'nda mülkiyetten çok geçiş hakkını önemseyen göç toplulukları.`,
    crest: '↠', className: 'centaur', link: '/irklar/centaurlar'
  },
  {
    name: 'Tabaxiler', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Yağmur ormanı şehirlerinde bilgi, hikâye ve nadir nesneleri servet kabul eden aileler.',
    crest: '◖', className: 'skyfolk', link: '/irklar/tabaxiler'
  },
  {
    name: 'Kenkular', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Dünyadan topladıkları sesleri taşıyan göçebe haber ve zanaat halkı.',
    crest: '⌁', className: 'skyfolk', link: '/irklar/kenkular'
  },
  {
    name: 'Aarakocralar', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Dağlar arası hava yollarını ve fırtına mevsimlerini ezbere bilen kanatlı halk.',
    crest: '↟', className: 'skyfolk', link: '/irklar/aarakocralar'
  },
  {
    name: 'Owlinler', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Sessiz kurye ağları ve gece arşivleriyle tanınan alacakaranlık halkı.',
    crest: '◉', className: 'skyfolk', link: '/irklar/owlinler'
  },
  {
    name: 'Grunglar', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Yağmur ormanlarının gölet kentlerinde renk ve görev düzeniyle yaşayan amfibiler.',
    crest: '◒', className: 'skyfolk', link: '/irklar/grunglar'
  },
  {
    name: 'Satyrler', type: 'Fey kökenli', status: 'Kayıt açık',
    description: 'Fey geçitlerinin bağlarını, müziğini ve konukluk yasasını koruyan gezginler.',
    crest: '♩', className: 'skyfolk', link: '/irklar/satyrler'
  },
  {
    name: 'Orclar', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Kızıl Toprak’ta akrabalık ve kontrollü ateş bilgisiyle yaşayan sınır toplulukları.',
    crest: '▲', className: 'orc', link: '/irklar/orclar'
  },
  {
    name: 'Hobgoblinler', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Külordu kentlerinde kamu hizmeti ve disiplinle yükselen askerî yurttaşlar.',
    crest: '▰', className: 'orc', link: '/irklar/hobgoblinler'
  },
  {
    name: 'Rebornlar', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: 'Ölümün eşiğinden dönmüş, ikinci hayatlarını kendi adlarıyla kuran kişiler.',
    crest: '☿', className: 'changed', link: '/irklar/rebornlar'
  },
  {
    name: 'Hexbloodlar', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: 'Cadı antları veya fey büyüsüyle değişmiş, kökenleri kadar seçimleriyle tanımlananlar.',
    crest: '⌘', className: 'changed', link: '/irklar/hexbloodlar'
  },
  {
    name: 'Dhampirler', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: 'Açlıklarını rıza, gözetim ve gece yasalarıyla dengelemeye çalışan gece soyu.',
    crest: '☾', className: 'changed', link: '/irklar/dhampirler'
  },
  {
    name: 'Autognomlar', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: 'Eski atölyelerde uyanmış, ad ve bakım hakkı arayan pirinç kalpli halk.',
    crest: '⚙', className: 'changed', link: '/irklar/autognomlar'
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

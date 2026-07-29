<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'

const query = ref('')
const filter = ref('Tümü')
const filters = ['Tümü', 'Fey kökenli', 'Ölümlü', 'Drakonik']

const peoples = [
  {
    name: 'Eladrin', type: 'Fey kökenli', status: 'Kayıt açık',
    description: 'Duygularını mevsimler gibi taşıyan, geçitler ve eski antlarla yaşayan uzun ömürlü halk.',
    crest: '✦', className: 'eladrin', image: '/assets/illustrations/eladrin-portre.png', link: '/irklar/eladrin'
  },
  {
    name: 'İnsanlar', type: 'Ölümlü', status: 'Kayıt bekliyor',
    description: 'Kısa ömürlerini şehirler, hanedanlar ve yolculuklarla genişleten uyumlu halklar.',
    crest: '⌂', className: 'human'
  },
  {
    name: 'Cüceler', type: 'Ölümlü', status: 'Kayıt bekliyor',
    description: 'Taşın hafızasına, derin ocaklara ve kuşaklar boyu süren zanaat antlarına bağlı soylar.',
    crest: '⛰', className: 'dwarf'
  },
  {
    name: 'Koboldlar', type: 'Drakonik', status: 'Kayıt bekliyor',
    description: 'Tünelleri, ortak emekleri ve ejderha çağından kalan söylenceleriyle tanınan küçük halk.',
    crest: '◈', className: 'kobold'
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

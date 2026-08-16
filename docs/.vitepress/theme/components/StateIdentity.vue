<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { page, lang } = useData()
const records = {
  'diken-taci': ['Diken Tacı', 'Thorn Crown', 'thorn-crown.png'],
  'ordan-imparatorlugu': ['Ordan İmparatorluğu', 'Ordan Empire', 'ordan-empire.png'],
  'nehir-tahti': ['Nehir Tahtı', 'River Throne', 'river-throne.png'],
  'ayaz-sarayi': ['Ayaz Sarayı', 'Frost Court', 'frost-court.png'],
  'saarin-iki-ejderha-taci': ["Saar'ın İki Ejderha Tacı", 'Two Dragon Crowns', 'two-dragon-crowns.png'],
  'dokuz-fener-birligi': ['Dokuz Fener Birliği', 'Nine Lantern Union', 'nine-lantern-union.png'],
  'lethar-yildiz-kralligi': ['Lethar Yıldız Krallığı', 'Lethar Star Kingdom', 'lethar-star-kingdom.png'],
  'kar-dur-tas-taci': ['Kar-Dur Taş Tacı', 'Kar-Dur', 'kar-dur.png'],
  'tuz-ocaklari-cumhuriyeti': ['Tuz Ocakları Cumhuriyeti', 'Salt Hearth Republic', 'salt-hearth-republic.png'],
  'camova-konfederasyonu': ['Camova Konfederasyonu', 'Glassplain Confederation', 'glassplain-confederation.png'],
  'sis-adalari-cumhuriyeti': ['Sis Adaları Cumhuriyeti', 'Mist Isles Republic', 'mist-isles-republic.png'],
  'altin-gunes-kralligi': ['Altıngüneş Krallığı', 'Goldensun Kingdom', 'goldensun-kingdom.png'],
  'bakir-prenslikler': ['Bakır Prenslikler', 'Copper Principalities', 'copper-principalites.png'],
  'yesil-su-birligi': ['Yeşil Su Birliği', 'Greenwater League', 'greenwater-league.png'],
  varkesh: ['Varkesh', 'Varkesh', 'varkesh.png'],
  'kis-ambarlari-serbest-sehri': ['Kış Ambarları Serbest Şehri', 'Free City of Winter Granaries', 'kis-ambarlari.png'],
  'kara-muhur-adalari': ['Kara Mühür Adaları', 'Black Seal Isles', 'kara-muhur.png'],
  'kul-esigi': ['Kül Eşiği Şövalye Düzeni', 'Ash Threshold Knightly Order', 'ash-threshold.png'],
  'qasyrra-imparatorlugu': ['Qasyrra İmparatorluğu', 'Qasyrra Empire', 'qasyrra.png']
}
const state = computed(() => records[page.value.relativePath.split('/').pop()?.replace('.md', '')])
const label = computed(() => state.value?.[lang.value.startsWith('en') ? 1 : 0])
</script>

<template>
  <figure v-if="state" class="state-identity">
    <img :src="withBase('/assets/flags/' + state[2])" :alt="label + ' flag'" /><figcaption>{{ lang.startsWith('en') ? 'State flag' : 'Devlet bayrağı' }}</figcaption>
  </figure>
</template>

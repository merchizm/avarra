<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import references from 'virtual:avarra-reference-index'

const { lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const records = computed(() => references)

function openRandomRecord() {
  const record = records.value[Math.floor(Math.random() * records.value.length)]
  if (record) window.location.assign(withBase(`${isEnglish.value ? '/en' : ''}${record.path}`))
}
</script>

<template>
  <button class="chronicle-random-button" type="button" @click="openRandomRecord">
    <span aria-hidden="true">✧</span>{{ isEnglish ? 'Open a random record' : 'Rastgele bir kayıt aç' }}
  </button>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

const { page, lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const id = computed(() => page.value.relativePath.replace(/^en\//, '').replace(/^tarih\//, '').replace(/\.md$/, ''))

const eras = [
  { id: 'sessiz-baslangic', short: 'I', tr: 'Sessiz Başlangıç', en: 'Silent Beginning', dateTr: 'SÖ 9000 öncesi', dateEn: 'Before SD 9000', total: null, regions: null },
  { id: 'ilk-uyanislar', short: 'II', tr: 'İlk Uyanışlar', en: 'First Awakenings', dateTr: 'SÖ 9000–5200', dateEn: 'SD 9000–5200', total: 74, regions: [16,20,15,5,12,6] },
  { id: 'damar-uygarliklari', short: 'III', tr: 'Damar Uygarlıkları', en: 'Vein Civilizations', dateTr: 'SÖ 5200–2700', dateEn: 'SD 5200–2700', total: 191, regions: [39,61,37,9,29,16] },
  { id: 'kirilma-ve-siginaklar', short: 'IV', tr: 'Kırılma ve Sığınaklar', en: 'Fracture & Refuges', dateTr: 'SÖ 2700–1500', dateEn: 'SD 2700–1500', total: 100, regions: [21,32,18,7,17,5] },
  { id: 'taclar-cagi', short: 'V', tr: 'Taçlar Çağı', en: 'Age of Crowns', dateTr: 'SÖ 1500–350', dateEn: 'SD 1500–350', total: 257, regions: [64,75,52,14,31,21] },
  { id: 'meridyen-cagi', short: 'VI', tr: 'Meridyen Çağı', en: 'Meridian Age', dateTr: 'SÖ 350–0', dateEn: 'SD 350–0', total: 378, regions: [91,128,77,17,32,33] },
  { id: 'suruklenme-cagi', short: 'VII', tr: 'Sürüklenme Çağı', en: 'Age of Drift', dateTr: 'SS 0–83', dateEn: 'SD 0–83', total: 366, regions: [86,109,69,16,36,50] }
]
const groups = [
  { key: 'human', tr: 'İnsan ağları', en: 'Human networks', color: '#c7925b', values: [30,63,32,80,120,102] },
  // Veyranlar Yedi Hat Sığınağı'nın Kırılma içindeki oluşumundan önce bir halk olarak yoktur.
  { key: 'vey', tr: 'Veyran ağları · IV’te başlar', en: 'Veyran networks · begins in IV', color: '#63a9b5', values: [null, null, 3, 25, 69, 61] },
  { key: 'elf', tr: 'Elf / Eladrin', en: 'Elf / Eladrin', color: '#a87db0', values: [12,29,17,35,42,37] },
  { key: 'deep', tr: 'Derin halk ağları', en: 'Deep-people networks', color: '#8b9c78', values: [14,41,17,27,32,36] },
  { key: 'works', tr: 'Goblin–Kobold–Gnom', en: 'Goblin–Kobold–Gnome', color: '#d1b464', values: [10,29,14,22,28,28] },
  { key: 'odraka', tr: 'Odraka halk ağları', en: 'Odrakan people networks', color: '#bc705a', values: [4,16,9,37,44,43] },
  { key: 'sea', tr: 'Deniz halkları', en: 'Sea peoples', color: '#4d8dc2', values: [3,9,4,18,31,47] },
  { key: 'other', tr: 'Diğer ve küçük ağlar', en: 'Other and smaller networks', color: '#8d8c88', values: [1,4,4,13,12,12] }
]
const peopleLedger = [
  { family: 'human', people: [['İnsanlar', 'Humans', 72], ['Halflingler', 'Halflings', 8], ['Tieflingler', 'Tieflings', 5], ['Yarı Elfler / Khoravarlar', 'Half-Elves / Khoravar', 5], ['Changelingler / Verdanlar', 'Changelings / Verdan', 2], ['Aasimarlar', 'Aasimar', 1], ['Kalashtarlar, Vedalkenler ve Githler', 'Kalashtar, Vedalken, and Gith', 3], ['Diğer insan kökenli ağlar', 'Other human-rooted networks', 6]] },
  { family: 'vey', people: [['Veyranlar', 'Veyrans', 61]] },
  { family: 'elf', people: [['Orman Elfleri', 'Wood Elves', 14], ['Yüksek Elfler', 'High Elves', 7], ['Eladrinler', 'Eladrin', 5], ['Drowlar', 'Drow', 5], ['Shadar-kailer', 'Shadar-kai', 2], ['Astral Elfler', 'Astral Elves', 1], ['Diğer elf soyları', 'Other elf lineages', 3]] },
  { family: 'deep', people: [['Cüceler', 'Dwarves', 11], ['Duergarlar', 'Duergar', 7], ['Svirfneblinler', 'Svirfneblin', 5], ['Myconidler', 'Myconids', 4], ['Grimlocklar', 'Grimlocks', 3], ['Derrolar', 'Derro', 2], ['Diğer derin halklar', 'Other deep peoples', 4]] },
  { family: 'works', people: [['Goblinler', 'Goblins', 9], ['Koboldlar', 'Kobolds', 8], ['Gnomlar', 'Gnomes', 6], ['Warforgedler', 'Warforged', 3], ['Autognomlar / Ruinboundlar', 'Autognomes / Ruinbound', 2]] },
  { family: 'odraka', people: [['Lizardfolklar', 'Lizardfolk', 14], ['Dragonbornlar', 'Dragonborn', 8], ['Orclar', 'Orcs', 10], ['Grunglar', 'Grung', 2], ['Tortlelar', 'Tortles', 3], ['Yuan-ti', 'Yuan-ti', 3], ['Nagalar', 'Nagas', 1], ['Diğer Odraka halkları', 'Other Odrakan peoples', 2]] },
  { family: 'sea', people: [['Kuo-toalar', 'Kuo-toa', 10], ['Deniz Elfleri', 'Sea Elves', 9], ['Sahuaginler', 'Sahuagin', 8], ['Locathahlar', 'Locathah', 7], ['Tritonlar', 'Tritons', 6], ['Kalamerler', 'Kalamer', 3], ['Plasmoidler', 'Plasmoids', 1], ['Aboleth soyları', 'Aboleth lineages', 1], ['Hadozeeler', 'Hadozee', 1], ['Diğer açık deniz toplulukları', 'Other open-sea communities', 1]] },
  { family: 'other', people: [['Periler', 'Fairies', 2], ['Satyrler', 'Satyrs', 1], ['Firbolglar', 'Firbolgs', 2], ['Minotaurlar', 'Minotaurs', 2], ['Centaurlar', 'Centaurs', 1], ['Aetherbornlar', 'Aetherborn', 1], ['Giffler', 'Giff', 1], ['Goliathlar', 'Goliaths', 1], ['Diğer küçük ağlar', 'Other small networks', 1]] }
]
const enabledGroups = ref(groups.map((group) => group.key))
const hoverPoint = ref(null)
const regions = [
  ['Nareth','Nareth','#9c7b51'], ['Asteron','Asteron','#5d98a8'], ['Odraka','Odraka','#b1664f'], ['Ilyr-Khaz','Ilyr-Khaz','#a9bfca'], ['Oyuk Ülkeler','Hollow Countries','#746d93'], ['Denizler','Seas','#497fac']
]
const prose = {
  'ilk-uyanislar': {
    tr: ['İlk sayılabilir yoğunlaşma, nehir ağzı, mağara suyu ve güvenilir ateş çevresinde oluştu. Doğum oranı yüksek görünüyor; bunun nedeni “halkların çoğalması” kadar bebek ölümlerini azaltan sabit gıda, ortak bakım ve ilk güvenli sığınakların yayılmasıdır.', 'Bu çağda insanlar ve yeraltı zanaat ağları geniş aile haneleriyle hızlı büyür. Elf ve Fey bağlı topluluklar ise uzun ömür, geç olgunlaşma ve mevsimsel göç yüzünden daha yavaş görünür; bu bir zayıflık değil farklı bir zaman ölçeğidir.'],
    en: ['The first countable concentrations formed around river mouths, cave water, and reliable fire. Birth rates look high not only because peoples multiplied, but because stable food, shared care, and early secure refuge reduced infant death.', 'Human and deep-craft networks grew quickly through large households. Elf and Fey-bound communities appear slower because of long life, later maturity, and seasonal movement; that is a different timescale, not weakness.'] },
  'damar-uygarliklari': {
    tr: ['Damar çağındaki büyük artış, doğurganlık mucizesi değil altyapı sonucudur. Hava şaftı, su kemeri, tahıl yolu ve güvenli geçit; daha çok insanın aynı havzada yaşamasını mümkün kıldı. En hızlı çoğalan ağlar, çocuk bakımı ve gıda depolamasını lonca ya da mahalle görevi yapan insan, gnom, goblin ve kobold topluluklarıydı.', 'Cüce, Nimrûn ve Duergar ağlarının çizgisi derin kentleşmeyle keskin yükselir. Ancak bu büyüme eşit değildir: büyük ocaklar emek çekerken küçük halkların kaydı çoğu kez yalnız iş gücü olarak tutulur. Bu çağın kesin rakamları bile iktidarın neyi görmeyi seçtiğini taşır.'],
    en: ['Damar’s great increase is not a fertility miracle but an infrastructure result. Air shafts, aqueducts, grain roads, and safe passages let more people live in one basin. The fastest-growing networks were human, Gnome, Goblin, and Kobold communities that made childcare and food storage guild or neighbourhood work.', 'Dwarf, Nimrûn, and Duergar lines rise sharply with deep urbanisation. But growth was unequal: great hearths drew labour while smaller peoples were often recorded only as labour. Even this era’s precise figures preserve what power chose to see.'] },
  'kirilma-ve-siginaklar': {
    tr: ['Kırılma, dünya nüfusunun en sert düşüşüdür. Yol kaybı yalnız ticareti değil doğum güvenliğini, aşılamayı, tahıl payını ve yer değiştiren ailelerin birbirini bulmasını parçaladı. Özellikle hava ve su hatlarına bağlı derin kentlerde kayıp, yüzey tarihlerinin söylediğinden daha ağırdır.', 'Veyran çizgisi burada ilk kez ayrı görünür; Sığınaklar’daki aileler henüz az sayıdadır ama korunaklı su, bakım ve kayıt döngüsü çocukların hayatta kalmasını olağandışı biçimde artırır. Bu yüzden Veyranlar “hızla doğuran” bir halk değil, felaket sırasında aile ve bakım ağını sürdürebilen bir topluluktur.'],
    en: ['Fracture is the harshest fall in world population. Losing roads broke not only trade but birth safety, medicine, grain shares, and displaced families’ ability to find one another. Loss was especially severe in deep cities dependent on air and water lines.', 'The Veyran line appears separately here for the first time. Refuge families were still few, but protected water, care, and record cycles raised child survival unusually. Veyrans are not a people who “breed quickly”; they are a community that maintained kinship and care during catastrophe.'] },
  'taclar-cagi': {
    tr: ['Taçlar Çağı’nda büyüme yeniden başlar; ama her bölgede aynı nedenle değil. Nareth’in havza tarımı, Asteron’un yol kentleri, Odraka’nın göç koridorları ve Oyuk Ülkeler’in hava hukuku birbirinden farklı biçimlerde yaşam alanı açar.', 'Veyran nüfusu bu çağda görünür biçimde hızlanır. Yedi Hat mirasındaki doğum tanığı, ortak çocuk bakımı, su güvenliği ve kayıt düzeltme geleneği aileleri daha az kırılgan kılar. Aynı dönemde bazı uzun ömürlü elf ağları sayıca yavaş artar; çünkü kapı kapanışı, sürgün ve geç olgunlaşma onları sayısal olarak küçük fakat kültürel olarak yoğun tutar.'],
    en: ['Growth returns in the Age of Crowns, but for different reasons in every region. Nareth’s basin farming, Asteron’s road cities, Odraka’s migration corridors, and Hollow Countries air law each create habitable space differently.', 'Veyran population accelerates visibly in this age. The Seven Lines inheritance of birth witnesses, shared childcare, water security, and record correction makes households less fragile. Some long-lived elf networks grow slowly in number because closure, exile, and late maturity keep them numerically smaller but culturally dense.'] },
  'meridyen-cagi': {
    tr: ['Meridyen Çağı, en yüksek toplamı görür. Ordan’ın yolu ve kaydı doğumu tek başına artırmaz; fakat tahılı, doğum evini, okul aşısını, temiz suyu ve acil nakli aynı ağda tutarak ölüm oranını düşürür. Bu aynı zamanda imparatorluğun nüfusunu sayabilen ama insanı zorla yer değiştirebilen gücüdür.', 'Veyranlar 69 milyon bandına çıkar ve Asteron’un en kalabalık kurumsal halk ağı olur. Bu sayı, soy üstünlüğü kanıtı değildir: merkezî su–bakım–kayıt düzeninin birkaç yüzyıllık sonucudur. Fetihler, bazı insan ve orman halkı ağlarında yer değiştirme, kayıt dışına düşme ve bölgesel kayıp yaratır; grafikteki büyüme her yerde iyileşme anlamına gelmez.'],
    en: ['The Meridian Age reaches the highest total. Ordan’s road and record do not create births alone; they lower death by holding grain, birthing houses, school medicine, clean water, and emergency movement in one network. It is also the empire’s power to count people while forcing them to move.', 'Veyrans reach about 69 million and become Asteron’s largest institutional people network. This is not evidence of ancestry superiority, but the result of centuries of central water, care, and record systems. Conquest displaces human and forest networks, pushes some out of record, and causes regional loss; growth on a graph does not mean improvement everywhere.'] },
  'suruklenme-cagi': {
    tr: ['SS 83’te dünya, Meridyen zirvesinden yaklaşık 12 milyon aşağıdadır. Soluk Gece, kapanan geçitler, yavaş akıntılar ve Durgunluk cepleri doğumdan çok yaşamı sürdürme kapasitesini vurur. Deniz halk ağları en az 47 milyon kişiye ulaşır: yalnız kıyı şehirleri değil, açık deniz sürüleri, hareketli koloniler, resif kentleri ve karanlık deniz tabanındaki eski topluluklar da bu bandın içindedir.', 'Veyranlar hâlâ yaklaşık 61 milyonla baskın imparatorluk halkıdır, fakat ilk kez artışları durmuş ve bazı havzalarda gerilemiştir. Yüksek doğurganlıktan değil, şehirleşme, savaş hizmeti, geciken evlilik, göç ve kayıt dışına düşen sınır ailelerinden etkilenirler. Buna karşılık Odraka yol ağları ve deniz halkları, resmî sayımlar zayıf olsa bile hareketli aile ve ortak bakım düzenleriyle görece dayanıklıdır.'],
    en: ['In SD 83 the world sits roughly 12 million below its Meridian peak. Pale Night, closed passages, slowing currents, and Stagnation pockets damage the ability to sustain life more than birth itself. Sea-peoples networks reach at least 47 million: the band includes not only coastal cities but open-ocean shoals, moving colonies, reef cities, and old communities on the dark sea floor.', 'Veyrans remain the dominant imperial people network at about 61 million, but their growth has stopped and some basins decline. They are affected not by low fertility but urban life, war service, later marriage, migration, and frontier families slipping out of records. Odrakan road networks and sea peoples are relatively resilient through mobile households and shared care even where official counts are weak.'] }
}

const current = computed(() => eras.find((era) => era.id === id.value))
const index = computed(() => eras.findIndex((era) => era.id === id.value))
const measured = eras.slice(1)
const selected = computed(() => current.value || eras.at(-1))
const copy = computed(() => prose[id.value]?.[isEnglish.value ? 'en' : 'tr'])
const title = (era) => isEnglish.value ? era.en : era.tr
const date = (era) => isEnglish.value ? era.dateEn : era.dateTr
const fmt = (value) => new Intl.NumberFormat(isEnglish.value ? 'en-US' : 'tr-TR', { maximumFractionDigits: 0 }).format(value)
const fmtPeople = (value) => {
  if (value >= 1) return `${new Intl.NumberFormat(isEnglish.value ? 'en-US' : 'tr-TR', { maximumFractionDigits: 2 }).format(value)} ${isEnglish.value ? 'm' : 'milyon'}`
  return `${new Intl.NumberFormat(isEnglish.value ? 'en-US' : 'tr-TR', { maximumFractionDigits: 0 }).format(value * 1000)} ${isEnglish.value ? 'thousand' : 'bin'}`
}
const worldMax = 400
const x = (index) => 30 + index * 115
const y = (value) => 214 - (value / worldMax) * 178
const totalPath = computed(() => measured.map((era, i) => `${x(i)},${y(era.total)}`).join(' '))
const areaPath = computed(() => `M ${x(0)} 214 L ${measured.map((era, i) => `${x(i)} ${y(era.total)}`).join(' L ')} L ${x(measured.length - 1)} 214 Z`)
const regionMax = computed(() => Math.max(...measured.flatMap((era) => era.regions)))
const groupMax = 125
const isGroupEnabled = (key) => enabledGroups.value.includes(key)
const visibleGroups = computed(() => groups.filter((group) => isGroupEnabled(group.key)))
const ledgerGroups = computed(() => groups.map((group) => ({ ...group, people: peopleLedger.find((entry) => entry.family === group.key)?.people || [] })))
const toggleGroup = (key) => {
  enabledGroups.value = isGroupEnabled(key)
    ? enabledGroups.value.filter((item) => item !== key)
    : [...enabledGroups.value, key]
}
const showGroupPoint = (group, eraIndex, event) => {
  const value = group.values[eraIndex]
  if (value === null) return
  hoverPoint.value = { group, era: measured[eraIndex], value, left: event.offsetX, top: event.offsetY }
}
const hideGroupPoint = () => { hoverPoint.value = null }
const groupPath = (values) => {
  let path = ''
  values.forEach((value, i) => { if (value === null) return; const command = i === 0 || values[i - 1] === null ? 'M' : 'L'; path += `${command}${x(i)} ${yGroup(value)} ` })
  return path
}
const yGroup = (value) => 174 - (value / groupMax) * 138
const dataQuality = computed(() => {
  if (id.value === 'sessiz-baslangic') return isEnglish.value ? ['No census survives', 'Myth, oral memory, and material traces can show presence but cannot support a total.'] : ['Sayım korunmamıştır', 'Mit, sözlü hafıza ve maddi izler varlığı gösterir; fakat toplam sayı vermez.']
  if (id.value === 'damar-uygarliklari' || id.value === 'meridyen-cagi') return isEnglish.value ? ['High / uneven', 'Damar and Ordan records are exact near roads and administrative centres, then increasingly blind toward coerced labour, deep settlements, and unregistered borders.'] : ['Yüksek / eşitsiz', 'Damar ve Ordan kayıtları yol ile idarî merkez yakınında kesindir; zorla çalıştırılan emek, derin kentler ve kayıtsız sınırlarda giderek körleşir.']
  if (id.value === 'suruklenme-cagi') return isEnglish.value ? ['Mixed record quality', 'Ordan, Lethar, Frost Palace, and several deep infrastructure networks hold regular series. Moving Odrakan polities, sea citizens, Yabanocak, and Stagnation edges remain bands rather than totals.'] : ['Karma kayıt kalitesi', 'Ordan, Lethar, Ayaz Sarayı ve bazı derin altyapı ağları düzenli seri tutar. Hareketli Odraka siyasetleri, deniz yurttaşları, Yabanocak ve Durgunluk sınırı toplam değil bant olarak kalır.']
  return isEnglish.value ? ['Reconstructed estimate', 'Granary, burial, water, route, and household records are compared; the graphic shows best historical reconstruction, not a contemporaneous universal census.'] : ['Yeniden kurulmuş tahmin', 'Ambar, mezar, su, yol ve hane kayıtları karşılaştırılır; grafik çağdaş evrensel sayım değil, en iyi tarihsel yeniden kurmadır.']
})
</script>

<template>
  <section v-if="current" class="population-dossier">
    <header class="population-dossier-head">
      <div><p class="lore-kicker">{{ isEnglish ? 'Population record of the age' : 'Çağın nüfus kaydı' }}</p><h2>{{ isEnglish ? 'People, places, and the cost of survival' : 'İnsanlar, yerler ve hayatta kalmanın bedeli' }}</h2></div>
      <div class="population-quality"><small>{{ isEnglish ? 'Record quality' : 'Kayıt kalitesi' }}</small><b>{{ dataQuality[0] }}</b></div>
    </header>

    <template v-if="selected.total">
      <div class="population-hero-metric"><div><b>{{ fmt(selected.total) }} <small>{{ isEnglish ? 'million' : 'milyon' }}</small></b><span>{{ isEnglish ? 'estimated settled population at the end of the age' : 'çağın sonundaki tahmini yerleşik nüfus' }}</span></div><p>{{ dataQuality[1] }}</p></div>

      <div class="population-chart-grid">
        <article class="population-chart population-chart--world"><div class="population-chart-title"><span>01</span><div><small>{{ isEnglish ? 'World scale' : 'Dünya ölçeği' }}</small><h3>{{ isEnglish ? 'The long population curve' : 'Uzun nüfus eğrisi' }}</h3></div></div><svg viewBox="0 0 650 240" role="img" :aria-label="isEnglish ? 'World population by age in millions' : 'Çağlara göre milyon cinsinden dünya nüfusu'"><defs><linearGradient id="population-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#62a6b0" stop-opacity=".42"/><stop offset="1" stop-color="#62a6b0" stop-opacity="0"/></linearGradient></defs><g class="population-grid-lines"><line v-for="line in [0,100,200,300,400]" :key="line" x1="25" :y1="y(line)" x2="620" :y2="y(line)"/></g><path :d="areaPath" fill="url(#population-area)"/><polyline :points="totalPath" class="population-world-line"/><g v-for="(era, i) in measured" :key="era.id"><circle :cx="x(i)" :cy="y(era.total)" r="6" :class="{ active: era.id === current.id }"/><text :x="x(i)" y="233" text-anchor="middle">{{ era.short }}</text><text v-if="era.id === current.id" :x="x(i)" :y="y(era.total) - 12" text-anchor="middle" class="population-value-label">{{ era.total }}m</text></g></svg><p>{{ isEnglish ? 'The curve measures sustainable settlement networks at each age’s end, not a one-day imperial headcount.' : 'Eğri, her çağın sonunda sürdürülebilir yerleşim ağını gösterir; bir günün imparatorluk yoklamasını değil.' }}</p></article>

        <article class="population-chart population-chart--region"><div class="population-chart-title"><span>02</span><div><small>{{ isEnglish ? 'Regional composition' : 'Bölgesel bileşim' }}</small><h3>{{ isEnglish ? 'Where the world is held' : 'Dünyanın nerede tutulduğu' }}</h3></div></div><div class="region-stream"><div v-for="(era, eraIndex) in measured" :key="era.id" class="region-stream-column" :class="{ active: era.id === current.id }"><i v-for="(region, regionIndex) in regions" :key="region[0]" :style="{ height: `${(era.regions[regionIndex] / era.total) * 100}%`, background: region[2] }" :title="`${isEnglish ? region[1] : region[0]}: ${era.regions[regionIndex]}m`"></i><small>{{ era.short }}</small></div></div><div class="region-key"><span v-for="region in regions" :key="region[0]"><i :style="{ background: region[2] }"></i>{{ isEnglish ? region[1] : region[0] }}</span></div><p>{{ isEnglish ? 'Asteron’s share expands through road concentration; the Hollow Countries and seas remain populous but structurally harder to count.' : 'Asteron’un payı yol yoğunlaşmasıyla büyür; Oyuk Ülkeler ve denizler kalabalık kalır ama yapısal olarak daha zor sayılır.' }}</p></article>
      </div>

      <article class="population-chart population-chart--people"><div class="population-chart-title"><span>03</span><div><small>{{ isEnglish ? 'People networks' : 'Halk ağları' }}</small><h3>{{ isEnglish ? 'Who grew, who endured, who vanished from record' : 'Kim çoğaldı, kim dayandı, kim kayıttan düştü' }}</h3></div></div><div class="population-group-toggles" :aria-label="isEnglish ? 'Toggle people networks' : 'Halk ağlarını göster veya gizle'"><button v-for="group in groups" :key="group.key" type="button" :class="{ off: !isGroupEnabled(group.key) }" :aria-pressed="isGroupEnabled(group.key)" @click="toggleGroup(group.key)"><i :style="{ background: group.color }"></i>{{ isEnglish ? group.en : group.tr }}</button></div><div class="population-people-plot" @mouseleave="hideGroupPoint"><svg viewBox="0 0 650 205" role="img" :aria-label="isEnglish ? 'Population of major people networks across the ages' : 'Çağlar boyunca büyük halk ağlarının nüfusu'"><g class="population-grid-lines"><line v-for="line in [0,30,60,90,120]" :key="line" x1="25" :y1="yGroup(line)" x2="620" :y2="yGroup(line)"/></g><path v-for="group in visibleGroups" :key="group.key" :d="groupPath(group.values)" :stroke="group.color" fill="none" class="population-group-line"/><g v-for="group in visibleGroups" :key="`${group.key}-points`"><circle v-for="(value, eraIndex) in group.values" v-if="value !== null" :key="eraIndex" :cx="x(eraIndex)" :cy="yGroup(value)" r="4.6" :fill="group.color" class="population-group-point" @mouseenter="showGroupPoint(group, eraIndex, $event)" @focus="showGroupPoint(group, eraIndex, $event)"/></g><g v-for="(era, i) in measured" :key="era.id"><line :x1="x(i)" y1="36" :x2="x(i)" y2="176" :class="{ selected: era.id === current.id }"/><text :x="x(i)" y="195" text-anchor="middle">{{ era.short }}</text></g></svg><div v-if="hoverPoint" class="population-hover-card" :style="{ left: `${Math.min(hoverPoint.left + 14, 460)}px`, top: `${Math.max(hoverPoint.top - 52, 8)}px` }"><small>{{ title(hoverPoint.era) }} · {{ date(hoverPoint.era) }}</small><b><i :style="{ background: hoverPoint.group.color }"></i>{{ isEnglish ? hoverPoint.group.en : hoverPoint.group.tr }}</b><span>{{ fmt(hoverPoint.value) }} {{ isEnglish ? 'million' : 'milyon' }}</span></div></div><p class="population-origin-note">{{ isEnglish ? 'The Veyran series deliberately begins only in IV: before the Seven Lines Refuge, Veyrans did not yet exist as a people. An absent line means not yet formed, not an uncounted population.' : 'Veyran serisi bilerek yalnız IV’te başlar: Yedi Hat Sığınağı’ndan önce Veyranlar halk olarak henüz yoktur. Görünmeyen çizgi kayıt dışılık değil, henüz oluşmamış olmaktır.' }}</p></article>

      <section v-if="id === 'suruklenme-cagi'" class="people-ledger"><header><p class="lore-kicker">04 · {{ isEnglish ? 'Detailed ledger' : 'Ayrıntılı döküm' }}</p><h3>{{ isEnglish ? 'SS 83 people-by-people estimates' : 'SS 83 halk halk tahminleri' }}</h3><p>{{ isEnglish ? 'Millions or thousands; figures are estimates by self-identified community network. A dash is not a claim of absence, only that no defensible separate estimate survives.' : 'Milyon veya bin kişi; rakamlar öz-tanımlı topluluk ağlarının tahminidir. Tire, yokluk iddiası değil, savunulabilir ayrı tahminin korunmadığı anlamına gelir.' }}</p></header><div class="people-ledger-grid"><article v-for="group in ledgerGroups" :key="group.key"><h4><i :style="{ background: group.color }"></i>{{ isEnglish ? group.en : group.tr }}</h4><dl><template v-for="person in group.people" :key="person[0]"><dt>{{ isEnglish ? person[1] : person[0] }}</dt><dd>{{ fmtPeople(person[2]) }}</dd></template></dl></article></div></section>

      <div v-if="copy" class="population-prose"><p>{{ copy[0] }}</p><p>{{ copy[1] }}</p></div>
    </template>
    <div v-else class="population-before-count"><span>Ⅰ</span><div><h3>{{ isEnglish ? 'Before a defensible total' : 'Savunulabilir toplamdan önce' }}</h3><p>{{ dataQuality[1] }}</p></div></div>
  </section>
</template>

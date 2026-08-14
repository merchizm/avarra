<script setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import references from 'virtual:avarra-reference-index'

const { lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const sortMode = ref('importance')

// SS 83: bands distinguish permanent residents from mobile, submerged, or unregistered networks.
const records = {
  ordanor: [1, '10,8–13,6 milyon kayıtlı kentli · havzada mevsimlik 3,8–5,4 milyon', '10.8–13.6m registered urban residents · 3.8–5.4m seasonal basin', 'İmparatorluk yönetimi, kayıt, eğitim ve kıtalararası para akışı.', 'Imperial government, records, education, and intercontinental finance.'],
  halvek: [2, '3,1–4,2 milyon · hasat ve garnizonla 4,9 milyona yaklaşır', '3.1–4.2m · approaches 4.9m with harvest and garrison', 'Fethedilmiş tahıl eyaletinin valilik, nehir ikmali ve lonca merkezi.', 'Conquered grain province: prefecture, river supply, and guild centre.'],
  'dokuz-fener': [3, '3,4–4,6 milyon · dokuz kent, kapalı vardiyalar ve yolcu galerileri', '3.4–4.6m · nine cities, sealed shifts, and traveller galleries', 'Nimrûn konfederasyonunun ışık, hava, su ve tünel hukuk ağı.', 'Nimrûn confederacy of light, air, water, and tunnel law.'],
  'kar-dur': [4, '2,5–3,4 milyon · alt katmanların önemli kısmı değişken', '2.5–3.4m · lower layers remain materially variable', 'Taş Tacı’nın dağ geçidi, döküm ve kadim yol başkenti.', 'Stone Crown capital of mountain passes, foundries, and ancient roads.'],
  namaris: [5, '2,3–3,8 milyon · taşkın takviminde daha yüksek', '2.3–3.8m · higher during flood calendar', 'Nehir Tahtı’nın su hukuku, yüzen mahalle ve havza diplomasisi.', 'River Throne water law, floating districts, and basin diplomacy.'],
  yabanocak: [6, '2,1–3,4 milyon ağ nüfusu · merkez ocakta 410–620 bin', '2.1–3.4m network · 410–620k at the central hearth', 'Gizli insan sığınağı; mülteci ağı, hanedan siyaseti ve kaçış tünelleri.', 'Hidden human refuge: migrant network, dynastic politics, and escape tunnels.'],
  elyrakok: [7, '1,2–1,8 milyon · kökaltı konutları geniş belirsizlik yaratır', '1.2–1.8m · root-level homes create a broad uncertainty band', 'Diken Tacı’nın canlı başkenti, kutsal kök sistemi ve dış diplomasisi.', 'Living capital of the Crown of Thorns, sacred roots, and diplomacy.'],
  astereth: [8, '1,6–2,2 milyon', '1.6–2.2m', 'Lethar’ın yıldız gözlemi, büyü eğitimi ve yüksek diplomasi merkezi.', 'Lethar’s centre of star observation, magical education, and high diplomacy.'],
  mazaros: [9, '2,1–2,9 milyon · donanma mevsiminde 3,3 milyon', '2.1–2.9m · 3.3m in fleet season', 'Labirent Limanları’nın tersane, donanma ve deniz hukuku başkenti.', 'Labyrinth Harbours capital of shipyards, fleet power, and sea law.'],
  nivarra: [10, '1,1–1,6 milyon', '1.1–1.6m', 'Ayaz Sarayı’nın buz arşivi, kuzey geçidi ve kış diplomasisi.', 'Frost Palace ice archive, northern pass, and winter diplomacy.'],
  'saar-kor': [11, '1,8–2,5 milyon', '1.8–2.5m', 'Kızıl Saar’ın kaldera hanedanları, savaş akademileri ve ateş ocakları.', 'Red Saar caldera dynasties, war academies, and fire hearths.'],
  'vel-shaar': [12, '1,5–2,2 milyon', '1.5–2.2m', 'İpek Tahtı’nın Drow soy evleri, tapınak hukuku ve ipek köprüleri.', 'Silk Throne Drow houses, temple law, and silk bridges.'],
  serath: [13, '1,7–2,4 milyon · seferberlikte 3 milyonu aşar', '1.7–2.4m · exceeds 3m on mobilisation', 'Ordan’ın askerî akademisi, silah üretimi ve fiilî ordu merkezi.', 'Ordan military academy, arms works, and de facto army centre.'],
  'kirk-kopru': [14, '1,3–1,9 milyon', '1.3–1.9m', 'Kırk lonca köprüsünün yönettiği nehir cumhuriyeti.', 'River republic governed through forty guild bridges.'],
  'karanlik-liman': [15, '1,2–1,9 milyon · yeraltı denizi geçişleriyle değişken', '1.2–1.9m · variable with undersea crossings', 'Yeraltı devletlerinin zorunlu tarafsız ticaret limanı.', 'Compulsory neutral trade harbour of the underground states.'],
  'mavi-tac': [16, '1,0–1,6 milyon · resif sarayları ve yüzey elçilikleri', '1.0–1.6m · reef palaces and surface embassies', 'Mercan Sarayları’nın ortak sualtı meclisi ve nehir ağzı diplomasisi.', 'Coral Palace joint undersea council and river-mouth diplomacy.'],
  'uclu-mizrak': [17, '900 bin–1,4 milyon · üç çukur garnizonu', '900k–1.4m · three-trench garrison', 'Triton Derin Nöbeti’nin deniz çukurları ve filo kalesi.', 'Triton Deep Watch trench fortress and fleet base.'],
  'kirmizi-akinti': [18, '1,1–1,7 milyon · savaş sürülerine göre değişir', '1.1–1.7m · varies with war shoals', 'Sahuagin konfederasyonunun kan hukuku ve savaş merkezi.', 'Sahuagin confederacy centre of blood law and war.'],
  'balikci-ana': [19, '800 bin–1,3 milyon', '800k–1.3m', 'Dalgasız Göl’ün Kuo-toa inanç, tarım ve ritüel başkenti.', 'Stillwater Lake Kuo-toa faith, farming, and ritual capital.'],
  'bin-halat': [20, '650 bin–1,15 milyon · rota ve mevsime göre', '650k–1.15m · by route and season', 'Devletsiz yüzen pazar; yüzlerce tekne ve platformun kent ağı.', 'Stateless floating market: a city-network of hundreds of vessels.'],
  'hal-sur': [21, '900 bin–1,35 milyon', '900k–1.35m', 'Beyaz tuz galerileri, simya ve hissedar meclisinin yeraltı merkezi.', 'White salt galleries, alchemy, and shareholder council underground hub.'],
  'kor-dum': [22, '850 bin–1,3 milyon · vardiya kayıtları yüksek güvenilirlikte', '850k–1.3m · shift records are highly reliable', 'Duergar işçi meclisi, magma dökümü ve Warforged yurttaşlığı.', 'Duergar workers’ council, magma foundries, and Warforged citizenship.'],
  'kara-ors': [23, '700 bin–1,1 milyon', '700k–1.1m', 'Zincir saraylı Duergar monarşisi ve sıcak platform dökümhaneleri.', 'Chain-palace Duergar monarchy and hot-platform foundries.'],
  'can-kuyusu': [24, '750 bin–1,2 milyon · katman ve hava kotuna göre', '750k–1.2m · by layer and air level', 'Yüzey kapısı ile yeraltı nehrini bağlayan çok halklı serbest şehir.', 'Multi-people free city joining a surface gate to an under-river.'],
  ayalti: [25, '620 bin–980 bin', '620k–980k', 'Drow sürgünleri için ay ışıklı eşik, sığınak ve kaçış pazarı.', 'Moonlit threshold, refuge, and escape market for Drow exiles.'],
  'solmayan-koza': [26, '430 bin–760 bin · Durgunluk nedeniyle güven aralığı geniş', '430k–760k · broad confidence band from Stagnation', 'Kül Örgüsü’nün karantina, mantar ve bozulmayan ipek kenti.', 'Ash Weave quarantine city of fungi and unaging silk.'],
  'sessiz-oyuk': [27, '360 bin–620 bin · kapalı sayım', '360k–620k · sealed census', 'İzolasyoncu Nimrûn şehri; ses yutan taş ve tarafsız tünel ticareti.', 'Isolationist Nimrûn city of sound-eating stone and neutral tunnel trade.'],
  'bakir-baca': [28, '540 bin–880 bin', '540k–880k', 'Kobold altyapı meclisi; hava, ısı ve bakım hizmetleri dağıtılır.', 'Kobold infrastructure council distributing air, heat, and maintenance.'],
  'ilk-spor': [29, '380 bin–700 bin · spor hafızası nedeniyle yaklaşık', '380k–700k · approximate through spore memory', 'Myconid Derin Hafıza çemberlerinin en eski ortak bilinç merkezi.', 'Oldest shared-memory centre of Myconid Deep Memory circles.'],
  'derin-nabiz': [30, '300 bin–560 bin · titreşim temelli tahmin', '300k–560k · vibration-based estimate', 'Grimlockların deprem kuyuları ve titreşim haberleşme merkezi.', 'Grimlock earthquake-well and vibration-communication centre.'],
  ankitas: [31, '700 bin–1,05 milyon', '700k–1.05m', 'Camova’nın kristal arşivli, tarafsız meclis ve maden diplomasisi şehri.', 'Camova’s crystal-archive city of neutral assembly and mine diplomacy.'],
  velis: [32, '650 bin–1,0 milyon · çoklu kimlik kaydı nedeniyle bantlı', '650k–1.0m · banded for multi-identity records', 'Sis Adaları’nın maskeli senatosu, sigorta rıhtımı ve kimlik hukuku.', 'Mist Isles masked senate, insurance quay, and identity law.'],
  solkar: [33, '750 bin–1,15 milyon', '750k–1.15m', 'Altıngüneş’in ikiz taçları, teras sarayları ve hasat pazarı.', 'Golden Sun twin crowns, terrace palaces, and harvest market.'],
  'bakir-meclis': [34, '420 bin–690 bin · mevsimlik elçiliklerle artar', '420k–690k · rises with seasonal embassies', 'Yedi Sonbahar prensliklerinin tarafsız Eladrin diplomasi şehri.', 'Neutral Eladrin diplomacy city of the Seven Autumn principalities.'],
  filizliman: [35, '580 bin–920 bin', '580k–920k', 'Yeşil Su Birliği’nin borç affı, tohum pazarı ve dış politika limanı.', 'Green Water Union port of debt forgiveness, seed markets, and foreign policy.'],
  vardessa: [36, '520 bin–840 bin', '520k–840k', 'Sığınmacı katmanlarıyla büyüyen dağ başkenti ve paralı asker geçidi.', 'Mountain capital of refugee layers and mercenary passage.'],
  'gok-esigi': [37, '250 bin–430 bin · öğrenci ve hac mevsiminde yükselir', '250k–430k · rises in student and pilgrimage season', 'Hava geçitleri, kehanet arşivi ve tarafsız diplomasi manastırı.', 'Air passes, divination archive, and neutral-diplomacy monastery.'],
  'demir-talim': [38, '600 bin–980 bin · talim mevsiminde 1,3 milyon', '600k–980k · 1.3m in drill season', 'Külordu’nun kışlası, akademisi ve askerî lojistik şehri.', 'Ash Army barracks, academy, and military logistics city.'],
  'kizil-meridyen': [39, '360 bin–610 bin · hac ve ölçüm mevsimine göre', '360k–610k · by pilgrimage and measure season', 'Mühür Nizamı’nın kutsal ölçüm hattı ve muhafazakâr dinî merkezi.', 'Seal Order sacred measure line and conservative religious centre.'],
  'ruzgar-cemberi': [40, '70 bin–950 bin · kurultay dışında kalıcı nüfus düşüktür', '70k–950k · permanent population low outside assembly', 'Uçsuz Yol’un mevsimlik kurultayı, sürü pazarı ve yol hukuku alanı.', 'Endless Road seasonal assembly, herd market, and road-law ground.'],
  sazkalp: [41, '500 bin–850 bin · kanal yönüne göre', '500k–850k · by canal direction', 'Ulu Saz’ın yaşayan platformları, su mühendisliği ve tarım tacı.', 'Great Reed living platforms, water engineering, and farming crown.'],
  'yesil-dis': [42, '470 bin–790 bin', '470k–790k', 'Timsah Tacı’nın nehir ağzı savunması ve saz-sur askerî başkenti.', 'Crocodile Crown river-mouth defence and reed-wall military capital.'],
  'uc-yumurta': [43, '390 bin–680 bin · kuluçka döngüsüne göre', '390k–680k · by hatching cycle', 'Sessiz Delta’nın şifa, rahiplik ve kuluçka adaları merkezi.', 'Silent Delta centre of healing, priesthood, and incubation isles.'],
  'dokuz-can-pazari': [44, '420 bin–900 bin · pazar göçüyle değişir', '420k–900k · shifts with market migration', 'Yağmur Pençesi’nin asılı yol pazarı, bilgi loncaları ve nehir ticareti.', 'Rain Claw hanging-road market, information guilds, and river trade.'],
  'ur-marak': [45, '450 bin–760 bin', '450k–760k', 'Kızıl Toprak Orc tacı; at pazarı, kontrollü yangın ve seçimli savaş kralı.', 'Red Earth Orc crown: horse market, managed fire, and elected war king.'],
  'ilk-kiyi': [46, '180 bin–360 bin · dönen yolcularla değişir', '180k–360k · changes with returning travellers', 'Uzun Kabuk Yolları’nın Tortle manastırı, tohum ve hukuk arşivi.', 'Long Shell Roads Tortle monastery, seed exchange, and law archive.']
}

const fallback = (title) => [99, 'Nüfus bandı araştırılıyor', 'Population band under study', `${title} için ayrıntılı kayıt hazırlanıyor.`, `A detailed record is being prepared for ${title}.`]
const items = computed(() => references
  .filter((entry) => entry.path.startsWith('/yerlesimler/'))
  .map((entry) => {
    const slug = entry.path.split('/').at(-1)
    const data = records[slug] || fallback(entry.title)
    return { ...entry, slug, priority: data[0], population: data[isEnglish.value ? 2 : 1], detail: data[isEnglish.value ? 4 : 3], title: isEnglish.value ? entry.enTitle : entry.title }
  })
  .sort((a, b) => {
    if (sortMode.value === 'importance') return a.priority - b.priority || a.title.localeCompare(b.title, isEnglish.value ? 'en' : 'tr')
    return sortMode.value === 'az' ? a.title.localeCompare(b.title, isEnglish.value ? 'en' : 'tr') : b.title.localeCompare(a.title, isEnglish.value ? 'en' : 'tr')
  }))
const href = (entry) => withBase(isEnglish.value ? `/en${entry.path}` : entry.path)
const sortLabels = computed(() => isEnglish.value ? { importance: 'By importance', az: 'A–Z', za: 'Z–A' } : { importance: 'Önem sırası', az: 'A–Z', za: 'Z–A' })
</script>

<template>
  <section class="settlement-directory">
    <div class="settlement-sort" :aria-label="isEnglish ? 'Sort settlements' : 'Yerleşimleri sırala'">
      <button v-for="mode in ['importance', 'az', 'za']" :key="mode" type="button" :class="{ active: sortMode === mode }" :aria-pressed="sortMode === mode" @click="sortMode = mode">{{ sortLabels[mode] }}</button>
    </div>
    <div class="city-register-table" :aria-label="isEnglish ? 'All settlement records' : 'Tüm yerleşim kayıtları'">
      <div class="city-register-labels"><span>{{ isEnglish ? 'Settlement' : 'Yerleşim' }}</span><span>{{ isEnglish ? 'Record' : 'Kayıt' }}</span><span>{{ isEnglish ? 'Scale' : 'Ölçek' }}</span></div>
      <a v-for="entry in items" :key="entry.path" :href="href(entry)">
        <b><small v-if="sortMode === 'importance'">{{ String(entry.priority).padStart(2, '0') }} · {{ isEnglish ? 'priority' : 'öncelik' }}</small><strong>{{ entry.title }}</strong></b>
        <p><i>{{ entry.detail }}</i></p>
        <em>{{ entry.population }}</em>
      </a>
    </div>
  </section>
</template>

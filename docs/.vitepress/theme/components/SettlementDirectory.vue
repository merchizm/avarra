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
  varkesh: [15, '460–720 bin · konvoy, mülteci ve garnizon mevsiminde 900 bine yaklaşır', '460–720k · approaches 900k in convoy, refugee, and garrison season', 'Nareth–Odraka arasındaki ada-kent; savaş kredisi, liman tedariki ve çift anahtar düzeni.', 'Island-city between Nareth and Odraka: war credit, harbour supply, and a two-key order.'],
  'kis-ambarlari-serbest-sehri': [16, '620–920 bin · hasat ve sefer mevsiminde 1,2 milyona yaklaşır', '620–920k · approaches 1.2m in harvest and campaign season', 'Nareth’in savaş tedariki, tahıl kredisi ve konvoy sözleşmesi serbest şehri.', 'Nareth’s free city of war supply, grain credit, and convoy contracts.'],
  umbraval: [17, '380–560 bin · savaş, sefer ve dava mevsiminde 700 bine yaklaşır', '380–560k · approaches 700k during war, campaign, and court seasons', 'Odraka’nın kuzey kıyısında deniz geçişi, sözleşme hukuku ve gölge-emek sicili serbest şehri.', 'Odraka’s northern free city of sea passage, contract law, and shadow-labour registry.'],
  salvara: [18, '290–430 bin · hasat ve askerî konvoy döneminde 560 bine yaklaşır', '290–430k · approaches 560k during harvest and military convoy periods', 'Köle Körfezi’nin ömür hasadı, yıl kasaları ve aktarım ticareti limanı.', 'Slave Bay port of lifespan harvesting, year vaults, and transfer trade.'],
  nasima: [19, '110–170 bin · fırtına ve konvoy mevsiminde 230 bine yaklaşır', '110–170k · approaches 230k during storm and convoy seasons', 'Köle Körfezi’nin güney çıkışında ortak kıyı ve demirleme hukuku limanı.', 'Southern-exit port of Slave Bay, with common-coast and anchorage law.'],
  tazir: [20, '140–210 bin · rota mevsiminde 290 bine yaklaşır', '140–210k · approaches 290k in route season', 'Sarnıç payı, kervan pazarı ve yarı kurak iç yol hukuku şehri.', 'City of cistern shares, caravan markets, and semi-arid inland road law.'],
  nisra: [21, '90–145 bin · hasat ve geçiş mevsiminde 190 bine yaklaşır', '90–145k · approaches 190k in harvest and passage seasons', 'Vaha kuyuları, bahçe hukuku ve çöl eşiği pazarı serbest şehri.', 'Free city of oasis wells, garden law, and desert-edge market.'],
  kharad: [22, '70–115 bin · büyük rota mevsiminde 165 bine yaklaşır', '70–115k · approaches 165k during major route season', 'Kuru kanyon geçidinde sarnıç, nöbet ve kervan hizmeti şehri.', 'City of cisterns, watch duty, and caravans at a dry canyon pass.'],
  'kara-muhur-adalari': [23, '260–410 bin · sözleşme ve filo mevsiminde 600 bine yaklaşır', '260–410k · approaches 600k in contract and fleet season', 'Dış denizlerde ağırlık, ayar ve askerî ödeme standardını tutan ada devleti.', 'Outer-sea island state maintaining weight, fineness, and military-payment standards.'],
  'kul-esigi': [24, '90–145 bin · eğitim, tahliye ve onarım mevsimlerinde 220 bine yaklaşır', '90–145k · approaches 220k during education, evacuation, and repair seasons', 'Kül Şövalyeleri’nin ada yurdu; açık eğitim, sığınma, tanıklık ve onarım merkezi.', 'Island home of the Ash Knights: open education, refuge, witness, and repair.'],
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
  'bakir-meclis': [34, '420 bin–690 bin · dış heyetlerle artar', '420k–690k · rises with foreign delegations', 'Yedi elf prensliğinin tarafsız diplomasi şehri.', 'Neutral diplomacy city of the seven Elven principalities.'],
  filizliman: [35, '580 bin–920 bin', '580k–920k', 'Güneşçayır Birliği’nin borç affı, tohum pazarı ve dış politika limanı.', 'Sunmeadow Union port of debt forgiveness, seed markets, and foreign policy.'],
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
const query = ref('')
const coll = (a, b) => a.localeCompare(b, isEnglish.value ? 'en' : 'tr')
const all = computed(() => references
  .filter((entry) => entry.path.startsWith('/yerlesimler/'))
  .map((entry) => {
    const slug = entry.path.split('/').at(-1)
    const data = records[slug] || fallback(entry.title)
    return { ...entry, slug, priority: data[0], population: data[isEnglish.value ? 2 : 1], detail: data[isEnglish.value ? 4 : 3], title: isEnglish.value ? entry.enTitle : entry.title, img: isEnglish.value ? entry.enImage : entry.image }
  }))
const featured = computed(() => all.value.filter((e) => e.priority <= 8).sort((a, b) => a.priority - b.priority))
const searching = computed(() => query.value.trim() !== '')
const list = computed(() => {
  const q = query.value.trim().toLocaleLowerCase(isEnglish.value ? 'en-US' : 'tr-TR')
  const rows = all.value.filter((e) => !q || `${e.title} ${e.detail}`.toLocaleLowerCase(isEnglish.value ? 'en-US' : 'tr-TR').includes(q))
  return rows.sort((a, b) => (sortMode.value === 'importance' ? a.priority - b.priority || coll(a.title, b.title) : sortMode.value === 'az' ? coll(a.title, b.title) : coll(b.title, a.title)))
})
const href = (entry) => withBase(isEnglish.value ? `/en${entry.path}` : entry.path)
const src = (u) => withBase(u)
const t = computed(() => isEnglish.value
  ? { kicker: 'Avarra Encyclopaedia · Settlements', h1: 'Settlement Register', lead: 'The First Eight are the priority city dossiers, not the limits of the atlas. Every settlement with an English record is listed below.', route: ['Nareth', 'Asteron', 'Star Plateau', 'Hollow Countries'], first: 'The First Eight', firstLead: 'Priority dossiers, in order of importance.', all: 'All settlements', records: 'records', search: 'Search settlements…', importance: 'By importance', open: 'Open record' }
  : { kicker: 'Avarra Ansiklopedisi · Yerleşimler', h1: 'Şehir Sicili', lead: 'Şehirleri halkına göre değil; suya erişimi, yönetim biçimi, ekonomik bağımlılığı ve yaklaşan kırılma anı üzerinden karşılaştırın. İlk Sekiz, atlasın tamamı değil; ayrıntılı dünya kanonuna sahip öncelikli şehir dosyalarıdır.', route: ['Nareth', 'Asteron', 'Yıldız Yaylası', 'Oyuk Ülkeler'], first: 'İlk Sekiz', firstLead: 'Öncelikli şehir dosyaları, önem sırasıyla.', all: 'Tüm yerleşimler', records: 'kayıt', search: 'Yerleşim ara…', importance: 'Önem sırası', open: 'Kaydı aç' })
const sortLabels = computed(() => ({ importance: t.value.importance, az: 'A–Z', za: 'Z–A' }))
</script>

<template>
  <section class="sd">
    <header class="sd-head">
      <p class="sd-kicker">{{ t.kicker }}</p>
      <h1>{{ t.h1 }}</h1>
      <p class="sd-lead">{{ t.lead }}</p>
      <div class="sd-route" aria-hidden="true"><template v-for="(r, i) in t.route" :key="r"><span>{{ r }}</span><i v-if="i < t.route.length - 1"></i></template></div>
    </header>

    <template v-if="!searching">
      <div class="sd-sec"><h2>{{ t.first }}</h2><p>{{ t.firstLead }}</p></div>
      <div class="sd-feat">
        <a v-for="e in featured" :key="e.path" :href="href(e)" class="sd-card">
          <span class="sd-img"><img v-if="e.img" :src="src(e.img)" :alt="e.title" loading="lazy" /><i v-else>{{ e.title.charAt(0) }}</i><em>{{ String(e.priority).padStart(2, '0') }}</em></span>
          <strong>{{ e.title }}</strong>
          <p>{{ e.detail }}</p>
          <small>{{ e.population.split(' · ')[0] }}</small>
        </a>
      </div>
    </template>

    <div class="sd-bar">
      <div class="sd-bar-title"><h2>{{ searching ? (isEnglish ? 'Results' : 'Sonuçlar') : t.all }}</h2><p><b>{{ list.length }}</b> {{ t.records }}</p></div>
      <div class="sd-tools">
        <div class="sd-sort" :aria-label="isEnglish ? 'Sort settlements' : 'Yerleşimleri sırala'">
          <button v-for="mode in ['importance', 'az', 'za']" :key="mode" type="button" :class="{ on: sortMode === mode }" :aria-pressed="sortMode === mode" @click="sortMode = mode">{{ sortLabels[mode] }}</button>
        </div>
        <label class="sd-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8" /><path d="m16 16 4.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg><input v-model="query" type="search" :placeholder="t.search" :aria-label="t.search" /></label>
      </div>
    </div>
    <TransitionGroup name="sdc" tag="ul" class="sd-rows">
      <li v-for="(e, i) in list" :key="e.path" :style="{ '--i': Math.min(i, 11) }">
        <a :href="href(e)"><strong>{{ e.title }}<small v-if="sortMode === 'importance' && e.priority < 99">{{ String(e.priority).padStart(2, '0') }}</small></strong><span>{{ e.detail }}</span><em>{{ e.population.split(' · ')[0] }}</em><b>→</b></a>
      </li>
    </TransitionGroup>
  </section>
</template>

<style scoped>
.sd { width: min(100% - 40px, 1240px); margin: 3rem auto 5rem; color: var(--vp-c-text-1); }
.sd-kicker { margin: 0 0 .6rem; color: var(--vp-c-brand-1); font: 500 .78rem var(--font-ui); letter-spacing: .16em; text-transform: uppercase; }
.sd-head { max-width: 46rem; }
.sd h1 { margin: 0 0 1rem; padding: 0; border: 0; color: var(--vp-c-brand-3); font: 500 clamp(2.8rem, 7vw, 5.4rem)/1 var(--font-display); letter-spacing: -.035em; }
.dark .sd h1 { color: var(--vp-c-text-1); }
.sd-lead { margin: 0; color: var(--vp-c-text-2); font-size: 1.15rem; line-height: 1.65; }
.sd-route { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; margin-top: 1.8rem; }
.sd-route span { padding: .45em 1.1em; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--vp-c-divider); color: var(--vp-c-text-1); font: 500 .88rem var(--font-ui); }
.sd-route i { width: 28px; border-top: 1px dashed var(--vp-c-brand-1); }
.sd-sec { margin: 4.5rem 0 2rem; padding-top: 2.4rem; border-top: 1px solid var(--vp-c-divider); }
.sd h2 { margin: 0; padding: 0; border: 0; font: 500 clamp(1.7rem, 3.4vw, 2.5rem)/1.1 var(--font-display); letter-spacing: -.03em; }
.sd h2::after { display: none; }
.sd-sec p { margin: .7rem 0 0; color: var(--vp-c-text-2); }
.sd-feat { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr)); gap: 1.2rem; }
.sd-card { display: flex; flex-direction: column; padding: 14px 14px 1.4rem; border-radius: 26px; background: var(--vp-c-bg-elv); box-shadow: inset 0 0 0 1px var(--vp-c-divider); color: inherit; text-decoration: none; transition: transform .5s cubic-bezier(.22, 1, .36, 1), box-shadow .5s; }
.sd-card:hover, .sd-card:focus-visible { transform: translateY(-6px); box-shadow: inset 0 0 0 1px var(--vp-c-brand-1), 0 26px 40px -22px rgba(60, 30, 0, .45); outline: 0; }
.sd-img { position: relative; display: grid; place-items: center; aspect-ratio: 4 / 3; overflow: hidden; border-radius: 16px; background: radial-gradient(circle at 50% 40%, #8a2a22, #590e0e 72%); color: #d9b878; }
.sd-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: saturate(.85) sepia(.08); transition: transform 1s cubic-bezier(.22, 1, .36, 1), filter .5s; }
.sd-card:hover .sd-img img { transform: scale(1.06); filter: none; }
.sd-img i { font: 3rem var(--font-display); font-style: normal; }
.sd-img em { position: absolute; top: .8rem; left: .8rem; padding: .25em .7em; border-radius: 999px; background: rgba(43, 22, 0, .75); color: #ecd9b0; font: 500 .72rem var(--font-ui); font-style: normal; letter-spacing: .1em; }
.sd-card strong { margin: 1.1rem .5rem .4rem; font: 500 1.5rem/1.15 var(--font-display); letter-spacing: -.02em; }
.sd-card p { margin: 0 .5rem 1rem; color: var(--vp-c-text-2); font: .95rem/1.55 var(--font-ui); }
.sd-card small { margin: auto .5rem 0; color: var(--vp-c-brand-1); font: 500 .82rem var(--font-ui); }

.sd-bar { display: flex; flex-wrap: wrap; gap: 1.2rem 2rem; align-items: end; justify-content: space-between; margin: 5rem 0 1.6rem; padding-top: 2.4rem; border-top: 1px solid var(--vp-c-divider); }
.sd-bar-title p { margin: .5rem 0 0; color: var(--vp-c-text-2); font: .95rem var(--font-ui); }
.sd-bar-title b { color: var(--vp-c-brand-1); }
.sd-tools { display: flex; flex-wrap: wrap; gap: .8rem 1rem; align-items: center; justify-content: flex-end; margin-left: auto; }
@media (min-width: 760px) { .sd-tools { flex-wrap: nowrap; } }
.sd-sort { display: inline-flex; padding: 4px; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--vp-c-divider); }
.sd-sort button { padding: .55em 1.2em; border: 0; border-radius: 999px; background: transparent; color: var(--vp-c-text-1); font: 500 .9rem var(--font-ui); cursor: pointer; transition: background .3s, color .3s; }
.sd-sort button.on { background: var(--vp-c-brand-3); color: #f4e6c8; }
.dark .sd-sort button.on { background: var(--vp-c-brand-1); color: #2a1500; }
.sd-search { display: flex; gap: .7rem; align-items: center; min-width: min(100%, 260px); height: 44px; padding: 0 18px; border-radius: 999px; background: var(--vp-c-bg-elv); box-shadow: inset 0 0 0 1px var(--vp-c-divider); color: var(--vp-c-brand-1); }
.sd-search:focus-within { box-shadow: inset 0 0 0 1.5px var(--vp-c-brand-1); }
.sd-search svg { width: 17px; height: 17px; flex: none; }
.sd-search input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--vp-c-text-1); font: .95rem var(--font-ui); }
.sd-rows { display: grid; gap: .5rem; margin: 0; padding: 0; list-style: none; }
.sd-rows li { margin: 0; }
.sd-rows a { display: grid; grid-template-columns: minmax(0, 15rem) minmax(0, 1fr) minmax(0, 11rem) auto; gap: 1.5rem; align-items: center; padding: 1rem 1.5rem; border-radius: 20px; color: inherit; text-decoration: none; box-shadow: inset 0 0 0 1px var(--vp-c-divider); transition: background .3s, box-shadow .3s, transform .4s cubic-bezier(.22, 1, .36, 1); }
.sd-rows a:hover, .sd-rows a:focus-visible { background: var(--vp-c-bg-elv); box-shadow: inset 0 0 0 1px var(--vp-c-brand-1); transform: translateX(4px); outline: 0; }
.sd-rows strong { display: flex; gap: .7rem; align-items: baseline; font: 500 1.25rem/1.2 var(--font-display); letter-spacing: -.01em; }
.sd-rows strong small { color: var(--vp-c-brand-1); font: 500 .7rem var(--font-ui); letter-spacing: .1em; }
.sd-rows span { color: var(--vp-c-text-2); font: .95rem/1.5 var(--font-ui); }
.sd-rows em { color: var(--vp-c-brand-1); font: normal 500 .85rem var(--font-ui); text-align: right; }
.sd-rows b { color: var(--vp-c-text-3); font-weight: 500; transition: transform .4s cubic-bezier(.22, 1, .36, 1), color .3s; }
.sd-rows a:hover b { color: var(--vp-c-brand-1); transform: translateX(4px); }
.sdc-enter-active { transition: opacity .4s ease, transform .5s cubic-bezier(.22, 1, .36, 1); transition-delay: calc(var(--i, 0) * 25ms); }
.sdc-leave-active { transition: opacity .15s ease, transform .15s ease; }
.sdc-move { transition: transform .45s cubic-bezier(.22, 1, .36, 1); }
.sdc-enter-from { opacity: 0; transform: translateY(12px); }
.sdc-leave-to { opacity: 0; transform: scale(.98); }
@media (max-width: 900px) { .sd-rows a { grid-template-columns: minmax(0, 1fr) auto; } .sd-rows span, .sd-rows em { grid-column: 1 / -1; text-align: left; } .sd-rows b { grid-row: 1; grid-column: 2; } }
@media (max-width: 600px) { .sd { width: min(100% - 32px, 1240px); } }
@media (prefers-reduced-motion: reduce) { .sdc-enter-active, .sdc-leave-active, .sdc-move { transition: none; } }
</style>

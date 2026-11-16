<script setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const query = ref('')
const tab = ref('living')

const records = [
  { slug: 'canli-butun', group: 'ancient', sigil: '◉', tr: 'Canlı Bütün', en: 'Living Whole', trText: 'Dünyanın kendisini canlı ve kutsal kabul eden, artık yalnız metin ve kalıntılarda izlenen inanç ailesi.', enText: 'An extinct faith family that understood the world itself as living and sacred, now traced only in texts and remnants.' },
  { slug: 'kok-antlasmasi', group: 'ancient', sigil: '⌇', tr: 'Kök Antlaşması', en: 'Root Compact', trText: 'Orman, kök, hatıra ve emanet toprak hukukuna ait antik kayıt.', enText: 'An ancient record of forest memory, roots, and law of entrusted land.' },
  { slug: 'ilk-yanki', group: 'ancient', sigil: '◇', tr: 'İlk Yankı', en: 'First Echo', trText: 'Taşın hafızası, adlar ve yeminler üzerine antik öğretinin kalıntısı.', enText: 'A surviving fragment of an ancient teaching about stone memory, names, and binding oaths.' },
  { slug: 'akis-yolu', group: 'ancient', sigil: '≋', tr: 'Akış Yolu', en: 'Flowing Way', trText: 'Yaşam, ölüm ve dönüşe dair nehir öğretisinin antik kaydı.', enText: 'An ancient river teaching of life’s flow, death, and return.' },
  { slug: 'son-ocak', group: 'ancient', sigil: '✹', tr: 'Son Ocak', en: 'Last Hearth', trText: 'Sürgün insan topluluklarının ortak koruna dair tarihî inanç kaydı.', enText: 'A historical faith record of the shared ember of displaced human communities.' },
  { slug: 'goksel-tac', group: 'ancient', sigil: '✦', tr: 'Göksel Taç', en: 'Celestial Crown', trText: 'Dokuz Makam ve göksel düzenin, artık antik kaynaklarda kalan inanç ailesi.', enText: 'The faith family of the Nine Offices and celestial order, now preserved in ancient sources.' },
  { slug: 'yildiz-duzeni', group: 'ancient', sigil: '✧', tr: 'Yıldız Düzeni', en: 'Star Order', trText: 'Yıldız haritaları, kader ve hukuk üzerine antik kayıt.', enText: 'An ancient record of star charts, destiny, and law.' },
  { slug: 'mevsim-taclari', group: 'ancient', sigil: '❋', tr: 'Mevsim Taçları', en: 'Seasonal Crowns', trText: 'Değişimi kutsal sayan Eladrin geleneğinin antik izleri.', enText: 'Ancient traces of an Eladrin tradition that treated change as sacred.' },
  { slug: 'ilk-alev', group: 'ancient', sigil: '♨', tr: 'İlk Alev', en: 'First Flame', trText: 'Yaratım, ejderha mirası ve eylem ateşi üzerine antik öğretinin kaydı.', enText: 'An ancient teaching of creation, dragon heritage, and the fire of action.' },
  { slug: 'azh-khar', group: 'living', sigil: '☉', tr: 'Azh-Khar ve Kör Yüz', en: 'Azh-Khar and the Blind Face', trText: 'Qasyrra’da Güneş’in korkusu, gece nefesi, adak ve su hukuku.', enText: 'Qasyrra’s fear of the Sun, night-breath, offerings, and water law.' },
  { slug: 'askari-kultleri', group: 'living', sigil: '◍', tr: 'Aşkarî Kültleri', en: 'Aškari Cults', trText: 'Şehir yüzleri, mahalle bakımı, sığınma ve fetihle sınanan yaşayan insan dinleri.', enText: 'Living human faiths of city faces, quarter care, sanctuary, and conquest.' },
  { slug: 'varduni-gelenekler', group: 'living', sigil: '✶', tr: 'Vardûnî Gelenekler', en: 'Vardûni Traditions', trText: 'Vahiy, sürgün, Sekiz Şahit ve Beş Mühür ihtilaflarıyla yaşayan insan din ailesi.', enText: 'A living human faith family of revelation, exile, and the Eight Witnesses–Five Seals dispute.' },
  { slug: 'sairava-dinleri', group: 'living', sigil: '≋', tr: 'Sairava Dinleri', en: 'Sairava Faiths', trText: 'Nehir havzasından doğan; Nefes, Ad, İz ve yeniden doğuş üzerine yaşayan din ailesi.', enText: 'A living river-basin faith family of Breath, Name, Trace, and rebirth.' },
  { slug: 'dokuz-gecidin-evi', group: 'living', sigil: 'Ⅸ', tr: 'Dokuz Geçidin Evi', en: 'House of Nine Fords', trText: 'Taşkın, soy, su defteri ve hanedan düzeninin en eski Sairava yolu.', enText: 'The oldest Sairava path of flood, lineage, water ledgers, and dynastic order.' },
  { slug: 'izsiz-cark', group: 'living', sigil: '◌', tr: 'İzsiz Çark', en: 'Traceless Wheel', trText: 'Kalıcı benliği reddeden; eylemin sonucu ve çile üzerinden özgürleşme öğretisi.', enText: 'A teaching of release through discipline and consequence that rejects the permanent self.' },
  { slug: 'kok-donusu-soylari', group: 'living', sigil: '⌇', tr: 'Kök Dönüşü Soyları', en: 'Root Return Lineages', trText: 'Ad’ın kanla değil, hane, bakım ve atalık izle yankılandığı aile gelenekleri.', enText: 'Family traditions where Name echoes through household, care, and ancestral trace rather than blood alone.' },
  { slug: 'sessiz-akis-manastirlari', group: 'living', sigil: '◒', tr: 'Sessiz Akış Manastırları', en: 'Silent Current Monasteries', trText: 'Şefkat, sığınma, bakım ve yol hukuku üzerine kurulmuş manastır ağları.', enText: 'Monastic networks built on compassion, refuge, care, and road law.' },
  { slug: 'kirik-cember-ogretisi', group: 'living', sigil: '⟲', tr: 'Kırık Çember Öğretisi', en: 'Broken Circle Teaching', trText: 'Borç, kölelik ve zorla ruh bağlama karşısında döngüyü kırmayı savunan reform hareketi.', enText: 'A reform movement seeking to break the cycle of debt, bondage, and forced soul-binding.' },
  { slug: 'sairava-havzasi-ve-manastir-aglari', group: 'living', sigil: '⌁', tr: 'Sairava Havzası ve Manastır Ağları', en: 'Sairava Basin and Monastic Networks', trText: 'Dokuz geçit, yol konakları, su defterleri ve bakım kurumlarının yer kaydı.', enText: 'A place record of nine fords, wayhouses, water ledgers, and care institutions.' },
  { slug: 'esreni-inanc', group: 'living', sigil: '♨', tr: 'Eşrenî İnanç', en: 'Eshrenic Faith', trText: 'Dünyanın yaralarını doğru söz, temiz emek ve onarım borcuyla kapatmaya çağıran din ailesi.', enText: 'A faith family that calls people to close the world’s wounds through true word, clean labour, and repair.' },
  { slug: 'kul-sovalyeleri', group: 'living', sigil: '⚔', tr: 'Kül Şövalyeleri', en: 'Ash Knights', trText: 'Savaş ve felaket sonrası koruma, tanıklık ve onarım yemini taşıyan Eşrenî düzen.', enText: 'An Eshrenic order sworn to protection, witness, and repair after war and disaster.' },
  { slug: 'kul-suikastcilari', group: 'living', sigil: '◐', tr: 'Kül Gölgesi', en: 'Ash Shadow', trText: 'Yargının bizzat yarayı sakladığı yerde son tanıklık olduğunu söyleyen gizli Eşrenî düzen.', enText: 'A secret Eshrenic order that calls itself the last witness where judgement hides the wound.' },
  { slug: 'theskar-gizemleri', group: 'living', sigil: '◈', tr: 'Theskar Gizemleri', en: 'Theskar Mysteries', trText: 'Ölüm Eşiği’ne yalnız gitmeme vaadiyle farklı dinlerin içinde yaşayan inisiyasyon geleneği.', enText: 'An initiatory tradition living within many faiths, promising that no one need meet the Threshold alone.' },
  { slug: 'safran-odasi', group: 'living', sigil: '◑', tr: 'Safran Odası', en: 'Saffron Chamber', trText: 'Arzu ve mahremiyet dilini bağımlılık, sır ve iktidar için kullanan Theskar sapkınlığı.', enText: 'A Theskar heresy that uses the language of desire and privacy for dependency, secrets, and power.' },
  { slug: 'fisildayan-kavsak', group: 'living', sigil: '⌁', tr: 'Fısıldayan Kavşak', en: 'Whispering Crossroads', trText: 'Ölülerin İz’ini konuşturduğunu öne süren, yas ve nekromansiyi sömüren gizem ağı.', enText: 'A mystery network claiming to make the dead’s Trace speak, exploiting grief and necromancy.' },
  { slug: 'zincir-aynasi', group: 'living', sigil: '⛓', tr: 'Zincir Aynası', en: 'Chain Mirror', trText: 'Köleliğe itaati ölüm sonrası güvenlik diye satan, efendi yapımı sahte Theskar gizemi.', enText: 'A false Theskar mystery made by masters, selling obedience in slavery as safety after death.' },
  { slug: 'kharumi-ayinler', group: 'living', sigil: '◫', tr: 'Kharûmî Ayinler', en: 'Kharûmi Rites', trText: 'Zaman, bilgi ve ilişki düğümleriyle düzen kurmaya çalışan yaşayan gizem ailesi.', enText: 'A living mystery family that seeks order through knots of time, information, and relation.' },
  { slug: 'dugum-evleri', group: 'living', sigil: '⌘', tr: 'Düğüm Evleri', en: 'Knot Houses', trText: 'Askerî güç kurmadan görünmeyen etki yaratan çok meslekli Kharûmî hücreler.', enText: 'Multi-trade Kharûmi cells making unseen influence without military force.' },
  { slug: 'olcu-gecesi', group: 'living', sigil: '◴', tr: 'Ölçü Gecesi', en: 'Night of Measure', trText: 'Gücün değil, bedeli üstlenilmiş çözümün kanıtlandığı Kharûmî kabul ayini.', enText: 'A Kharûmi admission rite proving not power, but a solution whose cost is carried.' },
  { slug: 'olcusuzler', group: 'living', sigil: '⚖', tr: 'Ölçüsüzler', en: 'Unmeasured', trText: 'Düzen kurma iddiasıyla düğüm yaratıp insanları araçlaştıran Kharûmî sapması.', enText: 'A Kharûmi deviation that creates knots and turns people into instruments in order’s name.' },
  { slug: 'marevi-baglar', group: 'living', sigil: '☿', tr: 'Marevî Bağlar', en: 'Marevi Bonds', trText: 'Cadı birlikleri, ruh aracılığı ve büyünün ilişki borcu için ortak yaşayan kök anlatı.', enText: 'A living root tradition for witch covens, spirit mediumship, and magic’s debt of relation.' },
  { slug: 'saelun-ogretileri', group: 'living', sigil: '◒', tr: 'Saelûn Öğretileri', en: 'Saelûn Teachings', trText: 'Soy, borç ve iktidarın verdiği sahte adların ardındaki özgürlüğü arayan gizli yaşayan öğreti.', enText: 'A hidden living teaching seeking freedom beyond the false names given by lineage, debt, and power.' },
  { slug: 'eram-kok-ahit', group: 'living', sigil: '▣', tr: 'Eram’ın Kök Ahit Soyları', en: 'Eram’s Root Covenant Lineages', trText: 'Kurucu hat, atalık söz ve dışarıya kapalı Vardûnî cemaatler.', enText: 'Founding lines, ancestral word, and closed Vardûni communities.' },
  { slug: 'nadur-gocen-sahitler', group: 'living', sigil: '⌁', tr: 'Nadûr’ün Göçen Şahitleri', en: 'Nadûr’s Wandering Witnesses', trText: 'Kuyu, rota ve sözlü hafızayla yaşayan göçebe vahiy yolu.', enText: 'A nomadic revelatory way living through well, route, and oral memory.' },
  { slug: 'selmev-muhurlu-sofra', group: 'living', sigil: '▤', tr: 'Selmev’in Mühürlü Sofrası', en: 'Selmev’s Sealed Table', trText: 'Mabet serveti, açlık hukuku ve reformla bölünmüş sofra geleneği.', enText: 'A table tradition divided by shrine wealth, hunger law, and reform.' },
  { slug: 'raveth-acik-kapi', group: 'living', sigil: '⌑', tr: 'Raveth’in Açık Kapı Cemaati', en: 'Raveth’s Open Gate Communion', trText: 'Sürgündekilerin eşitliği ve dışarıya açık ahit çağrısı.', enText: 'Equality in exile and an open call into covenant.' },
  { slug: 'mareya-kuyu-ve-merhamet', group: 'living', sigil: '◒', tr: 'Mareya’nın Kuyu ve Merhamet Yolu', en: 'Mareya’s Way of Well and Mercy', trText: 'Su, borç affı ve bakım kurumlarını kutsal hukuk sayan şehir yolu.', enText: 'An urban way treating water, debt release, and care institutions as sacred law.' },
  { slug: 'tavren-sahit-kilici', group: 'living', sigil: '⚔', tr: 'Tavren’in Şahit Kılıcı', en: 'Tavren’s Witness Blade', trText: 'Yemin, koruma ve adil savaşın şövalye gelenekleri.', enText: 'Knightly traditions of oath, protection, and just war.' },
  { slug: 'ilyar-gorunmeyen-soz', group: 'living', sigil: '▥', tr: 'Ilyar’ın Görünmeyen Sözü', en: 'Ilyar’s Unseen Word', trText: 'Tasvir, ruhban gösterişi ve metin çevresinde dönen reform dini.', enText: 'A reform faith of images, clerical display, and text.' },
  { slug: 'kezran-donen-hukum', group: 'living', sigil: '◈', tr: 'Kezran’ın Dönen Hükmü', en: 'Kezran’s Returning Judgement', trText: 'Kurtarıcı, kıyamet ve yaklaşan dönüşümün tehlikeli bekleyişi.', enText: 'The dangerous waiting for deliverer, apocalypse, and coming transformation.' },
  { slug: 'esik-ve-atalar', group: 'ancient', sigil: '◐', tr: 'Eşik ve Atalar', en: 'Threshold & Ancestors', trText: 'Yaşayanlarla ölüler arasındaki korunmuş sınır üzerine antik kayıtlar.', enText: 'Ancient records of the guarded boundary between living and dead.' },
  { slug: 'maskeli-atalar', group: 'ancient', sigil: '◌', tr: 'Maskeli Atalar', en: 'Masked Ancestors', trText: 'Ataların hatırasını ayin maskesine davet eden antik gelenek.', enText: 'An ancient tradition that invited ancestral memory into ritual masks.' },
  { slug: 'perde-bekcileri', group: 'ancient', sigil: '☾', tr: 'Perde Bekçileri', en: 'Veil Keepers', trText: 'Rüya ve gölgede Eşik’i gözleyen eski uygulayıcıların kaydı.', enText: 'A record of old practitioners who watched the Threshold through dream and shadow.' },
  { slug: 'sessiz-sofra', group: 'ancient', sigil: '⌂', tr: 'Sessiz Sofra', en: 'Silent Table', trText: 'Ölü için boş yer bırakan tarihî konukluk geleneği.', enText: 'A historical guest rite that left a place for the dead.' }
]
const bySlug = Object.fromEntries(records.map((r) => [r.slug, r]))
// Yaşayan dinlerin ana gelenekleri ve onlara bağlı kollar/kurumlar. Sıra, sayfadaki sıradır.
const tree = [
  ['azh-khar', []],
  ['askari-kultleri', []],
  ['varduni-gelenekler', ['eram-kok-ahit', 'nadur-gocen-sahitler', 'selmev-muhurlu-sofra', 'raveth-acik-kapi', 'mareya-kuyu-ve-merhamet', 'tavren-sahit-kilici', 'ilyar-gorunmeyen-soz', 'kezran-donen-hukum']],
  ['sairava-dinleri', ['dokuz-gecidin-evi', 'izsiz-cark', 'kok-donusu-soylari', 'sessiz-akis-manastirlari', 'kirik-cember-ogretisi', 'sairava-havzasi-ve-manastir-aglari']],
  ['esreni-inanc', ['kul-sovalyeleri', 'kul-suikastcilari']],
  ['theskar-gizemleri', ['safran-odasi', 'fisildayan-kavsak', 'zincir-aynasi']],
  ['kharumi-ayinler', ['dugum-evleri', 'olcu-gecesi', 'olcusuzler']],
  ['marevi-baglar', []],
  ['saelun-ogretileri', []]
]
const l = computed(() => (isEnglish.value ? 'en' : 'tr'))
const name = (r) => r[l.value]
const text = (r) => (isEnglish.value ? r.enText : r.trText)
const traditions = tree.map(([slug, kids], i) => ({ ...bySlug[slug], n: i + 1, kids: kids.map((k) => bySlug[k]).filter(Boolean) }))
const ancient = records.filter((r) => r.group === 'ancient')
const livingCount = tree.length
const norm = (v) => v.toLocaleLowerCase(isEnglish.value ? 'en-US' : 'tr-TR')
const searching = computed(() => query.value.trim() !== '')
const results = computed(() => {
  const q = norm(query.value.trim())
  return records.filter((r) => norm(`${r.tr} ${r.en} ${r.trText} ${r.enText}`).includes(q))
})
const linkFor = (slug) => withBase(`${isEnglish.value ? '/en' : ''}/kulturler/dinler/${slug}`)
const t = computed(() => isEnglish.value
  ? { kicker: 'Avarra Encyclopaedia · Living Faith & Ancient Records', h1: 'Faith Archive', lead: 'Nine living traditions, and thirteen ancient records that survive only in texts, ruins and law. Start with a living faith, or read the old records.', search: 'Search records…', living: 'Living faiths', ancient: 'Ancient faiths', livingLead: 'Faiths still practised: in law, in daily life, in the open or in secret.', ancientLead: 'Records of faiths that no longer live, but still shape ruins, offices and law.', branches: 'Branches and houses', open: 'Open record', results: 'Results', none: 'No record matches this search.', records: 'records' }
  : { kicker: 'Avarra Ansiklopedisi · Yaşayan İnanç ve Antik Kayıtlar', h1: 'İnanç Arşivi', lead: 'Dokuz yaşayan gelenek ve yalnız metin, harabe ve hukukta kalan on üç antik kayıt. Yaşayan bir inançla başlayın ya da eski kayıtları okuyun.', search: 'Kayıtlarda ara…', living: 'Yaşayan dinler', ancient: 'Antik dinler', livingLead: 'Bugün hâlâ uygulanan inançlar: hukukta, gündelik hayatta, açıkta ya da gizlice.', ancientLead: 'Artık yaşamayan ama harabeleri, makamları ve hukuku hâlâ biçimlendiren inançların kayıtları.', branches: 'Kollar ve evler', open: 'Kaydı aç', results: 'Sonuçlar', none: 'Bu aramayla eşleşen kayıt yok.', records: 'kayıt' })
</script>

<template>
  <section class="fa">
    <header class="fa-head">
      <p class="fa-kicker">{{ t.kicker }}</p>
      <h1>{{ t.h1 }}</h1>
      <p class="fa-lead">{{ t.lead }}</p>
    </header>

    <div class="fa-bar">
      <div class="fa-tabs" role="tablist">
        <button type="button" role="tab" :aria-selected="tab === 'living' && !searching" :class="{ on: tab === 'living' && !searching }" @click="tab = 'living'; query = ''">{{ t.living }} <i>{{ livingCount }}</i></button>
        <button type="button" role="tab" :aria-selected="tab === 'ancient' && !searching" :class="{ on: tab === 'ancient' && !searching }" @click="tab = 'ancient'; query = ''">{{ t.ancient }} <i>{{ ancient.length }}</i></button>
      </div>
      <label class="fa-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8" /><path d="m16 16 4.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg><input v-model="query" type="search" :placeholder="t.search" :aria-label="t.search" /></label>
    </div>

    <template v-if="searching">
      <p class="fa-count"><b>{{ results.length }}</b> {{ t.records }} · {{ t.results }}</p>
      <ul class="fa-rows">
        <li v-for="r in results" :key="r.slug"><a :href="linkFor(r.slug)"><span class="fa-glyph">{{ r.sigil }}</span><span class="fa-rowtxt"><strong>{{ name(r) }}</strong><small>{{ r.group === 'living' ? t.living : t.ancient }}</small></span><em>{{ text(r) }}</em><b>→</b></a></li>
      </ul>
      <p v-if="!results.length" class="fa-none">{{ t.none }}</p>
    </template>

    <template v-else-if="tab === 'living'">
      <p class="fa-tablead">{{ t.livingLead }}</p>
      <div class="fa-grid">
        <article v-for="tr in traditions" :key="tr.slug" class="fa-card" :class="{ solo: !tr.kids.length }">
          <a class="fa-main" :href="linkFor(tr.slug)">
            <span class="fa-num">{{ String(tr.n).padStart(2, '0') }}</span>
            <span class="fa-glyph">{{ tr.sigil }}</span>
            <strong>{{ name(tr) }}</strong>
            <em>{{ text(tr) }}</em>
            <span class="fa-open">{{ t.open }} <b>→</b></span>
          </a>
          <div v-if="tr.kids.length" class="fa-kids">
            <p>{{ t.branches }} · {{ tr.kids.length }}</p>
            <a v-for="k in tr.kids" :key="k.slug" :href="linkFor(k.slug)">{{ name(k) }}</a>
          </div>
        </article>
      </div>
    </template>

    <template v-else>
      <p class="fa-tablead">{{ t.ancientLead }}</p>
      <ul class="fa-rows">
        <li v-for="r in ancient" :key="r.slug"><a :href="linkFor(r.slug)"><span class="fa-glyph">{{ r.sigil }}</span><span class="fa-rowtxt"><strong>{{ name(r) }}</strong></span><em>{{ text(r) }}</em><b>→</b></a></li>
      </ul>
    </template>
  </section>
</template>

<style scoped>
.fa { width: min(100% - 40px, 1240px); margin: 3rem auto 5rem; color: var(--vp-c-text-1); }
.fa-kicker { margin: 0 0 .6rem; color: var(--vp-c-brand-1); font: 500 .78rem var(--font-ui); letter-spacing: .16em; text-transform: uppercase; }
.fa-head { max-width: 46rem; }
.fa h1 { margin: 0 0 1rem; padding: 0; border: 0; color: var(--vp-c-brand-3); font: 500 clamp(2.8rem, 7vw, 5.4rem)/1 var(--font-display); letter-spacing: -.035em; }
.dark .fa h1 { color: var(--vp-c-text-1); }
.fa-lead { margin: 0; color: var(--vp-c-text-2); font-size: 1.15rem; line-height: 1.65; }
.fa-bar { display: flex; flex-wrap: wrap; gap: 1rem 2rem; align-items: center; justify-content: space-between; margin: 3rem 0 1.4rem; padding-top: 1.8rem; border-top: 1px solid var(--vp-c-divider); }
.fa-tabs { display: inline-flex; padding: 5px; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--vp-c-divider); }
.fa-tabs button { display: inline-flex; gap: .55em; align-items: center; padding: .7em 1.5em; border: 0; border-radius: 999px; background: transparent; color: var(--vp-c-text-1); font: 500 1rem var(--font-ui); cursor: pointer; transition: background .35s, color .35s; }
.fa-tabs button i { color: var(--vp-c-text-3); font-size: .8rem; font-style: normal; }
.fa-tabs button.on { background: var(--vp-c-brand-3); color: #f4e6c8; }
.fa-tabs button.on i { color: rgba(244, 230, 200, .7); }
.dark .fa-tabs button.on { background: var(--vp-c-brand-1); color: #2a1500; }
.dark .fa-tabs button.on i { color: rgba(42, 21, 0, .6); }
.fa-search { display: flex; gap: .7rem; align-items: center; min-width: min(100%, 300px); height: 48px; padding: 0 20px; border-radius: 999px; background: var(--vp-c-bg-elv); box-shadow: inset 0 0 0 1px var(--vp-c-divider); color: var(--vp-c-brand-1); transition: box-shadow .3s; }
.fa-search:focus-within { box-shadow: inset 0 0 0 1.5px var(--vp-c-brand-1); }
.fa-search svg { width: 18px; height: 18px; flex: none; }
.fa-search input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--vp-c-text-1); font: 1rem var(--font-ui); }
.fa-tablead { max-width: 40rem; margin: 0 0 2rem; color: var(--vp-c-text-2); font-size: 1.1rem; line-height: 1.6; }
.fa-count { margin: 0 0 1.2rem; color: var(--vp-c-text-2); font: .95rem var(--font-ui); }
.fa-count b { color: var(--vp-c-brand-1); }

.fa-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.2rem; align-items: start; }
.fa-card { display: flex; flex-direction: column; overflow: hidden; border-radius: 28px; background: var(--vp-c-bg-elv); box-shadow: inset 0 0 0 1px var(--vp-c-divider); transition: box-shadow .5s, transform .6s cubic-bezier(.22, 1, .36, 1); }
.fa-card:hover { box-shadow: inset 0 0 0 1px var(--vp-c-brand-1), 0 28px 44px -26px rgba(60, 30, 0, .4); transform: translateY(-3px); }
.fa-main { position: relative; isolation: isolate; display: grid; grid-template-columns: 56px 1fr; column-gap: 1.2rem; padding: 1.8rem 2rem 1.6rem; color: inherit; text-decoration: none; }
.fa-num { position: absolute; top: 1.4rem; right: 1.8rem; color: color-mix(in srgb, var(--vp-c-brand-1) 38%, transparent); font: 500 .8rem var(--font-ui); letter-spacing: .14em; }
.fa-glyph { display: grid; width: 56px; height: 56px; place-items: center; border-radius: 50%; box-shadow: inset 0 0 0 1px var(--vp-c-divider); color: var(--vp-c-brand-1); font-size: 1.5rem; transition: background .4s, color .4s, box-shadow .4s; }
.fa-main:hover .fa-glyph { background: var(--vp-c-brand-3); color: #d9b878; box-shadow: none; }
.dark .fa-main:hover .fa-glyph { background: var(--vp-c-brand-1); color: #2a1500; }
.fa-main strong { align-self: center; font: 500 1.7rem/1.15 var(--font-display); letter-spacing: -.02em; }
.fa-main em { grid-column: 1 / -1; margin: 1.1rem 0 0; color: var(--vp-c-text-2); font: normal 1.02rem/1.65 var(--font-ui); }
.fa-open { grid-column: 1 / -1; margin-top: 1rem; color: var(--vp-c-brand-1); font: 500 .92rem var(--font-ui); }
.fa-open b { display: inline-block; font-weight: 500; transition: transform .4s cubic-bezier(.22, 1, .36, 1); }
.fa-main:hover .fa-open b { transform: translateX(5px); }
.fa-kids { padding: 1.2rem 2rem 1.6rem; border-top: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); }
.fa-kids p { width: 100%; margin: 0 0 .8rem; color: var(--vp-c-text-3); font: 500 .72rem var(--font-ui); letter-spacing: .14em; text-transform: uppercase; }
.fa-kids { display: flex; flex-wrap: wrap; gap: .5rem; }
.fa-kids a { padding: .45em 1em; border-radius: 999px; background: var(--vp-c-bg); box-shadow: inset 0 0 0 1px var(--vp-c-divider); color: var(--vp-c-text-1); font: 500 .88rem var(--font-ui); text-decoration: none; transition: background .3s, color .3s, box-shadow .3s; }
.fa-kids a:hover { background: var(--vp-c-brand-3); color: #f4e6c8; box-shadow: none; }
.dark .fa-kids a:hover { background: var(--vp-c-brand-1); color: #2a1500; }

.fa-rows { display: grid; gap: .6rem; margin: 0; padding: 0; list-style: none; }
.fa-rows--two { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .7rem 1.2rem; }
.fa-rows li { margin: 0; }
.fa-rows a { display: grid; grid-template-columns: 52px minmax(0, 12rem) minmax(0, 1fr) auto; gap: 1.2rem; align-items: center; height: 100%; padding: 1.05rem 1.4rem; border-radius: 22px; color: inherit; text-decoration: none; box-shadow: inset 0 0 0 1px var(--vp-c-divider); transition: background .3s, box-shadow .3s, transform .4s cubic-bezier(.22, 1, .36, 1); }
.fa-rows--two a { grid-template-columns: 52px minmax(0, 1fr) auto; }
.fa-rows--two em { display: none; }
.fa-rows a:hover { background: var(--vp-c-bg-elv); box-shadow: inset 0 0 0 1px var(--vp-c-brand-1); transform: translateX(4px); }
.fa-rows .fa-glyph { width: 52px; height: 52px; font-size: 1.3rem; }
.fa-rowtxt { display: grid; gap: .15rem; }
.fa-rowtxt strong { font: 500 1.25rem/1.2 var(--font-display); letter-spacing: -.01em; }
.fa-rowtxt small { color: var(--vp-c-brand-1); font: 500 .68rem var(--font-ui); letter-spacing: .12em; text-transform: uppercase; }
.fa-rows em { color: var(--vp-c-text-2); font: normal .95rem/1.5 var(--font-ui); }
.fa-rows b { color: var(--vp-c-text-3); font-weight: 500; transition: transform .4s cubic-bezier(.22, 1, .36, 1), color .3s; }
.fa-rows a:hover b { color: var(--vp-c-brand-1); transform: translateX(4px); }
.fa-none { padding: 3rem 0; color: var(--vp-c-text-2); font: italic 1.15rem var(--font-display); text-align: center; }

@media (max-width: 900px) {
  .fa-grid, .fa-rows--two { grid-template-columns: 1fr; }
  .fa-rows a { grid-template-columns: 52px minmax(0, 1fr) auto; }
  .fa-rows a em { display: none; }
}
@media (max-width: 600px) { .fa { width: min(100% - 32px, 1240px); } .fa-main, .fa-kids { padding-left: 1.3rem; padding-right: 1.3rem; } }
</style>

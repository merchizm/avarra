<script setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const query = ref('')
const active = ref('all')

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
const countFor = (group) => records.filter((record) => record.group === group).length
const groups = computed(() => [
  { key: 'all', label: isEnglish.value ? 'All records' : 'Tüm kayıtlar', count: records.length },
  { key: 'living', label: isEnglish.value ? 'Living faiths' : 'Yaşayan dinler', count: countFor('living') },
  { key: 'ancient', label: isEnglish.value ? 'Ancient faiths' : 'Antik dinler', count: countFor('ancient') }
])
const familyBriefs = computed(() => [
  {
    key: 'living', sigil: '☉', count: countFor('living'),
    trTitle: 'Yaşayan dinler', enTitle: 'Living faiths',
    trQuestion: 'Hayat hangi kudrete borçlu?', enQuestion: 'What does life owe to power?',
    trText: 'Qasyrra’da Azh-Khar; insan dünyasında Aşkarî, Vardûnî, Sairava, Eşrenî, Theskarî, Kharûmî, Marevî ve gizli Saelûnî gelenekleri ibadeti hâlâ hukuk ve gündelik hayatın içine taşır.', enText: 'In Qasyrra, Azh-Khar; in the human world, Aškari, Vardûni, Sairava, Eshrenic, Theskarite, Kharûmi, Marevi, and hidden Saeluni traditions still carry worship into law and daily life.'
  },
  {
    key: 'ancient', sigil: '⌛', count: countFor('ancient'),
    trTitle: 'Antik dinler', enTitle: 'Ancient faiths',
    trQuestion: 'Kalıntılar neyi hatırlatır?', enQuestion: 'What do the remnants remember?',
    trText: 'Canlı Bütün, Göksel Taç ve Eşik-Atalar artık yaşayan dinler değil; metin, harabe, hukuk ve halk hafızasında kalan geleneklerdir.', enText: 'Living Whole, Celestial Crown, and Threshold & Ancestors are no longer living faiths; they remain in texts, ruins, law, and public memory.'
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
    <div class="faith-main">
      <header class="faith-heading">
        <p class="lore-kicker">{{ isEnglish ? 'Avarra Encyclopaedia · Living Faith & Ancient Records' : 'Avarra Ansiklopedisi · Yaşayan İnanç ve Antik Kayıtlar' }}</p>
        <h1>{{ isEnglish ? 'Faith Archive' : 'İnanç Arşivi' }}</h1>
        <p>{{ isEnglish ? 'Azh-Khar in Qasyrra, alongside Aškari, Vardûni, Sairava, Eshrenic, Theskarite, Kharûmi, Marevi, and hidden Saeluni traditions in the human world, remain living faiths. The other thirteen records belong to ancient religions: traditions preserved in ruins, copied texts, inherited law, and contested memory rather than active worship.' : 'Qasyrra’da Azh-Khar; insan dünyasında Aşkarî, Vardûnî, Sairava, Eşrenî, Theskarî, Kharûmî, Marevî ve gizli Saelûnî gelenekleri yaşayan dinlerdir. Diğer on üç kayıt antik dinlere aittir: etkin ibadetten çok harabelerde, kopya metinlerde, miras hukukunda ve tartışmalı halk hafızasında yaşayan geleneklere.' }}</p>
        <label class="faith-search faith-search--header"><span>⌕</span><input v-model="query" type="search" :placeholder="isEnglish ? 'Search records…' : 'Kayıtlarda ara…'" /></label>
      </header>
      <section class="faith-archive-guide" :aria-label="isEnglish ? 'How to read the archive' : 'Arşivi nasıl okumalı'">
        <div><span>Ⅰ</span><p><b>{{ isEnglish ? 'Living faiths.' : 'Yaşayan dinler.' }}</b>{{ isEnglish ? 'Azh-Khar in Qasyrra, alongside Aškari, Vardûni, Sairava, Eshrenic, Theskarite, Kharûmi, Marevi, and hidden Saeluni traditions in the human world, remain part of public life and law.' : 'Qasyrra’daki Azh-Khar ile insan dünyasındaki Aşkarî, Vardûnî, Sairava, Eşrenî, Theskarî, Kharûmî, Marevî ve gizli Saelûnî gelenekleri kamusal hayatın ve hukukun parçasıdır.' }}</p></div>
        <div><span>Ⅱ</span><p><b>{{ isEnglish ? 'Ancient does not mean harmless.' : 'Antik olmak zararsız olmak değildir.' }}</b>{{ isEnglish ? 'Old rites still shape ruins, inherited offices, family stories, and dangerous objects.' : 'Eski ayinler hâlâ harabeleri, miras makamları, aile anlatılarını ve tehlikeli nesneleri biçimlendirir.' }}</p></div>
        <div><span>Ⅲ</span><p><b>{{ isEnglish ? 'The archive stays open.' : 'Arşiv açık kalır.' }}</b>{{ isEnglish ? 'New living traditions will receive their own records without being folded into the old faiths.' : 'Yeni yaşayan dinler, eski inançların içine katılmadan kendi kayıtlarını alacaktır.' }}</p></div>
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

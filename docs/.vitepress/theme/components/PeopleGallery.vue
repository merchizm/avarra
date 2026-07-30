<script setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const query = ref('')
const filter = ref('all')
const categories = {
  'Fey kökenli': { tr: 'Fey kökenli', en: 'Fey-touched' },
  'Ölümlü': { tr: 'Ölümlü', en: 'Mortal' },
  'Yeraltı': { tr: 'Yeraltı', en: 'Underdark' },
  'Deniz': { tr: 'Deniz', en: 'Sea' },
  'Drakonik': { tr: 'Drakonik', en: 'Draconic' },
  'Soy ve dönüşüm': { tr: 'Soy ve dönüşüm', en: 'Lineage & transformation' }
}
const filters = computed(() => [
  { key: 'all', label: isEnglish.value ? 'All' : 'Tümü' },
  ...Object.entries(categories).map(([key, value]) => ({ key, label: isEnglish.value ? value.en : value.tr }))
])
const englishNames = {
  '/irklar/insanlar': 'Humans', '/irklar/cuceler': 'Dwarves', '/irklar/koboldlar': 'Kobolds',
  '/irklar/veyranlar': 'Veyrans', '/irklar/svirfneblinler': 'Svirfneblins', '/irklar/drowlar': 'Drow',
  '/irklar/dragonbornlar': 'Dragonborn', '/irklar/lizardfolklar': 'Lizardfolk', '/irklar/genasiler': 'Genasi',
  '/irklar/minotaurlar': 'Minotaurs', '/irklar/halflingler': 'Halflings', '/irklar/goblinler': 'Goblins',
  '/irklar/tieflingler': 'Tieflings', '/irklar/aasimarlar': 'Aasimar', '/irklar/shifterlar': 'Shifters',
  '/irklar/warforgedler': 'Warforged', '/irklar/orman-elfleri': 'Wood Elves', '/irklar/yuksek-elfler': 'High Elves',
  '/irklar/deniz-elfleri': 'Sea Elves', '/irklar/firbolglar': 'Firbolg', '/irklar/dikenkanlilar': 'Thornbloods',
  '/irklar/changelingler': 'Changelings', '/irklar/duergarlar': 'Duergar', '/irklar/myconidler': 'Myconids',
  '/irklar/locathahlar': 'Locathah', '/irklar/kuo-toalar': 'Kuo-Toa', '/irklar/tritonlar': 'Tritons',
  '/irklar/sahuaginler': 'Sahuagin', '/irklar/tortlelar': 'Tortles', '/irklar/centaurlar': 'Centaurs',
  '/irklar/tabaxiler': 'Tabaxi', '/irklar/kenkular': 'Kenku', '/irklar/aarakocralar': 'Aarakocra',
  '/irklar/owlinler': 'Owlin', '/irklar/grunglar': 'Grung', '/irklar/satyrler': 'Satyrs',
  '/irklar/orclar': 'Orcs', '/irklar/hobgoblinler': 'Hobgoblins', '/irklar/rebornlar': 'Reborn',
  '/irklar/hexbloodlar': 'Hexbloods', '/irklar/dhampirler': 'Dhampirs', '/irklar/autognomlar': 'Autognomes',
  '/irklar/goliathlar': 'Goliaths', '/irklar/tuz-cuceleri': 'Salt Dwarves', '/irklar/choldrithler': 'Choldriths',
  '/irklar/grimlocklar': 'Grimlocks', '/irklar/derrolar': 'Derro', '/irklar/yuan-ti': 'Yuan-ti',
  '/irklar/nagalar': 'Nagas', '/irklar/psiyonik-kalintilar': 'Psionic Remnants', '/irklar/ejderhalar': 'Dragons',
  '/irklar/devler-ve-fomorianlar': 'Giants & Fomorians', '/irklar/abolethler': 'Aboleths', '/irklar/ilk-fey': 'First Fey Legacy',
  '/irklar/gnomlar': 'Gnomes', '/irklar/yari-orclar': 'Half-Orcs'
}

const peoples = [
  {
    name: 'Eladrin', type: 'Fey kökenli', status: 'Kayıt açık',
    description: 'Duygularını mevsimler gibi taşıyan, geçitler ve eski antlarla yaşayan uzun ömürlü halk.',
    crest: '✦', className: 'eladrin', image: '/assets/illustrations/eladrin.png', link: '/irklar/eladrin'
  },
  {
    name: 'İnsanlar', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Kısa ömürlerini şehirler, hanedanlar ve yolculuklarla genişleten uyumlu halklar.',
    crest: '⌂', className: 'human', image: '/assets/illustrations/human.png', link: '/irklar/insanlar'
  },
  {
    name: 'Cüceler', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Taşın hafızasına, derin ocaklara ve kuşaklar boyu süren zanaat antlarına bağlı soylar.',
    crest: '⛰', className: 'dwarf', image: '/assets/illustrations/dwarf.png', link: '/irklar/cuceler'
  },
  {
    name: 'Koboldlar', type: 'Yeraltı', status: 'Kayıt açık',
    description: 'Tünelleri, ortak emekleri ve ejderha çağından kalan söylenceleriyle tanınan küçük halk.',
    crest: '◈', className: 'kobold', image: '/assets/illustrations/kobold.png', link: '/irklar/koboldlar'
  },
  {
    name: 'Veyranlar', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Ordan İmparatorluğu’nun kurucu halkı; ölçüm, kayıt ve yazılı hukukla şekillenmiş kültürler.',
    crest: '═', className: 'veyran', image: '/assets/illustrations/veyran.png', link: '/irklar/veyranlar'
  },
  {
    name: 'Svirfneblinler', type: 'Yeraltı', status: 'Kayıt açık',
    description: 'Kendilerine Nimrûn diyen, taşın içindeki yankılardan doğduğuna inanan derin Gnom halkı.',
    crest: '◉', className: 'svirfneblin', image: '/assets/illustrations/nimrun.png', link: '/irklar/svirfneblinler'
  },
  {
    name: 'Drowlar', type: 'Yeraltı', status: 'Kayıt açık',
    description: 'İpek Tahtı, Karanlık Liman ve Ayaltı sürgünleri arasında farklı hukuklar altında yaşayan halk.',
    crest: '☾', className: 'drow', image: '/assets/illustrations/drow.png', link: '/irklar/drowlar'
  },
  {
    name: 'Dragonbornlar', type: 'Drakonik', status: 'Kayıt açık',
    description: 'Odraka’da Kızıl Saar ve Mücevher Yemini arasında ejderha mirasını farklı yorumlayan soylar.',
    crest: '♢', className: 'dragonborn', image: '/assets/illustrations/dragonborn.png', link: '/irklar/dragonbornlar'
  },
  {
    name: 'Lizardfolklar', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Delta krallıklarında sulak alan mühendisliği ve atalara dayalı su hukukuyla yaşayan halklar.',
    crest: '≋', className: 'lizardfolk', image: '/assets/illustrations/lizardfolk.png', link: '/irklar/lizardfolklar'
  },
  {
    name: 'Genasiler', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Toprak, ateş, kristal, kül, su ve buz soyları; tek bir meslek veya ulusla tanımlanmaz.',
    crest: '◇', className: 'genasi', image: '/assets/illustrations/genasi.png', link: '/irklar/genasiler'
  },
  {
    name: 'Minotaurlar', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Labirenti hapis değil, doğru kararın tek bir düz yoldan ibaret olmadığının kutsal simgesi sayarlar.',
    crest: '⌘', className: 'minotaur', image: '/assets/illustrations/minatour.png', link: '/irklar/minotaurlar'
  },
  {
    name: 'Halflingler', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Nehir, yol ve ada kollarına ayrılan; tahıl, haber ve sigorta ağlarını koruyan topluluklar.',
    crest: '☘', className: 'halfling', image: '/assets/illustrations/halfling.png', link: '/irklar/halflingler'
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
  },
  {
    name: 'Goliathlar', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Ilyr-Khaz’ın buz yollarında geçiş hakkını ve yük paylaşımını koruyan yüksek dağ halkı.',
    crest: '△', className: 'dwarf', link: '/irklar/goliathlar'
  },
  {
    name: 'Tuz Cüceleri', type: 'Yeraltı', status: 'Kayıt açık',
    description: 'Kuru havzalarda tuz, su payı ve mahzen hukukunu yaşamın temel bilgisi sayan cüce toplulukları.',
    crest: '◇', className: 'dwarf', link: '/irklar/tuz-cuceleri'
  },
  {
    name: 'Gnomlar', type: 'Ölümlü', status: 'Kayıt açık',
    description: 'Gözlemevi, bahçe ve gezici tamir ocakları arasında bakım hakkını ve ortak kaydı önemseyen küçük halklar.',
    crest: '⚙', className: 'svirfneblin', link: '/irklar/gnomlar'
  },
  {
    name: 'Choldrithler', type: 'Yeraltı', status: 'Kayıt açık',
    description: 'İpek, soy borcu ve kutsal hukuk çevresinde örgütlenen örümcek bağlantılı yeraltı toplulukları.',
    crest: '✣', className: 'drow', link: '/irklar/choldrithler'
  },
  {
    name: 'Grimlocklar', type: 'Yeraltı', status: 'Kayıt açık',
    description: 'Taşın, havanın ve adımların titreşimini ayrıntılı bir dil gibi okuyan derinlik halkları.',
    crest: '◌', className: 'svirfneblin', link: '/irklar/grimlocklar'
  },
  {
    name: 'Derrolar', type: 'Yeraltı', status: 'Kayıt açık',
    description: 'Mühürlü hafıza, kırık rüya ve tuhaf zanaat çevresinde yaşayan dağınık yeraltı halkları.',
    crest: '⌁', className: 'svirfneblin', link: '/irklar/derrolar'
  },
  {
    name: 'Yuan-ti', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: 'Kadim yılan medeniyetinin beden, soy ve kutsal dönüşümü yazı gibi işleyen mirasçıları.',
    crest: '∿', className: 'changed', link: '/irklar/yuan-ti'
  },
  {
    name: 'Yarı-Orclar', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: 'Kızıl Toprak, sınır kentleri ve insan toplulukları arasındaki akrabalıklarda görülen; tek bir kültüre indirgenmeyen soy durumu.',
    crest: '▲', className: 'orc', link: '/irklar/yari-orclar'
  },
  {
    name: 'Nagalar', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: 'Eski yılan uygarlıklarının su, taş ve harabe nöbeti etrafında yaşayan uzun ömürlü muhafızları.',
    crest: '♒', className: 'sea', link: '/irklar/nagalar'
  },
  {
    name: 'Psiyonik Kalıntılar', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: 'Mühürlerden ve parçalanmış psişik ağlardan gelen; soy değil toplumsal durum olarak tanınanlar.',
    crest: '◈', className: 'changed', link: '/irklar/psiyonik-kalintilar'
  },
  {
    name: 'Ejderhalar', type: 'Drakonik', status: 'Kayıt açık',
    description: 'Volkan, nehir, buzul ve fırtına gibi dünya süreçleriyle antlaşmalar kuran kadim büyük varlıklar.',
    crest: '♢', className: 'dragonborn', link: '/irklar/ejderhalar'
  },
  {
    name: 'Devler ve Fomorianlar', type: 'Fey kökenli', status: 'Kayıt açık',
    description: 'Buz yolları ve batık sütunlarda iz bırakan, geçmişi hâlâ tartışmalı kadim büyük halklar.',
    crest: '⛰', className: 'dwarf', link: '/irklar/devler-ve-fomorianlar'
  },
  {
    name: 'Abolethler', type: 'Deniz', status: 'Kayıt açık',
    description: 'Derin sularda kendi hafızalarının dünyadan eski olduğunu ileri süren kadim zeki varlıklar.',
    crest: '◉', className: 'sea', link: '/irklar/abolethler'
  },
  {
    name: 'İlk Fey Mirası', type: 'Fey kökenli', status: 'Kayıt açık',
    description: 'Açlık, Bahar, Yas ve Unutuluş gibi kavramlara bağlanan ilk fey varlıklarının yaşayan mirası.',
    crest: '✦', className: 'eladrin', link: '/irklar/ilk-fey'
  }
]

const localizedPeople = computed(() => peoples.map((person) => ({
  ...person,
  name: isEnglish.value ? (englishNames[person.link] || person.name) : person.name,
  typeLabel: isEnglish.value ? categories[person.type].en : categories[person.type].tr,
  description: isEnglish.value ? `A recorded ${categories[person.type].en.toLocaleLowerCase('en-US')} people of Avarra.` : person.description,
  link: isEnglish.value ? `/en${person.link}` : person.link
})))

const visiblePeople = computed(() => {
  const locale = isEnglish.value ? 'en-US' : 'tr-TR'
  const normalized = query.value.trim().toLocaleLowerCase(locale)
  return localizedPeople.value.filter((person) => {
    const matchesFilter = filter.value === 'all' || person.type === filter.value
    const matchesSearch = !normalized || `${person.name} ${person.typeLabel} ${person.description}`
      .toLocaleLowerCase(locale).includes(normalized)
    return matchesFilter && matchesSearch
  })
})
</script>

<template>
  <section class="people-catalogue">
    <header class="people-catalogue-header">
      <div>
        <p class="lore-kicker">{{ isEnglish ? 'Avarra Encyclopaedia · Peoples' : 'Avarra Ansiklopedisi · Halklar' }}</p>
        <h1>{{ isEnglish ? 'Peoples and Lineages' : 'Irklar ve Halklar' }}</h1>
        <p class="lore-lead">{{ isEnglish ? 'A living register of peoples, lineages and ancient kinships born from the crossings.' : 'Soylar, halklar ve geçitlerden doğan kadim akrabalıklar için yaşayan kayıt defteri.' }}</p>
      </div>
      <label class="people-search">
        <span>⌕</span>
        <input v-model="query" type="search" :placeholder="isEnglish ? 'Search peoples…' : 'Halk ara…'" :aria-label="isEnglish ? 'Search peoples' : 'Halk ara'" />
      </label>
    </header>

    <div class="people-toolbar">
      <p><b>{{ visiblePeople.length }}</b> {{ isEnglish ? 'records shown' : 'kayıt gösteriliyor' }}</p>
      <div class="people-filters" :aria-label="isEnglish ? 'Filter by people type' : 'Halk türüne göre filtrele'">
        <button v-for="item in filters" :key="item.key" :class="{ active: filter === item.key }" @click="filter = item.key">{{ item.label }}</button>
      </div>
    </div>

    <div class="people-grid">
      <component :is="person.link ? 'a' : 'article'" v-for="person in visiblePeople" :key="person.name"
        :href="person.link ? withBase(person.link) : undefined" class="people-card" :class="[person.className, { 'is-draft': !person.link }]">
        <div class="people-visual" :class="{ 'has-image': person.image }">
          <img v-if="person.image" :src="withBase(person.image)" :alt="person.name + ' portresi'" />
          <span v-else class="people-crest">{{ person.crest }}</span>
          <span class="people-type">{{ person.typeLabel }}</span>
        </div>
        <div class="people-card-content">
          <span class="people-status">{{ isEnglish ? 'Record open' : person.status }}</span>
          <h2>{{ person.name }}</h2>
          <p>{{ person.description }}</p>
          <span v-if="person.link" class="people-link">{{ isEnglish ? 'Open record' : 'Kaydı aç' }} <b>→</b></span>
          <span v-else class="people-draft">{{ isEnglish ? 'Record in preparation' : 'Arşivci kaydı hazırlıyor' }}</span>
        </div>
      </component>
    </div>

    <p v-if="!visiblePeople.length" class="people-empty">{{ isEnglish ? 'No people match this search or filter.' : 'Bu arama veya filtreyle eşleşen bir halk bulunamadı.' }}</p>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { additionalPeople } from '../data/additionalPeople.js'
import { peopleImages } from '../data/peopleImages.js'

const { lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const query = ref('')
const filter = ref('all')
const categories = {
  'Fey kökenli': { tr: 'Fey bağlantılı', en: 'Fey-linked' },
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
  '/irklar/qezhler': 'Qezh', '/irklar/szairler': 'Szaïr', '/irklar/ossailer': 'Ossai',
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
const sourceLabels = {
  phb: { tr: 'Oyuncu El Kitabı', en: "Player's Handbook" },
  motm: { tr: 'Çoklu Evren Canavarları', en: 'Monsters of the Multiverse' },
  eberron: { tr: 'Eberron: Rising from the Last War', en: 'Eberron: Rising from the Last War' },
  vrgr: { tr: 'Van Richten’ın Ravenloft Rehberi', en: "Van Richten's Guide to Ravenloft" },
  spelljammer: { tr: 'Spelljammer: Astral Maceracı Rehberi', en: "Spelljammer: Astral Adventurer's Guide" },
  strixhaven: { tr: 'Strixhaven: Kaos Müfredatı', en: 'Strixhaven: A Curriculum of Chaos' },
  theros: { tr: 'Theros’un Mitik Maceraları', en: 'Mythic Odysseys of Theros' },
  ravnica: { tr: 'Ravnica’ya Lonca Ustası Rehberi', en: "Guildmasters' Guide to Ravnica" },
  dragonlance: { tr: 'Dragonlance: Gölge Kraliçesi', en: 'Dragonlance: Shadow of the Dragon Queen' },
  acqinc: { tr: 'Acquisitions Incorporated', en: 'Acquisitions Incorporated' },
  locathah: { tr: 'Locathah Rising', en: 'Locathah Rising' },
  grung: { tr: 'One Grung Above', en: 'One Grung Above' },
  kaladesh: { tr: 'Plane Shift: Kaladesh', en: 'Plane Shift: Kaladesh' },
  lorwyn: { tr: 'Lorwyn: First Light', en: 'Lorwyn: First Light' },
  exploringEberron: { tr: 'Exploring Eberron', en: 'Exploring Eberron' },
  forgottenRealms: { tr: 'Forgotten Realms', en: 'Forgotten Realms' },
  unverified: { tr: 'Kaynak doğrulanıyor', en: 'Source under review' },
  avarra: { tr: 'Avarra', en: 'Avarra' }
}
const sourceByLink = {
  '/irklar/qezhler': 'avarra', '/irklar/szairler': 'avarra', '/irklar/ossailer': 'avarra',
  '/irklar/eladrin': 'motm', '/irklar/insanlar': 'phb', '/irklar/cuceler': 'phb',
  '/irklar/koboldlar': 'motm', '/irklar/veyranlar': 'avarra', '/irklar/svirfneblinler': 'motm',
  '/irklar/drowlar': 'phb', '/irklar/dragonbornlar': 'phb', '/irklar/lizardfolklar': 'motm',
  '/irklar/genasiler': 'motm', '/irklar/minotaurlar': 'motm', '/irklar/halflingler': 'phb',
  '/irklar/goblinler': 'motm', '/irklar/tieflingler': 'phb', '/irklar/aasimarlar': 'phb',
  '/irklar/shifterlar': 'motm', '/irklar/warforgedler': 'eberron', '/irklar/orman-elfleri': 'phb',
  '/irklar/yuksek-elfler': 'phb', '/irklar/deniz-elfleri': 'motm', '/irklar/firbolglar': 'motm',
  '/irklar/dikenkanlilar': 'avarra', '/irklar/changelingler': 'eberron', '/irklar/duergarlar': 'motm',
  '/irklar/myconidler': 'forgottenRealms', '/irklar/locathahlar': 'locathah', '/irklar/kuo-toalar': 'forgottenRealms',
  '/irklar/tritonlar': 'motm', '/irklar/sahuaginler': 'forgottenRealms', '/irklar/tortlelar': 'motm',
  '/irklar/centaurlar': 'motm', '/irklar/tabaxiler': 'motm', '/irklar/kenkular': 'motm',
  '/irklar/aarakocralar': 'motm', '/irklar/owlinler': 'strixhaven', '/irklar/grunglar': 'grung',
  '/irklar/satyrler': 'motm', '/irklar/orclar': 'phb', '/irklar/hobgoblinler': 'motm',
  '/irklar/rebornlar': 'vrgr', '/irklar/hexbloodlar': 'vrgr', '/irklar/dhampirler': 'vrgr',
  '/irklar/autognomlar': 'spelljammer', '/irklar/goliathlar': 'phb', '/irklar/tuz-cuceleri': 'avarra',
  '/irklar/gnomlar': 'phb', '/irklar/choldrithler': 'forgottenRealms', '/irklar/grimlocklar': 'forgottenRealms',
  '/irklar/derrolar': 'forgottenRealms', '/irklar/yuan-ti': 'motm', '/irklar/yari-orclar': 'phb',
  '/irklar/nagalar': 'forgottenRealms', '/irklar/psiyonik-kalintilar': 'avarra', '/irklar/ejderhalar': 'forgottenRealms',
  '/irklar/devler-ve-fomorianlar': 'forgottenRealms', '/irklar/abolethler': 'forgottenRealms', '/irklar/ilk-fey': 'avarra',
  '/irklar/bugbearlar': 'motm', '/irklar/harengonlar': 'motm', '/irklar/periler': 'motm',
  '/irklar/boggartlar': 'lorwyn', '/irklar/plasmoidler': 'spelljammer', '/irklar/verdanlar': 'acqinc',
  '/irklar/aetherbornlar': 'kaladesh', '/irklar/kalashtarlar': 'eberron', '/irklar/vedalkenler': 'ravnica',
  '/irklar/khoravarlar': 'eberron', '/irklar/simic-melezleri': 'ravnica', '/irklar/giffler': 'spelljammer',
  '/irklar/githler': 'motm', '/irklar/gargoyleler': 'forgottenRealms', '/irklar/leoninler': 'theros',
  '/irklar/loxodonlar': 'ravnica', '/irklar/thri-kreenler': 'spelljammer', '/irklar/kenderler': 'dragonlance',
  '/irklar/hadozeeler': 'spelljammer', '/irklar/astral-elfler': 'spelljammer', '/irklar/flamekinler': 'lorwyn',
  '/irklar/rimekinler': 'avarra', '/irklar/shadar-kailer': 'motm', '/irklar/kalamerler': 'exploringEberron',
  '/irklar/ruinboundlar': 'avarra', '/irklar/gnollar': 'forgottenRealms', '/irklar/worglar': 'forgottenRealms',
  '/irklar/medusalar': 'forgottenRealms', '/irklar/harpyler': 'forgottenRealms', '/irklar/kithkinler': 'lorwyn'
}

// Catalogue cards identify the people first. Place, profession, politics, and
// historical detail belong in each record rather than in this one-line summary.
const corePeople = [
  {
    name: 'Eladrin', type: 'Fey kökenli', status: 'Kayıt açık',
    description: "Duyguları ve görünümleri iç dünyalarındaki mevsimle değişebilen uzun ömürlü fey halkı.",
    enDescription: "A long-lived Fey people whose emotions and appearance can change with the season within them.",
    crest: '✦', className: 'eladrin', image: '/assets/illustrations/eladrin.png', link: '/irklar/eladrin'
  },
  {
    name: 'İnsanlar', type: 'Ölümlü', status: 'Kayıt açık',
    description: "Kısa ömürlü, son derece çeşitli kültürler kuran uyumlu humanoid halk.",
    enDescription: "An adaptable humanoid people of short lives and exceptionally diverse cultures.",
    crest: '⌂', className: 'human', image: '/assets/illustrations/human.png', link: '/irklar/insanlar'
  },
  {
    name: 'Cüceler', type: 'Ölümlü', status: 'Kayıt açık',
    description: "Kısa ve sağlam yapılı, taş ve yeraltıyla güçlü bağları olan humanoid halk.",
    enDescription: "A short, sturdy humanoid people with strong ties to stone and the deep earth.",
    crest: '⛰', className: 'dwarf', image: '/assets/illustrations/dwarf.png', link: '/irklar/cuceler'
  },
  {
    name: 'Koboldlar', type: 'Yeraltı', status: 'Kayıt açık',
    description: "Küçük yapılı, sürüngen görünümlü ve ejderha soyuyla akraba humanoid halk.",
    enDescription: "A small reptilian humanoid people related to dragonkind.",
    crest: '◈', className: 'kobold', image: '/assets/illustrations/kobold.png', link: '/irklar/koboldlar'
  },
  {
    name: 'Veyranlar', type: 'Ölümlü', status: 'Kayıt açık',
    description: "İnsansı görünümlü; çift halkalı irisleri ve ellerindeki ince doğal çizgilerle ayırt edilen halk.",
    enDescription: "A humanoid people distinguished by double-ringed irises and fine natural lines on their hands.",
    crest: '═', className: 'veyran', image: '/assets/illustrations/veyran.png', link: '/irklar/veyranlar'
  },
  {
    name: 'Svirfneblinler', type: 'Yeraltı', status: 'Kayıt açık',
    description: "Yeraltına uyum sağlamış, küçük yapılı derin gnom halkı.",
    enDescription: "A small deep-gnome people adapted to life underground.",
    crest: '◉', className: 'svirfneblin', image: '/assets/illustrations/nimrun.png', link: '/irklar/svirfneblinler'
  },
  {
    name: 'Drowlar', type: 'Yeraltı', status: 'Kayıt açık',
    description: "Yeraltı ve yüzeyde yaşayan, koyu tenli elf halkı.",
    enDescription: "A dark-skinned Elven people living both below ground and on the surface.",
    crest: '☾', className: 'drow', image: '/assets/illustrations/drow.png', link: '/irklar/drowlar'
  },
  {
    name: 'Dragonbornlar', type: 'Drakonik', status: 'Kayıt açık',
    description: "Ejderha soyundan gelen, pullu derileri ve nefes silahlarıyla tanınan humanoid halk.",
    enDescription: "A draconic humanoid people known for scaled skin and breath weapons.",
    crest: '♢', className: 'dragonborn', image: '/assets/illustrations/dragonborn.png', link: '/irklar/dragonbornlar'
  },
  {
    name: 'Lizardfolklar', type: 'Ölümlü', status: 'Kayıt açık',
    description: "Sürüngen özellikleri taşıyan, sulak alanlara ve sıcak iklimlere uyumlu humanoid halk.",
    enDescription: "A reptilian humanoid people adapted to wetlands and warm climates.",
    crest: '≋', className: 'lizardfolk', image: '/assets/illustrations/lizardfolk.png', link: '/irklar/lizardfolklar'
  },
  {
    name: 'Genasiler', type: 'Ölümlü', status: 'Kayıt açık',
    description: "Elemental kökeni bedeninde ve mizacında iz bırakan humanoid halk.",
    enDescription: "A humanoid people whose elemental ancestry leaves marks on body and temperament.",
    crest: '◇', className: 'genasi', image: '/assets/illustrations/genasi.png', link: '/irklar/genasiler'
  },
  {
    name: 'Minotaurlar', type: 'Ölümlü', status: 'Kayıt açık',
    description: "Boğa başlı, iri yapılı humanoid halk.",
    enDescription: "A large humanoid people with bovine heads and features.",
    crest: '⌘', className: 'minotaur', image: '/assets/illustrations/minatour.png', link: '/irklar/minotaurlar'
  },
  {
    name: 'Halflingler', type: 'Ölümlü', status: 'Kayıt açık',
    description: "Küçük yapılı, çevik ve insanlarla akraba humanoid halk.",
    enDescription: "A small, nimble humanoid people related to humans.",
    crest: '☘', className: 'halfling', image: '/assets/illustrations/halfling.png', link: '/irklar/halflingler'
  },
  {
    name: 'Goblinler', type: 'Ölümlü', status: 'Kayıt açık',
    description: "Küçük yapılı, keskin duyulu ve uyumlu humanoid halk.",
    enDescription: "A small, keen-sensed, adaptable humanoid people.",
    crest: '⚙', className: 'goblin', link: '/irklar/goblinler'
  },
  {
    name: 'Tieflingler', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: "Cehennemî ya da başka dış-dünya etkilerini görünüşlerinde taşıyan humanoid halk.",
    enDescription: "A humanoid people who bear infernal or other otherworldly influences in their appearance.",
    crest: '⌁', className: 'tiefling', link: '/irklar/tieflingler'
  },
  {
    name: 'Aasimarlar', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: "Gökî ya da kutsal güçlerle bağlantılı doğan humanoid kişiler.",
    enDescription: "Humanoid people born with a connection to celestial or sacred power.",
    crest: '✧', className: 'aasimar', link: '/irklar/aasimarlar'
  },
  {
    name: 'Shifterlar', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: "Hayvansı özellikler ve dönüşüm dürtüsü taşıyan humanoid halk.",
    enDescription: "A humanoid people with bestial traits and an instinct for transformation.",
    crest: '◖', className: 'shifter', link: '/irklar/shifterlar'
  },
  {
    name: 'Warforgedler', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: "Canlı irade kazanmış, metal ve ahşaptan yapılmış yapay halk.",
    enDescription: "A constructed people of metal and wood who possess living will.",
    crest: '▣', className: 'warforged', link: '/irklar/warforgedler'
  },
  {
    name: 'Orman Elfleri', type: 'Fey kökenli', status: 'Kayıt açık',
    description: "Orman yaşamına uyumlu, keskin duyulu elf halkı.",
    enDescription: "A keen-sensed Elven people adapted to forest life.",
    crest: '☽', className: 'elf', link: '/irklar/orman-elfleri'
  },
  {
    name: 'Yüksek Elfler', type: 'Fey kökenli', status: 'Kayıt açık',
    description: "Büyü ve uzun ömürle güçlü bağları olan zarif elf halkı.",
    enDescription: "A graceful Elven people strongly connected to magic and long life.",
    crest: '✧', className: 'elf', link: '/irklar/yuksek-elfler'
  },
  {
    name: 'Deniz Elfleri', type: 'Deniz', status: 'Kayıt açık',
    description: "Sualtında nefes alabilen ve deniz yaşamına uyumlu elf halkı.",
    enDescription: "An Elven people able to breathe underwater and adapted to sea life.",
    crest: '≋', className: 'sea', link: '/irklar/deniz-elfleri'
  },
  {
    name: 'Firbolglar', type: 'Fey kökenli', status: 'Kayıt açık',
    description: "İri yapılı, fey kökeni taşıyan ve doğayla yakın bağları olan humanoid halk.",
    enDescription: "A large Fey-touched humanoid people with close ties to nature.",
    crest: '♣', className: 'firbolg', link: '/irklar/firbolglar'
  },
  {
    name: 'Dikenkanlılar', type: 'Fey kökenli', status: 'Kayıt açık',
    description: "Diken, kabuk, yaprak ya da boynuz gibi bitkisel özellikler taşıyan humanoid halk.",
    enDescription: "A humanoid people with plantlike traits such as thorns, bark, leaves, or horns.",
    crest: '✤', className: 'thornblood', image: '/assets/illustrations/dikenkanli.png', link: '/irklar/dikenkanlilar'
  },
  {
    name: 'Changelingler', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: "Yüzlerini, bedenlerini ve seslerini değiştirebilen şekil değiştirici humanoid halk.",
    enDescription: "A shapeshifting humanoid people able to alter their faces, bodies, and voices.",
    crest: '◌', className: 'changeling', link: '/irklar/changelingler'
  },
  {
    name: 'Duergarlar', type: 'Yeraltı', status: 'Kayıt açık',
    description: "Yeraltına uyum sağlamış, gri tenli cüce halkı.",
    enDescription: "A gray-skinned Dwarven people adapted to the Underdark.",
    crest: '▰', className: 'duergar', link: '/irklar/duergarlar'
  },
  {
    name: 'Myconidler', type: 'Yeraltı', status: 'Kayıt açık',
    description: "Mantar gövdeli, sporlar ve ortak bilinç yoluyla iletişim kuran halk.",
    enDescription: "A fungal people who communicate through spores and shared consciousness.",
    crest: '❋', className: 'myconid', link: '/irklar/myconidler'
  },
  {
    name: 'Locathahlar', type: 'Deniz', status: 'Kayıt açık',
    description: "Solungaçlı, balık özellikleri taşıyan amfibi humanoid halk.",
    enDescription: "An amphibious humanoid people with gills and fishlike traits.",
    crest: '≋', className: 'sea', image: '/assets/illustrations/locathah-v1.png', link: '/irklar/locathahlar'
  },
  {
    name: 'Kuo-Toalar', type: 'Deniz', status: 'Kayıt açık',
    description: "Yeraltı denizlerine uyum sağlamış, balık özellikleri taşıyan humanoid halk.",
    enDescription: "A fishlike humanoid people adapted to subterranean seas.",
    crest: '◉', className: 'sea', image: '/assets/illustrations/kuo-toa-v1.png', link: '/irklar/kuo-toalar'
  },
  {
    name: 'Tritonlar', type: 'Deniz', status: 'Kayıt açık',
    description: "Derin denizlere uyumlu, su altında nefes alabilen humanoid halk.",
    enDescription: "A humanoid people adapted to the deep sea and able to breathe underwater.",
    crest: '♆', className: 'sea', link: '/irklar/tritonlar'
  },
  {
    name: 'Sahuaginler', type: 'Deniz', status: 'Kayıt açık',
    description: "Köpekbalığı özellikleri taşıyan, yırtıcı deniz humanoidleri.",
    enDescription: "Predatory sea humanoids with sharklike features.",
    crest: '▲', className: 'sea', link: '/irklar/sahuaginler'
  },
  {
    name: 'Tortlelar', type: 'Ölümlü', status: 'Kayıt açık',
    description: "Kabuklu, uzun ömürlü ve sürüngen özellikleri taşıyan humanoid halk.",
    enDescription: "A long-lived humanoid people with shells and reptilian traits.",
    crest: '◒', className: 'tortle', link: '/irklar/tortlelar'
  },
  {
    name: 'Centaurlar', type: 'Ölümlü', status: 'Kayıt açık',
    description: "İnsan gövdeli üst bedeni at gövdesiyle birleşen hızlı humanoid halk.",
    enDescription: "A swift people with humanoid upper bodies joined to equine lower bodies.",
    crest: '↠', className: 'centaur', link: '/irklar/centaurlar'
  },
  {
    name: 'Tabaxiler', type: 'Ölümlü', status: 'Kayıt açık',
    description: "Kedi özellikleri, çeviklik ve güçlü merakla tanınan humanoid halk.",
    enDescription: "A feline humanoid people known for agility and keen curiosity.",
    crest: '◖', className: 'skyfolk', link: '/irklar/tabaxiler'
  },
  {
    name: 'Kenkular', type: 'Ölümlü', status: 'Kayıt açık',
    description: "Karga özellikleri taşıyan, uçamasalar da sesleri kusursuz taklit edebilen humanoid halk.",
    enDescription: "A crowlike humanoid people who cannot fly but can mimic sounds perfectly.",
    crest: '⌁', className: 'skyfolk', link: '/irklar/kenkular'
  },
  {
    name: 'Aarakocralar', type: 'Ölümlü', status: 'Kayıt açık',
    description: "Kuş özellikleri taşıyan, kanatlarıyla uçabilen humanoid halk.",
    enDescription: "An avian humanoid people able to fly on their wings.",
    crest: '↟', className: 'skyfolk', link: '/irklar/aarakocralar'
  },
  {
    name: 'Owlinler', type: 'Ölümlü', status: 'Kayıt açık',
    description: "Baykuş özellikleri taşıyan, sessiz uçuşa ve gece görüşüne yatkın humanoid halk.",
    enDescription: "An owl-like humanoid people suited to silent flight and night vision.",
    crest: '◉', className: 'skyfolk', link: '/irklar/owlinler'
  },
  {
    name: 'Grunglar', type: 'Ölümlü', status: 'Kayıt açık',
    description: "Renkli derili, küçük yapılı ve zehirli salgılar taşıyabilen amfibi halk.",
    enDescription: "A small, colourful amphibious people able to produce poisonous secretions.",
    crest: '◒', className: 'skyfolk', link: '/irklar/grunglar'
  },
  {
    name: 'Satyrler', type: 'Fey kökenli', status: 'Kayıt açık',
    description: "Boynuzlu, keçi bacaklı ve fey kökenli humanoid halk.",
    enDescription: "A horned, goat-legged humanoid people of Fey origin.",
    crest: '♩', className: 'skyfolk', link: '/irklar/satyrler'
  },
  {
    name: 'Orclar', type: 'Ölümlü', status: 'Kayıt açık',
    description: "İri, dayanıklı ve belirgin dişleri olan humanoid halk.",
    enDescription: "A large, resilient humanoid people with prominent tusks.",
    crest: '▲', className: 'orc', link: '/irklar/orclar'
  },
  {
    name: 'Hobgoblinler', type: 'Ölümlü', status: 'Kayıt açık',
    description: "Güçlü yapılı, uzun kulaklı goblinoid humanoid halk.",
    enDescription: "A powerfully built goblinoid humanoid people with long ears.",
    crest: '▰', className: 'orc', link: '/irklar/hobgoblinler'
  },
  {
    name: 'Rebornlar', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: "Ölümden dönmüş ya da yeniden yaratılmış, yaşamla ölüm arasında duran kişiler.",
    enDescription: "People returned from death or remade, existing between life and death.",
    crest: '☿', className: 'changed', link: '/irklar/rebornlar'
  },
  {
    name: 'Hexbloodlar', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: "Fey, cadılık ya da kadim büyü etkisiyle dönüşmüş humanoid kişiler.",
    enDescription: "Humanoid people transformed by Fey influence, witchcraft, or ancient magic.",
    crest: '⌘', className: 'changed', link: '/irklar/hexbloodlar'
  },
  {
    name: 'Dhampirler', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: "Vampirik köken ya da dönüşüm nedeniyle kana karşı sıra dışı ihtiyaçları olan kişiler.",
    enDescription: "People with unusual needs for blood because of vampiric ancestry or transformation.",
    crest: '☾', className: 'changed', link: '/irklar/dhampirler'
  },
  {
    name: 'Autognomlar', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: "Gnom biçiminde yapılmış, canlı irade taşıyan küçük yapay halk.",
    enDescription: "A small constructed people made in gnomish form and possessed of living will.",
    crest: '⚙', className: 'changed', link: '/irklar/autognomlar'
  },
  {
    name: 'Goliathlar', type: 'Ölümlü', status: 'Kayıt açık',
    description: "Çok iri, dayanıklı ve yüksek dağ yaşamına uyumlu humanoid halk.",
    enDescription: "A very large, resilient humanoid people adapted to high mountain life.",
    crest: '△', className: 'dwarf', link: '/irklar/goliathlar'
  },
  {
    name: 'Tuz Cüceleri', type: 'Yeraltı', status: 'Kayıt açık',
    description: "Kuru yeraltı havzalarına uyum sağlamış cüce halkı.",
    enDescription: "A Dwarven people adapted to dry underground basins.",
    crest: '◇', className: 'dwarf', image: '/assets/illustrations/tuz-cucesi.png', link: '/irklar/tuz-cuceleri'
  },
  {
    name: 'Gnomlar', type: 'Ölümlü', status: 'Kayıt açık',
    description: "Küçük yapılı, meraklı ve büyü ya da mekanik bilgiye yatkın humanoid halk.",
    enDescription: "A small, curious humanoid people inclined toward magic or mechanical learning.",
    crest: '⚙', className: 'svirfneblin', link: '/irklar/gnomlar'
  },
  {
    name: 'Choldrithler', type: 'Yeraltı', status: 'Kayıt açık',
    description: "Örümcek özellikleri ve ipek üretimiyle tanınan yeraltı humanoidleri.",
    enDescription: "Underground humanoids known for spiderlike traits and silk production.",
    crest: '✣', className: 'drow', image: '/assets/illustrations/choldrith-v1.png', link: '/irklar/choldrithler'
  },
  {
    name: 'Grimlocklar', type: 'Yeraltı', status: 'Kayıt açık',
    description: "Görme yerine işitme, koku ve titreşim algısına dayanan yeraltı humanoidleri.",
    enDescription: "Underground humanoids who rely on hearing, scent, and vibration rather than sight.",
    crest: '◌', className: 'svirfneblin', image: '/assets/illustrations/grimlock-v2.png', link: '/irklar/grimlocklar'
  },
  {
    name: 'Derrolar', type: 'Yeraltı', status: 'Kayıt açık',
    description: "Küçük yapılı, tuhaf görünüşlü ve psişik etkiler taşıyabilen yeraltı humanoidleri.",
    enDescription: "Small, strange-looking underground humanoids capable of psychic influence.",
    crest: '⌁', className: 'svirfneblin', image: '/assets/illustrations/derro-v1.png', link: '/irklar/derrolar'
  },
  {
    name: 'Yuan-ti', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: "Yılan özellikleri taşıyan, humanoid ve serpantin biçimler arasında değişebilen halk.",
    enDescription: "A serpent-blooded people who may possess both humanoid and serpentine forms.",
    crest: '∿', className: 'changed', link: '/irklar/yuan-ti'
  },
  {
    name: 'Yarı-Orclar', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: "İnsan ve orc soylarının kesişiminden gelen humanoid kişiler.",
    enDescription: "Humanoid people of combined human and Orc ancestry.",
    crest: '▲', className: 'orc', link: '/irklar/yari-orclar'
  },
  {
    name: 'Nagalar', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: "Yılan gövdeli, uzun ömürlü ve büyüye yatkın kadim varlıklar.",
    enDescription: "Long-lived, magic-inclined ancient beings with serpentine bodies.",
    crest: '♒', className: 'sea', link: '/irklar/nagalar'
  },
  {
    name: 'Psiyonik Kalıntılar', type: 'Soy ve dönüşüm', status: 'Kayıt açık',
    description: "Psişik ağların ya da zihin büyüsünün kalıcı etkisiyle değişmiş kişiler ve topluluklar.",
    enDescription: "People and communities changed by the enduring effects of psychic networks or mind magic.",
    crest: '◈', className: 'changed', image: '/assets/illustrations/psiyonik-kalinti.png', link: '/irklar/psiyonik-kalintilar'
  },
  {
    name: 'Ejderhalar', type: 'Drakonik', status: 'Kayıt açık',
    description: "Büyük, pullu, büyüyle iç içe yaşayan ve çoğu zaman nefes silahı taşıyan kadim varlıklar.",
    enDescription: "Ancient, large, scaled beings steeped in magic and often capable of a breath weapon.",
    crest: '♢', className: 'dragonborn', link: '/irklar/ejderhalar'
  },
  {
    name: 'Devler ve Fomorianlar', type: 'Fey kökenli', status: 'Kayıt açık',
    description: "İnsanötesi büyüklükte, güçlü ve kadim dev halkları.",
    enDescription: "Ancient giant peoples of immense size and strength.",
    crest: '⛰', className: 'dwarf', link: '/irklar/devler-ve-fomorianlar'
  },
  {
    name: 'Abolethler', type: 'Deniz', status: 'Kayıt açık',
    description: "Suda yaşayan, çok eski hafıza ve güçlü zihinsel yetenekler taşıyan kadim varlıklar.",
    enDescription: "Ancient aquatic beings with vast memories and potent mental abilities.",
    crest: '◉', className: 'sea', image: '/assets/illustrations/aboleth-v1.jpg', link: '/irklar/abolethler'
  },
  {
    name: 'İlk Fey Mirası', type: 'Fey kökenli', status: 'Kayıt açık',
    description: "Doğa, duygu ve kavramlarla iç içe geçmiş kadim fey varlıkları ve soyları.",
    enDescription: "Ancient Fey beings and lineages bound closely to nature, emotion, and ideas.",
    crest: '✦', className: 'eladrin', image: '/assets/illustrations/ilk-fey.png', link: '/irklar/ilk-fey'
  }
]

const peoples = [...corePeople, ...additionalPeople]

const localizedPeople = computed(() => peoples.map((person) => ({
  ...person,
  image: peopleImages[person.link] || person.image,
  name: isEnglish.value ? (person.enName || englishNames[person.link] || person.name) : person.name,
  typeLabel: isEnglish.value ? categories[person.type].en : categories[person.type].tr,
  sourceLabel: sourceLabels[sourceByLink[person.link] || 'unverified'][isEnglish.value ? 'en' : 'tr'],
  description: isEnglish.value ? (person.enDescription || `A recorded ${categories[person.type].en.toLocaleLowerCase('en-US')} people of Avarra.`) : person.description,
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

    <p v-if="filter === 'Fey kökenli'" class="people-fey-note">
      <a :href="withBase(isEnglish ? '/en/kulturler/fey-roads' : '/kulturler/fey-yollari')">{{ isEnglish ? 'What does Fey-linked mean in Avarra?' : 'Avarra’da Fey bağlantılı ne demek?' }}</a>
    </p>

    <div class="people-grid">
      <component :is="person.link ? 'a' : 'article'" v-for="person in visiblePeople" :key="person.name"
        :href="person.link ? withBase(person.link) : undefined" class="people-card" :class="[person.className, { 'is-draft': !person.link }]">
        <div class="people-visual" :class="{ 'has-image': person.image }">
          <img v-if="person.image" :src="withBase(person.image)" :alt="person.name + ' portresi'" />
          <span v-else class="people-crest">{{ person.crest }}</span>
          <span class="people-type">{{ person.typeLabel }}</span>
        </div>
        <div class="people-card-content">
          <span class="people-status">{{ person.sourceLabel }}</span>
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

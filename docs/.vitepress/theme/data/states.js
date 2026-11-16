// Devletler dizini verisi: devletler/index.md ve en/devletler/index.md kartlarından türetildi.
export const stateGroups = {
  crown: { tr: 'Taçlar ve imparatorluklar', en: 'Crowns & empires' },
  union: { tr: 'Cumhuriyetler ve birlikler', en: 'Republics & unions' },
  city: { tr: 'Serbest şehirler', en: 'Free cities' },
  sea: { tr: 'Ada ve deniz devletleri', en: 'Island & sea states' }
}
export const states = [
 {
  "slug": "diken-taci",
  "tr": {
   "name": "Diken Tacı",
   "blurb": "Ormanı egemen varlık kabul eden seçimli monarşi. Kraliçenin dönüşümü iç savaşı yaklaştırıyor."
  },
  "en": {
   "name": "Thorn Crown",
   "blurb": "An elective forest monarchy that treats the forest as sovereign. The queen’s transformation draws civil war closer."
  },
  "flag": "thorn-crown.png",
  "group": "crown",
  "featured": true
 },
 {
  "slug": "ordan-imparatorlugu",
  "tr": {
   "name": "Ordan İmparatorluğu",
   "blurb": "Veyranların kurduğu, kayıt ve ölçüm düzenine dayalı imparatorluk; üçlü veraset savaşı içinde."
  },
  "en": {
   "name": "Ordan Empire",
   "blurb": "A Veyran-founded empire of records and measurement, now caught in a three-sided succession war."
  },
  "flag": "ordan-empire.png",
  "group": "crown",
  "featured": true
 },
 {
  "slug": "nehir-tahti",
  "tr": {
   "name": "Nehir Tahtı",
   "blurb": "Su havzasını siyasi beden sayan anaerkil seçimli monarşi. Kraliçe Samara'nın hastalığı akıntıların yavaşlamasıyla bağlantılı."
  },
  "en": {
   "name": "River Throne",
   "blurb": "An elective matriarchal monarchy that regards a water basin as its political body. Queen Samara’s illness is tied to the slowing currents."
  },
  "flag": "river-throne.png",
  "group": "crown",
  "featured": true
 },
 {
  "slug": "ayaz-sarayi",
  "tr": {
   "name": "Ayaz Tahtı",
   "blurb": "Gölgesiz Cam eşiğini ve buzdan dönen geçmişi denetleyen, korumayı çözülmeyi ertelemek sayan mutlak monarşi."
  },
  "en": {
   "name": "Frost Throne",
   "blurb": "An absolute monarchy that governs Shadowless Glass and the past returning from ice, treating preservation as delayed thaw."
  },
  "flag": "frost-court.png",
  "group": "crown",
  "featured": true
 },
 {
  "slug": "saarin-iki-ejderha-taci",
  "tr": {
   "name": "Saar'ın İki Ejderha Tacı",
   "blurb": "Odraka'da Kızıl Saar ile Mücevher Yemini, ejderha mirasının anlamı üzerine rekabet eder."
  },
  "en": {
   "name": "Two Dragon Crowns",
   "blurb": "Red Saar and the Jewel Oath compete in Odraka over the meaning of dragon heritage."
  },
  "flag": "two-dragon-crowns.jpg",
  "group": "crown",
  "featured": true
 },
 {
  "slug": "dokuz-fener-birligi",
  "tr": {
   "name": "Dokuz Fener Birliği",
   "blurb": "Nimrûn Svirfneblinlerinin dokuz kentli yeraltı konfederasyonu; ses büyüsü ve yanıltıcı tünellerle savunulur."
  },
  "en": {
   "name": "Nine Lantern Union",
   "blurb": "A nine-city underground confederation of Nimrûn Svirfneblin, defended by sound magic and misleading tunnels."
  },
  "flag": "nine-lantern-union.jpg",
  "group": "union",
  "featured": true
 },
 {
  "slug": "qasyrra-imparatorlugu",
  "tr": {
   "name": "Qasyrra İmparatorluğu",
   "blurb": "Kharizha’nın derinlerinde, su hakkı, kast ve Güneş korkusu çevresinde kurulan kadim çok-halklı imparatorluk."
  },
  "en": {
   "name": "Qasyrra Empire",
   "blurb": "An ancient multi-people empire in deep Kharizha, built around water right, caste, and fear of the Sun."
  },
  "flag": "qasyrra.jpg",
  "group": "crown",
  "featured": true
 },
 {
  "slug": "lethar-yildiz-kralligi",
  "tr": {
   "name": "Lethar Yıldız Krallığı",
   "blurb": "Astereth merkezli Yüksek Elf monarşisi."
  },
  "en": {
   "name": "Lethar Star Kingdom",
   "blurb": "High Elf monarchy centred on Astereth."
  },
  "flag": "lethar-star-kingdom.png",
  "group": "crown",
  "featured": false
 },
 {
  "slug": "kar-dur-tas-taci",
  "tr": {
   "name": "Kar-Dur Taş Tacı",
   "blurb": "Ocak meclisleri ve tartışmalı veliaht."
  },
  "en": {
   "name": "Kar-Dur Stone Crown",
   "blurb": "Hearth councils, mountain passes, and a contested heir."
  },
  "flag": "kar-dur.png",
  "group": "crown",
  "featured": false
 },
 {
  "slug": "tuz-ocaklari-cumhuriyeti",
  "tr": {
   "name": "Tuz Ocakları Cumhuriyeti",
   "blurb": "Tuz domları üzerinde oligark meclisi."
  },
  "en": {
   "name": "Salt Hearth Republic",
   "blurb": "An oligarch assembly over salt domes and ancient routes."
  },
  "flag": "salt-hearth-republic.png",
  "group": "union",
  "featured": false
 },
 {
  "slug": "camova-konfederasyonu",
  "tr": {
   "name": "Camova Konfederasyonu",
   "blurb": "Element ocakları ve gezici meclis."
  },
  "en": {
   "name": "Glassplain Confederation",
   "blurb": "Elemental hearths and a travelling assembly."
  },
  "flag": "glassplain-confederation.png",
  "group": "union",
  "featured": false
 },
 {
  "slug": "sis-adalari-cumhuriyeti",
  "tr": {
   "name": "Sis Adaları Cumhuriyeti",
   "blurb": "Yüzsüz ağları, devlet sırları ve sözleşmeli suikastçılarla yaşayan ada cumhuriyeti."
  },
  "en": {
   "name": "Mist Isles Republic",
   "blurb": "An island republic of faceless networks, state secrets, and contract assassins."
  },
  "flag": "mist-isles-republic.jpg",
  "group": "sea",
  "featured": false
 },
 {
  "slug": "altin-gunes-kralligi",
  "tr": {
   "name": "Altıngüneş Krallığı",
   "blurb": "Elf, Satyr ve Ateş Genasi hanelerinin ikiz tacı."
  },
  "en": {
   "name": "Goldensun Kingdom",
   "blurb": "The twin crown of Elven, Satyr, and Fire Genasi houses."
  },
  "flag": "goldensun-kingdom.jpg",
  "group": "crown",
  "featured": false
 },
 {
  "slug": "bakir-prenslikler",
  "tr": {
   "name": "Bakır Prenslikler",
   "blurb": "Elf hanelerinin yönettiği yedi prenslik."
  },
  "en": {
   "name": "Copper Principalities",
   "blurb": "Seven principalities governed by Elven houses."
  },
  "flag": "copper-principalites.png",
  "group": "crown",
  "featured": false
 },
 {
  "slug": "yesil-su-birligi",
  "tr": {
   "name": "Güneşçayır Birliği",
   "blurb": "Halfling özgür şehirlerinin birliği."
  },
  "en": {
   "name": "Sunmeadow Union",
   "blurb": "A union of free Halfling cities."
  },
  "flag": "sunmeadow.jpg",
  "group": "union",
  "featured": false
 },
 {
  "slug": "varkesh",
  "tr": {
   "name": "Varkesh",
   "blurb": "Nareth–Odraka arasındaki ada-kent; savaş kredisi, liman tedariki ve iki anahtarlı devlet düzeni."
  },
  "en": {
   "name": "Varkesh",
   "blurb": "Island-city between Nareth and Odraka: war credit, harbour supply, and a two-key order."
  },
  "flag": "varkesh.jpg",
  "group": "sea",
  "featured": false
 },
 {
  "slug": "kis-ambarlari-serbest-sehri",
  "tr": {
   "name": "Kış Ambarları Serbest Şehri",
   "blurb": "Tahıl, kuşatma malı ve sefer tedarikini krediye çeviren serbest şehir."
  },
  "en": {
   "name": "Free City of Winter Granaries",
   "blurb": "A free city that turns grain, siege goods, and campaign supply into credit."
  },
  "flag": "kis-ambarlari.jpg",
  "group": "city",
  "featured": false
 },
 {
  "slug": "umbraval-serbest-sehri",
  "tr": {
   "name": "Umbraval Serbest Şehri",
   "blurb": "Odraka’nın kuzey kıyısında gölge-emek sicili, deniz geçişi ve tartışmalı savaş sözleşmeleriyle yaşayan bağımsız liman."
  },
  "en": {
   "name": "Free City of Umbraval",
   "blurb": "An independent Odrakan port of shadow-labour registry, sea passage, and disputed war contracts."
  },
  "flag": null,
  "group": "city",
  "featured": false
 },
 {
  "slug": "salvara",
  "tr": {
   "name": "Sâlvara",
   "blurb": "Köle Körfezi’nde ömür hasadı, yıl kasaları ve aktarım ticaretiyle zenginleşen köleci kıyı devleti."
  },
  "en": {
   "name": "Sâlvara",
   "blurb": "A slaveholding coastal state in Slave Bay, enriched by lifespan harvesting, year vaults, and transfer trade."
  },
  "flag": null,
  "group": "city",
  "featured": false
 },
 {
  "slug": "nasima",
  "tr": {
   "name": "Nasima Serbest Şehri",
   "blurb": "Köle Körfezi’nin güney çıkışında, ortak demirleme hukuku ve kıyı emeğiyle yaşayan eski liman şehri."
  },
  "en": {
   "name": "Free City of Nasima",
   "blurb": "An old port at Slave Bay’s southern exit, sustained by common anchorage law and coastal labour."
  },
  "flag": null,
  "group": "city",
  "featured": false
 },
 {
  "slug": "tazir",
  "tr": {
   "name": "Tazir Serbest Şehri",
   "blurb": "Sarnıç payı ve geçiş hukukuyla ayakta duran yarı kurak iç yol şehri."
  },
  "en": {
   "name": "Free City of Tazir",
   "blurb": "A semi-arid inland road city sustained by cistern shares and passage law."
  },
  "flag": null,
  "group": "city",
  "featured": false
 },
 {
  "slug": "nisra",
  "tr": {
   "name": "Nisra Serbest Şehri",
   "blurb": "Vaha kuyularını ortak tutarak özgürlüğünü koruyan eski bahçe şehri."
  },
  "en": {
   "name": "Free City of Nisra",
   "blurb": "An old garden city that protects its freedom by holding its oasis wells in common."
  },
  "flag": null,
  "group": "city",
  "featured": false
 },
 {
  "slug": "kharad",
  "tr": {
   "name": "Kharad Serbest Şehri",
   "blurb": "Kuru kanyon geçidinde, nöbet ve sarnıç hizmetiyle yurttaşlık kuran taş şehir."
  },
  "en": {
   "name": "Free City of Kharad",
   "blurb": "A stone city in a dry canyon pass, where watch service and cistern work create citizenship."
  },
  "flag": null,
  "group": "city",
  "featured": false
 },
 {
  "slug": "kara-muhur-adalari",
  "tr": {
   "name": "Kara Mühür Adaları",
   "blurb": "Uluslararası ödeme zincirini ağırlık, ayar ve güvenilir mühür üzerinden tutan ada devleti."
  },
  "en": {
   "name": "Black Seal Isles",
   "blurb": "An island state holding the international payment chain through weight, fineness, and a trusted seal."
  },
  "flag": "kara-muhur.png",
  "group": "sea",
  "featured": false
 },
 {
  "slug": "kul-esigi",
  "tr": {
   "name": "Kül Eşiği Şövalye Düzeni",
   "blurb": "Eşrenî Kül Şövalyeleri’nin ada egemenliği; sığınma, eğitim, tanıklık ve onarımı birlikte korur."
  },
  "en": {
   "name": "Ash Threshold Knightly Order",
   "blurb": "Island sovereignty of the Eshrenic Ash Knights, protecting refuge, education, witness, and repair together."
  },
  "flag": "ash-threshold.png",
  "group": "sea",
  "featured": false
 }
]

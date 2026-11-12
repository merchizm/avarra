// B katmanı: kriz kişileri. `nameProposed: true` olanların adı kayıtta yoktur, öneridir (rol ve durum kanondur).

const lethar = { tr: 'Lethar Yıldız Krallığı', en: 'Lethar Star Kingdom', link: '/devletler/lethar-yildiz-kralligi' }
const kardur = { tr: 'Kar-Dur Taş Tacı', en: 'Kar-Dur Stone Crown', link: '/devletler/kar-dur-tas-taci' }
const diken = { tr: 'Diken Tacı', en: 'Thorn Crown', link: '/devletler/diken-taci' }

export const figuresB = [
  {
    id: 'valenor', kind: 'regent', nameProposed: true, state: lethar, place: 'Astereth', image: '',
    tr: {
      name: 'Valenor Aelor', role: 'Aelor Hanesi başı · naip adayı',
      canon: 'Aelor, Serel’in korunmasını ve yeni yıldızın tehdit sayılmasını ister. Üç hane çocuk kral adına naiplik için yarışır.',
      appearance: 'Yüksek Elf soylu, uzun boylu ve dik duruşlu bir adam; gümüş saçlarını geriye bağlamış, zırhsız ama askerî bir kesimin giysisini taşıyor.',
      temperament: 'Koruyucu, katı ve kuşkucu; sevdiğini kafese koyar. Yeni yıldızı bir bilmece değil bir saldırı olarak görür.',
      wants: 'Serel’i her şeyden önce güvende tutmak; yeni yıldızı bir tehdit olarak resmen kayda geçirmek.',
      fears: 'Çocuk kralın bir yabancı hanenin veya yeni yıldızın eline düşmesi.',
      voice: 'Kısa, kesin, emir kipinde; çocuğa konuşurken bile komutan gibi.',
      ties: 'Lethar’ın seçkin muhafız kuvvetleri; Serel; Miravel ve Selent ile naiplik rekabeti.',
      hook: 'Valenor, Serel’in haritalarının yasaklanmasını istiyor. Nedenini kimseye söylemiyor, ama kendi doğum haritasında da bir boşluk olduğunu saklıyor.',
      gaps: 'Hane başının gerçek adı ve yaşı kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Valenor Aelor', role: 'Head of House Aelor · regency claimant',
      canon: 'Aelor wants Serel’s protection and the new star treated as a threat. The three houses compete for the regency in the child king’s name.',
      appearance: 'A tall, upright High Elf noble with silver hair tied back, unarmoured but in clothes of military cut.',
      temperament: 'Protective, rigid and suspicious; cages what they love. Sees the new star as an attack, not a riddle.',
      wants: 'To keep Serel safe above all; to officially record the new star as a threat.',
      fears: 'The child king falling into the hands of a foreign house or the new star.',
      voice: 'Short, firm, imperative; like a commander even when speaking to the child.',
      ties: 'Lethar’s elite guard forces; Serel; regency rivalry with Miravel and Selent.',
      hook: 'Valenor wants Serel’s charts banned. He tells no one why, but hides that his own birth chart also has a gap.',
      gaps: 'The house head’s true name and age are not stated in the record.'
    },
    prompt: 'a tall upright high elf noble with long silver hair tied back, stern protective expression, unarmoured military-cut dark blue coat with silver star embroidery, standing guard beside a child-sized throne in a star-lit hall, cold silver-blue light'
  },
  {
    id: 'isavel', kind: 'regent', nameProposed: true, state: lethar, place: 'Miravel bahçeleri', image: '',
    tr: {
      name: 'Isavel Miravel', role: 'Miravel Hanesi başı · naip adayı',
      canon: 'Miravel araştırma, Ayaz Sarayı evliliği ve dış güç ister. Üç hane çocuk kral Serel adına naiplik için yarışır. Miravel bahçeleri Astereth’in bir parçasıdır.',
      appearance: 'Narin, zarif ve hep gülümseyen bir Yüksek Elf kadını; elbisesinde bahçe çiçekleri ve yıldız nakışları iç içe, parmaklarında mürekkep lekeleri var.',
      temperament: 'Meraklı, cazip ve hesaplı; her konuşmayı bir pazarlığa çevirir. Serel’i bir çocuktan çok bir bilgi kaynağı gibi görür.',
      wants: 'Yeni yıldızı araştırmak; Ayaz Sarayı ile evlilik ve dış güç desteği sağlamak.',
      fears: 'Aelor’un yeni yıldızı bir tehdit olarak kayda geçirip araştırmayı yasaklaması.',
      voice: 'Tatlı, çabuk ve nüktedan; sorularla konuşur ve cevabı kendisi tamamlar.',
      ties: 'Miravel bahçeleri, Astereth gözlemevi; Ayaz Tahtı (evlilik görüşmesi); Aelor ve Selent ile rekabet.',
      hook: 'Isavel, Ayaz Sarayı’na gönderdiği evlilik teklifinin gizli bir maddesini Serel’e söylemedi: yeni yıldızın verileri Nivarra’ya devredilecek.',
      gaps: 'Hane başının gerçek adı ve yaşı kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Isavel Miravel', role: 'Head of House Miravel · regency claimant',
      canon: 'Miravel wants research, a Frost Court marriage and foreign backing. The three houses compete for the regency in child king Serel’s name. The Miravel gardens are part of Astereth.',
      appearance: 'A slender, graceful, ever-smiling High Elf woman; garden flowers and star embroidery are interwoven on her dress, ink stains on her fingers.',
      temperament: 'Curious, charming and calculating; turns every conversation into a bargain. Sees Serel less as a child than as a source of knowledge.',
      wants: 'To research the new star; to secure the Frost Court marriage and foreign backing.',
      fears: 'That Aelor will record the new star as a threat and ban research.',
      voice: 'Sweet, quick and witty; speaks in questions and finishes the answer herself.',
      ties: 'The Miravel gardens, Astereth observatory; the Frost Throne (marriage talks); rivalry with Aelor and Selent.',
      hook: 'Isavel did not tell Serel of a secret clause in the marriage offer sent to the Frost Court: the new star’s data would be transferred to Nivarra.',
      gaps: 'The house head’s true name and age are not stated in the record.'
    },
    prompt: 'a slender graceful high elf noblewoman with a bright knowing smile, dark hair braided with small flowers, a dress with interwoven garden blossoms and star embroidery, ink-stained fingers, standing in a night-garden observatory, soft violet-blue light'
  },
  {
    id: 'dwennar', kind: 'regent', nameProposed: true, state: lethar, place: 'Astereth alt terasları', image: '',
    tr: {
      name: 'Dwennar Selent', role: 'Selent Hanesi başı · naip adayı',
      canon: 'Selent; Gnom mühendislerini, tüccarları, alt teras suyunu ve teknik temsil reformunu taşır. Üç hane çocuk kral adına naiplik için yarışır.',
      appearance: 'Bir Şehir Gnomu: ufak yapılı, iri burunlu, kıvırcık saçlı ve yuvarlak gözlüklü; ceketinde mürekkep-yağ lekeleri var. Bir elinde ölçü şeridi, diğerinde bir su ölçüm çubuğu.',
      temperament: 'Pratik, alçak gönüllü ve ısrarcı; soyluluk gösterişini sevmez. Naipliği bir iktidar değil bir su dağıtımı problemi gibi görür.',
      wants: 'Alt terasların su düzenini ve teknik temsil reformunu hayata geçirmek.',
      fears: 'Yüksek Elf hanelerinin Gnom mühendislerin ve tüccarların sesini yine bir “hizmet” saymaya devam etmesi.',
      voice: 'Düz, hızlı ve pratik; sayıları ve yöntemleri önce söyler, gerekçeyi sonra.',
      ties: 'Gnom mühendisleri ve tüccarlar; alt teras suyu; Dokuz Kanal; Serel (ona su haritası öğretiyor).',
      hook: 'Dwennar, alt terasların suyunun yıldız haritalarıyla senkron olduğunu fark etti; yeni yıldız doğduğundan beri akış 17 dakika kaymış.',
      gaps: 'Hane başının gerçek adı ve yaşı kayıtlarda belirtilmez; Gnom olup olmadığı yazılı değildir.'
    },
    en: {
      name: 'Dwennar Selent', role: 'Head of House Selent · regency claimant',
      canon: 'Selent carries the Gnome engineers, the merchants, the lower-terrace water and technical representation reform. The three houses compete for the regency in the child king’s name.',
      appearance: 'A City Gnome: small-statured, big-nosed, curly-haired and round-spectacled, with ink-and-oil stains on the coat. A measuring tape in one hand, a water gauge in the other.',
      temperament: 'Practical, modest and persistent; dislikes noble display. Sees the regency not as power but as a water-distribution problem.',
      wants: 'To carry out the lower-terrace water order and technical representation reform.',
      fears: 'That the High Elf houses will keep counting Gnome engineers’ and merchants’ voices as “service”.',
      voice: 'Flat, quick and practical; states figures and methods first, the reasoning after.',
      ties: 'Gnome engineers and merchants; lower-terrace water; the Nine Canals; Serel (they teach him water-mapping).',
      hook: 'Dwennar noticed the lower terraces’ water flow is synchronised with the star charts; since the new star appeared the flow has drifted by seventeen minutes.',
      gaps: 'The house head’s true name and age are not stated; whether they are Gnome is not written.'
    },
    prompt: 'a practical gnome engineer-noble, small stature with a large nose, curly hair and small round spectacles, a coat with ink and oil stains, a measuring tape in one hand and a water gauge in the other, kind stubborn expression, standing in a terrace workshop with brass pipes and water channels, warm brass light'
  },
  {
    id: 'dagna', kind: 'regent', nameProposed: true, state: kardur, place: 'Kar-Dur', image: '',
    tr: {
      name: 'Dagna', role: 'Doran’un küçük kardeşi · fiilî devleti taşıyan',
      canon: 'Doran yokken veliaht olarak yetişen ve fiilen devleti taşıyan kardeş; çevresi ahlâkî hakkını savunur. Doran’ın dönüşü onun konumunu belirsizleştiriyor.',
      appearance: 'Yaşını gösteren, yorgun ama dik duran bir Dağ Cücesi; sakalı iki örgüde, taşıdığı tek taç, tahtın değil bir muhafızın zinciri.',
      temperament: 'Yük taşıyan, sabırlı ve suskun; ağabeyine karşı sevgi ve ağır bir kırgınlık karışık. Hak iddia etmez ama bırakmaz da.',
      wants: 'Doran’ı kaybetmeden, onun yokluğunda taşıdığı yükü hak etmiş saymak.',
      fears: 'Yük taşıdığı yılların bir hata olarak kayda geçmesi; Doran’ın gerçek Doran olmaması.',
      voice: 'Düşük sesli, ölçülü ve tekrarlı; her cümleyi biraz önce söylenmiş gibi bitirir.',
      ties: 'Taş Tacı yönetimi; Doran; Küçük kardeşin çevresi (kendi siyasi grubu); Dokuz Kasa muhafızları.',
      hook: 'Dagna, Doran’ın getirdiği mühürlerden birinin kendi mührüyle uyuştuğunu fark etti; kimseye söylemedi.',
      gaps: 'Adı, yaşı ve cinsiyeti kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Dagna', role: 'Doran’s younger sibling · carries the state in practice',
      canon: 'The sibling who grew up as heir in Doran’s absence and carries the state in practice; their circle defends their moral right. Doran’s return makes their position uncertain.',
      appearance: 'A tired but upright Mountain Dwarf showing their years; beard in two braids, the only crown they wear a guardian’s chain, not a throne’s.',
      temperament: 'Burden-bearing, patient and silent; love and a heavy grievance mingled toward their sibling. They claim no right but do not let go.',
      wants: 'To count the burden carried in Doran’s absence as earned, without losing Doran.',
      fears: 'That the years carried will be recorded as a mistake; that Doran is not truly Doran.',
      voice: 'Low, measured and repetitive; ends each sentence as if it had just been said.',
      ties: 'The Stone Crown administration; Doran; the Younger Sibling’s circle (their own political group); the Nine Vaults guardians.',
      hook: 'Dagna noticed that one of the seals Doran brought matches their own seal and told no one.',
      gaps: 'Her name, age and gender are not stated in the record.'
    },
    prompt: 'a tired but upright mountain dwarf with a beard in two braids, a plain guardian’s chain in place of a crown, dark practical court robes with stone-grey embroidery, weary steady eyes, standing in a vaulted stone hall lit by lanterns, warm amber light'
  },
  {
    id: 'thorgun', kind: 'faction', nameProposed: true, state: kardur, place: 'Demirkök', image: '',
    tr: {
      name: 'Thorgun Demirkök', role: 'Taç Ocakları sözcüsü',
      canon: 'Taç Ocakları monarşiyi ve Doran’ın hakkını savunur. Demirkök, Diken Tacı sınırındaki kök ve maden damarlarını işleyen Taç Ocakları eğilimli yerleşimdir.',
      appearance: 'Yaşlı, geniş omuzlu ve kalın parmaklı bir madenci-sözcü; sakalı kurum lekeli, taşıdığı tek süs Taş Tacı mührü.',
      temperament: 'Sadık, inatçı ve duygusal; monarşiyi bir siyasi görüş değil bir yemin sayar.',
      wants: 'Doran’ın hakkını resmen tanıtmak ve monarşinin yokluğunda kurulmuş her kararı geçersiz kılmak.',
      fears: 'Doran’ın gerçek veliaht olmadığının kanıtlanması.',
      voice: 'Gür, sert ve duygusal; fiziksel olarak masaya vurur.',
      ties: 'Demirkök ve Diken Tacı sınırı; Taç Ocakları; Doran.',
      hook: 'Thorgun’un ocağında Doran’ın kaybolmadan önceki sesiyle konuşan bir madenci ortaya çıktı. Thorgun onu saklıyor.',
      gaps: 'Adı ve yaşı kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Thorgun Ironroot', role: 'Speaker of the Crown Hearths',
      canon: 'The Crown Hearths defend the monarchy and Doran’s right. Ironroot is a Crown-Hearths-leaning settlement working the root and mine veins on the Thorn Crown border.',
      appearance: 'An elderly broad-shouldered, thick-fingered miner-speaker; soot-stained beard, the only ornament the Stone Crown seal.',
      temperament: 'Loyal, stubborn and emotional; counts monarchy as an oath, not a political view.',
      wants: 'To have Doran’s right officially recognised and to void every decision made in the monarchy’s absence.',
      fears: 'Proof that Doran is not the true heir.',
      voice: 'Loud, harsh and emotional; physically strikes the table.',
      ties: 'Ironroot and the Thorn Crown border; the Crown Hearths; Doran.',
      hook: 'A miner has appeared at Thorgun’s hearth who speaks in Doran’s voice from before he vanished. Thorgun is hiding him.',
      gaps: 'Name and age are not stated in the record.'
    },
    prompt: 'an elderly broad-shouldered dwarf miner-speaker with a soot-stained grey beard, thick fingers, a stone-crown seal at his chest, fierce emotional expression, standing in a smoky mine hearth hall, warm orange forge light'
  },
  {
    id: 'ildra', kind: 'faction', nameProposed: true, state: kardur, place: 'Yedi Baca', image: '',
    tr: {
      name: 'Usta Ildra Derinölçü', role: 'Derin Ustalar sözcüsü',
      canon: 'Derin Ustalar Doran’ın yaşlanmamasını antik yol, zaman sapması ya da bilinmeyen büyüyle açıklar ve teknik inceleme ister. Yedi Baca Derin Ustalar eğilimli ana havalandırma yerleşimidir.',
      appearance: 'Ufak tefek, dikkatli bir Dağ Cücesi kadını; gözlükleri bir ölçü aleti gibi taşınıyor, ceketi yağ ve mürekkep lekeli.',
      temperament: 'Kararlı, titiz ve meraklı; bilgi için kuralı eğer, ama kimseyi tehlikeye atmaz. Doran’ı bir kişi değil, açıklanmamış bir veri olarak görmekten utanıyor.',
      wants: 'Doran’ın yaşlanmama nedenini ölçmek; antik yol teorisini sınamak.',
      fears: 'Doran’ın incelemeye kapalı kalması; Yeminlilerin Yedi Baca’yı rehin alması.',
      voice: 'Hızlı ve teknik; her cümlede ölçü birimi, her soruda önce sayı.',
      ties: 'Yedi Baca; Derin Ustalar; Doran; antik yol teorisi.',
      hook: 'Ildra Doran’ın nefesinin Yedi Baca’nın havalandırma akışıyla uyumlu olduğunu ölçtü. Bunu rapor etmek şehri rehin almak anlamına gelebilir.',
      gaps: 'Adı ve yaşı kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Master Ildra Deepgauge', role: 'Speaker of the Deep Masters',
      canon: 'The Deep Masters explain Doran’s lack of aging by an ancient road, time drift or unknown magic and call for technical examination. Seven Chimneys is a Deep-Masters-leaning main ventilation settlement.',
      appearance: 'A small, careful Mountain Dwarf woman; her spectacles are carried like a measuring tool, her jacket stained with oil and ink.',
      temperament: 'Resolute, meticulous and curious; bends rules for knowledge but endangers no one. Ashamed of seeing Doran as unexplained data, not a person.',
      wants: 'To measure why Doran does not age; to test the ancient-road theory.',
      fears: 'Doran remaining closed to examination; the Oathbound taking Seven Chimneys hostage.',
      voice: 'Fast and technical; a unit of measure in every sentence, a number first in every question.',
      ties: 'Seven Chimneys; the Deep Masters; Doran; the ancient-road theory.',
      hook: 'Ildra measured that Doran’s breath is in step with Seven Chimneys’ ventilation flow. Reporting it could mean holding the city hostage.',
      gaps: 'Name and age are not stated in the record.'
    },
    prompt: 'a small careful dwarf woman engineer with round measuring spectacles, grey-streaked braided hair, an oil-and-ink-stained jacket, holding a brass gauge instrument, curious focused expression, standing in a vast ventilation chamber of copper pipes, warm brass-green light'
  },
  {
    id: 'orrak', kind: 'faction', nameProposed: true, state: kardur, place: 'Kışyarığı', image: '',
    tr: {
      name: 'Mühürbekçi Orrak', role: 'Yeminliler sözcüsü',
      canon: 'Yeminliler kapatılmış yolların kapalı kalmasını, Doran gerçek olsa bile getirdiklerinin şehre sokulmamasını savunur.',
      appearance: 'Yaşlı, zırhsız ama taş mühürlerle örülmüş bir cüppe giyen, kemikli ve sert çizgili bir Dağ Cücesi; gözleri kapalı yolların haritasını ezbere biliyor gibi.',
      temperament: 'Dindar, kararlı ve acımasız bir nezaketle konuşur; yeminini şehirden önce tutar.',
      wants: 'Kapalı yolların ve Kör Madenler’in kapalı kalmasını; Doran’ın getirdiklerinin şehre girmesini engellemek.',
      fears: 'Açıcıların bir yolu açıp geri dönülmez bir şey salması.',
      voice: 'Ağır, törensel ve eski bir Kar-Dur lehçesiyle; yeminleri tekrarlayarak konuşur.',
      ties: 'Kışyarığı; Taş Tacı Geçidi savunması; Yeminliler; Kör Madenler.',
      hook: 'Orrak, Doran’ın getirdiği eşyalardan birinin eski bir yeminli mühürüne ait olduğunu biliyor. Bu mühür bir yolu mühürlemek için mi, açmak için mi kullanılmıştı?',
      gaps: 'Adı ve yaşı kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Sealkeeper Orrak', role: 'Speaker of the Oathbound',
      canon: 'The Oathbound want closed roads to stay closed and want what Doran brought kept out of the city, even if he is real.',
      appearance: 'An elderly bony, hard-lined Mountain Dwarf, unarmoured but robed in woven stone seals; his eyes seem to know the map of the closed roads by heart.',
      temperament: 'Devout, resolute and speaking with ruthless courtesy; keeps his oath before the city.',
      wants: 'For the closed roads and the Blind Mines to stay closed; to keep Doran’s belongings out of the city.',
      fears: 'The Openers opening a road and releasing something that cannot be undone.',
      voice: 'Heavy, ceremonial and in an old Kar-Dur dialect; speaks by repeating oaths.',
      ties: 'Winter Rift; the Stone Crown Pass defence; the Oathbound; the Blind Mines.',
      hook: 'Orrak knows one of the items Doran brought belongs to an old Oathbound seal. Was that seal used to close a road or to open one?',
      gaps: 'Name and age are not stated in the record.'
    },
    prompt: 'an elderly bony hard-lined dwarf in robes woven with small stone seals, deep-set eyes, solemn devout expression, one hand resting on a sealed iron door, standing in a narrow torch-lit tunnel, deep amber and shadow light'
  },
  {
    id: 'bessa', kind: 'faction', nameProposed: true, state: kardur, place: 'Bakırbasamak', image: '',
    tr: {
      name: 'Kervancı Bessa', role: 'Açıcılar sözcüsü',
      canon: 'Açıcılar antik yolları, Ordan ve Dokuz Fener ile teknik iş birliğini ve kayıp güzergâh üzerinden yeni ticareti ister. Bakırbasamak bir kervan aktarım merkezidir.',
      appearance: 'Orta yaşlı, bronz tenli, gözleri parlak bir Dağ Cücesi kadını; kemerinde pusula ve kervan mühürleri, sakalı kısa örgülü.',
      temperament: 'Cesur, girişken ve iyimser; tehlikeyi hesap eder, korkmaz. Kapalı yolları bir yasak değil, bir fırsat olarak görür.',
      wants: 'Antik yolları açıp Ordan ve Dokuz Fener ile ticareti yeniden kurmak.',
      fears: 'Yeminlilerin yolları kalıcı olarak sızdırmaz mühürlemesi.',
      voice: 'Hızlı, sıcak ve ikna edici; her cümleyi bir plan gibi bitirir.',
      ties: 'Bakırbasamak; Kırık Örs (Açıcı-Yeminli bölünmesi); Ordan ve Dokuz Fener ile teknik iş birliği.',
      hook: 'Bessa’nın elindeki kayıp güzergâh haritası Doran’ın getirdiği bir haritayla çakışıyor; hangisi önce çizildi bilmiyor.',
      gaps: 'Adı ve yaşı kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Caravaner Bessa', role: 'Speaker of the Openers',
      canon: 'The Openers want the ancient roads, technical cooperation with Ordan and the Nine Lanterns, and new trade over the lost route. Copper Step is a caravan transfer hub.',
      appearance: 'A middle-aged bronze-skinned, bright-eyed Mountain Dwarf woman; compass and caravan seals at her belt, beard in short braids.',
      temperament: 'Brave, outgoing and optimistic; calculates danger, does not fear it. Sees closed roads not as a prohibition but as an opportunity.',
      wants: 'To open the ancient roads and re-establish trade with Ordan and the Nine Lanterns.',
      fears: 'The Oathbound sealing the roads permanently shut.',
      voice: 'Fast, warm and persuasive; ends each sentence like a plan.',
      ties: 'Copper Step; Broken Anvil (the Opener-Oathbound split); technical cooperation with Ordan and the Nine Lanterns.',
      hook: 'The lost-route map Bessa holds coincides with a map Doran brought; she does not know which was drawn first.',
      gaps: 'Name and age are not stated in the record.'
    },
    prompt: 'a middle-aged bronze-skinned bright-eyed mountain dwarf woman caravaner with short braided beard, a compass and caravan seals at her belt, optimistic daring expression, standing at a mountain caravan terrace overlooking a pass, warm copper light'
  },
  {
    id: 'ilmara', kind: 'faction', nameProposed: true, state: diken, place: 'Soluk Çanak', image: '',
    tr: {
      name: 'Ilmara Soluk', role: 'Solgun Çember önderi',
      canon: 'Diken Tacı’nın Durgunluk’u araştıran topluluğu. Durgunluğu yaşamın asıl hastalığı sayar ve eski antlaşmaların yeni koşullarda yenilenmesi gerektiğini ileri sürer. İlk toplantısı Beşinci Krallığın silindiği günlerin ardından yapıldı.',
      appearance: 'Soluk tenli, derin gözlü, yaşlı bir Orman Elfi; saçı zamanla ağarmış ama hâlâ gür, boynunda kök örgüsünden bir kolye.',
      temperament: 'Sakin, derin ve ürpertici derecede kararlı; Durgunluğu bir felaket değil bir hastalık gibi tedavi edilecek bir şey sayar.',
      wants: 'Antlaşmaları yenileyerek Durgunluğu geri çevirmek.',
      fears: 'Durgunluğun yalnız Nareth’te değil, ormanın içinde de yayılması.',
      voice: 'Soluk, yavaş ve yalnız sorulduğunda konuşur; cümleleri sakin birer ilaç gibi.',
      ties: 'Solgun Çember; Diken Tacı; Soluk Çanak’taki karakollar ve araştırma kampları; Elyra.',
      hook: 'Ilmara, kraliçenin dönüşümünün antlaşma bedeli değil, Durgunluğa karşı eski bir tedavi olduğuna inanıyor. Bunu kimseye kanıtlayamıyor.',
      gaps: 'Çemberin üye sayısı ve önderi kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Ilmara Wan', role: 'Leader of the Pale Circle',
      canon: 'The Thorn Crown’s society for researching Stagnation. It considers Stagnation life’s actual sickness and argues that even old treaties may need renewing in new conditions. Its first meeting followed the days the Fifth Kingdom was erased.',
      appearance: 'A pale-skinned, deep-eyed, elderly Wood Elf; hair grey with time yet still thick, a necklace of woven root at the neck.',
      temperament: 'Calm, deep and chillingly resolute; treats Stagnation not as a catastrophe but as a sickness to be treated.',
      wants: 'To turn back Stagnation by renewing the treaties.',
      fears: 'That Stagnation will spread not only in Nareth but inside the forest.',
      voice: 'Pale, slow and speaking only when asked; sentences like calm medicines.',
      ties: 'The Pale Circle; the Thorn Crown; checkpoints and research camps around the Pale Basin; Elyra.',
      hook: 'Ilmara believes the queen’s transformation is not the treaty’s price but an old cure against Stagnation. She cannot prove it to anyone.',
      gaps: 'The Circle’s membership and leader are not stated in the record.'
    },
    prompt: 'a pale elderly wood elf scholar with deep-set eyes, thick grey hair, a necklace of woven root, plain forest-green robes, calm chilling resolve, standing at the edge of a dry basin at dawn with faint mist, muted green-grey light'
  },
  {
    id: 'kizil-av', kind: 'threat', state: diken, place: 'Kör Kökler', image: '',
    tr: {
      name: 'Kızıl Av’ın Önderi', role: 'Kızıl Av’ı yöneten kimlik',
      canon: 'Kızıl Av SS 78’de ortaya çıktı ve Kör Köklerde insanları hedef aldı. Taht Ağacı’nda insan adlarına benzeyen işaretler belirdiği anlatılır. Onu kimin yönettiği ve neden saldırdığı kayıtlarda yoktur; bu kişi bilinmeyen bir kimliğin yüzüdür.',
      appearance: 'Boynuzlu bir silüet: ya kızıl pullu bir başlık, ya da gerçek boynuzlar. Yüzünü örten, kök örgüsü bir maske.',
      temperament: 'Soğuk, sessiz ve amaçlı; konuşmaz, işaret bırakır. Her saldırıdan sonra bir isim bırakır.',
      wants: 'Bilinmiyor: insanları hedef alıyor ve Taht Ağacı’nın işaretleriyle bağlı.',
      fears: 'Bilinmiyor.',
      voice: 'Duyulmaz; yalnız kök ve yaprak işaretleri, kuş çığlıkları ve ayak izleriyle iletişim.',
      ties: 'Kör Kökler; Taht Ağacı’ndaki işaretler; Diken Tacı devriyeleri; Yabanocak.',
      hook: 'Kızıl Av’ın bırakacağı isimlerden biri, Elyrakök’te yaşayan bir insana ait. Sahibi henüz bunu bilmiyor.',
      gaps: 'Önder, hedef, amaç ve ırk; Kızıl Av’ın tek bir kişi tarafından yönetilip yönetilmediği bile bilinmez.'
    },
    en: {
      name: 'Leader of the Crimson Hunt', role: 'The identity that drives the Crimson Hunt',
      canon: 'The Crimson Hunt appeared in SS 78 and targeted humans in the Blind Roots. Marks resembling human names are said to have appeared on the Throne Tree. Who leads it and why it strikes are not in the record; this is the face of an unknown identity.',
      appearance: 'A horned silhouette: either a crimson-scaled helm or real horns. A mask of woven roots over the face.',
      temperament: 'Cold, silent and purposeful; does not speak, leaves marks. Leaves a name after every strike.',
      wants: 'Unknown: targets humans and is tied to the Throne Tree’s marks.',
      fears: 'Unknown.',
      voice: 'Unheard; communicates only through root-and-leaf signs, bird calls and footprints.',
      ties: 'The Blind Roots; marks on the Throne Tree; Thorn Crown patrols; Wildhearth.',
      hook: 'One of the names the Hunt will leave belongs to a human living in Elyrakök. The owner does not yet know.',
      gaps: 'The leader, target, purpose and people; whether the Hunt is led by a single person is not even known.'
    },
    prompt: 'a tall horned silhouette in a mask woven from red-stained roots, crimson-scaled hooded cloak, faint antlers or horns, standing motionless in a dark root-tangled forest clearing at dusk, deep red and black light, ominous atmosphere'
  },
  {
    id: 'perah', kind: 'scholar', nameProposed: true, state: { tr: 'Nehir Tahtı', en: 'River Throne', link: '/devletler/nehir-tahti' }, place: 'Soluk Çanak', image: '',
    tr: {
      name: 'Perah Halven', role: 'Durgunluk saha araştırmacısı',
      canon: 'Durgunluk alanında doğal süreçler amaçlarına ulaşamaz; ortak olaylar silinebilir. Gezgin rehberi şunu der: kendi adınızı ve son üç günü yazılı taşıyın, hatıraları ekip arkadaşlarıyla karşılaştırın, tek başına yolculuk etmeyin. Nehir Tahtı Durgunluğu su yollarına tehdit sayar ve geniş sivil gözlem ağı kurar.',
      appearance: 'Orta yaşlı, dikkatli bir insan kadın; her yerde bir deftere yazıyor, giysisinde çeşitli kuş tüyleri ve bir su şişesi var. Bileğinde “Perah” yazılı bir bant.',
      temperament: 'Merak dolu, sabırlı ve ürkek bir cesaretle çalışır; hatıralarının silinmesinden her gün biraz daha korkuyor.',
      wants: 'Beşinci Krallığın adını silinmeden kayda geçirmeye çalışmak; Durgunluk’un neden başladığını bulmak.',
      fears: 'Kendi adını ve son üç günü unutması.',
      voice: 'Yumuşak ve düzenli; her cümleyi bir önceki cümleyi doğrulayarak başlatır.',
      ties: 'Nehir Tahtı gözlem ağı; Soluk Çanak çevresindeki karakollar; Solgun Çember (rekabet ve iş birliği).',
      hook: 'Perah’ın defterinde yazdığı bir cümleyi hatırlamıyor; el yazısı kendisine ait. Cümle, Beşinci Krallığın adı olabilir.',
      gaps: 'Adı ve yaşı belirtilmez; Nehir Tahtı için çalışıp çalışmadığı yazılı değildir.'
    },
    en: {
      name: 'Perah Halven', role: 'Stagnation field researcher',
      canon: 'In a Stagnation zone, natural processes cannot reach their ends; shared events can be erased. The traveller’s guide says: carry your own name and the last three days in writing, compare memories with companions, never travel alone. The River Throne counts Stagnation a threat to its waterways and runs a wide civilian observation network.',
      appearance: 'A middle-aged, careful human woman who writes in a notebook everywhere; assorted bird feathers and a water flask on her clothes. A wristband reads “Perah”.',
      temperament: 'Curious, patient and working with a fearful courage; each day she fears a little more the erasure of her memories.',
      wants: 'To record the Fifth Kingdom’s name before it is erased; to find why Stagnation began.',
      fears: 'Forgetting her own name and the last three days.',
      voice: 'Soft and orderly; begins each sentence by confirming the previous one.',
      ties: 'The River Throne observation network; checkpoints around the Pale Basin; the Pale Circle (rivalry and cooperation).',
      hook: 'Perah does not remember a sentence in her notebook; the handwriting is her own. The sentence may be the Fifth Kingdom’s name.',
      gaps: 'Name and age are not stated; whether she works for the River Throne is not written.'
    },
    prompt: 'a middle-aged careful human woman field researcher with a worn notebook in hand, bird feathers and a water flask on her travel coat, a wristband with her name written on it, anxious but determined expression, standing at the edge of a dry sea basin, muted dusty light'
  }
]

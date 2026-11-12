import { figuresA } from './figures-a.js'
import { figuresB } from './figures-b.js'
import { figuresC } from './figures-c.js'

// Kişi kayıtları. `canon` alanı wiki'de yazan gerçeklerdir; görünüm, karakter, konuşma ve kanca alanları
// kanonda yazılı değilse ÖNERİDİR. `gaps` kanonda hâlâ açık olan soruları listeler.
// `prompt` yalnız özneyi anlatır; ortak stil `figureStyle` ile başa eklenir. Portre hazır olunca `image` yazılır.

export const figureStyle = 'Painterly fantasy character portrait, bust composition, hand-inked linework with a muted earthy palette (ochre, rust, moss green, slate), soft paper-grain texture, desaturated grey-green textured backdrop, soft dramatic side lighting, richly detailed costume, serious expressive face, in the style of a modern illustrated tabletop RPG sourcebook, vertical 2:3 aspect ratio, no text, no watermark.'

export const figureLabels = {
  tr: { all: 'Tümü', canon: 'Kayıtta', appearance: 'Görünüm', temperament: 'Karakter', wants: 'İstediği', fears: 'Çekindiği', voice: 'Konuşma', ties: 'Bağlar', hook: 'Macera kancası', gaps: 'Kanonda açık', prompt: 'Portre promptu', copy: 'Promptu kopyala', done: 'Kopyalandı', open: 'Kişi sayfası', back: '← Tüm kişiler', empty: 'Portre bekleniyor', note: 'Görünüm, karakter, konuşma ve kanca alanları, kanon sustuğu yerde öneridir.', proposed: 'Ad önerisidir; rol ve durum kanondur.', people: 'Halk', peopleProposed: 'öneri' },
  en: { all: 'All', canon: 'In the record', appearance: 'Appearance', temperament: 'Character', wants: 'Wants', fears: 'Fears', voice: 'Voice', ties: 'Ties', hook: 'Adventure hook', gaps: 'Open in canon', prompt: 'Portrait prompt', copy: 'Copy prompt', done: 'Copied', open: 'Open profile', back: '← All figures', empty: 'Portrait pending', note: 'Appearance, character, voice and hook are proposals wherever canon is silent.', proposed: 'The name is a proposal; role and situation are canon.', people: 'People', peopleProposed: 'proposed' }
}

export const figureFields = ['appearance', 'temperament', 'wants', 'fears', 'voice', 'ties', 'hook', 'gaps']

export const figureKinds = {
  ruler: { tr: 'Hükümdar', en: 'Ruler' },
  claimant: { tr: 'Aday', en: 'Claimant' },
  regent: { tr: 'Naip', en: 'Regent' },
  faction: { tr: 'Grup sözcüsü', en: 'Faction' },
  scholar: { tr: 'Araştırmacı', en: 'Scholar' },
  threat: { tr: 'Tehdit', en: 'Threat' },
  kin: { tr: 'Hanedan', en: 'Royal kin' },
  heir: { tr: 'Veliaht', en: 'Heir' },
  council: { tr: 'Meclis', en: 'Council' },
  historic: { tr: 'Tarihî', en: 'Historic' }
}

const core = [
  {
    id: 'elyra', kind: 'ruler', state: { tr: 'Diken Tacı', en: 'Thorn Crown', link: '/devletler/diken-taci' }, place: 'Elyrakök', image: '',
    tr: {
      name: 'Elyra Dikenruh', role: 'Diken Tacı Kraliçesi',
      canon: 'Kırk yıl önceki bir antlaşma yüzünden yavaşça canlı bir ağaca dönüşüyor. Halef açıklamadı; hangi sözün hâlâ geçerli olduğu tartışması bir veraset krizine döndü. Güç fiilen Taç Meclisi, Kök Dinleyicileri, Geyikgeçidi Kumandanlığı, Alt Dal Ağları ve Koruluk Temsilcileri arasında paylaşılıyor.',
      appearance: 'Teni kabuğa, saçları sürgüne dönüşen yaşlı bir kraliçe. Dönüşüm el ve boyundan başlamış; bir gözü hâlâ insan gibi bakıyor, ötekinde reçine damlıyor.',
      temperament: 'Sakin, ağır ve ölçülü; kararını yavaş verir ve verdiğini geri almaz. Dönüşümü yenilgi saymaz, ama kimseye öğretmediği bir yük gibi taşır.',
      wants: 'Antlaşmanın bedelini ödemeden önce ormanın yeminlerini ve halefini güvenceye almak.',
      fears: 'Sözünü yenileyecek birinin çıkmaması; ağaca dönüştüğünde kendi iradesinin kalıp kalmayacağı.',
      voice: 'Alçak, yavaş ve boşluklu konuşur; cümleleri bitirmez, yaprak hışırtısı gibi sessizliğe bırakır.',
      ties: 'Taht Ağacı ve Fey yolları çapası; Dikenkanlı ustalar dönüşümü yeni bir evrim sayan ilk topluluktur; Kızıl Av’a karşı koruma sorumluluğu kayıtlı.',
      hook: 'Taht Ağacı’nın en uzak kökleri yenilenmemiş bir antla titriyor. Hangi hanenin yeminini taşıdığını yalnız kraliçenin bilmesi gerekiyor, ama o artık cevap vermiyor.',
      gaps: 'Irkı, yaşı ve antlaşmanın karşı tarafı kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Elyra Thornspirit', role: 'Queen of the Thorn Crown',
      canon: 'A treaty made forty years ago is slowly turning her into a living tree. She has named no successor; the question of which promise still binds became a succession crisis. Power in practice is shared among the Crown Council, Root Listeners, Staggate Command, Underbranch Networks, and Grove Representatives.',
      appearance: 'An elderly queen whose skin is turning to bark and whose hair is turning to shoots. The change began at her hands and neck; one eye still looks human, the other weeps resin.',
      temperament: 'Calm, heavy and measured; she decides slowly and never takes a decision back. She does not count the change as defeat, but carries it like a burden she has taught no one.',
      wants: 'To secure the forest’s oaths and a successor before the treaty’s price comes due.',
      fears: 'That no one will renew her word; that when she becomes the tree, her will may not remain.',
      voice: 'Low, slow and gapped; she leaves sentences unfinished, like leaves trailing into silence.',
      ties: 'The Throne Tree and the Fey-road anchor; the Thornblood masters were the first to read the change as a new evolution; she is on record as responsible for protection against the Crimson Hunt.',
      hook: 'The Throne Tree’s farthest roots tremble with an unrenewed oath. Only the queen should know which house’s promise it carries, but she no longer answers.',
      gaps: 'Her people, her age, and the other party to the treaty are not stated in the record.'
    },
    prompt: 'an elderly wood elf queen of the Thorn Crown with long pointed ears, slowly turning into a living tree, bark-like skin on her hands and neck, hair becoming leafy shoots, one human-like eye and one eye weeping amber resin, crown of thorned branches, robes of moss and woven bark, solemn serene expression, deep forest light'
  },
  {
    id: 'samara', kind: 'ruler', state: { tr: 'Nehir Tahtı', en: 'River Throne', link: '/devletler/nehir-tahti' }, place: 'Namaris', image: '',
    tr: {
      name: 'Samara', role: 'Nehir Tahtı Kraliçesi',
      canon: 'Hareketi ve nabzı akıntılarla birlikte yavaşlıyor; teninde su çizgileri belirdi, saray çevresi durgunlaştı. Normalde bütün kolları dolaşan Taht haftalardır yerinde; bu, hareketsiz Tahtın görevini yapmadığı düşüncesini doğurdu.',
      appearance: 'Su Genasisi. Şu anki hâlinde teni solgun gri-yeşil, nemli bir sedef parıltısında; saçları damlayıp akan, ama artık yavaşlamış su telleri gibi. Gövdesindeki nehir çizgileri eskiden akıcı ve parlak maviydi; şimdi bulanıklaşıp kıyı tortusu gibi kararıyor, bazı yerlerinde çatlak bir kuru nehir yatağı gibi duruyor. Gözlerinde göz bebeği yok, durgun bir su aynası var. Suyun gücüyle gençliğini koruyabildiği zamanlarda teni sıcak ve nemli, çizgileri parlak mavi akar; saçına buğday başağından bir taç örer.',
      temperament: 'Kibar, sabırlı ve açıkça yorgun; zayıflığını saklamaz ama kimsenin acımasına da izin vermez. Halkına karşı sorumluluk hissi güçlüdür.',
      wants: 'Akıntılar durmadan önce nedenini bulmak ve Tahtı yeniden hareket ettirmek.',
      fears: 'Durgunluğun bedenine bir hastalık değil, bir hüküm olarak yerleşmiş olması; halkın onu “görevini bırakmış” sayması.',
      voice: 'Yumuşak, akıcı ve gecikmeli konuşur; bir cümleyi bitirmek için nefes beklemesi gerekir.',
      ties: 'Nehir Tahtı’nın bütün havza ağı; Namaris sarayı; Durgunluk ve akıntıların yavaşlaması (SS 80).',
      hook: 'Samara, nehirler yavaşlarken ilk günlerde kimin yanına gittiğini hatırlayamıyor. Eski bir elçi ya da borçlu hane, o gün ona bir şey söylemiş olabilir.',
      gaps: 'Halkı kayıtlarda belirtilmez. Yaşı, halefi ve hastalığın kaynağı da belirtilmez.'
    },
    en: {
      name: 'Samara', role: 'Queen of the River Throne',
      canon: 'Her movement and pulse slow with the currents; water-lines have appeared on her skin and the court has grown still. The Throne normally travels all its arms; for weeks it has stayed in place, which feeds the belief that a motionless Throne is not doing its duty.',
      appearance: 'A Water Genasi. In her present state her skin is a pale grey-green with a damp nacreous sheen; her hair is like strands of falling water that has slowed. The river-lines on her body were once fluid, bright blue; now they cloud and darken like silt, and in places crack like a dry riverbed. Her eyes have no pupils, only a still mirror of water. When she can sustain her youth through the water’s power her skin is warm and damp, the lines run bright blue, and she wears a crown of wheat ears in her hair.',
      temperament: 'Courteous, patient and visibly tired; she hides no weakness but allows no one pity. Her sense of duty to her people is strong.',
      wants: 'To find the cause before the currents stop, and to set the Throne moving again.',
      fears: 'That the stillness has settled into her body not as an illness but as a verdict; that her people will call her a ruler who abandoned her duty.',
      voice: 'Soft, flowing and delayed; she must wait for breath to finish a sentence.',
      ties: 'The whole basin network of the River Throne; the court at Namaris; Stagnation and the slowing of the currents (SS 80).',
      hook: 'Samara cannot remember whom she visited first as the rivers slowed. An old envoy or a debtor household may have told her something that day.',
      gaps: 'Her people is not stated in the record. Her age, heir, and the source of the sickness are also unstated.'
    },
    prompt: 'a tall Water Genasi queen with pale grey-green nacreous skin, pupilless eyes like still water mirrors, hair of slowed falling water strands, river-like lines on her skin that are clouded, silted and dark, cracking like a dry riverbed in places as if the current is dying, robes of woven reed and silk, tired dignified expression, standing in a hall of nearly still water and reeds, dim teal-grey light'
  },
  {
    id: 'serel', kind: 'ruler', state: { tr: 'Lethar Yıldız Krallığı', en: 'Lethar Star Kingdom', link: '/devletler/lethar-yildiz-kralligi' }, place: 'Astereth', image: '',
    tr: {
      name: 'Serel', role: 'Lethar Kralı (12 yaşında)',
      canon: 'On iki yaşındaki çocuk hükümdar. Aelor, Miravel ve Selent haneleri onun adına naiplik için yarışıyor. Doğum haritasında olmayan yeni bir yıldız belirdi; Yanlış Yıldız çocukları onu yıllardır gördüklerini söylüyor.',
      appearance: 'Ciddi, zayıf ve kısa boylu bir çocuk; Taç Yıldızı’nda küçük yetişkin kıyafetleriyle programlanmış gibi görünür. Gözleri, büyük yıldız haritalarına bakmaya alışık biri gibi hep yukarıda.',
      temperament: 'Merak dolu, erken büyümüş ve çekingen; ama yıldız haritası konusunda şaşırtıcı bir kesinlikle konuşur. Etrafındakilerin kendisini bir mühür gibi kullandığını sezer.',
      wants: 'Yeni yıldızın ne olduğunu kendi başına anlamak; kendi sözünü söyleyebilmek.',
      fears: 'Haritasında olmayan yıldızın kendisini seçtiğini düşünmek; naiplerin ondan beklediği tek şeyin imza olduğu.',
      voice: 'Doğru kelimeyi arayarak, bazen fazla kibar ve resmî konuşur; heyecanlandığında cümleleri hızlanır.',
      ties: 'Üç naip hane (Aelor: koruma ve tehdit; Miravel: araştırma ve Ayaz Sarayı evliliği; Selent: Gnom mühendisleri ve teknik temsil reformu); Yanlış Yıldız çocukları; gözlemevi ve harita mahzeni.',
      hook: 'Serel gizlice haritalarını yeniden çiziyor ve yeni yıldızı bir yer adı gibi işaretliyor. Bir naip hane bu çizimleri ele geçirmek istiyor.',
      gaps: 'Irkı, ebeveynleri ve yeni yıldızın doğum haritasıyla ilişkisi kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Serel', role: 'King of Lethar (age 12)',
      canon: 'A twelve-year-old child-ruler. Houses Aelor, Miravel and Selent compete for the regency in his name. A new star has appeared that is absent from his birth chart; the Wrong Star children say they have seen it for years.',
      appearance: 'A grave, thin, small child who seems programmed into small adult clothes at the Crown Star. His eyes are always lifted, like someone used to reading great star charts.',
      temperament: 'Curious, prematurely grown and shy; yet he speaks about star charts with startling certainty. He senses that those around him use him like a seal.',
      wants: 'To understand the new star for himself; to speak with his own voice.',
      fears: 'That the star missing from his chart has chosen him; that the regents want from him only a signature.',
      voice: 'Searching for the right word, at times too polite and formal; his sentences speed up when he is excited.',
      ties: 'The three regent houses (Aelor: protection and the threat; Miravel: research and the Frost Court marriage; Selent: Gnome engineers and technical representation reform); the Wrong Star children; the observatory and map vault.',
      hook: 'Serel is secretly redrawing the charts and marking the new star like a place name. One regent house wants to seize the drawings.',
      gaps: 'His people, parents, and the new star’s relation to the birth chart are not stated in the record.'
    },
    prompt: 'a solemn twelve-year-old high elf child king with long pointed ears and a thin grave face, child-sized formal adult royal robe embroidered with constellations, large intent eyes looking upward, small circlet of silver stars, standing before a vast star chart, cold blue-violet light'
  },
  {
    id: 'doran', kind: 'heir', state: { tr: 'Kar-Dur Taş Tacı', en: 'Kar-Dur Stone Crown', link: '/devletler/kar-dur-tas-taci' }, place: 'Kar-Dur', image: '',
    tr: {
      name: 'Doran', role: 'Kar-Dur Veliahtı',
      canon: 'SS 66’da kayboldu, SS 81’de yaşlanmadan ve anıları eksik döndü. Kör Madenler’de kaybolduğuna inanılır. Ölü ilan edilmedi; görev ve hakları yokluğunda başkasına devredildi. Mühürlerinden biri Altıncı ya da Dokuzuncu Kasa’ya ait olabilir.',
      appearance: 'Kayıp günündeki gibi genç bir Dağ Cücesi; sakalı bakımlı değil ama taranmış gibi duruyor, gözleri hatırlayıp hatırlamadığını belli etmiyor. Eski bir madenci kemeri ve sadece bir tane mühür taşıyor.',
      temperament: 'Sessiz, dikkatli ve ürkütücü derecede sakin; sorulmayan bir soruyu yanıtlar gibi bakar. Hatırladığı şeyleri paylaşmaya isteksizdir; çünkü hangi anının kendisine ait olduğundan emin değildir.',
      wants: 'Kaybolduğu yerde ne gördüğünü ve kimi geride bıraktığını öğrenmek.',
      fears: 'Taht hakkını geri istemenin, yokluğunda kurulan düzeni parçalaması; hatırladıklarının bir başkasının anısı olması.',
      voice: 'Kısa, ölçülü cümleler; aldığı her soruyu önce “ses” olarak tartar ve yankısını bekler.',
      ties: 'Taç Ocakları (hakkını savunur), Derin Ustalar (yaşlanmamasını inceletmek ister), Yeminliler (getirdiklerinin şehre girmemesini ister), Açıcılar (antik yolları açmak ister); Dokuz Kasa; Kör Madenler.',
      hook: 'Doran’ın taşıdığı mühür, Altıncı Kasa’yı açıyor olabilir. Dört grubun dördü de onu kendi tarafına çekmeye çalışıyor ve kendisi hâlâ hiçbirini seçmedi.',
      gaps: 'Kaybolduğu on beş yılda ne olduğu, yaşlanmamasının nedeni ve hangi anıların eksik olduğu bilinmez.'
    },
    en: {
      name: 'Doran', role: 'Heir of Kar-Dur',
      canon: 'Vanished in SS 66; returned in SS 81 unaged and with missing memories. He is believed to have been lost in the Blind Mines. He has not been declared dead; his duties and rights were assigned to others in his absence. One of his seals may belong to the Sixth or Ninth Vault.',
      appearance: 'A young Mountain Dwarf, as on the day he vanished; his beard is unkempt yet looks combed, and his eyes give no sign of whether he remembers. He wears an old miner’s belt and carries a single seal.',
      temperament: 'Quiet, watchful and unnervingly calm; he looks as if answering a question no one asked. He is reluctant to share what he recalls, because he is unsure which memories are his.',
      wants: 'To learn what he saw where he vanished and whom he left behind.',
      fears: 'That claiming his throne will shatter the order built in his absence; that what he remembers belongs to someone else.',
      voice: 'Short, measured sentences; he weighs each question first as a sound and waits for its echo.',
      ties: 'The Crown Hearths (defend his right), the Deep Masters (want his lack of aging examined), the Oathbound (want what he brought kept out of the city), the Openers (want the ancient roads opened); the Nine Vaults; the Blind Mines.',
      hook: 'The seal Doran carries may open the Sixth Vault. All four factions are trying to draw him to their side, and he has not yet chosen any.',
      gaps: 'What happened in the fifteen years he was gone, why he did not age, and which memories are missing are all unknown.'
    },
    prompt: 'a young mountain dwarf heir, stoic and unnervingly calm, tidy braided beard, weathered miner’s leather belt over fine stone-grey robes, a single engraved seal hung at his neck, eyes slightly distant as if listening to an echo, lit by warm lantern light in a stone hall'
  },
  {
    id: 'zhaqara', kind: 'historic', state: { tr: 'Qasyrra İmparatorluğu', en: 'Qasyrra Empire', link: '/devletler/qasyrra-imparatorlugu' }, place: 'Qasyrra', image: '',
    tr: {
      name: 'Zhaqara', role: 'Qasyrra İmparatoriçesi',
      canon: 'İlk yabancı temas kayıtlarında Qasyrra’nın hükümdarı olarak adı geçer. Quemenar imparatorluğu “kutsal matrilineal imparatorluk” diye tarif etti. Kendisinden doğrudan görüşme kaydı yoktur. Aynı kayıtlar bir kız kardeşi olduğunu da anar; kız kardeşin adı, görevi ve yeri kayıtlarda yoktur.',
      appearance: 'Bronz-kahverengi tenli, uzun boyunlu ve uzun parmaklı bir Ossai; yüzü protokol gereği açık, ama baharat dumanı ve boya buharı arkasında yalnız uzaktan görülür. Başında metal bir güneş başlığı, parmaklarında altın yüzükler var.',
      temperament: 'Uzak, kutsal ve hesaplı; konuşmaz, söyletir. Her şey başkalarının ağzından yansır.',
      wants: 'Dışa kapalı bir imparatorluğu dış dünya ile pazarlık hâlinde tutmak.',
      fears: 'Yabancıların onun adını değil, sözünü taşıyan birini sorgulaması.',
      voice: 'Doğrudan duyulmamıştır; sözleri Meclis üzerinden aktarılır.',
      ties: 'Yedi Gölgeli Meclis, Quemenar; kız kardeşi (adı ve görevi bilinmez); Qasyrra baharat ve boya ticareti; kutsal matrilineal veraset.',
      hook: 'İlk elf heyeti imparatoriçeyle hiç yüz yüze görüşmedi. Heyetten biri, tahtın arkasındaki kişinin hiç değişmediğini yazmış.',
      gaps: 'Görünümü, yaşı ve bugün hâlâ yaşayıp yaşamadığı kayıtlarda belirtilmez; tüm betimleme önerisidir.'
    },
    en: {
      name: 'Zhaqara', role: 'Empress of Qasyrra',
      canon: 'Named as Qasyrra’s ruler in the first foreign-contact records. Quemenar described the empire as a “sacred matrilineal empire”. There is no record of a direct meeting with her. The same records mention that she has a sister; the sister’s name, office and whereabouts are not recorded.',
      appearance: 'A bronze-brown-skinned Ossai with a long neck and long fingers; her face is open by protocol but seen only from afar through spice smoke and dye vapour. A metal sun headdress on her head, gold rings on her fingers.',
      temperament: 'Remote, sacred and calculating; she does not speak but makes others speak. Everything reaches us through other mouths.',
      wants: 'To keep a closed empire in negotiation with the outside world.',
      fears: 'That foreigners will question not her name but whoever carries her word.',
      voice: 'Never heard directly; her words are relayed through the Council.',
      ties: 'The Seven Shadows Council, Quemenar; her sister (name and office unknown); Qasyrra’s spice and dye trade; sacred matrilineal succession.',
      hook: 'The first elf delegation never met the empress face to face. One member wrote that the figure behind the throne never changed.',
      gaps: 'Her appearance, age, and whether she still lives are not stated in the record.'
    },
    prompt: 'a tall empress with bronze-brown skin, long neck, long fingers and prominent cheekbones, a tall metal sun headdress, heavy gold rings, ornate matrilineal imperial robes in saffron and deep indigo, face open but remote and unreadable, seated in a hall of drifting spice smoke and dye vapour, warm amber light'
  },
  {
    id: 'quemenar', kind: 'council', state: { tr: 'Qasyrra İmparatorluğu', en: 'Qasyrra Empire', link: '/devletler/qasyrra-imparatorlugu' }, place: 'Qasyrra', image: '',
    tr: {
      name: 'Quemenar', role: 'Yüksek Neshar · Yedi Gölgeli Meclis üyesi',
      canon: 'İlk elf heyetiyle görüşürken kendisini Yüksek Neshar ve Yedi Gölgeli Meclis üyesi diye tanıttı; ruhbanın doğrudan hükümdar olmadan da siyasî ağırlık taşıdığını gösterir. Uzun parmaklı, uzun boylu ve belirgin elmacık kemikli görevlilerden biriydi.',
      appearance: 'Bronz-kahverengi tenli, uzun boylu ve ince bir Ossai; uzun boynu ve parmakları, belirgin elmacık kemikleri ve ağır göz kapakları var. Başında metal bir güneş başlığı; giysisi gölge rengi, yakası boya lekeli.',
      temperament: 'Nazik, hesaplı ve kendinden emin; yabancıya her şeyi anlatıyormuş gibi görünüp hiçbir şeyi vermeyen biri.',
      wants: 'Meclisin sesini imparatoriçenin sözünden daha duyulur kılmak; Qasyrra’yı pazarlıkta üstün tutmak.',
      fears: 'Yabancıların kendisini imparatoriçenin sözcüsü değil, kendi adına karar veren biri sanması.',
      voice: 'Yumuşak ve resmî; her cümleyi bir çekinceyle bitirir.',
      ties: 'Yedi Gölgeli Meclis; Zhaqara; ilk elf heyeti.',
      hook: 'Quemenar ilk heyete hangi bilgiyi kasıtlı olarak yanlış anlattı? Heyetin notlarında bir tutarsızlık var ve Meclis o sayfayı geri istiyor.',
      gaps: 'Irkı, rütbesinin yetkisi ve yaşadığı çağdaki Meclis üye sayısı kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Quemenar', role: 'High Neshar · Member of the Seven Shadows Council',
      canon: 'Introduced himself to the first elf delegation as High Neshar and a member of the Seven Shadows Council; this shows the priesthood carried political weight even without ruling directly. He was one of the tall, long-fingered, high-cheekboned officials.',
      appearance: 'A tall, thin, bronze-brown-skinned Ossai with a long neck and long fingers, prominent cheekbones and heavy eyelids. A metal sun headdress on his head; his robes are shadow-coloured, the collar stained with dye.',
      temperament: 'Courteous, calculating and self-assured; someone who seems to tell a stranger everything while giving nothing away.',
      wants: 'To make the Council’s voice louder than the empress’s word; to keep Qasyrra on top in bargaining.',
      fears: 'That foreigners will take him not for the empress’s spokesman but for someone deciding in his own name.',
      voice: 'Soft and formal; he ends every sentence with a caveat.',
      ties: 'The Seven Shadows Council; Zhaqara; the first elf delegation.',
      hook: 'What did Quemenar deliberately misstate to the first delegation? There is an inconsistency in the delegation’s notes, and the Council wants that page back.',
      gaps: 'His people, the authority of his rank, and the number of Council members in his era are not stated in the record.'
    },
    prompt: 'a tall thin priest-official with bronze-brown skin, long neck and long fingers, prominent cheekbones, heavy-lidded calculating eyes, a metal sun headdress, shadow-coloured ceremonial robes with dye-stained collar, subtle half-smile, standing in a shadowed council chamber, warm amber and deep violet light'
  }
]


// Halk: [tr, en, öneri mi]. Öneri değilse kişi, devletin tanımlayıcı halkından gelir (kanon). Öneri ise halk benim seçimimdir.
const races = {
  elyra: ['Orman Elfi (Taç Elfi)', 'Wood Elf (Crown Elf)', true], samara: ['Su Genasisi', 'Water Genasi', true], serel: ['Yüksek Elf', 'High Elf'], doran: ['Dağ Cücesi', 'Mountain Dwarf'],
  zhaqara: ['Ossai', 'Ossai', true], quemenar: ['Ossai', 'Ossai', true],
  varessa: ['Veyran', 'Veyran', true], odran: ['İnsan', 'Human', true], maelor: ['Veyran', 'Veyran'],
  aurelis: ['Ateş Genasisi', 'Fire Genasi', true], taveth: ['Satyr', 'Satyr', true], ysgrim: ['Goliath', 'Goliath', true],
  nibbra: ['Svirfneblin', 'Svirfneblin'], torvash: ['Dragonborn (Kızıl Saar)', 'Dragonborn (Red Saar)'], saelith: ['Gem Dragonborn', 'Gem Dragonborn'],
  halvian: ['Tuz Cücesi', 'Salt Dwarf'], 'dokuzuncu-masa': ['Changeling', 'Changeling', true], tarth: ['Vedalken', 'Vedalken', true], perrin: ['Halfling', 'Halfling'],
  valenor: ['Yüksek Elf', 'High Elf'], isavel: ['Yüksek Elf', 'High Elf'], dwennar: ['Şehir Gnomu', 'City Gnome', true],
  dagna: ['Dağ Cücesi', 'Mountain Dwarf'], thorgun: ['Dağ Cücesi', 'Mountain Dwarf'], ildra: ['Dağ Cücesi', 'Mountain Dwarf'], orrak: ['Dağ Cücesi', 'Mountain Dwarf'], bessa: ['Dağ Cücesi', 'Mountain Dwarf'],
  ilmara: ['Orman Elfi', 'Wood Elf', true], 'kizil-av': ['Bilinmiyor', 'Unknown'], perah: ['İnsan', 'Human', true],
  meril: ['Yüksek Elf', 'High Elf', true], 'besinci-kral': ['İnsan', 'Human'], 'ilk-imparator': ['Veyran', 'Veyran'], 'zhaqaras-sister': ['Bilinmiyor', 'Unknown'], medrin: ['İnsan', 'Human'], teravin: ['İnsan', 'Human']
}

// Portreler: public/assets/portraits/web (tam boy) ve thumbs (kart). İkinci portre varsa başlığıyla birlikte sayfada gösterilir.
const portraitIds = ['elyra', 'samara', 'serel', 'doran', 'zhaqara', 'zhaqaras-sister', 'quemenar', 'varessa', 'odran', 'maelor', 'aurelis', 'taveth', 'ysgrim', 'nibbra', 'meril']
const portraitCaptions = {
  samara: [{ tr: 'Şimdi: akıntılar yavaşlarken', en: 'Now: as the currents slow' }, { id: 'samara-2', tr: 'Suyun gücüyle gençliğini koruduğunda', en: 'When she sustains her youth through the water’s power' }]
}
const portraitsFor = (id) => {
  if (!portraitIds.includes(id)) return []
  const set = portraitCaptions[id] || [{}]
  return set.map((c, i) => {
    const file = c.id || id
    return { src: `/assets/portraits/web/${file}.webp`, thumb: `/assets/portraits/thumbs/${file}.webp`, caption: c.tr ? { tr: c.tr, en: c.en } : null }
  })
}

export const figures = [...core, ...figuresA, ...figuresB, ...figuresC].map((f) => {
  const [tr, en, proposed] = races[f.id]
  return { ...f, people: { tr, en, proposed: !!proposed }, portraits: portraitsFor(f.id) }
})

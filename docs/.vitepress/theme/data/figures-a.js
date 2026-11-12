// A katmanı: devlet yüzleri. `nameProposed: true` olanların adı kayıtta yoktur, öneridir (rol ve durum kanondur).

export const figuresA = [
  {
    id: 'varessa', kind: 'claimant', state: { tr: 'Ordan İmparatorluğu', en: 'Ordan Empire', link: '/devletler/ordan-imparatorlugu' }, place: 'Ordanor', image: '',
    tr: {
      name: 'General Varessa', role: 'Ordan veraset adayı · ordunun adayı',
      canon: 'Üçlü veraset savaşının üç adayından biri. Ordu tarafından desteklenir ve Diken Tacı’nın işgalini savunur.',
      appearance: 'Bir Veyran: bütünüyle insansı, ama gözlerinde iç içe iki iris halkası, boyun ve ellerinde ince doğal çizgiler var. Sert çizgili, ince yüzlü; üniforması sade, tek süsü ordu akademisinin mührü. Sol elinde eski bir sefer yarasının izi var.',
      temperament: 'Disiplinli, açık sözlü ve sabırsız; karar vermeyi bekleyişten çok hataya tercih eder. Ordusunu kendi ailesi gibi görür ve onlar adına konuşmaktan çekinmez.',
      wants: 'Taht için ordunun sözünü yeterli kılmak; Nareth’te yarım kalan seferi bitirmek.',
      fears: 'Taht’ın kaybı değil, sahada kazanılmış zaferin saray hesaplarıyla heba edilmesi.',
      voice: 'Kısa, emir kipinde cümleler; resmî unvanlara ve ayrıntıya bakmaz.',
      ties: 'Serath ordu akademisi, Vekra Limanı seferleri, Geyikgeçidi’ne bakan kıyı kaleleri; Odran ve Maelor ile açık rekabet.',
      hook: 'Varessa, Diken Sınırı’ndaki antik cüce kapısını “kapı değil kayıt kalemi” saymak istiyor. Bunu yazıya döken bir subay hâlâ sınırda ve evrak kaybolmak üzere.',
      gaps: 'Yaşı, ırkı ve geçmiş seferleri kayıtlarda belirtilmez.'
    },
    en: {
      name: 'General Varessa', role: 'Ordan claimant · the army’s candidate',
      canon: 'One of three candidates in the three-way succession war. Backed by the army, she argues for invading the Thorn Crown.',
      appearance: 'A Veyran: fully human-like, but with two nested iris rings in each eye and fine natural lines on neck and hands. Sharp-featured and narrow-faced; her uniform is plain, its only adornment the seal of the army academy. An old campaign scar marks her left hand.',
      temperament: 'Disciplined, blunt and impatient; she prefers error to waiting. She treats her army as family and does not hesitate to speak for them.',
      wants: 'To make the army’s word enough for the throne; to finish the campaign left half-done in Nareth.',
      fears: 'Not losing the throne, but a victory won in the field being squandered by court arithmetic.',
      voice: 'Short, imperative sentences; she ignores titles and detail.',
      ties: 'The Serath army academy, the Vekra Port campaigns, the coastal forts facing Staggate; open rivalry with Odran and Maelor.',
      hook: 'Varessa wants to treat the ancient dwarven gate at Thorn Border as “a record entry, not a gate”. An officer who wrote this down is still on the border, and the paperwork is about to vanish.',
      gaps: 'Her age, people, and earlier campaigns are not stated in the record.'
    },
    prompt: 'a stern middle-aged woman general who looks fully human, sharp narrow face and close-cropped dark hair, with distinctive eyes: each iris has two clearly visible concentric rings, and faint fine natural line patterns trace the skin of her hands and neck, plain dark military coat with a single academy seal, an old campaign scar on her left hand, arms crossed before a campaign map table, cool grey light'
  },
  {
    id: 'odran', kind: 'claimant', state: { tr: 'Ordan İmparatorluğu', en: 'Ordan Empire', link: '/devletler/ordan-imparatorlugu' }, place: 'Ordanor', image: '',
    tr: {
      name: 'Prens Odran', role: 'Ordan evlatlık varisi · tüccar ve bürokrasi adayı',
      canon: 'Veraset adaylarından biri; evlatlık varis. Tüccarlar ve bürokrasiyle ittifaklıdır; Ayaz Tahtı da onu destekler.',
      appearance: 'Genç, bakımlı ve güleryüzlü; giysisi sade ama kumaşı pahalı. Yakasında bir tüccar loncasının rozeti, parmağında hiç çıkarmadığı evlatlık yüzüğü var.',
      temperament: 'Sakin, zeki ve ölçülü; çatışmayı kazanmaktan çok ucuza atlatmayı sever. Evlatlık oluşunun herkesin dilinde olduğunu bilir ve bunu kimseden saklamaz.',
      wants: 'Orduyu ve soyluları karşısına almadan tahta çıkmak; imparatorluğu kayıt ve ticaret üzerinden yönetmek.',
      fears: 'Taht’ın kanla değil kâğıtla kazanıldığının, sonunda kâğıt kadar kolay yırtılabileceğinin anlaşılması.',
      voice: 'Sıcak, akıcı ve nazik; sert bir sözü bile soru cümlesine çevirir.',
      ties: 'Tüccar loncaları ve sınavla seçilen bürokrasi; Ayaz Tahtı (kuzey ticareti, Lethar evliliği); Varessa ve Maelor ile rekabet.',
      hook: 'Odran, Ayaz Tahtı’na bir evlilik sözü verdi. Bu sözün ne karşılığında verildiğini yazan sicil sayfası Ordanor kayıt kulelerinden eksik.',
      gaps: 'Kökeni, kimin evlatlığı olduğu ve yaşı kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Prince Odran', role: 'Adopted heir of Ordan · candidate of merchants and bureaucracy',
      canon: 'One of the succession candidates; the adopted heir. Allied with merchants and the bureaucracy; the Frost Throne also backs him.',
      appearance: 'Young, well-kept and affable; his clothes are plain but the cloth is costly. A merchant guild’s badge sits on his collar, and he never removes his adoption ring.',
      temperament: 'Calm, clever and measured; he prefers to get through a conflict cheaply rather than win it. He knows his adoption is on everyone’s lips and hides it from no one.',
      wants: 'To reach the throne without turning army and nobles against him; to govern the empire through records and trade.',
      fears: 'That it will be seen the throne was won with paper, not blood, and can be torn as easily.',
      voice: 'Warm, fluent and courteous; he turns even a harsh word into a question.',
      ties: 'Merchant guilds and the examination-selected bureaucracy; the Frost Throne (northern trade, a Lethar marriage); rivalry with Varessa and Maelor.',
      hook: 'Odran promised the Frost Throne a marriage. The register page stating what the promise was given in exchange for is missing from the Ordanor record towers.',
      gaps: 'His origin, whose adoptee he is, and his age are not stated in the record.'
    },
    prompt: 'a young well-groomed human prince with ordinary human features, warm composed smile, tailored dark robes of costly cloth, a merchant guild badge on his collar, an adoption signet ring on his finger, standing in a record hall of tall ledgers, soft golden light'
  },
  {
    id: 'maelor', kind: 'claimant', state: { tr: 'Ordan İmparatorluğu', en: 'Ordan Empire', link: '/devletler/ordan-imparatorlugu' }, place: 'Kızıl Meridyen', image: '',
    tr: {
      name: 'Başrahip Maelor', role: 'Ordan veraset adayı · devlet dininin adayı',
      canon: 'Veraset adaylarından biri; soylular ve devlet dini tarafından desteklenir, Veyran üstünlüğünü savunur. Merkezi, kutsal ölçüm şehri Kızıl Meridyen’dir.',
      appearance: 'Bir Veyran: bütünüyle insansı, ama gözlerinde iç içe iki iris halkası, boyun ve ellerinde ince doğal çizgiler var. Uzun boylu, solgun ve çok yaşlı görünen bir adam; bej ve kızıl dini cüppesinin yakası ölçü işaretleriyle işlenmiş. Elinde hiç bırakmadığı pirinç bir ölçü çubuğu var.',
      temperament: 'Kibar, sabırlı ve soğuk; öfkesini hiç yükseltmez. Her şeyi tarihsel bir hükmün parçası sayar ve kararlarını “zaten yazılı” diye gerekçelendirir.',
      wants: 'Veyran düzeninin kutsal mirasını Taht’la birleştirmek; kaydı bir din hâline getirmek.',
      fears: 'Yedi Hat’ın gerçek öyküsünün (istasyon haneleri, Misafir Defteri) Meridyen anlatısını bozması.',
      voice: 'Ağır, ritimli, neredeyse okur gibi; her cümleyi bir ölçü birimiyle bitirir.',
      ties: 'Kızıl Meridyen ve devlet dininin ruhbanı; soylular; Veyran üstünlükçü haneler.',
      hook: 'Maelor’un özel arşivinde Yedi Hat’ın istasyon defterlerinin Meridyen kayıtlarına aykırı bir nüshası olduğu söyleniyor. Düzen Karşıtları o nüshayı arıyor.',
      gaps: 'Yaşı ve Veyran olup olmadığı kayıtlarda belirtilmez.'
    },
    en: {
      name: 'High Priest Maelor', role: 'Ordan claimant · candidate of the state faith',
      canon: 'One of the succession candidates; backed by nobles and the state faith, he argues for Veyran superiority. His seat is the sacred measuring city of Red Meridian.',
      appearance: 'A Veyran: fully human-like, but with two nested iris rings in each eye and fine natural lines on neck and hands. A tall, pale, extremely aged-looking man; the collar of his beige and crimson robe is stitched with measure-marks. He never lets go of a brass measuring rod.',
      temperament: 'Courteous, patient and cold; he never raises his temper. He sees everything as part of a historical verdict and justifies decisions as “already written”.',
      wants: 'To merge the Veyran order’s sacred inheritance with the throne; to turn the record into a religion.',
      fears: 'That the true story of the Seven Lines (the station households, the Guest Ledger) will break the Meridian narrative.',
      voice: 'Heavy, rhythmic, almost recited; he ends each sentence with a unit of measure.',
      ties: 'Red Meridian and the clergy of the state faith; the nobles; Veyran-supremacist houses.',
      hook: 'Maelor’s private archive is said to hold a copy of the Seven Lines station ledgers that contradicts the Meridian record. The Anti-Order movements are looking for it.',
      gaps: 'His age and whether he is himself Veyran are not stated in the record.'
    },
    prompt: 'a very tall pale elderly high priest who looks fully human, with distinctive eyes: each iris has two clearly visible concentric rings, and faint fine natural line patterns trace the skin of his neck and hands, beige and crimson ceremonial robes stitched with measure-marks, holding a brass measuring rod, calm cold expression, standing in a sacred measuring hall with brass instruments, soft red-gold light'
  },
  {
    id: 'aurelis', kind: 'ruler', nameProposed: true, state: { tr: 'Altıngüneş Krallığı', en: 'Goldensun Kingdom', link: '/devletler/altin-gunes-kralligi' }, place: 'Solkar', image: '',
    tr: {
      name: 'Aurelis Altınkor', role: 'Altıngüneş savaş tacı ikizi',
      canon: 'İkiz taç geleneğinde iki kardeşten biri savaşı, diğeri hasat ve iç hukuku yönetir. Şimdi ikizlerin ikisi de savaş tacını istiyor.',
      appearance: 'Ateş Genasi soyunun izini taşıyan sıcak bakışlı, geniş omuzlu biri; saçı altın sarısı ve ucu kor gibi parlar. Savaş tacı, düz ve ağır bir altın halka.',
      temperament: 'Dolaysız, gururlu ve cömert; sevdiğini yüksek sesle sever. Kardeşine karşı öfkesi, çocukluktan kalma bir kırgınlıktır.',
      wants: 'Savaş tacını bırakmak değil, onu tek başına taşıyan olmak.',
      fears: 'İkiz geleneğinin onu ya savaşın ya da barışın yanında yalnız bırakması.',
      voice: 'Gür ve sıcak; şaka yapar, sonra aniden ciddileşir.',
      ties: 'İkiz Taht ve Solkar; Satyr Yamakları ve Korhasat; Elf ve Ateş Genasi haneleri; kardeşi Taveth.',
      hook: 'Aurelis, Korhasat Bağı’nın eşiğini askerî ikmal için kullanma fikrini yeniden gündeme getirdi. Satyr bağ sözcüleri onu şenlik gecesi bir sözle sınamak istiyor.',
      gaps: 'Gerçek adı, yaşı ve ikizlik düzeninin kökeni kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Aurelis Goldencore', role: 'Goldensun war-crown twin',
      canon: 'In the twin-crown tradition one sibling commands war, the other harvest and internal law. Now both twins want the war crown.',
      appearance: 'Warm-eyed, broad-shouldered, with traces of Fire Genasi ancestry; golden hair that glows like embers at the tips. The war crown is a plain, heavy gold band.',
      temperament: 'Direct, proud and generous; they love loudly. Their anger at their sibling is a childhood grievance.',
      wants: 'Not to give up the war crown, but to be the only one to carry it.',
      fears: 'That the twin tradition will leave them alone on one side of war or peace.',
      voice: 'Loud and warm; jokes, then suddenly turns grave.',
      ties: 'The Twin Throne and Solkar; the Satyr Slopes and Korhasat; Elf and Fire Genasi houses; their sibling Taveth.',
      hook: 'Aurelis has revived the idea of using the Korhasat Bond threshold for military supply. The Satyr bond-speakers want to test them with a festival-night oath.',
      gaps: 'Their true name, age, and the origin of the twin arrangement are not stated in the record.'
    },
    prompt: 'a broad-shouldered Fire Genasi noble with golden hair glowing like embers, faintly smouldering skin with ash-grey cracks glowing orange, a plain heavy gold war crown, warm proud expression, red and gold armoured court dress, standing before a sunlit throne hall, warm orange light'
  },
  {
    id: 'taveth', kind: 'ruler', nameProposed: true, state: { tr: 'Altıngüneş Krallığı', en: 'Goldensun Kingdom', link: '/devletler/altin-gunes-kralligi' }, place: 'Solkar', image: '',
    tr: {
      name: 'Taveth Altınkor', role: 'Altıngüneş hasat tacı ikizi',
      canon: 'İkizlerden hasat ve iç hukuku yöneten; fakat o da savaş tacını istiyor. Korhasat Bağı’nın eşiği hasat tacının konukluk yükümlülüğüdür.',
      appearance: 'Kardeşinden ince yapılı, yumuşak çizgili; boynuzumsu bir Satyr izi taşıyor, saçına buğday başağı örülü. Hasat tacı, taze sürgünlerden örülmüş bir çelenk.',
      temperament: 'Sakin, titiz ve görünürde uzlaşmacı; sessizce hesap tutar. Barışı seven biri gibi görünmeyi, kardeşinin öfkesine karşı bir silah olarak kullanır.',
      wants: 'Savaş tacını ele geçirip onu kullanmak değil, kardeşine karşı bırakmamak.',
      fears: 'Hasat tacının, yalnızca savaş tacının gölgesi olarak anılması.',
      voice: 'Yumuşak ve hesaplı; konuşurken hep bir şey sayıyormuş gibi bakar.',
      ties: 'Korhasat ve hasat ambarları; Satyr bağ sözcüleri (hasat kapısı onlarla konuşur); Aurelis.',
      hook: 'Taveth, Korhasat Bağı’nın kapısına yalnız şenlikte söylenen üçlü sözü kendi ağzından söyleyebiliyor. Kapıyı kimin için açtığı belli değil.',
      gaps: 'Gerçek adı ve yaşı kayıtlarda belirtilmez; Satyr olup olmadığı da yazılı değildir.'
    },
    en: {
      name: 'Taveth Goldencore', role: 'Goldensun harvest-crown twin',
      canon: 'The twin who governs harvest and internal law, yet who also wants the war crown. The Korhasat Bond threshold is the harvest crown’s hospitality duty.',
      appearance: 'Slighter and softer-lined than their sibling; carries a horn-like Satyr trace, wheat ears woven into their hair. The harvest crown is a wreath of fresh shoots.',
      temperament: 'Calm, meticulous and apparently conciliatory; they keep a quiet count. They use the appearance of loving peace as a weapon against their sibling’s anger.',
      wants: 'Not to seize the war crown to wield it, but to not leave it to their sibling.',
      fears: 'That the harvest crown will be remembered only as the shadow of the war crown.',
      voice: 'Soft and calculating; when speaking, always looks as if counting something.',
      ties: 'Korhasat and the harvest granaries; the Satyr bond-speakers (the harvest gate speaks with them); Aurelis.',
      hook: 'Taveth can speak the triple oath said only at festivals, in their own voice, to the Korhasat Bond’s gate. For whom they have opened it is unclear.',
      gaps: 'Their true name and age are not stated; whether they are Satyr is not written.'
    },
    prompt: 'a slender satyr noble with curved ram-like horns and pointed goat-like ears, wheat ears braided into dark hair, a wreath of fresh green shoots as a crown, calm calculating expression, earthy gold and green court dress, standing in a harvest granary hall, soft warm light'
  },
  {
    id: 'ysgrim', kind: 'ruler', nameProposed: true, state: { tr: 'Ayaz Tahtı', en: 'Frost Throne', link: '/devletler/ayaz-sarayi' }, place: 'Nivarra', image: '',
    tr: {
      name: 'Ysgrim Buzmühür', role: 'Ayaz Tahtı hükümdarı',
      canon: 'Ayaz Tahtı mutlak monarşidir; Gölgesiz Cam’daki kök eşiğini ve buzdan geri dönen geçmişi denetler. Prens Odran’ı destekler; Lethar evliliği ve kuzey ticaretinin denetimli açıklığını ister.',
      appearance: 'Bir Goliath: taş grisi tenli, kemiksi sırtlarla işaretli, buz mavisi gözlü dev yapılı bir hükümdar; beyaz kürkle örtülü omuzlar, bir kolunda donmuş bir mühür. Soğuğu değil sakinliği yayar.',
      temperament: 'Ağır, ölçülü ve temkinli; bir şeyi “çözmeye hazır değil” diyerek yüzyıllarca saklamaktan çekinmez. Korumayı, şeyi değiştirecek kadar erken çözmemek sayar.',
      wants: 'Kapıyı ve buzun belgelerini doğru zaman gelene kadar kimseye açmamak.',
      fears: 'Çözülmenin kendi tahtını sorgulatması; bir belgenin yanlış çağın hukukuyla okunması.',
      voice: 'Alçak, ağır ve gecikmeli; sözcükleri seçtikten sonra yavaşça bırakır.',
      ties: 'Kış Mührü ve Nivarra’nın buz arşivleri; Buz Genasileri, Goliathlar, Shadar-kai, Rimekin; Odran’ın bürokrasisi; Lethar ile evlilik görüşmesi.',
      hook: 'Buzdan çıkan bir antlaşma metni, bir ailenin mülkünü üç yüzyıl sonra geri verebilir. Ysgrim onu “henüz çözülmeye hazır değil” diye saklıyor ve talep eden hane Nivarra’ya yürüyor.',
      gaps: 'Gerçek adı ve yaşı kayıtlarda belirtilmez; Goliath mı dev soylu mu olduğu da yazılı değildir.'
    },
    en: {
      name: 'Ysgrim Icemark', role: 'Ruler of the Frost Throne',
      canon: 'The Frost Throne is an absolute monarchy that guards the root threshold at Shadowless Glass and the past returning from the ice. It backs Prince Odran and wants a Lethar marriage and a supervised opening of northern trade.',
      appearance: 'A Goliath: a giant-framed sovereign with stone-grey skin marked by bony ridges and ice-blue eyes, white fur over the shoulders, a frozen seal on one arm. They radiate calm, not cold.',
      temperament: 'Heavy, measured and wary; they do not hesitate to hide something for centuries as “not ready to be thawed”. They count protection as not thawing a thing before it can be changed.',
      wants: 'To keep the gate and the ice’s documents closed to everyone until the right time.',
      fears: 'That thawing will make their own throne questioned; that a document will be read under the law of the wrong era.',
      voice: 'Low, heavy and delayed; chooses words, then lets them go slowly.',
      ties: 'The Winter Seal and Nivarra’s ice archives; Ice Genasi, Goliaths, Shadar-kai, Rimekin; Odran’s bureaucracy; the Lethar marriage talks.',
      hook: 'A treaty text from the ice could return a family’s estate after three centuries. Ysgrim keeps it as “not ready to be thawed” and the claimant house is marching on Nivarra.',
      gaps: 'Their true name and age are not stated; whether they are Goliath or another giant-blooded people is not written.'
    },
    prompt: 'a towering Goliath sovereign with stone-grey skin marked by pale bony ridges and ice-blue eyes, white fur mantle over broad shoulders, a frozen seal fused to one forearm, crown of pale frosted metal, calm weathered face, standing in a glacial archive hall of blue ice, cold blue light'
  },
  {
    id: 'nibbra', kind: 'council', nameProposed: true, state: { tr: 'Dokuz Fener Birliği', en: 'Nine Lantern Union', link: '/devletler/dokuz-fener-birligi' }, place: 'Birinci Işık', image: '',
    tr: {
      name: 'Nibbra Yankıkuyu', role: 'Dokuz Fener Birliği sözcüsü · Birinci Işık meclisi',
      canon: 'Nimrûn halkının dokuz kentli yeraltı konfederasyonu; merkezi Birinci Işık meclisidir. Ordusu küçük, savunması ses büyüsü, yanıltıcı tüneller ve kontrollü çökmelere dayanır.',
      appearance: 'Kısa boylu, geniş kulaklı, taş rengi tenli bir Svirfneblin; elinde kristal bir ses çatalı, boynunda dokuz fener işaretli bir zincir. Gözleri karanlıkta tuhaf parlıyor.',
      temperament: 'Sessiz, tetikte ve neşeli bir gizlilik ustası; yabancıya fazla bir şey söylemez ama dostluğu içten gösterir. Her cümlesini bir yankı gibi tartar.',
      wants: 'Dokuz kentin birliğini küçük ordu ile korumak; Durgunluğun Son Parıltı’yı yutmasına izin vermemek.',
      fears: 'Son Parıltı’nın tünellerinin kimsesiz kalması; Ordan’ın yol mühendisliğinin ses hukukunu tanımaması.',
      voice: 'Fısıltıyla ve ritimle konuşur; kelimeleri bir ses çatalıyla doğrular.',
      ties: 'Dokuz kent meclisleri (Derin Mercek, Yankı Kuyusu, Mavi Taş, Gölge Ölçer, vb.); Kor-Dum ve Kara Örs ile Duergar sınırı; Ordan ticareti.',
      hook: 'Son Parıltı’nın ışıkları hâlâ görülüyor ama tünelleri hep aynı noktaya çıkıyor. Nibbra, oraya gönderdiği her ses çatalının yankısı ayrı bir yerden döndüğünü saklıyor.',
      gaps: 'Meclisin tek bir sözcüsü olup olmadığı kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Nibbra Echowell', role: 'Spokesperson of the Nine Lantern Union · Council of the First Light',
      canon: 'The Nimrûn people’s nine-city underground confederation, seated at the First Light council. Its army is small; its defence rests on sound magic, misleading tunnels and controlled collapses.',
      appearance: 'A short, broad-eared, stone-skinned Svirfneblin with a crystal tuning fork in hand and a chain marked with nine lanterns at the neck. Their eyes glow strangely in the dark.',
      temperament: 'Quiet, watchful and cheerfully secretive; says little to strangers but shows friendship sincerely. Weighs every sentence like an echo.',
      wants: 'To protect the nine cities’ union with a small army; to keep Stagnation from swallowing Last Glow.',
      fears: 'That Last Glow’s tunnels will be left without anyone; that Ordan’s road engineering will not recognise sound law.',
      voice: 'Speaks in whispers and rhythm; confirms words with a tuning fork.',
      ties: 'The nine city councils (Deep Lens, Echo Well, Blue Stone, Shadow Gauge, etc.); the Duergar border with Kor-Dum and Black Anvil; Ordan trade.',
      hook: 'Last Glow’s lights are still seen, yet its tunnels always come out at the same point. Nibbra hides that every tuning-fork echo they send there returns from a different place.',
      gaps: 'Whether the council has a single spokesperson is not stated.'
    },
    prompt: 'a short stone-skinned svirfneblin deep gnome council speaker with large ears, holding a crystal tuning fork, a chain marked with nine small lantern icons at the neck, eyes faintly glowing, quiet cheerful secretive expression, standing in a cavern city lit by pale lanterns, cool grey-blue light'
  },
  {
    id: 'torvash', kind: 'ruler', nameProposed: true, state: { tr: 'Saar’ın İki Ejderha Tacı', en: 'Two Dragon Crowns of Saar', link: '/devletler/saarin-iki-ejderha-taci' }, place: 'Saar-Kor', image: '',
    tr: {
      name: 'Torvash Kızılkanat', role: 'Kızıl Saar’ın hanedan başı',
      canon: 'Kızıl Saar, ejderha soylu hanedanların yönettiği, eski volkan kalelerini elinde tutan devlettir; İlk Ejderhaların Dragonbornları yönetmek için yarattığına inanır. Başkenti Saar-Kor’dur.',
      appearance: 'Kızıl pullu, geniş çeneli yaşlı bir Dragonborn; boynuzları yıllarca cilalanmış gibi parlıyor. Zırhı eski bir volkan kalesinin mührünü taşıyor.',
      temperament: 'Şerefli, gururlu ve geleneğe bağlı; sözünü tutmayı hayatının tek hükmü sayar. İnançlarını eleştirene sert çıkar ama hakaret etmez.',
      wants: 'Mücevher Yemini’ni, ejderha mirasını yalan yanlış okuyanlar olarak damgalayıp tarihin yazarlığını geri almak.',
      fears: 'Soy hafızasının silinmesi; ejderha mirasının bir “uyarı” diye okunması.',
      voice: 'Gür, ağır ve yavaş; her sözün sonunda ismini hatırlatır gibi durur.',
      ties: 'Saar-Kor, Közkapı, Kanattaş; ejderha soylu hanedanlar; Mücevher Yemini ile kökten rekabet.',
      hook: 'Torvash, Mücevher Yemini’nin hafıza kristallerinden birinin Saar-Kor’un atalarının hafızasıyla örtüştüğünü öğrendi. Kristali çalmak mı, saklamak mı istediğine karar veremiyor.',
      gaps: 'Kızıl Saar’ın tek bir hükümdarı olup olmadığı belirtilmez.'
    },
    en: {
      name: 'Torvash Redwing', role: 'Head of the dynasties of Red Saar',
      canon: 'Red Saar is the state of dragon-blooded dynasties, holding the old volcano forts; it believes the First Dragons created the Dragonborn to rule them. Its capital is Saar-Kor.',
      appearance: 'An elderly red-scaled, broad-jawed Dragonborn; his horns shine as if polished for years. His armour carries the seal of an old volcano fort.',
      temperament: 'Honourable, proud and tradition-bound; he counts keeping his word as his life’s one law. He is harsh to critics of his beliefs but does not insult.',
      wants: 'To brand the Gem Oath as misreaders of the dragon legacy and take back authorship of history.',
      fears: 'The erasure of ancestral memory; the dragon legacy being read as a “warning”.',
      voice: 'Booming, heavy and slow; he pauses after each word as if recalling his name.',
      ties: 'Saar-Kor, Embergate, Wingstone; dragon-blooded dynasties; fundamental rivalry with the Gem Oath.',
      hook: 'Torvash learned that one of the Gem Oath’s memory crystals overlaps with the ancestral memory of Saar-Kor. He cannot decide whether to steal it or hide it.',
      gaps: 'Whether Red Saar has a single ruler is not stated.'
    },
    prompt: 'an elderly red-scaled dragonborn with a broad jaw and polished curved horns, heavy ceremonial armour bearing a volcano-fort seal, proud stern expression, standing in a volcanic fortress hall lit by molten glow, deep red-orange light'
  },
  {
    id: 'saelith', kind: 'ruler', nameProposed: true, state: { tr: 'Saar’ın İki Ejderha Tacı', en: 'Two Dragon Crowns of Saar', link: '/devletler/saarin-iki-ejderha-taci' }, place: 'Prizma', image: '',
    tr: {
      name: 'Saelith Prizmasöz', role: 'Mücevher Yemini’nin manastır başı',
      canon: 'Mücevher Yemini, Gem Dragonborn manastırları ve şehir konseyleriyle yönetilir; zihin disiplini, hafıza kristalleri ve ejderha hâkimiyetini reddetmeyi öğretir. Başkenti Prizma’dır.',
      appearance: 'Opal ve gümüş pullu, narin bir Dragonborn; boynunda yedi renkli ince bir mücevher zinciri. Gözleri her ışıkta farklı bir renk alıyor.',
      temperament: 'Sakin, düşünceli ve kendinden emin; tartışmayı sevmez ama hiçbir şey karşısında geri adım atmaz. Soyun hüküm hakkı olmadığına yürekten inanır.',
      wants: 'Hiçbir soyun başkaları üzerinde doğal hüküm hakkı olmadığına dair uyarıyı Saar’a taşımak.',
      fears: 'Hafıza kristallerinin tek bir tarihe indirgenmesi; manastırların Kızıl Saar ile savaşa sürüklenmesi.',
      voice: 'Yumuşak, ölçülü ve çoğunlukla sorularla; cevabı dinleyiciye bırakır.',
      ties: 'Prizma, Derin Işık, Yedi Renk; manastırlar ve şehir konseyleri; Kızıl Saar ile rekabet.',
      hook: 'Saelith’in manastırı, ejderha hafızasının çürümüş bir kristalini saklıyor. Kızıl Saar’dan bir elçi, onu “miras” diye geri istiyor.',
      gaps: 'Manastırların tek bir başı olup olmadığı belirtilmez.'
    },
    en: {
      name: 'Saelith Prismvoice', role: 'Abbot of the Gem Oath monasteries',
      canon: 'The Gem Oath is governed by Gem Dragonborn monasteries and city councils; it teaches mental discipline, memory crystals and rejection of dragon dominion. Its capital is Prisma.',
      appearance: 'A slender Dragonborn with opal and silver scales, a thin seven-coloured gem chain at the neck. Their eyes take a different colour in every light.',
      temperament: 'Calm, thoughtful and self-assured; dislikes argument but yields before nothing. Believes with all their heart that no lineage has a right to rule.',
      wants: 'To carry the warning that no lineage has a natural right of rule to Saar.',
      fears: 'The memory crystals being reduced to one history; the monasteries being dragged into war with Red Saar.',
      voice: 'Soft, measured and mostly in questions; leaves the answer to the listener.',
      ties: 'Prisma, Deep Light, Seven Colours; monasteries and city councils; rivalry with Red Saar.',
      hook: 'Saelith’s monastery holds a decayed crystal of dragon memory. An envoy from Red Saar demands it back as “inheritance”.',
      gaps: 'Whether the monasteries have a single head is not stated.'
    },
    prompt: 'a slender opal-and-silver-scaled dragonborn abbot with soft iridescent eyes, a fine seven-coloured gem chain at the neck, simple monastic robes, calm thoughtful expression, standing in a crystal monastery hall of prismatic light, soft multicolour glow'
  },
  {
    id: 'halvian', kind: 'ruler', nameProposed: true, state: { tr: 'Tuz Ocakları Cumhuriyeti', en: 'Salt Hearth Republic', link: '/devletler/tuz-ocaklari-cumhuriyeti' }, place: 'Hal-Sur', image: '',
    tr: {
      name: 'Halvian Surtuz', role: 'Tuz Ocakları Cumhuriyeti ocak ailesi başı',
      canon: 'Asteron’daki tuz domları üzerinde yükselen oligark cumhuriyet; zengin ocak aileleri oy hakkını elinde tutar, Goblin ve Kobold işçiler yurttaş değildir. Ordan’a gizli yol haritaları satıldığı söylenir.',
      appearance: 'Bir Tuz Cücesi: yaşlanmış ama zinde, yağlı gri örgülü sakalına tuz kristalleri yapışmış, ağır yüzüklü. Beyaz tuz tozu hiç çıkmayan siyah bir mantoda; ayakkabılarının topuğunda tuz kristali birikmiş.',
      temperament: 'Hesaplı, güler yüzlü ve acımasız; işçiyi insan değil kalem olarak görür. Sözünün arkasında durur ama sözü bir sözleşmeden ibarettir.',
      wants: 'Ocak ailelerinin oy hakkını korumak; Ordan’a satılan haritalardan doğacak ticari avantajı kimseyle paylaşmamak.',
      fears: 'Goblin ve Kobold işçilerin yurttaşlık talebinin ocak ailelerinin kayıtlarını açığa çıkarması.',
      voice: 'Yumuşak ve akıcı; sayıları ve vadeleri hiç saklamaz ama bağlamı asla vermez.',
      ties: 'Hal-Sur, Kuru Liman, Acı Kuyu, Fosil Tahtı; Ordan bürokrasisi; ocak ailelerinin meclisi.',
      hook: 'Halvian’ın sattığı haritalardan birinde, haritacının eliyle kapatılmış bir geçit işaretli. Geçidin ardında ne olduğunu Goblin işçiler biliyor.',
      gaps: 'Ocak ailesi sayısı, Halvian’ın rütbesi ve haritaların kime satıldığı kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Halvian Saltmantle', role: 'Head of a hearth family of the Salt Hearth Republic',
      canon: 'An oligarchic republic rising over Asteron’s salt domes; wealthy hearth families hold the vote, and Goblin and Kobold workers are not citizens. Secret road maps are said to be sold to Ordan.',
      appearance: 'A Salt Dwarf: aged but vigorous, salt crystals clinging to an oiled grey braided beard, heavy rings on the fingers. A black mantle never free of white salt dust; salt crystals have gathered at the heels of his shoes.',
      temperament: 'Calculating, genial and ruthless; sees workers as ledger lines, not people. He stands behind his word, but his word is only a contract.',
      wants: 'To protect the hearth families’ vote; to share with no one the commercial advantage from the maps sold to Ordan.',
      fears: 'That Goblin and Kobold workers’ demand for citizenship will expose the hearth families’ records.',
      voice: 'Soft and fluent; never hides numbers and terms, never gives context.',
      ties: 'Hal-Sur, Dry Port, Bitter Well, Fossil Throne; the Ordan bureaucracy; the hearth families’ council.',
      hook: 'One of the maps Halvian sold has a passage closed over by the mapmaker’s own hand. The Goblin workers know what lies behind it.',
      gaps: 'The number of hearth families, Halvian’s rank, and to whom the maps were sold are not stated.'
    },
    prompt: 'an aged vigorous dwarf oligarch with an oiled grey braided beard crusted with white salt crystals, heavy gem rings, a black mantle dusted white with salt, a genial smile that does not reach his eyes, standing in a vast white salt-dome counting hall, cool white and amber light'
  },
  {
    id: 'dokuzuncu-masa', kind: 'council', state: { tr: 'Sis Adaları Cumhuriyeti', en: 'Mist Isles Republic', link: '/devletler/sis-adalari-cumhuriyeti' }, place: 'Velis', image: '',
    tr: {
      name: 'Dokuzuncu Masa’nın Sesi', role: 'Sis Adaları’nın gizli yönetim kurulunun sözcüsü',
      canon: 'Sis Adaları ticaret konseyleri ile kimliği gizli Dokuzuncu Masa tarafından yönetilir. Dışarıya kimlik ve sigorta hukuku satar; asıl gücü yüzsüz ağları, devlet sırları ve sözleşmeyle tutulan suikastçılardır. Tarafsızlık görüntüsü altında savaşan taraflara sır, kimlik ve ölüm sattığı suçlanır. Bu kişi kimliği gizli bir rol, ad değildir.',
      appearance: 'Bir Changeling: yüzü hiç aynı hatırlanmayan biri; kimi zaman yaşlı bir tüccar, kimi zaman genç bir kâtip gibi görünür, ama gözleri hep soluk griyle kalır. Daima aynı gri eldivenleri takar ve elinde bir sigorta defteri taşır.',
      temperament: 'Nazik, tarafsız görünen ve ürkütücü derecede ayrıntıcı; öfkelenmez, “risk” hesaplar. Herkesle eşit mesafedeymiş gibi davranır.',
      wants: 'Tarafsızlık görüntüsünü korumak; her savaşan tarafın borçlusu olmak.',
      fears: 'Dokuzuncu Masa’nın üyelerinin tek bir isimle eşleştirilmesi.',
      voice: 'Akıcı, yumuşak ve kalıplaşmış; her cümleyi “sigortalı” ya da “sigortasız” diye bitirir.',
      ties: 'Üç Yüz Limanı, Kızıl Fener, Batık Saat, Kör İskele; ticaret konseyleri; sözleşmeli suikastçılar.',
      hook: 'Masa’nın Sesi bu hafta üç farklı limanda üç farklı kişi olarak görüldü. Aynı gün, üç farklı taraf aynı kimliği satın almış.',
      gaps: 'Dokuzuncu Masa’nın kaç üyesi olduğu, kimler olduğu ve Ses’in tek kişi mi bir rol mü olduğu kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Voice of the Ninth Table', role: 'Spokesperson of the Mist Isles’ hidden board',
      canon: 'The Mist Isles are governed by trade councils and the identity-hidden Ninth Table. It sells identity and insurance law abroad; its real power lies in faceless networks, state secrets and contract assassins. Under a show of neutrality it is accused of selling secrets, identities and death to warring sides. This figure is a hidden-identity role, not a name.',
      appearance: 'A changeling: someone whose face is never remembered the same; sometimes an old merchant, sometimes a young clerk, though the eyes always stay a pale grey. Always the same grey gloves, always an insurance ledger in hand.',
      temperament: 'Courteous, seemingly neutral and unnervingly meticulous; never angry, always computing “risk”. Behaves as if at equal distance from everyone.',
      wants: 'To keep up the show of neutrality; to be creditor to every warring side.',
      fears: 'Any member of the Ninth Table being matched to a single name.',
      voice: 'Fluent, soft and formulaic; ends every sentence with “insured” or “uninsured”.',
      ties: 'Three Hundred Harbours, Red Lantern, Sunken Clock, Blind Pier; the trade councils; contract assassins.',
      hook: 'The Voice was seen this week in three different harbours as three different people. On the same day, three different parties bought the same identity.',
      gaps: 'How many members the Ninth Table has, who they are, and whether the Voice is one person or a role are not stated.'
    },
    prompt: 'a changeling with an ambiguous androgynous face whose features seem to shift and blur subtly, pale grey eyes, immaculate dark coat, identical grey gloves, holding an insurance ledger, faint courteous smile, standing on a misty harbour pier at dusk with lanterns, soft grey-teal fog light'
  },
  {
    id: 'tarth', kind: 'council', nameProposed: true, state: { tr: 'Kara Mühür Adaları', en: 'Black Seal Isles', link: '/devletler/kara-muhur-adalari' }, place: 'Kara Mühür', image: '',
    tr: {
      name: 'Tarth Ağırbaşı', role: 'Ağırlık Mahkemeleri başkanı',
      canon: 'Kara Mühür’de bir sikkenin değeri tartıldığı taş, vurulduğu damga ve arkasındaki ödeme zinciriyle belirlenir. Merkezî kurum Ağırlık Mahkemeleri’dir; bir devleti “eksik mühürlü” ilan ederek savaş gemisi göndermeden etkilenebilir. Mahkemeler tek başına gücü kullanamaz; denetim evleri, darphane ocakları ve yurttaş meclisleri birbirini denetler.',
      appearance: 'Dar omuzlu, titiz bir Vedalken; boynunda ayarlı bir terazi madalyonu, ellerinde mürekkep ve bakır lekeleri. Gözlüğü her şeyi ölçer gibi bakıyor.',
      temperament: 'Soğukkanlı, ilkeli ve inatçı; rüşvete değil ölçüye tapar. Tarafsızlık için kendi çıkarını feda etmekten çekinmez.',
      wants: 'Mührün güvenilirliğini her devlet ve her paralı için aynı tutmak.',
      fears: 'Bir devletin mühürü gizlice sahtelemesi; Mahkemelerin tek bir kararla siyasete alet edildiği düşüncesi.',
      voice: 'Düz, ölçülü ve resmî; sayıları tam okur, yuvarlamaz.',
      ties: 'Ağırlık Mahkemeleri, denetim evleri, darphane ocakları; Vedalken ölçüm uzmanları, Gnom ve Autognome mühendisleri, Warforged işçi-yurttaşlar.',
      hook: 'Dış limanlardan birinde yeni bir maaş senedi dolaşıyor; mührü doğru, ağırlığı yanlış. Tarth, senedi kimin bastığını biliyor ve bunu söylemek istemiyor.',
      gaps: 'Tarth’ın görevi seçimle mi atamayla mı geldiği ve Mahkeme üye sayısı kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Tarth Weightbearing', role: 'Chair of the Weight Courts',
      canon: 'In Black Seal a coin’s value is set by the stone it is weighed on, the stamp it bears and the payment chain behind it. The central institution is the Weight Courts; declaring a state “short-sealed” can hurt it without sending a warship. The Courts cannot wield this power alone; audit houses, mint hearths and citizen councils check one another.',
      appearance: 'A narrow-shouldered, meticulous Vedalken with an adjustable balance medallion at the neck, ink and copper stains on the hands. The spectacles seem to measure everything they look at.',
      temperament: 'Cool-headed, principled and stubborn; worships measure, not bribes. Does not hesitate to sacrifice self-interest for impartiality.',
      wants: 'To keep the seal’s trustworthiness equal for every state and every mercenary.',
      fears: 'A state secretly counterfeiting the seal; the idea that the Courts were made a political tool by a single ruling.',
      voice: 'Flat, measured and formal; reads numbers exactly, never rounds.',
      ties: 'The Weight Courts, audit houses, mint hearths; Vedalken measurers, Gnome and Autognome engineers, Warforged worker-citizens.',
      hook: 'A new pay-note is circulating in one of the outer ports; its seal is right and its weight wrong. Tarth knows who struck it and does not want to say.',
      gaps: 'Whether Tarth’s office came by election or appointment and the number of Court members are not stated.'
    },
    prompt: 'a narrow-shouldered meticulous vedalken judge with blue-grey skin, small spectacles, a balance-scale medallion at the neck, ink and copper stains on his hands, precise cool expression, standing in a court of brass scales and weights, cool teal and brass light'
  },
  {
    id: 'perrin', kind: 'council', nameProposed: true, state: { tr: 'Güneşçayır Birliği', en: 'Sunmeadow Union', link: '/devletler/yesil-su-birligi' }, place: 'Arıbahçe', image: '',
    tr: {
      name: 'Perrin Arıbahçe', role: 'Güneşçayır Birliği’nin borç silme sözcüsü',
      canon: 'Halfling şehirlerinin oluşturduğu birlik; her yedinci yılda belirli borçlar silinir. Tüccar aileleri ile eşik koruyucuları güç mücadelesindedir. Yedinci yıl borç silme, kapıyla ilgili eski karşılıklılık borçlarını da yeniden açar.',
      appearance: 'Yuvarlak yüzlü, yaşlı ve sıcak bakışlı bir Halfling; omzunda bal rengi bir şal, elinde silinen borçların yazılı olduğu eski bir defter.',
      temperament: 'Cömert, hoşgörülü ve şaşırtıcı derecede kararlı; borç silmeyi bir lütuf değil hukuki bir görev sayar. Tüccarların aç gözlülüğünden çok eşik koruyucularının katılığından çekinir.',
      wants: 'Yedinci yıl borç silmenin hem tüccar hem eşik koruyucuları için yürürlükte kalması.',
      fears: 'Kapıyla ilgili eski karşılıklılık borçlarının silinmesiyle yaşayan eşiğin misafirlik sözünün çözülmesi.',
      voice: 'Sıcak, uzun ve dolambaçlı anlatır; kısa cevap vermez ama dinleyicisini kaybetmez.',
      ties: 'Filizliman, Yeni Kök, Yağmurkapı, Arıbahçe, Yeşil Köprü; eşik koruyucuları; tüccar aileleri; Ayçekirdek çevresindeki geçit.',
      hook: 'Yedinci yıl yaklaşırken defter bir borcu sildi, fakat silinen kişi Ayçekirdek geçidinde hâlâ ödemeye geliyor. Defter, geçit ve kişi aynı anda doğru olamaz.',
      gaps: 'Birliğin tek sözcüsü olup olmadığı ve Perrin’in yetkisi kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Perrin Beegarden', role: 'Debt-forgiveness speaker of the Sunmeadow Union',
      canon: 'A union of Halfling cities in which certain debts are cancelled every seventh year. Merchant families and threshold-keepers are locked in a power struggle. The seventh-year forgiveness also reopens old reciprocity debts tied to the gate.',
      appearance: 'A round-faced, elderly, warm-eyed Halfling with a honey-coloured shawl over the shoulder, an old ledger of cancelled debts in hand.',
      temperament: 'Generous, tolerant and surprisingly resolute; counts debt cancellation as a legal duty, not a favour. Fears the threshold-keepers’ rigidity more than the merchants’ greed.',
      wants: 'For seventh-year forgiveness to remain in force for both merchants and threshold-keepers.',
      fears: 'That cancelling old reciprocity debts tied to the gate will unravel the living threshold’s hospitality oath.',
      voice: 'Warm, long and winding; never gives a short answer but never loses the listener.',
      ties: 'Sproutport, New Root, Rain Gate, Beegarden, Green Bridge; the threshold-keepers; merchant families; the gate around Sunseed.',
      hook: 'As the seventh year nears, the ledger cancelled a debt, yet the cancelled person still comes to pay at the Sunseed gate. Ledger, gate and person cannot all be right at once.',
      gaps: 'Whether the Union has a single speaker and what authority Perrin holds are not stated.'
    },
    prompt: 'a round-faced elderly halfling with warm kind eyes, a honey-coloured shawl over his shoulder, holding an old ledger tied with twine, gentle determined expression, standing in a sunlit meadow-hall of beehives and wooden shelves, warm golden light'
  },
  {
    id: 'zhaqaras-sister', kind: 'kin', state: { tr: 'Qasyrra İmparatorluğu', en: 'Qasyrra Empire', link: '/devletler/qasyrra-imparatorlugu' }, place: 'Qasyrra', image: '',
    tr: {
      name: 'Zhaqara’nın Kız Kardeşi', role: 'İmparatoriçenin kız kardeşi · görevi bilinmiyor',
      canon: 'Zhaqara’nın bir kız kardeşi olduğu kayıtlıdır. Adı, görevi, yeri ve imparatorlukla ilişkisi hiçbir kayıtta yoktur; yalnızca var olduğu bilinir.',
      appearance: 'Yüzünün alt yarısı ince bir tülle örtülü; dalgalı, koyu ve hafif yeşil yansımalı saçları, alnında yakut taşlı altın bir bandajı var. Turuncu ve çivit rengi nakışlı katmanlı giysiler, parmaklarında zümrüt ve yakut yüzükler taşıyor. Arkasında baharat dumanı ve tütsü kapları görünüyor.',
      temperament: 'Bilinmez. Kanon yalnızca varlığını söyler.',
      wants: 'Bilinmez.',
      fears: 'Bilinmez.',
      voice: 'Bilinmez.',
      ties: 'Zhaqara; matrilineal hanedan.',
      hook: 'Qasyrra kayıtlarında kız kardeşin adının yazılacağı yer her seferinde boş bırakılmış. Bunun bir unutma mı, bir yasak mı olduğu belli değil.',
      gaps: 'Adı, görevi, yaşı, halkı, yeri ve Zhaqara ile ilişkisi bilinmez.'
    },
    en: {
      name: 'Zhaqara’s Sister', role: 'The empress’s sister · office unknown',
      canon: 'It is recorded that Zhaqara has a sister. Her name, office, whereabouts and relation to the empire are recorded nowhere; only her existence is known.',
      appearance: 'The lower half of her face is covered by a fine veil; wavy dark hair with a faint green sheen, a gold headband set with a ruby on her brow. She wears layered robes embroidered in orange and indigo, emerald and ruby rings on her fingers. Spice smoke and incense burners are visible behind her.',
      temperament: 'Unknown. Canon says only that she exists.',
      wants: 'Unknown.',
      fears: 'Unknown.',
      voice: 'Unknown.',
      ties: 'Zhaqara; the matrilineal dynasty.',
      hook: 'In Qasyrra’s records the place where the sister’s name should be written is left blank every time. Whether this is forgetting or prohibition is unclear.',
      gaps: 'Her name, office, age, people, whereabouts and relation to Zhaqara are unknown.'
    },
    prompt: 'a veiled noblewoman of a desert empire, lower half of her face covered by a fine gold-embroidered veil, wavy dark hair with a faint green sheen, a gold headband set with a ruby, layered orange and indigo embroidered robes, emerald and ruby rings, one hand raised to the veil, standing before incense burners with drifting spice smoke, warm amber light'
  }
]

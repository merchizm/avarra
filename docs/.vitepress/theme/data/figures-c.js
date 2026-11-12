// C katmanı: tarihî kişiler. `nameProposed: true` olanların adı kayıtta yoktur, öneridir (rol ve olay kanondur).

export const figuresC = [
  {
    id: 'besinci-kral', kind: 'historic', state: { tr: 'Beşinci Krallık', en: 'The Fifth Kingdom', link: '/durgunluk/besinci-krallik' }, place: 'Kurumuş iç deniz kıyısı', image: '',
    tr: {
      name: 'Beşinci Krallığın Kralı', role: 'Adı silinmiş hükümdar · SÖ 18–0',
      canon: 'Kurumuş iç denizin doğu kıyısındaki krallığın adı, arması ve siyasî kimliği Durgunluk sırasında silindi; çevre halkları hükümdarını da hatırlayamadı. Ordan sayımının son kaydında hükümdar adı boş. İki teori ona bakar: Başarısız Ölümsüzlük Ayini (kendisini, hanedanını veya ülkesini ölümden korumaya çalıştı) ve Göksel Ceza (yöneticiler kendilerini ilahî Makamlara yükseltmeye çalışıp cezalandırıldı). İkisi de kanıtlanmamıştır.',
      appearance: 'Yüzü yok; yalnız bir siluet: taçsız ama bir taç taşımış gibi dik duran, yüzü bir bulanıklıkla örtülmüş bir kral. Giysisi bir hükümdarınki, ama armasının yeri boş bir yama.',
      temperament: 'Bilinmez. Kanıt yok; yalnız başkalarının bıraktığı iz var: komşuları “fazla uysal” bulmuştu.',
      wants: 'Kanonda yok. İki teoriye göre ya ölümü ya da bir yükselişi.',
      fears: 'Kanonda yok.',
      voice: 'Duyulmamış; elçisi “kral yemin etti” diye döndü.',
      ties: 'Beşinci Krallık, Soluk Çanak, Ordan’ın son sayımı; Doran’ın kaybolduğu Kör Madenler’le bağı ve Solgun Çember’in aradığı iz.',
      hook: 'Perah’ın defterindeki unutulmuş cümle bu kralın adı olabilir. Ama o adı yeniden yazan herkes, bir sonraki gün onu yazdığını da unutuyor.',
      gaps: 'Adı, yüzü, ırkı, yaşı, ölümsüzlük ayini yaptı mı, ceza aldı mı, hayatta mı: hiçbiri bilinmez.'
    },
    en: {
      name: 'King of the Fifth Kingdom', role: 'Erased ruler · 18–0 BC',
      canon: 'The name, arms and political identity of the kingdom on the dried inland sea’s eastern shore were erased during Stagnation; surrounding peoples could not recall its ruler either. In Ordan’s final census record the ruler’s name is blank. Two theories look at him: the Failed Immortality Rite (he sought to shield himself, his dynasty or his land from death) and Celestial Punishment (the rulers tried to raise themselves to divine Seats and were punished). Neither is proven.',
      appearance: 'No face; only a silhouette: a crownless king standing as if he had once worn one, his face covered by a blur. His clothes are a sovereign’s, but where the arms should be there is an empty patch.',
      temperament: 'Unknown. No evidence; only traces others left: his neighbours found him “too docile”.',
      wants: 'Not in canon. According to the two theories, either death or an ascension.',
      fears: 'Not in canon.',
      voice: 'Never heard; his envoy returned saying “the king swore the oath”.',
      ties: 'The Fifth Kingdom, the Pale Basin, Ordan’s last census; a link to the Blind Mines where Doran vanished, and the trace the Pale Circle seeks.',
      hook: 'The forgotten sentence in Perah’s notebook may be this king’s name. But everyone who writes the name again forgets, by the next day, that they wrote it.',
      gaps: 'His name, face, people, age, whether he performed an immortality rite, whether he was punished, whether he lives: none is known.'
    },
    prompt: 'a crownless king in sovereign’s robes standing upright, his face covered by a soft smeared blur as if erased from memory, an empty blank patch where a coat of arms should be, standing at the edge of a dried inland sea basin at pale dawn, muted ash-grey and bone light, haunting atmosphere'
  },
  {
    id: 'ilk-imparator', kind: 'historic', nameProposed: true, state: { tr: 'Ordan İmparatorluğu', en: 'Ordan Empire', link: '/devletler/ordan-imparatorlugu' }, place: 'Ordanor', image: '',
    tr: {
      name: 'İlk İmparator Aldemar', role: 'Ordan’ın ilk imparatoru · SÖ 120 civarı',
      canon: 'SÖ 120 civarında ilk imparator taç giydi ve İmparatorluk Hesabı başladı. Saray tarihçileri geçmişi yeniden yazdı: kazalar ve acele hamleler “Meridyen Planı” adıyla tek bir kaderin parçası oldu. Veraset için sabit bir kural yoktu; imparator evlatlık edindiği varisi seçerdi.',
      appearance: 'Bir Veyran: bütünüyle insansı, ama gözlerinde iç içe iki iris halkası, ellerinde ince doğal çizgiler var. Orta yaşlı, ağır omuzlu, ölçülü; sade bir taç, omuzunda sayım defterlerinin mühürlerinden örülmüş bir şal. Elinde bir sayım kalemi tutuyor, kılıç değil.',
      temperament: 'Hesapçı, soğukkanlı ve çok sabırlı; yıllar boyu aynı planı bir hata kadar sessiz yürütür. Zaferi kutlamaz, kayda geçirir.',
      wants: 'Dağınık bir imparatorluğu sayım, yol ve kayıtla tek bir aygıt hâline getirmek; kendinden sonra gelecek hükümdarı kendisi seçmek.',
      fears: 'Kendi yükselişinin plan değil tesadüf olarak anlaşılması; kaydın başkası tarafından yazılması.',
      voice: 'Kısa, ölçülü ve aşırı doğru; her cümle bir sayıyla biter.',
      ties: 'Sayım kuleleri ve kamu ambarları; saray tarihçileri; Meridyen Planı anlatısı; ilk Düzen Karşıtları.',
      hook: 'Aldemar’ın saray tarihçilerine yazdırdığı ilk Meridyen Planı metninin bir nüshası, tarihçinin kendi el yazısıyla “yazılmadı” diye düzeltilmiş bulunuyor.',
      gaps: 'Adı, kökeni ve ölümü kayıtlarda belirtilmez.'
    },
    en: {
      name: 'First Emperor Aldemar', role: 'Ordan’s first emperor · c. 120 BC',
      canon: 'Around 120 BC the first emperor was crowned and the Imperial Reckoning began. Court historians rewrote the past: accidents and hasty moves became parts of a single fate under the name “the Meridian Plan”. There was no fixed rule of succession; the emperor chose his adopted heir.',
      appearance: 'A Veyran: fully human-like, but with two nested iris rings in each eye and fine natural lines on the hands. Middle-aged, heavy-shouldered and measured; a plain crown, a shawl stitched from the seals of census ledgers on his shoulder. He holds a census stylus, not a sword.',
      temperament: 'Calculating, cool-headed and endlessly patient; runs the same plan for years as quietly as a mistake. He does not celebrate victory, he records it.',
      wants: 'To turn a scattered empire into a single apparatus by census, road and record; to choose his own successor.',
      fears: 'That his rise will be understood as chance rather than plan; that the record will be written by someone else.',
      voice: 'Short, measured and overly exact; each sentence ends with a number.',
      ties: 'The census towers and public granaries; the court historians; the Meridian Plan narrative; the first Anti-Order movements.',
      hook: 'A copy of the first Meridian Plan text Aldemar had his historians write has been corrected, in the historian’s own handwriting, to read “was not written”.',
      gaps: 'His name, origin and death are not stated in the record.'
    },
    prompt: 'a middle-aged heavy-shouldered emperor who looks fully human, with distinctive eyes: each iris has two clearly visible concentric rings, and faint fine natural line patterns trace the skin of his hands, calm exact expression, a plain gold crown, a shawl stitched from the seals of census ledgers, holding a census stylus instead of a sword, standing in a hall of tall record towers, warm gold and ink-brown light'
  },
  {
    id: 'medrin', kind: 'historic', nameProposed: true, state: { tr: 'Ordan İmparatorluğu', en: 'Ordan Empire', link: '/devletler/ordan-imparatorlugu' }, place: 'Halvek', image: '',
    tr: {
      name: 'Medrin Kapıaçan', role: 'Halvek loncalarının önderi · SÖ 57',
      canon: 'SÖ 63–58’de Ordan Halvek çevresindeki tahıl yollarını kesti; Yüksek Taç soyluları halktan ağır vergi ve asker topladı, şehir loncaları saraya karşı döndü. SÖ 57’de Halvek’in kapıları içeriden açıldı. Ordan yağmayı yasakladı ve kapıları açan loncalara haklar verdi. İnsan tarihçileri bunun ihanet mi, halkı kurtarma mı olduğunu hâlâ tartışır.',
      appearance: 'Yaşlı, güçlü eller ve yıpranmış bir lonca zinciri taşıyan bir Halvek halk önderi; kapı anahtarlarına benzeyen küçük bir demir halka demeti kemerinde asılı. Gözleri yorgun ve kararlı.',
      temperament: 'Pragmatik, vicdanlı ve içten bölünmüş; kapıları açtığı gece tek bir şeyden emindi: aç bırakılan şehir bir saraydan daha önemliydi. Yağmanın yasaklanmasına şaşırdı ve bunu hâlâ açıklayamıyor.',
      wants: 'Şehri açlıktan ve yağmadan kurtarmak; loncaların haklarını kayda geçirmek.',
      fears: 'Kapıların onun elinden açılmasının “ihanet” diye anılması; Ordan’ın yağmayı yasaklama nedeninin başka bir niyetin parçası olması.',
      voice: 'Düz, yorgun ve doğrudan; konuyu uzatmaz, gerekçeyi sona bırakır.',
      ties: 'Halvek loncaları; Yüksek Taç soyluları (karşı taraf); Ordan sarayı ve onun tahıl yolu kesintisi; Seressa kıyısı.',
      hook: 'Medrin’in kapı anahtarı halkası hâlâ Halvek’te. Ordan, o anahtarın “geri verilmesini” istiyor; loncalar ise onun bir hak belgesi olduğunu savunuyor.',
      gaps: 'Önderin adı, kaç kişiyle birlikte hareket ettiği ve sonraki yaşamı kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Medrin Gateopener', role: 'Leader of the Halvek guilds · 57 BC',
      canon: 'In 63–58 BC Ordan cut the grain roads around Halvek; the High Crown nobles levied heavy taxes and soldiers from the people, and the city guilds turned against the court. In 57 BC Halvek’s gates were opened from within. Ordan banned plunder and granted rights to the guilds that opened the gates. Human historians still debate whether this was betrayal or rescue of the people.',
      appearance: 'An elderly Halvek popular leader with strong hands and a worn guild chain; a bundle of small iron rings like gate keys hangs from his belt. His eyes are tired and resolute.',
      temperament: 'Pragmatic, conscientious and inwardly divided; the night he opened the gates he was sure of only one thing: a starved city mattered more than a palace. He was surprised by the ban on plunder and still cannot explain it.',
      wants: 'To save the city from hunger and plunder; to record the guilds’ rights.',
      fears: 'That opening the gates at his hand will be remembered as “betrayal”; that Ordan’s reason for banning plunder was part of another intent.',
      voice: 'Flat, tired and direct; does not belabour a point, leaves the reasoning to the end.',
      ties: 'The Halvek guilds; the High Crown nobles (the other side); the Ordan court and its grain-road cut-off; the Seressa coast.',
      hook: 'Medrin’s gate-key ring is still in Halvek. Ordan wants the key “returned”; the guilds insist it is a charter of rights.',
      gaps: 'The leader’s name, how many acted with him, and his later life are not stated in the record.'
    },
    prompt: 'an elderly human guild leader of Halvek with strong weathered hands and a worn guild chain, a bundle of small iron gate-key rings hanging from his belt, tired resolute eyes, standing before a great opened city gate at dawn with a crowd in the distance, warm grey-gold light'
  },
  {
    id: 'teravin', kind: 'historic', nameProposed: true, state: { tr: 'Kırık Kule Krallığı', en: 'Broken Tower Kingdom', link: '/durgunluk/kirik-kule' }, place: 'Seressa kıyısı', image: '',
    tr: {
      name: 'Prens Teravin Kırıkkule', role: 'Ordan’la anlaşan Kırık Kule hanedan kolu · SÖ 74',
      canon: 'SÖ 82–75 Boğaz Savaşları’nda Kırık Kule, Ordan gemilerinin iç nehir yollarına ulaşmasını engellemeye çalıştı; insan krallıkları ortak filo kuramadı. SÖ 74’te kıyı kaleleri düştü. Hanedanın bir kolu Ordan’la anlaştı; diğerleri Nareth’e kaçtı ve orada göçebe sürülere karıştı. Bugünkü Kırık Kule Hanesi’ndeki uzlaşmacı ve savaşçı ayrımın kökeni budur.',
      appearance: 'Yorgun ama kibar bir kıyı soylusu; zırhını çoktan çıkarmış, yalnız yıldırımla yarılmış fener kulesi işlenmiş bir mühür yüzüğü takıyor. Saçlarına tuz kristali yapışmış.',
      temperament: 'Gururlu ama gerçekçi; kaybedilen savaşı kabul eder, kaybedilen onuru kabul etmez. Anlaşmayı “hanedanı kurtarmak” diye gerekçelendirir ve kendine bile tam inanmaz.',
      wants: 'Hanedanı, adını ve kıyı şehirlerini Ordan’ın altında bile ayakta tutmak.',
      fears: 'Anlaşmayı reddeden kardeşlerin sürülerde yok olması; torunlarının onu bir hain olarak anması.',
      voice: 'Resmî, kibar ve çok yavaş; her cümleyi bir özür gibi bitirir.',
      ties: 'Kırık Kule kıyı kaleleri, Seressa; Ordan sarayı (anlaşma); Nareth’e kaçan kardeşler ve göçebe sürüler.',
      hook: 'Teravin’in imzaladığı anlaşmanın bir nüshası Kırık Kule Hanesi’nin bugünkü uzlaşmacı kolunda; Nareth’teki savaşçı kolun elinde ise farklı bir metin var.',
      gaps: 'Adı, kardeşlerinin sayısı ve anlaşmanın şartları kayıtlarda belirtilmez.'
    },
    en: {
      name: 'Prince Teravin Brokentower', role: 'Broken Tower dynasty branch that struck the deal with Ordan · 74 BC',
      canon: 'In the Strait Wars of 82–75 BC, Broken Tower tried to stop Ordan ships reaching the inner river roads; the human kingdoms could not field a joint fleet. In 74 BC the coastal forts fell. One branch of the dynasty made a deal with Ordan; the others fled to Nareth and mixed with the nomadic herds. This is the origin of the conciliatory-and-warrior split in today’s House Broken Tower.',
      appearance: 'A tired but courteous coastal noble who has long since removed his armour; he wears only a signet ring engraved with a lightning-split lighthouse. Salt crystals cling to his hair.',
      temperament: 'Proud but realistic; accepts a lost war, not a lost honour. Justifies the deal as “saving the dynasty” and does not fully believe it himself.',
      wants: 'To keep the dynasty, its name and the coastal cities standing, even under Ordan.',
      fears: 'That his siblings who refused the deal will perish among the herds; that his descendants will remember him as a traitor.',
      voice: 'Formal, courteous and very slow; ends each sentence like an apology.',
      ties: 'The Broken Tower coastal forts, Seressa; the Ordan court (the deal); the siblings who fled to Nareth and the nomadic herds.',
      hook: 'A copy of the agreement Teravin signed lies with today’s conciliatory branch of House Broken Tower; the warrior branch in Nareth holds a different text.',
      gaps: 'His name, the number of his siblings and the terms of the deal are not stated in the record.'
    },
    prompt: 'a tired courteous human coastal noble prince without armour, salt crystals clinging to his hair, a signet ring engraved with a lightning-split lighthouse, plain dark court robes, melancholy proud expression, standing on a windswept coastal fort wall at dusk, cold grey-blue light'
  }
]

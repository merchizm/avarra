<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page, lang } = useData()
const slug = computed(() => page.value.relativePath.replace(/^en\/irklar\//, '').replace(/^irklar\//, '').replace(/\.md$/, ''))
const entries = {
  insanlar: ['İnsan kültürleri', 'Eski Taçlılar, Ormandoğanlar, Yol Ocakları ve İmparatorluk İnsanları aynı kökten gelse de yurt, hanedan ve yurttaşlık hakkında farklı cevaplar verir.'],
  veyranlar: ['Veyran kültürleri', 'Meridyen Veyranları kayıt ve ölçümü; Sınır Veyranları yerel bağları; Çizgisizler sınav bürokrasisini; Düzen Karşıtları ise yaşayan dünyayı savunur.'],
  'orman-elfleri': ['Orman Elfleri', 'Kök muhafızları koruluk, cenaze alanı ve eski antların bekçisidir; uzun ömür, insan mülteciliğine dair siyaseti de biçimlendirir.'],
  'yuksek-elfler': ['Yüksek Elfler', 'Lethar çevresinde yıldız kaydı, diplomasi evleri ve uzun vadeli bilgi mirası öne çıkar; soy, bu eğitimin zorunlu şartı değildir.'],
  'deniz-elfleri': ['Deniz Elfleri', 'Gelgit elçileri resif, kıyı ve Mercan Sarayları arasında geçiş hukukunu korur; deniz akrabalığı kara devletlerinin sınırından daha eski kabul edilir.'],
  drowlar: ['Drow kültürleri', 'İpek Tahtı, Karanlık Liman ve Ayaltı sürgünleri farklı hukuklar taşır. Drow kimliği tek bir hanedan ya da inanca indirgenmez.'],
  eladrin: ['Eladrin mevsim kültürleri', 'İlkbahar bağışlama, Yaz koruma, Sonbahar anlatı ve Kış yas ile anılır. Mevsim, kalıcı kast değil, hayat boyunca değişebilen duygusal ve toplumsal bir hâlidir.'],
  firbolglar: ['Firbolg kültürleri', 'Koruluk bekçileri hayvan göçü, kutsal alan ve cenaze koruluğunu birlikte korur; sessizlik ve geri çekilme, dış dünyaya kayıtsızlık anlamına gelmez.'],
  dikenkanlilar: ['Dikenkanlı kültürleri', 'Kabuk, yaprak veya boynuz taşıyan topluluklar, Diken Tacı içinde eşit yurttaşlık ve sınır hizmeti için görünür mücadele verir.'],
  satyrler: ['Satyr kültürleri', 'Bağ, müzik, konukluk ve fey geçitleri satyr yaşamının merkezidir. Şenlik, siyasal haberleşme ve ant yenilemenin de yoludur.'],
  cuceler: ['Dağ Cücesi kültürleri', 'Kar-Dur ocak hukuku, yemin dövme ve taş hafızası etrafında kurulur. Taç, maden ve tünel üzerindeki yetkisini ocak meclisleriyle paylaşmak zorundadır.'],
  'tuz-cuceleri': ['Tuz Cücesi kültürleri', 'Tuz mahzenleri saklama, kıtlık payı ve su hukukunun merkezidir; mahzen muhafızları ticaret kadar hayatta kalma hakkını da kaydeder.'],
  gnomlar: ['Gnom kültürleri', 'Gözlemevi, bahçe ve gezici tamir ocağı arasında dolaşan bilgi; icattan çok bakım, deneme ve ortak kayıtla değer kazanır.'],
  svirfneblinler: ['Nimrûn kültürleri', 'Nimrûnlar taşın içindeki yankılardan doğduklarını anlatır. Fener izleyicileri derin yolları, ışık ritmi ve güvenli geçişi korur.'],
  duergarlar: ['Duergar kültürleri', 'Kor-Dum meclisleri vardiya, emek ve yurttaşlık hukukunu öne çıkarır; Kara Örs geleneğiyle aralarındaki fark soy değil siyasal tercihtir.'],
  halflingler: ['Halfling kültürleri', 'Nehir, yol ve ada kolları tahıl, haber ve sigorta ağlarıyla bağlanır. Kervan arabuluculuğu, geçişi ortak yük sayar.'],
  goblinler: ['Goblin kültürleri', 'Gece loncaları şehirlerin görünmeyen işlerini yürütür. Ustalık, mahalleye verilen hizmet ve sözlü iş ağları üzerinden tanınır.'],
  hobgoblinler: ['Hobgoblin kültürleri', 'Külordu kentlerinde kamu hizmeti, hat disiplini ve liyakat öne çıkar; askerî düzen bütün Hobgoblinlerin kişiliği değildir.'],
  koboldlar: ['Kobold kültürleri', 'Baca mühendisleri, tünel emeği ve ortak güvenlik kobold topluluklarının temelidir. Ejderha söylenceleri farklı ocaklarda farklı yorumlanır.'],
  genasiler: ['Genasi kültürleri', 'Toprak, Ateş, Su, Buz, Kristal ve Kül soyları tek bir halk değildir. Her biri Camova ve diğer havzalarda ayrı meslek, hafıza ve çevre bilgileri geliştirir.'],
  dragonbornlar: ['Dragonborn kültürleri', 'Kızıl Saar şeref ve hizmeti, Mücevher Yemini zihin disiplini ve sorumluluğu vurgular. Ejderha mirası, tek bir siyasal sadakat emretmez.'],
  minotaurlar: ['Minotaur kültürleri', 'Labirent, hapis değil doğru yolun tek bir çizgiden ibaret olmadığını anlatan kutsal bir imgedir; kaptanlar rota ve karar sorumluluğu taşır.'],
  centaurlar: ['Centaur kültürleri', 'Uçsuz Yol’da mülkiyetten çok geçiş hakkı kutsaldır. Yol muhafızları hayvan, kervan ve yolcu için mevsimsel koridorları açık tutar.'],
  orclar: ['Orc kültürleri', 'Kızıl Toprak’ta akrabalık, kontrollü ateş ve otlak yenileme bilgisi yaşar. Ateş şenliği yağma değil, bakım ve sınır hatırlama törenidir.'],
  'yari-orclar': ['Yarı-Orc kültürleri', 'Yarı-Orc bir kültür değil soy durumudur. Sınır arabuluculuğu, kişinin iki dünyaya ait olmadığının değil, birçok topluluğa ait olabildiğinin kaydıdır.'],
  lizardfolklar: ['Lizardfolk kültürleri', 'Delta krallıkları su hukukunu atalar, kanallar ve taşkınla birlikte düşünür. Saz mühendisliği, siyaset ve gündelik bakımın aynı işidir.'],
  tortlelar: ['Tortle kültürleri', 'Uzun Kabuk Yolları ada, manastır ve göç rotalarını bağlar. Kabuk arşivleri kişisel hatıradan çok kuşaklar arası yol bilgisidir.'],
  grunglar: ['Grung kültürleri', 'Yağmur ormanındaki gölet kentleri renk, görev ve şifa bilgisiyle düzenlenir. Renk toplumsal rolü gösterebilir, değeri değil.'],
  tabaxiler: ['Tabaxi kültürleri', 'Yağmur izleyicileri hikâye, nadir nesne ve güzergâh bilgisini servet sayar; merak, yağma izni değil paylaşılacak sorumluluktur.'],
  kenkular: ['Kenku kültürleri', 'Canlı kayıtçılar ses, taklit ve anlatıyı taşıyan gezgin ağlar kurar. Kaydedilen sözün bağlamını korumak mesleğin ahlakıdır.'],
  goliathlar: ['Goliath kültürleri', 'Buz yolu bekçileri geçiş hakkı ve yük paylaşımını soy üstünlüğünün önüne koyar; fırtınada en yavaş yolcunun kaderi herkesindir.'],
  changelingler: ['Changeling kültürleri', 'Sis Adaları’nda aile sözleşmeleri ve çoklu yasal kimlikler yaşar. Değişen yüz, yalanın kanıtı değil; rıza ve kayıt hukuku meselesidir.'],
  tieflingler: ['Tiefling soy evleri', 'Kor, Ayaz, Deniz Uçurumu, Fey-Diken ve Durgunluk gibi farklı soy evleri vardır. Tieflinglik ayrı millet değil, birçok kültürde görülen işaretler bütünüdür.'],
  aasimarlar: ['Aasimar işaretleri', 'Aasimarlar ayrı ulus değil, birçok halkın içinde görülebilen kutsal veya kozmik işaret taşıyıcılarıdır. İşaret koruyucuları kişiyi zorunlu kaderden korumaya çalışır.'],
  shifterlar: ['Shifter kültürleri', 'Kurt Çanağı, Ayı Eşiği ve Kızıl İz gibi topluluklar av hayvanlarının mevsimsel davranışlarını izler; Shifterlar lycanthrope değildir.'],
  rebornlar: ['Reborn toplulukları', 'İkinci sabahını yaşayanlar eski ad, yeni irade ve toplumsal tanınma arasında kendi hayatlarını kurar. Geri dönüş, borç ya da mülkiyet yaratmaz.'],
  hexbloodlar: ['Hexblood toplulukları', 'Cadı antı veya fey büyüsüyle değişmiş kişiler kökenlerinden çok seçtikleri sözleşmelerle tanınır; ant taşıyıcısı, rızayı ve bedeli görünür kılar.'],
  dhampirler: ['Dhampir toplulukları', 'Gece yasaları, rıza ve gözetimle açlığı dengeleme çabasıdır. Yas görevlileri, korkuyu bahane eden dışlama hukukuna karşı durur.'],
  choldrithler: ['Choldrith kültürleri', 'İpek yargıçları anlaşmaları dokunmuş desenlerle okur. Drow kentleriyle bağları olsa da bütün Choldrithler tek bir İpek Tahtı kimliği taşımaz.'],
  myconidler: ['Myconid kültürleri', 'Çember, hem şehir hem arşivdir; sporla paylaşılan hafıza ortak rızaya dayanır. Her çemberin aynı bilinç veya siyaseti yoktur.'],
  'kuo-toalar': ['Kuo-Toa kültürleri', 'İnanç biçimleyicileri derin su inancını hafıza ve yön bulmayla kurar. Ortak inanç, her zaman tek bir tanrı ya da otorite üretmez.'],
  locathahlar: ['Locathah kültürleri', 'Resif, sığlık ve nehir ağzı toplulukları balıkçılık hukukunu korur. Delta arabulucuları, akıntının değiştirdiği sınırları müzakere eder.'],
  grimlocklar: ['Grimlock kültürleri', 'Titreşim okuyucuları taş, hava ve adımı ayrıntılı bir dil gibi okur. Sessizlik yokluk değil, derinlik bilgisidir.'],
  derrolar: ['Derro kültürleri', 'Mühür rüyacıları kayıp hafızayı kimi zaman emanet, kimi zaman tehlike sayar. Dağınık toplulukları tek bir geçmiş veya delilik anlatısına indirgenemez.'],
  tritonlar: ['Triton kültürleri', 'Derin nöbet, fırtına kapıları ve akıntı yollarının ortak sorumluluğudur. Deniz yemini, kıyı devletleriyle yapılan diplomasinin de dilidir.'],
  sahuaginler: ['Sahuagin kültürleri', 'Kırmızı Akıntı hukukunda av sahası ve resif hakkı sıkı biçimde düzenlenir. Sert yasa, bütün bireylerin aynı şiddeti seçtiği anlamına gelmez.'],
  warforgedler: ['Warforged yurttaşlığı', 'Serbest Çekiç yurttaşları uyumaz, onarılır ve tam hukuk ister. Yapımcı mülkiyeti ile özne olma hakkı arasındaki çatışma kanonik merkezdir.'],
  autognomlar: ['Autognom yurttaşlığı', 'Tik-Tak Bahçesi çevresinde ad, bakım ve kendi kararını verme hakkı savunulur. Yapay oluş, kişinin bir loncanın eşyası olduğu anlamına gelmez.'],
  'yuan-ti': ['Yuan-ti kültürleri', 'Beden yazmanları soy ve dönüşümü bir metin gibi okur. Harabe koruyucuları ile şehir soy evleri aynı siyaseti paylaşmaz.'],
  nagalar: ['Naga kültürleri', 'Harabe muhafızları eski anlaşmaları, suyu ve taş hafızasını korur; bazıları bilgiyi yeni güçlerle pazarlık konusu yapar.'],
  'psiyonik-kalintilar': ['Psiyonik kalıntılar', 'Mühürden çıkan psiyonlar soy değil toplumsal durum olarak anlaşılır. Hafıza ve özgür irade, geçmiş yapının hükmünü aşabilir.'],
  ejderhalar: ['Ejderha mirası', 'Ejderhalar volkan, nehir, buzul ve fırtına gibi dünya damarlarıyla bağ kurar. Onlarla ilişki soy ağacından çok antlaşma, korku ve korumadır.'],
  'devler-ve-fomorianlar': ['Devler ve Fomorianlar', 'Dev harabeleri ile Fomorian sürgünleri modern devletler için hem kaynak hem tehdittir; hiçbir topluluk miras üzerinde tartışmasız hak sahibi değildir.'],
  abolethler: ['Aboleth hafızası', 'Abolethlerin dünyanın en eski hafızasına sahip olduğu iddiası kanıtlanmış değildir. Anlattıkları geçmiş, bilgi kadar pazarlık ve tehdittir.'],
  'ilk-fey': ['İlk Fey mirası', 'Açlık, Av, Yas, Bahar, Unutuluş, Misafirperverlik, Yankı ve İntikam gibi kavramlar ilk fey mirasının parçalarıdır; tek bir halkın malı değildir.'],
  aarakocralar: ['Aarakocra kültürleri', 'Dağlar arası hava yolları, fırtına mevsimleri ve yüksek yuva gelenekleri Aarakocra topluluklarının ortak bilgisidir; kanon onları tek bir dağ krallığına bağlamaz.'],
  owlinler: ['Owlin kültürleri', 'Gece arşivleri, sessiz kurye ağları ve alacakaranlık gözetimi Owlin topluluklarında öne çıkar; bunlar soyun değil, yaşadıkları şehirlerin geliştirdiği geleneklerdir.']
}
const entry = computed(() => entries[slug.value])
const isEnglish = computed(() => lang.value.startsWith('en'))
</script>

<template>
  <section v-if="entry" class="people-culture-reference">
    <p>{{ isEnglish ? 'Cultural canon' : 'Kültür kanonu' }}</p>
    <h2>{{ entry[0] }}</h2>
    <p>{{ entry[1] }}</p>
  </section>
</template>

# Avarra Map — Dağ ve Kamera İnce Ayar Rehberi

Bu rehber MVP haritasındaki dağ kabartısını ve düşük-FOV perspective kamerayı ayarlamak içindir. Dağ görünümünü iki ayrı katman belirler:

```text
terrain_height_clean.png  → kabartının şekli / yumuşaklığı
height_strength           → kabartının dünya içindeki fiziksel yüksekliği
camera                    → bu yüksekliğin ekranda ne kadar dramatik göründüğü
```

Bu üç ayarı aynı anda değiştirmeyin. Önce heightmap, sonra yükseklik, en son kamera.

## Başlangıç ayarları

Çalışan başlangıç değerleri:

| Dosya | Ayar | Değer |
| --- | --- | --- |
| `scenes/map/terrain.tscn` | `shader_parameter/height_strength` | `0.65` |
| `scripts/map_controller.gd` | `pin_manager.configure(..., strength)` | `0.65` |
| `shaders/terrain.gdshader` | `height_strength` varsayılanı | `0.65` |
| `scripts/camera_controller.gd` | `distance` | `30.0` |
| `scripts/camera_controller.gd` | `elevation` | `0.85` |
| `scripts/camera_controller.gd` | `depth_offset` katsayısı | `0.68` |
| `scenes/map/map_root.tscn` | `Camera3D.fov` | `34.0` |

`height_strength` değeri üç yerde aynı kalmalıdır. Aksi halde pinler terrain yüzeyinden yukarıda veya aşağıda kalır.

## Dağ yüksekliği

Birincil ayar `height_strength` değeridir.

```text
0.00 – 0.30  neredeyse düz kartografik harita
0.40 – 0.80  güvenli 2.5D başlangıç aralığı
0.90 – 1.40  dramatik dağlar; kıyı ve pin hizasını kontrol edin
1.50+        ancak temiz bir heightmap ile kullanılmalı
```

İlk deneme için `0.65 → 0.85` yapın. Dağlar hâlâ düz gelirse `1.05` deneyin. Her adımda oyunu kapatıp açmanız gerekmez; Godot editörde shader material içindeki değeri değiştirerek canlı görünümü izleyebilirsiniz.

## Dağ şekli: temiz heightmap

`tools/build_map_assets.py` dosyası, AI ile çıkarılmış terrain height görselini önce düşük çözünürlüklü bir elevation alanına indirir, sonra tekrar büyütür.

```python
macro_size = (192, 128)
```

Bu değer yalnızca **küçük ölçekli sivri çizgileri** temizler; `height_strength` ile aynı şey değildir.

| `macro_size` | Etki |
| --- | --- |
| `(128, 85)` | Çok yumuşak; büyük kıtalar ve dağ kütleleri kalır |
| `(192, 128)` | Mevcut dengeli başlangıç |
| `(256, 170)` | Daha belirgin ridge/vadi; spike riski artar |
| `(384, 256)` | Kaynak çizgilerini tekrar geometriye taşımaya başlar |

Dağlar şekilsiz gelirse önce `(192, 128) → (256, 170)` deneyin, ardından pipeline’ı yeniden çalıştırın:

```bash
python tools/build_map_assets.py
```

Bu komut `assets/map/generated/terrain_height_clean.png` dosyasını yeniden üretir. Ardından Godot asseti yeniden içe aktarır.

## Spike / iğne sorunu

Belirti: dağlar sivri, ince ve ekranı kaplayacak kadar uzundur.

Sıralı çözüm:

1. `height_strength` değerini yarıya indirin.
2. Sorun sürerse `macro_size` değerini küçültün.
3. Pipeline’ı yeniden çalıştırın.
4. Sadece daha sonra `height_strength` değerini tekrar yükseltin.

Yalnız `height_strength` düşürmek dağları düzleştirir; yalnız `macro_size` düşürmek ise dağların siluetini korurken ince gürültüyü temizler. Bu yüzden önce `macro_size` ile şekli düzeltmek daha doğrudur.

## Low-FOV perspective kamera

Kamera ayarları `scripts/camera_controller.gd` içindedir.

```gdscript
var distance := 30.0
var elevation := 0.85
var depth_offset := distance * 0.68
```

`scenes/map/map_root.tscn` içindeki kamera da perspective olmalı:

```text
projection = 0
fov = 34.0
```

| Ayar | Azaltılırsa | Artırılırsa |
| --- | --- | --- |
| `fov` | Daha telefoto; dağlar daha dramatik, kadraj dar | Harita daha çok görünür, perspektif azalır |
| `distance` | Yakınlaşır | Uzaklaşır |
| `elevation` | Daha yatık kamera; dağ silueti güçlenir | Daha üstten kamera; kartografik his artar |
| `depth_offset` | Daha tepeden bakar | Daha eğik bakar; dağ yan yüzleri görünür |

Güvenli deneme setleri:

```text
Kartografik: fov 38, elevation 1.05, depth_offset 0.48
Dengeli:     fov 34, elevation 0.85, depth_offset 0.68
Dramatik:    fov 30, elevation 0.70, depth_offset 0.82
```

Kadraj bozulursa önce `distance` değerini değiştirin; FOV'u sonradan ayarlayın.

## Kamera kontrolleri

```text
Sol fare veya orta fare sürükle = pan
Sağ fare sürükle                  = yörünge açısı ve kamera eğimi
Fare tekerleği                    = zoom
```

Pan, haritayı tutup sürükleme hissi verecek biçimde ters yöne çevrildi ve küçük
hareketler için hızı `0.002`ye indirildi. İlk kadraj kuş bakışıdır. Zoom aralığı
`5.5–40.0`dır; yakına zoom yapıldıkça kamera kuş bakışından eğik görünüme geçer
ve en yüksek pitch `40°`dir. Pan sınırı, o anki kadrajın harita dışına taşmasını
önleyecek biçimde otomatik daralır. Böylece yakın planlarda arazi ve dağların
hacmi daha iyi okunur. Pan ve zoom hedefleri anlık sıçramaz; kamera bunları
yumuşak takip animasyonuyla yakalar.
Kamera yönünü sıfırlamak için sahneyi yeniden başlatmak yeterlidir.

## Deniz ile birlikte kontrol

Dağ yüksekliğini artırdıktan sonra şunlara bakın:

- Kıyıda kara, ocean plane’in altından temiz biçimde ayrılıyor mu?
- Pinler yüzeyin üstünde mi? Değilse `map_controller.gd` içindeki pin strength’i terrain ile eşitleyin.
- Yüksek dağlar gölgede tamamen siyaha düşüyor mu? Gerekirse `DirectionalLight3D.light_energy` değerini küçük adımlarla artırın.
- Kıyı boyunca mavi taşma görürseniz önce `land_mask.png` ve `shore_mask.png` dosyalarını kontrol edin; ocean shader karada fragment üretmemelidir.

## Hızlı geri dönüş

Kötü bir denemeden sonra güvenli noktaya dönmek için:

```text
macro_size = (192, 128)
height_strength = 0.65
fov = 34.0
distance = 30.0
elevation = 0.85
depth_offset = 0.68
```

Sonra:

```bash
python tools/build_map_assets.py
```

## Çizim stili ve dağların okunurluğu

Kabartı tek başına dağ hissini taşımaz. Harita uzak kadrajdayken dağların
okunurluğu, eğim üstündeki koyu sırt dili ve dağ biyomunun fırça/yarık
dokusundan gelir. Bu amaçla runtime artık eski fotogerçekçi set yerine şu
dosyaları kullanır:

```text
assets/terrain/*/*_painterly.png
assets/water/ocean_painterly.png
```

Eski `*_albedo.png` dosyaları korunur; geri dönüş için yalnızca
`scenes/map/terrain.tscn` içindeki resource yollarını değiştirmeniz yeterli.

| Dosya | Ayar | Başlangıç değeri | Etki |
| --- | --- | --- | --- |
| `scenes/map/terrain.tscn` | `texture_tiling` | `2.35` | Küçüldükçe fırça izleri büyür; desen tekrarını azaltır. |
| `scenes/map/terrain.tscn` | `ridge_ink_strength` | `0.24` | Eğimlerdeki koyu, çizimsel sırt vurgusu. |
| `scenes/map/terrain.tscn` | `sea_level` | `0.08` | Kıyıdaki minimum kara yüksekliği; adaları su düzeyine oturtur. |
| `scenes/map/ocean.tscn` | `pattern_tiling` | `1.35` | Sabit deniz akıntı deseninin ölçeği. |

`ridge_ink_strength` için güvenli aralık `0.14–0.32`’dir. `0.35` üstünde
vadiler gereğinden koyulaşabilir; dağlar okunmuyorsa önce bu değeri `0.28`e,
sonra `height_strength` değerini yükseltin.

Deniz shaderı bilinçli olarak `TIME`, kayan normal map ve köpük kullanmaz.
Kıyıdaki hafif turkuaz açılma yalnızca `coast_distance.png` ile hesaplanır;
denizin iç dokusu `ocean_painterly.png` üzerinden tamamen sabittir.

Kara suyun üzerinde süzülüyor gibi görünürse ilk bakılacak yer `sea_level`dir.
Bu değer terrain shaderı ile `scripts/pin_manager.gd` içinde aynı kalmalıdır.
`0.06–0.11` güvenli aralıktır; yükseltmek kıyıdaki alçak karayı deniz düzeyine
yaklaştırır, fakat fazla yükseltilirse küçük kıyı girintilerini düzleştirir.

## Haritadaki bütün maskeler ve düzenleme akışı

Harita dosyaları iki gruptur: **girdi maskeleri** elle düzenlenebilir; türetilmiş
dosyalar ise `tools/build_map_assets.py` tarafından tekrar üretileceği için
doğrudan boyanmamalıdır.

### Kaynak / referans dosyaları

| Dosya | Rol | Elle düzenleme |
| --- | --- | --- |
| `assets/map/source/color_reference.png` | Coğrafya ve sanat yönü referansı. Runtime terrain rengi değildir. | Yalnızca yeni semantic mask çıkarırken referans olarak kullanın. |
| `assets/map/source/height_reference.png` | Ham, illustratif yükseklik referansı. | Doğrudan shader’a bağlamayın. |
| `assets/map/source/land_mask.png` | Ana kara–deniz sınırı. Beyaz kara, siyah açık denizdir. | Kıyı değişikliği gerçekten isteniyorsa düzenleyin; en etkili maskedir. |
| `assets/map/generated/terrain_height_extracted.png` | Filtrelenmemiş ama temizlenmiş yükseklik girdisi. | Dağ kütleleri, plato ve havzaları burada düzenleyin. |
| `assets/map/generated/forest_mask.png` | Beyaz yoğun orman / jungle. | Düzenlenebilir semantic giriş. |
| `assets/map/generated/arid_mask.png` | Beyaz çöl, kurak step veya kumlu arazi. | Düzenlenebilir semantic giriş. |
| `assets/map/generated/snow_mask.png` | Beyaz kalıcı kar ve buz. | Düzenlenebilir semantic giriş. |
| `assets/map/generated/volcanic_mask.png` | Beyaz volkanik/bazalt arazi. | Düzenlenebilir semantic giriş. |
| `assets/map/generated/river_mask.png` | Beyaz nehir yatağı, kollar ve deltalar. | Düzenlenebilir semantic giriş; çizgileri doğal genişlikte tutun. |
| `assets/map/generated/lake_mask.png` | Beyaz iç göl, krater gölü ve kapalı su havzası. | Düzenlenebilir semantic giriş; deniz ve nehirleri buna katmayın. |

### Otomatik üretilen dosyalar

| Dosya | Nasıl oluşur | Ne işe yarar |
| --- | --- | --- |
| `terrain_height_clean.png` | `terrain_height_extracted.png` filtrelenir. | Terrain vertex displacement. |
| `grassland_mask.png` | Kara eksi diğer biyomlar. | Varsayılan çayır/ova biyomu. |
| `slope.png` | Clean heightmap gradyanı. | Eğime bağlı ridge/ink vurgusu. |
| `rock_weight.png` | Height + slope. | Kayalık yüzey ağırlığı. |
| `terrain_normal.png` | Clean heightmap. | İleride macro normal katmanı için hazırdır. |
| `river_distance.png` | `river_mask.png` mesafe alanı. | Nehir banka geçişi ve sığ geometri oyması. |
| `coast_distance.png` | Ana kara ve lake mask’in ortak su sınırı. | Deniz/göl sığdan derine renk geçişi. |
| `shore_mask.png` | Coast distance’ın dar bandı. | İleride kıyı köpüğü veya çizgisi için ayrılmıştır. |
| `splat_a.png` | Forest, grassland, arid, rock kanalları paketlenir. | Terrain shader’ın ilk biome ağırlık texture’ı. |
| `splat_b.png` | Snow, volcanic, wetland kanalları paketlenir. | Terrain shader’ın ikinci biome ağırlık texture’ı. |

### Güvenli düzenleme sırası

1. Önce semantic girdi maskelerinden birini düzenleyin.
2. Dağ formunu değiştiriyorsanız `terrain_height_extracted.png`i düzenleyin.
3. Pipeline’ı çalıştırın:

   ```bash
   python tools/build_map_assets.py
   ```

4. Godot’un assetleri yeniden içe aktarmasını bekleyin ve oyunu tekrar açın.

`terrain_height_clean.png`, distance maskleri, slope ve splat dosyalarındaki
elle yapılan değişiklikler bir sonraki pipeline çalıştırmasında bilerek silinir.

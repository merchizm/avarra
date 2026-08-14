# Avarra Interactive Map — Godot Web & AI Asset Pipeline

## 1. Projenin amacı

Amaç gerçek bir dünya simülatörü yapmak değildir.

Amaç:

- fantasy dünya haritasını WebGL üzerinde güzel göstermek,
- haritaya 2.5D yükseklik kazandırmak,
- pan ve zoom sağlamak,
- biome görünüşünü dinamik shader ile üretmek,
- denizleri ve nehirleri canlı göstermek,
- pinler yerleştirmek,
- önemli şehirleri ve landmarkları 3D göstermek,
- pine/landmarka tıklandığında web sitesindeki sidebar veya modalı açmak,
- mümkün olduğunca az özel rendering kodu yazmak,
- görsel asset üretiminin büyük bölümünü AI ile yapmak.

Godot yalnızca **map renderer** olacaktır.

```text
Website
│
├── Navbar
├── Lore / Wiki
├── Search
├── Sidebar / Modal
│
└── Godot Map
     │
     ├── Terrain
     ├── Ocean
     ├── Rivers
     ├── Pins
     ├── 3D Landmarks
     ├── Camera
     └── Effects
```

Godot 4 web export WebAssembly ve WebGL 2 kullanıyor ve web hedefinde Compatibility renderer gerekiyor. C# yerine GDScript kullanmalıyız; Godot 4'ün C# projeleri web export desteklemiyor. Güncel web export'ta single-threaded çalışma varsayılan ve entegrasyon açısından bizim gibi bir site için de daha zahmetsiz seçenek.

---

# 2. Temel teknik kararlar

## Engine

```text
Godot 4.x
Renderer: Compatibility
Language: GDScript
Target: Web
```

Godot spatial shader'ları bir PlaneMesh'in vertexlerini heightmap ile değiştirmeyi doğrudan destekliyor; resmi Godot örneği de heightmap tabanlı terrain displacement kullanıyor.

## Web entegrasyonu

İlk sürümde en basit yapı:

```html
<iframe src="/map/index.html"></iframe>
```

Godot kendi web export'u içinde yaşar.

Kullanıcı pine basar:

```text
Godot
   ↓
JavaScriptBridge
   ↓
window.parent.postMessage(...)
   ↓
Website
   ↓
openSidebar(locationId)
```

Godot'un `JavaScriptBridge` sistemi browser JavaScript ortamıyla iletişim kurmak için mevcut. Özel HTML shell de destekleniyor.

Önerilen event:

```json
{
  "source": "avarra-map",
  "type": "location:selected",
  "payload": {
    "id": "silita"
  }
}
```

Website:

```js
window.addEventListener("message", event => {
    if (event.data?.source !== "avarra-map") return;

    if (event.data.type === "location:selected") {
        openLocation(event.data.payload.id);
    }
});
```

İlk versiyonda **Godot → Web** yeterli.

İleride:

```text
Web → Godot
```

ekleyip:

```text
focusLocation
focusRegion
resetCamera
setLayer
```

gibi komutlar verebiliriz.

---

# 3. Elimizdeki kaynak görüntüler

Şu anda üç kaynak aynı koordinat sisteminde ve aynı çözünürlükte:

```text
1536 × 1024
aspect ratio = 3:2
```

## A — Color Reference

İlk renkli görsel.

Bunu runtime'daki arazi texture'ı olarak kullanmayacağız.

Bunun görevi:

- biome dağılımını göstermek,
- nehirleri göstermek,
- kar/buz dağılımını göstermek,
- çöl/kurak alanları göstermek,
- orman dağılımını göstermek,
- genel art direction vermek.

Yani:

```text
REFERENCE ONLY
```

## B — Height Reference

İkinci grayscale görsel.

Bunu **doğrudan final heightmap olarak kullanmamayı** öneriyorum.

Çünkü görselde:

- coastline glow,
- nehir/linework izleri,
- yapay highlightlar,
- cartographic texture

bulunuyor.

Bunları doğrudan vertex displacement'a verirsek bazı nehirler veya kıyılar arazi üzerinde gereksiz kabarıklık oluşturabilir.

Bundan temiz bir:

```text
terrain_height_clean.png
```

üreteceğiz.

## C — Land Mask

Üçüncü siyah/beyaz görsel.

Bu zaten çok değerli.

```text
WHITE = land
BLACK = water
```

Runtime'da doğrudan kullanılabilir.

Aynı zamanda bundan:

- coastline,
- shore falloff,
- approximate water depth,
- smooth coast mask

algoritmik olarak çıkarılabilir.

---

# 4. Runtime'da gerçekten ihtiyacımız olan map dataları

Minimum sistem:

```text
terrain_height_clean.png
land_mask.png

splat_a.png
splat_b.png

river_mask.png
lake_mask.png
coast_distance.png

biome textures
water textures
```

Detaylandırırsak:

## Zorunlu

```text
terrain_height_clean.png
land_mask.png
river_mask.png
lake_mask.png

forest_mask.png
arid_mask.png
snow_mask.png
volcanic_mask.png
```

## Opsiyonel ama faydalı

```text
wetland_mask.png
```

Bunların dışındaki şeyleri AI'ya yaptırmak yerine matematiksel olarak üretmeliyiz.

Örneğin:

```text
terrain_normal.png
slope.png
coast_distance.png
shore_mask.png
grassland_mask.png
splat_a.png
splat_b.png
```

AI üretmemeli.

Çünkü bunların geometrik olarak tam doğru olması gerekiyor ve matematik AI'dan daha güvenilir.

**"Her şeyi AI ile yapacağız" yaklaşımının burada sınırı bu olmalı.** AI semantik işi yapsın; deterministic olan işi script yapsın.

---

# 5. Biome sistemi

Bizim için yeterli biome seti:

```text
Grassland / Plains
Forest
Arid / Desert
Rock / Alpine
Snow / Ice
Volcanic
Wetland / Delta
```

Su ayrıca işlenecek.

## Grassland mask üretmeyeceğiz

Diğer bütün maskeler çıktıktan sonra:

```text
grassland =
    land
    - forest
    - arid
    - snow
    - volcanic
    - wetland
```

Rock dağılımı da büyük ölçüde:

```text
height
+
slope
```

üzerinden shader tarafından oluşturulacak.

Dolayısıyla AI'dan toplam **5-6 semantic mask** çıkarmamız yeterli.

---

# 6. Maskeleri GPU dostu hale getirme

Bütün maskeleri ayrı ayrı texture olarak yüklemek yerine pack edeceğiz.

## splat_a.png

```text
R = Forest
G = Grassland
B = Arid
A = Rock
```

## splat_b.png

```text
R = Snow
G = Volcanic
B = Wetland
A = Reserved
```

Sonra terrain shader:

```text
splat_a
+
splat_b
```

okuyup biome texture'larını blend eder.

Böylece:

```text
7 mask texture
```

yerine:

```text
2 texture
```

kullanmış oluruz.

River ayrı kalır.

---

# 7. Terrain Scene

Önerilen scene:

```text
MapRoot
│
├── Terrain
│   └── MeshInstance3D
│
├── Ocean
│   └── MeshInstance3D
│
├── Landmarks
│
├── Pins
│
├── CameraRig
│   └── Camera3D
│
├── DirectionalLight3D
│
├── WorldEnvironment
│
└── MapController
```

Terrain:

```text
PlaneMesh
```

olacak.

Başlangıç subdivision:

```text
256 × ~170
```

veya biraz daha güçlü:

```text
384 × 256
```

1536×1024 source için başlangıçta bundan fazlasına ihtiyacımız yok.

---

# 8. Height displacement

Vertex shader:

```glsl
float land = texture(land_mask, UV).r;
float h = texture(height_map, UV).r;

VERTEX.y += h * height_strength * land;
```

Bu bize:

```text
flat map
──────────────

↓ height map

      /\
 ____/  \_____
```

verir.

Height exaggeration gerçekçi olmak zorunda değil.

Bizim istediğimiz:

```text
güzel silhouette
+
güzel lighting
```

olduğu için artistik olarak yükseklikleri 2-4 kat abartabiliriz.

---

# 9. Terrain shader görünüşü

Terrain rengini tek büyük texture belirlemeyecek.

Shader:

```text
Biome Masks
      ↓

AI-generated seamless terrain textures
      ↓

Height / slope
      ↓

Lighting
      ↓

Final appearance
```

Örneğin:

```glsl
terrain =
      grass_texture  * grass_weight
    + forest_texture * forest_weight
    + desert_texture * arid_weight
    + snow_texture   * snow_weight;
```

Rock için:

```text
slope yükseldikçe
↓
rock texture ağırlığı yükselir
```

Bu özellikle dağların:

```text
düz renkli leke
```

yerine gerçekten arazi gibi görünmesini sağlar.

---

# 10. River sistemi

Nehirleri mesh yapmaya gerek yok.

İlk sürümde:

```text
river_mask.png
```

terrain shader'ın içinde kullanılacak.

```text
normal terrain
      ↓

river_mask
      ↓

water tint
+
deterministic river-distance field
+
narrow dark river bed
+
muted bank transition
```

Böylece nehir, arazi üstüne yapıştırılmış tek renk bir texture şeridi gibi
görünmez. İlk sürümde animated normal şart değildir; sabit, çizimsel su dili
deniz art direction'ıyla daha tutarlı bir başlangıçtır.

Gerçek su fiziği yok.

Nehir yatağı kazma yok.

Akış simülasyonu yok.

Gerek yok.

---

# 11. Ocean

Ocean terrain'den ayrı bir:

```text
PlaneMesh
```

olacak.

Terrain shader su bölgelerinde fragment üretmeyecek veya land mask'e göre görünmez hale gelecek.

Altından ocean plane görünecek.

Ocean görünüşü:

```text
deep color
+
shallow coast color
+
2 scrolling normal layers
+
very subtle foam
+
coast_distance
```

ile üretilecek.

`coast_distance.png` doğrudan binary land mask'ten hesaplanmalı.

```text
coast
0 px ───────────────── 100 px offshore

bright → dark
```

Bunu AI ile üretmemeliyiz.

## 11.1 Inland lakes

Ana `land_mask.png` kıta kıyılarını tanımlar; göller bunun yerine ayrı bir
`lake_mask.png` ile tutulmalıdır. Böylece ana kıta silueti değişmeden terrain
shader göl fragmentlerini bırakır ve alttaki Ocean plane onları doldurur.

```text
land_mask + lake_mask
        ↓
effective terrain land
        ↓
ocean / lake coast distance
```

`lake_mask.png` semantic olarak AI ile kaynak haritadan çıkarılabilir, fakat
`coast_distance.png`, lake sınırına göre deterministic biçimde yeniden
hesaplanmalıdır. Bu sayede göl kıyısı sığ, merkezi daha koyu görünür.

---

# 12. Terrain texture sistemi

AI'dan büyük dünya haritası istemeyeceğiz.

AI'dan **seamless/tileable material texture** isteyeceğiz.

Örneğin:

```text
grass_albedo.png
forest_albedo.png
arid_albedo.png
rock_albedo.png
snow_albedo.png
volcanic_albedo.png
wetland_albedo.png
```

Boyut:

```text
1024 × 1024
```

yeterli.

Hepsi aynı:

- art direction,
- camera scale,
- texture scale

ile üretilmeli.

---

# 13. Çok önemli texture kuralı

AI texture promptlarında:

> NO BAKED DIRECTIONAL LIGHTING

şartı olmalı.

Çünkü AI dağ dokusunun solunu karanlık, sağını aydınlık üretirse Godot'un gerçek ışığıyla çakışır.

Texture:

```text
material information
```

taşımalı.

Lighting:

```text
Godot
```

tarafından yapılmalı.

---

# 14. Normal map sistemi

Biome albedoları oluşturduktan sonra istersek AI'ya her texture için karşılık gelen bir:

```text
micro_height
```

ürettiririz.

Örneğin:

```text
rock_albedo.png
↓ AI
rock_microheight.png
↓ deterministic conversion
rock_normal.png
```

Normal map'i doğrudan AI'dan üretmektense micro-height → normal dönüşümü daha güvenilir.

Godot da bump map'ten normal map oluşturabilen API sağlıyor ve Godot'un beklediği normal format OpenGL/X+Y+Z+ stilidir.

---

# 15. Kamera

Başlangıçta iki alternatif test edilmeli.

## A — Orthographic

Avantaj:

- harita deformasyonu az,
- cartographic hissi kuvvetli,
- daha kontrollü.

## B — Low-FOV perspective

Örneğin:

```text
FOV ≈ 30-40°
```

Avantaj:

- 3D şehirler daha dramatik,
- yükseklik daha belirgin,
- Riot benzeri his daha kolay.

İlk prototipte ikisini de 10 dakikada test edip hangisi güzel görünüyorsa onu kullanacağız.

Bunun teorisini fazla büyütmeye gerek yok.

---

# 16. Pin sistemi

Pinler için GeoJSON kullanmaya gerek yok.

Başlangıçta:

```json
[
  {
    "id": "silita",
    "name": "Silita",
    "type": "city",
    "position": [0.287, 0.416],
    "zoom_min": 0.0,
    "content_id": "silita"
  }
]
```

yeterli.

Coordinates normalized:

```text
x = 0 → map left
x = 1 → map right

y = 0 → map top
y = 1 → map bottom
```

Bu haritanın çözünürlüğünden bağımsızdır.

Pin world position:

```text
X = x * world_width
Z = y * world_depth
```

Y değeri heightmap'ten sample edilir.

---

# 17. GeoJSON ne zaman kullanılmalı?

Ancak şu özellikleri eklersek:

```text
political borders
roads
journeys
region polygons
trade routes
```

GeoJSON mantıklı hale gelir.

Pinler ve şehirlar için plain JSON daha basit.

---

# 18. 3D Landmark sistemi

Riot'un eski yapıdaki:

```text
ixaocan.obj
ixaocan_ground.obj
ixaocan_orbs.obj
ixaocan.png
ixaocan_shadow.png
```

modelini birebir taklit etmeyeceğiz.

Biz daha basit ve modern bir yapı kullanacağız:

```text
ixaocan.glb
```

ve Godot scene:

```text
Ixaocan
│
├── Model
├── SelectionArea
├── LabelAnchor
├── Particles
└── Audio
```

GLB/glTF tercih etmek:

- materyal,
- texture,
- mesh,
- scene hierarchy

taşımasını kolaylaştırır.

Riot'un ayrı `orbs.obj` sistemi yerine:

```text
GPUParticles3D
```

kullanabiliriz.

`shadow.png` yerine de başlangıçta Godot'un gerçek shadow sistemini kullanabiliriz.

Sonradan performans gerekirse baked/fake shadow'a geçeriz.

---

# 19. Landmark tasarım kuralı

3D şehirler gerçek ölçekte şehir olmayacak.

Bunları:

> **fantasy map miniature / diorama**

gibi düşünmeliyiz.

Örneğin bir başkent:

```text
                Tower
                  │
            ┌─────┴─────┐
            │ Citadel   │
       ┌────┴───────────┴────┐
       │     City core       │
       └─────────────────────┘
```

Gerçek şehirde 50.000 bina olabilir.

Map landmarkında:

```text
20-50 okunabilir ana form
```

yeterlidir.

Uzaktan silhouette çok daha önemlidir.

---

# 20. Proje klasör yapısı

```text
res://

assets/
    map/
        source/
            color_reference.png
            height_reference.png
            land_mask.png

        generated/
            terrain_height_clean.png
            river_mask.png

            splat_a.png
            splat_b.png

            coast_distance.png
            terrain_normal.png

    terrain/
        grass/
        forest/
        arid/
        rock/
        snow/
        volcanic/
        wetland/

    water/
        water_height_01.png
        water_height_02.png
        foam.png

    landmarks/
        silita/
            silita.glb

        capital_01/
            capital_01.glb

scenes/
    map/
        map_root.tscn
        terrain.tscn
        ocean.tscn

    pins/
        location_pin.tscn

    landmarks/
        landmark_base.tscn

scripts/
    map_controller.gd
    camera_controller.gd
    pin_manager.gd
    landmark_manager.gd
    web_bridge.gd

shaders/
    terrain.gdshader
    ocean.gdshader
    pin.gdshader

data/
    locations.json
    landmarks.json
```

---

# 21. AI EXTRACTION PIPELINE

Buradan sonrası mevcut üç görselden çıkaracağımız assetlerdir.

## 21.1 Clean Height Map

### Gerekli

Evet.

Mevcut ikinci görseli doğrudan kullanmamalıyız.

### Input

```text
IMAGE A = color reference
IMAGE B = current grayscale height reference
IMAGE C = binary land mask
```

### Prompt

```text
Create a clean terrain displacement height map for a 3D fantasy world map.

IMAGE B is the primary elevation reference.
IMAGE A is only a visual geographic reference.
IMAGE C defines the exact land and water boundaries.

STRICT REQUIREMENTS:

Preserve the exact geography and pixel alignment of the source images.
Do not move, reshape, enlarge, shrink, invent, or remove any continent, island, coastline, mountain range, basin, or lake.

Output a pure grayscale terrain elevation map.

Black (#000000) must represent sea level and all water areas.

Land elevation must use smooth continuous grayscale values:
dark gray = low plains,
mid gray = hills and plateaus,
light gray = high mountains,
white = only the highest peaks.

Remove all cartographic artwork from the height data:
- remove river linework,
- remove coastline glow,
- remove outlines,
- remove painted shadows,
- remove decorative texture,
- remove roads or line details,
- remove embossing effects.

Preserve only the large-scale topographic elevation information.

All coastlines must smoothly approach sea level with no bright halo or elevated rim.

Rivers must NOT appear as raised bright lines.

Keep mountain ridges and valleys geographically aligned with IMAGE A and IMAGE B.

Do not add new terrain.

Output exactly 1536x1024.
No text.
No labels.
No color.
No borders.
No artistic lighting.
```

### Kabul kriteri

Haritayı baktığımızda:

```text
dağlar okunmalı
```

ama:

```text
nehir çizgileri
coast glow
illustration strokes
```

görünmemeli.

---

# 22. River Mask

### Gerekli

Evet.

### Input

Color reference.

### Prompt

```text
Create a pixel-aligned binary river mask from the supplied fantasy world map.

Preserve the source geography exactly.

Detect every visible natural river, major tributary, river delta channel, and distributary shown on the source map.

OUTPUT:

pure white (#FFFFFF) = river water
pure black (#000000) = everything else

STRICT REQUIREMENTS:

Follow the original rivers exactly.
Preserve their original position and approximate width.
Do not invent new rivers.
Do not connect rivers that are not connected in the original.
Do not include coastlines.
Do not include ocean water.
Do not include mountain ridges.
Do not include decorative lines.
Do not include roads.

River deltas must preserve their branching structure.

All river endpoints must remain aligned with the source map.

Output exactly 1536x1024.
Binary mask only.
No grayscale shading.
No glow.
No antialiased decorative edges.
No text.
```

Burada AI sonucu birkaç piksel drift ediyorsa kabul edilebilir.

Coğrafyayı yeniden çiziyorsa kabul etmeyiz.

---

# 23. Forest Mask

```text
Create a pixel-aligned semantic forest mask from the supplied fantasy world map.

Use the original map as immutable geometry.

OUTPUT:

white (#FFFFFF) = dense forest, woodland, jungle, or visibly tree-covered terrain
black (#000000) = everything else

Include all visually forested land regions.

Do not classify grasslands, scrubland, tundra, desert, bare mountains, snow fields, volcanic terrain, ocean, or rivers as forest.

Do not invent new forests.
Do not change coastlines.
Do not modify geography.

Follow the visible vegetation boundaries of the original image as closely as possible.

Output exactly 1536x1024.
Binary mask only.
No text.
No shading.
No glow.
```

---

# 24. Arid / Desert Mask

```text
Create a pixel-aligned semantic arid-terrain mask from the supplied fantasy world map.

OUTPUT:

white (#FFFFFF) = desert, semi-desert, dry steppe, sandy or strongly arid terrain
black (#000000) = everything else

Use only terrain that is visibly represented as arid, dry, sandy, ochre, or desert-like in the source image.

Do not include ordinary grassland.
Do not include forests.
Do not include bare alpine rock unless it is clearly part of an arid region.
Do not include snow or water.

Preserve the source geography exactly.
Do not invent terrain.

Output exactly 1536x1024.
Binary mask only.
No text.
No shading.
```

---

# 25. Snow / Ice Mask

```text
Create a pixel-aligned permanent snow and ice coverage mask from the supplied fantasy world map.

OUTPUT:

white (#FFFFFF) = glaciers, permanent snowfields, ice-covered terrain, permanently snow-covered mountain zones
black (#000000) = everything else

Follow the visible snow and ice distribution in the source map exactly.

Do not mark ordinary exposed rock as snow.
Do not expand snow coverage beyond the original artwork.
Do not include ocean unless it is visibly represented as permanent sea ice.

Preserve all geography exactly.

Output exactly 1536x1024.
Binary mask only.
No text.
No shading.
```

---

# 26. Volcanic Mask

```text
Create a pixel-aligned volcanic terrain mask from the supplied fantasy world map.

OUTPUT:

white (#FFFFFF) = volcanic terrain, lava fields, dark basalt areas, volcanic mountain zones
black (#000000) = everything else

Only include terrain that is visually and unambiguously volcanic in the source image.

Preserve the source geography exactly.
Do not invent volcanic areas.
Do not classify ordinary dark mountains as volcanic.

Output exactly 1536x1024.
Binary mask only.
No text.
No shading.
```

---

# 27. Wetland / Delta Mask

Bu opsiyonel.

İlk sürümde çıkarmayabiliriz.

```text
Create a pixel-aligned wetland and delta terrain mask from the supplied fantasy world map.

OUTPUT:

white (#FFFFFF) = marshes, wetlands, swamp-like terrain, floodplains and visually distinct river delta environments
black (#000000) = everything else

Preserve the original geography exactly.

Include only clearly represented wetland or delta terrain.
Do not include ordinary forests simply because rivers pass through them.
Do not include the river channels themselves unless they belong to the surrounding wetland region.

Output exactly 1536x1024.
Binary mask only.
No text.
No shading.
```

---

# 28. AI'YA ÜRETTİRMEYECEĞİMİZ ŞEYLER

Aşağıdakileri Codex/Godot script üretmeli:

```text
terrain_normal.png
coast_distance.png
shore_mask.png
slope.png
grassland_mask.png
rock_weight.png
splat_a.png
splat_b.png
```

Sebep basit:

```text
AI interpretation gerekli değil.
```

Bunlar matematik.

Örneğin:

```text
slope = derivative(height)
```

ve:

```text
coast_distance = distance_transform(land_mask)
```

AI kullanmak sonucu yalnızca daha kötü hale getirir.

---

# 29. AI TERRAIN TEXTURE MASTER PROMPT

Bütün biome texture'larında şu stil korunmalı:

```text
Create a seamless 1024x1024 tileable terrain texture for a stylized high-fantasy world map viewed from above.

The visual style should be painterly, detailed, elegant and slightly realistic, suitable for a premium interactive fantasy cartography experience.

This is a MATERIAL TEXTURE, not a complete landscape illustration.

STRICT REQUIREMENTS:

- perfectly seamless on all four edges,
- top-down orthographic appearance,
- no horizon,
- no sky,
- no buildings,
- no roads,
- no rivers,
- no landmarks,
- no borders,
- no text,
- no symbols,
- no large unique geographic formations,
- no baked directional lighting,
- no cast shadows,
- no sunlight direction,
- even neutral illumination,
- medium-frequency natural variation,
- designed to be tiled repeatedly over a large map,
- consistent world scale.

Avoid photorealistic satellite imagery.
Avoid obvious repeating motifs.
Avoid individual oversized objects.
```

Her biome promptuna bunun arkasından biome açıklaması eklenir.

---

# 30. Grassland Texture

```text
BIOME:

Temperate fantasy grassland and fertile plains.

Muted olive green, soft yellow-green, subtle earthy brown variation, sparse natural scrub and fine vegetation texture.

The terrain should feel fertile and lived-in but contain no human structures.

Subtle painterly cartographic detail.
```

---

# 31. Forest Texture

```text
BIOME:

Dense temperate fantasy forest viewed directly from above.

Deep natural greens, muted moss tones, subtle variation in tree canopy density.

The tree canopy should read clearly as forest at world-map scale without showing giant individual trees.

Rich but restrained painterly detail.

No clearings shaped like symbols.
No buildings.
No paths.
```

---

# 32. Arid Texture

```text
BIOME:

Dry fantasy steppe and semi-desert terrain.

Warm ochre, muted tan, dusty brown and subtle dry-earth variation.

Sparse scrub-like texturing and subtle erosion patterns.

Avoid large dunes or unique landmarks because the texture must tile seamlessly.

No directional shadows.
```

---

# 33. Rock / Alpine Texture

```text
BIOME:

Bare alpine rock and rugged mountain terrain material.

Cool gray, muted brown, slate and subtle stone variation.

Fine fractured rock patterns suitable for steep fantasy mountain slopes.

No individual mountain peaks.
No large cliffs.
No baked shadows.

This texture will be applied dynamically according to terrain slope.
```

Bu önemli:

AI'dan **dağ resmi** istemiyoruz.

AI'dan:

```text
mountain material
```

istiyoruz.

Dağın geometrisini heightmap oluşturacak.

---

# 34. Snow Texture

```text
BIOME:

Permanent alpine snow and glacial surface.

Soft off-white, pale blue-gray and subtle icy variation.

Fine wind-swept and compressed snow texture.

No large cracks, mountains, shadows or unique formations.

Neutral lighting.
Seamless and tileable.
```

---

# 35. Volcanic Texture

```text
BIOME:

Dark volcanic basalt and cooled lava terrain.

Charcoal black, dark gray, muted brown-black stone with restrained fractured volcanic patterns.

Very subtle hints of deep warm mineral coloration may appear inside cracks, but avoid bright glowing lava unless explicitly required.

No mountains.
No directional shadows.
No unique formations.
```

Glow istiyorsak ayrı bir:

```text
emissive mask
```

üretmek daha doğru.

---

# 36. Wetland Texture

```text
BIOME:

Fantasy marsh and wetland ground texture.

Dark moss green, muted brown, damp soil, subtle patches of shallow vegetation and saturated earth.

Top-down world-map material.

Do not include explicit rivers or large pools because water channels will be rendered separately.

Seamless.
Neutral lighting.
```

---

# 37. Water Texture

Ocean için renkli albedo texture yerine shader ağırlıklı çalışacağız.

AI'dan sadece bir **water micro-height** istemek daha mantıklı.

```text
Create a seamless 1024x1024 grayscale water surface height texture.

Represent broad, elegant ocean surface ripples and subtle overlapping wave patterns viewed from directly above.

This texture will be converted into a normal map and animated in a shader.

White and light gray = raised wave surface.
Dark gray and black = lowered wave surface.

No foam.
No coastline.
No objects.
No lighting.
No color.
No directional sunlight.
No perspective.
Perfectly tileable on all edges.

Avoid tiny noisy waves.
Use medium-scale smooth wave patterns suitable for a stylized fantasy world map.
```

Bundan normal map üretilir.

Sonra shader içinde iki kopya farklı yönlerde scroll edilir.

---

# 38. Foam Texture

Opsiyonel:

```text
Create a seamless monochrome foam breakup texture for a stylized ocean shader.

Organic irregular white foam fragments and wispy shapes on a pure black background.

No coastline.
No waves with perspective.
No objects.
No lighting.

Designed to be multiplied with a shoreline distance mask.

Seamless 1024x1024 texture.
```

---

# 39. Landmark Concept Prompt

Büyük şehirleri doğrudan full-size city olarak düşünmemeliyiz.

AI image generation:

```text
Design a stylized 3D fantasy map landmark representing [CITY DESCRIPTION].

The landmark will appear as a miniature city diorama on an interactive world map.

Camera:
high-angle three-quarter view,
approximately 55-65 degrees downward,
compact readable silhouette.

Design priorities:

- immediately recognizable silhouette,
- exaggerated major architectural landmarks,
- compact footprint,
- vertically readable towers and structures,
- simplified secondary buildings,
- visually rich roof shapes,
- strong central focal point,
- readable when displayed very small,
- suitable for conversion into a low-to-medium-poly 3D model.

The model must feel like a miniature world-map landmark rather than a full realistic city.

Isolated object.
Neutral background.
No surrounding landscape beyond a small base footprint.
No text.
No labels.
No people.
No atmospheric fog.
No dramatic cast shadow.

Original high-fantasy architecture.
```

Şehir açıklaması örneğin:

```text
A technologically advanced leonine capital built from pale stone,
brass machinery and elegant monumental towers,
combining ancient feline architectural motifs with sophisticated
clockwork engineering.
```

---

# 40. Image → 3D Prompt

3D üretim aracına:

```text
Convert this fantasy city landmark concept into a clean low-to-medium-poly 3D game asset.

Preserve the overall silhouette and major architectural forms of the reference.

Prioritize top and upper-facing surfaces because the asset will be viewed mostly from a high-angle world-map camera.

Requirements:

- compact geometry,
- optimized topology,
- no floating disconnected geometry unless required by the design,
- flat stable base,
- clean silhouette,
- simplified unseen underside,
- physically coherent scale,
- UV unwrapped,
- PBR-ready materials,
- no background plane,
- no camera,
- no environment,
- no text.

Avoid excessive microgeometry.

The model will be displayed as a miniature landmark in a WebGL world map.
```

Çıktı mümkünse:

```text
GLB / glTF
```

olmalı.

---

# 41. Landmark FX

AI 3D modelin içine:

```text
magic orbs
smoke
fire
glow
sparks
```

modelletmek yerine bunları Godot'ta yapacağız.

Örneğin:

```text
VolcanicCity
├── Model
├── GPUParticles3D_Smoke
├── GPUParticles3D_Embers
└── OmniLight3D
```

Bu hem daha canlı hem daha kolay.

Riot'un eski `orbs.obj` benzeri dosyalarını birebir kopyalamamıza gerek yok.

---

# 42. Final map material sistemi

Runtime'da:

```text
                        terrain_height
                              │
                              ▼
                         GEOMETRY
                              │
                ┌─────────────┴──────────────┐
                │                            │
             splat A                      splat B
                │                            │
       forest / grass / arid       snow / volcanic / wetland
                │                            │
                └─────────────┬──────────────┘
                              ▼
                         BIOME BLEND
                              │
                  ┌───────────┴───────────┐
                  ▼                       ▼
               slope                   rivers
                  │                       │
                  ▼                       ▼
               rocks                 water effect
                  │                       │
                  └───────────┬───────────┘
                              ▼
                           LIGHTING
                              │
                              ▼
                         FINAL TERRAIN
```

---

# 43. İlk MVP

İlk versiyonda yalnızca:

```text
clean height
land mask
forest mask
arid mask
snow mask
volcanic mask
river mask
```

hazırlanmalı.

Texture olarak:

```text
grass
forest
arid
rock
snow
volcanic
water height
```

yeterli.

Sonra Godot'ta:

```text
✓ map render
✓ height displacement
✓ biome blend
✓ ocean
✓ rivers
✓ pan
✓ zoom
✓ one pin
✓ pin → JS modal
✓ one 3D landmark
```

çalıştırılmalı.

**Bunlar çalışmadan daha fazla asset üretmemeliyiz.**

---

# 44. İkinci aşama

MVP güzel görünüyorsa:

```text
wetlands
shore foam
macro texture variation
particles
landmark FX
labels
more pins
camera animation
region highlight
audio
```

eklenir.

---

# 45. Özellikle yapmayacağımız şeyler

İlk sürümde:

```text
NO procedural continents
NO weather simulation
NO hydrology simulation
NO climate simulation
NO realistic river generation
NO terrain chunk streaming
NO Google Maps-style tile loading
NO physical vegetation simulation
NO procedural cities
NO navigation system
NO giant GIS backend
```

Bunların hiçbiri hedefimize yardımcı olmuyor.

---

# 46. En kritik asset listesi

Elimizde:

```text
✓ color_reference
✓ height_reference
✓ land_mask
```

AI ile çıkarılacak:

```text
1. terrain_height_clean
2. river_mask
3. forest_mask
4. arid_mask
5. snow_mask
6. volcanic_mask

optional:
7. wetland_mask
```

Script ile çıkarılacak:

```text
8. terrain_normal
9. slope
10. coast_distance
11. grassland_mask
12. rock_weight
13. splat_a
14. splat_b
```

AI texture generation:

```text
15. grass_albedo
16. forest_albedo
17. arid_albedo
18. rock_albedo
19. snow_albedo
20. volcanic_albedo
21. water_microheight
```

İlk 3D test:

```text
22. one landmark concept
23. one GLB landmark
```

Bu 23 asset/dosya seviyesinde çalışan ilk harita prototipi çıkabilir.

---

# 47. Mimari prensip

Bu projenin merkezinde şu ayrım kalmalı:

```text
AI
↓
art direction
semantic extraction
textures
landmarks

Algorithms
↓
precise masks
normal maps
distance maps
packing

Godot
↓
geometry
lighting
water
animation
interaction

Website
↓
content
modal
sidebar
routing
```

Bu ayrımı bozmazsak sistem hem basit kalır hem de görüntü kalitesi yükseldikçe yeniden yazmak zorunda kalmayız.

En önemlisi de renkli source map'e bağımlı kalmayız:

```text
source art
   ↓
semantic masks
   ↓
dynamic renderer
```

Böylece ileride yalnızca texture setini değiştirerek haritanın bütün art direction'ını değiştirebiliriz.

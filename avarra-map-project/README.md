# Avarra Interactive Map MVP

Godot 4 Compatibility renderer ile çalışan, web'e gömülmeye hazır 2.5D fantasy dünya haritası prototipi.

## Çalıştırma

```bash
godot --path . --rendering-driver opengl3
```

Sol fare tuşuyla sürükleyerek pan, mouse wheel ile zoom yapılır. Pin seçildiğinde web ortamında şu mesaj üst pencereye gönderilir:

```json
{
  "source": "avarra-map",
  "type": "location:selected",
  "payload": { "id": "silita" }
}
```

Ana sitede mesajı şu şekilde dinleyin:

```js
window.addEventListener("message", (event) => {
  if (event.data?.source === "avarra-map" && event.data.type === "location:selected") {
    openLocation(event.data.payload.id);
  }
});
```

## Asset pipeline

Kaynak harita/maskelerde değişiklik yaptığınızda türetilmiş verileri yeniden üretin:

```bash
python tools/build_map_assets.py
```

Bu komut normal, slope, coast-distance, shore, grassland, rock-weight ve splat texture'larını günceller.

## Web export

`export_presets.cfg` tek iş parçacıklı Web presetini içerir. Bu bilgisayarda Godot web export template'leri kurulu olmadığı için export komutu template yüklenene kadar çalışmayacaktır. Kurulumdan sonra:

```bash
godot --headless --path . --export-release Web build/web/index.html
```

çıktısını iframe ile `/map/index.html` üzerinden sitenize gömebilirsiniz.

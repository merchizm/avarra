extends Node

signal pin_selected(pin_id: String)

const PIN_SCENE := preload("res://scenes/pins/location_pin.tscn")
const HEIGHT_MAP := preload("res://assets/map/generated/terrain_height_clean.png")
const RIVER_DISTANCE := preload("res://assets/map/generated/river_distance.png")

var map_width := 30.0
var map_depth := 20.0
var height_strength := 3.8
var sea_level := 0.08
var river_carve_depth := 0.075
var river_carve_width := 0.30
var height_image: Image
var river_distance_image: Image
var pins: Dictionary = {}
@onready var container: Node3D = get_parent().get_node("Pins")

func configure(width: float, depth: float, strength: float) -> void:
	map_width = width
	map_depth = depth
	height_strength = strength
	height_image = HEIGHT_MAP.get_image()
	river_distance_image = RIVER_DISTANCE.get_image()
	# Imported textures may be GPU-compressed; CPU sampling for pin elevation
	# requires a decompressed Image copy.
	if height_image != null and height_image.is_compressed():
		height_image.decompress()
	if river_distance_image != null and river_distance_image.is_compressed():
		river_distance_image.decompress()

func load_locations(path: String) -> void:
	var text := FileAccess.get_file_as_string(path)
	var parsed = JSON.parse_string(text)
	if not parsed is Array:
		push_error("locations.json must contain an array")
		return
	for location in parsed:
		if location is Dictionary:
			add_pin(location)

func add_pin(location: Dictionary) -> void:
	var position_data: Array = location.get("position", [])
	if position_data.size() != 2:
		return
	var normalized := Vector2(float(position_data[0]), float(position_data[1]))
	var pin := PIN_SCENE.instantiate()
	pin.location_id = str(location.get("content_id", location.get("id", "")))
	pin.location_name = str(location.get("name", pin.location_id))
	pin.selected.connect(_on_pin_selected)
	container.add_child(pin)
	pin.global_position = normalized_to_world(normalized)
	pins[pin.location_id] = pin

func normalized_to_world(normalized: Vector2) -> Vector3:
	var x := (normalized.x - 0.5) * map_width
	var z := (normalized.y - 0.5) * map_depth
	return Vector3(x, sample_height(normalized) + 0.12, z)

func sample_height(normalized: Vector2) -> float:
	if height_image == null:
		return 0.0
	var x := clampi(roundi(normalized.x * float(height_image.get_width() - 1)), 0, height_image.get_width() - 1)
	var y := clampi(roundi(normalized.y * float(height_image.get_height() - 1)), 0, height_image.get_height() - 1)
	var terrain_height: float = max(height_image.get_pixel(x, y).r - sea_level, 0.0) * height_strength
	if river_distance_image == null:
		return terrain_height
	var river_distance_value: float = river_distance_image.get_pixel(x, y).r
	var river_channel: float = 1.0 - smoothstep(0.0, river_carve_width, river_distance_value)
	return terrain_height - river_channel * river_carve_depth

func _on_pin_selected(location_id: String) -> void:
	pin_selected.emit(location_id)

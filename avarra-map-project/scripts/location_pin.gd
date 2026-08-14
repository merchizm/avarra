extends Area3D

signal selected(location_id: String)

var location_id := ""
var location_name := ""

func _ready() -> void:
	input_event.connect(_on_input_event)

func _on_input_event(_camera: Node, event: InputEvent, _position: Vector3, _normal: Vector3, _shape_idx: int) -> void:
	if event is InputEventMouseButton and event.button_index == MOUSE_BUTTON_LEFT and event.pressed:
		selected.emit(location_id)

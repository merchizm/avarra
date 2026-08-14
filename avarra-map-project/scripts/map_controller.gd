extends Node3D

const MAP_WIDTH := 30.0
const MAP_DEPTH := 20.0

@onready var camera_controller: Node = $CameraRig
@onready var pin_manager: Node = $PinManager
@onready var web_bridge: Node = $WebBridge
@onready var intro: CanvasLayer = $MapIntro
@onready var pins: Node3D = $Pins

func _ready() -> void:
	pin_manager.configure(MAP_WIDTH, MAP_DEPTH, 0.65)
	pin_manager.pin_selected.connect(_on_pin_selected)
	pin_manager.load_locations("res://data/locations.json")
	camera_controller.initialize(MAP_WIDTH, MAP_DEPTH)
	pins.visible = false
	intro.exploration_requested.connect(_on_exploration_requested)

func _process(delta: float) -> void:
	camera_controller.update_camera(delta)

func _input(event: InputEvent) -> void:
	if event is InputEventMouseMotion:
		if Input.is_mouse_button_pressed(MOUSE_BUTTON_LEFT) or Input.is_mouse_button_pressed(MOUSE_BUTTON_MIDDLE):
			camera_controller.process_drag(event.relative)
		elif Input.is_mouse_button_pressed(MOUSE_BUTTON_RIGHT):
			camera_controller.process_orbit(event.relative)
	elif event is InputEventMouseButton:
		if event.button_index == MOUSE_BUTTON_WHEEL_UP:
			camera_controller.process_zoom(-1.0)
		elif event.button_index == MOUSE_BUTTON_WHEEL_DOWN:
			camera_controller.process_zoom(1.0)

func _on_pin_selected(location_id: String) -> void:
	web_bridge.send_location_selected(location_id)

func _on_exploration_requested() -> void:
	camera_controller.enter_exploration()
	pins.visible = true

extends Node3D

@export var pan_speed := 0.002
@export var zoom_speed := 2.4
@export var orbit_speed := 0.006
@export var min_distance := 5.5
@export var max_distance := 40.0
@export var follow_smoothing := 6.5
@export var zoom_smoothing := 7.5
@export var min_pitch_degrees := 2.0
@export var max_pitch_degrees := 40.0

var map_width := 30.0
var map_depth := 20.0
var target := Vector3.ZERO
var distance := 30.0
var desired_distance := 30.0
var pitch_degrees := 6.0
var yaw := 0.0
var smoothed_target := Vector3.ZERO
var interaction_enabled := false
var camera_initialized := false
@onready var camera: Camera3D = $Camera3D

func initialize(width: float, depth: float) -> void:
	map_width = width
	map_depth = depth
	set_intro_view()

func set_intro_view() -> void:
	target = Vector3(0.0, 0.0, 0.15)
	distance = 32.5
	desired_distance = distance
	pitch_degrees = min_pitch_degrees
	yaw = 0.0
	interaction_enabled = false
	smoothed_target = target
	_snap_camera()

func enter_exploration() -> void:
	# Keep the overview framed during the title card, then ease into the same
	# perspective used for map navigation instead of an abrupt starting zoom.
	desired_distance = 29.0
	pitch_degrees = 6.0
	interaction_enabled = true

func process_drag(relative: Vector2) -> void:
	if not interaction_enabled:
		return
	var scale := distance * pan_speed
	var camera_right := Vector3(cos(yaw), 0.0, -sin(yaw))
	var camera_forward := Vector3(sin(yaw), 0.0, cos(yaw))
	# Inverted navigation in the camera's own axes. This keeps right→left and
	# up→down correct even after the view has been rotated diagonally.
	target += (-camera_right * relative.x - camera_forward * relative.y) * scale
	_clamp_target_to_visible_map()

func process_orbit(relative: Vector2) -> void:
	if not interaction_enabled:
		return
	yaw -= relative.x * orbit_speed
	pitch_degrees = clampf(pitch_degrees + relative.y * orbit_speed * 31.5, min_pitch_degrees, max_pitch_degrees)

func process_zoom(direction: float) -> void:
	if not interaction_enabled:
		return
	desired_distance = clampf(desired_distance + direction * zoom_speed, min_distance, max_distance)

func update_camera(delta: float) -> void:
	if camera_initialized and delta > 0.0:
		var zoom_weight: float = 1.0 - exp(-zoom_smoothing * delta)
		distance = lerpf(distance, desired_distance, zoom_weight)
	_clamp_target_to_visible_map()
	var zoom_amount: float = inverse_lerp(max_distance, min_distance, distance)
	var effective_pitch_degrees: float = lerpf(pitch_degrees, max_pitch_degrees, zoom_amount)
	# Pitch is measured away from a top-down view: 2° is bird's-eye and 40° is
	# the closest, most angled map view.
	var pitch_radians: float = deg_to_rad(effective_pitch_degrees)
	var height: float = distance * cos(pitch_radians)
	var depth_offset: float = distance * sin(pitch_radians)
	var orbit_offset := Vector3(sin(yaw) * depth_offset, height, cos(yaw) * depth_offset)
	var desired_position := target + orbit_offset
	if not camera_initialized or delta <= 0.0:
		distance = desired_distance
		camera.global_position = desired_position
		smoothed_target = target
		camera_initialized = true
	else:
		var weight := 1.0 - exp(-follow_smoothing * delta)
		camera.global_position = camera.global_position.lerp(desired_position, weight)
		smoothed_target = smoothed_target.lerp(target, weight)
	camera.look_at(smoothed_target + Vector3(0.0, 0.5, 0.0), Vector3.UP)

func _snap_camera() -> void:
	update_camera(0.0)

func _clamp_target_to_visible_map() -> void:
	var viewport_size: Vector2 = get_viewport().get_visible_rect().size
	if viewport_size.x <= 1.0 or viewport_size.y <= 1.0:
		return

	# Project the real viewport corners onto sea level. Unlike a simple width /
	# height estimate, this remains correct at diagonal yaw and pitched views.
	var corners := [
		Vector2.ZERO,
		Vector2(viewport_size.x, 0.0),
		Vector2(0.0, viewport_size.y),
		viewport_size,
	]
	var center_ray_origin: Vector3 = camera.project_ray_origin(viewport_size * 0.5)
	var center_ray_direction: Vector3 = camera.project_ray_normal(viewport_size * 0.5)
	if absf(center_ray_direction.y) < 0.001:
		return
	var center_hit: Vector3 = center_ray_origin - center_ray_direction * (center_ray_origin.y / center_ray_direction.y)
	var min_offset := Vector2(INF, INF)
	var max_offset := Vector2(-INF, -INF)
	for corner in corners:
		var ray_origin: Vector3 = camera.project_ray_origin(corner)
		var ray_direction: Vector3 = camera.project_ray_normal(corner)
		if absf(ray_direction.y) < 0.001:
			return
		var hit: Vector3 = ray_origin - ray_direction * (ray_origin.y / ray_direction.y)
		var offset := Vector2(hit.x - center_hit.x, hit.z - center_hit.z)
		min_offset = min_offset.min(offset)
		max_offset = max_offset.max(offset)

	var half_width: float = map_width * 0.5
	var half_depth: float = map_depth * 0.5
	var min_target_x: float = -half_width - min_offset.x
	var max_target_x: float = half_width - max_offset.x
	var min_target_z: float = -half_depth - min_offset.y
	var max_target_z: float = half_depth - max_offset.y
	# If an overview is wider than the map, it must remain centered. At close
	# zoom the available interval opens naturally, with no path beyond the map.
	target.x = 0.0 if min_target_x > max_target_x else clampf(target.x, min_target_x, max_target_x)
	target.z = 0.0 if min_target_z > max_target_z else clampf(target.z, min_target_z, max_target_z)

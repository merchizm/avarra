@tool
extends Node3D

# Landmark manager - handles 3D landmark placement and interaction
# Will be expanded with features from the document

# Signal to be emitted when a landmark is selected
signal landmark_selected(landmark_id: String)

# Dictionary to store landmarks
# Format: { "landmark_id": { "position": Vector3, "name": String, "scene": String, ... } }
var landmarks: Dictionary = {}

func _ready() -> void:
	print("LandmarkManager initialized")
	# TODO: Load landmarks from data/landmarks.json

func add_landmark(landmark_id: String, position: Vector3, name: String, scene_path: String) -> void:
	landmarks[landmark_id] = {
		"position": position,
		"name": name,
		"scene": scene_path
	}
	# TODO: Instance the landmark scene and add to MapRoot
	print("Added landmark: %s at %s" % [landmark_id, position])

func remove_landmark(landmark_id: String) -> void:
	if landmarks.has(landmark_id):
		landmarks.erase(landmark_id)
		# TODO: Remove landmark instance
		print("Removed landmark: %s" % [landmark_id])

func get_landmark(landmark_id: String) -> Dictionary:
	return landmarks.get(landmark_id, {})

func _on_landmark_clicked(landmark_id: String) -> void:
	# TODO: Handle landmark click (e.g., show modal, select)
	emit_signal("landmark_selected", landmark_id)
	print("Landmark clicked: %s" % [landmark_id])

extends CanvasLayer

signal exploration_requested

@onready var loading: Control = $Screen/Loading
@onready var progress: ProgressBar = $Screen/Loading/Content/Progress
@onready var progress_label: Label = $Screen/Loading/Content/ProgressLabel
@onready var title_card: Control = $Screen/TitleCard
@onready var explore_button: Button = $Screen/TitleCard/Content/ExploreButton

func _ready() -> void:
	title_card.visible = false
	progress.value = 6.0
	progress_label.text = "6%"
	_play_opening()

func _play_opening() -> void:
	var progress_tween := create_tween()
	progress_tween.set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)
	progress_tween.tween_property(progress, "value", 100.0, 1.15)
	progress_tween.parallel().tween_method(_set_progress_label, 6.0, 100.0, 1.15)
	await progress_tween.finished
	await get_tree().create_timer(0.18).timeout
	var close_loader := create_tween()
	close_loader.set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN_OUT)
	close_loader.tween_property(loading, "modulate:a", 0.0, 0.42)
	await close_loader.finished
	loading.visible = false
	title_card.visible = true
	title_card.modulate.a = 0.0
	var reveal_title := create_tween()
	reveal_title.set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_OUT)
	reveal_title.tween_property(title_card, "modulate:a", 1.0, 0.62)

func _set_progress_label(value: float) -> void:
	progress_label.text = "%d%%" % roundi(value)

func _on_explore_button_pressed() -> void:
	explore_button.disabled = true
	var dismiss_title := create_tween()
	dismiss_title.set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN_OUT)
	dismiss_title.tween_property(title_card, "modulate:a", 0.0, 0.48)
	await dismiss_title.finished
	title_card.visible = false
	exploration_requested.emit()

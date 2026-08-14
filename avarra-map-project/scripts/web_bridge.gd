extends Node

func send_location_selected(location_id: String) -> void:
	var payload := {
		"source": "avarra-map",
		"type": "location:selected",
		"payload": {"id": location_id},
	}
	if OS.has_feature("web"):
		JavaScriptBridge.eval("window.parent.postMessage(%s, window.location.origin);" % JSON.stringify(payload), true)
	else:
		print("Web bridge payload: ", JSON.stringify(payload))

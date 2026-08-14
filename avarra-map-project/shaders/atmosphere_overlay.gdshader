shader_type canvas_item;

uniform vec2 drift_speed = vec2(0.006, -0.003);
uniform float texture_scale : hint_range(1.0, 3.0) = 1.35;
uniform float opacity : hint_range(0.0, 1.0) = 0.16;
uniform float coverage_low : hint_range(0.0, 1.0) = 0.35;
uniform float coverage_high : hint_range(0.0, 1.0) = 0.72;

void fragment() {
	// Explicit wrapping lets the cloud sheet drift forever without revealing an
	// edge, independent of the importer's texture-repeat setting.
	vec2 uv = fract((UV - vec2(0.5)) * texture_scale + vec2(0.5) + TIME * drift_speed);
	vec4 atmosphere = texture(TEXTURE, uv);
	// The supplied JPEGs have no alpha channel. Convert their bright cloud
	// shapes into coverage instead of laying the opaque JPEG over the whole map.
	float brightness = dot(atmosphere.rgb, vec3(0.2126, 0.7152, 0.0722));
	float coverage = smoothstep(coverage_low, coverage_high, brightness);
	vec4 node_modulate = COLOR;
	COLOR = vec4(node_modulate.rgb, coverage * opacity * node_modulate.a);
}

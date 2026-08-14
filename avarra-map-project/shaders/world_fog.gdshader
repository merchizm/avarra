shader_type spatial;
render_mode unshaded, cull_disabled, depth_draw_never, blend_mix;

uniform sampler2D fog_mask : filter_linear;
uniform sampler2D fog_detail : repeat_enable, filter_linear;
uniform vec3 fog_color : source_color = vec3(0.66, 0.77, 0.79);
uniform vec2 drift_speed = vec2(0.012, -0.006);
uniform float detail_tiling : hint_range(0.5, 3.0) = 1.25;
uniform float opacity : hint_range(0.0, 1.0) = 0.18;
uniform float mask_low : hint_range(0.0, 1.0) = 0.28;
uniform float mask_high : hint_range(0.0, 1.0) = 0.72;
uniform float detail_low : hint_range(0.0, 1.0) = 0.42;
uniform float detail_high : hint_range(0.0, 1.0) = 0.72;
uniform float vertical_rise : hint_range(0.0, 1.0) = 0.18;

float fog_anchor(vec2 uv) {
	return smoothstep(mask_low, mask_high, texture(fog_mask, uv).r);
}

void vertex() {
	float anchor = fog_anchor(UV);
	vec2 moving_uv = fract(UV * detail_tiling + TIME * drift_speed);
	float billow = texture(fog_detail, moving_uv).r;
	// The sheet rises where fog is dense. Two sheets at different base heights
	// create a small, map-locked volume instead of a camera-facing overlay.
	VERTEX.y += anchor * (vertical_rise + billow * vertical_rise * 0.45);
}

void fragment() {
	float anchor = fog_anchor(UV);
	vec2 moving_uv = fract(UV * detail_tiling + TIME * drift_speed);
	float billow = texture(fog_detail, moving_uv).r;
	float wisps = smoothstep(detail_low, detail_high, billow);
	float coverage = anchor * wisps;
	ALBEDO = fog_color;
	EMISSION = fog_color * 0.12;
	ALPHA = coverage * opacity;
}

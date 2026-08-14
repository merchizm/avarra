shader_type spatial;
render_mode cull_back, depth_draw_opaque;

uniform sampler2D height_map;
uniform sampler2D land_mask;
uniform sampler2D splat_a;
uniform sampler2D splat_b;
uniform sampler2D river_mask;
uniform sampler2D river_distance;
uniform sampler2D lake_mask;
uniform sampler2D slope_map;
uniform sampler2D grass_albedo : source_color;
uniform sampler2D forest_albedo : source_color;
uniform sampler2D arid_albedo : source_color;
uniform sampler2D rock_albedo : source_color;
uniform sampler2D snow_albedo : source_color;
uniform sampler2D volcanic_albedo : source_color;
uniform sampler2D wetland_albedo : source_color;

uniform float height_strength : hint_range(0.0, 12.0) = 0.65;
uniform float sea_level : hint_range(0.0, 1.0) = 0.08;
uniform float river_carve_depth : hint_range(0.0, 0.25) = 0.075;
uniform float river_carve_width : hint_range(0.05, 0.6) = 0.30;
uniform float texture_tiling : hint_range(0.25, 12.0) = 4.2;
uniform vec3 river_color : source_color = vec3(0.025, 0.30, 0.40);
uniform float ridge_ink_strength : hint_range(0.0, 0.65) = 0.24;

void vertex() {
	float land = texture(land_mask, UV).r;
	// Rebase elevations against the actual shoreline so island edges meet the
	// ocean plane instead of inheriting a small global vertical offset.
	float elevation = max(texture(height_map, UV).r - sea_level, 0.0);
	VERTEX.y += elevation * height_strength * land;
	// A soft distance-field carve gives rivers a real, shallow bed. The color
	// layer is intentionally narrower, leaving the sculpted banks readable.
	float river_channel = 1.0 - smoothstep(0.0, river_carve_width, texture(river_distance, UV).r);
	VERTEX.y -= river_channel * river_carve_depth * land;
}

void fragment() {
	if (texture(land_mask, UV).r < 0.5 || texture(lake_mask, UV).r > 0.5) {
		discard;
	}
	vec4 a = texture(splat_a, UV);
	vec4 b = texture(splat_b, UV);
	float total = max(a.r + a.g + a.b + a.a + b.r + b.g + b.b, 0.001);
	vec2 tiled_uv = UV * texture_tiling;
	vec3 color = (
		texture(forest_albedo, tiled_uv).rgb * a.r +
		texture(grass_albedo, tiled_uv).rgb * a.g +
		texture(arid_albedo, tiled_uv).rgb * a.b +
		texture(rock_albedo, tiled_uv).rgb * a.a +
		texture(snow_albedo, tiled_uv).rgb * b.r +
		texture(volcanic_albedo, tiled_uv).rgb * b.g +
		texture(wetland_albedo, tiled_uv).rgb * b.b
	) / total;
	// The slope mask supplies a subdued drawn shadow, making the real displaced
	// ridges read at overview distance without painting a second geography map.
	float mountain_weight = max(a.a, b.r);
	float slope = texture(slope_map, UV).r;
	float ridge_ink = smoothstep(0.16, 0.58, slope) * mix(0.38, 1.0, mountain_weight);
	color *= mix(vec3(1.0), vec3(0.54, 0.58, 0.57), ridge_ink * ridge_ink_strength);
	// The semantic line is expanded through its deterministic distance field:
	// a narrow dark bed and a wider muted bank, not a tiled strip of texture.
	float river_line = texture(river_mask, UV).r;
	float river_distance_value = texture(river_distance, UV).r;
	float river_core = 1.0 - smoothstep(0.012, 0.105, river_distance_value);
	float river_bank = 1.0 - smoothstep(0.045, 0.22, river_distance_value);
	float river = max(river_line, river_core);
	float river_edge = clamp(river_bank - river, 0.0, 1.0);
	color = mix(color, color * vec3(0.72, 0.88, 0.82), river_bank * 0.15);
	color = mix(color, river_color, river * 0.72);
	color = mix(color, river_color * 0.72, river_edge * 0.18);
	ALBEDO = color;
	ROUGHNESS = mix(0.86, 0.58, river);
	METALLIC = 0.0;
}

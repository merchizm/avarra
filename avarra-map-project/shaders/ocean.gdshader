shader_type spatial;
render_mode cull_back, depth_draw_opaque;

uniform sampler2D coast_distance;
uniform sampler2D ocean_albedo : source_color;
uniform sampler2D land_mask;
uniform sampler2D lake_mask;
uniform vec3 deep_tint : source_color = vec3(0.30, 0.48, 0.58);
uniform vec3 shallow_tint : source_color = vec3(0.52, 1.08, 1.18);
uniform float pattern_tiling : hint_range(0.25, 4.0) = 1.35;
uniform vec2 map_uv_scale = vec2(1.4, 1.4);

void fragment() {
	// The ocean mesh deliberately extends beyond the map so the widest camera
	// view never reveals an empty world background. Convert its UVs back into
	// the original 30x20 map UV space before sampling map-specific masks.
	vec2 map_uv = (UV - vec2(0.5)) * map_uv_scale + vec2(0.5);
	bool outside_map = any(lessThan(map_uv, vec2(0.0))) || any(greaterThan(map_uv, vec2(1.0)));
	if (outside_map) {
		vec3 outer_ocean = texture(ocean_albedo, UV * pattern_tiling).rgb * deep_tint;
		ALBEDO = outer_ocean;
	} else {
		// The ocean mesh spans the entire canvas but must never contribute a
		// fragment over land. This keeps coasts crisp even with filtered textures.
		float lake = texture(lake_mask, map_uv).r;
		if (texture(land_mask, map_uv).r > 0.5 && lake < 0.5) {
			discard;
		}
		float distance_from_coast = texture(coast_distance, map_uv).r;
		// coast_distance reaches 1 after roughly 100 source pixels. This gives the
		// shoreline room to breathe before transitioning into a clearly deep sea.
		float shallows = 1.0 - smoothstep(0.015, 0.42, distance_from_coast);
		vec3 painted_ocean = texture(ocean_albedo, map_uv * pattern_tiling).rgb;
		// Static cartography: turquoise only hugs the shore, while the same painted
		// texture becomes substantially darker in open water.
		vec3 deep_sea = painted_ocean * deep_tint;
		vec3 coastal_sea = painted_ocean * shallow_tint + vec3(0.0, 0.012, 0.018);
		vec3 ocean_surface = mix(deep_sea, coastal_sea, shallows);
		// Lakes share the same painted water language but use a darker enclosed
		// basin, so they read as filled inland water rather than empty terrain cuts.
		float lake_depth = smoothstep(0.025, 0.24, distance_from_coast);
		vec3 lake_edge = painted_ocean * vec3(0.46, 0.94, 1.02) + vec3(0.0, 0.008, 0.012);
		vec3 lake_deep = painted_ocean * vec3(0.24, 0.45, 0.54);
		vec3 lake_surface = mix(lake_edge, lake_deep, lake_depth);
		ALBEDO = mix(ocean_surface, lake_surface, lake);
	}
	METALLIC = 0.0;
	ROUGHNESS = 1.0;
}

#!/usr/bin/env python3
"""Build deterministic Godot map assets from the extracted source masks."""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "map" / "source"
GENERATED = ROOT / "assets" / "map" / "generated"
WATER = ROOT / "assets" / "water"


def gray(path: Path) -> np.ndarray:
    return np.asarray(Image.open(path).convert("L"), dtype=np.float32) / 255.0


def save_gray(path: Path, values: np.ndarray) -> None:
    Image.fromarray(np.uint8(np.clip(values, 0.0, 1.0) * 255.0), "L").save(path)


def save_rgb(path: Path, values: np.ndarray) -> None:
    Image.fromarray(np.uint8(np.clip(values, 0.0, 1.0) * 255.0), "RGB").save(path)


def binary(path: Path, land: np.ndarray) -> np.ndarray:
    return (gray(path) >= 0.5) & land


def chamfer_distance_from_land(land: np.ndarray) -> np.ndarray:
    """Approximate Euclidean distance for water pixels, in pixels.

    The 3/4 chamfer weights are a fast, deterministic fit for the 100 px
    offshore falloff used by the ocean shader.
    """
    height, width = land.shape
    distance = np.where(land, 0.0, np.inf).astype(np.float32)
    orthogonal, diagonal = 3.0, 4.0

    for y in range(height):
        for x in range(width):
            if distance[y, x] == 0.0:
                continue
            best = distance[y, x]
            if y:
                best = min(best, distance[y - 1, x] + orthogonal)
                if x:
                    best = min(best, distance[y - 1, x - 1] + diagonal)
                if x + 1 < width:
                    best = min(best, distance[y - 1, x + 1] + diagonal)
            if x:
                best = min(best, distance[y, x - 1] + orthogonal)
            distance[y, x] = best

    for y in range(height - 1, -1, -1):
        for x in range(width - 1, -1, -1):
            if distance[y, x] == 0.0:
                continue
            best = distance[y, x]
            if y + 1 < height:
                best = min(best, distance[y + 1, x] + orthogonal)
                if x:
                    best = min(best, distance[y + 1, x - 1] + diagonal)
                if x + 1 < width:
                    best = min(best, distance[y + 1, x + 1] + diagonal)
            if x + 1 < width:
                best = min(best, distance[y, x + 1] + orthogonal)
            distance[y, x] = best

    return distance / orthogonal


def normal_from_height(height: np.ndarray, strength: float) -> np.ndarray:
    gy, gx = np.gradient(height)
    normal = np.dstack((-gx * strength, np.ones_like(height), -gy * strength))
    normal /= np.linalg.norm(normal, axis=2, keepdims=True)
    return normal * 0.5 + 0.5


def main() -> None:
    GENERATED.mkdir(parents=True, exist_ok=True)

    land = gray(SOURCE / "land_mask.png") >= 0.5
    # The source land mask covers continents only. Inland water is a separate
    # semantic mask so lakes can reveal the water plane without cutting holes
    # into the canonical coastline data.
    lake = binary(GENERATED / "lake_mask.png", land)
    terrain_land = land & ~lake
    # Give exclusive semantic masks stable priority so biome weights never
    # compete in a single texel.
    snow = binary(GENERATED / "snow_mask.png", terrain_land)
    volcanic = binary(GENERATED / "volcanic_mask.png", terrain_land) & ~snow
    arid = binary(GENERATED / "arid_mask.png", terrain_land) & ~snow & ~volcanic
    forest = binary(GENERATED / "forest_mask.png", terrain_land) & ~snow & ~volcanic & ~arid
    river = binary(GENERATED / "river_mask.png", terrain_land)
    grassland = terrain_land & ~(forest | arid | snow | volcanic)

    for name, mask in {
        "forest_mask.png": forest,
        "arid_mask.png": arid,
        "snow_mask.png": snow,
        "volcanic_mask.png": volcanic,
        "river_mask.png": river,
        "grassland_mask.png": grassland,
        "lake_mask.png": lake,
    }.items():
        save_gray(GENERATED / name, mask.astype(np.float32))

    # Keep only large-scale landform information. The extraction source still
    # has fine ridge strokes; displacing those on a 256x170 mesh creates tall
    # needle-like spikes instead of a readable 2.5D silhouette.
    # Keep a stable pre-filter source. Re-running the pipeline must not blur
    # the already-clean output a second time.
    height_source = GENERATED / "terrain_height_extracted.png"
    if not height_source.exists():
        height_source = GENERATED / "terrain_height_clean.png"
    clean_image = Image.open(height_source).convert("L")
    # Reconstruct from a low-resolution elevation field. This deliberately
    # removes all illustrated ridge/contour detail before it reaches the
    # vertex shader; at map-view scale only broad mountains and basins belong
    # in geometry.
    macro_size = (192, 128)
    macro_height = clean_image.resize(macro_size, Image.Resampling.LANCZOS)
    smooth_height = macro_height.resize(clean_image.size, Image.Resampling.BICUBIC)
    height = np.asarray(smooth_height.filter(ImageFilter.GaussianBlur(radius=2.0)), dtype=np.float32) / 255.0
    height *= terrain_land
    save_gray(GENERATED / "terrain_height_clean.png", height)

    gy, gx = np.gradient(height)
    slope = np.hypot(gx, gy)
    scale = np.percentile(slope[terrain_land], 99.0) if np.any(terrain_land) else 1.0
    slope = np.clip(slope / max(scale, 1e-6), 0.0, 1.0) * terrain_land
    rock_weight = np.clip((slope * 0.82 + height * 0.28 - 0.18) / 0.82, 0.0, 1.0) * land

    save_gray(GENERATED / "slope.png", slope)
    save_gray(GENERATED / "rock_weight.png", rock_weight)
    save_rgb(GENERATED / "terrain_normal.png", normal_from_height(height, strength=12.0))

    # Treat lake pixels as water here as well, yielding a usable shallow-to-
    # deep gradient for both the ocean and inland lakes.
    coast_distance_px = chamfer_distance_from_land(terrain_land)
    water = ~terrain_land
    coast_distance = np.clip(coast_distance_px / 100.0, 0.0, 1.0) * water
    shore_mask = ((coast_distance_px <= 12.0) & water).astype(np.float32)
    save_gray(GENERATED / "coast_distance.png", coast_distance)
    save_gray(GENERATED / "shore_mask.png", shore_mask)

    # A normalized distance field turns the one-pixel semantic river mask into
    # an art-directable river core plus soft bank transition in the shader.
    river_distance_px = chamfer_distance_from_land(river)
    river_distance = np.clip(river_distance_px / 14.0, 0.0, 1.0) * terrain_land
    save_gray(GENERATED / "river_distance.png", river_distance)

    splat_a = np.dstack((forest, grassland, arid, rock_weight)).astype(np.float32)
    splat_b = np.dstack((snow, volcanic, np.zeros_like(height), np.zeros_like(height))).astype(np.float32)
    Image.fromarray(np.uint8(np.clip(splat_a, 0.0, 1.0) * 255.0), "RGBA").save(GENERATED / "splat_a.png")
    Image.fromarray(np.uint8(np.clip(splat_b, 0.0, 1.0) * 255.0), "RGBA").save(GENERATED / "splat_b.png")

    water_height = gray(WATER / "water_microheight.png")
    save_rgb(WATER / "water_normal.png", normal_from_height(water_height, strength=3.0))


if __name__ == "__main__":
    main()

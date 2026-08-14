# Avarra

**Avarra** is a bilingual, file-based Dungeons & Dragons world wiki. It is built to be useful at the table: an evolving atlas of peoples, states, settlements, faiths, history, and adventure-facing world records.

The Turkish site is the canonical content source. English records mirror it for readers and players who use the English interface.

<p align="center">
  <img src="docs/public/assets/brand/avarra-root-and-stars.png" width="128" alt="Avarra Echo Seal" />
</p>

## The Echo Seal

The Avarra mark is the **Root and Stars Seal**. Its tree recalls Yankıkök and the living paths between worlds; its roots evoke the World Veins, while the surrounding stars represent the atlas’s connected regions and histories. It is retained here as repository documentation; the public wiki does not use it as a site or browser icon.

## What is in the wiki?

- **Atlas:** Interactive world map, continental records, regional maps, seas, and the underground.
- **Peoples:** D&D-derived peoples, Avarra-original peoples, cultural links, and source/adaptation notes.
- **States:** Governments, borders, claims, succession disputes, and political relationships.
- **Settlements:** Capitals, towns, ports, deep cities, and daily-life dossiers.
- **Faiths & cultures:** Faith families, rituals, death and return traditions, diasporas, and Fey Roads.
- **History & Stagnation:** Ages, the Veil Wars, ancient infrastructure, and player-facing Stagnation records.

## Local development

Requirements: Node.js 22+ and npm.

```bash
npm install
npm run docs:dev
```

VitePress prints the local URL, normally `http://localhost:5173/avarra/`.

### Verify a production build

```bash
npm run docs:build
npm run docs:preview
```

There is no separate lint or test script. A successful `npm run docs:build` is the required project check.

## Repository map

| Path | Purpose |
| --- | --- |
| `docs/` | Canonical Turkish Markdown records. |
| `docs/en/` | English counterparts. Keep parity when a change is reader-facing. |
| `docs/.vitepress/config.mjs` | VitePress configuration, locales, navigation, base path, and reference index. |
| `docs/.vitepress/theme/` | Vue components, atlas behavior, shared UI, and global styles. |
| `docs/public/assets/` | Static maps, illustrations, brand assets, and other public files. |
| `.github/workflows/deploy-pages.yml` | GitHub Pages deployment from `main`. |
| `kanon/` | Private working canon. It is intentionally ignored by Git. |

## Writing records

- Use lowercase, hyphenated Turkish filenames in `docs/`.
- Begin normal pages with YAML front matter and a unique `title`.
- Use relative links for wiki pages and `/assets/...` paths for static files.
- Follow nearby semantic HTML and classes such as `lore-lead`, `lore-grid`, and `lore-card` where they are already used.
- Keep player-facing records distinct from private GM material.
- When adding a public Turkish record, add or update its English counterpart and link it from the relevant index page.

## Assets and branding

Static assets live under `docs/public/assets/` and are referenced from content using `/assets/...` paths. The VitePress configuration handles the `/avarra/` GitHub Pages base path.

- Logo: `docs/public/assets/brand/avarra-root-and-stars.png`
- Maps: `docs/public/assets/maps/`
- Illustrations: `docs/public/assets/illustrations/`

Do not edit `docs/.vitepress/cache/` or `docs/.vitepress/dist/`; both are generated.

## Deployment

Every push to `main` triggers the GitHub Pages workflow. In the repository settings, set **Settings → Pages → Build and deployment** to **GitHub Actions**.

The configured deployment base is `/avarra/`. If deploying the site to a custom domain or repository root, update `base` in `docs/.vitepress/config.mjs`.

## Attribution

Avarra is an independent fan-made setting and is not affiliated with or endorsed by Wizards of the Coast. Dungeons & Dragons names and source references are used to identify compatible game material; Avarra’s world writing, adaptation, and original peoples remain its own setting work.

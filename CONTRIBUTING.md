# Contributing to Planet Builder

Welcome. This repo is meant to grow with the community — planets, creatures, biomes, features, fixes. Everything here.

---

## Ways to Contribute

### 🌍 Submit a Planet
1. Fork this repo
2. Create a file in `community/planets/<your-planet-id>.json` following the planet schema in `docs/GDD.md`
3. Open a PR with title `[Planet] Your Planet Name`
4. Your planet will be reviewed and added to the Community Hub

### 🐾 Add Creatures to the Registry
1. Open `src/data/creatures.js`
2. Add your creature following the existing schema (emoji, name, type, stats, ecoFact, conservation)
3. PR title: `[Creature] CreatureName (Type)`
4. Real-world conservation data preferred for ecoFact

### 🌿 Propose New Biome Types
Open an issue with:
- Biome type name
- Tile types it uses
- Suggested creature pool
- Color palette (hex or hsl)
- Reference image

### 💻 Developer Contributions
- Bug fixes: PR with description
- New features: Open issue first, discuss, then PR
- Pico-8 export improvements: test locally with `npm run pico8:export <seed>`

---

## Code Style

- ES modules throughout
- No TypeScript required, but types via JSDoc encouraged
- Prefer `seededRandom()` from `src/systems/procedural.js` for any deterministic generation
- Use `can()` / `gate()` from `src/systems/modes.js` for permission checks

---

## Planet Schema Quick Reference

```json
{
  "id": "uuid (assigned on publish)",
  "name": "My Planet",
  "seed": "optional-seed-string",
  "author": "github_username",
  "forked_from": "parent_planet_id or null",
  "tags": ["forest", "ocean"],
  "biomes": [...],
  "creatures": [...],
  "lore": { "title": "...", "fragments": ["..."] },
  "rules": { "pvp": false, "open_edit": false }
}
```

---

## Community Guidelines

- Planets must be yours to share — don't upload protected content
- Creature eco facts should be accurate (real IUCN data preferred)
- Planet names and lore should be original
- Be kind in PR feedback

---

## License

All contributions are MIT licensed. You keep credit as the planet's author.

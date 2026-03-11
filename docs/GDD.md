# Planet Builder — Game Design Document
**Version:** 0.1.0  
**Author:** Amara (Mars) / Mellowambience  
**Status:** Active Development

---

## Vision

Planet Builder is a creative multiplayer sandbox where players don't just *play* a world — they *make* it. Every planet is a living, forkable artifact. You can explore planets others built, remix them, fuse two together, or start from a procedural seed and grow something entirely your own.

Think: **Minecraft creative mode** × **Pokémon world building** × **GitHub for games**.

---

## Core Loop

```
Discover Planet → Explore / Play →
  ↓ love it?
Fork Planet → Remix in Editor →
  ↓ want something new?
Hybridize Two Planets → Publish →
  ↓ back to top
```

---

## Player Modes

### 🔭 Observer
- Browse the Community Hub
- Watch live build sessions
- React/rate planets
- Cannot modify anything

### 🎮 Player
- All Observer abilities
- Play through any public planet (overworld movement, encounters, battles)
- Catch creatures from the planet's creature pool
- Complete biome quests

### 🎨 Designer
- All Player abilities
- Full Planet Editor access
- Drag-and-drop tile/biome placement
- Set creature spawn rules, lore entries, ambient events
- Publish planets to Community Hub
- Fork & remix other planets

### 💻 Developer
- All Designer abilities
- Raw planet JSON schema access
- Custom event scripting (JavaScript)
- Pico-8 export pipeline
- API access to creature registry
- Can register AI agent companions

---

## Planet Schema

Every planet is a JSON document:

```json
{
  "id": "uuid",
  "name": "string",
  "seed": "string (optional — for procedural)",
  "author": "github_username",
  "forked_from": "planet_id or null",
  "version": "semver",
  "published": "ISO 8601",
  "tags": ["forest", "ocean", "volcanic"],
  "biomes": [...],
  "creatures": [...],
  "lore": {...},
  "rules": {...},
  "meta": {
    "play_count": 0,
    "fork_count": 0,
    "rating": 0.0
  }
}
```

### Biome Object

```json
{
  "id": "biome_id",
  "name": "Whispering Canopy",
  "type": "Forest",
  "tiles": [[...grid of tile IDs...]],
  "width": 32,
  "height": 32,
  "ambient": "forest_day",
  "encounter_rate": 0.15,
  "creature_pool": ["creature_id_1", "creature_id_2"],
  "color_palette": ["#2d6a4f", "#40916c", "#74c69d"]
}
```

### Tile Types

| ID | Name | Walkable | Encounter |
|----|------|----------|-----------|
| 0 | Void | No | No |
| 1 | Grass | Yes | Yes |
| 2 | Forest | Yes | Yes (high) |
| 3 | Sand | Yes | Yes |
| 4 | Water | No | No |
| 5 | Mountain | No | No |
| 6 | Path | Yes | No |
| 7 | Town | Yes | No |
| 8 | Portal | Yes | Trigger |
| 9 | Lava | No | No |

---

## Hybridize System

Two planets can be fused to create a child planet:

**Rules:**
1. Pick Planet A and Planet B
2. Select a fusion mode:
   - **Merge**: Biomes from both planets placed side-by-side, creature pools combined
   - **Blend**: Biome tiles are algorithmically interwoven, mixed creature pool
   - **Dominant**: Planet A's structure dominates; B's creatures and lore are injected
3. Child planet is a new fork — both parent planet IDs stored in lineage
4. Name is auto-generated portmanteau (can be overridden)

**Fusion formula for creature stats (Blend mode):**
```
childStat = Math.round((parentA.stat * 0.6) + (parentB.stat * 0.4) + seededRandom() * 5)
```

---

## Procedural Seed System

Entering a seed string generates a deterministic planet:

```js
generatePlanet("aether-rose-7")
// → reproducible biome layout, creature pool, lore fragments
// → same seed always produces same planet
// → can be shared, forked, remixed
```

Seed affects:
- Number of biomes (3–7)
- Biome type distribution
- Tile map generation (cellular automata)
- Starting creature pool (5–12 creatures)
- Ambient lore fragments
- Color palette

---

## Community Hub

A public gallery of all published planets:

- **Browse** by tag, biome type, creator, rating
- **Fork** any planet → creates your copy with lineage tracking
- **Remix** (fork + open in editor immediately)
- **Rate** (1–5 star + optional comment)
- **Lineage Tree** — visual tree of all forks from an original planet
- **Featured** — curated weekly picks

---

## Creature Registry

A shared cross-project registry of creatures:

- All 30 EmojiMon from EcoQuest: Crystal Engine are available
- Planet designers can add planet-specific creatures (stored locally in planet JSON)
- Community creatures can be submitted for global registry inclusion
- Creature types: Forest / Ocean / Sky / Earth / Fire / Storm

---

## Pico-8 Export

Any planet can be exported as a `.p8` cartridge:

1. Select planet in Designer mode
2. Click "Export → Pico-8"
3. System generates Lua:
   - Tile map from biome grid (truncated to 128×128 if larger)
   - Creature encounter table
   - Walking + encounter + battle loop (reused from EcoQuest `.p8` base)
4. Download `.p8` file
5. Open in Pico-8 → playable immediately

---

## Technical Architecture

### Stack
- **Frontend**: React + Vite + Tailwind
- **State**: Zustand
- **Backend**: PlayFab (save/load/leaderboards) + Supabase (community hub, planet storage)
- **Realtime co-design**: Supabase Realtime channels
- **Pico-8 export**: Node.js script (server or browser WASM)

### Key Systems
- `src/systems/modes.js` — role-based permission gates
- `src/systems/hybrid.js` — planet fusion engine
- `src/systems/procedural.js` — seed-based generation
- `src/systems/pico8export.js` — `.p8` cartridge generator
- `src/editor/PlanetEditor.jsx` — drag-and-drop editor UI
- `src/community/Hub.jsx` — community hub browser
- `src/services/playfab.js` — PlayFab integration
- `src/services/hub.js` — Supabase community hub API

---

## Build Order (MVP)

| Phase | What | Status |
|-------|------|--------|
| 1 | Planet schema + data layer | 🔲 |
| 2 | Mode permission system | 🔲 |
| 3 | Procedural seed generator | 🔲 |
| 4 | Planet editor (tile painter) | 🔲 |
| 5 | Player overworld movement | 🔲 |
| 6 | Creature encounters + battle | 🔲 (reuse from EcoQuest) |
| 7 | Fork/remix/hybridize | 🔲 |
| 8 | Community hub | 🔲 |
| 9 | Pico-8 export | 🔲 |
| 10 | PlayFab backend | 🔲 |
| 11 | Realtime co-design | 🔲 |

---

## Relationship to EcoQuest

Planet Builder and EcoQuest: Crystal Engine share:
- Creature data format (same schema)
- Type chart (Forest / Ocean / Sky / Earth / Fire / Storm)
- Battle engine (`src/engine/battle.js`)
- Mode permission system (`src/systems/modes.js`)
- PlayFab service layer (`src/services/playfab.js`)

They are separate repos but designed to interoperate. A planet built here can be played inside EcoQuest as a new region, and an EcoQuest biome can be imported here as a starting planet.

# 🌍 Planet Builder

> A collaborative world-design game where anyone can **play**, **build**, **remix**, and **hybridize** planets.

[![Live Demo](https://img.shields.io/badge/Play-Live%20Demo-brightgreen)](https://planet-builder.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)](CONTRIBUTING.md)

---

## What is Planet Builder?

Planet Builder is an open, community-driven game engine where worlds are made by everyone.

| Mode | What you can do |
|------|----------------|
| 🔭 **Observer** | Explore any public planet, watch others build live |
| 🎮 **Player** | Play through biomes, catch creatures, complete quests |
| 🎨 **Designer** | Drag-and-drop planet editor — tiles, biomes, creatures, lore |
| 💻 **Developer** | Full API + scripting access, fork & extend the engine |

---

## Core Features

- **🌍 Planet Editor** — tile-based biome builder with drag-and-drop tools
- **🔀 Remix & Fork** — fork any public planet and make it yours
- **🧬 Hybridize** — fuse two planets to create a brand new one (merges biomes + creature pools)
- **🌱 Creature Import** — pull EmojiMon from EcoQuest Crystal Engine directly into your planet
- **🎲 Procedural Seeds** — enter a seed string → auto-generated starter planet
- **👥 Co-Design** — live multiplayer planet editing
- **📦 Pico-8 Export** — auto-generate a `.p8` cartridge from any planet
- **🏆 Community Hub** — browse, fork, rate, and remix public planets

---

## Quick Start

```bash
git clone https://github.com/Mellowambience/planet-builder.git
cd planet-builder
npm install
npm run dev
```

Open `http://localhost:5173` → choose a mode → start building.

---

## Project Structure

```
planet-builder/
├── src/
│   ├── engine/          # Core game engine (battle, movement, events)
│   ├── systems/         # Modes, fusion, procedural generation
│   ├── data/            # Planets, creatures, biomes, type charts
│   ├── editor/          # Planet editor UI components
│   ├── community/       # Fork/remix/hub logic
│   └── services/        # PlayFab backend, persistence
├── pico8/               # Pico-8 export pipeline
├── docs/                # GDD, architecture, API reference
├── public/              # Static assets
└── CONTRIBUTING.md
```

---

## Ecosystem

Planet Builder is part of the **EcoVerse**:

| Project | Description |
|---------|-------------|
| [EcoQuest: Crystal Engine](https://github.com/Mellowambience/ecoquest-crystal-engine) | The original EmojiMon RPG |
| **Planet Builder** | Collaborative world-design engine (this repo) |

Planets built here can import creatures from EcoQuest, and EcoQuest biomes can be exported as Planet Builder worlds.

---

## Contributing

Every planet is a contribution. See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- How to submit a planet to the community hub
- How to propose new biome types
- How to add creatures to the shared registry
- Developer mode API docs

---

## License

MIT — build freely, remix openly, share widely.

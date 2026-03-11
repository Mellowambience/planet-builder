# Planet Builder — Art Direction & Aesthetic Reference
**Version:** 0.1.0  
**Reference Artist:** Vexing.art (iridescent holographic planet art)

---

## Core Aesthetic

> **"Cosmic Handmade"** — worlds that feel like someone *cared* about making them.

The visual language is: **Holographic Vaporwave × Intimate Indie**. Each planet should feel like a precious artifact — iridescent, unique, alive. Not cold sci-fi. Not cartoon. Somewhere between a soap bubble and a found object from another dimension.

Primary reference: Vexing.art planet series — teal/magenta/violet iridescence, metallic ring systems, liquid-texture surfaces, thin-film interference shimmer.

---

## Color System

### Global Palette

| Role | Value | Usage |
|------|-------|-------|
| Void Black | `#08080f` | Background, deep space |
| Cosmic Indigo | `#0d0d2b` | UI background panels |
| Iridescent White | `#e8f4f8` | Primary text, labels |
| Holographic Teal | `#00d4c8` | Accents, highlights, active states |
| Shimmer Magenta | `#c026d3` | Secondary accent, hover states |
| Metallic Gold | `#d4a843` | Ring systems, legendary creatures, ratings |
| Ghost Silver | `rgba(255,255,255,0.12)` | Glassmorphism panels |

### Biome Color Mapping

| Biome | Primary Hue | Secondary Hue | Feel |
|-------|-------------|---------------|------|
| 🌿 Forest | `#2d6a4f` → `#74c69d` | `#40916c` | Deep emerald, moss, dew |
| 🌊 Ocean | `#023e8a` → `#0096c7` | `#48cae4` | Midnight blue, bioluminescent |
| ☁️ Sky | `#7b9cff` → `#c8d8ff` | `#b3c6ff` | Pale lavender, sunlit clouds |
| 🪨 Earth | `#b5451b` → `#e07a5f` | `#c97d4e` | Terracotta, red dust, ochre |
| 🔥 Fire | `#d62828` → `#f77f00` | `#fcbf49` | Ember orange, volcanic magma |
| ⚡ Storm | `#4361ee` → `#7209b7` | `#3a0ca3` | Electric violet, arc lightning |

### Planet Sphere Texture

- 1 biome → solid texture with shimmer
- 2–3 biomes → soft gradient bands
- 4+ biomes → marble/oil-slick swirl (full iridescent effect)

---

## Typography

| Use | Font | Style |
|-----|------|-------|
| Planet names, titles | `Space Grotesk` (Google Fonts) | Light / Regular, wide letter-spacing (+0.1em) |
| Body text, descriptions | `Inter` | Regular 400 |
| Monospace / lore text | `Space Mono` | For lore fragments, seed codes |
| Creature emoji | System emoji | Large, no border |

**Rules:**
- White text on dark always
- Letter-spacing on headings: `0.08em` to `0.15em`
- Never bold for planet/creature names — use size and spacing instead

---

## UI Components

### Glassmorphism Panels
```css
background: rgba(13, 13, 43, 0.7);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 16px;
box-shadow: 0 8px 32px rgba(0, 212, 200, 0.1);
```

### Planet Cards (Community Hub)
- Square card with circular planet sphere centered
- Planet name in Space Grotesk below, letter-spaced
- Biome tag pills (small, colored by biome type)
- Hover: ring system appears (CSS transform + metallic gradient)
- Fork/play count in ghost silver

### Planet Editor
- Tile grid rendered inside a circular viewport
- Toolbar floats on the left — minimal icons, no labels
- Active tile/biome shown as a small iridescent swatch

### Hybridize Screen
- Planet A and Planet B float on opposite sides, slowly rotating
- Hybridize triggers: planets drift toward center → collision flash → new sphere
- New planet inherits blended surface texture of both parents

### Creature Encounter
- Dark overlay, creature emoji large (96–128px)
- HP bar: thin, teal, glassmorphic arc
- Battle actions as floating circular buttons
- Capture animation: iridescent ring contracts → shimmer flash → success/fail

---

## Motion & Animation

| Interaction | Animation |
|-------------|----------|
| Planet sphere (idle) | Slow rotation, 30s loop |
| Ring system | Counter-rotation, 45s loop |
| Hover on planet card | Ring appears, 0.2s ease-out |
| Hybridize collision | Scale up → flash white → scale down new sphere, 1.2s |
| Creature encounter | Slide up from bottom, 0.3s spring |
| Biome transition | Cross-fade + color shift, 0.5s |
| Tile placement | Ripple from placed tile outward, 0.15s |
| Portal entry | Swirl inward → cut to new biome |

All animations: prefer `transform` + `opacity` only.

---

## Pico-8 Aesthetic (Export)

Pixel-art planetpunk style:
- 16-color Pico-8 palette, biome-mapped
- Creature emoji → 8×8 pixel sprite approximations
- UI: thin white lines, no fill borders
- Planet surface on title screen: dithered gradient sphere

---

## Moodboard Keywords

```
iridescent planet holographic
vaporwave soap bubble cosmos
thin-film interference texture
oil slick marble swirl space
synthwave ring system metallic gold
glassmorphism dark UI indie game
vexing.art planet aesthetic
pixel art planetpunk 16-color
```

---

## What to Avoid

- Bright white backgrounds
- Hard drop shadows (use glow/shimmer instead)
- Cartoon outlines on creatures or tiles
- Red/green traffic-light status colors
- Dense, information-heavy layouts
- Generic game UI chrome (health bars as rectangles)

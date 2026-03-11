/**
 * Planet Builder — Procedural Seed Generator
 * Enter a seed string → deterministic planet layout
 */

export const TILES = { VOID:0,GRASS:1,FOREST:2,SAND:3,WATER:4,MOUNTAIN:5,PATH:6,TOWN:7,PORTAL:8,LAVA:9 };

const BIOME_TYPES = ['Forest','Ocean','Sky','Earth','Fire','Storm'];

const CREATURE_POOLS = {
  Forest: ['🌿Leafling','🦋Fluttermoss','🦎Verdant Creep','🐸Bogwhisper','🍄Sporewarden'],
  Ocean:  ['🐠Coralkin','🦑Deepcurl','🐋Tidewarden','🦀Crustmancer','🐙Inkdrifter'],
  Sky:    ['🦅Skyrift','🌪️Stormwisp','☁️Cloudmane','🦜Chromawing','🌟Aetherspark'],
  Earth:  ['🪨Stonehide','🐍Dustcoil','🦔Quartzback','🐘Terravance','🌵Pricklorn'],
  Fire:   ['🔥Emberclaw','🌋Magmite','🦊Foxfire','🐉Cinderwing','☀️Solarbrute'],
  Storm:  ['⚡Voltscale','🌩️Thundermane','🫧Staticpuff','🌊Wavecrasher','🌀Cyclonyx'],
};

const LORE_FRAGMENTS = [
  'Long before the first star blinked, this world dreamed itself into being.',
  'The biomes remember what the creatures have forgotten.',
  'A seed is just a world waiting for permission to grow.',
  'The ancients called it the Resonance — the hum between biomes when they first touch.',
  'Every portal leads somewhere. Most lead back.',
  'The creatures here evolved alongside the land. Change the land, change the creatures.',
  'Someone built this world with love. You can feel it in the tile edges.',
];

export function seededRandom(seed) {
  let h = typeof seed === 'string' ? hashString(seed) : seed;
  return function() {
    h |= 0; h = (h + 0x6d2b79f5)|0;
    let t = Math.imul(h^(h>>>15),1|h);
    t=(t+Math.imul(t^(t>>>7),61|t))^t;
    return ((t^(t>>>14))>>>0)/4294967296;
  };
}

function hashString(str) {
  let hash=0;
  for(let i=0;i<str.length;i++) hash=(Math.imul(31,hash)+str.charCodeAt(i))|0;
  return hash;
}

export function generatePlanet(seed) {
  const rng=seededRandom(seed);
  const numBiomes=3+Math.floor(rng()*5);
  const tags=[],biomes=[],allCreatures=[];
  for(let i=0;i<numBiomes;i++) {
    const biomeType=BIOME_TYPES[Math.floor(rng()*BIOME_TYPES.length)];
    const biomeSeed=`${seed}-biome-${i}`;
    const biome=generateBiome(biomeType,biomeSeed,i);
    biomes.push(biome);
    if(!tags.includes(biomeType.toLowerCase())) tags.push(biomeType.toLowerCase());
    const pool=CREATURE_POOLS[biomeType];
    const numCreatures=2+Math.floor(rng()*3);
    const creatureSubset=shuffleSeeded(pool,biomeSeed).slice(0,numCreatures);
    biome.creature_pool=creatureSubset.map(c=>slugify(c));
    creatureSubset.forEach(c=>{
      const id=slugify(c);
      if(!allCreatures.find(x=>x.id===id)) allCreatures.push(buildCreature(c,biomeType,rng));
    });
  }
  const loreFragments=shuffleSeeded(LORE_FRAGMENTS,seed).slice(0,2+Math.floor(rng()*3));
  const palette=generatePalette(rng);
  return {
    id:null,name:generateName(rng),seed,author:null,forked_from:null,lineage:null,
    version:'0.1.0',published:null,tags,biomes,creatures:allCreatures,
    lore:{title:generateName(rng)+' Chronicles',fragments:loreFragments},
    rules:{pvp:false,open_edit:false,encounter_rate_multiplier:1.0},
    meta:{play_count:0,fork_count:0,rating:0.0},_palette:palette,
  };
}

function generateBiome(type,seed,index) {
  const rng=seededRandom(seed);
  const width=20+Math.floor(rng()*13),height=20+Math.floor(rng()*13);
  return {
    id:`biome_${index}_${slugify(type)}`,name:generateBiomeName(type,seed),type,
    tiles:cellularAutomata(width,height,seed,type),width,height,
    ambient:`${type.toLowerCase()}_day`,encounter_rate:0.1+rng()*0.15,creature_pool:[],
  };
}

function cellularAutomata(w,h,seed,type) {
  const rng=seededRandom(seed);
  const pt=BIOME_TILE[type]||TILES.GRASS;
  const grid=Array.from({length:h},()=>Array.from({length:w},()=>rng()>0.35?pt:TILES.VOID));
  for(let p=0;p<3;p++) for(let y=1;y<h-1;y++) for(let x=1;x<w-1;x++) {
    let n=0; for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++) if(dx||dy) if(grid[y+dy]?.[x+dx]===pt) n++;
    grid[y][x]=n>=4?pt:TILES.VOID;
  }
  const midY=Math.floor(h/2);
  for(let x=0;x<w;x++) grid[midY][x]=TILES.PATH;
  return grid;
}

const BIOME_TILE={Forest:TILES.FOREST,Ocean:TILES.WATER,Sky:TILES.GRASS,Earth:TILES.SAND,Fire:TILES.LAVA,Storm:TILES.GRASS};

const P_PFX=['Aether','Lumen','Sylvan','Cryo','Ferro','Aqua','Terra','Ignis','Void','Nova'];
const P_SFX=['Prime','Minor','Arcana','Reach','Deep','Bloom','Core','Veil','Drift','Hold'];
const B_ADJ={Forest:['Whispering','Ancient','Verdant','Tangled','Mossy'],Ocean:['Sunken','Tidal','Deep','Crystalline','Abyssal'],Sky:['Drifting','Luminous','Storm-Born','Celestial','Radiant'],Earth:['Dusty','Cracked','Red','Hollow','Vast'],Fire:['Scorched','Blazing','Ashen','Smoldering','Volcanic'],Storm:['Crackling','Tempest','Howling','Static','Thunder-Laced']};
const B_NOUN={Forest:['Canopy','Underwood','Glade','Thicket','Grove'],Ocean:['Shallows','Trench','Reef','Lagoon','Current'],Sky:['Reach','Drift','Expanse','Updraft','Ceiling'],Earth:['Badlands','Mesa','Basin','Ravine','Plateau'],Fire:['Caldera','Ashfield','Magma Flats','Cinder Vale','Char Plains'],Storm:['Vortex','Squall Zone','Arcfield','Surge','Tempest Hollow']};

function generateName(rng) { return P_PFX[Math.floor(rng()*10)]+' '+P_SFX[Math.floor(rng()*10)]; }
function generateBiomeName(type,seed) { const r=seededRandom(seed+'-name'); return B_ADJ[type][Math.floor(r()*5)]+' '+B_NOUN[type][Math.floor(r()*5)]; }
function buildCreature(label,type,rng) { return {id:slugify(label),name:label.replace(/^[^\w]+/,'').trim(),type,stats:{hp:30+Math.floor(rng()*40),attack:10+Math.floor(rng()*25),defense:8+Math.floor(rng()*20),speed:8+Math.floor(rng()*20)},captureRate:0.3+rng()*0.5,ecoFact:`A creature of the ${type} biome.`}; }
function generatePalette(rng) { const h=Math.floor(rng()*360); return {primary:`hsl(${h},60%,40%)`,secondary:`hsl(${(h+30)%360},50%,60%)`,accent:`hsl(${(h+180)%360},70%,55%)`,background:`hsl(${(h+200)%360},20%,15%)`}; }
function slugify(str) { return str.toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,''); }
function shuffleSeeded(arr,seed) { const r=seededRandom(seed),a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }

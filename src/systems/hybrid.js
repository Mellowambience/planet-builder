/**
 * Planet Builder — Hybrid System
 * Fuse two planets into a new child planet
 */
import { seededRandom } from './procedural.js';

export const FUSION_MODES = { MERGE:'merge', BLEND:'blend', DOMINANT:'dominant' };

export function hybridize(planetA, planetB, fusionMode=FUSION_MODES.MERGE) {
  const seed=`${planetA.seed||planetA.id}-x-${planetB.seed||planetB.id}`;
  let biomes,creatures,lore;
  switch(fusionMode) {
    case FUSION_MODES.MERGE:
      biomes=[...planetA.biomes,...planetB.biomes];
      creatures=mergeCreaturePools(planetA.creatures,planetB.creatures);
      lore=mergeLore(planetA.lore,planetB.lore); break;
    case FUSION_MODES.BLEND:
      biomes=blendBiomes(planetA.biomes,planetB.biomes);
      creatures=blendCreaturePools(planetA.creatures,planetB.creatures,seed);
      lore=mergeLore(planetA.lore,planetB.lore); break;
    case FUSION_MODES.DOMINANT:
      biomes=planetA.biomes;
      creatures=injectCreatures(planetA.creatures,planetB.creatures);
      lore=injectLore(planetA.lore,planetB.lore); break;
    default: throw new Error(`Unknown fusion mode: ${fusionMode}`);
  }
  return {
    id:crypto.randomUUID(),name:generateHybridName(planetA.name,planetB.name),seed,
    author:null,forked_from:null,
    lineage:{parents:[planetA.id,planetB.id],fusion_mode:fusionMode,fusion_date:new Date().toISOString()},
    version:'0.1.0',published:null,
    tags:[...new Set([...(planetA.tags||[]),...(planetB.tags||[])])],
    biomes,creatures,lore,rules:{...planetA.rules,...planetB.rules},
    meta:{play_count:0,fork_count:0,rating:0.0},
  };
}

function mergeCreaturePools(a,b){const s=new Set();return[...a,...b].filter(c=>{if(s.has(c.id))return false;s.add(c.id);return true;});}
function blendCreaturePools(a,b,seed){return mergeCreaturePools(a,b).map((c,i)=>{const r=seededRandom(`${seed}-c-${i}`);return{...c,stats:c.stats?Object.fromEntries(Object.entries(c.stats).map(([k,v])=>[k,Math.round(v*0.8+r()*v*0.4)])):c.stats};});}
function injectCreatures(p,s){const ids=new Set(p.map(c=>c.id));return[...p,...s.filter(c=>!ids.has(c.id)).slice(0,3)];}
function blendBiomes(a,b){const r=[],m=Math.max(a.length,b.length);for(let i=0;i<m;i++){if(a[i])r.push(a[i]);if(b[i])r.push({...b[i],id:`${b[i].id}_hybrid`});}return r;}
function mergeLore(a,b){return{...(a||{}),...(b||{}),fragments:[...((a&&a.fragments)||[]),...((b&&b.fragments)||[])]};}
function injectLore(p,s){return{...(p||{}),injected_from:s?.title||'unknown',fragments:[...((p&&p.fragments)||[]),...((s&&s.fragments)||[]).slice(0,2)]};}
export function generateHybridName(a,b){a=a.trim();b=b.trim();return a.slice(0,Math.ceil(a.length/2))+b.slice(Math.floor(b.length/2));}

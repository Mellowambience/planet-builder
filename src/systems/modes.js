/**
 * Planet Builder — Mode System
 * Role-based permission gates for Observer / Player / Designer / Developer
 */

export const MODES = {
  OBSERVER: 'observer',
  PLAYER: 'player',
  DESIGNER: 'designer',
  DEVELOPER: 'developer',
};

const PERMISSIONS = {
  observer: ['view_planet','browse_hub','rate_planet','watch_session'],
  player: ['view_planet','browse_hub','rate_planet','watch_session','play_overworld','battle','catch_creature','complete_quest'],
  designer: ['view_planet','browse_hub','rate_planet','watch_session','play_overworld','battle','catch_creature','complete_quest','edit_planet','place_tile','set_biome','set_creature_pool','set_lore','publish_planet','fork_planet','remix_planet','hybridize'],
  developer: ['view_planet','browse_hub','rate_planet','watch_session','play_overworld','battle','catch_creature','complete_quest','edit_planet','place_tile','set_biome','set_creature_pool','set_lore','publish_planet','fork_planet','remix_planet','hybridize','export_pico8','access_raw_json','script_events','api_access','register_agent','admin_hub'],
};

export const AGENTS = {
  surething: 'developer',
  discord_observer: 'observer',
  make_automation: 'player',
};

let _currentMode = MODES.OBSERVER;
let _agentMode = null;

export function setMode(mode) {
  if (!PERMISSIONS[mode]) throw new Error(`Unknown mode: ${mode}`);
  _currentMode = mode;
}

export function setAgentMode(agentId) {
  if (!AGENTS[agentId]) throw new Error(`Unknown agent: ${agentId}`);
  _agentMode = AGENTS[agentId];
}

export function getMode() { return _agentMode || _currentMode; }

export function can(action) {
  return PERMISSIONS[getMode()]?.includes(action) ?? false;
}

export function gate(action) {
  if (!can(action)) throw new Error(`Permission denied: '${action}'. Current mode: ${getMode()}`);
}

export function guardFn(action, fn) {
  return (...args) => { gate(action); return fn(...args); };
}

export function getMinModeFor(action) {
  for (const mode of ['observer','player','designer','developer']) {
    if (PERMISSIONS[mode].includes(action)) return mode;
  }
  return 'developer';
}

export function getPermissions(mode) { return PERMISSIONS[mode] ?? []; }

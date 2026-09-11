export function getPrestigeRequirement(state) {
  return Math.floor(100000 * Math.pow(3, state.prestige));
}

export function getPrestigeMultiplier(state) {
  return 1 + state.prestige * 0.25;
}

export function canPrestige(state) {
  return state.coins >= getPrestigeRequirement(state);
}

export function prestige(state) {
  if (!canPrestige(state)) return false;

  state.prestige += 1;
  state.prestigeShards += Math.max(1, Math.floor(Math.sqrt(state.prestige * 4)));
  state.stats.totalPrestiges += 1;

  state.coins = 0;
  state.clickPower = 1;
  state.autoClickPower = 0;
  state.combo = 0;
  state.level = 1;
  state.xp = 0;
  state.upgrades = { clickPower: 0, autoClicker: 0, critical: 0, comboBoost: 0 };
  state.missionProgress = { clicks: 0, coins: 0 };
  state.event = null;

  return true;
}

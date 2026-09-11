export const initialState = {
  coins: 0,
  totalClicks: 0,
  clickPower: 1,
  autoClickPower: 0,
  combo: 0,
  bestCombo: 0,
  criticalClicks: 0,
  level: 1,
  xp: 0,
  prestige: 0,
  prestigeShards: 0,
  lifetimeCoins: 0,
  lastSavedAt: Date.now(),
  sound: true,
  upgrades: { clickPower: 0, autoClicker: 0, critical: 0, comboBoost: 0 },
  achievements: {},
  missionProgress: { clicks: 0, coins: 0 },
  event: null,
  pets: {
    equipped: null,
    owned: {},
  },
  stats: {
    sessions: 1,
    playTime: 0,
    biggestClick: 0,
    biggestCombo: 0,
    totalPrestiges: 0,
    totalPetBonus: 0,
  }
};

export const state = structuredClone(initialState);

export function resetState() {
  Object.assign(state, structuredClone(initialState), { lastSavedAt: Date.now() });
}

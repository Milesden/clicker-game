import { state } from "./state.js";
import { getEventMultiplier, getEventBonus } from "./events.js";
import { checkAchievements } from "./achievements.js";
import { checkMissions } from "./missions.js";
import { saveGame } from "./storage.js";
import { getPetMultiplier } from "./pets.js";
import { getPrestigeMultiplier } from "./prestige.js";

export function getCurrentClickMultiplier() {
  const comboBoost = 0.01 + state.upgrades.comboBoost * 0.02;
  const comboMultiplier = 1 + Math.min(state.combo, 50) * comboBoost;
  return comboMultiplier * getEventMultiplier(state) * getPetMultiplier(state) * getPrestigeMultiplier(state);
}

export function clickCore(event, render) {
  state.combo += 1;
  state.bestCombo = Math.max(state.bestCombo, state.combo);
  state.stats.biggestCombo = Math.max(state.stats.biggestCombo, state.combo);

  const criticalChance = 0.05 + state.upgrades.critical * 0.02;
  const critical = Math.random() < criticalChance;
  const base = state.clickPower * getCurrentClickMultiplier();
  const value = base * (critical ? 5 : 1);
  const lucky = getEventBonus(state);

  const total = Math.floor(value + lucky);
  state.coins += total;
  state.lifetimeCoins += total;
  state.totalClicks += 1;
  state.missionProgress.clicks += 1;
  state.missionProgress.coins += total;
  state.xp += Math.max(1, Math.floor(total / 5));
  state.criticalClicks += critical ? 1 : 0;
  state.stats.biggestClick = Math.max(state.stats.biggestClick, total);

  while (state.xp >= state.level * 100) {
    state.xp -= state.level * 100;
    state.level += 1;
  }

  clearTimeout(state._comboTimer);
  state._comboTimer = setTimeout(() => {
    state.combo = 0;
    render();
  }, 1400);

  if (event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;
    window.dispatchEvent(new CustomEvent("floating-number", {
      detail: { value: total, x, y, critical, lucky: lucky > 0 }
    }));
  }

  checkAchievements(state, render);
  checkMissions(state, render);
  saveGame(state);
  render();
}

export function buyUpgrade(upgrade, render) {
  const costs = { clickPower: 25, autoClicker: 100, critical: 250, comboBoost: 500 };
  const cost = Math.floor(costs[upgrade] * Math.pow(1.55, state.upgrades[upgrade]));
  if (state.coins < cost) return false;
  state.coins -= cost;
  state.upgrades[upgrade] += 1;

  state.clickPower = 1 + state.upgrades.clickPower;
  state.autoClickPower = state.upgrades.autoClicker;
  saveGame(state);
  render();
  return true;
}

export function passiveTick(render) {
  if (!state.autoClickPower) return;
  const amount = Math.floor(state.autoClickPower * getPetMultiplier(state) * getPrestigeMultiplier(state));
  state.coins += amount;
  state.lifetimeCoins += amount;
  state.missionProgress.coins += amount;
  checkMissions(state, render);
  render();
}

export const UPGRADES = [
  { id: "clickPower", name: "Core Power", icon: "⚡", desc: "+1 монета за клик", baseCost: 25 },
  { id: "autoClicker", name: "Auto Clicker", icon: "◉", desc: "+1 монета в секунду", baseCost: 100 },
  { id: "critical", name: "Critical Core", icon: "✹", desc: "+2% шанс крита", baseCost: 250 },
  { id: "comboBoost", name: "Combo Engine", icon: "∞", desc: "+2% к силе комбо", baseCost: 500 }
];

export function applyUpgrades(state) {
  state.clickPower = 1 + state.upgrades.clickPower;
  state.autoClickPower = state.upgrades.autoClicker;
}

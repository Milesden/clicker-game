export const MISSIONS = [
  { id:"click100", name:"Warm Up", type:"clicks", target:100, reward:250 },
  { id:"coins2500", name:"First Stack", type:"coins", target:2500, reward:500 },
  { id:"click1000", name:"Machine Mode", type:"clicks", target:1000, reward:2500 },
];

export function checkMissions(state, render) {
  for (const m of MISSIONS) {
    const key = `${m.id}Claimed`;
    if (!state.achievements[key] && (state.missionProgress[m.type] || 0) >= m.target) {
      state.achievements[key] = true;
      state.coins += m.reward;
      state.lifetimeCoins += m.reward;
      if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("mission-complete",{detail:m}));
      render?.();
    }
  }
}

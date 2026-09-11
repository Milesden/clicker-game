export const ACHIEVEMENTS = [
  { id:"first", name:"First Contact", desc:"Сделать 1 клик", test:s=>s.totalClicks>=1 },
  { id:"starter", name:"Getting Started", desc:"Сделать 100 кликов", test:s=>s.totalClicks>=100 },
  { id:"machine", name:"Click Machine", desc:"Сделать 1 000 кликов", test:s=>s.totalClicks>=1000 },
  { id:"fire", name:"On Fire", desc:"Достичь комбо ×25", test:s=>s.bestCombo>=25 },
  { id:"loaded", name:"Loaded", desc:"Заработать 10 000 монет", test:s=>s.lifetimeCoins>=10000 },
  { id:"prestige", name:"Ascended", desc:"Сделать первый престиж", test:s=>s.prestige>=1 },
  { id:"collector", name:"Pet Collector", desc:"Собрать 4 питомцев", test:s=>Object.keys(s.pets.owned).length>=4 },
];

export function checkAchievements(state, notify) {
  for (const a of ACHIEVEMENTS) {
    if (!state.achievements[a.id] && a.test(state)) {
      state.achievements[a.id] = true;
      notify?.();
      if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("achievement-unlocked",{detail:a}));
    }
  }
}

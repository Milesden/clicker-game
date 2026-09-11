export const PETS = [
  { id: "spark", name: "Spark", icon: "✦", rarity: "Common", cost: 2500, bonus: 0.10, desc: "+10% ко всем монетам" },
  { id: "fox", name: "Neon Fox", icon: "🦊", rarity: "Rare", cost: 12000, bonus: 0.25, desc: "+25% ко всем монетам" },
  { id: "dragon", name: "Void Dragon", icon: "🐉", rarity: "Epic", cost: 50000, bonus: 0.60, desc: "+60% ко всем монетам" },
  { id: "cosmo", name: "Cosmo", icon: "🌌", rarity: "Legendary", cost: 150000, bonus: 1.00, desc: "+100% ко всем монетам" },
];

export function getPet(state, id) {
  return PETS.find(p => p.id === id);
}

export function getPetMultiplier(state) {
  const pet = getPet(state, state.pets.equipped);
  return pet ? 1 + pet.bonus : 1;
}

export function buyPet(state, id) {
  const pet = getPet(state, id);
  if (!pet || state.pets.owned[id]) return false;
  if (state.coins < pet.cost) return false;
  state.coins -= pet.cost;
  state.pets.owned[id] = true;
  state.pets.equipped = id;
  state.stats.totalPetBonus += pet.bonus;
  return true;
}

export function equipPet(state, id) {
  if (!state.pets.owned[id]) return false;
  state.pets.equipped = id;
  return true;
}

const SAVE_KEY = "clicker-game-save-v3";

export function loadGame(state) {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { loaded:false, offlineCoins:0 };
    const saved = JSON.parse(raw);
    Object.assign(state, saved);
    state.lastSavedAt ??= Date.now();
    state.stats ??= {};
    state.pets ??= { equipped:null, owned:{} };
    state.pets.owned ??= {};
    const elapsed = Math.min(86400, Math.max(0, (Date.now()-state.lastSavedAt)/1000));
    const offlineCoins = Math.floor((state.autoClickPower || 0) * elapsed * 0.75);
    state.coins += offlineCoins;
    state.lifetimeCoins += offlineCoins;
    state.lastSavedAt = Date.now();
    return { loaded:true, offlineCoins };
  } catch {
    return { loaded:false, offlineCoins:0 };
  }
}

export function saveGame(state) {
  state.lastSavedAt = Date.now();
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch {}
}

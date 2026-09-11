import { state } from "./state.js";
import { loadGame, saveGame } from "./storage.js";
import { applyUpgrades } from "./upgrades.js";
import { clickCore, buyUpgrade, passiveTick } from "./game.js";
import { render, showToast, showFloatingNumber, openStatsModal, closeStatsModal } from "./ui.js";
import { startRandomEvent } from "./events.js";
import { buyPet, equipPet } from "./pets.js";
import { prestige } from "./prestige.js";

const loaded = loadGame(state);
applyUpgrades(state);
state.stats.sessions += loaded.loaded ? 1 : 0;
render();

if (loaded.offlineCoins > 0) {
  showToast(`Оффлайн-доход: +${Math.floor(loaded.offlineCoins).toLocaleString("ru-RU")} 🪙`, "success");
}

document.addEventListener("click", (e) => {
  const upgrade = e.target.closest("[data-upgrade]");
  if (upgrade) {
    const ok = buyUpgrade(upgrade.dataset.upgrade, render);
    if (!ok) showToast("Не хватает монет", "error");
    else showToast("Улучшение куплено", "success");
    return;
  }

  const petBtn = e.target.closest("[data-pet]");
  if (petBtn) {
    const id = petBtn.dataset.pet;
    if (state.pets.owned[id]) {
      equipPet(state, id);
      showToast("Питомец экипирован 🐾", "success");
    } else {
      const ok = buyPet(state, id);
      showToast(ok ? "Новый питомец! 🐾" : "Не хватает монет", ok ? "success" : "error");
    }
    saveGame(state);
    render();
  }
});

document.getElementById("clickCore").addEventListener("click", (e) => clickCore(e, render));

document.getElementById("prestigeButton").addEventListener("click", () => {
  const ok = prestige(state);
  if (ok) {
    saveGame(state);
    showToast("PRESTIGE! Прогресс сброшен, бонус увеличен ✨", "success");
    render();
  }
});

document.getElementById("statsButton").addEventListener("click", openStatsModal);
document.getElementById("closeStats").addEventListener("click", closeStatsModal);
document.getElementById("statsModal").addEventListener("click", (e) => {
  if (e.target.id === "statsModal") closeStatsModal();
});

document.getElementById("soundToggle").addEventListener("click", () => {
  state.sound = !state.sound;
  document.getElementById("soundToggle").textContent = state.sound ? "🔊" : "🔇";
  saveGame(state);
});

window.addEventListener("floating-number", e => {
  const d = e.detail;
  showFloatingNumber(d.value, d.x, d.y, d.critical, d.lucky);
});

setInterval(() => passiveTick(render), 1000);

setInterval(() => {
  startRandomEvent(state, showToast, render);
  render();
}, 1000);

setInterval(() => {
  state.stats.playTime += 10;
  saveGame(state);
}, 10000);

window.addEventListener("beforeunload", () => saveGame(state));

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) {
    e.preventDefault();
    document.getElementById("clickCore").click();
  }
  if (e.code === "Escape") closeStatsModal();
});

showToast("Готово. Нажимай и прокачивайся 🚀", "info");

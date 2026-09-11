import { state } from "./state.js";
import { UPGRADES } from "./upgrades.js";
import { ACHIEVEMENTS } from "./achievements.js";
import { MISSIONS } from "./missions.js";
import { PETS } from "./pets.js";
import { getPrestigeRequirement, getPrestigeMultiplier } from "./prestige.js";
import { getStatsSnapshot, formatDuration } from "./stats.js";

const $ = (id) => document.getElementById(id);
const money = (n) => Math.floor(n).toLocaleString("ru-RU");

export function render() {
  $("coins").textContent = money(state.coins);
  $("clickPower").textContent = money(state.clickPower * getPrestigeMultiplier(state));
  $("autoPower").textContent = money(state.autoClickPower * getPrestigeMultiplier(state));
  $("prestigeValue").textContent = state.prestige;
  $("level").textContent = state.level;
  $("xp").textContent = `${state.xp} / ${state.level * 100}`;
  $("combo").textContent = `×${(1 + Math.min(state.combo,50) * (0.01 + state.upgrades.comboBoost * 0.02)).toFixed(2)}`;
  $("bestCombo").textContent = state.bestCombo;
  $("totalClicks").textContent = state.totalClicks;
  $("criticalClicks").textContent = state.criticalClicks;

  const xpPercent = Math.min(100, (state.xp / (state.level * 100)) * 100);
  $("xpFill").style.width = `${xpPercent}%`;

  renderUpgrades();
  renderAchievements();
  renderMissions();
  renderPets();
  renderPrestige();
  renderEvent();
  $("playTime").textContent = formatDuration(state.stats.playTime);
}

function renderUpgrades() {
  const root = $("upgrades");
  root.innerHTML = UPGRADES.map(u => {
    const level = state.upgrades[u.id];
    const cost = Math.floor(u.baseCost * Math.pow(1.55, level));
    return `<button class="upgrade" data-upgrade="${u.id}">
      <span class="upgrade-icon">${u.icon}</span>
      <span class="upgrade-main"><strong>${u.name}</strong><small>${u.desc}</small></span>
      <span class="upgrade-side"><b>Lv.${level}</b><small>🪙 ${money(cost)}</small></span>
    </button>`;
  }).join("");
}

function renderAchievements() {
  $("achievements").innerHTML = ACHIEVEMENTS.map(a => {
    const done = !!state.achievements[a.id];
    return `<div class="achievement ${done ? "done" : ""}">
      <span>${done ? "✓" : "○"}</span><div><strong>${a.name}</strong><small>${a.desc}</small></div>
    </div>`;
  }).join("");
}

function renderMissions() {
  $("missions").innerHTML = MISSIONS.map(m => {
    const progress = state.missionProgress[m.type] || 0;
    const pct = Math.min(100, (progress / m.target) * 100);
    const claimed = !!state.achievements[m.id + "Claimed"];
    return `<div class="mission ${claimed ? "done" : ""}">
      <div class="mission-head"><strong>${m.name}</strong><span>+${money(m.reward)} 🪙</span></div>
      <small>${money(Math.min(progress,m.target))} / ${money(m.target)}</small>
      <div class="bar"><i style="width:${pct}%"></i></div>
      ${claimed ? '<em>Награда получена</em>' : ""}
    </div>`;
  }).join("");
}

function renderPets() {
  $("pets").innerHTML = PETS.map(p => {
    const owned = !!state.pets.owned[p.id];
    const equipped = state.pets.equipped === p.id;
    return `<div class="pet ${equipped ? "equipped" : ""}">
      <div class="pet-icon">${p.icon}</div>
      <div class="pet-info"><strong>${p.name}</strong><small>${p.rarity} · ${p.desc}</small></div>
      <button class="pet-action" data-pet="${p.id}">${equipped ? "Надет" : owned ? "Надеть" : `🪙 ${money(p.cost)}`}</button>
    </div>`;
  }).join("");
}

function renderPrestige() {
  const req = getPrestigeRequirement(state);
  $("prestigeReq").textContent = money(req);
  $("prestigeMultiplier").textContent = `×${getPrestigeMultiplier(state).toFixed(2)}`;
  $("prestigeButton").disabled = state.coins < req;
  $("shards").textContent = state.prestigeShards;
}

function renderEvent() {
  const root = $("event");
  if (!state.event) {
    root.className = "event idle";
    root.innerHTML = `<span>⚡</span><div><strong>Событий нет</strong><small>Следующее может появиться в любой момент</small></div>`;
    return;
  }
  const left = Math.max(0, Math.ceil((state.event.endsAt - Date.now()) / 1000));
  root.className = `event ${state.event.type.toLowerCase()}`;
  root.innerHTML = `<span>${state.event.type === "OVERCHARGE" ? "⚡" : "🍀"}</span>
    <div><strong>${state.event.label}</strong><small>${left} сек · ${state.event.desc}</small></div>`;
}

export function showToast(text, type="info") {
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = text;
  $("toasts").appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

export function showFloatingNumber(value, x, y, critical=false, lucky=false) {
  const el = document.createElement("div");
  el.className = `float-number ${critical ? "critical" : ""} ${lucky ? "lucky" : ""}`;
  el.textContent = `+${money(value)}`;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

export function openStatsModal() {
  const modal = $("statsModal");
  const data = getStatsSnapshot(state);
  $("statsGrid").innerHTML = Object.entries(data).map(([k,v]) =>
    `<div class="stat-box"><small>${k}</small><strong>${v}</strong></div>`
  ).join("");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
}

export function closeStatsModal() {
  $("statsModal").classList.remove("open");
  $("statsModal").setAttribute("aria-hidden","true");
}

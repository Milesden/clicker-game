export function formatDuration(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h) return `${h}ч ${m}м`;
  if (m) return `${m}м ${sec}с`;
  return `${sec}с`;
}

export function getStatsSnapshot(state) {
  return {
    "Всего монет": Math.floor(state.lifetimeCoins).toLocaleString("ru-RU"),
    "Кликов": state.totalClicks.toLocaleString("ru-RU"),
    "Лучший комбо": state.bestCombo,
    "Критов": state.criticalClicks.toLocaleString("ru-RU"),
    "Макс. клик": Math.floor(state.stats.biggestClick).toLocaleString("ru-RU"),
    "Престижей": state.prestige,
    "Осколков": state.prestigeShards,
    "Время игры": formatDuration(state.stats.playTime),
    "Куплено питомцев": Object.keys(state.pets.owned).length,
  };
}

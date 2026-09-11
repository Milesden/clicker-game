const EVENTS = [
  { type:"OVERCHARGE", label:"OVERCHARGE", desc:"клик ×5", duration:10, multiplier:5 },
  { type:"LUCKY", label:"LUCKY DROP", desc:"шанс на огромный бонус", duration:12, multiplier:1 },
];

export function startRandomEvent(state, notify, render) {
  if (state.event) {
    if (Date.now() >= state.event.endsAt) {
      state.event = null;
      render?.();
    }
    return;
  }
  if (Math.random() > 0.12) return;
  const event = EVENTS[Math.floor(Math.random()*EVENTS.length)];
  state.event = { ...event, endsAt: Date.now() + event.duration*1000 };
  notify?.(`${event.label} активирован!`);
  render?.();
}

export function getEventMultiplier(state) {
  if (!state.event) return 1;
  if (Date.now() >= state.event.endsAt) { state.event = null; return 1; }
  return state.event.multiplier || 1;
}

export function getEventBonus(state) {
  if (!state.event || state.event.type !== "LUCKY") return 0;
  return Math.random() < 0.08 ? Math.floor(250 + Math.random()*751) : 0;
}

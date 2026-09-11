# ✦ CLICKER — Neon Idle Game

<p align="center"><strong>A polished browser clicker / idle game built with vanilla HTML, CSS and JavaScript.</strong></p>
<p align="center"><a href="https://milesden.github.io/clicker-game/"><strong>🎮 PLAY DEMO</strong></a></p>
<p align="center">
<img src="https://img.shields.io/github/stars/Milesden/clicker-game?style=for-the-badge" alt="Stars">
<img src="https://img.shields.io/github/forks/Milesden/clicker-game?style=for-the-badge" alt="Forks">
<img src="https://img.shields.io/github/license/Milesden/clicker-game?style=for-the-badge" alt="License">
<img src="https://img.shields.io/github/languages/top/Milesden/clicker-game?style=for-the-badge" alt="Top language">
<img src="https://img.shields.io/github/last-commit/Milesden/clicker-game?style=for-the-badge" alt="Last commit">
</p>

## About

CLICKER is a modular idle/clicker game designed as a portfolio project. It focuses on clean separation of gameplay systems, progression, UI and persistence without frameworks.

## Features

- Manual clicking + SPACE key
- Combo system and critical clicks
- Passive income / auto clicker
- Upgrades and level progression
- Achievements and missions
- Random events with temporary bonuses
- Pets with rarity and passive multipliers
- Prestige system with permanent progression
- Statistics dashboard
- Offline earnings
- LocalStorage save system
- Responsive neon/glass UI

## Preview

Add your best working gameplay screenshot to `assets/screenshots/gameplay.png` and it will appear here:

```md
![Gameplay](assets/screenshots/gameplay.png)
```

## Architecture

![Architecture](assets/architecture.svg)

## Project structure

```text
clicker-game/
├── .github/workflows/pages.yml
├── assets/architecture.svg
├── assets/screenshots/gameplay.png
├── css/
├── js/
├── .gitignore
├── .nojekyll
├── LICENSE
├── README.md
├── START.bat
└── index.html
```

## Technical highlights

- ES modules for modular JavaScript
- Centralized game state
- Event-driven UI updates
- Deterministic upgrade/progression formulas
- LocalStorage persistence with offline-income calculation
- No external runtime dependencies

## Run locally

### Windows

Double-click `START.bat`.

### Manual

From the project folder:

```bash
py -m http.server 8000
```

Then open `http://localhost:8000`.

> Do not open `index.html` directly with `file://`: ES modules require a local web server in this project.

## GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/pages.yml` that deploys the project to GitHub Pages after pushes to `main`.

Expected demo URL:

`https://milesden.github.io/clicker-game/`

The URL becomes live after the repository is pushed and GitHub Pages is configured to use the Actions workflow.

## Roadmap

- [ ] Sound effects and music
- [ ] More pets and upgrade branches
- [ ] Cloud save
- [ ] Leaderboards
- [ ] Seasonal events
- [ ] Better gameplay screenshots / GIF

## Portfolio

Built as a showcase project demonstrating frontend fundamentals, modular JavaScript architecture, UI engineering and browser persistence.

## License

MIT — see [LICENSE](LICENSE).

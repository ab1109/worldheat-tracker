# World Heat Tracker

**[Live app → ab1109.github.io/worldheat-tracker](https://ab1109.github.io/worldheat-tracker/)**

A live weather dashboard for comparing current heat, humidity, and the seven-day outlook across major world capitals — plus a leaderboard ranking every tracked city by temperature right now.

It began as a COVID-19 case tracker. That data source stopped being maintained, so the project was redirected toward a more durable question: **how does the heat compare around the world right now?**

## Features

- **Live conditions** — current temperature, feels-like temperature, and relative humidity for any tracked location, with animated count-up numbers.
- **Seven-day outlook** — daily high and low temperatures in a smooth, interactive line chart.
- **Hottest-cities leaderboard** — every capital ranked live by current temperature in a single batched request, with a heat-intensity bar per row. Tap a city to jump straight to its dashboard.
- **22 curated locations** across every populated continent, plus a fixed tropical "Global reference" point as a transparent baseline.
- **No API key required** — all weather data comes from the free [Open-Meteo](https://open-meteo.com/) API.
- **Dark, glass-panel UI** built as a small first-party design system (CSS custom properties, no UI framework), tuned to stay legible under browser dark-mode heuristics.
- **Graceful failure** — network errors surface as an in-app message instead of a broken screen.

## Tech Stack

| Layer | Choice |
|---|---|
| UI | React 19 |
| Build tool | Vite 8 |
| Charting | Chart.js 4 + react-chartjs-2 5 |
| HTTP | Axios |
| Styling | CSS Modules + a shared token sheet (`src/index.css`) |
| Data source | [Open-Meteo Forecast API](https://open-meteo.com/) — current conditions, 7-day forecast, and batched multi-location queries |
| Hosting | GitHub Pages, served from this branch's root |

The project deliberately carries **zero UI framework dependency** (no Material UI, Bootstrap, etc.) and audits clean — `npm audit` reports **0 known vulnerabilities** across ~50 packages. It previously ran on Create React App (deprecated by the React team) with Material UI 4 (end-of-life); both were removed as part of the heat-tracker rewrite in favor of Vite and a small hand-built design system.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- An internet connection (the app talks to Open-Meteo at runtime; no key or `.env` needed)

### Install

```bash
git clone https://github.com/ab1109/worldheat-tracker.git
cd worldheat-tracker
npm install
```

### Run locally

```bash
npm run dev
```

This starts Vite's dev server and opens the app automatically at `http://localhost:5173/worldheat-tracker/app.html`, with instant hot module reload.

> **Why `app.html` and not `index.html`?** This repository publishes its own built site: the root `index.html` and `assets/` folder you'll see in the file tree are **generated output**, checked in so GitHub Pages can serve this branch directly with no CI build step. `app.html` is the real, hand-edited source template for local development. Never hand-edit root `index.html` — it gets overwritten by every deploy. See [Deployment](#deployment) below.

### Build for production

```bash
npm run build
```

Outputs an optimized, hashed bundle to `dist/` (gitignored).

### Preview a production build locally

```bash
npm run preview
```

### Deploy

```bash
npm run deploy
```

Builds the app and then copies `dist/` over the repository root (`index.html`, `assets/`, `manifest.json`, favicons) via `scripts/publish-dist.js`. Review the resulting `git diff`, then commit and push to `gh-pages` to update the live site.

## Project Structure

```text
.
├── app.html                    Vite dev entry — the real HTML source
├── index.html                  Generated production entry (do not hand-edit)
├── assets/                     Generated hashed JS/CSS bundle (do not hand-edit)
├── favicon.ico, logo192.png,   Published PWA icons + manifest, mirrored
│   logo512.png, manifest.json, from public/ on every deploy
│   robots.txt
├── public/                     Source static assets, copied as-is into the build
├── scripts/
│   └── publish-dist.js         Copies dist/ over the repo root after a build
├── src/
│   ├── main.jsx                 React entry point
│   ├── index.css                Design tokens (color, type, radius) + global reset
│   ├── App.jsx                  Top-level state: selected location, active view, errors
│   ├── App.module.css
│   ├── api/
│   │   └── index.js             Open-Meteo adapter — fetchData, fetchCountries, fetchLeaderboard
│   └── components/
│       ├── Cards/                Current-conditions metric cards
│       ├── Chart/                 7-day high/low forecast chart
│       ├── CountryPicker/         Location selector
│       └── Leaderboard/           Live hottest-cities ranking
├── vite.config.js
└── package.json
```

The API adapter normalizes Open-Meteo's response into a small view model (`location`, `current`, `daily`, `timezone`) so components never know the provider's URL or query parameters.

## How the Leaderboard Works

Open-Meteo accepts comma-separated coordinate lists and returns one forecast object per location, in order. `fetchLeaderboard()` in `src/api/index.js` sends every tracked capital's latitude/longitude as a **single batched request**, then sorts the results client-side — so ranking 22 cities costs one HTTP round trip, not 22.

## Data Source

Weather data is provided by [Open-Meteo](https://open-meteo.com/), which requires no API key or account. The app requests:

- Current temperature, apparent temperature, relative humidity, wind speed, and weather code
- Seven days of daily maximum/minimum temperature and precipitation
- Timezone-aware timestamps, resolved server-side per coordinate

All values are displayed in Celsius.

## Roadmap

- Add geolocation-based "near me" weather.
- Add a searchable location catalog backed by Open-Meteo's geocoding API.
- Add unit switching between Celsius and Fahrenheit.
- Add historical temperature anomalies and heat alerts.
- Add automated API-adapter and component tests (none exist yet).
- Replace the default PWA icons (`logo192.png`, `logo512.png`, `favicon.ico`) with tracker-branded artwork.

## License

MIT — see [LICENSE](LICENSE).

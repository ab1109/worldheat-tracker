# World Heat Tracker

World Heat Tracker is a focused weather dashboard for comparing live temperature, thermal comfort, humidity, wind, and the seven-day outlook across major world capitals.

It began as a COVID-19 tracker. The original data source is no longer maintained, so the product has been redirected toward a more durable and useful question: **how does the heat compare around the world right now?**

## Product Snapshot

- **Live conditions:** current temperature, feels-like temperature, and relative humidity.
- **Seven-day context:** daily high and low temperature trends in a responsive line chart.
- **Global comparison:** curated capital-city locations across multiple continents.
- **Low-friction access:** weather data comes from Open-Meteo and requires no API key.
- **Responsive UI:** designed for quick scanning on desktop and mobile.
- **Graceful failure:** API errors are surfaced as a user-facing state instead of breaking the dashboard.

## Demo Flow

1. Open the dashboard.
2. Choose a location from the country and capital selector.
3. Compare current conditions with the seven-day high and low forecast.

The `Global reference` option uses a fixed coordinate in the tropics as a consistent baseline. It is not a mathematical global average, which keeps the product transparent about what the API actually provides.

## Tech Stack

- React 17 with Create React App
- Material UI for layout primitives
- Chart.js with `react-chartjs-2` for forecast visualization
- Axios for HTTP requests
- CSS Modules for component-scoped styling
- Open-Meteo Forecast API for current and daily weather data

## Getting Started

### Prerequisites

- Node.js 14 or newer
- npm 6 or newer
- An internet connection for Open-Meteo requests

### Install and run locally

```bash
git clone <your-repository-url>
cd worldheat-tracker
npm install
npm start
```

The development server opens at `http://localhost:3000`.

No API key or environment variables are required.

### Create a production build

```bash
npm run build
```

The optimized output is written to `build/` and can be hosted by any static web server.

For a quick local preview of the production output:

```bash
npx serve -s build
```

### Run tests

```bash
npm test
```

The project currently has no dedicated test suite, so this command starts Create React App's test runner in watch mode. The next testing priority is an API adapter test with mocked Open-Meteo responses, followed by a selector-to-dashboard interaction test.

## Architecture

The app keeps data access separate from presentation:

```text
src/
├── api/
│   └── index.js                    Open-Meteo adapter and location catalog
├── components/
│   ├── Cards/                      Current weather metrics
│   ├── Chart/                      Seven-day high/low visualization
│   └── CountryPicker/              Location selection
├── App.js                          Loading, selection, and error state
└── App.module.css                  Page-level visual system
```

The API adapter normalizes the remote response into a small view model containing `location`, `current`, `daily`, and `timezone`. Components consume that model without knowing the provider's URL or query parameters.

Relevant entry points:

- [API adapter](src/api/index.js)
- [Application state](src/App.js)
- [Metric cards](src/components/Cards/Cards.jsx)
- [Forecast chart](src/components/Chart/Chart.jsx)
- [Location selector](src/components/CountryPicker/CountryPicker.jsx)

## Data Source

Weather data is provided by [Open-Meteo](https://open-meteo.com/). The app requests:

- Current temperature
- Apparent temperature
- Relative humidity
- Wind speed
- Weather code
- Seven days of daily maximum and minimum temperature
- Daily precipitation totals

Open-Meteo handles timezone conversion for each selected coordinate. Weather values are displayed in Celsius.

## Engineering Notes

- Location coordinates are intentionally kept in the client because the app compares a curated set of known capital cities rather than searching arbitrary addresses.
- The selector uses stable location codes, avoiding brittle country-name URL paths.
- The API request is isolated in one module, making it straightforward to replace Open-Meteo or add caching later.
- The interface uses a restrained palette and compact information hierarchy so the dashboard remains useful as a repeated-use tool, not just a one-time demo.

## Roadmap

- Add geolocation-based "near me" weather.
- Add a searchable location catalog backed by Open-Meteo geocoding.
- Add unit switching between Celsius and Fahrenheit.
- Add historical temperature anomalies and heat alerts.
- Add automated API and component tests.

## License

No license has been declared yet. Add a license before distributing the project publicly.

import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const server = await createServer({
    root: process.cwd(),
    server: { middlewareMode: true },
    appType: 'custom',
});

try {
    const { default: Cards } = await server.ssrLoadModule('/src/components/Cards/Cards.jsx');
    const fakeData = {
        current: { temperature_2m: 25.6, apparent_temperature: 25.4, relative_humidity_2m: 47 },
        location: { name: 'Brasilia', country: 'Brazil' },
    };
    const html = renderToStaticMarkup(React.createElement(Cards, { data: fakeData }));
    console.log('Cards SSR OK, length:', html.length);
    console.log(html.slice(0, 300));

    const { default: Leaderboard } = await server.ssrLoadModule('/src/components/Leaderboard/Leaderboard.jsx');
    // Leaderboard fetches on mount via useEffect, which doesn't run during
    // renderToStaticMarkup — this just checks the module and initial render
    // (loading state) don't throw.
    const lbHtml = renderToStaticMarkup(React.createElement(Leaderboard, { onSelect: () => {} }));
    console.log('Leaderboard SSR OK (loading state), length:', lbHtml.length);

    const { default: CountryPicker } = await server.ssrLoadModule('/src/components/CountryPicker/CountryPicker.jsx');
    const cpHtml = renderToStaticMarkup(React.createElement(CountryPicker, { handleCountryChange: () => {} }));
    console.log('CountryPicker SSR OK, length:', cpHtml.length);

    const { default: Chart } = await server.ssrLoadModule('/src/components/Chart/Chart.jsx');
    const fakeDaily = {
        daily: {
            time: ['2026-09-20', '2026-09-21', '2026-09-22', '2026-09-23', '2026-09-24', '2026-09-25', '2026-09-26'],
            temperature_2m_max: [30, 33, 34, 31, 29, 30, 31],
            temperature_2m_min: [19, 21, 22, 21, 20, 18, 21],
        },
        location: { name: 'Brasilia', country: 'Brazil' },
    };
    const chartHtml = renderToStaticMarkup(React.createElement(Chart, { data: fakeDaily }));
    console.log('Chart SSR OK, length:', chartHtml.length);

    const { default: App } = await server.ssrLoadModule('/src/App.jsx');
    const appHtml = renderToStaticMarkup(React.createElement(App));
    console.log('App SSR OK (initial state), length:', appHtml.length);

    console.log('\nALL COMPONENTS RENDERED WITHOUT THROWING');
} catch (err) {
    console.error('SSR CHECK FAILED:', err);
    process.exitCode = 1;
} finally {
    await server.close();
}

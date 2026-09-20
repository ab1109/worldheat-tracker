import React from 'react';

import { Cards, Chart, CountryPicker, Leaderboard } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

class App extends React.Component {
    state = {
        data: null,
        country: 'world',
        error: false,
        view: 'dashboard',
    };

    async componentDidMount() {
        this.loadWeather('world');
    }

    loadWeather = async (country) => {
        try {
            const fetchedData = await fetchData(country);
            this.setState({ data: fetchedData, country, error: false });
        } catch (error) {
            this.setState({ error: true });
        }
    };

    handleCountryChange = (country) => {
        this.loadWeather(country);
    };

    setView = (view) => {
        this.setState({ view });
    };

    render() {
        const { data, error, view } = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.glow} aria-hidden="true" />
                <header className={styles.header}>
                    <p className={styles.eyebrow}>Live weather intelligence</p>
                    <h1>World Heat Tracker</h1>
                    <p className={styles.intro}>A clear view of heat, humidity, and the week ahead.</p>
                </header>

                <div className={styles.tabs} role="tablist" aria-label="View selector">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={view === 'dashboard'}
                        className={view === 'dashboard' ? styles.tabActive : styles.tab}
                        onClick={() => this.setView('dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={view === 'leaderboard'}
                        className={view === 'leaderboard' ? styles.tabActive : styles.tab}
                        onClick={() => this.setView('leaderboard')}
                    >
                        Hottest cities
                    </button>
                </div>

                {view === 'dashboard' ? (
                    <>
                        <CountryPicker handleCountryChange={this.handleCountryChange} />
                        {error ? (
                            <p className={styles.error}>Weather data is temporarily unavailable. Please try again.</p>
                        ) : (
                            <>
                                <Cards data={data} />
                                <Chart data={data} />
                            </>
                        )}
                    </>
                ) : (
                    <Leaderboard onSelect={(code) => { this.loadWeather(code); this.setView('dashboard'); }} />
                )}
            </div>
        );
    }
}

export default App;

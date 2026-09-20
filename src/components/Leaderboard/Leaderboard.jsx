import React, { useEffect, useState } from 'react';
import cx from 'classnames';

import styles from './Leaderboard.module.css';
import { fetchLeaderboard } from '../../api';

const medalClass = (rank) => {
    if (rank === 0) return styles.gold;
    if (rank === 1) return styles.silver;
    if (rank === 2) return styles.bronze;
    return null;
};

const Leaderboard = ({ onSelect }) => {
    const [ranking, setRanking] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        let cancelled = false;

        fetchLeaderboard()
            .then((result) => {
                if (!cancelled) setRanking(result);
            })
            .catch(() => {
                if (!cancelled) setError(true);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    if (error) {
        return <p className={styles.error}>Leaderboard data is temporarily unavailable. Please try again.</p>;
    }

    if (!ranking) {
        return <p className={styles.loading}>Ranking cities by current temperature…</p>;
    }

    const max = ranking[0].temperature;
    const min = ranking[ranking.length - 1].temperature;
    const range = Math.max(max - min, 1);

    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <p className={styles.title}>Hottest cities right now</p>
                <p className={styles.subtitle}>Ranked live by current temperature · tap a city to view its dashboard</p>
            </div>
            <ol className={styles.list}>
                {ranking.map(({ location, temperature }, index) => (
                    <li key={location.code}>
                        <button type="button" className={styles.row} onClick={() => onSelect(location.code)}>
                            <span className={cx(styles.rank, medalClass(index))}>{index + 1}</span>
                            <span className={styles.place}>
                                <span className={styles.city}>{location.name}</span>
                                <span className={styles.country}>{location.country}</span>
                            </span>
                            <span className={styles.barTrack}>
                                <span
                                    className={styles.barFill}
                                    style={{ width: `${((temperature - min) / range) * 100}%` }}
                                />
                            </span>
                            <span className={styles.temp}>{`${temperature.toFixed(1)}°C`}</span>
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Leaderboard;

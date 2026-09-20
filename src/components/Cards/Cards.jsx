import React from 'react';
import * as ReactCountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';

// react-countup ships a UMD build; Vite's CJS interop for it doesn't unwrap
// the inner `default`, so a plain default import yields the whole exports
// object instead of the component. Unwrap defensively either way.
const CountUp = ReactCountUp.default?.default ?? ReactCountUp.default;

const ThermometerIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14 14.76V4.5a2 2 0 0 0-4 0v10.26a4 4 0 1 0 4 0Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx="12" cy="17" r="1.6" fill="currentColor" />
    </svg>
);

const WindIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M3 8h11a2.5 2.5 0 1 0-2.4-3.2M3 16h14a2.5 2.5 0 1 1-2.4 3.2M3 12h17a2.5 2.5 0 1 0-2.4-3.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const DropletIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 3.5s6.5 7.02 6.5 11.3A6.5 6.5 0 1 1 5.5 14.8C5.5 10.52 12 3.5 12 3.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
        />
    </svg>
);

const metrics = [
    {
        key: 'temperature',
        label: 'Current temperature',
        variant: 'heat',
        icon: ThermometerIcon,
        value: (current) => current.temperature_2m,
        decimals: 1,
        suffix: '°C',
        caption: 'The temperature right now',
    },
    {
        key: 'feelsLike',
        label: 'Feels like',
        variant: 'amber',
        icon: WindIcon,
        value: (current) => current.apparent_temperature,
        decimals: 1,
        suffix: '°C',
        caption: 'Thermal comfort, wind-adjusted',
    },
    {
        key: 'humidity',
        label: 'Humidity',
        variant: 'cool',
        icon: DropletIcon,
        value: (current) => current.relative_humidity_2m,
        decimals: 0,
        suffix: '%',
        caption: 'Moisture in the air',
    },
];

const Cards = ({ data }) => {
    if (!data) {
        return <p className={styles.loading}>Loading current conditions…</p>;
    }

    const { current, location } = data;

    return (
        <div className={styles.container}>
            {metrics.map(({ key, label, variant, icon: Icon, value, decimals, suffix, caption }) => (
                <div key={key} className={cx(styles.card, styles[variant])}>
                    <div className={styles.iconBadge}>
                        <Icon />
                    </div>
                    <p className={styles.cardLabel}>{label}</p>
                    <p className={styles.cardValue}>
                        <CountUp start={0} end={value(current)} duration={1.4} decimals={decimals} suffix={suffix} />
                    </p>
                    <p className={styles.cardLocation}>
                        {location.name}, {location.country}
                    </p>
                    <p className={styles.cardCaption}>{caption}</p>
                </div>
            ))}
        </div>
    );
};

export default Cards;

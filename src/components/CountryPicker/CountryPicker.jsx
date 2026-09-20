import React, { useState, useEffect } from 'react';

import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        };

        fetchAPI();
    }, []);

    return (
        <label className={styles.formControl}>
            <span className={styles.label}>Location</span>
            <div className={styles.selectWrap}>
                <select
                    className={styles.select}
                    defaultValue="world"
                    onChange={(event) => handleCountryChange(event.target.value)}
                >
                    {fetchedCountries.map((location) => (
                        <option key={location.code} value={location.code}>
                            {location.country} · {location.name}
                        </option>
                    ))}
                </select>
                <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </label>
    );
};

export default CountryPicker;

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

import styles from './Chart.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Chart = ({ data }) => {
    if (!data) return null;

    const { daily, location } = data;
    const dateLabel = (date) => new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'short' });

    return (
        <div className={styles.container}>
            <p className={styles.title}>7-day temperature outlook for {location.name}</p>
            <div className={styles.chartWrap}>
                <Line
                    data={{
                        labels: daily.time.map(dateLabel),
                        datasets: [
                            {
                                data: daily.temperature_2m_max,
                                label: 'Daily high',
                                borderColor: '#ff7a45',
                                backgroundColor: 'rgba(255, 122, 69, 0.16)',
                                pointBackgroundColor: '#ff7a45',
                                pointBorderColor: '#0a0d12',
                                fill: true,
                                tension: 0.4,
                            },
                            {
                                data: daily.temperature_2m_min,
                                label: 'Daily low',
                                borderColor: '#38bdf8',
                                backgroundColor: 'rgba(56, 189, 248, 0.08)',
                                pointBackgroundColor: '#38bdf8',
                                pointBorderColor: '#0a0d12',
                                fill: true,
                                tension: 0.4,
                            },
                        ],
                    }}
                    options={{
                        maintainAspectRatio: false,
                        interaction: { mode: 'index', intersect: false },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                                align: 'end',
                                labels: {
                                    color: '#93a0b2',
                                    usePointStyle: true,
                                    pointStyle: 'circle',
                                    boxWidth: 8,
                                    font: { family: 'Inter', size: 12 },
                                },
                            },
                            tooltip: {
                                backgroundColor: '#161b24',
                                borderColor: 'rgba(255,255,255,0.1)',
                                borderWidth: 1,
                                titleColor: '#f3f5f8',
                                bodyColor: '#93a0b2',
                                padding: 10,
                                callbacks: {
                                    label: (context) => `${context.dataset.label}: ${context.formattedValue}°C`,
                                },
                            },
                        },
                        scales: {
                            x: {
                                grid: { display: false },
                                ticks: { color: '#5e6b7d', font: { family: 'Inter', size: 12 } },
                            },
                            y: {
                                grid: { color: 'rgba(255,255,255,0.06)' },
                                ticks: {
                                    color: '#5e6b7d',
                                    font: { family: 'Inter', size: 12 },
                                    callback: (value) => `${value}°C`,
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Chart;

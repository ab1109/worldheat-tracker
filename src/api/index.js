import axios from 'axios';

const weatherUrl = 'https://api.open-meteo.com/v1/forecast';

export const locations = [
    { code: 'world', name: 'Global reference', country: 'World', latitude: 20, longitude: 0 },
    { code: 'au', name: 'Canberra', country: 'Australia', latitude: -35.28, longitude: 149.13 },
    { code: 'br', name: 'Brasilia', country: 'Brazil', latitude: -15.79, longitude: -47.88 },
    { code: 'ca', name: 'Ottawa', country: 'Canada', latitude: 45.42, longitude: -75.7 },
    { code: 'cl', name: 'Santiago', country: 'Chile', latitude: -33.45, longitude: -70.67 },
    { code: 'cn', name: 'Beijing', country: 'China', latitude: 39.9, longitude: 116.4 },
    { code: 'eg', name: 'Cairo', country: 'Egypt', latitude: 30.04, longitude: 31.24 },
    { code: 'fr', name: 'Paris', country: 'France', latitude: 48.86, longitude: 2.35 },
    { code: 'de', name: 'Berlin', country: 'Germany', latitude: 52.52, longitude: 13.41 },
    { code: 'in', name: 'New Delhi', country: 'India', latitude: 28.61, longitude: 77.21 },
    { code: 'id', name: 'Jakarta', country: 'Indonesia', latitude: -6.21, longitude: 106.85 },
    { code: 'it', name: 'Rome', country: 'Italy', latitude: 41.9, longitude: 12.5 },
    { code: 'jp', name: 'Tokyo', country: 'Japan', latitude: 35.68, longitude: 139.69 },
    { code: 'mx', name: 'Mexico City', country: 'Mexico', latitude: 19.43, longitude: -99.13 },
    { code: 'ng', name: 'Abuja', country: 'Nigeria', latitude: 9.08, longitude: 7.4 },
    { code: 'ru', name: 'Moscow', country: 'Russia', latitude: 55.76, longitude: 37.62 },
    { code: 'za', name: 'Pretoria', country: 'South Africa', latitude: -25.75, longitude: 28.19 },
    { code: 'kr', name: 'Seoul', country: 'South Korea', latitude: 37.57, longitude: 126.98 },
    { code: 'es', name: 'Madrid', country: 'Spain', latitude: 40.42, longitude: -3.7 },
    { code: 'tr', name: 'Ankara', country: 'Turkey', latitude: 39.93, longitude: 32.86 },
    { code: 'ae', name: 'Abu Dhabi', country: 'United Arab Emirates', latitude: 24.45, longitude: 54.38 },
    { code: 'gb', name: 'London', country: 'United Kingdom', latitude: 51.51, longitude: -0.13 },
    { code: 'us', name: 'Washington, D.C.', country: 'United States', latitude: 38.91, longitude: -77.04 },
];

export const fetchData = async (code = 'world') => {
    const location = locations.find((item) => item.code === code) || locations[0];
    const { data } = await axios.get(weatherUrl, {
        params: {
            latitude: location.latitude,
            longitude: location.longitude,
            current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code',
            daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code',
            forecast_days: 7,
            timezone: 'auto',
        },
    });

    return {
        location,
        current: data.current,
        daily: data.daily,
        timezone: data.timezone,
    };
};

export const fetchCountries = async () => locations;
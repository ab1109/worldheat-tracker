import React from 'react';

//import Cards from './components/Cards/Cards'; We dont have to use this as it clutters up app.js
//import Chart from './components/Chart/Chart';
//import CountryPicker from './components/CountryPicker/CountryPicker';

import {Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css'
import {fetchData} from './api';

class App extends React.Component{
    state = {
       data: null,
       country: 'world',
       error: false,
    }
    
    async componentDidMount(){
        this.loadWeather('world');
    }

    loadWeather = async (country) => {
        try {
            const fetchedData = await fetchData(country);
            this.setState({data: fetchedData, country, error: false});
        } catch (error) {
            this.setState({error: true});
        }
    }

    handleCountryChange = (country) => {
        this.loadWeather(country);
    }
    render(){
        const {data, error}= this.state;
        return(
            <div className={styles.container}>
                <header className={styles.header}>
                    <p className={styles.eyebrow}>LIVE WEATHER INTELLIGENCE</p>
                    <h1>World Heat Tracker</h1>
                    <p className={styles.intro}>A clear view of heat, humidity, and the week ahead.</p>
                </header>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                {error ? <p className={styles.error}>Weather data is temporarily unavailable. Please try again.</p> : <>
                    <Cards data={data}/>
                    <Chart data={data}/>
                </>}
            </div>
        );
    }
}

export default App;
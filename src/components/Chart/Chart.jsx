import React from 'react';
import {Line} from 'react-chartjs-2';
import styles from './Chart.module.css';
const Chart= ({data}) => {
    if (!data) return null;
    const {daily, location} = data;
    const dateLabel = (date) => new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {weekday: 'short'});
    const lineChart = (
    <Line
      data={{
          labels:daily.time.map(dateLabel),
          datasets: [{
              data: daily.temperature_2m_max,
              label: 'Daily high',
              borderColor:'#ec6a32',
              backgroundColor:'rgba(236,106,50,0.16)',
              fill:true,
          }, {
              data: daily.temperature_2m_min,
              label: 'Daily low',
              borderColor:'#287d78',
              backgroundColor:'rgba(40,125,120,0.08)',
              fill:true,
          } ],
      }}
      options={{
          legend: {display:true},
          title: {display:true, text:`7-day temperature outlook for ${location.name}`},
          scales: {yAxes: [{ticks: {callback: (value) => `${value}°C`}}]},
      }}
      />
    );
    return(
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

export default Chart;
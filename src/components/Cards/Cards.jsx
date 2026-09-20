import React from 'react';
import {Card, CardContent, Typography, Grid} from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import cx from 'classnames'

const Cards= ({data}) => {
   if(!data){
     return 'Loading...'
   }
   const {current, location} = data;
    return(
        <div className={styles.container}>
         <Grid container spacing={3} justify="center">
           <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.infected)}>
             <CardContent>
               <Typography color="textSecondary" gutterBottom>Current temperature</Typography>
               <Typography variant ="h5">
                 <CountUp
                 start={0} end={current.temperature_2m} duration={1.5} decimals={1} suffix="°C"/>
               </Typography>
               <Typography color="textSecondary">{location.name}, {location.country}</Typography>
               <Typography variant="body2">The temperature right now</Typography>
             </CardContent>
           </Grid>
           <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.feelsLike)}>             <CardContent>
               <Typography color="textSecondary" gutterBottom>Feels like</Typography>
               <Typography variant ="h5">
                 <CountUp
                 start={0} end={current.apparent_temperature} duration={1.5} decimals={1} suffix="°C"/>
               </Typography>
               <Typography color="textSecondary">Thermal comfort</Typography>
               <Typography variant="body2">How warm it feels outside</Typography>
             </CardContent>
           </Grid>
           <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.humidity)}>             <CardContent>
               <Typography color="textSecondary" gutterBottom>Humidity</Typography>
               <Typography variant ="h5">
                 <CountUp
                 start={0} end={current.relative_humidity_2m} duration={1.5} suffix="%"/>
               </Typography>
               <Typography color="textSecondary">Relative humidity</Typography>
               <Typography variant="body2">Moisture in the air</Typography>
             </CardContent>
           </Grid>
         </Grid>
        </div>
    );
}

export default Cards;
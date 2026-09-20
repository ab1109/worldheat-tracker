import React , {useState,useEffect} from 'react';
import { NativeSelect,FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';

import {fetchCountries } from '../../api';

const CountryPicker= ({handleCountryChange}) => {
  const [fetchedCountries,setFetchedCountries]=useState([]);
    useEffect(() =>{
        const fetchAPI= async()=>{
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI();
    },[setFetchedCountries]);
    return(
        <FormControl className={styles.formControl}>
        <NativeSelect defaultValue="world" onChange={(e)=>handleCountryChange(e.target.value)}>
            {fetchedCountries.map((location)=><option key={location.code} value={location.code}>{location.country} · {location.name}</option>)}
        </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;
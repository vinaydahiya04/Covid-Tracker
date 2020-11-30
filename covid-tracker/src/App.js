import React, {useState,useEffect} from 'react';
import './App.css';
import {
  Select,
  MenuItem,
  FormControl,
  Card,
  CardContent
} from '@material-ui/core'

import InfoBox from './components/InfoBox';

function App() {
  const [countries,setCountries] = useState(['USA','UK','INDIA']);
  const [country,setCountry] = useState('worldwide');

  useEffect(()=>{
    const getCovidData = async ()=>{
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then(response => response.json())
      .then((data)=>{
        const dummy_countries = data.map((country) => {
          return({            
            name: country.country,
            value: country.countryInfo.iso2       

          })         
        })

        setCountries(dummy_countries);
      }

      )

    }

    getCovidData();

  },[]);

  const CountryChangeHandler = async (e) => {
    setCountry(e.target.value);
  }
  return (
    <div className="app">
      <div className='app__header'>
        <h1>COVID-19 TRACKER</h1>
      <FormControl className='app__dropdown'>
        <Select variant='outlined' value={country} onChange={CountryChangeHandler}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map(country =>(
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>

      <div className='app__box_holder'>
        <InfoBox title="active" total="100 " cases="5616"/>
        <InfoBox title="dead" total="10021" cases="8656" />
        <InfoBox title="recovered" total="613165" cases="8385" />

      </div>

      
    </div>
  );
}

export default App;

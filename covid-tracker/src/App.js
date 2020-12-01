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
import Map from './components/Map';
import Table from './components/Table';

function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState('worldwide');
  const [CountryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);

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

        const dummy_data = data.map((country) => {
          return({
            name:country.country,
            value:country.countryInfo.iso2,
            number:country.cases
          }

          )
        })

        setTableData(dummy_data);

        setCountries(dummy_countries);
      }

      )

    }

    getCovidData();

  },[]);

  useEffect(()=>{

    fetch('https://disease.sh/v3/covid-19/all').then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    });

  },[]);




  const CountryChangeHandler = async (e) => {
    setCountry(e.target.value);

    const url = e.target.value === 'worldwide' ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${e.target.value}`;

      console.log(url);

    await fetch(url).then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    } );

    console.log(CountryInfo);
  };
  return (
    <div className="app">
      <div className="app__left">
        <div className='app__header'>
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app__dropdown'>
            <Select variant='outlined' value={country} onChange={CountryChangeHandler}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='app__box_holder'>
          <InfoBox title="active" cases={CountryInfo.todayCases} total={CountryInfo.cases} />
          <InfoBox title="recovered" cases={CountryInfo.todayRecovered} total={CountryInfo.recovered} />
          <InfoBox title="dead" cases={CountryInfo.todayDeaths} total={CountryInfo.deaths} />

        </div>

        <Map />

      </div>

      <Card className="app__right">
        <CardContent>
          <h1>Live cases by country</h1>
          <Table data={tableData} />
          <h1>World wide cases</h1>
        </CardContent>

      </Card>
      

      
    </div>
  );
}

export default App;

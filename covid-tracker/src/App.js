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
import LineGraph from './components/LineGraph';
import "leaflet/dist/leaflet.css";

function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState('worldwide');
  const [CountryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);
  const [mapCenter,setMapCenter] = useState({lat:34.80746, lng:-40.4796});
  const [mapZoom,setMapZoom] = useState(2);
  const [mapCountries,setMapCountries] = useState([]);
  const [casesType,setCasesType] = useState('cases');

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
        setMapCountries(data);

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
      setMapZoom(4);
      setMapCenter({lat: data.countryInfo.lat, lng:data.countryInfo.long});

      console.log([data.countryInfo.lat, data.countryInfo.long]);
      

      
    } );

    console.log(mapCenter)
    console.log(mapZoom)

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
          <InfoBox active={casesType==='cases'} onClick={e => setCasesType('cases')} title="active" cases={CountryInfo.todayCases} total={CountryInfo.cases} />
          <InfoBox active={casesType === 'recovered'} onClick={e => setCasesType('recovered')} title="recovered" cases={CountryInfo.todayRecovered} total={CountryInfo.recovered} />
          <InfoBox active={casesType === 'deaths'} onClick={e => setCasesType('deaths')} title="dead" cases={CountryInfo.todayDeaths} total={CountryInfo.deaths} />

        </div>
        <h1>{mapCenter.lat}</h1>         
        <Map
        casesType={casesType}
        countries = {mapCountries}
        center={mapCenter}
        zoom={mapZoom}
         />

      </div>

      <Card className="app__right">
        <CardContent>
          <h1>Live cases by country</h1>
          <Table data={tableData} />
          <h1>World wide new {casesType}</h1>
        </CardContent>

        <LineGraph  casesType={casesType}/>

      </Card>
      

      
    </div>
  );
}

export default App;

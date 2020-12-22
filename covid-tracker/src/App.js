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
  const [casesType,setCasesType] = useState("cases");
  const [dark,setDark] = useState(false);

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
      if(e.target.value==='worldwide'){
        setMapCenter({ lat: 34.80746, lng: -40.4796 });
      }
      else{
        setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long });
      }
      

      
    } );

    console.log(mapCenter)
    console.log(mapZoom)

    console.log(CountryInfo);
  };


  return (
    <div className={dark?"app_dark":"app"}>
      <div className={dark?"app__left_dark":"app__left"}>
        <div className={dark?'app__header_dark':'app__header'}>
          <h1>COVID-19 TRACKER </h1>
          <label className="dark__label">
            <div className="dark__toggle">
              <input className="dark__toggle-state" type="checkbox" name="check" value="check" onChange={()=>{setDark(!dark)}} />
              <div className="dark__indicator"></div>
            </div>
            <div className={dark?"dark__label-text_dark":'dark__label-text'}>Dark Mode </div>
            
          </label>

          <FormControl className='app__dropdown'>
            <Select variant='outlined' value={country} style={dark ? { color: "white",border:"1px solid white" } : {}} onChange={CountryChangeHandler}>
              <MenuItem value="worldwide" >Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='app__box_holder'>
          <InfoBox active={casesType==='cases'} dark={dark} onClick={e => setCasesType('cases')} title="active" cases={CountryInfo.todayCases} total={CountryInfo.cases} />
          <InfoBox active={casesType === 'recovered'} dark={dark}  onClick={e => setCasesType('recovered')} title="recovered" cases={CountryInfo.todayRecovered} total={CountryInfo.recovered} />
          <InfoBox active={casesType === 'deaths'} dark={dark} onClick={e => setCasesType('deaths')} title="dead" cases={CountryInfo.todayDeaths} total={CountryInfo.deaths} />

        </div>     
        <Map
        dark={dark}
        casesType={casesType}
        countries = {mapCountries}
        center={mapCenter}
        zoom={mapZoom}
         />

      </div>

      <Card className={dark?"app__right_dark":"app__right"}>
        <CardContent style={dark?{backgroundColor:"black",color:"white"}:{}}>
          <h2>Total cases by country</h2>
          <br></br>
          <Table dark={dark} data={tableData} />
          <h2>World wide new {casesType}</h2>
        </CardContent>

        <LineGraph dark={dark}  casesType={casesType}/>

      </Card>
      

      
    </div>
  );
}

export default App;

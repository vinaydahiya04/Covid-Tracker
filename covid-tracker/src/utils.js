import React from 'react';
import numeral from 'numeral'
import {Circle,Popup} from 'react-leaflet';

const casesTypeColors = {
    cases: {
        hex: "red",        
        multiplier: 600,
    },
    recovered: {
        hex: "black",
        multiplier: 1000,
    },
    deaths: {
        hex: "#ffffff",        
        multiplier: 1500,
    },
};


const showDataOnMap = (data,casesType='cases') =>(
    data.map(country => (
        <Circle
            center = {[country.countryInfo.lat,country.countryInfo.long]}
            fillOpacity={0.4}
            color = {casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType])*casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div>
                    <div style={{backgroundImage: `url(${country.countryInfo.flag})`}}></div>

                    <div>{country.country}</div>
                    <div>Cases: {numeral(country.cases).format('0,0')}</div>
                    <div>Recovered: {numeral(country.recovered).format('0,0')}</div>
                    <div>Deaths: {numeral(country.deaths).format('0,0')}</div>



                </div>


            </Popup>

        </Circle>

    ))

);

export {showDataOnMap};
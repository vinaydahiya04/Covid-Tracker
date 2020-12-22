import React from 'react'
import './Table.css'
import numeral from 'numeral'

function Table(props) {
    props.data.sort((a,b) => b.number - a.number);
    console.log(props.data);
    return (
        <div className={props.dark?'table__list_dark':'table__list'}>
            <table>
                {props.data.map((country)=>(
                    <tr>
                        <td>{country.name}</td>
                        <strong>{numeral(country.number).format("0,0")}</strong>
                    </tr>
                ))}
            </table>           

            
        </div>
    )
}

export default Table


import React from 'react'
import './Table.css'

function Table(props) {
    props.data.sort((a,b) => b.number - a.number);
    console.log(props.data);
    return (
        <div className='table__list'>
            <table>
                {props.data.map((country)=>(
                    <tr>
                        <td>{country.name}</td>
                        <td>{country.number}</td>
                    </tr>
                ))}
            </table>           

            
        </div>
    )
}

export default Table


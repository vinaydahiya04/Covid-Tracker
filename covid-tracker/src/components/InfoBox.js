import React,{useState} from 'react'
import {Card,CardContent,Typography} from '@material-ui/core'
import numeral from 'numeral'


function InfoBox(props) {
    const [isActive,setIsActive] = useState(false);

    const func = () => {
        setIsActive(true);
    }
    var str;
    props.active?str={border:"5px solid red"}:str={}
    return (
       
        <Card onClick={props.onClick} style={{cursor:"pointer",flex:"1",marginRight:"10px"}}>
            <CardContent style={str}>
                <div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                    <Typography className="infoBox__title" color="textSecondary">{props.title.toUpperCase()}</Typography>
                    <h2 className="infoBox__cases">{numeral(props.cases).format("0,0")}</h2>
                    <Typography className="infoBox__total" color="textSecondary">{numeral(props.total).format("0,0")}</Typography>

                </div>
                
                
                
            </CardContent>            
        </Card>
    )
}

export default InfoBox

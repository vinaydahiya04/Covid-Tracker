import React from 'react'
import {Card,CardContent,Typography} from '@material-ui/core'
function InfoBox(props) {
    return (
        <Card>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">{props.title}</Typography>
                <h2 className="infoBox__cases">{props.cases}</h2>
                <Typography className="infoBox__total" color="textSecondary">{props.total} Total</Typography>
                
            </CardContent>            
        </Card>
    )
}

export default InfoBox

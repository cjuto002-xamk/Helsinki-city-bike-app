import React from 'react'
import { Button, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { testdata } from "../data/testdata"

interface Journey {
    Departure : Date
    Return : Date
    ["Departure station id"] : number
    ["Departure station name"] : string
    ["Return station id"] : number
    ["Return station name"] : string
    ["Covered distance (m)"] : number
    ["Duration (sec.)"] : number
}

const data : Journey[] = JSON.parse(JSON.stringify(testdata), (key, value) => {
    if (key === 'Departure' || key === 'Return') {
        return new Date(value);
    }
    return value;
});

const JourneyList : React.FC = () : React.ReactElement => {
  return (
    <>
    <List dense={true}>
      {data.map((journey : Journey, idx : number) => {
        return (<ListItem key={idx}>
                  <ListItemText 
                    primary={`Journey from ${journey['Departure station name']} to ${(journey['Return station name'])}`}
                    secondary={`${journey.Departure.toLocaleDateString("fi-FI")} - ${journey.Return.toLocaleDateString("fi-FI")} 
                                duration ${journey['Duration (sec.)']} seconds`}
                  />
                    <ListItemIcon>
                        <MapIcon />
                    </ListItemIcon>
                </ListItem>)
      })}
    </List>
    <Button onClick={() => console.log(data[1].Departure)}>LOG</Button>
    </>
  )
}

export default JourneyList;
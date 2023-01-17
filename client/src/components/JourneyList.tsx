import React from 'react'
import { Button, Container} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
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

const columns: GridColDef[] = [
    {
      field: 'Departure station name',
      headerName: 'Departure station name',
      type: 'string',
      width: 200,
    },
    {
      field: 'Return station name',
      headerName: 'Return station name',
      type: 'string',
      width: 200,
    },
    {
      field: 'Covered distance (m)',
      headerName: 'Distance',
      type: 'number',
      width: 110,
    },
    {
      field: 'Departure',
      headerName: 'Departure time',
      type: 'string',
      width: 150,
    },
    {
      field: 'Return',
      headerName: 'Return time',
      type: 'string',
      width: 150,
    },
    {
      field: 'Duration (sec.)',
      headerName: 'Duration',
      type: 'string',
      width: 150,
    },
  ];

  const secondsToHours = (seconds : number) => {
    let hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    if (hours === 0){
      return `${minutes} m ${remainingSeconds} s`;
    }
    if (hours === 0 && minutes === 0){
      return `${remainingSeconds} m`;
    }
    return `${hours} h ${minutes} m ${remainingSeconds} s`;
  }

const rows : GridRowsProp = data.map((journey : Journey, idx : number) => {
    const duration = secondsToHours(journey['Duration (sec.)']);
    return  {
        id : idx,
        "Departure station name": journey["Departure station name"],
        "Return station name": journey["Return station name"],
        "Covered distance (m)": journey["Covered distance (m)"],
        "Departure": journey.Departure.toLocaleString("fi-FI"),
        "Return": journey.Return.toLocaleString("fi-FI"),
        "Duration (sec.)": duration,
        }
  })

const JourneyList : React.FC = () : React.ReactElement => {

    return (
        <>
        <Container>
          <div style={{ width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                autoHeight={true}
                disableSelectionOnClick={true}
            />
          </div>
          <Button onClick={() => console.log(data[1].Departure)}>LOG</Button>
        </Container>
        </>
    )
    }

export default JourneyList;
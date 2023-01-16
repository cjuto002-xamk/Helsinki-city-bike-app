import React from 'react'
import { Button} from '@mui/material';
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
      field: 'Covered distance (m)',
      headerName: 'Distance',
      type: 'number',
      width: 110,
    },
  ];

const rows : GridRowsProp = data.map((journey : Journey, idx : number) => {
    return  {
        id : idx,
        "Departure station name": journey["Departure station name"],
        "Return station name": journey["Return station name"],
        "Departure": journey.Departure.toLocaleString("fi-FI"),
        "Return": journey.Return.toLocaleString("fi-FI"),
        "Covered distance (m)": journey["Covered distance (m)"],
        }
  })

const JourneyList : React.FC = () : React.ReactElement => {

    return (
        <>
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
            />
        </div>
        <Button onClick={() => console.log(data[1].Departure)}>LOG</Button>
        </>
    )
    }

export default JourneyList;



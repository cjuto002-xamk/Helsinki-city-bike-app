import React, { useContext } from 'react'
import { Button, Container} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import { JourneyContext } from '../context/JourneysContext';
import { Journey } from "../context/JourneysContext"

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

const JourneyList : React.FC = () : React.ReactElement => {

  const { apiData, apiStationData } = useContext(JourneyContext)


  const rows : GridRowsProp = apiData.journeys.map((journey : Journey, idx : number) => {
    const duration = secondsToHours(journey.Duration__sec_);
    return  {
        id : idx,
        "Departure station name": journey.Departure_station_name,
        "Return station name": journey.Return_station_name,
        "Covered distance (m)": journey.Covered_distance__m_,
        "Departure": new Date(journey.Departure).toLocaleString("fi-FI"),
        "Return": new Date (journey.Return).toLocaleString("fi-FI"),
        "Duration (sec.)": duration,
        }
  })

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
          <Button onClick={() => console.log(apiStationData)}>LOG</Button>
        </Container>
        </>
    )
    }

export default JourneyList;
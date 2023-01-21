import React, { useContext, useEffect, useState } from 'react'
import { Backdrop, Button, CircularProgress, Container, Typography} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import { JourneyContext } from '../context/JourneysContext';
import { Journey } from "../context/JourneysContext"
import { useApitest } from '../hooks/useApitest';

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

  const { apiData, setApiData } = useContext(JourneyContext)
  const [ apiEndpoint, setApiEndpoint ] = useState("http://localhost:3100/api/journeys");
  const Data = useApitest(apiEndpoint);

  useEffect(() => {
    setApiData(Data)
  },[Data]);

  const rows : GridRowsProp = Data.journeys.map((journey : Journey, idx : number) => {
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
          {(Data.haettu)
          ? <><div style={{ width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                autoHeight={true}
                disableSelectionOnClick={true}
            />
          </div>
          <Button onClick={() => console.log(apiData)}>LOG</Button></>
          :<Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={!Data.haettu}
        >
          <CircularProgress color="inherit" />
          <Typography>Loading data</Typography>
          </Backdrop>
          }
        </Container>
        </>
    )
    }

export default JourneyList;
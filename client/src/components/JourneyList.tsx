import React, { useContext, useEffect, useState } from 'react'
import { Backdrop, Button, CircularProgress, Container, Typography} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import { ApiData, JourneyContext } from '../context/JourneysContext';
import { Journey } from "../context/JourneysContext"
import FilterBarJourneys from './FilterBarJourneys';
import { testdata } from '../data/testdata';

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
      headerName: 'Duration minutes',
      type: 'string',
      width: 150,
    },
  ];

  const secondsToMinutes = (seconds : number) => {
    const minutes = Math.floor((seconds % 3600) / 60);
    return minutes;
  }

const JourneyList : React.FC = () : React.ReactElement => {

  const { apiData } = useContext(JourneyContext)

  const [rows, setRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    if(apiData.journeys){
      setRows(apiData.journeys.map((journey : Journey, idx : number) => {
        const duration = secondsToMinutes(journey.Duration__sec_);
        return  {
            id : idx,
            "Departure station name": journey.Departure_station_name,
            "Return station name": journey.Return_station_name,
            "Covered distance (m)": journey.Covered_distance__m_,
            "Departure": new Date(journey.Departure).toLocaleString("fi-FI"),
            "Return": new Date (journey.Return).toLocaleString("fi-FI"),
            "Duration (sec.)": duration,
          }
      }))
    } 
  }, [apiData])

    return (
        <>
        <Container>
          <FilterBarJourneys/>
          {(apiData.haettu)
          ? <><div style={{ width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                autoHeight={true}
                disableSelectionOnClick={true}
            />
          </div>
          </>
          :<Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={!apiData.haettu}
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
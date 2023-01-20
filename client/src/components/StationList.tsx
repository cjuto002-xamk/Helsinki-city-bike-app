import React, { useContext, useEffect, useState } from 'react'
import { Backdrop, Button, CircularProgress, Container, Typography} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import { JourneyContext, Station } from '../context/JourneysContext';
import { Journey } from "../context/JourneysContext"
import FilterBar from './FilterBar';
import { useApiStations } from '../hooks/useApiStations';
import { useApitest } from '../hooks/useApitest';

const columns: GridColDef[] = [
    {
      field: 'City',
      headerName: 'City',
      type: 'string',
      width: 200,
    },
    {
      field: 'Name',
      headerName: 'Name',
      type: 'string',
      width: 200,
    },
    {
      field: 'Address',
      headerName: 'Address',
      type: 'string',
      width: 200,
    },
    {
      field: 'Operator',
      headerName: 'Operator',
      type: 'string',
      width: 200,
    },
  ];

const StationList : React.FC = () : React.ReactElement => {

  const { apiStationData, setApiStationData } = useContext(JourneyContext)
  const [ apiEndpoint, setApiEndpoint ] = useState("http://localhost:3100/api/stations");
  const Data = useApiStations(apiEndpoint);

  useEffect(() => {
    setApiStationData(Data)
  },[Data]);


  const rows : GridRowsProp = Data.stations.map((station : Station, idx : number) => {
    return  {
        id : idx,
        "City": station.Kaupunki,
        "Name": station.Name,
        "Address": station.Osoite,
        "Operator": station.Operaattor,
        }
  })

    return (
        <>
        {(Data.haettu)
        ?<><FilterBar/>
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
        </Container></>
        :<Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!Data.haettu}
          >
        <CircularProgress color="inherit" />
        <Typography>Loading data</Typography>
        </Backdrop>
        }
        </>
    )
    }

export default StationList;
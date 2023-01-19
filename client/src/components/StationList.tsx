import React, { useContext } from 'react'
import { Button, Container} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import { JourneyContext, Station } from '../context/JourneysContext';
import { Journey } from "../context/JourneysContext"

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

  const { apiStationData } = useContext(JourneyContext)


  const rows : GridRowsProp = apiStationData.stations.map((station : Station, idx : number) => {
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

export default StationList;
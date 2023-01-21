import React, { useContext, useEffect, useState } from 'react'
import { Backdrop, CircularProgress, Container, Typography} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import { JourneyContext } from '../context/JourneysContext';
import FilterBar from './FilterBarStations';
import { useApiStations } from '../hooks/useApiStations';

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

  interface Station {
    Kaupunki: string,
    Name: string,
    Osoite: string,
    Operaattor: string
}

const StationList : React.FC = () : React.ReactElement => {

  const { setApiStationData, selectedCity, selectedName, selectedAddress, selectedOperator } = useContext(JourneyContext)

  const [ apiEndpoint, setApiEndpoint ] = useState("http://localhost:3100/api/stations");
  const Data = useApiStations(apiEndpoint);
  const [ filteredData, setFilteredData ] = useState<Station[]>([]);

  const filterData = (data: Station[], city:string, name:string, address:string, operator:string) => {
    return data.filter((station : Station) => {
        if(city !== "" && station.Kaupunki !== city) return false;
        if(name !== "" && station.Name !== name) return false;
        if(address !== "" && station.Osoite !== address) return false;
        if(operator !== "" && station.Operaattor !== operator) return false;
        return true;
    });
  }

  useEffect(() => {
    const filteredData = filterData(Data.stations, selectedCity, selectedName, selectedAddress, selectedOperator);
    setFilteredData(filteredData);
    setApiStationData(Data)
  },[Data, selectedCity, selectedName, selectedAddress, selectedOperator]);

  const rows : GridRowsProp = filteredData.map((station : Station, idx : number) => {
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
import React, { useContext, useEffect, useState } from 'react'
import { Backdrop, CircularProgress, Container, Typography} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import { JourneyContext } from '../context/JourneysContext';
import FilterBar from './FilterBarStations';

const columns: GridColDef[] = [ // setting columns for data grid
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

  const { apiStationData, selectedCity, selectedName, selectedAddress, selectedOperator } = useContext(JourneyContext) //apidata from context 

  const [ rows, setRows ] = useState<GridRowsProp>([]);   // rows for data grid, empty array at first

  const [ filteredData, setFilteredData ] = useState<Station[]>([]); // filtered data from api data

  useEffect(() => { // filters data from api data by selected filters
    if (selectedCity.label|| selectedName.label || selectedAddress.label || selectedOperator.label) {
      setFilteredData(apiStationData.stations.filter((station : Station) => {
        return station.Kaupunki.includes(selectedCity.label) &&
        station.Name.includes(selectedName.label) &&
        station.Osoite.includes(selectedAddress.label) &&
        station.Operaattor.includes(selectedOperator.label)
      }))
    }else {
      setFilteredData(apiStationData.stations) // if no filters are selected, show all data
    } 
  },[selectedCity, selectedName, selectedAddress, selectedOperator]);

  useEffect(() => {
    if (filteredData.length === 0) { // if no filtereddata is found, show all data
      setRows(apiStationData.stations.map((station : Station, idx : number) => {
        return  {
            id : idx,
            "City": station.Kaupunki,
            "Name": station.Name,
            "Address": station.Osoite,
            "Operator": station.Operaattor,
            }
      }))
    }else {
      setRows(filteredData.map((station : Station, idx : number) => { // if filtered data is found, show filtered data
        return  {
            id : idx,
            "City": station.Kaupunki,
            "Name": station.Name,
            "Address": station.Osoite,
            "Operator": station.Operaattor,
            }
      }))
    }
  },[apiStationData.haettu, filteredData])

  return (
      <>
      <Container>
      <FilterBar/>
      {(apiStationData.haettu) // if data is fetched from api, show data grid
      ?<>
        <div style={{ width: '100%' }}>
          <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              autoHeight={true}
              disableSelectionOnClick={true}
              className="journeyGrid"
          />
        </div>
      </>
      :<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!apiStationData.haettu}
        >
      <CircularProgress color="inherit" />
      <Typography>Loading station data</Typography>
      </Backdrop>
      }
      </Container>
      </>
  )
  }

export default StationList;
import React, { useContext, useEffect, useState } from 'react'
import { Backdrop, CircularProgress, Container, Typography} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import { JourneyContext, Station } from '../context/JourneysContext';
import FilterBar from './FilterBarStations';
import SingleStation from './SingeStation';

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


const StationList : React.FC = () : React.ReactElement => {

  const { apiStationData, 
          selectedCity, selectedName, selectedAddress, selectedOperator, 
          singleStationData, setSingleStationData } = useContext(JourneyContext) //data from context 

  const [ rows, setRows ] = useState<GridRowsProp>([]);   // rows for data grid, empty array at first

  const [ filteredData, setFilteredData ] = useState<Station[]>([]); // filtered data from api data

  const handleSingleStation = (station : []) => { // opens single station dialog
    setSingleStationData({
      ...singleStationData,
      station: station,
      open: true
    });
  }

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
            "Kapasiteet": station.Kapasiteet,
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
            "Kapasiteet": station.Kapasiteet,
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
              onRowClick={(e) => {handleSingleStation(e.row)}}
              data-testid="stationGrid"
          />
        </div>
        <SingleStation/>
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
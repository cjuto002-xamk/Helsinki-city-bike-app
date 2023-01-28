import React, { useContext, useEffect } from 'react'
import { AppBar, Autocomplete, Box, TextField, Toolbar } from '@mui/material';
import { JourneyContext, Station } from '../context/JourneysContext';
import axios from 'axios';

const FilterBar : React.FC = () : React.ReactElement => {

  // all needed setters from context
  const { apiStationData, setApiStationData,
          selectedCity, setSelectedCity, 
          selectedName, setSelectedName, 
          selectedAddress, setSelectedAddress, 
          selectedOperator, setSelectedOperator } = useContext(JourneyContext)

  const url = "http://localhost:3100/api/stations"; // url for api

  useEffect(() => { // fetches data from api and sets it to context
    axios.get(url)
        .then((response) => {
            setApiStationData({
                ...apiStationData,
                stations: response.data,
                haettu: true
            });
        })
        .catch((error) => {
            setApiStationData({
                ...apiStationData,
                error: error.message,
                haettu: true
            });
        });
  },);

  const createUniqueList = (property: keyof Station) => { // creates unique list of values for filtering
    const propertyList: {label: string | number}[] = apiStationData.stations.map((station : Station, idx : number) => {
      return {
        label : (station[property] as string)
      }
    });
  
    return Array.from(new Set(propertyList.map(a => a.label))).map(label => {
      return { label }
    });
  }
  
  // unique lists for filtering
  const uniqueCity = createUniqueList("Kaupunki");
  const uniqueName = createUniqueList("Nimi");
  const uniqueAddress = createUniqueList("Osoite");
  const uniqueOperator = createUniqueList("Operaattor");

  return (
    <>
      <Box>
      <AppBar position="static" className="stationBar">
        <Toolbar className="stationToolBar">
            <Autocomplete
              disablePortal
              id="City"
              options={uniqueCity}
              value={uniqueCity.find(city => city.label === selectedCity.label) || null}
              onChange={(event, newValue) => { // sets city value to context
                setSelectedCity({label: newValue?.label || ""});
              }}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="City" />}
              className='journeySelect'
            />
            <Autocomplete
              disablePortal
              id="Name"
              options={uniqueName}
              value={uniqueName.find(name => name.label === selectedName.label) || null}
              onChange={(event, newValue) => { // sets name value to context
                setSelectedName({label: newValue?.label || ""});
              }}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Name" />}
              className='journeySelect'
            />
            <Autocomplete
              disablePortal
              id="Address"
              options={uniqueAddress}
              value={uniqueAddress.find(address => address.label === selectedAddress.label) || null}
              onChange={(event, newValue) => { // sets address value to context
                setSelectedAddress({label: newValue?.label || ""});
              }}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Address" />}
              className='journeySelect'
            />
            <Autocomplete
              disablePortal
              id="Operator"
              options={uniqueOperator}
              value={uniqueOperator.find(operator => operator.label === selectedOperator.label) || null}
              onChange={(event, newValue) => { // sets operator value to context
                setSelectedOperator({label: newValue?.label || ""});
              }}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Operator" />}
              className='journeySelect'
            />
        </Toolbar>
      </AppBar>
    </Box>
    </>
  )
}

export default FilterBar;
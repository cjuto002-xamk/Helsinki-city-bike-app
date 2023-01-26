import React, { useContext, useEffect } from 'react'
import { AppBar, Autocomplete, Box, IconButton, TextField, Toolbar } from '@mui/material';
import { JourneyContext, Station } from '../context/JourneysContext';
import axios from 'axios';

const FilterBar : React.FC = () : React.ReactElement => {

  const { apiStationData, setApiStationData,
          selectedCity, setSelectedCity, 
          selectedName, setSelectedName, 
          selectedAddress, setSelectedAddress, 
          selectedOperator, setSelectedOperator } = useContext(JourneyContext)

  const url = "http://localhost:3100/api/stations";

  useEffect(() => {
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
  }, []);

  const createUniqueList = (property: keyof Station) => {
    const propertyList: {label: string | number}[] = apiStationData.stations.map((station : Station, idx : number) => {
      return {
        label : (station[property] as string)
      }
    });
  
    return Array.from(new Set(propertyList.map(a => a.label))).map(label => {
      return { label }
    });
  }
  
  const uniqueCity = createUniqueList("Kaupunki");
  const uniqueName = createUniqueList("Nimi");
  const uniqueAddress = createUniqueList("Osoite");
  const uniqueOperator = createUniqueList("Operaattor");

  return (
    <>
      <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, margin: "auto" }}
          >
            <Autocomplete
              disablePortal
              id="City"
              options={uniqueCity}
              value={uniqueCity.find(city => city.label === selectedCity.label) || null}
              onChange={(event, newValue) => {
                setSelectedCity({label: newValue?.label || ""});
              }}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="City" />}
            />
            <Autocomplete
              disablePortal
              id="Name"
              options={uniqueName}
              value={uniqueName.find(name => name.label === selectedName.label) || null}
              onChange={(event, newValue) => {
                setSelectedName({label: newValue?.label || ""});
              }}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Name" />}
            />
            <Autocomplete
              disablePortal
              id="Address"
              options={uniqueAddress}
              value={uniqueAddress.find(address => address.label === selectedAddress.label) || null}
              onChange={(event, newValue) => {
                setSelectedAddress({label: newValue?.label || ""});
              }}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Address" />}
            />
            <Autocomplete
              disablePortal
              id="Operator"
              options={uniqueOperator}
              value={uniqueOperator.find(operator => operator.label === selectedOperator.label) || null}
              onChange={(event, newValue) => {
                setSelectedOperator({label: newValue?.label || ""});
              }}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Operator" />}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  )
}

export default FilterBar;
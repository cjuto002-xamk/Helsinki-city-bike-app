import React, { useContext } from 'react'
import { AppBar, Autocomplete, Box, Button, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import { ApiStation, JourneyContext, Station } from '../context/JourneysContext';

interface ApiStationData {
  stations: Station[];
}


const FilterBar : React.FC = () : React.ReactElement => {

  const { apiStationData } : { apiStationData: ApiStationData } = useContext(JourneyContext)

  const createUniqueList = (property: keyof Station) => {
    const propertyList: {label: string | number}[] = apiStationData.stations.map((station : Station, idx : number) => {
      return {
        label : station[property]
      }
    });
  
    return Array.from(new Set(propertyList.map(a => a.label))).map(label => {
      return { label }
    });
  }
  
  const uniqueCity = createUniqueList("Kaupunki");
  const uniqueName = createUniqueList("Nimi");
  const uniqueAddress = createUniqueList("Nimi");
  const uniqueOperator = createUniqueList("Nimi");

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
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="City" />}
            />
            <Autocomplete
              disablePortal
              id="Name"
              options={uniqueName}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Name" />}
            />
            <Autocomplete
              disablePortal
              id="Address"
              options={uniqueAddress}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Address" />}
            />
            <Autocomplete
              disablePortal
              id="Operator"
              options={uniqueOperator}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Operator" />}
            />
{/*             <Button 
            onClick={() => console.log(apiStationData.stations)}
            color='secondary'
            >Filter</Button> */}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  )
}

export default FilterBar;
import React from 'react'
import { AppBar, Button, ButtonGroup, Container, CssBaseline, Toolbar, Typography } from '@mui/material';

const Header : React.FC = () : React.ReactElement => {

  const buttons = [
    <Button key="home" href='/'>Home</Button>,
    <Button key="journeys" href='/journeys'>Journeys</Button>,
    <Button key="stations" href='/stations'>Stations</Button>,
  ];

  return (
    <>
    <CssBaseline />
    <AppBar position='static'>
      <Container>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 2 }}>HELSINKI BIKE JOURNEYS</Typography>

          <ButtonGroup size="large" aria-label="large button group" color='secondary'>
            {buttons}
          </ButtonGroup>

        </Toolbar>
      </Container>
    </AppBar>
    </>
  )
}

export default Header;
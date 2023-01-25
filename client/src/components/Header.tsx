import React from 'react'
import { AppBar, ButtonGroup, Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import { Link } from "react-router-dom";

const Header : React.FC = () : React.ReactElement => {

  const buttons = [
        <>
        <Link to="/" key={1}>Home</Link>
        <Link to="/journeys" key={2}>Journeys</Link>
        <Link to="/stations" key={3}>Stations</Link>
        </>
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
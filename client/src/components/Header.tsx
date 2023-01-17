import React from 'react'
import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@mui/material';

const Header : React.FC = () : React.ReactElement => {
  return (
    <>
    <CssBaseline />
    <AppBar position='static'>
      <Container>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 2 }}>HELSINKI BIKE JOURNEYS</Typography>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  )
}

export default Header;
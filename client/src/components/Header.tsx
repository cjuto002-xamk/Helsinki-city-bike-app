import React from 'react'
import { AppBar, Container, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';

const Header : React.FC = () : React.ReactElement => {
  return (
    <>
    <CssBaseline />
    <AppBar position='static'>
      <Container>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>Helsinki bike journeys</Typography>
          <IconButton color="inherit">
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  )
}

export default Header;
import React from 'react'
import { AppBar, Container, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';

const Header : React.FC = () : React.ReactElement => {
  return (
    <>
    <CssBaseline />
    <AppBar position='static'>
      <Container>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 2 }}>Helsinki bike journeys</Typography>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  )
}

export default Header;
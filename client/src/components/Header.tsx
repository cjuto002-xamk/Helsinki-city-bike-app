import React from 'react'
import { AppBar, Button, ButtonGroup, Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import "../styles/styles.css"

const Header : React.FC = () : React.ReactElement => {

  return (
    <>
    <CssBaseline />
    <AppBar position='static' className='appBar'>
      <Container>
        <Toolbar>
          <Typography className='header'>Helsinki bike journeys app</Typography>

          <ButtonGroup variant="contained" aria-label="outlined primary button group" color='inherit' className='nav'>

            <Button>
              <Link to="/">Home</Link>
            </Button>

            <Button>
              <Link to="/journeys">Journeys</Link>
            </Button>

            <Button>
            <Link to="/stations">Stations</Link>
            </Button>

          </ButtonGroup>

        </Toolbar>
      </Container>
    </AppBar>
    </>
  )
}

export default Header;
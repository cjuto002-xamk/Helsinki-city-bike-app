import React from 'react'
import { AppBar, Button, ButtonGroup, Container, Toolbar, Typography } from '@mui/material';
import { Link } from "react-router-dom";

const Header : React.FC = () : React.ReactElement => {

  return (
    <>
    <AppBar position='static' className={ 'appBar' }>
      <Container>
        <Toolbar>
          <Typography className='header'>Helsinki bike journeys app</Typography>

          {/* Navigation buttons */}
          <ButtonGroup variant="contained" aria-label="outlined primary button group" color='inherit' className='nav'>

            <Button className='navButton'>
              <Link to="/">Home</Link>
            </Button>

            <Button className='navButton'>
              <Link to="/journeys">Journeys</Link>
            </Button>

            <Button className='navButton'>
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
import React, { useContext } from 'react'
import { Button, Typography } from '@mui/material';
import { JourneyContext } from '../context/JourneysContext';


const Home : React.FC = () : React.ReactElement => {

    const { apiData } = useContext(JourneyContext)

    return (
        <>
        <Typography>HOME</Typography>
        <Button onClick={() => console.log(apiData)}>LOG</Button>
        </>
    )
}

export default Home;
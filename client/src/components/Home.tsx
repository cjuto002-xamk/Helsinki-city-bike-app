import React from 'react'
import { Box, Paper, Typography } from '@mui/material';
import "../styles/styles.css"


const Home : React.FC = () : React.ReactElement => {

    return (
        <>
        <Box>
            <Paper elevation={3} className='paper'>
                <Typography variant="h5" component="h2" gutterBottom className='text'>Home</Typography>
                <Typography variant="body1" component="p" gutterBottom className='text'>
                    An app that queries bike rental data from a mongodb database and displays it in a user-friendly way.
                    Journey page shows journeys made by lessees, and the stations page shows all stations in the database.
                </Typography>
            </Paper>
        </Box>
        </>
    )
}

export default Home;
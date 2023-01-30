import React, { useContext } from 'react'
import { Button, Dialog, DialogTitle, List, ListItem, Typography } from '@mui/material';
import { JourneyContext } from '../context/JourneysContext';

const SingleStation : React.FC = () : React.ReactElement => {

    const { singleStationData, setSingleStationData } = useContext(JourneyContext)

    const handleClose = () => {
        setSingleStationData({
            ...singleStationData,
            station: [],
            open: false
          });
      };

    return (
        <>
        <Dialog fullWidth={true} maxWidth="sm" onClose={handleClose} open={singleStationData.open} className='SingleDialog'>
            <DialogTitle className='DialogText'>{singleStationData.station.City}</DialogTitle>
                <Typography className='DialogText'>Station name: {singleStationData.station.Name}</Typography>
                <Typography className='DialogText'>Station address: {singleStationData.station.Address}</Typography>
                <Typography className='DialogText'>Station operator: {singleStationData.station.Operator}</Typography>
                <Typography className='DialogText'>Station capacity: {singleStationData.station.Kapasiteet}</Typography>
                <Button onClick={handleClose}>Close</Button>
        </Dialog>
        </>
    )
}

export default SingleStation;

import React, { useContext, useEffect, useState } from 'react'
import { AppBar, Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import { JourneyContext } from '../context/JourneysContext';

interface Query {
    selectedMonth: number,
    fromDay: number,
    toDay: number
}

const FilterBarJourneys : React.FC = () : React.ReactElement => {

    const { apiData, setApiData } = useContext(JourneyContext) //apidata from context

    // consts for filtering
    const [month, setMonth] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<number>(5);
    const [selectedFromDay, setSelectedFromDay] = useState<number>(1);
    const [selectedToDay, setSelectedToDay] = useState<number>(1);
    //query that gets sent to server
    const [query, setQuery] = useState<Query>({selectedMonth: 5, fromDay: 1, toDay: 1});

    const [days, setDays] = useState<React.ReactElement[]>([]);


    const handleClick = () => { //button click handles that sends query to server
        setApiData({
            ...apiData,
            error: "",
            haettu: false
        });
        const url : string = "http://localhost:3100/api/journeys"
        axios.get(url, { params: query})
        .then((response) => {
            setApiData({
                ...apiData,
                journeys: response.data,
                haettu: true
            });
        })
        .catch((error) => {
            setApiData({
                ...apiData,
                error: error.message,
                haettu: true
            });
        });
    }
    
    const handleChange = (event: SelectChangeEvent) => { //handles changes in select fields and sets them to numbers for query
        if(event.target.name === "month"){
            setMonth(event.target.value);
            if(event.target.value === "may")
                setSelectedMonth(5);
            else if(event.target.value === "june")
                setSelectedMonth(6);
            else if(event.target.value === "july")
                setSelectedMonth(7);
        }
        else if(event.target.name === "Fday")
            setSelectedFromDay(parseInt(event.target.value));
        else if(event.target.name === "Tday")
            setSelectedToDay(parseInt(event.target.value));
    };
    
    useEffect(() => { //useEffect that changes number of days depending on month
        let newDays = [];
        if (month === "may" || month === "july") {
            for (let i = 1; i <= 31; i++) {
                newDays.push(<MenuItem value={i} key={i}>{i}</MenuItem>);
            }
        } else if (month === "june") {
            for (let i = 1; i <= 30; i++) {
                newDays.push(<MenuItem value={i} key={i}>{i}</MenuItem>);
            }
        } 
        setDays(newDays);
    }, [month]);

    useEffect(() => { //sets all query variables to one state
        setQuery({ selectedMonth : selectedMonth, fromDay: selectedFromDay, toDay: selectedToDay });
    }, [selectedMonth, selectedFromDay, selectedToDay]);

    return (
        <Box>
        <AppBar position="static" className="journeyBar">
        <Toolbar className="journeyToolBar">
            <FormControl variant='filled' sx={{ mr: 5, minWidth: 80, width: 200 }}>
                <InputLabel id="month">Month</InputLabel>
                    <Select
                        labelId="month"
                        id="month"
                        value={month}
                        onChange={handleChange}
                        autoWidth
                        label="month"
                        name='month'
                        className='journeySelect'
                        >
                        <MenuItem value={"may"}>May</MenuItem>
                        <MenuItem value={"june"}>June</MenuItem>
                        <MenuItem value={"july"}>July</MenuItem>
                    </Select>
            </FormControl>
            <FormControl variant='filled' sx={{ minWidth: 100 }}>
                <InputLabel id="Fday">From</InputLabel>
                    <Select
                        labelId="Fday"
                        id="Fday"
                        value={selectedFromDay.toString()}
                        onChange={handleChange}
                        autoWidth
                        label="Fday"
                        name='Fday'
                        className='journeySelect'
                        >  
                        {days}
                    </Select>
            </FormControl>
            <Typography>-</Typography>
            <FormControl variant='filled' sx={{ minWidth: 100 }}>
                <InputLabel id="Tday">To</InputLabel>
                    <Select
                        labelId="Tday"
                        id="Tday"
                        value={selectedToDay.toString()}
                        onChange={handleChange}
                        autoWidth
                        label="Tday"
                        name='Tday'
                        className='journeySelect'
                        >
                        {days}
                    </Select>
            </FormControl>
            <Button onClick={handleClick} variant="contained" className='journeyButton'>Get data</Button>
        </Toolbar>
        </AppBar>
    </Box>
    )
}

export default FilterBarJourneys;


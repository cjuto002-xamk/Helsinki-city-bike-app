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

    const { apiData, setApiData } = useContext(JourneyContext)

    const [month, setMonth] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<number>(5);
    const [selectedFromDay, setSelectedFromDay] = useState<number>(1);
    const [selectedToDay, setSelectedToDay] = useState<number>(1);
    const [query, setQuery] = useState<Query>({selectedMonth: 5, fromDay: 1, toDay: 1});

    const [days, setDays] = useState<React.ReactElement[]>([]);

    const handleClick = () => {
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
    
    const handleChange = (event: SelectChangeEvent) => {
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
    
    useEffect(() => {
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

    useEffect(() => { 
        setQuery({ selectedMonth : selectedMonth, fromDay: selectedFromDay, toDay: selectedToDay });
    }, [selectedMonth, selectedFromDay, selectedToDay]);

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ mt: 2, }}>
        <Toolbar>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, }}
            >
            </IconButton>
                <FormControl sx={{ m: 1, mr: 5, minWidth: 80, width: 150 }}>
                    <InputLabel id="month">Month</InputLabel>
                        <Select
                            labelId="month"
                            id="month"
                            value={month}
                            onChange={handleChange}
                            autoWidth
                            label="month"
                            name='month'
                            >
                            <MenuItem value={"may"}>May</MenuItem>
                            <MenuItem value={"june"}>June</MenuItem>
                            <MenuItem value={"july"}>July</MenuItem>
                        </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="Fday">From</InputLabel>
                        <Select
                            labelId="Fday"
                            id="Fday"
                            value={selectedFromDay.toString()}
                            onChange={handleChange}
                            autoWidth
                            label="Fday"
                            name='Fday'
                            >  
                            {days}
                        </Select>
                </FormControl>
                <Typography>-</Typography>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="Tday">To</InputLabel>
                        <Select
                            labelId="Tday"
                            id="Tday"
                            value={selectedToDay.toString()}
                            onChange={handleChange}
                            autoWidth
                            label="Tday"
                            name='Tday'
                            >
                            {days}
                        </Select>
                </FormControl>
            <Button color="inherit" onClick={handleClick}>Get data</Button>
        </Toolbar>
        </AppBar>
    </Box>
    )
}

export default FilterBarJourneys;


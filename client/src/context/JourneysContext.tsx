import React, {createContext} from 'react'
import { useApitest } from '../hooks/useApitest';

export const JourneyContext : React.Context<any> = createContext(undefined);

interface Props {
    children : React.ReactNode;
}

export interface ApiData {
    journeys : Journey[]
    error : string
    haettu : boolean
}

export interface Journey {
    Departure : Date
    Return : Date
    Departure_station_id : number
    Departure_station_name : string
    Return_station_id : number
    Return_station_name : string
    Covered_distance__m_ : number
    Duration__sec_ : number
}

export const JourneyProvider : React.FC<Props> = (props : Props) : React.ReactElement => {

    const apiData = useApitest("http://localhost:3100/api/journeys");
      
    return (
        <JourneyContext.Provider value={{ apiData }}>
            {props.children}
        </JourneyContext.Provider>
    )
}
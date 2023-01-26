import React, {createContext, useState} from 'react'

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

export interface ApiStation {
    stations : Station[]
    error : string
    haettu : boolean
}

export interface Station {
    Adress : string
    FID : number
    ID : number
    Kapasiteet : number
    Kaupunki : string
    Name : string
    Namn : string
    Nimi : string
    Operaattor : string
    Osoite : string
    Stad : string
    id : string
    x : number
    y : number
}

export const JourneyProvider : React.FC<Props> = (props : Props) : React.ReactElement => {

    const [apiStationData, setApiStationData] = useState<ApiStation>({
        stations : [],
        error : "",
        haettu : false
    })

    const [apiData, setApiData] = useState<ApiData>({
        journeys : [],
        error : "",
        haettu : true
    });

    const [selectedCity, setSelectedCity] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedOperator, setSelectedOperator] = useState("");
      
    return (
        <JourneyContext.Provider value={{   apiStationData, setApiStationData, 
                                            apiData, setApiData, 
                                            selectedCity, setSelectedCity,
                                            selectedName, setSelectedName,
                                            selectedAddress, setSelectedAddress,
                                            selectedOperator, setSelectedOperator
                                             }}>
            {props.children}
        </JourneyContext.Provider>
    )
}
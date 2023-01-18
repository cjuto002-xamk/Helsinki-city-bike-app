import React, {createContext, useEffect, useState} from 'react'

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

    const [apiData, setApiData] = useState<ApiData>({
        journeys : [],
        error : "",
        haettu : false
      });

    const apiCall = async () : Promise<void> => {

        try {
    
          const connection = await fetch("http://localhost:3100/api/journeys");
    
          if(connection.status === 200){
    
            setApiData({
              ...apiData,
              journeys : await connection.json(),
              haettu : true
            });
            
          } else {
    
            let errortext : string = "";
    
            switch (connection.status) {
    
              case 404 : errortext = "Information not found"; break;
              default : errortext = "Unexpected error on the server"; break;
            }
    
            setApiData({
              ...apiData,
              error : errortext,
              haettu : true
            });
          }
    
    
        } catch (e : any) {
    
          setApiData({
            ...apiData,
            error : "Can not connect to server",
            haettu : true
          });
          
        }
      
      }

      useEffect(() => {

        apiCall();
      
      },);
    
    return (
        <JourneyContext.Provider value={{ apiData }}>
            {props.children}
        </JourneyContext.Provider>
    )
}
import { useEffect, useState } from 'react'
import { ApiStation } from '../context/JourneysContext';
import axios from 'axios';

export const useApiStations = (url: string): ApiStation => {

    const [apiStationData, setApiStationData] = useState<ApiStation>({
        stations : [],
        error : "",
        haettu : false
    });

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                setApiStationData({
                    ...apiStationData,
                    stations: response.data,
                    haettu: true
                });
            })
            .catch((error) => {
                setApiStationData({
                    ...apiStationData,
                    error: error.message,
                    haettu: true
                });
            });
    },);

    return apiStationData;
}
import { useEffect, useState } from 'react'
import { ApiData } from '../context/JourneysContext';
import axios from 'axios';

export const useApitest = (url: string): ApiData => {

    const [apiData, setApiData] = useState<ApiData>({
        journeys : [],
        error : "",
        haettu : false
    });

    useEffect(() => {
        axios.get(url)
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
    },);

    return apiData;
}

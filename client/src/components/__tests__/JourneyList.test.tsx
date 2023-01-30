import { render, screen, waitFor } from '@testing-library/react';
import JourneyList from '../JourneyList';
import { JourneyContext } from '../../context/JourneysContext';

const apiData = {
  journeys: [
    {
      "Departure_station_name": "A",
      "Return_station_name": "B",
      "Covered_distance__m_": 100,
      "Departure": "2022-01-01T00:00:00.000Z",
      "Return": "2022-01-01T01:00:00.000Z",
      "Duration__sec_": 3600
    },
    {
      "Departure_station_name": "C",
      "Return_station_name": "D",
      "Covered_distance__m_": 200,
      "Departure": "2022-01-02T00:00:00.000Z",
      "Return": "2022-01-02T02:00:00.000Z",
      "Duration__sec_": 7200
    },
  ],
  haettu: true,
};

const columns = [
    { field: 'Departure_station_name', headerName: 'Departure station name' },
    { field: 'Return_station_name', headerName: 'Return station name' },
    { field: 'Covered_distance__m_', headerName: 'Covered distance (m)' },
    { field: 'Departure', headerName: 'Departure' },
    { field: 'Return', headerName: 'Return' },
    { field: 'Duration__sec_', headerName: 'Duration (sec)' },
];

const rows = (apiData.journeys.map((journey : any, idx : number) => {
    return  {
        id : idx,
        "Departure station name": journey.Departure_station_name,
        "Return station name": journey.Return_station_name,
        "Covered distance (m)": journey.Covered_distance__m_,
        "Departure": new Date(journey.Departure).toLocaleString("fi-FI"),
        "Return": new Date (journey.Return).toLocaleString("fi-FI"),
        "Duration (sec.)": journey.Duration__sec_,
        }
        })
    );

jest.mock('axios', () => {
    return {
    get: jest.fn(() => Promise.resolve({ data: {} }))
    };
});


describe('JourneyList component', () => {
    it('renders the component with data grid', async () => {
        const { queryByTestId } = render(
            <JourneyContext.Provider value={{ apiData, columns, rows }}>
                <JourneyList />
            </JourneyContext.Provider>
        );
    
        await waitFor(() => screen.queryByTestId("journeyGrid"));
    
        const dataGrid = screen.queryByTestId("journeyGrid");
        expect(dataGrid).toBeDefined();
    });
});



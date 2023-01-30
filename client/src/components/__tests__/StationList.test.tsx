import { render, screen, waitFor } from '@testing-library/react';
import StationList from '../StationList';
import { JourneyContext } from '../../context/JourneysContext';

const selectedCity = {label: "Helsinki"}
const selectedName = {label: "Helsinki"}
const selectedAddress = {label: "Helsinki"}
const selectedOperator = {label: "Helsinki"}
const singleStationData = {station: [], open: false}

const apiStationData = {
  stations: [
    {
        "City": "A",
        "Name": "B",
        "Address": "C",
        "Operator": "D",
    },
    {
        "City": "E",
        "Name": "F",
        "Address": "G",
        "Operator": "H",
    },
  ],
  haettu: true,
};

const columns = [
    { field: 'City', headerName: 'City' },
    { field: 'Name', headerName: 'Name' },
    { field: 'Address', headerName: 'Address' },
    { field: 'Operator', headerName: 'Operator' },
];

const rows = (apiStationData.stations.map((station : any, idx : number) => {
    return  {
        id : idx,
        "City": station.Kaupunki,
        "Name": station.Name,
        "Address": station.Osoite,
        "Operator": station.Operaattor,
        }
        })
    );

jest.mock('axios', () => {
    return {
    get: jest.fn(() => Promise.resolve({ data: {} }))
    };
});


describe('StationList component', () => {
    it('renders the component with data grid', async () => {
        const { queryByTestId } = render(
            <JourneyContext.Provider value={{ apiStationData, columns, rows, 
                                                selectedCity, selectedName, 
                                                selectedAddress, selectedOperator,
                                                singleStationData }}>
                <StationList />
            </JourneyContext.Provider>
        );
    
        await waitFor(() => screen.queryByTestId("stationGrid"));
    
        const dataGrid = screen.queryByTestId("stationGrid");
        expect(dataGrid).toBeDefined();
    });
});

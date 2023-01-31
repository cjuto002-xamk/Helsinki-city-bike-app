import { render, fireEvent, waitFor, within } from '@testing-library/react';
import axios from 'axios';
import FilterBarJourneys from '../FilterBarJourneys';
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

jest.mock('axios', () => {
  return {
    get: jest.fn().mockResolvedValue({ data: apiData })
  };
});

describe('FilterBarJourneys component', () => {
  it('sends a request to the server and updates the context', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue({ data: apiData });
    const { getByTestId } = render(
      <JourneyContext.Provider value={{ apiData, setApiData: jest.fn() }}>
        <FilterBarJourneys />
      </JourneyContext.Provider>
    );
    const monthSelect = getByTestId('month');
    const fromDaySelect = getByTestId('fromDay');
    const toDaySelect = getByTestId('toDay');

    fireEvent.click(monthSelect);
    const mayOption = within(monthSelect).getByDisplayValue('may');
    fireEvent.click(mayOption);

    fireEvent.click(fromDaySelect);
    const fromOption = within(fromDaySelect).getByDisplayValue("1");
    fireEvent.click(fromOption);

    fireEvent.click(toDaySelect);
    const toOption = within(toDaySelect).getByDisplayValue("1");
    fireEvent.click(toOption);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:3100/api/journeys',
        { params: { fromDay: 1, selectedMonth: 5, toDay: 1 } }
      );
    });
    
  });
});


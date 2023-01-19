import React from 'react';
import Header from './components/Header';
import JourneyList from './components/JourneyList';
import FilterBar from './components/FilterBar';
import { JourneyProvider } from './context/JourneysContext';

const App : React.FC = () : React.ReactElement => {
  return (
    <JourneyProvider>
      <>
      <Header/>

      <FilterBar/>

      <JourneyList/>
      
      </>
    </JourneyProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from './components/Header';
import JourneyList from './components/JourneyList';
import { JourneyProvider } from './context/JourneysContext';
import StationList from './components/StationList';

const App : React.FC = () : React.ReactElement => {
  return (
    <Router>
        <JourneyProvider>
          <>
          <Header/>

          <Routes>

            <Route path="/journeys" element={<JourneyList />} />

            <Route path="/stations" element={<StationList/>}/>

          </Routes>
          
          </>
        </JourneyProvider>
    </Router>
  );
}

export default App;

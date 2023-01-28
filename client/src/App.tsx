import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { JourneyProvider } from './context/JourneysContext';
import Header from './components/Header';
import JourneyList from './components/JourneyList';
import StationList from './components/StationList';
import Home from './components/Home';
import "@fontsource/roboto";

const App : React.FC = () : React.ReactElement => {
  return (
    <Router>
        <JourneyProvider>
          <>
          <Header/>

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/journeys" element={<JourneyList />} />

            <Route path="/stations" element={<StationList/>}/>

          </Routes>
          
          </>
        </JourneyProvider>
    </Router>
  );
}

export default App;

import React from 'react';
import "./App.css"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { JourneyProvider } from './context/JourneysContext';
import Header from './components/Header';
import JourneyList from './components/JourneyList';
import StationList from './components/StationList';
import Home from './components/Home';
import "@fontsource/roboto";
import { StyledEngineProvider } from '@mui/material/styles';

const App : React.FC = () : React.ReactElement => {
  return (
    <StyledEngineProvider injectFirst>
      <JourneyProvider>
        <Router>
          <>
          <Header/>

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/journeys" element={<JourneyList />} />

            <Route path="/stations" element={<StationList/>}/>

          </Routes>
          
          </>
        </Router>
      </JourneyProvider>
    </StyledEngineProvider>
  );
} 

export default App;

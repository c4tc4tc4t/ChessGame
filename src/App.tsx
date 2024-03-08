
import './App.css';
import Referee from './components/Referee/Referee';
import HomeScreen from './components/homeScreen/HomeScreen';
import { PrimeReactProvider } from 'primereact/api';
import { GameProvider } from './customHooks/useGame';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <PrimeReactProvider>
        <GameProvider>
          <div id='app'>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/referee" element={<Referee />} />
            </Routes>
          </div>
        </GameProvider>
      </PrimeReactProvider>
    </Router>
  );
}

export default App;

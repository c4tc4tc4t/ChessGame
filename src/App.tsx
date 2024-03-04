
import "./App.css";
import Referee from "./components/Referee/Referee";
import { PrimeReactProvider } from "primereact/api";
import { GameProvider } from "./customHooks/useGame";


function App() {
  return (
    <PrimeReactProvider>
      <GameProvider>
        <div id="app">
          <Referee />
        </div>
      </GameProvider>
    </PrimeReactProvider>
  );
}

export default App;

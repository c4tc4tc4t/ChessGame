import "./App.css";
import Referee from "./components/Referee/Referee";
import { PrimeReactProvider } from "primereact/api";

function App() {
  return (
    <PrimeReactProvider>
      <div id="app">
        <Referee />
      </div>
    </PrimeReactProvider>
  );
}

export default App;

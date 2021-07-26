import './App.css';
import AppBar from './Components/AppBar/AppBar'
import Devices from './Components/Devices/Devices'
import SimpleModal from './Components/DetailsModal/DetailsModal'

function App() {
  return (
    <div className="App">
      <AppBar />
      {/* <Devices /> */}
      <SimpleModal />
    </div>
  );
}

export default App;

import "./App.scss";
import Board from "./components/Board/Board";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <div className="left_section">
        <Sidebar />
      </div>
      <div className="right_section">
        <Navbar />
        <Board />
      </div>
    </div>
  );
}

export default App;

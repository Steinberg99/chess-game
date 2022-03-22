import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChessGame from "./pages/ChessGame";
import { socket, SocketContext } from "./contexts/socket";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SocketContext.Provider value={socket}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/game/:gameID" element={<ChessGame />} />
          </Routes>
        </SocketContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

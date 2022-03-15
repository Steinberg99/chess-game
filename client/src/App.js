import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChessGame from "./components/ChessGame";
import { socket, SocketContext } from "./contexts/socket";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SocketContext.Provider value={socket}>
          <Routes>
            <Route path="/game/:gameID" element={<ChessGame />} />
          </Routes>
        </SocketContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

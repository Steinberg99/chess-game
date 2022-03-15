import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Chess from "chess.js";
import ChessBoard from "./ChessBoard";
import { SocketContext } from "../contexts/socket";

const chess = new Chess();

function ChessGame() {
  const socket = useContext(SocketContext);
  const { gameID } = useParams();
  const [piecePositions, setPiecePositions] = useState(chess.board());

  let selectedPiece;

  useEffect(() => {
    socket.emit("join game", gameID);

    socket.on("move", (move) => {
      chess.move({ from: move.from, to: move.to });
      setPiecePositions(chess.board());
    });
  }, [socket]);

  function grabPiece(e) {
    if (e.target.className !== "piece") return;

    selectedPiece = e.target; // Set the selected piece
  }

  function movePiece() {
    if (!selectedPiece) return; // Return when no piece has been selected.
  }

  function placePiece(e) {
    if (!selectedPiece) return; // Return when no piece has been selected

    const fromCoordinates = selectedPiece.getAttribute("coordinates");
    const toCoordinates = e.target.getAttribute("coordinates");
    const move = chess.move({
      from: fromCoordinates,
      to: toCoordinates
    });

    if (!move) return; // Return when the move object is empty

    socket.emit("move", { gameID: gameID, move: move });
  }

  return (
    <div
      className="chess-game"
      onMouseDown={(e) => grabPiece(e)}
      onMouseMove={movePiece()}
      onMouseUp={(e) => placePiece(e)}
    >
      <SocketContext.Provider value={socket}>
        <ChessBoard piecePositions={piecePositions} />
      </SocketContext.Provider>
    </div>
  );
}

export default ChessGame;

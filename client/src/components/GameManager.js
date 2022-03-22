import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import Chess from "chess.js";
import ChessBoard from "./ChessBoard";
import { SocketContext } from "../contexts/socket";

const chess = new Chess();
const pieceWidth = 75;
const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const yAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];

function GameManager() {
  const socket = useContext(SocketContext);
  const { gameID } = useParams();
  const [playerColor, setPlayerColor] = useState();
  const [piecePositions, setPiecePositions] = useState(chess.board());
  const [winner, setWinner] = useState();
  const chessBoardRef = useRef(null);

  let selectedPiece;

  useEffect(() => {
    socket.emit("join game", gameID);

    socket.on("start game", (playerColor) => {
      setPlayerColor(playerColor);
    });

    socket.on("move", (move) => {
      chess.move({ from: move.from, to: move.to });
      setPiecePositions(chess.board());
    });

    socket.on("game won", (winner) => {
      console.log(winner);
      setWinner(winner);
    });
  }, [socket, gameID]);

  function grabPiece(e) {
    if (e.target.className !== "piece") return; // Return when no piece has been selected

    selectedPiece = e.target; // Set the selected piece
  }

  function movePiece(e) {
    if (!selectedPiece) return; // Return when no piece has been selected.

    const x = e.clientX - pieceWidth / 2;
    const y = e.clientY - pieceWidth / 2;

    selectedPiece.style.position = "absolute";
    selectedPiece.style.left = `${x}px`;
    selectedPiece.style.top = `${y}px`;
  }

  function placePiece(e) {
    if (!selectedPiece) return; // Return when no piece has been selected

    const chessBoardOffset = elementOffset(chessBoardRef.current);
    const x = e.clientX - chessBoardOffset.x;
    const y = e.clientY - chessBoardOffset.y;
    const fromCoordinates = selectedPiece.getAttribute("coordinates");
    let toCoordinates =
      xAxis[Math.floor(x / pieceWidth)] + yAxis[Math.floor(y / pieceWidth)];

    // Reverse the to coordinates when the player is playing as black
    if (playerColor === "b")
      toCoordinates =
        xAxis[Math.abs(Math.floor(x / pieceWidth) - 7)] +
        yAxis[Math.abs(Math.floor(y / pieceWidth) - 7)];

    selectedPiece.style.position = "static";
    selectedPiece = null;

    if (chess.turn() !== playerColor) return;

    const move = chess.move({
      to: toCoordinates,
      from: fromCoordinates
    });

    if (move) handleMove(move);
  }

  function elementOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY
    };
  }

  function handleMove(move) {
    setPiecePositions(chess.board());
    socket.emit("move", { gameID: gameID, move: move });
    if (chess.in_checkmate())
      socket.emit("game won", { gameID: gameID, winner: move.color });
  }

  return (
    <div
      className="game-manager"
      ref={chessBoardRef}
      onMouseDown={(e) => grabPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => placePiece(e)}
    >
      <SocketContext.Provider value={socket}>
        <ChessBoard playerColor={playerColor} piecePositions={piecePositions} />
      </SocketContext.Provider>
    </div>
  );
}

export default GameManager;

import { useState } from "react";
import Chess from "chess.js";
import ChessBoard from "./ChessBoard";

const chess = new Chess();

function ChessGame() {
  const [piecePositions, setPiecePositions] = useState(chess.board());

  return (
    <div className="chess-game">
      <ChessBoard piecePositions={piecePositions} />
    </div>
  );
}

export default ChessGame;

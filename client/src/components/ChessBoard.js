import Tile from "./Tile";
import "./ChessBoard.css";

const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const yAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];

function ChessBoard({ playerColor, piecePositions }) {
  let tiles = [];
  for (let i = 0; i < yAxis.length; i++) {
    for (let j = 0; j < xAxis.length; j++) {
      let coordinates = xAxis[j] + yAxis[i];
      if (playerColor === "b")
        coordinates = xAxis[Math.abs(j - 7)] + yAxis[Math.abs(i - 7)]; // Add the coordinates in reversed order if the player is playing as black

      tiles.push(
        <Tile
          key={coordinates}
          coordinates={coordinates}
          color={(i + j) % 2 === 0 ? "light" : "dark"}
          piece={
            playerColor === "w"
              ? piecePositions[i][j]
              : piecePositions[Math.abs(i - 7)][Math.abs(j - 7)] // Add the pieces in reversed order if the player is playing as black
          }
        />
      );
    }
  }

  return <div className="chess-board">{tiles}</div>;
}

export default ChessBoard;

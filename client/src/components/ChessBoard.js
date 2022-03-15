import Tile from "./Tile";
import "./ChessBoard.css";

const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const yAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];

function ChessBoard({ piecePositions }) {
  let tiles = [];
  for (let i = 0; i < yAxis.length; i++) {
    for (let j = 0; j < xAxis.length; j++) {
      let coordinates = xAxis[j] + yAxis[i];
      tiles.push(
        <Tile
          key={coordinates}
          coordinates={coordinates}
          color={(i + j) % 2 === 0 ? "light" : "dark"}
          piece={piecePositions[i][j]}
        />
      );
    }
  }

  return <div className="chess-board">{tiles}</div>;
}

export default ChessBoard;

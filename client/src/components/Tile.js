import "./Tile.css";

function Tile({ coordinates, color, piece }) {
  return <div className={`tile ${color}`}></div>;
}

export default Tile;

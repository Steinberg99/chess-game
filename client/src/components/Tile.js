import "./Tile.css";

function Tile({ coordinates, color, piece }) {
  return (
    <div className={`tile ${color}`} coordinates={coordinates}>
      {piece && (
        <div
          className="piece"
          piece={piece.color + piece.type}
          coordinates={coordinates}
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/pieces/${
              piece.color + piece.type
            }.png)`
          }}
        ></div>
      )}
    </div>
  );
}

export default Tile;

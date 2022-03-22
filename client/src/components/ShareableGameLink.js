function ShareableGameLink() {
  const gameID = Math.random().toString(36).substring(2);

  return (
    <div className="shareable-game-link">
      <a href={`game/${gameID}`}>{gameID}</a>
    </div>
  );
}

export default ShareableGameLink;

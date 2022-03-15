const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    config: "http://localhost:3000"
  }
});

let activeGames = [];

io.on("connection", (socket) => {
  socket.on("join game", (gameID) => {
    socket.join(gameID);
  });

  socket.on("move", (move) => {
    io.sockets.in(move.gameID).emit("move", move.move);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let gameState = {
  roomCounter:0,
  players: {},
  rooms:{},
}

const setNewPlayer = require('./utils/setNewPlayer');
const playerDisconnect = require('./utils/playerDisconnect');
const searchAvailableRoom = require('./utils/searchAvailableRoom');
const updateScenario = require('./utils/updateScenario');
function emitGameStateLoop(socket){
  if (gameState.players[socket.id]){
    gameState = updateScenario(gameState,socket.id)
    socket.emit("gameState", gameState.players[socket.id])
    //setTimeout(()=>{emitGameStateLoop(socket)},interval)
  }
}

let intervals = {};

io.on("connection", (socket) => {
  const playerId = socket.id;
  console.log(`Player ${playerId} Connected`);
  socket.emit('playerId', playerId);
  socket.broadcast.emit('playerConnect', playerId);
  gameState = searchAvailableRoom(gameState,playerId)
  gameState = setNewPlayer(gameState,socket,gameState.roomCounter)
  //emitGameStateLoop(socket,1000)
  intervals[playerId] = setInterval(() => emitGameStateLoop(socket), 500);
  socket.on('disconnect', function() {
    console.log(`Player ${playerId} Disconnected`);
    gameState = playerDisconnect(gameState,playerId);
    clearInterval(intervals[playerId]);
  });
});

server.listen(3000);
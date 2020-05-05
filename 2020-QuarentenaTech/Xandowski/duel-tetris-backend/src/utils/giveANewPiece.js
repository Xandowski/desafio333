function giveANewPiece(gameState,playerId){
    let player = gameState.players[playerId]
    player.matrixPosition = {x:3,y:0}
    player.collision = false
    return gameState
  }
module.exports = giveANewPiece;
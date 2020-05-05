const cleanMatrixGhost = require('./cleanMatrixGhost');
const giveANewPiece = require('./giveANewPiece');
const pinLastPiece = require('./pinLastPiece');

const matrix = [
    [1,1,1],
    [0,1,0],
  ];
  
function updateScenario(gameState,playerId){
    let player = gameState.players[playerId]
    if (player.gameOver){
      return gameState
    }
    if (player.collision){
        if(player.matrixPosition.y <= 1){
          console.log('game over')
          player.gameOver = true
          return gameState
        }
        console.log('shut up and give me a new piece')
        player.map = pinLastPiece(player.map)
        gameState = giveANewPiece(gameState,playerId)
      return gameState
    }
      player.map = cleanMatrixGhost(player.map)
      for (let y = 0; y < player.map.length; y++){
        if (y === player.matrixPosition.y){
          for (let x = 0; x < player.map[y].length; x++){
            if (x === player.matrixPosition.x){
              matrix.map((yArrayFromMatrix,yKeyFromMatrix)=>{
                yArrayFromMatrix.map((xValueFromMatrix,xKeyFromMatrix)=>{
                  
                  if (player.map[y+yKeyFromMatrix+1]){
                    let valueInPosition = player.map[y+yKeyFromMatrix+1][x+xKeyFromMatrix]
                    if (valueInPosition === 1 || valueInPosition === 2){   
                      player.map[y+yKeyFromMatrix][x+xKeyFromMatrix] = xValueFromMatrix
                      player.collision = true
                      return null
                  }}
  
                  if (player.map[y+yKeyFromMatrix][x+xKeyFromMatrix] === 0){ 
                    player.map[y+yKeyFromMatrix][x+xKeyFromMatrix] = xValueFromMatrix
                  } else (
                    player.collision = true
                  )
                  return null
                })
                return null
              })        
            }
          }
        }
      }
      if (matrix.length+player.matrixPosition.y < player.map.length){
        player.matrixPosition.y = player.matrixPosition.y+1
      } else {
        player.collision = true
      }
    return gameState
  }
module.exports = updateScenario;
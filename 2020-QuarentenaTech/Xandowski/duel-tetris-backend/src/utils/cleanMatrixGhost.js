function cleanMatrixGhost(playerScenario){
    for (let y = 0; y < playerScenario.length; y++){
      for (let x = 0; x < playerScenario[y].length; x++){
        if (playerScenario[y][x] === 1){
          playerScenario[y][x] = 0
        }
      }
    }
    return playerScenario
  }
module.exports = cleanMatrixGhost;
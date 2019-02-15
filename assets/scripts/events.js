const gameGrid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]
let player = 'x'
const endGame = []
let winnerFlag = false

function startGame (x, y) {
  if (player === 'x') {
    setTheGameMove(x, y, player)
    player = 'o'
    return 'x'
  } else {
    setTheGameMove(x, y, player)
    player = 'x'
    return 'o'
  }
}

function setTheGameMove (x, y, player) {
  gameGrid[x][y] = player
  endGame.push(player)
  checkForWin(player)
}

function checkForWin (player) {
  let winner
  if (player === 'x') {
    winner = 'WINNER IS X'
  } else {
    winner = 'WINNER IS O'
  }

  if (gameGrid[0][0] === player && gameGrid[0][1] === player && gameGrid[0][2] === player) {
    displayWinner(winner)
  } else

  if (gameGrid[1][0] === player && gameGrid[1][1] === player && gameGrid[1][2] === player) {
    displayWinner(winner)
  } else

  if (gameGrid[2][0] === player && gameGrid[2][1] === player && gameGrid[2][2] === player) {
    displayWinner(winner)
  } else

  if (gameGrid[0][0] === player && gameGrid[1][0] === player && gameGrid[2][0] === player) {
    displayWinner(winner)
  } else

  if (gameGrid[0][1] === player && gameGrid[1][1] === player && gameGrid[2][1] === player) {
    displayWinner(winner)
  } else

  if (gameGrid[0][2] === player && gameGrid[1][2] === player && gameGrid[2][2] === player) {
    displayWinner(winner)
  } else

  if (gameGrid[0][0] === player && gameGrid[1][1] === player && gameGrid[2][2] === player) {
    displayWinner(winner)
  } else

  if (gameGrid[0][2] === player && gameGrid[1][1] === player && gameGrid[2][0] === player) {
    displayWinner(winner)
  } else

  if (endGame.length === 9 && winnerFlag === false) {
    $('.player-status').text('TIE!!! TRY AGAIN')
  }
  if (winnerFlag) {
    $('table tr td').off('click')
  }
}

function displayWinner (winner) {
  $('.player-status').text(winner)
  winnerFlag = true
}

function resetGame () {
  player = 'x'
  winnerFlag = false
  $('.player-status').text('')
  $(this).text('')
}

module.exports = {
  startGame,
  resetGame
}

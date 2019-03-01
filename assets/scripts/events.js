const getFormFields = require('../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')

let player = 'X'
let gameGrid = ['', '', '', '', '', '', '', '', '']
let cellsOccupied = []
let validMove = false
let winnerFlag = false
let resetFlag = false
let newGame = false
let tie = false
let apiIndex = 0
let apiValue = ''
let apiOver = false

const onSignUp = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  api.signUp(formData)
    .then(ui.signUpSuccess)
    .catch(ui.authFailure)
}

const onSignIn = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  // console.log(formData)
  api.signIn(formData)
    .then(ui.signInSuccess)
    .catch(ui.authFailure)
}

const onSignOut = (event) => {
  event.preventDefault()
  resetGame()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.authFailure)
}

const onChangePassword = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  // console.log(formData)
  api.changePassword(formData)
    .then(ui.changePasswordSuccess)
    .catch(ui.failure)
}

const startGame = function (divid) {
  event.preventDefault()
  const $target = $(event.target)

  // Begin to play only after clicking start game button. Also after each game
  // (won or tie or reset in the middle) user has to click start game button to
  // play again

  if (winnerFlag || resetFlag || !newGame || tie) {
    $('.display-message').text('Press START to Play')
    return
  }
  // for each move update the gameGrid with the move and display on the screen
  // after each move check for win or tie
  // Update each move to API as well
  // switch player

  validMove = checkForValidMove(divid[3])
  if (validMove === false) {
    player === 'X' ? gameGrid[divid[3]] = 'X' : gameGrid[divid[3]] = 'O'
    cellsOccupied.push(divid[3])
    $($target).text(player).css('font-size', '25px')
    checkForWin(player)
    apiIndex = divid[3]
    apiValue = gameGrid[divid[3]]
    api.updateGame(apiIndex, apiValue, apiOver)
      .then(ui.onUpdateGameSuccess)
      .catch(ui.failure)
    player === 'X' ? player = 'O' : player = 'X'
    if (!winnerFlag && !tie) {
      $('.display-message').text('Your turn now ' + player)
    }
  } else {
    $('.display-message').text('Pick a different cell')
  }
}

// check for all win cases and tie
// If player won, update it on screen
// update API for win or TIE

const checkForWin = function (player) {
  const winner = player === 'X' ? 'WINNER IS X' : 'WINNER IS O'

  if (gameGrid[0] === player && gameGrid[1] === player && gameGrid[2] === player) {
    displayWinner(winner)
  } else

  if (gameGrid[3] === player && gameGrid[4] === player && gameGrid[5] === player) {
    displayWinner(winner)
  } else

  if (gameGrid[6] === player && gameGrid[7] === player && gameGrid[8] === player) {
    displayWinner(winner)
  } else

  if (gameGrid[0] === player && gameGrid[3] === player && gameGrid[6] === player) {
    displayWinner(winner)
  } else

  if (gameGrid[1] === player && gameGrid[4] === player && gameGrid[7] === player) {
    displayWinner(winner)
  } else

  if (gameGrid[2] === player && gameGrid[5] === player && gameGrid[8] === player) {
    displayWinner(winner)
  } else

  if (gameGrid[0] === player && gameGrid[4] === player && gameGrid[8] === player) {
    displayWinner(winner)
  } else

  if (gameGrid[2] === player && gameGrid[4] === player && gameGrid[6] === player) {
    displayWinner(winner)
  } else

  if (gameGrid.every(element => element === 'X' || element === 'O') && winnerFlag === false) {
    $('.display-message').text('TIE!!! TRY AGAIN')
    tie = true
    apiOver = true
  }
}

const checkForValidMove = function (move) {
  return cellsOccupied.includes(move)
}
// Display the winner

const displayWinner = function (winner) {
  $('.display-message').text(winner)
  winnerFlag = true
  apiOver = true
}

// reset game

const resetGame = function () {
  event.preventDefault()
  player = 'X'
  gameGrid = ['', '', '', '', '', '', '', '', '']
  cellsOccupied = []
  winnerFlag = false
  apiOver = false
  resetFlag = true
  tie = false
  $('.display-message').text('')
  $('.box').text('')
}

// Create a new game on api

const onNewGame = () => {
  event.preventDefault()
  resetGame()
  newGame = true
  resetFlag = false
  const form = event.target
  const formData = getFormFields(form)
  api.onNewGame(formData)
    .then(ui.onNewGame)
    .catch(ui.failure)
}

const apiGameDisplay = () => {
  api.onGetGameInfo()
    .then(ui.getGameInfoSuccess)
    .catch(ui.failure)
  api.onGetTrueGameInfo()
    .then(ui.getTrueGameInfoSuccess)
    .catch(ui.failure)
}

module.exports = {
  startGame,
  resetGame,
  onSignUp,
  onSignIn,
  onNewGame,
  onSignOut,
  onChangePassword,
  apiGameDisplay
}

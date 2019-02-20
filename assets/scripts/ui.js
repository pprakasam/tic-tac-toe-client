const store = require('./store.js')

const signUpSuccess = () => {
  $('form').trigger('reset')
  $('.user-message').text('Successfully Signed Up')
  setTimeout(() => {
    $('.user-message').text('')
  }, 3000)
}

const failure = () => {
  $('form').trigger('reset')
  $('.display-message').text('Error. Something went wrong!!')
}

const signInSuccess = (responseData) => {
  store.user = responseData.user
  $('.forms').css('display', 'none')
  $('.game-board').css('display', 'block')
  const userName = store.user.email.slice(0, (store.user.email.indexOf('@')))
  $('.user').text('Hello ' + userName)
}

const signOutSuccess = (responseData) => {
  $('form').trigger('reset')
  store.user = null
  $('.forms').css('display', 'block')
  $('.game-board').css('display', 'none')
  $('.games-played').text('Games played: ' + 0)
  $('.games-won').text('Games Won: ' + 0)
}

const onNewGame = (responseData) => {
  $('.player-status').text('Start Playing')
  store.game = responseData.game
  // console.log('responseData', store.game.id, store.game.cells)
}

const onUpdateGameSuccess = (responseData) => {
  store.game = responseData.game
  // console.log('responseData', store.game)
}

const changePasswordSuccess = () => {
  $('form').trigger('reset')
  $('.display-message').text('Password Changed Successfully')
  setTimeout(() => {
    $('.display-message').text('')
  }, 3000)
}

const getGameInfoSuccess = (responseData) => {
  // store.game = responseData.game
  // console.log(responseData)
  $('.games-played').text('Games played: ' + responseData.games.length)
}

const getTrueGameInfoSuccess = (responseData) => {
  // store.game = responseData.game
  // console.log(responseData)
  $('.games-won').text('Games Won: ' + responseData.games.length)
}

module.exports = {
  signUpSuccess,
  failure,
  signInSuccess,
  onNewGame,
  signOutSuccess,
  changePasswordSuccess,
  onUpdateGameSuccess,
  getGameInfoSuccess,
  getTrueGameInfoSuccess
}

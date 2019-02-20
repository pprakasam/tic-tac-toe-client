const store = require('./store.js')

const signUpSuccess = () => {
  $('form').trigger('reset')
  $('.user-message').text('Successfully Signed Up')
  setTimeout(() => {
    $('.user-message').text('')
  }, 3000)
}

const authFailure = () => {
  $('form').trigger('reset')
  $('.user-message').text('Error. Something went wrong!!')
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
  $('.games-played').text('Total Games: ' + '')
  $('.games-won').text('Games Won: ' + '')
}

const onNewGame = (responseData) => {
  $('.display-message').text('Start Playing')
  setTimeout(() => {
    $('.display-message').text('')
  }, 2000)
  store.game = responseData.game
  console.log('responseData', store.game.id, store.game.cell)
}

const onUpdateGameSuccess = (responseData) => {
  store.game = responseData.game
  console.log('responseData', store.game)
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
  console.log(responseData.games.length)
  $('.games-played').text('Total Games: ' + responseData.games.length)
}

const getTrueGameInfoSuccess = (responseData) => {
  // store.game = responseData.game
  // console.log(responseData)
  $('.games-won').text('Games Won: ' + responseData.games.length)
}

module.exports = {
  signUpSuccess,
  authFailure,
  failure,
  signInSuccess,
  onNewGame,
  signOutSuccess,
  changePasswordSuccess,
  onUpdateGameSuccess,
  getGameInfoSuccess,
  getTrueGameInfoSuccess
}

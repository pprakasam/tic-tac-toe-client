'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const events = require('./events.js')

$(() => {
  $('.sign-up').submit(events.onSignUp)
  $('.sign-in').submit(events.onSignIn)
  $('.sign-out').submit(events.onSignOut)
  $('.change-password').submit(events.onChangePassword)
  $('.start-button').on('click', events.onNewGame)
  $('.box').on('click', function () {
    events.startGame(this.id)
  })
  $('.reset-button').submit(events.resetGame)
  $('.dropdown-toggle').on('click', events.apiGameDisplay)
})

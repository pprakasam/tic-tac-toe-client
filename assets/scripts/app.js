'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const events = require('./events.js')
$(() => {
  // your JS code goes here
  $('table tr td').click(function () {
    const x = $(this).parent().index()
    const y = $(this).index()
    const setVariable = events.startGame(x, y)
    $(this).text(setVariable)
    $(this).off('click')
  })
  $('.reset-button').submit(events.resetGame)
})

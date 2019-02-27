const test = require('tape')
const hasTwoDashes = require('../lib/hasTwoDashes')

test('The hasTwoDashes function returns true if a string starts with "--".', t => {
  t.equal(hasTwoDashes('--ok'), true)
  t.equal(hasTwoDashes('-still-no'), false)
  t.end()
})

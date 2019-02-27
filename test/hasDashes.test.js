const test = require('tape')
const hasDashes = require('../lib/hasDashes')

test('The hasDashes function returns true if a string starts with "-".', t => {
  t.equal(hasDashes('-whatever'), true)
  t.equal(hasDashes('no'), false)
  t.end()
})

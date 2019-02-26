const test = require('tape')
const index = require('../index')

test('The index function returns undefined.', t => {
  t.equal(index(), undefined)
  t.end()
})

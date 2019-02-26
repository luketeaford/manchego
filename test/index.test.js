const test = require('tape')
const index = require('../index')

test('The index function returns an object with a settings array containing the command line arguments.', t => {
  const mockArgv = ['x', 'x', '-v']
  t.equal(index(mockArgv).settings[0], '-v')
  t.end()
})

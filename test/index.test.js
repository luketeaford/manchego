const test = require('tape')
const index = require('../index')

test('The index function returns an array containing the command line arguments.', t => {
  const mockArgv = ['x', 'x', '-v']
  t.equal(index(mockArgv)[0], '-v')
  t.end()
})

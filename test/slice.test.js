const test = require('tape')
const slice = require('../lib/slice')

test('The slice function does not modify the existing array.', t => {
  const mockArgv = ['a', 'b', 'c']
  slice(mockArgv)
  t.equal(mockArgv.length, 3)
  t.end()
})

test('The slice function returns a new array starting from index 2.', t => {
  const mockArgv = ['x', 'x', '0']
  t.equal(slice(mockArgv).length, 1)
  t.end()
})

const test = require('tape')
const part = require('../lib/part')

test('The part function takes an array and returns a function that takes a filter. The resulting function returns an object containing a pass array with all the items the filter passed and a fail array with all the items the filter rejected.', t => {
  const someArray = ['a', 1, 0, 'b', '1', -8, 'c']
  const actual = part(someArray)(x => typeof x === 'number')
  const { pass, fail } = actual
  t.equal(pass.includes(1), true)
  t.equal(pass.includes(0), true)
  t.equal(pass.includes(-8), true)
  t.equal(pass.length, 3)
  t.equal(fail.includes('a'), true)
  t.equal(fail.includes('b'), true)
  t.equal(fail.includes('1'), true)
  t.equal(fail.includes('c'), true)
  t.equal(fail.length, 4)
  t.equal(someArray.length, pass.length + fail.length)
  t.end()
})

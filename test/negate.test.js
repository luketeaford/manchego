const test = require('tape')
const negate = require('../lib/negate')

test('The negate function takes a function which returns a function that takes an argument. It negates the result of calling the function with the argument.', t => {
  t.equal(negate(() => true)(), false)
  t.equal(negate(() => false)(), true)
  t.equal(negate(x => x > 4)(11), false)
  t.equal(negate(x => x === 'foo')('foo'), false)
  t.equal(negate(x => x === 'foo')('bar'), true)
  t.equal(negate(negate(() => true))(), true)
  t.end()
})

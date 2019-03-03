const test = require('tape')
const pair = require('../lib/pair')

test('The pair function returns an object with a single letter command set to the space separated value that follows it.', t => {
  const actual = pair(['-a', 'apple'])
  t.equal(actual.a, 'apple')
  t.end()
})

test('The pair function returns an object with a single letter command set to true.', t => {
  const actual = pair(['-a', 'apple', '-b', '-c', '-def', '-g'])
  t.equal(actual.a, 'apple')
  t.equal(actual.b, true)
  t.equal(actual.c, true)
  t.equal(actual.d, true)
  t.equal(actual.e, true)
  t.equal(actual.f, true)
  t.equal(actual.g, true)
  t.end()
})

test('The pair function returns an object with commands declared with two dashes equal to true if no value is given.', t => {
  const actual = pair(['--whatever', '--fine=ok'])
  t.equal(actual.whatever, true)
  t.end()
})

test('The pair function returns an object with commands declared with two dashes to the value passed on the right of the equals sign.', t => {
  const actual = pair(['--bread=rye', '--foo', '--cheese=false'])
  t.equal(actual.bread, 'rye')
  t.equal(actual.foo, true)
  t.equal(actual.cheese, false)
  t.end()
})

test('The pair function returns an object with variadic arguments supported for the last parameter.', t => {
  const actual = pair(['--count=0', '-p', 'cat', 'dog', 'bird'])
  t.equal(actual.p, 'cat dog bird')
  t.end()
})

test('The pair function does not break with non-variadic arguments.', t => {
  const actual = pair(['-s', 'sun', '-ard', '--count=2'])
  t.equal(actual.s, 'sun')
  t.equal(actual.a, true)
  t.equal(actual.r, true)
  t.equal(actual.d, true)
  t.equal(actual.count, '2')
  t.end()
})

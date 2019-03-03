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

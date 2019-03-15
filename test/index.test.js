const test = require('tape')
const actualManchego = require('../index')

test('Manchego returns an object when called without an argument.', t => {
  const actual = actualManchego()
  t.equal(actual && typeof actual === 'object', true)
  t.end()
})

test('Manchego expects to receive process.argv, an array, so it ignores the first two items in the array which are not provided by user input.', t => {
  const actual = actualManchego(['-a', '-b', '-c'])
  t.equal(actual.a, undefined)
  t.equal(actual.b, undefined)
  t.equal(actual.c, true)
  t.end()
})

// Mimick process.argv by adding two args to simplify test data
const manchego = arr => actualManchego(['x', 'x', ...arr])

test('Manchego takes an array and returns an object with a key named by the first item in the array that precedes the first option in the array set to true.', t => {
  const actual = manchego(['help'])
  t.equal(actual.help, true)
  t.end()
})

test('Manchego takes an array and returns an object with any keys named by the items in the array set to true that precede the first option in the array.', t => {
  const actual = manchego(['help', 'hide'])
  t.equal(actual.help, true)
  t.equal(actual.hide, true)
  t.end()
})

test('Manchego takes an array and returns an object with any keys named by the items in the array set to true that precede the first option in the array.', t => {
  const actual = manchego(['help', 'hide', '-a', 'foo'])
  t.equal(actual.help, true)
  t.equal(actual.hide, true)
  t.equal(actual.a, 'foo')
  t.equal(actual.foo, undefined)
  t.end()
})

// TODO REVISE BELOW THIS POINT
test('Manchego returns an object with any argument that precedes the first option set to true.', t => {
  const actual = manchego(['help', 'butterfly', '-x', 'chill'])
  t.equal(actual.help, true)
  t.equal(actual.butterfly, true)
  t.equal(actual.x, 'chill')
  t.equal(actual.chill, undefined)
  t.end()
})

test('Manchego returns an object with single letter options set to the argument that follows it.', t => {
  const actual = manchego(['-a', 'apple', '-v', 'golden delicious'])
  t.equal(actual.a, 'apple')
  t.equal(actual.v, 'golden delicious')
  t.end()
})

test('Manchego returns an object containing keys matching single letter options set to true if the key is not followed by an argument. Individual parameters can be grouped if there is no argument that follows (e.g., -def is equivalent to -d -e -f).', t => {
  const actual = manchego(['-a', 'apple', '-b', '--cool', '-c', '--dog-food=yum', '-def', '-g'])
  t.equal(actual.a, 'apple')
  t.equal(actual.b, true)
  t.equal(actual.cool, true)
  t.equal(actual.c, true)
  t.equal(actual.dogFood, 'yum')
  t.equal(actual.d, true)
  t.equal(actual.e, true)
  t.equal(actual.f, true)
  t.equal(actual.g, true)
  t.end()
})

test('Manchego returns an object containing keys matching single letter options set to true if the key is not followed by an argument. Single letter options can be grouped together if no option follows (e.g., -def is equivalent to -d -e -f).', t => {
  const actual = manchego(['-abc'])
  t.equal(actual.a, true)
  t.equal(actual.b, true)
  t.equal(actual.c, true)
  t.end()
})

test('The index function returns an object containing keys matching commands declared with two dashes equal to the value to the right of the equals sign. If no value is provided, it will be set to true. If the command is hyphenated, it will be stored camelCase instead.', t => {
  const actual = manchego(['--whatever', '--bread=rye', '--cool-urls', '--cheese=false'])
  t.equal(actual.whatever, true)
  t.equal(actual.bread, 'rye')
  t.equal(actual.coolUrls, true)
  t.equal(actual.cheese, 'false')
  t.end()
})

test('The index function returns an object where two dashes can have space separated values too.', t => {
  const actual = manchego(['--sure', 'cool', '--fine', 'whatever'])
  t.equal(actual.sure, 'cool')
  t.equal(actual.fine, 'whatever')
  t.end()
})

test('The index function returns an object with variadic arguments supported for the last single dash parameter (e.g, -t thing1 thing2 thing3 will return a "t" key with the value "thing1 thing2 thing3").', t => {
  const actual = manchego(['--count=0', '-p', 'cat', 'dog', 'bird'])
  t.equal(actual.p, 'cat dog bird')
  t.end()
})

test('The index function returns an object with variadic arguments supported for the last single dash parameter. If the last single dash parameter is passed a space separated value and then a dash command follows, it will not be treated as a variadic argument.', t => {
  const actual = manchego(['-t', 'something', '--cool-food=false'])
  t.equal(actual.t, 'something')
  t.equal(actual.coolFood, 'false')
  t.end()
})

test('The index function supports variadic arguments for double dash commands.', t => {
  const actual = manchego(['-a', '-b', '--marx-bros', 'groucho', 'harpo', 'chico'])
  t.equal(actual.a, true)
  t.equal(actual.b, true)
  t.equal(actual.marxBros, 'groucho harpo chico')
  t.end()
})

test('The examples in the documentation work.', t => {
  const actual = manchego(['-a', 'ant', '-bd', '--cool-urls', '--file=x.js', '-z', 'zappa', 'zebra', 'zoo'])
  t.equal(actual.a, 'ant')
  t.equal(actual.b && actual.d, true)
  t.equal(actual.coolUrls, true)
  t.equal(actual.file, 'x.js')
  t.equal(actual.z, 'zappa zebra zoo')
  t.end()
})

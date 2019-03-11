const test = require('tape')
const actualIndex = require('../index')

test('The index function expects to receive process.argv, so it ignores the first two items in the array.', t => {
  const actual = actualIndex(['-a', '-b', '-c'])
  t.equal(actual.a, undefined)
  t.equal(actual.b, undefined)
  t.equal(actual.c, true)
  t.end()
})

// Adds 2 args to mimick process.argv and simplify test data
const index = arr => actualIndex(['x', 'x', ...arr])

test('The index function returns an object with any words that precede a command that begins with a dash set to true.', t => {
  const actual = index(['help', 'butterfly', '-x', 'chill'])
  t.equal(actual.help, true)
  t.equal(actual.butterfly, true)
  t.equal(actual.chill, undefined)
  t.equal(actual.x, 'chill')
  t.end()
})

test('The index function returns an object with any words that precede a command that begins with a dash set to true even if there are no commands that begin with a dash.', t => {
  const actual = index(['help'])
  t.equal(actual.help, true)
  t.end()
})

test('The index function returns an object with a single letter command set to the space separated value that follows it.', t => {
  const actual = index(['-a', 'apple'])
  t.equal(actual.a, 'apple')
  t.end()
})

test('The index function returns an object containing keys matching single letter commands set to true if the value that follows it is not separated with a space. Individual parameters can be grouped if there is no argument that follows (e.g., -def is equivalent to -d -e -f).', t => {
  const actual = index(['-a', 'apple', '-b', '-c', '-def', '-g'])
  t.equal(actual.a, 'apple')
  t.equal(actual.b, true)
  t.equal(actual.c, true)
  t.equal(actual.d, true)
  t.equal(actual.e, true)
  t.equal(actual.f, true)
  t.equal(actual.g, true)
  t.end()
})

test('The index function returns an object containing keys matching commands declared with two dashes equal to the value to the right of the equals sign. If no value is provided, it will be set to true. If the command is hyphenated, it will be stored camelCase instead.', t => {
  const actual = index(['--whatever', '--bread=rye', '--cool-urls', '--cheese=false'])
  t.equal(actual.whatever, true)
  t.equal(actual.bread, 'rye')
  t.equal(actual.coolUrls, true)
  t.equal(actual.cheese, 'false')
  t.end()
})

test('The index function returns an object with variadic arguments supported for the last single dash parameter (e.g, -t thing1 thing2 thing3 will return a "t" key with the value "thing1 thing2 thing3").', t => {
  const actual = index(['--count=0', '-p', 'cat', 'dog', 'bird'])
  t.equal(actual.p, 'cat dog bird')
  t.end()
})

test('This weird bug with dash commands being treated like variadic arguments.', t => {
  const actual = index(['-t', 'something', '--cool-food=false'])
  t.equal(actual.t, true)
  t.equal(actual.coolFood, 'false')
  t.end()
})

test('The examples in the documentation work.', t => {
  const actual = index(['-a', 'ant', '-bd', '--cool-urls', '--file=x.js', '-z', 'zappa', 'zebra', 'zoo'])
  t.equal(actual.a, 'ant')
  t.equal(actual.b && actual.d, true)
  t.equal(actual.coolUrls, true)
  t.equal(actual.file, 'x.js')
  t.equal(actual.z, 'zappa zebra zoo')
  t.end()
})

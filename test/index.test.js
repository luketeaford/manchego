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

// Mimic process.argv by adding two args to simplify test data
const manchego = arr => actualManchego(['x', 'x', ...arr])

test('Manchego stores arguments to options as strings.', t => {
  const actual = manchego(['-a', 'true', '-b', 'false', '--c=0', '--d=false'])
  t.equal(actual.a, 'true')
  t.equal(actual.b, 'false')
  t.equal(actual.c, '0')
  t.equal(actual.d, 'false')
  t.end()
})

test('An argument in the array that precedes the first option in the array is set to true.', t => {
  const actual = manchego(['help'])
  t.equal(actual.help, true)
  t.end()
})

// TODO Fix this bug
test('Variadic arguments are only applied to single- or double-hyphen options.', t => {
  const actual = manchego(['say', '-xy'])
  t.equal(actual.say, true)
  t.equal(actual.x, true)
  t.equal(actual.y, true)
  t.end()
})

test('Any arguments in the array that precede the first option are set to true.', t => {
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

test('Single letter options are set to true if not followed by an argument.', t => {
  const actual = manchego(['-w'])
  t.equal(actual.w, true)
  t.end()
})

test('Single letter options are set to the argument that follows them in the array.', t => {
  const actual = manchego(['-a', 'apple', '-v', 'golden delicious'])
  t.equal(actual.a, 'apple')
  t.equal(actual.v, 'golden delicious')
  t.end()
})

test('Single letter options can be grouped together (e.g., -def is equivalent to -d -e -f).', t => {
  const actual = manchego(['-abc'])
  t.equal(actual.a, true)
  t.equal(actual.b, true)
  t.equal(actual.c, true)
  t.end()
})

test('Variadic arguments can be passed to the last single letter option.', t => {
  const actual = manchego(['-g', 'grape', 'gorilla', 'glue'])
  t.equal(actual.g, 'grape gorilla glue')
  t.equal(actual.grape, undefined)
  t.equal(actual.gorilla, undefined)
  t.equal(actual.glue, undefined)
  t.end()
})

test('Variadic arguments can be passed to the first single letter option of the last group of single letter options.', t => {
  const actual = manchego(['-gar', 'grape', 'gorilla', 'glue'])
  t.equal(actual.a, true)
  t.equal(actual.r, true)
  t.equal(actual.g, 'grape gorilla glue')
  t.equal(actual.grape, undefined)
  t.equal(actual.gorilla, undefined)
  t.equal(actual.glue, undefined)
  t.end()
})

test('An option beginning with a double-hyphen is set to true if it does not contain an equals sign.', t => {
  const actual = manchego(['--ears'])
  t.equal(actual.ears, true)
  t.end()
})

test('An option beginning with a double-hyphen and separated with other hyphens will be stored in camelCase.', t => {
  const actual = manchego(['--the-velvet-underground'])
  t.equal(actual.theVelvetUnderground, true)
  t.end()
})

test('An option beginning with a double-hyphen that does not contain an equals sign is set to the argument that follows it.', t => {
  const actual = manchego(['--stone', 'cold'])
  t.equal(actual.stone, 'cold')
  t.end()
})

test('An option beginning with a double-hyphen and containing an equals sign is set to the value following the equal sign.', t => {
  const actual = manchego(['--calculator=solar powered', 'no'])
  t.equal(actual.calculator, 'solar powered')
  t.equal(actual.no, undefined)
  t.end()
})

test('The last option that begins with a double-hyphen can accept variadic arguments.', t => {
  const actual = manchego(['--cat', 'nip', 'nap', 'burglar'])
  t.equal(actual.cat, 'nip nap burglar')
  t.equal(actual.nip, undefined)
  t.equal(actual.nap, undefined)
  t.equal(actual.burglar, undefined)
  t.end()
})

test('Variadic arguments cannot be set to an option that contains an equals sign.', t => {
  const actual = manchego(['--cat=siamese', 'nip', 'nap', 'burglar'])
  t.equal(actual.cat, 'siamese')
  t.equal(actual.nip, undefined)
  t.equal(actual.nap, undefined)
  t.equal(actual.burglar, undefined)
  t.end()
})

test('Variadic arguments can be passed to the last option that begins with a double-hyphen.', t => {
  const actual = manchego(['--kitten', '--cat', 'nip', 'nap', 'burglar'])
  t.equal(actual.kitten, true)
  t.equal(actual.cat, 'nip nap burglar')
  t.equal(actual.nip, undefined)
  t.equal(actual.nap, undefined)
  t.equal(actual.burglar, undefined)
  t.end()
})

test('Options beginning with a double-hyphen are set to true if they do not have an argument.', t => {
  const actual = manchego(['--air-guitar', '--synth'])
  t.equal(actual.airGuitar, true)
  t.equal(actual.synth, true)
  t.end()
})

test('Options beginning with a double-hyphen are set to the values of the arguments supplied by spaces.', t => {
  const actual = manchego(['--sausage', 'bratwurst', '--pasta', 'ravioli'])
  t.equal(actual.sausage, 'bratwurst')
  t.equal(actual.pasta, 'ravioli')
  t.end()
})

test('Options beginning with a double-hyphen and containing an equals sign are set to the values to the right of the equals sign.', t => {
  const actual = manchego(['--candy-bar=chocolate', '--arf=dog-sound'])
  t.equal(actual.candyBar, 'chocolate')
  t.equal(actual.arf, 'dog-sound')
  t.end()
})

test('When a mix of single- and double-hyphen options is supplied and there are variadic arguments, they are applied to the last option.', t => {
  const setA = manchego(['-m', '--marx-bros', 'groucho', 'chico', 'harpo'])
  t.equal(setA.m, true)
  t.equal(setA.marxBros, 'groucho chico harpo')
  const setB = manchego(['--marx-bros', '-m', 'groucho', 'chico', 'harpo'])
  t.equal(setB.marxBros, true)
  t.equal(setB.m, 'groucho chico harpo')
  t.end()
})

test.skip('The examples in the documentation work.', t => {
  const actual = manchego(['say', '-a', 'ant', '-bd', '--cool-urls', '--file=x.js', '-z', 'zappa', 'zebra', 'zoo'])
  t.equal(actual.say, true)
  t.equal(actual.a, 'ant')
  t.equal(actual.b && actual.d, true)
  t.equal(actual.coolUrls, true)
  t.equal(actual.file, 'x.js')
  t.equal(actual.z, 'zappa zebra zoo')
  t.end()
})

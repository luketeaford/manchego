const test = require('tape')
const toCamelCase = require('../lib/toCamelCase')

test('The toCamelCase function returns a string with hyphens removed and the first letter following the hyphen capitalized.', t => {
  const actual = toCamelCase('some-string-with-however-many-hyphens')
  const expected = 'someStringWithHoweverManyHyphens'
  t.equal(actual, expected)
  t.end()
})

test('The toCamelCase function does not modify a string without hyphens.', t => {
  const actual = toCamelCase('whatever')
  const expected = 'whatever'
  t.equal(actual, expected)
  t.end()
})

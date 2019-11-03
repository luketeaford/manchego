const compose = require('./lib/compose')
const convertBooleans = require('./lib/convertBooleans')
const hasHyphens = require('./lib/hasHyphens')
const hasZeroHyphens = require('./lib/hasZeroHyphens')
const makeParser = require('./lib/makeParser')

const hasOneHyphen = x => x.startsWith('-') && !x.startsWith('--')
const hasTwoHyphens = x => x.startsWith('--')

const manchego = argv => {
  if (!(argv && argv.slice)) return {}

  const arr = argv.slice(2)
  const output = {}
  const addToOutput = (key, value) => Object.assign(output, { [key]: value })

  const parse = makeParser(arr, addToOutput)
  const hyphenArray = arr.filter(hasHyphens)

  arr.filter(hasZeroHyphens).forEach(parse())
  hyphenArray.filter(hasOneHyphen).forEach(parse('-'))
  hyphenArray.filter(hasTwoHyphens).forEach(parse('--'))

  return output
}

module.exports = manchego
module.exports.convertBooleans = compose(convertBooleans, manchego)

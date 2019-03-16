const hasDashes = require('./lib/hasDashes')
const hasZeroDashes = require('./lib/hasZeroDashes')
const makeParser = require('./lib/makeParser')

const hasOneDash = x => x.startsWith('-') && !x.startsWith('--')
const hasTwoDashes = x => x.startsWith('--')

const manchego = argv => {
  if (!(argv && argv.slice)) return {}

  const arr = argv.slice(2)
  const output = {}
  const addToOutput = (key, value) => Object.assign(output, { [key]: value })

  const dashParser = makeParser(arr, addToOutput)
  const dashArr = arr.filter(hasDashes)

  arr.filter(hasZeroDashes).forEach(dashParser())
  dashArr.filter(hasOneDash).forEach(dashParser('-'))
  dashArr.filter(hasTwoDashes).forEach(dashParser('--'))

  return output
}

module.exports = manchego

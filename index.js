const joinNextValuesOf = require('./lib/joinNextValuesOf')
const toCamelCase = require('./lib/toCamelCase')

const hasDashes = x => x.startsWith('-')
const hasZeroDashes = x => !x.startsWith('-')
const hasOneDash = x => x.startsWith('-') && !x.startsWith('--')
const hasTwoDashes = x => x.startsWith('--')

const manchego = argv => {
  if (!(argv && argv.slice)) return {}

  const arr = argv.slice(2)
  const output = {}
  const addToOutput = (key, value) => Object.assign(output, { [key]: value })

  const firstOption = arr.findIndex(hasDashes)
  const hasOptions = firstOption >= 0

  const parseZeroDashes = x => {
    if (!hasOptions || arr.indexOf(x) < firstOption) {
      addToOutput(x, true)
    }
  }

  arr.filter(hasZeroDashes).forEach(parseZeroDashes)

  const joinStringsAfter = joinNextValuesOf(arr, hasZeroDashes)

  const parseOneDash = (x, index, oneDashArr) => {
    const cmd = x.split('-')[1]
    const nextValue = arr[arr.indexOf(x) + 1]
    const isCombined = cmd.length > 1

    addToOutput(cmd[0], !nextValue || (nextValue && nextValue.startsWith('-'))
      ? true
      : index === oneDashArr.length - 1
        ? joinStringsAfter(x)
        : nextValue
    )

    if (isCombined) parseOneDash(`-${cmd.slice(1)}`)
  }

  arr.filter(hasOneDash).forEach(parseOneDash)

  const parseTwoDashes = (x, index, twoDashArr) => {
    const cmd = x.split('--')[1]
    const splitCmd = cmd.split('=')
    const nextValue = arr[arr.indexOf(x) + 1]

    const spaceValues = !nextValue || (nextValue && nextValue.startsWith('-'))
      ? true
      : index === twoDashArr.length - 1
        ? joinStringsAfter(x)
        : nextValue

    addToOutput(toCamelCase(splitCmd[0]), splitCmd[1] || spaceValues)
  }

  arr.filter(hasTwoDashes).forEach(parseTwoDashes)

  return output
}

module.exports = manchego

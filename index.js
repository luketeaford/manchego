const toCamelCase = require('./lib/toCamelCase')

const hasDashes = x => x.startsWith('-')
const hasZeroDashes = x => !x.startsWith('-')
const hasOneDash = x => x.startsWith('-') && !x.startsWith('--')
const hasTwoDashes = x => x.startsWith('--')

const index = argv => {
  if (!(argv && argv.slice)) return {}

  const arr = argv.slice(2)
  const output = {}
  const assignToOutput = xObj => Object.assign(output, xObj)

  const parseZeroDashes = x => {
    if (arr.indexOf(x) <= Math.max(0, arr.findIndex(hasDashes))) {
      assignToOutput({ [x]: true })
    }
  }

  arr.filter(hasZeroDashes).forEach(parseZeroDashes)

  const parseOneDash = (x, index, oneDashArr) => {
    const cmd = x.split('-')[1]
    const nextValue = arr[arr.indexOf(x) + 1]
    const isCombined = cmd.length > 1

    assignToOutput({
      [cmd[0]]: !nextValue || (nextValue && nextValue.startsWith('-'))
        ? true
        : index === oneDashArr.length - 1
          ? arr
            .slice(arr.indexOf(x) + 1)
            .filter(hasZeroDashes)
            .join(' ')
          : nextValue
    })

    if (isCombined) parseOneDash(`-${cmd.slice(1)}`)
  }

  arr.filter(hasOneDash).forEach(parseOneDash)

  const parseTwoDashes = x => {
    const cmd = x.split('--')[1]
    const splitCmd = cmd.split('=')
    const nextValue = arr[arr.indexOf(x) + 1]
    const spaceSeparatedValue = nextValue && hasZeroDashes(nextValue)
      ? nextValue
      : true

    assignToOutput({
      [toCamelCase(splitCmd[0])]: splitCmd[1] || spaceSeparatedValue
    })
  }

  arr.filter(hasTwoDashes).forEach(parseTwoDashes)

  return output
}

module.exports = index

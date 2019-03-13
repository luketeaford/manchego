const toCamelCase = require('./lib/toCamelCase')

const hasNoDashes = x => !x.startsWith('-')
const hasDashes = x => x.startsWith('-')
const hasOneDash = x => x.startsWith('-') && !x.startsWith('--')
const hasTwoDashes = x => x.startsWith('--')

const index = argv => {
  if (!(argv && argv.slice)) return {}

  const arr = argv.slice(2)
  const output = {}
  const assignToOutput = xObj => Object.assign(output, xObj)

  const zeroDashArr = arr.filter(hasNoDashes)
  const oneDashArr = arr.filter(hasOneDash)
  const twoDashArr = arr.filter(hasTwoDashes)

  const parseZeroDashes = x => {
    if (arr.indexOf(x) <= Math.max(0, arr.findIndex(hasDashes))) {
      assignToOutput({ [x]: true })
    }
  }

  zeroDashArr.forEach(parseZeroDashes)

  const parseOneDash = (x, index) => {
    const cmd = x.split('-')[1]
    const nextValue = arr[arr.indexOf(x) + 1]
    const isLong = cmd.length > 1

    assignToOutput({
      [cmd[0]]: !nextValue || (nextValue && nextValue.startsWith('-'))
        ? true
        : index === oneDashArr.length - 1
          ? arr
            .slice(arr.indexOf(x) + 1)
            .filter(hasNoDashes)
            .join(' ')
          : nextValue
    })

    if (isLong) parseOneDash(`-${cmd.slice(1)}`)
  }

  oneDashArr.forEach(parseOneDash)

  const parseTwoDashes = x => {
    const cmd = x.split('--')[1]
    const splitCmd = cmd.split('=')

    assignToOutput({ [toCamelCase(splitCmd[0])]: splitCmd[1] || true })
  }

  twoDashArr.forEach(parseTwoDashes)

  return output
}

module.exports = index

const hasDashes = require('./hasDashes')
const hasZeroDashes = require('./hasZeroDashes')
const joinNextValuesOf = require('./joinNextValuesOf')
const toCamelCase = require('./toCamelCase')

const makeParser = (arr, cbFn) => ctrlChar => {
  const parseZeroDashes = x => {
    const firstOption = arr.findIndex(hasDashes)
    const hasOptions = firstOption >= 0

    if (!hasOptions || arr.indexOf(x) < firstOption) cbFn(x, true)
  }

  if (!ctrlChar) return parseZeroDashes

  const isOneDash = ctrlChar === '-'

  const parseFn = (x, index, xArr) => {
    const cmd = x.split(ctrlChar)[1]
    const splitCmd = cmd.split('=')
    const nextValue = arr[arr.indexOf(x) + 1]
    const isCombined = isOneDash && cmd.length > 1
    const keyName = isOneDash
      ? cmd[0]
      : toCamelCase(splitCmd[0])
    const value = !nextValue || (nextValue && nextValue.startsWith('-'))
      ? true
      : index === xArr.length - 1
        ? joinNextValuesOf(arr, hasZeroDashes)(x)
        : nextValue

    cbFn(keyName, splitCmd[1] || value)

    if (isCombined) parseFn(`-${cmd.slice(1)}`)
  }

  return parseFn
}

module.exports = makeParser

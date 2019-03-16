const hasHyphens = require('./hasHyphens')
const hasZeroHyphens = require('./hasZeroHyphens')
const joinNextValuesOf = require('./joinNextValuesOf')
const toCamelCase = require('./toCamelCase')

const makeParser = (arr, cbFn) => ctrlChar => {
  const parseZeroHyphens = x => {
    const firstOption = arr.findIndex(hasHyphens)
    const hasOptions = firstOption >= 0

    if (!hasOptions || arr.indexOf(x) < firstOption) cbFn(x, true)
  }

  if (!ctrlChar) return parseZeroHyphens

  const isOneHyphen = ctrlChar === '-'

  const parseFn = (x, index, xArr) => {
    const cmd = x.split(ctrlChar)[1]
    const splitCmd = cmd.split('=')
    const isCombined = isOneHyphen && cmd.length > 1
    const indexOfX = arr.indexOf(x)
    const isInArray = indexOfX >= 0
    const nextValue = isInArray && arr[indexOfX + 1]
    const keyName = isOneHyphen
      ? cmd[0]
      : toCamelCase(splitCmd[0])
    const value = !nextValue || (nextValue && nextValue.startsWith('-'))
      ? true
      : index === xArr.length - 1
        ? joinNextValuesOf(arr, hasZeroHyphens)(x)
        : nextValue

    cbFn(keyName, splitCmd[1] || value)

    if (isCombined) parseFn(`-${cmd.slice(1)}`, index, xArr)
  }

  return parseFn
}

module.exports = makeParser

const part = require('./lib/part')
const toCamelCase = require('./lib/toCamelCase')

const negate = fn => x => !fn(x)
const hasDashes = x => x.startsWith('-')
const hasTwoDashes = x => x.startsWith('--')

const index = argv => {
  const arr = argv.slice(2)
  const obj = {}
  const objFn = name => Object.assign(obj, name)

  const zeroDashArr = arr.filter(negate(hasDashes))

  const dashArrays = part(arr.filter(hasDashes))(hasTwoDashes)
  const oneDashArr = dashArrays.fail
  const twoDashArr = dashArrays.pass

  const parseZeroDashes = x => {
    if (arr.indexOf(x) < arr.findIndex(hasDashes)) {
      objFn({ [x]: true })
    }
  }

  zeroDashArr.forEach(parseZeroDashes)

  const parseOneDash = x => {
    const cmd = x.split('-')[1]
    const nextValue = arr[arr.indexOf(x) + 1]
    const isLong = cmd.length > 1

    objFn({
      [cmd[0]]: !nextValue || (nextValue && nextValue.startsWith('-'))
        ? true
        : oneDashArr.indexOf(x) === oneDashArr.length - 1
          ? arr.slice(arr.indexOf(x) + 1).join(' ')
          : nextValue
    })

    if (isLong) {
      parseOneDash(`-${cmd.slice(1)}`)
    }
  }

  oneDashArr.forEach(parseOneDash)

  const parseTwoDashes = x => {
    const cmd = x.split('--')[1]
    const splitCmd = cmd.split('=')

    objFn({ [toCamelCase(splitCmd[0])]: splitCmd[1] || true })
  }

  twoDashArr.forEach(parseTwoDashes)

  return obj
}

module.exports = index

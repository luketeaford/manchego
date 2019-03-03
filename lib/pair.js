const hasDashes = require('./hasDashes')
const hasTwoDashes = require('./hasTwoDashes')
const part = require('./part')

const pair = arr => {
  const obj = {}
  const objFn = n => Object.assign(obj, n)

  const dashArrays = part(arr.filter(hasDashes))(hasTwoDashes)
  const oneDashArr = dashArrays.fail
  const twoDashArr = dashArrays.pass

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

    objFn({
      [splitCmd[0]]: splitCmd[1]
        ? splitCmd[1] !== 'false' && splitCmd[1]
        : true
    })
  }

  twoDashArr.forEach(parseTwoDashes)

  return obj
}

module.exports = pair

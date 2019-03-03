const hasDashes = require('./hasDashes')
const hasTwoDashes = require('./hasTwoDashes')
const part = require('./part')

const setProp = obj => (n, p) => Object.defineProperty(obj, n, p)

const pair = arr => {
  const objFn = setProp({})
  const obj = objFn(null, {})

  const bzz = part(arr.filter(hasDashes))(hasTwoDashes)
  const oneDashArr = bzz.fail
  const twoDashArr = bzz.pass

  const parseOneDash = x => {
    const cmd = x.split('-')[1]
    const nextValue = arr[arr.indexOf(x) + 1]
    const isLong = cmd.length > 1
    objFn(cmd[0], {
      value: !nextValue || (nextValue && nextValue.startsWith('-'))
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
    const foo = cmd.split('=')
    objFn(foo[0], {
      value: foo[1]
        ? foo[1] !== 'false' && foo[1]
        : true
    })
  }

  twoDashArr.forEach(parseTwoDashes)

  return obj
}

module.exports = pair

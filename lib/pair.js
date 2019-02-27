const hasDashes = require('./hasDashes')
const hasTwoDashes = require('./hasTwoDashes')
const part = require('./part')

const setProp = obj => (n, p) => Object.defineProperty(obj, n, p)

const pair = arr => {
  const objFn = setProp({})
  const obj = objFn(null, {})

  const bzz = part(arr.filter(hasDashes))(hasTwoDashes)
  const oneDashArr = bzz.fail
  // const twoDashArr = bzz.pass

  const parseOneDash = x => {
    const cmd = x.split('-')[1]
    const nextValue = arr[arr.indexOf(x) + 1]
    const isLong = cmd.length > 1
    objFn(cmd[0], {
      value: !nextValue || (nextValue && nextValue.startsWith('-'))
        ? true
        : nextValue
    })
    if (isLong) {
      parseOneDash(`-${cmd.slice(1)}`)
    }
  }

  oneDashArr.forEach(parseOneDash)

  return obj
}

module.exports = pair

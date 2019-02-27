const setProp = obj => (n, p) => Object.defineProperty(obj, n, p)

const pair = arr => {
  const objFn = setProp({})
  const obj = objFn(null, {})

  const parseOneDash = x => {
    if (x.startsWith('-')) {
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
  }

  // TODO It does make sense to split into one/two/zero dash functions
  // but they have to refer to their position in the original array
  arr.forEach(parseOneDash)
  return obj
}

module.exports = pair

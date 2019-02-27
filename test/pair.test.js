const test = require('tape')

const setProp = obj => (n, p) => Object.defineProperty(obj, n, p)

const pair = arr => {
  const objFn = setProp({})
  const obj = objFn(null, {})

  const foo = x => {
    if (x.startsWith('-')) {
      const cmd = x.split('-')[1]
      const nextValue = arr[arr.indexOf(x) + 1]
      const isLong = cmd.length > 1
      objFn(cmd[0], {
        value: isLong || (nextValue && nextValue.startsWith('-'))
          ? true
          : nextValue
      })
      if (isLong) {
        foo(`-${cmd.slice(1)}`)
      }
    }
  }

  arr.forEach(foo)
  return obj
}

test('The pair function returns an object with a single letter command set to true.', t => {
  const actual = pair(['-a', 'apple', '-b', '-c', '-def'])
  t.equal(actual.a, 'apple')
  t.equal(actual.b, true)
  t.equal(actual.c, true)
  t.equal(actual.d, true)
  t.equal(actual.e, true)
  t.equal(actual.f, true)
  t.end()
})

// ROUGH DRAFT
// const pair = settings => {
//   const obj = {}
//   settings.forEach(cmd => {
//     if (cmd.startsWith('--')) {
//       const splitName = cmd.substring(2).split('=')
//       obj[splitName[0]] = splitName[1] || true
//     } else {
//       if (cmd.startsWith('-')) {
//         if (cmd.length > 1) {
//           for (let i = 1; i < cmd.length; i += 1) {
//             obj[cmd[i]] = true
//           }
//         }
//         const nextValue = settings[settings.indexOf(cmd) + 1]
//         obj[cmd.substring(1)] = nextValue.startsWith('-') ? true : nextValue
//       }
//     }
//   })
//   return obj
// }

// test('The pair function breaks command line arguments into key/value pairs.', t => {
//   const actual = pair(['-c', 'cool', '--whatever=fine', '-x', '--sure'])
//   t.equal(actual.c, 'cool')
//   t.equal(actual.x, true)
//   t.equal(actual.whatever, 'fine')
//   t.equal(actual.sure, true)
//   t.end()
// })

// test('The pair function allows short commands to be combined.', t => {
//   const actual = pair(['-zRkbt', 'tomato'])
//   console.log(actual)
//   t.equal(actual.z, true)
//   t.equal(actual.R, true)
//   t.end()
// })

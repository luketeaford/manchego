const test = require('tape')
const pair = require('../lib/pair')

test('The pair function returns an object with a single letter command set to the space separated value that follows it.', t => {
  const actual = pair(['-a', 'apple'])
  t.equal(actual.a, 'apple')
  t.end()
})

test('The pair function returns an object with a single letter command set to true.', t => {
  const actual = pair(['-a', 'apple', '-b', '-c', '-def', '-g'])
  t.equal(actual.a, 'apple')
  t.equal(actual.b, true)
  t.equal(actual.c, true)
  t.equal(actual.d, true)
  t.equal(actual.e, true)
  t.equal(actual.f, true)
  t.equal(actual.g, true)
  t.end()
})

test('The pair function returns an object with commands declared with two dashes equal to true if no value is given.', t => {
  const actual = pair(['--whatever', '--fine'])
  t.equal(actual.whatever, true)
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

const test = require('tape')

const hasDashes = x => x.startsWith('-')

test('The hasDashes function returns true if a string starts with "-".', t => {
  t.equal(hasDashes('-whatever'), true)
  t.equal(hasDashes('no'), false)
  t.end()
})

const hasTwoDashes = x => x.startsWith('--')

test('The hasTwoDashes function returns true if a string starts with "--".', t => {
  t.equal(hasTwoDashes('--ok'), true)
  t.equal(hasTwoDashes('-still-no'), false)
  t.end()
})

const part = arr => filter => {
  const fail = arr.filter(x => !filter(x))
  const pass = arr.filter(filter)
  return {
    fail,
    pass
  }
}

test('The part function takes an array and returns a function that takes a filter. The resulting function returns an object containing a pass key with all the items in the array the filter passed and a fail key with all the items in the array the filter rejected.', t => {
  const someArray = ['a', 1, 0, 'b', '1', -8, 'c']
  const actual = part(someArray)(x => typeof x === 'number')
  const { pass, fail } = actual
  t.equal(pass.includes(1), true)
  t.equal(pass.includes(0), true)
  t.equal(pass.includes(-8), true)
  t.equal(pass.length, 3)
  t.equal(fail.includes('a'), true)
  t.equal(fail.includes('b'), true)
  t.equal(fail.includes('1'), true)
  t.equal(fail.includes('c'), true)
  t.equal(fail.length, 4)
  t.end()
})

const pair = settings => {
  const obj = {}
  settings.forEach(cmd => {
    if (cmd.startsWith('--')) {
      const splitName = cmd.substring(2).split('=')
      obj[splitName[0]] = splitName[1] || true
    } else {
      if (cmd.startsWith('-')) {
        const nextValue = settings[settings.indexOf(cmd) + 1]
        obj[cmd.substring(1)] = nextValue.startsWith('-') ? true : nextValue
      }
    }
  })
  return obj
}

test('The pair function breaks command line arguments into key/value pairs.', t => {
  const actual = pair(['-c', 'cool', '--whatever=fine', '-x', '--sure'])
  t.equal(actual.c, 'cool')
  t.equal(actual.x, true)
  t.equal(actual.whatever, 'fine')
  t.equal(actual.sure, true)
  t.end()
})

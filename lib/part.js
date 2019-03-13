const negate = require('./negate')

const part = arr => filterFn => ({
  fail: arr.filter(negate(filterFn)),
  pass: arr.filter(filterFn)
})

module.exports = part

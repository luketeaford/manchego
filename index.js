const pair = require('./lib/pair')
const slice = require('./lib/slice')

const index = function (argv) {
  return pair(slice(argv))
}

module.exports = index

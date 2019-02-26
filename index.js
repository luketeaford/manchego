const slice = require('./lib/slice')

const index = function (argv) {
  const settings = slice(argv)
  return {
    settings
  }
}

module.exports = index

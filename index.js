const slice = require('./lib/slice')

const index = function (argv) {
  const settings = slice(argv)
  console.log(settings)
  return {
    settings
  }
}

index(process.argv)

module.exports = index

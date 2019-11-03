const transformValues = require('./transform').values

const when = predicateFn => fn => x => predicateFn(x) ? fn(x) : x
const convertToBoolean = x => x !== 'false'
const isTrueOrFalseString = x => ['true', 'false'].includes(x)

module.exports = transformValues(when(isTrueOrFalseString)(convertToBoolean))

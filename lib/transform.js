const compose = require('./compose')
const identity = x => x
const zip = (x, y) => x.map((currentValue, index) => [currentValue, y[index]])

const objectFromZip = compose(Object.fromEntries, zip)

const transform = (keyTransform, valueTransform) => anObject => objectFromZip(
  Object.keys(anObject).map(keyTransform),
  Object.values(anObject).map(valueTransform)
)

module.exports = transform
module.exports.values = transformFn => transform(identity, transformFn)

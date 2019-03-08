const camelCaser = (previousValue, currentValue, index) => {
  const firstLetter = currentValue[0]
  const subsequentLetters = currentValue.slice(1)
  return index < 1
    ? currentValue
    : `${previousValue}${firstLetter.toUpperCase()}${subsequentLetters}`
}

const toCamelCase = x => x.split('-').reduce(camelCaser)

module.exports = toCamelCase

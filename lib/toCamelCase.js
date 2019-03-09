const camelCaser = (previousValue, currentValue) => {
  const firstLetter = currentValue[0]
  const subsequentLetters = currentValue.slice(1)
  return `${previousValue}${firstLetter.toUpperCase()}${subsequentLetters}`
}

const toCamelCase = x => x.split('-').reduce(camelCaser)

module.exports = toCamelCase

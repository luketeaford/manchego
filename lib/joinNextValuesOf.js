const joinNextValuesOf = (arr, filterFn1) => (x, filterFn2) => {
  const nextItems = arr.slice(arr.indexOf(x) + 1)
  const filterFn = filterFn2 || filterFn1
  return filterFn
    ? nextItems.filter(filterFn).join(' ')
    : nextItems.join(' ')
}

module.exports = joinNextValuesOf

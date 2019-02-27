const part = arr => filter => {
  const fail = arr.filter(x => !filter(x))
  const pass = arr.filter(filter)
  return {
    fail,
    pass
  }
}

module.exports = part

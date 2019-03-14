const test = require('tape')
const joinNextValuesOf = require('../lib/joinNextValuesOf')

test('The joinNextValuesOf function takes an array and an optional filter function which returns a function that takes an item from the array and an optional filter. The resulting function returns a string containing the items after the current item separated by spaces with an optional filter applied. Only one filter is applied, and the second filter function takes precedence.', t => {
  const notes = [
    'a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'
  ]

  const joinSharpsAfter = joinNextValuesOf(notes, x => x.length > 1)
  t.equal(joinSharpsAfter('a'), 'a# c# d# f# g#')
  t.equal(joinSharpsAfter('g#'), '')
  t.equal(joinSharpsAfter('d#', x => x !== 'f#'), 'e f g g#')
  const joinNotesAfter = joinNextValuesOf(notes)
  t.equal(joinNotesAfter('c'), 'c# d d# e f f# g g#')
  t.equal(joinNotesAfter('f#'), 'g g#')
  t.equal(joinNotesAfter('c', x => x.length === 1), 'd e f g')
  t.end()
})

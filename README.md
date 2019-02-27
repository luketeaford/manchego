# Manchego
Cheesy CLI

## Design Goals
- [x] No made-up syntax
- [ ] Single dash options have equivalent double-dash options
- [ ] Single dash options are separated with a space for parameter
- [ ] Single dash options can be combined

## Ways to use this
```js
const manchego = require('manchego')

// Simple destructuring
const { src, dest, template } = manchego(process.argv)

```

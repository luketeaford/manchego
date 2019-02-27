# Manchego
Cheesy CLI

## Design Goals
- [x] No made-up syntax
- [x] Single dash options expect space separated values
- [x] Single dash options can be combined
- [ ] Double dash options expect equals sign
- [ ] Support multiple ending arguments

## Usage
```js
const cli = require('manchego')

// Simple destructuring
const { src, dest, template } = cli(process.argv)

```

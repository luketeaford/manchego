# Manchego
Cheesy CLI

## Design Goals
- [x] No made-up syntax
- [x] Single dash options expect space separated values
- [x] Single dash options can be combined
- [x] Double dash options expect equals sign
- [x] Support variadic arguments

## Usage
```js
const cli = require('manchego')

// Simple destructuring
const { src, dest, template } = cli(process.argv)
```

## TODO
- Should converting 'false' to boolean be an option?
- Should converting numbers be an option?
- Should converting space separated string to array be an option?

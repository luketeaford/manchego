<img alt="" src="manchego-logo.png">

# Manchego
Cheesy CLI

## Design Goals
- [x] No made-up syntax
- [x] No defaults or side effects
- [x] No dependencies
- [x] Always return an object

Manchego is a tool for making Command Line Interfaces. It uses simple rules instead of making up a syntax with special characters. It has no defaults or side effects. It always returns an object.

## What it does
- [x] Words preceeding single- or double-hyphen options are set to true
- [x] Single-hyphen options expect space separated values
- [x] Single-hyphen options can be combined
- [x] Multiple arguments can be passed to the last single- or double-hyphen option
- [x] Double-hyphen options are stored in camelCase
- [x] Double-hyphen options can be separated by equals sign
- [x] Double-hyphen options can receive a space separated value

## Usage Example
```console
# If this is your input...
node index.js say -a ape -bd --cool-urls --file=foo.js -z zappa zebra zoo
```

```js
// ...index.js will work like this
const manchego = require('manchego')

// Simple destructuring
const { say, a, b, c, d, file, z } = manchego(process.argv)
console.log(say) // true
console.log(a) // 'ape'
console.log(b && d) // true
console.log(coolUrls) // true
console.log(file) // 'foo.js'
console.log(z) // 'zappa zebra zoo'
```

## Tips
Manchego organizes the data from `process.argv` into a simple format so you can process it how you like.

Words that precede a dash command (a string beginning with `-` or `--`) will be set to `true`. This enables the CLI to be used to support multiple functions.

## Roadmap to 1.0.0
- [ ] Show usage examples in small chunks

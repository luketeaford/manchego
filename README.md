<img alt="manchego logo" src="manchego-logo.png">

# Manchego
Cheesy CLI

## Design Goals
[x] No made-up syntax
[x] Words preceeding a dash option are set to true
[x] Single dash options expect space separated values
[x] Single dash options can be combined
[x] Double dash options expect equals sign
[x] Variadic arguments can be passed to last single dash command

## Usage Example
```console
# If this is your input...
node index.js say -a ape -bcd --file=foo.js -z zappa zebra zoo
```

```js
// ...index.js will work like this
const cli = require('manchego')

// Simple destructuring
const { say, a, b, c, d, file, z } = cli(process.argv)
console.log(say) // true
console.log(a) // 'ape'
console.log(b && c && d) // true
console.log(file) // 'foo.js'
console.log(z) // 'zappa zebra zoo'
```

## Tips
Manchego organizes the data from `process.argv` into a simple format so you can process it how you like.

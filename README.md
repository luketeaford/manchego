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
- [x] Words preceeding dash options are set to true
- [x] Single dash options expect space separated values
- [x] Single dash options can be combined
- [x] Multiple arguments can be passed to the last single dash command
- [x] Double dash options are stored in camelCase
- [x] Double dash options can be separated by equals sign
- [x] Double dash options can receive a space separated value

## Usage Example
```console
# If this is your input...
node index.js say -a ape -bd --cool-urls --file=foo.js -z zappa zebra zoo
```

```js
// ...index.js will work like this
const cli = require('manchego')

// Simple destructuring
const { say, a, b, c, d, file, z } = cli(process.argv)
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
- [ ] Correct and standardize documentation ("options" and "arguments")
- [ ] Improve test clarity and begin with simple examples that gradually increase in complexity
- [ ] Show usage examples in small chunks
- [ ] AddToOutput vs AssignToOutput (assign is probably better)
- [ ] Solve suspicious similarity with variadic args for single and double hyphen options
- [ ] Use markdown for logo in readme instead of HTML

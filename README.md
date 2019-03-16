<img alt="" src="manchego-logo.png">

# Manchego
Cheesy CLI

## Design Goals
- [x] No made-up syntax
- [x] No defaults or side effects
- [x] No dependencies
- [x] Always return an object

Manchego is a tool for making Command Line Interfaces. It uses simple rules instead of making up a syntax with special characters. It has no defaults or side effects. It always returns an object.

## What it Does
- [x] Arguments preceeding single- or double- hyphen options are set to true
- [x] Single- and double- hyphen options can receive space separated values
- [x] Multiple arguments can be passed to the last single- or double- hyphen option
- [x] Single-hyphen options can be combined
- [x] Double-hyphen options are stored in camelCase
- [x] Double-hyphen options can receive an argument with an equals sign

## Usage Examples
### Overview of All Rules
```console
# If this is your input...
node index.js say -a ape -bd --cool-urls --o ox --file=foo.js -z zappa zip zoo
```

```js
// ...index.js will work like this
const manchego = require('manchego')

// Pass process.argv into the manchego function which returns an object
const cli = manchego(process.argv)

// Arguments preceding single- or double- hyphen options are set to true
cli.say // true

// Single- and double- hyphen options can receive space separated values
cli.a // 'ape
cli.o // 'ox

// Multiple arguments can be passed to the last single- or double- hyphen option
cli.z // 'zappa zip zoo'

// Single-hyphen options can be combined
cli.b // true
cli.d // true

// Double-hyphen options are stored in camelCase
cli.coolUrls // true

// Double-hyphen options can receive an argument with an equals sign
cli.file // 'foo.js'
```

### Miscellaneous Tips
```console
# If this is your input...
node index.js whatever -w squarewave --source src/md --show-warnings false -rmx
```

```js
// ...index.js will work like this
const manchego = require('manchego')

// Destructure the object manchego returns for ease of use
const { whatever, w, source, showWarnings, r, m, x } = manchego(process.argv)
whatever && r && m && x // true
w // 'squarewave'
source // 'src/md'

// Sometimes it's useful to set an option true by default
// Remember manchego does not convert any value ('false' string instead of boolean)...
showWarnings // 'false'

// ...but it's trivial to do that in your code like so
const showWarningsEnabled = showWarnings !== 'false' // false

```

## Roadmap to 1.0.0
- [ ] Fix remaining bugs in failing tests

# requireify
[![Build Status](https://travis-ci.org/tmont/requireify.png)](https://travis-ci.org/tmont/requireify)

A [browserify](http://browserify.org/) transform for `require()`-ing non-JS
files.

It accomplishes this by wrapping the contents of the file in a `module.exports = '<contents>'` block.

## Installation
Install via NPM: `npm install browserify-requireify`

`requireify` is already taken :(

## Usage
```javascript
var browserify = require('browserify'),
    requireify = require('browserify-requireify');

var b = browserify([ 'my/files/and/stuff.js' ]);
b.transform(requireify({
    extensions: [ 'txt', 'html', 'css' ]
}));

b.bundle(function(err, buffer) {
    console.log(buffer.toString());
});
```

### Options
`extensions`: An array of (case-insensitive) file extensions. `requireify` won't do anything
if the file doesn't have an extension contained in this array.

## Development
Run tests with `npm test`
